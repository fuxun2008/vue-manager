// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// import Element from 'element-ui';
import iView from 'iview';
import {mapMutations, mapActions} from 'vuex';
import 'es6-promise/auto';
import 'assets/js/polyfill';
import 'assets/css/index.scss';
// import 'theme/index.css';
import 'iview/dist/styles/iview.css';

import App from './App';
import router from './router/index';
import { appRouter } from './router/router';
import store from './store';
import * as filters from './filters';
import * as types from './store/mutation-types';

// Vue.use(Element);
Vue.use(iView);

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
  render: h => h(App),
  data: {
    currentPageName: ''
  },
  mounted() {
    this.currentPageName = this.$route.name;
    // 显示打开的页面的列表
    // this.$store.commit(types.SET_OPENED_LIST);
    this.setOpenedList();
    this.$store.commit(types.INIT_CACHE_PAGE);
    // 权限菜单过滤相关
    this.$store.commit(types.UPDATE_MENU_LIST);
    // iview-admin检查更新
    // util.checkUpdate(this);
  },
  created() {
    const tagsList = [];
    appRouter.map(item => {
      if (item.children.length <= 1) {
        tagsList.push(item.children[0]);
      } else {
        tagsList.push(...item.children);
      }
      return true;
    });
    this.$store.commit(types.SET_TAGS_LIST, tagsList);
  },
  methods: {
    ...mapActions([
      'setOpenedList'
    ])
  }
});
