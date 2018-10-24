const state = ()=>({
    menu:[],
    hotplace:[]

})
const mutations={
    setMenu(state,val){
        state.menu=val
    },
    setHotplace(state,val){
        state.hotplace=val
    },
}
const actions={
    setMenu:function({commit},menu){
        commit('setMenu',menu)
    },
    setHotplace:function({commit},hotplace){
        commit('setHotplace',hotplace)
    },
}
export default{
    // vuex中的store分模块管理为了解决不同模块命名冲突的问题，将不同模块的namespaced:true，
    // 之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
    namespaced:true,
    state,
    mutations,
    actions
}