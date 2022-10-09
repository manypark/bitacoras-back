import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/auth.entity';

@Module({
  controllers : [AuthController],
  providers   : [AuthService],
  imports     : [
    ConfigModule,
    TypeOrmModule.forFeature([ User ]),
  ],
  exports     : [
    TypeOrmModule
  ]
})
export class AuthModule {}
