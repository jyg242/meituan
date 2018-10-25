<template>
    <div class="m-isselect">
        <span class="name">按省份选择:</span>
        <el-select v-model="pvalue" placeholder="省份">
            <el-option
            v-for="item in province"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-select v-model="cvalue" placeholder="城市" :disabled="!city.length">
            <el-option
            v-for="item in city"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <span class="name">直接搜索:</span>
        <el-autocomplete
            v-model="input"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入城市中文或拼音"
            @select="handleSelect">
        </el-autocomplete>
    </div>
</template>
<script>
   export default{
       data(){
           return {
               province:[],
               pvalue:'',
               city:[],
               cvalue:'',
               input:''

           }
       }, 
    //    监视省市联动变化
       watch:{
            pvalue:async function(newPvalue){
                let self=this;
                let {status,data:{city}}=await self.$axios.get(`http://127.0.0.1:3000/geo/province/${newPvalue}`)
                if(status===200){
                    self.city=city.map(item=>{
                        return {
                            value:item.id,
                            label:item.name
                        }
                    })
                    self.cvalue=''
                }
            }
       },
    //    页面打开时加载下面所有省份列表
       mounted:async function(){
           let self=this;
           console.log('MOUNTED')
           let {status,data:{province}}=await self.$axios.get('http://127.0.0.1:3000/geo/province')
           console.log(status,province)
            if(status===200){
                self.province=province.map(item=>{
                    return {
                        value:item.id,
                        label:item.name
                    }
                })
            }
       }, 
       methods:{
           querySearchAsync:function(){
            
           },
            handleSelect:function(){

            }
       }
   } 
</script>
<style lang='scss'>
    @import '@/assets/css/changecity/iselect.scss';
</style>
