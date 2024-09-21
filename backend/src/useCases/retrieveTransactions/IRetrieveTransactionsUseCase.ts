export interface IRetrieveTransactionsQuery {
  transactionId?: string;
  customerId?: string;
  name?: string;
  cpfCnpj?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface ITransactionOutput {
  transactionId: string;
  name: string;
  cpfCnpj: string;
  date: Date;
  value: number;
}

export interface IRetrieveTransactionsOutput {
  transactions: ITransactionOutput[];
  total: number;
}

export interface IRetrieveTransactionsUseCase {
  handle(filters?: IRetrieveTransactionsQuery, page?: number, pageSize?: number): Promise<IRetrieveTransactionsOutput>;
}
