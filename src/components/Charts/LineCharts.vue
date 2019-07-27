<template>
    <div ref="Line" style="width:100%;height:400px;"></div>
</template>
<script>
export default {
  name: "Charts",
  props:['obj'],
  data() {
    return {
      Chartname:'',
      dataArr: [],
      themeArr:[
          {id:0,theme:['#f8c8dd','#f5b5d0','#f29dc4','#ea6da5','#ea5098','#d81d4a','#e70012']},
          {id:1,theme:['#DDEC91','#D5EC62','#7C920E','#92A438','#B3D122','#809613','#687625']}
      ],
      id:0
    }
  },
  created(){ 
      this.setArr()
      this.getData()
  },
  mounted() {
        this.getColor()
        this.LineChart(this.getColor())
  },
  methods: {
    setArr(){
         for (let i = 0; i < 50; i++) {
                for (let j = 1; j < 12; j++)
                this.dataArr.push([ "201" + i + "/" + j + "/" + "20",
                    Math.ceil(Math.random() * 1000)
                ]);
        }
    },
    getData() {
        let temp = this.obj
        temp = temp?temp:{name:'接口响应时间',theme:0,num:this.dataArr}
        this.Chartname = temp.name
        this.id = temp.theme
        this.dataArr = temp.num
        return temp
    },
    getColor(){
        for(let i=0;i<this.themeArr.length;i++){
            if(this.themeArr[i].id==this.id){
                return this.themeArr[i].theme
            }
        }
    },
    LineChart(res) {
      let myChart = this.$echarts.init(this.$refs.Line)
      myChart.setOption({
        title: {
            text: this.Chartname
        },
        tooltip: {
            trigger: 'axis'//触发
        },
        xAxis: {
            type:'category',
            boundaryGap:false,
            data: this.dataArr.map(function (item) {
                return item[0];
            })
        },
        yAxis: {
            splitLine: {
                show: false
            }
        },
        toolbox: {
            left: 'center',
            feature: {
                dataZoom: {
                    yAxisIndex: 100
                },
                restore: {},
                saveAsImage: {}
            }
        },
        dataZoom: [{
            startValue: '2014-06-01'
        }, {
            type: 'inside'
        }],
        visualMap: {
            top: 10,
            right: 10,
            pieces: [{
                gt: 0,
                lte: 150,
                color: res[0]
            }, {
                gt: 150,
                lte: 250,
                color: res[1]
            }, {
                gt: 250,
                lte: 350,
                color: res[2]
            }, {
                gt: 350,
                lte: 450,
                color: res[3]
            }, {
                gt: 450,
                lte: 550,
                color: res[4]
            }, {
                gt: 550,
                lte:650,
                color: res[5]
            }],
            outOfRange: {
                color: res[6]
            }
        },
        series: {
            name: this.Chartname,
            type: 'line',
            data: this.dataArr.map(function (item) {
                return item[1];
            }),
            markLine: {
                silent: true,
                data: [{
                    yAxis: 150
                }, {
                    yAxis: 250
                }, {
                    yAxis: 350
                }, {
                    yAxis: 450
                }, {
                    yAxis: 550
                },{
                    yAxis: 650
                },{
                    yAxis: 750
                }]
            }
        }
    })
    }
   
  }
};
</script>

<style scoped>
    div{
        float: left;
    }
</style>
