"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./entities/task.entity");
const task_history_entity_1 = require("./entities/task-history.entity");
let TasksService = class TasksService {
    taskRepository;
    taskHistoryRepository;
    constructor(taskRepository, taskHistoryRepository) {
        this.taskRepository = taskRepository;
        this.taskHistoryRepository = taskHistoryRepository;
    }
    async create(createTaskDto) {
        const task = this.taskRepository.create(createTaskDto);
        return await this.taskRepository.save(task);
    }
    async findAll(page = 1, limit = 10, sortBy = 'createdAt', order = 'DESC', status, searchQuery) {
        const where = {};
        if (status) {
            where.status = status;
        }
        if (searchQuery) {
            where.title = (0, typeorm_2.Like)(`%${searchQuery}%`);
            where.description = (0, typeorm_2.Like)(`%${searchQuery}%`);
        }
        const queryBuilder = this.taskRepository.createQueryBuilder('task')
            .leftJoinAndSelect('task.history', 'history');
        if (status) {
            queryBuilder.andWhere('task.status = :status', { status });
        }
        if (searchQuery) {
            queryBuilder.andWhere(new typeorm_2.Brackets(qb => {
                qb.where('task.title LIKE :searchQuery', { searchQuery: `%${searchQuery}%` })
                    .orWhere('task.description LIKE :searchQuery', { searchQuery: `%${searchQuery}%` });
            }));
        }
        const [tasks, total] = await queryBuilder
            .orderBy(`task.${sortBy}`, order)
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        return { tasks, total };
    }
    async findOne(id) {
        const task = await this.taskRepository.findOne({
            where: {},
            relations: ['history'],
        });
        if (!task)
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        return task;
    }
    async update(id, updateTaskDto) {
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
    async softDelete(id) {
        const task = await this.taskRepository.findOne({ where: { id } });
        if (!task)
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        task.deletedAt = new Date();
        await this.taskRepository.save(task);
    }
    async restore(id) {
        const task = await this.taskRepository.findOne({ where: { id } });
        if (!task)
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        task.deletedAt = undefined;
        return await this.taskRepository.save(task);
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __param(1, (0, typeorm_1.InjectRepository)(task_history_entity_1.TaskHistory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TasksService);
//# sourceMappingURL=tasks.service.js.map