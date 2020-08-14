import React from 'react'
import { render } from 'react-dom'

import { ApolloProvider } from '@apollo/client'

import { mainClient as client } from './utils/apollo'

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

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  serviceWorker.unregister()
} else {
  serviceWorker.register()
}
