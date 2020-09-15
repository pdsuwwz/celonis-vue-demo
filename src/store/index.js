import Vue from 'vue'
import Vuex from 'vuex'

/**
 * 存放模块化的 module
 */
import WorkspaceModule from '@/modules/Workspace/store'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Workspace: WorkspaceModule
  }
})
export default store
