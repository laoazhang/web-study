/**
 * 全局可复用自定义hooks
 * 抽离技巧:
 * 1. 相同部分拷贝
 * 2. 不同的部分以函数参数形式传入
 */
import { ref } from 'vue'
import { followDoctor } from '@/api/consult'
import { showSuccessToast } from 'vant'
import type { FollowType } from '@/types/consult'

const useFollow = (type: FollowType = 'doc') => {
  const loading = ref(false)
  // 点击执行回调函数
  const follow = async (obj: { id: string; likeFlag: 0 | 1 }) => {
    //防止重复点击
    loading.value = true
    try {
      await followDoctor(obj.id, type)
      obj.likeFlag = obj.likeFlag === 1 ? 0 : 1
      showSuccessToast(obj.likeFlag === 1 ? '关注成功' : '取关成功')
    } finally {
      loading.value = false
    }
  }
  // 返回页面需要使用在数据和函数
  return { loading, follow }
}

export { useFollow }
