import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  protected context?: string;
  constructor() {
    super();
  }

  setContext(context: string) {
    super.setContext(context);
    this.context = context;
  }

  log(message: unknown) {
    super.log(message, this.context);
  }

  error(message: unknown) {
    super.error(message, '', this.context);
  }

  warn(message: unknown) {
    super.warn(message, this.context);
  }
}
