import styled from 'styled-components'
import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

const Bar = styled.header`
  background: ${(p) => p.theme.colors.primary};
  color: #fff;
`

const Inner = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 12px 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 16px;
`

const Brand = styled(Link)`
  font: 700 1.3rem ${(p) => p.theme.fonts.heading};
  text-decoration: none;
`

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;

  a {
    color: #fff;
    text-decoration: none;
    padding: 6px 12px;
    border-radius: ${(p) => p.theme.radius.sm};
    font-weight: 500;
  }
  a:hover { background: rgba(255, 255, 255, 0.15); }
  a.active { background: rgba(255, 255, 255, 0.25); font-weight: 700; }
`

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;

  button {
    background: transparent;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: ${(p) => p.theme.radius.sm};
    padding: 5px 10px;
    font: inherit;
    cursor: pointer;
  }
`

export function Header() {
  const { user, signOut } = useAuth()

  return (
    <Bar>
      <Inner>
        <Brand to="/">Daily Diet</Brand>
        <Nav aria-label="Principal">
          <NavLink to="/" end>Refeições</NavLink>
          <NavLink to="/meals/new">Nova refeição</NavLink>
          <NavLink to="/metrics">Métricas</NavLink>
        </Nav>
        <User>
          <span>{user.name}</span>
          <button type="button" onClick={signOut}>Sair</button>
        </User>
      </Inner>
    </Bar>
  )
}
