<template>
  <el-container>
    <el-header>智能运维监控平台</el-header>
    <el-container>
      <el-aside width="220px">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              background-color="#42475A"
              text-color="#fff"
              active-text-color="#ffd04b"
            >
              <el-submenu v-for="menuItems of menu" :key="menuItems.id" :index="menuItems.id">
                <template slot="title">
                  <i :class="`el-icon-${menuItems.icon}`"></i>
                  <span>{{menuItems.title}}</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    v-for="menuItem of menuItems.items"
                    :key="menuItem.id"
                    :index="menuItem.id"
                    @click="currentRoute = menuItem.route"
                  >{{menuItem.title}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
          <component :is="currentRoute"></component>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HelloWorld from '../components/HelloWorld'
export default {
  name: "Index",
  components:{
      HelloWorld
  },
  data() {
    return {
      currentRoute: "HelloWorld",
      menu: [
        {
          id: "1",
          title: "我的工作台",
          icon: "location",
          items: [
            {
              id: "1-1",
              title: "数据图总览",
              route: "sjtzl"
            },{
              id: "1-2",
              title: "异常图分析",
              route: "yctfx"
            }
          ]
        },
        {
          id: "2",
          title: "数据监测",
          icon: "menu",
          items: [
            {
              id: "2-1",
              title: "服务监测",
              route: "fwjc"
            },
            {
              id: "2-2",
              title: "带宽监测",
              route: "dkjc"
            },
            {
              id: "2-3",
              title: "硬件监测",
              route: "yjjc"
            }
          ]
        },
        {
          id: "3",
          title: "数据管理",
          icon: "setting",
          items: [
            {
              id: "3-1",
              title: "数据项管理表",
              route: "sjxglb"
            },
            {
              id: "3-2",
              title: "异常管理",
              route: "ycgl"
            }
          ]
        },
        {
          id: "4",
          title: "系统管理",
          icon: "user",
          items: [
            {
              id: "4-1",
              title: "用户管理",
              route: "yhgl"
            },
            {
              id: "4-2",
              title: "个性化设置",
              route: "gxhsz"
            }
          ]
        }
      ]
    };
  },
  methods: {}
};
</script>

<style>
.el-container {
  min-width: 1260px;
  height: 100%;
}
.el-header {
  background-color: #383D41;
  color: #fff;
  text-align: center;
  line-height: 60px;
  border-bottom: solid 1px #333;
}
.el-aside {
  background-color: #42475A;
  color: #333;
  text-align: center;
  line-height: 200px;
  border-right: solid 1px #e6e6e6;
}
.el-main {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: normal;
  height: clac(100% - 60);
}
.el-menu {
  border: none;
}
.el-menu-item {
  background: #283847 !important;
  border-left: 3px solid rgb(255, 208, 75);
}
.el-menu-item-group__title {
  padding: 0;
}
.el-submenu__title{
    padding-right: 40px;
}
</style>

