import { Controller, Get, Post, Body, Put, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService
  ) {}

  
  @Post()
  create(@Body() createAuthDto : CreateUserDto ) {
    return this.userService.create( createAuthDto );
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne( @Param('id', ParseUUIDPipe ) id : string ) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update( @Param('id', ParseUUIDPipe ) id: string, @Body() updateAuthDto : UpdateUserDto ) {
    return this.userService.update(id, updateAuthDto);
  }

  @Delete(':id')
  remove( @Param( 'id', ParseUUIDPipe ) id : string ) {
    return this.userService.remove(id);
  }

}
