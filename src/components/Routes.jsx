import React from 'react'
import { Navigate, Route, useRoutes } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import Feed from './PostFeedWithData'
import Login from './Login'
import MoreInfo from './MoreInfo'
import ProfilePage from './Profile'
import PostFull from './PostFull'
import { currentUser, loadToken } from '../utils/apollo'
import { VERIFY_USER } from '../graphql/Queries'
import { TOKEN_NAME } from '../config'

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

  window.localStorage.setItem(TOKEN_NAME, data.verifyToken.token)

  currentUser(data.verifyToken)

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
    path: '/posts/:postID',
    element: <PrivateRoute element={<PostFull />} /> //test
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
