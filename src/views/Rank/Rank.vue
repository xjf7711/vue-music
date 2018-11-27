<!-- 排行页组件 -->
<template>
  <div class="rank" ref="rankRef">
    <!-- 排行榜数据 -->
    <scroll class="toplist" ref="scrollRef" :data="topList">
      <ul>
        <li class="item" v-for="(item,index) in topList" :key="index" @click="selectItem(item)">
          <!-- 左图 -->
          <div class="icon">
            <img width="100" height="100" v-lazy="item.picUrl" @load="loadImg">
          </div>

          <!-- 右歌 -->
          <ul class="songlist">
            <!-- <h3 class="title">{{ item.topTitle }}</h3> -->
            <li class="song" v-for="(song, index) in item.songList" :key="index">
              <span>{{ index + 1 }}</span>
              <span>{{ song.songname }}</span>
              <span class="singername"> - {{ song.singername }}</span>
            </li>
          </ul>
        </li>
      </ul>

      <!-- loading 组件 -->
      <div v-show="!topList.length" class="loading-container">
        <loading></loading>
      </div>
    </scroll>

    <router-view/>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { getRankList } from "src/api/rank.js";
import { ERR_OK } from "src/api/config";
import { playlistMixin } from "src/assets/js/mixin.js";

import Loading from "src/components/Loading/Loading";
import Scroll from "src/components/Scroll/Scroll";

export default {
  mixins: [playlistMixin],
  components: {
    Loading,
    Scroll
  },
  data() {
    return {
      topList: []
    };
  },
  created() {
    this._getRankList();
  },
  watch: {
    topList() {
      setTimeout(() => {
        this.$Lazyload.lazyLoadHandler();
      }, 20);
    }
  },
  methods: {
    ...mapMutations({
      setRankList: "SET_RANK_LIST"
    }),
    selectItem(item) {
      this.$router.push({
        path: `/rank/${item.id}`
      });
      // console.log(item)
      // 写入 vuex
      this.setRankList(item);
    },
    // 当有迷你播放器时，调整滚动底部距离
    handlePlaylist(playlist) {
      this.$refs.rankRef.style.bottom = playlist.length > 0 ? "60px" : "";
      this.$refs.scrollRef.refresh();
    },
    // 当首次获取到图片时，Better-scroll 重新计算
    loadImg() {
      if (!this.flag) {
        this.$refs.scrollRef.refresh();
        this.flag = true;
      }
    },
    _getRankList() {
      getRankList().then(res => {
        if (ERR_OK === res.code) {
          // console.log(res)
          this.topList = res.data.topList;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~src/assets/styles/scss/const.scss";
@import "~src/assets/styles/scss/mixin.scss";

.rank {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  .toplist {
    height: 100%;
    overflow: hidden;
    .item {
      display: flex;
      margin: 0 20px;
      padding-top: 20px;
      height: 100px;
      &:last-child {
        padding-bottom: 20px;
      }
      .icon {
        flex: 0 0 100px;
        width: 100px;
        height: 100px;
      }
      .songlist {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        height: 100px;
        overflow: hidden;
        background: $color-highlight-background;
        color: $color-text-d;
        font-size: $font-size-small;
        .song {
          @include no-wrap();
          line-height: 26px;
          .singername {
            color: rgba(255, 255, 255, 0.2);
          }
        }
      }
    }
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
