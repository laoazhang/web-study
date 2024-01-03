<script setup lang="ts">
import { ref, watch } from 'vue'
import { ArticleItem } from '../../../types/data'
import axios from 'axios'
import { ArticleResData } from '../../../types/data'

const props = defineProps<{
  seledId: number
}>()

// 1.定义文章列表
const list = ref<ArticleItem[]>([])

watch(
  props,
  async (newVal) => {
    // console.log('频道ID变化了', newVal.seledId)
    // 需要默认执行一次，加载渲染推荐频道的新闻列表
    const res = await axios.get<ArticleResData>('http://geek.itheima.net/v1_0/articles', {
      params: {
        channel_id: newVal.seledId, // 当前频道的ID
        timestamp: Date.now()
      }
    })
    // console.log('新闻列表', res.data.data.results);
    list.value = res.data.data.results

  },
  {
    immediate: true, // 默认执行一次
  }
)
</script>

<template>
  <div class="article-list">
    <div class="article-item" v-for="item in list" :key="item.art_id">
      <p class="title">
        {{ item.title }}
      </p>
      <img class="img" v-for="(src, i) in item.cover.images" :key="i" :src="src" alt="" />
      <div class="info">
        <span>{{ item.aut_name }}</span>
        <span>{{ item.comm_count }}评论</span>
        <span>{{ item.pubdate }}</span>
      </div>
    </div>
  </div>
</template>
