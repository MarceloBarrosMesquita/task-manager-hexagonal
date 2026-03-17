import { UserRepository } from "../ports/UserRepository"
import jwt from "jsonwebtoken"
import { InvalidCredentialsError } from "../../domain/error/InvalidCredentialsError"


export class LoginUseCase {

 constructor(private userRepository: UserRepository) {}

 async execute(email: string, password: string) {

  const user = await this.userRepository.findByEmail(email)

  if (!user || user.password !== password) {
    throw new InvalidCredentialsError()
  }

  const token = jwt.sign(
   { id: user.id },
   process.env.JWT_SECRET || "secret",
   { expiresIn: "1h" }
  )

  return { token }

 }

}