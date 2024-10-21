import { BaseDomainEntity } from 'apps/auth-microservice/src/modules-core/core/entities/baseDomainEntity'

export class User extends BaseDomainEntity {
  activeStatus: string
  confirmationStatus: boolean
  username: string
  email: string
  passwordHash: string
  passwordSalt: string
  confirmationCode: string
  recoveryCode: string | null
  constructor(email: string, passwordHash: string, passwordSalt: string, confirmationCode: string) {
    super()
    this.email = email
    this.passwordHash = passwordHash
    this.passwordSalt = passwordSalt
    this.confirmationCode = confirmationCode
  }
}
