<template>
  <div class="ab-container">
    <div class="ab-header">
      <el-input type="text" v-model="abSearchContent"></el-input>
      <el-button @click="abSearch">查询</el-button>
    </div>
    <div class="ab-main">
      <el-table :data="currentTableData" style="width: 100%">
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
        <!-- <el-table-column label="异常id" prop="id" width="130"></el-table-column> -->
        <el-table-column label="设备" prop="device_id" width="130"></el-table-column>
        <el-table-column label="内容" prop="content" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="日期" prop="date" width="180"></el-table-column>
        <el-table-column label="负责人员" prop="principal" width="130"></el-table-column>
        <el-table-column label="处理反馈" prop="feedback" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="可视化及历史对比" width="150">
          <template slot-scope="props">
            <el-button class="historyCompared" @click="historyCompared(props.row.device_id)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import historyInfo from "./historyInfo";
export default {
  name: "abnormal",
  components: {
    historyInfo
  },
  data() {
    return {
      abSearchContent: "",
      currentTableData: [],
      tableData: [
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
          device_id: "服务器a_112",
          content: "内存不足",
          principal: "张张",
          feedback: "已处理，内存释放，并增加了总内存大小"
        },
        {
          id: "12987124",
          date: "2019-07-12 13:30",
          device_id: "服务器a_113",
          content: "内存不足",
          principal: "张张",
          feedback: "已处理，内存释放，并增加了总内存大小"
        },
        {
          id: "12987125",
          date: "2019-07-12 13:30",
          device_id: "服务器a_114",
          content: "内存不足",
          principal: "张张",
          feedback: "已处理，内存释放，并增加了总内存大小"
        }
      ]
    };
  },
  methods: {
    abSearch() {
      if (this.abSearchContent.trim() !== "") {
        this.currentTableData = [];
        this.tableData.forEach(element => {
          for (const key in element) {
            if (element.hasOwnProperty(key)) {
              if (element[key].includes(this.abSearchContent)) {
                this.currentTableData.push(element);
                break;
              }
            }
          }
        });
      } else {
        this.currentTableData = this.tableData;
      }
    },
    historyCompared(id) {
      const h = this.$createElement;
      this.$msgbox({
        title: "可视化及历史对比",
        message: h("historyInfo", {
          attrs: {
            msg: id
          }
        }),
        confirmButtonText: "关闭"
      });
    }
  },
  mounted() {
    this.currentTableData = this.tableData;
  }
};
</script>

<style>
.ab-header {
  width: 400px;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
}
.detail-title {
  display: inline-block;
  font-weight: bold;
  width: 100px;
}
.historyCompared {
  border: none;
}
.historyCompared:focus,
.historyCompared:hover,
.historyCompared {
  background: transparent;
}
</style>

