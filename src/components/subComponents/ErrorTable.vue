<template>
    <el-table :data="getData()" height="550" border style="width: 100%">
      <el-table-column prop="id" label="序号" width="180">
      </el-table-column>
      <el-table-column prop="date" label="日期">
      </el-table-column>
      <el-table-column prop="error" label="异常原因">
      </el-table-column>
    </el-table>
</template>
<script>
export default {
    data(){
        return{}
    },
    mounted(){
      console.log(this.data.msg)
       this.getData()
    },
    props:['data'],
    methods:{
        getData(){
            var res = []
            for(let i=0;i<this.data.msg.length;i++){
              res.push(this.data.msg[i])
            }
            return res;
        }
    }
}
</script>
<style>

</style>
