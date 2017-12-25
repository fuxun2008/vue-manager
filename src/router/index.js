import Vue from 'vue';
import Router from 'vue-router';

const HelloWorld = r => require.ensure([], () => r(require('components/HelloWorld')), 'helloWorld');
const Err404 = r => require.ensure([], () => r(require('pages/404')), '404');

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: '/', // 如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"
  routes: [{
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld,
    meta: {
      title: '欢迎页面-美柚后台',
      auth: false
    }
  }, {
    path: '/404',
    name: 'notFound',
    component: Err404,
    meta: {
      title: '404-美柚后台',
      auth: false
    }
  }, {
    path: '*',
    name: 'error',
    redirect: '/404'
  }],
  scrollBehavior() {
    return { y: 0 };
  }
});

// 登录中间验证，页面跳转之前都会判断这个登录与否
router.beforeEach((to, from, next) => {
  const path = to.path;
  const { auth = false } = to.meta;

  if (auth && path !== '/login') {
    return false;
  }

  return next();
});

// 页面跳转之后，修改页面的title
router.afterEach(transition => {
  const title = transition.meta.title;
  if (title) {
    document.title = title;
  }
});

export default router;
