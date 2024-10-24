import {Module} from "@nestjs/common";
import {AuthController} from "./auth/api/auth.controller";
import {CqrsModule} from "@nestjs/cqrs";


@Module({
  imports: [CqrsModule],
  controllers: [AuthController],
  providers: [],
  exports: [],
})
export class SecurityModule {}
