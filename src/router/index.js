import Vue from 'vue';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';
import Util from 'util/util';
import { routers, otherRouter, appRouter } from './router';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
  mode: 'history',
  base: '/',
  routes: routers
};

const router = new VueRouter(RouterConfig);

// 登录中间验证，页面跳转之前都会判断这个登录与否
router.beforeEach((to, from, next) => {
  Util.title(to.meta.title);
  if (Cookies.get('locking') === '1' && to.name !== 'locking') { // 判断当前是否是锁定状态
    next({
      replace: true,
      name: 'locking'
    });
  } else if (Cookies.get('locking') === '0' && to.name === 'locking') {
    next(false);
  }

  if (!Cookies.get('user') && to.name !== 'login') { // 判断是否已经登录且前往的页面不是登录页
    next({
      name: 'login'
    });
  } else if (Cookies.get('user') && to.name === 'login') { // 判断是否已经登录且前往的是登录页
    Util.title();
    next({
      name: 'home_index'
    });
  } else {
    const curRouterObj = Util.getRouterObjByName([otherRouter, ...appRouter], to.name);
    if (curRouterObj && curRouterObj.access !== undefined) { // 需要判断权限的路由
      if (curRouterObj.access === parseInt(Cookies.get('access'), 10)) {
        Util.toDefaultPage([otherRouter, ...appRouter], to.name, router, next); // 如果在地址栏输入的是一级菜单则默认打开其第一个二级菜单的页面
      } else {
        next({
          replace: true,
          name: 'error-403'
        });
      }
    } else { // 没有配置权限的路由, 直接通过
      Util.toDefaultPage([...routers], to.name, router, next);
    }
  }
});

// 页面跳转之后，修改页面的title
router.afterEach(to => {
  Util.openNewPage(router.app, to.name, to.params, to.query);
  // iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});

export default router;
