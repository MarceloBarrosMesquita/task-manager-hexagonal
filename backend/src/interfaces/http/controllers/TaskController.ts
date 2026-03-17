import { Request, Response } from "express"
import { CreateTaskUseCase } from "../../../application/usecases/CreateTaskUseCase"
import { CreateTasksBulkUseCase } from "../../../application/usecases/CreateTasksBulkUseCase"
import { GetTasksByUserUseCase } from "../../../application/usecases/GetTasksByUserUseCase"
import { createTaskSchema } from "../schemas/taskSchema"
import { AppError } from "../../../domain/error/AppError"
import { ZodError } from "zod"

export class TaskController {

  constructor(
    private createTaskUseCase: CreateTaskUseCase,
    private createTasksBulkUseCase: CreateTasksBulkUseCase,
    private getTasksByUserUseCase: GetTasksByUserUseCase
  ) {}

  async create(req: Request, res: Response) {
    try {

      const parsed = createTaskSchema.parse(req.body)

      const userId = (req as any).user?.id
      if (!userId) {
        throw new AppError("Unauthorized", 401)
      }

      const task = await this.createTaskUseCase.execute({
        title: parsed.title,
        description: parsed.description,
        userId
      })

      return res.status(201).json({
        success: true,
        data: task
      })

    } catch (error: unknown) {

      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.issues
        })
      }

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

  async createBulk(req: Request, res: Response) {
    try {

      const userId = (req as any).user?.id
      if (!userId) {
        throw new AppError("Unauthorized", 401)
      }

      const tasks = req.body

      if (!Array.isArray(tasks)) {
        throw new AppError("Tasks must be an array", 400)
      }

      const result = await this.createTasksBulkUseCase.execute(userId, tasks)

      return res.status(201).json({
        success: true,
        data: result
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

  async getByUser(req: Request, res: Response) {
    try {

      const userId = (req as any).user?.id
      if (!userId) {
        throw new AppError("Unauthorized", 401)
      }

      const tasks = await this.getTasksByUserUseCase.execute(userId)

      return res.json({
        success: true,
        data: tasks
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