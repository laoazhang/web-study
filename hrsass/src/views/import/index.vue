<template>
  <upload-excel :on-success="handleSuccess" />
</template>

<script>
import { batchAddEmployeeApi } from '@/api/employees'
export default {
  name: 'Import',
  computed: {
    type() {
      return this.$route.query.type
    }
  },
  methods: {
    // 工资 考勤
    handleSuccess({ results, header }) {
      if (this.type === 'user') {
        this.batchAddEmployee(results)
      }
      if (this.type === 'salarys') {
        this.batchAddEmployee(results)
      }
    },
    async batchAddEmployee(results) {
      // header中, results中的数据是中文的, 但是提交给后台的要是英文的
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const list = []
      results.forEach(item => {
        const obj = {}
        for (const key in item) {
          const englishkey = userRelations[key]
          // 进行时间转换
          if (['timeOfEntry', 'correctionTime'].includes(englishkey)) {
            obj[englishkey] = this.formatExcelDate(item[key], '-')
          } else {
            obj[englishkey] = item[key]
          }
        }
        list.push(obj)
      })
      await batchAddEmployeeApi(list)
      this.$router.push('/employees')
    },
    // 时间转换
    formatExcelDate(numb, format) {
      const time = new Date((numb) * 24 * 3600000 + 1) // 毫秒
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + (month < 10 ? '0' + month : month) + format + (date < 10 ? '0' + date : date)
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style>

</style>
