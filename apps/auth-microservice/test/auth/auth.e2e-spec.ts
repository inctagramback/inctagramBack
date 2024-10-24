import { HttpStatus, INestApplication } from '@nestjs/common'
import { TestingModule } from '@nestjs/testing'
import { CreateUserCommand } from 'apps/auth-microservice/src/features/auth/domain/entity/auth.entity'
import { UserRepository } from 'apps/auth-microservice/src/features/users/db/users.repository'
import * as request from 'supertest'
import { UserHelper } from '../users/user.helper'
import { createConfirmedUser1Data } from '../users/user.testData'
import { UserTestService } from '../users/user.testService'
import { aDescribe } from '../utils/aDescribe'
import { skipSettings } from '../utils/skip-settings'
import { getAppAndCleanDB, StartTestObject } from '../utils/test.utils'
import { AuthHelper, endpoints } from './auth.helper'
import { user1RegistrationCommand } from './auth.testData'

aDescribe(skipSettings.for('authTests'))('Auth - /Auth (e2e)', () => {
  let startTestObject: StartTestObject
  let app: INestApplication
  let testingAppModule: TestingModule
  let userHelper: UserHelper
  let authHelper: AuthHelper

  beforeAll(async () => {
    startTestObject = await getAppAndCleanDB()
    app = startTestObject.app
    testingAppModule = startTestObject.testingAppModule
    const userRepository = await testingAppModule.resolve(UserRepository) // user repo for creating userTest service and userHelper
    const userService = new UserTestService(userRepository)
    userHelper = new UserHelper(app, userService)
    authHelper = new AuthHelper(app)
  })

  afterAll(async () => {
    await app.close()
  })

  it('/api/auth/registration (POST) Should register user1 and return status code 204 ]', async () => {
    const user = await authHelper.registrationUser(user1RegistrationCommand)
    return
  })

  it('/api/auth/registration (POST) Should return error with incorrect input model and status code 400 ]', async () => {
    const response = request(app.getHttpServer())
      .post(endpoints.authRegistration())
      .send(new CreateUserCommand('dzerdevwarndE@gmail.com', 'dzerdev!', 'qwerty123'))

    expect(response).toBeNotOk(HttpStatus.BAD_REQUEST)
  })

  it('/api/auth/registration (POST) Should return error username is already exist and status code 400 ]', async () => {
    const registrationCommand = user1RegistrationCommand
    registrationCommand.email = registrationCommand.email + 'z'
    const response = request(app.getHttpServer())
      .post(endpoints.authRegistration())
      .send(registrationCommand)

    expect(response).toBeNotOk(HttpStatus.BAD_REQUEST)
  })

  it('/api/auth/registration (POST) Should update user data with already email exist and status code 204 ]', async () => {
    const registrationCommand = user1RegistrationCommand
    registrationCommand.userName = registrationCommand.userName + 'z'
    const response = request(app.getHttpServer())
      .post(endpoints.authRegistration())
      .send(registrationCommand)

    expect(response).toBeNotOk(HttpStatus.CREATED)

    const user = await userHelper.getUserByEmailOrUsername(registrationCommand.userName)
    expect(user).toBeNull()
  })

  it('/api/auth/registration (POST) Should return error email already exist, if email is confirmed and status code 400 ]', async () => {
    await userHelper.createUser(createConfirmedUser1Data)

    const registrationCommand = user1RegistrationCommand
    registrationCommand.userName = registrationCommand.userName + 'z'
    const response = request(app.getHttpServer())
      .post(endpoints.authRegistration())
      .send(registrationCommand)

    expect(response).toBeNotOk(HttpStatus.BAD_REQUEST)
  })
  //cofirmation
  it('/api/auth/confirmation-code-resend (POST) Should return error if model is incorrect and return status code 400 ]', async () => {
    const response = request(app.getHttpServer())
      .post(endpoints.confirmationCodeResend())
      .send({ email: '1' })
  })

  it('/api/auth/confirmation-code-resend (POST) Should return error if user is not exist and return status code 400 ]', async () => {
    const response = request(app.getHttpServer())
      .post(endpoints.confirmationCodeResend())
      .send({ email: 'dzerdevwarnd9999@gmail.com' })
  })
})
/////////
