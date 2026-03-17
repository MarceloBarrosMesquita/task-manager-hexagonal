import { Router } from "express"
import { TaskController } from "../controllers/TaskController"
import { MongoTaskRepository } from "../../../infrastructure/database/MongoTaskRepository"
import { CreateTaskUseCase } from "../../../application/usecases/CreateTaskUseCase"
import { CreateTasksBulkUseCase } from "../../../application/usecases/CreateTasksBulkUseCase"
import { authMiddleware } from "../middlewares/authMiddleware"
import { GetTasksByUserUseCase } from "../../../application/usecases/GetTasksByUserUseCase"
const router = Router()

const repository = new MongoTaskRepository()

const createTaskUseCase = new CreateTaskUseCase(repository)
const createTasksBulkUseCase = new CreateTasksBulkUseCase(repository)
const getTasksByUserUseCase = new GetTasksByUserUseCase(repository)

const controller = new TaskController(
 createTaskUseCase,
 createTasksBulkUseCase,
 getTasksByUserUseCase
)

router.get("/tasks",authMiddleware,controller.getByUser.bind(controller))
router.post("/tasks",authMiddleware, controller.create.bind(controller))
router.post("/tasks/bulk",authMiddleware, controller.createBulk.bind(controller))

export default router