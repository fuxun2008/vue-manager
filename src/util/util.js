import * as types from '../store/mutation-types';

const util = {};

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const shuffle = arr => {
  const arrTmp = arr.slice();
  for (let i = 0; i < arrTmp.length; i++) {
    const j = getRandomInt(0, i);
    const t = arrTmp[i];
    arrTmp[i] = arrTmp[j];
    arrTmp[j] = t;
  }
  return arrTmp;
};

util.debounce = (func, delay) => {
  let timer;

  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

/**
 * 过去距离当前时间差
 * @param  {int} ms 毫秒数
 * @return {string}    时间差标示
 */
util.dateFromNow = ms => {
  const time = parseFloat(ms) / 1000;
  let result = '';
  if (time) {
    if (time > 60 && time < 3600) {
      result = `${parseInt(time / 60.0, 10)}分钟前`;
    } else if (time >= 3600 && time < 24 * 3600) {
      result = `${parseInt(time / 3600.0, 10)}小时前`;
    } else if (time >= 24 * 3600 && time < 30 * 24 * 3600) {
      result = `${parseInt(time / 3600.0 / 24.0, 10)}天前`;
    } else if (time >= 30 * 24 * 3600 && time < 12 * 30 * 24 * 3600) {
      result = `${parseInt(time / 3600.0 / 24.0 / 30, 10)}月前`;
    } else if (time >= 12 * 30 * 24 * 3600) {
      result = `${parseInt(time / 3600.0 / 24.0 / 30.0 / 12.0, 10)}年前`;
    } else {
      result = `${parseInt(time / 1.0, 10)}秒前`;
    }
  }

  return result;
};

util.title = title => {
  title = title || 'iView admin';
  window.document.title = title;
};

/**
 * 返回顶部
 * @return {}
 */
util.toTop = () => {
  window.scrollTo(0, 0);
};

util.oneOf = (ele, targetArr) => {
  if (targetArr.indexOf(ele) >= 0) {
    return true;
  }
  return false;
};

util.openNewPage = (vm, name, argu, query) => {
  const pageOpenedList = vm.$store.state.pageOpenedList;
  const openedPageLen = pageOpenedList.length;
  let i = 0;
  let tagHasOpened = false;
  while (i < openedPageLen) {
    if (name === pageOpenedList[i].name) { // 页面已经打开
      vm.$store.commit(types.PAGE_OPENED_LIST, {
        index: i,
        argu: argu,
        query: query
      });
      tagHasOpened = true;
      break;
    }
    i++;
  }
  if (!tagHasOpened) {
    let tag = vm.$store.state.tagsList.filter(item => {
      if (item.children) {
        return name === item.children[0].name;
      }
      return name === item.name;
    });
    tag = tag[0];
    if (tag) {
      tag = tag.children ? tag.children[0] : tag;
      if (argu) {
        tag.argu = argu;
      }
      if (query) {
        tag.query = query;
      }
      vm.$store.commit(types.INCREATE_TAG, tag);
    }
  }
  vm.$store.commit(types.SET_CURRENT_PAGE_NAME, name);
};

util.showThisRoute = (itAccess, currentAccess) => {
  if (typeof itAccess === 'object' && Array.isArray(itAccess)) {
    return util.oneOf(currentAccess, itAccess);
  }
  return itAccess === currentAccess;
};

util.getRouterObjByName = (routers, name) => {
  if (!name || !routers || !routers.length) {
    return null;
  }

  // debugger;
  let routerObj = null;
  for (const item of routers) {
    if (item.name === name) {
      return item;
    }
    routerObj = util.getRouterObjByName(item.children, name);
    if (routerObj) {
      return routerObj;
    }
  }

  return null;
};

util.toDefaultPage = (routers, name, route, next) => {
  const len = routers.length;
  let i = 0;
  let notHandle = true;
  while (i < len) {
    if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
      route.replace({
        name: routers[i].children[0].name
      });
      notHandle = false;
      next();
      break;
    }
    i++;
  }
  if (notHandle) {
    next();
  }
};

util.handleTitle = (vm, item) => {
  if (typeof item.title === 'object') {
    return vm.$t(item.title.i18n);
  }
  return item.title;
};

util.setCurrentPath = (vm, name) => {
  let title = '';
  let isOtherRouter = false;
  vm.$store.state.routers.forEach(item => {
    if (item.children.length === 1) {
      if (item.children[0].name === name) {
        title = util.handleTitle(vm, item);
        if (item.name === 'otherRouter') {
          isOtherRouter = true;
        }
      }
    } else {
      item.children.forEach(child => {
        if (child.name === name) {
          title = util.handleTitle(vm, child);
          if (item.name === 'otherRouter') {
            isOtherRouter = true;
          }
        }
      });
    }
  });
  let currentPathArr = [];
  if (name === 'home_index') {
    currentPathArr = [{
      title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.routers, 'home_index')),
      path: '',
      name: 'home_index'
    }];
  } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home_index') {
    currentPathArr = [{
      title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.routers, 'home_index')),
      path: '/home',
      name: 'home_index'
    }, {
      title: title,
      path: '',
      name: name
    }];
  } else {
    const currentPathObj = vm.$store.state.routers.filter(item => {
      if (item.children.length <= 1) {
        return item.children[0].name === name;
      }
      let i = 0;
      const childArr = item.children;
      const len = childArr.length;
      while (i < len) {
        if (childArr[i].name === name) {
          return true;
        }
        i++;
      }
      return false;
    })[0];
    if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
      currentPathArr = [{
        title: '首页',
        path: '',
        name: 'home_index'
      }];
    } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
      currentPathArr = [{
        title: '首页',
        path: '/home',
        name: 'home_index'
      }, {
        title: currentPathObj.title,
        path: '',
        name: name
      }];
    } else {
      const childObj = currentPathObj.children.filter(child => child.name === name)[0];
      currentPathArr = [{
        title: '首页',
        path: '/home',
        name: 'home_index'
      }, {
        title: currentPathObj.title,
        path: '',
        name: currentPathObj.name
      }, {
        title: childObj.title,
        path: currentPathObj.path + '/' + childObj.path,
        name: name
      }];
    }
  }
  vm.$store.commit(types.SET_CURRENT_PATH, currentPathArr);

  return currentPathArr;
};

export default util;
