import httpStatus from 'http-status';
import HttpError from './HttpError';

export default class InternalServerError extends HttpError {
  constructor(message: string) {
    super(message, httpStatus.INTERNAL_SERVER_ERROR);
    this.message = message;
  }
}
