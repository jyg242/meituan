// 登录验证模块

// passport是做登录验证的中间件，必须添加策略才能工作
import passport from 'koa-passport'
// passport-local是本地验证策略
import LocalStrategy from 'passport-local'
//引入users数据模型
import UserModel from '../../dbs/models/users'

passport.use(new LocalStrategy(async function(username,password,done){
    let where ={
        username
    };
    let result=await UserModel.findOne(where)
    if(result!=null){
        if(result.password===password){
            return done(null,result)
        }else{
            return done(null,false,'密码错误')
        }
    }else{
        return done(null,false,'用户不存在')
    }
}))
// Session相关
passport.serializeUser(function(user,done){
    done(null,user)
})
passport.deserializeUser(function(user,done){
    return done(null,user) 
})
export default passport