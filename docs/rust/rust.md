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

## 基础数据类型

