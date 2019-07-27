<template>
    <div ref="Bar" style="width:100%;height:400px;"></div>
</template>
<script>
export default {
    name:'BarCharts',
    data(){
        return{
            dataArr:[]
        }
    },
    created(){
        this.Data()
    },
    mounted(){
        this.BarChart()
    },
     methods:{
        Data() {
            for (let j = 1; j < 8; j++)
            this.dataArr.push(['星期'+j,Math.ceil(Math.random()*1000)*0.8])
        },
        BarChart(){
        let myBar = this.$echarts.init(this.$refs.Bar)
        myBar.setOption({
            title:{
                text:'访问量',
                show:true
            },
            color: ['#3398DB'],
            tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : this.dataArr.map(function(item){
                        return item[0]
                    }),
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'直接访问',
                    type:'bar',
                    barWidth: '60%',
                    data: this.dataArr.map(function(item){
                        return item[1]
                    })
                }
            ]
            })
            }
}
}
</script>
<style scoped>
    div{
        width: 50%;
        height: 40px;
        display:inline-block;
    }
</style>