import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findAll() {
    return this.homeworkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homeworkService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHomeworkDto: UpdateHomeworkDto) {
    return this.homeworkService.update(+id, updateHomeworkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.homeworkService.remove(+id);
  }
}