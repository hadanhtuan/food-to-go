
export const getConfig = async () => {
  const { config: develop } = <{ config }>(
    await import('@libs/config/env/develop')
  );

  const { config: staging } = <{ config }>(
    await import('@libs/config/env/staging')
  );

  const { config: production } = <{ config }>(
    await import('@libs/config/env/production')
  );

  const env = process.env.ENV || "develop"
  switch (env) {
    case "develop": return develop
    case "staging": return staging
    case "production": return production
  }
}