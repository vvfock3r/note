## 选择器

### 基本选择器

| 选择器名称  | 语法       | 说明                                                         |
| ----------- | ---------- | ------------------------------------------------------------ |
| *           | *          | 通配符，匹配页面的所有元素                                   |
| 标签选择器  | 标签名称   | 可以为相同元素指定相同的样式                                 |
| class选择器 | `.<class>` | 匹配指定class名称的标签，如果标签有多个class且多个class样式有冲突，<br />以css文件中最后一个定义的class生效 |
| id选择器    | `#<id>`    | 匹配指定id名称的标签，id需要保证在页面中是唯一的，<br />如果写了多个相同的id，那么也都会生效，但是这是不合规范的 |

![demo](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/demo.png)

![image-20211030164237966](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211030164237966.png)



### 复合选择器

| 选择器名称             | 举例       | 说明                                  |
| ---------------------- | ---------- | ------------------------------------- |
| 后代选择器（使用空格） | .box .spec | 选择类名为box的标签内的类为spec的标签 |
| 交集选择器（使用点）   | li.spec    | 既是li标签，也属于spec类的标签        |
| 并集选择器（使用逗号） | ul, li     | 选择所有的ul和li                      |

### 标签关系选择器

| 选择器名称              | 举例   | 说明                                         |
| ----------------------- | ------ | -------------------------------------------- |
| 子选择器（使用>）       | div>p  | div的子标签p，注意对孙子辈的不生效           |
| 相邻兄弟选择器（使用+） | img+p  | img后面紧跟着的p标签                         |
| 通用兄弟选择器（使用~） | p~span | p标签之后所有的同级标签span，注意是p标签之后 |

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
        /* 公共样式 */
        * {
            margin: 0;
            padding: 0;
        }

        html body {
            padding: 20px;
        }

        .title {
            display: block;
            font-size: 14px;
            font-weight: 700;
        }

        [class^="demo"] {
            margin-bottom: 20px;
        }

        /* 测试1: 子选择器，.demo1里面的所有儿子辈的p标签 */
        .demo1 > p {
            color: red;
        }

        /* 测试2：.demo2下的子选择器.d1，它的(.d1)的相邻兄弟选择器.d2，最终所选中的是.d2 */
        .demo2 > .d1 + .d2 {
            color: red;
        }

        .demo2 > .d3 + .d4 { /* 最终选择的是.d4，但是.d4和.d3并不是相邻的关系，所以最后不会被选中 */
            color: red;
        }

        /* 测试3：通用兄弟选择器，.d4必须在同级的.d1之后 */
        .demo2 > .d1 ~ .d4 {
            font-weight: bold;
        }

        .demo2 > .d3 ~ .d2 { /* 因为.d2在.d3之前了，所以不生效 */
            font-weight: bold;
        }

    </style>
</head>
<body>
<div class="demo1">
    <span class="title">子选择器：.demo1 > p, 只对儿子辈生效</span>
    <a href=""></a>
    <p>儿子辈1</p>
    <p>儿子辈2</p>
    <p>儿子辈3</p>
    <div><p>孙子辈4</p></div>
</div>

<div class="demo2">
    <span class="title">相邻兄弟选择器：img+p</span>
    <div class="d1">我是1，我是2的相邻兄弟</div>
    <div class="d2">我是2，我是1和3的相邻兄弟</div>
    <div class="d3">我是3，我是2和span的相邻兄弟</div>
    <span></span>
    <div class="d4">我是4，我是span的相邻兄弟</div>
</div>

</body>
</html>
```

![image-20211031114207786](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211031114207786.png)

### 状态伪类选择器

伪类是添加到选择器的描述性词语，指定要选择的元素的特殊状态，比如超链接有4个状态

| 举例      | 说明                                         |
| --------- | -------------------------------------------- |
| a:link    | 没有被访问的超链接                           |
| a:visited | 已经被访问的超链接                           |
| a:hover   | 正被鼠标悬停的超链接                         |
| a:active  | 正被激活的超链接（按下按键但是还没松开按键） |

> 必须按照爱恨准则（Love Hate --> `l`  `v`  `h` `a`）顺序书写，否则会不生效



### 序号伪类选择器

| 语法1              | 语法2                | 说明           |
| ------------------ | -------------------- | -------------- |
| :first-child       | :first-of-type       | 第一个子标签   |
| :last-child        | :last-of-type        | 最后一个子标签 |
| :nth-child(3)      | :nth-of-type(3)      | 第三个字标签   |
| :nth-last-child(3) | :nth-last-of-type(3) | 倒数第三个标签 |

> 语法1和语法2是一一对应的，但是有一些差别，可以看代码了解其中的差异



**测试1：匹配第一个和最后一个**

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
        /* 测试1： 第一个子标签和最后一个子标签 */
        .demo div:first-child { /* 选中.demo类下的div，并且该div是.demo下的第一个子标签，注意这里是 和 的关系 */
            color: red;
        }

        .demo div:last-child { /* 这个就没有那么幸运了，因为最后一个子标签不是div，样式不生效 */
            color: red;
        }

        .demo :last-child { /* 解决办法1：直接写 :last-child，不管最后一个子标签是什么类型的标签，简单粗暴，但是这个可能跟预期不一样 */
            font-weight: bold;
        }

        .demo div:last-of-type { /* 解决办法2： 匹配.demo下的最后一个div，这个div可以在任何一个位置，不一定是最后一个子标签 */
            color: red;
        }
    </style>
</head>
<body>
<div class="demo">
    <div>矿泉水</div>
    <div>香蕉</div>
    <span>111</span>
    <div>面包</div>
    <div>苹果</div>
    <div>橘子</div>
    <div>火腿肠</div>
    <div>葡萄</div>
    <div>哈密瓜</div>
    <span>222</span>
</div>
</body>
</html>
```

![image-20211031124500241](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211031124500241.png)

**测试2：匹配第n个和最后n个**

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
        /* 测试2： 第n个子标签和最后第n个子标签 */
        .demo div:nth-child(3) { /* .demo下的所有div，并且该div是第三个子标签，这里很显然不满足，所以该样式无效 */
            color: green;
        }

        .demo :nth-child(3) { /* 粗暴的解决办法，不限定标签名 */
            font-weight: bold;
        }

        .demo div:nth-of-type(3) { /* 粗暴的解决办法，不限定标签名 */
            font-weight: bold;
        }

        /* 上面都是正着数，倒着数也是一个原理 */
        .demo div:nth-last-of-type(1) {
            background-color: #999999;
        }
    </style>
</head>
<body>
<div class="demo">
    <div>矿泉水</div>
    <div>香蕉</div>
    <span>111</span>
    <div>面包</div>
    <div>苹果</div>
    <div>橘子</div>
    <div>火腿肠</div>
    <div>葡萄</div>
    <div>哈密瓜</div>
    <span>222</span>
</div>
</body>
</html>
```

![image-20211031125006472](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211031125006472.png)

**测试3：奇数匹配/偶数匹配/每隔n个匹配**

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
        /* 测试3： 每隔n个匹配 */
        .demo div:nth-child(2n) { /* 从0开始，每隔2个匹配一个，且匹配到的必须是div*/
            color: red; /* 为什么从0开始，因为n=0的时候，2n为0， n=1时, 2n=2 */
            /* 这个意思汇总一下就是：选中所有的偶数子标签，且该标签为div，所以内容为10的span标签最终没有被选中 */
        }

        .demo :nth-child(2n) { /* 所以，如果只要是偶数标签就选中的话，就把前面的div去掉即可 */
            font-size: 30px;
        }

        /* 如果想选中所有的奇数，如何写？ :after的语法不清楚没关系，后面会讲，不影响测试；注意不能写成1+2n */
        .demo :nth-child(2n + 1):after {
            content: " 奇数";
        }

        /* 如果想选中3的倍数，即每个3个选中一个，再加一个限制条件，要从第6个子标签开始 */
        .demo :nth-child(3n + 6):after {
            content: " 3的倍数,从6开始";
            font-size: 14px;
        }

    </style>
</head>
<body>
<div class="demo">
    <div>1</div>
    <div>2</div>
    <span>3</span>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
    <div>9</div>
    <span>10</span>
</div>
</body>
</html>
```

![image-20211031131242354](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211031131242354.png)

### 属性选择器

| 举例                 | 说明                                           |
| -------------------- | ---------------------------------------------- |
| `div[class]`         | 匹配有class属性的div                           |
| `div[class="item"]`  | 匹配有class属性的div，并且class的值等于"title" |
| `div[class^="item"]` | 匹配class属性以item开头的标签                  |
| `div[class$="item"]` | 匹配class属性以item结尾的标签                  |
| `div[class*=item]`   | 匹配class属性含有item的标签                    |
| `div[class~=item]`   | 匹配class属性中有空格隔开的item的标签          |
| `div[class|=item]`   | 匹配class属性中以item-开头的标签               |



### 伪类选择器

| 举例      | 说明                               |      |
| --------- | ---------------------------------- | ---- |
| :empty    | 匹配空标签                         |      |
| :focus    | 匹配当前获得焦点的表单元素         |      |
| :enabled  | 匹配当前有效的表单元素             |      |
| :disabled | 匹配当前无效的表单元素             |      |
| :checked  | 匹配当前已经勾选的单选按钮或复选框 |      |
| :root     | 匹配根元素，即`<html>`标签         |      |
| :after    | 在元素后插入内容                   |      |
| :before   | 在元素前插入内容                   |      |



## 样式继承性

