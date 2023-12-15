<template>
  <div class="score-case">

    <div class="table">
      <table>

        <thead>
          <tr>
            <th>编号</th>
            <th>科目</th>
            <th>成绩</th>
            <th>考试时间</th>
            <th>操作</th>
          </tr>
        </thead>

        <!-- list.length!==0  -->
        <tbody v-if="list.length">
          <tr v-for="(item,i) in list" :key="item.id">
            <td>{{i+1}}</td>
            <td>{{item.subject}}</td>
            <td class="red">{{item.score}}</td>
            <td>{{ time(item.date) }}</td>
            <td>
              <a href="#" @click="del(item.id)">删除</a>
            </td>
          </tr>
          
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="5">
              <span class="none">暂无数据</span>
            </td>
          </tr>
        </tbody>


        <tfoot>
          <tr>
            <td colspan="5">
              <span>总分：{{zongf}}</span>
              <span style="margin-left:50px">平均分：{{junf}} | {{zongf/list.length}} </span>
            </td>
          </tr>
        </tfoot>


      </table>
    </div>

    <div class="form">
      <div class="form-item">
        <div class="label">科目：</div>
        <div class="input">
          <input type="text" placeholder="请输入科目" v-model="subject" />
        </div>
      </div>
      <div class="form-item">
        <div class="label">分数：</div>
        <div class="input">
          <input type="text" placeholder="请输入分数" v-model.number="score" />
        </div>
      </div>
      <div class="form-item">
        <div class="label"></div>
        <div class="input">
          <button class="submit" @click="add">添加</button>
        </div>
      </div>
    </div>

    <div>
      <button @click="change">把第一科 分数随机变化</button>
    </div>

  </div>
</template>

<script>

