import Vue from 'vue'
import Router from 'vue-router'

import routes from './routes'

Vue.use(Router)

export function CreateRouter () {
  return new Router({
    mode: 'history',
    base: process.env.BABEL_ENV,
    routes: routes
  })
}
