## CSS

`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .main {
            display: flex;
            flex-direction: column;
            padding: 20px;
        }

        .line {
            width: 100%;
            height: 100%;
            display: flex;
            flex-wrap: wrap;
        }

        .item {
            flex: 1;
            min-width: 200px;
            min-height: 200px;
            margin-right: 20px;
            margin-bottom: 20px;
            padding: 20px;
            border: 1px solid rgba(0, 0, 0, .5);

            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .item h3 {
            margin-bottom: 20px;
        }


        /* (1)矩形 */
        [class*=box1] {
            margin-right: 20px;
        }

        .box1-1 {
            width: 50px;
            height: 50px;
            background-color: orange;
        }

        .box1-2 {
            width: 50px;
            height: 50px;
            background-color: orange;
            transform: rotate(45deg);
        }

        /* (2)圆形 */
        .box2-1 {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: green;
        }

        .box2-2 {
            width: 100px;
            height: 50px;
            border-radius: 50%;
            background-color: green;
        }

        .box2-3 {
            width: 50px;
            height: 100px;
            border-radius: 50%;
            background-color: green;
        }

        .box2-4 {
            width: 50px;
            height: 50px;
            border: 5px solid;
            border-radius: 50%;
            border-color: green;
        }

        /* (3)三角形(原理) */
        .box3 {
            width: 0;
            height: 0;
            border: 50px solid;
            border-color: red green blue yellow;
        }

        .box4-1 {
            width: 0;
            height: 0;
            border: 30px solid;
            border-color: red transparent transparent red;
        }

        .box4-2 {
            width: 0;
            height: 0;
            border: 30px solid;
            border-color: green green transparent transparent;
        }

        .box4-3 {
            width: 0;
            height: 0;
            border: 30px solid;
            border-color: transparent transparent yellow yellow;
        }

        .box4-4 {
            width: 0;
            height: 0;
            border: 30px solid;
            border-color: transparent blue blue transparent;
        }

        .box5 {
            width: 150px;
            height: 150px;
            border: 30px solid;
            border-color: red green yellow blue;
        }

        [class*=box6] {
            margin-right: 20px;
        }

        .box6-1 {
            width: 50px;
            height: 50px;
            background-color: green;
            transform: skew(-30deg);
        }

        .box6-2 {
            width: 50px;
            height: 50px;
            background-color: green;
            transform: rotate(45deg) skew(15deg, 15deg);
        }

        [class*=box7] {
            margin-right: 20px;
        }

        .box7-1 {
            width: 40px;
            height: 40px;
            background-color: green;
            border-radius: 40px 0 0 0;
        }

        .box7-2 {
            width: 40px;
            height: 40px;
            background-color: green;
            border-radius: 40px 0 0 0;
            transform: rotate(45deg);
        }

        .box7-3 {
            width: 40px;
            height: 40px;
            background-color: green;
            border-radius: 40px 40px 0 0;
        }


        .line:nth-child(2) .item:nth-child(3) {
            align-items: flex-start;
        }

        .line:nth-child(2) .item:nth-child(3) h3 {
            align-self: center;
        }

        .box8 {
            max-width: 150px;
            border-radius: 10px;
            background-color: green;
            position: relative;
            text-align: left;
            padding: 9px;
            padding-right: 8px;
            font-size: 12px;

            margin-bottom: 10px;
        }

        .box8:before {
            content: '';
            width: 0;
            height: 0;

            border: 6px solid;
            border-color: transparent green transparent transparent;

            position: absolute;
            top: 50%;
            left: -12px;
            margin-top: -6px;
        }

        .box9 {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            box-shadow: 20px 20px 0 0 green;
        }

        .box-10 {
            height: 100px;
            width: 20px;
            background: red;
            position: relative;
        }

        .box-10:after {
            content: "";
            width: 100px;
            height: 20px;
            background: red;
            position: absolute;
            left: -40px;
            top: 40px;
        }

    </style>
</head>
<body>
<div class="main">
    <div class="line">
        <div class="item">
            <h3>(1) 矩形</h3>
            <div style="display: flex;">
                <div class="box1-1"></div>
                <div class="box1-2"></div>
            </div>
        </div>
        <div class="item">
            <h3>(2) 圆形</h3>
            <div style="display: flex">
                <div>
                    <div class="box2-1"></div>
                    <div class="box2-2"></div>
                </div>
                <div class="box2-3"></div>
                <div class="box2-4"></div>
            </div>
        </div>
        <div class="item">
            <h3>(3) 三角形(原理)</h3>
            <div class="box3"></div>
        </div>
        <div class="item">
            <h3>(4) 三角形(变形)</h3>
            <div style="display: flex;">
                <div class="box4-1"></div>
                <div class="box4-2"></div>
            </div>
            <div style="display: flex; margin-top: 5px;">
                <div class="box4-3"></div>
                <div class="box4-4"></div>
            </div>
        </div>
        <div class="item">
            <h3>(5) 梯形(原理)</h3>
            <div class="box5"></div>
        </div>
    </div>
    <div class="line">
        <div class="item">
            <h3>(6) 平行四边形</h3>
            <div style="display: flex;">
                <div class="box6-1"></div>
                <div class="box6-2"></div>
            </div>
        </div>
        <div class="item">
            <h3>(7) 扇形</h3>
            <div style="display: flex;">
                <div class="box7-1"></div>
                <div class="box7-2"></div>
                <div class="box7-3"></div>
            </div>
        </div>
        <div class="item">
            <h3>(8) 聊天框</h3>
            <div class="box8">面试官您好</div>
            <div class="box8">咱们公司非常优秀，但是很遗憾的通知您，贵公司已经进入我的侯选库，希望早日找到合适的候选人！</div>
        </div>
        <div class="item">
            <h3>(9) 月亮</h3>
            <div class="box9"></div>
        </div>
        <div class="item">
            <h3>(10) 十字架</h3>
            <div class="box-10"></div>
        </div>
    </div>
</div>
</body>
</html>
```

