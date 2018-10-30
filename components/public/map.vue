<template>
    <div
    :id="id"
    :style="{width:width+'px',height:height+'px',margin:'34px auto'}"
    class="m-map"/>
</template>
<script>
  export default{
    props:{
        width:{
            type:Number,
            default:300
        },
        height:{
            type:Number,
            default:300
        },
        point:{
            type:Array,
            default(){
                return [116.46,39.92]
            }
        }
    },
    data(){
        return{
            id:'map',
            key:'59df6f6bcd756956d5f208d615a221c4'
        }
    },
    watch:{
        point:function(val,old){
            this.map.setCenter(val),
            this.marker.setPosition(val)
        }
    },
    mounted() {
        let self=this;
        self.id=`map${Math.random().toString().slice(4,6)}`,
        window.onmaploaded=()=>{
            // 实例化一个地图空间的类
            let map=new window.AMap.Map(self.id,{
                resizeEnable:true,
                zoom:11,
                center:self.point
            }) 
        self.map=map
        //引入插件 AMap.ToolBar(工具条，控制地图的缩放、平移等)
        window.AMap.plugin('AMap.ToolBar',()=>{
            let toolbar=new window.AMap.ToolBar()
            map.addControl(toolbar)
            //点标记
            let marker=new window.AMap.Marker({
                //点标记图标样式
                icon:'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
                position:self.point
            })
            self.marker=marker
            marker.setMap(map)
            })
        }
        const url='https://webapi.amap.com/maps?v=1.4.10&key=${self.key}&callback=onmaploaded'
        let jsapi=document.createElement('script')
        jsapi.charset='utf-8'
        jsapi.src=url
        document.head.appendChild(jsapi)
    },
  }  
</script>
<style>

</style>
