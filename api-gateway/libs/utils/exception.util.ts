import { HttpException } from '@nestjs/common';
import { APIStatus } from '@libs/common/enum';

export const getStatusCode = <T>(exception: T): APIStatus => {
  return exception instanceof HttpException
    ? exception.getStatus()
    : APIStatus.ServerError;
};

export const getErrorMessage = <T>(exception: T): Array<T> | T => {
  return exception instanceof HttpException
    ? exception['response']['message']
    : exception;
};
