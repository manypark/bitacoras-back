import { Homework } from "src/homework/entities/homework.entity";
export declare class Log {
    id: string;
    fecha: string;
    concepto: string;
    titulo: string;
    descripcion: string;
    estado: string;
    coordenadas: [string, string];
    urlImage: string;
    tarea: Homework;
}
