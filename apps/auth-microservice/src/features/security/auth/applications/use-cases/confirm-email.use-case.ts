import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {TokensPair} from "../../types/auth-output.types";
import {
    ConfirmationEmailInputModel, EmailConfirmationCodeInputModel,
    LoginInputModel,
    ResetPasswordInputModel,
    SetNewPasswordInputModel
} from "../../api/input-models/auth.input-models";


export class ConfirmEmailCommand {
    public code: string

    constructor(inputModel: EmailConfirmationCodeInputModel) {
        this.code = inputModel.code
    }
}


@CommandHandler(ConfirmEmailCommand)
export class ConfirmEmailUseCase implements ICommandHandler<ConfirmEmailCommand> {

    constructor() {
    }

    async execute(command: ConfirmEmailCommand): Promise<boolean> {
        //TODO create use case
        return true
    }
}