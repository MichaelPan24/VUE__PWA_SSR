import Vue from 'vue'

import App from './App.vue'
import { CreateRouter } from './createRouter'
import { CreateStore } from './createStore'
import { sync } from 'vuex-router-sync'

import utils from './utils'
import mixin from './mixin'

import './registerServiceWorker'

Vue.mixin(mixin)

// 全局注册工具包
Vue.prototype.$util = utils

Vue.config.productionTip = false

export function CreateAPP (context = '') {
  const store = CreateStore()
  const router = CreateRouter()
  sync(store, router)
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, store, router }
}
