import { IRetrieveTransactionsQuery } from '@useCases/retrieveTransactions/IRetrieveTransactionsUseCase';
import { ITransaction } from '../../schemas/Transaction';

export interface IListTransactionsOutput {
  transactions: ITransaction[];
  total: number;
}

export default interface ITransactionRepository {
  create(data: ITransaction): Promise<ITransaction>;
  getById(transactionId: string): Promise<ITransaction | null>;
  listTransactions(
    filters?: IRetrieveTransactionsQuery,
    page?: number,
    pageSize?: number,
  ): Promise<IListTransactionsOutput>;
}
