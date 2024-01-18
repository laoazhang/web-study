<template>
  <view class="wrapper">
    <!-- 订单状态 -->
    <view class="tabs">
      <text class="active">全部</text>
      <text>待付款</text>
      <text>已付款</text>
      <text>退款/退货</text>
    </view>
    <!-- 订单 -->
    <scroll-view class="orders" scroll-y>
      <view class="item" v-for="order in orders" :key="order.order_number">
        <!-- 订单中包含哪些商品 -->
        <block v-for="prd in order.goods" :key="prd.goods_id">
          <!-- 商品图片 -->
          <image class="pic" :src="prd.goods_small_logo" />
          <!-- 商品信息 -->
          <view class="meta">
            <view class="name">{{ prd.goods_name }}</view>
            <view class="price">
              <text>￥</text>{{ prd.goods_price }}
              <text>.00</text>
            </view>
            <view class="num">{{ prd.goods_number }}</view>
          </view>
        </block>
        <!-- 总价 -->
        <view class="amount"
          >共1件商品 总计: ￥{{ order.total_price }}(含运费0.00)</view
        >
        <!-- 其它 -->
        <view class="extra">
          订单号: {{ order.order_number }}
          <button
            @click="payOrder(order.order_number)"
            size="mini"
            type="primary"
          >
            支付
          </button>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 订单列表数据
      orders: [],
    }
  },
  methods: {
    async payOrder(order_number) {
      /**
       * 步骤：
       * 1. 调用后台支付接口，传入订单号
       * 2. 成功后，调起微信支付窗口 => uni.requestPayment
       */
      const { msg, data } = await this.request({
        url: '/api/public/v1/my/orders/req_unifiedorder',
        method: 'post',
        data: {
          order_number,
        },
      })
      if (msg.status === 200) {
        const [error, msg] = await uni.requestPayment(data.pay)
        if (!error) {
          uni.showToast({
            title: '支付成功',
          })
        }
        // 支付成功更新列表
      } else {
        uni.showToast({
          title: '支付失败',
        })
      }
    },
    onLoad() {
      this.getOrders()
    },
    async getOrders() {
      // 判断是否登录
      if (!uni.getStorageSync('ugo-token')) {
        return uni.navigateTo({
          url: '/packone/auth/index',
        })
      }
      // 获取订单列表
      const { msg, data } = await this.request({
        url: '/api/public/v1/my/orders/all',
        data: {
          type: 1,
        },
      })
      if (msg.status === 200) {
        this.orders = data.orders
      }
    },
  },
}
</script>

<style scoped lang="scss">
.tabs {
  display: flex;
  height: 96rpx;
  line-height: 96rpx;
  background-color: #fff;
  box-shadow: 0 4rpx 10rpx #ccc;

  text {
    flex: 1;
    text-align: center;
    font-size: 27rpx;
    color: #333;

    &.active {
      color: #ea4451;
    }
  }
}

.orders {
  width: 100%;
  background-color: #f4f4f4;

  position: absolute;
  top: 97rpx;
  bottom: 0;
}

.item {
  padding: 30rpx 20rpx 0;
  margin-top: 16rpx;
  background-color: #fff;

  .pic {
    width: 200rpx;
    height: 200rpx;
    float: left;
  }

  .meta {
    height: 200rpx;
    margin-left: 230rpx;
    font-size: 27rpx;
    color: #333;
    position: relative;
  }

  .name {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .price {
    position: absolute;
    bottom: 0;

    color: #ea4451;
    font-size: 33rpx;

    text {
      font-size: 22rpx;
    }
  }

  .num {
    position: absolute;
    bottom: 0;
    right: 20rpx;
    color: #333;
  }

  .amount {
    text-align: right;
    padding: 20rpx;
    font-size: 24rpx;
    border-top: 1rpx solid #eee;
    border-bottom: 1rpx solid #eee;
    margin-top: 20rpx;
    color: #999;
  }

  .extra {
    padding: 30rpx;
    font-size: 24rpx;
    color: #999;
    position: relative;

    button {
      position: absolute;
      right: 20rpx;
      font-size: 24rpx;
      margin-top: -10rpx;
    }
  }
}
</style>