![](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/css-image.png)



## Canvas

`Canvas`是HTML5的新特性，它允许我们使用`Canvas`标签在网页上通过`JavaScript`绘制图像

`Canvas`特点 

* `Canvas`绘制的图形不是矢量图，放大会有锯齿
* `Canvas`绘制的图像不是DOM元素，对浏览器来说，就只是一个`Canvas`标签而已，上面可以有很多图像
* 需要通过`JavaScript`来进行绘制图像

文档：https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D



### 起手式

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<!-- (1)使用canvas标签定义一块画布 -->
<!--    画布必须有一个宽度和高度，有两种方法设置宽高 -->
<!--    (1) 在canvas标签指定width和height属性，特别注意这里不是style中的width和height -->
<!--    (2) 在canvas对象上指定width和height属性，参考下面的JS代码 -->
<canvas id="canvas" width="400" height="400" style="border: 1px solid green;"></canvas>
<script>
// （2）获取canvas对象
const canvas = document.getElementById("canvas");
// 设置canvas宽高的方法2
// canvas.width = 400;
// canvas.height = 400;

// （3）获取2D图形上下文环境
const ctx = canvas.getContext('2d');
    
// 下面写具体的绘图代码
</script>
</body>
</html>
```

> canvas是基于状态的绘图方式，换一种说话，就是当我们绘制2条线条时，并不是我们以为的第一条线条如何如何，第二条线条如何如何，
>
> 在下面的代码中会有具体的讲解



### 绘制线条

#### 一个最简单的示例

`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<canvas id="canvas" width="400" height="400" style="border: 1px solid green;"></canvas>
<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// 设置线条
// moveTo可以理解为将我们的画笔移动到画布的(0,0)这个坐标
// lineTo是将画笔当前的坐标(上面指定了是0,0)画到我们指定的坐标
// 我们就是准备画了一条对角线，注意这个时候还没有绘制
ctx.moveTo(0, 0);
ctx.lineTo(400, 400);

// 设置线条的样式，宽度为2px，颜色为绿色
ctx.lineWidth = 2;
ctx.strokeStyle = 'green';

// 绘制，执行完stroke，线条才真正的绘制出来
ctx.stroke();
</script>
</body>
</html>
```

![image-20211121163102444](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211121163102444.png)

> 注意：当你仔细看或者将图放大的时候，会发现使用canvas绘制的线条有明显的锯齿，这个后面具体再说



#### 理解canvas中的状态

我想将另一条对角线也绘制出来，并且设置为红色，那么我写下了如下的代码

`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<canvas id="canvas" width="400" height="400" style="border: 1px solid green;"></canvas>
<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// 设置线条-1
ctx.moveTo(0, 0);
ctx.lineTo(400, 400);
ctx.lineWidth = 2;
ctx.strokeStyle = 'green';
ctx.stroke();

