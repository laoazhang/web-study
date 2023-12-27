import store from '@/store'
// 当使用了之歌自定义指令的标签被渲染的时候就会被执行inserted钩子
// el: 表示的是使用了这个指令的标签
// binding：使用指令的时候传过来的标签
export const imgerror = {
  inserted(el, binding) {
    // img标签有个onerror错误时间，执行时机：当图片加载失败的时候会执行这个onerror时间
    el.onerror = () => {
    // 如果图片加载失败，则执行
      el.src = binding.value
    }
  }
}

export const color = {
  inserted(el, binding) {
    el.style.color = binding.value
  }
}

export const permission = {
  inserted(el, binding) {
    const roles = store.getters.roles
    if (!roles?.points?.includes(binding.value)) {
      el.style.display = 'none'
    }
  }
}
