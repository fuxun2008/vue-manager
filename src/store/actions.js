// import * as types from './mutation-types.js';

const findIndex = (list, song) => list.findIndex(item => item.id === song.id);

export default findIndex;