文本相关的样式普遍具有继承性，只需要给祖先标签设置，即可在后代所有标签中生效

具有继承性的属性有：

* color
* font-开头的
* list-开头的
* text-开头的
* line-开头的

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
        div {
            color: red;
            font-size: 50px;
            border: 1px solid green; /* 没有被继承 */
        }
    </style>
</head>
<body>
<div>
    <p>Hello World!</p>
</div>
</body>
</html>
```

![image-20211031161601594](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211031161601594.png)



## 选择器权重

### 行内样式权重最大

比如说，后面我们讲的都是非行内样式下，进行比较

```html
<p style="color: red;">Hello World!</p>
```



### 样式不是继承的情况下

规则1：行内样式 > 单独的`id`选择器 > 单独的`class`选择器 > 单独的标签选择器 > 通配符

规则2：复杂选择器权重计算规则

> 通过`（id个数、class个数、标签个数）`的形式，计算权重，对比的时候先对比第一位，如果相同则对比第二位，如果还相同则对比第三位

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
        /* 以下3个样式，都对p标签修改了字体颜色，那么谁会生效呢？是最后一个样式吗？ */

        #box1 #box2 p { /* 计算权重：(2, 0, 1)，意思是：选择器中有2个id，0个class，1个标签属性 */
            color: red;
        }

        #box1 div.box2 #box3 p { /* 计算权重：(2, 1, 2)，意思是：选择器中有2个id，1个class，2个标签属性 */
            color: green;
        }

        .box1 .box2 .box3 p { /* 计算权重：(0, 3, 1)，意思是：选择器中有0个id，3个class，1个标签属性 */
            color: blue;
        }
    </style>
</head>
<body>
<div id="box1" class="box1">
    <div id="box2" class="box2">
        <div id="box3" class="box3">
            <p>Hello World!</p>
        </div>
    </div>
</div>
</body>
</html>
```

![image-20211031160623869](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211031160623869.png)



### 样式包含继承和直接定义(非继承)的情况下

直接定义的样式权重最大

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
        /* 继承的 */
        #box1 #box2 { /* 标签p的样式是继承来的 */
            color: red;
        }

        #box1 div.box2 #box3 { /* 标签p的样式是继承来的 */
            color: green;
        }

        .box1 .box2 .box3 { /* 标签p的样式是继承来的 */
            color: blue;
        }

        /* 直接定义的 */
        p { /* 标签p的样式是直接定义的，权重（0,0,1） */
            color: bisque;
        }

        #box1 p { /* 标签p的样式是直接定义的，权重（1,0,1） */
            color: cornflowerblue;
        }

        .box3 p { /* 标签p的样式是直接定义的，权重（0,1,1） */
            color: blueviolet;
        }
        
    </style>
</head>
<body>
<div id="box1" class="box1">
    <div id="box2" class="box2">
        <div id="box3" class="box3">
            <p>Hello World!</p>
        </div>
    </div>
</div>
</body>
</html>
```

![image-20211031162716899](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211031162716899.png)

### 提升选择器权重

可以在属性后面加上`!import`将权重提升到最大（小于行内样式），如果有多个`!import`，那么还会按照上面讲的规则进行比较

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
        p {
            color: red !important; /* 提升权重 */
        }

        #box1 #box2 #box3 p { /* 标签p的样式是直接定义的，权重（3,0,1） */
            color: blueviolet;
            /*如果我也提升权重呢？*/
            /*color: blueviolet !important;*/
        }
    </style>
</head>
<body>
<div id="box1" class="box1">
    <div id="box2" class="box2">
        <div id="box3" class="box3">
            <p>Hello World!</p>
        </div>
    </div>
</div>
</body>
</html>
```

![image-20211031163946558](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211031163946558.png)







## 盒模型

### 盒模型概念

所有的HTML标签都可以看成是矩形盒子，由`width`、`height`、`padding`、`border`组成

![image-20211031173501044](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211031173501044.png)

### 盒子宽度和高度计算方法

盒子宽高的计算方法与盒子的`box-sizing`属性有关，当`box-sizing`为不同的值时，计算方法不同



**`box-sizing`为默认值得情况下(即没有手动设置过)**

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
        div {
            width: 100px;
            height: 50px;
            padding: 10px;
            border: 2px solid green;
            /* box-sizing的默认值为content-box，即下面的语句写不写都是一样的 */            
            box-sizing: content-box;
        }
    </style>
</head>
<body>
<div></div>
</body>
</html>
```

![image-20211031180113495](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211031180113495.png)

计算方法

```javascript
盒子宽 = width(100) + 左右padding(10 * 2) + 左右border(2*2) = 100 + 20 + 4 = 124
盒子高 = height(50) + 上下padding(10 * 2) + 上下border(2*2) = 50  + 20 + 4 = 74
盒子内容区域宽 = width  = 100
盒子内容区域高 = height = 50
```



**`box-sizing` 等于`border-box`的时候**

将上面的代码改为`box-sizing: border-box;`，然后查看浏览器中盒子宽高

![image-20211031174836073](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211031174836073.png)

这时候的计算方法就变成了

```javascript
盒子宽 = width = 100
盒子高 = height = 50
盒子内容区域宽 = 盒子宽(100) - 左右padding(10 * 2) - 左右border(2*2) = 100 - 20 - 4 = 76
盒子内容区域高 = 盒子高(50)  - 上下padding(10 * 2) - 上下border(2*2) = 50  - 20 - 4 = 26
```



**border-sizing简介**

`boxder-sizing`属性大量应用于移动端网页制作中，因为它结合百分比布局、弹性布局等非常好用，很多前端框架默认会将它的值设置为`border-box`



### 盒子宽高特性

`width`和`height`表示盒子内容宽和高，通常使用`px`固定单位，也可以使用百分比、`rem`等单位，

当没有设置宽高时，盒子宽高会被内部的元素撑开，自动得到一个宽高，当内部没有元素时，宽高为0

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
<span></span>
<div></div>
<ul></ul>
</body>
</html>
```

![image-20211031181553709](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211031181553709.png)

![image-20211031181606663](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211031181606663.png)

![image-20211031181625082](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211031181625082.png)

> 分析：不是说没有内部元素，，宽高为0吗？怎么div是1152px的宽？怎么ul除了是1152px宽，还有左padding是40px？
>
> 这是因为div和ul是块级元素，会自动占满一行，所以不设置宽的话，等同于`width: 100%;`
>
> ul标签的padding是因为这是标签默认带的
>
> 鉴于以上原因，通常我们会设置
>
> ```css
>     <style>
>         * {
>             padding: 0;
>             margin: 0;
>         }
>     </style>
> ```
>
> 注意：这个对性能有影响，通常在学习测试的时候才会这么写，到线上的话有专门的解决办法，比如使用`resetcss`或`normalize.css`等



### 盒子的内边距

* 四个方向的内边距，可以分别使用小属性进行设置

  | 小属性           | 说明        |
  | ---------------- | ----------- |
  | `padding-top`    | 上`padding` |
  | `padding-right`  | 右`padding` |
  | `padding-left`   | 左`padding` |
  | `padding-bottom` | 下`padding` |

* `padding`的四数值写法

  ```css
  padding: 10px 20px 30px 40px;
  		 上    右   下   左			-> 顺时针方向
  ```

* `padding`的三数值写法

  ```css
  padding: 10px 20px 30px;
  		 上    左右  下
  ```

* `padding`的二数值写法

  ```css
  padding: 10px 20px;
  		 上下 左右
  ```

* `padding`的一数值写法

  ```css
  padding: 10px; -> 等同于 padding: 10px 10px 10px 10px;
  ```



### 盒子的外边距

* **margin简介**

![image-20211031203627021](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211031203627021.png)

`margin`的使用方式和`padding`一样，也有四个值，分别代表上右下左（顺时针方向）；

同时也有一些元素是默认带有`margin`属性的，可以自己测试一下



* **使盒子水平居中**

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
        div {
            width: 200px;
            height: 200px;
            background-color: cadetblue;
            /* 使用margin: 0 auto； 可以将盒子居中，但是有一个前提是：盒子必须有宽度 */
            margin: 0 auto;
        }
    </style>
</head>
<body>
<div></div>
</body>
</html>
```

![image-20211031204051322](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211031204051322.png)

> 如果要使盒子垂直居中，不能使用`margin: auto 0;`，而是需要用其他方式实现，比如绝对定位、flex布局等



* **margin竖直方向塌陷问题**

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
          .div1 {
              width: 200px;
              height: 200px;
              background-color: green;
              /* 向下外边距为10px */
              margin-bottom: 10px;
          }
  
          .div2 {
              width: 200px;
              height: 200px;
              background-color: red;
              /* 向上外边距为20px */
              margin-top: 20px;
          }
  
          /*
              问题来了：两个盒子之间的边距有多大？
  
              按照正常来说，应该是：10px + 20px = 30px，实际情况是20px
          	原因是：竖直方向的margin有塌陷现象，小的margin会塌陷到大的margin里面，从而导致小的margin不生效，只生效大的margin，所以是20px
          	注意点：是竖直方向的margin，水平方向的margin没有影响
          */
      </style>
  </head>
  <body>
  <div>
      <div class="div1"></div>
      <div class="div2"></div>
  </div>
  </body>
  </html>
  ```

  

![image-20211031204909456](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211031204909456.png)



## 布局1：浮动布局

初学浮动布局会比较难，不过有个好消息是，现在浮动布局基本已经用不到了，可以直接跳到下一章



**浮动要点**

* 浮动的本质就是：让垂直排序的盒子实现水平排序



