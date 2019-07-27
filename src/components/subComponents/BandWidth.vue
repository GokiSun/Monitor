<template>
    <div>
        <outBand :obj='this.outObj'></outBand>
        <inBand :obj='this.inObj'></inBand>
    </div>
</template>
<script>
import outBand from '../Charts/LineChart'
import inBand from '../Charts/LineChart'
export default {
    data(){
        return{
             outObj:{name:'出口带宽负载',sumName:'总负载',num:[[],[],[]]},
             inObj:{name:'入口带宽负载',sumName:'总负载',num:[[],[],[]]}
        }
    },
    created(){
        this.setOutData()
        this.setInData()
    },
    components:{
        outBand,
        inBand
    },
    methods:{
        setOutData(){
            for(let i=0;i<3;i++){
                for(let j=0;j<24;j++){
                    this.outObj.num[i][j]=Math.ceil(Math.random()*1000)
                }
            }
        },
        setInData(){
            for(let i=0;i<3;i++){
                for(let j=0;j<24;j++){
                    this.inObj.num[i][j]=Math.ceil(Math.random()*1000)
                }
            }
        }
    }
}
</script>
<style scoped>
    div{
        padding-bottom: 20px;
    }
</style>
