import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseService } from 'src/common/utils/response/response.service';
import { DataSource, Repository } from 'typeorm';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { Log } from './entities/log.entity';

@Injectable()
export class LogsService {

  constructor(
    @InjectRepository(Log)
    private readonly logRepository      : Repository<Log>,
    private readonly dataSource         : DataSource,
    private readonly responseServices   : ResponseService,
  ){}

  async create( createLogDto : CreateLogDto ) {

    try {

      const { tareaId } = createLogDto;
      delete createLogDto.estado;

      const log = this.logRepository.create({
        ...createLogDto,
        tarea: tareaId
      });

      await this.logRepository.save(log);

      return this.responseServices.responseSucces( 201, 'Bitacora guardada correctamente', log );
      
    } catch (error) {
      throw new BadRequestException( error.detail );
    }
  }

  async findAll() {
    
    try {

      const logs = await this.logRepository.find({ loadRelationIds: true });

      if( logs.length == 0  ) return this.responseServices.responseSucces( 400, 'No se encontraron bitacoras aún', logs );

      return this.responseServices.responseSucces( 200, 'Todas las bitacoras', logs );
    } catch (error) {
      throw new BadRequestException( error.detail );
    }
  }

  async findLogsByTareaId( idTarea : string ) {

    try {
      const logs = await this.logRepository.find({ 
        where: {
          tarea: { id: idTarea },
        },
        loadRelationIds: true
      });

      if( logs.length == 0  ) return this.responseServices.responseSucces( 400, 'No se encontraron bitacoras aún', logs );

      return this.responseServices.responseSucces( 201, 'Bitacoras cargadas correctamente', logs );
    } catch (error) {
      throw new BadRequestException( error.detail );
    }
  }

  async update( idBitacora : string, updateLogDto : UpdateLogDto ) {

    const log = await this.logRepository.preload({ id : idBitacora , ...updateLogDto });

    if( !log ) throw new NotFoundException(`Bitacora con id: ${idBitacora} no encontrada`);

    //query runner
    const query = this.dataSource.createQueryRunner();
    //conexion a db
    await query.connect();
    //se empieza las transacciones
    await query.startTransaction();

    try {

      await query.manager.save(log);
      await query.commitTransaction();
      await query.release();

      return this.responseServices.responseSucces( 200, 'Bitacora modificada correctamente', log );
    } catch (error) {

      await query.rollbackTransaction();
      await query.release();

      return this.responseServices.responseSucces( 400, 'Hubo algun problema al modificar la bitacora', log );

    }
  }

  async remove( idBitacora : string ) {

    const log = await this.logRepository.findOne({ where: { id : idBitacora }, loadEagerRelations: false } );

    if( !log ) return this.responseServices.responseSucces( 400, 'Bitacora no encontrada', [] );

    await this.logRepository.remove( log );
    
    return this.responseServices.responseSucces( 200, 'Bitacora eliminada correctamente', log );
  }

}
