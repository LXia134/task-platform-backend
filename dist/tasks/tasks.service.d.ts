import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskHistory } from './entities/task-history.entity';
export declare class TasksService {
    private readonly taskRepository;
    private readonly taskHistoryRepository;
    constructor(taskRepository: Repository<Task>, taskHistoryRepository: Repository<TaskHistory>);
    create(createTaskDto: CreateTaskDto): Promise<Task>;
    findAll(page?: number, limit?: number, sortBy?: keyof Task, order?: 'ASC' | 'DESC', status?: string, searchQuery?: string): Promise<{
        tasks: Task[];
        total: number;
    }>;
    findOne(id: string): Promise<Task>;
    update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task>;
    softDelete(id: string): Promise<void>;
    restore(id: string): Promise<Task>;
}
