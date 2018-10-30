<template>
    <div class="">
        <dl class="m-categroy">
            <dt>按拼音首字母选择:</dt>
            <dd 
            v-for="item in list"
            :key="item.title">
                <a :href="'#city-'+item">{{item}}</a>
            </dd>
        </dl>
        <dl v-for="item in block" 
            :key="item.title" 
            class="m-categroy-section">
            <dt :id="'city-'+item.title">{{item.title}}</dt>
            <dd>
                <span v-for="c in item.city"  
            :key="c">{{c}}</span></dd>
        </dl>
    </div>
</template>
<script>
import pyjs from 'js-pinyin'
    export default{
        data(){
            return {
                //把字符串装换为数组,拼音字母选择列表
                list:'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
                // 详细城市列表内容
                block:[]
            }
        },
        async mounted() {
            console.log(this.list)
            let self=this;
            let block=[];
            let {status,data:{city}}=await self.$axios.get('http://127.0.0.1:3000/geo/city')
            if(status===200){
                // 城市首字母
                let p
                //城市首字母对应的code值
                let c
                let d={}
                let blocks=[];
                city.forEach(item => {
                    // 获取城市的全拼,并截取首字母
                    p=pyjs.getFullChars(item.name).toLowerCase().slice(0,1)
                    c=p.charCodeAt(0)
                    if(c>96&&c<123){
                        if(!d[p]){
                            d[p]=[]
                        }
                        d[p].push(item.name)
                    }
                })
                for(let [k,v] of Object.entries(d)){
                    blocks.push({
                        title:k.toUpperCase(),
                        city:v
                    })
                }
                blocks.sort((a,b)=>a.title.charCodeAt(0)-b.title.charCodeAt(0))
                self.block=blocks
            }
        },
    }
</script>
<style lang='scss'>
    @import '@/assets/css/changecity/categroy.scss';
</style>
