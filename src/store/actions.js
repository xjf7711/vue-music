// import * as types from "./mutation-types";
// import { playMode } from "../assets/js/config";
// import { shuffle } from "../assets/js/util";
// import {
//   saveSearch,
//   clearSearch,
//   deleteSearch,
//   savePlay,
//   saveFavorite,
//   deleteFavorite
// } from "../assets/js/cache";
//
// function findIndex(list, song) {
//   return list.findIndex(item => {
//     return item.id === song.id;
//   });
// }
//
// export const selectPlay = function({ commit, state }, { list, index }) {
//   commit(types.SET_SEQUENCE_LIST, list);
//   if (state.mode === playMode.random) {
//     let randomList = shuffle(list);
//     commit(types.SET_PLAYLIST, randomList);
//     index = findIndex(randomList, list[index]);
//   } else {
//     commit(types.SET_PLAYLIST, list);
//   }
//   commit(types.SET_CURRENT_INDEX, index);
//   commit(types.SET_FULL_SCREEN, true);
//   commit(types.SET_PLAYING_STATE, true);
// };
//
// export const randomPlay = function({ commit }, { list }) {
//   commit(types.SET_PLAY_MODE, playMode.random);
//   commit(types.SET_SEQUENCE_LIST, list);
//   let randomList = shuffle(list);
//   commit(types.SET_PLAYLIST, randomList);
//   commit(types.SET_CURRENT_INDEX, 0);
//   commit(types.SET_FULL_SCREEN, true);
//   commit(types.SET_PLAYING_STATE, true);
// };
//
// export const insertSong = function({ commit, state }, song) {
//   let playlist = state.playlist.slice();
//   let sequenceList = state.sequenceList.slice();
//   let currentIndex = state.currentIndex;
//   // 记录当前歌曲
//   let currentSong = playlist[currentIndex];
//   // 查找当前列表中是否有待插入的歌曲并返回其索引
//   let fpIndex = findIndex(playlist, song);
//   // 因为是插入歌曲，所以索引+1
//   currentIndex++;
//   // 插入这首歌到当前索引位置
//   playlist.splice(currentIndex, 0, song);
//   // 如果已经包含了这首歌
//   if (fpIndex > -1) {
//     // 如果当前插入的序号大于列表中的序号
//     if (currentIndex > fpIndex) {
//       playlist.splice(fpIndex, 1);
//       currentIndex--;
//     } else {
//       playlist.splice(fpIndex + 1, 1);
//     }
//   }
//
//   let currentSIndex = findIndex(sequenceList, currentSong) + 1;
//
//   let fsIndex = findIndex(sequenceList, song);
//
//   sequenceList.splice(currentSIndex, 0, song);
//
//   if (fsIndex > -1) {
//     if (currentSIndex > fsIndex) {
//       sequenceList.splice(fsIndex, 1);
//     } else {
//       sequenceList.splice(fsIndex + 1, 1);
//     }
//   }
//
//   commit(types.SET_PLAYLIST, playlist);
//   commit(types.SET_SEQUENCE_LIST, sequenceList);
//   commit(types.SET_CURRENT_INDEX, currentIndex);
//   commit(types.SET_FULL_SCREEN, true);
//   commit(types.SET_PLAYING_STATE, true);
// };
//
// export const saveSearchHistory = function({ commit }, query) {
//   commit(types.SET_SEARCH_HISTORY, saveSearch(query));
// };
//
// export const deleteSearchHistory = function({ commit }, query) {
//   commit(types.SET_SEARCH_HISTORY, deleteSearch(query));
// };
//
// export const clearSearchHistory = function({ commit }) {
//   commit(types.SET_SEARCH_HISTORY, clearSearch());
// };
//
// export const deleteSong = function({ commit, state }, song) {
//   let playlist = state.playlist.slice();
//   let sequenceList = state.sequenceList.slice();
//   let currentIndex = state.currentIndex;
//   let pIndex = findIndex(playlist, song);
//   playlist.splice(pIndex, 1);
//   let sIndex = findIndex(sequenceList, song);
//   sequenceList.splice(sIndex, 1);
//   if (currentIndex > pIndex || currentIndex === playlist.length) {
//     currentIndex--;
//   }
//
//   commit(types.SET_PLAYLIST, playlist);
//   commit(types.SET_SEQUENCE_LIST, sequenceList);
//   commit(types.SET_CURRENT_INDEX, currentIndex);
//
//   if (!playlist.length) {
//     commit(types.SET_PLAYING_STATE, false);
//   } else {
//     commit(types.SET_PLAYING_STATE, true);
//   }
// };
//
// export const deleteSongList = function({ commit }) {
//   commit(types.SET_CURRENT_INDEX, -1);
//   commit(types.SET_PLAYLIST, []);
//   commit(types.SET_SEQUENCE_LIST, []);
//   commit(types.SET_PLAYING_STATE, false);
// };
//
// export const savePlayHistory = function({ commit }, song) {
//   commit(types.SET_PLAY_HISTORY, savePlay(song));
// };
//
// export const saveFavoriteList = function({ commit }, song) {
//   commit(types.SET_FAVORITE_LIST, saveFavorite(song));
// };
//
// export const deleteFavoriteList = function({ commit }, song) {
//   commit(types.SET_FAVORITE_LIST, deleteFavorite(song));
// };
// 根级别的 action
// 封装复杂的 mutations

