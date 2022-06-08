## 基础

### 变量作用域

```javascript
<script>
    /*
    全局作用域
        在函数外定义的变量
    局部作用域
        在函数内定义的变量
    块级作用域
        在代码块{}内的变量

    定义变量的几种方式
        var
            定义的变量只有全局作用域和局部作用域
            可以重复声明和赋值
        let
            定义的变量支持所有作用域
            不可以重复声明或赋值
        直接定义
            强烈不推荐
        const
            用来定义常量
            定义的变量支持所有作用域
            不可以重复声明或赋值
     */

    // 在以下几个地方推荐使用let
    // ① for循环内
    for (let i = 0; i <= 9; i++) {
        console.log(i);
    }
    // console.log(i);
    // Uncaught ReferenceError: i is not defined

    // ②单独的代码块
    {
        let i = 100;
    }
    // console.log(i);
    // Uncaught ReferenceError: i is not defined

	// ③单独的代码块 const
    {
        const c = 200;
    }
    console.log(c);
</script>
```

### 变量声明提升

```javascript
<script>
    // 直接使用未定义的变量会报错，后面的代码将不会执行
    console.log(a); // Uncaught ReferenceError: a is not defined
</script>

<script>
    // 假若先使用再定义，先看输出结果
    console.log(b); // undefined
    let b = 1;

    // 解释原因
    // 在执行所有代码之前，JavaScript有预解析阶段，这会导致【变量声明提升】，意思是等同于下面的代码
    // var b;
    // console.log(b);
    // b = 1;
    // 所以上面会输出undefined，而不是报错
    // 【变量声明提升】的前提是需要使用var声明全局变量，如果使用let声明，那么会报错 Uncaught ReferenceError: Cannot access 'b' before initialization
</script>
```

### 严格模式

```javascript
<script>
    /*
        使用 "use strict"; 来指定为严格模式
        一般放在文件行首，这不是必须的，还可以单独放到函数内，只对某个函数启用严格模式
     */
    function add() {
        "use strict";
        var x = 100;
        console.log(x)
    }

    x = 100;
    console.log(x);
</script>
```



### 数据类型检测

`JavaScript`的数据类型和`typeof`的检测结果并不是一一对应的，所以对于部分数据类型来说会有专有的检测方法

```javascript
<script>
    var a = 1;
    var b = 'b';
    var c = "c";
    var d = [1, 2, 3];
    var e = {};

    var x;
    var y = undefined;
    var z = null;

    console.log(typeof a);  // number
    console.log(typeof b);  // string
    console.log(typeof c);  // string
    console.log(typeof d);  // object
    console.log(typeof e);  // object

    // 数组比较特殊，需要使用Array.isArray来检测
    console.log(Array.isArray(d));  // true

	// NaN比较特殊，需要使用isNaN或Number.isNaN来检测
    // 全局函数isNaN本质是通过Number将对象转为数字类型，若能转换返回true，不能则返回false，也就是说他本质是【检测是不是数字类型】
    // Number.isNaN本质是：检测是不是Number类型 & 检测值是不是NaN，也就是说他的检测更加严格一些
    console.log(isNaN(NaN));        // true
    console.log(Number.isNaN(NaN)); // true
    console.log(isNaN("中国")); // true
    console.log(Number.isNaN("中国")); // false	

    // 没有值得变量(只声明没赋值 或 显示赋值为undefined)的类型为undefined
    // 注意：null类型为object
    console.log(typeof x);  // undefined
    console.log(typeof y);  // undefined
    console.log(typeof z);  // object

	// 还有一些没有补充，比如布尔值，比如小数是什么类型，等等后面再说
</script>
```

判断能不能转为数字

```javascript
<script>
    function isBecomeNumber(item) {
        // 类型判断
        if (typeof item === "number" || typeof item === "string") {
            // 判断是不是NaN
            if (isNaN(item)) {
                return false;
            }
            return true;
        }
        return false;
    }

    console.log(isBecomeNumber("123"));	// true
    console.log(isBecomeNumber("0.0"));	// true
    console.log(isBecomeNumber("0.1"));	// true
	console.log(isBecomeNumber("2e3"));	// true
    console.log(isBecomeNumber("abc"));
    console.log(isBecomeNumber(NaN));
    console.log(isBecomeNumber(null));
    console.log(isBecomeNumber(undefined));
    console.log(isBecomeNumber({}));
</script>
```

判断输入的是不是数字

```javascript
<script>
    // 输入的肯定是字符串，所以可以不用管 数字类型的NaN这个值了
    // 然后只需要判断一下能不能转成数字就行了
    var n = prompt('请输入一个数字');
    if (!isNaN(n)) {
        // 这里还要转一下，将字符串类型转为数字类型
        n = Number(n);
        console.log("数字: ", n)
    } else {
        console.log("不是数字，", n)
    }
</script>
```





### ①数字类型

* 所有数字不分大小、不分浮整、不分正负都是数字类型
* 小数比如0.5中，0可以省略，可以简写成.5,比如`1 + .2;`、 `typeof .6;`等
* 较大的数字 或 较小的数字`（0.xxxxxxx）`可以写成科学计数法的形式；比如`3e8`就等于 `3 * 10的8次方`；`3e-4`等于`3 * 10的-4次方`，0.0003
* 二进制以`0b`开头；八进制以`0`开头；十六进制以`0x`开头

```javascript
<script>
    <!-- 进制转换 -->
    console.log(017);   // 8进制17转为10进制，就是15
    console.log(0xa);   // 16进制a转为10进制，就是10
    console.log(0xA);   // 16进制A转为10进制，就是10

    // 小数计算精度问题
    // 解决的话，可以使用NumberObject.toFixed(小数位数)来解决
    // toFixed是四舍五入的
    console.log(0.1 + 0.2); // 0.30000000000000004
    console.log((0.1 + 0.2).toFixed(2)); // 0.30
    console.log((0.50 + 0.06).toFixed(1)); // 0.56，四舍五入0.6

    // 特殊数字值NaN
    // NaN意思是 not a number，不是一个数字，但是他是数字类型，
    // 所有不能转为数字类型的都用NaN表示，比如0/0, 3 * undefined
    // 数值NaN的类型为number，检测数据类型时需要使用isNaN
    // 数值NaN还有一个特性，不自等
    console.log(0 / 0);     // NaN
    console.log(3 * undefined); // NaN
    console.log(NaN == NaN); // false
	console.log(typeof NaN); // number

    // 无穷大Infinity和无穷小-Infinity，类型是number    
    console.log(1 / 0);             // Infinity    
    console.log(-1 / 0);            // -Infinity
	console.log(typeof Infinity); 	// number
    console.log(typeof -Infinity); 	// number
</script>
```

### ②字符串

* 使用单引号或双引号都可以
* 使用+可以拼接字符串
* 模板字符串使用反引号，里面可以解析变量，比如`${name}`

```javascript
<script>
    // 模板字符串
    var a = "hello world!"
    var b = "   Hello "

    // length返回字符串长度
    console.log("字符串长度")
    console.log(a.length);

    // 大小写转换
    console.log("字符串大小写转换")
    console.log(a.toUpperCase()); // HELLO WORLD!
    console.log(b.toLowerCase()); //  hello

    // 检索字符串
    // indexOf和lastIndexOf
    //      返回索引下标，未找到字符串则返回-1
    //      如果字符串出现多次，只返回第一次出现的下标
    // includes
    //      判断是否包含子字符串
    //      返回true或false
    //
    // 第二个参数表示从下标N开始，默认为0
    console.log("字符串检索")
    console.log(a.indexOf("o"));            // 4
    console.log(a.lastIndexOf("o"));        // 7
    console.log(a.includes("hello"));       // true
    console.log(a.includes("hello", 1));    // false

    // 清除字符串首尾空白
    //  trim()
    //  trimStart（等同于trimLeft）
    //  trimEnd（等同于trimRight）
    console.log("字符串清除首尾空白")
    console.log(b.trim());      // hello


    // 字符串替换
    console.log("字符串替换")
    console.log(a.replace("o", "O"));       // 只替换一次
    console.log(a.replaceAll("o", "O"));    // 全部替换

    // 字符串分割
    console.log("字符串分割");
    console.log(a.split());     // 如果省略分割符，那么返回 ["hello world!"]
    console.log(a.split(" "));  // 指定为空格，   那么返回 ["hello", "world!"]
    console.log(a.split(""));   // 指定为空字符串，那么返回 ["h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d", "!"]
</script>
```



### ③布尔值

```javascript
<script>
    console.log(true, typeof true); // true "boolean"
    console.log(false, typeof false); // false "boolean"
</script>
```

### ④undefined

* undefined既是类型，也是值，这种类型的值也只有它自己一个
* undefined是值得时候，比如 一个变量已声明未赋值的情况下，变量声明提升情况下

```javascript
<script>
    <!-- 变量只声明未赋值 -->
    var a;
    console.log(a);         // 值为undefined
    console.log(typeof a);  // 类型为undefined

    <!-- 变量声明提升 -->
    console.log(b);
    var b = 10;
</script>
```



### ⑤null

* `null`是一个值，类型为`object`，代表空对象
* 当我们需要将对象销毁、数组销毁、或者删除监听事件时，通常将它们设置为`null`

```javascript
<script>
    var a = Array(3).fill(1);
    console.log(a);     // [1, 1, 1]
    a = null;
    console.log(a);     // null
</script>
```



### 基本数据类型显式转换

```javascript
<script>
    // 转数字
    //①通用转数字
    console.log("基本数据类型转数字：Number")
    console.log(Number(123), typeof Number(123));               // 123 "number"
    console.log(Number('abc'), typeof Number('abc'));           // NaN "number"
    console.log(Number(true), typeof Number(true));             // 1 "number"
    console.log(Number(undefined), typeof Number(undefined));   // NaN "number"
    console.log(Number(null), typeof Number(null));             // 0 "number"，这个需要注意一下，null会转为0

    //②parseInt() 将字符串转为整数，直接截断，不是四舍五入的
    //  字符串必须以数字开头，否则会转为NaN
    console.log("字符串转数字：parseInt")
    console.log(parseInt("3.14"));             // 3
    console.log(parseInt("3.14是圆周率"));      // 3
    console.log(parseInt("圆周率是3.14"));      // NaN
    console.log(parseInt("3.999"));           // 3，不是四舍五入的

    // ③parseFloat() 将字符串转为小数
    // 规则同parseInt()
    console.log("字符串转浮点数：parseFloat")
    console.log(parseFloat("3.1415926"));              // 3.1415926
    console.log(parseFloat("3.1415926是圆周率"));       // 3.1415926
    console.log(parseFloat("圆周率3.1415926"));        // NaN
    console.log(parseFloat("3.999"));                 // 3.999
    // 如果想指定保留几位小数，使用toFixed()，前面代码已经提到过了
    console.log(parseFloat("3.1415926").toFixed(3));  // 3.142
    console.log(parseFloat("3.14").toFixed(3));       // 3.140

    // 转字符串
    //①通用转字符串
    console.log("基本数据类型转字符串：String")
    console.log(String(123), typeof String(123));               // 123 string
    console.log(String(false), typeof String(false));           // false string
    console.log(String(undefined), typeof String(undefined));   // undefined string
    console.log(String(null), typeof String(null));             // null string
    console.log(String(NaN), typeof String(NaN));               // NaN string
    console.log(String(2e3), typeof String(2e3));               // 2000 string，这里是2000，注意一下

    // ②使用.toString()方法
    console.log("对象.toString()方法转为字符串")
    var a = 123;
    console.log(a.toString(), typeof a.toString());             // 变量值是数字的话，直接转 123 string
    console.log((123).toString(), typeof (123).toString());     // 直接写的数字的话，需要使用小括号括起来 123 string

    // 转布尔值
    console.log("基本数据类型转布尔值：Boolean")
    console.log(Boolean("false"));  // true
    console.log(Boolean(" "));      // true
    console.log(Boolean([]));       // true，注意：空列表为true
    console.log(Boolean(0));        // false
    console.log(Boolean(NaN));      // false
    console.log(Boolean(""));       // false
    console.log(Boolean(undefined)); // false
    console.log(Boolean(null));      // false
</script>
```

### 基本数据类型隐式转换

```javascript
<script>
    // +
    // 如果一边有字符串，那么转换另外一边为字符串；
    // 如果一边有数字，那么转换另外一边为数字；
    console.log("+ 运算符转换规则")
    console.log("a" + false);       // afalse
    console.log("a" + undefined);   // aundefined
    console.log("a" + null);        // anull
    console.log("a" + 123);        // a123
    console.log("a" + Infinity);    // aInfinity

    console.log(123 + false);       // 123
    console.log(123 + true);        // 124
    console.log(123 + null);        // 123, null会转为0
    console.log(123 + undefined);    // NaN, undefined会转为NaN

    // - * / %
    // 会将两边不是数字类型的都转为数字类型
    console.log("- * / % 运算符转换规则")
    console.log("123" - "100");     // 23
    console.log("123" * "100");     // 12300
    console.log("123" / "100");     // 1.23
    console.log("123" % "100");     // 23

    console.log("123" - null);      // 123, null会转为0
    console.log("123" - undefined); // NaN, undefined会转为NaN
    console.log("123" - Infinity);  // -Infinity
</script>
```



### 赋值运算符

```javascript
<script>
    var a = 1;
    console.log(a = a + 1); // 2，这个操作输出a+1的值，同时再把a+1的值赋值给a
    console.log(a);         // 2
</script>
```

### 判断表达式

```java
<script>
    // ==  用来判断值是否相等
    // === 用来判断值和类型是否都相等
    var a = undefined;
    var b = null;

    console.log(a === undefined); // true
    console.log(b === null);      // true


    console.log(a == b);     // true
    console.log(a === b);    // false
</script>
```

### 逻辑表达式

```javascript
非   !
与   &
或   ||
 
小技巧：可以用 !!值 来求得值的布尔属性,和Boolean函数效果相同
```



### 空值合并操作符??

`??`和`||`很像，下面对比来说一下

`||`：当左侧为假时返回右侧的值，否则返回左侧的值

`??`：当左侧的值为null 或者 undefined 时返回右侧的值，否则返回左侧的值

```javascript
// 当我们取值的时候很多时候会给一个默认值，这时候他们的差异就很明显了
const config = {
	retry: 0,
};
let retry1 = config.retry || 3;
let retry2 = config.retry ?? 3;
console.log(retry1);	// 3
console.log(retry2);	// 0
```

### 可选链操作符?. 

如果一个对象层次很深，并且属性值是否存在不固定，那么获取起来就很麻烦

使用`?.`可以方便的获取，并且不会报错

```javascript
let user = {};

// console.log(user.address.city);
// 这会报错,因为user.address的值为undefined，此时再取.city属性就会报错，报错信息如下:
// VM128:1 Uncaught TypeError: Cannot read property 'city' of undefined
//    at <anonymous>:1:26

// 使用?.就可以很高效的解决报错的问题
console.log(user?.address?.city);  // undefined
let city = user?.address?.city ?? '未知';
console.log(city); // 未知
```

### void运算符

`void `是运算符，语法：`void expression`，但是一般表达式都写上小括号

`void`对任何值都返回`undefined`

```javascript
<script>
    // void 对任何值都返回undefined
    console.log(void (0));
    console.log(void ("123" + null));

    function click() {
        alert("点击函数");
    }

    console.log(void (click()));

    // 为了防止html中的a标签跳转，一般都会使用void让a标签成为死链接
    var eleA = document.createElement("a")
    eleA.innerText = "百度";
    eleA.href = "javascript:void(0);"
    document.body.appendChild(eleA);
</script>
```



## 复杂数据类型

复杂的数据类型都是引用类型

引用类型使用相等判断的时候，是判断地址是否相同，比如 `alert([] == []); // false`

引用类型：`Array`、`Object`、`Function`、`Regexp`



**数据类型简单对比**

| 数据类型     | 举例                          | 当var a = b变量赋值时                              | 当用==比较时         |
| ------------ | ----------------------------- | -------------------------------------------------- | -------------------- |
| 基本数据类型 | 数字、字符串、布尔、undefined | 内存中产生新的副本，新老副本彼此互不干扰           | 比较值是否相等       |
| 引用数据类型 | 数组、对象                    | 内存中不产生新的副本，而是让新老变量指向同一个对象 | 比较内存地址是否相等 |



### 数组

文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from

### 数组定义

