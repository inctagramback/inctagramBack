import { CreateUserCommand } from 'apps/auth-microservice/src/features/auth/domain/entity/auth.entity'

export const user1CreateCommand = new CreateUserCommand(
  'dzerdevwarnd@gmail.com',
  'dzerdev',
  'qwerty'
)

let user1AccessToken: string
let user1RefreshToken: string
let user3AccessToken: string
let user3RefreshToken: string
let user3InvalidRefreshToken: string
let confirmationCode: string

const createUser1InputData = {
  login: 'warnd',
  password: '123321',
  email: 'dzerdevwarnd@gmail.com',
}

const user1ViewData = {
  id: expect.any(String),
  login: 'warnd',
  email: 'dzerdevwarnd@gmail.com',
  createdAt: expect.any(Date),
}
let createdUser1Id: string

const createUser2InputData = {
  login: 'dzerdev',
  password: 'qwerty',
  email: 'dzerdevwarnd1@gmail.com',
}

const user2ViewData = {
  id: expect.any(String),
  login: 'dzerdev',
  email: 'dzerdevwarnd1@gmail.com',
  createdAt: expect.any(Date),
}
let createdUser2Id: string

const registrationUser3InputData = {
  login: 'string',
  password: 'zk1O61ah-g',
  email: 'dzerdevwarnd2@gmail.com',
}
