<script setup lang="ts">
import { evaluateConsultOrder } from '@/api/consult'
import type { ConsultOrderItem } from '@/types/consult'
import type { EvaluateDoc } from '@/types/room'
import { showToast } from 'vant'
import type { Ref } from 'vue'
import { inject } from 'vue'
import { computed } from 'vue'
import { ref } from 'vue'

defineProps<{
  // 接收评价数据：存在说明评价过，相反没有
  evaluateDoc?: EvaluateDoc
}>()
// 说明❓：Ref<type> 指定类型为Ref，提交时才可以使用.value访问变量
const consult = inject<Ref<ConsultOrderItem>>('consult')
const completeEva = inject<(score: number) => void>('completeEva')

const score = ref(0)
const anonymousFlag = ref(false)
const content = ref('')
const disabled = computed(() => !score.value || !content.value)

// 提交评价
const onSubmit = async () => {
  console.log('清单详情：', consult)
  if (!consult?.value) return showToast('未找到订单')
  if (consult.value.docInfo?.id) {
    await evaluateConsultOrder({
      docId: consult.value.docInfo.id, // 医生ID
      orderId: consult.value.id, // 订单ID
      score: score.value,
      content: content.value,
      anonymousFlag: anonymousFlag.value ? 1 : 0
    })
  }
  // 修改消息：评价请求成功，改成已评价
  completeEva && completeEva(score.value)
}
</script>

<template>
  <!-- 1. 已经评价过 -->
  <div class="evalutate-card" v-if="evaluateDoc">
    <p class="title">医生服务评价</p>
    <p class="desc">我们会更加努力提升服务质量</p>
    <van-rate
      :modelValue="evaluateDoc.score"
      size="7vw"
      gutter="3vw"
      color="#FADB14"
      void-icon="star"
      void-color="rgba(0,0,0,0.04)"
    />
  </div>
  <!-- 2. 还没有评价 -->
  <div class="evalutate-card" v-else>
    <p class="title">感谢您的评价</p>
    <p class="desc">本次在线问诊服务您还满意吗？</p>
    <!-- 五星好评 -->
    <van-rate
      v-model="score"
      size="7vw"
      gutter="3vw"
      color="#FADB14"
      void-icon="star"
      void-color="rgba(0,0,0,0.04)"
    />
    <!-- 输入框 -->
    <van-field
      v-model="content"
      type="textarea"
      maxlength="150"
      show-word-limit
      rows="3"
      placeholder="请描述您对医生的评价或是在医生看诊过程中遇到的问题"
    ></van-field>
    <div class="footer">
      <van-checkbox v-model="anonymousFlag">匿名评价</van-checkbox>
      <van-button :disabled="disabled" @click="onSubmit" type="primary" size="small" round>
        提交评价
      </van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.evalutate-card {
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  padding: 15px;
  box-sizing: border-box;
  .title {
    font-size: 15px;
    margin-bottom: 5px;
  }
  .desc {
    font-size: 12px;
    margin-bottom: 15px;
    color: var(--cp-tip);
  }
  .van-field {
    background-color: var(--cp-bg);
    margin: 15px 0;
    border-radius: 8px;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    ::v-deep() {
      .van-checkbox {
        .van-icon {
          font-size: 12px;
        }
        &__label {
          font-size: 12px;
          color: var(--cp-tip);
        }
        height: 16px;
      }
      .van-button {
        padding: 0 16px;
        &.disabled {
          opacity: 1;
          background: #fafafa;
          color: #d9dbde;
          border: #fafafa;
        }
      }
    }
  }
}
</style>
