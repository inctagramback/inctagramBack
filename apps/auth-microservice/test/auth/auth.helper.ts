import { HttpStatus, INestApplication } from '@nestjs/common'
import { CreateUserCommand } from 'apps/auth-microservice/src/features/auth/domain/entity/auth.entity'
import * as request from 'supertest'
import { ClientViewModel } from '../../src/features/clients/db/clients.query.repository'
import { ResultNotification } from '../../src/modules/core/validation/notification'



const baseUrlAuth = '/api/auth'

export const endpoints = {
  authRegistration: () => `${baseUrlAuth}/registration`,
  confirmationCodeResend: () => `${baseUrlAuth}/confirmation-code-resend`,
  emailConfirmation: () => `${baseUrlAuth}/email-confirmation`,
  resetPassword: () => `${baseUrlAuth}/reset-password`,
  setPassword: () => `${baseUrlAuth}/set-password`,
  login: () => `${baseUrlAuth}/login`,
  refreshToken: () => `${baseUrlAuth}/refresh-token`,
  logout: () => `${baseUrlAuth}/logout`,
}

export class UserHelper {
  constructor(private app: INestApplication) {}
  async registrationUser(
    command: CreateUserCommand,
    config: {
      expectedBody?: any
      expectedCode?: number
    } = {}
  ): Promise<ResultNotification<{ item: ClientViewModel }>> {
    const expectedCode = config.expectedCode ?? HttpStatus.CREATED

    const response = await request(this.app.getHttpServer())
      .post(endpoints.authRegistration())
      .send(command)

    expect(response).toBeOk(201)

    if (config.expectedCode === HttpStatus.CREATED) {
      const expectedCreatedUser = {
        id: expect.any(String),
        activeStatus: 'true',
        confirmationStatus: false,
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

  async getClient(
    id: string,
    config: {
      expectedUser?: any
      expectedCode?: number
    } = {}
  ) {
    const { body: client } = await request(this.app.getHttpServer())
      .get(endpoints.)
      .expect(config.expectedCode ?? 200)

    if (config.expectedClient) {
      expect(client).toEqual(config.expectedClient)
    }

    return client
  }

  async updateClient(
    id: string,
    updateCommand: any,
    config: {
      expectedCode?: number
    } = {}
  ) {
    const expectedCode = config.expectedCode ?? HttpStatus.NO_CONTENT
    // get client before update
    const clientBeforeUpdate = await this.getClient(id)

    const updateResponse: any = await request(this.app.getHttpServer())
      .patch(endpoints.updateOne(id))
      .send(updateCommand)
      .expect(expectedCode)

    if (expectedCode === HttpStatus.NO_CONTENT) {
      const clientAfterUpdate = await this.getClient(id)

      expect(clientAfterUpdate).toEqual({
        ...clientBeforeUpdate,
        ...updateCommand,
      })
    } else {
      const clientAfterNoUpdate = await this.getClient(id)

      expect(clientAfterNoUpdate).toEqual({
        ...clientBeforeUpdate,
      })
    }

    return updateResponse.body
  }
}
