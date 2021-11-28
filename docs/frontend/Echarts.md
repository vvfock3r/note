## Echarts

官网：https://echarts.apache.org/zh/index.html



### 第一个示例

`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- (1)引入echarts -->
    <script src="https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js"></script>
    <title>Document</title>
</head>
<body>
<!-- (2)创建图表容器，注意必须要设置宽高 -->
<div id="chart" style="width: 800px; height: 400px;"></div>

<script>
// 图表容器Dom
const chartDom = document.getElementById('chart');

// 初始化echarts对象
const chart = echarts.init(chartDom);

// 设置图表参数（这会将图表绘制出来）
chart.setOption({
    // 设置标题
    title: {
        text: 'Echarts入门'
    },

    // 设置x轴
    xAxis: {
        data: ["食品", "数码", "服饰", "箱包"]
    },

    // 设置y轴
    yAxis: {},

    // 设置图表类型和图标数据
    series: {
        type: 'bar', // 柱状图
        data: [100, 120, 50, 150] // 每个值和x轴分别对应
    },
})
</script>
</body>
</html>
```

![image-20211127220405848](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211127220405848.png)

### 组件

#### 概念说明

所有组件的官方文档地址：https://echarts.apache.org/zh/option.html

`Echarts`中除了绘图之外的其他部分，都可以抽象为**组件**，比如说标题、直角坐标系x轴、直角坐标系y轴等等，如下图

![image-20211127222514806](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211127222514806.png)



![image-20211127222910817](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211127222910817.png)



每个组件都有很多很多属性，我们最常用的大概如下几类：

* 是否显示组件开关

* 与组件本身强相关的属性，比如标题组件的主标题、副标题
* 组件渲染到哪里的的位置属性，比如top、left等
* 组件的样式属性，字体大小、颜色、换行等



#### 组件 - 标题

文档：https://echarts.apache.org/zh/option.html#title

`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- (1)引入echarts -->
    <script src="https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js"></script>
    <title>Document</title>
</head>
<body>
<!-- (2)创建图表容器 -->
<div id="chart" style="width: 800px; height: 400px;"></div>

<script>
// 图表容器Dom
const chartDom = document.getElementById('chart');

// 初始化echarts对象
const chart = echarts.init(chartDom);

// 设置图表参数（这会将图表绘制出来）
chart.setOption({
    // 设置标题
    title: {
        show: true, // 是否显示标题，默认为true
        text: 'Echarts入门',  // 主标题
        subtext: '这里是副标题,\n支持\\n换行', // 副标题
        left: 'center', // 标题组件水平居中
        textAlign: 'left',  // 水平对齐方式
        textStyle: {
            color: 'rgb(92,123,217)',   // 主标题文字颜色
        },
        subtextStyle: {
            color: 'orange',    // 副标题文字颜色
        }
    },

    // 设置x轴
    xAxis: {
        data: ["食品", "数码", "服饰", "箱包"]
    },

    // 设置y轴
    yAxis: {},

    // 设置图表类型和图标数据
    series: {
        type: 'bar', // 柱状图
        data: [100, 120, 50, 150] // 每个值和x轴分别对应
    },
})
</script>
</body>
</html>
```

![image-20211128140752858](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211128140752858.png)

#### 组件 - x轴

x轴和y轴是两个组件，一般组合起来使用构成直角坐标系

x轴：https://echarts.apache.org/zh/option.html#xAxis

