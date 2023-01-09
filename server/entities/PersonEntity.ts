import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToOne } from "typeorm"
import HatEntity from "./HatEntity"

@Entity()
export default class extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    surname!: string

    @OneToOne(() => HatEntity, (hat) => hat.person)
    @JoinColumn()
    hat!: HatEntity
}