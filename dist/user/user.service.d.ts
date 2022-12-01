import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseService } from 'src/common/utils/response/response.service';
export declare class UserService {
    private readonly userRepository;
    private readonly responseServices;
    private readonly dataSource;
    constructor(userRepository: Repository<User>, responseServices: ResponseService, dataSource: DataSource);
    create(createUserDto: CreateUserDto): Promise<{
        statusCode: number;
        message: string;
        response: any;
    }>;
    findAll(): Promise<{
        statusCode: number;
        message: string;
        response: any;
    }>;
    findOne(id: string): Promise<{
        statusCode: number;
        message: string;
        response: any;
    }>;
    update(idUser: string, UpdateUserDto: UpdateUserDto): Promise<{
        statusCode: number;
        message: string;
        response: any;
    }>;
    remove(id: string): Promise<{
        statusCode: number;
        message: string;
        response: any;
    }>;
}
