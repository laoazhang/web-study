<template>
  <div>
    <h1>{{ title }}</h1>
    <h3>{{ channel }}</h3>
    <button @click="edit">编辑</button>
    <div>标题：<input type="text" v-model="my_title" /></div>
    <div>频道：<input type="text" v-model="my_channel" /></div>
    <button @click="cancel">取消</button>
    <button @click="sure">确认</button>
  </div>
</template>

<script>
// 编辑分析：
//     1、注册点击事件
//     2、点击后？上面xxx标题 和 频道 会来到 下面的输入框内！
//     3、xxx标题 和 频道 数据：不能写死！就初始化数据设置为变量！

// 输入框分析
//    1、输入数据，操作数据
//    2、如何操作数据？得有数据赋值到变量上！

export default {
  data() {
    return {
      //上面的数据
      title: "这是一个标题",
      channel: "这是一个频道",
      //表单数据
      my_title: "",
      my_channel: "",
    };
  },
  methods: {
    edit() {
      // 点击后：上面的数据要来到下面表单
      //      方式1：   v-model="title"   不行！不是需求！
      //      方式2：   两组变量：上面数据  赋值 给 下面变量！
      this.my_title = this.title;
      this.my_channel = this.channel;
    },
    sure() {
      // 把输入框数据 2组数据 ----->设置给上面
      (this.title = this.my_title),
      (this.channel = this.my_channel),
      // 同时：下面2组数据清空
      (this.my_title = ""),
      (this.my_channel = "");
    },
    cancel() {
      // 输入框数据清空，
      (this.my_title = ""),
      (this.my_channel = "");
    },
  },
};
</script>

<style>
</style>