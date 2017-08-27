import Vue from 'vue'
import Router from 'vue-router'

const index = resolve => require(['@/view/index'], resolve);
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hello',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'index',
      component: index,
    }
  ]
})
