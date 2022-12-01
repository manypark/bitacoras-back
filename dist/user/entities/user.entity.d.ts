import { Homework } from "src/homework/entities/homework.entity";
export declare class User {
    id: string;
    nombre: string;
    apellido: string;
    correo: string;
    contrasena: string;
    role: string[];
    homework: Homework;
}
