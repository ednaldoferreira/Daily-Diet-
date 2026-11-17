import styled from 'styled-components'

const Box = styled.div`
  padding: 18px;
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) =>
    p.$tone === 'good' ? p.theme.colors.onDietSoft
    : p.$tone === 'bad' ? p.theme.colors.offDietSoft
    : p.theme.colors.surface};
  border: 1px solid ${(p) => p.theme.colors.border};
`

const Value = styled.strong`
  display: block;
  font: 700 2.3rem ${(p) => p.theme.fonts.heading};
`

const Label = styled.span`
  color: ${(p) => p.theme.colors.muted};
  font-size: 0.9rem;
`

export function MetricCard({ value, label, tone }) {
  return (
    <Box $tone={tone}>
      <Value>{value}</Value>
      <Label>{label}</Label>
    </Box>
  )
}
