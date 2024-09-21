import CustomerRepository from '@domain/repositories/customer/CustomerRepository';
import ICustomerRepository from '@domain/repositories/customer/ICustomerRepository';
import { CustomerSchema, ICustomer } from '@domain/schemas/Customer';
import { model, Model } from 'mongoose';

export default class CustomerRepositoryFactory {
  private static repository: ICustomerRepository;

  static make(): ICustomerRepository {
    const customerModel: Model<ICustomer> = model<ICustomer>('Customer', CustomerSchema);

    if (this.repository) {
      return this.repository;
    }

    this.repository = new CustomerRepository(customerModel);
    return this.repository;
  }
}
