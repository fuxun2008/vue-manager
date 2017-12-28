import { otherRouter, appRouter } from '../router/router';

const state = {
  cachePage: [],
  lang: '',
  isFullScreen: false,
  openedSubmenuArr: [], // 要展开的菜单数组
  menuTheme: 'dark', // 主题
  themeColor: '',
  pageOpenedList: [{
    title: '首页',
    path: '',
    name: 'home_index'
  }],
  currentPageName: '',
  currentPath: [{
    title: '首页',
    path: '',
    name: 'home_index'
  }], // 面包屑数组
  menuList: [],
  routers: [
    otherRouter,
    ...appRouter
  ],
  tagsList: [...otherRouter.children],
  messageCount: 0,
  dontCache: ['text-editor', 'artical-publish'] // 在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js)
};

export default state;
