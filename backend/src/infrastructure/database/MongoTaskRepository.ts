import { TaskRepository } from "../../application/ports/TaskRepository"
import { Task } from "../../domain/entities/Task"
import TaskModel from "../models/taskModel"

// Implementação do repositório usando MongoDB (Mongoose).
// Essa classe pertence à camada de infraestrutura e implementa
// o contrato definido em TaskRepository (Port da aplicação).
export class MongoTaskRepository implements TaskRepository {

 // Função auxiliar que converte o documento do MongoDB
 // para o formato da entidade de domínio (Task).
 // O Mongo usa "_id", enquanto o domínio usa "id".
 private mapToTask(doc: any): Task {
  return {
   id: doc._id.toString(), // converte _id do Mongo para id da entidade
   title: doc.title,
   description: doc.description,
   userId: doc.userId,
   completed: doc.completed,
   createdAt: doc.createdAt
  }
 }

 // Cria uma nova tarefa no banco de dados
 async create(task: Task): Promise<Task> {

  // Salva o documento no MongoDB
  const created = await TaskModel.create(task)

  // Converte o documento retornado para a entidade de domínio
  return this.mapToTask(created)
 }

 // Busca uma tarefa pelo ID
 async findById(id: string): Promise<Task | null> {

  // Procura no banco pelo _id
  const task = await TaskModel.findById(id)

  // Se não encontrar, retorna null
  if (!task) return null

  // Converte para entidade de domínio
  return this.mapToTask(task)
 }

 // Busca todas as tarefas de um usuário específico
 async findByUser(userId: string): Promise<Task[]> {

  // Consulta no Mongo todas as tarefas com o userId informado
  const tasks = await TaskModel.find({ userId })

  // Converte cada documento retornado em entidade de domínio
  return tasks.map(t => this.mapToTask(t))
 }

 // Remove uma tarefa do banco pelo ID
 async delete(id: string): Promise<void> {

  // No Mongo o campo é _id
  await TaskModel.deleteOne({ _id: id })
 }

 async createMany(tasks: Task[]): Promise<Task[]> {

    const created = await TaskModel.insertMany(tasks)

    return created.map(t => this.mapToTask(t))

    }

}
