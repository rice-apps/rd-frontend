import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import { useMutation } from '@apollo/client'

import { LOGIN } from '../graphql/Mutations'
import { TOKEN_NAME } from '../config'

function Auth (successPath, errPath) {
  const ticket = new URLSearchParams(window.location.search).get('ticket')

  const [login, { data, loading, error }] = useMutation(LOGIN, {
    variables: {
      ticket
    }
  })

  useEffect(() => {
    login().catch(() => <Navigate to={`/${errPath}`} />)
  }, [errPath, login])

  if (error) return <Navigate to={`/${errPath}`} />

  if (loading) return <div>Loading...</div>

  if (!data) return <div>Login went wrong</div>

  window.localStorage.setItem(TOKEN_NAME, data.userAuthentication.token)

  return <Navigate to={`/${successPath}`} />
}

export default Auth
