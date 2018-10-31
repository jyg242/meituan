<template>
  <div class="m-geo">
    <!-- 固定用法1.获取vuex实例,2.获取状态,3.模块名称,4,5模块下的变量-->
    <i class="el-icon-location"/>{{$store.state.geo.position.city}}
    <nuxt-link
     class="changeCity" 
     to="/changeCity">切换城市</nuxt-link>
     [{{$store.state.geo.position.city}} {{$store.state.geo.position.province}}]
  </div>
</template>
<script>
export default {
  
}
</script>
<style>

</style>  