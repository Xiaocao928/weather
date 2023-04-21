// 封装axios
import axios from 'axios'
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE,
  timeout: 3000,
})

//
//设置请求拦截器(不需要token)

//设置响应拦截器
instance.interceptors.response.use(
  res => {
    // console.log(res)
    const { data, request } = res
    if (request.status == 200) {
      return data
    } else {
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  error => {
    return Promise.reject(error)
  }
)
//导出实例
export default instance
