import { DataSource, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Homework } from './entities/homework.entity';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import { ResponseService } from 'src/common/utils/response/response.service';
export declare class HomeworkService {
    private readonly homeworkRepository;
    private readonly dataSource;
    private readonly responseServices;
    constructor(homeworkRepository: Repository<Homework>, dataSource: DataSource, responseServices: ResponseService);
    create(createHomeworkDto: CreateHomeworkDto, user: User): Promise<{
        statusCode: number;
        message: string;
        response: any;
    }>;
    findAll(): Promise<{
        statusCode: number;
        message: string;
        response: any;
    }>;
    findHomeworksByUser(idUser: string): Promise<{
        statusCode: number;
        message: string;
        response: any;
    }>;
    update(idHomework: string, updateHomeworkDto: UpdateHomeworkDto): Promise<{
        statusCode: number;
        message: string;
        response: any;
    }>;
    remove(idHomework: string): Promise<{
        statusCode: number;
        message: string;
        response: any;
    }>;
}
