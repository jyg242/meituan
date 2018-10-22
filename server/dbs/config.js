export default{
    //设置数据库,数据库名称student
    dbs:'mongodb://127.0.0.1:27017/student',
    //配置redis
    redis:{
    // 设置redis地址
        get host(){
            return '127.0.0.1'
        },
    // 设置redis端口
        get port(){
            return 6379
        }
    },    
    // 配置smtp
    smtp:{
        // 设置smtp主机
        get host(){
            return 'smtp.qq.com'
        },
        // 设置smtp的邮箱
        get user(){
            return '297138663@qq.com'
        },
        // 设置smtp的邮箱授权码
        get pass(){
            return 'baetmfnvoigxbiaj'
        },
        //设置邮箱验证码的生成方式
        get code(){
            return ()=>{
                return Math.random().toString(16).slice(2,6).toUpperCase()
            }
        },
        //设置验证码有效时间
        get expire(){
            return ()=>{
                return new Date().getTime()+60*60*1000
            }
        }
    }            
}