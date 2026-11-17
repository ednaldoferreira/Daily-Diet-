/**
 * Calcula as métricas de um conjunto de refeições.
 * A melhor sequência considera as refeições em ordem cronológica.
 */
export function calculateMetrics(meals) {
  const sorted = [...meals].sort(
    (a, b) => new Date(a.dateTime) - new Date(b.dateTime),
  )

  let mealsOnDiet = 0
  let currentSequence = 0
  let bestSequence = 0

  for (const meal of sorted) {
    if (meal.isOnDiet) {
      mealsOnDiet += 1
      currentSequence += 1
      bestSequence = Math.max(bestSequence, currentSequence)
    } else {
      currentSequence = 0
    }
  }

  return {
    totalMeals: sorted.length,
    mealsOnDiet,
    mealsOffDiet: sorted.length - mealsOnDiet,
    bestSequence,
  }
}
