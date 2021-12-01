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

![image-20211128140752858](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211128140752858.png)

#### 组件 - 系列简介

系列：https://echarts.apache.org/zh/option.html#series



**系列的概念**

简单来说，就是你要绘制哪种图形，比如一个直线图就是一个系列，一个柱状图也是一个系列，同样的还有饼图、K线图等等，

总结一下就是**一个系列就是一种图形**

参考下图：

![image-20211128194633870](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211128194633870.png)



**系列的使用**

光有系列还不够，每个系列还需要一些其他组件搭配使用，比如折线图、柱状图一般要和**直角坐标系**搭配来使用等



**可存在多个系列**

一个图标中可以存在多个系列，下面代码使用柱状图和折线图来说明

> 当然，一个图表中也可以存在多个不同类型的系列，比如柱状图和折线图2个系列组成一个图表

![image-20211128201039944](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211128201039944.png)

![image-20211128201555807](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211128201555807.png)



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

![image-20211128160412701](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211128160412701.png)



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

![image-20211128190227557](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211128190227557.png)

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

![image-20211128212706694](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211128212706694.png)

![image-20211128212905392](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211128212905392.png)

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

![image-20211128215351897](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211128215351897.png)![image-20211128215534945](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211128215534945.png)

![image-20211128215717266](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211128215717266.png)



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

![image-20211129225254096](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211129225254096.png)









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

![image-20211129215801320](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211129215801320.png)

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

![image-20211129221217335](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211129221217335.png)



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

![image-20211129222757068](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211129222757068.png)

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
    <div id="chart3" class="chart"></div>
    <div id="chart4" class="chart"></div>
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
        data: Array.from(Array(15), () => 150 + parseInt(Math.random() * 50, 10)),
    },
    yAxis: {},
    legend: {
        bottom: 15,
        selected: {
            '默认线条': true,
            '数值显示': false,
            '抹去小圆点': false,
            '抹去尖角': false,
            '数值标记': false,
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
                        value: 'abc',
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
    ]
})
</script>

<!-- 图表3 -->
<script>

</script>

<!-- 图表4 -->
<script>

</script>
</body>
</html>
```

:::

![](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/echarts-line1.gif)











