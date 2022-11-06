import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/user/entities/user.entity';
import { Homework } from './entities/homework.entity';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import { ResponseService } from 'src/common/utils/response/response.service';

@Injectable()
export class HomeworkService {

  constructor(
    @InjectRepository(Homework)
    private readonly homeworkRepository : Repository<Homework>,
    private readonly dataSource         : DataSource,
    private readonly responseServices   : ResponseService,
  ){ }

  async create( createHomeworkDto : CreateHomeworkDto, user : User ) {

    try {

      const { titulo, descripcion, fecha } = createHomeworkDto;

      const homework = this.homeworkRepository.create({
        titulo,
        descripcion,
        fecha,
        usuarioCreacion : user.id,
        usuario         : createHomeworkDto.usuario
      });

      delete homework.usuario.contrasena;

      await this.homeworkRepository.save(homework);

      return this.responseServices.responseSucces( 201, 'Tarea creada correctamente', homework );
      
    } catch (error) {
      throw new BadRequestException( error.detail );
    }
  }

  async findAll() {
    const homework = await this.homeworkRepository.find();
    return this.responseServices.responseSucces( 200, 'Tareas cargadas correctamente', homework );
  }

  async findHomeworksByUser( idUser : string ) {

    const homework = await this.homeworkRepository.find({
      where: { usuario: { id : idUser }, isActive: true },
      loadEagerRelations: false
    });

    if( homework.length == 0  ) return this.responseServices.responseSucces( 400, 'No se encontraron tareas aún', homework );

    return this.responseServices.responseSucces( 200, 'Tareas cargadas correctamente', homework );
  }

  async update( idHomework : string, updateHomeworkDto : UpdateHomeworkDto ) {

    const homework = await this.homeworkRepository.preload({ id : idHomework ,...updateHomeworkDto });

    if( !homework ) throw new NotFoundException(`Tarea con id: ${idHomework} no encontrado`);

    // query runner
    const query = this.dataSource.createQueryRunner();
    //conexion a db
    await query.connect();
    //se empieza las transacciones
    await query.startTransaction();

    try {
      await query.manager.save( homework );

      await query.commitTransaction();
      await query.release();

      return this.responseServices.responseSucces( 200, 'Tarea modificada correctamente', homework );
    } catch (error) {

      await query.rollbackTransaction();
      await query.release();

      return this.responseServices.responseSucces( 400, 'Hubo algun problema al modificar la tarea', homework );
    }
  }

  async remove( idHomework : string ) {

    const homework = await this.homeworkRepository.findOne({ where: { id : idHomework }, loadEagerRelations: false } );

    if( !homework ) return this.responseServices.responseSucces( 400, 'Tarea no encontrada', [] );

    await this.homeworkRepository.remove( homework );
    
    return this.responseServices.responseSucces( 200, 'Tarea eliminada correctamente', homework );
  }
}
