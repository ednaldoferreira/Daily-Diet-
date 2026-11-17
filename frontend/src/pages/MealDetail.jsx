import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { api, getErrorMessage } from '../services/api.js'
import { StatusBadge } from '../components/StatusBadge.jsx'
import { Button, ButtonRow, Card, ErrorBox, Muted, Page } from '../components/ui.js'
import { formatDateLong, formatTime } from '../utils/format.js'

const Title = styled.h1`
  font-size: 1.9rem;
  margin-bottom: 14px;
`

const When = styled.p`
  margin: 18px 0 6px;
  font-weight: 700;
  text-transform: capitalize;
`

export function MealDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [meal, setMeal] = useState(null)
  const [error, setError] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    api
      .get(`/meals/${id}`)
      .then(({ data }) => setMeal(data.meal))
      .catch((err) => setError(getErrorMessage(err)))
  }, [id])

  async function handleDelete() {
    if (!window.confirm('Excluir esta refeição? Essa ação não pode ser desfeita.')) return

    setDeleting(true)
    try {
      await api.delete(`/meals/${id}`)
      navigate('/', { replace: true })
    } catch (err) {
      setError(getErrorMessage(err))
      setDeleting(false)
    }
  }

  if (error && !meal) {
    return (
      <Page>
        <ErrorBox role="alert">{error}</ErrorBox>
        <Button as={Link} to="/" $variant="ghost">Voltar às refeições</Button>
      </Page>
    )
  }

  if (!meal) return <Page><Muted>Carregando refeição...</Muted></Page>

  return (
    <Page>
      <Card>
        <Title>{meal.name}</Title>
        <p style={{ margin: 0 }}>{meal.description}</p>

        <When>{formatDateLong(meal.dateTime)}</When>
        <Muted>às {formatTime(meal.dateTime)}</Muted>

        <div style={{ marginTop: 18 }}>
          <StatusBadge isOnDiet={meal.isOnDiet} />
        </div>

        {error && <ErrorBox role="alert" style={{ marginTop: 16 }}>{error}</ErrorBox>}

        <ButtonRow>
          <Button as={Link} to={`/meals/${meal.id}/edit`}>Editar refeição</Button>
          <Button type="button" $variant="danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? 'Excluindo...' : 'Excluir refeição'}
          </Button>
          <Button as={Link} to="/" $variant="ghost">Voltar</Button>
        </ButtonRow>
      </Card>
    </Page>
  )
}
