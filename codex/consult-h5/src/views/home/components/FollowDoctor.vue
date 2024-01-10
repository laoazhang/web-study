<script setup lang="ts">
import { ref } from 'vue'
import DoctorCard from './DoctorCard.vue'
import { onMounted } from 'vue'
import { useWindowSize } from '@vueuse/core'
import type { DoctorList } from '@/types/consult'
import { getDoctorPage } from '@/api/consult'
// 1. 原生js方式
// const width = ref(375)
// onMounted(() => {
//   // 通过window.innerWidth获取手机屏幕宽度
//   width.value = window.innerWidth
//   // 屏幕变化, 宽度需要重新计算 => window添加resize事件
//   window.addEventListener('resize', () => {
//     width.value = window.innerWidth
//   })
// })
// 2. 使用@vue/core
// 获取手机屏幕宽度
const { width } = useWindowSize()

// 3. 获取关注医生列表数据
const list = ref<DoctorList>([])
const getList = async () => {
  const { data } = await getDoctorPage({ current: 1, pageSize: 5 })
  // console.log('医生列表', data)
  // 默认展示5个医生
  list.value = data.rows
}
onMounted(() => {
  getList()
})
</script>

<template>
  <div class="follow-doctor">
    <!-- 1. 头部 -->
    <div className="head">
      <p>推荐关注</p>
      <a href="javascript:;"> 查看更多<i class="van-icon van-icon-arrow" /></a>
    </div>
    <!-- 2. 医生列表 -->
    <div class="body">
      <!-- swipe 组件 
      width指定单个item的宽度 => 问题: 150写死的
      解决：基准比例(150 / 375) * 当前屏幕宽度
      -->
      <!-- 单个医生的信息介绍 -->
      <van-swipe
        :show-indicators="false"
        :width="(150 / 375) * width"
        indicator-color="white"
        :loop="false"
      >
        <van-swipe-item v-for="item in list" :key="item.id">
          <doctor-card :item="item" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.follow-doctor {
  background-color: var(--cp-bg);
  // height: 250px;
  padding-bottom: 20px;
  .head {
    display: flex;
    justify-content: space-between;
    height: 45px;
    align-items: center;
    padding: 0 15px;
    font-size: 13px;
    > a {
      color: var(--cp-tip);
    }
  }
  .body {
    width: 100%;
    overflow: hidden;
  }
}
</style>
