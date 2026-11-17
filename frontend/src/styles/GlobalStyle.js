import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }

  body {
    margin: 0;
    background: ${(p) => p.theme.colors.bg};
    color: ${(p) => p.theme.colors.text};
    font-family: ${(p) => p.theme.fonts.body};
    font-size: 16px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3 {
    font-family: ${(p) => p.theme.fonts.heading};
    line-height: 1.15;
    margin: 0;
  }

  a { color: inherit; }

  :focus-visible {
    outline: 3px solid ${(p) => p.theme.colors.primary};
    outline-offset: 2px;
  }
`