// 设置线条-2
ctx.moveTo(400, 0);
ctx.lineTo(0, 400);
ctx.lineWidth = 2;
ctx.strokeStyle = 'red';
ctx.stroke();
</script>
</body>
</html>
```

![image-20211121163458230](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211121163458230.png)

> 为什么第一个线条的颜色也变成了红色？很明显是被第二个线条的样式覆盖了，这就是所谓的基于状态的绘图。
>
> 为了理解的更清楚，可以将线条2放入setTimeout函数中，看看是如何绘制的。
>
> 如何解决呢？
>
> 在线条2开始前增加`ctx.beginPath();`，代表开始新的线条绘制，这样就不会相互影响了
>
> 为了增加代码可维护性，我们可以在线条1和线条2前面都增加`ctx.beginPath();`



#### 第一次优化代码

`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<canvas id="canvas" width="400" height="400" style="border: 1px solid green;"></canvas>
<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// 设置线条-1
ctx.beginPath();        // 代表开始绘制新的线条，第一次绘制可以省略，这里写上是会为了让代码更清晰
ctx.moveTo(0, 0);
ctx.lineTo(400, 400);
ctx.lineWidth = 2;
ctx.strokeStyle = 'green';
ctx.stroke();

// 设置线条-2
ctx.beginPath();    // 代表开始绘制新的线条
ctx.moveTo(400, 0);
ctx.lineTo(0, 400);
ctx.lineWidth = 2;
ctx.strokeStyle = 'red';
ctx.stroke();
</script>
</body>
</html>
```

![image-20211121164659703](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211121164659703.png)

#### 第二次优化代码

`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<canvas id="canvas" width="400" height="400" style="border: 1px solid green;"></canvas>
<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// （优化1）这里是公共样式，把它提到最上面来
ctx.lineWidth = 2;

// 设置线条-1
ctx.beginPath();
ctx.lineTo(0, 0);       // （2）优化2：使用了beginPath，就已经代表开始新的线条绘制了，所以这里也可以换成lineTo，代码更加统一了
ctx.lineTo(400, 400);
ctx.strokeStyle = 'green';
ctx.stroke();

// 设置线条-2
ctx.beginPath();
ctx.lineTo(400, 0);     //（2）优化2：使用了beginPath，就已经代表开始新的线条绘制了，所以这里也可以换成lineTo，代码更加统一了
ctx.lineTo(0, 400);
ctx.strokeStyle = 'red';
ctx.stroke();
</script>
</body>
</html>
```



#### 线条两端的"帽子"

`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<canvas id="canvas" width="400" height="400" style="border: 1px solid green;"></canvas>
<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// 公共样式
ctx.strokeStyle = 'rgb(66,133,244)';
ctx.lineWidth = 10;

// 线条1
ctx.beginPath();
ctx.lineCap = 'butt';   // 默认值，没有"帽子"
ctx.lineTo(100, 80);
ctx.lineTo(300, 80);
ctx.stroke();

// 线条2
ctx.beginPath();
ctx.lineCap = 'round';   // 圆形的"帽子"
ctx.lineTo(100, 160);
ctx.lineTo(300, 160);
ctx.stroke();

// 线条3
ctx.beginPath();
ctx.lineCap = 'square';   // 方形的帽子
ctx.lineTo(100, 240);
ctx.lineTo(300, 240);
ctx.stroke();

// 线条4和5(这个是为了说明lineCap3个值有什么不同)
ctx.beginPath();
ctx.lineWidth = 1;
ctx.strokeStyle = 'rgba(0,0,0, .5)';
ctx.lineCap = 'butt';
ctx.lineTo(100, 50);
ctx.lineTo(100, 280);
ctx.stroke();

