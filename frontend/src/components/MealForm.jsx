import { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {
  Button, ButtonRow, ErrorBox, Field, Input, Label, Textarea,
} from './ui.js'

const Choices = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`

const Choice = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: ${(p) => p.theme.radius.md};
  border: 2px solid ${(p) => (p.$checked ? (p.$onDiet ? p.theme.colors.onDiet : p.theme.colors.offDiet) : p.theme.colors.border)};
  background: ${(p) => (p.$checked ? (p.$onDiet ? p.theme.colors.onDietSoft : p.theme.colors.offDietSoft) : '#fff')};
  cursor: pointer;
  font-weight: 700;

  input { accent-color: ${(p) => (p.$onDiet ? p.theme.colors.onDiet : p.theme.colors.offDiet)}; }
`

export function MealForm({ initialValues, submitLabel, onSubmit, loading, error }) {
  const [values, setValues] = useState(initialValues)

  function handleChange(event) {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit({
      name: values.name,
      description: values.description,
      dateTime: new Date(values.dateTime).toISOString(),
      isOnDiet: values.isOnDiet,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <ErrorBox role="alert">{error}</ErrorBox>}

      <Field>
        <Label htmlFor="name">Nome</Label>
        <Input id="name" name="name" value={values.name} onChange={handleChange} required />
      </Field>

      <Field>
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          name="description"
          value={values.description}
          onChange={handleChange}
          required
        />
      </Field>

      <Field>
        <Label htmlFor="dateTime">Data e hora</Label>
        <Input
          id="dateTime"
          name="dateTime"
          type="datetime-local"
          value={values.dateTime}
          onChange={handleChange}
          required
        />
      </Field>

      <Field as="fieldset" style={{ border: 0, padding: 0 }}>
        <Label as="legend">Está dentro da dieta?</Label>
        <Choices>
          <Choice $onDiet $checked={values.isOnDiet === true}>
            <input
              type="radio"
              name="isOnDiet"
              checked={values.isOnDiet === true}
              onChange={() => setValues((c) => ({ ...c, isOnDiet: true }))}
            />
            Sim
          </Choice>
          <Choice $checked={values.isOnDiet === false}>
            <input
              type="radio"
              name="isOnDiet"
              checked={values.isOnDiet === false}
              onChange={() => setValues((c) => ({ ...c, isOnDiet: false }))}
            />
            Não
          </Choice>
        </Choices>
      </Field>

      <ButtonRow>
        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : submitLabel}
        </Button>
        <Button as={Link} to="/" $variant="ghost">Cancelar</Button>
      </ButtonRow>
    </form>
  )
}
