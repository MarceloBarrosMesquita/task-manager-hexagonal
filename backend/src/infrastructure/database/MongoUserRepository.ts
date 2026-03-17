import { UserRepository } from "../../application/ports/UserRepository"
import { User } from "../../domain/entities/User"
import UserModel from "../models/userModel"

// Implementação do repositório de usuários usando MongoDB.
// Segue o mesmo padrão do MongoTaskRepository.
export class MongoUserRepository implements UserRepository {

 // Converte documento Mongo para entidade de domínio
 private mapToUser(doc: any): User {
  return {
   id: doc._id.toString(),
   name: doc.name,
   email: doc.email,
   password: doc.password,
   createdAt: doc.createdAt
  }
 }

 // Cria um usuário
 async create(user: User): Promise<User> {

  const created = await UserModel.create(user)

  return this.mapToUser(created)

 }

 // Busca usuário pelo email (usado no login)
 async findByEmail(email: string): Promise<User | null> {

  const user = await UserModel.findOne({ email })

  if (!user) return null

  return this.mapToUser(user)

 }

 // Busca usuário pelo ID
 async findById(id: string): Promise<User | null> {

  const user = await UserModel.findById(id)

  if (!user) return null

  return this.mapToUser(user)

 }

}