**注意事项**

* 如果要浮动，并排的盒子都要设置浮动（否则达不到想要的效果，这并不是语法限制）
* 父盒子要有足够的宽度，否则后面的盒子会掉下去
* 浮动的元素具有顺序贴靠性，后面浮动的元素会向前面浮动的元素贴靠；如果没有足够的空间，则会寻找再前一个元素



**浮动进阶**

* 浮动会脱离标准文档流，一律能设置宽度和高度；
* 浮动的元素要和页面的其他元素"和谐相处"，有两种办法：
  * 父元素形成`BFC`
  * 父元素清除浮动
    * 清除浮动方式1：给父盒子前面或后面的盒子设置`clear: both;`，意思是清除自己两侧的浮动
    * 清除浮动方式2：给父盒子使用`::after`添加一个最后的子元素，并且给该子元素设置`clear:both;`



**`BFC`**

`BFC`(Box Formatting Context，块级格式化上下文)是页面上的一个**隔离的独立容器**，容器里面的元素不会影响到外边的元素，反之亦然

如何创建`BFC`？

* 方法1：`float`的值不是none; 也就是说，元素一旦浮动，该元素就会形成`BFC`
* 方法2：`position`的值不是`static`或`relative`
* 方法3：`display`的值是`inline-block`、`flex`或`inline-flex`
* 方法4：`overflow`:`hidden`;





### 准备工作

先写3个垂直排列的盒子

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
        /* 给盒子添加公共样式 */
        div[class^="div"] {
            width: 200px;
            height: 200px;
        }

        .div1 {
            background-color: red;
        }

        .div2 {
            background-color: green;
        }

        .div3 {
            background-color: blue;
        }
    </style>
</head>
<body>
<div>
    <div class="div1"></div>
    <div class="div2"></div>
    <div class="div3"></div>
</div>
</body>
</html>
```

![image-20211031211141812](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211031211141812.png)

### 测试1：让盒子浮动

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
        /* 给盒子添加公共样式 */
        div[class^="div"] {
            width: 200px;
            height: 200px;
        }

        .div1 {
            background-color: red;
            float: left; /* 添加左浮动 */
        }

        .div2 {
            background-color: green;
            float: left; /* 添加左浮动 */
        }

        .div3 {
            background-color: blue;
            float: left; /* 添加左浮动 */
        }
    </style>
</head>
<body>
<div>
    <div class="div1"></div>
    <div class="div2"></div>
    <div class="div3"></div>
</div>
</body>
</html>
```

![image-20211031211339139](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211031211339139.png)

如果是右浮动的话，效果如下：

![image-20211031211434130](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211031211434130.png)

> 这里用的知识点：
>
> * 如果要浮动，并排的盒子都要设置浮动（否则达不到想要的效果，这并不是语法限制）
> * 浮动的元素具有顺序贴靠性，后面浮动的元素会向前面浮动的元素贴靠



### 测试2：父盒子要有足够的宽度

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
        /* 给盒子添加公共样式 */
        div[class^="div"] {
            width: 200px;
            height: 200px;
        }

        .box {
            width: 400px; /* 给父盒子一个宽度，正好能占下两个子盒子，那么第三个盒子将掉下去 */
        }

        .div1 {
            background-color: red;
            float: left; /* 添加左浮动 */
        }

        .box .div2 {
            background-color: green;
            float: left; /* 添加左浮动 */
        }

        .div3 {
            background-color: blue;
            float: left; /* 添加左浮动 */
        }
    </style>
</head>
<body>
<div class="box">
    <div class="div1"></div>
    <div class="div2"></div>
    <div class="div3"></div>
</div>
</body>
</html>
```

![image-20211031212700107](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211031212700107.png)

> 这里用的知识点：
>
> * 父盒子要有足够的宽度，否则后面的盒子会掉下去
> * 掉下去的盒子会继续贴靠它的前一个盒子的前一个盒子



## 布局2：定位布局（重要）

**定位布局要点**

* 相对定位：盒子可以相对自己原来的位置进行位置调整
* 绝对定位：盒子可以在浏览器中以坐标进行位置精确描述，拥有自己的绝对位置
* 固定定位：不管页面如何滚动，它永远固定在那个位置（可以理解成相对屏幕，位置固定）



**几种定位的区别**

* 相对定位不会脱离标准文档流，绝对定位会和固定定位脱离标准文档流



<hr />	

**相对定位的性质**

* 相对定位会在"老家留坑"，即别的元素不会占用它的位置，本质上它仍在原来的位置，只不过渲染在其他地方



**相对定位的用途**

* 位置微调（相对自身位置）
* 做绝对定位的参考（子绝父相），绝对定位会说到此内容

<hr />

**绝对定位的性质**

* 绝对定位默认情况是在浏览器页面中的绝对坐标，

  但是当父元素设置了相对定位后，绝对定位就是在父元素的区域内的绝对坐标，

  所以，在大多数情况下（99.99%）我们都是设置子元素绝对定位，父元素相对定位，也就是"子绝父相"

* 绝对定位会脱离标准文档流，所以不再区分行内元素和块级元素，一律能设置宽高；

  同时注意不能再使用`margin: 0 auto;`让元素居中了（后面有水平垂直居中的案例参考）

  

**绝对定位的用途**

* 位置微调（相对父元素位置）
* 因为脱离标准文档流，且可以相对于整个页面，所以我们可以做遮罩效果，盖在所有元素上面

<hr />

**固定定位性质**

* 不管页面如何滚动，它永远在屏幕上那一个固定的位置
* 脱离标准文档流



**固定定位用途**

* 返回顶部
* 楼层导航

<hr />

**z-index**

`z-index`属性是一个没有单位的正整数，数值大的能够压盖数值小的





### 测试1：相对定位

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
        /* 基础属性 */
        * {
            margin: 0;
            padding: 0;
        }

        .box {
            background-color: azure;
            width: 300px;
            margin: 0 auto;
            margin-top: 50px;
            /*
                这里是为了解决子元素设置inline-block后会产生缝隙，
                其中一种解决办法是：设置父元素font-size:0，在单独给各个子元素设置font-size即可解决
            */
            font-size: 0;
        }

        .box [class*="box-item"] {
            width: 100px;
            height: 100px;
            display: inline-block;
            font-size: 12px;
        }

        .box-item1 {
            background-color: orange;
        }

        .box-item2 {
            background-color: green;
        }

        .box-item3 {
            background-color: red;
        }

        /* 相对定位演示 */
        .box:nth-child(2) .box-item2 {
            /* 相对定位，可选的有4个属性值，top、right、bottom、left，分别对应上右下左，值可以为负数，即往相反的方向移动 */
            position: relative;
            top: 100px; /* top属性+100px */
        }
    </style>
</head>
<body>

<!-- 下面是两个一模一样的HTML，为了方便对比效果 -->
<div class="box">
    <div class="box-item1">1</div>
    <div class="box-item2">2</div>
    <div class="box-item3">3</div>
</div>

<div class="box">
    <div class="box-item1">1</div>
    <div class="box-item2">2</div>
    <div class="box-item3">3</div>
</div>

</body>
</html>
```

![image-20211103212840158](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211103212840158.png)

### 测试2：绝对定位演示

将测试1中的代码修改为绝对定位

```css
/* 绝对定位演示 */
        .box:nth-child(2) .box-item2 {
            position: absolute;
            top: 0;
            left: 0;
        }
```

![image-20211103215200172](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211103215200172.png)

### 测试3：绝对定位水平垂直居中

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
        .box {
            position: relative;
            width: 200px;
            height: 200px;
            border: 1px solid red;
            box-sizing: border-box;
        }

        .box1 {
            width: 100px;
            height: 100px;
            background-color: green;

            /* 一般情况下(未脱离标准文档流)，我们可以使用margin: 0 auto; 来让盒子居中 */
            /*margin: 0 auto;*/

            /* (1)但是设置了绝对定位后，就脱离了标准文档流，再使用margin就不管用了 */
            position: absolute;

            /* (2)这个时候如何水平和垂直居中呢？ */
            top: 50%;
            left: 50%;

            /*
                (3)这个时候会发现元素偏右下，原因是：
                    设置top时，是元素顶部距离页面50%的距离，并不是元素中心距离顶部50%，设置left时同理，
                    最终看起来的效果就是偏右下
                如何解决呢？就是让元素往左上移动一些
                    设置 margin-top:  负的自己高的一半;
                    设置 margin-left: 负的自己宽的一半；
             */
            margin-top: -50px;
            margin-left: -50px;
        }
    </style>
</head>
<body>
<div class="box">
    <div class="box1"></div>
