import { buildErrorInfo } from '@infrastructure/parser/ErrorInfo';
import {
  IRetrieveTransactionsQuery,
  IRetrieveTransactionsUseCase,
} from '@useCases/retrieveTransactions/IRetrieveTransactionsUseCase';
import { Request, Response } from 'express';
import { OK } from 'http-status';

export default class RetrieveTransactionController {
  constructor(private useCase: IRetrieveTransactionsUseCase) {}

  public execute = async (request: Request, response: Response) => {
    try {
      const filters: IRetrieveTransactionsQuery = request.query;
      const page = Number(request.query.page);
      const pageSize = Number(request.query.pageSize);

      const transactionsResponse = await this.useCase.handle(filters, page, pageSize);

      return response.status(OK).json(transactionsResponse);
    } catch (error: any) {
      const errorInfo = buildErrorInfo(error);

      console.error('failed to retrieve transactions', errorInfo);

      return response.status(errorInfo.code).json({ error: errorInfo.errorMessage });
    }
  };
}
