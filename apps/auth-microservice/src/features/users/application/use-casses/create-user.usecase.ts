/* import { CommandHandler } from '@nestjs/cqrs'
import { CreateUserCommand } from '../../../auth/domain/entity/auth.entity'
import { UserRepository } from '../../db/users.repository'
import { User } from '../../domain/entity/user.entity'

@CommandHandler(CreateUserCommand)
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  protected async onExecute(command: CreateUserCommand): Promise<> {
    const user = new User()
  }
}
 */
