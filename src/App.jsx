import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import CustomRoutes from './components/Routes'

function App () {
  return (
    <Router>
      <CustomRoutes />
    </Router>
  )
}

export default App
