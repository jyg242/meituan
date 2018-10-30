<template>
   <div class="m-products-list">
        <dl>
           <dd 
           v-for="item in nav" 
           :key="item.name"
           :class="[item.name,item.active?'s-nav-active':'']"
           @click="navSelect">{{item.txt}}</dd>
        </dl>
        <ul>
            <product
            v-for="(item,idx) in list"
            :key="idx"
            :meta='item'/>
        </ul>
    </div> 
</template>
<script>
import product from './product'
    export default{
        data(){
            return{
             nav: [
                    {
                    name: 's-default',
                    txt: '智能排序',
                    acitve: true
                    }, {
                    name: 's-price',
                    txt: '价格最低',
                    active: false
                    }, {
                    name: 's-visit',
                    txt: '人气最高',
                    active: false
                    }, {
                    name: 's-comment',
                    txt: '评价最高',
                    active: false
                    }
                ]
            }
        },
        props:{
            list:{
                type:Array,
                default(){
                    return[]
                }
            }
        },
        components:{
            product
        },
        methods:{
            navSelect(){
                console.log(1)
            }
        }
    }
</script> 
<style>

</style>
