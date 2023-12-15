<template>
  <section class="todoapp">
    <!-- 头部：输入框 -->
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        placeholder="输入新计划"
        autofocus
        @keydown.enter="add"
        v-model.trim="name"
      />
    </header>

    <!-- 列表： -->
    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox" v-model="ck"/>
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <todo
          v-for="item in show"
          :key="item.id"
          :item="item"
          @aaa="del"
        ></todo>
      </ul>
    </section>

    <!-- 底部：状态栏 -->
    <footer class="footer">
      <span class="todo-count"
        >剩余<strong>{{ last }}</strong
        >未完成
      </span>
      <ul class="filters">
        <li>
          <a :class="{selected:status=='all'}" href="#/" @click="select('all')">全部</a>
        </li>
        <li>
          <a :class="{selected:status=='none'}" href="#/active" @click="select('none')">未完成</a>
        </li>
        <li>
          <a :class="{selected:status=='done'}" href="#/completed" @click="select('done')">已完成</a>
        </li>
      </ul>
      <button class="clear-completed" @click="clear">清除已完成</button>
    </footer>
  </section>
</template>

<script>
import "./todos.css"; // 导入css模块！
import todo from "./components/todu.vue";
export default {
  data() {
    return {
      list: JSON.parse(localStorage.getItem("todos")) || [],
      name: "",
      status:"all"
    };
  },
  // 局部注册组件
  components: {
    todo,
  },
  methods: {
    // 收信号：id,去下标，进行删除
    del(id) {
      let i = this.list.findIndex((ele) => ele.id === id);
      this.list.splice(i, 1);
    },
    add() {
      if (this.name == "") {
        return;
      }
      // 1、准备对象：id name isDone
      let one = {
        id: Math.random(),
        name: this.name,
        isDone: false,
      };
      // 2、对象添加到数组
      this.list.push(one);

      // 3、对象置为空
      this.name = "";
    },
    clear(){
      // 把没有完成的筛选，赋值给this.list
      this.list = this.list.filter(ele=>ele.isDone==false)
    },
    select(status){
      this.status = status
    }
  },
  watch: {
    list:{
      deep:true,
      handler(){
      localStorage.setItem("todos", JSON.stringify(this.list));
      }
    }
  },
  computed: {
    last() {
      // 筛选没有完成数组的长度
      return this.list.filter((ele) => ele.isDone == false).length;
    },
    // 大小选
    ck:{
      get(){
            return this.list.every(ele=>ele.isDone==true)
          },
      set(val){
        this.list.forEach(ele=>ele.isDone=val)
      }
    },
    show(){
      let arr;
      switch(this.status){
        case 'all':
          arr = this.list;
          break;
        case 'none':
          arr=this.list.filter(ele=>ele.isDone==false);
          break;
        case 'done':
          arr=this.list.filter(ele=>ele.isDone==true);
          break;
      }
      return arr;
    }
  },
};
</script>

<style scoped>
</style>