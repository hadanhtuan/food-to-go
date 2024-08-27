import {
  HttpException,
  Injectable,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { APIStatus, EServiceName } from '@libs/common/enum';
import { IResponse } from '@libs/common/interface/response';
import { configuration } from '@libs/config';

export class RPCService implements OnApplicationShutdown {
  static instances: Map<string, ClientProxy> = new Map();

  // constructor(private readonly config: ConfigService) {
  // }

  onApplicationShutdown() {
    RPCService.instances.clear();
  }

  static getInstance(service: EServiceName) {
    if (this.instances.has(service)) return RPCService.instances.get(service);

    const client = ClientProxyFactory.create(
      // this.config.get(`services.${service}`),
      configuration.services[service],
    );
    this.instances.set(service, client);
    return client;
  }

  static async sendRequest<T>(
    service: EServiceName,
    message: unknown,
    url: string,
  ): Promise<IResponse<T>> {
    const response = RPCService.getInstance(service)
      .send({ cmd: url }, message)
      .pipe();
    const dataResult: IResponse<T> = await lastValueFrom(response);
    console.log(dataResult);

    // if (
    //   dataResult.status != APIStatus.Ok &&
    //   dataResult.status != APIStatus.Created
    // )
    //   throw new HttpException(dataResult, dataResult.status);

    return dataResult;
  }
}
