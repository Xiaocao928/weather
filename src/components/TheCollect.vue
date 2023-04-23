<template>
  <!-- 收藏的城市列表 -->
  <div class="collect-list" v-if="cityList.length">
    <div class="collect" v-for="(city, index) in cityList" :key="city.id">
      <div class="city-info">
        <h3>{{ city.name }}</h3>
        <span>{{ city.high }}</span>
      </div>
      <div class="control">
        <button @click="viewCity(index)">查看</button>
        <button @click="deleteCity(index)">删除</button>
      </div>
    </div>
  </div>
  <div class="tip" v-else>
    <h2>暂时没有保存过城市天气信息，请查询后点击右上角"+"号保存。</h2>
  </div>
</template>

<script>
export default {
  name: 'TheCollect',
  data() {
    return {
      cityList: [],
    }
  },

  mounted() {
    this.getCityList()
  },
  methods: {
    getCityList() {
      let res = localStorage.getItem('cityList')

      if (!res) {
        localStorage.setItem('cityList', JSON.stringify([]))
      } else {
        this.cityList = JSON.parse(res)
      }
    },
    viewCity(index) {
      this.$store.commit('local/searchName', this.cityList[index].name)
      this.$router.push('weather/result')
    },
    deleteCity(index) {
      console.log(index)
      this.cityList.splice(index, 1)
      localStorage.setItem('cityList', JSON.stringify(this.cityList))
    },
  },
}
</script>

<style scoped>
.collect-list {
  width: 70%;
  margin: 0 auto;
  color: #fff;
}
.collect {
  display: flex;
  width: 100%;
  gap: 10px;
  align-items: center;
  padding: 15px 0;
  cursor: pointer;
}
.collect .city-info {
  display: flex;
  flex: 5;
  justify-content: space-between;
  background-color: #004e71;
  padding: 15px 10px;
}

.collect .control {
  display: none;
  justify-content: space-between;
  flex: 1;
  transition: all 0.5s ease-in-out;
}
.collect:hover .control {
  display: flex;
}
.collect .control button {
  background-color: #eab308;
  color: #fff;
  font-size: 16px;
  padding: 11px 22px;
  border: none;
  cursor: pointer;
}
.tip {
  text-align: center;
  margin-block: 10px;
  padding-block: 10px;
}
</style>
