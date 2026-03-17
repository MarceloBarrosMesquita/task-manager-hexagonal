import { CreateTaskUseCase } from "../application/usecases/CreateTaskUseCase"

// Cria um repositório falso (mock) para simular o comportamento do banco.
// Assim conseguimos testar o UseCase sem depender de banco de dados real.
const mockRepository = {

 create: jest.fn() // função simulada do Jest

}

describe("CreateTaskUseCase", () => {

 // Teste que verifica se uma tarefa é criada corretamente
 it("should create a task", async () => {

  // Instancia o UseCase passando o repositório mockado
  const usecase = new CreateTaskUseCase(
   mockRepository as any
  )

  // Executa o caso de uso com dados de teste
  await usecase.execute({

   title: "Test task",
   userId: "user1"

  })

  // Verifica se o método create do repositório foi chamado
  // Isso confirma que o UseCase tentou salvar a tarefa
  expect(mockRepository.create).toHaveBeenCalled()

 })

})
