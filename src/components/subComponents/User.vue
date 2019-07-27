<template>
  <div>
    <el-input placeholder="请输入内容（IP）" prefix-icon="el-icon-search"  v-model="keyWords" clearable></el-input>
    <el-table :data="search(keyWords)" height="550" border style="width: 100%">
      <el-table-column prop="date" label="上次登录时间"  width="180">
      </el-table-column>
      <el-table-column prop="ip" label="IP" width="180">
      </el-table-column>
      <el-table-column prop="port" label="端口">
      </el-table-column>
      <el-table-column prop="data" label="数据项数量">
      </el-table-column>
      <el-table-column prop="num" label="异常次数">
      </el-table-column>
      <el-table-column prop="msg" label="历史异常情况">
        <template slot-scope="item">
          <el-button type="text"  @click="open(item.row.ip)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import errortable from './ErrorTable'
export default {
    data() {
      return {
      keyWords:'',
      tableData: [{
        date: '2016-05-03',
        ip: '172.20.140.142',
        port:'8080',
        data:6,
        num:10,
        msg:[{id:0,date:'2017-04-24',error:'磁盘容量过小，请尽快更换'}]
      }, {
        date: '2016-05-02',
        ip: '173.20.140.142',
        port:'8080',
        data:6,
        num:10,
        msg:[{id:0,date:'2017-04-23',error:'CPU负载异常'},{id:1,date:'2017-04-23',error:'CPU负载异常'}]
      }, {
        date: '2016-05-04',
        ip: '174.20.140.142',
        port:'8080',
        data:6,
        num:10,
        msg:[{id:0,date:'2017-04-24',error:'磁盘容量过小，请尽快更换'}]
      }, {
        date: '2016-05-01',
        ip: '175.20.140.142',
        port:'8080',
        data:6,
        num:10,
        msg:[{id:0,date:'2017-04-24',error:'磁盘容量过小，请尽快更换'}]
      }, {
        date: '2016-05-08',
        ip: '176.20.140.142',
        port:'8080',
        data:6,
        num:10,
        msg:[{id:0,date:'2017-04-24',error:'磁盘容量过小，请尽快更换'}]
      }, {
        date: '2016-05-06',
        ip: '178.20.140.142',
        port:'8080',
        data:6,
        num:10,
        msg:[{id:0,date:'2017-04-24',error:'磁盘容量过小，请尽快更换'}]
      }, {
        date: '2016-05-07',
        ip: '172.33.140.142',
        port:'8080',
        data:6,
        num:10,
        msg:[{id:0,date:'2017-04-24',error:'磁盘容量过小，请尽快更换'}]
      }]
      }
    },
    computed:{
      ...mapState({
        ip:'ip'
      })
    },
    components:{
      errortable
    },
    mounted(){
      console.log(this.ip)
      // console.log(getters.getIp())
    },
    methods:{
       open(ip) {
         let obj = null;
         for(let i=0;i<this.tableData.length;i++){
           if(this.tableData[i].ip==ip)
            { 
              obj = this.tableData[i]
            }
         }
         const h = this.$createElement;
         this.$msgbox({
           title:'IP:'+obj.ip+'端口:'+obj.port,
            message: h('errortable', {
              attrs: {
                data: obj
              }
            }),
          confirmButtonText: '确定',
          dangerouslyUseHTMLString:true
        });
        },
      search(keyWords){
        var res = []
        this.tableData.forEach(function(ele, index) {
            //传空返回0，不等于-1，所以也会push进去
            if(ele.ip.indexOf(keyWords)!=-1)
            {
              res.push(ele);
            }
          });
        return res;
    }
    }
}
</script>
<style>
  .el-input{
    width:60%;
    margin-bottom: 20px;
    float:left;
  }
  .el-message-box{
    width:70%;
    height: 50%;
  }
  
</style>
