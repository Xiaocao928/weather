<template>
  <div id="app">
    <the-search></the-search>

    <div class="city-list" v-if="cityList.length">
      <the-collect></the-collect>
    </div>
    <div class="tip" v-else>
      <h2>暂时没有保存过城市天气信息，请查询后点击右上角"+"号保存。</h2>
    </div>

    <the-more :weatherData="weatherData"></the-more>
  </div>
</template>

<script>
import TheSearch from '@/components/TheSearch.vue'
import TheMore from '@/components/TheMore.vue'
import TheCollect from '@/components/TheCollect.vue'
import { getWeatherByWeek } from '@/api/weather'
import { mapState } from 'vuex'

export default {
  name: 'TheMain',
  components: {
    TheSearch,
    TheMore,
    TheCollect,
  },
  data() {
    return {
      cityList: [],
      weatherData: [],
    }
  },
  computed: {
    ...mapState({
      localCity: state => state.local.localCity,
    }),
  },
  mounted() {
    this.getForcast()
    this.getCityList()
  },
  methods: {
    async getForcast() {
      try {
        const res = await getWeatherByWeek({
          city: this.localCity,
          type: 'week',
        })
        //console.log(res)
        //console.log(this.localCity)
        this.weatherData = res.data
      } catch (err) {
        this.$message.error(err || '加载出错了')
      }
    },

    getCityList() {
      let res = localStorage.getItem('cityList')

      if (!res) {
        // 第一次读取, cityList中是没有数据的
        localStorage.setItem('cityList', JSON.stringify([]))
      } else {
        this.cityList = JSON.parse(res)
      }
    },
  },
}
</script>

<style>
body {
  background-color: #00668a;
}
#app {
  height: 100vh;
}
.tip {
  width: 70%;
  text-align: center;
  margin: 15px auto;
  color: #fff;
}
</style>
