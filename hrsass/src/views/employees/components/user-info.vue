<template>
  <div class="user-info">
    <!-- 个人信息 -->
    <el-form label-width="220px">
      <!-- 工号 入职时间 -->
      <el-row class="inline-info">
        <el-col :span="12">
          <el-form-item label="工号">
            <el-input v-model="userInfo.workNumber" class="inputW" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="入职时间">
            <el-date-picker
              v-model="userInfo.timeOfEntry"
              type="date"
              class="inputW"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 姓名 部门 -->
      <el-row class="inline-info">
        <el-col :span="12">
          <el-form-item label="姓名">
            <el-input v-model="userInfo.username" class="inputW" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="部门">
            <el-input v-model="userInfo.departmentName" class="inputW" />
          </el-form-item>
        </el-col>
      </el-row>
      <!--手机 聘用形式  -->
      <el-row class="inline-info">
        <el-col :span="12">
          <el-form-item label="手机">
            <el-input v-model="userInfo.mobile" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="聘用形式">
            <el-select v-model="userInfo.formOfEmployment" class="inputW">
              <el-option
                v-for="item in EmployeeEnum.hireType"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 员工照片 -->
      <el-row class="inline-info">
        <el-col :span="12">
          <el-form-item label="员工头像">
            <!-- 放置上传图片 -->
            <ImageUpload ref="staffRef" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 保存个人信息 -->
      <el-row class="inline-info" type="flex" justify="center">
        <el-col :span="12">
          <el-button type="primary" @click="saveUser">保存更新</el-button>
          <el-button @click="$router.back()">返回</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 基础信息 -->
    <el-form label-width="220px">
      <div class="block">
        <div class="title">基础信息</div>
        <el-form-item label="最高学历">
          <el-select
            v-model="formData.theHighestDegreeOfEducation"
            class="inputW2"
          >
            <el-option
              v-for="item in EmployeeEnum.highestDegree"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <!-- 个人头像 -->
        <!-- 员工照片 -->

        <el-form-item label="员工照片">
          <!-- 放置上传图片 -->
          <ImageUpload ref="staffPhotoRef" />
        </el-form-item>
        <el-form-item label="国家/地区">
          <el-select v-model="formData.nationalArea" class="inputW2">
            <el-option
              v-for="item in EmployeeEnum.isOverseas"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="护照号">
          <el-input
            v-model="formData.passportNo"
            placeholder="正规护照格式"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input
            v-model="formData.idNumber"
            placeholder="正规身份证格式"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="籍贯">
          <el-input
            v-model="formData.nativePlace"
            placeholder="籍贯地址"
            class="inputW5"
          />
        </el-form-item>
        <el-form-item label="民族">
          <el-input
            v-model="formData.nation"
            placeholder="请输入民族"
            class="inputW2"
          />
        </el-form-item>
        <el-form-item label="婚姻状况">
          <el-select v-model="formData.maritalStatus" class="inputW2">
            <el-option
              v-for="item in EmployeeEnum.maritaStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="生日">
          <el-input
            v-model="formData.birthday"
            placeholder="示例 0323"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="formData.age" type="number" class="inputW2" />
        </el-form-item>
        <el-form-item label="星座">
          <el-select v-model="formData.constellation" class="inputW2">
            <el-option
              v-for="item in EmployeeEnum.constellation"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="血型">
          <el-select v-model="formData.bloodType" class="inputW2">
            <el-option
              v-for="item in EmployeeEnum.bloodType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="户籍所在地">
          <el-input v-model="formData.domicile" class="inputW5" />
        </el-form-item>
        <el-form-item label="政治面貌">
          <el-input v-model="formData.politicalOutlook" class="inputW2" />
        </el-form-item>
        <el-form-item label="入党时间">
          <el-date-picker
            v-model="formData.timeToJoinTheParty"
            type="date"
            placeholder="选择日期"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="存档机构">
          <el-input
            v-model="formData.archivingOrganization"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="子女状态">
          <el-input v-model="formData.stateOfChildren" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="子女有无商业险">
          <el-radio-group v-model="formData.doChildrenHaveCommercialInsurance">
            <el-radio label="1">有</el-radio>
            <el-radio label="2">无</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="有无违法违纪状态">
          <el-input
            v-model="formData.isThereAnyViolationOfLawOrDiscipline"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="有无重大病史">
          <el-input
            v-model="formData.areThereAnyMajorMedicalHistories"
            placeholder="请输入"
          />
        </el-form-item>
      </div>
      <!-- 通讯信息 -->
      <div class="block">
        <div class="title">通讯信息</div>
        <el-form-item label="QQ">
          <el-input v-model="formData.qq" placeholder="请输入" class="inputW" />
        </el-form-item>
        <el-form-item label="微信">
          <el-input
            v-model="formData.wechat"
            placeholder="请输入"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="现居住地">
          <el-input v-model="formData.placeOfResidence" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="通讯地址">
          <el-input v-model="formData.postalAddress" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="联系手机">
          <el-input
            v-model="formData.contactTheMobilePhone"
            placeholder="11位字符"
            maxlength="11"
            class="inputW"
            @change.native="handlePhone(2)"
          />
        </el-form-item>
        <el-form-item label="个人邮箱">
          <el-input
            v-model="formData.personalMailbox"
            placeholder="请输入"
            type="mail"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="紧急联系人">
          <el-input
            v-model="formData.emergencyContact"
            placeholder="请输入"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="紧急联系电话">
          <el-input
            v-model="formData.emergencyContactNumber"
            placeholder="11位字符"
            class="inputW"
          />
        </el-form-item>
      </div>
      <!-- 账号信息 -->
      <div class="block">
        <div class="title">账号信息</div>
        <el-form-item label="社保电脑号">
          <el-input
            v-model="formData.socialSecurityComputerNumber"
            placeholder="请输入"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="公积金账号">
          <el-input
            v-model="formData.providentFundAccount"
            placeholder="请输入"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="银行卡号">
          <el-input
            v-model="formData.bankCardNumber"
            placeholder="请输入"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="开户行">
          <el-input
            v-model="formData.openingBank"
            placeholder="请输入"
            class="inputW"
          />
        </el-form-item>
      </div>
      <!-- 教育信息 -->
      <div class="block">
        <div class="title">教育信息</div>
        <el-form-item label="学历类型">
          <el-select v-model="formData.educationalType" placeholder="请选择">
            <el-option
              v-for="item in EmployeeEnum.educationType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="毕业学校">
          <el-input
            v-model="formData.graduateSchool"
            placeholder="请输入"
            class="inputW2"
          />
        </el-form-item>
        <el-form-item label="入学时间">
          <el-date-picker
            v-model="formData.enrolmentTime"
            type="data"
            placeholder="请输入时间"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="毕业时间">
          <el-date-picker
            v-model="formData.graduationTime"
            type="data"
            placeholder="请输入时间"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="专业">
          <el-input
            v-model="formData.major"
            placeholder="请输入"
            class="inputW"
          />
        </el-form-item>
      </div>
      <!-- 从业信息 -->
      <div class="block">
        <div class="title">从业信息</div>
        <el-form-item label="上家公司">
          <el-input
            v-model="formData.homeCompany"
            placeholder="请输入"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="职称">
          <el-input
            v-model="formData.title"
            placeholder="请输入"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="有无竞业限制">
          <el-input
            v-model="formData.isThereAnyCompetitionRestriction"
            placeholder="请输入"
            style="width: 80%"
          />
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="formData.remarks"
            type="textarea"
            placeholder="请输入备注"
            style="width: 80%"
          />
        </el-form-item>
        <!-- 保存员工信息 -->
        <el-row class="inline-info" type="flex" justify="center">
          <el-col :span="12">
            <el-button type="primary" @click="savePersonal">保存更新</el-button>
            <el-button @click="$router.back()">返回</el-button>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import EmployeeEnum from '@/constant/employees'