```javascript
<script>
    // 数组定义
    var arr1 = [1, 2, 3, 4, 5];
    // [1, 2, 3, 4, 5]

    var arr2 = new Array(1, 2, 3, 4, 5);
    // [1, 2, 3, 4, 5]

    var arr3 = new Array(5);    // 数组长度为5
    // [empty × 5]，实际上是5个undefined，可以通过.fill(null)来填充数据，null可以换成任意数据

    // Array.from()，数组来自其他数据，浅拷贝
    // 如果指定了第二个参数，新数组中的每个元素会执行该回调函数
    var arr4 = Array.from('foo');   // ['f', 'o', 'o']
    var arr5 = Array.from('foo', x => x.toUpperCase());   // ['f', 'o', 'o']

    // 有趣的例子-序列生成器
    // const range = (start, stop, step) => Array.from({length: (stop - start) / step + 1}, (_, i) => start + (i * step));
    // console.log(range(-5, 2, 1));
    // [-5, -4, -3, -2, -1, 0, 1, 2]
    // 上面例子不太好维护，改写一下
    function range(start, stop, step) {
        arrayLike = {length: (stop - start) / step + 1}
        mapFn = (_, v) => start + (v * step);
        return Array.from(arrayLike, mapFn)
    }

    console.log(range(-5, 2, 1));
    // [-5, -4, -3, -2, -1, 0, 1, 2]
    console.log(range(-5, 2, 2));
    // [-5, -3, -1, 1]

    // 创建数组副本，浅拷贝
    var arr6 = [[1, 2, 3], [4, 5, 6]]
    var arr7 = arr6.slice()
    arr6[0][0] = 100;
    console.log(arr6);
    console.log(arr7);
</script>
```



### 数组使用

```javascript
<script>
    // 数组定义
    var arr = []
    for (let i = 1; i <= 9; i++) {
        arr.push(i)
    }

    // 访问 & 查询
    console.log("数组访问")
    // ① 通过下标访问
    console.log(arr[0]);    // 1
    console.log(arr[8]);    // 9
    console.log(arr[-1]);   // undefined，不支持负索引
    // ②截取数组
    console.log(arr.slice(0, 2));   // [1, 2], 0代表开始下标，2代表结束下标
                                    // 如果两个参数都不写，那么就会截取整个数组

    // ③indexOf() 返回元素在数组中的位置（下标）
    //      如果未找到返回-1；如果找到多个，返回第一个
    console.log(arr);                 // [1, 2, 3, 4, 5, 6, 7, 8, 9]
    console.log(arr.indexOf(1));      // 0
    console.log(arr.indexOf(88));    // -1

    // ④ includes判断数组是否包含某个成员,  第二个参数表示起始位置
    var arr = [3, 4, 5, NaN];
    console.log(arr.includes("3"));     // false
    console.log(arr.includes(3));       // true
    console.log(arr.includes(NaN));     // true
    console.log(arr.includes(3, 1));    // false，第二个参数表示起始位置

    // 增加数据
    console.log("数组增加数据")
    // ①在尾部插入数据
    arr.push(10);           // 就地修改
    console.log(arr);       // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    // ②在头部插入数据
    arr.unshift(0);         // 就地修改
    console.log(arr);       // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    //

    // 删除数据
    console.log("数组删除数据")
    // ①在尾部删除数据
    console.log(arr.pop());     // 10，这个10是被删除的元素
    console.log(arr.pop());     // 9，这个9是被删除的元素
    // ②在头部删除数据
    console.log(arr.shift());   // 0,这个0是被删除的元素
    console.log(arr.shift());   // 1,这个1是被删除的元素

    // 修改数据
    console.log("数组修改数据")
    console.log(arr);    // [2, 3, 4, 5, 6, 7, 8]
    arr[1] = "100"
    arr[10] = 9;        // 数组本来没有索引为10的
    console.log(arr);   // [2, "100", 4, 5, 6, 7, 8, empty × 3, 9], 3个empty，实际上是3个undefined

    // 其他
    // ① 数组和字符串转换
    var s = [1, 2, 3, 4, 5].join();
    console.log(s);         // 1,2,3,4,5；转为字符串，如果第一个参数为空，默认为逗号
    var a = s.split(',');   // 如果参数为空则没有分隔符；如果分隔符为''，那么每个字符都会被单独分割
    console.log(a);         // ["1", "2", "3", "4", "5"]

    // ② 数组反转
    console.log([1, 2, 3, 4, 5].reverse()); // [5, 4, 3, 2, 1]，反转数组，就地修改

    // ③ 数组排序
    // sort需要接受一个函数作为参数，函数返回正数代表需要交换两个数的位置；返回负数表示不需要交换位置
    var arr = [33, 22, 55, 11];
    arr.sort(function (a, b) {
        if (a > b) {
            return 1;
        }
        return -1;
    })
    console.log(arr);   // [11, 22, 33, 55]
    // sort优化
    arr.sort(function (a, b) {
        return a - b;
    })

    // ④ 合并数组
    var a = [1, 2, 3, 4, 5]
    var b = [6, 7, 8, 9, 10]
    var c = a.concat(b);
    console.log(a);     // [1, 2, 3, 4, 5]
    console.log(c);     // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    // ⑤筛选和映射(1) - 返回第一个匹配的值
    // find()      找到满足条件的一个立即返回其值，不改变原数组，未找到返回undefined
    // findIndex() 找到满足条件的一个立即返回其索引，未找到返回undefined
    var arr1 = [3, 4, 5, "Hello"];
    var arr2 = arr1.find((value, index, array) => {
        return value > 3;
    })
    console.log(arr2);      // 4

    // ⑤筛选和映射(2) - 利用会遍历每个元素，可以达到筛选的目的
    var arr1 = [3, 4, 5, "Hello"];
    var arr2 = [];
    arr1.find((value, index, array) => {
        if (value >= 4) {
            arr2.push(value)
        }
    })
    console.log(arr1);
    console.log(arr2);

    // ⑤筛选和映射(3) - 实现其他语言map的功能
    var arr1 = [1, 2, 3];
    var arr2 = [];
    arr1.find((value) => {
        arr2.push(value * 2);
    })
    console.log(arr1);  // [1, 2, 3]
    console.log(arr2);  // [2, 4, 6]

</script>
```

### 数组遍历

```javascript
<script>
    var arr = ["a", "b", "c", 1, 2, 3];

    // ① for循环遍历
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }

    // ② forEach，可以代替上面讲的find
    arr.forEach((value, index, arr) => {
        console.log(value);
    })

    // ③ for..of遍历,内部使用了Iterator机制
    // 默认遍历值
    for (let value of arr) {
        console.log(value);
    }
    // 等同于下面代码，.values也可以不写，默认也是值
    for (let value of arr.values()) {
        console.log(value);
    }
    // 遍历索引的话，使用arr.keys()
    // 遍历索引和值得话，使用arr.entries()
    for (let [key, value] of arr.entries()) {   // 这里也可以用一个值来接受，这个值就是[key, value]
        console.log(key, value);
    }

    // ④for..in遍历，遍历索引
    for (index in arr) {
        console.log(index);
    }
</script>
```

### 数组浅拷贝和深拷贝

浅拷贝：只拷贝数组的第一层，如果是多维数组，或者数组中的值为引用类型，则不拷贝其他层

深拷贝：拷贝数组所有层，使用递归遍历数组



克隆代码不适用于对象

```javascript
<script>
    var a1 = [1, 2, 3, 4, 5];

    // 直接将引用类型赋值一个新变量，不会产生克隆
    console.log("直接赋值，不产生克隆")
    var a2 = a1;
    console.log(a1);
    console.log(a2);

    // 浅克隆
    console.log("遍历数组，浅拷贝")
    var ret = [];
    for (i = 0; i < a1.length; i++) {
        ret.push(a1[i])
    }
    ret.push(888);
    console.log(a1);
    console.log(ret);

    // 深克隆
    function clone(src) {
        var dst = []
        for (var i = 0; i < src.length; i++) {
            if (Array.isArray(src[i])) {
                dst.push(clone(src[i]))
            } else {
                dst.push(src[i])
            }
        }
        return dst
    }

    // src
    var arr = [
        {name: "abc"},
        [1, 2],
        [3, 4],
        9,
        100,
    ]

    // 深克隆
    ret = clone(arr)
    arr[0].name = "def";
    console.log(ret);
</script>
```



### 类数组对象

所有键名为自然序列（从0开始），且有`length`属性的对象

`arguments`



`NodeList`和`HTMLCollection`

```javascript
<body>
<div>
    <p name="p1">1</p>
    <p name="p2" id="p2">2</p>
    <p name="p3">3</p>
</div>
<script>
    // NodeList，类数组对象，是文档节点的集合
    var p1 = document.querySelectorAll('p');
    console.log(p1);    // NodeList(3) [p, p, p]

    // HTMLCollection,类数组对象，是HTML元素的集合
    var p2 = document.getElementsByTagName("p");
    console.log(p2);     // HTMLCollection(3) [p, p, p]


    // ①说他们是类数组对象，是因为没有push()、pop()等方法
    // console.log(p1.pop());  // p1.pop is not a function
    // console.log(p2.pop());  // p2.pop is not a function

    // ②说他们是类数组对象，是因为(1)都可以通过下标访问 (2)都有length方法
    console.log(p1[0], typeof p1[0]);
    console.log(p2[0], typeof p2[0]);
    console.log(p1[0] === p2[0]);       // true

    console.log(p1.length);     // 3
    console.log(p2.length);     // 3

    // 那么他们有什么不同？
    // ① 方法上的不同
    //  NodeList只能通过索引获取,
    //  HTMLCollection可以通过name、id、索引来获取子元素
    console.log(p2.namedItem("p2"));    // 通过name获取，获取不到返回null
    console.log(p2.p2);                 // 通过Id获取，获取不到返回undefined

    // ② 可包含的节点类型不同
    // 节点类型   说明
    //  1        元素节点
    //  2        属性节点
    //  3        文本节点
    // NodeList可以包含任何节点类型，
    // HTMLCollection只包含元素节点（ElementNode）
    console.log(p1.childNodes);
    // 这个不知道咋测试.

    // ③都是动态的（例外：querySelectorAll）
    // 这个需要补充
</script>
</body>
```



### 集合

```javascript
<script>
    // 定义一个set：无序、成员不能重复的集合
    var set = new Set();
    console.log(set);   // Set(0) {}
 
    console.log(new Set([1, 2, 1]));  // Set(2) {1, 2},还支持 arguments、NodeList、字符串、Set作为参数传入
 
    // 添加成员
    set.add(1);
    set.add(2);
    set.add("Hello");
    set.add(1);              // 重复添加不会报错
    set.add(1).add("Hello"); // 可以写成这种链式添加
    console.log(set);        // Set(2) {1, "Hello"}
 
    // 删除成员
    set.delete("Hello");    // 删除成员
    set.delete(99999);     // 删除不存在的成员，也不会报错
    // set.clear()             // 全部清空
 
    // 判断是否含有某个成员
    console.log(set.has(1));    // true
    console.log(set.has(111));  // false
 
    /* 遍历 - forEach
             函数原型：forEach(回调函数(value, key), 回调中的this指向)
             注意事项：forEach是按照成员添加进集合的顺序遍历的
     */
    set.forEach(function (value, key) {
        // set中，key == value
        console.log(value);
    })
 
    // 成员个数(这个是属性，不是方法)
    console.log(set.size);      // 2
 
    // 应用 - 转为数组
    console.log([...set]);     // [1, 2]
     
    /*
        重复值判断依据
            Set对重复值的判断遵循严格相等(===)，但是NaN比较特殊，在Set中NaN等于NaN
        什么时候使用Set
            1.数组去重
            2.不需要通过下标访问，只需要遍历
     */
</script>
```



### Map

```javascript
<script>
    // 定义一个Map
    const m = new Map();
    const m1 = new Map([["name", "Serry"], ["age", 21]]);    // 必须传二维数组,二维Set等
    console.log(m1);
 
    // 添加数据
    m.set("name", "bob").set("age", 20);
    console.log(m);     // {"name" => "bob", "age" => 20}，如果有重复键，会覆盖值
 
 
    // 获取成员
    console.log(m.get("name"));     //  bob
    console.log(m.get("name1"));    //  undefined，该键不存在
    console.log(m.has("abc"))       //  false, 判断键是否存在于Map中
 
 
    // 删除数据
    m.delete("age");                // 删除k-v
    m.delete("age");                // 删除不存在的k-v，也不会报错
    // m.clear()                       // 全部删除
 
    /* 遍历 - forEach
             函数原型：forEach(回调函数(value, key), 回调中的this指向)
             注意事项：forEach是按照成员添加进映射的顺序遍历的
     */
    m.set("name", "bob").set("age", 20);
    m.forEach(function (value, key) {
        console.log(key, value);
    })
 
    // 映射长度（这个是属性，不是方法）
    console.log(m.size);
     
    /*
        判断成员是否重复原理
            和Set类似，遵循key严格相等（===），但是NaN例外
 
     */
</script>
```



### Iterator

### Iterator概念

```javascript
// 定义Iterator
const arr = [1, 2];                 // 定义数组
const it = arr[Symbol.iterator]();  // 定义数组的Iterator
console.log(it);                    // Array Iterator {}
 
// 使用Iterator
console.log(it.next());             // {value: 1, done: false}
console.log(it.next());             // {value: 2, done: false}
console.log(it.next());             // {value: undefined, done: true}
 
/*
    解惑
        （1）为什么需要Iterator?
            提供统一的遍历方式
        （2）如何更方便使用Iterator?
            自己使用：Symbol.iterator -> it -> next()
            一般我们不直接使用上面方式，而是使用由Iterator封装好的方式，比如for..of遍历方式
 */
```



### Iterator for..of遍历

```javascript
<script>
    const arr = [1, 2];                 // 定义数组
 
    // for...of循环 - 内部使用了Iterator机制
    for (let item of arr) {
        console.log(item);      // 1 2
    }
 
    // for..of遍历数组索引
    for (let index of arr.keys()) {
        console.log(index);
    }
 
    // for..of遍历数组值
    for (let v of arr.values()) {   // .values也可以不写，默认也是值
        console.log(v);
    }
 
    // for..of遍历数组索引和值
    for (let item of arr.entries()) {
        console.log(item);          // 返回一个数组[index, value]
    }
    // 优化
    for (let [key, value] of arr.entries()) {
        console.log(key, value)
    }
</script>
```



```javascript
<script>
    /*
        什么是可遍历?
            只要有Symbol.iterator方法，并且这个方法可以生成可遍历对象，就是可遍历的，比如数组
            只要可遍历，就可以使用for..of来遍历
 
        什么是可遍历对象？
            待补充
            有next()方法，返回 {value: xx, done: boolean}
 
        原生可遍历对象？
            数组
            字符串
            Set
            Map
            arguments
            NodeList
 
        非原生可遍历对象？
            一般的对象
            有length属性和索引属性的对象
 
     */
 
    // 给一般对象增加可遍历方法
    // 需要自己手写Symbol.iterator方法
 
    // 给有length属性和索引属性的对象增加可遍历方法
    obj = {
        0: "Bob",
        1: "男",
        length: 2
    }
    obj[Symbol.iterator] = Array.prototype[Symbol.iterator];    // 给普通对象添加Symbol.iterator，这是一种偷懒的做法
    for (item of obj) {
        console.log(item);
    }
 
 
    // 将对象转为数组形式遍历
    var obj1 = {name: "Bob", age: 22};
    for (const item of Object.entries(obj1)) {
        console.log(item);
    }
    /*
        ["name", "Bob"]
        ["age", 22]
     */
</script>
```



## 流程控制

### if

```javascript
<script>
    var n = Number(prompt('请输入一个数字'));
 
    if (isNaN(n)) {
        alert("请输入一个数字!")
    } else if (n % 2 == 0) {
        alert("偶数");
    } else {
        alert("奇数");
    }
</script>
 
扩展：
    单行if语句
        if (2>1) alert("2>1");
```

### switch

```javascript
<script>
    var n = Number(prompt("请输入一个数字"))
 
    switch (n) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
            alert("小于等于10");
            break
        case 11:
            alert("等于11");
            break
        default:
            alert("未知数字");
    }
</script>
```

### 三元运算符

```javascript
<script>
    var age = 24;
    var type = age > 18 ? "成年人" : "未成年人"
    alert(type);
</script>
```

### for循环

```javascript
<script>
    var n = 1;
    while (n < 10) {
        console.log(n);
        n++;
    }
</script>
```

### while

```javascript
<script>
    var n = 1;
    while (n < 10) {
        console.log(n);
        n++;
    }
</script>
```

### do-while

```javascript
<script>
    // 先执行循环体，然后测试条件是否满足；至少会执行一次循环体
 
    var i = 0;
    do {
        i++
    } while (i < 10);
 
    alert(i);   // 10
</script>
```

