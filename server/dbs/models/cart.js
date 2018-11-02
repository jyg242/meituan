// --相当于创建user数据表--

// 引入mongoose模型
import mongoose from 'mongoose'
// 在Mongoose中，任何事情都是从Schema（模式）开始的。每一个模式映射到MongoDB集合，并且定义了这个集合中文档的模型。
const Schema = mongoose.Schema
    //创建用户表
const Cart = new Schema({
        id: {
            type: String,
            require: true //必须的
        },
        detail: {
            type: Array,
            require: true //必须的
        },
        // 购物车编号
        cartNo: {
            type: String,
            require: true //必须的
        },
        cartNo: {
            type: String,
            require: true //必须的
        },
        user: {
            type: String,
            require: true
        },
        time: {
            type: String,
            require: true
        }
    })
    // 导出这张表并取名为cart
export default mongoose.model('Cart', Cart)