<template>
    <div>
        <reqnum :obj='this.numObj'></reqnum>
        <reqtime :obj='this.timeObj'></reqtime>
    </div>
</template>
<script>
import reqnum from '.././Charts/LineChart'
import reqtime from '.././Charts/LineCharts'
export default {
    data(){
        return {
            numObj:{name:'接口请求数',sumName:'总请求数',num:[[],[],[]]},
            timeObj:{name:null,theme:1,num:[]}
        }
    },
    created(){
        this.setNumData()
        this.setTimeData()
    },
    components:{
        reqnum,
        reqtime
    },
    methods:{
        setNumData(){
            for(let i=0;i<3;i++){
                for(let j=0;j<24;j++){
                    this.numObj.num[i][j]=Math.ceil(Math.random()*1000)
                }
            }
        },
        setTimeData(){
            this.timeObj.name = '接口响应时间'
            this.timeObj.theme = 1
            for (let i = 0; i < 50; i++) {
                for (let j = 1; j < 12; j++)
                this.timeObj.num.push([ "201" + i + "/" + j + "/" + "20",
                    Math.ceil(Math.random() * 1000)
                ]);
            }
        }
    }
}
</script>
<style scoped>
    div{
        width: 100%;
        padding-bottom:30px;
    }
</style>
