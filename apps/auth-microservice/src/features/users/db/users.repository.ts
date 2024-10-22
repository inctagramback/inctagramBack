import { Injectable } from '@nestjs/common'
import { BaseRepository } from 'apps/auth-microservice/src/modules-core/core/db/base.repository'
import { PrismaService } from 'libs/service/prisma.Service'
import { User } from '../domain/entity/user.entity'
//
@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.user)
  }
  async getUserByEmailOrUserName(emailOrUserName: string): Promise<User> {
    return await this.prismaClient.findUnique({
      where: {
        OR: [{ email: emailOrUserName }, { userName: emailOrUserName }],
      },
    })
  }

  async getUserByConfirmationCode(confirmationCode: string): Promise<User> {
    return await this.prismaClient.findUnique({ where: { confirmationCode: confirmationCode } })
  }

  async getUserByRecoveryCode(passwordResetCode: string): Promise<User> {
    return await this.prismaClient.findUnique({ where: { passwordResetCode: passwordResetCode } })
  }
}
