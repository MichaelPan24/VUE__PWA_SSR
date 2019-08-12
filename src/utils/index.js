export default {
  /**
     *
     * @param {Object} store  当前 store 实例
     * @param {String | Array} module  要注册的模块名
     * @param {Object} options 提供的模块选项
     * @param {Boolean} options.preserveState 是否选择保留从服务端渲染的 state
     */
  registerStoreModule (store, module, options) {
    return store.registerStoreModule(module, {
      ...options
    })
  }
}
