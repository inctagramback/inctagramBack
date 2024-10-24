import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { useContainer } from 'class-validator'
import * as cookieParser from 'cookie-parser'
import { createWriteStream } from 'fs'
import { get } from 'http'

import { AuthMicroserviceModule } from '../auth-microservice.module'
import {
  ErrorExceptionFilter,
  ValidationExceptionFilter,
} from '../modules-core/config/exeption.filter'

export function setGlobalPrefix(app) {
  app.setGlobalPrefix('api')
}

export function setCookieParser(app) {
  app.use(cookieParser())
}

export function setCors(app) {
  app.enableCors()
}

export function setGlobalFilters(app) {
  app.useGlobalFilters(new ErrorExceptionFilter(), new ValidationExceptionFilter())
}

export function setDependencyInjection(app) {
  useContainer(app.select(AuthMicroserviceModule), {
    fallbackOnErrors: true,
  })
}

export function setSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('products')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)
}

export function downloadSwaggerFiles(serverUrl) {
  get(`${serverUrl}/swagger/swagger-ui-bundle.js`, function (response) {
    response.pipe(createWriteStream('swagger-static/swagger-ui-bundle.js'))
  })

  get(`${serverUrl}/swagger/swagger-ui-init.js`, function (response) {
    response.pipe(createWriteStream('swagger-static/swagger-ui-init.js'))
  })

  get(`${serverUrl}/swagger/swagger-ui-standalone-preset.js`, function (response) {
    response.pipe(createWriteStream('swagger-static/swagger-ui-standalone-preset.js'))
  })

  get(`${serverUrl}/swagger/swagger-ui.css`, function (response) {
    response.pipe(createWriteStream('swagger-static/swagger-ui.css'))
  })
}