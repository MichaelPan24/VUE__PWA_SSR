const Home = () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
const About = () => import(/* webpackChunkName: "About" */ '../views/About.vue')

export default [
  {
    name: 'home',
    path: '/',
    component: Home,
    meta: { notKeepAlive: true } // 标识是否为 keep alive 组件
  },
  {
    name: 'about',
    path: '/about',
    component: About,
    meta: { notKeepAlive: true }
  }
]
