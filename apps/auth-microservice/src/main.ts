import { NestFactory } from '@nestjs/core'
import { AuthMicroserviceModule } from './auth-microservice.module'
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AuthMicroserviceModule)
  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
      .setTitle('Inctagram')
      .setDescription('Inctagram API description')
      .setVersion('1.0')
      .addTag('Inctagram')
      .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
