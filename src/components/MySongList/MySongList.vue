<!-- 歌曲列表组件 -->
<template>
  <div class="my-song-list">
    <ul>
      <li @click="selectItem(item, index)"
          v-for="(item, index) in songs" :key="index" class="item">
        <!-- 排行奖杯图片 -->
        <div class="rank" v-show="rank">
          <span class="icon" :class="getRankCls(index)">{{ getRankTxt(index) }}</span>
        </div>

        <div class="content">
          <h4 class="name">{{ item.name }}</h4>
          <p class="desc">{{ getDesc(item) }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default: () => []
    },
    // 排行奖杯图片
    rank: {
      type: Boolean,
      default: false
    }
  },
  created() {
    // console.log("song-list created. ");
  },
  methods: {
    getDesc(item) {
      return `${item.singer} - ${item.album}`;
    },
    // 对父组件说：我需要这些数据
    selectItem(item, index) {
      this.$emit("select", item, index);
    },
    // 排行奖杯图片
    getRankCls(index) {
      // if (index === 0) {
      //   return "icon0";
      // } else if (index === 1) {
      //   return "icon1";
      // } else if (index === 2) {
      //   return "icon2";
      if (index <= 2) {
        return `icon icon${index}`;
      } else {
        return "text";
      }
    },
    // 排行奖杯文案
    getRankTxt(index) {
      // if (index > 2)
      if (index > 0) {
        return index + 1;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~src/assets/styles/scss/const.scss";
@import "~src/assets/styles/scss/mymixin.scss";

.my-song-list {
  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: $font-size-medium;
    .rank {
      flex: 0 0 25px;
      width: 25px;
      margin-right: 30px;
      text-align: center;
      .icon {
        display: inline-block;
        width: 25px;
        height: 24px;
        background-size: 25px 24px;
        &.icon0 {
          @include bg-image("first");
        }
        &.icon1 {
          @include bg-image("second");
        }
        &.icon2 {
          @include bg-image("third");
        }
      }
      .text {
        color: $color-theme;
        font-size: $font-size-large;
      }
    }
    .content {
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .name {
        @include no-wrap();
        color: $color-text;
      }
      .desc {
        @include no-wrap();
        margin-top: 4px;
        color: $color-text-d;
      }
    }
  }
}
</style>
