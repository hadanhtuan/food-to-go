import { OnApplicationShutdown } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { EServiceName } from '@libs/common/enum';
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
    url: string,
    message: unknown,
  ): Promise<IResponse<T>> {
    const response = RPCService.getInstance(service)
      .send({ cmd: url }, message)
      .pipe();

    return await lastValueFrom(response);
  }
}
