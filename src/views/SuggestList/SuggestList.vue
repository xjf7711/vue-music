<!-- 搜索建议页列表组件 -->
<template>
  <scroll class="suggest-list"
             ref="scrollRef"
             :data="result"
             :beforeScroll="beforeScrollData"
             @beforeScroll="beforeScroll"
             :pullup="pullup"
             @scrollToEnd="scrollToEnd">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="(item,index) in result" :key="index" @click="selectItem(item)">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>

        <div class="name">
          <p class="text" v-html="getSingernameOrSongname(item)"></p>
        </div>
      </li>

      <Loading v-show="hasMore" title=""></Loading>
    </ul>

    <div class="no-result-wrapper" v-if="!hasMore && !result.length">
      <no-result></no-result>
    </div>
  </scroll>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import Scroll from "src/components/Scroll/Scroll";
import Loading from "src/components/Loading/Loading";
import NoResult from "src/components/NoResult/NoResult";
import { search } from "src/api/search.js";
import { ERR_OK } from "src/api/config";
// import { parseJsonp } from "src/assets/js/utils";
import { createSingerSong } from "src/assets/js/SingerSongClass.js";
import { Singer } from "src/assets/js/SingerClass.js";

const TYPE_SINGER = "singer";

export default {
  components: {
    Scroll,
    Loading,
    NoResult
  },
  props: {
    // 接受的检索值
    query: {
      type: String,
      default: ""
    },
    // 是否显示歌手
    zhida: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // 当前检索页数，用于下拉加载
      page: 1,
      // 每一页的数量
      perpage: 20,
      // 接受检索结果
      result: [],
      // 标志位。是否加载完
      hasMore: true,
      beforeScrollData: true,
      pullup: true
    };
  },
  watch: {
    query(newVal) {
      if (newVal) {
        this.search();
      }
    }
  },
  methods: {
    // vuex
    ...mapMutations({
      setSinger: "SET_SINGER"
    }),
    ...mapActions(["insertSong"]),
    search() {
      this.page = 1;
      this.hasMore = true;
      this.$refs.scrollRef.scrollTo(0, 0);

      search(this.query, this.page, this.perpage, this.zhida).then(res => {
        console.log("search res is ", res);
        if (ERR_OK === res.code) {
          console.log(res.data);
          console.log(this._formatSearch(res.data));
          this.result = this._formatSearch(res.data);
          this._checkMore(res.data);
        }
      });
    },
    // 重组 res.data 数据
    _formatSearch(data) {
      let ret = [];

      if (data.zhida && data.zhida.singerid) {
        // 解构赋值
        ret.push({ ...data.zhida, ...{ type: TYPE_SINGER } });
      }

      if (data.song) {
        ret = ret.concat(this._normalizeSongs(data.song.list));
      }

      return ret;
    },
    // 格式化歌手信息
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(item => {
        if (item.songid && item.albummid) {
          ret.push(createSingerSong(item));
        }
      });
      return ret;
    },
    // 获取 icon class 图标样式
    getIconCls(item) {
      if (item.type === TYPE_SINGER) {
        return "icon-mine";
      } else {
        return "icon-music";
      }
    },
    getSingernameOrSongname(item) {
      if (item.type === TYPE_SINGER) {
        return item.singername;
      } else {
        return `${item.name}-${item.singer}`;
      }
    },
    scrollToEnd() {
      if (!this.hasMore) {
        return;
      }
      this.page++;
      search(this.query, this.page, this.perpage, this.zhida).then(res => {
        if (ERR_OK === res.code) {
          this.result = this.result.concat(this._formatSearch(res.data));
          this._checkMore(res.data);
        }
      });
    },
    // 路由跳转逻辑
    selectItem(item) {
      if (item.type === TYPE_SINGER) {
        let singer = new Singer({
          id: item.singermid,
          name: item.singername
        });

        this.$router.push({
          path: `/search/${singer.id}`
        });

        this.setSinger(singer);
      } else {
        this.insertSong(item);
      }

      this.$emit("select");
    },
    // 什么时候不上拉刷新
    _checkMore(data) {
      let song = data.song;
      // 没有数据或最后一页
      if (
        !song.list.length ||
        song.curnum + song.curpage * this.perpage > song.totalnum
      ) {
        this.hasMore = false;
      }
    },
    // 滚动前触发事件
    beforeScroll() {
      this.$emit("beforeScroll");
    },
    // 给父组件用
    refresh() {
      this.$refs.scrollRef.refresh();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~src/assets/styles/scss/const.scss";
@import "~src/assets/styles/scss/mixin.scss";

.suggest-list {
  height: 100%;
  overflow: hidden;
  .suggest-list {
    padding: 0 30px;
    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
    }
    .icon {
      flex: 0 0 30px;
      width: 30px;
      [class^="icon-"] {
        font-size: 14px;
        color: $color-text-d;
      }
    }
    .name {
      flex: 1;
      font-size: $font-size-medium;
      color: $color-text-d;
      overflow: hidden;
      .text {
        @include no-wrap();
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
