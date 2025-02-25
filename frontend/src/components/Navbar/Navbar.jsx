import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const username = JSON.parse(localStorage.getItem('user'));
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <nav className='nav-container'>
      <div className="wrapper">
        <div className="nav-left">
          <img src="./todo.png" alt="" />
          <h1>TODO LIST APP</h1>
        </div>
        {
          (username)?
          (<div className="nav-right">
            <div className='account'>{username[0]}</div>
            <div className="logout">
              <h5 onClick={()=>logout()}>logout</h5>
            </div>
          </div>):
          (
            <button className='login-button btn' onClick={()=>navigate('/login')}>Login</button>
          )
        }
        
      </div>
      
    </nav>
  )
}

export default Navbar