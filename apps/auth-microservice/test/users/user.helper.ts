import { INestApplication } from '@nestjs/common'
import { User } from 'apps/auth-microservice/src/features/users/domain/entity/user.entity'
import { UserTestService } from './user.testService'

const baseUrl = '/api/users'

export const expectedCreatedUser: User = {
  id: expect.any(String),
  activeStatus: 'true',
  confirmationStatus: true,
  passwordResetCode: null,
  confirmationCode: expect.any(String),
  confirmedAt: expect.any(Date),
  createdAt: expect.any(Date),
  updatedAt: expect.any(Date),
  createBy: expect.any(String),
  updateBy: expect.any(String),
  username: expect.any(String),
  email: expect.any(String),
  passwordHash: expect.any(String),
  passwordSalt: expect.any(String),
}

export const endpoints = {
  createUser: () => `${baseUrl}/`,
  findUserById: (id: string) => `${baseUrl}/${id}`,
}

export class ExpectedUser {}

export class UserHelper {
  constructor(
    private app: INestApplication,
    private userService: UserTestService
  ) {}
  async createUser(createUserData): Promise<User> {
    await this.userService.createUser(createUserData)

    const user = await this.userService.findUserByEmailOrUsername(createUserData.login)

    expect(user).toEqual(expectedCreatedUser)

    return user
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userService.findUserById(id)
    expect(user).toEqual(expectedCreatedUser)
    return user
  }

  async getUserByEmailOrUsername(emailOrLogin: string): Promise<User> {
    const user = await this.userService.findUserByEmailOrUsername(emailOrLogin)
    expect(user).toEqual(expectedCreatedUser)
    return user
  }
}
