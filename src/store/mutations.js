import * as types from './mutation-types';

const mutations = {
  [types.SET_PLAY_HISTORY](state, playHistory) {
    state.playHistory = playHistory;
  },
  [types.SET_FAVORITE_LIST](state, list) {
    state.favoriteList = list;
  }
};

export default mutations;
