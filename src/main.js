import Vue from 'vue'
import App from './App'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import { sync } from 'vuex-router-sync'
import router from '@/router/index'
import store from '@/store/index'
import Meta from 'vue-meta'

import Mixin from '@/mixins'

Vue.use(Meta)
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })

Vue.config.productionTip = false

Vue.mixin(Mixin)
sync(store, router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
