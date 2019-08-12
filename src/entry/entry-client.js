import Vue from 'vue'
import keepJsBridge from 'keep-jsbridge'
import keepOpenApp from 'keep-openapp'
import keepWechajsSdk from 'keep-wechatjssdk'

import api from '~api/client-index'
import { CreateApp } from '../main'
const { app, store, router } = CreateApp()

/**
 * KEEP 中间件
 */
Vue.use(keepJsBridge)
Vue.use(keepOpenApp)
Vue.use(keepWechajsSdk)

// 客户端入口混入路由生命周期事件
Vue.mixin({

})

// 异步组件加载完成
router.beforeResolve((to, from, next) => {
  let diff = false
  const matched = router.getMatchedComponents(to)
  const prevMatched = router.getMatchedComponents(from)
  const activated = matched.filter((c, i) => diff || (diff = prevMatched[i] !== c))

  if (!activated.length) {
    return next()
  }

  Promise.all(
    activated.map((c, i) => {
      /**
             * 需要从服务端预取数据的条件
             * 1.非 keep alive 组件
             * 2.第一次装载的keep-alive 组件
             */
      if (c.asyncData && (!c.asyncDataFetched || c.meta.notKeepAlive)) {
        return c.asyncData({
          vm: this,
          route: to
        })
          .then(() => {
            c.asyncDataFetched = true // 添加标识,下次不再需要向服务端取数据
          })
      }
    })
  )
})

// 当已经取到服务端数据时将客户端的 state 进行替换
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
  store.state.$api = api    //注入客户端请求 api 逻辑
}
router.onReady(() => app.$mount('#app'))