### **辅助语句**

continue

break



## 函数

### 定义和调用

```javascript
<script>
    // 普通定义
    function add(x, y) {
        return x + y;
    }
 
    // 匿名函数
    var fun = function(x, y) {
        return x + y;
    }
 
    console.log(add(1, 2));
    console.log(fun(2, 3));
</script>
```

### 函数变量声明提升

- 使用普通定义的函数可以声明提升，函数可以正常调用；使用匿名定义的函数不能函数提升，会引发错误；
- 函数变量声明提升，优先于变量声明提升

```javascript
<script>
    fun();  // 输出B，函数声明提升优先于变量声明提升

    // 定义匿名函数 fun
    var fun = () => {
        console.log("A");
    }

    // 定义普通函数 fun
    function fun() {
        console.log("B");
    }

    fun();  // 输出A，函数fun提升上去以后，又被匿名函数覆盖，所以输出A

</script>
```

### 函数参数

#### 默认参数

```javascript
<script>
    /*
        函数参数默认值
        只有不传参数或明确传undefined的时候，默认值才会生效
     */
    function add(x, y = 100) {
        console.log(y);
        return x + y;
    }

    console.log(add(1));    // 101
    console.log(add(1, undefined));    // 101
    console.log(add(1, null));    // 数据类型隐式转换，null会转为0，所以结果是1
</script>
```

#### 形参和实参

```javascript
<script>
    function add(x, y) {
        console.log(typeof x);
        console.log(typeof y);
        return x + y;
    }
 
    alert(add(1, 2));       // 3
    alert(add(1, 2, 3));    // 3, 第三个参数将丢弃
    alert(add(1));          // NaN，第二个参数内部为undefined
</script>
```

#### 剩余参数

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Rest_parameters

```javascript
<script>
    /*
        ...变量 表示剩余参数，变量在函数内部为数组
     */

    function add(...items) {
        console.log(typeof items);  // object
        console.log(Array.isArray(items)); // true
        let sum = 0;
        for (let i = 0; i < items.length; i++) {
            sum += items[i]
        }
        return sum;
    }

    console.log(add(1, 2, 3));  // 6
    console.log(add(100, 200, 315)); // 615
</script>
```



#### arguments参数

```javascript
<script>
    /*
        arguments
            函数内arguments代表函数接收到的实参列表，是一个类数组对象
        类数组对象
            可以使用下标访问对象的某个属性，有length属性，但是没有数组的方法
     */

    function add() {
        let sum = 0;
        for (let i = 0; i < arguments.length; i++) {
            sum += arguments[i]
        }
        return sum;
    }

    console.log(add(1, 2, 3));	// 6
    console.log(add(1, 2, 3, 4, 5, 6, 7, 8, 9)); // 45
</script>
```

### `IIFE`（立即调用函数表达式）

文档：https://developer.mozilla.org/zh-CN/docs/Glossary/IIFE

```javascript
<script>
    /*
        IIFE
            IIFE是一种特殊的JavaScript函数写法，函数一旦定义，立即执行
        IIFE的作用总结
            见代码示例
     */

    // 先定义一个普通函数，执行函数需要调用hello1()
    function hello1() {
        var test = 1;
        console.log("Hello JavaScript!")
    }

    // 将它改为IIFE立即执行写法(函数外边包一层括号，然后再函数调用)
    (function hello2() {
        console.log("Hello python!")
    })()


    /* 作用1：为变量赋值 */
    var age = 12;
    var sex = "男";
    const tag = (function () {
        if (age < 18) {
            return '小朋友';
        } else if (sex === "男") {
            return '先生';
        } else if (sex === "女") {
            return '女士';
        }
    })()
    console.log(tag);
    // 除了这种方式 利用函数直接为变量赋值，我想不到其他方式了
    // 和Python的property装饰器作用有些类似

    /* 作用2：将全局变量改为局部变量 */
    // 先来看一个题目
    var arr = [];
    for (var i = 0; i < 5; i++) {
        arr.push(function () {
            alert(i);
        })
    }
    arr[3]();   // 应该输出多少?

    // 解决办法1：将for循环中的var改为let，原理是：将i由全局变量修改为块级作用域变量
    // 解决办法2：使用IIFE
    var arr2 = [];
    for (var j = 0; j < 5; j++) {
        (function (j) {
            arr2.push(function () {
                alert(j);
            })
        })(j)
    }
    arr2[3]();   // 3
</script>
```



### 箭头函数

```javascript
<script>
    // 定义箭头函数
    const add = (x, y) => {
        return x + y;
    }
    console.log(add(1, 2));
 
 
    // 注意事项
    // (1) 单个参数【可以】省略圆括号；无参数或多个参数【不可以】省略圆括号
    const add2 = x => {
        return x + 1;
    }
    console.log(add2(3));
 
    // (2) 单行函数体可以省略{}和return语句，注意{}和return要么不去，要么同时去掉；多行函数体不可以省略{}和return
    const add3 = x => x + 1;
    console.log(add3(4));
 
    // (3) 如果箭头函数返回单行对象，可以在{}外边加上()，让浏览器不再认为那是函数的{}
    const add4 = (x, y) => {
        return {
            value: x + y
        };
    }
    console.log(add4(1, 2));
    // 优化一下
    const add5 = (x, y) => ({
        value: x + y
    })
    console.log(add5(1, 2));
 
 
    // (4)箭头函数没有arguments，可以使用剩余参数代替
</script>
```

### 箭头函数this指向

```javascript
<script>
    // "use strict";
 
    // 箭头函数没有自己的this
    const obj = {
        add: () => {
            console.log(this);
        }
    }
    obj.add();
 
    /*
        分析：
            (1) add是一个箭头函数，所以add本身没有this
            (2) 本身没有，会向外找，obj是一个对象，没有自己的作用域，所以会找到全局的this
            (3) 全局this是window，所以最后输出是window对象
     */
 
 
    const obj1 = {
        add: function () {
            const addr = () => {
                console.log(this);
            };
            addr();
        }
    };
 
    obj1.add();
    /*
        分析：
            add是个函数，定义了一个箭头函数addr,然后在调用addr函数
            addr是箭头函数，没有自己的this，会向外找，找到function中的this，
            function也就是add,add通过obj1调用，所以这个this就是obj1
     */ 
</script>
```



## 面向对象基础

### 对象定义

```javascript
<script>
    /*
        1、person是一个对象，对象使用{}来表示
        2、name对象的属性, "bob"是他的值，age也一样
        3、每个键值对之间使用逗号分割，最后一个键值对可以不写逗号
        4、属性可以加引号，也可以不加引号，区别是：
            如果属性符合JS标识符命名规范可以不加引号，反之要加引号

        5、属性值可以是一个函数，这成为对象的方法，通过 对象.方法() 来调用
        6、属性名和值一样的情况下，可以只写一个
     */
    var person = {
        name: "bob",
        age: 18,
        "favorite-books": ["西游记", "红楼梦", "三国演义"],
        say: function () {
            return "hello";
        }
    }
    console.log(person);
    console.log(person.say());


    const a = "1";
    const b = {a};  // 等同于 const b = {a: a}，这是一种简写形式
    console.log(b); // {a: "1"}
</script>
```

### 对象访问和删除

```javascript
<script>
    /*
        属性访问
            1、可以使用 对象.属性 访问属性值
            2、也可以使用 对象['属性'] 来访问，注意[]内是一个字符串
            3、还可以使用 对象[属性变量] 来访问，换句话说，当要使用属性变量去访问对象属性时，必须使用[]

        属性删除
            属性删除使用 delete 对象属性值

     */
    var person = {
        name: "bob",
        age: 18,
        "favorite-books": ["西游记", "红楼梦", "三国演义"]
    }

    console.log('我的名字是', person.name);
    console.log('我今年', person['age'], '岁了');

    const v = "favorite-books"; // 定义一个变量
    console.log('我喜欢看的书包括：', person[v]);

    delete person.name;
    console.log(person.name);   // 属性不存在不会报错，返回undefined
</script>
```

### 对象遍历

```javascript
<script>
    // for..in遍历, item为属性
    var obj1 = {name: "Bob", age: 22};
    for (const item in obj1) {
        console.log(item, obj1[item]);
    }
    /*
        name Bob
        age 22
     */

    // for..of遍历-1， item为键值对
    var obj2 = {name: "Bob", age: 22};
    for (const item of Object.entries(obj2)) {
        console.log(item);
    }
    /*
        ["name", "Bob"]
        ["age", 22]
     */

    // for..of遍历-2，解构item
    var obj3 = {name: "Bob", age: 22};
    for (const [k, v] of Object.entries(obj2)) {
        console.log(k, v);
    }
    /*
        name Bob
        age 22
     */
</script>
```

### 对象深克隆

```javascript
<script>
    var user = {
        name: "bob",
        age: 22,
        addr: {
            "provinces": "河北",
            "city": "保定",
            "county": "XX县"
        }
    }

    // obj1指向user对象，没有克隆
    obj1 = user

    // 浅克隆：仅克隆第一层结构
    var obj2 = {}
    for (var k in user) {
        obj2[k] = user[k]
    }

    // 深克隆
    function deepclone(o) {
        // 数组
        if (Array.isArray(o)) {
            var ret = [];
            for (var i = 0; i <= o.length; i++) {
                ret.push(deepclone(o[i]))
            }
            // 对象
        } else if (typeof o == "object") {
            var ret = {};
            for (var i in o) {
                ret[i] = deepclone(o[i])
            }
            // 基本类型值
        } else {
            var ret = o;
        }
        return ret;
    }

    obj3 = deepclone(user);
    user.addr.city = "石家庄"
    console.log(obj3);
</script>
```

> 当然，还有一种简单的方式
>
> ```javascript
> <script>
>     var user = {
>         name: "bob",
>         age: 22,
>         addr: {
>             "provinces": "河北",
>             "city": "保定",
>             "county": "XX县"
>         }
>     }
> 
>     // 先转为json，在解析为对象，从而实现深克隆
>     obj4 = JSON.parse(JSON.stringify(user));
>     user.addr.city = "石家庄"
>     console.log(obj4);
> </script>
> ```

### 常用方法

```javascript
<script>
    // Object.assign() 合并对象
    var obj1 = {name: "Bob", age: 21, sex: "男"};
    var obj2 = {name: "Serry", nickname: "se", sex: "女"};


    console.log(Object.assign({}, obj1, obj2));  // 将obj1和obj2合并到新对象中{}，并返回
    console.log({...obj1, ...obj2});             // 使用展开运算符合并，返回新对象，结果：{name: "Serry", age: 21, sex: "女", nickname: "se"}
    console.log(obj1);
    console.log(obj2);

    console.log(Object.assign(obj1, obj2));      // 这会修改obj1的值，结果：{name: "Serry", age: 21, sex: "女", nickname: "se"}


    // Objects.keys()、Objects.values()、Objects.entries() - k、v、k和v，以数组返回
    var obj1 = {name: "Bob", age: 21, sex: "男"};
    console.log(Object.keys(obj1));     //  ["name", "age", "sex"]
    console.log(Object.values(obj1));   //  ["Bob", 21, "男"]
    console.log(Object.entries(obj1));  //  [Array(2), Array(2), Array(2)]
</script>
```

### 构造函数（重要★★★）

* 用`new`调用一个函数，这个函数就被称为构造函数，一个函数是不是构造函数，要看这个函数是不是使用`new`来调用
* 构造函数必须使用`new`来调用，正因为如此，<span style="color: red;">开发者约定构造函数首字母使用大写</span>

```javascript
<script>
    function People(name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }

    zhagnsan = new People("张三", 20, "男");

    console.log(zhagnsan);      // People {name: "张三", age: 20, sex: "男"}
    console.log(zhagnsan.name); // 张三
    console.log(typeof zhagnsan);   // object
</script>
```

>但从上面来说，构造函数具体有啥用还看不出来，没关系，看下面函数原型

### 函数原型（重要★★★）

课外资料：https://blog.csdn.net/m0_37846579/article/details/80278092



#### **普通函数原型**

* 任何函数都有`prototype`属性，`prototype`翻译过来是【原型】的意思
* `prototype`属性值是个对象，它默认拥有`constructor`属性，`constructor`属性指向函数本身

```javascript
<script>
    function add(x, y) {
        return x + y;
    }

    console.log(add.prototype);         // {constructor: ƒ}
    console.log(add.prototype.constructor === add); // true
    console.log(add.prototype.constructor(1, 9)); // 10
</script>
```

总结一下就是：<span style="color: red;">`function.prototype.constructor`   === `function`</span>



#### **构造函数原型**

* 普通函数的`prototype`属性没有啥作用，而构造函数的`prototype`属性非常有用
* <span style="color: red;">构造函数的`prototype`就等于其实例的`__proto__`属性，就是其实例的原型</span>

```javascript
<script>
    function People(name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }

    // 构造函数的prototype就等于其实例的__proto__属性，就是其实例的原型
    const ming = new People("小明", 18, "男");
    console.log(People.prototype === ming.__proto__);   // true    
</script>
```

总结：<span style="color: red;">`function.prototype` === `(new function).__proto__` === `instance.__proto__`</span>



#### **原型链查找**

* <span style="color: red;">实例可以通过打点访问他的原型的属性和方法，这成为原型链查找</span>

```javascript
<script>
    function People(name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.say = function () {
            console.log("hello world!");
        }
    }

    // 实例化
    const ming = new People("小明", 18, "男");

    // 构造函数添加方法
    People.prototype.eat = function () {
        console.log("eat apple")
    }

    /* 实例执行其原型方法 */
    ming.__proto__.eat();   // eat apple

    /*
        hasOwnProperty 检查对象自己是否"真正"拥有某个属性或方法, 不包含继承来的属性（不检查原型上的属性或方法）
        重点：
            （1）检查的是对象，比如{"a":1}这种，如果检查一个函数，函数内部定义的变量是不会被检查到的
            （2）不包含继承来的属性（不检查原型上的属性或方法）
    */
    console.log('hasOwnProperty检查对象: ')
    const obj = {'host': '0.0.0.0'};
    obj.port = 8080;
    console.log(obj.hasOwnProperty('host'));        // true
    console.log(obj.hasOwnProperty('port'));        // true
    console.log(obj.hasOwnProperty('toString'));    // false, toString是继承自Object的


    /*
        hasOwnProperty 检查构造函数和实例
     */
    console.log('hasOwnProperty 构造函数和实例: ')
    console.log(People.hasOwnProperty("sex"))                           // false，这是函数内部的变量，是检查不到的
    console.log(People.prototype.hasOwnProperty('sex'))                 // false，这是函数内部的变量，是检查不到的
    console.log(People.prototype.constructor.hasOwnProperty('sex'))     // false，这是函数内部的变量，是检查不到的
    console.log(People.hasOwnProperty("prototype"))                     // true
    console.log(People.prototype.hasOwnProperty('constructor'))         // true

    console.log(ming.hasOwnProperty("age"))                             // true，函数内部的变量(this.xx)，可以在实例上检查到
    console.log(ming.hasOwnProperty("sex"))                             // true，函数内部的变量(this.xx)，可以在实例上检查到
    console.log(ming.hasOwnProperty("say"))                             // true，函数内部的变量(this.xx)，可以在实例上检查到
    console.log(ming.hasOwnProperty("__proto__"))                       // false,继承来的
    console.log(ming.__proto__.hasOwnProperty("constructor"))           // true, constructor是原型自己的属性
</script>
```



#### **定义原型方法**

方法若直接定义在`构造函数`上，会造成每个实例的方法都是内存中的不同的函数，造成内存浪费，解决办法就是：

<span style="color: red;">将方法定义在构造函数的prototype属性上</span>

```javascript
<script>
    // 定义构造函数
    function People(name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }

    // 方法要写在prototype属性上，节省内存
    People.prototype.say = function () {
        console.log("hello world!");
    }
</script>
```



**原型链的终点**

<img src="https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20210909085736088.png" alt="image-20210909085736088" style="zoom:50%;" /><img src="https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20210909090127954.png" alt="image-20210909090127954" style="zoom:50%;" />



#### **通过原型链实现继承**

<img src="https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20210909090717358.png" alt="image-20210909090717358" style="zoom:50%;" />

