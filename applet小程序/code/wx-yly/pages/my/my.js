// pages/my/my.js
/**
 * 每个小程序的页面都是通过 ==全局函数Page==，传入对象参数(js逻辑)，初始化页面
 */
console.log('全局',typeof Page);
Page({
  // 定义js逻辑
  // 1. 定义data变量
  data:{
    msg:'hi 小程序',
    bool:true,
    obj:{
      name:'张三',
      say:'15000'
    },
    arr:[1,2,3],
    users: [
      {id:0,name: '小明', age: 16, gender: '男'},
      {id:1,name: '小刚', age: 19, gender: '男'},
      {id:2,name: '小红', age: 18, gender: '女'},
      {id:3,name: '小丽', age: 17, gender: '女'}
    ],
    students: [
      { id: 0, name: 'x1', fs: 95 },
      { id: 1, name: 'x2', fs: 85 },
      { id: 2, name: 'x3', fs: 25 },
  ]
  },
  onLoad(query){
    console.log('标签页接收参数：',query);
  },
  hanlderClick(event){
    console.log('点击了按钮');
    console.log('事件对象',event);
  },
  hanlderFocus(event){
    console.log('输入框获取焦点了');
  },
  // 点击获取当前学生成绩
  getFs(event){
    console.log('点击获取当前学生成绩',event.target.dataset.fs);
    console.log('点击获取当前学生成绩',event.target.dataset.id);
  },
  parFn(){
    console.log('点击了父元素');
  },
  sonFn(){
    console.log('点击了子元素');
  },
  changeData(){
    /**
     * 小程序修改data变量语法：
     * this.setData({变量名：新值1，变量名：新值2，
     * obj.key:新值 => 修改对象里面的值
     * ...
     * })
     */
    console.log('页面实例',this);
    this.setData({
      msg:'hi react',
      bool:false,
      ['obj.say']:20000,
      ['students[1].fs']:100
    })
  }
})