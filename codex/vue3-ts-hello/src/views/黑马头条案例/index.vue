<script setup lang="ts">
import './styles/index.css'
import ChannelNav from './components/ChannelNav.vue'
import ArticleList from './components/ArticleList.vue'
import { ref } from 'vue'

// // 顶层存储频道ID=> 状态提升/ vuex=》pinia
// const seledId = ref(0)
// // 修改选中频道ID
// const changeSeled = (sel: number) => {
//   seledId.value = sel
// }
</script>

<template>
  <!-- 1. 上边频道菜单组件 -->
  <ChannelNav />
  <!-- 2. 新闻列表 -->
  <ArticleList />
</template>
