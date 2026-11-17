import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { api, getErrorMessage } from '../services/api.js'
import { MetricCard } from '../components/MetricCard.jsx'
import { ErrorBox, Muted, Page, PageTitle } from '../components/ui.js'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const Wide = styled.div`
  grid-column: 1 / -1;
`

export function Metrics() {
  const [metrics, setMetrics] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .get('/metrics')
      .then(({ data }) => setMetrics(data.metrics))
      .catch((err) => setError(getErrorMessage(err)))
  }, [])

  if (error) return <Page><ErrorBox role="alert">{error}</ErrorBox></Page>
  if (!metrics) return <Page><Muted>Carregando métricas...</Muted></Page>

  return (
    <Page>
      <PageTitle>Métricas</PageTitle>
      <Grid>
        <Wide>
          <MetricCard
            value={metrics.bestSequence}
            label="melhor sequência de refeições dentro da dieta"
            tone="good"
          />
        </Wide>
        <MetricCard value={metrics.totalMeals} label="refeições registradas" />
        <MetricCard value={metrics.mealsOnDiet} label="refeições dentro da dieta" tone="good" />
        <Wide>
          <MetricCard value={metrics.mealsOffDiet} label="refeições fora da dieta" tone="bad" />
        </Wide>
      </Grid>
    </Page>
  )
}
