import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({
        type: 'text',
    })
    nombre:string;

    @Column({
        type: 'text',
    })
    apellido:string;

    @Column({
        type    : 'text',
        unique  : true
    })
    correo:string;

    @Column({
        type    : 'text',
        unique  : true
    })
    contrasena:string;

    @Column( 'text', {
        array   : true,
        default : [ 'admin' ]
    })
    role:string[];
    
}
