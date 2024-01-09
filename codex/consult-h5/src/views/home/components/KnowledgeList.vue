<script setup lang="ts">
import { ref } from 'vue'
import KnowledgeCard from './KnowledgeCard.vue'
import type { KnowledgeType, KnowledgeList } from '@/types/consult'
import { getKnowledgePage } from '@/api/consult'
//接收type(文章类型)
const props = defineProps<{
  type: KnowledgeType
}>()

// 列表数据
const list = ref<KnowledgeList>([])
// 列表加载状态：true 加载中 | false 加载完成, 关闭loading效果 (多次触发)
const loading = ref(false)
// 控制列表数据是否加载完成：false 还有数据 | true 数据以及加载完毕
const finished = ref(false)

// 请求的分页参数
const params = {
  type: props.type, // 频道类型
  current: 1, // 请求页码
  pageSize: 10 // 每页多少条数据
}

// 加载数据的函数：1. 页面打开后默认执行一次 2. 每次用户滚动到底部都会再次执行
const onLoad = async () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  const { data } = await getKnowledgePage(params)
  // 把当前页数据追加到list列表中
  list.value.push(...data.rows)
  // 加载状态结束
  loading.value = false
  // 数据全部加载完成
  /**
   * 判断列表的数据是否加载完成了
   * 1. list长度 === total 数据总条数
   * 2. current === pageTotal总页数
   */
  if (list.value.length === data.total) {
    finished.value = true
  } else {
    // 数据没有加载完,把页码加1
    params.current++
  }
}
</script>

<template>
  <div class="knowledge-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- 列表数据 -->
      <!-- 知识列表item -->
      <knowledge-card v-for="item in list" :key="item.id" :item="item"></knowledge-card>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
