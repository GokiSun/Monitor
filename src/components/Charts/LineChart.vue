<template>
    <div ref="Line" style="width:100%;height:400px;"></div>
</template>
<script>
export default {
    props:['obj'],
    data(){
        return {
            titleLine:[],
            xData:['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00',
            '12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','03:00'],
            DataArr:[[],[],[]],
            sum:[]
        }
    },
    mounted(){
        this.getSum()
        this.drawChart()
    },
    methods:{
        getSum(){
            let temp;
            for(let i=0;i<24;i++){
                temp = 0;
                for(let j=0;j<3;j++){
                    temp+=this.obj.num[j][i]
                }
                this.sum.push(temp)
            }
        },
    drawChart(){
        let myChart = this.$echarts.init(this.$refs.Line)
        myChart.setOption({
            title: {
            text: this.obj.name
        },
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data:['今天','昨天','上周',this.obj.sumName]
        },
        toolbox: {
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        dataZoom: [{
            startValue: '00:00'
        },{
            type: 'inside'
        }],
        toolbox: {
            left: 'right',
            feature: {
                dataZoom: {
                    yAxisIndex: 100
                },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : this.xData
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'今天',
                type:'line',
                stack: '总量',
                areaStyle: {},
                data:this.obj.num[0]
            },
            {
                name:'昨天',
                type:'line',
                stack: '总量',
                areaStyle: {},
                data:this.obj.num[1]
            },
            {
                name:'上周',
                type:'line',
                stack: '总量',
                areaStyle: {},
                data:this.obj.num[2]
            },
            {
                name:this.obj.sumName,
                type:'line',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                areaStyle: {normal: {}},
                data:this.sum
            }
        ]
                })
            }
        }
}
</script>
<style scoped>

</style>
