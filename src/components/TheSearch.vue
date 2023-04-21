<template>
  <div class="search">
    <input
      class="city"
      type="text"
      placeholder="请输入城市名"
      v-model="city"
      @input="getCityWeather"
    />
    <ul class="search-result" v-if="city && showResult" @click="$router.push('weather/result')">
      <li v-if="loading">查询中，请稍候...</li>
      <li v-else-if="error">查询失败，请输入国内主要省份并精确到城市</li>
      <li v-else-if="result">{{ result }}</li>
      <li v-else>网络似乎出现了一些问题</li>
    </ul>
  </div>
</template>

<script>
import { getWeatherByCity } from '@/api/weather'
import debounce from '/node_modules/lodash/debounce'
export default {
  name: 'TheSearch',
  data() {
    return {
      city: '',
      result: '',
      loading: false,
      error: false,
    }
  },
  computed: {
    showResult() {
      return this.loading || this.error || this.result
    },
  },
  methods: {
    //
    getCityWeather: debounce(async function () {
      if (!this.city) {
        return
      }

      this.loading = true
      try {
        const res = await getWeatherByCity({ city: this.city })
        console.log(res)
        console.log(res.success)
        if (res.success == true) {
          this.result = res.city
          this.error = false
        } else {
          console.log('返回结果状态是false')
          this.error = true
          this.result = ''
        }
      } catch (err) {
        this.error = false
        this.result = ''
      } finally {
        this.loading = false
      }
    }, 500),
    handleResult() {
      console.log('点击')
    },
  },
}
</script>

<style>
.search {
  width: 70%;
  margin: 5px auto;
  color: #fff;
}
.search .city {
  border: none;
  outline: none;
  border-bottom: 1px solid #fff;
  width: 100%;
  margin: 10px 10px;
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background-color: transparent;
}
.search .city:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
  border: none;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
}

.search .search-result {
  width: 100%;
  background-color: #004e71;

  padding: 15px 10px;
}
.search .search-result p {
  display: none;
}
</style>
