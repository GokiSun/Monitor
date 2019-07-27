// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import store from './components/myVuex/vuex'
Vue.prototype.$echarts = echarts
import VueClipboard from 'vue-clipboard2'
import echarts from 'echarts'


Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueClipboard)
Vue.prototype.$echarts = echarts

/* eslint-disable no-new */


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
