// ---这里相当于geo的路由列表---

// 引入koa-ruter模块
import Router from 'koa-router';
// 导入axios
import axios from './utils/axios'

// 创建路由对象并定义前缀
let router = new Router({ prefix: '/search' })

const sign = 'f345fd3516adfb6e108e139e614756dc'

router.get('/product', async(ctx) => {
    let keyword = ctx.query.keyword || '旅游'
    let city = ctx.query.city || '北京'
    let { status, data: { product, more } } = await axios.get(`http://cp-tools.cn/search/products/`, {
        params: {
            keyword,
            city,
            sign
        }
    })
    if (status === 200) {
        ctx.body = {
            product,
            more: ctx.isAuthenticated() ? more : [],
            login: ctx.isAuthenticated()
        }
    } else {
        ctx.body = {
            product: {},
            more: ctx.isAuthenticated() ? more : [],
            login: ctx.isAuthenticated()
        }
    }
})
export default router;