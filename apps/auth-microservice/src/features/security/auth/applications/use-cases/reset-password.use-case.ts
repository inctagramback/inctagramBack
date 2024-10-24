import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {TokensPair} from "../../types/auth-output.types";
import {LoginInputModel, ResetPasswordInputModel, SetNewPasswordInputModel} from "../../api/input-models/auth.input-models";


export class ResetPasswordCommand {
    public email: string

    constructor(inputModel: ResetPasswordInputModel) {
        this.email = inputModel.email
    }
}


@CommandHandler(ResetPasswordCommand)
export class ResetPasswordUseCase implements ICommandHandler<ResetPasswordCommand> {

    constructor() {
    }

    async execute(command: ResetPasswordCommand): Promise<boolean> {
        //TODO create use case
        return true
    }
}