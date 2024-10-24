import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {TokensPair} from "../../types/auth-output.types";
import {LoginInputModel, SetNewPasswordInputModel} from "../../api/input-models/auth.input-models";


export class SetNewPasswordCommand {
    public code: string
public password : string
    constructor(inputModel: SetNewPasswordInputModel) {
        this.code = inputModel.code
        this.password = inputModel.password
    }
}


@CommandHandler(SetNewPasswordCommand)
export class SetNewPasswordUseCase implements ICommandHandler<SetNewPasswordCommand> {

    constructor() {
    }

    async execute(command: SetNewPasswordCommand): Promise<boolean> {
        //TODO create use case
        return true
    }
}