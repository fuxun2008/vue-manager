import * as types from '../store/mutation-types';

const util = {};

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
