import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'
import { loginUser, registerUser } from '../services/api';
import './Login.css'
import { LuEye,LuEyeClosed } from "react-icons/lu";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error,setError] = useState('');
  const [show, setShow] = useState(false);
  const {login} = useAuth() //It is optional this is for auto login.
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      await registerUser({name,email,password});

      //automatically login afterr registration
      const response = await loginUser({email,password});
      login(response.data.token,response.data.username);
      navigate('/');
    }catch(e){
      setError(e.response?.data?.message || 'Something went Wrong!');
    }
  }

  const handleshow = (e)=>{
    e.preventDefault();
    setShow(!show);
  }

  return (
    <>
      <div className='login-container'>
        <form onSubmit={handleSubmit} className='form-container'>
          <h1>Sign up to new user</h1>
          <div className="username">
            <h4>Username</h4>
            <input
              type="text"
              placeholder='username' 
              value={name}
              onChange={(e)=>setName(e.target.value)}
              required
              className='input-box'
          />
          </div>
          <div className="email">
            <h4>Email address</h4>
            <input 
              type="email" 
              placeholder='email'
              value={email} 
              onChange={(e)=>setEmail(e.target.value)}
              required
              className='input-box'
            />
          </div>
          <div className="password">
            <h4>Password</h4>
            <input 
              type={(show)?"text":"password"} 
              value = {password}
              onChange = {(e)=>setPassword(e.target.value)}
              required
              className="input-box"
            />
            {show?<LuEye onClick={(e)=>handleshow(e)} className='eye-icon'/>:<LuEyeClosed onClick={(e)=>handleshow(e)} className='eye-icon'/>}
          </div>
            <button type='submit' className='login-button'>Sign Up</button>
            <h5>Already have an account <a href="/login">Sign In</a></h5>
        </form>
        {error && <h5 className='error'>*{error}</h5>}
      </div>
    </>
  )
}

export default Register