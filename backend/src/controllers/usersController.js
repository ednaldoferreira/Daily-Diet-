import { z } from 'zod'
import { prisma } from '../lib/prisma.js'

const createUserSchema = z.object({
  name: z.string().trim().min(2, 'Informe o nome.'),
  email: z.string().trim().toLowerCase().email('E-mail inválido.'),
})

const sessionSchema = z.object({
  email: z.string().trim().toLowerCase().email('E-mail inválido.'),
})

// POST /users
export async function create(req, res) {
  const data = createUserSchema.parse(req.body)

  const existing = await prisma.user.findUnique({ where: { email: data.email } })
  if (existing) {
    return res.status(409).json({ message: 'Já existe um usuário com este e-mail.' })
  }

  const user = await prisma.user.create({ data })
  return res.status(201).json({ user })
}

// POST /sessions — "login" simples por e-mail, devolve o usuário (e seu id)
export async function createSession(req, res) {
  const { email } = sessionSchema.parse(req.body)

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return res.status(404).json({ message: 'Nenhum usuário encontrado com este e-mail.' })
  }

  return res.json({ user })
}

// GET /users/me
export async function me(req, res) {
  return res.json({ user: req.user })
}
