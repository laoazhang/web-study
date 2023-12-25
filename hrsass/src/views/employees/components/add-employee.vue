<template>
  <!--  @open="openDialogFn" -->
  <el-dialog title="新增员工" :visible="showDialog" top="08vx" :close-on-click-modal="false" @close="closeDialog" @click.native="hideDeptsList">
    <!-- 表单 -->
    <el-form ref="addForm" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择">
          <el-option v-for="item in hireType" :key="item.id" :value="item.id" :label="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <!-- :readonly="true" -->
        <!-- :disabled="true" -->
        <el-input :value="formData.departmentName" style="width:50%" placeholder="请选择部门" @click.native.stop="getDeparmentList" />
        <div v-if="isShowTree" class="tree-box">
          <el-tree v-loading="isLoading" :data="list" :props="defaultProps" @node-click="handleNodeClick" />
        </div>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="addEmployee">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { getDeparmentListApi } from '@/api/department'
import { transListToTreeData } from '@/utils/index'
import { addEmployeeApi } from '@/api/employees'
import enumObj from '@/constant/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: [],
      formData: {
        username: '', // 用户名
        mobile: '', // 手机号
        formOfEmployment: '', // 聘用形式
        workNumber: '', // 工号
        departmentName: '', // 部门
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 4, message: '用户姓名为1-4位', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: ['blur', 'change'] },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: ['blur', 'change'] }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: ['blur', 'change'] }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: ['blur', 'change'] }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: ['blur', 'change'] }
        ],
        timeOfEntry: [
          { required: true, message: '请选择入职时间', trigger: ['blur', 'change'] }
        ]
      },
      defaultProps: {
        label: 'name'
      },
      isShowTree: false,
      isLoading: false,
      hireType: enumObj.hireType
    }
  },
  methods: {
    closeDialog() {
    //   this.showDialog = false
      this.$emit('update:showDialog', false)
      this.$refs.addForm.resetFields()
    },
    // 弹框出现的时候，会执行这个方法
    // openDialogFn() {
    //   this.getDeparmentList()
    // },
    async getDeparmentList() {
    //   this.isShowTree = true
    //   if (this.isShowTree) {
    //     this.isShowTree = false
    //   } else {
    //     this.isShowTree = true
    //   }
      this.isShowTree = !this.isShowTree
      this.isLoading = true
      const { data: { depts }} = await getDeparmentListApi()
      this.list = transListToTreeData(depts, '')
      this.isLoading = false
    },
    // 隐藏树状图结构
    hideDeptsList() {
      this.isShowTree = false
    },
    handleNodeClick(data) {
      if (data.children && data.children.length > 0) {
        return
      }
      this.formData.departmentName = data.name
      this.isShowTree = false
    },
    addEmployee() {
      this.$refs.addForm.validate(async(flag) => {
        if (!flag) return
        await addEmployeeApi(this.formData)
        this.$message.success('添加成功')
        this.closeDialog()
        // this.$emit('add-success')
        this.$parent.getEmployeeList()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-box {
  position: absolute;
  width: 50%;
  min-height: 50px;
  left: 0;
  top: 45px;
  z-index: 100;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding-right: 5px;
  overflow: hidden;
  background-color: #fff;
  max-height: 200px;
  overflow: auto;
  ::v-deep {
    .el-tree-node__content {
      height: auto;
    }
  }
}

</style>
