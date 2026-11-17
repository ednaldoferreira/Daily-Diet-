import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { formatTime } from '../utils/format.js'

const Item = styled(Link)`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  background: ${(p) => p.theme.colors.surface};
  border: 1px solid ${(p) => p.theme.colors.border};
  border-left: 6px solid ${(p) => (p.$onDiet ? p.theme.colors.onDiet : p.theme.colors.offDiet)};
  border-radius: ${(p) => p.theme.radius.md};
  text-decoration: none;

  &:hover { background: ${(p) => p.theme.colors.bg}; }
`

const Time = styled.time`
  font-weight: 700;
  min-width: 48px;
`

const Name = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export function MealCard({ meal }) {
  return (
    <Item to={`/meals/${meal.id}`} $onDiet={meal.isOnDiet}>
      <Time dateTime={meal.dateTime}>{formatTime(meal.dateTime)}</Time>
      <Name>{meal.name}</Name>
      <span aria-label={meal.isOnDiet ? 'Dentro da dieta' : 'Fora da dieta'}>
        {meal.isOnDiet ? '✓' : '✕'}
      </span>
    </Item>
  )
}
