import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

import routes from './routes'

Vue.use(Router)
Vue.use(Meta)

export function CreateRouter () {
  return new Router({
    mode: 'history',
    base: process.env.BABEL_ENV,
    routes: routes
  })
}
