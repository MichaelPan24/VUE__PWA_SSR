/**
 * 拆分服务端客户端请求方法逻辑,
 * 去除服务端axios 请求中不必要的错误处理校检逻辑,以及拦截器
 * 对客户端实行 api 请求缓存处理
 */
import axios from 'axios'

axios.interceptors = null

export default {
  api: axios.create({

  }),
  get: this.api
}
