import {
  otherRouter,
  appRouter
} from 'src/router/router';
import Util from 'util/util';
import Cookies from 'js-cookie';
import * as types from './mutation-types';

const mutations = {
  [types.SET_AVATAR](state, path) {
    localStorage.avatarImgPath = path;
  },
  [types.PAGE_OPENED_LIST](state, get) {
    const openedPage = state.pageOpenedList[get.index];
    if (get.argu) {
      openedPage.argu = get.argu;
    }
    if (get.query) {
      openedPage.query = get.query;
    }
    state.pageOpenedList.splice(get.index, 1, openedPage);
    localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
  },
  [types.INCREATE_TAG](state, tagObj) {
    if (!Util.oneOf(tagObj.name, state.dontCache)) {
      state.cachePage.push(tagObj.name);
      localStorage.cachePage = JSON.stringify(state.cachePage);
    }
    state.pageOpenedList.push(tagObj);
    localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
  },
  [types.SET_CURRENT_PAGE_NAME](state, name) {
    state.currentPageName = name;
  },
  [types.SET_TAGS_LIST](state, list) {
    state.tagsList.push(...list);
  },
  [types.INIT_CACHE_PAGE](state) {
    if (localStorage.cachePage) {
      state.cachePage = JSON.parse(localStorage.cachePage);
    }
  },
  [types.UPDATE_MENU_LIST](state) {
    const accessCode = parseInt(Cookies.get('access'), 10);
    const menuList = [];
    appRouter.forEach(item => {
      if (item.access !== undefined) {
        if (Util.showThisRoute(item.access, accessCode)) {
          if (item.children.length === 1) {
            menuList.push(item);
          } else {
            const len = menuList.push(item);
            let childrenArr = [];
            childrenArr = item.children.filter(child => {
              if (child.access !== undefined) {
                if (child.access === accessCode) {
                  return child;
                }
              } else {
                return child;
              }
              return false;
            });
            menuList[len - 1].children = childrenArr;
          }
        }
      } else {
        if (item.children.length === 1) {
          menuList.push(item);
        } else {
          const len = menuList.push(item);
          let childrenArr = [];
          childrenArr = item.children.filter(child => {
            if (child.access !== undefined) {
              if (Util.showThisRoute(child.access, accessCode)) {
                return child;
              }
            } else {
              return child;
            }
            return false;
          });
          const handledItem = JSON.parse(JSON.stringify(menuList[len - 1]));
          handledItem.children = childrenArr;
          menuList.splice(len - 1, 1, handledItem);
        }
        return false;
      }
      return false;
    });
    state.menuList = menuList;
  },
  [types.SET_CURRENT_PATH](state, pathArr) {
    state.currentPath = pathArr;
  },
  [types.ADD_OPEN_SUBMENU](state, name) {
    let hasThisName = false;
    let isEmpty = false;
    if (name.length === 0) {
      isEmpty = true;
    }
    if (state.openedSubmenuArr.indexOf(name) > -1) {
      hasThisName = true;
    }
    if (!hasThisName && !isEmpty) {
      state.openedSubmenuArr.push(name);
    }
  },
  [types.SET_MESSAGE_COUNT](state, count) {
    state.messageCount = count;
  },
  [types.CLEAR_OPENED_SUBMENU](state) {
    state.openedSubmenuArr.length = 0;
  },
  [types.LOGOUT](state, vm) {
    console.log('vm: ', vm);
    Cookies.remove('user');
    Cookies.remove('password');
    Cookies.remove('access');
    // 恢复默认样式
    const themeLink = document.querySelector('link[name="theme"]');
    themeLink.setAttribute('href', '');
    // 清空打开的页面等数据，但是保存主题数据
    let theme = '';
    if (localStorage.theme) {
      theme = localStorage.theme;
    }
    localStorage.clear();
    if (theme) {
      localStorage.theme = theme;
    }
  }
};

export default mutations;
