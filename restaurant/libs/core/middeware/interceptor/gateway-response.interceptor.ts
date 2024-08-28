import { IResponse } from '@libs/common/interface/response';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  catchError,
  Observable,
  throwError,
  timeout,
  TimeoutError,
} from 'rxjs';
import { map } from 'rxjs/operators';
import { APIStatus } from '@libs/common/enum';
import { StatusException } from '@libs/common/exception';

@Injectable()
export class GatewayResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      //timeout
      timeout(5000),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() => ({
            status: APIStatus.Timeout,
            message: 'Request timeout',
          }));
        }
      }),

      // throw status exception to status filter
      map((data: IResponse) => {
        //throw to status filter
        switch (data.status) {
          case APIStatus.Ok:
            throw new StatusException(data, APIStatus.Ok);
          case APIStatus.Created:
            throw new StatusException(data, APIStatus.Created);
          case APIStatus.BadRequest:
            throw new StatusException(data, APIStatus.BadRequest);
          case APIStatus.ServerError:
            throw new StatusException(data, APIStatus.ServerError);
          case APIStatus.Forbidden:
            throw new StatusException(data, APIStatus.Forbidden);
          case APIStatus.Timeout:
            throw new StatusException(data, APIStatus.Timeout);
          case APIStatus.Unauthorized:
            throw new StatusException(data, APIStatus.Unauthorized);
          case APIStatus.NotFound:
            throw new StatusException(data, APIStatus.NotFound);
        }
      }),
    );
  }
}
