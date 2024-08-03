import { dbModuleMapping } from '@libs/common/constant';
import { IEntitiesMapMetadata } from '@libs/common/type';
import * as entities from '@libs/core/database/postgre/entity';

export function mapEntities(entities: IEntitiesMapMetadata) {
  const map = [];
  for (const database in entities) {
    const getValue = entities[database];
    const findModule = dbModuleMapping[database] || null;
    if (!findModule) console.debug('Could not found implement ORM');
    map.push(findModule.forFeature(getValue, database));
  }
  if (map.length <= 0) console.debug('Empty entities map !!!!!');
  return map;
}

export function getEntitiesPostgres() {
  const entitiesArr = [];
  for (const entity in entities) {
    entitiesArr.push(entities[entity]);
  }
  return entitiesArr;
}
