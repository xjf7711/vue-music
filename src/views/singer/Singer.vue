<!-- 歌手页组件 -->
<template>
  <div class="singer" ref="singerRef">
    <phone-list ref="listRef" :data="singers" @select="selectSinger"></phone-list>
    <router-view/>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { getSingerList } from "src/api/singer.js";
import { ERR_OK } from "src/api/config";
import { createSinger } from "src/assets/js/SingerClass.js";
import { playlistMixin } from "src/assets/js/mixin.js";
import PhoneList from "src/components/phone-list/PhoneList";

const HOT_TITLE = "热门";
const HOT_NUM = 10;

export default {
  mixins: [playlistMixin],
  components: {
    PhoneList
  },
  data() {
    return {
      singers: []
    };
  },
  mounted() {
    this._getSingerList();
  },
  methods: {
    // 当有迷你播放器时，调整滚动底部距离
    handlePlaylist(playlist) {
      this.$refs.singerRef.style.bottom = playlist.length > 0 ? "60px" : "";
      this.$refs.listRef.refresh();
    },
    // 子路由分配
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      });
      this.setSinger(singer);
    },
    // 获取歌手列表数据
    _getSingerList() {
      getSingerList().then(res => {
        if (ERR_OK === res.code) {
          // console.log(res.data.list)
          // console.log(this._formatSingers(res.data.list))
          this.singers = this._formatSingers(res.data.list);
        }
      });
    },
    // 重组 res.data.list 数据
    _formatSingers(list) {
      // 热门歌手
      let map = {
        hot: {
          title: HOT_TITLE,
          items: []
        }
      };

      // 填充歌手数据
      list.forEach((item, index) => {
        // 填充热门歌手数据
        if (index < HOT_NUM) {
          map.hot.items.push(createSinger(item));
        }

        // 填充 a-z 字母
        let key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }

        // 填充对应字母歌手数据
        map[key].items.push(createSinger(item));
      });

      // 为了得到有序列表，我们需要处理 map
      let hot = [];
      let others = [];

      for (let key in map) {
        let value = map[key];
        if (value.title.match(/[a-zA-Z]/)) {
          others.push(value);
        } else if (value.title === HOT_TITLE) {
          hot.push(value);
        }
      }

      others.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });

      // console.log(hot.concat(others))
      return hot.concat(others);
    },
    // vuex
    ...mapMutations({
      setSinger: "SET_SINGER"
    })
  }
};
</script>

<style lang="scss" scoped>
@import "~src/assets/styles/scss/const.scss";
@import "~src/assets/styles/scss/mixin.scss";

.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
