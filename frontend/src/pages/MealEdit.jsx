import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api, getErrorMessage } from '../services/api.js'
import { MealForm } from '../components/MealForm.jsx'
import { Card, ErrorBox, Muted, Page, PageTitle } from '../components/ui.js'
import { toInputValue } from '../utils/format.js'

export function MealEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [meal, setMeal] = useState(null)
  const [loadError, setLoadError] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    api
      .get(`/meals/${id}`)
      .then(({ data }) => setMeal(data.meal))
      .catch((err) => setLoadError(getErrorMessage(err)))
  }, [id])

  async function handleSubmit(payload) {
    setError('')
    setSaving(true)
    try {
      await api.put(`/meals/${id}`, payload)
      navigate(`/meals/${id}`)
    } catch (err) {
      setError(getErrorMessage(err))
      setSaving(false)
    }
  }

  if (loadError) return <Page><ErrorBox role="alert">{loadError}</ErrorBox></Page>
  if (!meal) return <Page><Muted>Carregando refeição...</Muted></Page>

  return (
    <Page>
      <PageTitle>Editar refeição</PageTitle>
      <Card>
        <MealForm
          initialValues={{
            name: meal.name,
            description: meal.description,
            dateTime: toInputValue(meal.dateTime),
            isOnDiet: meal.isOnDiet,
          }}
          submitLabel="Salvar alterações"
          onSubmit={handleSubmit}
          loading={saving}
          error={error}
        />
      </Card>
    </Page>
  )
}
