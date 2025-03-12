import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, Like, Brackets } from 'typeorm'; 
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskHistory } from './entities/task-history.entity';

@Injectable()
export class TasksService {
    constructor(
      @InjectRepository(Task)
      private readonly taskRepository: Repository<Task>,
      @InjectRepository(TaskHistory)
      private readonly taskHistoryRepository: Repository<TaskHistory>,
    ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return await this.taskRepository.save(task);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    sortBy: keyof Task = 'createdAt',
    order: 'ASC' | 'DESC' = 'DESC',
    status?: string,
    searchQuery?: string, 
  ): Promise<{ tasks: Task[]; total: number }> {
    const where: any = {};
  
    if (status) {
      where.status = status;
    }
  
    if (searchQuery) {
      where.title = Like(`%${searchQuery}%`);  
      where.description = Like(`%${searchQuery}%`);  
    }
  
    const queryBuilder = this.taskRepository.createQueryBuilder('task')
      .leftJoinAndSelect('task.history', 'history')
        
    if (status) {
      queryBuilder.andWhere('task.status = :status', { status });
    }
  
    if (searchQuery) {
      queryBuilder.andWhere(
        new Brackets(qb => {
          qb.where('task.title LIKE :searchQuery', { searchQuery: `%${searchQuery}%` })
            .orWhere('task.description LIKE :searchQuery', { searchQuery: `%${searchQuery}%` });
        })
      );
    }
  
    const [tasks, total] = await queryBuilder
      .orderBy(`task.${sortBy}`, order)
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
  
    return { tasks, total };
  }
  

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: {},
      relations: ['history'],
    });

    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);

    if (updateTaskDto.status && updateTaskDto.status !== task.status) {
      await this.taskHistoryRepository.save({
        task,
        oldStatus: task.status,
        newStatus: updateTaskDto.status,
        changeReason: updateTaskDto.changeReason || 'Updated by user',
      });
    }

    await this.taskRepository.update(id, updateTaskDto);
    return this.findOne(id);
  }

  async softDelete(id: string): Promise<void> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
  
    task.deletedAt = new Date(); 
    await this.taskRepository.save(task); 
  }

  async restore(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);

    task.deletedAt = undefined; 
    return await this.taskRepository.save(task);
  }
}
