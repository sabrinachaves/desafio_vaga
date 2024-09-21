import { ICustomer } from '../../schemas/Customer';
import { IRetrieveTransactionsQuery } from '@useCases/retrieveTransactions/IRetrieveTransactionsUseCase';

export default interface ICustomerRepository {
  create(data: ICustomer): Promise<ICustomer>;
  getByCpfCnpj(cpfCnpj: string): Promise<ICustomer[]>;
  listCustomers(filters?: IRetrieveTransactionsQuery): Promise<ICustomer[]>;
}
