import { prisma } from '../lib/prisma.js'
import { calculateMetrics } from '../utils/metrics.js'

// GET /metrics
export async function show(req, res) {
  const meals = await prisma.meal.findMany({
    where: { userId: req.user.id },
    select: { dateTime: true, isOnDiet: true },
  })

  return res.json({ metrics: calculateMetrics(meals) })
}
