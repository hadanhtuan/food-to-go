import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { StatusException } from '@libs/common/exception';

@Catch(StatusException)
export class StatusFilter implements ExceptionFilter {
  catch(exception: StatusException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    response.status(status).json(exception.getResponse());
  }
}
