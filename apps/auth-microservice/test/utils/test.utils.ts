import { INestApplication } from '@nestjs/common'
import { Test, TestingModuleBuilder } from '@nestjs/testing'
import { AuthMicroserviceModule } from 'apps/auth-microservice/src/auth-microservice.module'
import { applyAppSettings } from 'apps/auth-microservice/src/settings/apply-app-settings'
import { PrismaService } from 'libs/service/prisma.Service'
import { dropSqlDataBase } from './dropSqlDataBase'

export const getAppAndCleanDB = async (
  //передаем callback, который получает ModuleBuilder, если хотим изменить настройку тестового модуля
  addSettingsToModuleBuilder?: (moduleBuilder: TestingModuleBuilder) => void
) => {
  try {
    const testingModuleBuilder: TestingModuleBuilder = Test.createTestingModule({
      imports: [AuthMicroserviceModule],
    })
    /*       .overrideProvider(UsersService)
      .useValue(UserServiceMockObject);
 */
    if (addSettingsToModuleBuilder) {
      addSettingsToModuleBuilder(testingModuleBuilder)
    }

    const testingAppModule = await testingModuleBuilder.compile()
    const app: INestApplication = testingAppModule.createNestApplication()
    await applyAppSettings(app)
    await app.init()

    const prisma = new PrismaService()
    await dropSqlDataBase(prisma)

    /*     const databaseConnection = app.get<Connection>(getConnectionToken()); */
    const httpServer = app.getHttpServer()

    return {
      app,
      /*       databaseConnection, */
      testingAppModule,
      httpServer,
    }
  } catch (error) {
    console.error('Error in getAppAndCleanDB:', error)
    throw error
  }
}
