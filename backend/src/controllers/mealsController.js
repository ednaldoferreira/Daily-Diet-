import { z } from 'zod'
import { prisma } from '../lib/prisma.js'

const mealSchema = z.object({
  name: z.string().trim().min(1, 'Informe o nome da refeição.'),
  description: z.string().trim().min(1, 'Informe a descrição.'),
  dateTime: z.coerce.date({ invalid_type_error: 'Data e hora inválidas.' }),
  isOnDiet: z.boolean({ required_error: 'Informe se está dentro da dieta.' }),
})

/**
 * Busca a refeição e garante que pertence ao usuário autenticado.
 * Devolve null (e já responde) se não existir ou se for de outro usuário.
 */
async function findOwnedMeal(req, res) {
  const meal = await prisma.meal.findUnique({ where: { id: req.params.id } })

  if (!meal) {
    res.status(404).json({ message: 'Refeição não encontrada.' })
    return null
  }

  if (meal.userId !== req.user.id) {
    res.status(403).json({ message: 'Você não tem permissão para acessar esta refeição.' })
    return null
  }

  return meal
}

// POST /meals
export async function create(req, res) {
  const data = mealSchema.parse(req.body)

  const meal = await prisma.meal.create({
    data: { ...data, userId: req.user.id },
  })

  return res.status(201).json({ meal })
}

// GET /meals
export async function index(req, res) {
  const meals = await prisma.meal.findMany({
    where: { userId: req.user.id },
    orderBy: { dateTime: 'desc' },
  })

  return res.json({ meals })
}

// GET /meals/:id
export async function show(req, res) {
  const meal = await findOwnedMeal(req, res)
  if (!meal) return

  return res.json({ meal })
}

// PUT /meals/:id
export async function update(req, res) {
  const owned = await findOwnedMeal(req, res)
  if (!owned) return

  const data = mealSchema.parse(req.body)

  const meal = await prisma.meal.update({
    where: { id: owned.id },
    data,
  })

  return res.json({ meal })
}

// DELETE /meals/:id
export async function destroy(req, res) {
  const owned = await findOwnedMeal(req, res)
  if (!owned) return

  await prisma.meal.delete({ where: { id: owned.id } })

  return res.status(204).send()
}
