<template>
    <div></div>
</template>
<script>
    import config from '../config';
    export default{
        layout:'blank',
        // 页面打开是利用中间件middleware触发函数
        middleware:async (ctx)=>{
            let {status,data}=await ctx.$axios.get(`http://${config.API}:3000/users/exit`)
            if(status===200 && data &&data.code===0){
                // 页面跳转
                window.location.href='/'
            }
        }
    }
</script>
<style>

</style>

