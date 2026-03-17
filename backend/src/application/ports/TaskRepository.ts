// Define o contrato do repositório de tarefas.
// Especifica quais operações de persistência podem ser feitas (criar, buscar e deletar tarefas),
// sem depender de qual banco de dados será utilizado.
import { Task } from "../../domain/entities/Task"

export interface TaskRepository {

 create(task: Task): Promise<Task>

 findById(id: string): Promise<Task | null>

 findByUser(userId: string): Promise<Task[]>

 delete(id: string): Promise<void>

 //cria até 1000 tarefas
 createMany(tasks: Task[]): Promise<Task[]>

}