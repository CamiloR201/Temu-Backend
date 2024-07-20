import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Task } from './entity/Task';

export const dataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123',
    database: 'taks',
    entities: [User, Task],
    migrations: ['src/migration/*.ts'],
    synchronize: false,
});
