import { APIStatus } from "@libs/common/enums/api-status.enum";

export interface IResponse<T> {
  status: APIStatus;
  message?: string;
  header?: Map<string, string>;
  data?: T;
  total: number;
}