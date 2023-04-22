import Vue from 'vue'
import Vuex from 'vuex'
import localWeather from './modules/localWeather'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    localWeather,
  }
})
