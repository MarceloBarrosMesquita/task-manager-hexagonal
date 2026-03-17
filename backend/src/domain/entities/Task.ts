// Define o formato (estrutura) de um objeto Task.
// Garante que toda tarefa tenha id, título, usuário, status de conclusão
// e data de criação, podendo ter opcionalmente uma descrição.
export interface Task {

 id: string
 title: string
 description?: string
 userId: string
 completed: boolean
 createdAt: Date

}