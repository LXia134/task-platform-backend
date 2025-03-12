import { Task, TaskStatus } from './task.entity';
export declare class TaskHistory {
    id: string;
    task: Task;
    oldStatus: TaskStatus;
    newStatus: TaskStatus;
    changeReason?: string;
    changedAt: Date;
}
