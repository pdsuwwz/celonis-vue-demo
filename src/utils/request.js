import axios from 'axios'
import { Message } from 'element-ui'

import { getCookieToken } from '@/utils/cookie'
import { camelizeKeys, decamelizeKeys } from '@/utils/camelCase'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    config.data = decamelizeKeys(config.data)
    config.params = decamelizeKeys(config.params)
    if (getCookieToken()) {
      config.headers.Authorization = `Bearer ${getCookieToken()}` // 让每个请求携带自定义 token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    const data = response.data
    return camelizeKeys(data)
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          return Promise.reject(error)
        case 401:
          Message({
            message: '401! 操作无权限，请添加权限',
            type: 'error',
            duration: 3 * 1000
          })
          return Promise.reject(error)
        case 403:
          Message({
            message: error.response.data.message,
            type: 'error',
            duration: 3 * 1000
          })
          return Promise.reject(error)
        case 404:
          Message({
            message: error.response.data.message,
            type: 'error',
            duration: 3 * 1000
          })
          return Promise.reject(error)
        case 500:
          Message({
            message: '500！报错啦， 请稍后重试',
            type: 'error',
            duration: 3 * 1000
          })
          return Promise.reject(error)
        case 422:
          return Promise.reject(error)
        case 429:
          Message({
            message: '请求次数过多，请稍后再试',
            type: 'error',
            duration: 3 * 1000
          })
          return Promise.reject(error)
        default:
          Message({
            dangerouslyUseHTMLString: true,
            message: error.response.data.errors || error.response.data.message,
            type: 'error',
            duration: 5 * 1000
          })
          return Promise.reject(error)
      }
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  }
)

export function sleep (time = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({})
    }, time)
  })
}

export default service
