## Echarts

官网：[https://echarts.apache.org/zh/index.html](https://echarts.apache.org/zh/index.html)

官网示例：[https://echarts.apache.org/examples/zh/index.html](https://echarts.apache.org/examples/zh/index.html)

第三方示例：[https://www.makeapie.com/explore.html](https://www.makeapie.com/explore.html)



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

![image-20211127220405848](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211127220405848.png)

### 组件

#### 概念说明

所有组件的官方文档地址：https://echarts.apache.org/zh/option.html

`Echarts`中除了绘图之外的其他部分，都可以抽象为**组件**，比如说标题、直角坐标系x轴、直角坐标系y轴等等，如下图

![image-20211127222514806](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211127222514806.png)



![image-20211127222910817](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211127222910817.png)



每个组件都有很多很多属性，我们最常用的大概如下几类：

* 是否显示组件开关

* 与组件本身强相关的属性，比如标题组件的主标题、副标题
* 组件渲染到哪里的的位置属性，比如top、left等
* 组件的样式属性，字体大小、颜色、换行等



#### 组件 - 标题

文档：https://echarts.apache.org/zh/option.html#title

::: details 点击查看完整代码

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

:::

![image-20211128140752858](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211128140752858.png)

#### 组件 - 系列简介

系列：https://echarts.apache.org/zh/option.html#series



**系列的概念**

简单来说，就是你要绘制哪种图形，比如一个直线图就是一个系列，一个柱状图也是一个系列，同样的还有饼图、K线图等等，

总结一下就是**一个系列就是一种图形**

参考下图：

![image-20211128194633870](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211128194633870.png)



**系列的使用**

光有系列还不够，每个系列还需要一些其他组件搭配使用，比如折线图、柱状图一般要和**直角坐标系**搭配来使用等



**可存在多个系列**

一个图标中可以存在多个系列，下面代码使用柱状图和折线图来说明

> 当然，一个图表中也可以存在多个不同类型的系列，比如柱状图和折线图2个系列组成一个图表

![image-20211128201039944](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211128201039944.png)

![image-20211128201555807](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211128201555807.png)



系列的内容太多，后面再详细解释每种图形的属性



#### 组件 - 直角坐标系

X轴和Y轴是两个组件，一般组合起来使用构成直角坐标系

X轴：https://echarts.apache.org/zh/option.html#xAxis

Y轴：https://echarts.apache.org/zh/option.html#yAxis



**X轴**

::: details 点击查看完整代码

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

:::

![image-20211128160412701](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211128160412701.png)



**Y轴**

Y轴和X轴很类似，所有相同的概念在这里就不重复说明了，Y轴其余比较关心的有：

* 固定最小值和最大值
* Y轴分段显示设置

`demo.html`

::: details 点击查看代码

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

:::

![image-20211128190227557](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211128190227557.png)

#### 组件 - 提示框

文档：https://echarts.apache.org/zh/option.html#tooltip

提示框最重要的是要知道如何改写样式，参考如下代码

::: details 点击查看完整代码

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
        text: '销售额',
        subtext: '包含北京和上海两个地区',
    },

    // 设置x轴
    xAxis: {
        data: ['食品', '数码', '服饰', '箱包'],
    },

    // 设置y轴
    yAxis: {},

    // 提示框
    tooltip: {
        show: true,
        // 触发类型,默认为 item, 其他可选：axis，none
        trigger: 'item',

        // 提示框内容，信息比较多，参考文档：https://echarts.apache.org/zh/option.html#tooltip.formatter
        // 我们来重写一下样式（如果想看默认样式，把下面这段代码注释即可）
        formatter: function (params, ticket, callback) {
            console.log(params);
            // seriesName   系列名称
            // 小圆点        params.marker
            // name         类目轴的类目文字
            // data/value   对应的Y轴数值
            return `以下为自定义样式<hr style="margin: 0;padding: 0;"/>${params.seriesName}<br />${params.marker} ${params.name} ${params.value}`;
        },
    },

    // 设置图表类型和图标数据
    series: [
        {
            name: "北京",	 // 这里需要给系列设置一个名字，提示框会用到
            type: 'bar',
            data: [100, 120, 50, 150]
        },
        {
            name: "上海", // 这里需要给系列设置一个名字，提示框会用到
            type: 'bar',
            data: [80, 100, 30, 130]
        },
    ],
})
</script>
</body>
</html>
```

:::

![image-20211128212706694](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211128212706694.png)

![image-20211128212905392](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211128212905392.png)

#### 组件 - 图例

文档：https://echarts.apache.org/zh/option.html#legend

图例一般用在多个系列的图表中，用来显示每个系列的说明

::: details 点击查看完整代码

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
        text: '销售额',
        subtext: '包含北京和上海两个地区',
    },

    // 设置x轴
    xAxis: {
        data: ['食品', '数码', '服饰', '箱包'],
    },

    // 设置y轴
    yAxis: {},

    // 提示框
    tooltip: {},

    // 图例
    legend: {
        show: true,

        // 图例类型
        //   * plain(普通图例)
        //   * scroll(可滚动翻页的图例。当图例数量较多时可以使用)
        type: 'scroll',

        // 布局朝向
        //   * horizontal 水平布局
        //   * vertical   垂直布局
        orient: 'vertical',

        // 系列公共样式
        top: 20,
        right: 0,

        data: [
            // 不同系列设置不同的样式
            {
                name: "北京",
                icon: 'circle',
                textStyle: {
                    color: 'rgb(92,123,217)',
                }
            },

            // 不同系列设置不同的样式
            {
                name: "上海",
                icon: 'roundRect',
                textStyle: {
                    color: 'rgb(145,204,117)',
                }
            }
        ]
    },

    // 设置图表类型和图标数据
    series: [
        {
            name: "北京",
            type: 'bar', // 柱状图
            data: [100, 120, 50, 150] // 每个值和x轴分别对应
        },
        {
            name: "上海",
            type: 'bar', // 柱状图
            data: [80, 100, 30, 130] // 每个值和x轴分别对应
        },
    ],
})
</script>
</body>
</html>
```

:::

![image-20211128215351897](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211128215351897.png)![image-20211128215534945](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211128215534945.png)

![image-20211128215717266](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211128215717266.png)



#### 组件 - 工具栏

文档：https://echarts.apache.org/zh/option.html#toolbox

工具栏内置有[导出图片](https://echarts.apache.org/zh/option.html#toolbox.feature.saveAsImage)，[数据视图](https://echarts.apache.org/zh/option.html#toolbox.feature.dataView)，[动态类型切换](https://echarts.apache.org/zh/option.html#toolbox.feature.magicType)，[数据区域缩放](https://echarts.apache.org/zh/option.html#toolbox.feature.dataZoom)，[重置](https://echarts.apache.org/zh/option.html#toolbox.feature.reset)五个工具

::: details 点击查看完整代码

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
        text: '销售额',
        subtext: '包含北京和上海两个地区',
        left: 'center',
    },

    // 设置x轴
    xAxis: {
        data: Array.from(Array(30), (v, k) => k + 1),   // 生成1-30号数据
    },

    // 设置y轴
    yAxis: {},

    // 工具栏
    toolbox: {
        show: true,
        feature: {
            // 保存为图片
            saveAsImage: {
                title: '保存为图片',
            },

            // 区域缩放，这个有两个图标，一个是缩放，一个是还原
            // 区域缩放使用方法：点击缩放图标，然后选中图标某一块区域，便能实现放大
            // 区域还原使用方法：直接点击图标即可
            dataZoom: {},

            // 重置，还原配置项
            restore: {},

            // 显示数据，而不是图形
            dataView: {},
        }
    },

    // 设置图表类型和图标数据
    series: [
        {
            name: "北京",
            type: 'line',
            // 随机生成10 - 300之间的正整数
            data: Array.from(Array(30), () => 10 + parseInt(Math.random() * 290, 10)),
        },
    ],
})
</script>
</body>
</html>
```

:::

![image-20211129225254096](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211129225254096.png)









#### 组件 - Grid

文档：https://echarts.apache.org/zh/option.html#grid

`grid`用来调整图表的位置



**基本示例**

::: details 点击查看完整代码

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
        text: '销售额',
        subtext: '包含北京和上海两个地区',
        left: 'center',
    },

    // 设置x轴
    xAxis: {
        data: ['食品', '数码', '服饰', '箱包'],
    },

    // 设置y轴
    yAxis: {},

    // 调整图表位置(不包含其他组件，比如图例等)
    grid: {
        // 以为下默认值
        // top: 60,
        // bottom: 60,
        // left: '10%',
        // right: '10%',

        // 如果我们想让图表再靠下一点的话，可以调整top和bottom的值
        top: 40,
        bottom: 40,

        // 如果我们想让图表再向左右都靠一点的话
        left: '5%',
        right: '5%',
    },

    // 设置图表类型和图标数据
    series: [
        {
            name: "北京",
            type: 'bar', // 柱状图
            data: [100, 120, 50, 150] // 每个值和x轴分别对应
        },
    ],
})
</script>
</body>
</html>
```

:::

![image-20211129215801320](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211129215801320.png)

**背景颜色调整示例**

