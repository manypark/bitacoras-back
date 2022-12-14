import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from "bcrypt";

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseService } from 'src/common/utils/response/response.service';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) 
    private readonly userRepository   : Repository<User>,
    private readonly responseServices : ResponseService,
    private readonly dataSource       : DataSource,
  ){}
  
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
  
    /**
     * It returns a list of users.
     * @returns A list of users
     */
    async findAll() {
  
      try {
  
        const users = await this.userRepository.find({
          cache : true,
          select: {
            apellido: true,
            correo  : true,
            nombre  : true,
            id      : true,
            role    : true
          }
        });
  
        return this.responseServices.responseSucces( 200, 'Lista de usuarios', users );
      } catch (error) {
  
        throw new BadRequestException("Hubo un error en la peticion");
      }
    }
  
  /**
   * It returns a user by id
   * @param {string} id - The id of the user you want to find.
   * @returns async findOne( id : string ) {
   */
    async findOne( id : string ) {
  
      try {
  
        const user = await this.userRepository.findOne( { where : { id },
          select: {
              apellido: true,
              correo  : true,
              nombre  : true,
              id      : true,
              role    : true
            }
          } 
        );
  
        if( !user ) return this.responseServices.responseSucces( 400, 'Usuario no encontrado', [] );
  
        return this.responseServices.responseSucces( 200, 'Lista usuario', user );
  
      } catch (error) {
  
        throw new BadRequestException("Hubo un error en la peticion");
      }
    }
  
    /**
     * We save the user, we commit the transaction,
     * and we return the user
     * @param {string} idUser - The user's id.
     * @param {UpdateUserDto} UpdateUserDto - UpdateUserDto
     * @returns User updated
     */
    async update( idUser : string , UpdateUserDto : UpdateUserDto ) {
  
      const user = await this.userRepository.preload( { id : idUser,  ...UpdateUserDto } );
  
      if( !user ) throw new NotFoundException(`User with id: ${idUser} not found`);
  
      // query runner
      const query = this.dataSource.createQueryRunner();
      //conexion a db
      await query.connect();
      //se empieza las transacciones
      await query.startTransaction();
      
      try {
        
        await query.manager.save( user );
  
        await query.commitTransaction();
  
        await query.release();
  
        return this.findOne( idUser );
  
      } catch (error) {
  
        await query.rollbackTransaction();
        await query.release();
        throw new BadRequestException("Hubo un error en la peticion");
      }
    }
  
    /**
     * It removes a user from the database.
     * @param {string} id - The id of the user to be deleted.
     * @returns return this.responseServices.responseSucces( 200, 'Usuario eliminado', user );
     */
    async remove( id : string ) {
  
      const user = await this.userRepository.find( {
            where : { 
              id 
            }, 
            select: {
              apellido: true,
              correo  : true,
              nombre  : true,
              id      : true,
              role    : true
            } 
          } 
        );
  
      if( user.length == 0 ) return this.responseServices.responseSucces( 400, 'Usuario no encontrado', [] );
  
      await this.userRepository.remove( user );
  
      return this.responseServices.responseSucces( 200, 'Usuario eliminado', user );
    }
}
