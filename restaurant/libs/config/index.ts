import { TConfiguration } from '@libs/common/type';

export * from './configuration';

export const loadConfiguration = async (): Promise<TConfiguration> => {
  const { configuration } = <
    { configuration: TConfiguration } // @ts-ignore
  >await import('@libs/config/configuration');

  return configuration;
};
