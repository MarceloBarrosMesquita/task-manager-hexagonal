import mongoose from "mongoose"

// Criação do Schema da coleção "Task" no MongoDB.
// O Schema define a estrutura e as regras dos documentos que serão salvos.
const TaskSchema = new mongoose.Schema({

 // Título da tarefa
 // Campo obrigatório do tipo String
 title: {
  type: String,
  required: true
 },

 // Descrição da tarefa
 // Campo opcional
 description: {
  type: String
 },

 // ID do usuário dono da tarefa
 // Obrigatório para saber a qual usuário a tarefa pertence
 userId: {
  type: String,
  required: true
 },

 // Indica se a tarefa foi concluída ou não
 // Por padrão começa como false
 completed: {
  type: Boolean,
  default: false
 },

 // Data de criação da tarefa
 // Caso não seja informada, o MongoDB usa automaticamente a data atual
 createdAt: {
  type: Date,
  default: Date.now
 }

})

// Exporta o Model "Task".
// O Model é a interface que usamos para interagir com o MongoDB
// (criar, buscar, atualizar e deletar tarefas).
export default mongoose.model("Task", TaskSchema)
