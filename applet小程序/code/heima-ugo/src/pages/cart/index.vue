<template>
  <view class="wrapper">
    <!-- 收货信息 -->
    <view class="shipment">
      <view class="dt">收货人:</view>
      <view class="dd meta">
        <text class="name">刘德华</text>
        <text class="phone">13535337057</text>
      </view>
      <view class="dt">收货地址:</view>
      <view class="dd">广东省广州市天河区一珠吉</view>
    </view>
    <!-- 购物车 -->
    <view class="carts">
      <view class="item">
        <!-- 店铺名称 -->
        <view class="shopname">优购生活馆</view>
        <view class="goods" v-for="(good, i) in carts" :key="good.goods_id">
          <!-- 商品图片 -->
          <image class="pic" :src="good.goods_small_logo" />
          <!-- 商品信息 -->
          <view class="meta">
            <view class="name">{{ good.goods_name }}</view>
            <view class="price">
              <text>￥</text>{{ good.goods_price }}
              <text>.00</text>
            </view>
            <!-- 加减 -->
            <view class="amount">
              <!-- 减1 -->
              <text @click="changeCount(i, -1)" class="reduce">-</text>
              <input
                type="number"
                disabled
                :value="good.goods_count"
                class="number"
              />
              <!-- 加1 -->
              <text @click="changeCount(i, 1)" class="plus">+</text>
            </view>
          </view>
          <!-- 单选框 -->
          <view class="checkbox" @click="singleCheck(i)">
            <icon
              type="success"
              size="20"
              :color="good.goods_checked ? '#ea4451' : '#ccc'"
            ></icon>
          </view>
        </view>
      </view>
    </view>
    <!-- 其它 -->
    <view class="extra">
      <label class="checkall" @click="selAll">
        <icon
          type="success"
          :color="isAll ? '#ea4451' : '#ccc'"
          size="20"
        ></icon
        >全选
      </label>
      <view class="total">
        合计:
        <text>￥</text>
        <label>14110</label>
        <text>.00</text>
      </view>
      <view class="pay">结算(3)</view>
    </view>
  </view>
</template>

<script>
import { i, tr } from '@dcloudio/vue-cli-plugin-uni/packages/postcss/tags'

export default {
  data() {
    return {
      // 问题：放到这里，只会再页面第一次加载时，从本地获取获取一次 => 以后购物车有更新，这里不会获取到更新
      carts: [],
    }
  },
  computed: {
    // 是否是全部选中状态
    isAll() {
      // 条件：购物车选中商品的数量=购物车商品的总数量
      return this.seledGoods.length === this.carts.length
    },
    seledGoods() {
      return this.carts.filter((item) => item.goods_checked)
    },
  },
  watch: {
    carts: {
      deep: true,
      handler(newValue) {
        console.log('carts数据变化了')
        uni.setStorageSync('carts', newValue)
      },
    },
  },
  onShow() {
    console.log('页面打开运行了')
    this.carts = uni.getStorageSync('carts')
  },
  methods: {
    /**
     * 判断全选框是否是选中状态?
     * 1. true => 全选框选中 => 购物车列表中商品都选中
     * 2. false => 未选中 => 购物车列表中商品全未选中
     */
    selAll() {
      console.log('点击全选')
      if (this.isAll) {
        this.carts.forEach((item) => {
          item.goods_checked === false
        })
      } else {
        this.carts.forEach((item) => {
          item.goods_checked === true
        })
      }
    },
    /**
     * 商品单选
     * @param {*} index 当前点击进行单选操作的商品的索引值
     */
    singleCheck(index) {
      const good = this.carts[index]
      // 每次点击对上次的选中状态做取反
      good.goods_checked = !good.goods_checked
    },
    /**
     *
     * @param {*} index 当前修改数量的商品索引值
     * @param {*} step -1 代表减一 | 1 代表加一
     */
    changeCount(index, step) {
      /**
       * 1. 边界判断：1<count <= 商品库存
       * 2. 满足边界条件执行加减操作
       * 3. 更新本地数据
       */
      const currGoodCout = this.carts[index].goods_count
      if (step === -1 && currGoodCout === 1) {
        // 已经等于1 不能再减了
        uni.showToast({
          title: '最少购买数量为1',
        })
        return
      }
      if (step === 1 && currGoodCout >= 6) {
        uni.showToast({
          title: '没有库存了',
        })
        return
      }
      this.carts[index].goods_count += step
    },
  },
}
</script>

<style scoped lang="scss">
.shipment {
  height: 100rpx;
  line-height: 2;
  padding: 30rpx 30rpx 40rpx 30rpx;
  font-size: 27rpx;
  color: #333;
  background-color: #fff;
  background-image: url(http://static.botue.com/ugo/images/cart_border%402x.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;

  .dt {
    width: 140rpx;
    float: left;
    clear: both;
  }

  .dd {
    padding-left: 160rpx;
  }

  .meta {
    padding-right: 50rpx;
  }

  text.phone {
    float: right;
  }
}

.carts {
  background-color: #f4f4f4;
  padding-bottom: 110rpx;
  overflow: hidden;

  .shopname {
    padding: 30rpx;
    margin-top: 20rpx;
    font-size: 30rpx;
    color: #333;
    background-color: #fff;
    border-top: 1rpx solid #eee;
    border-bottom: 1rpx solid #eee;
  }

  .goods {
    display: flex;
    padding: 30rpx 20rpx 30rpx 0;
    margin-left: 100rpx;
    border-bottom: 1rpx solid #eee;
    background-color: #fff;

    position: relative;

    .checkbox {
      width: 101rpx;
      height: 100%;
      background-color: #fff;

      display: flex;
      justify-content: center;
      align-items: center;

      position: absolute;
      left: -100rpx;
      top: 0;
    }

    &:last-child {
      border-bottom: none;
    }

    .pic {
      width: 200rpx;
      height: 200rpx;
      margin-right: 30rpx;
    }

    .meta {
      flex: 1;
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

    .amount {
      position: absolute;
      bottom: 0;
      right: 20rpx;

      height: 48rpx;
      text-align: center;
      border: 1rpx solid #ddd;
      border-radius: 8rpx;

      display: flex;
      align-items: center;

      text {
        display: block;
        width: 60rpx;
        line-height: 48rpx;
        font-size: 36rpx;
        color: #ddd;
        text-align: center;
      }

      input {
        width: 60rpx;
        height: 48rpx;
        min-height: 48rpx;
        font-size: 27rpx;
        border-left: 1rpx solid #ddd;
        border-right: 1rpx solid #ddd;
      }
    }
  }
}

.extra {
  position: fixed;
  bottom: 0;
  /* #ifdef H5 */
  bottom: 50px;
  /* #endif */
  left: 0;
  z-index: 9;

  width: 750rpx;
  height: 96rpx;
  text-align: center;
  line-height: 96rpx;
  font-size: 36rpx;
  border-top: 1rpx solid #eee;
  background-color: #fff;
  color: #333;
  display: flex;

  .checkall {
    width: 140rpx;
    line-height: 1;
    margin-left: 25rpx;
    display: flex;
    align-items: center;

    icon {
      margin-right: 20rpx;
    }
  }

  .total {
    display: flex;
    justify-content: center;
    flex: 1;

    label,
    text {
      color: #ea4451;
      vertical-align: bottom;
      position: relative;
      bottom: -2rpx;
    }

    text {
      position: relative;
      bottom: -3rpx;
      font-size: 24rpx;

      &:first-child {
        margin-left: 10rpx;
      }
    }
  }

  .pay {
    width: 200rpx;
    background-color: #ea4451;
    color: #fff;
  }
}
</style>
