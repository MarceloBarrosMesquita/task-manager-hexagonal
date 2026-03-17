import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { RegisterUserUseCase } from "../../../application/usecases/RegisterUserUseCase"
import { MongoUserRepository } from "../../../infrastructure/database/MongoUserRepository"
import { AppError } from "../../../domain/error/AppError"

export class AuthController {

  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body

      if (!name || !email || !password) {
        throw new AppError("Missing required fields", 400)
      }

      const repository = new MongoUserRepository()
      const useCase = new RegisterUserUseCase(repository)

      const user = await useCase.execute({
        name,
        email,
        password
      })

      return res.status(201).json({
        success: true,
        data: user
      })

    } catch (error: unknown) {

      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message
        })
      }

      console.error(error)

      return res.status(500).json({
        success: false,
        message: "Internal server error"
      })
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      
      if (!email || !password) {
        throw new AppError("Missing email or password", 400)
      }

      const repository = new MongoUserRepository()

      const user = await repository.findByEmail(email)

      if (!user) {
        throw new AppError("Invalid credentials", 401)
      }

      // ⚠️ IMPORTANTE: depois você troca por bcrypt.compare
      if (user.password !== password) {
        throw new AppError("Invalid credentials", 401)
      }

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "1h" }
      )

      return res.json({
        success: true,
        token
      })

    } catch (error: unknown) {

      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message
        })
      }

      console.error(error)

      return res.status(500).json({
        success: false,
        message: "Internal server error"
      })
    }
  }

}