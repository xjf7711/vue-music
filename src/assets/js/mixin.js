import { mapActions, mapGetters, mapMutations } from "vuex";
import { playMode } from "./config";
import { myArray } from "./utils";
/*
import { playlistMixin } from 'src/assets/js/mixin.js'

mixins: [playlistMixin],

// 当有迷你播放器时，调整滚动底部距离
handlePlaylist(playlist) {
  let bottom = playlist.length > 0 ? '60px' : ''
  this.$refs.rankRef.style.bottom = bottom
  this.$refs.scrollRef.refresh()
},
 */

export const playlistMixin = {
  computed: {
    ...mapGetters(["playlist"])
  },
  mounted() {
    this.handlePlaylist(this.playlist);
  },
  activated() {
    this.handlePlaylist(this.playlist);
  },
  watch: {
    playlist(newVal) {
      this.handlePlaylist(newVal);
    }
  },
  methods: {
    handlePlaylist() {
      throw new Error("component must implement handlePlaylist method");
    }
  }
};

export const playerMixin = {
  computed: {
    ...mapGetters([
      "sequenceList",
      "playlist",
      "currentSong",
      "mode",
      "favoriteList"
    ]),
    // 播放模式对应图标字体
    iconMode() {
      return this.mode === playMode.sequence
        ? "icon-sequence"
        : this.mode === playMode.loop
          ? "icon-loop"
          : "icon-random";
    }
  },
  methods: {
    changeMode() {
      const mode = (this.mode + 1) % 3;
      this.setPlayMode(mode);
      let list = null;
      if (mode === playMode.random) {
        list = myArray.shuffle(this.sequenceList);
      } else {
        list = this.sequenceList;
      }

      this.resetCurrentIndex(list);
      this.setPlaylist(list);
    },
    resetCurrentIndex(list) {
      // 调整当前歌曲的索引
      let index = list.findIndex(item => {
        return item.id === this.currentSong.id;
      });
      this.setCurrentIndex(index);
    },
    toggleFavorite(song) {
      if (this.isFavorite(song)) {
        this.deleteFavoriteList(song);
      } else {
        this.saveFavoriteList(song);
      }
    },
    getFavoriteIcon(song) {
      if (this.isFavorite(song)) {
        return "icon-favorite";
      }
      return "icon-not-favorite";
    },
    isFavorite(song) {
      const index = this.favoriteList.findIndex(item => {
        return item.id === song.id;
      });
      return index > -1;
    },
    ...mapMutations({
      setPlayMode: "SET_PLAY_MODE",
      setPlaylist: "SET_PLAYLIST",
      setCurrentIndex: "SET_CURRENT_INDEX",
      setPlayingState: "SET_PLAYING_STATE"
    }),
    ...mapActions(["saveFavoriteList", "deleteFavoriteList"])
  }
};

export const searchMixin = {
  data() {
    return {
      query: "",
      refreshDelay: 120
    };
  },
  computed: {
    ...mapGetters(["searchHistory"])
  },
  methods: {
    onQueryChange(query) {
      this.query = query;
    },
    blurInput() {
      this.$refs.searchBox.blur();
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query);
    },
    saveSearch() {
      this.saveSearchHistory(this.query);
    },
    ...mapActions(["saveSearchHistory", "deleteSearchHistory"])
  }
};
