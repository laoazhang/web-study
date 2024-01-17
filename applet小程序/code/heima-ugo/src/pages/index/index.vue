<template>
  <view class="index" :style="{ overflow: 'hidden', height: pageHeight }">
    <!-- 搜索 -->
    <!-- 获取焦点添加=》类名=》focused -->
    <Search @search="disScroll"></Search>
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
        <swiper-item v-for="item in swiperList" :key="item.goods_id">
          <navigator :url="`/packone/goods/index?id=${item.goods_id}`">
            <image :src="item.image_src" />
          </navigator>
        </swiper-item>
      </swiper>
    </view>
    <!-- 功能导航 -->
    <view class="navs">
      <navigator
        :open-type="item.navigator_url ? 'switchTab' : 'navigate'"
        :url="
          item.navigator_url
            ? '/pages/category/index'
            : `/packone/list/index?query=${item.name}`
        "
        v-for="(item, i) in cateList"
        :key="i"
      >
        <image :src="item.image_src" />
      </navigator>
    </view>
    <!-- 栏目楼层 -->
    <view class="floors">
      <!-- 1 -->
      <view class="floor" v-for="(item, i) in floorList" :key="i">
        <!-- title -->
        <view class="ftitle">
          <image :src="item.floor_title.image_src" />
        </view>
        <!-- pics -->
        <view class="fitem">
          <navigator
            :url="`/packone/list/index?query=${prd.name}`"
            v-for="prd in item.product_list"
            :key="prd.name"
          >
            <image :src="prd.image_src" />
          </navigator>
        </view>
      </view>
    </view>
    <!-- 底部提示 -->
    <view class="end">
      <text>我是有底线的！</text>
    </view>
    <!-- 回到顶部 -->
    <view v-if="isShowTop" @click="goTop" class="goTop icon-top"></view>
  </view>
</template>

<script>
// import Search from '../../components/search.vue'
// import request from '@/utils/request.js'

export default {
  // components:{
  // Search,
  // },
  data() {
    return {
      // 存储当前手机屏幕高度  auto是自适应
      pageHeight: 'auto',
      // 轮播图
      swiperList: [],
      // 导航
      cateList: [],
      // 楼层
      floorList: [],
      // 是否显示回顶按钮
      isShowTop: false,
    }
  },
  onLoad() {
    // this.testApi()
    this.getSwiper()
    this.getCate()
    this.getFloor()
  },
  onReachBottom() {
    console.log('页面滚动到底部会执行')
  },
  // 页面向下拖动，松手之后执行
  onPullDownRefresh() {
    // console.log('开始下拉更新 ')
    // 真机中，需要等到三个接口都调用成功，关闭下拉刷新效果
    Promise.all([this.getSwiper(), this.getCate(), this.getFloor()]).then(
      () => {
        // 数组中三个请求都成功后执行
        uni.stopPullDownRefresh()
      }
    )
  },
  // 页面滚动执行
  onPageScroll(e) {
    // console.log('页面滚动高度：', e.scrollTop)
    // 需求：页面滚动高度大于屏幕高度一半的时候，显示回顶按钮，相反不显示
    if (e.scrollTop > uni.getSystemInfoSync().windowHeight / 2) {
      this.isShowTop = true
    } else {
      this.isShowTop = false
    }
  },
  methods: {
    // 点击回到顶部
    goTop() {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      })
    },
    // 搜索时禁止页面滚动
    disScroll(pageHeight) {
      this.pageHeight = pageHeight
    },
    // 获取轮播图数据
    async getSwiper() {
      const { data } = await this.request({
        url: '/api/public/v1/home/swiperdata',
      })
      // console.log('轮播图：', data)
      this.swiperList = data
    },
    // 获取导航
    async getCate() {
      const { data } = await this.request({
        url: '/api/public/v1/home/catitems',
      })
      // console.log('导航：', data)
      this.cateList = data
    },
    // 楼层
    async getFloor() {
      const { data } = await this.request({
        url: '/api/public/v1/home/floordata',
      })
      // console.log('楼层：', data)
      this.floorList = data
    },
    // 测试uni.request请求
    async testApi() {
      // 1. 普通写法
      //   uni.request({
      //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata', //仅为示例，并非真实接口地址。
      //   data: {},
      //   method:'get',
      //   success: (res) => {
      //     console.log("结果：",res);
      //   }
      // })
      // 2. Promise写法
      //  const res = await uni.request({
      //     url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      //   })
      //   console.log("结果：",res)
      // 3. 使用自己封装的request方法发请求
      // const res = await this.request({
      //     url:'/api/public/v1/home/swiperdata',
      //   })
      //   console.log('后台数据',res);
    },
  },
}
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
