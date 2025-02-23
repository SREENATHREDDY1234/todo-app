import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Todos from './pages/Todos'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {
  return (
    <Routes>
      <Route path="/login" element = {<Login />}/>
      <Route path="/register" element = {<Register />}/>
      <Route path="/" element = {<ProtectedRoute><Todos /></ProtectedRoute>}/>
    </Routes>
  )
}

export default App
