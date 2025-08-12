import { DataSource } from 'typeorm';
import * as entities from './entities';

const AppDataSource = new DataSource({
  type: 'mssql',
  host: '16.176.218.141',
  port: 1433,
  username: 'sa',
  password: 'zaQ@1234',
  database: 'PosSystemProduction',
  entities: Object.values(entities),
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: false,
  options: {
    encrypt: false,
  },
});

export default AppDataSource;
