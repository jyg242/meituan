<template>
    <div class="page-changeCity">
        <el-row>
            <el-col :span="24"><Isselect/></el-col>
        </el-row>
        <el-row>
            <el-col :span="24">2</el-col>
        </el-row>
        <el-row>
            <el-col :span="24">3</el-col>
        </el-row>
    </div>
</template>
<script>
import Isselect from '@/components/changeCity/isselect'
    export default{
       data(){
           return{

           }
       },
       components:{
           Isselect
       } 
    }
</script>
<style>

</style>
