<template>
  <!-- 收藏的城市列表 -->
  <div class="collect-list">
    <div class="collect">
      <div class="city-info">
        <h3>{{ city.name }}</h3>
        <span>{{ city.high }}</span>
      </div>
      <div class="control">
        <button>查看</button>
        <button>删除</button>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'TheCollect',
  props: {
    city: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style>
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
  padding: 15px 10px;
}
.collect .city-info {
  display: flex;
  flex: 5;
  justify-content: space-between;
  background-color: #004e71;
  padding: 15px 10px;
}
.collect .control {
  /* display: none; */
  display: flex;
  justify-content: space-between;
  flex: 1;
}
.collect .control button {
  background-color: #eab308;
  color: #fff;
  font-size: 16px;
  padding: 11px 22px;
  border: none;
}
.tip {
  text-align: center;
  margin-block: 10px;
  padding-block: 10px;
}
</style>
