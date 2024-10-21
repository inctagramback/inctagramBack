import { Module } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { PrismaService } from 'libs/service/prisma.Service'
import { AuthController } from './features/auth/api/auth.controller'
import { UserRepository } from './features/users/db/users.repository'

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [UserRepository, PrismaService, CommandBus],
})
export class AuthMicroserviceModule {}
