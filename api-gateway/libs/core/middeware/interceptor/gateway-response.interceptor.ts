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
        // console.log('catch error');
        if (err instanceof TimeoutError) {
          return throwError(() => ({
            statusCode: APIStatus.Timeout,
            message: 'Request timeout',
          }));
        }

        console.log(err);
        return throwError(() => err);
      }),

      // throw status exception to status filter
      map((data: IResponse) => {
        // throw to status.filter.ts to modify API Status
        throw new StatusException(data, data.statusCode);
      }),
    );
  }
}
