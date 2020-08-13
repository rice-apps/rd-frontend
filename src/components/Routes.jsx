import React from 'react'
import { Navigate, Route, useRoutes } from 'react-router-dom'
import { TOKEN_NAME, loadToken } from '../config'
import { useQuery } from '@apollo/client'
import { VERIFY_USER } from '../graphql/Queries'
import Feed from './PostFeedWithData'
import Login from './Login'
import MoreInfo from './MoreInfo'
import ProfilePage from './Profile'

function PrivateRoute ({ element, ...rest }) {
  const token = loadToken()

  const { data, loading, error } = useQuery(VERIFY_USER, {
    variables: { token: token },
    errorPolicy: 'none'
  })

  if (error) {
    window.localStorage.removeItem(TOKEN_NAME)

    return <Navigate to='/login' />
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (!data || !data.verifyToken) {
    window.localStorage.removeItem(TOKEN_NAME)

    return <Navigate to='/login' />
  }

  window.localStorage.setItem(TOKEN_NAME, JSON.stringify(data.verifyToken))

  return <Route {...rest} element={element} />
}

const routesArray = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/feed',
    element: <PrivateRoute element={<Feed />} />
  },
  {
    path: '/info',
    element: <PrivateRoute element={<MoreInfo />} />
  },
  {
    path: '/profile',
    element: <PrivateRoute element={<ProfilePage />} />
  },
  {
    path: '/',
    element: <Navigate to='/feed' replace />
  }
]

function CustomRoutes () {
  return useRoutes(routesArray)
}

export default CustomRoutes
