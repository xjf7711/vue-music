<!-- 推荐页：歌单详情组件 -->
<template>
  <transition name="slide">
    <music-list
            class="song-list-detail"
            :songs="songs"
            :title="title"
            :bg-image="bgImage">
    </music-list>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import { getSongList } from "src/api/recommend.js";
import { ERR_OK } from "src/api/config";
import MusicList from "src/views/music-list/MusicList";
import { createSong } from "src/assets/js/SongClass.js";

export default {
  components: {
    MusicList
  },
  data() {
    return {
      songs: []
    };
  },
  computed: {
    // vuex, 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters(["songlist"]),
    // 传入子组件
    title() {
      return this.songlist.dissname;
      // return this.singer.name;
    },
    // 传入子组件
    bgImage() {
      return this.songlist.imgurl;
      // return this.singer.avatar;
    }
  },
  mounted() {
    this._getSongList();
  },
  methods: {
    // 获取歌单数据
    _getSongList() {
      // 禁止直接刷新详情页（获取不到歌单 id）
      if (!this.songlist.dissid) {
        this.$router.push("/recommend");
        return;
      }

      getSongList(this.songlist.dissid).then(res => {
        console.log("getSongList res is ", res);
        if (ERR_OK === res.code) {
          console.log(res.cdlist[0].songlist);
          this.songs = this._formatSongs(res.cdlist[0].songlist);
        }
      });
    },
    // 重组 res.cdlist[0].songlist 数据
    _formatSongs(list) {
      let result = [];

      list.forEach(item => {
        if (item.songid && item.albummid) {
          result.push(createSong(item));
        }
      });

      return result;
    }
  }
};
</script>

<style lang="scss" scoped>
/*@import "~src/assets/styles/scss/const.scss";*/
/*@import "~src/assets/styles/scss/mixin.scss";*/

.song-list-detail {
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
</style>
