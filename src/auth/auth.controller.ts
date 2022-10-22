import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto/index';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService : AuthService
  ) {}

  @Post('login')
  login( @Body() loginUserDto : LoginUserDto ) {
    return this.authService.login( loginUserDto );
  }

  @Post('register')
  create( @Body() createAuthDto : CreateUserDto ) {
    return this.authService.create( createAuthDto );
  }

}
