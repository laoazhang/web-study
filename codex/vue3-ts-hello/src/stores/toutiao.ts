import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useToutiaoStore = defineStore("toutiao", () => {
  // 思考？：维护的全局数据是什么 => 多个组件都用到这个数据

  const seledId = ref(0)
  // 修改选中频道ID
  const changeSeled = (sel: number) => {
    seledId.value = sel
  }
  return { seledId, changeSeled }
})