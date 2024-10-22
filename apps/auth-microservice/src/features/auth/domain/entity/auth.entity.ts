export class CreateUserCommand {
  constructor(
    public email: string,
    public userName: string,
    public password: string
  ) {
    this.email = email
    this.userName = userName
    this.password = password
  }
}
