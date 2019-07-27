<template>
    <div ref="main" style="width:100%;height:400px"></div>
</template>
<script>
export default {
    data(){
        return {
            data : [],
            now : +new Date(2019, 7, 25),
            oneDay : 24 * 3600 * 1000,
            value : Math.random() * 1000,
        }
    },
    created(){
        for (var i = 0; i < 1000; i++) {
        this.data.push(this.randomData());
        }
    },
    mounted(){
        this.drawChart()
    },
    methods:{
        randomData() {
            this.now = new Date(+this.now + this.oneDay);
            this.value = this.value + Math.random() * 21 - 10;
            return {
                name: this.now.toString(),
                value: [
                    [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'),
                    Math.round(this.value)
                ]
            }
        },
        drawChart(){
            let _this = this
            let myChart = this.$echarts.init(this.$refs.main)
            setInterval(function(){
             for (var i = 0; i < 5; i++) {
                 
             _this.data.shift();
             _this.data.push(_this.randomData());
                }
            myChart.setOption({
            title: {
                text: '动态数据 + 时间坐标轴'
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    params = params[0];
                    var date = new Date(params.name);
                    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
                },
                axisPointer: {
                    animation: false
                }
            },
            dataZoom:[{
                type:'inside'
            }],
            xAxis: {
            type: 'time',
            splitLine: {
                show: false
            }
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                }
            },
            series: [{
                name: '模拟数据',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: _this.data
            }]
            })
            },1000)
        }
    }
}
</script>
