/*
* @Author: Xun.Fu
* @Date:   2017-12-27 17:18:29
* @Last Modified by:   Xun.Fu
* @Last Modified time: 2017-12-27 19:43:39
*/

import Main from 'pages/main';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  component: resolve => {
    require(['pages/login'], resolve);
  },
  meta: {
    title: '登录-美柚后台'
  }
};

export const error = {
  path: '/*',
  name: 'error',
  redirect: '/404'
};

export const page404 = {
  path: '/404',
  name: 'error-404',
  component: resolve => {
    require(['pages/error-page/404'], resolve);
  },
  meta: {
    title: '404-页面不存在'
  }
};

export const page403 = {
  path: '/403',
  name: 'error-403',
  component: resolve => {
    require(['pages/error-page/403'], resolve);
  },
  meta: {
    title: '403-权限不足'
  }
};

export const page500 = {
  path: '/500',
  name: 'error-500',
  component: resolve => {
    require(['pages/error-page/500'], resolve);
  },
  meta: {
    title: '500-服务端错误',
    auth: false
  }
};

export const locking = {
  path: '/locking',
  name: 'locking',
  component: resolve => {
    require(['components/lockscreen/lockscreen'], resolve);
  },
  meta: {
    title: '登录-美柚后台',
    auth: false
  }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: Main,
  children: [{
    path: 'home',
    name: 'home_index',
    component: resolve => {
      require(['pages/home/home'], resolve);
    },
    title: '首页'
  }]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [{
  path: '/access',
  icon: 'key',
  name: 'access',
  title: '权限管理',
  component: Main,
  children: [{
    path: 'index',
    title: '权限管理',
    name: 'access_index',
    component: resolve => {
      require(['pages/access/access'], resolve);
    }
  }]
}];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  loginRouter,
  otherRouter,
  locking,
  ...appRouter,
  page500,
  page403,
  page404,
  error
];
