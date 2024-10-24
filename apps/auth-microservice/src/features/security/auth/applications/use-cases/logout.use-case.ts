import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {TokensPair} from "../../types/auth-output.types";


export class LogoutCommand {
    refreshToken: string

    constructor(refreshToken: string) {
        this.refreshToken = refreshToken
    }
}


@CommandHandler(LogoutCommand)
export class LogoutCommandUseCase implements ICommandHandler<LogoutCommand> {

    constructor() {
    }

    async execute(command: LogoutCommand): Promise<boolean> {
        //TODO create use case
        return true
    }
}