import ITransactionRepository from '@domain/repositories/transaction/ITransactionRepository';
import TransactionRepository from '@domain/repositories/transaction/TransactionRepository';
import { ITransaction, TransactionSchema } from '@domain/schemas/Transaction';
import { model, Model } from 'mongoose';

export default class TransactionRepositoryFactory {
  private static repository: ITransactionRepository;

  static make(): ITransactionRepository {
    const transactionModel: Model<ITransaction> = model<ITransaction>('Transaction', TransactionSchema);

    if (this.repository) {
      return this.repository;
    }

    this.repository = new TransactionRepository(transactionModel);
    return this.repository;
  }
}
