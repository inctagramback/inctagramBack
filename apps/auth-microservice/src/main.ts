import { NestFactory } from '@nestjs/core'
import { AuthMicroserviceModule } from './auth-microservice.module'

async function bootstrap() {
  const app = await NestFactory.create(AuthMicroserviceModule)
  app.setGlobalPrefix('api')
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
