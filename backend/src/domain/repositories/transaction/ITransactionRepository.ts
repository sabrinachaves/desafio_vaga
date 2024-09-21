import { IRetrieveTransactionsQuery } from '@useCases/retrieveTransactions/IRetrieveTransactionsUseCase';
import { ITransaction } from '../../schemas/Transaction';

export interface IListTransactionsOutput {
  transactions: ITransaction[];
  total: number;
}

export default interface ITransactionRepository {
  create(data: ITransaction[]): Promise<ITransaction[]>;
  listTransactions(
    filters?: IRetrieveTransactionsQuery,
    page?: number,
    pageSize?: number,
  ): Promise<IListTransactionsOutput>;
  find(query: any): Promise<ITransaction[]>;
}
