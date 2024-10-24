import {
    BadRequestException,
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    InternalServerErrorException,
    Post,
    Req,
    Res,
    UnauthorizedException
} from '@nestjs/common'
import {
    ConfirmationEmailInputModel, EmailConfirmationCodeInputModel,
    LoginInputModel,
    RegistrationInputModel,
    ResetPasswordInputModel,
    SetNewPasswordInputModel
} from "./input-models/auth.input-models";
import {Request, Response} from 'express';
import {CommandBus} from "@nestjs/cqrs";
import {TokensPair} from "../types/auth-output.types";
import {RefreshTokensCommand} from "../applications/use-cases/refresh-tokens.use-case";
import {LogoutCommand} from "../applications/use-cases/logout.use-case";
import {LoginCommand} from "../applications/use-cases/login.use-case";
import {SetNewPasswordCommand} from "../applications/use-cases/set-new-password.use-case";
import {ResetPasswordCommand} from "../applications/use-cases/reset-password.use-case";
import {ConfirmEmailCommand} from "../applications/use-cases/confirm-email.use-case";
import {ResendEmailConfirmationCodeCommand} from "../applications/use-cases/resend-email-confirmation-code.use-case";
import {RegisterNewUserCommand} from "../applications/use-cases/register-new-user.use-case";
import {ApiBody, ApiProperty, ApiResponse} from "@nestjs/swagger";

class Error {
    @ApiProperty()
    code:number
    @ApiProperty()
    message: string
}

@Controller('auth')
export class AuthController {
    constructor(protected commandBus: CommandBus,) {
    }

    @Post('registration')
    @ApiResponse({ status: 204, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 400, description: 'Bad Request.', type:Error})
    @ApiBody({
        type: RegistrationInputModel,
        description: 'Json structure for user object',
    })
    @HttpCode(HttpStatus.NO_CONTENT)
    async registerNewUser(@Body() inputModel: RegistrationInputModel) {
        try {
            const registerNewUserCommand: RegisterNewUserCommand = new RegisterNewUserCommand(inputModel)
            await this.commandBus.execute(registerNewUserCommand);
            return
        } catch {
            throw new InternalServerErrorException();
        }
    }

    @Post('confirmation-code-resend')
    @HttpCode(HttpStatus.NO_CONTENT)
    async sendEmailConfirmationCode(@Body() inputModel: EmailConfirmationCodeInputModel) {
        try {
            const resendEmailConfirmationCodeCommand: ResendEmailConfirmationCodeCommand = new ResendEmailConfirmationCodeCommand(inputModel)
            await this.commandBus.execute(resendEmailConfirmationCodeCommand);
                return
        } catch {
            throw new InternalServerErrorException();
        }
    }

    @Post('email-confirmation')
    @HttpCode(HttpStatus.NO_CONTENT)
    async confirmEmail(@Body() inputModel: EmailConfirmationCodeInputModel) {
        try {
            const confirmEmailCommand: ConfirmEmailCommand = new ConfirmEmailCommand(inputModel)
            const isEmailConfirmed = await this.commandBus.execute(confirmEmailCommand);

            if (isEmailConfirmed) {
                return
            }
            throw new BadRequestException();
        } catch {
            throw new InternalServerErrorException();
        }
    }

    @Post('reset-password')
    @HttpCode(HttpStatus.NO_CONTENT)
    async sendPasswordResetCode(@Body() inputModel: ResetPasswordInputModel) {
        try {
            const resetPasswordCommand: ResetPasswordCommand = new ResetPasswordCommand(inputModel)
            await this.commandBus.execute(resetPasswordCommand);
            return
        } catch {
            throw new InternalServerErrorException();
        }
    }

    @Post('new-password')
    @HttpCode(HttpStatus.OK)
    async setNewPassword(@Body() inputModel: SetNewPasswordInputModel) {
        try {
            const setNewPasswordCommand: SetNewPasswordCommand = new SetNewPasswordCommand(inputModel)
            const isPasswordReset = await this.commandBus.execute(setNewPasswordCommand);

            if (isPasswordReset) {
                return
            }
        } catch {
            throw new InternalServerErrorException();
        }
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async loginUser(
        @Body() inputModel: LoginInputModel,
        @Res({passthrough: true}) res: Response) {
        try {
            const loginCommand: LoginCommand = new LoginCommand(inputModel)
            const tokens: TokensPair = await this.commandBus.execute(loginCommand);

            res.cookie('refreshToken', tokens.refreshToken, {httpOnly: true, secure: true,});

            return {accessToken: tokens.accessToken};
        } catch {
            throw new InternalServerErrorException();
        }
    }

    @Post('logout')
    @HttpCode(HttpStatus.NO_CONTENT)
    async logoutUser(@Req() req: Request,) {
        try {
            const logoutCommand: LogoutCommand = new LogoutCommand(req.cookies.refreshToken)
            const isLogoutSuccess: boolean = await this.commandBus.execute(logoutCommand);

            if (isLogoutSuccess) {
                return;
            } else {
                throw new UnauthorizedException();
            }
        } catch {
            throw new UnauthorizedException();
        }
    }

    @Post('refresh-tokens')
    @HttpCode(HttpStatus.OK)
    async refreshTokens(
        @Req() req: Request,
        @Res({passthrough: true}) res: Response) {
        try {
            const refreshTokenCommand: RefreshTokensCommand = new RefreshTokensCommand(req.cookies.refreshToken)
            const tokens: TokensPair = await this.commandBus.execute(refreshTokenCommand);

            res.cookie('refreshToken', tokens.refreshToken, {httpOnly: true, secure: true,});

            return {accessToken: tokens.accessToken};
        } catch {
            throw new UnauthorizedException();
        }
    }
}

