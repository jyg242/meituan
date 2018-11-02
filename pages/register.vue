<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a
          href="/"
          class="site-logo" />
        <span class="login">
          <em class="bold">已有美团账号？</em>
          <a href="/login">
            <el-button
              type="primary"
              size="small">登录</el-button>
          </a>
        </span>
      </header>
    </article>
    <section>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item
          label="昵称"
          prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <!-- 邮箱验证.............................. -->
        <!-- <el-form-item
          label="邮箱"
          prop="email">
          <el-input v-model="ruleForm.email" />
          <el-button
            size="mini"
            round
            @click="sendMsg">发送验证码</el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>
        <el-form-item
          label="验证码"
          prop="code">
          <el-input
            v-model="ruleForm.code"
            maxlength="4" />
        </el-form-item> -->
        <!-- .................................... -->

        <!-- 手机验证.............................. -->
        <el-form-item
          label="手机"
          prop="phone">
          <el-input v-model="ruleForm.phone"/>
          <el-button
            size="mini"
            round
            @click="sendSMS">发送验证码</el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>
        <el-form-item
          label="验证码"
          prop="code">
          <el-input
            v-model="ruleForm.code"
            maxlength="4" />
        </el-form-item>
        <!-- .................................... -->
        <el-form-item
          label="密码"
          prop="pwd">
          <el-input
            v-model="ruleForm.pwd"
            type="password" />
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="cpwd">
          <el-input
            v-model="ruleForm.cpwd"
            type="password" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="register">同意以下协议并注册</el-button>
          <div class="error">{{ error }}</div>
        </el-form-item>
        <el-form-item>
          <a
            class="f1"
            href="http://www.meituan.com/about/terms"
            target="_blank">《美团网用户协议》</a>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
// 引入md5加密模块
import CryptoJS from 'crypto-js'
 export default{
        data(){
            return {
                statusMsg:'',
                error:'',
                ruleForm:{
                    name:'',
                    code:'',
                    pwd:'',
                    cpwd:'',
                    email:'',
                    phone:''   
                  },
                  rules:{
                      name:[{
                          //required是否为必填项,type校验类型,message提示内容,trigger什么时候触发提示
                          required:true,type:'string',message:'请输入昵称',trigger:'blur'
                      }],
                      email:[{
                          required:true,type:'email',message:'请输入邮箱',trigger:'blur'
                      }],
                      phone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                    
                      ],
                      pwd:[{
                          required:true,message:'创建密码',trigger:'blur'
                      }],
                      cpwd:[{
                          required:true,message:'确认密码',trigger:'blur'
                      },{
                          // 二次验证rule规则 value值 callback回调
                          validator:(rule,value,callback)=>{
                              if(value===''){
                                  callback(new Error('请再次输入密码'))
                              }else if(value!==this.ruleForm.pwd){
                                  callback(new Error('两次密码不一致'))
                              }else{
                                  callback()
                              }
                          },
                          trigger:'blur'
                      }],
                    } 
                  }  
                },
        layout: 'blank',
        methods:{
          // 手机发送验证码验证方法---------------
            sendSMS() {       
              const self=this;
              let namePass
              let phonePass
              // 倒计时没到无法执行
              if(self.timerid){
                  return false
                }
              // 获取ruleform对象验证name的校验规则是否通过，没通过返回true
              this.$refs['ruleForm'].validateField('name',(valid)=>{
                namePass=valid
              })
              self.statusMsg=''
              // 如何name没有通过验证
              if(namePass){
                return false
              }
              // 获取ruleform对象验证eamil的校验规则是否通过
              this.$refs['ruleForm'].validateField('phone',(valid)=>{
                phonePass=valid
              })
              const phone = self.ruleForm.phone;
              if( !namePass && !phonePass ) {
                self.$axios.post('http://127.0.0.1:3000/users/sendSMS', {phone}).then(({status,data}) => {
                  if(true){
                    console.log('验证码发送成功并返回')
                      let count=60;
                      self.statusMsg=`验证码已发送，剩余${count--}秒`
                      self.timerid=setInterval(function(){
                        self.statusMsg=`验证码已发送，剩余${count--}秒`
                      if(count===0){
                        clearInterval(self.timerid)
                        self.statusMsg=''
                        }
                      },1000)
                    }
                })
              }
            },
          // 邮箱发送验证码方法-----------
            // sendMsg(){
            //     const self=this;
            //     let namePass
            //     let phonePass
            //     // 倒计时不够60s无法执行
            //     if(self.timerid){
            //       return false
            //     }
            //     // 获取ruleform对象验证name的校验规则是否通过，没通过返回true
            //     this.$refs['ruleForm'].validateField('name',(valid)=>{
            //       namePass=valid
            //     })
            //     self.statusMsg=''
            //     // 如何name没有通过验证
            //     if(namePass){
            //       return false
            //     }
            //     // 获取ruleform对象验证eamil的校验规则是否通过
            //     this.$refs['ruleForm'].validateField('phone',(valid)=>{
            //       phonePass=valid
            //     })
            //     // 如果用户名和密码都通过表单验证了发送axios请求邮箱验证
            //     if(!namePass && !phonePass){
            //       console.log('发送验证码请求')
            //       self.$axios.post('http://127.0.0.1:3000/users/verify',{
            //         //对中文进行编码
            //         username:encodeURIComponent(self.ruleForm.name),
            //         email:self.ruleForm.phone
            //       }).then(({status,data})=>{
            //         if(status===200&&data&&data.code==0){
            //           let count=60;
            //           self.statusMsg=`验证码已发送，剩余${count--}秒`
            //           self.timerid=setInterval(function(){
            //             self.statusMsg=`验证码已发送，剩余${count--}秒`
            //           if(count===0){
            //             clearInterval(self.timerid)
            //             self.statusMsg=''
            //             }
            //           },1000)
            //         }else{
            //           self.statusMsg=data.msg
            //         }
            //       })
            //     }
            //   },
          // 注册提交方法
                register:function(){
                  let self=this;
                  // 对ruleForm对象所有属性规则进行验证，全部通过返回true
                  this.$refs['ruleForm'].validate((valid)=>{
                    if(valid){
                      console.log('发送注册请求')
                      self.$axios.post('http://127.0.0.1:3000/users/signup',{
                        username:window.encodeURIComponent(self.ruleForm.name),
                        password:CryptoJS.MD5(self.ruleForm.pwd).toString(),
                        phone:self.ruleForm.phone,
                        code:self.ruleForm.code
                      }).then(({status,data})=>{
                        if(status===200){
                          if(data&&data.code===0){
                            location.href='/login'
                          }else{
                            
                            self.error=data.msg
                            }
                          }else{
                            self.error=`服务器出错，错误码：${status}`
                          }
                          // 定时清空erro错误提示
                          setTimeout(function(){
                            self.error=''
                          },1500)            
                      })
                    }
                  })
                }   
        }
    }
</script>
<style lang="scss">
@import "@/assets/css/register/index.scss";
</style>