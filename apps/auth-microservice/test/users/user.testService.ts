import { UserRepository } from 'apps/auth-microservice/src/features/users/db/users.repository'

export class UserTestService {
  constructor(private userRepository: UserRepository) {}

  async createUser(userCreateData) {
    await this.userRepository.save(userCreateData)
    return
  }

  async findUserById(id: string) {
    const user = await this.userRepository.getById(id)
    return user
  }

  async findUserByEmailOrUsername(EmailOrUsername: string) {
    const user = await this.userRepository.getUserByEmailOrUserName(EmailOrUsername)
    return user
  }
}
