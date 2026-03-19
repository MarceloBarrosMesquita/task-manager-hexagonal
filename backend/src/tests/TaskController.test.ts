import { TaskController } from "../interfaces/http/controllers/TaskController"

describe("TaskController", () => {

 let mockCreateTaskUseCase: any
 let mockBulkUseCase: any
 let mockGetTasksByUserUseCase: any
 let controller: TaskController

 beforeEach(() => {

  jest.spyOn(console, "error").mockImplementation(() => {}) // evita poluir log

  mockCreateTaskUseCase = {
   execute: jest.fn()
  }

  mockBulkUseCase = {
   execute: jest.fn()
  }

  mockGetTasksByUserUseCase = {
   execute: jest.fn()
  }

  controller = new TaskController(
   mockCreateTaskUseCase,
   mockBulkUseCase,
   mockGetTasksByUserUseCase
  )
 })

 afterEach(() => {
  jest.clearAllMocks()
 })

 it("should create task and return 201", async () => {

  const fakeResponse = {
   id: "1",
   title: "task",
   userId: "user1"
  }

  mockCreateTaskUseCase.execute.mockResolvedValue(fakeResponse)

  const req: any = {
   body: { title: "task" },
   user: { id: "user1" }
  }

  const res: any = {
   status: jest.fn().mockReturnThis(),
   json: jest.fn()
  }

  await controller.create(req, res)

  // ✔️ valida chamada do usecase
  expect(mockCreateTaskUseCase.execute).toHaveBeenCalledWith({
   title: "task",
   userId: "user1"
  })

  // ✔️ valida status
  expect(res.status).toHaveBeenCalledWith(201)

  // ✔️ valida resposta padronizada
  expect(res.json).toHaveBeenCalledWith({
   success: true,
   data: fakeResponse
  })

 })

 it("should return 500 when usecase throws error", async () => {

  mockCreateTaskUseCase.execute.mockRejectedValue(new Error("fail"))

  const req: any = {
   body: { title: "task" },
   user: { id: "user1" }
  }

  const res: any = {
   status: jest.fn().mockReturnThis(),
   json: jest.fn()
  }

  await controller.create(req, res)

  // ✔️ valida que tratou erro corretamente
  expect(res.status).toHaveBeenCalledWith(500)

  expect(res.json).toHaveBeenCalledWith({
   success: false,
   message: "Internal server error"
  })

 })

})