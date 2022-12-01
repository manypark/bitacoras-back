import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createAuthDto: CreateUserDto): Promise<{
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
    update(id: string, updateAuthDto: UpdateUserDto): Promise<{
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