```javascript
<script>
    // 父类
    function People(name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }

    People.prototype.sayhello = function () {
        console.log("你好，我是" + this.name + ", 我今年" + this.age + "岁了, 我是" + this.sex + "生");
    };

    People.prototype.sleep = function () {
        console.log("你好，我是" + this.name + ", 我正在睡觉zzzzzzzzzz....");
    };


    // 子类
    function Student(name, age, sex, school, studentNumber) {
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.school = school;
        this.studentNumber = studentNumber;
    }

    // 子类继承自父类（放到子类方法之前）
    Student.prototype = new People();


    Student.prototype.study = function () {
        console.log(this.name + "正在学习...")
    }

    Student.prototype.exam = function () {
        console.log(this.name + "正在考试...")
    }

    var xiaoming = new Student("小明", 12, "男", "第一中学", 01);
    xiaoming.study();
    xiaoming.sayhello();    // 正确输出，说明继承已经实现了（Student类可以调用People类的方法）
</script>
```

> `Student.prototype = People.prototype`也可以啊，有什么区别吗？
>
> xxx



#### 包装类

* Number()、String()和Boolean()分别是数字、字符串、布尔值的"包装类"
* 包装类的目的是为了让<span style="color: red;">基本类型值</span>可以从它的<span style="color: red;">构造函数的`prototype`属性</span>上获取方法

```javascript
<script>
    /* 包装类的目的是为了让基本类型值可以从它的构造函数的`prototype`属性上获取方法 */
    const a = 123456789;
    console.log(a.__proto__ === Number.prototype);  // true
    console.log(a.toString === a.__proto__.toString) // true
    console.log(a.toString === Number.prototype.toString) // true
    console.log(a.__proto__.toString === Number.prototype.toString) // true


    // 下面这个为什么是false呢?
    // 因为a的toString方法是从a.__proto__继承来的，是从Number.prototype继承来的
    // 而Number的toString方法是从Number.__proto__继承来的，Number的原型暂时还不知道是谁
    // 两个虽然都是toString方法，但是内存地址不一样，所以会是false
    console.log(a.toString === Number.toString);                    // false

    console.log(Number.toString === Number.__proto__.toString)      // true
    console.log(Number.__proto__.toString === Object.prototype.toString)   // false，说明Number的原型不是Object?
</script>
```



### 常用对象

#### Math

```javascript
<script>
    /* Math对象 */
    console.log(Math.pow(2, 3));    // 2的3次方，8
    console.log(Math.sqrt(16));        // 开方，4
    console.log(Math.ceil(5.0));        // 向上取整, 5
    console.log(Math.ceil(5.2));        // 向上取整, 6
    console.log(Math.ceil(5.9));        // 向上取整, 6
    console.log(Math.floor(7.2));       // 向下取整，7
    console.log(Math.floor(7.9));       // 向下取整，7

    console.log(Math.round(8.4999999)); // 四舍五入，8
    console.log(Math.round(8.5));       // 四舍五入，9
    console.log(Math.round(9.12456 * 100) / 100);  // 四舍五入到指定小数位，1位系数为10，2位系数为100,3位系数为1000，以此类推

    console.log(Math.max(3, 5, 10.2, 10));   // 获取参数中最大的值。 10.2
    console.log(Math.min(3, 5, 10.2, 10));   // 获取参数中最小的值。 3

    console.log(Math.random());     // 获取0-1之间的随机数，0.13571048972199007
    // 为了求得[a, b]之间的随机数(包含a和b)，可以使用这个公式：a + parseInt(Math.random() * (b - a + 1))
    console.log(90 + parseInt(Math.random() * (100 - 90 + 1)));
</script>
```



#### Date

**获取指定时间**

```javascript
<script>
    // 不加参数，默认获取当前时间
    const now = new Date();
    console.log(now);
    console.log(typeof now);    // object

    // (1) 获取指定时间，月份默认从0开始算，所以下面这个是11月
    const d1 = new Date(2021, 10, 1);
    console.log(d1);    // Mon Nov 01 2021 00:00:00 GMT+0800 (中国标准时间) => 11月1号0点

    // (2) 获取指定时间，下面两种输出结果是不一样的
    const d2 = new Date('2021-10-1');
    const d3 = new Date('2021-10-01');
    console.log(d2);    // Fri Oct 01 2021 00:00:00 GMT+0800 (中国标准时间) => 10月1号0点
    console.log(d3);    // Fri Oct 01 2021 08:00:00 GMT+0800 (中国标准时间) => 10月1号8点

    // 下面这个也一样
    const d4 = new Date('2021-9-01');
    const d5 = new Date('2021-09-01');
    console.log(d4);    // Wed Sep 01 2021 00:00:00 GMT+0800 (中国标准时间) =>  9月1号0点
    console.log(d5);    // Wed Sep 01 2021 08:00:00 GMT+0800 (中国标准时间) =>  9月1号8点

    // (3) 获取指定时间，加上时间，行为保持统一
    const d6 = new Date('2021-10-1  00:00:00');   // Fri Oct 01 2021 00:00:00 GMT+0800 (中国标准时间) => 10月1号0点
    const d7 = new Date('2021-10-01 00:00:00');   // Fri Oct 01 2021 00:00:00 GMT+0800 (中国标准时间) => 10月1号0点
    console.log(d6);    // Fri Oct 01 2021 00:00:00 GMT+0800 (中国标准时间) => 10月1号0点
    console.log(d7);    // Fri Oct 01 2021 08:00:00 GMT+0800 (中国标准时间) => 10月1号8点

    // (4) 获取指定时间，如果字符串中携带了时区信息，会自动转为本地时区
    const d8 = new Date('2021-10-1  00:00:00 UTC');
    console.log(d8);    // Fri Oct 01 2021 08:00:00 GMT+0800 (中国标准时间) => UTC/GMT(0时区)转为东八区(+0800) == 10月1号8点
</script>
```

**时间对象常见方法**

```javascript
<script>
    // 不加参数，默认获取当前时间
    const now = new Date();
    console.log(now);
    console.log(typeof now);    // object

    // 获取本地时间
    console.log(now.getFullYear() + '年'); // 得到四位数年份
    console.log(now.getMonth() + '月');    // 得到月份0-11
    console.log(now.getDate() + '号');     // 得到日期，1-31
    console.log(now.getDay());      // 得到星期 0-6
    console.log(now.getHours() + '点');    // 得到小时0-23
    console.log(now.getMinutes() + '分');  // 得到分钟0-59
    console.log(now.getSeconds() + '秒');  // 得到秒数0-59

    // 获取0时区时间-UTC时间，年月日时分秒方法都有，就不一一写了
    console.log(now.getUTCHours());
</script>
```

**时间戳**

```javascript
<script>
    /*
        时间戳表示1970年1月1日零点距离某时刻的毫秒数，他只是一个数字，在不同的国家（有不同的时区）展示的时间是不一样的，
        所以说时间戳是跟时区无关的
     */

    // 获取指定时间
    const d = new Date("2021-10-01 00:00:00");
    console.log(d); // Fri Oct 01 2021 00:00:00 GMT+0800 (中国标准时间)

    // （1）时间对象 => 时间戳，返回毫秒级时间戳
    console.log(d.getTime());          // 1633017600000
    console.log(typeof d.getTime());   // number

    // （2）字符串时间对象 => 时间戳，返回毫秒级时间戳，但是精度只有到秒，毫秒固定为000，拿当前时间试一下即可试出来
    console.log(Date.parse(d.toString()));

    // 时间戳 => 时间对象
    const d2 = new Date(1633017600000);           // 数字类型时间戳
    const d3 = new Date(parseInt('1633017600000'));  // 不支持传字符串类型的时间戳
    console.log(d2);    // Fri Oct 01 2021 00:00:00 GMT+0800 (中国标准时间)
    console.log(d3);    // Fri Oct 01 2021 00:00:00 GMT+0800 (中国标准时间)
</script>
```

**示例**

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>2021年高考倒计时</h1>
<h2 id="info"></h2>

<script>
    setInterval(function () {
        const now = new Date();
        const target = new Date(2021, 5, 7);

        // 毫秒差
        const diff = target - now;

        // 换算为多少天，毫秒差 / 一天总计毫秒
        const days = parseInt(diff / (1000 * 60 * 60 * 24));

        // 不足一天的时间间隔，换算为多少小时；不足一天毫秒差 / 1小时毫秒总计
        const hours = parseInt(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));

        // 不足一小时的时间间隔，换算为多少分钟
        const minutes = parseInt(diff % (1000 * 60 * 60) / (1000 * 60));

        // 不足一分钟的时间间隔，换算为多少秒
        const seconds = parseInt(diff % (1000 * 60) / 1000);

        const info = document.getElementById("info");
        info.innerText = days + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";
    }, 1000)
</script>

</body>
</html>
```





#### JSON

```javascript
<script>
    // 将JSON格式字符串解析为JS的对象;如果是不合法字符串会报错
    console.log(JSON.parse('{"abc":"def"}'));           // {abc: "def"}

    // 将JS的对象解析为JSON字符串
    console.log(JSON.stringify({                        // {"name":"Bob","age":20}
        name: "Bob",
        age: 20
    }))
</script>
```

> 这里有一个很实用的小技巧，将对象转为JSON，再解析为对象，可以实现对象深拷贝的效果



### 上下文this指向

#### 规则1：对象打点调用他的方法，则这个方法的上下文是这个打点的对象

```javascript
<script>
    /* 练习一 */
    const obj1 = {
        a: 1,
        b: 2,
        getTotal: function () {
            console.log(this.a + this.b);
        }
    }

    const obj2 = {
        a: 3,
        b: 4,
        getTotal: obj1.getTotal
    }

    // 对象打点调用，输出3
    obj1.getTotal();

    // 对象打点调用，输出7，注意不是输出3
    obj2.getTotal();

    /* 练习二 */
    function outer() {
        var a = 11;
        var b = 22;
        return {
            a: 33,
            b: 44,
            getTotal: function () {
                console.log(this.a + this.b);
            }
        }
    }

    // 77
    outer().getTotal();


    /* 练习三 */
    function fun() {
        console.log(this.a + this.b);
    }

    var obj3 = {
        a: 10,
        b: 20,
        c: [{
            a: 30,
            b: 40,
            c: fun
        }]
    }
    // 70
    var a = 5;
    obj3.c[0].c();
</script>
```



#### 规则2：数组（类数组对象）枚举出函数进行调用，上下文是这个数组（类数组）对象

```javascript
<script>
    // 开启严格模式
    "use strict";

    function fun() {
        arguments[3]();
    }

    // 输出 2
    fun(1, 2, 3, function () {
        console.log(this[1]);
    })

    /*
        解释：
            arguments是一个类数组对象，代表是意思的 函数中所有的实参"数组"
            this指向的其实是arguments对象，所以会输出2
    */
</script>
```



#### 规则3：函数直接调用，则函数的上下文是window对象

```javascript
<script>
    // 开启严格模式
    "use strict";

    function fun() {
        return this.a + this.b;
    }

    var a = 1;
    var b = 2;
    var obj = {
        a: 3,
        b: fun(),
        fun: fun,
    }


    // 开启严格模式情况下，直接调用函数，eg: 函数()，函数中的this指向undefined，关闭严格后，this指向window
    // 所以：
    //      未开启严格模式下，此代码运行正常，返回结果是：3 + (1+2) = 6
    //      开启严格模式下，由于直接调用函数 fun()，函数中this指向undefined，所以代码会报错
    var result = obj.fun();
    console.log(result);


    /* 优化1：
        问：如何让以上代码在严格模式下也能运行呢？
        答：将严格模式下的this指向window就好了呀，将fun函数替换为以下这个就能解决
    */

    // function fun() {
    //     try {
    //         return this.a + this.b;
    //     } catch (e) {
    //         return window.a + window.b;
    //     }
    // }

    /* 优化2：
        问：上面的解决方法可以实现，但是还有没有更优雅的解决方案呢？
        答：使用 函数.call指定上下文，在不侵入函数代码的情况下修改this指向,关于call后面会讲到

        将代码恢复成最初始的模样, 重写obj对象：
        var obj = {
            a: 3,
            b: fun.call(window),
            fun: fun,
        }
    */
</script>
```



#### 规则4：IIFE（立即调用函数表达式）中的函数，上下文是window

```javascript
<script>
    // 开启严格模式
    "use strict";

    var a = 1;
    var obj = {
        a: 2,
        fun: (function () {
            var a = this.a;
            return function () {
                console.log(a + this.a);
            }
        })()
    }

    obj.fun();

    /*
         首先，这段代码运行是会报错的，原因是开启了严格模式后，全局的this会指向undefined，而不是window对象，
         而代码中IIFE中需要用到指向window对象的this=
         var a = this.a; 在严格模式下，this为undefined，所以会报错

        解决报错的方法也很简单，使用call指定上下文即可：
        fun: (function () {
            var a = this.a;
            return function () {
                console.log(a + this.a);
            }
        }).call(window)


        结果解析:
            obj.fun = function () {
                    console.log(a + this.a);    ---> a的值是1，this.a的值是2
                }
    */
</script>
```



#### 规则5：定时器、延迟器调用函数，上下文是window对象

```javascript
<script>
    // 开启严格模式
    "use strict";

    var obj = {
        a: 1,
        b: 2,
        fun: function () {
            console.log(this.a + this.b);
        }
    }
    var a = 3;
    var b = 4;
    setTimeout(obj.fun, 2000);

    /*
        输出结果7

        注意看这里 obj.fun，这里有打点，但是没有调用，和之前讲的对象打点调用规则并不冲突
    */
</script>
```



#### 规则6：事件处理函数的上下文是绑定事件的DOM元素

```javascript
<body>
<button id="btn">点击</button>
<script>
    // 开启严格模式
    "use strict";

    const btn = document.getElementById("btn");
    btn.onclick = function () {
        console.log(this);  // <button id="btn">点击</button>
    }
</script>
</body>
```



#### call和apply都可以指定函数上下文

```javascript
<script>
    function sum() {
        console.log(this.chinese + this.math + this.english);
        console.log(arguments);
    }

    var xiaoming = {
        chinese: 80,
        math: 90,
        english: 100,
    }

    // call和apply都可以指定上下文
    sum.call(xiaoming);
    sum.apply(xiaoming);

    // 如果函数本身需要传递参数，那么写在call或apply的第二个参数
    // call或apply区别在于，传递参数的方式不同：
    sum.call(xiaoming, 1, 2, 3);        // call要用逗号罗列参数
    sum.apply(xiaoming, [1, 2, 3]);     // apply要把参数写在数组中
</script>
```



#### new操作符中的上下文规则

在构造函数中，我们已经学过了`new`操作符，这里详细说一下`new`操作符和`this`的关联



**使用`new`操作符调用函数会进行"四步走"**

1. 函数体内会自动创建出一个空白对象
2. 函数的上下文this会指向这个对象
3. 函数体内的语句执行
4. 函数会自动返回上下文对象，即使函数没有`return`语句



**"四步走"演示**

```javascript
<script>
    function Fun() {
        this.a = 3;
        this.b = 5;
    }

    var obj = new Fun();
    console.log(obj);           // {a: 3, b: 5}
    console.log(typeof obj);    // object
</script>
```



### 类（class）

类和构造函数很像，但是更加面向对象，使用更加友好



#### 基本用法

```javascript
<script>
class Person {      // (1) 类名后面没有()
    constructor(name, age) {    // (3) 实例化类时会调用此方法
        this.name = name;
        this.age = age;
    }

    // 定义类方法，各实例拥有的该方法相等，占用同一份内存
    speak() {
        console.log(`hello, i'm ${this.name}`);
    }
}   // (2) }后面也不需要加;


const zs = new Person("张三", 18);
const ls = new Person("李四", 20);

console.log(zs.speak === ls.speak); // true
zs.speak();     // hello, i'm 张三
ls.speak();     // hello, i'm 李四
</script>
```

> 也可以使用另一种写法，`const Person = class {};`，但是并不推荐



#### 实例属性

```javascript
<script>
class Person {
    // 这种写法就等同于 constructor中写this.name = "1";
    // 注意这里没有使用let、const，也没有使用this
    name = '1';
    age = 0;

    // constructor(name, age) {
    //     this.name = name;
    //     this.age = age;
    // }

	// 这个方法并没有在实例上，而是在类的原型上
    getName = () => {
        return this.name;
    }
}

const zs = new Person("张三", 18);
console.log(zs.getName());  // 1

</script>
```

#### 静态属性和静态方法

```javascript
<script>
class Person {
    // 使用static关键字定义的方法就是静态方法
    // 静态方法中的this指向类本身，而不是实例
    static getName = () => {
        return "Bob"
    }

    // 静态属性如果下面这样写的话，会有兼容性问题，解决办法是：
    // 可以改成方法的形式，或在类外面Person.version = "1.0"
    // static name = "Bob";
}

