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
exports.Log = void 0;
const typeorm_1 = require("typeorm");
const homework_entity_1 = require("../../homework/entities/homework.entity");
let Log = class Log {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Log.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text'
    }),
    __metadata("design:type", String)
], Log.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text'
    }),
    __metadata("design:type", String)
], Log.prototype, "concepto", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text'
    }),
    __metadata("design:type", String)
], Log.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text'
    }),
    __metadata("design:type", String)
], Log.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        default: 'Subida'
    }),
    __metadata("design:type", String)
], Log.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'simple-array',
    }),
    __metadata("design:type", Array)
], Log.prototype, "coordenadas", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text'
    }),
    __metadata("design:type", String)
], Log.prototype, "urlImage", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => homework_entity_1.Homework, (homework) => homework.log, {
        eager: true
    }),
    __metadata("design:type", homework_entity_1.Homework)
], Log.prototype, "tarea", void 0);
Log = __decorate([
    (0, typeorm_1.Entity)()
], Log);
exports.Log = Log;
//# sourceMappingURL=log.entity.js.map