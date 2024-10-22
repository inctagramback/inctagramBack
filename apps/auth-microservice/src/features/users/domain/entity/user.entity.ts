import { BaseDomainEntity } from 'apps/auth-microservice/src/modules-core/core/entities/baseDomainEntity'

export class User extends BaseDomainEntity {
  activeStatus: string
  confirmationStatus: boolean
  username: string
  passwordResetCode: string | null
  constructor(
    public email: string,
    public passwordHash: string,
    public passwordSalt: string,
    public confirmationCode: string
  ) {
    super()
    this.email = email
    this.passwordHash = passwordHash
    this.passwordSalt = passwordSalt
    this.confirmationCode = confirmationCode
  }
}
