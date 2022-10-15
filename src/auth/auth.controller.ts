import { Controller, Get, Post, Body, Param, Delete, Put, ParseUUIDPipe } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto, UpdateAuthDto } from './dto/index';

@Controller('user')
export class AuthController {

  constructor(
    private readonly authService : AuthService
  ) {}

  @Post()
  create(@Body() createAuthDto : CreateUserDto ) {
    return this.authService.create( createAuthDto );
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne( @Param('id', ParseUUIDPipe ) id : string ) {
    return this.authService.findOne(id);
  }

  @Put(':id')
  update( @Param('id', ParseUUIDPipe ) id: string, @Body() updateAuthDto : UpdateAuthDto ) {
    return this.authService.update(id, updateAuthDto);
  }

  @Delete(':id')
  remove( @Param( 'id', ParseUUIDPipe ) id : string ) {
    return this.authService.remove(id);
  }

}
