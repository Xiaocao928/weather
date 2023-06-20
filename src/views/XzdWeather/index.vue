<template>
  <div>
    <!-- 头部 -->
    <header>
      <div class="container">
        <div class="nav">
          <router-link to="/">
            <div class="logo">
              <i class="iconfont icon-sun"></i>
              <p>心情天气</p>
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
            <i
              class="iconfont icon-about"
              @click="visibility = !visibility"
            ></i>
            <i
              class="iconfont icon-jiahao"
              v-if="showAddIcon"
              @click="handleAdd"
            ></i>
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
              <span>2.在搜索结果中选中一个城市，你将获取当地最新的天气</span>
              <br />
              <span
                >3.搜索城市名时尽量准确（搜索长沙会显示长治市，搜索长沙市就会显示长沙市，这种情况较少）</span
              >
              <br />
              <span class="item"
                >4.点击右侧的＋号可以将追踪城市的天气情况保存在首页</span
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
    </header>
    <!-- 页面主体部分 -->
    <main>
      <!-- 二级路由出口 -->
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { getWeather, getWeatherByWeek } from '@/api/weather'
import { mapState } from 'vuex'
import { Message } from 'element-ui'

export default {
  name: 'XzdWeather',
  components: {},
  data() {
    return {
      weather: {
        city: '',
        fengli: '',
        fengxiang: '',
        type: '',
        temperature: '',
      },
      high: '',
      cityList: [],
      visibility: false,
      showAddIcon: true,
    }
  },
  computed: {
    ...mapState({
      searchName: state => state.local.searchName,
    }),
  },

  mounted() {
    this.getRealTimeWeather()
    this.getForcast()
    this.getCityList()
    this.routeChange()
  },
  watch: {
    // 监听路由的变化
    $route: {
      handler: function (to, from) {
        this.routeChange()
      },
      immediate: true, // 立即执行
    },
  },
  methods: {
    // 路由改变，加号的隐藏与显示
    routeChange() {
      if (this.$route.fullPath === '/weather/result') {
        this.showAddIcon = true // 当路由为 /weather/result 时，显示加号图标
        // console.log('结果')
      } else {
        this.showAddIcon = false // 其他路由时，隐藏加号图标
        // console.log('首页')
        // console.log(this.showAddIcon)
      }
    },
    // 获取实时天气
    async getRealTimeWeather() {
      try {
        const res = await getWeather()

        this.weather.city = res.city
        this.weather.fengli = res.info.fengli
        this.weather.fengxiang = res.info.fengxiang
        this.weather.type = res.info.type
        this.weather.temperature = res.info.high
      } catch (err) {
        Message.error(err || '加载出错了')
      }
    },
    // 获取未来一周的天气
    async getForcast() {
      try {
        const res = await getWeatherByWeek({
          city: this.weather.city, //参数
          type: 'week',
        })
        //console.log(res)
        //存储到vuex中
        this.$store.commit('local/getCityname', this.weather.city)
      } catch (err) {
        Message.error(err || '获取数据出错了')
      }
    },
    // 获取收藏的城市列表
    getCityList() {
      let res = localStorage.getItem('cityList')

      if (!res) {
        // 第一次读取, cityList中是没有数据的
        localStorage.setItem('cityList', JSON.stringify([]))
      } else {
        this.cityList = JSON.parse(res)
        //写到vuex中
        this.$store.commit('local/saveCityList', this.cityList)
      }
    },
    // 添加收藏城市
    async handleAdd() {
      try {
        const res = await getWeatherByWeek({
          city: this.searchName,
          type: 'week',
        })
        this.high = res.data[0].high
      } catch (err) {
        Message.error(err || '获取数据出错了')
      }
      //判断是否重复添加
      const isExist = this.cityList.some(city => city.name === this.searchName)
      //console.log(isExist)
      if (isExist) {
        Message.error('该城市已存在')
        return
      }

      const max = Math.max(...this.cityList.map(item => item.id))
      //console.log(max)
      this.cityList.push({
        id: max < 0 ? 1 : max + 1,
        name: this.searchName,
        high: this.high,
      })

      // 保存数据
      localStorage.setItem('cityList', JSON.stringify(this.cityList))

      //写到vuex中
      this.$store.commit('local/saveCityList', this.cityList)
    },
  },
}
</script>

<style>
@import url('http://at.alicdn.com/t/c/font_4027375_0mhxnh971jsg.css');
body {
  background-color: #00668a;
}
#app {
  height: 100vh;
}
.tip {
  width: 70%;
  margin: 0 auto;
  color: #fff;
}
.container {
  position: relative;
  width: 100%;
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
.about i:hover {
  color: #004e71;
  transition: color 0.3s ease-in-out;
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
