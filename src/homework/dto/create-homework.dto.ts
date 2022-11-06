import { IsBoolean, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreateHomeworkDto {

    @IsString()
    @IsOptional()
    fecha?:string;

    @IsString()
    @MinLength(5)
    @MaxLength(50)
    titulo:string;

    @IsString()
    @MinLength(5)
    @MaxLength(200)
    descripcion:string;
    
    @IsBoolean()
    @IsOptional()
    isActive?:boolean;

    @IsUUID()
    usuario:User;
}
