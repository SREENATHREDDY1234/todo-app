const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

const app = express();

//Middleware
const allowedOrigins = [
    'https://todo-app-ruby-five-11.vercel.app',
    'http://localhost:5173'
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
})); //Allow frontend communicate to backend
app.use(express.json()); //Parse json requires



//Test route
app.get('/',(req,res)=>{
    res.send('Todo App Backend is Running!');
});
//user routes
app.use('/api/auth',authRoutes);
//todo routes
app.use('/api/todos',todoRoutes);


//Mongodb Connection
const PORT = process.env.PORT || 5000
mongoose.connect(`${process.env.MONGODB_URL}/todo`)
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`Server is running in port ${PORT} and MongoDB connected!`);
        });
    })
    .catch((e)=>{
        console.log('MongoDB connection error : ',e);
    });