</div>
</body>
</html>
```

> 使用绝对定位做水平垂直居中很好用，但并不是最优的办法，因为如果盒子宽高不确定，那么margin-xx就值也就不确定；
>
> 后面有专门章节讲解水平垂直居中方案

![image-20211103221009935](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211103221009935.png)

### 测试4：绝对定位-轮播图压盖效果

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
        }

        .carousel {
            width: 488px;
            height: 302px;
            margin: 20px auto;
            border: 1px solid #333;
            box-sizing: border-box;
            /* 设置相对定位，用于轮播图左右两侧按钮绝对定位的参考位置 */
            position: relative;
        }

        /* 左右按钮共同的特征 */
        .carousel .btn {
            width: 40px;
            height: 40px;
            border-radius: 50%;

            /* 定位属性 */
            position: absolute;
            top: 50%;
            margin-top: -20px;

            /* 文本属性 */
            text-align: center;
            line-height: 40px;
            background-color: #999999;
            color: #333333;
            font-size: 18px;
            font-family: Consolas, serif;
            cursor: pointer;
        }

        .carousel .btn:hover {
            background-color: gold;
            color: white;
        }

        /* 左按钮 */
        .carousel .leftBtn {
            left: 10px;
        }

        /* 右按钮 */
        .carousel .rightBtn {
            right: 10px;
        }

        /* 图片右下方小圆点 */
        .carousel ol {
            position: absolute;
            right: 20px;
            bottom: 20px;
            overflow: hidden;
        }

        .carousel ol li {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            float: left;
            list-style: none;
            margin-right: 10px;
            background-color: #999999;
        }

        .carousel ol li.active {
            background-color: gold;
        }


    </style>
</head>
<body>
<div class="carousel">
    <img src="https://img0.baidu.com/it/u=834069105,1198120471&fm=26&fmt=auto" alt="">
    <a class="btn leftBtn">&lt;</a>
    <a class="btn rightBtn">&gt;</a>
    <ol>
        <li></li>
        <li class="active"></li>
        <li></li>
        <li></li>
    </ol>
</div>
</body>
</html>
```

![image-20211106141136470](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211106141136470.png)

### 测试5：固定定位-楼层导航特效

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
        }

        html, body {
            width: 100%;

        }

        li {
            list-style: none;
        }

        .main {
            width: 1290px;
            height: 100%;
            margin: 0 auto;
            /*border: 1px solid black;*/
            box-sizing: border-box;

            display: flex;
            justify-content: center;
        }

        .aside {
            width: 20%;
            height: 100%;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            position: fixed;
            top: -20%;
            left: 0;
        }


        .aside ul li {
            background-color: rgb(248, 248, 248);
            margin-bottom: 3px;
            text-align: center;
            height: 40px;
            line-height: 40px;
            padding: 15px;
        }

        .content {
            width: 60%;
            height: 100%;

            /*background-color: green;*/
        }

        .content .article {
            width: 100%;
            min-height: 100px;
            padding: 20px;
            background-color: #333333;
            margin-bottom: 50px;
            color: white;
            text-align: center;


        }

        .content .article pre {
            text-align: left;
            white-space: pre-line;
            word-wrap: break-word;
            line-height: 1.9;
        }

        .aside .active {
            background-color: #333333;
            color: white;
        }

        .footer {
            height: 800px;
            text-align: center;
        }
    </style>
</head>
<body>
<div class="main">
    <div class="aside">
        <ul id="floorBox">
            <li class="floor active" data-index=0>楼层1</li>
            <li class="floor" data-index=1>楼层2</li>
            <li class="floor" data-index=2>楼层3</li>
            <li class="floor" data-index=3>楼层4</li>
            <li class="floor" data-index=4>楼层5</li>
            <li class="floor" data-index=5>楼层6</li>
        </ul>
    </div>
    <div class="content">
        <div class="article active">
            <h2>F1</h2>
            <pre>
                定位是一个相当复杂的话题，所以我们深入了解代码之前，让我们审视一下布局理论，并让我们了解它的工作原理。

                首先，围绕元素内容添加任何内边距、边界和外边距来布置单个元素盒子——这就是 盒模型 ，我们前面看过。 默认情况下，块级元素的内容宽度是其父元素的宽度的100％，并且与其内容一样高。内联元素高宽与他们的内容高宽一样。您不能对内联元素设置宽度或高度——它们只是位于块级元素的内容中。 如果要以这种方式控制内联元素的大小，则需要将其设置为类似块级元素 display: block;。

                这只是解释了单个元素，但是元素相互之间如何交互呢？ 正常的布局流（在布局介绍文章中提到）是将元素放置在浏览器视口内的系统。默认情况下，块级元素在视口中垂直布局——每个都将显示在上一个元素下面的新行上，并且它们的外边距将分隔开它们。

                内联元素表现不一样——它们不会出现在新行上；相反，它们互相之间以及任何相邻（或被包裹）的文本内容位于同一行上，只要在父块级元素的宽度内有空间可以这样做。如果没有空间，那么溢流的文本或元素将向下移动到新行。

                如果两个相邻元素都在其上设置外边距，并且两个外边距接触，则两个外边距中的较大者保留，较小的一个消失——这叫外边距折叠, 我们之前也遇到过。
            </pre>
        </div>
        <div class="article">
            <h2>F2</h2>
            <pre>
                display属性
在css中实现页面布局的主要方法是设定display属性的值。此属性允许我们更改默认的显示方式。正常流中的所有内容都有一个display的值，用作元素的默认行为方式。例如，英文段落显示在一个段落的下面，这是因为它们的样式是display:block。如果在段落中的某个文本周围创建链接，则该链接将与文本的其余部分保持内联，并且不会打断到新行。这是因为a元素默认为display:inline。

您可以更改此默认显示行为。例如，li元素默认为display:block，这意味着在我们的英文文档中，列表项显示为一个在另一个之下。如果我们将显示值更改为inline，它们现在将显示在彼此旁边，就像单词在句子中所做的那样。事实上，您可以更改任何元素的display值，这意味着您可以根据它们的语义选择html元素，而不必关心它们的外观。他们的样子是你可以改变的。

除了可以通过将一些内容从block转换为inline（反之亦然）来更改默认表示形式之外，还有一些更大的布局方法以display值开始。但是，在使用这些属性时，通常需要调用其他属性。在讨论布局时，对我们来说最重要的两个值是display:flex和display:grid。

弹性盒子(Flexbox)
Flexbox 是CSS 弹性盒子布局模块（Flexible Box Layout Module）的缩写，它被专门设计出来用于创建横向或是纵向的一维页面布局。要使用flexbox，你只需要在想要进行flex布局的父元素上应用display: flex ，所有直接子元素都将会按照flex进行布局。我们来看一个例子。

下面这些HTML标记描述了一个class为wrapper的容器元素，它的内部有三个div元素。它们在我们的英文文档当中，会默认地作为块元素从上到下进行显示。

现在，当我们把display: flex添加到它的父元素时，这三个元素就自动按列进行排列。这是由于它们变成了flex项(flex items)，按照flex容器（也就是它们的父元素）的一些flex相关的初值进行flex布局：它们整整齐齐排成一行，是因为父元素上flex-direction的初值是row。它们全都被拉伸至和最高的元素高度相同，是因为父元素上align-items属性的初值是stretch。这就意味着所有的子元素都会被拉伸到它们的flex容器的高度，在这个案例里就是所有flex项中最高的一项。所有项目都从容器的开始位置进行排列，排列成一行后，在尾部留下一片空白。
            </pre>
        </div>
        <div class="article">
            <h2>F3</h2>
            <pre>
                除了上述可以被应用到flex容器的属性以外，还有很多属性可以被应用到flex项(flex items)上面。这些属性可以改变flex项在flex布局中占用宽/高的方式，允许它们通过伸缩来适应可用空间。

作为一个简单的例子，我们可以在我们的所有子元素上添加flex 属性，并赋值为1，这会使得所有的子元素都伸展并填充容器，而不是在尾部留下空白，如果有更多空间，那么子元素们就会变得更宽，反之，他们就会变得更窄。除此之外，如果你在HTML标记中添加了一个新元素，那么它们也会变得更小，来为新元素创造空间——不管怎样，最终它们会调整自己直到占用相同宽度的空间。
            </pre>
        </div>
        <div class="article">
            <h2>F4</h2>
            <pre>
                定位(positioning)能够让我们把一个元素从它原本在正常布局流(normal flow)中应该在的位置移动到另一个位置。定位(positioning)并不是一种用来给你做主要页面布局的方式，它更像是让你去管理和微调页面中的一个特殊项的位置。

有一些非常有用的技术在特定的布局下依赖于position属性。同时，理解定位(positioning)也能够帮助你理解正常布局流(normal flow)，理解把一个元素移出正常布局流(normal flow)是怎么一回事。

有五种主要的定位类型需要我们了解：

静态定位(Static positioning)是每个元素默认的属性——它表示“将元素放在文档布局流的默认位置——没有什么特殊的地方”。
相对定位(Relative positioning)允许我们相对于元素在正常的文档流中的位置移动它——包括将两个元素叠放在页面上。这对于微调和精准设计(design pinpointing)非常有用。
绝对定位(Absolute positioning)将元素完全从页面的正常布局流(normal layout flow)中移出，类似将它单独放在一个图层中。我们可以将元素相对于页面的 html 元素边缘固定，或者相对于该元素的最近被定位祖先元素(nearest positioned ancestor element)。绝对定位在创建复杂布局效果时非常有用，例如通过标签显示和隐藏的内容面板或者通过按钮控制滑动到屏幕中的信息面板。
固定定位(Fixed positioning)与绝对定位非常类似，但是它是将一个元素相对浏览器视口固定，而不是相对另外一个元素。 这在创建类似在整个页面滚动过程中总是处于屏幕的某个位置的导航菜单时非常有用。
粘性定位(Sticky positioning)是一种新的定位方式，它会让元素先保持和position: static一样的定位，当它的相对视口位置(offset from the viewport)达到某一个预设值时，他就会像position: fixed一样定位。
            </pre>
        </div>
        <div class="article">
            <h2>F5</h2>
            <pre>
                Ajax简介
