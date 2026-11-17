import styled, { css } from 'styled-components'

export const Page = styled.main`
  max-width: 720px;
  margin: 0 auto;
  padding: 24px 16px 72px;
`

export const Card = styled.section`
  background: ${(p) => p.theme.colors.surface};
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: ${(p) => p.theme.radius.lg};
  padding: 24px;

  @media (max-width: 480px) {
    padding: 18px;
  }
`

export const PageTitle = styled.h1`
  font-size: 1.9rem;
  margin-bottom: 20px;
`

const variants = {
  primary: css`
    background: ${(p) => p.theme.colors.primary};
    color: #fff;
    border: 1px solid ${(p) => p.theme.colors.primary};
    &:hover:not(:disabled) { background: ${(p) => p.theme.colors.primaryHover}; }
  `,
  ghost: css`
    background: transparent;
    color: ${(p) => p.theme.colors.text};
    border: 1px solid ${(p) => p.theme.colors.border};
    &:hover:not(:disabled) { background: ${(p) => p.theme.colors.bg}; }
  `,
  danger: css`
    background: transparent;
    color: ${(p) => p.theme.colors.offDiet};
    border: 1px solid ${(p) => p.theme.colors.offDiet};
    &:hover:not(:disabled) { background: ${(p) => p.theme.colors.offDietSoft}; }
  `,
}

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 11px 18px;
  border-radius: ${(p) => p.theme.radius.md};
  font: 700 0.95rem ${(p) => p.theme.fonts.body};
  text-decoration: none;
  cursor: pointer;
  ${(p) => variants[p.$variant || 'primary']}

  &:disabled { opacity: 0.6; cursor: not-allowed; }
`

export const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
`

export const Label = styled.label`
  font-weight: 700;
  font-size: 0.9rem;
`

const inputStyle = css`
  width: 100%;
  padding: 11px 12px;
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: ${(p) => p.theme.radius.sm};
  font: inherit;
  background: #fff;
  color: inherit;
`

export const Input = styled.input`${inputStyle}`
export const Textarea = styled.textarea`${inputStyle} min-height: 96px; resize: vertical;`

export const ErrorBox = styled.p`
  margin: 0 0 16px;
  padding: 10px 12px;
  border-radius: ${(p) => p.theme.radius.sm};
  background: ${(p) => p.theme.colors.offDietSoft};
  color: ${(p) => p.theme.colors.offDiet};
  font-weight: 500;
`

export const Muted = styled.p`
  color: ${(p) => p.theme.colors.muted};
  margin: 0;
`
