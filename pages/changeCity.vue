<template>
    <div class="page-changeCity">
        <el-row>
            <el-col :span="24"><Isselect/></el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><Hot/></el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><category/></el-col>
        </el-row>
    </div>
</template>
<script>
import Isselect from '@/components/changeCity/isselect'
import Hot from '@/components/changeCity/hot'
import Category from '@/components/changeCity/category'
    export default{
        layout:'default_b',
       data(){
           return{
               
           }
       },
       components:{
           Isselect,
           Hot,
           Category
       } 
    }
</script>
<style>

</style>
