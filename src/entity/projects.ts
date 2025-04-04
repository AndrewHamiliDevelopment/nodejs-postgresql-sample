import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export class Projects extends BaseEntity{
    @Column()
    name: string;
    @Column({type: 'text'})
    description: string;

    constructor(projects: Partial<Projects>) {
        super();
        Object.assign(this, projects);
    }

}