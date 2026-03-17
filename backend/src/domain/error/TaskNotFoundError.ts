import { AppError } from "./AppError"

export class TaskNotFoundError extends AppError {
  constructor() {
    super("Task not found", 404)
  }
}