const zs = new Person("张三", 18);
console.log(zs.getName());  // Bob
</script>
```

#### 私有属性和方法

一般情况下定义的属性和方法都是公开的

私有属性和方法，就是说只能在类里面使用，在类外面不能使用；

`JavaScript`目前并没有私有属性和方法的语法，但是根据公共的规范，

一般以_开头的属性或方法，我们称为私有属性或方法



#### 类的继承

```javascript
<script>
// 定义一个父类
class Person {
    constructor(name, sex, age) {
        this.name = name;
        this.sex = sex;
        this.age = age;
    }

    speak() {
        return `Hello, i'm ${this.name}`
    }
}

// 定义一个子类，继承自Person
class Programmer extends Person {
    constructor(name, sex, age) {
        // super作为函数调用，代表父类的构造方法，只能用在子类的constructor方法中
        // 调用父类的constructor； super前面不能有this操作，语法限制
        super(name, sex, age);
    }

    // super作为对象使用，代表父类的原型，也就是Person.prototype
    // 所以定义在父类实例上的方法或属性，是无法通过super调用的
    // 通过super调用父类方法时，方法内部的this指向当前子类实例    
    speak() {
        console.log("i'm child class")
        return super.speak();
    }
    
    // super用在静态方法中，指向的父类，而不是父类的原型
    // 使用super的时候必须显示指定super作为何种类型使用，所以console.log(super); 这样会报错
}

const zs = new Programmer("张三", "男", "32");
console.log(zs.name);   // 张三
console.log(zs.sex);    // 男
console.log(zs.age);    // 32
console.log(zs.speak());    // Hello, i'm 张三
</script>
```



### 模块（`Module`）

每个模块有自己的独立作用域，避免命名冲突

* 只要在`JS`文件中使用了`import`或`export`，就需要在HTML中的script标签上加`type=module`
* 被导入的模块都会执行一遍，也仅执行一遍
* 没有导出也可以被导入

> 模块学习时需要有一个服务器环境





**导入和导出**

```javascript
<script type="module">
    /*
        说明
            模块没有导出，也可以导入，且多次导入同一文件仅执行一次
        注意
            script标签需添加 type="module"
 
        t1.js内容：
            console.log("t1.js被执行了");
            var   t1JSTest = "test";
     */
 
    // 测试
    import "./js/t1.js";    // 导入成功，执行里面所有的代码，输出 t1.js被执行了
    // console.log(t1JSTest);  // 报错了，t1JSTest is not defined
 
</script>
 
<script type="module">
    /*
        注意
            script标签需添加 type="module"
 
        方式1：
            导出：export default 对象
            导入：import 别名 from 模块;
            说明：
                一个模块只能有一个export default
                可以导出变量、数组、对象、(匿名)函数、(匿名)类等
 
            t2.js内容：
                const cm = 9.857;
                export default age;
 
        方式2：
            基本用法
                导出语法 ：export 声明或语句
                导出示例1：export const age = 18;
                导出示例2：
                        const age = 18;
                        export {age};
 
                导入语法：import {导出对象} from 模块;
                导入示例：import {age} from './js/t3.js'
 
                t3.js内容：
                    const age = 18;
                    export {age};
 
            批量导出导入
                导出
                    const age = 18;
                    const name = "Bob";
                    export {age, name};
                导入
                    import {age, name} from 模块;
 
            导出导入起别名
                导出
                    ...代码省略
                    export {age as Age, name as Name};
                导入
                    import {Age as age, Name as name} from 模块;
 
            整体导出导入
                导出（不变）
                    ...代码省略
                    export {age as Age, name as Name};
                导入
                    import * as obj from 模块;
 
            同时导入
                在一条语句中，即导入export default的东西，又导入export {x1,x2}的东西
                语法：
                    import name,{age, sex} from 模块
                注意事项：
                    导入时，一定是export default导出东西在前面，比如上面的import name
    */
 
    // 方式一测试
    import myCM from './js/t2.js';     // 成功导入，导入时的名字无所谓
    console.log(myCM);                  // 9.857
 
    // 方式二测试 - 基本用法
    import {age} from './js/t3.js';
 
    console.log(age);
 
    // 整体导入
    import * as obj from './js/t4.js';
 
    console.log(obj.age); 
</script>
```



**注意事项**

```javascript
<script type="module">
    /*
        模块顶层的this指向
            使用普通的script src引入，this指向window对象，比如 <script src="./js/t4.js">，闭合标签这里不写了，知道就行
            使用模块导入的方式，顶层this指向undefined
 
        import关键字 和 import()函数
            （1）这俩不是一个东西
            （2）import关键字具有提升效果，会提升到整个代码的头部，率先执行；export也一样
            （3）import()函数可以支持让我们按需导入，没有提升效果
 
        导入导出复合写法
            t5.js
                const t5 = "t5 moudle";
                export {t5};
            t6.js
                export {t5} from "./t5.js";     // 复合写法
 
            复合写法等同于
                import {t5} from './t5.js';
                export {t5};
            总结：
                复合写法中无法使用t5这个对象
                不推荐使用复合写法，理解起来比较复杂
                复合写法的场景：
                    多个文件合并，给使用者提供统一接口
     */
    // 导入导出复合写法测试
    import {t5} from "./js/t6.js";
 
    console.log(t5);    // t5 moudle
</script>
```





## 正则表达式

### 第一个例子

```javascript
<script>
    // 创建正则表达式
    var re1 = /^\d{6}$/;                  // 方法1（推荐使用这种）
    var re2 = new RegExp("^\\d{6}$");     // 方法2（斜杠需要转义）
 
    // 检测正则表达式的类型是object
    console.log(typeof re1);
    console.log(typeof re2);
 
    // 测试正则表达式
    var d = "123456";
    console.log(re1.test(d));   // true
    console.log(re2.test(d));   // true
</script>
```



### 元字符

| 元字符 | 含义                                   |
| ------ | -------------------------------------- |
| \d     | 匹配一个数字                           |
| \D     | 匹配一个非数字字符                     |
| \w     | 匹配一个单字字符（字母、数字、下划线） |
| \W     | 匹配一个非单字字符                     |
| \s     | 匹配一个空白字符（空格、TAB、换行符）  |
| .      | 任意一个字符                           |
| ^      | 匹配开头                               |
| $      | 匹配结尾                               |

> 如果使用`new RegExp`写法，反斜杠需要多写一个，即
>
> `/^\d$/`和`new RegExp('^\\d$')`是一样的意思



### 方括号表示法

使用方括号，比如`[xyz]`，可以 创建一个字符集合，表示匹配方括号中的任意字符

可以使用短横线-来指定一个范围，还可以使用^表示否定

| 元字符 | 等价的方括号表示法 |
| ------ | ------------------ |
| \d     | [0-9]              |
| \D     | [^0-9]             |
| \w     | [a-zA-Z0-9]        |
| \w     | [^a-zA-Z0-9]       |



### 量词

| 量词  | 含义                                             |
| ----- | ------------------------------------------------ |
| *     | 匹配前一个表达式0次或多次，等价于{0,}            |
| +     | 匹配前一个表达式1次或多次，等价于{1,}            |
| {n}   | 匹配前一个表达式n次（n为正整数）                 |
| {n,}  | 匹配前一个表达式至少n次（n为正整数）             |
| {n,m} | 匹配前一个表达式至少n次，至多m次（n、m为正整数） |



### 修饰符

| 修饰符 | 含义         |
| ------ | ------------ |
| i      | 不区分大小写 |
| g      | 全局搜索     |

> 修饰符使用方法：
>
> `var re = /\w/gi;`
>
> `var re = new RegExp('\\w', 'gi')`



### 正则表达式对象方法

| 方法   | 含义                                               |
| ------ | -------------------------------------------------- |
| test() | 测试字符串是否匹配正则表达式，返回布尔值           |
| exec() | 根据正则表达式，在字符串中查找，返回结果数组或null |

举例

```javascript
<script>
    const str = 'abc123def456';
    const regexp = /\d+/g;

    var ret;
    while (ret = regexp.exec(str)) {
        console.log(ret);
    }
    // ['123', index: 3, input: 'abc123def456', groups: undefined]
    // ['456', index: 9, input: 'abc123def456', groups: undefined]
</script>
```



### 字符串对象方法

| 方法      | 含义                                                     |
| --------- | -------------------------------------------------------- |
| search()  | 返回首次匹配到的位置索引，匹配不到返回-1                 |
| match()   | 返回一个数组，匹配不到返回null                           |
| replace() | 使用一个新的字符串替换匹配到的字符串，可以使用正则表达式 |
| split()   | 分割字符串为数组，可以使用正则表达式                     |



## DOM

### Dom概念

Dom（Document Object Model，文档对象模型）是JavaScript操作HTML文档的接口

Dom会将HTML文档表现为节点树

![image-20211009163551954](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211009163551954.png)



### 节点类型

| nodeType值 | 节点类型说明                   |
| ---------- | ------------------------------ |
| 1          | 元素节点，比如`<div>`、`<p>`等 |
| 3          | 文字节点                       |
| 8          | 注释节点                       |
| 9          | document节点                   |
| 10         | DTD节点                        |



### document对象

document对象表示整个HTML文档，它是DOM节点树的根

document对象访问元素节点常用方法

| 方法                                | 说明                                                       |
| ----------------------------------- | ---------------------------------------------------------- |
| `document.getElementById()`         | 通过ID得到元素                                             |
| `document.getElementsByTagName()`   | 通过标签得到元素                                           |
| `document.getElementsByClassName()` | 通过类名得到元素                                           |
| `document.querySelector()`          | 通过选择器得到元素。如果有多个元素符合条件，只能得到第一个 |
| `document.querySelectorAll()`       | 通过选择器得到元素数组                                     |

> 注意：
>
> （1）操作DOM时，通常JS代码写到HTML节点后面，否则JS无法找到响应的HTML节点
>
> （2）如果非要先写JS，在写HTML，那么通常将JS代码写到`window.onload`中，表示HTML节点渲染完成后，再执行onload函数



**示例1**

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document测试</title>
    <script>
        // 给window添加onload事件监听，onload表示页面已经加载完毕
        window.onload = function () {
            const box = document.getElementById('box');
            console.log(box);
        }
    </script>
</head>
<body>
<div id="box">
    <p>牛奶</p>
    <p>咖啡</p>
    <p>果汁</p>
</div>
</body>
</html>
```

**示例2**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<ul class="ul">
    <li class="li" id="li"></li>
    <li class="li"></li>
    <li class="li"></li>
</ul>

<script>
    // 通过ID获取：元素节点
    const li1 = document.getElementById("li");
    console.log(li1); // <li class="li" id="li"></li>

    // 通过标签名获取：HTML集合
    const li2 = document.getElementsByTagName("li");
    console.log(li2);   // HTMLCollection(3) [li#li.li, li.li, li.li, li: li#li.li]

    // 通过类名获取：HTML集合
    const li3 = document.getElementsByClassName("li");
    console.log(li3);   // HTMLCollection(3) [li#li.li, li.li, li.li, li: li#li.li]

    // 通过选择器获取：NodeList
    const li4 = document.querySelectorAll(".li");
    console.log(li4);   // NodeList(3) [li#li.li, li.li, li.li]

    /*
        扩展：
            (1)NodeList并不是数组，而是类数组
            (2)可以使用Array.from(NodeList/HTMLCollection)转为数组
     */
</script>
</body>
</html>
```



### 节点关系

![image-20211009180225277](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211009180225277.png)

| 关系           | 考虑所有节点      | 只考虑元素节点           |
| -------------- | ----------------- | ------------------------ |
| 子节点         | `cihldNodes`      | `children`               |
| 父节点         | `parentNode`      | 同                       |
| 第一个子节点   | `firstChild`      | `firstElementChild`      |
| 最后一个子节点 | `lastChild`       | `lastElementChild`       |
| 前一个兄弟节点 | `previousSibling` | `previousElementSibling` |
| 后一个兄弟节点 | `nextSibling`     | `nextElementSibling`     |



### 改变节点中的内容

* `innerHTML`属性能以HTML语法设置节点中的内容
* `innerText`属性只能以纯文本方式设置节点中的内容

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document测试</title>
    <script>
        // 给window添加onload事件监听，onload表示页面已经加载完毕
        window.onload = function () {
            var box = document.getElementById('box1');

            // box.innerHTML = '河北省';
            box.children[0].innerText = "奶茶";
        }
    </script>
</head>
<body>
<div id="box1">
    <p>牛奶</p>
    <p>咖啡</p>
    <p>果汁</p>
</div>
</body>
</html>
```

### 改变节点样式

改变元素节点的CSS样式需要使用这样的语句：

```javascript
oBox.style.backgroundColor = 'red';			      // css属性要写成"驼峰"形式
oBox.style.backgroundImage = 'url(mages/1.jpg)'; // css属性值要设置成完整形式
oBox.style.fontSize = '32px';                    // 注意单位
```



### 改变HTML属性

* 标准W3C属性，如src、href等，只需要直接打点进行更改即可

  ```javascript
  oImg.src = 'images/2.jpg'
  ```

* 不符合W3C标准的属性，要使用`setAttribute()`和`getAttribute()`来设置和读取

  ```javascript
  oBox.setAttribute('data-n', 10);	 // 设置
  var n = oBox.getAttribute('data-n'); // 读取
  console.log(n);
  ```

看一个示例

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title> innerHTML </title>
    <style>
        .box1 {
            background-color: orange;
        }

        .box2 {
            width: 200px;
            height: 200px;
        }

        .box3 {
            border: 1px solid #abc;
        }

        .box4 {
            width: 200px;
            height: 200px;
            background-color: #666666;
        }
    </style>

    <script>
        // 给节点追加className
        function addClassName(element, value) {
            if (!element.className) {
                element.className = value;
            } else {
                element.className = element.className + " " + value;
            }
        }

        window.onload = function () {
            /* 通过className批量设置属性，需要先定义好CSS属性，然后修改元素className即可 */
            var box = document.getElementById("box");
            box.className = "box4"

            /* 但是有一个缺点，这会覆盖对象的所有className，如果想要追加，可以自己实现函数*/
            addClassName(box, "box4");
        }

    </script>
</head>
<body>
<div id="box" class="box1 box2 box3">
</div>
</body>
</html>
```



### 节点创建和挂载

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="main1" style="display: flex"></div>
<script>
    // 获取父节点
    const main = document.getElementById("main1");

    /*
        创建节点

        1.document.createElement用于创建一个指定tag name的HTML元素
        2.新创建出来的节点是孤儿节点，这意味着它还没有挂载到DOM上，所以我们在页面上无法找到它
    */

    const divNode1 = document.createElement('div');
    divNode1.style.width = '200px';
    divNode1.style.height = '200px';
    divNode1.style.backgroundColor = 'red';

    /*
        挂载节点

        1.任何已经在DOM树上的节点，都可以调用 document.appendChild(孤儿节点)方法，
          让指定的故而节点挂载到自己内部，成为自己内部的最后一个子节点，从而在页面上可以找到它

        2.同理，还有 document.insertBefore(孤儿节点，标杆节点);  // 将孤儿节点插入在标杆节点之前
    */

    // 挂载在DOM上，这时候应该出现一个 红色的正方形
    main.appendChild(divNode1);


    // 新创建一个节点，并挂载上去
    const divNode2 = document.createElement('div');
    divNode2.style.width = '200px';
    divNode2.style.height = '200px';
    divNode2.style.backgroundColor = 'green';
    main.insertBefore(divNode2, divNode1); // DOM结构：divNode2在divNode1之前

    /*
    挂载节点-优化

    虽然提供了document.insertBefore(孤儿节点，标杆节点)，
    但是没有提供insertAfter（Webstorm有语法提示，有.d.ts文件定义，但是并没有实现），
    这时候可以自己手写一个，利用insertBefore
    */
    function insertAfter(newElement, targetElement) {
        var parent = targetElement.parentNode;
        if (targetElement === parent.lastChild) {
            //如果最后节点是目标元素，则直接添加，因为默认是在最后添加。
            parent.appendChild(newElement);
        } else {
            //否则就插入到目标元素下一个兄弟节点的前面。
            parent.insertBefore(newElement, targetElement.nextSibling);
        }
    }


    // 新创建一个节点
    const divNode3 = document.createElement('div');
    divNode3.style.width = '200px';
    divNode3.style.height = '200px';
    divNode3.style.backgroundColor = 'orange';
    insertAfter(divNode3, divNode1);    // 将divNode3挂载在divNode1后面
</script>
</body>
</html>
```

![image-20211012111427036](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211012111427036.png)



