import CreateApp from '../main'

const { app, store, router } = CreateApp()

export default context => {
  router.beforeResolve((to, from, next) => {

  })

  router.onReady((to, from, next) => {

    context.state = store.state
  })

  
}
