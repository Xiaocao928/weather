// 设置了一个单独的模块
const state = {
  localCity: '', // 本地城市名字
  searchName: '',//搜索的城市名字
  cityList:[],//保存的城市列表
}

const mutations = {
  getCityname(state, cityName) {
    state.localCity = cityName
  },
  searchName(state, searchResult) {
    state.searchName = searchResult
    //console.log(state.searchName)
  },
  saveCityList(state,cityList){
    state.cityList = cityList
  }
}

export default {
  namespaced: true,//开启命名空间
  state,
  mutations,
}
