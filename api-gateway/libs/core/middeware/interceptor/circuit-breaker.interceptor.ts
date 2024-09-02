import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { CircuitBreakerService } from '@libs/core/module/circuit-breaker';
import { IResponse } from '@libs/common/interface/response';

@Injectable()
export class CircuitBreakerInterceptor implements NestInterceptor {
  private readonly circuitBreakerByHandler = new WeakMap<
    Function,
    CircuitBreakerService
  >();

  private readonly statusToBlock = [500, 501, 502, 503, 504, 505];

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const methodRef = context.getHandler();

    let circuitBreaker: CircuitBreakerService;
    if (this.circuitBreakerByHandler.has(methodRef)) {
      circuitBreaker = this.circuitBreakerByHandler.get(methodRef);
    } else {
      circuitBreaker = new CircuitBreakerService();
      this.circuitBreakerByHandler.set(methodRef, circuitBreaker);
    }

    if (!circuitBreaker.canCall()) {
      throw new ServiceUnavailableException(
        'Service temporarily unavailable. Try again later!',
      );
    }

    circuitBreaker.recordRequest();

    return next.handle().pipe(
      tap((value: IResponse) => {
        if (this.statusToBlock.includes(value.statusCode)) {
          circuitBreaker.recordFailure();
        }
      }),
    );
  }
}
