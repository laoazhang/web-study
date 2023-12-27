export default {
  methods: {
    /**
     * 判断用户是否有二级权限
     */
    checkPermission(permission) {
      return this.roles?.points?.includes(permission)
    }
  }
}
