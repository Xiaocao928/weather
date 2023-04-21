import request from './request'
//自动识别
export const getWeather = () => {
  return request({
    url: '/weather',
    method: 'GET',
  })
}

// 通过城市名获取天气
export const getWeatherByCity = params => {
  return request({
    url: '/weather',
    method: 'GET',
    params,
  })
}
//获取城市一周的天气
export const getWeatherByWeek = params => {
  return request({
    url: '/weather',
    method: 'GET',
    params,
  })
}
