import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { getErrorMessage, getStatusCode } from '@libs/utils';

@Catch()
export class GatewayExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = getStatusCode<T>(exception);
    const errors = getErrorMessage<T>(exception);
    response.status(status).json({
      status,
      message: errors,
    });
  }
}
