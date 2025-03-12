import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
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
