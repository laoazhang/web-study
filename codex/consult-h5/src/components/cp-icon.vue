<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<template>
  <svg aria-hidden="true" class="icon">
    <!-- #icon-文件夹名称-图片名称 -->
    <use :href="`#icon-${name}`"></use>
  </svg>
</template>

<style lang="scss" scoped>
.icon {
  // 和字体一样大
  width: 1em;
  height: 1em;
}
</style>
