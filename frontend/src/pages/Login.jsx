import {React,useState} from 'react'
import { useAuth } from '../context/AuthContext'
import {loginUser} from '../services/api'
import {useNavigate}from 'react-router-dom'
import './Login.css'
import { LuEye,LuEyeClosed } from "react-icons/lu";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState('');
  const {login} = useAuth();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const response = await loginUser({email,password});
      login(response.data.token,response.data.username);
      navigate('/')
    }catch(e){
      setError(e.response?.data?.message || 'Something went Wrong!');
    }
  }

  const handleshow = (e)=>{
    e.preventDefault();
    setShow(!show);
  }

  return (
    <div className = "login-container">
      <form onSubmit = {handleSubmit} className="form-container">
        <h1>Sign in to your account</h1>
        <div className="email">
          <h4>Email address</h4>
          <input 
            type="email" 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)}
            required
            className="input-box"
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
        
        <button type="submit" className="login-button">Login</button>
        <h5>New user <a href="/register">SignUp</a></h5>
      </form>
      {error && <h5 className="error">*{error}</h5>}
    </div>
  )
}

export default Login