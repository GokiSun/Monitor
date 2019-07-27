<template>
    <div class="content">
    <h2>预警通知方式</h2>
    <el-radio v-model="radio1" label="1" border>邮箱</el-radio>
    <el-radio v-model="radio1" label="2" border>短信</el-radio>
    </div>
</template>
<script>
export default {
    data(){
       return {
            radio1: '1'
       }
    },
    watch:{
        radio1:function(newVal){
             console.log('radio1---'+newVal)
        }
    }
}
</script>
<style scoped>
.content{
    text-align: left
}
h2{
    font-size: 20px;

}
</style>
