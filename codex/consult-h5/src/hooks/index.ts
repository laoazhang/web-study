/**
 * 全局可复用自定义hooks
 * 抽离技巧:
 * 1. 相同部分拷贝
 * 2. 不同的部分以函数参数形式传入
 */
import { ref, watch } from 'vue'
import { followDoctor } from '@/api/consult'
import { showSuccessToast, showImagePreview, showFailToast } from 'vant'
import type { FollowType } from '@/types/consult'
import { getPrescriptionPic } from '@/api/consult'
import { useClipboard } from '@vueuse/core'

// 关注医生或文章
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

const useLookPre = () => {
  const lookPre = async (id?: string) => {
    try {
      // 1. if (!id) return // 排除undefined清空，限定类型(推荐)
      if (!id) return
      // const { data } = await getPrescriptionPic(id!)
      const { data } = await getPrescriptionPic(id)
      console.log(data)
      // 实现图片的预览
      showImagePreview([data.url])
    } catch (error) {
      console.log(error)
    }
  }
  // 返回查看处方的方法
  return { lookPre }
}

// 复制
const useCopy = () => {
  /**
   * 1. copy 函数 =》 使用：copy（复制文本）=》 copy方法会把传入的文本存储到系统剪切版
   * 2. copied ref响应变量 =》true 复制成功 ｜ false 复制失败
   * 3. isSupported ref 响应变量 =》 true 授权支持= ｜ false 未授权不支持
   */
  const { copy, copied, isSupported } = useClipboard()

  // 复制方法
  const onCopy = (copyTest: string) => {
    if (!isSupported.value) return showFailToast('系统不支持复制！')
    copy(copyTest)
  }
  // 监听复制是否成功，做提示
  watch(copied, () => {
    if (copied.value) showSuccessToast('复制成功！')
  })
  return { onCopy }
}

export { useFollow, useLookPre, useCopy }
