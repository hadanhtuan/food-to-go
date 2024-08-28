import { EServiceName } from '@libs/common/enum';
import { configuration } from '@libs/config';
import { TService } from '@libs/common/type';

export const getRestUrl = (
  service: EServiceName,
  url: string,
  isHTTP: boolean = true,
): string => {
  const serviceConfig: TService = configuration.services[service];
  const { host, port } = serviceConfig.options;
  return (isHTTP ? 'http://' : 'https://') + host + ':' + port + '/' + url;
};
