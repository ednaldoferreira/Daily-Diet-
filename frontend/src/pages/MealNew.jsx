import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, getErrorMessage } from '../services/api.js'
import { MealForm } from '../components/MealForm.jsx'
import { Card, Page, PageTitle } from '../components/ui.js'
import { nowInputValue } from '../utils/format.js'

export function MealNew() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(payload) {
    setError('')
    setLoading(true)
    try {
      const { data } = await api.post('/meals', payload)
      navigate(`/meals/${data.meal.id}`)
    } catch (err) {
      setError(getErrorMessage(err))
      setLoading(false)
    }
  }

  return (
    <Page>
      <PageTitle>Nova refeição</PageTitle>
      <Card>
        <MealForm
          initialValues={{ name: '', description: '', dateTime: nowInputValue(), isOnDiet: true }}
          submitLabel="Registrar refeição"
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />
      </Card>
    </Page>
  )
}
