import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { BaseEntity } from "./base.entity"

export enum Role {
    ADMIN = 'admin',
    VIEWER = 'viewer',
}

@Entity()
export class User extends BaseEntity{

    @Column()
    username: string

    @Column()
    password: string

    @Column({type: 'enum', default: Role.VIEWER, enum: Role})
    role: Role;
    
    constructor(user: Partial<User>) {
        super();
        Object.assign(this, user);
    }

}
