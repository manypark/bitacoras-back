import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { HomeworkService } from './homework.service';
import { HomeworkController } from './homework.controller';
import { ResponseService } from 'src/common/utils/response/response.service';
import { Homework } from './entities/homework.entity';

@Module({
  controllers: [
    HomeworkController
  ],
  providers: [
    HomeworkService,
    ResponseService
  ],
  imports: [
    TypeOrmModule.forFeature([ Homework ]),
    AuthModule
  ],
  exports: [
    TypeOrmModule
  ]
})
export class HomeworkModule {}
