<template>
      <!-- @click-left="xxx" -->
  <div class="detail-page">
    <van-nav-bar
      left-text="返回"
      fixed
      title="面经详细"
    />
    <header class="header">
      <h1>{{one.stem}}</h1>
      <p>
        {{one.createdAt}} | {{one.views}} 浏览量 |
        {{one.likeCount}} 点赞数
      </p>
      <p>
        <img :src="one.avatar" alt="" />
        <span>{{one.creator}}</span>
      </p>
    </header>
    <main class="body" v-html="one.content"></main>
    <div class="opt">
      <!-- active： -->
      <!-- 1、看文章有没有被收藏 -->
      <!-- 2、one里面肯定有属性名，识别是否被收藏 -->
      <!-- collectFlag: 0 没有收藏 -->
      <!-- likeFlag: 0 没有点赞 -->

      <!-- 点击请求后台数据 -->
      <van-icon :class="{active:one.likeFlag}" name="like-o" @click="like"/>
      <van-icon :class="{active:one.collectFlag}" name="star-o" @click="collect"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail-page',
  data () {
    return {
      one: {}
    }
  },
  async created () {
    //  3、组件展示出来后：获取id
    const id = this.$route.params.id
    //  4、对应api接口，获取文章详情！把数据渲染到页面！
    const { data } = await this.$axios({
      url: '/interview/show',
      params: {
        id: id
      }
    })
    this.one = data
  },
  methods: {
    like () {
      // 样式：likeFlag取对立面，这是组件，不是页面，不会让当前页面再次刷新
      this.one.likeFlag = !this.one.likeFlag
      this.$axios({
        url: '/interview/opt',
        method: 'POST',
        data: {
          id: this.one.id,
          optType: 1
        }
      })
      // 对当前自己操作的组件内：点赞数量变化
      if (this.one.likeFlag) {
        this.one.likeCount++
      } else {
        this.one.likeCount--
      }
    },
    collect () {
      // 样式：likeFlag取对立面，这是组件，不是页面，不会让当前页面再次刷新
      this.one.collectFlag = !this.one.collectFlag
      this.$axios({
        url: '/interview/opt',
        method: 'POST',
        data: {
          id: this.one.id,
          optType: 2
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.detail-page {
  margin-top: 44px;
  overflow: hidden;
  padding: 0 15px;
  .header {
    h1 {
      font-size: 24px;
    }
    p {
      color: #999;
      font-size: 12px;
      display: flex;
      align-items: center;
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .opt {
    position: fixed;
    bottom: 100px;
    right: 0;
    > .van-icon {
      margin-right: 20px;
      background: #fff;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 50%;
      box-shadow: 2px 2px 10px #ccc;
      font-size: 18px;
      &.active {
        background: #FEC635;
        color: #fff;
      }
    }
  }
}
</style>
