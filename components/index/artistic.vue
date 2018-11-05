<template>
  <section class="m-istyle">
    <dl @mouseover='over'>
      <dt>有格调</dt>
      <dt kind='kind' keyword='all' :class="{active:kind==='all'}">全部</dt>
      <dd kind='part' keyword='美食' :class="{active:kind==='part'}">约会寄出</dd>
      <dd kind='spa'  keyword='丽人' :class="{active:kind==='spa'}">丽人SPA</dd>
      <dd kind='movie' keyword='电影' :class="{active:kind==='movie'}">电影演出</dd>
      <dd kind='travel' keyword='旅游' :class="{active:kind==='travel'}">品质出游</dd>
    </dl>
    <ul class="ibody">
      <li v-for="item in curdetail" :key="item.title">
        <nuxt-link :to="'/detail?keyword='+item.title"><el-card shadow="never" :body-style="{ padding: '0px' }">
          <img :src='item.img' alt="">
          <ul class="cbody">
            <li class="title">{{item.title}}</li>
            <li class="pos"><span>{{item.pos}}</span></li>
            <li class="price">{{item.price!=null>0?item.price:'进店详询'}}</li>
          </ul>
        </el-card></nuxt-link>
      </li>
    </ul>
  </section>  
</template>
<script>
import img from '@/assets/img/timg.gif'
export default {
 
  data(){
    return{
      
      kind: 'all',
      list: {
        all:[{img},{img},{img},{img},{img},{img},{img},{img},{img}],
        part:[{img},{img},{img},{img},{img},{img},{img},{img},{img}],
        spa:[{img},{img},{img},{img},{img},{img},{img},{img},{img}],
        movie:[{img},{img},{img},{img},{img},{img},{img},{img},{img}],
        travel:[{img},{img},{img},{img},{img},{img},{img},{img},{img}]
      }  
    } 
  },

  computed:{
    curdetail(){
      return this.list[this.kind]
    }
  },
  async mounted(){
    let self=this;
    let {status,data:{count,pois}}=await self.$axios.get('http://cp-tools.cn/search/resultsByKeywords?sign=f345fd3516adfb6e108e139e614756dc',{
      params:{
        keyword:'景点',
        city:self.$store.state.geo.position.city
      }
    })
    if(status===200&&count>0){
      let r= pois.filter(item=>item.photos.length).map(item=>{
        return {
          title:item.name,
          pos:item.type.split(';')[0],
          price:item.biz_ext.cost||'暂无',
          img:item.photos[0].url,
          url:'//abc.com'
        }
      })
      self.list[self.kind]=r.slice(0,9)
    }else{
      self.list[self.kind]=[]
    }
  },
  methods:{
   
    over:async function (e) {
      let dom=e.target
      let tag=dom.tagName.toLowerCase()
      let self=this
      if(tag==='dd'){
        this.kind=dom.getAttribute('kind')
        let keyword=dom.getAttribute('keyword')
        let {status,data:{count,pois}}=await self.$axios.get('http://cp-tools.cn/search/resultsByKeyWords?sign=f345fd3516adfb6e108e139e614756dc',{
          params:{
            keyword,
            city:self.$store.state.geo.position.city
          }
        })
        console.log(pois,status,count)
        if(status===200&&count>0){
          
          let r=pois.filter(item=>item.photos.length).map(item=>{
            return {
              title:item.name,
              pos:item.type.split(';')[0],
              price:item.biz_ext.cost||'暂无',
              img:item.photos[0].url,
              url:"//abc.com"
            }
          })
          
          self.list[self.kind]=r.slice(0,9)
        }else{
          self.list[self.kind]=[]
        }
      }
    }
  }}

</script>
<style lang="scss">
    @import "@/assets/css/index/artistic.scss";
</style>