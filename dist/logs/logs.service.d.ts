import { ResponseService } from 'src/common/utils/response/response.service';
import { DataSource, Repository } from 'typeorm';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { Log } from './entities/log.entity';
export declare class LogsService {
    private readonly logRepository;
    private readonly dataSource;
    private readonly responseServices;
    constructor(logRepository: Repository<Log>, dataSource: DataSource, responseServices: ResponseService);
    create(createLogDto: CreateLogDto): Promise<{
        statusCode: number;
        message: string;
        response: any;
    }>;
    findAll(): Promise<{
        statusCode: number;
        message: string;
        response: any;
    }>;
    findLogsByTareaId(idTarea: string): Promise<{
        statusCode: number;
        message: string;
        response: any;
    }>;
    update(idBitacora: string, updateLogDto: UpdateLogDto): Promise<{
        statusCode: number;
        message: string;
        response: any;
    }>;
    remove(idBitacora: string): Promise<{
        statusCode: number;
        message: string;
        response: any;
    }>;
}
