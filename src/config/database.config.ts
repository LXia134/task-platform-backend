import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from '../tasks/entities/task.entity';
import { TaskHistory } from '../tasks/entities/task-history.entity';
import 'dotenv/config';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'yourpassword',
  database: process.env.DB_NAME || 'task_db',
  entities: [Task, TaskHistory],
  synchronize: true, 
  migrations: ['dist/migrations/*.js'], 
  logging: true, 
};