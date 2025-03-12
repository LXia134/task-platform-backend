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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskHistory = void 0;
const typeorm_1 = require("typeorm");
const task_entity_1 = require("./task.entity");
let TaskHistory = class TaskHistory {
    id;
    task;
    oldStatus;
    newStatus;
    changeReason;
    changedAt;
};
exports.TaskHistory = TaskHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TaskHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => task_entity_1.Task, (task) => task.history, { onDelete: 'CASCADE' }),
    __metadata("design:type", task_entity_1.Task)
], TaskHistory.prototype, "task", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: task_entity_1.TaskStatus, enumName: 'task_status_enum' }),
    __metadata("design:type", String)
], TaskHistory.prototype, "oldStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: task_entity_1.TaskStatus, enumName: 'task_status_enum' }),
    __metadata("design:type", String)
], TaskHistory.prototype, "newStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], TaskHistory.prototype, "changeReason", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TaskHistory.prototype, "changedAt", void 0);
exports.TaskHistory = TaskHistory = __decorate([
    (0, typeorm_1.Entity)()
], TaskHistory);
//# sourceMappingURL=task-history.entity.js.map