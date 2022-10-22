import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { ResponseService } from 'src/common/utils/response/response.service';

@Module({
  controllers : [
    UserController
  ],
  providers   : [
    UserService,
    ResponseService
  ],
  imports     : [
    ConfigModule,
    TypeOrmModule.forFeature([ User ]),
  ]
})
export class UserModule {}
