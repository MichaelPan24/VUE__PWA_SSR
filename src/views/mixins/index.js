/**
 * 局部组件混入路由生命周期,以实现 vuex 模块动态注册
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
    _vm.$util.registerModule(_modulePath, _options)
  }
  unWrapModule () {
    const { _vm, _modulePath } = this.getModuleInfo()
    _vm.$util.unregisterModule(_modulePath)
  }
}

export default (vm, modulePath, options) => {
  const module = new ModuleInfo(vm, modulePath, options)
  return {
    beforeRouteEnter (to, from, next) {
      module.wrapModule()
    },
    beforeRouterLeave () {
      module.unregisterModule()
    }
  }
}
