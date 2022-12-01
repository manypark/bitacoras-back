import { User } from "src/user/entities/user.entity";
import { Log } from "src/logs/entities/log.entity";
export declare class Homework {
    id: string;
    fecha?: Date;
    titulo: string;
    descripcion: string;
    noBitacoras?: number;
    isActive: boolean;
    usuarioCreacion: string;
    usuario: User;
    log: Log;
}
