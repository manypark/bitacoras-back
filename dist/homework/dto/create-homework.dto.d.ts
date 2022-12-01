import { User } from "src/user/entities/user.entity";
export declare class CreateHomeworkDto {
    fecha?: string;
    titulo: string;
    descripcion: string;
    isActive?: boolean;
    usuario: User;
}
