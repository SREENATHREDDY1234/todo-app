import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Todos from './pages/Todos'

function App() {
  return (
    <Routes>
      <Route path="/login" element = {<Login />}/>
      <Route path="/register" element = {<Register />}/>
      <Route path="/" element = {<Todos />} />
    </Routes>
  )
}

export default App
