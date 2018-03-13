// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import 'element-ui/lib/theme-chalk/index.css';
import '@/css/reset.css';
import '@/css/bootstrap.min.css'
import 'highlight.js/styles/monokai-sublime.css'; // 代码高亮CSS
import ElementUI from 'element-ui';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/index'

// const width = document.documentElement.clientWidth;
// import Mobile from './Mobile';
Vue.config.productionTip = false;
Vue.use(ElementUI);
// Vue.use(Vuex)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