::: details 点击查看完整代码

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
        text: '销售额',
        subtext: '包含北京和上海两个地区',
        left: 'center',
    },

    // 设置x轴
    xAxis: {
        data: ['食品', '数码', '服饰', '箱包'],
    },

    // 设置y轴
    yAxis: {
        splitLine: {
            show: true,
            lineStyle: {
                // 使用深浅的间隔色
                color: 'rgba(0,0,0,.1)',
            }
        },
    },

    // 调整图表位置(不包含其他组件，比如图例等)
    grid: {
        // 显示网格线
        show: true,

        // 设置背景颜色
        backgroundColor: '#ccc',
    },

    // 设置图表类型和图标数据
    series: [
        {
            name: "北京",
            type: 'bar', // 柱状图
            data: [100, 120, 50, 150] // 每个值和x轴分别对应
        },
    ],
})
</script>
</body>
</html>
```

:::

![image-20211129221217335](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211129221217335.png)



#### 组件 - 坐标轴指示器

文档：https://echarts.apache.org/zh/option.html#axisPointer

::: details 点击查看完整代码

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
        text: '销售额',
        subtext: '包含北京和上海两个地区',
        left: 'center',
    },

    // 设置x轴
    xAxis: {
        data: Array.from(Array(30), (v, k) => k + 1),   // 生成1-30号数据
        axisPointer: {
            show: true,
        },
    },

    // 设置y轴
    yAxis: {
        axisPointer: {
            show: true,
        },
    },
    
    // 设置图表类型和图标数据
    series: [
        {
            name: "北京",
            type: 'line', // 柱状图
            // 随机生成10 - 300之间的正整数
            data: Array.from(Array(30), () => 10 + parseInt(Math.random() * 290, 10)),
        },
    ],
})
</script>
</body>
</html>
```

:::

![image-20211129222757068](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211129222757068.png)

> X轴和Y轴中的虚线就是坐标轴指示器



### 常见图形

#### 折线图

::: details 点击查看完整代码

`demo.html`

```html
<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js"></script>
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            width: 100%;
            height: 100%;
        }

        .box {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            width: 100%;
        }

        .box .chart {
            width: 48%;
            height: 450px;
            margin: 10px;
            border: 1px solid green;
        }
    </style>
</head>
<body>
<div class="box">
    <div id="chart1" class="chart"></div>
    <div id="chart2" class="chart"></div>

</div>

<!-- 图表1 -->
<script>
const chart1DOM = document.getElementById('chart1');
const chart1 = echarts.init(chart1DOM);
chart1.setOption({
    title: {
        text: '2021年11月份楼盘售卖情况',
        subtext: '一份中规中矩的折线图',
        left: 'center',
        top: 13,
    },
    xAxis: {
        data: Array.from(Array(15), (v, k) => k + 1),   // 生成1-30号数据
        axisTick: {
            alignWithLabel: true,   // 竖线指向类目轴中的文字
            interval: 0,    // 显示X轴下面的全部竖线
        },
        axisLabel: {
            interval: 0, // 显示全部类目文字
        },
        axisPointer: {
            show: true,
        },
    },
    yAxis: {
        min: 0,
        max: 300,
    },
    tooltip: {
        formatter: function (params, ticket, callback) {
            let categoryName = `2021年11月${params[0].name}号`;
            let itemList = [];
            for (series of params) {
                const line = `${series.marker} ${series.seriesName} ${series.data}`;
                itemList.push(line);
            }
            return `${categoryName}<br />${itemList.join('<br />')}`
        },
    },
    legend: {
        right: 20,
        top: 20,
    },
    series: [
        {
            name: '成交',
            type: 'line',
            data: Array.from(Array(15), () => 10 + parseInt(Math.random() * 90, 10)),
        },
        {
            name: '预购',
            type: 'line',
            data: Array.from(Array(15), () => 10 + parseInt(Math.random() * 190, 10)),
        },
        {
            name: '意向',
            type: 'line',
            data: Array.from(Array(15), () => 10 + parseInt(Math.random() * 290, 10)),
        },
    ]
})
</script>

<!-- 图表2 -->
<script>
const chart2DOM = document.getElementById('chart2');
const chart2 = echarts.init(chart2DOM);

// 自定义标记所用的值
const customMarkList = Array.from(Array(15), () => 50 + parseInt(Math.random() * 50, 10));
const customMarkLast = customMarkList.length - 1;

chart2.setOption({
    title: {
        text: '线条样式定制',
        subtext: '提示: 请点击最下方图例来激活系列',
        left: 'center',
        top: 13,
    },
    xAxis: {
        name: 'x轴名称',
        data: Array.from(Array(15), () => 150 + parseInt(Math.random() * 50, 10)),
    },
    yAxis: {
        name: 'y轴名称',
        axisLine: {
            show: true,
        },
    },
    legend: {
        bottom: 15,
        selected: {
            '默认线条': true,
            '数值显示': false,
            '抹去小圆点': false,
            '抹去尖角': false,
            '数值标记': false,
            '面积图': false,
        }
    },

    series: [
        {
            name: '默认线条',
            type: 'line',
            data: Array.from(Array(15), () => 250 + parseInt(Math.random() * 50, 10)),
        },
        {
            name: '数值显示',
            type: 'line',
            data: Array.from(Array(15), () => 200 + parseInt(Math.random() * 50, 10)),
            // 定义图表上的文本标签
            label: {
                show: true,  // 开启后可以显示具体数值, 默认为false
                color: 'green',
            },
        },
        {
            name: '抹去小圆点',
            type: 'line',
            data: Array.from(Array(15), () => 150 + parseInt(Math.random() * 50, 10)),
            symbol: 'none',     // 去掉小圆点
        },
        {
            name: '抹去尖角',
            type: 'line',
            data: Array.from(Array(15), () => 100 + parseInt(Math.random() * 50, 10)),
            symbol: 'none',     // 去掉小圆点
            smooth: true,       // 抹去尖角，变得平滑
        },
        {
            name: '数值标记',
            type: 'line',
            data: customMarkList,
            markPoint: {
                data: [
                    // 这个会把折线中数值最大的标记出来，同理也可以标记最小值、平均值
                    {
                        name: '最大值',
                        type: 'max',
                    },
                    // 自定义标记，比如我就标记第一个
                    {
                        name: '自定义标记',
                        xAxis: customMarkLast,                  // x轴索引
                        yAxis: customMarkList[customMarkLast],  // y轴索引
                        value: 'Mark',           // 标记后显示的值是什么
                        symbol: 'pin',           // 标记样式，默认为pin，没有更好看的了..
                    }
                ],
            },
        },
        {
            name: '面积图',
            type: 'line',
            data: Array.from(Array(15), () => 0 + parseInt(Math.random() * 50, 10)),
            areaStyle: {},
        },
    ]
})
</script>
</body>
</html>
```

:::

![](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/echarts-line1.gif)



#### 柱状图

> 很多属性与折线图可以共用，只写几个不一样的

::: details 点击查看完整代码

`demo.html`

```html
<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js"></script>
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            width: 100%;
            height: 100%;
        }

        .box {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            width: 100%;
        }

        .box .chart {
            width: 48%;
            height: 450px;
            margin: 10px;
            border: 1px solid green;
        }
    </style>
</head>
<body>
<div class="box">
    <div id="chart1" class="chart"></div>
    <div id="chart2" class="chart"></div>

</div>

<!-- 图表1 -->
<script>
const chart1DOM = document.getElementById('chart1');
const chart1 = echarts.init(chart1DOM);
chart1.setOption({
    title: {
        text: '显示数值的柱状图',
        left: 'center',
        top: 13,
    },
    xAxis: {
        data: Array.from(Array(15), (v, k) => k + 1),   // 生成1-30号数据
        axisTick: {
            alignWithLabel: true,   // 竖线指向类目轴中的文字
            interval: 0,    // 显示X轴下面的全部竖线
        },
        axisLabel: {
            interval: 0, // 显示全部类目文字
        },
    },
    yAxis: {},

    series: {
        type: 'bar',
        data: Array.from(Array(15), () => 10 + parseInt(Math.random() * 90, 10)),
        label: {
            show: true,  // 开启后可以显示具体数值, 默认为false
            position: 'top', // 在顶部显示数值
        },
    },
})
</script>

<!-- 图表2 -->
<script>
const chart2DOM = document.getElementById('chart2');
const chart2 = echarts.init(chart2DOM);

// 自定义标记所用的值
const customMarkList = Array.from(Array(15), () => 50 + parseInt(Math.random() * 50, 10));
const customMarkLast = customMarkList.length - 1;

chart2.setOption({
    title: {
        text: '堆叠柱状图',
        left: 'center',
        top: 13,
    },
    xAxis: {
        data: Array.from(Array(15), () => 150 + parseInt(Math.random() * 50, 10)),
    },
    yAxis: {},

    series: [
        {
            type: 'bar',
            data: Array.from(Array(15), () => 10 + parseInt(Math.random() * 90, 10)),
            stack: '市值',     // 数据堆叠，两个柱状图设置成相同名称即可实现堆叠
        },
        {
            type: 'bar',
            data: Array.from(Array(15), () => 10 + parseInt(Math.random() * 10, 10)),
            stack: '市值',     // 数据堆叠，两个柱状图设置成相同名称即可实现堆叠
        },
    ]
})
</script>
</body>
</html>
```

:::

![image-20211203222328425](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211203222328425.png)



#### 饼图

::: details 点击查看完整代码

`demo.html`

