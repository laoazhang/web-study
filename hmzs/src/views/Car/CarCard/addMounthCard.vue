<template>
  <div class="add-card">
    <header class="add-header">
      <el-page-header :content="showTitle" @back="$router.back()" />
    </header>
    <main class="add-main">
      <div class="form-container">
        <div class="title">车辆信息</div>
        <div class="form">
          <el-form
            ref="carInfoForm"
            label-width="100px"
            :model="carInfoForm"
            :rules="carInfoRules"
          >
            <el-form-item label="车主姓名" prop="personName">
              <el-input v-model="carInfoForm.personName" />
            </el-form-item>
            <el-form-item label="联系方式" prop="phoneNumber">
              <el-input v-model="carInfoForm.phoneNumber" />
            </el-form-item>
            <el-form-item label="车辆号码" prop="carNumber">
              <el-input v-model="carInfoForm.carNumber" />
            </el-form-item>
            <el-form-item label="车辆品牌" prop="carBrand">
              <el-input v-model="carInfoForm.carBrand" />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="form-container">
        <div class="title">最新一次月卡缴费信息</div>
        <div class="form">
          <el-form
            ref="feeForm"
            label-width="100px"
            :model="feeForm"
            :rules="feeFormRules"
          >
            <el-form-item label="有效日期" prop="payTime">
              <el-date-picker
                v-model="feeForm.payTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
            <el-form-item label="支付金额" prop="paymentAmount">
              <el-input v-model="feeForm.paymentAmount" />
            </el-form-item>
            <el-form-item label="支付方式" prop="paymentMethod">
              <el-select v-model="feeForm.paymentMethod">
                <el-option
                  v-for="item in payMethodList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>

    </main>
    <footer class="add-footer">
      <div class="btn-container">
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="confirmAdd">确定</el-button>
      </div>
    </footer>
  </div>
</template>

<script>
import { createCardAPI, getCardDetailAPI, updateCardAPI } from '@/api/card'
export default {
  data() {
    return {
      id: this.$route.query.id || '',
      // 缴费信息表单
      feeForm: {
        payTime: '',
        paymentAmount: '',
        paymentMethod: ''
      },
      // 支付方式列表
      payMethodList: [
        {
          id: 'Alipay',
          name: '支付宝'
        },
        {
          id: 'WeChat',
          name: '微信'
        },
        {
          id: 'Cash',
          name: '线下'
        }
      ],
      // 车辆信息表单
      carInfoForm: {
        personName: '',
        phoneNumber: '',
        carNumber: '',
        carBrand: ''
      },
      feeFormRules: {
        payTime: [
          {
            required: true, message: '请选择支付时间'
          }
        ],
        paymentAmount: [
          {
            required: true,
            message: '请输入支付金额',
            trigger: 'blur'
          },
          {
            type: 'number',
            message: '金额必须为数字值',
            transform: (value) => Number(value) }
        ],
        paymentMethod: [
          {
            required: true,
            message: '请选择支付方式',
            trigger: 'blur'
          }
        ]
      },
      carInfoRules: {
        personName: [
          {
            required: true, message: '请输入车主姓名', trigger: 'blur'
          }
        ],
        phoneNumber: [
          {
            required: true, message: '请输入联系方式', trigger: 'blur'
          },
          {
            pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'
          }
        ],
        carNumber: [
          {
            required: true, message: '请输入车辆号码', trigger: 'blur'
          },
          {
            validator: this.validaeCarNumber, trigger: 'blur'
          }
        ],
        carBrand: [
          {
            required: true, message: '请输入车辆品牌', trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    showTitle() {
      return this.$route.query.id ? '编辑月卡' : '新增月卡'
    }
  },
  mounted() {
    if (this.id) {
      this.getCardDetail(this.id)
    }
  },
  methods: {
    // 获取月卡详情
    async getCardDetail(id) {
      const { data } = await getCardDetailAPI(id)
      console.log('月卡详情', data)
      // 回填车辆信息表单
      const { carInfoId, personName, phoneNumber, carNumber, carBrand } = data
      this.carInfoForm = { carInfoId, personName, phoneNumber, carNumber, carBrand }
      // 回填缴费信息表单
      const { rechargeId, cardStartDate, cardEndDate, paymentAmount, paymentMethod } = data
      this.feeForm = {
        rechargeId,
        paymentAmount,
        paymentMethod,
        payTime: [cardStartDate, cardEndDate]
      }
    },
    // 重置表单
    resetForm() {
      this.$refs.carInfoForm.resetFields()
      this.$refs.feeForm.resetFields()
    },
    // 提交表单
    confirmAdd() {
      this.$refs.carInfoForm.validate(valid => {
        if (valid) {
          this.$refs.feeForm.validate(async valid => {
            if (valid) {
              // 双表单校验通过
              // 参数封装
              console.log('提交表单')
              const formData = {
                ...this.carInfoForm,
                ...this.feeForm,
                // 单独处理时间
                cardStartDate: this.feeForm.payTime[0],
                cardEndDate: this.feeForm.payTime[1]
              }
              // 删除多余字段
              delete formData.payTime
              if (this.id) {
                // 编辑
                await updateCardAPI(formData)
              } else {
                // 新增
                await createCardAPI(formData)
              }
              this.$router.back()
            }
          })
        }
      })
    },
    validaeCarNumber(rule, value, callback) {
      const plateNumberRegex = /^[\u4E00-\u9FA5][\da-zA-Z]{6}$/
      if (plateNumberRegex.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的车牌号'))
      }
    }
  }
}
</script>

<style scoped lang="scss">
.add-card {
  background-color: #f4f6f8;
  height: 100vh;

  .add-header {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 64px;
    background-color: #fff;

    .left {
      span {
        margin-right: 4px;
      }
      .arrow{
        cursor: pointer;
      }
    }

    .right {
      text-align: right;
    }
  }

  .add-main {
    background: #f4f6f8;
    padding: 20px 130px;

    .form-container {
      background-color: #fff;

      .title {
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
      }

      .form {
        margin-bottom: 20px;
        padding: 20px 65px 24px;

        .el-form {
          display: flex;
          flex-wrap: wrap;

          .el-form-item {
            width: 50%;
          }
        }
      }
    }
    .preview{
      img{
        width: 100px;
      }
    }
  }

  .add-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 24px 50px;
    color: #000000d9;
    font-size: 14px;
    background: #fff;
    text-align: center;
  }
}
</style>
