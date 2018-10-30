<template>
    <div v-if="abc">
        欢迎小飞{{$store.state.geo}}
    </div>
</template>
<script>
    export default{
       data(){
           return{
               abc:1
            
           }
       }
    }
</script>
<style>

</style>
