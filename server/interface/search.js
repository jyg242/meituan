// ---这里相当于geo的路由列表---

// 引入koa-ruter模块
import Router from 'koa-router';
// 导入axios
import axios from './utils/axios'

// 创建路由对象并定义前缀
let router = new Router({prefix: '/search'})

const sign='f345fd3516adfb6e108e139e614756dc'
// 搜索推荐
router.get('/top',async (ctx)=>{
    let {status,data:{top}}=await axios.get(`http://cp-tools.cn/search/top`,{
        params:{
            input:ctx.query.input,
            city:ctx.query.city,
            sign
        }
    })
    ctx.body={top:status===200?top:[]}
    
    
})
// 热门搜索
router.get('/hotplace',async (ctx)=>{
    let city=ctx.store?ctx.store.geo.position.city:ctx.query.city;
    let {status,data:{result}}=await axios.get(`http://cp-tools.cn/search/hotplace`,{
        params:{
            city,
            sign
        }
    })
    ctx.body={top:status===200?result:[]}
    
    
})
//artistic
router.get('/resultsByKeyWords',async (ctx)=>{
    const {city,keyword}=ctx.query;
    let {status,data:{count,pois}}=await axios.get(`http://cp-tools.cn/search/resultsByKeyWords`,{
        params:{
            city,
            keyword,
            sign
        }
    })
    ctx.body={count:status===200?count:0,
              pois:status===200?pois:[]      
    }
    console.log(count)
    
})


export default router;