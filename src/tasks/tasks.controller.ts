// src/tasks/tasks.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,                
    @Query('limit') limit: number = 10,              
    @Query('sortBy') sortBy: keyof Task = 'createdAt',  
    @Query('order') order: 'ASC' | 'DESC' = 'DESC',  
    @Query('status') status?: string,                
    @Query('searchQuery') searchQuery?: string      
  ): Promise<{ tasks: Task[]; total: number }> {
    return this.tasksService.findAll(page, limit, sortBy, order, status, searchQuery);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Patch(':id/soft-delete')
  async softDelete(@Param('id') id: string) {
    return this.tasksService.softDelete(id);
  }

  @Patch(':id/restore')
  async restore(@Param('id') id: string) {
    return this.tasksService.restore(id);
  }
}
