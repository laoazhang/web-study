<template>
  <div class="add-enterprise">
    <header class="add-header">
      <div class="left">
        <span class="arrow" @click="$router.back()"><i class="el-icon-arrow-left" />返回</span>
        <span>|</span>
        <span>{{ showTitle }}</span>
      </div>
      <div class="right">
        黑马程序员
      </div>
    </header>
    <main class="add-main">
      <div class="form-container">
        <div class="title">企业信息</div>
        <div class="form">
          <el-form ref="ruleForm" label-width="100px" :model="addForm" :rules="addFormRules">
            <el-form-item label="企业名称" prop="name">
              <el-input v-model="addForm.name" />
            </el-form-item>
            <el-form-item label="法人" prop="legalPerson">
              <el-input v-model="addForm.legalPerson" />
            </el-form-item>
            <el-form-item label="注册地址" prop="registeredAddress">
              <el-input v-model="addForm.registeredAddress" />
            </el-form-item>
            <el-form-item label="所在行业" prop="industryCode" placeholder="请选择">
              <el-select v-model="addForm.industryCode">
                <el-option
                  v-for="item in industry"
                  :key="item.industryCode"
                  class="ant-select"
                  :label="item.industryName"
                  :value="item.industryCode"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="企业联系人" prop="contact">
              <el-input v-model="addForm.contact" />
            </el-form-item>
            <el-form-item label="联系电话" prop="contactNumber">
              <el-input v-model="addForm.contactNumber" />
            </el-form-item>
            <el-form-item label="营业执照" prop="businessLicenseId">
              <el-upload
                class="upload-demo"
                action="#"
                :before-upload="beforeUpload"
                :http-request="uploadRequest"
              >
                <el-button size="small" type="primary">上传文件</el-button>
                <div slot="tip" class="el-upload__tip">支持扩展名：.png .jpg .jpeg，文件大小不得超过5M</div>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </main>
    <footer class="add-footer">
      <div class="btn-container">
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </footer>
  </div>
</template>

<script>
import { getIndustryAPI, addEnterpriseAPI, getEnterpriseDetailAPI, editEnterpriseAPI } from '@/api/enterprise'
import { uploadAPI } from '@/api/constant'

export default {
  data() {
    return {
      id: this.$route.query.id || '',
      addForm: {
        name: '', // 企业名称
        legalPerson: '', // 法人
        registeredAddress: '', // 注册地址
        industryCode: '', // 所在行业
        contact: '', // 企业联系人
        contactNumber: '', // 联系人电话
        businessLicenseUrl: '', // 营业执照url
        businessLicenseId: '' // 营业执照id
      },
      // 所属行业
      industry: [],
      addFormRules: {
        name: [
          { required: true, message: '必填项，内容不能为空', trigger: 'blur' }
        ],
        legalPerson: [
          { required: true, message: '必填项，内容不能为空', trigger: 'blur' }
        ],
        registeredAddress: [
          { required: true, message: '必填项，内容不能为空', trigger: 'blur' }
        ],
        industryCode: [
          { required: true, message: '必填项，内容不能为空', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '必填项，内容不能为空', trigger: 'blur' }
        ],
        contactNumber: [
          { required: true, message: '必填项，内容不能为空', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        businessLicenseId: [
          { required: true, message: '必填项，内容不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    showTitle() {
      return this.id ? '编辑企业' : '添加企业'
    }
  },
  created() {
    return this.getIndustry()
  },
  mounted() {
    if (this.id) {
      this.getEnterpriseDetail(this.id)
    }
  },
  methods: {
    async getEnterpriseDetail(id) {
      const { data } = await getEnterpriseDetailAPI(id)
      console.log('企业信息', data)
      const { name, legalPerson, registeredAddress, industryCode, contact, contactNumber, businessLicenseId, businessLicenseUrl } = data
      this.addForm = { name, legalPerson, registeredAddress, industryCode, contact, contactNumber, businessLicenseId, businessLicenseUrl }
    },
    // 提交表单
    submit() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) return
        // console.log('提交成功')
        if (this.id) {
          await editEnterpriseAPI({ ...this.addForm, id: this.id })
        } else {
          await addEnterpriseAPI(this.addForm)
        }
        this.$router.back()
      })
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 文件上传验证
    beforeUpload(file) {
      // console.log('上传文件信息', file)
      const allowImgType = ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!allowImgType) {
        this.$message.error('上传合同图片只能是 PNG/JPG/JPEG 格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传合同图片大小不能超过 5MB!')
      }
      return allowImgType && isLt5M
    },
    // 上传文件
    async uploadRequest({ file }) {
      // console.log('文件信息', file)
      // 处理formData类型数据
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'businessLicense')
      const { data: { id, url }} = await uploadAPI(formData)
      // console.log('上传返回结果：', id, url)
      this.addForm.businessLicenseId = id
      this.addForm.businessLicenseUrl = url
      /**
       * 业务背景: 上传营业执照完毕之后并不能让校验痕迹消失掉，愿意是因为el-form表单校验系统不能得到上传之后的通知
          解决办法：在上传完毕之后手动校验营业执照字段
       */
      // 单独校验表单，清除错误信息
      this.$refs.ruleForm.validateField('businessLicenseId')
    },
    // 获取企业所属行业列表
    async getIndustry() {
      const { data } = await getIndustryAPI()
      // console.log('企业所属行业列表', data)
      this.industry = data
    },
    async addEnterprise(data) {
      await addEnterpriseAPI(data)
    }
  }
}
</script>

<style scoped lang="scss">
.ant-select {
  color: black;
}
.add-enterprise {
  background-color: #f4f6f8;
  height: 100vh;

  .add-header {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    height: 64px;
    line-height: 64px;
    font-size: 16px;
    font-weight: bold;
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
        padding-left:20px;
      }
      .form {
        margin-bottom: 20px;
        padding: 20px 65px 24px;
        .el-form{
          display: flex;
          flex-wrap: wrap;
          .el-form-item{
            width: 50%;
          }
        }
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
