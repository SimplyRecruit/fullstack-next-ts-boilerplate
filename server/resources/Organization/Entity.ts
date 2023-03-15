import { Column, Entity, OneToMany } from 'typeorm'
import EntityBase from '~/EntityBase'
import UserEntity from '~/resources/User/Entity'

@Entity('organization')
export default class OrganizationEntity extends EntityBase {
  @Column()
  name: string

  @OneToMany(() => UserEntity, user => user.organization)
  users: UserEntity[]
}
