<script setup lang="ts">
import { ref } from 'vue'
import ConsultItem from './ConsultItem.vue'
import { ConsultType } from '@/enums'
import { getConsultOrderList } from '@/api/consult'
import type { ConsultOrderItem } from '@/types/consult'

// 接收获取订单的类型
const props = defineProps<{
  type: ConsultType
}>()

const params = {
  current: 1,
  pageSize: 5,
  type: props.type
}

// 获取订单列表实现上拉加载更多
// 1. 列表数据
const list = ref<ConsultOrderItem[]>([])
// 2. 列表加载状态：true 加载中 | false 加载完成, 关闭loading效果 (多次触发)
const loading = ref(false)
// 3. 控制列表数据是否加载完成：false 还有数据 | true 数据以及加载完毕
const finished = ref(false)
/**
 * 4. 加载数据的方法
 *    1. 默认页面加载会执行一次(有数据不够一屏，会再次加载)
 *    2. 用户每次滚动到上次数据的底部，会再次执行
 */
const onLoad = async () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  const { data } = await getConsultOrderList(params)
  list.value.push(...data.rows)
  console.log('列表数据：', data)

  // 加载状态结束
  loading.value = false

  // 数据全部加载完成
  if (list.value.length === data.total) {
    // 数据加载完了
    finished.value = true
  } else {
    // 为下次执行做准备
    params.current++
  }
}
//删除后，更新列表
const onDelete = (id: string) => {
  list.value = list.value.filter((item) => item.id !== id)
}
</script>

<template>
  <div class="consult-list">
    <!-- 循环渲染问诊订单数据 -->
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <consult-item @on-delete="onDelete" v-for="item in list" :key="item.id" :item="item" />
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.consult-list {
  padding: 10px 15px;
}
</style>
