<template>
  <div class="login-page">
    <el-card>
      <template #header>黑马面经运营后台</template>
      <el-form autocomplete="off" :model="form" :rules="rules" ref="box">
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="输入用户名" v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" placeholder="输入用户密码" v-model="form.password"></el-input>
        </el-form-item>

        <el-form class="tc">
          <el-button type="primary" @click="submit()">登 录</el-button>
          <el-button  @click="resetForm()">重 置</el-button>
        </el-form>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'login-page',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: ['blur', 'change'] },
          { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
          { pattern: /^\w{5,11}$/, message: '请输入 5 到 10 位的密码', trigger: ['blur', 'change'] }
        ]
      }
      // \d 数字 0-9
      // \w 字母数字下划线
      // {m,n} 前面的字符，可以出现 m次 ~ n次
    }
  },
  methods: {
    submit () {
      this.$refs.box.validate(async (valid) => {
        if (valid) {
          // axios 数据提交
          const { data } = await this.$axios({
            url: '/auth/login',
            method: 'POST',
            data: this.form
          })
          console.log(data)
          // localStorage.setItem('pc-token', 'Bearer ' + data.token)
          //  方式二：调用vuex内 某个数据中心方法
          //  用法1：直接使用再视图、函数内部
          //  用法2：...mapXXX展开 键值对！只能放在methods、computed--->{对象中}
          this.$store.commit('user/set', data.token)
          this.$router.push({ path: '/' })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置
    resetForm () {
      this.$refs.box.resetFields()
    }

  }
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  background: url(@/assets/login-bg.svg) no-repeat center / cover;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .el-card {
    width: 420px;
    ::v-deep .el-card__header{
      height: 80px;
      background: rgba(114,124,245,1);
      text-align: center;
      line-height: 40px;
      color: #fff;
      font-size: 18px;
    }
  }
  .el-form {
    padding: 0 20px;
  }
  .tc {
    text-align: center;
  }
}
</style>
