/**
 * 这里注入页面级别的路由,并进行路由的懒加载,webpack 打包时,会单独的将其根据 hash 打包实现缓存
 * meta 中的 notKeepAlive 字段用于标识此页面是否包含 keep-alive 缓存组件 
 */
import Router from 'vue-router'

const Home = () => import (/* webpackChunkName: "home"*/ './views/Home.vue')
const About = () => import (/* webpackChunkName: "about" */ './views/About.vue')

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component:  Home,
      meta: {/* notKeepAlive: true */}  //指定是否为 keep-alive 缓存组件
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {}
    }
  ]
})
