<script setup lang="ts">
import { getAddressList, getMedicalOrderPre } from '@/api/medicine'
import type { Address, OrderPre } from '@/types/medicine'
import { showToast } from 'vant'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { createMedicalOrder } from '@/api/medicine'

// 1. 处方下药品支付信息
const orderPre = ref<OrderPre>()

// 患者的默认收货地址
const address = ref<Address>()

// 获取处方下药品支付信息
const route = useRoute()
const getOrderPre = async () => {
  const { data } = await getMedicalOrderPre(route.query.id as string)
  console.log('处方下药品支付信息', data)
  orderPre.value = data
}
// 获取患者收货地址
const getAddress = async () => {
  const { data } = await getAddressList()
  console.log(data)
  // 后台地址列表的第一个作为默认收货地址
  address.value = data[0]
}
onMounted(() => {
  getOrderPre()
  getAddress()
})

// 2. 创建药品订单支付
/**
 * 需求分析：
    1. 满足：同意支付协议、有收货地址、有效处方
    2. 药品订单是否存在：
      1. 不存在：创建订单，存储订单ID，打开支付抽屉
      2. 存在：直接打开支付抽屉
 */
const loading = ref(false) // 避免重复点击
const agree = ref(false) // 是否同意支付协议
const orderId = ref('') // 药品订单ID
const show = ref(false) // 控制支付弹层显示
const openPay = async () => {
  if (!agree.value) return showToast('请同意支付协议！')
  if (!address.value?.id) return showToast('请选择收货地址！')
  if (!orderPre.value?.id) return showToast('不是有效的处方ID！')
  if (!orderId.value) {
    // 1. 没有生成药品订单
    loading.value = true
    try {
      const { data } = await createMedicalOrder({
        id: orderPre.value.id, // 处方ID
        addressId: address.value.id, // 默认收货地址ID
        couponId: orderPre.value.couponId // 优惠券ID
      })
      console.log('订单信息', data)
      orderId.value = data.id
      show.value = true
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  } else {
    // 2. 已经生成药品订单
    show.value = true
  }
}
</script>

<template>
  <div class="order-pay-page" v-if="orderPre && address">
    <cp-nav-bar title="药品支付" />
    <div class="order-address">
      <p class="area">
        <van-icon name="location" />
        <span>{{ address.province + address.city + address.county }}</span>
      </p>
      <p class="detail">{{ address.addressDetail }}</p>
      <p>
        {{ address.receiver }}
        {{ address.mobile.replace(/^(\d{3})(?:\d{4})(\d{4})$/, '\$1****\$2') }}
      </p>
    </div>
    <div class="order-medical">
      <div class="head">
        <h3>优医药房</h3>
        <small>优医质保 假一赔十</small>
      </div>
      <div class="item van-hairline--top" v-for="med in orderPre.medicines" :key="med.id">
        <img class="img" :src="med.avatar" alt="" />
        <div class="info">
          <p class="name">
            <span>{{ med.name }}</span>
            <span>x{{ med.quantity }}</span>
          </p>
          <p class="size">
            <van-tag v-if="med.prescriptionFlag === 1">处方药</van-tag>
            <span>{{ med.specs }}</span>
          </p>
          <p class="price">￥{{ med.amount }}</p>
        </div>
        <div class="desc">{{ med.usageDosag }}</div>
      </div>
    </div>
    <div class="order-detail">
      <van-cell-group>
        <van-cell title="药品金额" :value="`￥${orderPre.payment}`" />
        <van-cell title="运费" :value="`￥${orderPre.expressFee}`" />
        <van-cell title="优惠券" :value="`-￥${orderPre.couponDeduction}`" />
        <van-cell title="实付款" :value="`￥${orderPre.actualPayment}`" class="price" />
      </van-cell-group>
    </div>
    <div class="order-tip">
      <p class="tip">
        由于药品的特殊性，如非错发、漏发药品的情况，药品一经发出
        不得退换，请核对药品信息无误后下单。
      </p>
      <van-checkbox v-model="agree">我已同意<a href="javascript:;">支付协议</a></van-checkbox>
    </div>
    <van-submit-bar
      :loading="loading"
      @click="openPay"
      :price="orderPre.actualPayment * 100"
      button-text="立即支付"
      button-type="primary"
      text-align="left"
    ></van-submit-bar>
    <!-- 复用支付弹层 -->
    <cp-pay-sheet
      v-model:show="show"
      :orderId="orderId"
      :payment="orderPre.actualPayment"
      pay-callback="http://127.0.0.1:5173/medicine/pay/result"
    ></cp-pay-sheet>
  </div>
  <div class="order-pay-page" v-else>
    <cp-nav-bar title="药品支付" />
    <van-skeleton class="vsk" title :row="4" />
    <van-skeleton class="vsk" title :row="4" />
  </div>
</template>

<style lang="scss" scoped>
.vsk {
  margin-top: 20px;
}
:deep(.van-nav-bar) {
  background-color: var(--cp-primary);
  .van-nav-bar__arrow,
  .van-nav-bar__title {
    color: #fff;
  }
}
:deep(.van-cell) {
  .van-cell__title {
    font-size: 16px;
  }
  .van-cell__value {
    font-size: 16px;
  }
  &.price {
    .van-cell__value {
      font-size: 18px;
      color: var(--cp-price);
    }
  }
}
:deep(.van-submit-bar) {
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  .van-button {
    width: 200px;
  }
}
.order-pay-page {
  padding: 46px 0 65px;
}
.order-address {
  padding: 15px 15px 0 15px;
  background-color: #fff;
  font-size: 13px;
  .area {
    color: var(--cp-tag);
    margin-bottom: 5px;
    .van-icon-location {
      color: #ff7702;
      font-size: 14px;
    }
  }
  .detail {
    font-size: 17px;
    margin-bottom: 5px;
  }
  &::after {
    content: '';
    display: block;
    height: 12px;
    background-color: var(--cp-bg);
    margin: 0 -15px;
    margin-top: 15px;
  }
}

.order-medical {
  background-color: #fff;
  padding: 0 15px;
  .head {
    display: flex;
    height: 54px;
    align-items: center;
    > h3 {
      font-size: 16px;
      font-weight: normal;
    }
    > small {
      font-size: 13px;
      color: var(--cp-tag);
      margin-left: 10px;
    }
  }
  .item {
    display: flex;
    flex-wrap: wrap;
    padding: 15px 0;
    .img {
      width: 80px;
      height: 70px;
      border-radius: 2px;
      overflow: hidden;
    }
    .info {
      padding-left: 15px;
      width: 250px;
      .name {
        display: flex;
        font-size: 15px;
        margin-bottom: 5px;
        > span:first-child {
          width: 200px;
        }
        > span:last-child {
          width: 50px;
          text-align: right;
        }
      }
      .size {
        margin-bottom: 5px;
        .van-tag {
          background-color: var(--cp-primary);
          vertical-align: middle;
        }
        span:not(.van-tag) {
          margin-left: 10px;
          color: var(--cp-tag);
          vertical-align: middle;
        }
      }
      .price {
        font-size: 16px;
        color: #eb5757;
      }
    }
    .desc {
      width: 100%;
      background-color: var(--cp-bg);
      border-radius: 4px;
      margin-top: 10px;
      padding: 4px 10px;
      color: var(--cp-tip);
    }
  }
}
.order-tip {
  padding: 0 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
  .tip {
    font-size: 12px;
    color: var(--cp-tag);
    width: 100%;
    &::before {
      content: '*';
      color: var(--cp-price);
      font-size: 14px;
    }
    margin-bottom: 30px;
  }
  .van-checkbox {
    a {
      color: var(--cp-primary);
    }
  }
}
</style>
