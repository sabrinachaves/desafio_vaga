import CreateController from '@application/v1/controller/CreateController';
import ICreateUseCase from '@useCases/create/ICreateUseCase';
import CreateUseCaseFactory from '@infrastructure/factories/useCases/CreateUseCaseFactory';

export default class CreateControllerFactory {
  private static controller: CreateController;

  static make(createUseCase?: ICreateUseCase): CreateController {
    if (this.controller) {
      return this.controller;
    }

    const createUseCaseInstance = createUseCase ?? CreateUseCaseFactory.make();

    this.controller = new CreateController(createUseCaseInstance);
    return this.controller;
  }
}
