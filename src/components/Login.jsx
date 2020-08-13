import React, { useState } from 'react'

import { Helmet } from 'react-helmet'
import Auth from './Auth'
import { LoginButton, LoginContainer, LoginImage } from './Login.styles'

import { FRONTEND_AUTH_URL } from '../config'

function Login () {
  const [hasTicket] = useState(
    new URLSearchParams(window.location.search).has('ticket')
  )

  return hasTicket ? (
    Auth('info', 'login')
  ) : (
    <LoginContainer>
      <Helmet>
        <title>RiceDiscuss &middot; Login</title>
      </Helmet>
      <LoginImage />
      <LoginButton
        onClick={() => {
          window.open(FRONTEND_AUTH_URL, '_self')
        }}
      >
        Login
      </LoginButton>
    </LoginContainer>
  )
}

export default Login
