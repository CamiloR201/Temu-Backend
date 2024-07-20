import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Task } from './entity/Task';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123',
  database: 'taks',
  entities: [User, Task],
  migrations: ['dist/migration/'], // Update the path to use the compiled JavaScript files
  synchronize: false,
  migrationsTableName: "custom_migration_table",
});
