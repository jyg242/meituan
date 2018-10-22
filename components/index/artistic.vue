<template>
  <section class="m-istyle">
    <dl @mouseover='over'>
      <dt>有格调</dt>
      <dd kind='kind'>全部</dd>
      <dd kind='part'>约会寄出</dd>
      <dd kind='spa'>丽人SPA</dd>
      <dd kind='movie'>电影演出</dd>
      <dd kind='travel'>品质出游</dd>
    </dl>
    <ul class="ibody">
      <li v-for="(item,idx) in curdetail" :key="idx">
        <el-card shadow="never" :body-style="{ padding: '0px' }">
          <img :src='item.img' alt="">
          <ul class="cbody">
            <li class="title">{{item.title}}</li>
            <li class="pos"><span>{{item.pos}}</span></li>
            <li class="price">{{item.price}}</li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>  
</template>
<script>
export default {
  data(){
    return{
      kind: 'all',
      list: {
        all: [],
        part: [{
                title:'测试',
                pos:'测试2',
                price:50,
                img:"//p1.meituan.net/merchantpic/910ff5d171dbf65452cc33fff6c86f86341227.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|368w_208h_1e_1c"}],
        spa: [{
                title:'测试',
                pos:'测试2',
                price:50,
                img:"//p1.meituan.net/merchantpic/910ff5d171dbf65452cc33fff6c86f86341227.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|368w_208h_1e_1c"},
                { 
                title:'测试',
                pos:'测试2',
                price:50,
                img:"//p1.meituan.net/merchantpic/910ff5d171dbf65452cc33fff6c86f86341227.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|368w_208h_1e_1c"
                }],
        movie: [{
                title:'测试',
                pos:'测试2',
                price:50,
                img:"//p1.meituan.net/merchantpic/910ff5d171dbf65452cc33fff6c86f86341227.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|368w_208h_1e_1c"},
                { 
                title:'测试',
                pos:'测试2',
                price:50,
                img:"//p1.meituan.net/merchantpic/910ff5d171dbf65452cc33fff6c86f86341227.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|368w_208h_1e_1c"
                },{ 
                title:'测试',
                pos:'测试2',
                price:50,
                img:"//p1.meituan.net/merchantpic/910ff5d171dbf65452cc33fff6c86f86341227.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|368w_208h_1e_1c"
                }],
        travel: [{
                title:'测试',
                pos:'测试2',
                price:50,
                img:"//p1.meituan.net/merchantpic/910ff5d171dbf65452cc33fff6c86f86341227.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|368w_208h_1e_1c"},
                { 
                title:'测试',
                pos:'测试2',
                price:50,
                img:"//p1.meituan.net/merchantpic/910ff5d171dbf65452cc33fff6c86f86341227.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|368w_208h_1e_1c"
                },{ 
                title:'测试',
                pos:'测试2',
                price:50,
                img:"//p1.meituan.net/merchantpic/910ff5d171dbf65452cc33fff6c86f86341227.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|368w_208h_1e_1c"
                },
                { 
                title:'测试',
                pos:'测试2',
                price:50,
                img:"//p1.meituan.net/merchantpic/910ff5d171dbf65452cc33fff6c86f86341227.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|368w_208h_1e_1c"
                }]
      }
      
    }
  },

  computed:{
    curdetail(){
    
      return this.list[this.kind]
    }
  },
  methods:{
    over(e){
      let str=e.target.getAttribute('kind')
      if(typeof str==='string'){
      this.kind = str}
      console.log(this.kind)}
      
    },
  created() {
    this.kind='spa'
  },  
  }

</script>
<style lang="scss">
    @import "@/assets/css/index/artistic.scss";
</style>