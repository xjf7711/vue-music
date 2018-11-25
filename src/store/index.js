// import Vue from "vue";
// import Vuex from "vuex";
// import * as actions from "./actions";
// import * as getters from "./getters";
// import state from "./state";
// import mutations from "./mutations";
// import createLogger from "vuex/dist/logger";
//
// Vue.use(Vuex);
//
// const debug = process.env.NODE_ENV !== "production";
//
// export default new Vuex.Store({
//   actions,
//   getters,
//   state,
//   mutations,
//   strict: debug,
//   plugins: debug ? [createLogger()] : []
// });
// 组装模块并导出 store 的地方

import Vue from "vue";
import Vuex from "vuex";
import state from "./state.js";
import mutations from "./mutations.js";
import * as actions from "./actions.js";
import * as getters from "./getters.js";
import createLogger from "vuex/dist/logger"; // Vuex 自带一个日志插件用于一般的调试

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
