import { Observable } from 'rxjs';

export interface CircuitBreakerOptions {
  failureThresholdPercentage?: number;
  halfOpenThresholdPercentage?: number;
  halfOpenRequestCount?: number;
  rangeTime?: number;
  circuitCloseTime?: number;
  statusToBlock?: number[];
  fallback?: () => Observable<any>;
}
