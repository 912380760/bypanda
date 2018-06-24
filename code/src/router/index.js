import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const width = document.documentElement.clientWidth;
import Resume from '@/pages/resume'
import Mobile from '@/pages/Mobile'

export default new Router({
  // mode: 'history',  // 去#号
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
      component: width > 600 ? Resume : Mobile,
    },
    {
      path: '/test',
      name: 'test',
      component: resolve => require(['@/pages/test'], resolve),
    },
    {
      path: '/520',
      name: '520',
      component: resolve => require(['@/pages/520'], resolve),
    },
    {
      path: '/animation',
      name: 'animation',
      component: resolve => require(['@/pages/animation'], resolve),
    },
    {
      path: '/yangxiuting',
      name: 'yangxiuting',
      component: resolve => require(['@/pages/yangxiuting'], resolve),
    },
    {
      path: '/xinrui',
      name: 'xinrui',
      component: resolve => require(['@/pages/xinrui'], resolve),
    },
    {
      path: '/xinrui1',
      name: 'xinrui1',
      component: resolve => require(['@/pages/xinrui1'], resolve),
    }
  ],
});
