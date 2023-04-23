import Vue from 'vue'
import Vuex from 'vuex'
import local from './modules/local'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    local,//挂载local模块
  },
})
