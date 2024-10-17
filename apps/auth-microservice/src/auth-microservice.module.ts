import { Module } from '@nestjs/common';
import { AuthMicroserviceController } from './auth-microservice.controller';
import { AuthMicroserviceService } from './auth-microservice.service';

@Module({
  imports: [],
  controllers: [AuthMicroserviceController],
  providers: [AuthMicroserviceService],
})
export class AuthMicroserviceModule {}
