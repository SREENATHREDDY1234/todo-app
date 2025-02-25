import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Todos from './pages/Todos'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import './App.css'

function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/login" element = {<Login />}/>
        <Route path="/register" element = {<Register />}/>
        <Route path="/" element = {<ProtectedRoute><Todos /></ProtectedRoute>}/>
      </Routes>
    </>
    
  )
}

export default App
