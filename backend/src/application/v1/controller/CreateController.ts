import { buildErrorInfo } from '@infrastructure/parser/ErrorInfo';
import ICreateUseCase, { ICreateInput } from '@useCases/create/ICreateUseCase';
import { ACCEPTED, BAD_REQUEST, OK } from 'http-status';
import { Request, Response } from 'express';
import fs from 'fs/promises';
import { performance } from 'perf_hooks';

export default class CreateController {
  constructor(private createUseCase: ICreateUseCase) {}

  public execute = async (request: Request, response: Response) => {
    try {
      if (!request.file) {
        return response.status(BAD_REQUEST).json({ error: 'File not found.' });
      }

      const filePath = request.file.path;
      const startTime = performance.now();
      const data = await fs.readFile(filePath, 'utf-8');
      const endTime = performance.now();

      const duration = Math.round(endTime - startTime);

      const lines = data.split('\n').filter((line) => line.trim() !== '');

      const transactions = lines.map((line) => {
        const transaction = {} as ICreateInput;
        const pairs = line.split(';');

        pairs.forEach((pair) => {
          const [key, value] = pair.split(':');

          switch (key) {
            case 'id':
              transaction._id = value;
              break;
            case 'nome':
              transaction.name = value;
              break;
            case 'cpfCnpj':
              transaction.cpfCnpj = value;
              break;
            case 'data':
              transaction.date = new Date(value);
              break;
            case 'valor':
              transaction.value = parseFloat(value);
              break;
          }
        });

        return transaction;
      });

      const createdTransactions = await this.createUseCase.handle(transactions);

      if (Object.keys(createdTransactions.failedTransactions).length > 0)
        return response.status(ACCEPTED).json({ readingFileTime: `${duration} ms`, createdTransactions });

      return response
        .status(OK)
        .json({ readingFileTime: `${duration} ms`, transactions: createdTransactions.createdTransactions });
    } catch (err: any) {
      const errorInfo = buildErrorInfo(err);

      console.error('failed to create transactions', errorInfo);
      return response.status(errorInfo.code).json({ error: errorInfo.errorMessage });
    }
  };
}
