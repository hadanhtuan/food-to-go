import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { get } from 'lodash';
import { HttpException, HttpStatus } from '@nestjs/common';
import { APIStatus } from '@libs/common/enum';
import { IResponse } from '@libs/common/interface/response';

const HandleResponseError = (
  error: AxiosError,
  route: string,
  method: string,
) => {
  throw new HttpException(error?.response, APIStatus.BadRequest);
};

export class RestService {
  static async get<T>(
    route: string,
    configs?: AxiosRequestConfig,
  ): Promise<IResponse<T>> {
    return axios
      .get(route, configs)
      .then((data) => get(data, 'data'))
      .catch((error: AxiosError) => HandleResponseError(error, route, 'GET'));
  }

  static async post<T, P>(
    route: string,
    payload?: P,
    configs?: AxiosRequestConfig,
  ): Promise<IResponse<T>> {
    return axios
      .post(route, payload, configs)
      .then((data) => get(data, 'data'))
      .catch((error: AxiosError) => HandleResponseError(error, route, 'POST'));
  }

  static async patch<T, P>(
    route: string,
    payload?: P,
    configs?: AxiosRequestConfig,
  ): Promise<IResponse<T>> {
    return axios
      .patch(route, payload, configs)
      .then((data) => get(data, 'data'))
      .catch((error: AxiosError) => HandleResponseError(error, route, 'PATCH'));
  }

  static async put<T, P>(
    route: string,
    payload?: P,
    configs?: AxiosRequestConfig,
  ): Promise<IResponse<T>> {
    return axios
      .put(route, payload, configs)
      .then((data) => get(data, 'data'))
      .catch((error: AxiosError) => HandleResponseError(error, route, 'PUT'));
  }

  static async delete<T>(
    route: string,
    configs?: AxiosRequestConfig,
  ): Promise<IResponse<T>> {
    return axios
      .delete(route, configs)
      .then((data) => get(data, 'data'))
      .catch((error: AxiosError) =>
        HandleResponseError(error, route, 'DELETE'),
      );
  }
}
