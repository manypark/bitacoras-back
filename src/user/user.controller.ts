import { Controller, Get, Post, Body, Put, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService
  ) {}

  @Post()
  @Auth( ValidRoles.admin )
  create(@Body() createAuthDto : CreateUserDto ) {
    return this.userService.create( createAuthDto );
  }

  @Get()
  @Auth( ValidRoles.admin )
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Auth( ValidRoles.admin )
  findOne( @Param('id', ParseUUIDPipe ) id : string ) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @Auth( ValidRoles.admin )
  update( @Param('id', ParseUUIDPipe ) id: string, @Body() updateAuthDto : UpdateUserDto ) {
    return this.userService.update(id, updateAuthDto);
  }

  @Delete(':id')
  @Auth( ValidRoles.admin )
  remove( @Param( 'id', ParseUUIDPipe ) id : string ) {
    return this.userService.remove(id);
  }

}
