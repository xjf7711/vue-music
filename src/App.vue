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
import MHeader from "src/views/Header/Header";
import Tab from "src/views/Tab/Tab";
import Player from "src/views/Player/Player";

export default {
  components: {
    MHeader,
    Tab,
    Player
  }
};
</script>
