<template>
  <div class="m-user">
    <template v-if='user'>
      欢迎您,<span class="username">{{Nuser}}</span>
      [<nuxt-link to="/exit">退出</nuxt-link>]
    </template>
    <template v-else>
      <nuxt-link to="/login" class="login">立即登录</nuxt-link>
      <nuxt-link to="/register" class="register">注册</nuxt-link>
    </template>
  </div>
</template>
<script>
import config from '../../../config';
export default {
  data(){
    return{
      user:'', 
      
    }
  },
  async mounted() {

    const {status,data:{user}}=await this.$axios.get(`http://${config.API}:3000/users/getUser`)
    if(status===200){
      this.user=user
      
    }
  },
  //对user进行计算属性uri反编码
  computed:{
    Nuser(){
      return decodeURIComponent(this.user)
    }
  }
}
</script>
<style>

</style>