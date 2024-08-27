import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { get } from 'lodash';
import { HttpException, HttpStatus } from '@nestjs/common';
import { APIStatus } from '@libs/common/enum';

const HandleResponseError = (
  error: AxiosError,
  route: string,
  method: string,
) => {
  throw new HttpException(error?.response, APIStatus.BadRequest);
};

export class RestService {
  static async get<T>(route: string, configs?: AxiosRequestConfig): Promise<T> {
    return axios
      .get(route, configs)
      .then((data) => get(data, 'data'))
      .catch((error: AxiosError) => HandleResponseError(error, route, 'GET'));
  }

  static async post<P, R>(
    route: string,
    payload?: P,
    configs?: AxiosRequestConfig,
  ): Promise<R> {
    return axios
      .post(route, payload, configs)
      .then((data) => get(data, 'data'))
      .catch((error: AxiosError) => HandleResponseError(error, route, 'POST'));
  }

  static async patch<P, R>(
    route: string,
    payload?: P,
    configs?: AxiosRequestConfig,
  ): Promise<R> {
    return axios
      .patch(route, payload, configs)
      .then((data) => get(data, 'data'))
      .catch((error: AxiosError) => HandleResponseError(error, route, 'PATCH'));
  }

  static async put<P, R>(
    route: string,
    payload?: P,
    configs?: AxiosRequestConfig,
  ): Promise<R> {
    return axios
      .put(route, payload, configs)
      .then((data) => get(data, 'data'))
      .catch((error: AxiosError) => HandleResponseError(error, route, 'PUT'));
  }

  static async delete<R>(
    route: string,
    configs?: AxiosRequestConfig,
  ): Promise<R> {
    return axios
      .delete(route, configs)
      .then((data) => get(data, 'data'))
      .catch((error: AxiosError) =>
        HandleResponseError(error, route, 'DELETE'),
      );
  }
}
