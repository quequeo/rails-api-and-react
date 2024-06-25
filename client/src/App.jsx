import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import AppRoutes from './components/AppRoutes'

function App() {

  return (
    <Router>
      <div className="App-header">
        <h1>Rails & React App</h1>
        <NavBar />
        <AppRoutes />
      </div>
    </Router>
  )
}

export default App
