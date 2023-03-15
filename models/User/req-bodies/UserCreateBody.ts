import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  Max,
  MaxLength,
  Min,
  MinLength,
  NotEquals,
} from 'class-validator'
import Model from 'models/Model'
import UserRole from 'models/User/enums/UserRole'

export default class UserCreateBody extends Model {
  @MinLength(2)
  @MaxLength(100)
  name: string

  @MinLength(1)
  @MaxLength(100)
  abbr: string

  @IsDateString()
  startDate: Date

  @IsInt()
  @Min(0)
  @Max(32767)
  hourlyRate: number

  @IsEnum(UserRole)
  @NotEquals(UserRole.SU)
  role: UserRole

  @IsEmail()
  email: string
}
