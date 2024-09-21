import { Model } from 'mongoose';
import { ICustomer } from '../../schemas/Customer';
import { NotFoundError } from '@domain/exceptions';
import ICustomerRepository from './ICustomerRepository';
import { IRetrieveTransactionsQuery } from '@useCases/retrieveTransactions/IRetrieveTransactionsUseCase';

export default class CustomerRepository implements ICustomerRepository {
  constructor(private customerModel: Model<ICustomer>) {}

  async create(data: ICustomer): Promise<ICustomer> {
    return (await this.customerModel.create(data)).toObject();
  }

  async getByCpfCnpj(cpfCnpj: string): Promise<ICustomer[]> {
    const where = {
      cpfCnpj,
    };
    return await this.customerModel.find(where).lean();
  }

  async getById(customerId: string): Promise<ICustomer> {
    const customer = await this.customerModel.findById(customerId).lean();
    if (!customer) throw new NotFoundError('Customer not found');
    return customer;
  }

  async listCustomers(filters?: IRetrieveTransactionsQuery): Promise<ICustomer[]> {
    let where = {};
    if (filters?.name) where = { ...where, name: filters.name };
    if (filters?.customerId) where = { ...where, _id: filters.customerId };
    if (filters?.cpfCnpj) where = { ...where, cpfCnpj: filters.cpfCnpj };

    return await this.customerModel.find(where).sort({ createdAt: 1 }).lean();
  }
}
