import { defineStore } from 'pinia'
import { ref } from 'vue'
// type 指明导入的是ts的类型
import type { User } from '@/types/user'

/**
 * 用户store：存储登录用户相关数据
 */
export const useUserStore = defineStore(
  'cp-user',
  () => {
    // 全局变量1：登录用户
    // 空对象的变量通过 as断言指定类型
    const user = ref({} as User)

    // 方法：
    // 1. 存储用户信息 => 登录成功
    const setUser = (userData: User) => {
      user.value = userData
    }

    // 测试
    const xiao = ref(1)
    const cg = (val: number) => {
      xiao.value = val
    }

    // 2. 删除用户信息 => 退出登录
    const delUser = () => {
      user.value = {} as User
    }

    // 返回变量和方法
    return {
      user,
      setUser,
      delUser,
      xiao,
      cg
    }
  },
  // 方式1：默认存储所有数据，以store的ID作为存储的key
  // {
  //   persist: true // 开启数据持久化
  // }
  // 方式2：自定义存储的key，指定存储那些数据
  {
    persist: {
      key: 'cp-user-test',
      paths: ['user'] // 数组内放入的变量名都会持久化存储
    }
  }
)
