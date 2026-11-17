import { describe, it, expect } from 'vitest'
import { calculateMetrics } from './metrics.js'

const meal = (day, isOnDiet) => ({
  dateTime: new Date(`2026-11-${String(day).padStart(2, '0')}T12:00:00Z`),
  isOnDiet,
})

describe('calculateMetrics', () => {
  it('retorna zeros quando não há refeições', () => {
    expect(calculateMetrics([])).toEqual({
      totalMeals: 0,
      mealsOnDiet: 0,
      mealsOffDiet: 0,
      bestSequence: 0,
    })
  })

  it('calcula totais e melhor sequência em ordem cronológica', () => {
    // fora da ordem de propósito
    const meals = [
      meal(5, true),
      meal(1, true),
      meal(3, false),
      meal(2, true),
      meal(4, true),
      meal(6, true),
    ]

    expect(calculateMetrics(meals)).toEqual({
      totalMeals: 6,
      mealsOnDiet: 5,
      mealsOffDiet: 1,
      bestSequence: 3, // dias 4, 5 e 6
    })
  })
})
