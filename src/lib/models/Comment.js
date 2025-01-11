import mongoose from 'mongoose'
const commentSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    comment:{
        type:String,
        required:true
    },
    vote:{
        type:Number
    }
},{timstamps:true})
const Comments=mongoose.models?.Comments||mongoose.model('Comments',commentSchema)
export default Comments