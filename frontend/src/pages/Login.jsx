import {React,useState} from 'react'
import { useAuth } from '../context/AuthContext'
import {loginUser} from '../services/api'
import {useNavigate}from 'react-router-dom'


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState('');
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const response = await loginUser({email,password});
      login(response.data.token);
      navigate('/')
    }catch(e){
      setError(e.response?.data?.message || 'Something went Wrong!');
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
      {error && <div>{error}</div>}
    </div>
  )
}

export default Login