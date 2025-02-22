const Todo = require('../models/Todo');


//Get all the todos for the logged-in user
const getTodos = async(req,res)=>{
    try{
        const userId = req.userId;
        const todos = await Todo.find({user:userId});
        res.status(200).json(todos);
    }catch(e){
        console.log(e.message);
        res.status(500).json({success: false,message:'Server error'});
    }
};

//Create a new todo
const createTodo = async(req,res)=>{
    try{
        const {title,description} = req.body;
        const todo = await Todo.create({
            title,
            description,
            user : req.userId
        })
        res.status(201).json(todo);
    }catch(e){
        console.log(e.message);
        res.status(500).json({success: false,message:'Server error'});
    }
}

//Update a todo
const updateTodo = async(req,res)=>{
    try{
        const todoId = req.params.id;
        const todo = await Todo.findOneAndUpdate(
            {_id:todoId,user:req.userId},//Ensure the todo belongs to the user
            req.body,
            {new:true} // Return the updated todo.
        );
        if(!todo){
            return res.status(404).json({message:'Todo not found!'});
        }

        res.status(200).json(todo);
    }catch(e){
        console.log(e.message);
        res.status(500).json({success: false,message:'Server error'});
    }
}

//Delete a todo
const deleteTodo = async(req,res)=>{
    try{
        const todoId = req.params.id;
        const deletedTodo = await Todo.findOneAndDelete({_id: todoId, user: req.userId});
        if(!deletedTodo){
            return res.status(404).json({message:"Todo not found"});
        }

        res.status(200).json(deletedTodo);
    }catch(e){
        console.log(e.message);
        res.status(500).json({success: false,message:'Server error'});
    }
}

module.exports = {getTodos,createTodo,updateTodo,deleteTodo};