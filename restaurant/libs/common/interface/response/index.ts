import { APIStatus } from "@libs/common/enum/api-status.enum";

export interface IResponse<T = unknown> {
  status: APIStatus;
  message?: string;
  header?: Map<string, string>;
  data?: T;
  total?: number;
}