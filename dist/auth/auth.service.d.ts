import { Repository } from 'typeorm';
import { JwtService } from "@nestjs/jwt";
import { User } from './entities/auth.entity';
import { CreateUserDto, LoginUserDto } from './dto/index';
import { ResponseService } from 'src/common/utils/response/response.service';
export declare class AuthService {
    private readonly userRepository;
    private readonly responseServices;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, responseServices: ResponseService, jwtService: JwtService);
    login(loginUserDto: LoginUserDto): Promise<{
        statusCode: number;
        message: string;
        response: any;
    }>;
    private getJwtoken;
    create(createUserDto: CreateUserDto): Promise<{
        statusCode: number;
        message: string;
        response: any;
    }>;
}
