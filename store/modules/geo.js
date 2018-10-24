const state = ()=>({
    position:{}
})
const mutations={
    setPosition(state,val){
        state.position=val
    }
}
const actions={
    setPosition:function({commit},position){
        commit('setPosition',position)
    }
}
export default{
    // vuex中的store分模块管理为了解决不同模块命名冲突的问题，将不同模块的namespaced:true，
    // 之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
    namespaced:true,
    state,
    mutations,
    actions
}