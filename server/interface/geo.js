// ---这里相当于geo的路由列表---

// 引入koa-ruter模块
import Router from 'koa-router';
// 导入axios
import axios from './utils/axios'

// 创建路由对象并定义前缀
let router = new Router({prefix: '/geo'})

const sign='f345fd3516adfb6e108e139e614756dc'
//获取当前城市定位
router.get('/getPosition',async (ctx)=>{
    let {status,data:{province,city}}=await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
    if(status===200){
        ctx.body={          
                province,
                city
            }
        }else{
        ctx.body={
                province:'',
                city:''
            }
        }
    
})
// 获取menu列表
router.get('/menu',async (ctx)=>{
    let {status,data:{menu}}=await axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`)
        if(status===200){
            ctx.body={          
                    menu
                }
                
            }else{
            ctx.body={
                    menu:[]
                }
            }
        
    })
// 获取所有省份
router.get('/province', async (ctx) => {
    let {status, data: {
        province
      }} = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`)
    ctx.body = {
      province: status === 200
        ? province
        : []
    }
  })
 //获取某省份下的城市
 router.get('/province/:id', async (ctx) => {
    let {status, data: {
        city
      }} = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}?sign=${sign}`)
    if (status === 200) {
      ctx.body = {
        city
      }
    } else {
      ctx.body = {
        city: []
      }
    }
  })
  //获取所有城市
  router.get('/city', async (ctx) => {
    let {status, data: {
        city
      }} = await axios.get(`http://cp-tools.cn/geo/city?sign=${sign}`);
    if (status === 200) {
      ctx.body = {
        city
      }
    } else {
      ctx.body = {
        city: []
      }
    }
  })
  //获取热门城市
  router.get('/hotCity', async (ctx) => {
    let {status, data: {
        hots
      }} = await axios.get(`http://cp-tools.cn/geo/Hotcity?sign=${sign}`);
    if (status === 200) {
      
      ctx.body = {
        hots
      }
      
    } else {
      
      ctx.body = {
        hots: []
      }
    }
  })
  // console.log(this.status,this.city)
export default router;