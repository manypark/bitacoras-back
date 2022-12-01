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
exports.HomeworkController = void 0;
const common_1 = require("@nestjs/common");
const homework_service_1 = require("./homework.service");
const user_entity_1 = require("../user/entities/user.entity");
const create_homework_dto_1 = require("./dto/create-homework.dto");
const update_homework_dto_1 = require("./dto/update-homework.dto");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const get_user_decorators_1 = require("../auth/decorators/get-user.decorators");
let HomeworkController = class HomeworkController {
    constructor(homeworkService) {
        this.homeworkService = homeworkService;
    }
    create(createHomeworkDto, user) {
        return this.homeworkService.create(createHomeworkDto, user);
    }
    findAll() {
        return this.homeworkService.findAll();
    }
    findHomeworksByUser(idUser) {
        return this.homeworkService.findHomeworksByUser(idUser);
    }
    update(idHomework, updateHomeworkDto) {
        return this.homeworkService.update(idHomework, updateHomeworkDto);
    }
    remove(idHomework) {
        return this.homeworkService.remove(idHomework);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_homework_dto_1.CreateHomeworkDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], HomeworkController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, auth_decorator_1.Auth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomeworkController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HomeworkController.prototype, "findHomeworksByUser", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_homework_dto_1.UpdateHomeworkDto]),
    __metadata("design:returntype", void 0)
], HomeworkController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HomeworkController.prototype, "remove", null);
HomeworkController = __decorate([
    (0, common_1.Controller)('homework'),
    __metadata("design:paramtypes", [homework_service_1.HomeworkService])
], HomeworkController);
exports.HomeworkController = HomeworkController;
//# sourceMappingURL=homework.controller.js.map