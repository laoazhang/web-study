<template>
  <view>
    <!-- 搜索 -->
    <search />
    <!-- 分类 -->
    <view class="category" v-if="cateList.length">
      <!-- 顶级分类 -->
      <view class="sup">
        <!-- scroll-view ==页面下== 某个区域滚动元素  -->
        <scroll-view scroll-y>
          <!-- 选中的父级分类，动态添加 class="active" -->
          <text
            @click="changeSelected(i)"
            :class="{ active: selected === i }"
            v-for="(parent, i) in cateList"
            :key="parent.cat_id"
            >{{ parent.cat_name }}</text
          >
        </scroll-view>
      </view>
      <!-- 2. 子级分类 -->
      <view class="sub">
        <scroll-view scroll-y>
          <!-- 封面图 -->
          <image
            src="http://static.botue.com/ugo/uploads/category.png"
            class="thumb"
          />
          <view
            class="children"
            v-for="item in childCateList"
            :key="item.cat_id"
          >
            <view class="title">{{ item.cat_name }}</view>
            <!-- 品牌 -->
            <view class="brands">
              <navigator
                :url="`/packone/list/index?query=${it.cat_name}`"
                v-for="it in item.children"
                :key="it.cat_id"
              >
                <image :src="it.cat_icon" />
                <text>{{ it.cat_name }}</text>
              </navigator>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  onLoad() {
    this.getCates()
  },
  data() {
    return {
      // 所有分类数据
      cateList: [],
      // 当前选中父级分类的索引 => 默认选中第一个
      selected: 0,
    }
  },
  computed: {
    // 根据当前选中的selected索引值，计算选中的子集分类数据
    childCateList() {
      return this.cateList[this.selected]?.children
    },
  },
  methods: {
    // 获取所有分类数据
    async getCates() {
      const { data } = await this.request({ url: '/api/public/v1/categories' })
      console.log('所有分类数据', data)
      this.cateList = data
    },
    // 修改当前选中父级分类索引值
    changeSelected(i) {
      this.selected = i
    },
  },
}
</script>

<style scoped lang="scss">
scroll-view {
  height: 100%;
}

.category {
  display: flex;
  width: 100%;
  position: absolute;
  top: 100rpx;
  bottom: 0;

  .sup {
    width: 196rpx;
    background-color: #f4f4f4;

    text {
      display: block;
      height: 100rpx;
      text-align: center;
      line-height: 100rpx;
      font-size: 27rpx;
      color: #333;
      border-bottom: 1rpx solid #eee;

      &:last-child {
        border-bottom: none;
      }

      &.active {
        background-color: #fff;
        color: #ea4451;
        position: relative;

        &::before {
          content: '';
          display: block;
          width: 8rpx;
          height: 60rpx;
          transform: translateY(-50%);
          background-color: #ea4451;

          position: absolute;
          left: 0;
          top: 50%;
        }
      }
    }
  }

  .sub {
    flex: 1;
    padding: 20rpx 18rpx;

    .thumb {
      width: 100%;
      height: 180rpx;
    }

    .children {
      text-align: center;
      color: #333;

      .title {
        display: inline-block;
        margin: 40rpx 0 20rpx;
        font-size: 30rpx;

        &::before {
          content: '/';
          margin-right: 20rpx;
          color: #666;
        }

        &::after {
          content: '/';
          margin-left: 20rpx;
          color: #666;
        }
      }
    }

    .brands {
      display: flex;
      flex-wrap: wrap;

      navigator {
        width: 33%;
        margin-bottom: 20rpx;
      }

      image {
        width: 120rpx;
        height: 120rpx;
      }

      text {
        display: block;
        font-size: 24rpx;
      }
    }
  }
}
</style>