Asynchronous JavaScript + XML（异步JavaScript和XML）, 其本身不是一种新技术，而是一个在 2005年被Jesse James Garrett提出的新术语，用来描述一种使用现有技术集合的‘新’方法，包括: HTML 或 XHTML,  CSS, JavaScript, DOM, XML, XSLT, 以及最重要的 XMLHttpRequest。当使用结合了这些技术的AJAX模型以后， 网页应用能够快速地将增量更新呈现在用户界面上，而不需要重载（刷新）整个页面。这使得程序能够更快地回应用户的操作。

尽管X在Ajax中代表XML, 但由于JSON的许多优势，比如更加轻量以及作为Javascript的一部分，目前JSON的使用比XML更加普遍。JSON和XML都被用于在Ajax模型中打包信息。

新手入门
本文将为您引导完成ajax基础知识，并为您提供两个简单的实际操作示例。
使用XMLHttpRequest API
XMLHttpRequest API是Ajax的核心。本文将解释如何使用一些Ajax技术，比如：
分析和操纵服务器响应
监控请求过程
 提交表单或者上传二进制文件– 使用纯Ajax或者FormData对象
创建异步或同步请求
在Web workers中使用Ajax
Fetch API
Fetch API 提供一个获取资源的接口。对于用过 XMLHTTPRequest 的人来说会觉得很熟悉，但这个API提供了更加强大且灵活的特性。
Server-sent 事件
在过去，一个网页必须发送请求到服务器来获取新的数据，也就是说，网页必须主动向服务器请求数据。有了server-sent events之后，服务器可以向网页推送消息，使得服务器可以随时向网页传送数据。这些发送过来的消息可以看作是带有数据的事件。参见: Using server-sent events.
纯 Ajax 导航示例
本文提供了一个仅由三个页面组成的纯Ajax网站的（简易）工作示例。
发送和接收二进制数据
可以设置 XMLHttpRequest 对象的 responseType 属性以改变从服务器端获取数据的类型。可接受的值为空字符串（默认）、arraybuffer、blob、document、json 以 及 text。 response 属性性根据 responseType 的值成为对应的数据对象，如 ArrayBuffer，Blob、 Document、 JSON 或者 string 。本文会展示一些Ajax I/O技术。
XML
The Extensible Markup Language (XML) 可扩展标记语言是W3C推荐的一种专用于创建专用标记语言的通用标记语言 。它是SGML的简化子集，能够描述许多不同类型的数据。其主要目的是促进在不同的系统，尤其是通过互联网连接的系统间的数据共享。
解析和序列化 XML
如何从字符串，文件或者Javascript中解析XML文档，以及如何将XML文档序列转化为字符串，Javascript对象树 (JSON)或者文件 。
XPath
XPath 代表XML Path Language,它使用非XML 语法，提供了一种灵活的方式来寻址（指向）XML文档的不同部分。除此之外，它还可以用于测试文档中的寻址节点，以确定他们是否匹配模式。
FileReader API
 FileReader API允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓存）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。文件对象可以从用户选择文件后的 元素的 FileList 对象中获取，也可以从拖放操作的 DataTransfer 对象获取，或者从HTMLCanvasElement 的mozGetAsFile() API获取。
XMLHttpRequest对HTML的支持
W3C XMLHttpRequest规范向XMLHttpRequest添加了HTML解析支持，XMLHttpRequest原本只支持XML解析。此功能允许Web应用程序使用XMLHttpRequest获取HTML资源作为解析的DOM
            </pre>
        </div>
        <div class="article">
            <h2>F6</h2>
            <pre>
                空空如也
            </pre>
        </div>
    </div>
</div>
<div class="footer">
    页脚
</div>
<script>
// 楼层高度数组,索引代表楼层号，值代表楼层高度
const floorList = document.getElementsByClassName("floor");
const articleList = document.getElementsByClassName("article");
let mapHeight = [];

for (let article of articleList) {
    mapHeight.push(article.offsetTop - 50);
}


// 清除所有楼层样式
function clearActive(elementList) {
    for (let item of elementList) {
        item.classList.remove("active");
    }
}

// 鼠标滚动事件
window.addEventListener("scroll", function (e) {
    // 动态修改样式
    const scrollHeight = window.scrollY;
    mapHeight.forEach((v, k) => {
        if (scrollHeight > v) {
            clearActive(floorList);
            floorList[k].classList.add("active");
        }
    })
})

// 点击楼层事件（采用事件委托）
const floorBox = document.getElementById("floorBox");
floorBox.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    document.documentElement.scrollTop = mapHeight[index] + 50;
})
</script>
</body>
</html>
```

![image-20211106141136470](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/%E5%8A%A8%E7%94%BB23.gif)



### 测试6：z-index

`demo.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        [class*='box'] {
            width: 200px;
            height: 200px;
            border: 1px solid #000000;
            box-sizing: border-box;
            margin: 50px;
        }

        .box1 {
            background-color: red;
            position: absolute;
            top: 0;
            left: 50px;
            /* z-index */
            /*z-index: 999;*/
        }

        .box2 {
            background-color: green;
            position: absolute;
            top: 50px;
            left: 0;
        }
    </style>
</head>
<body>
<div class="box1"></div>
<div class="box2"></div>
</body>
</html>
```

![image-20211108172924551](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/ZWsG8gjk6zTBdGPK.png)

![image-20211108173144694](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/FWsG8gjk6zTBdGPA.png)





## 布局3：弹性布局（非常重要）

**主轴和交叉轴**

如果主轴为水平方向（横轴、或X轴），那么交叉轴就为垂直方向的（竖轴、Y轴）

如果主轴为垂直方向的（竖轴、Y轴），那么交叉轴就为水平方向（横轴、或X轴）

默认情况下主轴为水平方向，交叉轴为垂直方向，可以通过`flex-direction:`参数修改



**容器和项目**

给元素定义`display: flex;`或`display: inline-flex;`后，该元素就成为`flex容器`

`flex容器`下的子元素成为`flex项目`，注意必须是子元素，孙子元素就不是了

`flex项目`就不再区分块元素和行内元素了，一律能设置宽高



**`flex`布局特性**

* PC端和移动端布局支持良好，推荐使用



### 容器属性

| 属性                   | 值                   | 说明                                                         |
| ---------------------- | -------------------- | ------------------------------------------------------------ |
| `display:`             | `flex `              | 给标签添加display: flex; 后，该标签就被称为flex容器，默认会占满一整行； |
|                        | `inline-flex`        | `flex`与`inline-flex`的区别在于会不会占满一整行，这与`block`和`inline-block`很类似 |
| `flex-direction:`      | `row `（默认）       | 定义主轴的方向为<span style="color:red;">水平方向</span>（这也是默认值），起始方向为为<span style="color:red;">从左到右</span> |
|                        | `row-reverse`        | 定义主轴的方向为水平方向，起始方向为为<span style="color:red;">从右到左</span> |
|                        | `column `            | 定义主轴的方向为<span style="color:red;">垂直方向</span>，起始方向为为<span style="color:red;">从上到下</span> |
|                        | `column-reverse`     | 定义主轴的方向为垂直方向，起始方向为为<span style="color:red;">从下到上</span> |
| `flex-wrap:`           | `nowrap`（默认）     | 定义一条轴线排不下的时候，换行方式处理策略，此处为不换行<br />项目会根据默认的或我们显示指定的缩小方式进行调整 |
|                        | `wrap`               | 换行，主轴为水平方向的话是这样的：<br /><code>1 2 3<br />4 5</code> |
|                        | `wrap-reverse`       | 换行，且所有元素倒序排序，主轴为水平方向的话是这样的：<br /><code>4 5<br />1 2 3</code> |
| `flex-flow:`           | -                    | 这是`flex-direction`和`flex-wrap`的简写形式，默认值为`row nowrap` |
| **`justify-content:`** | `flex-start`（默认） | 定义项目在主轴上的对齐方式，默认从主轴开始方向排列，即左对齐 |
|                        | `flex-end`           | 从主轴结束方向排列，即右对齐                                 |
|                        | `center`             | 居中                                                         |
|                        | `space-between`      | 两端对齐，项目之间的间隔相等<br /><code>1 2 3 4 5</code>     |
|                        | `space-around`       | 每个项目两侧间隔相等，即意味着项目之间的间隔比项目与边框之间的间隔大一倍<br /><code> 1  2  3  4  5 </code> |
| **`align-items`**      | `stretch`            | 定义项目在交叉轴上的对齐方式，默认值`stretch`的意思是：<br />如果项目未设置高度或设为`auto`，将占满整个容器的高度 |
|                        | `flex-start`         | 交叉轴起点对齐                                               |
|                        | `flex-end`           | 交叉轴终点对齐                                               |
|                        | `center`             | 交叉轴中点对齐                                               |
|                        | `baseline`           | 项目第一行文字基线对齐                                       |
| `align-content`        | `stretch`            | 定义项目在交叉轴上的对齐方式（多根轴线情况下），<br />所以前提是得有多根轴线`flex-wrap: wrap;`或`flex-wrap: wrap-reverse;`<br />默认值`stretch`意思是如果项目未设置高度或设为`auto`，将占满整个容器的高度 |
|                        | `flex-start`         | 交叉轴起点对齐，示例：<br /><code>1 2 3 4<br />5 6 7 8<br />9<br /><br /></code> |
|                        | `flex-end`           | 交叉轴终点对齐，示例：<br /><code><br /><br />1 2 3 4<br />5 6 7 8<br />9</code> |
|                        | `center`             | 交叉轴中点对齐，示例：<br /><code><br />1 2 3 4<br />5 6 7 8<br />9<br /></code> |
|                        | `space-between`      | 两端对齐，项目之间的间隔相等                                 |
|                        | `space-around`       | 每个项目两侧间隔相等，即意味着项目之间的间隔比项目与边框之间的间隔大一倍 |



### 项目属性

| 属性          | 值             | 说明                                                         |
| ------------- | -------------- | ------------------------------------------------------------ |
| `order`       | `0`（默认）    | 数值越小，排列越靠前                                         |
| `flex-grow`   | `0`（默认）    | 定义项目的放大比例，默认值0代表即使容器存在剩余空间，该项目也不放大<br />如果所有项目都设置为1，则它们等分剩余空间；<br />如果一个项目`flex-grow`设置为2，其他项目设置为1，则前者占据的剩余空间比其他项目多一倍<br />本质：是按照百分比计算的 |
| `flex-shrink` | `1`（默认）    | 定义项目的缩小比例，默认值为1代表如果容器占不下项目的话，所有项目等比例缩小<br />如果一个项目的`flex-shrink`设置为0，其他项目设置为1，那么当空间不够时，前者不缩小，其他项目缩小<br />注意：属性不能设置为负值 |
| `flex-basis`  | `auto`（默认） | 定义在分配剩余空间之前，项目占据的主轴空间<br />浏览器会根据这个属性计算主轴是否有多余的空间，也就是说如果设置了`flex-basis`，那么`width`的值将不会生效 |
| `flex`        | ---            | `flex-grow`、`flex-shrink`、`flex-basis`的简写形式，默认值为`0 1 auto` |
|               | 1              | 这种写法很常见，全写是`1 1 0%`，                             |
|               | `auto`         | `1 1 auto`，如果有剩余空间或空间不足，由大家（所有项目）平分 |
|               | `none`         | `0 0 auto`，不放大也不缩小                                   |
| `align-self`  | `auto`         | 运行单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`<br />默认值`auto`代表继父元素的`align-items`属性，如果没有父元素，等同于`stretch` |



