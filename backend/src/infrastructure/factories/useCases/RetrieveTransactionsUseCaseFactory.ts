import ICustomerRepository from '@domain/repositories/customer/ICustomerRepository';
import ITransactionRepository from '@domain/repositories/transaction/ITransactionRepository';
import { IRetrieveTransactionsUseCase } from '@useCases/retrieveTransactions/IRetrieveTransactionsUseCase';
import RetrieveTransactionsUseCase from '@useCases/retrieveTransactions/RetrieveTransactionsUseCase';
import TransactionRepositoryFactory from '../repositories/TransactionRepositoryFactory copy';
import CustomerRepositoryFactory from '../repositories/CustomerRepositoryFactory';

export default class RetrieveTransactionsUseCaseFactory {
  private static useCase: IRetrieveTransactionsUseCase;
  private static transactionRepository: ITransactionRepository;
  private static customerRepository: ICustomerRepository;

  static make(
    transactionRepository?: ITransactionRepository,
    customerRepository?: ICustomerRepository,
  ): IRetrieveTransactionsUseCase {
    if (this.useCase) {
      return this.useCase;
    }

    this.transactionRepository = transactionRepository ?? TransactionRepositoryFactory.make();
    this.customerRepository = customerRepository ?? CustomerRepositoryFactory.make();

    this.useCase = new RetrieveTransactionsUseCase(this.transactionRepository, this.customerRepository);
    return this.useCase;
  }
}