import { getBaseUserInfoApi } from '@/api/user'
import {
  saveUserDetailByIdApi,
  getPersonalDetailApi,
  updatePersonalApi
} from '@/api/employees'
import ImageUpload from '@/components/ImageUpload/index.vue'
export default {
  components: { ImageUpload },
  data() {
    return {
      EmployeeEnum,
      userInfo: {
        workNumber: '',
        timeOfEntry: '',
        username: '',
        departmentName: '',
        mobile: '',
        formOfEmployment: '' // 聘用形式
      },
      formData: {
        userId: '',
        username: '',
        sex: '',
        mobile: '',
        companyId: '',
        departmentName: '',
        //  onTheJobStatus: '', // 在职状态 no
        dateOfBirth: '',
        timeOfEntry: '',
        theHighestDegreeOfEducation: '',
        nationalArea: '',
        passportNo: '',
        idNumber: '',
        idCardPhotoPositive: '',
        idCardPhotoBack: '',
        nativePlace: '',
        nation: '',
        englishName: '',
        maritalStatus: '',
        staffPhoto: '',
        birthday: '',
        zodiac: '',
        age: '',
        constellation: '',
        bloodType: '',
        domicile: '',
        politicalOutlook: '',
        timeToJoinTheParty: '',
        archivingOrganization: '',
        stateOfChildren: '',
        doChildrenHaveCommercialInsurance: '1',
        isThereAnyViolationOfLawOrDiscipline: '',
        areThereAnyMajorMedicalHistories: '',
        qq: '',
        wechat: '',
        residenceCardCity: '',
        dateOfResidencePermit: '',
        residencePermitDeadline: '',
        placeOfResidence: '',
        postalAddress: '',
        contactTheMobilePhone: '',
        personalMailbox: '',
        emergencyContact: '',
        emergencyContactNumber: '',
        socialSecurityComputerNumber: '',
        providentFundAccount: '',
        bankCardNumber: '',
        openingBank: '',
        educationalType: '',
        graduateSchool: '',
        enrolmentTime: '',
        graduationTime: '',
        major: '',
        graduationCertificate: '',
        certificateOfAcademicDegree: '',
        homeCompany: '',
        title: '',
        resume: '',
        isThereAnyCompetitionRestriction: '',
        proofOfDepartureOfFormerCompany: '',
        remarks: '' // 备注
      }
    }
  },
  computed: {
    userId() {
      return this.$route.params.id
    }
  },
  created() {
    this.getUserDetailById()
    this.getPersonalDetail()
  },
  methods: {
    async getUserDetailById() {
      const { data } = await getBaseUserInfoApi(this.userId)
      this.$refs.staffRef.fileList = [{ url: data.staffPhoto }] // [{url:'xxx.jpg'}]
      this.userInfo = data
    },
    async saveUser() {
      const staffRef = this.$refs.staffRef
      if (staffRef.fileList && staffRef.fileList.length > 0) {
        const imgUrl = staffRef.fileList[0].url
        this.userInfo.staffPhoto = imgUrl
      } else {
        this.$message.error('必须上传头像')
        return
      }
      if (!staffRef.isAllUploadSuccess) {
        this.$message.error('还有图片正在上传中，请稍后再试')
        return
      }
      //  调用父组件
      await saveUserDetailByIdApi(this.userInfo)
      this.$message.success('保存成功')
    },
    /**
     * 获取用户基本信息
     */
    async getPersonalDetail() {
      const { data } = await getPersonalDetailApi(this.userId)
      this.$refs.staffPhotoRef.fileList = [
        {
          url: data.staffPhoto
        }
      ]
      this.formData = data
    },
    async savePersonal() {
      const staffPhotoRef = this.$refs.staffPhotoRef
      const imgUrl = staffPhotoRef.fileList[0]?.url
      if (!imgUrl) {
        this.$message.error('必须上传照片')
        return
      }
      if (!staffPhotoRef.isAllUploadSuccess) {
        this.$message.error('还有图片正在上传中，请稍后再试')
        return
      }
      await updatePersonalApi({
        ...this.formData,
        staffPhoto: imgUrl
      })
      this.$message.success('修改成功')
    }
  }
}
</script>

<style>
</style>
