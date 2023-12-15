<template>
  <div class="my-tag">
    <input
      ref="ipt"
      class="input"
      type="text"
      placeholder="输入标签"
      v-if="key"
      @blur="blur"
      v-model="tag"
      @keydown.enter="enter"
    />
    <!-- 业务： -->
    <!--    1、v-model="value"不能直接改：value的值是外面传入，不能违反单向数据流原则 -->
    <!--    2、v-model="自己变量tag"，双击的时候，把value的值赋值给自己变量tag -->
    <!--    3、v-model="自己变量tag" 直接改，按下回车，把确定这个值发信号出去给父级！-->
    <div class="text" v-else @dblclick="edit">{{ value }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tag:"",
      info: "msg",
      key: false,
    };
  },
  methods: {
    edit() {
      this.key = true;

      // 1、获取iniput .focus() 聚焦
      // 2、打补丁完成后，才能获取真实dom节点
      this.$nextTick(() => {
        this.$refs.ipt.focus();
      });

      // 把info的值给自己的变量
      this.tag=this.value
    },
    blur() {
      this.key = false;
    },
    enter(){
        // 定了：
        // 1、输入框
        this.key=false
        // 2、发送给父级
        this.$emit("input",this.tag)
    }
  },
  props:["value"],
  // 形参：接收外面的数据！
  //  传入是简单数据类型
  //  v-model不能直接去修改这个数据
};
</script>

<style lang="less">
.my-tag {
  cursor: pointer;
  .input {
    appearance: none;
    outline: none;
    border: 1px solid #ccc;
    width: 100px;
    height: 40px;
    box-sizing: border-box;
    padding: 10px;
    color: #666;
    &::placeholder {
      color: #666;
    }
  }
}
</style>
