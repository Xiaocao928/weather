<template>
  <div class="result">
    <div class="title">
      你在正在预览上海市的天气
      <span>可以通过右上角的"+"号按钮保存起来</span>
    </div>
    <div class="weather-info">
      <h1>当日气温是：20摄氏度</h1>
      <h1>当日天气是：晴</h1>
      <h1>当日风向是：东北风</h1>
      <h1>当日风力是：≤3级</h1>
    </div>
    <hr class="line" />
    <the-more></the-more>
  </div>
</template>

<script>
import TheMore from '@/components/TheMore.vue'

export default {
  name: 'TheResult',
  components: {
    TheMore,
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
