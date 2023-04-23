<template>
  <div id="app">
    <the-search></the-search>
    <the-collect></the-collect>
   

    <the-more :weatherData="weatherData"></the-more>
  </div>
</template>

<script>
import TheSearch from '@/components/TheSearch.vue'
import TheMore from '@/components/TheMore.vue'
import TheCollect from '@/components/TheCollect.vue'
import { getWeatherByWeek } from '@/api/weather'
import { mapState } from 'vuex'
import { Message } from 'element-ui'

export default {
  name: 'TheMain',
  components: {
    TheSearch,
    TheMore,
    TheCollect,
  },
  data() {
    return {
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
        Message.error(err || '加载出错了')
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

</style>
