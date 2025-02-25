import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { getTodos,createTodo,updateTodo,deleteTodo } from '../services/api';
import {FiPlusCircle,FiTrash2,FiEdit}from 'react-icons/fi'
import {MdCheckBox,MdCheckBoxOutlineBlank}from'react-icons/md'
import './Todo.css'

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {token,username} = useAuth();
  const [update, setUpdate] = useState({id:null,isTrue:false});

  useEffect(()=>{
      const fetchTodo = async()=>{
        setIsLoading(true);
        try{
          const response = await getTodos();
          setTodos(response.data)
        }finally{
          setIsLoading(false);
        }
      }
      fetchTodo();
  },[token]);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      e.preventDefault();
      if(!newTodo.trim()) return;
      const response = await createTodo({title : newTodo, description:""});
      setTodos([...todos,response.data]);
      setNewTodo('');
    }catch(error){
      console.log("failed to create todo",error);
    }
  }

  const handleDelete = async(id)=>{
    try{
      await deleteTodo(id);
      setTodos(todos.filter((todo)=>todo._id !== id));
    }catch(e){
      console.log("failed to delete todo",e);
    }
  }

  const handleUpdate = async(id)=>{
    try{
      const todo = document.getElementById(id);
      setNewTodo(todo.innerHTML);
      setUpdate({id,isTrue:true});
    }catch(e){
      console.log("failed to update todo",e);
    }
  }

  const handleUpdateTodo = async(e)=>{
    try{
      e.preventDefault();
      const response = await updateTodo(update.id,{title:newTodo});
      setTodos(todos.map((todo)=>(todo._id === update.id)?response.data:todo));
      setNewTodo('');
      setUpdate({id:null,isTrue:false});
    }catch(e){
      console.log("failed to update todo",e);
    }
  }

  const handleToggleTodo = async(id)=>{
    try{
      const todo = todos.find((todo)=>todo._id === id);
      const response = await updateTodo(id,{completed : !todo.completed});
      setTodos(todos.map((todo)=>(todo._id === id)?response.data:todo));
    }catch(e){
      console.log("failed to toggle todo",e);
    }
  }

  return (
    <div className="body-container">
      <div className='todo-container'>
        <h1>Hello, {username} welcome to todo list</h1>
        <form onSubmit={handleSubmit} className='todo-form'>
          <input type="text" 
            placeholder='Add new Todo'
            value={newTodo}
            onChange={(e)=>setNewTodo(e.target.value)}
            required
            className='input-box'
          />
          {
            (update.isTrue)?
            <button  onClick = {handleUpdateTodo} className='update-todo-btn'>Update Todo</button>:
            <button  onClick = {handleSubmit} className='add-todo-btn'>Add Todo <FiPlusCircle /></button>
          }
        </form>
        {
          (isLoading)?<div>Loading...</div>:
          <div>
            {
              todos.map((todo)=>{
              return (
                <div key= {todo._id} className='todo-list'>
                    <button  
                      className="icon checkbox" 
                      onClick={()=>{handleToggleTodo(todo._id)}}
                    >{(todo.completed)? <MdCheckBox/>:<MdCheckBoxOutlineBlank />}</button>
                    <p id = {todo._id} style={{textDecoration: (todo.completed)?'line-through':'none'}}>{todo.title}</p>
                    <button className = "icon delete" onClick = {()=>handleDelete(todo._id)}><FiTrash2/></button>
                    <button className = "icon update"onClick = {()=>handleUpdate(todo._id)}><FiEdit/></button>
                </div>
              )
              })
            }
          </div>
        } 
      </div>
    </div>
    
  )
}

export default Todos