
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from 'typeorm';


@Entity()
export class Department {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable : false, type : 'varchar'})
    name: string;

    @CreateDateColumn({ type: 'varchar', length: 140, unique : true, nullable: false })
    created: Date;


    constructor(department: Partial <Department>){
        Object.assign(this, department)
    }
}
