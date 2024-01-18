<template>
  <view class="wrapper">
    <!-- 个人资料 -->
    <view class="profile">
      <view class="meta">
        <!-- <image
          class="avatar"
          src="http://static.botue.com/ugo/uploads/monkey.png"
        />
        <text class="nickname">孙悟空</text> -->
        <open-data class="avatar" type="userAvatarUrl"></open-data>
        <open-data class="nickname" type="userNickName"></open-data>
      </view>
    </view>
    <!-- 统计 -->
    <view class="count">
      <view class="cell">
        8
        <text>收藏的店铺</text>
      </view>
      <view class="cell">
        14
        <text>收藏的商品</text>
      </view>
      <view class="cell">
        18
        <text>关注的商品</text>
      </view>
      <view class="cell">
        84
        <text>我的足迹</text>
      </view>
    </view>
    <!-- 我的订单 -->
    <view class="orders">
      <view class="title">我的订单</view>
      <view class="sorts">
        <text class="icon-bill">待付款</text>
        <text class="icon-car">待收货</text>
        <text class="icon-money">退款/退货</text>
        <text class="icon-list">全部订单</text>
      </view>
    </view>
    <!-- 地址管理 -->
    <view class="address icon-arrow">收货地址</view>
    <!-- 其它 -->
    <view class="extra">
      <view @click="callSer" class="item icon-arrow">联系客服</view>
      <button open-type="share" class="item icon-arrow">分享优购</button>
    </view>
  </view>
</template>

<script>
export default {
  // 检查用户是否登录？在哪个钩子函数
  onShow() {
    this.checkAuth()
  },
  methods: {
    callSer() {
      uni.makePhoneCall({
        phoneNumber: '10086',
      })
    },
  },
}
</script>

<style scoped lang="scss">
.wrapper {
  position: absolute;
  top: 0;
  bottom: 0;

  width: 100%;
  background-color: #f4f4f4;
}

.profile {
  height: 375rpx;
  background-color: #ea4451;
  display: flex;
  justify-content: center;
  align-items: center;

  .meta {
    .avatar {
      display: inline-block;
      width: 140rpx;
      height: 140rpx;
      border-radius: 50%;
      border: 2rpx solid #fff;
      overflow: hidden;
    }

    .nickname {
      display: block;
      text-align: center;
      margin-top: 20rpx;
      font-size: 30rpx;
      color: #fff;
    }
  }
}

.count {
  display: flex;
  margin: 0 20rpx;
  height: 100rpx;
  text-align: center;
  border-radius: 4rpx;
  background-color: #fff;

  position: relative;
  top: -27rpx;

  .cell {
    flex: 1;
    padding-top: 16rpx;
    font-size: 27rpx;
    color: #333;
  }

  text {
    display: block;
    font-size: 24rpx;
  }
}

.orders {
  margin: -17rpx 20rpx 0 20rpx;
  padding: 20rpx 0;
  background-color: #fff;
  border-radius: 4rpx;

  .title {
    padding-left: 20rpx;
    font-size: 30rpx;
    color: #333;
    padding-bottom: 20rpx;
    border-bottom: 1rpx solid #eee;
  }

  .sorts {
    padding-top: 30rpx;
    text-align: center;
    display: flex;
  }

  [class*='icon-'] {
    flex: 1;
    font-size: 24rpx;

    &::before {
      display: block;
      font-size: 48rpx;
      margin-bottom: 8rpx;
      color: #ea4451;
    }
  }
}

.address {
  line-height: 1;
  background-color: #fff;
  font-size: 30rpx;
  padding: 25rpx 0 25rpx 20rpx;
  margin: 10rpx 20rpx;
  color: #333;
  border-radius: 4rpx;
}

.extra {
  margin: 0 20rpx;
  background-color: #fff;
  border-radius: 4rpx;

  .item {
    line-height: 1;
    padding: 25rpx 0 25rpx 20rpx;
    border-bottom: 1rpx solid #eee;
    font-size: 30rpx;
    color: #333;
  }

  button {
    text-align: left;
    background-color: #fff;

    &::after {
      border: none;
      border-radius: 0;
    }
  }
}

.icon-arrow {
  position: relative;

  &::before {
    position: absolute;
    top: 50%;
    right: 20rpx;
    transform: translateY(-50%);
  }
}
</style>
