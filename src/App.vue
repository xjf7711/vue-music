<template>
  <div id="app" @touchmove.prevent>
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>
<script type="text/ecmascript-6">
import MHeader from "./views/m-header/m-header";
import Player from "./views/player/player";
import Tab from "./views/tab/tab";

export default {
  components: {
    MHeader,
    Tab,
    Player
  }
};
</script>
<style lang="scss">
@import "./assets/styles/index.sass";
</style>
