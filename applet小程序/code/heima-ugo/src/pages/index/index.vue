<template>
  <view class="index">
    <!-- 搜索 -->
    <!-- 获取焦点添加=》类名=》focused -->
    <Search></Search>
    <!-- 轮播图 -->
    <view class="slider">
      <swiper
        autoplay
        interval="2000"
        circular
        indicator-dots
        indicator-color="rgba(255,255,255,1)"
        indicator-active-color="rgba(255,255,255,.6)"
      >
        <swiper-item>
          <navigator url>
            <image src="/static/uploads/banner1.png" />
          </navigator>
        </swiper-item>
        <swiper-item>
          <navigator url>
            <image src="/static/uploads/banner2.png" />
          </navigator>
        </swiper-item>
        <swiper-item>
          <navigator url>
            <image src="/static/uploads/banner3.png" />
          </navigator>
        </swiper-item>
      </swiper>
    </view>
    <!-- 功能导航 -->
    <view class="navs">
      <navigator url>
        <image src="/static/uploads/icon_index_nav_1@2x.png" />
      </navigator>
      <navigator url>
        <image src="/static/uploads/icon_index_nav_2@2x.png" />
      </navigator>
      <navigator url>
        <image src="/static/uploads/icon_index_nav_3@2x.png" />
      </navigator>
      <navigator url>
        <image src="/static/uploads/icon_index_nav_4@2x.png" />
      </navigator>
    </view>
    <!-- 栏目楼层 -->
    <view class="floors">
      <!-- 1 -->
      <view class="floor">
        <!-- title -->
        <view class="ftitle">
          <image src="/static/uploads/pic_floor01_title.png" />
        </view>
        <!-- pics -->
        <view class="fitem">
          <navigator url>
            <image src="/static/uploads/pic_floor01_1@2x.png" />
          </navigator>
          <navigator url>
            <image src="/static/uploads/pic_floor01_2@2x.png" />
          </navigator>
          <navigator url>
            <image src="/static/uploads/pic_floor01_3@2x.png" />
          </navigator>
          <navigator url>
            <image src="/static/uploads/pic_floor01_4@2x.png" />
          </navigator>
          <navigator url>
            <image src="/static/uploads/pic_floor01_5@2x.png" />
          </navigator>
        </view>
      </view>
      <!-- 2 -->
      <view class="floor">
        <!-- title -->
        <view class="ftitle">
          <image src="/static/uploads/pic_floor02_title.png" />
        </view>
        <!-- pics -->
        <view class="fitem">
          <navigator url>
            <image src="/static/uploads/pic_floor02_1@2x.png" />
          </navigator>
          <navigator url>
            <image src="/static/uploads/pic_floor02_2@2x.png" />
          </navigator>
          <navigator url>
            <image src="/static/uploads/pic_floor02_3@2x.png" />
          </navigator>
          <navigator url>
            <image src="/static/uploads/pic_floor02_4@2x.png" />
          </navigator>
          <navigator url>
            <image src="/static/uploads/pic_floor02_5@2x.png" />
          </navigator>
        </view>
      </view>
      <!-- 3 -->
      <view class="floor">
        <!-- title -->
        <view class="ftitle">
          <image src="/static/uploads/pic_floor03_title.png" />
        </view>
        <!-- pics -->
        <view class="fitem">
          <navigator url>
            <image src="/static/uploads/pic_floor03_1@2x.png" />
          </navigator>
          <navigator url>
            <image src="/static/uploads/pic_floor03_2@2x.png" />
          </navigator>
          <navigator url>
            <image src="/static/uploads/pic_floor03_3@2x.png" />
          </navigator>
          <navigator url>
            <image src="/static/uploads/pic_floor03_4@2x.png" />
          </navigator>
          <navigator url>
            <image src="/static/uploads/pic_floor03_5@2x.png" />
          </navigator>
        </view>
      </view>
    </view>
    <!-- 底部提示 -->
    <view class="end">
      <text>我是有底线的！</text>
    </view>
    <!-- 回到顶部 -->
    <view class="goTop icon-top"></view>
  </view>
</template>

<script>
// import Search from '../../components/search.vue'

export default {
	// components:{
	// Search,
	// },
  data () {
    return {

    }
  },
  onLoad () { },
  methods: {
  }
};
</script>

<style lang="scss">
// 首页
.index {
  // 轮播
  .slider {
    swiper,
    image {
      width: 750rpx;
      height: 340rpx;
    }
  }
  // 功能导航
  .navs {
    display: flex;
    padding: 30rpx;
    background: #fff;
    justify-content: space-between;
    navigator {
      width: 128rpx;
      height: 140rpx;
    }
  }

  // 栏目楼层
  .floor {
    .ftitle {
      padding-top: 30rpx;
      background: #f4f4f4;
      image {
        width: 750rpx;
        height: 60rpx;
      }
    }
    // pics
    .fitem {
      padding: 20rpx 16rpx 10rpx;
      overflow: hidden;
      navigator {
        float: left;
        width: 193rpx;
        height: 188rpx;
        margin-left: 10rpx;
        margin-bottom: 10rpx;
      }
      navigator:nth-child(1) {
        width: 232rpx;
        height: 386rpx;
        margin-left: 0;
      }
      navigator:nth-child(2),
      navigator:nth-child(5) {
        width: 273rpx;
        height: 188rpx;
      }
    }
    &:first-child {
      .fitem {
        navigator {
          width: 233rpx;
        }
      }
    }
  }
  .end {
    text-align: center;
    font-size: 24rpx;
    color: #999;
  }
  .goTop {
    position: fixed;
    bottom: 30rpx;
    /* #ifdef H5 */
    bottom: 65px;
    /* #endif */
    right: 30rpx;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 100rpx;
    height: 100rpx;
    font-size: 48rpx;
    color: #666;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.8);
  }
}


</style>
