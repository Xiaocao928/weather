import { getWeatherByWeek } from '@/api/weather'

const state = {
  forecast: [], // 七天天气预报数据
}

const mutations = {
  setForecastData(state, data) {
    state.forecast = data
    
  },
}

const actions = {
  async getForecastData({ commit }, city) {
    try {
      const res = await getWeatherByWeek({ city, type: 'week' })
      commit('setForecastData', res)
    } catch (error) {
      console.error(error)
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
