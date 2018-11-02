<template>
    <el-table
        :data="cartDate"
        style="width: 980px">
        <el-table-column
            label="项目"
            prop="name"
            width="532px"/>
        <el-table-column
            label="单价"
            prop="price"
            width="132px"/>
        <el-table-column
            label="数量"
            width="212px">
            <template slot-scope="scope">
                <el-input-number 
                v-model="scope.row.count" 
                :min="0"/>  
            </template>
        </el-table-column>
        <el-table-column
            label="总价">
            <template slot-scope="scope">
                <div class="">
                    {{scope.row.price*scope.row.count}}
                </div>
            </template>
        </el-table-column>                    
    </el-table>   
</template>
<script>
export default{
    props:{
        cartDate:{
            type:Array,
            default(){
                return []
            }
        }
    },
    created() {
        // console.log(this.cartDate)
    },
}
</script>

