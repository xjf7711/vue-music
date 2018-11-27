/* import 'babel-polyfill' // 兼容 需要 npm install babel-polyfill --save-dev*/
import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";

Vue.config.productionTip = false;

// import "./assets/styles/index.sass";
import "src/assets/styles/scss/index.scss";

// 移动端调试工具，在移动端输出日志
// /* eslint-disable no-unused-vars */
import VConsole from "vconsole";
new VConsole();

// 消除 click 移动浏览器300ms延迟
import attachFastClick from "fastclick";
attachFastClick.attach(document.body);

// 图片懒加载
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
  loading: require("src/assets/images/default.png")
});

// /* eslint-disable no-new */ vue-cli2时用到
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
