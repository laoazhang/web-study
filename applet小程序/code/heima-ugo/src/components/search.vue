<script>
import { source } from '@dcloudio/vue-cli-plugin-uni/packages/postcss/tags'

export default {
  /**
   * 需求：搜索状态切换 =>
   * 1. 用户点击搜索输入框，输入框获取焦点，进入到搜索状态
   * 2. 用户点击取消按钮，退出搜索状态
   */
  data() {
    return {
      // 是否进入搜索状态
      isSearch: false,
      // 关键词
      keyWord: '',
      // 建议商品列表
      suggestList: [],
      // 定时器ID
      timer: null,
      // 搜索历史记录
      history: uni.getStorageSync('history') || [],
    }
  },
  watch: {
    history(newValue) {
      // 监听history变化 => 数据发生变化执行本地存储
      uni.setStorageSync('search-history', this.history)
    },
  },
  methods: {
    // 清除搜索历史
    clearHistory() {
      this.history = []
      uni.removeStorageSync('history')
    },
    // 输入完关键词以后，跳转到搜索结果页面
    goList() {
      if (!this.keyWord) return
      uni.navigateTo({
        url: `/packone/list/index?query=${this.keyWord}`,
      })
      //存储搜索历史记录 => 把this.keyWord存到一个数组中，本地需要持久化(注意排重)
      /**
       * this.history.push(this.keyWord)
      // 去重
      this.history = [...new Set(this.history)]
       */
      if (!this.history.some((item) => item === this.keyWord)) {
        this.history.push(this.keyWord)
      }
    },
    // 用户输入期间，调用api接口获取建议商品列表数据
    getSuggestList() {
      /**
       * 1. 判断关键词是否为空, 为空就return
       * 2. 发送请求获取建议商品列表数据
       * 防抖好处：
       * 1. 减轻服务器的压力
       * 2. 提升前端渲染性能
       */
      // 说明：每次执行的时候判断定时器ID是否存在，如果存在，就会清除上一次的定时器任务
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        // 如果输入为空，清空上一次建议商品列表
        if (!this.keyWord) return (this.suggestList = [])
        const { data } = await this.request({
          url: '/api/public/v1/goods/qsearch',
          data: {
            query: this.keyWord,
          },
        })
        this.suggestList = data
        // console.log('建议商品列表数据', data)
      }, 600)
    },
    // 1. 进入搜索状态
    goSearch() {
      this.isSearch = true
      // 进入搜索状态后，getStstemInfoSync计算手机屏幕高度，然后传给父页面控制高度，防止滚动
      const pageHeight = uni.getSystemInfoSync().windowHeight + 'px'
      uni.hideTabBar({ animation: true }) // 隐藏tabBar
      this.$emit('search', pageHeight)
    },
    exitSearch() {
      this.isSearch = false
      uni.showTabBar({ animation: true }) // 显示tabBar
      this.$emit('search', 'auto')
      this.keyWord = ''
    },
  },
}
</script>

<template>
  <view class="search" :class="{ focused: isSearch }">
    <!-- 1. 搜索区域 -->
    <view class="sinput">
      <input
        @focus="goSearch"
        v-model="keyWord"
        @input="getSuggestList"
        @confirm="goList"
        type="text"
        placeholder="搜索"
      />
      <button @click="exitSearch">取消</button>
    </view>
    <!-- 2. 搜索状态显示=》下边内容 -->
    <view class="scontent" v-show="isSearch">
      <!-- 1. 搜索历史记录 -->
      <!-- vue空标签：template，不会渲染任何元素，可以作为包裹多个结构做条件渲染 -->
      <template v-if="suggestList.length === 0">
        <div class="title">
          搜索历史
          <span class="clear" @click="clearHistory"></span>
        </div>
        <!-- 搜索历史 -->
        <div class="history">
          <navigator
            :url="`/packone/list/index?query=${this.keyWord}`"
            v-for="(item, i) in history"
            :key="i"
            >{{ item }}</navigator
          >
        </div>
      </template>
      <!-- 2. 搜索建议商品 -->
      <scroll-view scroll-y class="result" v-else>
        <navigator
          :url="`/packone/goods/index?id=${item.id}`"
          v-for="item in suggestList"
          :key="item.goods_id"
          >{{ item.goods_name }}</navigator
        >
      </scroll-view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
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
      content: '';
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