ctx.beginPath();
ctx.lineWidth = 1;
ctx.strokeStyle = 'rgba(0,0,0, .5)';
ctx.lineCap = 'butt';
ctx.lineTo(300, 50);
ctx.lineTo(300, 280);
ctx.stroke();
</script>
</body>
</html>
```

![image-20211121221910632](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211121221910632.png)

#### 两条线相交的样式

`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<canvas id="canvas" width="400" height="400" style="border: 1px solid green;"></canvas>
<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// 公共样式
ctx.strokeStyle = 'rgb(66,133,244)';
ctx.lineWidth = 30;

// 线条1和线条2
ctx.beginPath();
ctx.lineTo(100, 80);
ctx.lineTo(200, 50);
ctx.lineTo(300, 120);
ctx.lineJoin = 'miter'; // 默认值，呈现一个尖角
ctx.stroke();

// 线条3和线条4
ctx.beginPath();
ctx.lineTo(100, 160);
ctx.lineTo(200, 100);
ctx.lineTo(300, 240);
ctx.lineJoin = 'bevel'; // 呈现一个斜接
ctx.stroke();

// 线条5和线条6
ctx.beginPath();
ctx.lineTo(100, 320);
ctx.lineTo(200, 200);
ctx.lineTo(300, 480);
ctx.lineJoin = 'round'; // 呈现一个圆角
ctx.stroke();

</script>
</body>
</html>
```

![image-20211121224544393](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211121224544393.png)

#### 绘制封闭图形

**完全封闭**

利用上面所学的绘制线条知识，我们绘制一个箭头出来

`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<canvas id="canvas" width="500" height="400" style="border: 1px solid green;"></canvas>
<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

ctx.lineWidth = 10;
ctx.strokeStyle = 'green';

// 设置线条
ctx.beginPath();
ctx.lineTo(50, 150);
ctx.lineTo(250, 150);
ctx.lineTo(250, 100);
ctx.lineTo(400, 200);
ctx.lineTo(250, 300);
ctx.lineTo(250, 250);
ctx.lineTo(50, 250);
ctx.lineTo(50, 150);
ctx.stroke();
</script>
</body>
</html>
```

![image-20211121170928637](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211121170928637.png)

> 可以发现，红框中并没有完全封闭，这是因为我们在绘制封闭图形时，要成对使用`beginPath`和`closePath`

让我们改一下代码

```javascript
ctx.closePath();	// 新增这一行
ctx.stroke();
```

![image-20211121171153864](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211121171153864.png)

**填充色**

`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<canvas id="canvas" width="500" height="400" style="border: 1px solid green;"></canvas>
<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

ctx.lineWidth = 10;
ctx.strokeStyle = 'green';
ctx.fillStyle = 'orange';   // 设置填充色为橘红色

// 设置线条
ctx.beginPath();
ctx.lineTo(50, 150);
ctx.lineTo(250, 150);
ctx.lineTo(250, 100);
ctx.lineTo(400, 200);
ctx.lineTo(250, 300);
ctx.lineTo(250, 250);
ctx.lineTo(50, 250);
ctx.lineTo(50, 150);
ctx.closePath();
ctx.fill();     // 填充
ctx.stroke();   // 绘制
// 填充和绘制顺序不同，将会导致不同的效果，后面的会覆盖前面的，需要注意
</script>
</body>
</html>
```

![image-20211121171801109](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211121171801109.png)

![image-20211121171847185](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211121171847185.png)

### 绘制矩形

绘制矩形，我们可以使用线条绘制，但是比较麻烦，canvas为我们提供了以下几个API，更方便绘制矩形

| 属性                                                         | 说明                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `rect(矩形左上角的x轴坐标，矩形左上角的y轴坐标，宽，高);`    | 绘制矩形                                                     |
| `fillrect(矩形左上角的x轴坐标，矩形左上角的y轴坐标，宽，高);` | 绘制矩形，并自动帮我们调用`ctx.fill();`等同于`rect方法` + `fill方法` |
| `strokeRect(矩形左上角的x轴坐标，矩形左上角的y轴坐标，宽，高);` | 绘制矩形，并自动帮我们调用`ctx.stroke();`等同于`rect方法` + `stroke方法` |

> 这三个函数的参数都是一样的



`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<canvas id="canvas" width="400" height="400" style="border: 1px solid green;"></canvas>
<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// 设置矩形填充颜色
ctx.fillStyle = 'green';

