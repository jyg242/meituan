<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span='3' class="left">
        <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt=""></el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input placeholder="搜索商家或地点" v-model="search"
           @focus="focus" @blur="blur" @input="input"/>
          <button class="el-button el-button--primary"><i class="el-icon-search"/></button>
          <dl 
          v-if="isHotPlace"
          class="hotPlace">
            <dt>热门搜索</dt>
            <dd v-for="(item,idx) in hotPlace" :key="idx">{{item}}</dd>           
          </dl>
          <dl 
          v-if="isSearchList"
          class="searchList">
            <dd v-for="(item,idx) in searchList" :key="idx">{{item}}</dd>
          </dl>
        </div>
        <p class="suggest">
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a>       
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="/" class="takeout">美团外卖</nuxt-link>
          </li>
           <li>
            <nuxt-link to="/" class="takeout">猫眼电影</nuxt-link>
          </li>
           <li>
            <nuxt-link to="/" class="takeout">美团酒店</nuxt-link>
          </li>
           <li>
            <nuxt-link to="/" class="takeout">名宿/公寓</nuxt-link>
          </li>
           <li>
            <nuxt-link to="/" class="takeout">商家入驻</nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="6" class="right">
        <ul class="security">
          <li><i class="refund"></i><p class="txt">随时退</p></li>
          <li><i class="single"></i><p class="txt">不满意免单</p></li>
          <li><i class="overdue"></i><p class="txt">过期退</p></li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data(){
    return{
      isFocus:false,
      search:'',
      hotPlace:['火锅','羊肉串','麻辣烫'],
      searchList:['故宫','天坛','天安门']
    }
  },
  computed:{
    isHotPlace(){
      return this.isFocus&&!this.search
    },
    isSearchList(){
      return this.isFocus&&this.search
    }
  },
  methods:{
    focus(){
      this.isFocus=true
    },
    blur(){
      // 推荐列表无法点处理方法
      let self=this;
      setTimeout(function(){
        self.isFocus=false
      },200)
    },
    input(){
      console.log('input')
    }
  }
}
</script>
<style>

</style>