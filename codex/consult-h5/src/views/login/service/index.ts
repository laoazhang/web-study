import { ref } from 'vue'
// 导入校验规则
import { showSuccessToast, type FormInstance } from 'vant'
import { sendMobileCode } from '@/api/user'
import { onUnmounted } from 'vue'
export function useSendCode(mobile: string) {
  const code = ref('')
  const time = ref(0)
  const form = ref<FormInstance>()
  let timeId: number
  const send = async () => {
    // 已经倒计时time的值大于0，60s内不能重复发送验证码
    if (time.value > 0) return
    // 输入手机号时，对手机号进行校验
    await form.value?.validate('mobile')
    const res = await sendMobileCode(mobile, 'login')
    showSuccessToast('发送成功')
    code.value = res.data.code
    time.value = 60
    // 倒计时
    timeId = window.setInterval(() => {
      time.value--
      if (time.value <= 0) window.clearInterval(timeId)
    }, 1000)
  }
  onUnmounted(() => {
    // 避免内存泄漏
    window.clearInterval(timeId)
  })

  // 返回：提供给页面使用
  return { code, time, form, send }
}
