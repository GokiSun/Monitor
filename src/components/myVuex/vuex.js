import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

var ip = localStorage.getItem('ip')
export default new Vuex.Store({
    state:{
      ip:ip
    },
    mutations:{
  
    }
  })