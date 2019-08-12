/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import modules from './store/index.js'

const { module1, module2 } = modules

Vue.use(Vuex)

export function CreateStore () {
  return new Vuex.store({
    modules: {
      a: {
        namespaced: true,
        modules: {
          module1
        }
      },
      b: {
        namespaced: true,
        modules: {
          module2
        }
      }
    }
  })
}
