/**
 * 局部组件混入路由生命周期,以实现 vuex 模块动态注册
 * 优化点
 * 1.模块间解耦
 * 2.暴露上下文对象,以此使其具备组件级,页面级的 module 注入口
 */

class ModuleInfo {
  constructor (vm, modulePath, options) {
    this.vm = vm
    this.modulePath = modulePath
    this.options = options
  }
  getModuleInfo () {
    return {
      _vm: this.vm,
      _modulePath: this.modulePath,
      _options: this.options
    }
  }
  wrapModule () {
    const { _vm, _modulePath, _options } = this.getModuleInfo()
    console.log(_vm)
    _vm.$util.registerModule(_modulePath, _options).bind(_vm)
  }
  unWrapModule () {
    const { _vm, _modulePath } = this.getModuleInfo()
    _vm.$util.unregisterModule(_modulePath).bind(_vm)
  }
}

export default (vm, modulePath, options) => {
  let module = new ModuleInfo(vm, modulePath, options)
  return {
    beforeRouterEnter () {
      module.wrapModule()
    },
    beforeRouteLeave () {
      module.unWrapModule()
    }
  }
}
