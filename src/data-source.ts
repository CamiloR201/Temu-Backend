const { DataSource } = require('typeorm');
const { User } = require('./entity/User');
const { Task } = require('./entity/Task');

const dataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123',
    database: 'taks',
    entities: [User, Task],
    migrations: ['src/migration/*'], // Cambiado a .js si las migraciones están en JS
    synchronize: false,
});

module.exports = dataSource;