### 测试1：水平垂直居中

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

        html, body {
            width: 100%;
            height: 100%;
        }

        /* 让其子元素水平垂直居中 */
        .center {
            display: flex;
            justify-content: center;
            align-items: center;
        }


        .box {
            width: 300px;
            height: 300px;
            border: 1px solid #000000;
        }

        .item {
            width: 200px;
            height: 200px;
            background-color: green;
        }

        .sub {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background-color: cornflowerblue;
        }
    </style>
</head>
<body class="center">
<div class="box center">
    <div class="item center">
        <div class="sub"></div>
    </div>
</div>
</body>
</html>
```

![image-20211107122404711](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211107122404711.png)

> 水平垂直居中使用`flex`布局，相比较使用使用定位布局，不再需要关心子元素有多高有多宽（margin-xx），推荐这种写法



### 测试2：移动端布局测试

`demo.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>Title</title>
    <link rel="stylesheet" href="css/iconfont.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            /*color: white;*/
        }

        html {
            height: 100%;
        }

        li {
            list-style: none;
        }

        a {
            text-decoration: none;
        }

        body {
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .header {
            background-color: rgba(222, 24, 27, 0.9);
            height: 50px;
            display: flex;
            /*水平居中*/
            justify-content: center;
            /*垂直居中*/
            align-items: center;
        }

        .main {
            display: flex;
            height: 100%;
        }

        .main-sidebar {
            height: 100%;
            background-color: pink;
            width: 150px;
            order: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .main-content {
            height: 100%;
            background-color: green;
            order: 0;
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .tabbar-container {
            width: 100%;
            height: 50px;
        }

        .tabbar {
            display: flex;
            height: 100%;
            justify-content: center;
        }

        .tabbar-item {
            flex: 1;
            background-color: white;
        }

        a {
            font-size: 12px;
        }

        .iconfont {
            font-size: 24px;
        }

        .tabbar-link {
            display: flex;
            flex-direction: column;
            height: 100%;
            justify-content: center;
            align-items: center;
        }

    </style>
</head>
<body>

<header class="header">header</header>

<div class="main">
    <div class="main-sidebar">sidebar</div>
    <div class="main-content">content</div>
</div>

<footer class="tabbar-container">
    <ul class="tabbar">
        <li class="tabbar-item tabbar-item-active">
            <a href="###" class="tabbar-link">
                <i class="iconfont icon-home"></i>
                <span>首页</span>
            </a>
        </li>
        <li class="tabbar-item">
            <a href="###" class="tabbar-link">
                <i class="iconfont icon-category"></i>
                <span>分类页</span>
            </a>
        </li>
        <li class="tabbar-item">
            <a href="###" class="tabbar-link">
                <i class="iconfont icon-cart"></i>
                <span>购物车</span>
            </a>
        </li>
        <li class="tabbar-item">
            <a href="###" class="tabbar-link">
                <i class="iconfont icon-personal"></i>
                <span>个人中心</span>
            </a>
        </li>
    </ul>
</footer>

</body>
</html>
```

> 字体图标下载地址：https://www.iconfont.cn/ （教程自己在官网找一下）

![image-20211107123638175](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211107123638175.png)



## `2D`变形和`3D`旋转



### 准备工作

`demo.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .main {
            width: 800px;
            height: 800px;
            margin: 300px auto;
            text-align: center;
        }

        .description:after {
            content: "正常的图片";
        }

        .box {
            width: 180px;
            height: 246px;
            border: 5px solid green;
            padding: 80px;
            margin: 60px auto;
        }

        .box img {
        }
    </style>
</head>
<body>

<div class="main">
    <h2 class="description"></h2>
    <div class="box">
        <img src="https://img2.baidu.com/it/u=2129210531,2234000365&fm=26&fmt=auto" alt="">
    </div>
</div>

</body>
</html>
```

![image-20211108222443722](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211108222443722.png)



### 旋转变形

| 属性               | 值                | 说明                                                         |
| ------------------ | ----------------- | ------------------------------------------------------------ |
| `transform`        | `rotate(<n>deg);` | 旋转变形；若角度n为正值，则顺时针旋转，否则逆时针旋转<br />旋转一周的角度是360度，即正旋转300度(`rotate(300deg);`)和<br />负旋转60度(`rotate(-60deg);`)是一样的效果 |
| `transform-origin` | `0 0;`            | 设置旋转中心；`0 0;`就是左上角，`0 100%;`左下角，其他也类似  |



#### 测试1：盒子旋转45度

```css
        .description:after {
            content: "盒子旋转45度，内部的元素也会跟着旋转";
        }
        .box {
            width: 180px;
            height: 246px;
            border: 5px solid green;
            padding: 80px;
            margin: 60px auto;

            /* 盒子旋转45度 */
            transform: rotate(45deg);
        }

        .box img {
        }
```



![image-20211108220129891](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211108220129891.png)

#### 测试2：只旋转图片

```css
        .description:after {
            content: "只旋转图片，不旋转盒子";
        }

        .box {
            width: 180px;
            height: 246px;
            border: 5px solid green;
            padding: 80px;
            margin: 60px auto;
        }

        .box img {
            /* 图片旋转45度 */
            transform: rotate(45deg);
        }
```

![image-20211108220549546](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211108220549546.png)

#### 测试3：盒子顺时针转，图片逆时针转

```css
        .description:after {
            content: "盒子顺时针转，图片逆时针转";
        }

        .box {
            width: 180px;
            height: 246px;
            border: 5px solid green;
            padding: 80px;
            margin: 60px auto;
            /* 盒子旋转45度 */
            transform: rotate(45deg);
        }

        .box img {
            /* 图片旋转45度 */
            transform: rotate(-45deg);
        }
```

![image-20211108220854953](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211108220854953.png)

#### 测试4：以盒子左上角为旋转点旋转45度

```css
        .description:after {
            content: "以盒子左上角为旋转点旋转";
        }

        .box {
            width: 180px;
            height: 246px;
            border: 5px solid green;
            padding: 80px;
            margin: 60px auto;

            /* 以盒子左上角为旋转点旋转45度 */
            transform: rotate(45deg);
            transform-origin: 0 0;
        }

        .box img {

        }
```

![image-20211108221332997](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211108221332997.png)

### 缩放变形

| 属性        | 值            | 说明                                                         |
| ----------- | ------------- | ------------------------------------------------------------ |
| `transform` | `scale(<n>);` | 缩放变形；n代表缩放倍数；也可以写两个值，分别代表宽和高缩放的倍数<br />当数值大于1时表示放大倍数，小于1时表示缩小倍数 |



#### 测试1：将盒子放大2倍

```css
        .description:after {
            content: "将盒子放大2倍";
        }

        .box {
            width: 180px;
            height: 246px;
            border: 5px solid green;
            padding: 80px;
            margin: 60px auto;

            /* 将盒子放大2倍 */
            transform: scale(2);
        }

        .box img {

        }
```

![image-20211108222559382](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211108222559382.png)

#### 测试2：将盒子缩放至原来的二分之一

```css
       .description:after {
            content: "将盒子缩放至原来的二分之一";
        }

        .box {
            width: 180px;
            height: 246px;
            border: 5px solid green;
            padding: 80px;
            margin: 60px auto;

            /* 将盒子缩放至原来的二分之一 */
            transform: scale(.5);
        }

        .box img {

        }
```

![image-20211108222822196](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211108222822196.png)

### 斜切变形

| 属性        | 值                            | 说明                                                         |
| ----------- | ----------------------------- | ------------------------------------------------------------ |
| `transform` | `skew(x斜切角度，y斜切角度);` | 角度单位为`deg`<br />注意：当只有一个参数的时候，第二个参数默认为`0deg` |

**测试1：斜切变形**

```css
        .description:after {
            content: "斜切变形";
        }

        .box {
            width: 180px;
            height: 246px;
            border: 5px solid green;
            padding: 80px;
            margin: 60px auto;

            /* 斜切变形 */
            transform: skew(-20deg, -10deg);
        }

        .box img {

        }
```

![image-20211108223528671](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211108223528671.png)

### 位移变形

| 属性        | 值                        | 说明                                                         |
| ----------- | ------------------------- | ------------------------------------------------------------ |
| `transform` | `translate(300px, 10px);` | 两个值分别代表向右移动300像素，向下移动10像素<br />这与相对定位很类似，也会在"老家留坑" |

**测试1：位移变形**

```css
        .description:after {
            content: "位移变形";
        }

        .box {
            width: 180px;
            height: 246px;
            border: 5px solid green;
            padding: 80px;
            margin: 60px auto;

            /* 位移变形 */
            transform: translate(300px, 10px);
        }

        .box img {

        }
```

![image-20211108224227593](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211108224227593.png)

### `3D`旋转

| 属性          | 值                                         | 说明                                                         |
| ------------- | ------------------------------------------ | ------------------------------------------------------------ |
| `transform`   | `rotateX(<n>deg);`<br />`rotateY(<n>deg);` | 分别代表绕横轴和绕纵轴旋转，两个可以一块写，使用逗号隔开     |
| `perspective` | 像素                                       | 用来定义透视的强度，可以理解为"人眼到舞台的距离"，单位是像素<br />这个属性一般设置在`3D`旋转元素的父元素上 |

**测试1：简单旋转测试**

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
        }


        div {
            width: 202px;
            height: 202px;
            margin: 200px auto;
            border: 1px solid #000000;
        }

        p {
            width: 200px;
            height: 200px;
            background-color: orange;
        }

        /* div需要设置perspective */
        div {
            perspective: 300px;
        }

        /* 设置3D旋转,先设置0度，一会在控制台调试 */
        p {
            transform: rotateX(0deg);
        }

    </style>
</head>
<body>
<div>
    <p></p>
</div>
</body>
</html>
```

![image-20211108224227593](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/3d%E6%97%8B%E8%BD%AC%E6%B5%8B%E8%AF%95.gif)

## 过渡

`transition`过渡属性可以为一个元素在不同样式之间变化自动添加"补间动画"

```css
transition: width       1s      linear        0s;
		 什么属性要过渡  动画时长  变化速度曲线   开始延迟时间		 
```

> 第一个参数也可以写all，代表所有属性都要过渡



**哪些属性可以参与过渡**

* 所有数值类型的属性都可以参与过渡，比如说`width`、`height`、`left`、`top`、`border-radius`等 
* 文字颜色、背景颜色等
* 所有变形（包括2D和3D）



`demo.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
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

        .main {
            display: flex;
            flex-wrap: wrap;
            padding: 20px;
        }

        .main .item {
            width: 19%;
            display: flex;
            flex-direction: column;
            align-items: center;

            border: 1px solid #999999;
            padding: 20px;
            margin-right: 1%;
            margin-bottom: 20px;
            min-width: 260px;
            min-height: 260px;
            position: relative;
        }

        .main .item h3 {
            width: 100%;
            height: 20%;
            text-align: center;
        }

        .main .item .example {
            width: 100%;
            height: 80%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .item [class*=box] {
            background-color: orange;
            color: #333;
            font-size: 12px;
        }


        /* 测试1：过渡与非过渡效果对比 */
        .box1, .box2 {
            width: 80px;
            height: 80px;
            position: absolute;
            left: 10%;
        }

        .box1 {
            top: 20%;
        }

        .box2 {
            top: 60%;
        }

        .box1:hover, .box2:hover {
            width: 200px;
        }

        .box2 {
            transition: width 1s linear 0s; /* width属性参与过渡 */
        }

        /* 测试2： 过渡定位属性 */
        .item .box3 {
            background-color: white;
        }

        .box3 p {
            width: 100px;
            height: 100px;
            background-color: orange;
            position: relative;
            top: 0;
            left: 0;
            transition: left 1s linear 0s;
        }

        .box3:hover p {
            left: 200px;
        }

        /* 测试3：多属性过渡 */
        .box4 {
            width: 100px;
            height: 100px;
            transition: border-radius 1s linear 0s,
            background-color 1s linear 0s;
        }

        .box4:hover {
            border-radius: 50%;
            background-color: green;
        }

        /* 测试4： 2D变形 */
        .box5 {
            width: 100px;
            height: 100px;
            transition: transform 1s linear 0s;
        }

        .box5:hover {
            transform: rotate(360deg);
        }

        /* 测试5： 3D旋转 */
        .item .box6 {
            perspective: 300px;
            width: 102px;
            height: 102px;
            border: 1px solid #000;
            background-color: white;
        }

        .box6 p {
            width: 100px;
            height: 100px;
            background-color: orange;
            transition: transform 1s linear 0s;
        }

        .box6:hover p {
            transform: rotateX(360deg);
        }

        /* 实战1： 渐变提示 */
        .example .box7 {
            width: 280px;
            height: 150px;
            background-color: #ffffff;
            position: relative;
            overflow: hidden;
        }

        .box7 img {
            max-height: 100%;
            max-width: 100%;
        }

        .box7 div {
            position: absolute;
            left: 0;
            bottom: 0;
            color: #ffffff;
            background-color: rgba(0, 0, 0, .5);
            width: 271px;
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
            opacity: 0;
            transition: opacity .5s linear 0s;
        }

        .box7:hover div {
            opacity: 1;
        }


        /* 实战2： 翻页效果 */
        .example .box8 {
            background-color: white;
        }

        .box8 {
            width: 200px;
            height: 200px;
            perspective: 800px;
            position: relative;
        }

        .box8 img {
            width: 200px;
            height: 200px;
            border: 1px solid #000;
            border-radius: 50%;
        }

        .box8 img.dog {
            position: absolute;
            top: 0;
            left: 0;
            transform-origin: 0 0;
            transition: transform 1s ease 0s;
        }

        .box8:hover img.dog {
            transform: rotateY(-180deg);
        }

        /* 实战3： 待补充 */
        .example .box9 {
            background-color: #ffffff;
            font-size: 20px;
        }

    </style>
</head>
<body>
<div class="main">
    <div class="item">
        <h3>测试1：过渡与非过渡效果对比</h3>
        <div style="background-color: red">
            <div class="box1">无过渡属性时</div>
            <div class="box2">有过渡属性时</div>
        </div>
    </div>

    <div class="item">
        <h3>测试2：过渡定位属性</h3>
        <div class="example">
            <div class="box3">
                <p></p>
            </div>
        </div>
    </div>

    <div class="item">
        <h3>测试3：多属性过渡</h3>
        <div class="example">
            <div class="box4"></div>
        </div>
    </div>

    <div class="item">
        <h3>测试4：2D变形</h3>
        <div class="example">
            <div class="box5"></div>
        </div>
    </div>

    <div class="item">
        <h3>测试5：3D旋转</h3>
        <div class="example">
            <div class="box6">
                <p></p>
            </div>
        </div>
    </div>

    <div class="item">
        <h3>实战1：渐变提示</h3>
        <div class="example">
            <div class="box7">
                <img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/eKAPy0nvMuGsUJaT.jpg" alt="">
                <div>鸟巢国家体育场</div>
            </div>
        </div>
    </div>

    <div class="item">
        <h3>实战2：翻页效果</h3>
        <div class="example">
            <div class="box8">
                <img class="cat" src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/SKk151Hi5WDjnbNE.jpg"
                     alt="">
                <img class="dog" src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/ac2eOfdt8KH0AEEU.jpg"
                     alt="">
            </div>
        </div>
    </div>

    <div class="item">
        <h3>实战3：</h3>
        <div class="example">
            <div class="box9">
                等待补充...
            </div>
        </div>
    </div>
</div>
</body>
</html>
```

![](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/%E8%BF%87%E6%B8%A1%E6%95%88%E6%9E%9C.gif)



## 动画

动画是比过渡更加智能、功能更强大的的CSS样式

制作动画分为两步骤

* 定义动画

  ```css
  /* 两帧动画 */
  @keyframes r {  /* @keyframes表示要定义动画，固定写法；r是动画的名字，根据实际情况起名 */
      from {		/* from表示动画起始状态，固定写法 */
          transform: rotate(0deg);	/* css code */
      }
      to {		/* to表示动画结束状态，固定写法 */
          transform: rotate(360deg);	/* css code */
      }
  }
  
  /* 多帧动画 */
  @keyframes r {
      0% {		
          transform: rotate(0deg);
      }
      20% {		
          transform: rotate(60deg);	
      }
  	40% {		
          transform: rotate(120deg);	
      }
  	60% {		
          transform: rotate(180deg);	
      }
  	80% {		
          transform: rotate(240deg);	
      }
  	100% {		
          transform: rotate(360deg);	
      }    
  }
  ```

* 调用动画

  使用`animation`来调用动画，用法与过渡类似

  ```css
  animation: r		1s		linear	 0s                 3                      alternate/forwards
  		  动画名字	动画总时长  缓动曲线  开始时的延迟时间  动画执行次数 (可选值)    偶数次自动逆向执行/动画停止在最后结束状态 (可选值)
  ```

  > 动画执行次数还可以写`infinite`，表示动画一直执行



`demo.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
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

        .main {
            display: flex;
            flex-wrap: wrap;
            padding: 20px;
        }

        .main .item {
            width: 19%;
            display: flex;
            flex-direction: column;
            align-items: center;

            border: 1px solid #999999;
            padding: 20px;
            margin-right: 1%;
            margin-bottom: 20px;
            min-width: 260px;
            min-height: 260px;
            position: relative;
        }

        .main .item h3 {
            width: 100%;
            height: 20%;
            text-align: center;
        }

        .main .item .example {
            width: 100%;
            height: 80%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .item [class*=box] {
            background-color: orange;
            color: #333;
            font-size: 12px;
        }


        /* 测试1： 动画定义与调用 */
        @keyframes demo { /* 定义动画 */
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }

        .box1 {
            width: 120px;
            height: 120px;
            animation: demo 1s linear 0s infinite; /* 调用动画 */
        }

        /* 测试2：左右移动 */
        @keyframes move { /* 定义动画 */
            from {
                transform: translateX(0);
            }
            to {
                transform: translateX(170px);
            }
        }

        .main .item:nth-child(2) .example {
            justify-content: flex-start !important;
            background-color: azure;
        }

        .example .box2 {
            width: 150px;
            height: 150px;
            animation: move 1s linear 0s infinite alternate; /* 调用动画 */
        }

        /* 测试3：多关键帧动画 */
        @keyframes changeColor {
            0% {
                background-color: red;
            }
            20% {
                background-color: green;
            }
            40% {
                background-color: blue;
            }
            60% {
                background-color: yellow;
            }
            80% {
                background-color: black;
            }
            100% {
                background-color: purple;
            }
        }

        .box3 {
            width: 150px;
            height: 150px;
            animation: changeColor 3s linear 0s infinite alternate; /* 调用动画 */
        }

        /* 实战1：发光的灯泡 */
        .item:nth-child(3) { /* 换下一行 */
            margin-right: 38%;
        }

        @keyframes stars {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }

        .example .box4 {
            width: 150px;
            height: 150px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: white;
            position: relative;
        }

        .example .box4 img {
            max-width: 100%;
            max-height: 100%;
        }

        .example .box4 .bulb { /* 灯泡 */
            position: absolute;
        }

        .example .box4 .light { /* 光 */
            position: absolute;
            top: -20px;
            left: 0;
            animation: stars 1s linear 0s infinite alternate;
        }

        /* 实战2：自带主角光环按钮 */
        .example .box5 {
            background-color: white;
        }

        @keyframes btn {
            0% {
                opacity: 0;
                transform: skew(-45deg) translateX(0);
            }
            50% {
                opacity: 1;
                transform: skew(-45deg) translateX(140px);
            }
            100% {
                opacity: 0;
                transform: skew(-45deg) translateX(140px);
            }
        }

        /* 按钮样式 */
        .box5 button {
            display: inline-block;
            width: 120px;
            height: 42px;
            outline: none;
            border-radius: 3px;
            border: 1px solid #2194e0;
            color: #2194e0;
            position: relative;
            overflow: hidden;
        }

        /* 鼠标触碰样式 */
        .box5 button:hover {
            color: #ffffff;
            background-color: #2194e0;
        }

        /* 闪光遮罩 */
        .box5 button:before {
            content: '';
            width: 3em;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background-color: #ffffff;
            opacity: 0;
        }

        /* 闪光遮罩动画 */
        .box5 button:hover:before {
            animation: btn .6s ease-in-out 0s 1 forwards;
        }
    </style>
</head>
<body>
<div class="main">
    <div class="item">
        <h3>测试1：动画定义与调用</h3>
        <div class="example">
            <div class="box1"></div>
        </div>
    </div>

    <div class="item">
        <h3>测试2：左右移动</h3>
        <div class="example">
            <div class="box2"></div>
        </div>
    </div>

    <div class="item">
        <h3>测试3：多关键帧动画</h3>
        <div class="example">
            <div class="box3"></div>
        </div>
    </div>

    <div class="item">
        <h3>实战1：发光的灯泡</h3>
        <div class="example">
            <div class="box4">
                <img class="bulb" src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/dengpao.png" alt="">
                <img class="light" src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/guang.png" alt="">
            </div>
        </div>
    </div>

    <div class="item">
        <h3>实战2：自带主角光环按钮</h3>
        <div class="example">
            <div class="box5">
                <button>自带主角光环按钮</button>
            </div>
        </div>
    </div>
</div>
</body>
</html>
```

![](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/%E5%8A%A8%E7%94%BB%E5%AD%A6%E4%B9%A0.gif)



## 移动端基础



### 像素

| 概念                                                         | 说明                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 分辨率                                                       | 屏幕由一个一个的"点"组成，分辨率代表屏幕宽高各有多少个"点"组成；<br />分辨率指的是物理像素 |
| 物理像素（`physical pixel`）/<br />设备像素（`dp`：`device pixel`） | 硬件真实的像素点，<br />同一块屏幕的物理像素是固定的         |
| `CSS`像素/<br />逻辑像素（logical pixel）/<br />设备独立像素（`dip`：`device independent pixel`） | 实际开发中使用的像素，比如`width: 200px;`<br />              |
| 设备像素比（`dpr `= 设备像素 / `CSS`像素）                   | 如果一个`CSS`像素(长或宽)对应1个设置像素(长或宽)，那就`dpr=1`<br />如果一个`CSS`像素(长或宽)对应2个设置像素(长或宽)，那就`dpr=2`<br />`dpr `= 2 表示一个`CSS`像素用`2x2`个设备像素来绘制，实际上就是4个设备像素 |
| 缩放                                                         | 缩放改变的是`CSS`像素对应物理像素的个数                      |
| `PPI`/ `DPI`                                                 | 每英寸的物理像素点，（宽的平方+高的平方）开根号 / 对角线长度 |



### 视口(`viewport`)

视口的概念是在移动端才提出来的，视口的意思是

> 温馨提示：
>
> 在本章的实验中，调整视口宽度的时候，显示效果经常会有问题，可以从几下几个方面排查：
>
> * 缩放比例是否是100%（也就是不缩放），下图这个值
>
>   ![image-20211114162808016](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211114162808016.png)
>
> * 浏览器本身会有一些缓存或Bug啥的，多刷新、重启几次就好了
>
> * PC端浏览器是否有缩放（`Ctrl+鼠标滚轮`会缩放网页大小，按`Ctrl+小键盘数字0`可以取消缩放）



**测试1：默认的视口宽度**

`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>   
</head>
<body>
</body>
</html>
```

![image-20211114152633423](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211114152633423.png)

我们随便写一个页面，可以没有任何内容，以手机模式查看，可以看到`html`标签占据的宽度为`980px`，这个大小就是<span style="color: red;">默认的视口宽度</span>，

等同于下面这段代码

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!-- viewport代表视口，width=980意思是视口宽度为980px -->
    <meta name="viewport" content="width=980"/>
    <title>Document</title>
</head>
<body>
</body>
</html>
```



**测试2：默认视口下，盒子在移动端会进行缩放**

`demo.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!-- viewport代表视口，width=980意思是视口宽度为980px -->
    <meta name="viewport" content="width=980"/>
    <title>Document</title>
</head>
<body>
<div style="width: 200px; height: 200px; background-color: orange"></div>
</body>
</html>
```



![image-20211114155251727](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211114155251727.png)

可以看到，同一张网页在PC和移动端显示，盒子显示的都是`200 * 200px`，但是大小看起来完全不一样，按照我们的设想，

只要浏览器宽度大于200，不管是400还是2000，那么同一个盒子大小看起来应该都是一样的，为什么会不一样呢？



首先，盒子是`200px`没问题，在PC端和移动端都是一样的大小，这也没问题，但是，

移动端浏览器要在`414px`上完整的显示出视口`980px`的内容（可以理解成这是移动端默认的特性），
所以它给我们缩放了，那么效果就是都是`200px`的盒子，大小不一致



如何让这个盒子看起来大小一样呢？

设置移动端视口为`414px`，让我们改一下视口宽度，再看一下效果

![image-20211114160408824](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211114160408824.png)

> 可以看到，盒子大小是一致的了



**测试3：兼容不同宽度移动端设备**

上面我们代码中手动指定了宽度为`414px`，但是不同的移动端有不同的宽度，如何兼容呢？

视口宽度不要写死，指定为设备宽度就可以了，看代码

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!-- width=device-width指定视口宽度为设备宽度 -->
    <meta name="viewport" content="width=device-width"/>
    <title>Document</title>
</head>
<body>
<div style="width: 200px; height: 200px; background-color: orange"></div>
</body>
</html>
```

![image-20211114162011771](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211114162011771.png)



**测试4：用户可缩放和缩放比**

缩放比

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!-- initial-scale=1.0指定初始化缩放比为1，也就是不缩放，等同于 width=device-width -->
	<!-- 还有另外两个属性，最大缩放比和最小缩放比，maximum-scale=1.0, minimum-scale=1.0 -->
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <title>Document</title>
</head>
<body>
<div style="width: 200px; height: 200px; background-color: orange"></div>
</body>
</html>
```

还有一个参数就是控制是否允许缩放，就是`user-scalable`,值为`yes`或`no`，一般我们设置为`no`，但是部分浏览器会忽略这个属性



**测试5：最终的写法**

为了浏览器兼容性，一般用的时候我们都会把上面几个属性都写上（其实他们实现的都是同一个功能，就是调整视口）

常用的写法就是下面这样

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

</body>
</html>
```

> 注：在`IDE`中（`WebStorm`或`VSCode`），在空白网页输入`!`，并按下`Tab`即可出来上面的代码















