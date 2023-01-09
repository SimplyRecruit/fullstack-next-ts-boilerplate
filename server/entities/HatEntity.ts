import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinColumn, OneToOne } from "typeorm"
import PersonEntity from "./PersonEntity"

@Entity()
export default class extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    color!: string

    @OneToOne(() => PersonEntity, (person) => person.hat)
    person!: PersonEntity
}