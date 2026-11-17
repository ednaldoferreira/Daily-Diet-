import axios from 'axios'

export const USER_KEY = 'dailydiet:user'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3333',
})

// Identifica o usuário em todas as requisições (header x-user-id)
api.interceptors.request.use((config) => {
  try {
    const stored = localStorage.getItem(USER_KEY)
    if (stored) config.headers['x-user-id'] = JSON.parse(stored).id
  } catch {
    localStorage.removeItem(USER_KEY)
  }
  return config
})

// Se o backend não reconhecer o usuário, volta para o login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname !== '/login') {
      localStorage.removeItem(USER_KEY)
      window.location.assign('/login')
    }
    return Promise.reject(error)
  },
)

export function getErrorMessage(error, fallback = 'Algo deu errado. Tente novamente.') {
  if (!error.response) return 'Não foi possível conectar ao servidor. Verifique se o backend está rodando.'
  return error.response.data?.message || fallback
}
