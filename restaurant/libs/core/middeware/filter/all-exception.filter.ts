import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  INestMicroservice,
  INestApplication,
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { getErrorMessage } from '@libs/utils';
import { APIStatus } from '@libs/common/enum';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private httpAdapter: AbstractHttpAdapter;
  // constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  constructor(private readonly app: INestMicroservice | INestApplication) {
    const { httpAdapter } = app.get(HttpAdapterHost);
    this.httpAdapter = httpAdapter;
  }
  catch(exception: unknown, host: ArgumentsHost): void {
    console.log(exception);

    const ctx = host.switchToHttp();
    const errors = getErrorMessage(exception);

    const httpStatus = exception['message']['status'] || APIStatus.ServerError;

    const responseBody = {
      status: httpStatus,
      message: exception['message']['response']['message'],
    };
    console.log(responseBody);

    this.httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