// 矩形， rect(左上角的x轴坐标，左上角的y轴坐标，宽，高);
ctx.beginPath();
ctx.rect(100, 100, 200, 200);
ctx.closePath();
    
// 填充并绘制
ctx.fill();
ctx.stroke();
</script>
</body>
</html>
```

![image-20211121213915804](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211121213915804.png)

让我们改写一下

```javascript
// 矩形， rect(左上角的x轴坐标，左上角的y轴坐标，宽，高);
ctx.beginPath();
ctx.rect(100, 100, 200, 200);
ctx.closePath();

// 填充并绘制
ctx.fill();
ctx.stroke();

// -----------------------------------------------------------------
// 上面这一段代码就等同于
ctx.beginPath();
ctx.fillRect(100, 100, 200, 200);
ctx.strokeRect(100, 100, 200, 200);
ctx.closePath();
```



### 图形变换

#### 位移

##### 位移的特性

`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<canvas id="canvas" width="400" height="400" style="border: 1px solid green;"></canvas>
<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// 位移到坐标(100, 100)处
ctx.translate(100, 100);

// 这里虽然指定的坐标是(0, 0)，但是
// 实际上是在(100, 100)的基础上的(0,0)，所以绘制出来的真实坐标是在(100, 100)
// 注意：translate和rect的调用顺序反过来就没有这样的效果了，其他图形绘制也是一样
ctx.beginPath();
ctx.rect(0, 0, 200, 200);
ctx.closePath();

// 设置样式
ctx.fillStyle = 'green';

// 绘制
ctx.stroke();
ctx.fill();
</script>
</body>
</html>
```

![image-20211122215826070](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211122215826070.png)

> **感受一下位移的特性**
> 位移之后，绘制函数的坐标并不是以画图坐标为准了，而是以位移到的坐标为准，这很有趣，但也可能导致出错



##### 位移特性的副作用

`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<canvas id="canvas" width="400" height="400" style="border: 1px solid green;"></canvas>
<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// 我想位移到坐标(100, 100)处，绘制一个正方形
ctx.translate(100, 100);
ctx.fillStyle = 'green';
ctx.fillRect(0, 0, 200, 200);   // 这个正方形左上角的坐标实际在(100, 100)


// 我想位移到坐标(200, 200)处，绘制一个正方形
ctx.translate(200, 200);
ctx.fillStyle = 'red';
ctx.fillRect(0, 0, 200, 200);   // 这个正方形左上角的坐标实际在(100+200, 100+200) = (300, 300)处
</script>
</body>
</html>
```

![image-20211122220932967](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211122220932967.png)

> 可以看到第二个正方形实际上并没有在(200, 200)处，如何解决呢？



##### 取消位移特性方法1

`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<canvas id="canvas" width="400" height="400" style="border: 1px solid green;"></canvas>
<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// 位移到坐标(100, 100)处，绘制一个正方形
ctx.translate(100, 100);
ctx.fillStyle = 'green';
ctx.fillRect(0, 0, 200, 200);
ctx.translate(-100, -100);   // 每次位移之后再给他移动回去

// 位移到坐标(200, 200)处，绘制一个正方形
ctx.translate(200, 200);
ctx.fillStyle = 'red';
ctx.fillRect(0, 0, 200, 200);
ctx.translate(-200, -200);   // 每次位移之后再给他移动回去
</script>
</body>
</html>
```

> 这种方法每次都要写具体数值

![image-20211122221404279](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211122221404279.png)

##### 取消位移特性方法2

`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<canvas id="canvas" width="400" height="400" style="border: 1px solid green;"></canvas>
<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// 位移到坐标(100, 100)处，绘制一个正方形
ctx.save();     // 保存位移前的状态
ctx.translate(100, 100);
ctx.fillStyle = 'green';
ctx.fillRect(0, 0, 200, 200);
ctx.restore();  // 恢复到位移前的状态，这中间的颜色设置啥会都没了

// 位移到坐标(200, 200)处，绘制一个正方形
ctx.save();     // 保存位移前的状态
ctx.translate(200, 200);
ctx.fillStyle = 'red';
ctx.fillRect(0, 0, 200, 200);
ctx.restore();  // 恢复到位移前的状态，这中间的颜色设置啥会都没了
</script>
</body>
</html>
```

> `ctx.save();`和`ctx.restore();`一般要成对出现



#### 缩放

##### 缩放的特性

`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<canvas id="canvas" width="400" height="400" style="border: 1px solid green;"></canvas>
<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// 绘制两个一模一样的正方形，竖直排序，并让第二个正方形x轴放大5倍，看一下效果

