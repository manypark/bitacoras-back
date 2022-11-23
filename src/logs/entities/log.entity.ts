import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Homework } from "src/homework/entities/homework.entity";

@Entity()
export class Log {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({
        type: 'text'
    })
    fecha:string;

    @Column({
        type: 'text'
    })
    concepto:string;

    @Column({
        type: 'text'
    })
    titulo:string;

    @Column({
        type: 'text'
    })
    descripcion:string;

    @Column({
        type    : 'text',
        default : 'Subida'
    })
    estado:string;

    @Column({
        type: 'simple-array',
    })
    coordenadas:[string, string];

    @Column({
        type: 'text'
    })
    urlImage : string;

    @ManyToOne(
        () => Homework,
        ( homework ) => homework.log,
        {
            eager : true
        }
    )
    tarea:Homework;

}
