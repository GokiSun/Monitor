<template>
  <div class="view-container">
    <div class="view-chart" ref="viewChart"></div>
    <div class="history-info">
      <el-table :data="historyData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" label-width="120" class="demo-table-expand">
              <el-form-item>
                <span class="detail-title">内容详情：</span>
                <span>{{ props.row.content }}</span>
              </el-form-item>
              <el-form-item>
                <span class="detail-title">反馈详情：</span>
                <span>{{ props.row.feedback }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="内容" prop="content" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="日期" prop="date" width="180"></el-table-column>
        <el-table-column label="负责人员" prop="principal" width="130"></el-table-column>
        <el-table-column label="处理反馈" prop="feedback" :show-overflow-tooltip="true"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "historyInfo",
  data() {
    return {
      historyData: [
        {
          id: "12987122",
          date: "2019-07-12 13:30",
          device_id: "服务器a_111",
          content: "内存不足，服务崩盘，请相关负责人尽快前往解决。",
          principal: "张张",
          feedback: "已处理，内存释放，并增加了总内存大小，设置了报警峰值"
        },
        {
          id: "12987123",
          date: "2019-07-12 13:30",
          device_id: "服务器a_111",
          content: "内存不足",
          principal: "张张",
          feedback: "已处理，内存释放，并增加了总内存大小"
        },
        {
          id: "12987124",
          date: "2019-07-12 13:30",
          device_id: "服务器a_111",
          content: "内存不足",
          principal: "张张",
          feedback: "已处理，内存释放，并增加了总内存大小"
        },
        {
          id: "12987125",
          date: "2019-07-12 13:30",
          device_id: "服务器a_111",
          content: "内存不足",
          principal: "张张",
          feedback: "已处理，内存释放，并增加了总内存大小"
        }
      ],
      data1: [],
      data2: [],
      data3: [],
      now: +new Date(1997, 9, 3),
      oneDay: 24 * 3600 * 1000,
      value: Math.random() * 1000
    };
  },
  props: {
    msg: String
  },
  methods: {
    initChart() {
      let myBar = this.$echarts.init(this.$refs.viewChart);
      myBar.setOption({
        title: {
          text: "动态数据 + 时间坐标轴"
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "time"
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
          splitLine: {
            show: false
          }
        },
        dataZoom: [{ type: "inside" }],
        visualMap: {
          seriesIndex: 2,
          show: false,
          dimension: 0,
          min: new Date(1997, 10, 12),
          max: new Date(2001, 10, 24),
          range: [new Date(1997, 10, 12), new Date(2001, 10, 24)],
          inRange: {
            color: ["green", "rgb(255, 0, 0)", "green"]
          }
        },
        series: [
          {
            name: "模拟数据111",
            type: "line",
            showSymbol: false,
            hoverAnimation: false,
            color: 'cyan',
            data: this.data1
          },
          {
            name: "模拟数据222",
            type: "line",
            showSymbol: false,
            hoverAnimation: false,
            color: 'blue',
            data: this.data2
          },
          {
            name: "模拟数据333",
            type: "line",
            showSymbol: false,
            hoverAnimation: false,
            color: 'green',
            data: this.data3
          }
        ]
      });
    },
    randomData() {
      this.now = new Date(+this.now + this.oneDay);
      this.value = this.value + Math.random() * 501 - 250;
      return {
        name: this.now.toString(),
        value: [
          [
            this.now.getFullYear(),
            this.now.getMonth() + 1,
            this.now.getDate()
          ].join("/"),
          Math.round(this.value)
        ]
      };
    },
    getData() {
      var data1 = [],
        data2 = [],
        data3 = [];
      for (var i = 0; i <3000; i++) {
        data1[i] = this.randomData()
        data2[i] = this.randomData()
        data3[i] = this.randomData()
        // data1.push(this.randomData())
        // data2.push(this.randomData())
        // data3.push(this.randomData())
      }
      this.data1 = data1;
      this.data2 = data2;
      this.data3 = data3;
      console.log(data1,data2,data3)
    }
  },
  mounted() {
    this.getData();
    this.initChart();
  },
  watch: {
    msg() {
      this.now = +new Date(1997, 9, 3);
      this.value = Math.random() * 1000;
      this.getData();
      this.initChart();
    }
  }
};
</script>

<style>
.view-container {
  display: flex;
  flex-flow: row;
}
.history-info {
  height: 350px;
  overflow-y: scroll;
}
.view-chart {
  width: 500px;
  height: 450px;
}
</style>
