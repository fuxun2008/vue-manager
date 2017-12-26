import * as types from './mutation-types';

const mutations = {
  [types.SET_AVATAR](state, path) {
    localStorage.avatorImgPath = path;
  },
  [types.SET_FAVORITE_LIST](state, list) {
    state.favoriteList = list;
  }
};

export default mutations;
