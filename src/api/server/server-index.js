/**
 * 拆分服务端客户端请求方法逻辑,
 * 去除服务端axios 请求中不必要的错误处理校检逻辑,以及拦截器
 * 对客户端实行 api 请求缓存处理
 */
import axios from 'axios'
import qs from 'qs'
import md5 from 'md5'
import serverConfig from './server-config'

const parseCookie = cookies => {
  let cookie = ''
  Object.keys(cookies).forEach(item => {
    cookie += item + '=' + cookies[item] + ';'
  })
  return cookie
}

// axios.prototype.interceptors = null  //不能去除,这样可能会同时阉割了客户端请求api 的拦截 😹

export const api = cookie => {
  return {
    cookie,
    api: axios.create({
      baseURL: serverConfig.api,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        cookie: parseCookie(cookie)
      },
      timeout: serverConfig.timeout
    }),
    getCookie() {
      return this.cookies
    },
    /**
     * 注意这里在 get 以及 post 请求数据中加入 cache 字段是为了确认之前曾经存在的请求是否需要手动二次发送
     * 如果 请求参数中 cache 存在证明此请求结果可被复用
     * 一般我们可以在 get 请求中带上获取老数据,在 post 请求中去除上传新数据
     */
    async post(url, data) {
      /**
       * 需要使用 cookie 时在这里加入验证,比如用户名
       */
      // const cookies = this.getCookie() || {}
      const key = md5(url + JSON.stringify(data))
      if (serverConfig.cached && data.cache && serverConfig.cached.has(key)) {
        const res = serverConfig.cached.get(key)
        return Promise.resolve(res && res.data)
      }
      const _res = await this.api({
        method: 'post',
        url,
        data: qs.stringify(data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      })
      if (serverConfig.cached) serverConfig.cached.set(key, _res)
      return _res && _res.data
    },
    async get(url, params) {
      /**
       * 需要使用 cookie 时在这里加入验证,比如用户名
       */
      // const cookies = this.getCookie() || {}
      const key = md5(url + JSON.stringify(params))
      if (serverConfig.cached && params.cache && serverConfig.cached.has(key)) {
        const res = serverConfig.cached.get(key)
        return Promise.resolve(res && res.data)
      }
      return this.api({
        method: 'get',
        params,
        url
      }).then(res => {
        if (serverConfig.cached && params.cache) serverConfig.cached.set(key, res)
        return res && res.data
      })
    }
  }
}
