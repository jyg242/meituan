import mongoose from 'mongoose'
const Schema=mongoose.Schema
//创建用户表
const UserSchema=new Schema({
    username:{
        type:String,
        unique:true, //唯一的
        require:true //必须的
    },
    password:{
        type:String,
        require:true //必须的
    },
    password:{
        type:String,
        require:true //必须的
    }
})
export default mongoose.model('User',UserSchema)