import { useEffect, useState } from "react"
import { api } from "../services/api"

type Task = {
  id: string
  title: string
}

export function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)

  function checkAuth() {
    const token = localStorage.getItem("token")

    if (!token) {
      window.location.href = "/"
      return false
    }

    return true
  }

  async function loadTasks() {
    try {
      setLoading(true)

      if (!checkAuth()) return

      const response = await api.get("/api/tasks")

      setTasks(Array.isArray(response.data.data) ? response.data.data : [])

    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao carregar tarefas")
    } finally {
      setLoading(false)
    }
  }

  async function createTask() {
    try {
      setError("")
      setCreating(true)

      if (!title.trim()) {
        setError("Digite um título")
        return
      }

      const response = await api.post("/api/tasks", { title })

      // 🔥 atualização otimista (mais rápido que reload)
      setTasks((prev) => [...prev, response.data.data])

      setTitle("")

    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao criar tarefa")
    } finally {
      setCreating(false)
    }
  }

  function logout() {
    localStorage.removeItem("token")
    window.location.href = "/"
  }

  useEffect(() => {
    if (!checkAuth()) return
    loadTasks()
  }, [])

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <p>Carregando tarefas...</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", fontFamily: "Arial" }}>

      {/* HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
      }}>
        <h2>📋 Minhas Tarefas</h2>
        <button onClick={logout}>Sair</button>
      </div>

      {/* ERRO */}
      {error && (
        <div style={{
          background: "#ffe0e0",
          color: "#900",
          padding: 10,
          borderRadius: 5,
          marginBottom: 10
        }}>
          {error}
        </div>
      )}

      {/* INPUT */}
      <div style={{ display: "flex", gap: 10 }}>
        <input
          placeholder="Nova tarefa..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />

        <button onClick={createTask} disabled={creating}>
          {creating ? "Criando..." : "Criar"}
        </button>
      </div>

      {/* LISTA */}
      <ul style={{ marginTop: 20, padding: 0, listStyle: "none" }}>
        {tasks.length === 0 && (
          <p style={{ textAlign: "center", opacity: 0.6 }}>
            Nenhuma tarefa ainda 👀
          </p>
        )}

        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              padding: 10,
              border: "1px solid #ddd",
              borderRadius: 6,
              marginBottom: 10,
              background: "#fafafa"
            }}
          >
            {task.title}
          </li>
        ))}
      </ul>

    </div>
  )
}