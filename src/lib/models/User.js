import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const SALT=bcrypt.genSaltSync(10);
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
    },
    salt:{
        type:String
    },
    password:{
        type:String,
    },
    profilePic:{
        type:String
    }
},{timestamps:true})

const User=mongoose?.models?.User||mongoose?.model('User',userSchema);
export default User