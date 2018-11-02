// ---这里相当于users的路由器---

// 引入koa-ruter模块
import Router from 'koa-router';
// reids让验证码和每个人对应上
import Redis from 'koa-redis'
// nodemailer模块用SMTP发邮件模块
import nodeMailer from 'nodemailer'
// 导入用户列表数据模型
import User from '../dbs/models/users'
// 导入登录验证中间件
import Passport from './utils/passport'
// 导入email配置
import Email from '../dbs/config'
// 导入axios
import axios from './utils/axios'

import UserController from '../controller/user';




// 创建路由对象并定义前缀
let router = new Router({ prefix: '/users' })
    // 获取redid客户端
let Store = new Redis().client
    // -----------------用户注册路由
router.post('/signup', async(ctx) => {
    const { username, password, phone, code } = ctx.request.body;
    // code是smtp发出去的随机验证码 expire是验证码的有效时间
    if (code) {
        // const saveCode = ctx.cookies.get('phoneid').toUpperCase()
        const saveCode = ctx.session.phoneid.toUpperCase()
        const savetime = ctx.session.timeid
        console.log(`提取到的cookies:${saveCode}`)
        if (code.toUpperCase() === saveCode) {
            if (new Date().getTime() - savetime > 0) {
                // 如已经过期返回
                ctx.body = {
                    code: -1,
                    msg: '验证码已过期，请重新尝试'
                }
                return false
            }
        } else {
            ctx.body = {
                code: -1,
                msg: '请填写正确的验证码'
            }
            return
        }
    } else {
        ctx.body = {
            code: -1,
            msg: '请填写验证码'
        }
        return
    }
    // 注册判断账号是否已注册
    let user = await User.find({ username })
    if (user.length) {
        ctx.body = {
            code: -1,
            msg: '已被注册'
        }
        return
    }
    // mongdb增加数据
    let nuser = await User.create({ username, password, phone })
    if (nuser) {
        let res = await axios.post('/users/signin', { username, password })
        if (res.data && res.data.code === 0) {
            ctx.body = {
                code: 0,
                msg: '注册成功',
                user: res.data.user
            }
        } else {
            ctx.body = {
                code: -1,
                msg: 'error'
            }
        }
    } else {
        ctx.body = {
            code: -1,
            msg: '注册失败'
        }
    }
})

// if (code) {
//     // 取出redis在nodemail发邮件时的验证码code、发送时间expire中的hash值

//     const saveCode = await Store.hget(`nodemail:${username}`, 'code')
//     const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
//     if (code === saveCode) {
//         if (new Date().getTime() - saveExpire > 0) {
//             // 如已经过期返回
//             ctx.body = {
//                 code: -1,
//                 msg: '验证码已过期，请重新尝试'
//             }
//             return false
//         }
//     } else {
//         ctx.body = {
//             code: -1,
//             msg: '请填写正确的验证码'
//         }
//         return
//     }
// } else {
//     ctx.body = {
//         code: -1,
//         msg: '请填写验证码'
//     }
//     return
// }
// 注册判断账号是否已注册
//     let user = await User.find({ username })
//     if (user.length) {
//         ctx.body = {
//             code: -1,
//             msg: '已被注册'
//         }
//         return
//     }
//     // mongdb增加数据
//     let nuser = await User.create({ username, password, email })
//     if (nuser) {
//         let res = await axios.post('/users/signin', { username, password })
//         if (res.data && res.data.code === 0) {
//             ctx.body = {
//                 code: 0,
//                 msg: '注册成功',
//                 user: res.data.user
//             }
//         } else {
//             ctx.body = {
//                 code: -1,
//                 msg: 'error'
//             }
//         }
//     } else {
//         ctx.body = {
//             code: -1,
//             msg: '注册失败'
//         }
//     }
// })
// -----------------用户登录路由
router.post('/signin', async(ctx, next) => {
        return Passport.authenticate('local', function(err, user, info, status) {
            if (err) {
                ctx.body = {
                    code: -1,
                    msg: err
                }
            } else {
                if (user) {
                    ctx.body = {
                        code: 0,
                        msg: '登录成功',
                        user
                    }
                    return ctx.login(user)
                } else {
                    ctx.body = {
                        code: 1,
                        msg: info
                    }
                }
            }
        })(ctx, next)
    })
    // -----------------验证码路由
router.post('/verify', async(ctx, next) => {
        let username = ctx.request.body.username
            // 获取验证码过期时间
        const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
        if (saveExpire && new Date().getTime() - saveExpire < 0) {
            ctx.body = {
                code: -1,
                msg: '验证请求过于频繁，1分钟内1次'
            }
            return false
        }
        // node使用smtp服务发送邮件
        let transporter = nodeMailer.createTransport({
                service: 'qq',
                auth: {
                    // config里配置smtp中发送邮件的用户名和密码
                    user: Email.smtp.user,
                    pass: Email.smtp.pass
                }
            })
            // 邮件发送的内容和接受方式
        let ko = {
                code: Email.smtp.code(),
                expire: Email.smtp.expire(),
                // 接收方方
                email: ctx.request.body.email,
                user: ctx.request.body.username
            }
            // 邮件中显示的内容
        let mailOptions = {
                from: `"认证邮件" <${Email.smtp.user}>`,
                // 收件人
                to: ko.email,
                // 邮件主题
                subject: '蒋亚光个人项目网站注册码',
                // 邮件内容
                html: `您在蒋亚光个人项目网站中注册验证码是${ko.code}，有效时间60秒。`
            }
            // 发送邮件
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error)
            } else {
                // 成功发送邮件时 在redis中存储对应的的hash值
                Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
            }
        })
        ctx.body = {
            code: 0,
            msg: '验证码已发送，可能会有延时，有效期1分钟'
        }
    })
    // -----------------注销路由
router.get('/exit', async(ctx, next) => {
        // 注销
        await ctx.logout()
            // 验证是否成功注销
        if (!ctx.isAuthenticated()) {
            ctx.body = {
                code: 0
            }
        } else {
            ctx.body = {
                code: -1
            }
        }
    })
    // -----------------获取用户名路由
router.get('/getUser', async(ctx) => {
    // 判断是否是登录状态
    if (ctx.isAuthenticated()) {
        const { username, email } = ctx.session.passport.user
            // 返回登录状态
        ctx.body = {
            user: username,
            email
        }
    } else {
        ctx.body = {
            user: '',
            email: ''
        }
    }
})

router.post('/sendSMS', UserController.sendSMS)
    //测试
router.get('/yzm', async(ctx) => {

    ctx.body = {
        msg: 123,

    }
})

export default router