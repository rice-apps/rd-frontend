import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Avenir";
    src: 
      local("Avenir") 
      url("./fonts/AvenirLTStd-Book.otf") 
      format("opentype");
  }
  html {
    overflow-x: hidden;
  }

  body {
    margin: 0;
    font-family: "Avenir", sans-serif;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`

export default GlobalStyle
