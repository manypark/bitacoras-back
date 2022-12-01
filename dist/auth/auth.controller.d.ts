import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto/index';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginUserDto: LoginUserDto): Promise<{
        statusCode: number;
        message: string;
        response: any;
    }>;
    create(createAuthDto: CreateUserDto): Promise<{
        statusCode: number;
        message: string;
        response: any;
    }>;
}
