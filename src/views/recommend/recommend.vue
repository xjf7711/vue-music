<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <!-- 轮播图，当请求到 recommends 时才渲染 -->
        <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
          <slider>
            <div v-for="(item,index) in recommends" :key="index">
              <a :href="item.linkUrl">
                <img class="needsclick" @load="loadImage" :src="item.picUrl"/>
              </a>
            </div>
          </slider>
        </div>
        <!-- 歌单推荐列表 -->
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li @click="selectItem(item)"
                v-for="(item,index) in discList" class="item" :key="index">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- loading 组件 -->
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view/>
  </div>
</template>

<script>
import Slider from "components/slider/slider";
import Loading from "components/loading/loading";
import Scroll from "components/scroll/scroll";
import { getDiscList, getRecommend } from "api/recommend";
import { playlistMixin } from "assets/js/mixin";
import { ERR_OK } from "api/config";
import { mapMutations } from "vuex";

export default {
  mixins: [playlistMixin],
  components: {
    Slider,
    Loading,
    Scroll
  },
  data() {
    return {
      checkloaded: false,
      recommends: [],
      discList: []
    };
  },
  created() {
    this._getRecommend();
    setTimeout(() => {
      this._getDiscList();
    }, 1000);
  },
  methods: {
    ...mapMutations({
      setDisc: "SET_DISC"
    }),
    // 当有迷你播放器时，调整滚动底部距离
    handlePlaylist(playlist) {
      this.$refs.recommend.style.bottom = playlist.length > 0 ? "60px" : "";
      this.$refs.scroll.refresh();
    },
    // 当首次获取到图片时，Better-scroll 重新计算
    loadImage() {
      if (!this.checkloaded) {
        this.$refs.scroll.refresh();
        this.checkloaded = true;
      }
    },
    // 子路由跳转
    selectItem(item) {
      this.$router.push({
        path: `/recommend/${item.dissid}`
      });
      // 写入 vuex
      // console.log(item)
      this.setDisc(item);
    },
    _getRecommend() {
      getRecommend().then(res => {
        console.log("getRecommend res is ", res);
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider;
        }
      });
    },
    _getDiscList() {
      getDiscList().then(res => {
        console.log("getDiscList res is ", res);
        if (res.code === ERR_OK) {
          this.discList = res.data.list;
        }
      });
    }
  }
};
</script>

<style scoped lang="sass">
  @import "~assets/styles/variable"
  @import "~assets/styles/mixin"
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
