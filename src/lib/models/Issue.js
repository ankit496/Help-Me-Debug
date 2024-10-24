import mongoose from "mongoose"
const issueSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    issue:{
        type:String,
        required:true
    },
    comments:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Comments'
    },
    votes:{
        type:Number,
        default:0
    },
    hasVoted:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'User'
    },
    type:{
        type:String,
        enum:['Web','DSA','Interview','Others'],
        default:'Others'
    },
    status:{
        type:String,
        enum:['Pending','Resolved'],
        default:'Pending'
    }
},{timestamps:true})

const Issue=mongoose.models?.Issue||mongoose.model('Issue',issueSchema);
export default Issue