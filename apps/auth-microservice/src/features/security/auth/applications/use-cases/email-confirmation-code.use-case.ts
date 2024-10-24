import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {TokensPair} from "../../types/auth-output.types";
import {
    ConfirmationEmailInputModel,
    LoginInputModel,
    ResetPasswordInputModel,
    SetNewPasswordInputModel
} from "../../api/input-models/auth.input-models";


export class EmailConfirmationCodeCommand {
    public email: string

    constructor(email:string) {
        this.email = email
    }
}


@CommandHandler(EmailConfirmationCodeCommand)
export class EmailConfirmationCodeUseCase implements ICommandHandler<EmailConfirmationCodeCommand> {

    constructor() {
    }

    async execute(command: EmailConfirmationCodeCommand): Promise<boolean> {
        //TODO create use case - create confirmationCode => record to DB: code, expiration time => send email
        return true
    }
}