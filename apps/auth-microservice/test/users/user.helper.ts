import { HttpStatus, INestApplication } from '@nestjs/common'
import { CreateUserCommand } from 'apps/auth-microservice/src/features/auth/domain/entity/auth.entity'
import { User } from 'apps/auth-microservice/src/features/users/domain/entity/user.entity'
import * as request from 'supertest'

const baseUrl = '/api/users'

export const endpoints = {
  createUser: () => `${baseUrl}/`,
  findUserById: (id: string) => `${baseUrl}/${id}`,
}

export class UserHelper {
  constructor(private app: INestApplication) {}
  async createUser(
    command: CreateUserCommand,
    config: {
      expectedBody?: any
      expectedCode?: number
    } = {}
  ): Promise<User> {
    const expectedCode = config.expectedCode ?? HttpStatus.CREATED

    const response = await request(this.app.getHttpServer())
      .post(endpoints.createUser())
      .send(command)

    expect(response).toBeOk(201)

    if (config.expectedCode === HttpStatus.CREATED) {
      const expectedCreatedUser = {
        id: expect.any(String),
        activeStatus: 'true',
        confirmationStatus: true,
        passwordResetCode: null,
        confirmationCode: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        createBy: expect.any(String),
        updateBy: expect.any(String),
        ...command,
      }

      const { body: createdUser } = response

      expect(createdUser).toEqual(expectedCreatedUser)
    }

    return response.body
  }

  async getUser(
    id: string,
    config: {
      expectedUser?: any
      expectedCode?: number
    } = {}
  ): Promise<User> {
    const response = await request(this.app.getHttpServer()).get(endpoints.findUserById(id))

    expect(response).toBeOk(200)

    if (config.expectedUser) {
      expect(response.body).toEqual(config.expectedUser)
    }

    return response.body
  }
}
