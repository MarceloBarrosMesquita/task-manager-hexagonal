import { TaskRepository } from "../ports/TaskRepository"
import { Task } from "../../domain/entities/Task"
import { randomUUID } from "crypto"

export class CreateTasksBulkUseCase {

 constructor(private repository: TaskRepository) {}

 async execute(
  userId: string,
  tasks: { title: string; description?: string }[]
 ): Promise<Task[]> {

  if (tasks.length > 1000) {
   throw new Error("Bulk limit exceeded (max 1000)")
  }
  

  const tasksToCreate: Task[] = tasks.map(task => ({
   id: randomUUID(),
   title: task.title,
   description: task.description,
   userId,
   completed: false,
   createdAt: new Date()
  }))

  return this.repository.createMany(tasksToCreate)
 }

}