### 节点移动

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .circle {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            text-align: center;
            line-height: 200px;
        }

        .red {
            background-color: red;
        }

        .green {
            background-color: yellowgreen;
        }

        .blue {
            background-color: deepskyblue;
        }

    </style>
</head>
<body>
<div id="main" style="display: flex">
    <div id="red" class="circle red">1</div>
    <div id="green" class="circle green">2</div>
    <div id="blue" class="circle blue">3</div>
</div>
<script>
    // 获取父节点
    const main = document.getElementById("main");

    /*
        移动节点

        移动节点和挂载节点用的是一样的函数，都是这两个：
            父节点.appendChild(已挂载的节点(这个会移动))
            父节点.insertBefore(已挂载的节点(这个会移动)，已挂载的节点)，
        不同的是：

        1、挂载的时候要求这里是一个孤儿节点，而移动时要求是一个已经挂载的节点，会移动这个节点到新的父节点下

        移动的本质：一个节点不能同时挂载在DOM树上的两个位置，将一个已存在的节点挂载到别的地方去，就实现了移动

        下面就移动来看一下，移动之前，上面3个圆依次按：红、绿、蓝排序，我们将按照蓝、红、绿排序，试一下
    */

    // 获取3个节点
    const nodeRed = document.getElementById('red');
    const nodeGreen = document.getElementById('green');
    const nodeBlue = document.getElementById('blue');

    // 将绿移动到最后，这时候应该是红、蓝、绿
    main.appendChild(nodeGreen);

    // 将红、蓝 改为 蓝、红
    main.insertBefore(nodeBlue, nodeRed);
</script>
</body>
</html>
```

![image-20211012113816953](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211012113816953.png)

### 节点删除和克隆

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .circle {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            text-align: center;
            line-height: 200px;
        }

        .red {
            background-color: red;
        }

        .green {
            background-color: yellowgreen;
        }

        .blue {
            background-color: deepskyblue;
        }

    </style>
</head>
<body>
<div id="main" style="display: flex">
    <div id="red" class="circle red">1</div>
    <div id="green" class="circle green">2</div>
    <div id="blue" class="circle blue">3</div>
</div>
<script>
    // 获取父节点
    const main = document.getElementById("main");

    /*
        删除节点
            节点不能主动自我删除，必须由父节点来删除，语法：父节点.removeChild(子节点)
        克隆节点
            节点.cloneNode()可以克隆节点，克隆出来的节点是孤儿节点
            节点.cloneNode(true) 深度克隆节点，克隆出来的节点是孤儿节点
    */

    // 获取3个节点
    const nodeRed = document.getElementById('red');
    const nodeGreen = document.getElementById('green');
    const nodeBlue = document.getElementById('blue');

    // 克隆第二个节点，并修改内容
    const nodeGreen2 = nodeGreen.cloneNode();
    nodeGreen2.innerText = "我是从2克隆来的"

    // 删除第二个节点
    main.removeChild(nodeGreen);

    // 挂载克隆节点
    main.insertBefore(nodeGreen2, nodeBlue);
</script>
</body>
</html>
```

![image-20211012114547365](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211012114547365.png)



### 事件监听

* 什么是事件?

事件我们可以理解为，用户与网页的交互动作，比如鼠标点击某个元素、鼠标移动到某个元素上、按下键盘某个按键等

* 什么是事件监听?

让计算机监听某个事件，然后执行我们的代码，设置事件监听主要有两种方法

`onxxx`和`.addEventListener()`，二者的区别在 **事件传播** 中介绍



#### 常见的鼠标事件监听

| 事件名         | 事件描述                                                     |
| -------------- | ------------------------------------------------------------ |
| `onclick`      | 当鼠标单击某个对象                                           |
| `ondblclick`   | 当鼠标双击某个对象                                           |
| `onmousedown`  | 当某个鼠标按键在某个对象上被按下                             |
| `onmouseup`    | 当某个鼠标按键在某个对象上被松开                             |
| `onmousemove`  | 当某个鼠标按键在某个对象上被移动                             |
| `onmouseenter` | 当鼠标进入某个对象（相似事件：`onmouseover`，二者的区别在 **事件传播** 中介绍） |
| `onmouseleave` | 当鼠标离开某个对象（相似事件：`onmouseout`，二者的区别在 **事件传播** 中介绍） |
| `onmousewheel` | 鼠标滚轮事件                                                 |

回调函数接收一个`MouseEvent `对象，参考文档：https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent

示例代码-1

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .circle {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            text-align: center;
            line-height: 200px;
        }

        .red {
            background-color: red;
        }

        .green {
            background-color: yellowgreen;
        }

        .blue {
            background-color: deepskyblue;
        }

    </style>
</head>
<body>
<div id="main" style="display: flex">
    <div id="red" class="circle red">1</div>
</div>
<script>
    // 获取红色节点
    const nodeRed = document.getElementById('red');

    // 某个按键被按下事件
    nodeRed.addEventListener('mousedown', function (e) {
        console.log('被按下', e.target);
    })

    // 某个按键被松开事件
    // 注意如果在别的地方按下了按键但是没松开，放到这个元素上松开，事件也是会触发的
    nodeRed.addEventListener('mouseup', function (e) {
        console.log('被松开', e.target);
    })

    // 左键点击事件：先触发按下事件，再触发松开事件，然后再触发点击事件
    nodeRed.addEventListener('click', function (e) {
        console.log('被点击', e.target);
    })

    // 左键双击事件: 先触发两次点击事件，然后触发双击事件
    nodeRed.addEventListener('dblclick', function (e) {
        console.log('被双击', e.target);
    })

    // 鼠标进入事件
    nodeRed.addEventListener('mouseenter', function (e) {
        console.log('鼠标进入事件', e.target);
    })

    // 鼠标离开事件
    nodeRed.addEventListener('mouseleave', function (e) {
        console.log('鼠标离开事件', e.target);
    })
</script>
</body>
</html>
```

示例代码-2

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>鼠标滚轮事件</title>
    <style>
        #box {
            width: 200px;
            height: 200px;
            background-color: lightgreen;
        }

        body {
            height: 2000px;
        }
    </style>
</head>
<body>
<div id="box"></div>
<h1 id="info"></h1>
<script>
    /*
        鼠标滚轮事件：当鼠标在盒子中向下滚动时，数字+1，反之-1
        鼠标滚轮事件是onmousewheel, 它的事件对象e提供deltaY属性表示鼠标滚动方向，向下滚动返回正值，反之返回负值
     */
    window.onload = function () {
        const box = document.getElementById("box");
        const info = document.getElementById("info");

        let a = 0;

        box.onmousewheel = function (e) {
            e.preventDefault();     // 阻止默认事件
            // if (e.deltaY > 0) { // 向下滚动
            //     a++;
            // } else {
            //     a--;            // 向下滚动
            // }
            e.deltaY > 0 ? a++ : a--
            info.innerText = a;
        }
    }
</script>
</body>
</html>
```



#### 常见的键盘事件监听

| 事件名       | 事件描述                                                     |
| ------------ | ------------------------------------------------------------ |
| `onkeypress` | 当某个按键被按下（系统按键如箭头键和功能键等无法识别）       |
| `onkeydown`  | 当某个按键被按下（系统按键可以识别，并且优先于`onkeypress`） |
| `onkeyup`    | 当某个按键被松开                                             |

回调函数接收一个`KeyboardEvent `对象，参考文档：https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent

示例代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .circle {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            text-align: center;
            line-height: 200px;
        }

        .red {
            background-color: red;
        }

        .green {
            background-color: yellowgreen;
        }

        .blue {
            background-color: deepskyblue;
        }

    </style>
</head>
<body>
<div id="main" style="display: flex">
    <div id="red" class="circle red">1</div>
</div>
<script>
    // 获取红色节点
    const nodeRed = document.getElementById('red');

    // 不推荐使用的API
    /*
        很多在还在用 KeyboardEvent.keycode属性，但是已经不推荐使用了，应该使用KeyboardEvent.key来代替
        参考文档：https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/keyCode
    */


    // KeyboardEvent.code介绍
    /*
        文档：https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/code

        以下是一些测试结果：
            Code: 键盘按键被按下:  KeyA        --> 字母a
            Code: 键盘按键被按下:  Digit1      --> 大键盘1
            Code: 键盘按键被按下:  Numpad1     --> 小键盘1
            Code: 键盘按键被按下:  Minus       --> 大键盘-键（+键旁边）
            Code: 键盘按键被按下:  Equal       --> 大键盘+键
        结果分析：
            可以识别键盘布局，即 大键盘中的数字1和小键盘中的数字1被识别为不同的对象
     */
    // document.addEventListener('keydown', function (e) {
    //     console.log('Code: 键盘按键被按下: ', e.code);
    // })

    // KeyboardEvent.key介绍
    /*
    文档：https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/key

    以下是一些测试结果：
        Key: 键盘按键被按下:  a        --> 字母a
        Key: 键盘按键被按下:  1        --> 大键盘1
        Key: 键盘按键被按下:  2        --> 小键盘2
        Key: 键盘按键被按下:  Alt
        Key: 键盘按键被按下:  Shift
        Key: 键盘按键被按下:  CapsLock
    结果分析：
        无法识别键盘布局，即 大键盘中的数字1和小键盘中的数字1被识别为相同的对象
    */
    document.addEventListener('keydown', function (e) {
        console.log('Key: 键盘按键被按下: ', e.key);
    })
</script>
</body>
</html>
```



#### 常见的页面事件监听

| 事件名     | 事件描述                             |
| ---------- | ------------------------------------ |
| `onload`   | 当页面或图像被完全加载完后执行       |
| `onunload` | 当用户退出页面时执行（经测试不好用） |

回调函数接收一个`Event `对象，参考文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Event

示例代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .circle {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            text-align: center;
            line-height: 200px;
        }

        .red {
            background-color: red;
        }

        .green {
            background-color: yellowgreen;
        }

        .blue {
            background-color: deepskyblue;
        }

    </style>
</head>
<body onunload="alert('The onunload event was triggered')">
<script>
    // 先执行js代码，后加载HTML页面时，获取不到DOM节点
    const main = document.getElementById("main");
    console.log(main); // null

    // 解决方法使用 onload
    window.onload = () => {
        const main = document.getElementById("main");
        console.log(main);
    }
</script>
<div id="main" style="display: flex">
    <div id="red" class="circle red">1</div>
</div>

</body>
</html>
```



#### 常见的表单事件监听

| 事件名     | 事件描述                                  |
| ---------- | ----------------------------------------- |
| `onfocus`  | 当元素获得焦点时（比如tab键或鼠标点击）   |
| `onblur`   | 当元素失去焦点时                          |
| `onsubmit` | 当表单提交时                              |
| `onreset`  | 当表单重置时                              |
| `onchange` | 当用户改变域内容时（比如改变input框内容） |
| `oninput`  |                                           |



`input`输入框事件示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<form id="login-form">
    <div>
        <span>用户名</span>
        <input type="text" name="username" placeholder="请输入用户名">
    </div>
    <div>
        <span>密码</span>
        <input type="password" name="password" placeholder="请输入密码">
    </div>
    <div>
        <button>登录</button>
        <button>重置</button>
    </div>
</form>

<script>
    const form = document.getElementById('login-form');

    // 用户名输入框，获得焦点触发
    form.username.addEventListener('focus', function (e) {
        console.log("【focus】 用户名输入框已经获得焦点，请放心输入");
    })

    // 用户名输入框，输入内容时触发
    form.username.addEventListener('input', function (e) {
        console.log(`【input】 您输入的总内容是：${e.target.value}，本次输入内容为：${e.data}`);
    })

    // 用户名输入框
    form.username.addEventListener('change', function (e) {
        console.log("【change】输入完成，准备撤退了");
    })

    // 用户名输入框失去焦点
    form.username.addEventListener('blur', function (e) {
        console.log("【blur】 失去焦点，大哥下次再来啊~~");
    })
</script>
</body>
</html>
```

![image-20211012161843590](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211012161843590.png)

`form`重置与提交示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<form id="login-form" action="/login" method="post">
    <div>
        <span>用户名</span>
        <input type="text" name="username" placeholder="请输入用户名">
    </div>
    <div>
        <span>密码</span>
        <input type="password" name="password" placeholder="请输入密码">
    </div>
    <div>
        <input type="button" value="重置1" onclick="formReset()">
        <input type="reset" value="重置2">

        <input type="button" value="登录1" onclick="formSubmit()">
        <input type="submit" value="登录2">
    </div>
</form>

<script>
    const form = document.getElementById('login-form');

    // 重置表单-方法1
    function formReset() {
        console.log("重置表单方式1...")
        form.reset();
    }

    // 重置表单-方法2
    // 修改HTML代码中input的type="reset"即可

    // 表单被重置的事件监听
    form.addEventListener('reset', function () {
        console.log("【reset】 表单被重置了!朕的大清亡了？")
    })

    /* ------------------------------------------------------- */

    /*
        下面两种方法都可以提交表单，但是有区别
            方法1：使用form.submit()不会触发onsubmit事件
            方法2：使用type="submit"会触发onsubmit事件
    */

    // 表单提交-方法1
    function formSubmit() {
        form.submit();
    }

    // 表单提交-方法2
    // 修改HTML代码中input的type="submit"即可

    // 表单被提交的事件监听
    form.addEventListener('submit', function (e) {
        alert('【submit】 表单被提交了！');
    })

</script>
</body>
</html>
```



### 事件传播

事件传播研究的是：当有多个盒子（诸如div等盒模型）嵌套时，事件监听执行的顺序问题



先上结论：

* 事件传播**先由外向内**，这称为捕获阶段，然后**再由内向外**，这称为冒泡阶段

* `onxxx`只能监听冒泡阶段事件；

  `.addEventListener(xxx, function, true)`监听捕获阶段事件，

  `.addEventListener(xxx, function)`监听冒泡阶段事件，

  区别在于第三个参数是否为true

* 如果给元素设置两个或多个同名事件，则`onxxx`会进行覆盖，`.addEventListene`会执行多次



#### 测试1：事件传播顺序(捕获阶段/冒泡阶段)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        /* 公共样式 */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            width: 100%;
            height: 100%;
        }

        /* 盒子样式 */
        .box {
            border: 1px solid #000;
            display: flex;
            /*必须指定高度*/
            /*height: 100%;*/
            justify-content: center; /* 水平居中 */
            align-items: center; /* 垂直居中 */
        }

        .box1 {
            width: 600px;
            height: 600px;
            background-color: #8c939d;
        }

        .box2 {
            width: 300px;
            height: 300px;
            background-color: #8cc5ff;
        }

        .box3 {
            width: 150px;
            height: 150px;
            background-color: #a4da89;
        }

        .box-wrapper {
            display: flex;
            /*必须指定高度*/
            height: 100%;
            justify-content: center; /* 水平居中 */
            align-items: center; /* 垂直居中 */
        }

        .box .title {
            flex: 1;
            text-align: center;
        }

    </style>
</head>
<body>
<div class="box-wrapper">
    <div id="box1" class="box box1 ">
        <span class="title">1</span>
        <div id="box2" class="box box2 ">
            <span class="title">2</span>
            <div id="box3" class="box box3 ">
                <span class="title">3</span>
            </div>
            <span class="title"></span>
        </div>
        <span class="title"></span>
    </div>
</div>

<script>
    // 获取3个盒子
    const box1 = document.getElementById("box1");
    const box2 = document.getElementById("box2");
    const box3 = document.getElementById("box3");

    // 封装的通用回调函数
    function test1(message) {   
        return function (e) {
            console.log(message, e.currentTarget);
        }
    }
    
	// 测试1：验证捕获阶段和冒泡阶段执行顺序
    box1.addEventListener('click', test1("box1 捕获阶段"), true);
    box1.addEventListener('click', test1("box1 冒泡阶段"), false);

    box3.addEventListener('click', test1("box3 捕获阶段"), true);
    box3.addEventListener('click', test1("box3 冒泡阶段"), false);

    box2.addEventListener('click', test1("box2 捕获阶段"), true);
    box2.addEventListener('click', test1("box2 冒泡阶段"), false);


