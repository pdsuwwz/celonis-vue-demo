import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

console.log('process.env.VUE_APP_ROUTER_MODE', process.env.VUE_APP_ROUTER_MODE)
const routerMode = process.env.VUE_APP_ROUTER_MODE === 'hash'
  ? 'hash'
  : 'history'

export default new Router({
  base: '/',
  mode: routerMode,
  routes
})
