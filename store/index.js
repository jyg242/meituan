import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import home from './modules/home'
import art from './modules/art'


Vue.use(Vuex)
    // 采坑--Store注意
const sign = 'f345fd3516adfb6e108e139e614756dc'
const store = () => new Vuex.Store({
    modules: {
        geo,
        home,
        art
    },
    actions: {
        async nuxtServerInit({
            commit
        }, { req, app }) {
            // 页面加载触发,发送访问路由的请求 ssr渲染geo发送请求回来的值
            const { status, data: { province, city } } = await app.$axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
                // 传参,调用geo下的setposition函数
            commit('geo/setPosition', status === 200 ? { city, province } : { city: '', province: '' })

            // ssr渲染menu发送请求回来的值
            const { status: status2, data: { menu } } = await app.$axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`)
                // 传参,调用home下的setmenu函数
            commit('home/setMenu', status2 === 200 ? menu : [])

            // ssr渲染result发送请求回来的值
            const { status: status3, data: { result } } = await app.$axios.get('http://cp-tools.cn/search/hotplace', {
                    params: {
                        city: app.store.state.geo.position.city.replace('市', ''),
                        // city: '南京',
                        sign
                    }
                })
                // console.log(status3, result)
                // 传参,调用home下的sethotplace函数
            commit('home/setHotplace', status3 === 200 ? result : [])



            // const { status: status4, data: { count, pois } } = await app.$axios.get('http://cp-tools.cn/search/resultsByKeywords', {
            //     params: {
            //         keyword: '景点',
            //         city: app.store.state.geo.position.city,
            //         sign
            //     }
            // })
            // console.log(121, status4)
            //     // console.log(status3, result)
            //     // 传参,调用home下的sethotplace函数
            // commit('art/setall', status4 === 200 ? { count, pois } : {})


        }
    }
})
export default store