// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */

import '@/css/reset.css';
import '@/css/bootstrap.min.css'
import 'highlight.js/styles/monokai-sublime.css'; // 代码高亮CSS

// 按需引入element
import 'element-ui/lib/theme-chalk/index.css';
import { Menu, Button, Tooltip, Tag, MenuItem } from 'element-ui';
Vue.use(Menu);
Vue.use(Button);
Vue.use(Tooltip);
Vue.use(Tag);
Vue.use(MenuItem);

import Vue from 'vue';
import App from './App';
import router from './router';

// const width = document.documentElement.clientWidth;
// import Mobile from './Mobile';
Vue.config.productionTip = false;
// Vue.use(Vuex)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});