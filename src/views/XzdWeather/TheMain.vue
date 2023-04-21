<template>
  <div id="app">
    <the-search></the-search>

    <div class="city-list" v-if="cities.length">
      <the-collect
        v-for="city in cities"
        :key="city.id"
        :city="city"
      ></the-collect>
    </div>
    <div class="tip" v-else>
      <h2>暂时没有保存过城市天气信息，请查询后点击右上角"+"号保存。</h2>
    </div>

    <the-more ></the-more>
  </div>
</template>

<script>
import TheSearch from '@/components/TheSearch.vue'
import TheMore from '@/components/TheMore.vue'
import TheCollect from '@/components/TheCollect.vue'

export default {
  name: 'TheMain',
  components: {
    TheSearch,
    TheMore,
    TheCollect,
  },
  data() {
    return {
      cities: [
        { id: 1, name: '北京市', high: '28度' },
        { id: 2, name: '上海市', high: '34度' },
      ],
      
    }
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
  margin: 0 auto;
  color: #fff;
}
</style>
