import { AppError } from "./AppError"

export class InvalidCredentialsError extends AppError {
  constructor() {
    super("Email ou senha inválidos", 401)
  }
}