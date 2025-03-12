"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const task_entity_1 = require("../tasks/entities/task.entity");
const task_history_entity_1 = require("../tasks/entities/task-history.entity");
require("dotenv/config");
exports.databaseConfig = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'yourpassword',
    database: process.env.DB_NAME || 'task_db',
    entities: [task_entity_1.Task, task_history_entity_1.TaskHistory],
    synchronize: true,
    migrations: ['dist/migrations/*.js'],
    logging: true,
};
//# sourceMappingURL=database.config.js.map