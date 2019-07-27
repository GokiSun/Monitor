<template>
    <div>
        <div v-loading="loading" ref="main"></div>
    </div>
    
</template>
<script>
export default {
    data(){
        return {
            optionArr:[{value: 50, name: 'CPU负载'}],
            loading:true
        }
    },
    mounted(){
        this.drawChart()
    },
    methods:{
        drawChart(){
            var _this = this
            var option = this.optionArr
            let myChart = this.$echarts.init(this.$refs.main)
            setInterval(function () {
                _this.loading = false
                option[0].value = (Math.random() * 100).toFixed(2) - 0;
                myChart.setOption({
				title : {
				text: 'CPU负载情况',
				subtext: '纯属虚构',
				x:'center'
				},
                tooltip : {
                formatter: "{a} <br/>{b} : {c}%"
                },
                toolbox: {
                    feature: {
                        restore: {},
                        saveAsImage: {}
                    }
                },
                series: [
                {
                    name: 'CPU负载',
                    type: 'gauge',
                    detail: {formatter:'{value}%'},
                    data: option
                }
                ]
            }, true);
            },1000);
                
        }
    }
}
</script>
<style scoped>
    div{
        width:100%;
        height:400px;
    }
    .el-icon-loading{
        position: absolute;
    }
</style>
