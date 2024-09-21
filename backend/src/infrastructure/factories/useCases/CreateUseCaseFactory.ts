import ICustomerRepository from '@domain/repositories/customer/ICustomerRepository';
import ITransactionRepository from '@domain/repositories/transaction/ITransactionRepository';
import CreateUseCase from '@useCases/create/CreateUseCase';
import ICreateUseCase from '@useCases/create/ICreateUseCase';
import TransactionRepositoryFactory from '../repositories/TransactionRepositoryFactory copy';
import CustomerRepositoryFactory from '../repositories/CustomerRepositoryFactory';

export default class CreateUseCaseFactory {
  private static useCase: ICreateUseCase;
  private static transactionRepository: ITransactionRepository;
  private static customerRepository: ICustomerRepository;

  static make(
    transactionRepository?: ITransactionRepository,
    customerRepository?: ICustomerRepository,
  ): ICreateUseCase {
    if (this.useCase) {
      return this.useCase;
    }
    this.transactionRepository = transactionRepository ?? TransactionRepositoryFactory.make();
    this.customerRepository = customerRepository ?? CustomerRepositoryFactory.make();

    this.useCase = new CreateUseCase(this.transactionRepository, this.customerRepository);
    return this.useCase;
  }
}
