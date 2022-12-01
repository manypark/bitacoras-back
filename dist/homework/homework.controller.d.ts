import { HomeworkService } from './homework.service';
import { User } from 'src/user/entities/user.entity';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
export declare class HomeworkController {
    private readonly homeworkService;
    constructor(homeworkService: HomeworkService);
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