// npm i moment
import moment from "moment"; // 把下载包从node_modules找到包
export default {
  name: 'ScoreCase',
  data () {
    return {
      list: JSON.parse(localStorage.getItem("list")) || [],  // 获取数据！

      // 为了新增
      subject: '',
      score: ''
    }
  },
  methods:{
    // 新增：
    //     1、用户点按钮，注册事件！
    //     2、点击后：用户输入的信息拿得到！v-model="变量"  data里面得有变量！
    add(){
      // console.log(this.score,this.subject);
      if (this.score==""||this.subject=="") {
        alert("输入不能为空")
        return;
      }

      //  3.数据拿到后：准备下，进入list数组内！
      //     进入之前，变成和list数组内其他成员一样模样！
      let one = {
        id: Math.random(),   //  最后的id + 1
        subject: this.subject, 
        score: this.score, 
        date: new Date()
      };
      this.list.push(one);

      // 置空
      this.score="";
      this.subject="";


      // 存入本地：
      // localStorage.setItem("list",JSON.stringify(this.list));
    },


    // 删除：
    //     1、注册点击事件
    //     2、目标：点击某个删除，删除对应数据！找个对应！
    //        找个对应？函数传入id值
    //     3、真实：id------>传入后台，前端重新加载列表！
    //        模拟：前端拿到id，自己删除数组某个成员！
    //              splice(下标,1) :  找有id这个数据 ---->对应的下标
    del(id){
      // 对应的下标：把数组遍历下，看哪个成员的id==点击这个id，那么该成员下标就是对应下标！
      // 把数组方法熟练 map find findIndex filter reduce every some sort splice
      // let i = this.list.findIndex(item=>item.id===id);

      // ==:先判断类型，在判断值  
      // ===：如果类型不同，直接false
      let i;
      this.list.forEach((item,index)=>{
        if (item.id==id) {
          i = index;  // 找对应下标
        }
      });


      // 4、数组删除该成员
      this.list.splice(i,1);


      // 存入本地：
      // localStorage.setItem("list",JSON.stringify(this.list));
    },



    // 时间处理：
    //     1、JS函数方法：moment(xxx).format('YYYY-MM-DD HH:mm:ss')
    //     2、代码只能写在某个作用域范围内！
    //     3、moment(?)：不能写死专门处理某个时间字符串，处理每一个的字符串
    //     注意： {{ 变量、  表达式、  自己下面定义函数(实参)   }}
    time(str){
      return moment(str).format('YYYY-MM-DD HH:mm:ss');  // 处理完成！
    },


    // 模拟：只是去变化第一科的成绩用于模拟编辑，
    //     操作算不算改变list? 算！
    //     侦听器？没起作用！
    change(){
      this.list[0].score = Math.floor(Math.random()*100);
    }


  },
  // 
  computed:{
    zongf(){
      // 分数求和  reudce复习
      return this.list.reduce((sum,item)=>sum+=item.score,0);
    },
    junf(){
      return this.zongf/this.list.length;
    },
 
  },

  // 需求：数据本地化！
  //       data里面list存入到本地电脑！
  //       list变化的时候：需要再次把本地local数据同步！
  //       知道list变化？新增！删除！  ----->  把list数据存入本地！
  //       新增！删除！编辑导致list发生变化！
  //                现在：本地存储代码得写三个地儿！
  //                假设：每次变化后list 传入后台！axios代码写三个地儿！（代码维护性不好！）

  // 解决： 1、 简单：单独封装函数，在用到地方去进行调用！
  //       2、 侦听器：去侦听数据的变化，当数据发生变化的时候，去执行某些业务代码！
  //              watch： 侦听data/computed内属性名
  //              函数作用：当数据发生变化的时候，去执行某些业务代码！
  watch:{  
    // ********  简单写法：侦听简单数据类型 score
    // list(newval,oldval){  // newval：变化后值，oldval变化前的值 一般不用，可以删除！
    // }

    // ********  完整写法：侦听复杂数据类型 list
    list:{
      deep:true,  // deep固定单词，对复杂数据 深度监听（数量、数据内部变化都能监听到！）
      handler(){   // handler固定单词：操作器， 当数据变化时，执行哪个函数！
        // console.log(1);
        localStorage.setItem("list",JSON.stringify(this.list));
      },
      // immediate:true,  // immediate:是否让上面handler在组件加载完成后立马先执行一次？
    }
  }


  // 


};
</script>

<style lang="less">
// demo148：没动！
//     npm i less less-loader@7.2.1 -D 
//     脚手架项目：0 webpack配置，自动配置！

.score-case {
  width: 1000px;
  margin: 50px auto;
  display: flex;
  .table {
    flex: 4;
    table {
      width: 100%;
      border-spacing: 0;
      border-top: 1px solid #ccc;
      border-left: 1px solid #ccc;
      th {
        background: #f5f5f5;
      }
      tr:hover td {
        background: #f5f5f5;
      }
      td,
      th {
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #ccc;
        text-align: center;
        padding: 10px;
        &.red {
          color: red;
        }
      }
    }
    .none {
      height: 100px;
      line-height: 100px;
      color: #999;
    }
  }
  .form {
    flex: 1;
    padding: 20px;
    .form-item {
      display: flex;
      margin-bottom: 20px;
      align-items: center;
    }
    .form-item .label {
      width: 60px;
      text-align: right;
      font-size: 14px;
    }
    .form-item .input {
      flex: 1;
    }
    .form-item input,
    .form-item select {
      appearance: none;
      outline: none;
      border: 1px solid #ccc;
      width: 200px;
      height: 40px;
      box-sizing: border-box;
      padding: 10px;
      color: #666;
    }
    .form-item input::placeholder {
      color: #666;
    }
    .form-item .cancel,
    .form-item .submit {
      appearance: none;
      outline: none;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 4px 10px;
      margin-right: 10px;
      font-size: 12px;
      background: #ccc;
    }
    .form-item .submit {
      border-color: #069;
      background: #069;
      color: #fff;
    }
  }
}
</style>