</script>
</body>
</html>
```

点击`box3`盒子，然后查看输出

![image-20211013104423422](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211013104423422.png)



#### 测试2：`onxxx`和`.addEventListener`监听区别

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        /* 公共样式 */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            width: 100%;
            height: 100%;
        }

        /* 盒子样式 */
        .box {
            border: 1px solid #000;
            display: flex;
            /*必须指定高度*/
            /*height: 100%;*/
            justify-content: center; /* 水平居中 */
            align-items: center; /* 垂直居中 */
        }

        .box1 {
            width: 600px;
            height: 600px;
            background-color: #8c939d;
        }

        .box2 {
            width: 300px;
            height: 300px;
            background-color: #8cc5ff;
        }

        .box3 {
            width: 150px;
            height: 150px;
            background-color: #a4da89;
        }

        .box-wrapper {
            display: flex;
            /*必须指定高度*/
            height: 100%;
            justify-content: center; /* 水平居中 */
            align-items: center; /* 垂直居中 */
        }

        .box .title {
            flex: 1;
            text-align: center;
        }

    </style>
</head>
<body>
<div class="box-wrapper">
    <div id="box1" class="box box1 ">
        <span class="title">1</span>
        <div id="box2" class="box box2 ">
            <span class="title">2</span>
            <div id="box3" class="box box3 ">
                <span class="title">3</span>
            </div>
            <span class="title"></span>
        </div>
        <span class="title"></span>
    </div>
</div>

<script>
    // 获取3个盒子
    const box1 = document.getElementById("box1");
    const box2 = document.getElementById("box2");
    const box3 = document.getElementById("box3");

    // 封装的通用回调函数
    function test(message) {
        return function (e) {
            console.log(message, e.currentTarget);
        }
    }

    // 测试2：验证捕获阶段和冒泡阶段执行顺序
    box1.addEventListener('click', test("box1 捕获阶段"), true);
    box1.onclick = test("box1 冒泡阶段")
    box2.onclick = test("box2 冒泡阶段")
    box3.onclick = test("box3 冒泡阶段")
</script>
</body>
</html>
```

![image-20211013164054123](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211013164054123.png)

#### 测试3：设置两个或多个同名事件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        /* 公共样式 */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            width: 100%;
            height: 100%;
        }

        /* 盒子样式 */
        .box {
            border: 1px solid #000;
            display: flex;
            /*必须指定高度*/
            /*height: 100%;*/
            justify-content: center; /* 水平居中 */
            align-items: center; /* 垂直居中 */
        }

        .box1 {
            width: 600px;
            height: 600px;
            background-color: #8c939d;
        }

        .box2 {
            width: 300px;
            height: 300px;
            background-color: #8cc5ff;
        }

        .box3 {
            width: 150px;
            height: 150px;
            background-color: #a4da89;
        }

        .box-wrapper {
            display: flex;
            /*必须指定高度*/
            height: 100%;
            justify-content: center; /* 水平居中 */
            align-items: center; /* 垂直居中 */
        }

        .box .title {
            flex: 1;
            text-align: center;
        }

    </style>
</head>
<body>
<div class="box-wrapper">
    <div id="box1" class="box box1 ">
        <span class="title">1</span>
        <div id="box2" class="box box2 ">
            <span class="title">2</span>
            <div id="box3" class="box box3 ">
                <span class="title">3</span>
            </div>
            <span class="title"></span>
        </div>
        <span class="title"></span>
    </div>
</div>

<script>
    // 获取3个盒子
    const box1 = document.getElementById("box1");
    const box2 = document.getElementById("box2");
    const box3 = document.getElementById("box3");

    // 封装的通用回调函数
    function test(message) {
        return function (e) {
            console.log(message, e.currentTarget);
        }
    }

    // 测试3：设置两个或多个同名事件
    box1.addEventListener('click', test("box1 捕获阶段-1"), true);
    box1.addEventListener('click', test("box1 捕获阶段-2"), true);

    box1.addEventListener('click', test("box1 冒泡阶段-1"), false);
    box1.addEventListener('click', test("box1 冒泡阶段-2"), false);

    box2.onclick = test("box2 冒泡阶段-1")
    box2.onclick = test("box2 冒泡阶段-2")

    box3.addEventListener('click', test("box3 冒泡阶段-1"), false);
    box3.onclick = test("box3 冒泡阶段-2")
</script>
</body>
</html>
```

![image-20211013164556150](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211013164556150.png)



#### 测试4：`mouseenter`和`mouseenter`的区别

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        /* 公共样式 */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            width: 100%;
            height: 100%;
        }

        /* 盒子样式 */
        .box {
            border: 1px solid #000;
            display: flex;
            /*必须指定高度*/
            /*height: 100%;*/
            justify-content: center; /* 水平居中 */
            align-items: center; /* 垂直居中 */
        }

        .box1 {
            width: 600px;
            height: 600px;
            background-color: #8c939d;
        }

        .box2 {
            width: 300px;
            height: 300px;
            background-color: #8cc5ff;
        }

        .box3 {
            width: 150px;
            height: 150px;
            background-color: #a4da89;
        }

        .box-wrapper {
            display: flex;
            /*必须指定高度*/
            height: 100%;
            justify-content: center; /* 水平居中 */
            align-items: center; /* 垂直居中 */
        }

        .box .title {
            flex: 1;
            text-align: center;
        }

    </style>
</head>
<body>
<div class="box-wrapper">
    <div id="box1" class="box box1 ">
        <span class="title">1</span>
        <div id="box2" class="box box2 ">
            <span class="title">2</span>
            <div id="box3" class="box box3 ">
                <span class="title">3</span>
            </div>
            <span class="title"></span>
        </div>
        <span class="title"></span>
    </div>
</div>

<script>
    // 获取3个盒子
    const box1 = document.getElementById("box1");
    const box2 = document.getElementById("box2");
    const box3 = document.getElementById("box3");

    // 封装的通用回调函数
    function test(message) {
        return function (e) {
            console.log(message, e.currentTarget);
        }
    }

    // 测试4：mouseenter和mouseenter的区别
    box1.addEventListener('mouseenter', test("box1 mouseenter 捕获阶段"), true);
    box1.addEventListener('mouseenter', test("box1 mouseenter 冒泡阶段"), false);

    box1.addEventListener('mouseover', test("box1 mouseover 捕获阶段"), true);
    box1.addEventListener('mouseover', test("box1 mouseover 冒泡阶段"), false);

    // box2.addEventListener('mouseenter', test("box2 mouseenter 捕获阶段"), true);
    // box2.addEventListener('mouseenter', test("box2 mouseenter 冒泡阶段"), false);
    //
    // box2.addEventListener('mouseover', test("box2 mouseover 捕获阶段"), true);
    // box2.addEventListener('mouseover', test("box2 mouseover 冒泡阶段"), false);
</script>
</body>
</html>
```

![image-20211014085209144](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211014085209144.png)

**分析**

* 当绑定两个事件的元素里面没有子元素的时候，这两个事件的触发效果是一致的
* 当绑定事件的元素里面有子元素并且鼠标经过(进入)时，mouseover两个阶段会触发，mouseenter只触发捕获，不会冒泡
* 当绑定事件的元素里面有子元素并且鼠标经过(移出)时，mouseover两个阶段会触发，mouseenter不会触发



### 事件对象

我们在上面事件监听中用到的e对象，就是事件对象



#### 鼠标位置

| 属性      | 描述                               |
| --------- | ---------------------------------- |
| `clientX` | 鼠标指针相对于浏览器的水平坐标     |
| `clientY` | 鼠标指针相对于浏览器的垂直坐标     |
| `pageX`   | 鼠标指针相对于整张网页的水平坐标   |
| `pageY`   | 鼠标指针相对于整张网页的垂直坐标   |
| `offsetX` | 鼠标指针相对于事件源元素的水平坐标 |
| `offsetY` | 鼠标指针相对于事件源元素的垂直坐标 |



#### 常用属性

| 属性            | 说明                                                         |
| --------------- | ------------------------------------------------------------ |
| `target`        | 触发事件的对象 (某个DOM元素)，在冒泡阶段表示的是源元素；举例参考：事件委托 |
| `currentTarget` | 触发事件的对象 (某个DOM元素)，在冒泡阶段表示的是附加元素；举例参考：事件委托 |





#### 常用方法：`stopPropagation`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>stopPropagation测试</title>
    <style>
        .box {
            width: 200px;
            height: 200px;
            background-color: #8cc5ff;
        }
    </style>
</head>
<script>
    window.onload = function () {
        const box = document.getElementsByClassName("box")[0];
        const btn = document.getElementsByClassName("btn")[0];

        box.onclick = function (e) {
            console.log("我是盒子");
        }

        btn.onclick = function (e) {
            // 在冒泡阶段阻止事件传播，所以box的onclick将不会触发
            e.stopPropagation();
            console.log("我是按钮");
        }
    }
</script>
<body>
<div class="box">
    <button class="btn">点我</button>
</div>
</body>
</html>
```



#### 常用方法：`preventdefault`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>preventDefault测试</title>
</head>
<body>
<a id="bd" href="https://www.baidu.com" target="_blank">百度</a>
<script>
    const bd = document.getElementById('bd');
    
    // 阻止默认事件
    bd.addEventListener('click', function (e) {
        console.log("点击")

        // 阻止a标签默认的跳转
        e.preventDefault();
    })
</script>
</body>
</html>
```



### 事件委托

#### 原理

<img src="https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211018115458802.png" alt="image-20211018115458802" style="zoom:50%;" />

元素本身(上面例子中是li元素)并没有监听事件，而是通过事件冒泡机制，在父元素上(上面例子是ul)添加事件监听，

父元素通过`event.target`来定位到具体是哪个元素，然后再进行相应操作



#### 应用场景

* 当有大量类似元素需要批量添加事件时，使用事件委托可以减少内存开销
* 当有动态元素添加时，使用事件委托可以让新加的元素具有监听事件



#### 使用限制

* 不能委托不冒泡的事件
* 最内层元素(下面例子中是li)不能再有额外的内层元素



#### 示例代码

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
<button id="btn">按我创建一个新列表项</button>
<ul id="list">
    <li>列表项</li>
    <li>列表项</li>
    <li>列表项</li>
</ul>
<script>
    var oList = document.getElementById('list');
    var oBtn = document.getElementById('btn');

    oBtn.onclick = function () {
        // 创建新的li元素
        var oLi = document.createElement('li');
        // 写内容
        oLi.innerText = '我是新来的';
        // 上树
        oList.appendChild(oLi);
    };

    // 就是哪个DOM节点自己触发的事件,没有冒泡过程
    oList.onclick = function (e) {
        // 清空已经存在的样式，类似于单选的效果，如果不需要刻意将这段代码注释
        for (let ele of oList.children) {
            ele.style.color = null;
        }

        // e.target表示用户真正点击的那个元素
        e.target.style.color = 'red';
    };
</script>
</body>

</html>
```

![image-20211018164035140](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211018164035140.png)

### 定时器和延时器

#### 基本使用

```javascript
<script>
    // setInterval接收一个函数和一个时间间隔(毫秒)，每隔一个时间间隔就会调用一下这个函数，如下面每隔1秒会将interVar+1，并输出
    var interVar = 1;
    setInterval(function () {
        console.log("定时器执行结果: ", interVar++);
    }, 1000);

    // setTimeout接收一个函数和一个时间间隔(毫秒)，等待一个时间间隔后就会调用这个函数，只会调用一次
    setTimeout(function () {
        console.log("我是延迟器，我执行了")
    }, 3000)
</script>
```

![image-20211018194617382](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211018194617382.png)

#### 取消定时器和延时器

```javascript
<script>
    // setInterval接收一个函数和一个时间间隔(毫秒)，每隔一个时间间隔就会调用一下这个函数，如下面每隔1秒会将interVar+1，并输出
    var interVar = 1;
    var intervalFun = setInterval(function () {
        console.log("定时器执行结果: ", interVar++);

        // 取消定时器
        if (interVar === 5) {
            clearInterval(intervalFun);
        }

    }, 1000);

    // setTimeout接收一个函数和一个时间间隔(毫秒)，等待一个时间间隔后就会调用这个函数，只会调用一次
    var timeoutFun = setTimeout(function () {
        console.log("我是延迟器，我执行了")
    }, 3000)
    clearTimeout(timeoutFun);  // 取消延迟器，此时上面的代码还未执行，所以什么也不会输出
</script>
```

![image-20211018195042454](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211018195042454.png)

#### 异步特性

`setInterval`和`setTimeout`都是异步函数，意味着不会阻塞CPU继续向下执行代码，

所以在上面代码基础上我们再加一句代码`console.log("End")`，那么在浏览器中是`End`先输出到屏幕上

```javascript
<script>
    // setInterval接收一个函数和一个时间间隔(毫秒)，每隔一个时间间隔就会调用一下这个函数，如下面每隔1秒会将interVar+1，并输出
    var interVar = 1;
    var intervalFun = setInterval(function () {
        console.log("定时器执行结果: ", interVar++);

        // 取消定时器
        if (interVar === 5) {
            clearInterval(intervalFun);
        }

    }, 1000);

    // setTimeout接收一个函数和一个时间间隔(毫秒)，等待一个时间间隔后就会调用这个函数，只会调用一次
    var timeoutFun = setTimeout(function () {
        console.log("我是延迟器，我执行了")
    }, 3000)
    clearTimeout(timeoutFun);  // 取消延迟器，此时上面的代码还未执行，所以什么也不会输出

    console.log("End")
</script>
```



![image-20211018195345536](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211018195345536.png)

### 防抖

当持续触发事件时，事件不会执行，只有在用户停止触发事件一段时间之后再执行这个事件一次



**举个例子**

在没有做防抖的情况下，当我们快速输入`abcdef`的时，前端监听的`input`事件会执行多次

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

        .box {
            width: 200px;
            height: 200px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -100px;
            margin-left: -100px;
        }

        .box input {
            height: 30px;
            padding: 0 20px;
            outline: none;
            border: 1px solid #999999;
        }

        .box input:focus {
            border: 1px solid #79bbff;
        }

        #display p {
            line-height: 2;
        }
    </style>
</head>
<body>
<div class="box">
    <input type="text" id="search" placeholder="请输入关键字搜索">
    <div id="display"></div>
</div>
<script>
    window.addEventListener('input', () => {
        const value = document.getElementById("search").value;
        const p = document.createElement('p');
        p.innerText = `你输入的内容: ${value}`
        document.getElementById("display").appendChild(p);
    })
</script>
</body>
</html>
```

![](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/%E6%9C%AA%E9%98%B2%E6%8A%96%E5%8A%A8%E7%94%BB.gif)

防抖的原理：

用户每次输入都会延迟执行`input`事件（设置延迟器），

当第二次输入"b"时，会把上一次的延迟器清除，然后再执行同样的延迟器，

当我们快速输入的间隔（如果小于延迟器），那么会将多次输入合并为一次`input`事件，就达到了防抖的效果，

防抖的本质就是将多次事件合并，当用户停止触发事件，将事件执行一次；



**修改代码如下**

```javascript
<script>
function test(waitTime) {
    let timer = null;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            const value = document.getElementById("search").value;
            const p = document.createElement('p');
            p.innerText = `你输入的内容: ${value}`
            document.getElementById("display").appendChild(p);
        }, waitTime)
    }
}

window.addEventListener('input', test(240));
</script>
```

![](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/%E9%98%B2%E6%8A%96%E5%8A%A8%E7%94%BB.gif)

> 延迟器的毫秒数根据实际情况调整



### 节流

当持续触发事件时，保证一定时间段内只调用一次事件处理函数



**未节流时**

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
<script>
const test = () => {
    let n = 0;
    return function () {
        console.log(++n);
    }
}
window.addEventListener('mousemove', test());
</script>
</body>
</html>
```

![](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/%E6%9C%AA%E8%8A%82%E6%B5%81%E5%8A%A8%E7%94%BB.gif)

节流的原理：

在节流函数外设置一个变量flag，默认为true，代表当前允许节流函数执行（事件执行），

节流函数一旦执行，就会设置`flag`为`false`，此时如果高频操作，其他节流函数碰到`flag`为`false`就直接返回

这就跟互斥锁很类似，拿不到锁的直接就结束了



**节流时**

修改代码

```html
<script>
const test = (waitTime) => {
    let n = 0;
    let flag = true;
    return function () {
        if (!flag) return
        flag = false
        setTimeout(() => {
            console.log(++n);
            flag = true;
        }, waitTime)
    }
}
window.addEventListener('mousemove', test(1000))
</script>
```

![](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/%E8%8A%82%E6%B5%81%E5%8A%A8%E7%94%BB.gif)

## BOM

A区（浏览器的标签页，地址栏，搜索栏，书签栏，窗口放大还原关闭按钮，菜单栏等等）

B区（浏览器的右键菜单）：oncontextmenu事件

C区（document加载时的状态栏，显示http状态码等）

D区（滚动条scroll bar）



Bom（Browser Object Model，浏览器对象模型）是JavaScript与浏览器窗口交互的接口

一些与浏览器修改尺寸、滚动条滚动相关的特效，都要借助BOM技术



### 浏览器窗口：Window对象

#### 概述

window对象是当前JS脚本运行所处的窗口，而这个窗口包含DOM结构，`window.document`就是`document`对象

```javascript
<script>
    // body标签等同于document.body
    const bodyBox = document.getElementsByTagName("body")[0];
    console.log(bodyBox);
    console.log(document.body);
    console.log(bodyBox === document.body);
