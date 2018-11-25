<template>
  <div id="app">
    <my-header></my-header>
    <my-tab></my-tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <my-player></my-player>
  </div>
</template>

<script>
import MyHeader from "src/views/MyHeader/MyHeader";
import MyTab from "src/views/MyTab/MyTab";
import MyPlayer from "src/views/MyPlayer/MyPlayer";

export default {
  components: {
    MyHeader,
    MyTab,
    MyPlayer
  }
};
</script>
<!--<template>-->
  <!--<div id="app" @touchmove.prevent>-->
    <!--<m-header></m-header>-->
    <!--<tab></tab>-->
    <!--<keep-alive>-->
      <!--<router-view></router-view>-->
    <!--</keep-alive>-->
    <!--<player></player>-->
  <!--</div>-->
<!--</template>-->
<!--<script type="text/ecmascript-6">-->
<!--import MHeader from "./views/m-header/MHeader";-->
<!--import Player from "./views/player/player";-->
<!--import Tab from "./views/tab/tab";-->

<!--export default {-->
  <!--components: {-->
    <!--MHeader,-->
    <!--Tab,-->
    <!--Player-->
  <!--}-->
<!--};-->
<!--</script>-->
<!--<style lang="scss">-->
<!--/*@import "./assets/styles/index.sass";*/-->
<!--</style>-->
