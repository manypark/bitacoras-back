import { IsArray, IsString, IsUUID } from "class-validator";
import { Homework } from "src/homework/entities/homework.entity";

export class CreateLogDto {

    @IsString()
    fecha:string;

    @IsString()
    concepto:string;

    @IsString()
    titulo:string;

    @IsString()
    descripcion:string;

    @IsString()
    estado:string;

    @IsString({each: true})
    @IsArray()
    coordenadas:[ string, string ];

    @IsString()
    urlImage:string;

    @IsUUID()
    tareaId:Homework;
}
