import { ITransaction } from '@domain/schemas/Transaction';

export interface ICreateInput {
  _id: string;
  name: string;
  cpfCnpj: string;
  date: Date;
  value: number;
}

export interface ICreateOutput {
  createdTransactions: ITransaction[];
  failedTransactions: ITransaction[];
}

export default interface ICreateUseCase {
  handle(transactions: ICreateInput[]): Promise<ICreateOutput>;
}
