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

<script>
import MHeader from "src/views/header/Header";
import Tab from "src/views/tab/Tab";
import Player from "src/views/player/Player";

export default {
  components: {
    MHeader,
    Tab,
    Player
  }
};
</script>
