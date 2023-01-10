import UserRole from "../../models/UserRole"
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToOne } from "typeorm"
import EntityBase from "./EntityBase"

@Entity("user")
export class UserEntity extends EntityBase {

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    passwordHash: string

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.EMPLOYEE
    })
    role: UserRole

}