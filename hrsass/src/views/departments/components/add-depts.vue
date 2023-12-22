<template>
  <!-- 新增部门的弹层 -->
  <!-- @open="openDialog" -->
  <el-dialog :title="showTitle" :visible="showDialog" :close-on-click-modal="false" @close="closeDialog" @open="openDialog">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <!-- label-width:表单域标题的宽度 -->
    <!-- 校验四要素 -->
    <!--  el-form :model :rules -->
    <!--  el-form-item :prop -->
    <!--  el-input v-model -->
    <el-form ref="addForm" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name" style="width:80%" placeholder="1-10个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="form.code" style="width:80%" placeholder="1-10个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="form.manager" style="width:80%" placeholder="请选择">
          <el-option v-for="item in employeesList" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="form.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <div slot="footer">
      <el-button type="primary" size="small" @click="submitDepts">确定</el-button>
      <el-button size="small" @click="closeDialog">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getSimpleUserListApi } from '@/api/employees'
import { addDepartmentApi, getDepartmentDetailApi, editDepartmentApi } from '@/api/department'
export default {
  name: 'AddDepts',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    nodeData: {
      type: Object,
      default: () => {}
    },
    departsList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      form: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      // 定义校验规则
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: ['blur', 'change'] },
          { validator: this.validatDeptNameIsRepeat, trigger: ['blur'] }

        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: ['blur', 'change'] },
          { validator: this.validatDeptCodeIsRepeat, trigger: ['blur'] }

        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: ['blur', 'change'] }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 300, message: '部门介绍要求1-300个字符', trigger: ['blur', 'change'] }
        ]
      },
      employeesList: []
    }
  },
  computed: {
    showTitle() {
      return this.form.id ? '修改部门' : '添加部门'
    }
  },
  methods: {
    closeDialog() {
    //   this.$emit('closeDialogFn', false)
    //   this.showDialog = false
    //  子组件必须通过固定语法去修改父组件的数据
    // 语法: this.$emit('update:props传过来的值',你要修改的值)
      this.$emit('update:showDialog', false)
      // 表单重置 只会清空进行双向绑定的数据
      this.$refs.addForm.resetFields()
      this.form = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      }
    },
    // 3个参数 rule value callback
    validatDeptNameIsRepeat(rule, value, callback) {
      let children = []
      if (this.form.id) {
        // 修改的逻辑
        // 先判断输入的内容是否和我原来的内容一样
        if (value === this.nodeData.name) {
          callback()
          return
        }
        // 如果输入内容不一样,则比较输入内容和其他节点进行对比
        // 1.找到兄弟节点
        children = this.departsList.filter(item => item.pid === this.nodeData.pid) || []
      } else {
        // 校验: 判断当前部门里的子部门,是否和你输入的内容一样
      // 当前部门的信息存在了nodeData中
      // 子部门: 1.先获取到所有部门数据departsList
        children = this.departsList.filter(item => item.pid === this.nodeData.id)
      }
      // 如果子部门中的name属性有一个和我输入的一样的话,就校验不通过
      // some有一个对应的就返回true
      const isRepeat = children.some(item => item.name === value)
      isRepeat ? callback(new Error('当前部门已存在')) : callback()
    },
    validatDeptCodeIsRepeat(rule, value, callback) {
      // 校验: 当前输入内容,和列表中的任何一条数据,如果重复的话,都校验不通过
      // 修改的时候如果输入的部门code和我自己的一样,那么校验通过
      if (this.form.id && this.nodeData.code === value) {
        callback()
        return
      }
      const isRepeat = this.departsList.some(item => item.code === value)
      isRepeat ? callback(new Error('部门编码不能重复')) : callback()
    },
    // 获取员工简单列表
    async getSimpleUserList() {
      const { data } = await getSimpleUserListApi()
      this.employeesList = data
    }, openDialog() {
      this.getSimpleUserList()
    },
    submitDepts() {
      this.$refs.addForm.validate(async flag => {
        if (!flag) return
        if (this.form.id) {
          // 修改逻辑
          await editDepartmentApi(this.form)
          this.$message.success('修改成功')
        } else {
          // 新增逻辑
          // pid 相当于this.nodeData.id
        // 添加的时候,添加的当前部门的子级,所以此时当前部门充当的是父级的角色
          await addDepartmentApi({ ...this.form, pid: this.nodeData.id })
          this.$message.success('添加成功')
        }

        // 关闭弹框
        this.closeDialog()
        // 刷新列表
        this.$emit('add-depts-success')
      })
    },
    // 获取部门详情
    async getDepartmentDetail() {
      const { data } = await getDepartmentDetailApi(this.nodeData.id)
      this.form = data
    }
  }
}
</script>

<style>

</style>
