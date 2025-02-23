import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { getTodos,createTodo,updateTodo,deleteTodo } from '../services/api';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const {token,logout} = useAuth();
  const [update, setUpdate] = useState({id:null,isTrue:false});

  useEffect(()=>{
      const fetchTodo = async()=>{
        const response = await getTodos();
        setTodos(response.data)
      }
      fetchTodo();
  },[todos]);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      e.preventDefault();
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
      setTodos(todos);
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

  const handleUpdateTodo = async()=>{
    try{
      const response = await updateTodo(update.id,{title:newTodo});
      setTodos([...todos,response.data]);
      setNewTodo('');
      setUpdate({id:null,isTrue:false});
    }catch(e){
      console.log("failed to update todo",e);
    }
  }

  return (
    <div>
      <form>
        <input type="text" 
          placeholder='Add new Todo'
          value={newTodo}
          onChange={(e)=>setNewTodo(e.target.value)}
          required
        />
        {
          (update.isTrue)?
          <button  onClick = {handleUpdateTodo}>Update Todo</button>:
          <button  onClick = {handleSubmit}>Add Todo</button>
        }
      </form>
      <div>
        {
          todos.map((todo)=>{
           return (
            <div key= {todo._id}>
                <p id = {todo._id} >{todo.title}</p>
                <button onClick = {()=>handleDelete(todo._id)}>Delete</button>
                <button onClick = {()=>handleUpdate(todo._id)}>Edit</button>
            </div>
          )
          })
        }
      </div>
    </div>
  )
}

export default Todos