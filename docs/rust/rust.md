# Rust

官网：[https://www.rust-lang.org](https://www.rust-lang.org)

Github：[https://github.com/rust-lang/rust](https://github.com/rust-lang/rust)

<br />

## 安装

::: details Windows 10 安装 Rust

**安装Rust**

1、下载并运行 [rustup-init.exe](https://www.rust-lang.org/tools/install)，这里选择安装到默认位置

2、将 `C:\Users\Administrator\.cargo\bin` 加入到系统环境变量 PATH 中

3、`rustup set default-host x86_64-pc-windows-gnu`

4、检查rust版本 `rustc --version`，这里使用的是 `rustc 1.72.0 (5680fa18f 2023-08-23)`

5、安装 [Microsoft C++ 生成工具](https://visualstudio.microsoft.com/zh-hans/visual-cpp-build-tools/)，以管理员权限运行

![image-20230828232717012](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230828232717012.png)

其他参考：[https://www.cnblogs.com/andy-chi/p/16786718.html](https://www.cnblogs.com/andy-chi/p/16786718.html)

**安装开发工具**

下载地址：

1、下载并安装 [CLion ](https://www.jetbrains.com/clion)

2、安装 Rust插件，并等待索引更新完成

3、使用 Ctrl + F10 编译并运行（PS：Ctrl + F9只编译不运行）

:::

<br />

## 变量和常量

::: details （1）定义和输出变量

```rust
fn main() {
    // 使用let定义变量, 变量的类型我们没有写, 但是IDE中可以看到是i32类型
    // 所以完整的代码写作: let x: i32 = 10;
    let x = 10;

    // println用于输出到屏幕, 是一个宏, 后面会学到
    println!("This value of x is {}", x);
}
```

输出结果

```bash
This value of x is 10
```

:::

::: details （2）变量的不可变性和可变性

**1、变量的不可变性**

```rust
fn main() {
    // 默认定义的变量是不可变的
    let x = 10;
    println!("This value of x is {}", x);

    // 直接给x赋值会报错, 此乃 "变量的不可变性"
    x = 20;
    println!("This value of x is {}", x);
}
```

输出结果

![image-20230829225727612](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230829225727612.png)

**2、让变量可变**

```rust
fn main() {
    // 添加一个mut关键字, 代表后面的变量的值是可变的, 类型是不能变的
    let mut x = 10;
    println!("This value of x is {}", x);

    // 这次就可以修改值了
    x = 20;
    println!("This value of x is {}", x);
}
```

输出结果

```bash
This value of x is 10
This value of x is 20
```

:::

::: details （3）变量的隐藏

两种写法实现的效果一样，暂未发现有什么区别

**"隐藏写法**

```rust
fn main() {
    // 定义一个变量
    let x = 5;

    // 再定义一个变量
    let x = x + 1;

    // 又定义一个变量
    let x = x * 2;

    // 输出x的值
    println!("This value of x is {}", x);		

    // 这种"重复定义变量"的行为称为 隐藏(Shadowing), 即前面的变量被隐藏了
    // 输出结果: This value of x is 12
}
```

**可变变量写法**

```rust
fn main() {
    // 定义一个可变变量
    let mut x = 5;

    // 加1
    x += 1;

    // 乘2
    x *= 2;

    // 输出x的值
    println!("This value of x is {}", x);

    // 输出结果: This value of x is 12
}
```

:::

::: details （4）常量和不可变变量

**1、常量的定义**

```rust
fn main() {
    // 使用const定义常量
    // 常量要全部大写, 否则编译器会报提醒
    // 多个单词之间使用下划线
    const TOTAL: i32 = 100;
    println!("This value of TOTAL is {}", TOTAL);
}
```

输出结果

```bash
This value of TOTAL is 100
```

**2、常量和不可变变量的区别之一：常量在编译阶段确定值，不可变变量在运行阶段确定值**

```rust
// 定义一个函数
fn get_number() -> i32 {
    return 99;
}

fn main() {
    // 运行正常
    // let total: i32 = get_number();
    // println!("This value of x is {}", total);

    // 运行报错
    const TOTAL: i32 = get_number();
    println!("This value of x is {}", TOTAL);

    // 原因就是: 常量要在编译阶段确定值, 而函数是在运行阶段计算的
}
```

输出结果

![image-20230829231511671](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230829231511671.png)

:::

<br />

## 基本数据类型

基本数据类型在Rust中被称为 **标量类型（scalar）**，主要包含：整数、浮点数、布尔值和字符

::: details （1）整数

```rust
fn main() {
    // 有符号整数, 数字代表多少位
    let x: i8 = 1;
    let y: i16 = 2;
    let z: i32 = 3;
    let m: i64 = 4;
    let n: i128 = 5;
    let i: isize = 6;

    // 无符号整数, 数字代表多少位
    let x: u8 = 1;
    let y: u16 = 2;
    let z: u32 = 3;
    let m: u64 = 4;
    let n: u128 = 5;
    let i: usize = 6;

    // 1、如果一个整数未定义类型, 那么默认是 i32
    // 2、isize和usize会根据系统位数而确定, 比如64位系统就是i64或u64
}
```

:::

::: details （2）浮点数

```rust
fn main() {
    // 定义浮点类型
    let x: f32 = 2.0;
    let y: f64 = 3.0;

    // 若未定义类型, 则默认是f64
    let z = 4.0;
}
```

:::

::: details （3）布尔类型

```rust
fn main() {
    // 定义布尔类型, 占据1个字节, 8位
    let t: bool = true;
    let f: bool = false;
}
```

:::

::: details （4）单个字符

```rust
fn main() {
    // 定义单个字符, 占据4个字节, 32位
    let x: char = 'a';
    let y: char = '中';
    let z: char = '🤥';

    // 输出结果
    println!("{}", x);
    println!("{}", y);
    println!("{}", z);
}
```

输出结果

```bash
a
中
🤥
```

:::

<br />

## 复合数据类型

 **复合数据类型（compound）**，主要包含：元组和数组

::: details （1）元组

```rust
fn main() {
    // 定义元组
    // 1、元组的长度是固定的
    // 2、元组中可以包含各种数据类型的值
    let x: (i32, char) = (65, 'A');

    // 通过解构获取值
    let (m, n) = x;
    println!("{}", m);
    println!("{}", n);

    // 通过索引获取值
    let d = x.0;
    let e = x.1;
    println!("{}", d);
    println!("{}", e);
}
```

输出结果

```bash
65
A
65
A
```

:::

::: details （2）数组

```rust
fn main() {
    // 定义数组
    // 1、数组的长度是固定的
    // 2、同一个数组中必须都是相同的数据类型
    let x: [i32; 3] = [5, 6, 7];

    // 取值
    let a = x[0];
    let b = x[1];
    println!("{}", a);
    println!("{}", b);

    // 假设定义一个占据内存32KB的数组, 看一下写法有什么不同
    let y: [i32; 8 * 1024] = [0; 8 * 1024];
    let c = y[100];
    let d = y[200];
    println!("{}", c);
    println!("{}", d);
}
```

输出结果

```bash
5
6
0
0
```

:::

::: details （3）切片

```rust
fn main() {
    // 定义一个数组
    // 1、切片是对数组的部分引用, 切片在编译阶段长度是未知的
    let arr: [i32; 5] = [1, 2, 3, 4, 5];

    // 定义一个切片, 引用数组的前第2、3、4个元素, 如果使用 .. 则代表引用所有元素
    let slice = &arr[1..4];

    // 输出
    println!("切片的长度: {}", slice.len());
    for i in slice {
        println!("{}", i);
    }
}
```

输出结果

```bash
切片的长度: 3
2
3
4
```

:::

::: details （4）结构体

```rust
// 定义一个元组结构体
struct Pair(i32, f32);

// 定义一个标准的C结构体
struct Person {
    name: String,
    age: u32,
}

// 定义一个单元结构体, 通常用在泛型中, 其他情况用的比较少
// struct Unit;

fn main() {
    // 初始化元组结构体
    let pair = Pair(100, 3.14);
    println!("{}", pair.0);

    // 初始化标准C结构体
    let jack = Person {
        name: String::from("jack"),
        age: 18,
    };
    println!("{} {}", jack.name, jack.age);

    // 初始化单元结构体, 不知道该如何使用, 所以先注释掉
    // let unit = Unit;
}
```

输出结果

```bash
100
jack 18
```

:::

::: details （5）枚举类型

```rust
use crate::Planet::Earth;

// 无参数的枚举
enum Planet {
    Mars,
    Earth,
}

// 带值的枚举
enum Color {
    Red = 0xff0000,
    Green = 0x00ff00,
    Blue = 0x0000ff,
}

// 带参数的枚举
enum IpAddr {
    IPV4(u8, u8, u8, u8),
    IPV6(u8, u8, u8, u8, u8, u8, u8, u8, u8, u8, u8, u8, u8, u8, u8, u8),
}


fn main() {
    // 上面的枚举不知道咋用

    // 枚举通常和模式匹配连用
    let localhost: IpAddr = IpAddr::IPV4(127, 0, 0, 1);
    match localhost {
        IpAddr::IPV4(a, b, c, d) => {
            println!("{} {} {} {}", a, b, c, d);
        }
        _ => {} // 非IPV4走这条路
    }
}
```

输出结果

```bash
127 0 0 1
```

:::

::: details （6）字符串：乱入，待整理，也不知道属于啥结构

```rust
fn main() {
    // 定义字符串, 注意这里是 &str
    let s: &str = "Hello World!";

    // 输出结果
    println!("{}", s);
}
```

输出结果

```bash
Hello World!
```

:::

<br />

## 流程控制语法

::: details （1）if else

```rust
fn main() {
    // 先看一段和多数语言类似的的if语句
    let n = 5;
    if n > 0 {
        println!("{} > 0", n);
    } else if n < 0 {
        println!("{} < 0", n);
    } else {
        println!("{} == 0", n);
    }

    // rust独有的if else
    // 1、if..else是一个表达式, 可以有返回值, 所以可以在前面定义变量
    // 2、if 和 else返回值的类型必须保持一致
    // 3、最后面的 ; 和 if..else没有关系, 是 let xx = xx; 中的分号
    // 4、代码量少推荐写成一行, 代码量多推荐写成多行
    let a = if n > 0 { 2 } else { 3 };
    println!("{}", a);
}
```

输出结果

```bash
5 > 0
2
```

:::

::: details （2）loop 无限循环

```rust
fn main() {
    // loop 表示无限循环
    let mut sum = 0;
    let mut end = 100;
    loop {
        if end == 0 {
            break;
        }
        sum += end;
        end -= 1;
    }
    println!("sum: {}", sum);

    // loop 中使用 break 返回值, 这里就随便写一段垃圾代码
    let result = loop {
        let i = 0;
        if i == 0 {
            break 100;
        }
    };
    println!("result: {}", result);
}
```

输出结果

```bash
sum: 5050
result: 100
```

:::
