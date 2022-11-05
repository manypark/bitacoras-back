
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Homework {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({
        type    : 'date',
        default : new Date(),
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
    usuario:User
}
