<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { ChannelItem, ResData, ChannelsData } from '../../../types/data'

// 定义响应变量
const list = ref<ChannelItem[]>([])

// 获取频道数据
const getChannels = async () => {
  const res = await axios.get<ChannelsData>('http://geek.itheima.net/v1_0/channels')
  // console.log('频道数据：', res.data.data.channels)
  list.value = res.data.data.channels
}

// 接收选中频道ID
defineProps<{
  seledId: number
}>()

// 子传父修改选中频道ID
const emit = defineEmits<{
  (e: 'change-seled', data: number)
}>()

onMounted(() => {
  getChannels()
})
</script>
<template>
  <div class="channel-nav">
    <nav class="list">
      <a class="item" :class="{ active: item.id === seledId }" @click="emit('change-seled', item.id)" href="javascript:;"
        v-for="(item, i) in list" :key="item.id">
        {{ item.name }}
      </a>
    </nav>
  </div>
</template>
