"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("./auth.service");
const auth_entity_1 = require("./entities/auth.entity");
const auth_controller_1 = require("./auth.controller");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const response_service_1 = require("../common/utils/response/response.service");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            auth_controller_1.AuthController
        ],
        providers: [
            auth_service_1.AuthService,
            response_service_1.ResponseService,
            jwt_strategy_1.JwtStrategy
        ],
        imports: [
            config_1.ConfigModule,
            typeorm_1.TypeOrmModule.forFeature([auth_entity_1.User]),
            passport_1.PassportModule.register({
                defaultStrategy: 'jwt'
            }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule, config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configServices) => {
                    return {
                        secret: configServices.get('JWT_SECRET'),
                        signOptions: { expiresIn: '30d' },
                    };
                }
            }),
        ],
        exports: [
            typeorm_1.TypeOrmModule,
            jwt_strategy_1.JwtStrategy,
            passport_1.PassportModule,
            jwt_1.JwtModule,
        ]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map