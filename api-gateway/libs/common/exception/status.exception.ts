import { HttpException } from '@nestjs/common';
import { APIStatus } from '@libs/common/enum';
import { IResponse } from '@libs/common/interface/response';

export class StatusException extends HttpException {
  constructor(data: IResponse, statusCode: APIStatus) {
    super(data, statusCode);
  }
}
