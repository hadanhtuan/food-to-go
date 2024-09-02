import { ECircuitBreakerState } from '@libs/common/enum';
import { configuration } from '@libs/config';

export class CircuitBreakerService {
  private state: ECircuitBreakerState = ECircuitBreakerState.CLOSED;
  private failureCount = 0;
  private requestCount = 0;
  private checkStart = Date.now();
  private nextAttempt: number; // Timestamp for the next attempt when in Open state

  readonly failureThresholdPercent: number;
  readonly halfOpenThresholdPercent: number;
  readonly halfOpenThresholdCount: number;
  readonly circuitCloseTime: number;
  readonly intervalCheckTime: number;

  constructor() {
    const circuitConfig = configuration.circuitBreaker;
    this.failureThresholdPercent = circuitConfig.failureThresholdPercent;
    this.halfOpenThresholdPercent = circuitConfig.halfOpenThresholdPercent;
    this.halfOpenThresholdCount = circuitConfig.halfOpenThresholdCount;
    this.circuitCloseTime = circuitConfig.circuitCloseTime;
    this.intervalCheckTime = circuitConfig.intervalCheckTime;
  }

  public canCall(): boolean {
    switch (this.state) {
      case ECircuitBreakerState.CLOSED:
        return true;
      case ECircuitBreakerState.OPEN:
        if (Date.now() >= this.nextAttempt) {
          this.changeState(ECircuitBreakerState.HALF_OPEN);
          return true;
        }
        return false;
      case ECircuitBreakerState.HALF_OPEN:
        if (this.requestCount < this.halfOpenThresholdCount) {
          return true;
        }
        if (this.requestCount > this.halfOpenThresholdCount) {
          if (this.calculateFailurePercent() < this.halfOpenThresholdPercent) {
            this.changeState(ECircuitBreakerState.CLOSED);
            return true;
          } else {
            this.changeState(ECircuitBreakerState.OPEN);
            return false;
          }
        }
    }
  }

  recordRequest() {
    const timePassed = Date.now() - this.checkStart;

    if (this.state === ECircuitBreakerState.CLOSED) {
      // reset if over range time
      if (timePassed > this.intervalCheckTime * 1.2) {
        console.log('reset > 1.2');
        this.reset();
      }

      if (
        timePassed > this.intervalCheckTime &&
        timePassed < this.intervalCheckTime * 1.2
      ) {
        if (this.calculateFailurePercent() > this.failureThresholdPercent) {
          this.changeState(ECircuitBreakerState.OPEN);
        } else {
          console.log('reset < 1.2');

          this.reset();
        }
      }
    }

    this.requestCount++;
  }

  public recordFailure() {
    this.failureCount++;
  }

  private calculateFailurePercent(): number {
    if (this.requestCount == 0) return 0;
    return (this.failureCount / this.requestCount) * 100;
  }

  private changeState(state: ECircuitBreakerState) {
    this.state = state;
    this.requestCount = 0;
    this.failureCount = 0;
    this.checkStart = Date.now();

    switch (state) {
      case ECircuitBreakerState.CLOSED:
        console.log('close circuit');

        this.nextAttempt = 0;
        break;
      case ECircuitBreakerState.OPEN:
        console.log('open circuit');
        this.nextAttempt = Date.now() + this.circuitCloseTime;
        break;
      case ECircuitBreakerState.HALF_OPEN:
        console.log('half open circuit');

        this.nextAttempt = 0;
        break;
    }
  }
  reset() {
    this.failureCount = 0;
    this.nextAttempt = 0;
    this.requestCount = 0;
    this.checkStart = Date.now();
  }
}
