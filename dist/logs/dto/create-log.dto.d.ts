import { Homework } from "src/homework/entities/homework.entity";
export declare class CreateLogDto {
    fecha: string;
    concepto: string;
    titulo: string;
    descripcion: string;
    estado: string;
    coordenadas: [string, string];
    urlImage: string;
    tareaId: Homework;
}
