import { TaskHistory } from './task-history.entity';
export declare enum TaskStatus {
    PENDING = "Pending",
    IN_PROGRESS = "In Progress",
    COMPLETED = "Completed"
}
export declare class Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    history: TaskHistory[];
}
