<template>
  <div class="container">
    <div class="nav">
      <a href="">
        <div class="logo">
          <i class="iconfont icon-sun"></i>
          <p>新中地天气</p>
        </div>
      </a>
      <div class="weather-live">
        <h3 class="city">{{ weather.city }}</h3>
        <span class="content"
          >实时天气：{{ weather.type }} {{ weather.temperature }}</span
        >
        <span class="content"
          >{{ weather.fengxiang }} {{ weather.fengli }}</span
        >
      </div>
      <div class="about">
        <i class="iconfont icon-about"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { getWeather } from '@/api/weather'
export default {
  name: 'TheHeader',
  data() {
    return {
      weather: {
        city: '',
        fengli: '',
        fengxiang: '',
        type: '',
        temperature: '',
      },
    }
  },
  mounted() {
    this.getRealTimeWeather()
  },
  methods: {
    async getRealTimeWeather() {
      try {
        const res = await getWeather()

        this.weather.city = res.city
        this.weather.fengli = res.info.fengli
        this.weather.fengxiang = res.info.fengxiang
        this.weather.type = res.info.type
        this.weather.temperature = res.info.high
      } catch (err) {
        this.$message.error(err || '加载出错了')
      }
    },
  },
}
</script>

<style>
@import url('http://at.alicdn.com/t/c/font_4027375_ko2enp905ro.css');
.container {
  height: 80px;
  display: flex;
  align-items: center;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
}

.nav {
  display: flex;
  gap: 10px;
  width: 70%;
  margin: 0 auto;
  padding: 10px 0;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}
.nav a {
  text-decoration: none;
  color: #fff;
  font-size: 24px;
}
.nav .logo {
  display: flex;
  gap: 5px;
}
.nav .logo i {
  font-size: 27px;
}
.nav .weather-live {
  display: flex;

  justify-content: space-between;
  flex: 2;
}
.nav .weather-live .city {
  font-size: 18px;
}
.nav .about {
  display: flex;
  flex: 3;
  justify-content: flex-end;
}
.iconfont {
  font-size: 20px;
}
</style>
