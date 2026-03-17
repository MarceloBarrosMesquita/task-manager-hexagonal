import { useState } from "react"
import { api } from "../services/api"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()


  async function handleLogin(e: any) {
    e.preventDefault()

    if (!email || !password) {
      alert("Preencha email e senha")
      return
    }

    try {
      setLoading(true)

      const response = await api.post("/api/login", {
        email,
        password
      })

      localStorage.setItem("token", response.data.token)

      navigate("/dashboard")

    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          alert("Email ou senha inválidos")
          return false
        } else {
          alert("Erro ao fazer login. Tente novamente.")
          return
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f3f4f6"
    }}>
      
      <div style={{
        width: 350,
        background: "#fff",
        padding: 30,
        borderRadius: 12,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
      }}>

        <h2 style={{ marginBottom: 20 }}>Login</h2>
        <form onSubmit={handleLogin}>
          
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              marginBottom: 10,
              borderRadius: 8,
              border: "1px solid #ddd"
            }}
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              marginBottom: 15,
              borderRadius: 8,
              border: "1px solid #ddd"
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: 12,
              background: loading ? "#9ca3af" : "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: "pointer"
            }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

        </form>
      </div>
    </div>
  )
}