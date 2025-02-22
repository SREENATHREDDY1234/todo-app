const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');


const router = express.Router();

//Protect all todo routes with authentication middleware
router.use(authMiddleware);

//GET /api/todos (fetch all todos of the logged-in user)
router.get('/',getTodos);

//POST /api/todos (crate a new todo)
router.post('/',createTodo);

//PUT /api/todos/:id (update a todo)
router.put('/:id',updateTodo);

//DELETE /api/todos/:id (delete a todo)
router.delete('/:id',deleteTodo);



module.exports = router;