</script>
```

> 所以可以得出结论：DOM是BOM的一部分



在有标签页功能的浏览器中，每个标签都有自己的`window`对象，互不影响

全局变量会成为window对象的属性

```javascript
<script>
    var a = 1;
    console.log(window.a === a); // true

    let b = 1;
    console.log(window.b === b); // false
    console.log(window.b);  // undefined

    const c = 1;
    console.log(window.c === c); // false
    console.log(window.c);  // undefined
</script>
```

内置方法普遍是window的方法

```javascript
<script>
    console.log(window.alert === alert);    // true
    console.log(window.prompt === prompt);    // true
    console.log(window.confirm === confirm);    // true
    console.log(window.setTimeout === setTimeout); // true
</script>
```



#### 窗口属性

| 属性                                  | 说明                                 |
| ------------------------------------- | ------------------------------------ |
| window.innerWidth                     | 浏览器内容区域宽度，包含垂直滚动条   |
| window.innerHeight                    | 浏览器内容区域高度，包含水平滚动条   |
| window.outerWidth                     | 浏览器外部宽度                       |
| window.outerHeight                    | 浏览器外部高度                       |
| document.documentElement.clientWidth  | 浏览器内容区域宽度，不包含垂直滚动条 |
| document.documentElement.clientHeight | 浏览器内容区域高度，不包含水平滚动条 |

测试代码

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BOM窗口测试</title>
</head>

<body>
<div style="width: 3000px; height: 2000px;"></div>
<script>
    let message = `
    innerWidth: ${window.innerWidth}
    innerHeight: ${window.innerHeight}
    outerWidth: ${window.outerWidth}
    outerHeight: ${window.outerHeight}
    document.documentElement.clientWidth: ${document.documentElement.clientWidth}
    document.documentElement.clientHeight: ${document.documentElement.clientHeight}
    水平滚动条宽度：${window.innerHeight - document.documentElement.clientHeight}
    垂直滚动条宽度：${window.innerWidth - document.documentElement.clientWidth}`

    alert(message);
</script>
</body>

</html>
```

![image-20211019093025941](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211019093025941.png)

#### 窗口事件

在窗口大小改变后就会触发`resize`事件

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BOM窗口测试</title>
</head>

<body>
<div style="width: 3000px; height: 2000px;"></div>
<script>
    function getWindow() {
        let message = `
            innerWidth: ${window.innerWidth}
            innerHeight: ${window.innerHeight}
            outerWidth: ${window.outerWidth}
            outerHeight: ${window.outerHeight}
            document.documentElement.clientWidth: ${document.documentElement.clientWidth}
            document.documentElement.clientHeight: ${document.documentElement.clientHeight}
            水平滚动条宽度：${window.innerHeight - document.documentElement.clientHeight}
            垂直滚动条宽度：${window.innerWidth - document.documentElement.clientWidth}`
        alert(message);
    }

    window.onresize = function () {
        getWindow();
    }
</script>
</body>

</html>
```



#### 窗口滚动条属性和事件

| 属性                                  | 说明                             |
| ------------------------------------- | -------------------------------- |
| `window.scrollX`                      | 水平滚动条已滚动像素，只读属性   |
| `window.scrollY`                      | 垂直滚动条已滚动像素，只读属性   |
| `document.documentElement.scrollLeft` | 水平滚动条已滚动像素，非只读属性 |
| `document.documentElement.scrollTop`  | 垂直滚动条已滚动像素，非只读属性 |

示例代码

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
<div style="width: 5000px; height: 5000px;"></div>
<script>
    setInterval(function () {
        let message = `水平滚动条已滚动像素：${window.scrollX}; 垂直滚动条已滚动像素：${window.scrollY}`
        console.log(message);
    }, 1000)
</script>
</body>
</html>
```



<img src="https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211019150052132.png" alt="image-20211019150052132" style="zoom:50%;" />



























#### 案例：回到顶部功能

`index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BOM窗口测试</title>
</head>

<body>

<div style="height: 2000px; background-color: #8cc5ff;">
    参考文档：https://www.cnblogs.com/alvin553819/p/7365000.html
    <span id="top4">随便写点内容</span>
    <a href="#这里是锚点"></a>
</div>
<button id="toTop1">回到顶部-方法1</button>
<button id="toTop2">回到顶部-方法2</button>
<button id="toTop3">回到顶部-方法3</button>
<button id="toTop4">回到顶部-方法4</button>
<script>
    /* 回到顶部方式1 */
    const topBtn1 = document.getElementById("toTop1");
    topBtn1.onclick = function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    /* 回到顶部方式2 */
    const topBtn2 = document.getElementById("toTop2");
    topBtn2.onclick = function () {
        scrollTo(0, 0);
    }

    /* 回到顶部方式3 */
    const topBtn3 = document.getElementById("toTop3");
    topBtn3.onclick = function () {
        var top = document.body.scrollTop || document.documentElement.scrollTop
        scrollBy(0, -top);
    }

    /* 回到顶部方式4 */
    const topBtn4 = document.getElementById("toTop4");
    topBtn4.onclick = function () {
        const top4 = document.getElementById("top4");
        top4.scrollIntoView();
    }

</script>
</body>

</html>
```



### 浏览器会话历史：History

`history`对象提供了操作浏览器会话历史的接口，等同于`window.history`

```javascript
<script>
    console.log(window.history === history); // true
</script>
```



#### history对象基础属性

| 属性                | 说明                                                         |
| ------------------- | ------------------------------------------------------------ |
| `history.back()`    | 向后跳转，这和用户点击浏览器回退按钮的效果相同               |
| `history.forward()` | 向前跳转，这和用户点击浏览器前进按钮的效果相同               |
| `history.go(-1)`    | 跳转到特定页面，`-1`代表向后跳转一个点，<br />`history.go(-1);`效果等同于`history.back()`；<br />`history.go(1);`效果等同于`history.forward()` |
| `history.length`    | 历史页面数量（只包含由该页面跳转过的页面）                   |

测试

`demo1.html`

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
<a href="demo2.html">去demo2</a>
<button onclick="history.go(-1);">后退</button>
<button onclick="history.go(1);">前进</button>
<script>
    console.log(history.length); // 初始为1
</script>
</body>
</html>
```

`demo2.html`

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
<a href="demo1.html">去demo1</a>
<button onclick="history.go(-1);">后退</button>
<button onclick="history.go(1);">前进</button>
<script>
    console.log(history.length); // 1
</script>
</body>
</html>
```

测试结果分析

* 访问`demo1.html`,`history.length`初始为1，因为访问了当前页面
* 在再页面上点击超链接跳转到`demo2.html`，`history.length`会+1，
* 再从`demo2.html`击超链接跳转到`demo1.html`，`history.length`也会+1，
* 点击回退按钮（页面上的或浏览器自带的），`history.length`不会加也不会减
* 查看浏览器历史记录（快捷键`Ctrl+H`），发现只有两条记录`demo1.html`和`demo2.html`



#### history对象高级属性

| 方法/属性                                | 说明                                                         |
| ---------------------------------------- | ------------------------------------------------------------ |
| `history.pushState(状态对象, 标题, URL)` | 添加并激活一条历史记录条目<br /><br />1、修改浏览器地址栏为指定的域名，但不会加载URL中的内容<br />2、在浏览器中历史记录中可以看到多出一条访问记录，正是我们新加的URL<br />注意：只能添加自己域名的历史记录 |
| `history.replaceState()`                 | 修改历史记录条目                                             |
| history.state                            |                                                              |

> window.onpopstate



* 





## 事件循环

**JavaScript是一门单线程的语言**

JavaScript最初的用途就是与浏览器交互，运行在浏览器环境中，

为了保证了程序执行的一致性，所以采用的是单线程



到了今天，单线程在保证了执行顺序的同时也限制了JavaScript的效率，因此开发出了web worker技术。

这项技术号称让JavaScript成为一门多线程语言。

然而，使用web worker技术开的多线程有着诸多限制，例如 所有新线程都受主线程的完全控制，不能独立执行。



可以预见，未来的JavaScript也会一直是一门单线程的语言。



**JavaScript是一门非阻塞的语言**

JavaScript的另一个特点是“非阻塞”，这就涉及到了`event loop`（事件循环）





**执行栈和任务队列**

* 执行栈存储同步任务

* 任务队列中存储异步任务

  不同的异步任务被分为两类：

  * 微任务（micro task），以下事件属于微任务
    * `new Promise()`
    * `process.nextTick`
    * `Object.observe`
    * `new MutaionObserver()`
  * 宏任务（macro task），以下事件属于宏任务：
    * `setInterval()`
    * `setTimeout()`
    * `I/O`
    * `UI渲染`
    * `script`标签中的整体代码

* 执行顺序问题

  先执行同步任务，将同步任务执行完，

  再执行异步任务，异步任务中先执行微任务，再执行宏任务

​		

- js事件循环总是从一个macrotask开始执行
- 一个事件循环过程中，只执行一个macrotask，但是可能执行多个microtask
- 执行栈中的任务产生的microtask会在当前事件循环内执行
- 执行栈中的任务产生的macrotask要在下一次事件循环才会执行





测试1：同步任务和异步任务的执行顺序

```javascript
<script>
    // 异步任务
    setTimeout(() => {
        console.log("异步任务执行")
    }, 0)

    // 同步任务
    const end = 99999;
    for (let i = 0; i <= end; i++) {
        if (i === 10 || i === end) {
            console.log(i)
        }
    }

    // 同步任务
    console.log("End")
</script>
```





测试2：异步任务中微任务和宏任务的执行顺序

```javascript
<script>
    // 宏任务
    setTimeout(function () {
        console.log(1);
    });

    // 微任务
    new Promise(function (resolve, reject) {
        console.log(2)
        resolve(3)
    }).then(function (val) {
        setTimeout(() => {
            console.log(val);
        })
    })

	// 输出结果: ?
</script>
```



测试3：异步任务中微任务和宏任务的执行顺序

```javascript
<script>
    (function test() {
    	// 宏任务
        setTimeout(function () {
            console.log(4)
        }, 0);
    
    	// 微任务
        new Promise(function executor(resolve) {
            console.log(1);
            for (var i = 0; i < 10000; i++) {
                i == 9999 && resolve();
            }
            console.log(2);
        }).then(function () {
            console.log(5);
        });
        console.log(3);
    })()

	// 输出结果: ?
</script>
```



## WebSocket

### 基础语法

**前端代码编写**

::: details 点击查看完整代码

`demo.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<script>
    // 创建WebSocket实例，这会去连接WebSocket服务端
    var ws = new WebSocket("ws://localhost:8080/ws");

    // 查看WebSocket连接状态
    //  0       WebSocket.CONNECTING  正在连接
    //  1       WebSocket.OPEN        连接成功，可以通信了
    //  2       WebSocket.CLOSING     连接正在关闭
    //  3       WebSocket.CLOSED      连接已经关闭，或者打开连接失败
    switch (ws.readyState) {
        case WebSocket.CONNECTING:
            console.log("状态: 正在连接");
            break;
        case WebSocket.OPEN:
            console.log("状态: 连接成功");
            break;
        case WebSocket.CLOSING:
            console.log("状态: 连接关闭中");
            break;
        case WebSocket.CLOSED:
            console.log("状态: 连接已关闭");
            break;
    }

    // 连接成功后的回调函数
    ws.addEventListener('open', (event) => {
        console.log('回调: 连接成功')
    })

    // 连接关闭后的回调函数
    ws.addEventListener('close', (event) => {
        console.log('回调: 连接已关闭或连接失败')
    })

    // 发送消息(需要在建立连接成功以后, 否则也发不出去~~)
    ws.addEventListener('open', (event) => {
        let s = Array.from(Array(100), (v, k) => k + 1).join('+');
        ws.send(s);
    })

    // 收到服务器数据后的回调函数
    // 服务器数据可能是文本，也可能是二进制数据（blob对象或Arraybuffer对象
    ws.addEventListener('message', (event) => {
        console.log('收到了服务器发来的消息: ', event.data);
    })
</script>
</body>
</html>
```

:::



**服务端代码编写**

服务端使用Python3的`fastapi`框架，文档地址：[https://fastapi.tiangolo.com/zh/advanced/websockets/](https://fastapi.tiangolo.com/zh/advanced/websockets/)

* 安装依赖

  ```bash
  pip install fastapi uvicorn[standard]
  ```

* 编写示例代码

  ::: details 点击查看完整代码

  `demo.py`

  ```python
  #!/usr/bin/env python
  
  from fastapi import FastAPI, WebSocket
  import uvicorn
  from datetime import datetime
  
  app = FastAPI()
  
  
  @app.websocket("/ws")
  async def websocket_endpoint(websocket: WebSocket):
      # 等待客户端连接
      await websocket.accept()
      print("接到客户端链接")
  
      # 接收客户端发来的消息(这里只演示接收文本消息，约定用户发过来数学计算)
      data = await websocket.receive_text()
  
      # 数值计算, eval有安全隐患，这里仅演示使用
      ret = eval(data)
  
      # 返回数据
      await websocket.send_text(f"{data} = {ret}")
      print("返回数据给客户端")
  
      # 函数执行完毕，关闭连接
      print("关闭客户端链接")
  
  
  if __name__ == '__main__':
      uvicorn.run("demo:app", host="127.0.0.1", port=8080)
  ```

  :::

* 运行结果

  ![image-20211208212721268](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211208212721268.png)



### 服务端推送示例

服务端每秒推送一个随机数到客户端

::: details 点击查看完整代码

`demo.py`

```python
#!/usr/bin/env python

import random
import time

from fastapi import FastAPI, WebSocket
import uvicorn

app = FastAPI()


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    while True:
        n = random.randint(100, 999)
        await websocket.send_text(str(n))
        time.sleep(1)


if __name__ == '__main__':
    uvicorn.run("demo:app", host="127.0.0.1", port=8080)
```

:::

::: details 点击查看完整代码

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

        .box {
            width: 200px;
            height: 200px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -100px;
            margin-left: -100px;

            display: flex;
            justify-content: center;
            align-items: center;
        }

        .box #msg {
            color: green;
            font-size: 30px;
            font-weight: bold;
        }

    </style>
</head>
<body>
<div class="box">
    <span id="msg"></span>
</div>
<script>
    // DOM对象
    const msg = document.getElementById('msg');

    // 创建WebSocket实例，这会去连接WebSocket服务端
    var ws = new WebSocket("ws://localhost:8080/ws");

    // ws收到消息事件
    ws.addEventListener('message', function (e) {
        msg.innerText = e.data;
    })
</script>
</body>
</html>
```

:::

![](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/f4cLWjbf.gif)









### 表单简单交互示例

::: details 点击查看完整代码

`demo.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .box {
            width: 400px;
            margin: 0 auto;
            margin-top: 100px;
        }

        .box input {
            outline: none;
        }
    </style>
</head>
<body>
<div class="box">
    <form id="form">
        <input type="text" name="input" autocomplete="off" autofocus/>
        <input type="submit" name="submit" value="提交">
    </form>
    <ul id="list"></ul>
</div>
<script>
    // HTML对象
    const form = document.getElementById("form");   // 表单
    const list = document.getElementById('list');   // 列表

    function createWebSocket() {
        return new WebSocket("ws://localhost:8080/ws");
    }

    // 创建WebSocket实例，这会去连接WebSocket服务端
    var ws = createWebSocket();

    // 提交事件
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        ws.send(form.input.value);
    })

    // ws收到消息事件
    ws.addEventListener('message', function (e) {
        const li = document.createElement('li');
        li.innerText = e.data;
        list.appendChild(li);
        form.input.value = '';
        form.input.focus();
    })

</script>
</body>
</html>
```

:::

::: details 点击查看完整代码

`demo.py`

```python
#!/usr/bin/env python

from fastapi import FastAPI, WebSocket
import uvicorn

app = FastAPI()


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    while True:
        data = await websocket.receive_text()
        try:
            ret = eval(data)
        except Exception as e:
            ret = e
        await websocket.send_text(f"{data} = {ret}")


if __name__ == '__main__':
    uvicorn.run("demo:app", host="127.0.0.1", port=8080)

```

:::

![](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/f3cLWjbf.gif)



