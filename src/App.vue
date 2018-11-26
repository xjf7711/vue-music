<template>
  <div id="app" @touchmove.prevent>
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
