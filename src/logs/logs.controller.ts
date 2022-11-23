import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, Put } from '@nestjs/common';

import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('logs')
export class LogsController {

  constructor( private readonly logsService : LogsService ) {}

  @Post()
  @Auth()
  create( @Body() createLogDto : CreateLogDto ) {
    return this.logsService.create(createLogDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.logsService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne( @Param('id', ParseUUIDPipe ) idTarea : string ) {
    return this.logsService.findLogsByTareaId( idTarea );
  }

  @Put(':id')
  @Auth()
  update(@Param('id', ParseUUIDPipe ) idBitacora : string, @Body() updateLogDto: UpdateLogDto) {
    return this.logsService.update( idBitacora, updateLogDto );
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id', ParseUUIDPipe ) idBitacora : string ) {
    return this.logsService.remove( idBitacora );
  }
}
