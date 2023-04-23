<template>
  <div class="result">
    <div v-if="weatherData.length" class="title">
      你在正在预览{{ searchName }}的天气
      <span>可以通过右上角的"+"号按钮保存起来</span>
    </div>
    <div class="weather-info" v-if="weatherData.length">
      <h1>当日气温是：{{ weatherData[0].high }}</h1>
      <h1>当日天气是：{{ weatherData[0].type }}</h1>
      <h1>当日风向是：{{ weatherData[0].fengxiang }}</h1>
      <h1>当日风力是：{{ weatherData[0].fengli }}</h1>
    </div>
    <hr class="line" />
    <the-more :weatherData="weatherData"></the-more>
  </div>
</template>

<script>
import TheMore from '@/components/TheMore.vue'
import { getWeatherByWeek } from '@/api/weather'
import { mapState } from 'vuex'
export default {
  name: 'TheResult',
  data() {
    return {
      weatherData: [],
    }
  },
  components: {
    TheMore,
  },
  computed: {
    ...mapState({
      searchName: state => state.local.searchName,
    }),
  },
  mounted() {
    this.getForcast()
  },
  methods: {
    async getForcast() {
     // console.log(this.searchName)
      try {
        const res = await getWeatherByWeek({
          city: this.searchName,
          type: 'week',
        })

        //console.log(res)
        this.weatherData = res.data
        //console.log(this.weatherData[0])
      } catch (err) {
        Message.error(err || '加载出错了')
      }
    },
  },
}
</script>

<style>
.title {
  padding-block: 12px;
  text-align: center;
  color: #fff;
  background-color: #004e71;
}
.weather-info {
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 25px;
  text-align: center;
  color: #fff;
}
.weather-info h1 {
  padding-block: 6px;
}
.line {
  margin-top: 24px;
  opacity: 0.52;
}
</style>