// 公共样式
ctx.fillStyle = 'green';
ctx.lineWidth = 1;

// 正方形1
ctx.fillRect(10, 10, 50, 50);

// 正方形2
ctx.scale(5, 1);   // x轴放大10倍
ctx.fillRect(10, 70, 50, 50);

</script>
</body>
</html>
```

![image-20211122223803880](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211122223803880.png)

##### 取消缩放特性(无方法)



#### 旋转

##### 旋转的特性

`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<canvas id="canvas" width="400" height="400" style="border: 1px solid green;"></canvas>
<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// 绘制两个一模一样的正方形，竖直排序，并让第二个正方形x轴放大5倍，看一下效果

// 样式
ctx.lineWidth = 1;
ctx.strokeStyle = 'red';
ctx.fillStyle = 'green';

// 正方形
ctx.rotate(30 * Math.PI / 180); // 顺时针旋转30度
ctx.fillRect(200, 200, 100, 100);
ctx.strokeRect(200, 200, 100, 100);

</script>
</body>
</html>
```

> 注意：旋转是把画图旋转，而不是把图形旋转；
>
> PS：样式调整起来很费劲啊~~

![image-20211122225738560](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211122225738560.png)

##### 取消旋转特性（无方法）



#### 变换矩阵

```javascript
transform: (1,    0,     0,      1,      0,    0);		// 括号内为默认值
		水平缩放 水平倾斜 垂直倾斜 垂直缩放 水平位移 垂直位移
```

##### 一个简单示例

`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<canvas id="canvas" width="400" height="400" style="border: 1px solid green;"></canvas>
<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// 样式
ctx.lineWidth = 1;
ctx.strokeStyle = 'red';
ctx.fillStyle = 'green';

// 图形变换
ctx.transform(1, 0, 0, 1, -200, -200);  // 水平位移-200（即向左位移200px），垂直位移-200（即向上位移200px）

// 正方形
ctx.fillRect(200, 200, 100, 100);   // 在200,200绘制，但因为有位移加持，中和之后坐标点在0,0
ctx.strokeRect(200, 200, 100, 100);
</script>
</body>
</html>
```

![image-20211123223840148](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211123223840148.png)

##### 取消之前的附加效果

`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<canvas id="canvas" width="400" height="400" style="border: 1px solid green;"></canvas>
<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// 样式
ctx.lineWidth = 1;
ctx.strokeStyle = 'red';
ctx.fillStyle = 'green';

// 图形变换
ctx.transform(1, .2, .2, 1, -200, -200);  //
ctx.setTransform(1, 0, 0, 1, 0, 0); // 将图形变换设置为默认值，这个函数会忽略之前的transform设置，然后设置新的

// 正方形
ctx.fillRect(200, 200, 100, 100);   //
ctx.strokeRect(200, 200, 100, 100);
</script>
</body>
</html>
```

![image-20211123223807124](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211123223807124.png)

### 曲线绘制

#### 一个简单的示例

`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<canvas id="canvas" width="400" height="400" style="border: 1px solid green;"></canvas>
<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// ctx.arc(
//  圆心x轴坐标，
//  圆心y轴坐标，
//  半径，
//  开始角度，
//  结束角度，一个圆的终止角度为 2 * Math.PI
//  是否是逆时针绘制（可选参数，默认为false,即顺时针绘制）
// );
ctx.arc(100, 100, 50, 0, 2 * Math.PI);
ctx.stroke();

</script>
</body>
</html>
```

![image-20211124213852336](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211124213852336.png)

#### 圆角度说明

![image-20211124214556435](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211124214556435.png)

#### 绘制不同角度的弧形

`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<canvas id="canvas" width="1200" height="600" style="border: 1px solid green;"></canvas>
<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');


