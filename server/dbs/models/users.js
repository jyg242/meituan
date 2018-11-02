// --相当于创建user数据表--

// 引入mongoose模型
import mongoose from 'mongoose'
// 在Mongoose中，任何事情都是从Schema（模式）开始的。每一个模式映射到MongoDB集合，并且定义了这个集合中文档的模型。
const Schema = mongoose.Schema
    //创建用户表
const UserSchema = new Schema({
        username: {
            type: String,
            unique: true, //唯一的
            require: true //必须的
        },
        password: {
            type: String,
            require: true //必须的
        },
        phone: {
            type: String,
            require: true //必须的
        }
    })
    // 导出这张表并取名为User
export default mongoose.model('User', UserSchema)