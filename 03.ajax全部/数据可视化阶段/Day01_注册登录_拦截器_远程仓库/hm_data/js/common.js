// 上面这个代码处理过度动画（默认加上不用管）
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('sidenav-pinned')
    document.body.classList.add('ready')
  }, 200)
})

axios.defaults.baseURL = 'http://ajax-api.itheima.net'

// axios请求拦截器(本质上就是一个函数)
// 作用: 请求之前可以对本次请求做一些"前置处理"
// 执行: 会在axios()方法被调用后, 请求发起之前, 执行此函数
// 场景: 可以统一携带一些参数(例如请求头+token)
// 语法:
/**
 * axios.interceptors.request.use((config) => {
 *  // config本次请求相关的所有配置
 *
 *  // 必须return config 交给axios内, 进行请求
 * }, (err) => {
 *  // 请求之前, 有错误的时候会进这里(一般不用管)
 *  return Promise.reject(err)
 * })
 */
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 要统一携带请求头
    let token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = token
    }

    // return到axios源码内, 会影响发起请求的相关参数
    return config;
}, function (error) {
    // 对请求错误做些什么
    // return到请求发起的地方(逻辑页面)
    return Promise.reject(error);
    // 等同于
    /**
     * return new Promise((resolve, reject) => {
     *   reject(error)
     * })
     *
     */
});

// axios响应拦截器(函数)
// 作用: 响应后来做一些"后置处理"
// 执行: 请求发起后, 响应回来后, 此函数执行
// 场景: 统一判断401问题, 把axios结果对象剥离一层data
// 语法:
axios.interceptors.response.use(function (response) {
    // http响应状态码为2xx, 3xx进入这里
    // response: 就是axios封装结果对象
    // 我把后台返回的真正数据剥离出来, 直接返回逻辑页面
    // 逻辑页面就可以少.一层data了
    // console.log(response);

    // 它会返回到本次axios请求的地方(作为Promise对象成功的结果)
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    // http响应状态码为4xx, 5xx进入这里
    // 在token过期时(后端判断的), 后端返回响应状态码401, 进入此函数
    if (error.response.status === 401) {
        // 被动-退出登录
        localStorage.clear()
        location.href = './login.html'
    }

    return Promise.reject(error);
});
