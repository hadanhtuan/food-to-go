import { HttpException } from '@nestjs/common';
import { APIStatus } from '@libs/common/enum';

export class StatusException extends HttpException {
  constructor(data, statusCode: APIStatus) {
    super(data, statusCode);
  }
}
