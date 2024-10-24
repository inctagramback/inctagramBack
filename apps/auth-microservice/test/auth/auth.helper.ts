import { HttpStatus, INestApplication } from '@nestjs/common'
import { CreateUserCommand } from 'apps/auth-microservice/src/features/auth/domain/entity/auth.entity'
import * as request from 'supertest'

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

export class AuthHelper {
  constructor(private app: INestApplication) {}
  async registrationUser(
    command: CreateUserCommand,
    config: {
      expectedBody?: any
      expectedCode?: number
    } = {}
  ): Promise<ResultNotification<{ item: ClientViewModel }>> {
    // изменить Promise
    const expectedCode = config.expectedCode ?? HttpStatus.CREATED

    const response = await request(this.app.getHttpServer())
      .post(endpoints.authRegistration())
      .send(command)

    expect(response).toBeOk(expectedCode)

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

      const { body: registratedUser } = response

      expect(registratedUser).toEqual(expectedCreatedUser)
    }

    return response.body
  }

  async loginUser(
    command: CreateUserCommand,
    config: {
      expectedCode?: number
    } = {}
  ) {
    // изменить Promise
    const expectedCode = config.expectedCode ?? HttpStatus.OK
    const response = await request(this.app.getHttpServer()).post(endpoints.login()).send(command)

    expect(response).toBeOk(expectedCode)

    const accessToken = response.body.accessToken

    // Извлекаем cookie с refresh token
    const cookies = response.headers['set-cookie']

    // Поиск cookie с именем "refreshToken" (замените на реальное имя, если оно другое)
    const refreshTokenCookie = response.headers['set-cookie'][0]

    // Извлекаем значение refresh token
    const refreshToken = refreshTokenCookie.split(';')[0].split('=')[1]

    return { accessToken: accessToken, refreshToken: refreshToken }
  }
}
