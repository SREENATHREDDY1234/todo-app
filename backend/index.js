const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

//Middleware
app.use(cors()); //Allow frontend communicate to backend
app.use(express.json()); //Parse json requires

//Test route
app.get('/',(req,res)=>{
    res.send('Todo App Backend is Running!');
});

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