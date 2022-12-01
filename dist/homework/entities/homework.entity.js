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
exports.Homework = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
const log_entity_1 = require("../../logs/entities/log.entity");
let Homework = class Homework {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Homework.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        default: new Date().toLocaleString('es-MX', {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        }),
    }),
    __metadata("design:type", Date)
], Homework.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
    }),
    __metadata("design:type", String)
], Homework.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
    }),
    __metadata("design:type", String)
], Homework.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], Homework.prototype, "noBitacoras", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bool',
        default: true
    }),
    __metadata("design:type", Boolean)
], Homework.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'uuid',
    }),
    __metadata("design:type", String)
], Homework.prototype, "usuarioCreacion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.homework, {
        eager: true
    }),
    __metadata("design:type", user_entity_1.User)
], Homework.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => log_entity_1.Log, (Log) => Log.tarea),
    __metadata("design:type", log_entity_1.Log)
], Homework.prototype, "log", void 0);
Homework = __decorate([
    (0, typeorm_1.Entity)()
], Homework);
exports.Homework = Homework;
//# sourceMappingURL=homework.entity.js.map