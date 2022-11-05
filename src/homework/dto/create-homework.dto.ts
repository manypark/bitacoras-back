import { IsBoolean, IsDate, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateHomeworkDto {

    @IsDate()
    @IsOptional()
    fecha?:Date;

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
}
