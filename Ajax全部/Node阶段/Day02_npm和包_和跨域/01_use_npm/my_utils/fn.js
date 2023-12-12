// 防抖函数
function debounce(fn) {
    let timer = null;
    return function () { // 真正事件处理函数, this: 事件触发者(input)
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.call(this) // 事件触发者, 替换到具体逻辑this值上
        }, 1000)
    }
}

// 节流函数
function throttle(fn) {
    return function () { // 真正的事件处理函数 (this: 事件源)
        if (fn.t) return;
        fn.t = setTimeout(() => {
            fn.call(this) // 确保上面函数中this关键字是事件源 (fn()调用, 上面this就变成了window不对了)
            fn.t = null // 置空, 让事件再次触发的时候, 重新创建一个定时器
        }, 500)
    }
}

export default {
    debounce,
    throttle
}