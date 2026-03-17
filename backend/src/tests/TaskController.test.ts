import { TaskController } from "../interfaces/http/controllers/TaskController"

describe("TaskController", () => {

 it("should return 201 when creating task", async () => {

  const mockCreateTaskUseCase = {
   execute: jest.fn().mockResolvedValue({
    id: "1",
    title: "task"
   })
  }

  const mockBulkUseCase = {
   execute: jest.fn()
  }

  const controller = new TaskController(
   mockCreateTaskUseCase as any,
   mockBulkUseCase as any
  )

  const req: any = {
   body: { title: "task" },
   user: { id: "user1" }
  }

  const res: any = {
   status: jest.fn().mockReturnThis(),
   json: jest.fn()
  }

  await controller.create(req, res)

  expect(res.status).toHaveBeenCalledWith(201)

 })

})