import ICreateUseCase, { ICreateInput, ICreateOutput } from './ICreateUseCase';
import ITransactionRepository from '@domain/repositories/transaction/ITransactionRepository';
import { ITransaction } from '@domain/schemas/Transaction';
import ICustomerRepository from '@domain/repositories/customer/ICustomerRepository';
import { v4 as uuidv4 } from 'uuid';

export default class CreateUseCase implements ICreateUseCase {
  constructor(private transactionRepository: ITransactionRepository, private customerRepository: ICustomerRepository) {}

  public async handle(transactions: ICreateInput[]): Promise<ICreateOutput> {
    const existingTransactionIds: string[] = [];
    let transactionsToBeCreated: ITransaction[] = [];
    let failedTransactions: ITransaction[] = [];

    const ids = transactions.map((t) => t._id);
    const existingTransactions = await this.transactionRepository.find({ _id: { $in: ids } });
    if (existingTransactions.length > 0)
      existingTransactions.forEach((transaction) => existingTransactionIds.push(transaction._id));

    for (const transaction of transactions) {
      try {
        if (existingTransactionIds.includes(transaction._id)) {
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

        transactionsToBeCreated.push({
          _id: transaction._id,
          customerId: customers[0]._id!,
          date: new Date(transaction.date),
          value: transaction.value,
        });
      } catch (err) {
        failedTransactions.push(transaction);
        console.log(err);
      }
    }

    const createdTransactions = await this.transactionRepository.create(transactionsToBeCreated);
    return {
      createdTransactions,
      failedTransactions,
    };
  }
}
