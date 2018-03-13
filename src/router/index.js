import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',  // 去#号
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => require(['@/pages/index'], resolve),
    },
    {
      path: '/about',
      name: 'about',
      component: resolve => require(['@/pages/about'], resolve),
    },
    {
      path: '/technology',
      name: 'technology',
      component: resolve => require(['@/pages/technology'], resolve),
    },
    {
      path: '/other',
      name: 'other',
      component: resolve => require(['@/pages/other'], resolve),
    },
    {
      path: '/resume',
      name: 'Resume',
      component: resolve => require(['@/pages/resume'], resolve),
    },
  ],
});
