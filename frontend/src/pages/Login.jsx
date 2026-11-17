import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../contexts/AuthContext.jsx'
import { api, getErrorMessage } from '../services/api.js'
import { Button, Card, ErrorBox, Field, Input, Label, Muted } from '../components/ui.js'

const Wrapper = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 16px;
`

const Box = styled(Card)`
  width: 100%;
  max-width: 420px;

  h1 { font-size: 2.2rem; margin-bottom: 6px; }
`

const Tabs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 20px 0;
  border-bottom: 1px solid ${(p) => p.theme.colors.border};

  button {
    background: none;
    border: 0;
    border-bottom: 3px solid transparent;
    padding: 10px;
    font: 700 0.95rem ${(p) => p.theme.fonts.body};
    color: ${(p) => p.theme.colors.muted};
    cursor: pointer;
  }
  button[aria-selected='true'] {
    color: ${(p) => p.theme.colors.primary};
    border-bottom-color: ${(p) => p.theme.colors.primary};
  }
`

export function Login() {
  const { user, signIn } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (user) return <Navigate to="/" replace />

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data } =
        mode === 'register'
          ? await api.post('/users', { name, email })
          : await api.post('/sessions', { email })

      signIn(data.user)
      navigate('/', { replace: true })
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Wrapper>
      <Box>
        <h1>Daily Diet</h1>
        <Muted>Registre suas refeições e acompanhe sua dieta.</Muted>

        <Tabs role="tablist">
          <button type="button" role="tab" aria-selected={mode === 'login'} onClick={() => setMode('login')}>
            Entrar
          </button>
          <button type="button" role="tab" aria-selected={mode === 'register'} onClick={() => setMode('register')}>
            Criar conta
          </button>
        </Tabs>

        <form onSubmit={handleSubmit}>
          {error && <ErrorBox role="alert">{error}</ErrorBox>}

          {mode === 'register' && (
            <Field>
              <Label htmlFor="name">Nome</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required minLength={2} />
            </Field>
          )}

          <Field>
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Field>

          <Button type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Aguarde...' : mode === 'register' ? 'Criar conta' : 'Entrar'}
          </Button>
        </form>
      </Box>
    </Wrapper>
  )
}
