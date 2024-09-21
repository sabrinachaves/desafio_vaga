import { Request, Response, NextFunction } from 'express';
import Joi, { ValidationError, Schema } from 'joi';
import BadRequestError from '@domain/exceptions/BadRequestError';
import { buildErrorInfo } from '@infrastructure/parser/ErrorInfo';
import InternalServerError from '@domain/exceptions/InternalServerError';
import schemas from '../schemas';

export const validateSchema = (validator: string, requestObject: 'body' | 'params' | 'query') => {
  const SchemaValidations: { [key: string]: Schema } = schemas;

  return (request: Request, response: Response, next: NextFunction) => {
    try {
      if (!SchemaValidations.hasOwnProperty(validator)) {
        throw new Error('invalid schema');
      }
      Joi.assert(request[requestObject], SchemaValidations[validator]);
      return next();
    } catch (error: any) {
      let errorDetails = new InternalServerError(`Failed to validate request. error: ${error}`);
      if (error instanceof ValidationError && error.isJoi) {
        errorDetails = new BadRequestError(error.details.map((detail: any) => detail.message).join(', '));
      }
      const errorInfo = buildErrorInfo(errorDetails);

      return response.status(errorInfo.code).json({ error: errorInfo.errorMessage });
    }
  };
};
