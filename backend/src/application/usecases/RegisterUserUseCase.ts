import { UserRepository } from "../ports/UserRepository"
import { User } from "../../domain/entities/User"
import { randomUUID } from "crypto"
import { TaskNotFoundError } from "../../domain/error/TaskNotFoundError"

export class RegisterUserUseCase {

 constructor(private userRepository: UserRepository) {}

 async execute(data: {

  name: string
  email: string
  password: string

 }): Promise<User> {

  const user: User = {

   id: randomUUID(),
   name: data.name,
   email: data.email,
   password: data.password,
   createdAt: new Date()

  }

  return this.userRepository.create(user)

 }

}