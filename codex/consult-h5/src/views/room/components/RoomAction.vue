<script setup lang="ts">
import { ref } from 'vue'
import { uploadImage } from '@/api/consult'
import { closeToast, showLoadingToast, showToast } from 'vant'
import type { UploaderAfterRead } from 'vant/lib/uploader/types'
import type { Image } from '@/types/consult'

// 1. 发送文字消息
const text = ref('')
const emit = defineEmits<{
  (e: 'send-text', data: string): void
  (e: 'send-img', data: Image): void
}>()
// 说明：把输入的聊天文字子传父给父组件
// 父组件中使用socket.emit方法把聊天文字发送给ws服务器 => 下发聊天内容 => 给医生
const sendText = () => {
  emit('send-text', text.value)
  text.value = ''
}
// 2. 接收是否禁用输入
defineProps<{
  disabled: boolean
}>()

// 3. 发送图片消息
const sendImage: UploaderAfterRead = async (data) => {
  /**
   * 点击上传图标触发：
   * 1. 调用上传api函数，上传选择的图片
   * 2. 上传成功后获取到url, 通过子传父传递图片
   * 3. 父组件获取到图片,使用socket.emit发送图片给医生
   */
  if (Array.isArray(data)) return
  if (!data.file) return
  showLoadingToast('上传中...')
  // 说明：{data:起别名}
  const { data: img } = await uploadImage(data.file)
  console.log('上传图片：', img)
  emit('send-img', img)
  closeToast()
}
</script>

<template>
  <div class="room-action">
    <!-- 1. 输入框：发送文字消息 -->
    <van-field
      :disabled="disabled"
      v-model="text"
      type="text"
      class="input"
      :border="false"
      placeholder="问医生"
      autocomplete="off"
      @keyup.enter="sendText"
    ></van-field>
    <!-- 2. 图片上传：发送图片消息 -->
    <van-uploader :after-read="sendImage" :preview-image="false" :disabled="disabled">
      <cp-icon name="consult-img" />
    </van-uploader>
  </div>
</template>

<style lang="scss" scoped>
.room-action {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  z-index: 1;
  box-sizing: border-box;
  .input {
    background-color: var(--cp-bg);
    border: none;
    border-radius: 25px;
    margin-right: 10px;
    padding: 8px 15px;
  }
  .cp-icon {
    width: 24px;
    height: 24px;
  }
}
</style>
