import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
  } from 'typeorm';
  import { TaskHistory } from './task-history.entity';
  
  export enum TaskStatus {
    PENDING = 'Pending',
    IN_PROGRESS = 'In Progress',
    COMPLETED = 'Completed',
  }
  
  @Entity()
  export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ length: 255 })
    title: string;
  
    @Column({ type: 'text', nullable: true })
    description?: string;
  
    @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING }) 
    status: TaskStatus;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn({ nullable: true })
    deletedAt?: Date;
  
    @OneToMany(() => TaskHistory, (history) => history.task)
    history: TaskHistory[];
  }
  