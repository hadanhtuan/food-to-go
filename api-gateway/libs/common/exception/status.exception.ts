import { HttpException } from '@nestjs/common';
import { APIStatus } from '@libs/common/enum';

export class StatusException extends HttpException {
  constructor(data, status: APIStatus) {
    super(data, status);
  }
}
