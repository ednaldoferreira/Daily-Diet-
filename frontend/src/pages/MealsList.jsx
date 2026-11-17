import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { api, getErrorMessage } from '../services/api.js'
import { MealCard } from '../components/MealCard.jsx'
import { Button, ErrorBox, Muted, Page } from '../components/ui.js'
import { formatDate } from '../utils/format.js'

const Summary = styled(Link)`
  display: block;
  padding: 22px;
  margin-bottom: 28px;
  border-radius: ${(p) => p.theme.radius.lg};
  text-align: center;
  text-decoration: none;
  background: ${(p) => (p.$good ? p.theme.colors.onDietSoft : p.theme.colors.offDietSoft)};

  strong { display: block; font: 700 2.8rem ${(p) => p.theme.fonts.heading}; }
  span { color: ${(p) => p.theme.colors.muted}; }
`

const Group = styled.section`
  margin-bottom: 24px;

  h2 { font-size: 1.1rem; margin-bottom: 10px; }
  ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
`

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;

  h2 { font-size: 1.4rem; }
`

const Empty = styled.div`
  text-align: center;
  padding: 40px 16px;
  display: grid;
  gap: 16px;
  justify-items: center;
`

function groupByDate(meals) {
  const groups = new Map()
  for (const meal of meals) {
    const key = formatDate(meal.dateTime)
    groups.set(key, [...(groups.get(key) || []), meal])
  }
  return [...groups.entries()]
}

export function MealsList() {
  const [meals, setMeals] = useState([])
  const [metrics, setMetrics] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [mealsRes, metricsRes] = await Promise.all([api.get('/meals'), api.get('/metrics')])
        setMeals(mealsRes.data.meals)
        setMetrics(metricsRes.data.metrics)
      } catch (err) {
        setError(getErrorMessage(err))
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <Page><Muted>Carregando refeições...</Muted></Page>
  if (error) return <Page><ErrorBox role="alert">{error}</ErrorBox></Page>

  const percent = metrics?.totalMeals
    ? Math.round((metrics.mealsOnDiet / metrics.totalMeals) * 100)
    : 0

  return (
    <Page>
      {metrics?.totalMeals > 0 && (
        <Summary to="/metrics" $good={percent >= 50}>
          <strong>{percent}%</strong>
          <span>das refeições dentro da dieta</span>
        </Summary>
      )}

      <Head>
        <h2>Suas refeições</h2>
        <Button as={Link} to="/meals/new">Nova refeição</Button>
      </Head>

      {meals.length === 0 ? (
        <Empty>
          <Muted>Você ainda não registrou nenhuma refeição.</Muted>
          <Button as={Link} to="/meals/new">Registrar a primeira refeição</Button>
        </Empty>
      ) : (
        groupByDate(meals).map(([date, items]) => (
          <Group key={date}>
            <h2>{date}</h2>
            <ul>
              {items.map((meal) => (
                <li key={meal.id}><MealCard meal={meal} /></li>
              ))}
            </ul>
          </Group>
        ))
      )}
    </Page>
  )
}