// 顺时针（默认）绘制10个不同角度的圆
for (let i = 0; i < 10; i++) {
    ctx.beginPath();
    // 圆心坐标
    //      图1：(50, 60)
    //      图2：(150, 60)
    //      依次递增
    // 圆半径固定为30px
    // 开始角度固定为0度
    // 结束角度：
    //      我们代码循环10次，10次平分一个圆的弧度，所以每次循环的结束角度都比上一次大10分之1
    //      2 * Math.PI，这是一个圆的结束角度，
    //      / 10，就是每一份的角度,
    //      * (i+1) 就是第n份的弧度
    ctx.arc(50 + i * 100, 60, 30, 0, 2 * Math.PI / 10 * (i + 1));
    ctx.stroke();
}

// 顺时针（默认）绘制10个不同角度的圆, 带封口的
for (let i = 0; i < 10; i++) {
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.arc(50 + i * 100, 180, 30, 0, 2 * Math.PI / 10 * (i + 1));
    ctx.closePath();
    // 先绘制后填充
    ctx.stroke();
    ctx.fill();
}

// 逆时针绘制10个不同角度的圆
// 逆时针的时候会发现可能跟我们想的不一样，原因是：
//      不管是顺时针还是逆时针，角度都是不变的
for (let i = 0; i < 10; i++) {
    ctx.beginPath();
    ctx.arc(50 + i * 100, 300, 30, 0, 2 * Math.PI / 10 * (i + 1), true);
    ctx.stroke();
}

// 逆时针绘制10个不同角度的圆，带封口的
for (let i = 0; i < 10; i++) {
    ctx.fillStyle = 'orange';
    ctx.beginPath();
    ctx.arc(50 + i * 100, 420, 30, 0, 2 * Math.PI / 10 * (i + 1), true);
    ctx.closePath();
    // 先填充后绘制
    ctx.fill();
    ctx.stroke();
}

</script>
</body>
</html>
```

![image-20211124221513019](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211124221513019.png)

#### 贝塞尔曲线说明

![image-20211126222023481](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211126222023481.png)

>  网站和源码说明：https://www.karlew.com/archives/194



#### 贝塞尔二次曲线

`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<canvas id="canvas" width="400" height="400" style="border: 1px solid green;"></canvas>
<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// ---------------------------------------------------
// 贝塞尔二次曲线-示例1

// 设置起始点坐标(100, 100)
ctx.moveTo(100, 100);
// 设置终止点坐标(200, 100); 设置控制点坐标(150, 50)
ctx.quadraticCurveTo(150, 50, 200, 100);

// ---------------------------------------------------
// 贝塞尔二次曲线-示例2
ctx.moveTo(100, 200);
ctx.quadraticCurveTo(150, 250, 200, 200);

ctx.strokeStyle = 'green';
ctx.stroke();


</script>
</body>
</html>
```

> 贝塞尔二次曲线只能创建有一个弧度的曲线，如果需要多个弧度，需要使用贝塞尔三次曲线

![image-20211126222833853](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211126222833853.png)

#### 贝塞尔三次曲线

`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<canvas id="canvas" width="400" height="400" style="border: 1px solid green;"></canvas>
<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// 贝塞尔三次曲线-示例

// 设置起始点坐标(100, 100)
ctx.moveTo(50, 200);

// bezierCurveTo(控制点1，控制点2，终止点);
ctx.bezierCurveTo(150, 50, 200, 300, 350, 150);

ctx.strokeStyle = 'green';
ctx.stroke();

</script>
</body>
</html>
```

![image-20211126223903412](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211126223903412.png)

`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<canvas id="canvas" width="400" height="400" style="border: 1px solid green;"></canvas>
<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// ---------------------------------------------------
// 贝塞尔二次曲线-示例2

ctx.beginPath();
ctx.moveTo(0, 200);
ctx.bezierCurveTo(150, 50, 200, 300, 400, 150);
ctx.lineTo(400, 400);
ctx.lineTo(0, 400);
ctx.closePath();

ctx.strokeStyle = 'green';
ctx.fillStyle = 'green';
ctx.stroke();
ctx.fill();

</script>
</body>
</html>
```

![image-20211126225051397](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211126225051397.png)

### 文字渲染

#### 基础文字渲染

`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<canvas id="canvas" width="400" height="400" style="border: 1px solid green;"></canvas>
<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// 设置字体
ctx.font = "bold 40px Arial"

// -------------------------- 测试1 ---------------------------------------------
// 字体显示在坐标(10, 100)
ctx.fillText('欢迎来到Canvas世界', 10, 50);


