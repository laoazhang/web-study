<script setup lang="ts">
import RoomStatus from './components/RoomStatus.vue'
import RoomAction from './components/RoomAction.vue'
import RoomMessage from './components/RoomMessage.vue'
// 导入socket.io插件
import { io, type Socket } from 'socket.io-client'
import { baseURL } from '@/utils/request'
import { useUserStore } from '@/stores'
import { useRoute } from 'vue-router'
import { onMounted, nextTick } from 'vue'
import { onUnmounted } from 'vue'
import type { Message, TimeMessages } from '@/types/room'
import { ref } from 'vue'
import { MsgType, OrderType } from '@/enums'
import { getConsultOrderDetail } from '@/api/consult'
import type { ConsultOrderItem, Image } from '@/types/consult'
import { provide } from 'vue'

/**
 * 1.初始化创建ws长连接(打电话)
 *    1. 通过io函数传入后台ws连接地址和相关参数(token、orderId)
 *    2. 通过io实例的error事件,监听连接错误
 *    3. 通过io实例的disconnect事件，监听连接断开
 */
// 存储socket实例
let socket: Socket
// 聊天列表
const list = ref<Message[]>([])
const store = useUserStore()
const route = useRoute()
const initSocket = () => {
  // 1. 建立连接
  socket = io(baseURL, {
    auth: {
      token: `Bearer ${store.user.token}`
    },
    query: {
      orderId: route.query.orderId
    }
  })
  // end
  socket.on('connect', () => {
    console.log('浏览器和ws服务器建立连接成功！')
  })
  socket.on('error', (error) => {
    console.log('出错了！', error)
  })
  socket.on('disconnect', () => {
    console.log('浏览器和ws服务器断开连接成功！')
  })

  // 1. 接收ws服务器给浏览器(患者端)发送默认数据
  // 说明：{data}:{data添加类型}
  socket.on('chatMsgList', ({ data }: { data: TimeMessages[] }) => {
    console.log('建立连接后,返回默认数据：', data)
    const result: Message[] = []
    data.forEach((item) => {
      // 1. 发送消息的时间放入到result中
      result.push({
        id: item.createTime,
        msgType: MsgType.Notify, // 决定使用哪个消息卡片
        createTime: item.createTime,
        msg: {
          content: item.createTime
        }
      })
      // 2. 把items的消息放入result中
      result.push(...item.items)
    })

    // 把处理号的消息列表追加到list
    list.value.push(...result)
    console.log('最终默认消息列表：', list.value)
  })

  // 2. 接收医生回复的消息
  socket.on('receiveChatMsg', async (msg) => {
    console.log('收消息', msg)
    list.value.push(msg)
    // 说明：list消息列表更新后，直接滚动会失效
    // 原因？：改了数据之后dom的更新是同步还是异步？异步的
    // 解决：等到异步更新结束，在执行滚动=>vue2：this.$nextTick(cb) | vue3: nextTick()
    await nextTick()
    // 每次收到消息后，滚动到最底部
    // window.scrollTo滚动到聊天列表最底部
    window.scrollTo(0, document.body.scrollHeight)
    console.log('消息', list.value)
  })

  // 3. 接收订单变化消息
  socket.on('statusChange', () => {
    // 重新获取订单详情信息
    getOrderDetail()
    console.log('订单更新了！')
  })
}
onMounted(() => {
  // 组件挂载建立连接
  initSocket()
})

onUnmounted(() => {
  //组件销毁关闭连接
  socket.close()
})

// 2. 发送文字消息 => 父组件中使用socket.emit方法把聊天文字发送给ws服务器 => 下发聊天内容 => 给医生
const consult = ref<ConsultOrderItem>()
const getOrderDetail = async () => {
  const { data } = await getConsultOrderDetail(route.query.orderId as string)
  console.log('订单详情：', data)
  consult.value = data
}
onMounted(() => {
  getOrderDetail()
})
const sendText = (text: string) => {
  console.log('文字消息内容：', text)
  // 通过socket.emit('')方法发消息给医生(需要ws服务器中转)
  socket.emit('sendChatMsg', {
    from: store.user.id, //发消息的人ID => 登录人的ID
    to: consult.value?.docInfo?.id, // 接收消息的人 => 接诊的医生
    msgType: MsgType.MsgText, // 消息类型：文字消息
    msg: {
      content: text
    }
  })
}

// 3. 发送图片消息
const sendImg = (img: Image) => {
  socket.emit('sendChatMsg', {
    from: store.user.id, //发消息的人ID => 登录人的ID
    to: consult.value?.docInfo?.id, // 接收消息的人 => 接诊的医生
    msgType: MsgType.MsgImage, // 消息类型：文字消息
    msg: {
      picture: img
    }
  })
}

// 4.注入订单详情数据
// 异步数据一定要注入响应式的
// 问题：注入的时候consult.value 不是响应式的 => 需要注入consult响应变量
provide('consult', consult)

// 评价成功，修改评价消息状态和数据，切换卡片展示
const completeEva = (score: number) => {
  // 获取评价信息数据
  const item = list.value.find((item) => item.msgType === MsgType.CardEvaForm)
  if (item) {
    // 更新分数
    item.msg.evaluateDoc = { score }
    // 更新类型为已评价
    item.msgType = MsgType.CardEva
  }
}
provide('completeEva', completeEva)
</script>

<template>
  <div class="room-page">
    <cp-nav-bar title="医生问诊室" />
    <!-- 1. 问诊状态：未接诊、咨询中、问诊结束-->
    <room-status :status="consult?.status" :countdown="consult?.countdown" />
    <!-- 2. 问诊聊天列表消息 咨询中的医生和患者聊天的内容(列表)-->
    <room-message :list="list" />
    <!-- 3. 底部操作栏：发消息 -->
    <room-action
      :disabled="consult?.status !== OrderType.ConsultChat"
      @send-text="sendText"
      @send-img="sendImg"
    />
  </div>
</template>
<style lang="scss" scoped>
.room-page {
  padding-top: 90px;
  padding-bottom: 60px;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: var(--cp-bg);
  .van-pull-refresh {
    width: 100%;
    min-height: calc(100vh - 150px);
  }
}
</style>
