import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, Put } from '@nestjs/common';
import { HomeworkService } from './homework.service';

import { User } from 'src/user/entities/user.entity';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorators';

@Controller('homework')
export class HomeworkController {
  constructor(private readonly homeworkService: HomeworkService) {}

  @Post()
  @Auth()
  create(
    @Body()     createHomeworkDto : CreateHomeworkDto,
    @GetUser()  user              : User,
  ) {
    return this.homeworkService.create( createHomeworkDto, user );
  }

  @Get()
  @Auth()
  findAll() {
    return this.homeworkService.findAll();
  }

  @Get(':id')
  @Auth()
  findHomeworksByUser(@Param('id', ParseUUIDPipe ) idUser: string  ) {
    return this.homeworkService.findHomeworksByUser( idUser );
  }

  @Put(':id')
  @Auth()
  update(@Param('id') idHomework: string, @Body() updateHomeworkDto: UpdateHomeworkDto) {
    return this.homeworkService.update( idHomework, updateHomeworkDto );
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') idHomework: string) {
    return this.homeworkService.remove(idHomework);
  }
}