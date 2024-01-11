<script setup lang="ts">
import { getPatientList, addPatient, editPatient, delPatient } from '@/api/user'
import type { Patient, PatientList } from '@/types/user'
import { ref, onMounted, computed } from 'vue'
// import { watch } from 'vue'
import { showConfirmDialog, showFailToast, showSuccessToast } from 'vant'
// 导入校验身份证格式插件
import Validator from 'id-validator'
import { useRoute, useRouter } from 'vue-router'
import { useConsultStore } from '@/stores'

// 3. 家庭档案支持选择患者功能
const route = useRoute()
// console.log('路由对象', route)
// 是否支持选择档案中的患者使用: true 支持 | false 不支持
const isSel = computed(() => route.query.isSel === '1')
// 点击选中患者的ID
const selectedPatientId = ref<string | undefined>('')
const selPatient = (id: string | undefined) => {
  // 判断是否支持选中患者
  if (isSel.value) {
    selectedPatientId.value = id
  }
}

const store = useConsultStore()
const router = useRouter()
// 点击进入支付页面
const next = () => {
  /**
   * 1. 判断是否有选择患者
   * 2. 存储选中患者ID到pinia
   * 3. 跳转支付页面
   */
  if (!selectedPatientId.value) return showFailToast('请选择一个患者')
  store.setPatient(selectedPatientId.value)
  router.push('/consult/pay')
}

const patientList = ref<PatientList>([])
// 1. 获取患者列表方法
const loadList = async () => {
  const { data } = await getPatientList()
  patientList.value = data
  // console.log('患者列表', data)
  // 如果支持选择患者同时满足档案中存在患者
  if (isSel.value && data.length > 0) {
    /**
     * 从患者列表中获取默认患者:
     * 1. 如果有：默认患者选中
     * 2. 没有：患者中第一个默认选中
     */
    const defPatient = data.find((item) => item.defaultFlag === 1)
    if (defPatient) {
      // 有
      console.log('有', defPatient.id)

      selectedPatientId.value = defPatient.id
    } else {
      // 没有
      console.log('没有')
      selectedPatientId.value === data[0].id
    }
  }
}
onMounted(() => {
  loadList()
})

// 2. 新增患者功能
// 控制新增患者弹层显隐
const show = ref(false)
// 打开新增患者弹层
const openDialog = async (item?: Patient) => {
  if (item) {
    // 如果点的是编辑，解构出后台需要的数据
    const { id, gender, name, idCard, defaultFlag } = item
    patient.value = { id, gender, name, idCard, defaultFlag }
  } else {
    patient.value = { ...defaultPatinet }
  }
  show.value = true
}

// 关闭弹层
const closeDialog = () => {
  show.value = false
}

// 性别选项
const options = [
  { label: '男', value: 1 },
  { label: '女', value: 0 }
]
// 存储选中的性别value值
// const gender = ref(0)
// 准备一个患者表单数据默认值
const defaultPatinet: Patient = {
  name: '', // 患者名字
  idCard: '', // 患者身份证
  gender: 1, // 患者性别
  defaultFlag: 0 // 是否是默认患者，0不是默认 1是默认患者
}

const patient = ref<Patient>({ ...defaultPatinet })
//是否是默认患者
// const defaultFlag = ref(false)
// 监控defaultFlag变化,把defaultFlag选中的boolean值换成 0 | 1
// watch(defaultFlag, () => {
//   // console.log('是否是默认患者', defaultFlag)
//   patient.value.defaultFlag = defaultFlag.value ? 1 : 0
//   defaultFlag.value = patient.value.defaultFlag ? true : false
// })
// 默认值需要转换
const defaultFlag = computed({
  get() {
    return patient.value.defaultFlag === 1 ? true : false
  },
  set(value) {
    patient.value.defaultFlag = value ? 1 : 0
  }
})
// 点击导航栏保存按钮=> 提交
// 创建身份证校验的实例
const cardValid = new Validator()
const submit = async () => {
  /**
   * 流程：
   * 1. 校验患者名字和身份证
   *    // 校验身份证格式
   * 2. 校验通过调用api函数新增函数
   *    新增成功后：
   *    1. 关闭弹层
   *    2. 刷新患者列表
   *
   */
  if (!patient.value.name) return showFailToast('请输入患者名字')

  if (!patient.value.idCard) return showFailToast('请输入患者身份证')
  // 校验身份证格式
  if (!cardValid.isValid(patient.value.idCard)) return showFailToast('身份证格式错误')
  const { sex } = cardValid.getInfo(patient.value.idCard)
  if (patient.value.gender !== sex) return showFailToast('选择的性别和身份证性别不一致')
  try {
    patient.value.id ? await editPatient(patient.value) : await addPatient(patient.value)
    closeDialog()
    loadList()
    showSuccessToast(patient.value.id ? '编辑成功' : '新增成功')
  } catch (error) {
    console.log(error)
  }
}

