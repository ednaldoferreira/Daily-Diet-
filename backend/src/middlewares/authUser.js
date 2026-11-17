import { prisma } from '../lib/prisma.js'

/**
 * Identifica o usuário entre as requisições pelo header `x-user-id`.
 * Se o usuário existir, ele fica disponível em `req.user`.
 */
export async function authUser(req, res, next) {
  const userId = req.header('x-user-id')

  if (!userId) {
    return res
      .status(401)
      .json({ message: 'Usuário não identificado. Envie o header x-user-id.' })
  }

  const user = await prisma.user.findUnique({ where: { id: userId } })

  if (!user) {
    return res.status(401).json({ message: 'Usuário não encontrado.' })
  }

  req.user = user
  return next()
}
