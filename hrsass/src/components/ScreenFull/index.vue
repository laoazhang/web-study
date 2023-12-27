<template>
  <!-- 放置一个图标 -->
  <div>
    <!-- <svg>
      <use xlink:href="#icon-fullscreen" />
    </svg> -->
    <svg-icon :icon-class="isFullScreen?'exit-fullscreen':'fullscreen'" class="fullscreen" @click="handleScreen" />
    <!-- <svg-icon v-else icon-class="fullscreen" class="fullscreen" @click="handleScreen" /> -->
  </div>
</template>

<script>
import ScreenFull from 'screenfull'
export default {
  name: 'ScreenFull',
  data() {
    return {
      isFullScreen: false
    }
  },
  methods: {
    handleScreen() {
      // ScreenFull.isEnabled 判断当前浏览器是否支持大屏切换
      if (ScreenFull.isEnabled) {
        // toggle 可以自动切换大屏 小屏的效果
        this.isFullScreen = !this.isFullScreen
        ScreenFull.toggle()
      } else {
        this.$message.error('您的浏览器版本过期，暂不支持大屏切换')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.fullscreen {
  width: 20px;
  height: 20px;
  fill: #fff !important;
  cursor: pointer;
}
</style>
