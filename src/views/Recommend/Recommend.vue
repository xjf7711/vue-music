<!-- 推荐页组件 -->
<template>
  <div class="recommend" ref="recommendRef">
    <!-- better-scroll 滚动组件，当请求到 lists 时才渲染 -->
    <scroll ref="scroll" :data="lists" class="recommend-content">
      <div>
        <!-- 轮播图，当请求到 recommends 时才渲染 -->
        <div v-if="recommends.length" class="slide-wrapper">
          <slider>
            <div v-for="(recommend,index) in recommends" :key="index">
              <a :href="recommend.linkUrl">
                <img @load="loadImg" :src="recommend.picUrl" class="needsclick">
              </a>
            </div>
          </slider>
        </div>

        <!-- 歌单推荐列表 -->
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li @click="selectItem(item)" v-for="(item,index) in lists" :key="index" class="item">
              <div class="icon">
                <img v-lazy="item.imgurl" width="60" height="60">
              </div>
              <div class="text">
                <p v-html="item.creator.name" class="name"></p>
                <p v-html="item.dissname" class="desc"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- loading 组件 -->
      <div v-show="!lists.length" class="loading-container">
        <loading></loading>
      </div>
    </scroll>

    <router-view/>
  </div>
</template>

<script>
import { getList, getRecommend } from "src/api/recommend.js";
import Slider from "components/Slider/Slider";
import Scroll from "src/components/Scroll/Scroll";
import Loading from "src/components/Loading/Loading";
import { playlistMixin } from "src/assets/js/mixin.js";
import { mapMutations } from "vuex";
import { ERR_OK } from "src/api/config";

export default {
  mixins: [playlistMixin],
  components: {
    Slider,
    Scroll,
    Loading
  },
  data() {
    return {
      recommends: [],
      lists: []
    };
  },
  created() {
    this._getRecommend();
    setTimeout(() => {
      this._getList();
    }, 1000);
  },
  methods: {
    ...mapMutations({
      setSonglist: "SET_SONG_LIST" // "SET_DISC"
    }),
    // 子路由跳转
    selectItem(item) {
      this.$router.push({
        path: `/recommend/${item.dissid}`
      });

      // 写入 vuex
      // console.log(item)
      this.setSonglist(item);
    },
    // 当有迷你播放器时，调整滚动底部距离
    handlePlaylist(playlist) {
      this.$refs.recommendRef.style.bottom = playlist.length > 0 ? "60px" : "";
      this.$refs.scroll.refresh();
    },
    // 获取轮播图数据
    _getRecommend() {
      getRecommend().then(res => {
        if (ERR_OK === res.code) {
          // console.log(res)
          this.recommends = res.data.slider;
        }
      });
    },
    // 获取歌单列表数据 _getDiscList
    _getList() {
      getList().then(res => {
        console.log("Recommend.vue _getList getList res is ", res);
        if (res && ERR_OK === res.code) {
          // console.log(res)
          this.lists = res.data.list;
        }
      });
    },
    // 当首次获取到图片时，Better-scroll 重新计算
    loadImg() {
      if (!this.flag) {
        this.$refs.scroll.refresh();
        this.flag = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~src/assets/styles/scss/const.scss";
@import "~src/assets/styles/scss/mixin.scss";

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  .recommend-content {
    height: 100%;
    overflow: hidden;
    .slide-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }
    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }
      .item {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 20px 20px 20px;
        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }
        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;
          .name {
            margin-bottom: 10px;
            color: $color-text;
          }
          .desc {
            color: $color-text-d;
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
