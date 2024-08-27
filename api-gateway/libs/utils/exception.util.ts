import { HttpException } from '@nestjs/common';
import { APIStatus } from '@libs/common/enum';
import { IResponse } from '@libs/common/interface/response';

export const getStatusCode = <T>(exception: T): APIStatus => {
  return exception instanceof HttpException
    ? exception.getStatus()
    : APIStatus.ServerError;
};

export const getErrorMessage = <T>(exception: T): Array<T> | T => {
  console.log(exception);
  return exception instanceof HttpException
    ? exception['response']['message']
    : exception['message'];
};

export const getErrorResponse = (error: any): IResponse => {
  return {
    message: error?.message,
    status: error?.status || APIStatus.ServerError,
    data: error?.data,
  };
};
