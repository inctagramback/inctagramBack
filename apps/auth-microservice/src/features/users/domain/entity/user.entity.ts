import { BaseDomainEntity } from 'apps/auth-microservice/src/modules-core/core/entities/baseDomainEntity'
import { providers } from './providers'
import { SystemData } from './systemData'

export class User extends BaseDomainEntity {
  active: string
  SystemData: SystemData
  providers: providers
}
