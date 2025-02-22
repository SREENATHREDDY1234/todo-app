const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title : {type: String,required: true},
    description : {type: String},
    completed : {type: Boolean, deault:false},
    user: {type:mongoose.Schema.Types.ObjectId,ref: 'User',required: true},
    //Link todos to users
})

module.exports = mongoose.model('Todo',todoSchema);