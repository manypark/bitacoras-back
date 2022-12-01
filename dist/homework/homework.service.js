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
exports.HomeworkService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const homework_entity_1 = require("./entities/homework.entity");
const response_service_1 = require("../common/utils/response/response.service");
let HomeworkService = class HomeworkService {
    constructor(homeworkRepository, dataSource, responseServices) {
        this.homeworkRepository = homeworkRepository;
        this.dataSource = dataSource;
        this.responseServices = responseServices;
    }
    async create(createHomeworkDto, user) {
        try {
            const { titulo, descripcion, fecha } = createHomeworkDto;
            const homework = this.homeworkRepository.create({
                titulo,
                descripcion,
                fecha,
                usuarioCreacion: user.id,
                usuario: createHomeworkDto.usuario
            });
            delete homework.usuario.contrasena;
            await this.homeworkRepository.save(homework);
            return this.responseServices.responseSucces(201, 'Tarea creada correctamente', homework);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.detail);
        }
    }
    async findAll() {
        const homework = await this.homeworkRepository.find();
        return this.responseServices.responseSucces(200, 'Tareas cargadas correctamente', homework);
    }
    async findHomeworksByUser(idUser) {
        const homework = await this.homeworkRepository.find({
            where: { usuario: { id: idUser }, isActive: true },
            loadEagerRelations: false
        });
        if (homework.length == 0)
            return this.responseServices.responseSucces(400, 'No se encontraron tareas aún', homework);
        return this.responseServices.responseSucces(200, 'Tareas cargadas correctamente', homework);
    }
    async update(idHomework, updateHomeworkDto) {
        const homework = await this.homeworkRepository.preload(Object.assign({ id: idHomework }, updateHomeworkDto));
        if (!homework)
            throw new common_1.NotFoundException(`Tarea con id: ${idHomework} no encontrado`);
        const query = this.dataSource.createQueryRunner();
        await query.connect();
        await query.startTransaction();
        try {
            await query.manager.save(homework);
            await query.commitTransaction();
            await query.release();
            return this.responseServices.responseSucces(200, 'Tarea modificada correctamente', homework);
        }
        catch (error) {
            await query.rollbackTransaction();
            await query.release();
            return this.responseServices.responseSucces(400, 'Hubo algun problema al modificar la tarea', homework);
        }
    }
    async remove(idHomework) {
        const homework = await this.homeworkRepository.findOne({ where: { id: idHomework }, loadEagerRelations: false });
        if (!homework)
            return this.responseServices.responseSucces(400, 'Tarea no encontrada', []);
        await this.homeworkRepository.remove(homework);
        return this.responseServices.responseSucces(200, 'Tarea eliminada correctamente', homework);
    }
};
HomeworkService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(homework_entity_1.Homework)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.DataSource,
        response_service_1.ResponseService])
], HomeworkService);
exports.HomeworkService = HomeworkService;
//# sourceMappingURL=homework.service.js.map