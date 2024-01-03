/**
 * 我的第一个pinia store
 * 步骤：
 * 1. 导入 defineStore函数
 * 2. 使用 defineStore('仓库ID',()=>{ 定义全局状态数据和修改数据方法})
 * 3. 导出创建store => store名字建议： useXxxStore
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useHelloStore = defineStore("hello", () => {
  // 定义全局状态数据和修改数据方法
  // 1. state => ref 或reative函数

  // 2. mutations => 定义普通函数修改全局状态数据
  const changeCount = () => {
    count.value++
  }

  const count = ref(1)

  // 3. getters => computed函数
  const doubleCount = computed(() => {
    return count.value * 2
  })

  // 4. 异步action => 普通异步函数
  const getData = async () => {
    setTimeout(() => {
      count.value = 1e6
    }, 2000);
  }

  // 必须返回：外边才能获取store中定义的全局数据
  return { count, doubleCount, getData, changeCount }
})