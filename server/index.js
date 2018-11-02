// const Koa = require('koa')
import Koa from 'koa'
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
import mongoose from 'mongoose'
// 处理post请求
import bodyParser from 'koa-bodyparser'
//登录注册使用
import session from 'koa-generic-session'
import Redis from 'koa-redis'
// 这两一起使用上面
import json from 'koa-json'
import dbConfig from './dbs/config'
import passport from './interface/utils/passport'
import users from './interface/users'
import search from './interface/search'
import categroy from './interface/categroy'
import cart from './interface/cart'
// 导入geo路由列表
import geo from './interface/geo'
const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

// 设置签名的cookic秘钥,随便填写两个值
app.keys = ['mt', 'keyskeys']
    //让session
app.proxy = true
app.use(session({
    key: 'mt', //这里是cookise里session的名称
    prefix: 'mt:uid', //这里是cookise里session的名称前缀
    store: new Redis() //如果不添加次条属性session用的是内存,这里设置用的是redis
}))

app.use(bodyParser({
    extendTypes: ['json', 'form', 'text']
}))
app.use(json())
    // 链接数据库
mongoose.connect(dbConfig.dbs, {
        useNewUrlParser: true
    })
    // 配置session和passport
app.use(passport.initialize())
app.use(passport.session())

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
    // Instantiate nuxt.js
    const nuxt = new Nuxt(config)

    // Build in development
    if (config.dev) {
        const builder = new Builder(nuxt)
        await builder.build()
    }
    // 设置路由器
    app.use(users.routes()).use(users.allowedMethods())
    app.use(geo.routes()).use(geo.allowedMethods())
    app.use(search.routes()).use(search.allowedMethods())
    app.use(categroy.routes()).use(categroy.allowedMethods())
    app.use(cart.routes()).use(cart.allowedMethods())
    app.use(ctx => {
        ctx.status = 200 // koa defaults to 404 when it sees that status is unset

        return new Promise((resolve, reject) => {
            ctx.res.on('close', resolve)
            ctx.res.on('finish', resolve)
            nuxt.render(ctx.req, ctx.res, promise => {
                // nuxt.render passes a rejected promise into callback on error.
                promise.then(resolve).catch(reject)
            })
        })
    })

    app.listen(port, host)
    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
    })
}

start()