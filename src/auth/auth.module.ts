import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AuthService } from './auth.service';
import { User } from './entities/auth.entity';
import { AuthController } from './auth.controller';
import { ResponseService } from 'src/common/utils/response/response.service';

@Module({
  controllers : [AuthController],
  providers   : [ 
    AuthService,
    ResponseService
  ],
  imports     : [
    ConfigModule,
    TypeOrmModule.forFeature([ User ]),
  ],
  exports     : [
    TypeOrmModule
  ]
})
export class AuthModule {}
