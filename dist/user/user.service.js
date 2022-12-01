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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./entities/user.entity");
const response_service_1 = require("../common/utils/response/response.service");
let UserService = class UserService {
    constructor(userRepository, responseServices, dataSource) {
        this.userRepository = userRepository;
        this.responseServices = responseServices;
        this.dataSource = dataSource;
    }
    async create(createUserDto) {
        try {
            const { contrasena } = createUserDto, userData = __rest(createUserDto, ["contrasena"]);
            const user = this.userRepository.create(Object.assign(Object.assign({}, userData), { contrasena: bcrypt.hashSync(contrasena, 6) }));
            await this.userRepository.save(user);
            delete user.role;
            delete user.contrasena;
            return this.responseServices.responseSucces(201, 'Usuario creado correctamente', user);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.detail);
        }
    }
    async findAll() {
        try {
            const users = await this.userRepository.find({
                cache: true,
                select: {
                    apellido: true,
                    correo: true,
                    nombre: true,
                    id: true,
                    role: true
                }
            });
            return this.responseServices.responseSucces(200, 'Lista de usuarios', users);
        }
        catch (error) {
            throw new common_1.BadRequestException("Hubo un error en la peticion");
        }
    }
    async findOne(id) {
        try {
            const user = await this.userRepository.findOne({ where: { id },
                select: {
                    apellido: true,
                    correo: true,
                    nombre: true,
                    id: true,
                    role: true
                }
            });
            if (!user)
                return this.responseServices.responseSucces(400, 'Usuario no encontrado', []);
            return this.responseServices.responseSucces(200, 'Lista usuario', user);
        }
        catch (error) {
            throw new common_1.BadRequestException("Hubo un error en la peticion");
        }
    }
    async update(idUser, UpdateUserDto) {
        const user = await this.userRepository.preload(Object.assign({ id: idUser }, UpdateUserDto));
        if (!user)
            throw new common_1.NotFoundException(`User with id: ${idUser} not found`);
        const query = this.dataSource.createQueryRunner();
        await query.connect();
        await query.startTransaction();
        try {
            await query.manager.save(user);
            await query.commitTransaction();
            await query.release();
            return this.findOne(idUser);
        }
        catch (error) {
            await query.rollbackTransaction();
            await query.release();
            throw new common_1.BadRequestException("Hubo un error en la peticion");
        }
    }
    async remove(id) {
        const user = await this.userRepository.find({
            where: {
                id
            },
            select: {
                apellido: true,
                correo: true,
                nombre: true,
                id: true,
                role: true
            }
        });
        if (user.length == 0)
            return this.responseServices.responseSucces(400, 'Usuario no encontrado', []);
        await this.userRepository.remove(user);
        return this.responseServices.responseSucces(200, 'Usuario eliminado', user);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        response_service_1.ResponseService,
        typeorm_2.DataSource])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map