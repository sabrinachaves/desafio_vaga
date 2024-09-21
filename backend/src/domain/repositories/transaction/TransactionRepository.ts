import { Model } from 'mongoose';
import { ITransaction } from '../../schemas/Transaction';
import ITransactionRepository, { IListTransactionsOutput } from './ITransactionRepository';
import { IRetrieveTransactionsQuery } from '@useCases/retrieveTransactions/IRetrieveTransactionsUseCase';

export default class TransactionRepository implements ITransactionRepository {
  constructor(private transactionModel: Model<ITransaction>) {}

  async create(data: ITransaction[]): Promise<ITransaction[]> {
    const transactions = await this.transactionModel.create(data);
    return transactions.map((transaction) => transaction.toObject());
  }

  async getById(transactionId: string): Promise<ITransaction | null> {
    const transaction = await this.transactionModel.findById(transactionId).lean();
    return transaction;
  }

  async listTransactions(
    filters?: IRetrieveTransactionsQuery,
    page: number = 1,
    pageSize: number = 10,
  ): Promise<IListTransactionsOutput> {
    let where = {};
    if (filters?.transactionId) where = { _id: filters.transactionId };
    if (filters?.customerId) where = { ...where, customerId: filters.customerId };
    if (filters?.cpfCnpj) where = { ...where, cpfCnpj: filters.cpfCnpj };
    if (filters?.startDate || filters?.endDate) {
      where = {
        ...where,
        date: {
          ...(filters.startDate && { $gte: filters.startDate }),
          ...(filters.endDate && { $lte: filters.endDate }),
        },
      };
    }

    const total = await this.transactionModel.countDocuments(where);

    const transactions = await this.transactionModel
      .find(where)
      .sort({ date: 1, _id: 1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean();

    return { transactions, total };
  }
}
