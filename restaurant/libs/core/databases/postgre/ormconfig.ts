import { config } from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';
config();

const options = {
  type: (process.env.PG_TYPE as any) || 'postgres',
  host: process.env.PG_HOST || '127.0.0.1',
  port: Number(process.env.PG_PORT || 3306),
  username: process.env.PG_USER || 'username',
  password: process.env.PG_PASSWORD || 'password',
  database: process.env.PG_NAME || 'dbName',
  migrations: [join(__dirname, './migrations/*.ts')],
  entities: [join(__dirname, './entities/*.entity.ts')],
};

export default new DataSource(options);
