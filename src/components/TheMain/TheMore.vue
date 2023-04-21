<template>
  <div class="more-weather">
    <h2>近来天气</h2>
    <div class="charts">Echarts渲染</div>
  </div>
</template>

<script>
export default {
  name: 'TheMore',
}
</script>

<style>
.more-weather {
  width: 70%;
  margin: 5px auto;
  color: #fff;

  height: 250px;
}
.charts {
  height: 200px;
  text-align: center;
  background-color: #004e71;
}
</style>
