import {CommandBus, CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {RegistrationInputModel} from "../../api/input-models/auth.input-models";
import {EmailConfirmationCodeCommand} from "./email-confirmation-code.use-case";


export class RegisterNewUserCommand {
    public username: string
    public email: string
    public password: string

    constructor(inputModel: RegistrationInputModel) {
        this.email = inputModel.email
        this.username = inputModel.username
        this.password = inputModel.password
    }
}


@CommandHandler(RegisterNewUserCommand)
export class RegisterNewUserUseCase implements ICommandHandler<RegisterNewUserCommand> {

    constructor(protected commandBus: CommandBus,) {
    }
    async execute(command: RegisterNewUserCommand) {
        //TODO create use case
        await this.commandBus.execute<EmailConfirmationCodeCommand>(new EmailConfirmationCodeCommand(command.email))
        return true
    }
}