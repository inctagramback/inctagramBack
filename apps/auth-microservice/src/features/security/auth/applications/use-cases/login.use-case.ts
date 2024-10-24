import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {TokensPair} from "../../types/auth-output.types";
import {LoginInputModel} from "../../api/input-models/auth.input-models";


export class LoginCommand {
    public email: string
    public password: string

    constructor(loginInputModel: LoginInputModel) {
        this.email = loginInputModel.email
        this.password = loginInputModel.password
    }
}


@CommandHandler(LoginCommand)
export class LogoutCommandUseCase implements ICommandHandler<LoginCommand> {

    constructor() {
    }

    async execute(command: LoginCommand): Promise<TokensPair> {
        //TODO create use case
        return {
            accessToken: "accessToken",
            refreshToken: "refreshToken"
        }
    }
}