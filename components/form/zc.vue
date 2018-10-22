<template>
    <div class="page-register">
       <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="昵称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email"></el-input> 
                <el-button size="mini" round @click='sendMsg'>发送验证码</el-button>
                <span class="status">{{statusMsg}}</span>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
                <el-input v-model="ruleForm.code" maxlength="4"></el-input> 
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
                <el-input v-model="ruleForm.pwd" type="password"></el-input> 
            </el-form-item>
            <el-form-item label="确认密码" prop="cpwd">
                <el-input v-model="ruleForm.cpwd" type="password"></el-input> 
            </el-form-item>
            <el-form-item>
                <el-button  type="primary" @click="register">同意以下协议并注册</el-button> 
                <div class="error">{{error}}</div>
            </el-form-item>
            <el-form-item>
                <a href='http://www.meituan.com/about/terms' target="_blank" class="f1">《美团网用户协议》</a>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                statusMsg:'',
                error:'',
                ruleForm:{
                    name:'',
                    code:'',
                    pwd:'',
                    cpwd:'',
                    email:''
                 },
                rules:{
                    name:[{
                        //required是否为必填项,type校验类型,message提示内容,trigger什么时候触发提示
                        required:true,type:'string',message:'请输入昵称',trigger:'blur'
                    }],
                    email:[{
                        required:true,type:'email',message:'请输入昵称',trigger:'blur'
                    }],
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
                    }]
                }
            }
        },
        methods:{
            sendMsg(){
                console.log('测试')
            },
            register(){

            }
        }
    }
</script>
<style scoped>
    
</style>
