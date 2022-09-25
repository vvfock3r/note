<template>
  <div class="dashboard">
    <div class="section">
      <div id="pie"></div>
    </div>
  </div>
</template>

<script>
import {onMounted} from 'vue';

// 引入echarts中所有的图表和组件
// import * as echarts from 'echarts';

// 按需引入echarts图表和组件
import * as echarts from 'echarts/core';
import {PieChart} from 'echarts/charts';
import {TitleComponent, TooltipComponent, LegendComponent} from 'echarts/components';
import {CanvasRenderer} from 'echarts/renderers';

echarts.use([
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer
]);

export default {
  name: "Home",
  setup() {
    // 展示图表
    const showPieChart = () => {
      // 初始化
      const pieDom = document.getElementById('pie');
      const chart = echarts.init(pieDom, 'light');

      // 准备数据
      const data = [
        {name: 'Linux', value: 1},
        {name: '容器', value: 10},
        {name: '开发', value: 14},
      ]
      const total = data.reduce((total, current) => {
        return {
          value: total.value + current.value,
        }
      });

      // 配置选项
      const options = {
        // 标题
        title: [
          {
            text: '文章分类',
            left: 'center',
            top: 30
          },
          {
            text: "累计文章数量",
            subtext: total.value,
            x: '44%',     // 移动位置
            y: '45%',     // 移动位置
            textAlign: 'center',
            // 修改字体大小、颜色
            textStyle: {
              fontSize: 14,
              color: '#999',
            },
            subtextStyle: {
              fontSize: 28,
              color: '#333',
            }
          }
        ],
        // 图例
        legend: {
          // 排列规则
          type: 'scroll',
          orient: 'vertical',
          // 位置调整
          right: '3%',
          top: 'middle',
          // 注意：这里不支持HTML代码,可以使用\n换行
          formatter: function (name) {
            const item = data.filter((item) => item.name === name)[0];
            return `${name} (${item.value})`;
          },
          // 文本样式
          textStyle: {
            color: '#8c8c8c',
          },
        },
        // 标签文字
        label: {
          position: 'outside',
          // 自定义显示文本
          formatter: function (params) {
            let percent = Math.round(params.percent * 10) / 10; // 保留一位小数
            return `${params.name} (${percent}%)`;
          },
        },
        // 提示框
        tooltip: {},
        // 系列
        series: [
          {
            name: 'category',
            type: 'pie',
            data: data,
            // 调整一下圆的位置
            center: ['45%', '50%'],
            // 调整一下大小
            radius: ['38%', '50%'],
            // 定制各个数据块之间的留白
            itemStyle: {
              borderWidth: 4,
              borderColor: '#fff',
            },
            backgroundColor: 'red',
          }
        ]
      }

      // 渲染
      chart.setOption(options)

      // 动态调整图表大小
      window.addEventListener('resize', function () {
        chart.resize();
      })
    }

    // 销毁图表
    const disposePieChart = () => {
      const pieDom = document.getElementById('pie');
      const chart = echarts.init(pieDom, 'light');
      chart.dispose();
    }

    onMounted(() => {
      disposePieChart();
      showPieChart();
    })
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  width: 100%;
  height: calc(100vh - 220px);
  display: flex;
  justify-content: center;
  align-items: center;

  .section {
    width: 600px;
    height: 500px;
    border: 1px solid #ccc;
    border-radius: 15px;
  }

  #pie {
    width: 100%;
    height: 100%;
  }
}

// 超小屏手机
@media screen and (max-width: 320px) {
  .dashboard {
    .section {
      width: 500px;
      height: 300px;
      margin-top: 50px;
    }
  }
}
</style>