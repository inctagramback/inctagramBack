import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {TokensPair} from "../../types/auth-output.types";


export class RefreshTokensCommand {
    refreshToken: string

    constructor(refreshToken: string) {
        this.refreshToken = refreshToken
    }
}


@CommandHandler(RefreshTokensCommand)
export class RefreshTokensUseCase implements ICommandHandler<RefreshTokensCommand> {

    constructor() {
    }

    async execute(command: RefreshTokensCommand): Promise<TokensPair> {
        //TODO create use case
        return {
            accessToken: "accessToken",
            refreshToken: "refreshToken"
        }
    }
}