const state = {
  localCity: '', // 本地城市名字
  searchName: '',
}

const mutations = {
  getCityname(state, cityName) {
    state.localCity = cityName
  },
  searchName(state, searchResult) {
    state.searchName = searchResult
    //console.log(state.searchName)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