```html
<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js"></script>
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            width: 100%;
            height: 100%;
        }

        .box {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            width: 100%;
        }

        .box .chart {
            width: 30%;
            height: 450px;
            margin: 10px;
            border: 1px solid green;
        }
    </style>
</head>
<body>
<div class="box">
    <div id="chart1" class="chart"></div>
    <div id="chart2" class="chart"></div>
    <div id="chart3" class="chart"></div>
    <div id="chart4" class="chart"></div>
    <div id="chart5" class="chart"></div>
    <div id="chart6" class="chart"></div>
</div>

<!-- 图表1 -->
<script>
const chart1DOM = document.getElementById('chart1');
const chart1 = echarts.init(chart1DOM);
chart1.setOption({
    title: {
        text: '默认饼图',
        left: 'center',
        top: 13,
    },
    tooltip: {},
    series: {
        name: '文章分类',
        type: 'pie',
        data: [
            {name: 'Python', value: 10},
            {name: 'Go', value: 30},
            {name: 'Java', value: 15},
            {name: 'Shell', value: 15},
            {name: '容器', value: 15},
        ],
    },
})
</script>

<!-- 图表2 -->
<script>
const chart2DOM = document.getElementById('chart2');
const chart2 = echarts.init(chart2DOM);
chart2.setOption({
    title: {
        text: '调整图形位置和大小(1)',
        subtext: '语法: 圆心坐标center和内外半径radius', // 这时候需要调整显示文字或调整饼图大小或位置等
        left: 'center',
        top: 10,
    },
    tooltip: {},
    series: {
        name: '文章分类',
        type: 'pie',
        data: [
            {name: 'Python', value: 10},
            {name: 'Go', value: 30},
            {name: 'Java', value: 15},
            {name: 'Shell', value: 15},
            {name: '容器', value: 15},
        ],

        // 调整圆的位置
        // center指的是圆心的x坐标和y坐标，默认为 ['50%', '50%']
        // 比如如果想靠左一点，那么将x轴坐标(第一个参数)调小即可
        center: ['50%', '50%'],

        // 调整圆的大小
        // radius设置圆的半径，语法是: [内半径, 外半径]，默认值是：[0, '75%']
        // 外半径最容易理解，就是我们平常理解的圆半径
        // 内半径默认是0，如果设置了这个值，会变成空心圆，内半径就是空心的半径
        radius: [0, '60%'],
    },
})
</script>

<!-- 图表3 -->
<script>
const chart3DOM = document.getElementById('chart3');
const chart3 = echarts.init(chart3DOM);
chart3.setOption({
    title: [
        // 标题1
        {
            text: '调整图形位置和大小和双标题(2)',
            subtext: '注意: 设置内圆半径radius',
            left: 'center',
            top: 10,
        },
        // 标题2
        {
            text: "标题2",
            subtext: '副标题',
            x: '48%',     // 移动位置
            y: '48%',     // 移动位置
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
    tooltip: {},
    series: {
        name: '文章分类',
        type: 'pie',
        data: [
            {name: 'Python', value: 10},
            {name: 'Go', value: 30},
            {name: 'Java', value: 15},
            {name: 'Shell', value: 15},
            {name: '容器', value: 15},
        ],

        // 调整一下圆的位置，不然会和副标题重叠
        center: ['50%', '55%'],

        // 调整一下大小，不然label文字显示不全
        radius: ['50%', '70%'],

        // 提示框
        tooltip: {}
    },
})
</script>

<!-- 图表4 -->
<script>
const chart4DOM = document.getElementById('chart4');
const chart4 = echarts.init(chart4DOM);
chart4.setOption({
    title: {
        text: '定制显示文字和提示框',
        subtext: '注意: 文字过长会引起显示不完全的情况', // 这时候需要调整显示文字或调整饼图大小或位置等
        left: 'center',
        top: 10,
    },
    tooltip: {},
    series: {
        name: '文章分类',
        type: 'pie',
        data: [
            {name: 'Python', value: 10},
            {name: 'Go', value: 30},
            {name: 'Java', value: 15},
            {name: 'Shell', value: 15},
            {name: '容器', value: 15},
        ],
        // label 标签文字
        label: {
            show: true, // 默认显示标签文字

            // 默认文字在圆外边，其他可选值: inside/inner(这俩一模一样，没有区别)、center
            // 选择inside或inner的话，就没有指示线条了
            position: 'outside',

            // 自定义显示文本
            formatter: function (params) {
                // params.value
                // params.percent 该数据所占的百分比, 这里的百分比是echarts帮我们计算出来的，
                //                如果想在其他地方(比如图例)获取百分比，好像只能自己计算
                let percent = parseInt(params.percent, 10);
                return `${params.name} ${params.value} (${percent}%)`;
            },
        },

        // 调整一下圆的位置，不然会和副标题重叠
        center: ['50%', '55%'],

        // 调整一下大小，不然label文字显示不全
        radius: [0, '70%'],

        // 定制提示框
        tooltip: {
            formatter: function (params, ticket, callback) {
                console.log(params);
                // seriesName   系列名称
                // 小圆点        params.marker
                // name         名称
                // data/value   数值
                // percent      百分比
                return `
                    ${params.seriesName}<br />
                    <span>${params.marker}</span>
                    <span style="display:inline-block; width: 50px;">${params.name}</span>
                    <span style="display: inline-block; width: 20px;">${params.value}</span>
                    <span>(${params.percent}%)</span>
                `;
            },
        }
    },
})
</script>

<!-- 图表5 -->
<script>
const chart5DOM = document.getElementById('chart5');
const chart5 = echarts.init(chart5DOM);
const chart5_data = [
    {name: 'Python', value: 10, percent: 11},
    {name: 'Go', value: 30, percent: 35},
    {name: 'Java', value: 15, percent: 17},
    {name: 'Shell', value: 15, percent: 15},
    {name: '容器', value: 15, percent: 17},
]
chart5.setOption({
    title: {
        text: '其他调整',
        subtext: '①线条②数据库留白③定制图例(不支持HTML)',
        left: 'center',
        top: 10,
    },

    // 提示框
    tooltip: {},

    // 图例
    legend: {
        // 排列规则
        type: 'scroll',
        orient: 'vertical',

        // 位置调整
        left: '70%',
        top: 'middle',

        // 注意：这里不支持HTML代码,可以使用\n换行
        formatter: function (name) {
            const item = chart5_data.filter((item) => item.name === name)[0];
            return `${name} (${item.percent}%)`;
        },

        // 文本样式
        textStyle: {
            color: '#8c8c8c',

        },
    },

    series: {
        name: '文章分类',
        type: 'pie',
        data: chart5_data,

        // 定制线条
        labelLine: {
            length: 50, // 线段1长度
            length2: 15, // 线段2长度
            smooth: false,   // 使线段更平滑(没有尖叫)，和折线图中的smooth一个意思
        },

        // 数据排列顺序，默认为true，代表顺时针排序
        clockwise: false,

        // 定制各个数据块之间的留白
        itemStyle: {
            borderWidth: 4,
            borderColor: '#fff',
        },

        // 调整一下圆的位置
        center: ['35%', '55%'],

        // 调整一下大小
        radius: [0, '40%'],
    },
})
</script>

<!-- 图表6 -->
<script>
const chart6DOM = document.getElementById('chart6');
const chart6 = echarts.init(chart6DOM);
const data = [
    {name: 'Python', value: 10, percent: 11},
    {name: 'Go', value: 30, percent: 35},
    {name: 'Java', value: 15, percent: 17},
    {name: 'Shell', value: 15, percent: 15},
    {name: '容器', value: 15, percent: 17},
]
chart6.setOption({
    title: [
        // 标题1
        {
            text: '最终成品',
            subtext: 'PS: 图例不支持HTML, 数值如何对齐?',
            left: 'center',
            top: 10,
        },
        // 标题2
        {
            text: "累计文章数量",
            subtext: '85',
            x: '39%',     // 移动位置
            y: '48%',     // 移动位置
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

    // 定制提示框
    tooltip: {
        formatter: function (params, ticket, callback) {
            return `
                    ${params.seriesName}<br />
                    <span>${params.marker}</span>
                    <span style="display:inline-block; width: 50px;">${params.name}</span>
                    <span style="display: inline-block; width: 20px;">${params.value}</span>
                    <span>(${params.percent}%)</span>
                `;
        },
    },

    // 图例
    legend: {
        // 排列规则
        type: 'scroll',
        orient: 'vertical',

        // 位置调整
        left: '77%',
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

    // label 标签文字
    label: {
        show: true,
        position: 'outside',

        // 自定义显示文本
        formatter: function (params) {
            let percent = parseInt(params.percent, 10);
            return `${params.name} (${percent}%)`;
        },
    },

    series: {
        name: '文章分类',
        type: 'pie',
        data: data,

        // 数据排列顺序，默认为true，代表顺时针排序
        clockwise: true,

        // 定制各个数据块之间的留白
        itemStyle: {
            borderWidth: 4,
            borderColor: '#fff',
        },

        // 调整一下圆的位置
        center: ['40%', '55%'],

        // 调整一下大小
        radius: ['42%', '52%'],
    },
})
</script>
</body>
</html>
```

:::

![image-20211204180301819](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211204180301819.png)

#### 地图

地图与常见的折线图/柱状图/饼图不太一样，首先了解一下`GeoJSON`



**GeoJSON概念**

> GeoJSON是一种对各种地理数据结构进行编码的格式，基于Javascript对象表示法(JavaScript Object Notation, 简称JSON)的地理空间信息数据交换格式。GeoJSON对象可以表示几何、特征或者特征集合。GeoJSON支持下面几何类型：点、线、面、多点、多线、多面和几何集合。GeoJSON里的特征包含一个几何对象和其他属性，特征集合表示一系列特征。     --- 百度百科



**Echarts和GeoJSON**

