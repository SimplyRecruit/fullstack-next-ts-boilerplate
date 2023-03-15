import { UserRole, UserStatus } from 'models'
import { Column, Entity, Index, ManyToOne } from 'typeorm'
import EntityBase from '~/EntityBase'
import OrganizationEntity from '~/resources/Organization/Entity'

@Entity('user')
@Index(['abbr', 'organization'], { unique: true })
export default class UserEntity extends EntityBase {
  @Column()
  name: string

  @Column()
  abbr: string

  @Column({ unique: true })
  email: string

  @Column({ nullable: true, select: false })
  passwordHash: string

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.END_USER,
  })
  role: UserRole

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.PENDING,
  })
  status: UserStatus

  @Column({ type: 'timestamptz' })
  startDate: Date

  @Column({ type: 'int2' })
  hourlyRate: number

  @Column({ default: true })
  active: boolean

  @ManyToOne(() => OrganizationEntity, { onDelete: 'CASCADE' })
  organization: OrganizationEntity
}
