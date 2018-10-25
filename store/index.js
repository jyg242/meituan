import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import home from './modules/home'


Vue.use(Vuex)
// 采坑--Store注意
const store =()=>new Vuex.Store({
    modules:{
        geo,
        home
    },
    actions:{
        async nuxtServerInit({
            commit
        },{req,app}){
            // 页面加载触发,发送访问路由的请求 ssr渲染geo发送请求回来的值
            const {status,data:{province,city}}= await app.$axios.get('http://127.0.0.1:3000/geo/getPosition')
                // 传参,调用geo下的setposition函数
            commit('geo/setPosition',status===200?{city,province}:{city:'',province:''})

            // ssr渲染menu发送请求回来的值
            const {status:status2,data:{menu}}= await app.$axios.get('http://127.0.0.1:3000/geo/menu')
                // 传参,调用home下的setmenu函数
            commit('home/setMenu',status2===200?menu:[])

            // ssr渲染result发送请求回来的值
            const {status:status3,data:{result}}= await app.$axios.get('http://127.0.0.1:3000/search/hotplace',{
                params:{
                    city:app.store.state.geo.position.city.replace('市','')
                }
            })
            
            // 传参,调用home下的sethotplace函数
            commit('home/setHotplace',status3===200?menu:[])
            
            
        }
    }
})
export default store

