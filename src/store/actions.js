// import * as types from './mutation-types.js';

export const findIndex = (list, song) => list.findIndex(item => item.id === song.id);

export const setOpenedList = ({commit, state}) => {
  state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRouter.children[0]];
};
