import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'
import { loginUser, registerUser } from '../services/api';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error,setError] = useState('');
  const {login} = useAuth() //It is optional this is for auto login.
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      await registerUser({name,email,password});

      //automatically login afterr registration
      const response = await loginUser({email,password});
      login(response.data.token);
      navigate('/');
    }catch(e){
      setError(e.response?.data?.message || 'Something went Wrong!');
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder='username' 
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
         />
         <input 
            type="email" 
            placeholder='email'
            value={email} 
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
          <input 
            type="password"
            placeholder='password'
            value = {password}
            onChange={(e)=>setPassword(e.target.value)} 
            required
          />
          <button type='submit'>Register</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  )
}

export default Register