import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

import fastclick from "fastclick";
import VueLazyload from "vue-lazyload";
// import "./assets/styles/index.sass";

// /* eslint-disable no-unused-vars */
import VConsole from "vconsole";
new VConsole();

fastclick.attach(document.body);

Vue.use(VueLazyload, {
  loading: require("./assets/image/default.png")
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
