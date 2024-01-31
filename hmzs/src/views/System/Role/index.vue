<template>
  <div class="role-container">
    <div class="left-wrapper">
      <div v-for="(item,index) in roleList" :key="item.roleId" class="role-item" :class="{active:index === activeIndex}" @click="changeRole(index)">
        <div class="role-info">
          <svg-icon :icon-class="index === activeIndex? 'user-active':'user'" class="icon" />
          {{ item.roleName }}
        </div>
        <div class="more">
          <el-dropdown>
            <span class="el-dropdown-link">
              <svg-icon icon-class="more" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="$router.push(`/roleAdd?id=${item.roleId}`)">编辑角色</el-dropdown-item>
              <el-dropdown-item @click.native="delRole(item.roleId)">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <el-button class="addBtn" size="mini" @click="$router.push('/roleAdd')">添加角色</el-button>
    </div>
    <div class="right-wrapper">
      <el-tabs v-model="activeName">
        <el-tab-pane label="功能权限" name="tree">
          <div class="tree-wrapper">
            <div v-for="item in treeList" :key="item.id" class="tree-item">
              <!-- title -->
              <div class="tree-title">{{ item.title }}</div>
              <!-- 树形结构 -->
              <el-tree
                ref="tree"
                :props="defaultProps"
                :data="item.children"
                show-checkbox
                highlight-current
                :default-expand-all="true"
                node-key="id"
              />
            </div>
          </div>
        </el-tab-pane>
        <!-- 模版渲染 -->
        <el-tab-pane :label="`成员(${roleUserList.length})`" name="user">
          <div class="user-wrapper">
            <el-table
              :data="roleUserList"
              style="width: 100%"
            >
              <el-table-column
                type="index"
                width="250"
                label="序号"
              />
              <el-table-column
                prop="name"
                label="员工姓名"
              />
              <el-table-column
                prop="userName"
                label="登录账号"
              />
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div></template>

<script>
import { getRoleListAPI, getTreeListAPI, getRoleDetailAPI, getRoleUserAPI, delRoleUserAPI } from '@/api/system'
// 递归处理函数
export function addDisabled(treeList) {
  treeList.forEach(item => {
    item.disabled = true
    // 递归处理
    if (item.children) {
      this.addDisabled(item.children)
    }
  })
}
export default {
  name: 'Role',
  data() {
    return {
      roleUserList: [], // 当前角色下的成员列表
      activeName: 'tree', // 默认打开tree
      activeIndex: 0,
      defaultProps: {
        children: 'children',
        label: 'title',
        disabled: (data, node) => {
          return true
        }
      },
      total: 0,
      // 角色列表
      roleList: [],
      // 权限树形列表
      treeList: [],
      // 角色对应权限点数据
      perms: []
    }
  },
  async mounted() {
    await this.getRoleList()
    await this.getTreeList()
    // 再获取当前角色下的权限列表
    this.getRoleDetail(this.roleList[0].roleId)
    this.getRoleUserList(this.roleList[0].roleId)
  },
  methods: {
    delRole(roleId) {
      this.$confirm('是否确认删除当前角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delRoleUserAPI(roleId)
        this.getRoleList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    /**
     * 封装获取当前角色下的成员的方法
     * @param {*} roleId
     */
    async getRoleUserList(roleId) {
      const res = await getRoleUserAPI(roleId)
      this.roleUserList = res.data.rows
    },
    /**
     * 获取当前角色详情
     * @param {*} roleId
     */
    async getRoleDetail(roleId) {
      const { data } = await getRoleDetailAPI(roleId)
      // console.log('当前角色下的权限点数据列表', data)
      this.perms = data.perms
      // 高亮权限列表
      const treeComponentList = this.$refs.tree
      // 调用setCheckedKeys方法
      treeComponentList.forEach((tree, index) => {
        tree.setCheckedKeys(this.perms[index])
      })
    },
    /**
     * 获取权限树形列表
     */
    async getTreeList() {
      const { data } = await getTreeListAPI()
      console.log('权限树形列表数据', data)
      this.treeList = data
      // 禁用
      // 目标：treeList里面的每一项以及嵌套的子项都添加一个disabled = true
      // addDisabled(this.treeList)
    },
    /**
     * 切换角色
     * @param {*} index
     */
    async changeRole(index) {
      this.activeIndex = index
      // 1. 获取当前角色下的权限点数据列表
      const roleId = this.roleList[index].roleId
      // console.log('当前选中的角色ID', roleId)
      this.getRoleDetail(roleId)
      // 2. 获取当前角色下的成员数据列表
      this.getRoleUserList(roleId)
    },
    /**
     * 获取角色列表
     */
    async getRoleList() {
      const { data } = await getRoleListAPI()
      // console.log('角色列表', data)
      this.roleList = data
    }
  }
}
</script>

<style scoped lang="scss">
.role-container {
  display: flex;
  font-size: 14px;
  background-color: #fff;
  padding:20px;
  .left-wrapper {
    width: 200px;
    border-right: 1px solid #e4e7ec;
    padding: 4px;
    text-align: center;

    .role-item {
      position: relative;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      cursor: pointer;

      &.active {
        background: #edf5ff;
        color: #4770ff;
      }
    }

    .role-info {
      display: flex;
      align-items: center;

      .icon {
        margin-right: 10px;
      }
    }

    .more {
      display: flex;
      align-items: center;
    }
    .addBtn{
      width: 100%;
      margin-top: 20px;
    }
  }

  .right-wrapper {
    flex: 1;

    .tree-wrapper {
      display: flex;
      justify-content: space-between;

      .tree-item {
        flex: 1;
        border-right: 1px solid #e4e7ec;
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

    ::v-deep .el-tabs__nav-wrap {
      padding-left: 20px;
    }

    .user-wrapper{
      padding:20px;
    }
  }
}
</style>
