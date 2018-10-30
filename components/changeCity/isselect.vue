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
        <span class="name-2">直接搜索:</span>
        <el-autocomplete
            v-model="input"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入城市中文或拼音"
            @select="handleSelect">
        </el-autocomplete>
    </div>
</template>
<script>
// 延迟处理模块
import _ from 'lodash'
   export default{
       data(){
           return {
               province:[],
               pvalue:'',
               city:[],
               cvalue:'',
               input:'',
               cities:[]

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
           let {status,data:{province}}=await self.$axios.get('http://127.0.0.1:3000/geo/province')
        //    console.log(status,province)
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
        //    query用户输入的内容 :fetch-suggestions用户输入时触发下面这个事件
           querySearchAsync:_.debounce(async function(query,cb){
                let self=this;
                if(self.cities.length){
                    // 搜索输入的文字内容城市
                    cb(self.cities.filter(item=>item.value.indexOf(query)>-1))
                }else{
                    // 如果没有cities数据,发送第一次请求
                    let {status,data:{city}}=await self.$axios.get('http://127.0.0.1:3000/geo/city')
                    if(status===200){
                        // 改变cities的数据结构
                        self.cities=city.map(item=>{
                            return {value:item.name}
                        })
                        cb(self.cities.filter(item=>item.value.indexOf(query)>-1))
                    }else{
                        cb([])
                    }
                }  
           },200),
            handleSelect:function(item){
                // console.log(item.value)
                // window.location.href='/'
                this.$router.push({
          name: 'login',
          params: {
            id: 5
          }
        })
                

            }
       }
   } 
</script>
<style lang='scss'>
    @import '@/assets/css/changecity/iselect.scss';
</style>
