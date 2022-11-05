import { BadRequestException, Injectable } from '@nestjs/common';
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

      const { titulo, descripcion, fecha, usuarioCreacion = user.id } = createHomeworkDto;

      const homework = this.homeworkRepository.create({
        titulo,
        descripcion,
        fecha,
        usuarioCreacion,
        usuario: user
      });

      delete homework.usuario.contrasena;

      await this.homeworkRepository.save(homework);

      return this.responseServices.responseSucces( 201, 'Tarea creada correctamente', homework );
      
    } catch (error) {
      throw new BadRequestException( error.detail );
    }
  }

  findAll() {
    return `This action returns all homework`;
  }

  findOne(id: number) {
    return `This action returns a #${id} homework`;
  }

  update(id: number, updateHomeworkDto: UpdateHomeworkDto) {
    return `This action updates a #${id} homework`;
  }

  remove(id: number) {
    return `This action removes a #${id} homework`;
  }
}
