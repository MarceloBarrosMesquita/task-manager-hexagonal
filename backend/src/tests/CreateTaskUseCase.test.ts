import { CreateTaskUseCase } from "../application/usecases/CreateTaskUseCase"

describe("CreateTaskUseCase", () => {

 let mockRepository: any

 beforeEach(() => {
  mockRepository = {
   create: jest.fn()
  }
 })

 it("should create a task", async () => {

  const taskData = {
   title: "Test task",
   userId: "user1"
  }

  const fakeResponse = {
   id: "1",
   title: "Test task",
   userId: "user1",
   completed: false,
   createdAt: new Date(),
   description: undefined
  }

  mockRepository.create.mockResolvedValue(fakeResponse)

  const usecase = new CreateTaskUseCase(mockRepository)

  const result = await usecase.execute(taskData)

  // ✔️ valida que chamou o repository com os dados corretos (mesmo com campos extras)
  expect(mockRepository.create).toHaveBeenCalledWith(
   expect.objectContaining({
    title: "Test task",
    userId: "user1"
   })
  )

  // ✔️ valida que foi chamado
  expect(mockRepository.create).toHaveBeenCalled()

  // ✔️ valida retorno
  expect(result).toEqual(fakeResponse)

 })

 it("should propagate repository error", async () => {

  mockRepository.create.mockRejectedValue(new Error("DB error"))

  const usecase = new CreateTaskUseCase(mockRepository)

  await expect(
   usecase.execute({
    title: "Test task",
    userId: "user1"
   })
  ).rejects.toThrow("DB error")

 })

})
