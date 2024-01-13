<script setup lang="ts">
import { ref } from 'vue'
import { getConsultOrderPayUrl } from '@/api/consult'
import { showToast, showFailToast } from 'vant'

// 支付方式
const paymentMethod = ref<0 | 1>()

const props = defineProps<{
  show: boolean // 控制支付弹层显示
  orderId: string // 支付需要使用的订单ID
  payment?: number // 支付钱数
  onClose?: () => void // 支付窗口关闭控制
  payCallback?: string //支付回调地址
}>()

const emit = defineEmits<{
  (e: 'update:show', data: boolean): void
}>()

const payOrder = async () => {
  if (!paymentMethod.value === undefined) return showFailToast('请选择支付方式！')
  showToast('跳转支付')
  const { data } = await getConsultOrderPayUrl({
    paymentMethod: paymentMethod.value, //支付方式
    orderId: props.orderId, // 问诊订单ID
    payCallback: props.payCallback || 'http://127.0.0.1:5173/room' // 支付成功后跳转地址
  })
  // 跳转到支付宝平台进行支付
  window.location.href = data.payUrl
}
</script>

<template>
  <!-- 
 问题❓： v-model:show="show" show是父传子过来的
 父组件的变量，v-model会直接修改它，违背了单向数据流

 解决：通过子传父修改父组件的show变量
 $event获取van-action-sheet组件视图变化的值
   -->
  <van-action-sheet
    :before-close="onClose"
    :closeable="false"
    :show="show"
    @update:show="emit('update:show', $event)"
    title="选择支付方式"
  >
    <div class="pay-type">
      <p class="amount">￥{{ payment?.toFixed(2) }}</p>
      <van-cell-group>
        <van-cell title="微信支付" @click="paymentMethod = 0">
          <template #icon><cp-icon name="consult-wechat" /></template>
          <template #extra><van-checkbox :checked="paymentMethod === 0" /></template>
        </van-cell>
        <van-cell title="支付宝支付" @click="paymentMethod = 1">
          <template #icon><cp-icon name="consult-alipay" /></template>
          <template #extra><van-checkbox :checked="paymentMethod === 1" /></template>
        </van-cell>
      </van-cell-group>
      <div class="btn">
        <van-button @click="payOrder" type="primary" round block>立即支付</van-button>
      </div>
    </div>
  </van-action-sheet>
</template>

<style lang="scss" scoped>
// 支付弹层样式
.pay-type {
  .amount {
    padding: 20px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
  .btn {
    padding: 15px;
  }
  .van-cell {
    align-items: center;
    .cp-icon {
      margin-right: 10px;
      font-size: 18px;
    }
    .van-checkbox :deep(.van-checkbox__icon) {
      font-size: 16px;
    }
  }
}
</style>
