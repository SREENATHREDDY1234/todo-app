import {React,useState} from 'react'
import { useAuth } from '../context/AuthContext'
import {loginUser} from '../services/api'
import {useNavigate}from 'react-router-dom'


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const response = await loginUser({email,password});
      login(response.data.token);
      navigate('/')
    }catch(e){
      alert('Login Failed!');
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit = {handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e)=>setEmail(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder = "password"
          value = {password}
          onChange = {(e)=>setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login