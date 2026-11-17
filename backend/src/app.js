import express from 'express'
import cors from 'cors'
import { ZodError } from 'zod'
import routes from './routes/index.js'

export const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

// 404 para rotas inexistentes
app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada.' })
})

// Tratamento centralizado de erros (Express 5 repassa erros de handlers async)
app.use((err, req, res, next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Dados inválidos.',
      issues: err.flatten().fieldErrors,
    })
  }

  console.error(err)
  return res.status(500).json({ message: 'Erro interno do servidor.' })
})