// 删除
const remove = () => {
  if (patient.value.id) {
    showConfirmDialog({
      title: '温馨提示',
      message: `您确认要删除 ${patient.value.name} 患者信息吗 ？`
    })
      .then(async () => {
        await delPatient(patient.value.id)
        closeDialog()
        loadList()
        showSuccessToast('删除成功')
      })
      .catch(() => {})
  }
}
</script>

<template>
  <div class="patient-page">
    <!-- 1. 导航栏 -->
    <cp-nav-bar :title="isSel ? '选择患者' : '家庭档案'"></cp-nav-bar>
    <!-- 头部选择提示 -->
    <div class="patient-change" v-if="isSel">
      <h3>请选择患者信息</h3>
      <p>以便医生给出更准确的治疗，信息仅医生可见</p>
    </div>
    <!-- 2. 患者列表 -->
    <div class="patient-list">
      <div
        @click="selPatient(item.id)"
        :class="{ selected: selectedPatientId === item.id }"
        v-for="item in patientList"
        :key="item.id"
        class="patient-item"
      >
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <span class="id">{{ item.idCard.replace(/^(.{6})(?:\d+)(.{4})$/, '\$1******\$2') }}</span>
          <span>{{ item.gender === 0 ? '女' : '男' }}</span>
          <span>{{ item.age }}岁</span>
        </div>
        <!-- 点击修改 -->
        <div class="icon" @click="openDialog(item)"><cp-icon name="user-edit" /></div>
        <!-- 默认患者显示div.tag元素 -->
        <div class="tag" v-if="item.defaultFlag === 1">默认</div>
      </div>
      <!-- 点击新增患者 -->
      <div @click="openDialog()" class="patient-add" v-if="patientList.length < 100">
        <cp-icon name="user-add" />
        <p>添加患者</p>
      </div>
      <div class="patient-tip">最多可添加 6 人</div>
    </div>
    <!-- 患者选择下一步 -->
    <div class="patient-next" v-if="isSel">
      <van-button @click="next" type="primary" round block>下一步</van-button>
    </div>
    <!-- 新增患者弹层 
        position 从什么方向出来
    -->
    <van-popup v-model:show="show" position="bottom">
      <!-- 放置弹层内容 -->
      <!-- 1. 导航栏 -->
      <cp-nav-bar
        :title="patient.id ? '编辑患者' : '新增患者'"
        @click-right="submit"
        right-text="保存"
        :back="closeDialog"
      ></cp-nav-bar>
      <!-- 2. 新增患者 -->
      <van-form autocomplete="off">
        <van-field v-model="patient.name" label="真实姓名" placeholder="请输入真实姓名" />
        <van-field v-model="patient.idCard" label="身份证号" placeholder="请输入身份证号" />
        <van-field label="性别">
          <!-- 不是输入框，需要通过具名插槽自定义表单项 -->
          <!-- 单选按钮组件 -->
          <template #input>
            <cp-radio-btn :options="options" v-model="patient.gender"></cp-radio-btn>
          </template>
        </van-field>
        <van-field label="默认就诊人">
          <template #input>
            <!-- 说明：需要单独绑定一个boolean变量 -->
            <van-checkbox round v-model="defaultFlag" />
          </template>
        </van-field>
      </van-form>
      <van-action-bar>
        <van-action-bar-button @click="remove" type="danger" text="删除"></van-action-bar-button>
      </van-action-bar>
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
::v-deep() .van-popup {
  width: 100%;
  height: 100%;
  padding-top: 46px;
  box-sizing: border-box;
}

.patient-page {
  padding: 46px 0 80px;
}
.patient-change {
  padding: 15px;
  > h3 {
    font-weight: normal;
    margin-bottom: 5px;
  }
  > p {
    color: var(--cp-text3);
  }
}
.patient-next {
  padding: 15px;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  box-sizing: border-box;
}
.patient-list {
  padding: 15px;
}
.patient-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: var(--cp-bg);
  border-radius: 8px;
  margin-bottom: 15px;
  position: relative;
  border: 1px solid var(--cp-bg);
  transition: all 0.3s;
  overflow: hidden;
  .info {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    span {
      color: var(--cp-tip);
      margin-right: 20px;
      line-height: 30px;
      &.name {
        font-size: 16px;
        color: var(--cp-text1);
        width: 80px;
        margin-right: 0;
      }
      &.id {
        color: var(--cp-text2);
        width: 180px;
      }
    }
  }
  .icon {
    color: var(--cp-tag);
    width: 20px;
    text-align: center;
  }
  .tag {
    position: absolute;
    right: 60px;
    top: 21px;
    width: 30px;
    height: 16px;
    font-size: 10px;
    color: #fff;
    background-color: var(--cp-primary);
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.selected {
    border-color: var(--cp-primary);
    background-color: var(--cp-plain);
    .icon {
      color: var(--cp-primary);
    }
  }
}
.patient-add {
  background-color: var(--cp-bg);
  color: var(--cp-primary);
  text-align: center;
  padding: 15px 0;
  border-radius: 8px;
  .cp-icon {
    font-size: 24px;
  }
}
.patient-tip {
  color: var(--cp-tag);
  padding: 12px 0;
}
</style>
