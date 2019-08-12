const componet1 = () => import(/* webpackChunkName: "component1" */ '../components/HelloWorld.vue')

export default [
  {
    name: 'demo',
    path: '/',
    component: componet1,
    meta: { notKeepAlive: true } // 标识是否为 keep alive 组件
  }
]