`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- (1)引入echarts -->
    <script src="https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js"></script>
    <title>Document</title>
</head>
<body>
<!-- (2)创建图表容器 -->
<div id="chart" style="width: 800px; height: 400px; border: 1px solid green;"></div>

<script>
// 图表容器Dom
const chartDom = document.getElementById('chart');

// 初始化echarts对象
const chart = echarts.init(chartDom);

// 设置图表参数（这会将图表绘制出来）
chart.setOption({
    // 设置标题
    title: {
        text: 'Echarts入门',
        subtext: '这里是副标题',
    },

    // 设置x轴
    xAxis: {
        // 是否显示x轴，默认为true
        // show: false,

        // x轴类型，默认值为category(类目轴)
        type: 'category',

        // 类目轴中，所有类目名称列表，数组中每个元素可以是字符串，也可以是对象
        // data: ["食品", "数码", "服饰", "箱包"],
        data: [
            {
                value: "食品",
                textStyle: {
                    color: 'green'
                },
            },
            {
                value: "数码",
                textStyle: {
                    color: 'black'
                },
            },
            {
                value: "服饰",
                textStyle: {
                    color: 'orange'
                },
            },
            {
                value: "箱包",
                textStyle: {
                    color: 'blue'
                },
            },
            "占位",
            "占位",
            "占位",
            "占位",
            "占位",
            "占位",
            "占位",
            "占位",
            "占位",
            "占位",
            "占位",
            "占位",
            "占位",
            "占位",
            "占位",
        ],

        // x轴的位置，默认为bottom
        position: 'bottom',

        // x轴的横线
        axisLine: {
            show: true,
            lineStyle: {
                color: 'red',
                width: 1,
            }
        },

        // x轴横线下面的竖线
        axisTick: {
            show: true,
            alignWithLabel: true,   // 竖线指向类目轴中的文字
            interval: 0,            // 当类目很多时，每隔几个显示竖线，0表示显示全部竖线
            lineStyle: {
                color: 'green',
            }
        },

        // x轴中的类目文字
        axisLabel: {
            show: true,
            interval: 0, // 当类目很多时，每隔几个显示竖线，0表示显示全部类目文字
            rotate: 45, // 当类目超级多时，又要全部显示时，将文字旋转倾斜指定角度，更好的来显示类目文字
            formatter: function (value, index) {    // 类目文字样式格式化
                if (value === '占位') {
                    return value + index;
                }
                return value;
            },
            color: function (value, index) {    // 类目轴文字颜色，对于没有显示设置颜色的类目文字，才会调用这个函数
                // console.log(value, index);
                return index % 5 === 0 ? 'green' : 'red';   // 设置5的倍数为绿色，其他为红色
            }
        },

        // 竖长线
        splitLine: {
            show: true, // 默认为false
        },

        // 反向坐标轴, 默认为false
        // inverse: true,

        // 坐标轴两边留白策略，默认为true
        // boundaryGap: false,

        // x轴名称、位置和样式
        name: '这里是x轴名称,位置可调',
        nameLocation: 'center',
        nameTextStyle: {
            width: 800, // 宽度属性不生效，不知道为啥
            height: 10,
            padding: 40,
            align: 'center',
            verticalAlign: 'top',
            color: 'red',
            backgroundColor: 'orange',
            borderWidth: 1,
            borderColor: 'green',
        },
    },

    // 设置y轴
    yAxis: {},

    // 设置图表类型和图标数据
    series: {
        type: 'bar', // 柱状图
        data: [100, 120, 50, 150] // 每个值和x轴分别对应
    },
})
</script>
</body>
</html>
```

![image-20211128160412701](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211128160412701.png)



#### 组件 - y轴

x轴和y轴是两个组件，一般组合起来使用构成直角坐标系

y轴：https://echarts.apache.org/zh/option.html#yAxis



y轴和x轴很类似，所有相同的概念在这里就不重复说明了，y轴其余比较关心的有：

* 固定最小值和最大值
* y轴分段显示设置

`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- (1)引入echarts -->
    <script src="https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js"></script>
    <title>Document</title>
</head>
<body>
<!-- (2)创建图表容器 -->
<div id="chart" style="width: 800px; height: 400px; border: 1px solid green;"></div>

<script>
// 图表容器Dom
const chartDom = document.getElementById('chart');

// 初始化echarts对象
const chart = echarts.init(chartDom);

// 设置图表参数（这会将图表绘制出来）
chart.setOption({
    // 设置标题
    title: {
        text: 'Echarts入门',
        subtext: '这里是副标题',
    },

    // 设置x轴
    xAxis: {
        data: [
            {
                value: "食品",
                textStyle: {
                    color: 'green'
                },
            },
            {
                value: "数码",
                textStyle: {
                    color: 'black'
                },
            },
            {
                value: "服饰",
                textStyle: {
                    color: 'orange'
                },
            },
            {
                value: "箱包",
                textStyle: {
                    color: 'blue'
                },
            },
        ],
    },

    // 设置y轴
    yAxis: {
        // 默认为true
        show: true,

        // 默认为数值轴
        type: 'value',

        // 固定数值最小值和最大值
        // 如果不设置的话，最小值和最大值是动态变化的
        min: 0,
        max: 200,

        // 分割段数，默认为5
        // 在我们的代码中，max(200) / 10 = 20，即每段的值为20
        splitNumber: 10,

        // Y轴文字样式
        axisLabel: {
            formatter: function (value, index) {
                return value >= 100 ? 'Green ' + value : 'Red ' + value;
            },
            textStyle: {
                color: function (value, index) {
                    return value >= 100 ? 'green' : 'red';
                }
            }
        },

        // 是否留白，默认为true, 这个设置了好像没有生效？
        boundaryGap: false,
    },

    // 设置图表类型和图标数据
    series: {
        type: 'bar', // 柱状图
        data: [100, 120, 50, 150] // 每个值和x轴分别对应
    },
})
</script>
</body>
</html>
```

![image-20211128190227557](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211128190227557.png)







