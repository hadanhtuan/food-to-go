import { APIStatus } from '@libs/common/enum';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import {
  catchError,
  Observable,
  throwError,
  timeout,
  TimeoutError,
} from 'rxjs';

export class TimeoutInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      timeout(5000),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() => ({
            status: APIStatus.Timeout,
            message: 'Request timeout',
          }));
        }
        return throwError(() => ({
          message: err,
          status: APIStatus.ServerError,
        }));
      }),
    );
  }
}
