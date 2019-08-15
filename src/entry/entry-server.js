import {
  CreateApp
} from '../main'
import {
  api
} from '../api/server/server-index'

export default context => {
  return new Promise((resolve, reject) => {
    const {
      app,
      store,
      router
    } = CreateApp()

    const url = context.url
    const fullPath = router.resolve(url).route.fullPath

    if (fullPath !== url) {
      reject({
        url: fullPath
      })
    }
    router.push(context.url)

    router.onReady(() => {
      const matched = router.getMatchedComponents()
      if (!matched.length) reject({
        code: 404
      })


        Promise.all(matched.map((c, i) => {
          if (c.asyncData) {
            return c.asyncData({
              store,
              route: router.currentRouter
            })
          }
        })).then(() => {
          context.state = store.state
          context.isProd = process.env.NODE_ENV === 'production'
          store.state.$api = api
          resolve(app)
        })
        .catch(reject)
    }, reject)
  })
}
