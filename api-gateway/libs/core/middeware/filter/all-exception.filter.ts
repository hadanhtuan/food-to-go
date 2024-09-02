import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  INestApplication,
  INestMicroservice,
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { getErrorMessage } from '@libs/utils';
import { APIStatus } from '@libs/common/enum';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  private httpAdapter: AbstractHttpAdapter;
  // constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    console.log('exception ');

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const errors = getErrorMessage(exception);
    console.log(exception);

    const statusCode = exception.getStatus();

    response.status(statusCode).json({
      message: errors,
      statusCode,
    });
  }
}
