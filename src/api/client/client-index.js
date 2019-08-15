import axios from 'axios'
import qs from 'qs'
import clientConfig from './client-config'

axios.interceptors.request.use(
  clientConfig => {
    return clientConfig
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(response => response, error => Promise.resolve(error.response)) // 拦截响应处理错误

function checkStatus (response) {
  if (response.status === 200 || response.status === 304) {
    return response
  }
  return {
    data: {
      code: response.status,
      message: response.statusText,
      data: ''
    }
  }
}

function checkCode (res) {
  if (res.data.code === 500 || res.data.code === 404) {
    window.location.href = '/'
  } else {
    return res && res.data
  }
}

export default {
  post (url, data) {
    return axios({
      method: 'post',
      url: clientConfig.api + url,
      data: qs.stringify(data),
      timeout: clientConfig.timeout,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
      .then(checkStatus)
      .then(checkCode)
  },
  get (url, params) {
    return axios({
      method: 'get',
      url: clientConfig.api + url,
      params,
      timeout: clientConfig.timeout,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
      .then(checkStatus)
      .then(checkCode)
  }
}
