import axios from "axios"

export const api = axios.create({
  baseURL: "http://localhost:3000"
})

// 🔐 Envia token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// 🚨 Trata erro global (401 = não autorizado)
api.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/" // volta pro login
    }

    return Promise.reject(error)
  }
)