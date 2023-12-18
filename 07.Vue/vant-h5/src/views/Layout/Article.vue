<template>
  <div class="article-page">
    <nav class="my-nav van-hairline--bottom">
      <a
        href="javascript:;"
        :class="{active:sorter==='weight_desc'}"
        @click="change('weight_desc')"
        >推荐</a
      >
      <a
        href="javascript:;"
        :class="{active:sorter===null}"
        @click="change(null)"
        >最新</a
      >
      <div class="logo"><img src="@/assets/logo.png" alt=""></div>
    </nav>

    <!-- 分页加载 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
    <hm-item v-for="item in list" :key="item.id" :item="item"></hm-Item>
</van-list>

  </div>
</template>

<script>
import HmItem from '@/components/item.vue'
export default {
  name: 'article-page',
  data () {
    return {
      current: 1,
      // tab栏央视切换：需要变量标识sorter
      //    weight_desc : 推荐
      //    null :  最近
      sorter: 'weight_desc',
      list: [],
      loading: false, // 某次的数据是否正在加载
      finished: false // 全部数据是否加载完成

    }
  },
  methods: {
    async onLoad () {
      // 1、不能让onLoad初始化的时候执行！组件加  :immediate-check="false"
      // 2、滑到底部？请求下一页
      this.current++
      const { data } = await this.$axios({
        url: '/interview/query',
        params: {
          current: this.current,
          sorter: this.sorter
        }
      })
      // 3、list初始化created有数据的！把后面新数据，和前旧数据拼接累加一起！
      // concat
      // this.list = this.list.concat(data.rows)
      this.list.push(...data.rows)
      // 4、需要配置loading：加载中，请求新的数据后，加载完毕！
      this.loading = false

      // 5、判断是否全部加载完毕
      if (this.current === data.pageTotal) {
        this.finished = true // 全部加载完成
      }
    },
    // 初始化数据
    async init () {
      // 参数说明：
    //     1、current：看第几页的数据  381条、每页10条  39页！
    //     2、sorter：去决定显示 推荐？最新的数据？
    // 参数位置：为什么放在初始化里面？不直接放在请求数据参数里面？
    //     后面会有业务，滑到底加载下一页数据，1---->2 可变！
    //     推荐？最新？用户点击进行切换，'weight_desc' 字符串也得变！
    //     放在初始化数据里面：变量！
      const { data } = await this.$axios({
        url: '/interview/query',
        params: {
          current: this.current,
          sorter: this.sorter
        }
      })
      this.list = data.rows
    },
    change (key) {
      // 把标识就换了：样式切换、数据切换
      this.sorter = key
      // 必要数据重置：
      this.list = [] // 数组情况
      this.current = 1 // 重新开始
      this.finished = false // 是否全部完成
      // 重新请求数据
      this.init()
    }
  },
  components: {
    HmItem
  },
  // 数据初始化
  created () {
    // 初始化数据
    this.init()
  }
}
</script>

<style lang="less" scoped>
.article-page {
  margin-bottom: 50px;
  margin-top: 44px;
  .my-nav {
    height: 44px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 999;
    background: #fff;
    display: flex;
    align-items: center;
    > a {
      color: #999;
      font-size: 14px;
      line-height: 44px;
      margin-left: 20px;
      position: relative;
      transition: all 0.3s;
      &::after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        width: 0;
        height: 2px;
        background: #222;
        transition: all 0.3s;
      }
      &.active {
        color: #222;
        &::after {
          width: 14px;
        }
      }
    }
    .logo {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      > img {
        width: 64px;
        height: 28px;
        display: block;
        margin-right: 10px;
      }
    }
  }
}
.article-item {
  .head {
    display: flex;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
    .con {
      flex: 1;
      overflow: hidden;
      padding-left: 10px;
      p {
        margin: 0;
        line-height: 1.5;
        &.title {
          width: 280px;
        }
        &.other {
          font-size: 10px;
          color: #999;
        }
      }
    }
  }
  .body {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    margin-top: 10px;
  }
  .foot {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }
}
</style>
