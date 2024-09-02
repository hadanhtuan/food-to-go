import { StatusException } from '@libs/common/exception';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch(StatusException)
export class StatusFilter implements ExceptionFilter {
  catch(exception: StatusException, host: ArgumentsHost) {
    console.log('status exception');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    response.status(status).json(exception.getResponse());
  }
}