> ECharts 可以使用 [GeoJSON](http://geojson.org/) 格式的数据作为地图的轮廓，你可以获取第三方的 [GeoJSON](http://geojson.org/) 数据注册到 ECharts 中。例如第三方资源 [maps](https://github.com/echarts-maps)  --- Echarts



**如何获取`中国地图`的GeoJSON？**

echarts最新版本并不提供任何地图数据，但是老版本里提供了，我们可以先拿过来学习使用

JS版本：[https://raw.githubusercontent.com/apache/echarts/5.0.0-beta.2/map/js/china.js](https://raw.githubusercontent.com/apache/echarts/5.0.0-beta.2/map/js/china.js)



**代码示例**

> 代码有一些问题还没搞明白，后面想办法解决

::: details 点击查看完整代码

`demo.html`

```html
<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js"></script>
    <script src="./china.js"></script>
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            width: 100%;
            height: 100%;
        }

        .box {
            width: 100%;
            height: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: left;
            padding: 30px;
        }

        .box [id*=chart] {
            width: 32%;
            height: 400px;
            margin-right: 1%;
            border: 1px solid #333;
        }
    </style>
</head>
<body>
<div class="box">
    <div id="chart1"></div>
    <div id="chart2"></div>
    <div id="chart3"></div>
    <div id="chart4"></div>
</div>

<!-- 图表1 -->
<script>
const chart1DOM = document.getElementById('chart1');
const chart1 = echarts.init(chart1DOM);
chart1.setOption({
    title: {
        text: '默认的地图轮廓',
        subtext: '没有任何数据',
        left: 'center',
        top: 20,
    },

    series: {
        type: 'map',
        map: 'china',
    }
})
</script>

<!-- 图表2 -->
<script>
const chart2DOM = document.getElementById('chart2');
const chart2 = echarts.init(chart2DOM);
chart2.setOption({
    title: {
        text: '填充数据',
        subtext: '',
        left: 'center',
        top: 20,
    },

    // 开启提示框
    tooltip: {},

    series: [
        {
            name: 'xxx',
            type: 'map',
            map: 'china',

            // 选中模式(data中的selected)，默认为单选(single)
            selectedMode: 'multiple',

            data: [
                {name: '河北', value: 2, selected: true,},
                {name: '湖北', value: 1, selected: true,},
                {name: '黑龙江', value: 3, selected: true,},
            ],
        },
    ]
})
</script>

<!-- 图表3 -->
<script>
const chart3DOM = document.getElementById('chart3');
const chart3 = echarts.init(chart3DOM);
chart3.setOption({
    title: {
        text: '颜色主题',
        subtext: '还没找到合适的配色',
        left: 'center',
        top: 20,
    },

    // 开启提示框
    tooltip: {},

    series: {
        name: '小于2s',
        type: 'map',
        map: 'china',

        // 缩放比例, 默认为1
        zoom: 1,

        // 在地图区域显示图例的颜色
        showLegendSymbol: false,

        // 选中模式(data中的selected)，默认为单选(single)
        selectedMode: 'multiple',
        data: [
            {name: '河南', value: 2, selected: true,},
            {name: '内蒙古', value: 1, selected: true,},
            {name: '青海', value: 3, selected: true,},
        ],

        // 默认情况下的地图区域样式
        itemStyle: {
            areaColor: "#EEEEEE",   // 默认的背景颜色
            borderColor: '#FFFFFF',     // 默认的描边颜色
        },

        // 高亮时(鼠标放上去后)的地图区域样式
        emphasis: {
            itemStyle: {
                areaColor: 'skyblue',  // 背景颜色
                borderColor: 'skyblue',           // 描边颜色
            }
        },

        // 选中时的地图区域样式
        select: {
            itemStyle: {
                areaColor: 'rgb(145,204,117)',          // 背景颜色
                borderColor: 'rgb(145,204,117)',        // 描边颜色
            }
        }
    },

})
</script>

<!-- 图表4 -->
<script>
const chart4DOM = document.getElementById('chart4');
const chart4 = echarts.init(chart4DOM);
chart4.setOption({
    title: {
        text: '图例配置',
        subtext: '',
        left: 'center',
        top: 20,
    },

    // 开启提示框
    tooltip: {},
    
    // 开启图例
    legend: {
        // type: 'scroll',
        type: 'plain',
        orient: 'vertical',
        left: 20,
        bottom: 50,
        show: true,
        // 对地图不生效?
        data: [
            {name: '河北'},
            {name: '河南'},
            {name: '广东'},
            {name: '广西'},
            {name: '新疆'},
            {name: '西藏'},
        ],
    },

    series: [
        // 多个地图类型相同的系列会在同一地图上显示，这时候使用第一个系列的配置项作为地图绘制的配置
        {
            name: '小于1s',
            type: 'map',
            map: 'china',
            // 选中模式(data中的selected)，默认为单选(single)
            selectedMode: 'multiple',
            // 在地图区域显示图例的颜色
            showLegendSymbol: false,
            label: {
                show: false,
            },

            // 属性好像没效果
            // colorBy: 'data',

            data: [
                {
                    name: '河北',
                    value: 1,
                    selected: true,
                    select: {
                        itemStyle: {
                            areaColor: 'red',
                        },
                    },
                },
                {
                    name: '河南',
                    value: 1,
                    selected: true,
                    select: {
                        itemStyle: {
                            areaColor: 'green',
                        },
                    },
                },
                {
                    name: '广东',
                    value: 2,
                    selected: true,
                    select: {
                        itemStyle: {
                            areaColor: 'blue',
                        },
                    },
                },
                {
                    name: '广西',
                    value: 2,
                    selected: true,
                    select: {
                        itemStyle: {
                            areaColor: 'white',
                        },
                    },
                },
                {
                    name: '新疆',
                    value: 3,
                    selected: true,
                    select: {
                        itemStyle: {
                            areaColor: 'rgb(145,204,117)',
                        },
                    },
                },
                {
                    name: '西藏',
                    value: 3,
                    selected: true,
                    select: {
                        itemStyle: {
                            areaColor: 'orange',
                        },
                    },
                },
            ],
        },

        // {
        //     name: '小于2s',
        //     type: 'map',
        //     map: 'china',
        //     // 选中模式(data中的selected)，默认为单选(single)
        //     selectedMode: 'multiple',
        //     // 在地图区域显示图例的颜色
        //     showLegendSymbol: false,
        //     data: [
        //         {name: '广东', value: 2, selected: true},
        //         {name: '广西', value: 2, selected: true},
        //     ],
        // },
        // {
        //     name: '小于3s',
        //     type: 'map',
        //     map: 'china',
        //     // 选中模式(data中的selected)，默认为单选(single)
        //     selectedMode: 'multiple',
        //     // 在地图区域显示图例的颜色
        //     showLegendSymbol: false,
        //     data: [
        //         {name: '新疆', value: 3, selected: true},
        //         {name: '西藏', value: 3, selected: true},
        //     ],
        // },
    ],
})
</script>
</body>
</html>
```

:::

![image-20211211013327301](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211211013327301.png)





### 颜色主题和图形渲染



#### 切换内置主题

文档：[https://echarts.apache.org/handbook/zh/concepts/style/#颜色主题（theme）](https://echarts.apache.org/handbook/zh/concepts/style/#颜色主题（theme）)

内置的主题：

* 默认主题
* 明亮模式 `light`
* 暗黑模式 `dark`

> 在文档中只提到了`dark`主题，在别的资料中看到了`litght`主题，实验了也确实有效果，
>
> 默认主题可以写任何字符串，只要不与已经存在的主题冲突，就会自动应用默认主题，比如`default`



如果要修改主题，只需要在初始化时设置第二个参数即可，比如

```javascript
const chart = echarts.init(chartDom2, "dark");
```

::: details 点击查看完整代码

`demo.html`

```html
<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js"></script>
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            width: 100%;
            height: 100%;
        }

        .box {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            width: 100%;
        }

        .box .chart {
            width: 30%;
            height: 450px;
            margin: 10px;
            border: 1px solid green;
        }
    </style>
</head>
<body>
<div class="box">
    <div id="chart1" class="chart"></div>
    <div id="chart2" class="chart"></div>
    <div id="chart3" class="chart"></div>
</div>

<!-- 图表1 -->
<script>
const chart1DOM = document.getElementById('chart1');
const chart1 = echarts.init(chart1DOM,);
const chart1_data = [
    {name: 'Python', value: 10, percent: 11},
    {name: 'Go', value: 30, percent: 35},
    {name: 'Java', value: 15, percent: 17},
    {name: 'Shell', value: 15, percent: 15},
    {name: '容器', value: 15, percent: 17},
]
chart1.setOption({
    title: [
        // 标题1
        {
            text: '默认主题',
            subtext: 'echarts内置主题',
            left: 'center',
            top: 10,
        },
        // 标题2
        {
            text: "累计文章数量",
            subtext: '85',
            x: '39%',     // 移动位置
            y: '48%',     // 移动位置
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

    // 定制提示框
    tooltip: {
        formatter: function (params, ticket, callback) {
            return `
                    ${params.seriesName}<br />
                    <span>${params.marker}</span>
                    <span style="display:inline-block; width: 50px;">${params.name}</span>
                    <span style="display: inline-block; width: 20px;">${params.value}</span>
                    <span>(${params.percent}%)</span>
                `;
        },
    },

    // 图例
    legend: {
        // 排列规则
        type: 'scroll',
        orient: 'vertical',

        // 位置调整
        left: '77%',
        top: 'middle',

        // 注意：这里不支持HTML代码,可以使用\n换行
        formatter: function (name) {
            const item = chart1_data.filter((item) => item.name === name)[0];
            return `${name} (${item.value})`;
        },

        // 文本样式
        textStyle: {
            color: '#8c8c8c',
        },
    },

    // label 标签文字
    label: {
        show: true,
        position: 'outside',

        // 自定义显示文本
        formatter: function (params) {
            let percent = parseInt(params.percent, 10);
            return `${params.name} (${percent}%)`;
        },
    },

    series: {
        name: '文章分类',
        type: 'pie',
        data: chart1_data,

        // 数据排列顺序，默认为true，代表顺时针排序
        clockwise: true,

        // 定制各个数据块之间的留白
        itemStyle: {
            borderWidth: 4,
            borderColor: '#fff',
        },

        // 调整一下圆的位置
        center: ['40%', '55%'],

        // 调整一下大小
        radius: ['42%', '52%'],
    },
})
</script>

<!-- 图表2 -->
<script>
const chart2DOM = document.getElementById('chart2');
const chart2 = echarts.init(chart2DOM, 'light');
const chart2_data = [
    {name: 'Python', value: 10, percent: 11},
    {name: 'Go', value: 30, percent: 35},
    {name: 'Java', value: 15, percent: 17},
    {name: 'Shell', value: 15, percent: 15},
    {name: '容器', value: 15, percent: 17},
]
chart2.setOption({
    title: [
        // 标题1
        {
            text: 'light主题',
            subtext: 'echarts内置主题',
            left: 'center',
            top: 10,
        },
        // 标题2
        {
            text: "累计文章数量",
            subtext: '85',
            x: '39%',     // 移动位置
            y: '48%',     // 移动位置
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

    // 定制提示框
    tooltip: {
        formatter: function (params, ticket, callback) {
            return `
                    ${params.seriesName}<br />
                    <span>${params.marker}</span>
                    <span style="display:inline-block; width: 50px;">${params.name}</span>
                    <span style="display: inline-block; width: 20px;">${params.value}</span>
                    <span>(${params.percent}%)</span>
                `;
        },
    },

    // 图例
    legend: {
        // 排列规则
        type: 'scroll',
        orient: 'vertical',

        // 位置调整
        left: '77%',
        top: 'middle',

        // 注意：这里不支持HTML代码,可以使用\n换行
        formatter: function (name) {
            const item = chart2_data.filter((item) => item.name === name)[0];
            return `${name} (${item.value})`;
        },

        // 文本样式
        textStyle: {
            color: '#8c8c8c',
        },
    },

    // label 标签文字
    label: {
        show: true,
        position: 'outside',

        // 自定义显示文本
        formatter: function (params) {
            let percent = parseInt(params.percent, 10);
            return `${params.name} (${percent}%)`;
        },
    },

    series: {
        name: '文章分类',
        type: 'pie',
        data: chart2_data,

        // 数据排列顺序，默认为true，代表顺时针排序
        clockwise: true,

        // 定制各个数据块之间的留白
        itemStyle: {
            borderWidth: 4,
            borderColor: '#fff',
        },

        // 调整一下圆的位置
        center: ['40%', '55%'],

        // 调整一下大小
        radius: ['42%', '52%'],
    },
})
</script>

<!-- 图表3 -->
<script>
const chart3DOM = document.getElementById('chart3');
const chart3 = echarts.init(chart3DOM, 'dark');
const chart3_data = [
    {name: 'Python', value: 10, percent: 11},
    {name: 'Go', value: 30, percent: 35},
    {name: 'Java', value: 15, percent: 17},
    {name: 'Shell', value: 15, percent: 15},
    {name: '容器', value: 15, percent: 17},
]
chart3.setOption({
    title: [
        // 标题1
        {
            text: 'dark主题',
            subtext: 'echarts内置主题',
            left: 'center',
            top: 10,
        },
        // 标题2
        {
            text: "累计文章数量",
            subtext: '85',
            x: '39%',     // 移动位置
            y: '48%',     // 移动位置
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

    // 定制提示框
    tooltip: {
        formatter: function (params, ticket, callback) {
            return `
                    ${params.seriesName}<br />
                    <span>${params.marker}</span>
                    <span style="display:inline-block; width: 50px;">${params.name}</span>
                    <span style="display: inline-block; width: 20px;">${params.value}</span>
                    <span>(${params.percent}%)</span>
                `;
        },
    },

    // 图例
    legend: {
        // 排列规则
        type: 'scroll',
        orient: 'vertical',

        // 位置调整
        left: '77%',
        top: 'middle',

        // 注意：这里不支持HTML代码,可以使用\n换行
        formatter: function (name) {
            const item = chart3_data.filter((item) => item.name === name)[0];
            return `${name} (${item.value})`;
        },

        // 文本样式
        textStyle: {
            color: '#8c8c8c',
        },
    },

    // label 标签文字
    label: {
        show: true,
        position: 'outside',

        // 自定义显示文本
        formatter: function (params) {
            let percent = parseInt(params.percent, 10);
            return `${params.name} (${percent}%)`;
        },
    },

    series: {
        name: '文章分类',
        type: 'pie',
        data: chart3_data,

        // 数据排列顺序，默认为true，代表顺时针排序
        clockwise: true,

        // 定制各个数据块之间的留白
        itemStyle: {
            borderWidth: 4,
            borderColor: '#fff',
        },

        // 调整一下圆的位置
        center: ['40%', '55%'],

        // 调整一下大小
        radius: ['42%', '52%'],
    },
})
</script>
</body>
</html>
```

:::

![image-20211204184203145](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211204184203145.png)



#### 使用自定义主题

文档：[https://echarts.apache.org/zh/theme-builder.html](https://echarts.apache.org/zh/theme-builder.html)

**第一步：先选择一个合适的主题，并拷贝到剪贴板**

![image-20211204184625176](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211204184625176.png)



**第二步：将JS代码粘贴到HTML文件中**

js代码中会给主题起一个名字，在代码中可以找到，比如

```javascript
echarts.registerTheme('westeros', {
```

> 这里为了方便直接将主题代码放入head > script标签中



**第三步：将主题修改为JavaScript代码中注册的主题**

```javascript
const chart = echarts.init(chartDom, 'westeros');
```

::: details 点击查看完整代码

`demo.html`

```html
<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js"></script>
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            width: 100%;
            height: 100%;
        }

        .box {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            width: 100%;
        }

        .box .chart {
            width: 30%;
            height: 450px;
            margin: 10px;
            border: 1px solid green;
        }
    </style>
    <!-- echarts定制主题westeros -->
    <script>
    (function (root, factory) {
        if (typeof define === 'function' && define.amd) {
            // AMD. Register as an anonymous module.
            define(['exports', 'echarts'], factory);
        } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
            // CommonJS
            factory(exports, require('echarts'));
        } else {
            // Browser globals
            factory({}, root.echarts);
        }
    }(this, function (exports, echarts) {
        var log = function (msg) {
            if (typeof console !== 'undefined') {
                console && console.error && console.error(msg);
            }
        };
        if (!echarts) {
            log('ECharts is not Loaded');
            return;
        }
        echarts.registerTheme('westeros', {
            "color": [
                "#516b91",
                "#59c4e6",
                "#edafda",
                "#93b7e3",
                "#a5e7f0",
                "#cbb0e3"
            ],
            "backgroundColor": "rgba(0,0,0,0)",
            "textStyle": {},
            "title": {
                "textStyle": {
                    "color": "#516b91"
                },
                "subtextStyle": {
                    "color": "#93b7e3"
                }
            },
            "line": {
                "itemStyle": {
                    "borderWidth": "2"
                },
                "lineStyle": {
                    "width": "2"
                },
                "symbolSize": "6",
                "symbol": "emptyCircle",
                "smooth": true
            },
            "radar": {
                "itemStyle": {
                    "borderWidth": "2"
                },
                "lineStyle": {
                    "width": "2"
                },
                "symbolSize": "6",
                "symbol": "emptyCircle",
                "smooth": true
            },
            "bar": {
                "itemStyle": {
                    "barBorderWidth": 0,
                    "barBorderColor": "#ccc"
                }
            },
            "pie": {
                "itemStyle": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            },
            "scatter": {
                "itemStyle": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            },
            "boxplot": {
                "itemStyle": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            },
            "parallel": {
                "itemStyle": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            },
            "sankey": {
                "itemStyle": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            },
            "funnel": {
                "itemStyle": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            },
            "gauge": {
                "itemStyle": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            },
            "candlestick": {
                "itemStyle": {
                    "color": "#edafda",
                    "color0": "transparent",
                    "borderColor": "#d680bc",
                    "borderColor0": "#8fd3e8",
                    "borderWidth": "2"
                }
            },
            "graph": {
                "itemStyle": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                },
                "lineStyle": {
                    "width": 1,
                    "color": "#aaa"
                },
                "symbolSize": "6",
                "symbol": "emptyCircle",
                "smooth": true,
                "color": [
                    "#516b91",
                    "#59c4e6",
                    "#edafda",
                    "#93b7e3",
                    "#a5e7f0",
                    "#cbb0e3"
                ],
                "label": {
                    "color": "#eee"
                }
            },
            "map": {
                "itemStyle": {
                    "areaColor": "#f3f3f3",
                    "borderColor": "#516b91",
                    "borderWidth": 0.5
                },
                "label": {
                    "color": "#000"
                },
                "emphasis": {
                    "itemStyle": {
                        "areaColor": "#a5e7f0",
                        "borderColor": "#516b91",
                        "borderWidth": 1
                    },
                    "label": {
                        "color": "#516b91"
                    }
                }
            },
            "geo": {
                "itemStyle": {
                    "areaColor": "#f3f3f3",
                    "borderColor": "#516b91",
                    "borderWidth": 0.5
                },
                "label": {
                    "color": "#000"
                },
                "emphasis": {
                    "itemStyle": {
                        "areaColor": "#a5e7f0",
                        "borderColor": "#516b91",
                        "borderWidth": 1
                    },
                    "label": {
                        "color": "#516b91"
                    }
                }
            },
            "categoryAxis": {
                "axisLine": {
                    "show": true,
                    "lineStyle": {
                        "color": "#cccccc"
                    }
                },
                "axisTick": {
                    "show": false,
                    "lineStyle": {
                        "color": "#333"
                    }
                },
                "axisLabel": {
                    "show": true,
                    "color": "#999999"
                },
                "splitLine": {
                    "show": true,
                    "lineStyle": {
                        "color": [
                            "#eeeeee"
                        ]
                    }
                },
                "splitArea": {
                    "show": false,
                    "areaStyle": {
                        "color": [
                            "rgba(250,250,250,0.05)",
                            "rgba(200,200,200,0.02)"
                        ]
                    }
                }
            },
            "valueAxis": {
                "axisLine": {
                    "show": true,
                    "lineStyle": {
                        "color": "#cccccc"
                    }
                },
                "axisTick": {
                    "show": false,
                    "lineStyle": {
                        "color": "#333"
                    }
                },
                "axisLabel": {
                    "show": true,
                    "color": "#999999"
                },
                "splitLine": {
                    "show": true,
                    "lineStyle": {
                        "color": [
                            "#eeeeee"
                        ]
                    }
                },
                "splitArea": {
                    "show": false,
                    "areaStyle": {
                        "color": [
                            "rgba(250,250,250,0.05)",
                            "rgba(200,200,200,0.02)"
                        ]
                    }
                }
            },
            "logAxis": {
                "axisLine": {
                    "show": true,
                    "lineStyle": {
                        "color": "#cccccc"
                    }
                },
                "axisTick": {
                    "show": false,
                    "lineStyle": {
                        "color": "#333"
                    }
                },
                "axisLabel": {
                    "show": true,
                    "color": "#999999"
                },
                "splitLine": {
                    "show": true,
                    "lineStyle": {
                        "color": [
                            "#eeeeee"
                        ]
                    }
                },
                "splitArea": {
                    "show": false,
                    "areaStyle": {
                        "color": [
                            "rgba(250,250,250,0.05)",
                            "rgba(200,200,200,0.02)"
                        ]
                    }
                }
            },
            "timeAxis": {
                "axisLine": {
                    "show": true,
                    "lineStyle": {
                        "color": "#cccccc"
                    }
                },
                "axisTick": {
                    "show": false,
                    "lineStyle": {
                        "color": "#333"
                    }
                },
                "axisLabel": {
                    "show": true,
                    "color": "#999999"
                },
                "splitLine": {
                    "show": true,
                    "lineStyle": {
                        "color": [
                            "#eeeeee"
                        ]
                    }
                },
                "splitArea": {
                    "show": false,
                    "areaStyle": {
                        "color": [
                            "rgba(250,250,250,0.05)",
                            "rgba(200,200,200,0.02)"
                        ]
                    }
                }
            },
            "toolbox": {
                "iconStyle": {
                    "borderColor": "#999"
                },
                "emphasis": {
                    "iconStyle": {
                        "borderColor": "#666"
                    }
                }
            },
            "legend": {
                "textStyle": {
                    "color": "#999999"
                }
            },
            "tooltip": {
                "axisPointer": {
                    "lineStyle": {
                        "color": "#ccc",
                        "width": 1
                    },
                    "crossStyle": {
                        "color": "#ccc",
                        "width": 1
                    }
                }
            },
            "timeline": {
                "lineStyle": {
                    "color": "#8fd3e8",
                    "width": 1
                },
                "itemStyle": {
                    "color": "#8fd3e8",
                    "borderWidth": 1
                },
                "controlStyle": {
                    "color": "#8fd3e8",
                    "borderColor": "#8fd3e8",
                    "borderWidth": 0.5
                },
                "checkpointStyle": {
                    "color": "#8fd3e8",
                    "borderColor": "#8a7ca8"
                },
                "label": {
                    "color": "#8fd3e8"
                },
                "emphasis": {
                    "itemStyle": {
                        "color": "#8fd3e8"
                    },
                    "controlStyle": {
                        "color": "#8fd3e8",
                        "borderColor": "#8fd3e8",
                        "borderWidth": 0.5
                    },
                    "label": {
                        "color": "#8fd3e8"
                    }
                }
            },
            "visualMap": {
                "color": [
                    "#516b91",
                    "#59c4e6",
                    "#a5e7f0"
                ]
            },
            "dataZoom": {
                "backgroundColor": "rgba(0,0,0,0)",
                "dataBackgroundColor": "rgba(255,255,255,0.3)",
                "fillerColor": "rgba(167,183,204,0.4)",
                "handleColor": "#a7b7cc",
                "handleSize": "100%",
                "textStyle": {
                    "color": "#333"
                }
            },
            "markPoint": {
                "label": {
                    "color": "#eee"
                },
                "emphasis": {
                    "label": {
                        "color": "#eee"
                    }
                }
            }
        });
    }));
    </script>
</head>
<body>
<div class="box">
    <div id="chart1" class="chart"></div>
    <div id="chart2" class="chart"></div>
    <div id="chart3" class="chart"></div>
    <div id="chart4" class="chart"></div>
</div>

<!-- 图表1 -->
<script>
const chart1DOM = document.getElementById('chart1');
const chart1 = echarts.init(chart1DOM,);
const chart1_data = [
    {name: 'Python', value: 10, percent: 11},
    {name: 'Go', value: 30, percent: 35},
    {name: 'Java', value: 15, percent: 17},
    {name: 'Shell', value: 15, percent: 15},
    {name: '容器', value: 15, percent: 17},
]
chart1.setOption({
    title: [
        // 标题1
        {
            text: '默认主题',
            subtext: 'echarts内置主题',
            left: 'center',
            top: 10,
        },
        // 标题2
        {
            text: "累计文章数量",
            subtext: '85',
            x: '39%',     // 移动位置
            y: '48%',     // 移动位置
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

    // 定制提示框
    tooltip: {
        formatter: function (params, ticket, callback) {
            return `
                    ${params.seriesName}<br />
                    <span>${params.marker}</span>
                    <span style="display:inline-block; width: 50px;">${params.name}</span>
                    <span style="display: inline-block; width: 20px;">${params.value}</span>
                    <span>(${params.percent}%)</span>
                `;
        },
    },

    // 图例
    legend: {
        // 排列规则
        type: 'scroll',
        orient: 'vertical',

        // 位置调整
        left: '77%',
        top: 'middle',

        // 注意：这里不支持HTML代码,可以使用\n换行
        formatter: function (name) {
            const item = chart1_data.filter((item) => item.name === name)[0];
            return `${name} (${item.value})`;
        },

        // 文本样式
        textStyle: {
            color: '#8c8c8c',
        },
    },

    // label 标签文字
    label: {
        show: true,
        position: 'outside',

        // 自定义显示文本
        formatter: function (params) {
            let percent = parseInt(params.percent, 10);
            return `${params.name} (${percent}%)`;
        },
    },

    series: {
        name: '文章分类',
        type: 'pie',
        data: chart1_data,

        // 数据排列顺序，默认为true，代表顺时针排序
        clockwise: true,

        // 定制各个数据块之间的留白
        itemStyle: {
            borderWidth: 4,
            borderColor: '#fff',
        },

        // 调整一下圆的位置
        center: ['40%', '55%'],

        // 调整一下大小
        radius: ['42%', '52%'],
    },
})
</script>

<!-- 图表2 -->
<script>
const chart2DOM = document.getElementById('chart2');
const chart2 = echarts.init(chart2DOM, 'light');
const chart2_data = [
    {name: 'Python', value: 10, percent: 11},
    {name: 'Go', value: 30, percent: 35},
    {name: 'Java', value: 15, percent: 17},
    {name: 'Shell', value: 15, percent: 15},
    {name: '容器', value: 15, percent: 17},
]
chart2.setOption({
    title: [
        // 标题1
        {
            text: 'light主题',
            subtext: 'echarts内置主题',
            left: 'center',
            top: 10,
        },
        // 标题2
        {
            text: "累计文章数量",
            subtext: '85',
            x: '39%',     // 移动位置
            y: '48%',     // 移动位置
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

    // 定制提示框
    tooltip: {
        formatter: function (params, ticket, callback) {
            return `
                    ${params.seriesName}<br />
                    <span>${params.marker}</span>
                    <span style="display:inline-block; width: 50px;">${params.name}</span>
                    <span style="display: inline-block; width: 20px;">${params.value}</span>
                    <span>(${params.percent}%)</span>
                `;
        },
    },

    // 图例
    legend: {
        // 排列规则
        type: 'scroll',
        orient: 'vertical',

        // 位置调整
        left: '77%',
        top: 'middle',

        // 注意：这里不支持HTML代码,可以使用\n换行
        formatter: function (name) {
            const item = chart2_data.filter((item) => item.name === name)[0];
            return `${name} (${item.value})`;
        },

        // 文本样式
        textStyle: {
            color: '#8c8c8c',
        },
    },

    // label 标签文字
    label: {
        show: true,
        position: 'outside',

        // 自定义显示文本
        formatter: function (params) {
            let percent = parseInt(params.percent, 10);
            return `${params.name} (${percent}%)`;
        },
    },

    series: {
        name: '文章分类',
        type: 'pie',
        data: chart2_data,

        // 数据排列顺序，默认为true，代表顺时针排序
        clockwise: true,

        // 定制各个数据块之间的留白
        itemStyle: {
            borderWidth: 4,
            borderColor: '#fff',
        },

        // 调整一下圆的位置
        center: ['40%', '55%'],

        // 调整一下大小
        radius: ['42%', '52%'],
    },
})
</script>

<!-- 图表3 -->
<script>
const chart3DOM = document.getElementById('chart3');
const chart3 = echarts.init(chart3DOM, 'dark');
const chart3_data = [
    {name: 'Python', value: 10, percent: 11},
    {name: 'Go', value: 30, percent: 35},
    {name: 'Java', value: 15, percent: 17},
    {name: 'Shell', value: 15, percent: 15},
    {name: '容器', value: 15, percent: 17},
]
chart3.setOption({
    title: [
        // 标题1
        {
            text: 'dark主题',
            subtext: 'echarts内置主题',
            left: 'center',
            top: 10,
        },
        // 标题2
        {
            text: "累计文章数量",
            subtext: '85',
            x: '39%',     // 移动位置
            y: '48%',     // 移动位置
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

    // 定制提示框
    tooltip: {
        formatter: function (params, ticket, callback) {
            return `
                    ${params.seriesName}<br />
                    <span>${params.marker}</span>
                    <span style="display:inline-block; width: 50px;">${params.name}</span>
                    <span style="display: inline-block; width: 20px;">${params.value}</span>
                    <span>(${params.percent}%)</span>
                `;
        },
    },

    // 图例
    legend: {
        // 排列规则
        type: 'scroll',
        orient: 'vertical',

        // 位置调整
        left: '77%',
        top: 'middle',

        // 注意：这里不支持HTML代码,可以使用\n换行
        formatter: function (name) {
            const item = chart3_data.filter((item) => item.name === name)[0];
            return `${name} (${item.value})`;
        },

        // 文本样式
        textStyle: {
            color: '#8c8c8c',
        },
    },

    // label 标签文字
    label: {
        show: true,
        position: 'outside',

        // 自定义显示文本
        formatter: function (params) {
            let percent = parseInt(params.percent, 10);
            return `${params.name} (${percent}%)`;
        },
    },

    series: {
        name: '文章分类',
        type: 'pie',
        data: chart3_data,

        // 数据排列顺序，默认为true，代表顺时针排序
        clockwise: true,

        // 定制各个数据块之间的留白
        itemStyle: {
            borderWidth: 4,
            borderColor: '#fff',
        },

        // 调整一下圆的位置
        center: ['40%', '55%'],

        // 调整一下大小
        radius: ['42%', '52%'],
    },
})
</script>

<!-- 图表4 -->
<script>
const chart4DOM = document.getElementById('chart4');
const chart4 = echarts.init(chart4DOM, 'westeros');
const chart4_data = [
    {name: 'Python', value: 10, percent: 11},
    {name: 'Go', value: 30, percent: 35},
    {name: 'Java', value: 15, percent: 17},
    {name: 'Shell', value: 15, percent: 15},
    {name: '容器', value: 15, percent: 17},
]
chart4.setOption({
    title: [
        // 标题1
        {
            text: 'westeros',
            subtext: '非内置主题',
            left: 'center',
            top: 10,
        },
        // 标题2
        {
            text: "累计文章数量",
            subtext: '85',
            x: '39%',     // 移动位置
            y: '48%',     // 移动位置
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

    // 定制提示框
    tooltip: {
        formatter: function (params, ticket, callback) {
            return `
                    ${params.seriesName}<br />
                    <span>${params.marker}</span>
                    <span style="display:inline-block; width: 50px;">${params.name}</span>
                    <span style="display: inline-block; width: 20px;">${params.value}</span>
                    <span>(${params.percent}%)</span>
                `;
        },
    },

    // 图例
    legend: {
        // 排列规则
        type: 'scroll',
        orient: 'vertical',

        // 位置调整
        left: '77%',
        top: 'middle',

        // 注意：这里不支持HTML代码,可以使用\n换行
        formatter: function (name) {
            const item = chart4_data.filter((item) => item.name === name)[0];
            return `${name} (${item.value})`;
        },

        // 文本样式
        textStyle: {
            color: '#8c8c8c',
        },
    },

    // label 标签文字
    label: {
        show: true,
        position: 'outside',

        // 自定义显示文本
        formatter: function (params) {
            let percent = parseInt(params.percent, 10);
            return `${params.name} (${percent}%)`;
        },
    },

    series: {
        name: '文章分类',
        type: 'pie',
        data: chart4_data,

        // 数据排列顺序，默认为true，代表顺时针排序
        clockwise: true,

        // 定制各个数据块之间的留白
        itemStyle: {
            borderWidth: 4,
            borderColor: '#fff',
        },

        // 调整一下圆的位置
        center: ['40%', '55%'],

        // 调整一下大小
        radius: ['42%', '52%'],
    },
})
</script>
</body>
</html>
```

:::

![image-20211204185432778](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211204185432778.png)

#### 切换渲染方式

文档：[https://echarts.apache.org/handbook/zh/best-practices/canvas-vs-svg](https://echarts.apache.org/handbook/zh/best-practices/canvas-vs-svg)

默认使用`Canvas`进行渲染，如果要更换为`SVG`渲染方式，可以这样做

```javascript
const chart4 = echarts.init(chart4DOM, 'default', {renderer: 'svg'});	// 注意是在第三个参数上
```



### 图表数据集

文档：[https://echarts.apache.org/handbook/zh/concepts/dataset/](https://echarts.apache.org/handbook/zh/concepts/dataset/)

数据集（`dataset`）是专门用来管理数据的组件，从 ECharts4开始支持。

> 虽然官方推荐使用 `数据集` 来管理数据，但是个人觉得还不是太完善（某些场景下不支持数据集），不够通用，
>
> 所以这里也就简单记录一下用法



::: details 点击查看完整代码

`demo.html`

```html
<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js"></script>
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            width: 100%;
            height: 100%;
        }

        .box {
            display: flex;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
        }

        .box [id*=chart] {
            width: 600px;
            height: 400px;
        }
    </style>
</head>
<body>
<div class="box">
    <div id="chart1"></div>
    <div id="chart2"></div>
</div>

<!-- 图表1 -->
<script>
const chart1DOM = document.getElementById('chart1');
const chart1 = echarts.init(chart1DOM);

// 注意观察数据结构，x轴数据和y轴数据是分离的
let chart1_x = ['第一季度', '第二季度', '第三季度', '第四季度']
let chart1_y = [100, 110, 95, 130]

chart1.setOption({
    title: {
        text: '2021年六点半公司销售额',
        left: 'center',
    },

    xAxis: {
        data: chart1_x,
    },
    yAxis: {},
    series: {
        type: 'line',
        data: chart1_y,
    }
})
</script>

<!-- 图表2 -->
<script>
const chart2DOM = document.getElementById('chart2');
const chart2 = echarts.init(chart2DOM);

// 使用dataset代替上面的数据结构
let chart2_dataset = {
    source: [
        ["第一季度", 100],
        ["第二季度", 110],
        ["第三季度", 95],
        ["第四季度", 130],
    ]
}


chart2.setOption({
    title: {
        text: '2021年六点半公司销售额',
        left: 'center',
    },

    // x轴里不写具体的数据了(即不写data属性了)
    // x轴默认type就是category，但是不知道为什么，这里必须显示声明x轴为类目轴才能正常绘图，可能是个bug?
    xAxis: {
        type: 'category',
    },
    // 默认情况下为数值轴，不用显示声明
    yAxis: {},

    // 指定dataset数据源
    dataset: chart2_dataset,

    series: {
        type: 'line',
        // 原来的data不用写了，只需要使用encode告诉x轴和y轴使用数据源中哪列数据就好了
        // x轴使用第1列数据(索引为0)，y轴使用第2列数据(索引为1)
        encode: {x: 0, y: 1},
        // 如果是饼图的话，就不能再用x和y了，需要使用itemName和value
    }
})
</script>
</body>
</html>
```

:::

![image-20211204221413843](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211204221413843.png)



### 图表大小动态调整

文档：[https://echarts.apache.org/handbook/zh/concepts/chart-size/#响应容器大小的变化](https://echarts.apache.org/handbook/zh/concepts/chart-size/#响应容器大小的变化)

::: details 点击查看完整代码

`demo.html`

```html
<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js"></script>
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            width: 100%;
            height: 100%;
        }

        .box {
            display: flex;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
        }

        .box [id*=chart] {
            width: 600px;
            height: 400px;
        }
    </style>
</head>
<body>
<div class="box">
    <div id="chart1"></div>
    <div id="chart2"></div>
</div>

<!-- 图表1 -->
<script>
const chart1DOM = document.getElementById('chart1');
const chart1 = echarts.init(chart1DOM);

chart1.setOption({
    title: {
        text: '2021年六点半公司销售额',
        subtext: '未动态调整大小',
        left: 'center',
    },

    xAxis: {
        data: ['第一季度', '第二季度', '第三季度', '第四季度'],
    },
    yAxis: {},
    series: {
        type: 'line',
        data: [100, 110, 95, 130],
    }
})
</script>

<!-- 图表2 -->
<script>
const chart2DOM = document.getElementById('chart2');
const chart2 = echarts.init(chart2DOM);

chart2.setOption({
    title: {
        text: '2021年六点半公司销售额',
        subtext: '动态调整大小',
        left: 'center',
    },

    xAxis: {
        data: ['第一季度', '第二季度', '第三季度', '第四季度'],
    },
    yAxis: {},
    series: {
        type: 'line',
        data: [100, 110, 95, 130],
    }
})
</script>

<!-- 这里动态调整图表2的大小，观察两个图有什么区别 -->
<script>
window.onresize = function () {
    chart2.resize();
};
</script>
</body>
</html>
```

:::

![](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/8gxLWjbc.gif)



### 图表销毁和重建

文档：[https://echarts.apache.org/handbook/zh/concepts/chart-size/#容器节点被销毁以及被重建时](https://echarts.apache.org/handbook/zh/concepts/chart-size/#容器节点被销毁以及被重建时)

::: details 点击查看完整代码

`demo.html`

```html
<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js"></script>
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            width: 100%;
            height: 100%;
        }

        .box {
            display: flex;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
        }

        .box [id*=chart] {
            width: 600px;
            height: 400px;
        }
    </style>
</head>
<body>
<div class="box">
    <div id="chart1"></div>
</div>

<!-- 图表 -->
<script>
const chart1DOM = document.getElementById('chart1');

function showLineChart(dom) {
    const chart1 = echarts.init(dom);

    chart1.setOption({
        title: {
            text: '2021年六点半公司销售额',
            subtext: '销毁和重建: 显示图表->3秒后销毁->2秒后重建',
            left: 'center',
        },

        xAxis: {
            data: ['第一季度', '第二季度', '第三季度', '第四季度'],
        },
        yAxis: {},
        series: {
            type: 'line',
            data: [100, 110, 95, 130],
        }
    })

    return chart1;
}

// 显示图表
let chart1 = showLineChart(chart1DOM);

// 3秒收销毁echarts实例
setTimeout(() => {
    chart1.dispose();
}, 3000)

// 2秒后再重建
setTimeout(() => {
    showLineChart(chart1DOM);
}, 5000)
</script>
</body>
</html>
```

:::

![](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/8gxLWjbd.gif)





### 图表数据动态更新

::: details 点击查看完整代码

`demo.html`

```html
<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js"></script>
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            width: 100%;
            height: 100%;
        }

        .box {
            display: flex;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
        }

        .box [id*=chart] {
            width: 800px;
            height: 400px;
        }
    </style>
</head>
<body>
<div class="box">
    <div id="chart1"></div>
</div>

<!-- 图表 -->
<script>
const chartDOM = document.getElementById('chart1');
const chart = echarts.init(chartDOM);
const options = {
    title: {
        text: '实时总资产',
        subtext: '动态数据更新',
        left: 'center',
    },

    xAxis: {
        name: '',
        data: [],
    },
    yAxis: {
        name: '资产额(万元)',
    },
    series: {
        type: 'line',
        data: [],
        symbol: 'none',
        smooth: true,
        areaStyle: {},
    }
}

// 辅助函数：获取前n秒的时间
function getLastSeconds(n, step = 1) {
    let end = new Date().getTime();
    let start = new Date(end - n * 1000 + 1000).getTime();
    let ret = [];

    for (let i = start; i <= end; i = i + step * 1000) {
        let t = new Date(i);
        ret.push([t.getHours(), t.getMinutes(), t.getSeconds()].join(':'));
    }
    return ret;
}

// 辅助函数：生成一个长度为number的数组，每个元素为随机数，范围为start到end
function getRandom(number, start, end) {
    let ret = [];
    for (let i = 1; i <= number; i++) {
        let data = start + parseInt(Math.random() * (end - start));
        ret.push(data);
    }
    return ret;
}

let y = getRandom(60, 100, 110);

setInterval(() => {
    // 开启loading
    chart.showLoading();

    // 更新x轴数据
    options.xAxis.data = getLastSeconds(60);
    options.xAxis.name = [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()].join('/');

    // 更新y轴数据
    options.series.data = (function () {
        y = y.slice(1)
        y.push(getRandom(1, 100, 110)[0]);
        return y;
    })()

    // 更新图表
    chart.setOption(options);

    // 关闭loading
    chart.hideLoading();
}, 1000)
</script>
</body>
</html>
```

:::

![](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/8gcLWjbf.gif)





### 图表服务端渲染

#### Python版本

主要分为两个步骤：

* 使用`pyecharts`绘图，生成`HTML`文件，参考官网：[https://pyecharts.org/](https://pyecharts.org/)

* 将`HTML`渲染成图片，有很多种方式，在本文档中我们使用`snapshot-phantomjs`，

  参考文档：[https://pyecharts.org/#/zh-cn/render_images?id=snapshot-phantomjs](https://pyecharts.org/#/zh-cn/render_images?id=snapshot-phantomjs)



**安装依赖包**

* 安装`pyecharts`

```bash
pip install -r pyecharts -i https://mirrors.aliyun.com/pypi/simple/
```



* 安装`PhantomJS`

`PhantomJS`是一款无界面浏览器，可以解析`JavaScript`

> 注：`PhantomJS`开发已经暂停，但未来也有可能会重启这个项目，所以如果有更好的选择，就尽量不要使用它了

官方文档：https://phantomjs.org/download.html

官网Github：https://github.com/ariya/phantomjs



下载指定系统的包，解压，添加到环境变量即可

```bash
export PATH=$PATH:/root/phantomjs-2.1.1-linux-x86_64/bin/

# phantomjs --version
2.1.1
```



* 安装`PhantomJS`Python依赖包

```bash
pip install -r snapshot-phantomjs -i https://mirrors.aliyun.com/pypi/simple/
```



**编写测试代码**

`demo.py`

```python
#!/usr/bin/env python
# --*--coding:utf-8--*--

from pyecharts import options as opts
from pyecharts.charts import Bar
from pyecharts.render import make_snapshot

from snapshot_phantomjs import snapshot


def bar_chart() -> Bar:
    c = (
        Bar()
            .add_xaxis(["衬衫", "毛衣", "领带", "裤子", "风衣", "高跟鞋", "袜子"])
            .add_yaxis("商家A", [114, 55, 27, 101, 125, 27, 105])
            .add_yaxis("商家B", [57, 134, 137, 129, 145, 60, 49])
            .set_series_opts(label_opts=opts.LabelOpts(position="right"))
            .set_global_opts(title_opts=opts.TitleOpts(title="Bar-测试渲染图片"))
    )
    return c


make_snapshot(snapshot, bar_chart().render(), "bar.png", is_remove_html=True)
```

执行完成，将得到下面一张图片

![](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/bar.png)

**常见问题**

* 图片中文乱码问题

  `CentOS 7.x`下，使用`PhantomJS`生成的图片中如果带中文字符，那么可能会显示乱码，

  `windows`下显示正常，那么很大可能就是Linux缺相关字体导致的

  ```bash
  # 查看当前安装的字体，如果下面命令找不到，yum -y install fontconfig
  fc-list
  
  # 将Windows下的字体打包，上传到Linux中
  将Windows字体目录 C:\Windows\Fonts下的所有字体打包，上传到Linux字体目录中
  
  # 创建一个名为chinese的字体目录，目录名叫什么无所谓
  # 具体你的linux目录是不是这个，可以参考fc-list的输出，看看当前的字体都在哪个目录下
  mkdir /usr/share/fonts/chinese/
  chmod -R 755 /usr/share/fonts/chinese/
  
  # 生成缓存
  fc-cache
  fc-list		# 再次查看字体，可以看到我们上传的Windows字体了，再执行脚本应该就没问题了
  ```

  参考：https://blog.csdn.net/wlwlwlwl015/article/details/51482065

* `ReferenceError: Can't find variable: echarts`

  报错信息

  ```bash
  Taceback (most recent call last):
    ...
    File "/data/venv/lib/python3.7/site-packages/pyecharts/render/snapshot.py", line 45, in make_snapshot
      raise OSError(content_array)
  OSError: ["ReferenceError: Can't find variable: echarts\n\n  file:////opt/app/daily_report/render.html:12 in global code\nReferenceError: Can't find variable: echarts\n\n  undefined:1\nnull\n"]
  ```

  尝试手动在浏览器打开`render.html`可以正常显示图形（需要将`make_snapshot`中的参数`is_remove_html=False`设置为`False`），但是却无法绘制出图片

  这是因为没有正常加载`echarts.min.js`文件，导致执行JS代码时报错：`ReferenceError`，类似于下面这种报错

  ![]()![ReferenceError](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/ReferenceError.png)

  解决办法原理：将`pyecharts`包中`glob.py`文件中`echarts.min.js`的地址替换为本地地址

  ```bash
  (1)修改echarts.min.js的访问地址
  vim /data/venv/lib/python3.7/site-packages/pyecharts/globals.py			# 文件路径根据实际情况替换
  
  125 class _OnlineHost:                 
  126     #DEFAULT_HOST = "https://assets.pyecharts.org/assets/"			# 注释掉这行
  127     DEFAULT_HOST = "file:///data/js/"								# 替换为本地路径，该路径下必须有一个名为echarts.min.js的文件
  128     NOTEBOOK_HOST = "http://localhost:8888/nbextensions/assets/"
  
  (2)下载echarts.min.js
  	cd /data/js/ && wget https://assets.pyecharts.org/assets/echarts.min.js  --no-check-certificate
  
  (3)再次执行脚本，应该就没问题了
  ```
