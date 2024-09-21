import RetrieveTransactionsController from '@application/v1/controller/RetrieveTransactionsController';
import { IRetrieveTransactionsUseCase } from '@useCases/retrieveTransactions/IRetrieveTransactionsUseCase';
import RetrieveTransactionsUseCaseFactory from '../useCases/RetrieveTransactionsUseCaseFactory';

export default class RetrieveTransactionsControllerFactory {
  private static controller: RetrieveTransactionsController;

  static make(retrieveTransactionsUseCase?: IRetrieveTransactionsUseCase): RetrieveTransactionsController {
    if (this.controller) {
      return this.controller;
    }

    const useCaseInstance = retrieveTransactionsUseCase ?? RetrieveTransactionsUseCaseFactory.make();

    this.controller = new RetrieveTransactionsController(useCaseInstance);
    return this.controller;
  }
}
