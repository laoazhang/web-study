<template>
  <div class="like-page">
    <van-nav-bar fixed title="我的点赞" />
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
  name: 'like-page',
  data () {
    return {
      page: 1,
      list: [],
      loading: false, // 某次的数据是否正在加载
      finished: false // 全部数据是否加载完成

    }
  },
  methods: {
    async onLoad () {
      // 1、不能让onLoad初始化的时候执行！组件加  :immediate-check="false"
      // 2、滑到底部？请求下一页
      this.page++
      const { data } = await this.$axios({
        url: '/interview/opt/list',
        params: {
          page: this.page,
          optType: 2
        }
      })
      // 3、list初始化created有数据的！把后面新数据，和前旧数据拼接累加一起！
      // concat
      // this.list = this.list.concat(data.rows)
      this.list.push(...data.rows)
      // 4、需要配置loading：加载中，请求新的数据后，加载完毕！
      this.loading = false

      // 5、判断是否全部加载完毕
      if (this.page === data.pageTotal) {
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
        url: '/interview/opt/list',
        params: {
          page: this.page,
          optType: 1
        }
      })
      this.list = data.rows
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
.like-page {
  margin-bottom: 50px;
  margin-top: 44px;
}
</style>
