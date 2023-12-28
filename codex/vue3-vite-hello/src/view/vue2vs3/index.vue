<!-- <template>
  <button @click="toggle">显示隐藏图片</button>
  <img v-show="show" alt="Vue logo" src="/src/assets/vue.svg" />
  <hr />
  计数器：{{ count }} <button @click="increment">累加</button>
</template>
<script>
export default {
  // 选项式api（option api）实现
  // vue3向下兼容的=》兼容大部分vue2写法
  data() {
    return {
      show: true,
      count: 0,
    };
  },
  methods: {
    toggle() {
      this.show = !this.show;
    },
    increment() {
      this.count++;
    },
  },
};
</script> -->

<template>
  <button @click="toggle">显示隐藏图片</button>
  <!-- / 指向项目根目录 -->
  <img v-show="show" alt="Vue logo" src="/public/vite.svg" />
  <hr />
  计数器：{{ count }} <button @click="increment">累加</button>
</template>
<script>
// 组合式api(composition api)实现
// ref 就是一个组合式API  
import { ref } from 'vue';
export default {
  setup () {
    // vue3所有代码都放到这里写
    // 显示隐藏
    const show = ref(true)
    const toggle = () => {
      show.value = !show.value
    }
    // 计数器
    const count = ref(10)
    const increment = () => {
      count.value ++
    }

    return { show, toggle, count, increment }
  }
};
</script>