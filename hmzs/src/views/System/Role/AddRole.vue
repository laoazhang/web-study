<template>
  <div class="add-role">
    <main class="add-main">
      <div class="step-container">
        <el-steps direction="vertical" :active="activeStep">
          <el-step title="角色信息" />
          <el-step title="权限信息" />
          <el-step title="检查并完成" />
        </el-steps>
      </div>
      <div v-show="activeStep === 1" class="form-container">
        <div class="title">角色信息</div>
        <div class="form">
          <el-form ref="roleForm" class="form-box" :model="roleForm" :rules="roleRules">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="roleForm.roleName" />
            </el-form-item>
            <el-form-item label="角色描述">
              <el-input v-model="roleForm.remark" />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div v-show="activeStep === 2" class="form-container">
        <div class="title">权限配置</div>
        <div class="form">
          <div class="tree-wrapper">
            <div v-for="item in treeList" :key="item.id" class="tree-item">
              <div class="tree-title">{{ item.title }}</div>
              <el-tree
                ref="tree"
                :data="item.children"
                show-checkbox
                default-expand-all
                node-key="id"
                highlight-current
                :props="{ label: 'title' }"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-show="activeStep === 3" class="form-container">
        <div class="title">检查并完成</div>
        <div class="form">
          <div class="info">
            <div class="form-item">角色名称：{{ roleForm.roleName }}</div>
            <div class="form-item">角色描述：{{ roleForm.remark }}</div>
            <div class="form-item">角色权限：</div>
            <div class="tree-wrapper">
              <div v-for="item in disabledTreeList" :key="item.id" class="tree-item">
                <div class="tree-title">{{ item.title }}</div>
                <!--
                  在内部通过遍历数组生成每一个树节点的时候 检测当前props选项中
                  是否传入了一个配置项 叫做disabled 如果传入了 调用这个方法拿到它的返回值
                  如果当前拿到的是true 就把当前项禁用掉 如果没有返回true 不禁用
                  arrary.some(item=> 判断条件)
                 -->
                <el-tree
                  ref="diabledTree"
                  :data="item.children"
                  show-checkbox
                  default-expand-all
                  node-key="id"
                  :highlight-current="false"
                  :props="{ label: 'title',disabled:()=>true}"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer class="add-footer">
      <div class="btn-container">
        <el-button v-if="activeStep > 1" @click="decreseStep">上一步</el-button>
        <el-button v-if="activeStep < 3" type="primary" @click="increseStep">下一步</el-button>
        <el-button v-if="activeStep === 3" type="primary" @click="confirmAdd">{{ roleId? '确认修改':'确认添加' }}</el-button>
      </div>
    </footer>
  </div>
</template>
<script>
import { getTreeListAPI, createRoleUserAPI, getRoleDetailAPI, updateRoleAPI } from '@/api/system'
// 处理禁用函数
export function addDisabled(treeList) {
  treeList.forEach(item => {
    item.disabled = true
    // 递归处理
    if (item.children && item.children.length > 0) {
      addDisabled(item.children)
    }
  })
}
export default {
  data() {
    return {
      disabledTreeList: [], // 禁用的tree列表
      treeList: [], // 权限树形列表
      activeStep: 1,
      roleForm: {
        roleName: '',
        remark: ''
      },
      roleRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      }
    }
  },
  // 缓存roleId
  computed: {
    roleId() {
      return this.$route.query.id
    }
  },
  mounted() {
    // 在初始化时候就加载好
    this.getTreeList()
    if (this.$route.query.id) {
      this.getRoleDetail()
    }
  },
  methods: {
    // 回填数据
    async getRoleDetail() {
      const res = await getRoleDetailAPI(this.roleId)
      const { perms, remark, roleId, roleName } = res.data
      // 回填基础表单
      this.roleForm = { perms, remark, roleId, roleName }
      // 回填Tree
      this.$refs.tree.forEach((tree, index) => {
        tree.setCheckedKeys(this.roleForm.perms[index])
      })
    },
    /**
     * 提交表单
     */
    async confirmAdd() {
      if (this.roleId) {
        // 编辑
        await updateRoleAPI(this.roleForm)
      } else {
        // 添加
        await createRoleUserAPI(this.roleForm)
      }
      this.$message({
        type: 'success',
        message: this.roleId ? '修改角色成功' : '添加角色成功'
      })
      this.$router.back()
    },
    // 获取功能权限列表
    async getTreeList() {
      const res = await getTreeListAPI()
      // 在disabledTreeList中放一份数据 因为数组是引用类型 在进行赋值的时候实际上赋值是数据的引用
      // 也就是说这俩份数据实际指向的是同一个内存区域（堆内存） 一个修改另一个也会受到影响
      this.treeList = res.data
      this.disabledTreeList = JSON.parse(JSON.stringify(res.data))
      // 处理禁用
      // addDisabled(this.disabledTreeList)
    },
    decreseStep() {
      if (this.activeStep === 1) return
      this.activeStep--
    },
    // 下一步
    increseStep() {
      if (this.activeStep === 3) return
      if (this.activeStep === 1) {
        // 当前是角色信息状态，进行表单校验
        this.$refs.roleForm.validate((valid) => {
          if (!valid) return
          this.activeStep++
        })
      } else if (this.activeStep === 2) {
        // 选择权限信息的状态
        // 目标：判断用户至少选择了一项
        // 思路: 获取到用户选择了什么 把每一项的数组展开合并为一个大数组 如果这个大数组长度大于零证明至少选中了一项
        this.roleForm.perms = []
        this.$refs.tree.forEach(tree => {
          this.roleForm.perms.push(tree.getCheckedKeys())
        })
        // 如果长度为零，没有选中任何东西
        if (this.roleForm.perms.flat().length === 0) {
          this.$message({
            type: 'error',
            message: '请至少选择一个权限点'
          })
        } else {
          this.activeStep++
          // 回填已选择数据
          // console.log(this.$refs.diabledTree)
          if (this.$refs.diabledTree) {
            this.$refs.diabledTree.forEach((tree, index) => {
              tree.setCheckedKeys(this.roleForm.perms[index])
            })
          }
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
.add-role {
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

      .arrow {
        cursor: pointer;
      }
    }

    .right {
      text-align: right;
    }
  }

  .add-main {
    position: fixed;
    top: 64px;
    bottom: 88px;
    width: 100%;
    overflow-y: auto;
    background: #f4f6f8;
    padding: 20px 230px;
    display: flex;
    .step-container {
      height: 400px;
      width: 200px;
    }
    .form-container {
      flex:1;
      background-color: #fff;
      overflow-y: auto;
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
        }
        .info{
          font-size:14px;
          color:#666;
          .form-item{
            margin-bottom:20px;
          }
        }
      }
      .form-box{
        width: 600px;
        display: flex;
        flex-direction: column;
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
    z-index: 10001;
  }
  .tree-wrapper {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .tree-item {
        flex: 1;
        padding: 0px 4px;
        text-align: center;
        .tree-title {
          background: #f5f7fa;
          text-align: center;
          padding: 10px 0;
          margin-bottom: 12px;
        }
      }
    }
}
</style>
