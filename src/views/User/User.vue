<!-- 个人中心 组件 -->
<template>
  <transition name="slide">
    <div class="user">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <div class="switches-wrapper">
        <switches @switch="switchItem" :switches="switches" :currentIndex="currentIndex"></switches>
      </div>

      <div ref="playBtn" class="play-btn" @click="random">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>

      <!-- 两个列表 -->
      <div class="list-wrapper" ref="listWrapper">
        <!-- 我的收藏 -->
        <scroll ref="favoriteRef" class="list-scroll" v-if="currentIndex===0" :data="favoriteList">
          <div class="list-inner">
            <song-list :songs="favoriteList" @select="selectSong"></song-list>
          </div>
        </scroll>

        <!-- 最近播放 -->
        <scroll ref="playListRef" class="list-scroll" v-if="currentIndex===1" :data="playHistory">
          <div class="list-inner">
            <song-list :songs="playHistory" @select="selectSong"></song-list>
          </div>
        </scroll>
      </div>

      <div class="no-result-wrapper" v-show="noResult">
        <no-result :title="noResultDesc"></no-result>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Switches from "src/components/Switches/Switches";
import Scroll from "src/components/Scroll/Scroll";
import SongList from "src/components/SongList/SongList";
import NoResult from "src/components/NoResult/NoResult";
import { SingerSong } from "src/assets/js/SingerSongClass.js";
import { playlistMixin } from "src/assets/js/mixin.js";

export default {
  mixins: [playlistMixin],
  components: {
    Switches,
    Scroll,
    SongList,
    NoResult
  },
  data() {
    return {
      switches: [{ name: "我的收藏" }, { name: "最近播放" }],
      currentIndex: 0
    };
  },
  // 若要实现更复杂的数据变换，你应该使用计算属性
  computed: {
    ...mapGetters(["playHistory", "favoriteList"]),
    noResult() {
      if (this.currentIndex === 0) {
        return !this.favoriteList.length;
      }
      if (this.currentIndex === 1) {
        return !this.playHistory.length;
      }
    },
    // todo
    noResultDesc() {
      if (this.currentIndex === 0) {
        return "暂无收藏歌曲";
      } else {
        return "你还没有听过歌曲";
      }
    }
  },
  methods: {
    ...mapActions([
      "insertSong",
      "randomPlay",

      "savefavoriteList",
      "delfavoriteList"
    ]),
    toggleFavoriteCls(song) {
      if (this._isFavorite(song)) {
        this.delfavoriteList(song);
      } else {
        this.savefavoriteList(song);
      }
    },
    getFavoriteCls(song) {
      if (this._isFavorite(song)) {
        return "icon-favorite";
      } else {
        return "icon-not-favorite";
      }
    },
    _isFavorite(song) {
      let index = this.favoriteList.findIndex(item => {
        return song.id === item.id;
      });

      return index > -1;
    },
    switchItem(index) {
      this.currentIndex = index;
    },
    selectSong(song) {
      this.insertSong(new SingerSong(song));
    },
    back() {
      this.$router.back();
    },
    random() {
      let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory;
      list = list.map(song => {
        return new SingerSong(song);
      });

      this.randomPlay({ list });
    },
    // 当有迷你播放器时，调整滚动底部距离
    handlePlaylist(playlist) {
      let bottom = playlist.length > 0 ? "60px" : "";
      this.$refs.listWrapper.style.bottom = bottom;
      this.$refs.favoriteRef && this.$refs.favoriteRef.refresh();
      this.$refs.playListRef && this.$refs.playListRef.refresh();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~src/assets/styles/scss/const.scss";
/*@import "~src/assets/styles/scss/mixin.scss";*/

.user {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 100;
  width: 100%;
  background: $color-background;
  &.slide-enter-active,
  &.slide-leave-active {
    transition: all 0.3s;
  }
  &.slide-enter,
  &.slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;
    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .switches-wrapper {
    margin: 10px 0 30px 0;
  }
  .play-btn {
    box-sizing: border-box;
    width: 135px;
    padding: 7px 0;
    margin: 0 auto;
    text-align: center;
    border: 1px solid $color-text-l;
    color: $color-text-l;
    border-radius: 100px;
    font-size: 0;
    .icon-play {
      display: inline-block;
      vertical-align: middle;
      margin-right: 6px;
      font-size: $font-size-medium-x;
    }
    .text {
      display: inline-block;
      vertical-align: middle;
      font-size: $font-size-small;
    }
  }
  .list-wrapper {
    position: absolute;
    top: 110px;
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
  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
