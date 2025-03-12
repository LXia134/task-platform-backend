import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
  } from 'typeorm';
  import { Task, TaskStatus } from './task.entity'; // ✅ Import TaskStatus enum
  
  @Entity()
  export class TaskHistory {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @ManyToOne(() => Task, (task) => task.history, { onDelete: 'CASCADE' })
    task: Task;
    
    @Column({ type: 'enum', enum: TaskStatus, enumName: 'task_status_enum' }) 
    oldStatus: TaskStatus;
  
    @Column({ type: 'enum', enum: TaskStatus, enumName: 'task_status_enum' })
    newStatus: TaskStatus;
  
    @Column({ type: 'text', nullable: true })
    changeReason?: string;
  
    @CreateDateColumn()
    changedAt: Date;
  }
  