// ---这里相当于geo的路由列表---

// 引入koa-ruter模块
import Router from 'koa-router';
// 导入axios
import axios from './utils/axios'

// 创建路由对象并定义前缀
let router = new Router({ prefix: '/categroy' })

const sign = 'f345fd3516adfb6e108e139e614756dc'

router.get('/crumbs', async(ctx) => {
    let { status, data: { areas, types } } = await axios.get('http://cp-tools.cn/categroy/crumbs', {
        params: {
            city: ctx.query.city.replace('市', '') || '北京',
            sign
        }
    })

    ctx.body = {
        areas: status === 200 ? areas : [],
        types: status === 200 ? types : []
    }
})

export default router;