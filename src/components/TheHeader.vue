<template>
  <div class="container">
    <div class="nav">
      <router-link to="/">
        <div class="logo">
          <i class="iconfont icon-sun"></i>
          <p>新中地天气</p>
        </div>
      </router-link>
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
        <i class="iconfont icon-about" @click="visibility = !visibility"></i>
      </div>
    </div>
    <div class="wrapper" v-show="visibility">
      <div class="dialog">
        <div class="header">
          <h3>关于:</h3>
          <span class="item">这个应用可以用来追踪你选择城市的当前天气</span>
        </div>
        <div class="body">
          <h3>如何使用:</h3>
          <span>1.点击搜索框输入你希望追踪的城市</span> <br />
          <span>2.在搜索结果中选中一个城市，你将获取当地最新的天气</span> <br />
          <span class="item"
            >3.点击右侧的＋号可以将追踪城市的天气情况保存在首页</span
          >
          <h3>移除城市:</h3>
          <span class="item"
            >如果你不想在首页关注某个城市,可以通过底部的按钮删 除它
          </span>
        </div>
        <div class="footer">
          <button @click="visibility = false">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getWeather, getWeatherByWeek } from '@/api/weather'
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
      visibility: false,
    }
  },
  mounted() {
    this.getRealTimeWeather()
    this.getForcast()
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

    async getForcast() {
      try {
        const res = await getWeatherByWeek({
          city: this.weather.city,
          type: 'week',
        })
        console.log(res)
        this.$store.dispatch('localWeather/getForecastData', this.weather.city)
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
  cursor: pointer;
  font-size: 24px;
}
.wrapper {
  /* display: none; */
  /* background-color: #fff; */
  z-index: 100;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
}

.wrapper .dialog {
  position: relative;
  margin: 20vh auto 50px;
  padding: 18px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  width: 22%;
}
.wrapper .dialog .header {
  margin-bottom: 20px;
}
.wrapper .dialog .body {
  margin-bottom: 20px;
}
.wrapper .dialog span {
  font-size: 12px;
}
.dialog .body h3 {
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 3px;
}
.wrapper .dialog .footer {
  margin-bottom: 10px;
}
.wrapper .dialog button {
  appearance: none;
  border: none;
  padding: 9px 25px;
  background-color: #004e71;
  color: #fff;
  font-size: 12px;
  margin-top: 5px;
}
</style>
