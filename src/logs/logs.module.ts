import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Log } from './entities/log.entity';
import { LogsService } from './logs.service';
import { AuthModule } from 'src/auth/auth.module';
import { LogsController } from './logs.controller';
import { ResponseService } from 'src/common/utils/response/response.service';

@Module({
  controllers : [
    LogsController
  ],
  providers   : [
    LogsService,
    ResponseService
  ],
  imports     : [
    TypeOrmModule.forFeature([Log]),
    AuthModule
  ],
  exports: [
    TypeOrmModule
  ]
})
export class LogsModule {}
