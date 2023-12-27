// mixins中的js文件可以声明跟你vue组件中声明一模一样的选项
// 如果像想在组件中使用mixins中选项 可以使用mixins混入
// 1.如果组件中和mixins中有相同的声明周期钩子 不会覆盖，会合并到（合并成一个数组）一起执行。先执行mixins中钩子，在执行组件中的钩子
// 2.如果组件中的data、methods、computed、watch（这些对象类型的配置）和mixins中的配置同名，则会产生覆盖，以组件内的为准
export default {
  data() {
    return {
      title: 'mixins中的title'
    }
  },
  methods: {
    printLog(from) {
      console.log('mixins中的methods')
    }
  },
  computed: {},
  watch: {},
  components: {},
  created() {
  },
  mounted() {}
}
