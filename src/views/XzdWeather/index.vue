<template>
  <div>
    <header>
      <the-header></the-header>
    </header>
    <main>
      <!-- 二级路由出口 -->
      <router-view></router-view>
      
    </main>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'


export default {
  name: 'XzdWeather',
  components: {
    TheHeader,
  
  },
  data() {
    return {
     
    }
  },

  // methods: {
  //   async getRealTimeWeather() {
  //     try {
  //       const res = await getWeather()
  //       console.log(res)
  //     } catch (err) {
  //       this.$message.error(err || '加载出错了')
  //     }
  //   },

  //   async handleSearch() {
  //     const res = await getWeatherByCity({ city: '武汉市' })
  //     // console.log(res)
  //   },
  // },
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
  margin: 0 auto;
  color: #fff;
}
</style>
