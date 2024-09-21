import ICreateUseCase, { ICreateInput, ICreateOutput } from './ICreateUseCase';
import ITransactionRepository from '@domain/repositories/transaction/ITransactionRepository';
import { ITransaction } from '@domain/schemas/Transaction';
import ICustomerRepository from '@domain/repositories/customer/ICustomerRepository';
import { v4 as uuidv4 } from 'uuid';

export default class CreateUseCase implements ICreateUseCase {
  constructor(private transactionRepository: ITransactionRepository, private customerRepository: ICustomerRepository) {}

  public async handle(transactions: ICreateInput[]): Promise<ICreateOutput> {
    let createdTransactions: ITransaction[] = [];
    let failedTransactions: ITransaction[] = [];

    for (const transaction of transactions) {
      try {
        const transactionResponse = await this.transactionRepository.getById(transaction._id);
        if (transactionResponse) {
          console.error('Transaction already exists');
          continue;
        }

        let customers = await this.customerRepository.getByCpfCnpj(transaction.cpfCnpj);
        customers = customers.length
          ? customers
          : [
              await this.customerRepository.create({
                _id: uuidv4(),
                name: transaction.name,
                cpfCnpj: transaction.cpfCnpj,
              }),
            ];

        const createdTransaction = await this.transactionRepository.create({
          _id: transaction._id,
          customerId: customers[0]._id!,
          date: new Date(transaction.date),
          value: transaction.value,
        });

        createdTransactions.push(createdTransaction);
      } catch (err) {
        failedTransactions.push(transaction);
        console.log(err);
      }
    }
    return {
      createdTransactions,
      failedTransactions,
    };
  }
}