// -------------------------- 测试2 ---------------------------------------------
// 字体显示在坐标(10, 100)
ctx.fillStyle = 'green';
ctx.fillText('欢迎来到Canvas世界', 10, 150);

// -------------------------- 测试3 ---------------------------------------------
ctx.lineWidth = 1;  // 默认
ctx.strokeText("欢迎来到Canvas世界", 10, 250);

// -------------------------- 测试4 ---------------------------------------------
ctx.strokeStyle = 'green';
ctx.strokeText("欢迎来到Canvas世界", 10, 350);

// 以上函数还有第四个参数，表示将文字限制在多大的宽度内，这可能会引起文字看起来特别"瘦"的效果
</script>
</body>
</html>
```

![image-20211126230816225](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211126230816225.png)

#### 水平对齐

`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<canvas id="canvas" width="400" height="400" style="border: 1px solid green;"></canvas>
<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'green';
ctx.strokeStyle = 'blue';

// 左对齐
ctx.textAlign = 'left';
ctx.fillText("textAlign = left", 100, 100);

// 居中对齐
ctx.textAlign = 'center';
ctx.fillText("textAlign = center", 100, 200);

// 右对齐
ctx.textAlign = 'right';
ctx.fillText("textAlign = right", 100, 300);

// 辅助线（水平对齐其实就是相对于x坐标来对齐的，辅助线能更好的表现出对齐的差异）
ctx.beginPath();
ctx.lineTo(100, 50);
ctx.lineTo(100, 350);
ctx.stroke();


</script>
</body>
</html>
```

![image-20211127113223157](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211127113223157.png)

#### 垂直对齐

`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<canvas id="canvas" width="400" height="400" style="border: 1px solid green;"></canvas>
<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'green';
ctx.strokeStyle = 'blue';
ctx.font = "bold 20px Arial"

// 顶部对齐
ctx.textBaseline = 'top';
ctx.fillText("欢迎来到Canvas世界", 100, 100);
drawLine(100, 100);

// 居中对齐
ctx.textBaseline = 'middle';
ctx.fillText("欢迎来到Canvas世界", 100, 200);
drawLine(100, 200);

// 底部对齐
ctx.textBaseline = 'bottom';
ctx.fillText("欢迎来到Canvas世界", 100, 300);
drawLine(100, 300);

// 另外还有其他3个值，感觉用处不大，需要时再测试

function drawLine(x, y) {
    ctx.beginPath();
    ctx.lineTo(50, y);
    ctx.lineTo(350, y);
    ctx.strokeStyle = 'blue';
    ctx.stroke();
}


</script>
</body>
</html>
```

![image-20211127114703330](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211127114703330.png)

#### 文字宽度的度量

`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<canvas id="canvas" width="400" height="400" style="border: 1px solid green;"></canvas>
<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'green';
ctx.strokeStyle = 'blue';
ctx.font = "bold 20px Arial"

// 文本宽度度量
const msg = "欢迎来到Canvas世界";
const width = ctx.measureText(msg).width;

// 渲染文字
ctx.fillText(msg, 100, 100);
ctx.fillText(`以上字符串宽度为${width}px`, 50, 200);

// 高度暂时没有对应的API来获取

</script>
</body>
</html>
```

![image-20211127115324772](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211127115324772.png)



### Canvas 1px像素模糊问题

`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<canvas id="canvas" width="400" height="400" style="border: 1px solid green;"></canvas>
<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// 线条1，宽度1px，比较模糊
ctx.lineWidth = 1;
ctx.beginPath();
ctx.lineTo(50, 100);
ctx.lineTo(350, 100);
ctx.stroke();

// 线条2，宽度2px，清晰
ctx.lineWidth = 2;
ctx.beginPath();
ctx.lineTo(50, 150);
ctx.lineTo(350, 150);
ctx.stroke();

// 线条3，宽度1px，这是优化过后的（对每个数值+0.5），比较清晰，要求不高情况下推荐
ctx.lineWidth = 1;
ctx.beginPath();
ctx.lineTo(50.5, 200.5);
ctx.lineTo(350.5, 200.5);
ctx.stroke();

</script>
</body>
</html>
```

![image-20211127121816164](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211127121816164.png)





## SVG
