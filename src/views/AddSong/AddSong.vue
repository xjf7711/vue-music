<!-- 添加歌曲到队列 组件 -->
<template>
  <transition name="slide">
    <div class="add-song" v-show="showFlag" @click.stop>
      <!-- 头部 -->
      <div class="header">
        <h1 class="title">添加歌曲到队列</h1>
        <div class="close" @click="hide">
          <i class="icon-close"></i>
        </div>
      </div>

      <!-- 搜索框 -->
      <div class="search-box-wrapper">
        <search-box ref="searchBoxRef" @query="onQueryChange" placeholder="搜索歌曲"></search-box>
      </div>

      <!-- 切换及其内容 -->
      <div class="shortcut" v-show="!query">
        <switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></switches>

        <div class="list-wrapper">
          <!-- 最近播放 -->
          <scroll ref="songListRef" v-if="currentIndex === 0" class="list-scroll" :data="playHistory">
            <div class="list-inner">
              <song-list :songs="playHistory" @select="selectSong"></song-list>
            </div>
          </scroll>

          <!-- 搜索历史 -->
          <scroll class="list-scroll"
                     ref="searchListRef"
                     v-if="currentIndex === 1"
                     :refreshDelay="refreshDelay"
                     :data="searchHistory">
            <div class="list-inner">
              <search-list
                      @delete="delHistory"
                      @select="addQuery"
                      :searches="searchHistory"></search-list>
            </div>
          </scroll>
        </div>
      </div>

      <div class="search-result" v-show="query">
        <suggest-list :query="query" :zhida="zhida" @select="savaHis" @beforeScroll="blurInput"></suggest-list>
      </div>

      <top-tip ref="topTipRef">
        <div class="tip-title">
          <i class="icon-ok"></i>
          <span class="text">1首歌曲已经添加到播放列表</span>
        </div>
      </top-tip>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// import { searchMixin } from "src/assets/js/mixin";
import { SingerSong } from "src/assets/js/SingerSongClass.js";
import SearchBox from "src/components/SearchBox/SearchBox";
import Scroll from "src/components/Scroll/Scroll";
import Switches from "src/components/Switches/Switches";
import SongList from "src/components/SongList/SongList";
import TopTip from "src/components/TopTip/TopTip";
import SearchList from "src/components/SearchList/SearchList";
import SuggestList from "src/views/SuggestList/SuggestList";

export default {
  // minxins: [searchMixin],
  components: {
    SearchBox,
    SuggestList,
    SearchList,
    Scroll,
    Switches,
    SongList,
    TopTip
  },
  data() {
    return {
      showFlag: false,
      // 搜索词
      query: "",
      // 不搜索歌手
      zhida: false,
      // 切换开关文案
      switches: [{ name: "最近播放" }, { name: "搜索历史" }],
      // 当前切换开关
      currentIndex: 0,
      refreshDelay: 100
    };
  },
  // 若要实现更复杂的数据变换，你应该使用计算属性
  computed: {
    ...mapGetters(["searchHistory", "playHistory"])
  },
  methods: {
    ...mapActions(["saveHistory", "delHistory", "insertSong"]),
    // 保存搜索结果历史到 vuex 和 localstorage 中
    savaHis() {
      this.saveHistory(this.query);
      this.$refs.topTipRef.show();
    },
    deleteHis(item) {
      this.delHistory(item);
    },
    show() {
      this.showFlag = true;
      setTimeout(() => {
        if (this.currentIndex === 0) {
          this.$refs.songListRef.refresh();
        } else {
          this.$refs.searchListRef.refresh();
        }
      }, 20);
    },
    hide() {
      this.showFlag = false;
    },
    // 当检索值改变时
    onQueryChange(query) {
      this.query = query;
    },
    addQuery(k) {
      this.$refs.searchBoxRef.getQuery(k);
    },
    // 滚动前触发事件
    blurInput() {
      this.$refs.searchBoxRef.blur();
    },
    switchItem(index) {
      this.currentIndex = index;
    },
    selectSong(item, index) {
      if (index !== 0) {
        this.insertSong(new SingerSong(item));
      }

      this.$refs.topTipRef.show();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~src/assets/styles/scss/const.scss";
@import "~src/assets/styles/scss/mixin.scss";

.add-song {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 200;
  background: $color-background;
  &.slide-enter-active,
  &.slide-leave-active {
    transition: all 0.3s;
  }
  &.slide-enter,
  &.slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .header {
    position: relative;
    height: 44px;
    text-align: center;
    .title {
      line-height: 44px;
      font-size: $font-size-large;
      color: $color-text;
    }
    .close {
      position: absolute;
      top: 0;
      right: 8px;
      .icon-close {
        display: block;
        padding: 12px;
        font-size: 20px;
        color: $color-theme;
      }
    }
  }
  .search-box-wrapper {
    margin: 20px;
  }
  .shortcut {
    .list-wrapper {
      position: absolute;
      top: 165px;
      bottom: 0;
      width: 100%;
      .list-scroll {
        height: 100%;
        overflow: hidden;
        .list-inner {
          padding: 20px 30px;
        }
      }
    }
  }
  .search-result {
    position: fixed;
    top: 124px;
    bottom: 0;
    width: 100%;
  }
  .tip-title {
    text-align: center;
    padding: 18px 0;
    font-size: 0;
    .icon-ok {
      font-size: $font-size-medium;
      color: $color-theme;
      margin-right: 4px;
    }
    .text {
      font-size: $font-size-medium;
      color: $color-text;
    }
  }
}
</style>
