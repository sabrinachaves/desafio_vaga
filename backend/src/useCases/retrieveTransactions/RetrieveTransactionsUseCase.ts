import ITransactionRepository from '@domain/repositories/transaction/ITransactionRepository';
import {
  IRetrieveTransactionsOutput,
  IRetrieveTransactionsQuery,
  IRetrieveTransactionsUseCase,
  ITransactionOutput,
} from './IRetrieveTransactionsUseCase';
import ICustomerRepository from '@domain/repositories/customer/ICustomerRepository';
import { ITransaction } from '@domain/schemas/Transaction';

export default class RetrieveTransactionsUseCase implements IRetrieveTransactionsUseCase {
  constructor(private transactionRepository: ITransactionRepository, private customerRepository: ICustomerRepository) {}

  async handle(
    filters?: IRetrieveTransactionsQuery,
    page?: number,
    pageSize?: number,
  ): Promise<IRetrieveTransactionsOutput> {
    if (filters?.name || filters?.cpfCnpj) {
      const customers = await this.customerRepository.listCustomers(filters);

      if (!customers.length) return { transactions: [], total: 0 };

      filters = {
        ...filters,
        customerId: customers[0]._id,
      };
    }

    const transactionsResponse = await this.transactionRepository.listTransactions(filters, page, pageSize);

    const hydratedTransactions = await Promise.all(
      transactionsResponse.transactions.map(async (transaction) => {
        return await this.hydrateTransaction(transaction);
      }),
    );
    return { transactions: hydratedTransactions, total: transactionsResponse.total };
  }

  private async hydrateTransaction(transaction: ITransaction): Promise<ITransactionOutput> {
    const customer = await this.customerRepository.listCustomers({ customerId: transaction.customerId });

    return {
      transactionId: transaction._id,
      name: customer[0].name,
      cpfCnpj: customer[0].cpfCnpj,
      date: transaction.date,
      value: transaction.value,
    };
  }
}
