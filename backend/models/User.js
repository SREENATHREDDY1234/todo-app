const mongoose = require('mongoose');
const bcypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name : {type:String,required:true},
    email : {type:String,required:true,unique:true},
    password : {type:String,required:true},
});

//Hash Password before saving.
//pre('save',cb) it is hook given by mongoose module.
userSchema.pre('save',async(next)=>{
    if(!this.isModified('password'))next();
    //salt is the randomly generated string to add with 
    // our password to make our password encode stronger.
    const salt = bcypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password,salt);
});

module.exports = mongoose.model('User',userSchema);