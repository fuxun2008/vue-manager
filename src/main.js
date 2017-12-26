// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Element from 'element-ui';
import 'es6-promise/auto';
import 'assets/js/polyfill';
import 'assets/css/index.scss';
import 'theme/index.css';

import App from './App';
import router from './router';
import store from './store';
import * as filters from './filters';

Vue.use(Element);

Vue.config.productionTip = false;
Vue.config.devtools = process.env.DEBUG_MODE;

// 注册全局自定义过滤器
Object.keys(filters).forEach(v => {
  Vue.filter(v, filters[v]);
});

// 注册一个全局自定义指令 v-focus
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: el => {
    // 聚焦元素
    el.focus();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
