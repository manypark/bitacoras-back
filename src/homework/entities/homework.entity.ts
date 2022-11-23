
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { Log } from "src/logs/entities/log.entity";

@Entity()
export class Homework {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({
        type    : 'text',
        default : new Date().toLocaleString( 'es-MX', {
            year    : "numeric",
            month   : "2-digit",
            day     : "2-digit",
            hour    : 'numeric',
            minute  : 'numeric',
            hour12  : true,
    
        }),
    })
    fecha?:Date;

    @Column({
        type    : 'text',
    })
    titulo:string;

    @Column({
        type    : 'text',
    })
    descripcion:string;

    @Column({
        type    : 'int',
        default : 0
    })
    noBitacoras?:number;

    @Column({
        type    : 'bool',
        default : true
    })
    isActive:boolean;

    @Column({
        type    : 'uuid',
    })
    usuarioCreacion:string;

    @ManyToOne(
        () => User,
        ( user ) => user.homework,
        {
            eager : true
        }
    )
    usuario:User;

    @OneToMany(
        () => Log,
        ( Log ) => Log.tarea
    )
    log:Log;
}
