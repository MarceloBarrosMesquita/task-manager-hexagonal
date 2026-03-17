import { TaskRepository } from "../ports/TaskRepository"
import { Task } from "../../domain/entities/Task"
import { randomUUID } from "crypto"

// Use Case responsável por criar uma nova tarefa no sistema.
// Ele recebe os dados da tarefa, gera um ID único e envia para o repositório salvar.
export class CreateTaskUseCase {

 // Injeção de dependência do repositório.
 // O UseCase não sabe qual banco será usado (MongoDB, MySQL, etc).
 constructor(private repository: TaskRepository) {}

 // Método principal que executa o caso de uso de criação de tarefa
 async execute(data: {
  title: string
  description?: string // descrição é opcional
  userId: string
 }): Promise<Task> {

  // Monta o objeto da tarefa seguindo a estrutura da entidade Task
  const task: Task = {

   // Gera um identificador único para a tarefa
   id: randomUUID(),

   // Dados recebidos da requisição
   title: data.title,
   description: data.description,
   userId: data.userId,

   // Nova tarefa sempre começa como não concluída
   completed: false,

   // Define a data de criação da tarefa
   createdAt: new Date()

  }
  

  // Chama o repositório para salvar a tarefa no banco de dados
  return this.repository.create(task)

 }

}
