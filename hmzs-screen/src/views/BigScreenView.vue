<script setup>
import { ref, onMounted } from "vue";
import { useGetParkInfo, useInitBarChart, useInitPieChart } from './composables/bigscreen'
// 导入模型解析器的核心构造函数
import { Application } from '@splinetool/runtime'
// 导入loading组件
import LoadingComponent from '@/components/LoadingComponent.vue'
import VScaleScreen from 'v-scale-screen'

// 1、导入echarts包
// 2、获取要渲染的dom元素（准备好了宽高、并且以及渲染到页面中）
// 3、把dom元素传入到echart.init() 获取echarts实例
// 4、准备渲染echarts的配置项
// 5、把配置项 传给echarts实例

const { parkInfo, getParkInfo } = useGetParkInfo()
const { barChart, initBarChart } = useInitBarChart(parkInfo)
const { pieChart, initPieChart } = useInitPieChart(parkInfo)

const publisPath = 'https://fe-hmzs.itheima.net'
const ref3d = ref(null)
const showLoading = ref(false)
const init3D = () => {
  // 开启loading 
  showLoading.value = true
  // 创建解析器的构造函数并且传入要渲染的dom结构
  const spline = new Application(ref3d.value)
  // 调用后端结构 spline.load
  spline.load(`${publisPath}/scene.splinecode`).then(() => {
    // 执行then说明 模型已经渲染完毕了
    showLoading.value = false
    console.log('模型已经渲染完毕了');
  })
}

defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})

// 获取原生的dom对象
// 这个方法执行的时候 虽然在mounted中执行的 但是不能保证依赖的数据已经通过接口返回了
// 解决方案：等到数据返回之后才进行初始化操作
onMounted(async () => {
  await getParkInfo()
  initBarChart()
  initPieChart()
})
onMounted(() => {
  init3D()
})

</script>

<template>
  <VScaleScreen width="1920" height="1080">
    <div class="all-charts">
      <!-- 园区概况 -->
      <div class="section-one">
        <img class="img-header"
          src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%9B%AD%E5%8C%BA%E6%A6%82%E5%86%B5%402x.png"
          alt="" />
        <div class="icons-container">
          <div class="item">
            <div class="icons-item building-icon">
              <span class="number">
                {{ parkInfo.base?.buildingTotal }}
              </span>
            </div>
            <span class="title">楼宇总数</span>
            <span class="unity">（栋）</span>
          </div>
          <div class="item">
            <div class="icons-item enterprise-icon">
              <span class="number">
                {{ parkInfo.base?.enterpriseTotal }}
              </span>
            </div>
            <span class="title">入驻企业总数</span>
            <span class="unity">（家）</span>
          </div>
          <div class="item">
            <div class="icons-item car-icon">
              <span class="number">
                {{ parkInfo.base?.parkingTotal }}
              </span>
            </div>
            <span class="title">车位总数</span>
            <span class="unity">（个）</span>
          </div>
          <div class="item">
            <div class="icons-item rod-icon">
              <span class="number">
                {{ parkInfo.base?.chargePoleTotal }}
              </span>
            </div>
            <span class="title">一体杆总数</span>
            <span class="unity">（个）</span>
          </div>
        </div>
      </div>
      <!-- 园区年度收入分析 -->
      <div class="section-two">
        <img class="img-header"
          src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%9B%AD%E5%8C%BA%E5%B9%B4%E5%BA%A6%E6%94%B6%E5%85%A5%E5%88%86%E6%9E%90%402x.png"
          alt="" />
        <div class="bar-chart-titile">
          <span>单位：元</span>
          <div>
            <span class="bar-icon blue-bar-icon"></span>
            <span class="bar-icon red-bar-icon"></span>
            收入情况
          </div>
        </div>
        <div class="bar-chart" ref="barChart"></div>
      </div>
      <!-- 园区产业分布 -->
      <div class="section-three">
        <img class="img-header"
          src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%9B%AD%E5%8C%BA%E4%BA%A7%E4%B8%9A%E5%88%86%E5%B8%83%402x.png"
          alt="" />
        <div class="pie-chart" ref="pieChart"></div>
      </div>
    </div>
    <div class="model-container">
      <!-- 准备3D渲染节点 -->
      <!-- 进度条 -->
      <LoadingComponent :loading="showLoading" />
      <canvas class="canvas-3d" ref="ref3d" />
    </div>
  </VScaleScreen>
</template>

<style scoped lang="scss">
.model-container {
  height: 100%;
  background-color: black;
  width: 100%;
  flex-shrink: 0;
}

.section-two {
  flex-basis: 35%;

  .bar-chart {
    width: 100%;
    height: calc(100% - 90px);
  }
}

.section-three {
  flex-basis: 40%;

  .pie-chart {
    position: relative;
    margin: 0 auto;
    padding-bottom: 20px;
    width: 80%;
    height: calc(100% - 40px);
  }
}

.section-two {
  flex-basis: 35%;
  margin-top: 50px;

  .bar-chart {
    width: 100%;
    height: calc(100% - 90px);
  }
}

.all-charts {
  position: absolute;
  top: 0;
  left: 0;
  width: 480px;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(to left, rgba(0, 6, 15, 0.00) 0%, rgba(0, 6, 15, 0.00) 20%, rgba(0, 0, 0, 0.40) 30%, rgba(0, 0, 0, 0.60) 40%, rgba(1, 4, 11, 1) 70%, #04070d 100%);

  .img-header {
    height: 30px;
  }
}

.section-one {
  flex-basis: 25%;

  .icons-container {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;

    .item {
      text-align: center;
      display: flex;
      flex-direction: column;
      flex: 1;

      .icons-item {
        height: 80px;
        position: relative;

        .number {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          font-size: 18px;
          font-family: FontquanXinYiGuanHeiTi, FontquanXinYiGuanHeiTi-Regular;
          color: #ffffff;
        }
      }

      .building-icon {
        background: url('@/assets/building-icon.png') no-repeat 50% 0 / contain;
      }

      .enterprise-icon {
        background: url('@/assets/enterprise-icon.png') no-repeat 50% 0 / contain;
      }

      .rod-icon {
        background: url('@/assets/rod-icon.png') no-repeat 50% 0 / contain;
      }

      .car-icon {
        background: url('@/assets/car-icon.png') no-repeat 50% 0 / contain;
      }

      .title,
      .unity {
        font-size: 14px;
        color: #cdd7e1;
      }

      .title {
        margin-top: 8px;
      }
    }
  }
}
</style>