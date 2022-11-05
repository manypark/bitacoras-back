import { Module } from '@nestjs/common';
import { HomeworkService } from './homework.service';
import { HomeworkController } from './homework.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Homework } from './entities/homework.entity';

@Module({
  controllers: [
    HomeworkController
  ],
  providers: [
    HomeworkService
  ],
  imports: [
    TypeOrmModule.forFeature([ Homework ]),
  ],
  exports: [
    TypeOrmModule
  ]
})
export class HomeworkModule {}
