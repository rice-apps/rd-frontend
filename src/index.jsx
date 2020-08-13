import React from 'react'
import { render } from 'react-dom'

import { ApolloProvider } from '@apollo/client'

import client from './utils/apollo'

import App from './App'
import GlobalStyle from './index.styles'
import 'react-datepicker/dist/react-datepicker.css'

import * as serviceWorker from './serviceWorker'

render(
  <React.StrictMode>
    <GlobalStyle />
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  serviceWorker.unregister()
} else {
  serviceWorker.register()
}
