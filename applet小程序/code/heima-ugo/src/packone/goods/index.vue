<template>
  <view class="wrapper">
    <!-- 商品图片 -->
    <swiper
      class="pics"
      indicator-dots
      indicator-color="rgba(255, 255, 255, 0.6)"
      indicator-active-color="#fff"
    >
      <swiper-item v-for="(pic, i) in detail.pics" :key="i">
        <image :src="pic.pics_mid_url" />
      </swiper-item>
    </swiper>
    <!-- 基本信息 -->
    <view class="meta">
      <view class="price">￥{{ detail.goods_price }}</view>
      <view class="name">{{ detail.goods_name }}</view>
      <view class="shipment">快递: 免运费</view>
      <text class="collect icon-star">收藏</text>
    </view>
    <!-- 商品详情 -->
    <view class="detail">
      <!-- uni-app提供的rich-text渲染html字符串 -->
      <!-- <rich-text :nodes="detail.goods_introduce"></rich-text> -->
      <!-- vue 使用v-html 渲染html字符串 => 最终还是被打包成 rich-text -->
      <view v-html="detail.goods_introduce"></view>
    </view>
    <!-- 操作 -->
    <view class="action">
      <!-- button元素身上添加 open-type="contact" 点击后就可以吊起微信官方客服功能 -->
      <button open-type="contact" class="icon-handset">联系客服</button>
      <text class="cart icon-cart" @click="goCart">购物车</text>

      <!-- 显示购物车中商品的数量 -->
      <text v-if="carts.length > 0" class="cartNum">{{ carts.length }}</text>

      <text @click="addCart" class="add">加入购物车</text>
      <text class="buy" @click="createOrder">立即购买</text>
    </view>
  </view>
</template>

<script>
import { th, tr } from '@dcloudio/vue-cli-plugin-uni/packages/postcss/tags'

export default {
  data() {
    return {
      // 商品详情数据
      detail: {},
      // 购物车列表
      carts: uni.getStorageSync('carts') || [],
    }
  },
  onLoad(query) {
    console.log('路由参数', query.id)
    this.getDetail(query.id)
  },
  watch: {
    // 监听属性，监听一个data变量的变化
    // carts(newValue, oldValue) {
    //   console.log('carts数据变化了')
    //   uni.setStorageSync('carts', this.carts)
    // },
    carts: {
      deep: true, // 开启深度监听
      handler(newValue) {
        console.log('carts数据变化了')
        uni.setStorageSync('carts', newValue)
      },
    },
  },
  methods: {
    // 点击加入购物车
    addCart() {
      /**
       * 判断当前加入购物车的商品，之前是否加入过？
       * 1. 没有加入过  => carts数组中新增一个 => 需要的字段：goods_id, goods_name, goods_price, goods_small_logo, goods_count(数量), goods_checked(是否被选中)
       * 2. 加入过 => 增加购物车中已存在商品的数量 +1
       * 3. 持久化到本地
       */
      let goods = this.carts.find(
        (item) => item.goods_id === this.detail.goods_id
      )
      if (!goods) {
        //没有加入过
        const { goods_id, goods_name, goods_price, goods_small_logo } =
          this.detail
        this.carts.push({
          goods_id,
          goods_name,
          goods_price,
          goods_small_logo,
          goods_count: 1, // 加入购物车默认数量是1
          goods_checked: true, // 加入购物车默认选中
        })
      } else {
        // 已经存在
        goods.goods_count++
      }
      // uni.setStorageSync('carts', this.carts)
      uni.showToast({
        title: '加入成功！',
      })
    },
    // 获取详情数据
    async getDetail(goods_id) {
      const { data } = await this.request({
        url: '/api/public/v1/goods/detail',
        data: {
          goods_id,
        },
      })
      console.log('商品详情数据', data)
      this.detail = data
    },
    goCart() {
      uni.switchTab({
        url: '/pages/cart/index',
      })
    },
    createOrder() {
      uni.navigateTo({
        url: '/pages/order/index',
      })
    },
  },
}
</script>

<style scoped lang="scss">
.wrapper {
  margin-bottom: 100rpx;
  background-color: #f4f4f4;
}

.pics {
  height: 640rpx;
}

.meta {
  height: 250rpx;
  line-height: 1;
  padding: 30rpx 180rpx 30rpx 20rpx;
  box-sizing: border-box;
  background-color: #fff;
  position: relative;

  .price {
    font-size: 36rpx;
    color: #ea4451;
    margin-bottom: 20rpx;
  }

  .name {
    color: #333;
    line-height: 1.4;
    font-size: 33rpx;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .shipment {
    font-size: 27rpx;
    color: #999;
    position: absolute;
    bottom: 30rpx;
  }

  .collect {
    width: 140rpx;
    height: 88rpx;
    text-align: center;
    box-sizing: border-box;
    border-left: 1rpx solid #ddd;
    font-size: 24rpx;
    color: #999;

    position: absolute;
    right: 10rpx;
    top: 91rpx;
  }

  [class*='icon-']::before {
    display: block;
    font-size: 45rpx;
    margin-bottom: 10rpx;
  }
}

.detail image {
  width: 100%;
  height: 480rpx;
  margin-top: 20rpx;
}

.action {
  width: 100%;
  height: 98rpx;
  background-color: #fff;

  position: fixed;
  left: 0;
  bottom: 0;

  display: flex;
  align-items: center;

  text {
    display: block;
  }

  .cartNum {
    position: absolute;
    left: 250rpx;
    top: -15rpx;
    width: 50rpx;
    height: 50rpx;
    line-height: 50rpx;
    background: #ea4451;
    color: #fff;
    text-align: center;
    border-radius: 50rpx;
  }

  .add,
  .buy {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 210rpx;
    text-align: center;
    font-size: 27rpx;
    color: #fff;
  }

  .add {
    background-color: #f4b73f;
  }

  .buy {
    background-color: #ea4451;
  }

  button {
    padding: 0;
    border-radius: 0;
    background-color: #fff;

    &::after {
      border: none;
    }
  }

  button,
  .cart {
    flex: 1;
    text-align: center;
    color: #989898;
    font-size: 24rpx;
    box-sizing: border-box;
  }

  [class*='icon']::before {
    display: block;
    font-size: 45rpx;
    margin-bottom: 2rpx;
  }
}
</style>
