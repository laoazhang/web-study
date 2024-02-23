import type { Http } from 'wechat-http'

// 扩展到全局对象 wx 中调用
declare global {
  namespace WechatMiniprogram {
    interface Wx {
      http: Http
    }
  }
}

// 返回数据的类型 - <用户自定义业务接口类型>
declare module 'wechat-http' {
  export interface ResponseResultData<T = any> {
    code: number
    message: string
    data: T
  }
}