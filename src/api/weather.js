import request from './request'
//自动识别
export const getWeather = () => {
  return request({
    url: '/weather',
    method: 'GET',
  })
}


export const getWeatherByCity = params => {
  return request({
    url: '/weather',
    method: 'GET',
    params,
  })
}
