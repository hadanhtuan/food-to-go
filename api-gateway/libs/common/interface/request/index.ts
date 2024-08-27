import { Sort } from 'typeorm';

export interface IPaginate {
  offset?: number;
  limit?: number;
}

export interface IDateTime {
  start?: Date | string;
  end?: Date | string;
}

export interface IQuery<T> {
  where: Partial<T>;
  sort: Partial<Record<keyof T, Sort>>;
  time: IDateTime;
  paginate: IPaginate;
}
