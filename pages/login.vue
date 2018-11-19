<template>
    <div class="page-login">
        <div class="login-header">
            <a href="/" class="logo"></a>
        </div>
        <div class="login-panel">
            <div class="banner">
                <img src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg" alt="">
            </div>
            <div class="form">
                   <h4 
                        v-if="error" 
                        class="tips"><i/>{{error}}</h4>
                    <p><span>账号登录</span></p>
                    <el-input 
                    v-model="username"
                    prefix-icon="profile"></el-input>
                    <el-input
                        v-model="password"
                        prefix-icon="password"
                        type="password"></el-input>
                    <div class="foot">
                        <el-checkbox
                            v-model="checked">7天内自动登录</el-checkbox>
                        <b>忘记密码?</b>    
                    </div>
                    <el-button 
                        class="btn-login"
                        type="success"
                        size="mini"
                        @click="login">登录</el-button>    
            </div>
        </div>
    </div>
    
</template>
<script>
import CrytoJS from 'crypto-js'
import config from '../config'
    export default{
        layout:'blank',
        data(){
            return{
                
                checked:'',
                username:'',
                password:'',
                error:''
            }
        },
        methods:{
            login(){
                let self=this;
                self.$axios.post(`http://${config.API}:3000/users/signin`,{
                    username:window.encodeURIComponent(self.username),
                    password:CrytoJS.MD5(self.password).toString()

                }).then(({status,data})=>{
                    if(status===200){
                        if(data&&data.code===0){
                            location.href='/'
                        }else{
                            self.error=data.msg
                            // 登录失败提示信息定时清除
                            setTimeout(function(){
                            self.error=''
                          },1500)
                        }
                    }else{
                        self.error=`服务器登录出错`
                        setTimeout(function(){
                            self.error=''
                          },1500)
                    }
                })
            }
         } ,
         mounted() {
             console.log(this.$route.params.id)
         },    
    } 
</script>
<style lang="scss">
    @import "@/assets/css/login/index.scss";
</style>