import * as types from "./mutations-type.js";
import { myArray } from "src/assets/js/utils.js";
import {
  localSave,
  localDel,
  localClear,
  savePlay,
  saveFavorite,
  delFavorite
} from "src/assets/js/store.js";

function findIndex(list, song) {
  return list.findIndex(item => {
    return item.id === song.id;
  });
}

// 选择歌曲播放
export const selectPlay = function({ commit, state }, { list, index }) {
  commit(types.SET_PLAYING_STATE, true);
  commit(types.SET_FULL_SCREEN, true);
  // 避免随机播放时，点击歌单，播放歌曲乱序
  if (state.mode === 2) {
    let randomList = myArray.shuffle(list);
    commit(types.SET_PLAYLIST, randomList);
    index = findIndex(randomList, list[index]);
  } else {
    commit(types.SET_PLAYLIST, list);
  }
  commit(types.SET_SEQUENCE_LIST, list);
  commit(types.SET_CURRENT_INDEX, index);
};

// 随机播放全部按钮
export const randomPlay = function({ commit }, { list }) {
  commit(types.SET_MODE, 2);
  commit(types.SET_PLAYING_STATE, true);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_PLAYLIST, myArray.shuffle(list));
  commit(types.SET_SEQUENCE_LIST, list);
  commit(types.SET_CURRENT_INDEX, 0);
};

// 新增歌曲到播放列表
export const insertSong = function({ commit, state }, song) {
  let playlist = state.playlist.slice(0);
  let sequenceList = state.sequenceList.slice(0);
  let currentIndex = state.currentIndex;

  // 记录当前歌曲
  let currentSong = playlist[currentIndex];

  // 查询待添加的歌曲是否已在播放列表中
  let fpIndex = findIndex(playlist, song);

  // 插入到当前索引
  currentIndex++;
  playlist.splice(currentIndex, 0, song);

  // 如果待添加的歌曲已在播放列表中，删除原有歌曲
  if (fpIndex > -1) {
    if (currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1);
      currentIndex--;
    } else {
      playlist.splice(fpIndex + 1, 1);
    }
  }

  // 插入到 sequenceList 中的位置
  let currentSIndex = findIndex(sequenceList, currentSong) + 1;

  // 查询待添加的歌曲是否已在 sequenceList 列表中
  let fsIndex = findIndex(sequenceList, song);

  // 插入到当前索引
  sequenceList.splice(currentSIndex, 0, song);

  // 如果待添加的歌曲已在播放列表中，删除原有歌曲
  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1);
    } else {
      sequenceList.splice(fsIndex + 1, 1);
    }
  }

  commit(types.SET_PLAYLIST, playlist);
  commit(types.SET_SEQUENCE_LIST, sequenceList);
  commit(types.SET_CURRENT_INDEX, currentIndex);
  commit(types.SET_PLAYING_STATE, true);
  commit(types.SET_FULL_SCREEN, true);
};

// 从播放列表中删除歌曲
export const deleteSong = function({ commit, state }, song) {
  let playlist = state.playlist.slice(0);
  let sequenceList = state.sequenceList.slice(0);
  let currentIndex = state.currentIndex;

  // 查询待删除的歌曲
  let pIndex = findIndex(playlist, song);
  playlist.splice(pIndex, 1);

  // sequenceList 中的位置
  let sIndex = findIndex(sequenceList, song);
  sequenceList.splice(sIndex, 1);

  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--;
  }

  commit(types.SET_PLAYLIST, playlist);
  commit(types.SET_SEQUENCE_LIST, sequenceList);
  commit(types.SET_CURRENT_INDEX, currentIndex);

  let playingState = playlist.length > 0;
  commit(types.SET_PLAYING_STATE, playingState);
};

/**
 * 保存搜索历史
 * @param commit
 * @param  {[type]} query          搜索关键词
 */
export const saveHistory = function({ commit }, query) {
  commit(types.SET_SEARCHHISTORY, localSave(query));
};

/**
 * 删除单个搜索历史
 * @param commit
 * @param  {[type]} query          搜索关键词
 */
export const delHistory = function({ commit }, query) {
  commit(types.SET_SEARCHHISTORY, localDel(query));
};

/**
 * 删除全部搜索历史
 */
export const clearHistory = function({ commit }) {
  commit(types.SET_SEARCHHISTORY, localClear());
};

// 清空播放列表
export const deleteSongList = function({ commit }) {
  commit(types.SET_PLAYLIST, []);
  commit(types.SET_SEQUENCE_LIST, []);
  commit(types.SET_CURRENT_INDEX, -1);
  commit(types.SET_PLAYING_STATE, false);
};

// 把当前歌曲写进 vuex 最近播放 playHistory 中
export const saveplayHistory = function({ commit }, song) {
  commit(types.SET_PLAYHISTORY, savePlay(song));
};

// 我的收藏
export const savefavoriteList = function({ commit }, song) {
  commit(types.SET_FAVORITE_LIST, saveFavorite(song));
};

export const delfavoriteList = function({ commit }, song) {
  commit(types.SET_FAVORITE_LIST, delFavorite(song));
};
