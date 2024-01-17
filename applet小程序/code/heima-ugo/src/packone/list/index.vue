<template>
  <view>
    <!-- 筛选 -->
    <view class="filter">
      <text class="active">综合</text>
      <text>销量</text>
      <text>价格</text>
    </view>
    <!-- 商品列表 -->
    <scroll-view @scrolltolower="getMore" class="goods" scroll-y>
      <view
        class="item"
        @click="goDetail(item.goods_id)"
        v-for="item in list"
        :key="item.goods_id"
      >
        <!-- 商品图片 -->
        <image class="pic" :src="item.goods_small_logo" />
        <!-- 商品信息 -->
        <view class="meta">
          <view class="name">{{ item.goods_name }}</view>
          <view class="price">
            <text>￥</text>{{ item.goods_price }}
            <text>.00</text>
          </view>
        </view>
      </view>
      <!-- 数据加载完成提示 -->
      <view class="nomore" v-if="hasMore">没有更多了...</view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  // onReachBottom() {
  //   console.log('页面滚动到底部会执行')
  // },

  onLoad(params) {
    this.query.query = params.query
    this.getList(this.query)
  },
  data() {
    return {
      // 商品搜索列表
      list: [],
      // 商品总数
      total: 0,
      query: {
        query: '', // 查询的关键词
        pagenum: 1, // 查询页码
        pagesize: 20, // 查询每页数量
      },
    }
  },
  computed: {
    // 是否还有数据：true 没有数据了 | false 还有数据
    hasMore() {
      return this.total === this.list.length
    },
  },
  methods: {
    getMore() {
      // 商品列表滚动到底部触发执行 => 加载下一页数据
      console.log('触底了')
      /**
       * 判断数据是否加载完
       * 2. 没有加载完 => 页码+1，重新发送下一页数据，追加到列表
       */
      if (this.hasMore) return
      this.query.pagenum++
      this.getList(this.query)
    },
    async getList(params) {
      const { data } = await this.request({
        url: '/api/public/v1/goods/search',
        data: params,
      })
      console.log('商品搜索列表数据', data)
      this.total = data.total
      // 追加当前的数据
      this.list.push(...data.goods)
    },
    goDetail(id) {
      uni.navigateTo({
        url: `/packone/goods/index?id=${id}`,
      })
    },
  },
}
</script>

<style scoped lang="scss">
.nomore {
  font-size: 32rpx;
  margin: 30rpx auto;
  text-align: center;
  color: #ddd;
}
.filter {
  display: flex;
  height: 96rpx;
  line-height: 96rpx;
  border-bottom: 1rpx solid #ddd;

  /* #ifdef H5 */
  position: relative;
  z-index: 99;
  /* #endif */

  text {
    flex: 1;
    text-align: center;
    font-size: 30rpx;
    color: #333;

    &.active {
      color: #ea4451;
    }
  }
}

.goods {
  position: absolute;
  width: 100%;
  top: 97rpx;
  bottom: 0;
}

.item {
  display: flex;
  padding: 30rpx 20rpx 30rpx 0;
  margin-left: 20rpx;
  border-bottom: 1rpx solid #eee;

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
}
</style>
