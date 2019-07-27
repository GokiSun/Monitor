<template>
  <el-container>
    <el-header>
      <el-button class="menu-switch" @click="isCollapse = !isCollapse">
        <i class="el-icon-s-operation"></i>
      </el-button>
      <img class="logo" src="@/assets/logo_white.png" alt="coocaa" />
      <div class="header-right">
        <el-dropdown trigger="click" style="margin-right: 30px;">
          <span class="el-dropdown-link icon-right">
            10.121.144.1
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>port：3000</el-dropdown-item>
            <el-dropdown-item>上次登录时间：2019-07-12 16：00</el-dropdown-item>
            <el-dropdown-item divided @click="logout">
              <el-button class="logout" @click="logout">注销</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button class="shareLink" @click="shareLink">
          <i class="el-icon-share"></i>
        </el-button>
        <!-- <el-dropdown trigger="click">
          <span class="el-dropdown-link icon-right">
            <i class="el-icon-share"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-button class="shareLink" @click="shareLink">链接</el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button class="shareImg" @click="shareImg">截图</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>-->
      </div>
    </el-header>
    <el-container>
      <el-aside :width="!isCollapse?'220px':'60px'">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              background-color="#42475A"
              text-color="#fff"
              active-text-color="#ffd04b"
              :collapse="isCollapse"
              unique-opened="true"
            >
              <template v-for="(menuItems, oneIndex) of menu">
                <el-menu-item
                  v-if="menuItems.hasOwnProperty('route')"
                  :key="menuItems.id"
                  :index="menuItems.id"
                  :style="{'color':menuItems.route === currentRoute?'rgb(255, 208, 75)':'#fff'}"
                  @click="currentChange(oneIndex, 0, menuItems.route)"
                  @mouseover.native="currentHover(oneIndex)"
                  @mouseout.native="currentLeave"
                >
                  <i
                    :class="`el-icon-${menuItems.icon}`"
                    :style="{'color':menuItems.route === currentRoute?'rgb(255, 208, 75)':'#909399'}"
                  ></i>
                  <span slot="title">{{menuItems.title}}</span>
                </el-menu-item>
                <el-submenu
                  :key="menuItems.id"
                  v-else
                  :index="menuItems.id"
                >
                  <template>
                    <template slot="title">
                      <i :class="`el-icon-${menuItems.icon}`"></i>
                      <span>{{menuItems.title}}</span>
                    </template>
                    <el-menu-item-group>
                      <el-menu-item
                        v-for="(menuItem, twoIndex) of menuItems.items"
                        :key="menuItem.id"
                        :index="menuItem.id"
                        @click="currentChange(oneIndex, twoIndex, menuItem.route)"
                        @mouseover.native="currentHover(oneIndex, twoIndex)"
                        @mouseout.native="currentLeave"
                        ref="bLeft"
                        :style="{'color':menuItem.route === currentRoute?'rgb(255, 208, 75)':'#fff'}"
                      >{{menuItem.title}}</el-menu-item>
                    </el-menu-item-group>
                  </template>
                </el-submenu>
              </template>
              <div
                class="menu-slide"
                :style="{'top': slideTop,'transform':`translateY(${slideTransY})`}"
              ></div>
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
import all from '../components/Charts/All'
import service from '../components/subComponents/Service'
import bandwidth from '../components/subComponents/BandWidth'
import user from '../components/subComponents/User'
import hardware from '../components/subComponents/HardWare'
import warn from '../components/subComponents/Warning'
import abnormal from "../components/abnormal";
export default {
  name: "Index",
  components: {
    abnormal
  },
  data() {
    return {
      slideTopNum: 0,
      slideTransYNum: 0,
      currentRoute: "all",
      isCollapse: false,
      menu: [
        {
          id: "1",
          title: "我的工作台",
          icon: "s-home",
          route: "all"
        },
        {
          id: "2",
          title: "数据图总览",
          icon: "s-marketing",
          items: [
            {
              id: "2-1",
              title: "服务监测",
              route: "service"
            },
            {
              id: "2-2",
              title: "带宽监测",
              route: "bandwidth"
            },
            {
              id: "2-3",
              title: "硬件监测",
              route: "hardware"
            }
          ]
        },
        {
          id: "3",
          title: "异常管理",
          icon: "message-solid",
          route: "abnormal"
        },
        {
          id: "4",
          title: "系统管理",
          icon: "user",
          items: [
            {
              id: "4-1",
              title: "用户管理",
              route: "user"
            },
            {
              id: "4-2",
              title: "预警方式",
              route: "warn"
            }
          ]
        }
      ]
    };
  },
  computed: {
    slideTransY() {
      return this.slideTransYNum + "px";
    },
    slideTop() {
      return this.slideTopNum + "px";
    }
  },
  methods: {
    shareLink() {
      const h = this.$createElement;

      this.$copyText(window.location.href);
      this.$notify({
        title: "链接已复制",
        message: h("i", { style: "color: teal" }, window.location.href)
      });
    },
    logout() {
      this.$alert("确认注销", "提示", {
        confirmButtonText: "确定",
        callback: action => {
          if (action === "confirm") {
            this.$router.replace("/");
          }
        }
      });
    },
    currentChange(oneIdx, twoIdx, route) {
      this.currentRoute = route;
      console.log(oneIdx, twoIdx);
      this.slideTopNum = (oneIdx + 1) * 56 + twoIdx * 50;
      this.currentLeave();
    },
    currentHover(oneIdx, twoIdx = 0) {
      // this.slideTopNum = (oneIdx+1)*56 + (twoIdx)*50;
      let dis = (oneIdx + 1) * 56 + twoIdx * 50;
      this.slideTransYNum = dis - this.slideTopNum;
    },
    currentLeave() {
      this.slideTransYNum = 0;
    }
  }
};
</script>

<style>
.el-container {
  min-width: 1260px;
  height: 100%;
}
.el-header {
  background-color: #383d41;
  color: #fff;
  text-align: center;
  line-height: 60px;
  border-bottom: solid 1px #333;
}
.el-aside {
  min-width: 65px;
  background-color: #42475a;
  color: #333;
  text-align: center;
  line-height: 200px;
  transition: all 0.8s;
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
.el-menu-item-group .el-menu-item {
  background: #283847 !important;
  z-index: 3;
  /* border-left: 3px solid rgb(255, 208, 75); */
}
.el-menu-item-group {
  position: relative;
}
.el-menu-item-group__title {
  padding: 0;
}
.el-menu-item,
.el-submenu__title {
  z-index: 3;
}
.el-menu--inline {
  z-index: 1;
}
.menu-slide {
  position: absolute;
  width: 3px;
  height: 50px;
  background: #ffd04b;
  left: 0;
  z-index: 2;
  transition: 0.5s;
}
.menu-switch {
  float: left;
  margin-top: 11px;
  background: #383d41;
  border: none;
  color: #fff;
}
.menu-switch:hover,
.menu-switch:focus {
  background: #42475a;
  color: #fff;
}
.menu-switch:active {
  background: #283847;
}
.logo {
  vertical-align: middle;
}
.header-right {
  float: right;
}
.icon-right {
  cursor: pointer;
  color: #fff;
  outline: none;
}
.logout {
  width: 100%;
  border: none;
  background: none;
}
.shareLink,
.shareLink:hover,
.shareLink:focus {
  color: #fff;
  background: #383d41;
  border: none;
}
.v-leave-to,
.v-leave-active {
  width: auto !important;
}
.el-message-box {
  width: auto;
  min-width: 400px;
}
.el-menu-vertical-demo{
  overflow: hidden;
}
</style>

