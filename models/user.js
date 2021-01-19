const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        unique: true,
        required: true,
        type:String,
    },
    password:{
        required: true,
        type:String,
        min:6,
    },
    record:{
        default:0,
        type:Number,
    }
},{timestamps:true})

const user = mongoose.model('User',userSchema);

module.exports = user;