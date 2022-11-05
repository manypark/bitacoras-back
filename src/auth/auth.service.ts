import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { User } from './entities/auth.entity';
import { CreateUserDto, LoginUserDto } from './dto/index';
import { ResponseService } from 'src/common/utils/response/response.service';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) 
    private readonly userRepository   : Repository<User>,
    private readonly responseServices : ResponseService,
    private readonly jwtService       : JwtService
  ){ }

  /**
   * We're using the loginUserDto to get the user's email and password, then we're using the
   * userRepository to find the user in the database, if the user doesn't exist we throw an
   * UnauthorizedException, if the user does exist we compare the password the user entered with the
   * password in the database, if they don't match we throw an UnauthorizedException, if they do match
   * we return a response with a token
   * @param {LoginUserDto} loginUserDto - LoginUserDto
   * @returns The token is being returned.
   */
  async login( loginUserDto: LoginUserDto ) {

    const { contrasena, correo } = loginUserDto;

    const user = await this.userRepository.findOne({ where : { correo } });

    if( !user) throw new UnauthorizedException("No se encontro este usuario");

    if( !bcrypt.compareSync( contrasena, user.contrasena ) ) throw new UnauthorizedException("Las credenciales no coinciden");

    delete user.contrasena;

    return this.responseServices.responseSucces( 200, 'Usuario ingresado correctamente', { ...user, token: this.getJwtoken({ id: user.id }) } );
  }

  private getJwtoken( payload: any ) : string  {
    const token = this.jwtService.sign( payload );
    return token;
  }

  /**
   * We create a new user with the data provided by the user, we encrypt the contrasena and save the user
   * in the database
   * @param {CreateUserDto} createUserDto - CreateUserDto
   * @returns The user data without the contrasena and role.
   */
  async create( createUserDto : CreateUserDto ) {

    try {

      const { contrasena , ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        contrasena: bcrypt.hashSync( contrasena, 6 )
      });

      await this.userRepository.save( user );

      delete user.role;
      delete user.contrasena;

      return this.responseServices.responseSucces( 201, 'Usuario creado correctamente', user );
    } catch (error) {      
      throw new BadRequestException( error.detail );
    }

  }

}
