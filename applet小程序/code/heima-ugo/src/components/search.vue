<script>
  export default {
    /**
     * 需求：搜索状态切换 => 
     * 1. 用户点击搜索输入框，输入框获取焦点，进入到搜索状态
     * 2. 用户点击取消按钮，退出搜索状态
     */
    data(){
      return{
        // 是否进入搜索状态
        isSearch:false
      }
    },
    methods:{
      // 1. 进入搜索状态
      goSearch(){
        this.isSearch=true
        // 进入搜索状态后，getStstemInfoSync计算手机屏幕高度，然后传给父页面控制高度，防止滚动
        const pageHeight = uni.getSystemInfoSync().windowHeight +"px"
        uni.hideTabBar({animation:true}) // 隐藏tabBar
        this.$emit('search',pageHeight)
      },
      exitSearch(){
        this.isSearch=false
        uni.showTabBar({animation:true}); // 显示tabBar
        this.$emit("search", "auto");
      }
    }
  }
   
</script>

<template>
  <view class="search" :class="{focused:isSearch}" >
    <!-- 搜索区域 -->
      <view class="sinput">
        <input @focus="goSearch" type="text" placeholder="搜索" />
        <button @click="exitSearch">取消</button>
      </view>
      <!-- 搜索状态显示=》下边内容 -->
      <view class="scontent" v-show="isSearch">
        <div class="title">
          搜索历史
          <span class="clear"></span>
        </div>
        <!-- 搜索历史 -->
        <div class="history">
          <navigator url="/pages/list/index">小米</navigator>
          <navigator url="/pages/list/index">智能电视</navigator>
          <navigator url="/pages/list/index">小米空气净化器</navigator>
          <navigator url="/pages/list/index">西门子洗碗机</navigator>
          <navigator url="/pages/list/index">华为手机</navigator>
          <navigator url="/pages/list/index">苹果</navigator>
          <navigator url="/pages/list/index">锤子</navigator>
        </div>
        <!-- 搜索建议商品 -->
        <scroll-view scroll-y class="result" style="display: none">
          <navigator url="/pages/goods/index">小米</navigator>
          <navigator url="/pages/goods/index">小米</navigator>
          <navigator url="/pages/goods/index">小米</navigator>
          <navigator url="/pages/goods/index">小米</navigator>
          <navigator url="/pages/goods/index">小米</navigator>
          <navigator url="/pages/goods/index">小米</navigator>
          <navigator url="/pages/goods/index">小米</navigator>
          <navigator url="/pages/goods/index">小米</navigator>
          <navigator url="/pages/goods/index">小米</navigator>
          <navigator url="/pages/goods/index">小米</navigator>
          <navigator url="/pages/goods/index">小米</navigator>
          <navigator url="/pages/goods/index">小米</navigator>
          <navigator url="/pages/goods/index">小米</navigator>
          <navigator url="/pages/goods/index">小米</navigator>
          <navigator url="/pages/goods/index">小米</navigator>
          <navigator url="/pages/goods/index">小米</navigator>
          <navigator url="/pages/goods/index">小米</navigator>
          <navigator url="/pages/goods/index">小米</navigator>
        </scroll-view>
      </view>
    </view>
</template>

<style lang='scss' scoped>
// 搜索
.search {
  display: flex;
  flex-direction: column;
  .sinput {
    box-sizing: border-box;
    padding: 20rpx 16rpx;
    background: #ff2d4a;
    position: relative;
    //伪元素
    &::after {
      position: absolute;
      top: 28rpx;
      left: 302rpx;
      content: "";
      width: 44rpx;
      height: 44rpx;
      line-height: 1;
      background-image: url(https://static.botue.com/ugo/images/icon_search%402x.png);
      background-size: 32rpx;
      background-position: 6rpx center;
      background-repeat: no-repeat;
    }
    input {
      background: #fff;
      flex: 1;
      height: 60rpx;
      line-height: 60rpx;
      text-align: center;
      font-size: 24rpx;
      color: #bbb;
      border-radius: 5rpx;
    }
    button {
      display: none;
      margin-left: 20rpx;
      width: 150rpx;
      height: 60rpx;
      line-height: 60rpx;
      text-align: center;
      font-size: 24rpx;
      border-radius: 5rpx;
      background: transparent;
      color: #666;
    }
  }
  // & 指的父级
  &.focused {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
    .sinput {
      display: flex;
      background: #eee;
      input {
        text-align: left;
        padding-left: 60rpx;
      }
      button {
        display: block;
      }
      &::after {
        left: 30rpx;
      }
    }
  }
  .scontent {
    background: #fff;
    position: relative;

    flex: 1;
    padding: 27rpx;
    .title {
      font-size: 27rpx;
      line-height: 1;
      color: #333;
    }
    .clear {
      display: block;
      width: 27rpx;
      height: 27rpx;
      float: right;
      background-image: url(http://static.botue.com/ugo/images/clear.png);
      background-size: cover;
    }

    .history {
      padding-top: 30rpx;
      navigator {
        display: inline-block;
        line-height: 1;
        padding: 15rpx 20rpx 12rpx;
        background-color: #ddd;
        font-size: 24rpx;
        margin-right: 20rpx;
        margin-bottom: 15rpx;
        color: #333;
      }
    }

    .result {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: #fff;
      navigator {
        line-height: 1;
        padding: 20rpx 30rpx;
        font-size: 24rpx;
        color: #666;
        border-bottom: 1px solid #eee;

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style>