import {CommandBus, CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {TokensPair} from "../../types/auth-output.types";
import {
    ConfirmationEmailInputModel, EmailConfirmationCodeInputModel,
    LoginInputModel,
    ResetPasswordInputModel,
    SetNewPasswordInputModel
} from "../../api/input-models/auth.input-models";
import {EmailConfirmationCodeCommand} from "./email-confirmation-code.use-case";


export class ResendEmailConfirmationCodeCommand {
    public code: string

    constructor(inputModel:EmailConfirmationCodeInputModel) {
        this.code = inputModel.code
    }
}


@CommandHandler(ResendEmailConfirmationCodeCommand)
export class ResendEmailConfirmationCodeUseCase implements ICommandHandler<ResendEmailConfirmationCodeCommand> {

    constructor(protected commandBus: CommandBus,) {
    }

    async execute(command: ResendEmailConfirmationCodeCommand): Promise<boolean> {
        //TODO create use case
        const email = "email from JWT confirmation code"
        await this.commandBus.execute<EmailConfirmationCodeCommand>(new EmailConfirmationCodeCommand(email))
        return true
    }
}