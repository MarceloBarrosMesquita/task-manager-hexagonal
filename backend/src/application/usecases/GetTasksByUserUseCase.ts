import { TaskRepository } from "../ports/TaskRepository"
import { Task } from "../../domain/entities/Task"

export class GetTasksByUserUseCase {
  constructor(private repository: TaskRepository) {}

  async execute(userId: string): Promise<Task[]> {
    
    return this.repository.findByUser(userId) 
  }
}