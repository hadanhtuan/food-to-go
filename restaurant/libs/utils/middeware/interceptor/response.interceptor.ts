import { APIStatus } from "@libs/common/enum";
import { IResponse } from "@libs/common/interface/response";
import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';


export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: IResponse<unknown>) => {
        return data
      }),
    );
  }
}