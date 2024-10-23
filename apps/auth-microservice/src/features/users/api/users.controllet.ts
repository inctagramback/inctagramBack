import { Body, Controller, Post, Req, Res } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { UserRepository } from '../../users/db/users.repository'
import { User } from '../../users/domain/entity/user.entity'
import { CreateUserCommand } from '../domain/entity/auth.entity'

@Controller('users')
export class AuthController {
  constructor(
    private userRepository: UserRepository,
    private readonly commandBus: CommandBus
  ) {}

  @Post('')
  async createUserWithConfirm(
    @Req() req: Request,
    @Body() body: CreateUserCommand,
    @Res() res: Response
  ): Promise<User[]> {
    const user = this.commandBus.execute(CreateUserCommand)
    const result = await this.userRepository.getMany({ email: '1' })
    return result
  }
}
