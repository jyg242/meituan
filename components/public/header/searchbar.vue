<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span='3' class="left">
        <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt=""></el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input placeholder="搜索商家或地点" v-model="search"
           @focus="focus" @blur="blur" @input="input"/>
          <button class="el-button el-button--primary" @click='fnsearch'><i class="el-icon-search"/></button>
          <dl 
          v-if="isHotPlace"
          class="hotPlace">
            <dt>热门搜索</dt>
            <dd v-for="(item,idx) in $store.state.home.hotplace.slice(0,5)" :key="idx">
              <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{item.name}}</a></dd>           
          </dl>
          <dl 
          v-if="isSearchList"
          class="searchList">
            <dd v-for="(item,idx) in searchList" :key="idx">
              <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{item.name}}</a></dd>
          </dl>
        </div>
        <p class="suggest">
          <a 
          v-for=' (item,idx) in $store.state.home.hotplace.slice(0,5)' 
          :key="idx"
          :href="'/products?keyword='+encodeURIComponent(item.name)">{{item.name}}</a>        
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
import _ from 'lodash'
export default {
  data(){
    return{
      isFocus:false,
      search:'',
      hotPlace:[],
      searchList:[]
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
      fnsearch(){
          
          this.$router.push({
                  path:'/products',
                  query:{
                        keyword:this.search
                  }
          })
          // this.$router.go(0)
    },
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
    // 延时触发
    input:_.debounce(async function(){
        let self=this
        let city=self.$store.state.geo.position.city.replace('市','')
        console.log(city)
        self.searchList=[]
        let {status,data:{top}}=await self.$axios.get('http://cp-tools.cn/search/top?sign=f345fd3516adfb6e108e139e614756dc',{
          params:{
            input:self.search,
            city
          }
        })
        
        self.searchList=top.slice(0,10)
      },300)
    }
  
}
</script>
<style>

</style>