<script setup lang="ts">
import { getConsultOrderPre, createConsultOrder } from '@/api/consult'
import { getPatientDetail } from '@/api/user'
import { useConsultStore } from '@/stores'
import type { ConsultOrderPreData } from '@/types/consult'
import type { Patient } from '@/types/user'
import { showConfirmDialog, showFailToast } from 'vant'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useRouter } from 'vue-router'

// 1. 获取支付信息
const payInfo = ref<ConsultOrderPreData>()

const store = useConsultStore()
const router = useRouter()
const getPayInfo = async () => {
  try {
    const { data } = await getConsultOrderPre({
      type: store.consult.type, // 问诊类型
      illnessType: store.consult.illnessType // 问诊级别: 三甲或普通
    })
    // console.log('支付信息', data)
    payInfo.value = data
    // 存储优惠券ID
    store.setCunpon(data.couponId)
  } catch (error) {
    // 访问支付页面，但是缺少问诊数据，跳回首页
    showFailToast('缺少必要的问诊信息,请重新选择!')
    router.push('/home')
  }
}

// 2. 获取患者信息
const patient = ref({} as Patient)
const getPatient = async () => {
  if (!store.consult.patientId) return
  const { data } = await getPatientDetail(store.consult.patientId)
  // console.log('患者信息', data)
  patient.value = data
}
onMounted(() => {
  getPayInfo()
  getPatient()
})

// 3. 点击立即支付，打开支付弹层
const show = ref(false)
const agree = ref(false)
// 存储订单ID
const orderId = ref('')
const openPay = async () => {
  if (!agree.value) return showFailToast('请勾选同意支付协议!')
  // 打开支付窗口
  show.value = true
  // 创建订单
  try {
    const { data } = await createConsultOrder(store.consult)
    // 存储问诊订单ID, 获取支付地址需要使用
    orderId.value = data.id
    console.log('订单id', orderId)

    // 说明：订单创建成功,需要清空之前记录在pinia的问诊数据
    store.clear()
  } catch (error) {
    console.log(error)
  }
}

// 4. 支付窗口打开后,订单创建成功
onBeforeRouteLeave(() => {
  // 存在订单ID，说明订单已经创建成功了，页面不能再执行跳转
  if (orderId.value) return false
})

// 控制是否关闭支付窗口
const onClose = async () => {
  try {
    await showConfirmDialog({
      title: '关闭支付',
      message: '取消支付将无法获得医生回复，医生接诊名额有限，是否确认关闭？',
      cancelButtonText: '仍要关闭',
      confirmButtonText: '继续支付',
      confirmButtonColor: 'var(--cp-primary)'
    })
    // 点击确定代码走到这里
    return false
  } catch (error) {
    // 点击仍要关闭代码走到这里
    console.log(error)
    // 说明？：订单ID改为空之后，才能正常跳转问诊记录列表
    orderId.value = ''
    router.push('/user/consult')
    return true
  }
}

// 5. 点击支付弹层中支付按钮，获取支付地址进行跳转支付
// const payOrder = async () => {
//   if (!paymentMethod.value === undefined) return showFailToast('请选择支付方式！')
//   showToast('跳转支付')
//   const { data } = await getConsultOrderPayUrl({
//     paymentMethod: paymentMethod.value, //支付方式
//     orderId: orderId.value, // 问诊订单ID
//     payCallback: 'http://127.0.0.1:5173/room' // 支付成功后跳转地址
//   })
//   // 跳转到支付宝平台进行支付
//   window.location.href = data.payUrl
// }
</script>

<template>
  <div class="consult-pay-page">
    <cp-nav-bar title="支付" />
    <!-- 1. 支付信息 -->
    <div class="pay-info">
      <p class="tit">图文问诊 {{ payInfo?.actualPayment }} 元</p>
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <p class="desc">
        <span>极速问诊</span>
        <span>自动分配医生</span>
      </p>
    </div>
    <van-cell-group>
      <van-cell title="优惠券" :value="`-¥${payInfo?.couponDeduction}`" />
      <van-cell title="积分抵扣" :value="`-¥${payInfo?.pointDeduction}`" />
      <van-cell title="实付款" :value="`¥${payInfo?.actualPayment}`" class="pay-price" />
    </van-cell-group>
    <div class="pay-space"></div>
    <!-- 2. 患者信息  -->
    <van-cell-group>
      <van-cell
        title="患者信息"
        :value="`${patient.name} | ${patient.gender === 0 ? '女' : '男'} | ${patient.age}岁`"
      ></van-cell>
      <van-cell title="病情描述" :label="store.consult.illnessDesc"></van-cell>
    </van-cell-group>
    <div class="pay-schema">
      <van-checkbox v-model="agree">我已同意 <span class="text">支付协议</span></van-checkbox>
    </div>
    <!-- 3. 打开支付弹层并创建问诊订单 -->
    <van-submit-bar
      button-type="primary"
      :price="payInfo?.actualPayment! * 100"
      button-text="立即支付"
      text-align="left"
      @click="openPay"
    />

    <!-- 支付弹层 
    根据需求，需要传入什么props的值
     v-model:show="show"语法糖 =》:show + @update:show
    -->
    <cp-pay-sheet
      v-model:show="show"
      :orderId="orderId"
      :onClose="onClose"
      :payment="payInfo?.actualPayment"
    ></cp-pay-sheet>
    <!-- <van-action-sheet
      :before-close="onClose"
      :closeable="false"
      v-model:show="show"
      title="选择支付方式"
    >
      <div class="pay-type">
        <p class="amount">￥{{ payInfo?.actualPayment.toFixed(2) }}</p>
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
    </van-action-sheet> -->
  </div>
</template>

<style lang="scss" scoped>
.consult-pay-page {
  padding: 46px 0 50px 0;
  .pay-info {
    display: flex;
    padding: 15px;
    flex-wrap: wrap;
    align-items: center;
    .tit {
      width: 100%;
      font-size: 16px;
      margin-bottom: 10px;
    }
    .img {
      margin-right: 10px;
      width: 38px;
      height: 38px;
      border-radius: 4px;
      overflow: hidden;
    }
    .desc {
      flex: 1;
      > span {
        display: block;
        color: var(--cp-tag);
        &:first-child {
          font-size: 16px;
          color: var(--cp-text2);
        }
      }
    }
  }
  .pay-price {
    ::v-deep() {
      .vam-cell__title {
        font-size: 16px;
      }
      .van-cell__value {
        font-size: 16px;
        color: var(--cp-price);
      }
    }
  }
  .pay-space {
    height: 12px;
    background-color: var(--cp-bg);
  }
  .pay-schema {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
      color: var(--cp-primary);
    }
  }
  ::v-deep() {
    .van-submit-bar__button {
      font-weight: normal;
      width: 160px;
    }
  }
}
</style>
