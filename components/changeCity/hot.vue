<template>
    <div class="m-hcity">
        <dl>
            <dt>热门城市:</dt>
            <dd 
                v-for="item in list"
                :key='item.id'            
            >{{item.name==='市辖区'?item.province:item.name}}</dd>
        </dl>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                list:[]
            }
        },
        async mounted() {
            let {status,data:{hots}}=await this.$axios.get(`http://cp-tools.cn/geo/Hotcity?sign=f345fd3516adfb6e108e139e614756dc`)
            if(status===200){
                this.list=hots
            }
        }
    }
</script>
<style lang='scss'>
    @import '@/assets/css/changeCity/hot.scss';
</style>
