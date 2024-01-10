<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { getAllDep } from '@/api/consult'
import type { TopDep } from '@/types/consult'
import { useConsultStore } from '@/stores'

// 当前选中的一级科室，通过索引值决定选中状态
const active = ref(0)

// 1. 获取所有科室数据(一级和二级)
const allDep = ref<TopDep[]>([])
const getAllDepApi = async () => {
  const { data } = await getAllDep()
  // console.log(data)
  allDep.value = data
}
onMounted(() => {
  getAllDepApi()
})

// 2. 点击切换一级科室，动态渲染二级科室
const sunDep = computed(() => {
  // 说明：allDep是异步数据，默认为[]
  return allDep.value[active.value]?.child
})

// 3. 点击二级科室记录选择科室在ID
const store = useConsultStore()
</script>

<template>
  <!-- 2. 极速问诊-选择科室 -->
  <div class="consult-dep-page">
    <cp-nav-bar title="选择科室" />
    <div class="wrapper">
      <!-- 一级科室 -->
      <van-sidebar v-model="active">
        <van-sidebar-item v-for="top in allDep" :key="top.id" :title="top.name" />
      </van-sidebar>
      <!-- 二级科室: 跟随一级科室动态切换 -->
      <div class="sub-dep">
        <router-link
          @click="store.setDepId(sub.id)"
          v-for="sub in sunDep"
          :key="sub.id"
          to="/consult/illness"
          >{{ sub.name }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.van-sidebar {
  width: 114px;
  &-item {
    padding: 14px;
    color: var(--cp-tag);
    &--select {
      color: var(--cp-main);
      font-weight: normal;
      &::before {
        display: none;
      }
    }
  }
}
.consult-dep-page {
  padding-top: 46px;
}

.wrapper {
  height: calc(100vh - 46px);
  overflow: hidden;
  display: flex;
  .sub-dep {
    flex: 1;
    height: 100%;
    overflow-y: auto;
    > a {
      display: block;
      padding: 14px 30px;
      color: var(--cp-dark);
    }
  }
}
</style>
