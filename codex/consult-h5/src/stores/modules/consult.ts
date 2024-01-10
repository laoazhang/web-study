/**
 * 极速问诊store
 */
import type { ConsultType } from '@/enums'
import type { PartialConsult, InllnessType } from '@/types/consult'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConsultStore = defineStore(
  'cp-consult',
  () => {
    // 定义全局共享数据
    /**
     * // 全局变量
       1. == 问诊记录数据，创建订单使用 == 
       // 修改全局变量的方法
       2. 修改问诊类型type方法：1找医生 2极速问诊 3开药问诊
       3. 修改极速问诊类型illnessType方法：0普通  1三甲
       4. 修改科室id方法
       5. 修改病情描述相关信息方法：illnessDesc、illnessTime、consultFlag、pictures
       6. 修改患者patientId的方法
       7. 修改优惠卷couponId的方法
       8. 清空问诊记录方法
     */
    const consult = ref<PartialConsult>({})
    // 1. 首页使用：记录问诊类型方法
    const setType = (type: ConsultType) => {
      consult.value.type = type
    }
    // 2. 问诊级别：记录问诊级别 => 1. 三甲 2. 普通
    const setIllnessType = (type: 0 | 1) => {
      consult.value.illnessType = type
    }
    // 3. 选择科室页面: 记录科室
    const setDepId = (id: string) => {
      consult.value.depId = id
    }
    // 4. 病情描述页面：记录病情
    const setIllness = (illness: InllnessType) => {
      consult.value.illnessDesc = illness.illnessDesc
      consult.value.illnessTime = illness.illnessTime
      consult.value.pictures = illness.pictures
      consult.value.consultFlag = illness.consultFlag
    }
    // 5. 家庭档案页面：记录选择患者ID
    const setPatient = (id: string) => {
      consult.value.patientId = id
    }
    // 6. 记录优惠券ID
    const setCunpon = (id: string) => {
      consult.value.couponId = id
    }
    // 7. 问诊订单创建成功后，清空记录问诊数据
    const clear = () => {
      consult.value = {}
    }
    return { consult, setType, setIllnessType, setDepId, setIllness, setPatient, setCunpon, clear }
  },
  {
    persist: true
  }
)
