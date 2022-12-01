import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
export declare class LogsController {
    private readonly logsService;
    constructor(logsService: LogsService);
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
    findOne(idTarea: string): Promise<{
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
