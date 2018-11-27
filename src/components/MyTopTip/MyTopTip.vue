<!-- 顶部提示 组件 -->
<template>
  <transition name="drop">
    <div class="my-top-tip" v-show="showFlag" @click.stop="hide">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    // 延迟关闭时间
    delay: {
      type: Number,
      default: 2000
    }
  },
  data() {
    return {
      showFlag: false
    };
  },
  methods: {
    show() {
      this.showFlag = true;
      clearTimeout(this.timer);
      // delay 秒自动关闭
      this.timer = setTimeout(() => {
        this.showFlag = false;
      }, this.delay);
    },
    hide() {
      this.showFlag = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~src/assets/styles/scss/const.scss";
/*@import "~src/assets/styles/scss/mymixin.scss";*/

.my-top-tip {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 500;
  background: $color-dialog-background;
  &.drop-enter-active,
  &.drop-leave-active {
    transition: all 0.3s;
  }
  &.drop-enter,
  &.drop-leave-to {
    transform: translate3d(0, -100%, 0);
  }
}
</style>
