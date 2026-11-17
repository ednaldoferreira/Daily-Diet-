import styled from 'styled-components'

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 700;
  background: ${(p) => (p.$onDiet ? p.theme.colors.onDietSoft : p.theme.colors.offDietSoft)};
  color: ${(p) => (p.$onDiet ? p.theme.colors.onDiet : p.theme.colors.offDiet)};

  &::before {
    content: '';
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: currentColor;
  }
`

export function StatusBadge({ isOnDiet }) {
  return <Badge $onDiet={isOnDiet}>{isOnDiet ? 'Dentro da dieta' : 'Fora da dieta'}</Badge>
}
