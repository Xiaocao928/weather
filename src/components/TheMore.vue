<template>
  <!-- 未来一周天气,用Echarts -->
  <div class="more-weather">
    <h2 class="title">未来一周天气</h2>
    <div class="forecast">
      <!-- 今日天气 -->
      <div class="weather-detail">
        <div class="everyday" v-for="item in weatherData" :key="item.index">
          <span>{{ item.date }}</span>
          <span>{{ item.week }}</span>
          <span>{{ item.type }}</span>
          <span>风力{{ item.fengli }}</span>
        </div>
      </div>

      <div class="chart">
        <v-chart :option="option"> </v-chart>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  name: 'TheMore',
  props: {
    weatherData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {}
  },

  computed: {
    option() {
      // 如果数据数空的就不渲染了
      if (!this.weatherData) {
        Message.error('获取天气数据出错')
        return {}
      }
      return {
        tooltip: {
          trigger: 'axis',
        },
        toolbox: {
          show: false, //工具栏隐藏
          feature: {
            dataZoom: {
              yAxisIndex: 'none',
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'category',
          show: false,
          boundaryGap: false,
          data: this.weatherData.map(item => item.week), //横坐标为接下来一周的天气
        },
        yAxis: {
          type: 'value',
          show: false,
          axisLabel: {
            formatter: '{value} °C',
          },
        },
        series: [
          {
            name: '',
            type: 'line',
            data: this.weatherData.map(item => item.high.replace(/°C/, '')), //获取天气的数据源,将原始数据中的°C去掉

            label: {
              show: true,
              color: '#fff',
              fontSize: 12,
              // 格式化标签内容
              formatter: function (params) {
                return '白' + params.value + '℃'
              },
            },
          },
          {
            name: '',
            type: 'line',
            data: this.weatherData.map(item => item.low.replace(/°C/, '')),
            label: {
              position: 'bottom', //在折线下边显示
              show: true,
              color: '#fff',
              fontSize: 12,
              formatter: function (params) {
                return '晚' + params.value + '℃'
              },
            },
          },
        ],
      }
    },
  },
}
</script>

<style>
.more-weather {
  width: 70%;
  height: 400px;
  margin: 5px auto;
  color: #fff;
}
.title {
  margin-top: 24px;
  margin-bottom: 15px;
}
.more-weather .forecast {
  background-color: #004e71;
}
.forecast .weather-detail {
  display: flex;

  justify-content: space-around;
}
.forecast .weather-detail .everyday {
  display: flex;
  gap: 25px;
  margin-top: 20px;
  flex-direction: column;
  align-items: center;
}
.forecast .chart {
  width: 100%;
  height: 300px;
}
</style>
