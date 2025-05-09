# C++

<br />

## 文档整理

Clion：[https://www.jetbrains.com/clion/](https://www.jetbrains.com/clion/)

MinGW：[https://www.mingw-w64.org/](https://www.mingw-w64.org/)

<br />

## 先混一个脸熟

### 第一个程序

::: details （1）常规写法：输出 Hello World!

```c++
#include <iostream>

int main() {
    std::cout << "Hello World!" << std::endl;
    std::cout << "你好世界!\n";
    return 0;
}

// 代码解释
// #include 用来导入头文件, <iostream>代表 input和output流, 即标准输入流和标准输出流
// main函数是程序入口, int表示函数返回值是整数类型, 0 表示程序正常结束
// std 是 C++ 标准命名空间，标准库的所有组件（如容器类、算法、输入输出流等）都被组织在 std 命名空间中
// std::cout 表示调用std命名空间中的cout对象, cout是标准输出流对象，用来输出数据到控制台，<< 是插入操作符，用于将数据输出到流中
// std::endl 是一个操控符，用来换行并刷新输出缓冲区, "\n" 也是换行符，作用和 std::endl 相似，但没有刷新缓冲区的功能
// cout和endl都定义在iostream头文件中
// return 0 表示程序正常结束，操作系统通过返回值判断程序的执行状态，0 通常表示成功
```

输出结果

```bash
Hello World!
你好世界!
```

:::

::: details （2）Clion：解决不能显示中文问题

**1.确保文件编码为UTF-8，同时注意：文件的右下角编码也应该显示为UTF-8**

![image-20250401202918138](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20250401202918138.png)

**2.设置不勾选 run.processes.with.pty**

> 按两次Shift， 输入Registry, 选择Registry...，点击Key, 让它自动按字母排序

![image-20250401203149065](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20250401203149065.png)



:::

::: details （3）另一种写法：输出 Hello World!

```c++
#include <iostream>
using namespace std;

int main() {
    // 显示指定使用std命名空间后, 可以直接使用 cout等对象
    cout << "Hello World!" << endl;

    // 当然继续使用 std::cout也是可以的
    std::cout << "你好世界!\n";

    // 需要注意的是, 如果定义一个字符串，不管是否显示指定使用std命名空间, 都要使用std::string
    std::string str = "你好世界!";
    cout << str << endl;

    return 0;
}
```

输出结果

```bash
Hello World!
你好世界!
你好世界!
```

:::

::: details （4）Clion：去掉符号表和调试信息

> 修改 CMakeLists.txt文件

```cma
cmake_minimum_required(VERSION 3.30)
project(test)

# 强制设置使用C++20标准
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 去掉符号表(-s)和调试信息(-g0)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s -g0")

add_executable(test main.cpp)
```

:::

<br />

### 基本数据类型

**基本数据类型**

| 数据类型 | 说明                                      | 大小 (字节)                                       | 范围（假设 32 位或 64 位平台                              |
| -------- | ----------------------------------------- | ------------------------------------------------- | --------------------------------------------------------- |
| bool     | 用于存储布尔值                            | 1                                                 | true 或 false                                             |
| char     | 存储单个ASCII字符，表示字符或小范围的整数 | -128 到 127 或 0 到 255<br />（取决于是否有符号） | -128 到 127 或 0 到 255（取决于是否有符号）               |
| int      | 存储标准整数                              | 4                                                 | -2,147,483,648 到 2,147,483,647                           |
| float    | 存储单精度浮点数                          | 4                                                 | 大约 -3.4E38 到 +3.4E38，<br />精度大约 6-7 位十进制数字  |
| double   | 存储双精度浮点数                          | 8                                                 | 大约 -1.7E308 到 +1.7E308，<br />精度大约 15 位十进制数字 |
| long     | 存储较大整数                              | 32 位系统为 4 字节，64 位系统为 8 字节            | -2,147,483,648 到 2,147,483,647 或更大                    |
| wchar_t  | 可表示宽字符，通常用于存储 Unicode 字符   | 存储宽字符，平台相关，通常 2 字节或 4 字节        | -                                                         |
| void     | 用于表示无返回值或空指针类型              | 没有实际的大小                                    | -                                                         |

**类型修饰符**

| 修饰符    | 描述                            | 示例          |
| --------- | ------------------------------- | ------------- |
| signed    | 表示带符号类型（默认）          | signed int    |
| unsigned  | 表示无符号类型，仅正数和零      | unsigned int  |
| short     | 表示短整型，通常占用 2 字节     | short int     |
| long      | 表示长整型，通常占用 4 字节     | long int      |
| long long | 表示更长的整型，通常占用 8 字节 | long long int |

::: details （1）查看类型大小和范围

```c++
#include <iostream>
#include <limits>
#include <iomanip>

int main() {
    std::cout << std::right << std::setw(25) << "Size of char: "
              << std::left << sizeof(char) << " byte(s)\n";

    std::cout << std::right << std::setw(25) << "Range of char: "
              << std::left << (int)std::numeric_limits<char>::min() << " to "
              << (int)std::numeric_limits<char>::max() << std::endl;

    std::cout << std::right << std::setw(25) << "Size of short: "
              << std::left << sizeof(short) << " byte(s)\n";

    std::cout << std::right << std::setw(25) << "Range of short: "
              << std::left << std::numeric_limits<short>::min() << " to "
              << std::numeric_limits<short>::max() << std::endl;

    std::cout << std::right << std::setw(25) << "Size of int: "
              << std::left << sizeof(int) << " byte(s)\n";

    std::cout << std::right << std::setw(25) << "Range of int: "
              << std::left << std::numeric_limits<int>::min() << " to "
              << std::numeric_limits<int>::max() << std::endl;

    std::cout << std::right << std::setw(25) << "Size of long: "
              << std::left << sizeof(long) << " byte(s)\n";

    std::cout << std::right << std::setw(25) << "Range of long: "
              << std::left << std::numeric_limits<long>::min() << " to "
              << std::numeric_limits<long>::max() << std::endl;

    std::cout << std::right << std::setw(25) << "Size of long long: "
              << std::left << sizeof(long long) << " byte(s)\n";

    std::cout << std::right << std::setw(25) << "Range of long long: "
              << std::left << std::numeric_limits<long long>::min() << " to "
              << std::numeric_limits<long long>::max() << std::endl;

    std::cout << std::right << std::setw(25) << "Size of float: "
              << std::left << sizeof(float) << " byte(s)\n";

    std::cout << std::right << std::setw(25) << "Range of float: "
              << std::left << std::numeric_limits<float>::min() << " to "
              << std::numeric_limits<float>::max() << std::endl;

    std::cout << std::right << std::setw(25) << "Size of double: "
              << std::left << sizeof(double) << " byte(s)\n";

    std::cout << std::right << std::setw(25) << "Range of double: "
              << std::left << std::numeric_limits<double>::min() << " to "
              << std::numeric_limits<double>::max() << std::endl;

    std::cout << std::right << std::setw(25) << "Size of long double: "
              << std::left << sizeof(long double) << " byte(s)\n";

    std::cout << std::right << std::setw(25) << "Range of long double: "
              << std::left << std::numeric_limits<long double>::min() << " to "
              << std::numeric_limits<long double>::max() << std::endl;

    std::cout << std::right << std::setw(25) << "Size of bool: "
              << std::left << sizeof(bool) << " byte(s)\n";

    std::cout << std::right << std::setw(25) << "Range of bool: "
              << std::left << "true or false" << std::endl;

    std::cout << std::right << std::setw(25) << "Size of wchar_t: "
              << std::left << sizeof(wchar_t) << " byte(s)\n";

    return 0;
}
```

输出结果

```bash
           Size of char: 1 byte(s)
          Range of char: -128 to 127
          Size of short: 2 byte(s)
         Range of short: -32768 to 32767
            Size of int: 4 byte(s)
           Range of int: -2147483648 to 2147483647
           Size of long: 4 byte(s)
          Range of long: -2147483648 to 2147483647
      Size of long long: 8 byte(s)
     Range of long long: -9223372036854775808 to 9223372036854775807
          Size of float: 4 byte(s)
         Range of float: 1.17549e-38 to 3.40282e+38
         Size of double: 8 byte(s)
        Range of double: 2.22507e-308 to 1.79769e+308
    Size of long double: 16 byte(s)
   Range of long double: 3.3621e-4932 to 1.18973e+4932
           Size of bool: 1 byte(s)
          Range of bool: true or false
        Size of wchar_t: 2 byte(s)
```

:::

::: details （2）注意类型问题

```c++
#include <iostream>

int main() {
    // 计算一年有多少秒
    long long int x = 365 * 24 * 60 * 60;
    std::cout << x << std::endl;;


    // 上面代码可以正常编译, 但是是有问题的
    // 365、24、60、60 默认是 int 类型, 由于所有操作数都是 int，计算结果也是 int，
    // 计算完成后，结果被隐式转换为 long long int类型，并赋值给变量 x


    // 如果我们稍微修改下, 计算结果是-1944854528, 明显就不对了
    long long int y = 365 * 24 * 60 * 60 * 1000000;
    std::cout << y << std::endl;;


    // 怎么修正呢? 去掉隐式类型转换, 在整数后添加LL, 表示long long修饰符
    long long int z = 365LL * 24 * 60 * 60 * 1000000;
    std::cout << z << std::endl;;

    return 0;
}

```

输出结果

```bash
31536000
-1944854528
31536000000000
```

:::

<br />

### 变量常量枚举

::: details （1）作用域

```c++
#include <iostream>

// 全局作用域不可以初初始化变量以外的对变量的操作
int a = 1;
int b = 2;
int c = a + b; // 这个可以
// int d;
// d = a + b;  // 这个是不被允许的

int main() {
    // {}会开辟一个局部作用域 或者叫做 临时作用域
    {
        const int z = a + b;
        std::cout << z << std::endl; // 这里写没问题
    }
    // std::cout << z << std::endl; // 在这里输出会报错, 因为变量在一个局部作用域内

    return 0;
}
```

:::

::: details （2）变量

```c++
#include <iostream>

int main() {
    // 变量注意事项
    // 全局变量未初始化的行为: 自动初始化为零值
    // 局部变量未初始化的行为: 其值是未定义的（可能是随机的垃圾值）,所以一定要避免这种情况

    return 0;
}
```

:::

::: details （3）常量

```c++
#include <iostream>

// 3.#define 是一个预处理指令，用于在程序编译之前定义宏常量。
// 这种方式不占用内存，它在代码中直接替换为定义的值
// #define定义的常量不具备类型信息, 所以在定义时不需要写类型, 编译器会根据上下文推断类型
#define PI 3.1415926


int main() {
    // 1.const 用于声明一个常量，它可以修饰任何基本数据类型、指针或引用
    const int x = 10;

    // 2.constexpr 用于定义编译时常量，这意味着编译器可以在编译期间计算常量的值。
    // 它比 const 更严格，因为它要求常量的值在编译时就可以确定
    constexpr int y = 20;

    // 输出常量的值
    std::cout << x << std::endl;
    std::cout << y << std::endl;
    std::cout << PI << std::endl;

    return 0;
}
```

:::

::: details （4）枚举类型：弱枚举类型 enum

```c++
#include <iostream>

// 使用 enum 定义枚举类型
// enum 的值从 0 开始，依次递增（Monday = 0, Tuesday = 1, ...）
// 如果想指定起始值, 可以设置 Monday = 1, 后面的会依次递增
// 枚举类型的值必须是整数类型, 可以是 （如 int、unsigned int、long 等）
// enum 是作用域不受限的，如果存在同名变量可能会有命名冲突
enum Weekday {
    Monday,     // 0
    Tuesday,    // 1
    Wednesday,  // 2
    Thursday,   // 3
    Friday,     // 4
    Saturday,   // 5
    Sunday      // 6
};

int main() {
    // 定义today变量为 Weekday 类型, 值为 Friday, 注意 Friday 这里是全局的对象
    Weekday today = Friday;
    std::cout << today << std::endl; // 输出 4

    // 如果想让定义的变量不能被修改, 加上常量修饰符
    const Weekday Yestoday = Thursday;

    // 可以与 int 类型运算, 
    int x = 10;
    std::cout << today + x << std::endl;
    std::cout << Yestoday + x << std::endl;

    // 但是不能这样写 today = today - x;
    // 原因是
    //  enum 允许隐式转换为 int，但运算后变成了 int，不能直接赋值回 enum
    //  解决办法是 使用 static_cast<Weekday>() 强制转换回 Weekday 类型
    today = static_cast<Weekday>(today - x);
    std::cout << today << std::endl;

    return 0;
}
```

输出结果

```bash
4
14
13
-6
```

:::

::: details （5）枚举类型：强类型枚举 enum class

```c++
#include <iostream>

// enum class 定义强枚举类型
// 默认类型为 int， 也可以指定类型为 unsigned int或者其他int类型
// enum class定义的枚举类型是一种新的类型, 不会隐式转换 int, 不能直接直接与 int 类型计算, 需要 static_cast<int>(today) 进行转换
// enum class 作用域受限，需要使用 Weekday::Friday 访问成员，避免命名冲突
// 推荐这种方法定义枚举类型
enum class Weekday : unsigned int {
    Monday = 1,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
};

int main() {
    // 初始化枚举类型, 可以看到不能直接使用Friday, 因为它已经不是全局的对象了
    Weekday today = Weekday::Friday;

    // 不能直接输出, 需要先转为int类型
    std::cout << static_cast<int>(today) << std::endl; // 输出 5
    return 0;
}
```

:::

<br />

### 基本运算注意

**运算符说明**

| 运算符               | 说明                   | 示例 |
| -------------------- | ---------------------- | ---- |
| +、-、*、/、%        | 加、减、乘、除、取模   |      |
| &&、\|\|、!          | 逻辑与、逻辑或、逻辑非 |      |
| 表达式 ? 真值 : 假值 | 三元表达式             |      |

::: details （1）除法注意事项

```c++
#include <iostream>

int main() {
    // 定义变量
    int a = 5;

    // 问题1: 除以2, 得到几?
    // 这里会输出2, 因为 5 / 2, 5和2都是int类型, 计算结果也一定是int类型, 小数部分舍去, 得到2
    std::cout << a / 2 << std::endl;

    // 方法1: 如果想得到2.5, 那么需要将任意一个数转为浮点型, 计算时会进行隐式类型转换, 都转为float, 结果也是float
    std::cout << a / 2.0 << std::endl;

    // 方法2: 显示类型转换, 将两个数都调整为浮点数, static_cast用于数据类型转换
    std::cout << static_cast<float>(a) / 2.0 << std::endl;

    // ----------------------------------------------------------------------------------------------
    // 问题2: 下面的计算结果是几?
    // 结果还是2, 虽然定义了b为float类型, 但是先计算右边的, 得到一个int, 此时值已经是2了, b虽是float类型, 但是值是2
    // 可以使用 std::cout << b / 3 << std::endl; 来验证b是float类型
    float b = a / 2;
    std::cout << b << std::endl;

    return 0;
}
```

输出结果

```bash
2
2.5
2.5
2
```

:::

::: details （2）四舍五入

```c++
#include <iostream>
#include <cmath>

int main() {
    // 定义变量
    float a = 1.2;
    float b = 1.8;

    // 如何进行四舍五入呢?
    // 方法1: 都加上0.5, 然后转为int类型
    std::cout << "四舍五入: " << static_cast<int>(a + 0.5) << std::endl;
    std::cout << "四舍五入: " << static_cast<int>(b + 0.5) << std::endl;

    // 方法2: 使用cmath进行四舍五入(推荐)
    // std::round   返回值类型与输入值类型相同
    // std::lround  返回整数类型
    // std::llround 返回long long int类型
    // 其他类似函数 std::rint、std::nearbyint
    std::cout << "四舍五入: " << std::round(a) << std::endl;
    std::cout << "四舍五入: " << std::round(b) << std::endl;

    // 向下取整
    std::cout << "向下取整: " << std::floor(a) << std::endl;
    std::cout << "向下取整: " << std::floor(b) << std::endl;

    // 向上取整
    std::cout << "向上取整: " << std::ceil(a) << std::endl;
    std::cout << "向上取整: " << std::ceil(b) << std::endl;

    // 截断取整, 截断小数, 保留整数
    std::cout << "截断取整: " << std::trunc(a) << std::endl;
    std::cout << "截断取整: " << std::trunc(b) << std::endl;

    return 0;
}
```

输出结果

```bash
四舍五入: 1
四舍五入: 2
四舍五入: 1
四舍五入: 2
向下取整: 1
向下取整: 1
向上取整: 2
向上取整: 2
截断取整: 1
截断取整: 1
```

:::

::: details （3）大小写字母转换

```c++
#include <iostream>

int main() {
    // 定义一个字符类型, 必须用单引号, 双引号代表的是字符串
    char x = 'r';

    // 想要取得他的大写形式, 如何做呢?
    // 为什么这么写呢? 这是根据ASCII表推到得到, 大小写字符差距是32
    x -= 32;
    std::cout << x << std::endl;

    // 更直观一点的写法
    char y = 'r';
    y -= 'a' - 'A';
    std::cout << y << std::endl;

    return 0;
}
```

:::

<br />

### 循环控制语句

::: details （1）while 语句，没啥好说的

```c++
#include <iostream>

int main() {
    int x = 0;
    while (true) {
        std::cout << x << std::endl;
        x += 1;
        if (x > 9) {
            break;
        }
    }
    return 0;
}
```

输出结果

```bash
0
1
2
3
4
5
6
7
8
9
```

:::

::: details （2）for 语句，很重要

```c++
#include <iostream>

int main() {
    // 语法
    // for (初始化循环变量; 循环保持条件; 循环变量变化){
    // }

    // 第一种写法, 简直是顺手就来
    for (int x = 0; x < 3; x++) {
        std::cout << x << std::endl;
    }

    // 第二种写法, 最后一个语句可以省略, 一般用的比较少
    for (int x = 0; x < 3;) {
        std::cout << x << std::endl;
        x++;
    }

    // 问题1: 下面会有输出吗?
    for (int x = 0; x == 0; x++) {
        std::cout << "问题1: " << x << std::endl;
    }

    // 问题2: 下面会有输出吗?
    for (int x = 5; x == 6; x++) {
        std::cout << "问题2: " << x << std::endl;
    }

    return 0;
}
```

输出结果

```bash
0
1
2
0
1
2
问题1: 0
```

:::

<br />

### 指针基础学习

::: details （1）基本用法

```c++
#include <iostream>


int main() {
    // 定义一个变量
    int x = 100;

    // 输出指针, 他是一个整数, 固定占用4个字节, 指向p的值在内存中的地址
    std::cout << &x << std::endl;

    // 如果定义指针类型, 那么这样写
    // ptr是指针类型, 存储的是一个整数, 注意它不是整数类型
    int *ptr = &x;
    std::cout << ptr << std::endl;

    // 通过指针获取存储的值
    std::cout << *ptr << std::endl;

    // 当然, 也可以修改值
    *ptr = 200;
    std::cout << *ptr << std::endl;
    std::cout << x << std::endl;

    // 总结
    // & 取地址运算符：获取变量的内存地址
    // * 解引用运算符：访问指针指向的值

    return 0;
}
```

输出结果

```bash
0x86c2fffe64
0x86c2fffe64
100
200
200
```

:::

::: details （2）空指针

```c++
#include <iostream>


int main() {
    // 这样定义是错误的，指针初始化时一定要有值
    // int* py;       // 未初始化指针（危险！）
    // *py = 5;       // 未定义行为，可能崩溃
    // std::cout << py << std::endl;

    // 定义一个空指针
    // 空指针用于明确表示未指向任何对象或内存
    int *ptr = nullptr;
    std::cout << ptr << std::endl;

    // 判断指针是否是空指针
    if (ptr) {
        // 但是需要注意, 在我们的代码中这里执行正常
        // 但是有一种可能 ptr指向已经释放的内存, if判断会通过, 所以下面可能会有问题
        *ptr = 42;
    } else {
        std::cout << "指针为空，不能解引用！";
    }

    return 0;
}
```

输出结果

```bash
0
指针为空，不能解引用！
```

:::

::: details （3）野指针

```c++
#include <iostream>

int *getPointer() {
    int x = 10; // 局部变量
    return &x; // ⚠️ 返回局部变量地址（野指针）
}

int main() {
    // 野指针（Dangling Pointer）是指向无效内存或已释放内存的指针
    // 以下是几个常见的野指针示例

    // 示例1: 未初始化指针（指向随机地址）
    int *ptr1; // ⚠️ 未初始化，可能指向随机地址（野指针）
    std::cout << "野指针地址: " << ptr1 << std::endl;

    // 示例 2：使用已释放的指针
    int *ptr2 = new int(42);
    delete ptr2; // 释放内存
    std::cout << *ptr2 << std::endl; // ⚠️ 访问已释放内存（野指针）

    // 示例 3：返回局部变量的地址
    int *ptr3 = getPointer();
    std::cout << *ptr3 << std::endl; // ❌ 未定义行为

    // 示例 4：数组越界访问
    int arr[3] = {1, 2, 3};
    int *ptr4 = arr + 10; // ⚠️ 超出数组范围，可能是野指针
    std::cout << *ptr4 << std::endl; // ❌ 未定义行为


    // 方式1修正方法: 初始化为空指针
    // int* ptr1 = nullptr;

    // 方式2修正方法: 释放指针后, 将指针设置为空指针
    // delete ptr2;
    // ptr2 = nullptr;

    // 方式3修正方法: 使用静态变量
    // static int x = 10;
    // return &x;

    // 方式4修正方法: 确保指针在合法范围内
    // if (ptr4 >= arr && ptr4 < arr + 3) {
    //     std::cout << *ptr4 << std::endl;
    // }

    return 0;
}
```

:::

<br />

### 格式化输出

::: details （1）iomanip：简介、对齐、填充

```c++
#include <iostream>
#include <iomanip>


int main() {
    // 说明
    // iomanip 侧重于数字类型的格式化操作, 部分函数也支持字符串
    // 需要在输出值前设置样式，注意代码顺序问题
    // 部分样式代码是全局的, 比如第一段代码设置左对齐, 第二段代码自动会左对齐, 已知的有
    //   左右对齐
    //   字符填充
    //   科学计数法

    // 设置字符宽度, 默认右对齐
    std::cout << std::setw(50) << "Hello World!" << std::endl;

    // 设置左右对齐, left 左对齐, right 右对齐
    std::cout << std::setw(50) << std::left << "Hello World!" << std::endl;

    // 设置填充, 默认空格
    std::cout << std::setw(50) << std::setfill('_') << "Hello World!" << std::endl;

    // 处理带符号数字的对齐方式
    std::cout << std::setw(50) << std::internal << -99 << std::endl;

    return 0;
}
```

输出结果

```bash
                                      Hello World!
Hello World!                                      
Hello World!______________________________________
-_______________________________________________99
```

:::

::: details （2）iomanip：小数位数、显示+号、科学计数法

```c++
#include <iostream>
#include <iomanip>


int main() {
    // 默认情况下显示几位小数并不确定
    std::cout << 10 / 3.0 << std::endl << std::endl;

    // 设置保留小数位数
    // std::setprecision(2) 设置浮点数精度(保留小数位数), 但是单独用这个并不好使
    // std::fixed           固定小数点格式, 这两个配合使用, 完美
    std::cout << std::setprecision(2) << 10 / 3.0 << std::endl;
    std::cout << std::setprecision(2) << 5.00 << std::endl;
    std::cout << std::fixed << std::setprecision(2) << 10 / 3.0 << std::endl;
    std::cout << std::fixed << std::setprecision(2) << 5 << std::endl << std::endl;

    // 这个没测试出来, 基本也不用管, 后面会告诉原因和解决办法
    std::cout << std::showpoint << std::fixed << std::setprecision(2) << 3.0 << std::endl;
    std::cout << std::noshowpoint << 3.0 << std::endl << std::endl;

    // 科学计数法, 只针对浮点数有效
    std::cout << std::scientific << 100000000000000 * 1.0 << std::endl << std::endl;

    // 整数显示+号
    std::cout << std::showpos << 10.0 << std::endl;

    return 0;
}
```

输出结果

```bash
3.33333

3.3
5
3.33
5

3.00
3.00

1.00e+14

+1.00e+01
```

:::

::: details （3）std::cout是一个"状态流"，它是全局共享对象（单例），它会记住你对它设置的样式，直到你手动改变或者重置它或者程序结束

```c++
#include <iostream>
#include <iomanip>
#include <sstream>

int main() {
    // 设置科学计数法, 只针对浮点数有效
    std::cout << std::scientific << 100 * 1.0 << std::endl;

    // 方法1: 取消科学计数法样式
    // 这种方法的弊端就是需要知道设置的每种样式的默认样式是什么, 比较麻烦
    std::cout << std::defaultfloat << 100 * 1.0 << std::endl;

    // -----------------------------------------------------------

    // // 设置科学计数法, 只针对浮点数有效
    // std::cout << std::scientific << 100 * 1.0 << std::endl;
    //
    // // 方法2: 手动清除
    // std::cout.unsetf(std::ios::scientific);
    //
    // std::cout << 100 * 1.0 << std::endl;

    // -----------------------------------------------------------

    // // 方法3: 先保存cout状态, 再修改, 再恢复状态
    // std::ios oldState(nullptr);
    // oldState.copyfmt(std::cout); // 保存状态
    //
    // // 设置科学计数法, 只针对浮点数有效
    // std::cout << std::scientific << 100 * 1.0 << std::endl;
    //
    // // 恢复状态
    // std::cout.copyfmt(oldState);
    //
    // std::cout << 100 * 1.0 << std::endl;

    // -----------------------------------------------------------
    // // 方法4: 不使用全局的std::cout
    //
    // // 定义一个字符串输出流
    // std::ostringstream oss;
    //
    // // 向oss输入内容
    // oss << std::scientific << 100 * 1.0;
    //
    // // 把oss流中的内容取出来, 并输出
    // std::cout << oss.str() << std::endl;
    //
    // // 测试全局的std::cout
    // std::cout << 100 * 1.0 << std::endl;

    return 0;
}
```

:::

::: details （4）

:::

<br />

## 函数重点讲解

### 基本用法

::: details （1）基本用法

```c++
#include <iostream>

// 定义一个函数, 函数名左侧是返回值类型
// 如果函数无返回值, 使用 void
// 如果函数应该有返回值, 但是忘记写返回值, 会返回一个垃圾数值, 一定要避免
int Add(int x, int y) {
    return x + y;
}

int main() {
    // 调用函数
    std::cout << Add(1, 2) << std::endl;

    return 0;
}
```

输出结果

```bash
3
```

:::

::: details （2）函数内部的 static 变量修饰符

```c++
#include <iostream>

// static修饰符
int Add(int x, int y) {
    // 定义一个变量, 记录函数的调用次数, 并输出
    // 使用static修饰符, 就是告诉编译器, 此变量只需要初始化一次,
    // 不要每次调用这个函数都初始化被static修饰的变量
    static int count = 0;
    count += 1;
    std::cout << count << std::endl;

    return x + y;
}

int main() {
    // 循环调用函数
    for (int i = 1; i <= 10; i++) {
        Add(1, 2);
    }

    return 0;
}
```

输出结果

```bash
1
2
3
4
5
6
7
8
9
10
```

:::

::: details （3）函数重载：允许相同的函数名具有不同的形参

```c++
#include <iostream>

int Add(int a, int b) {
    std::cout << "Add-2 execute" << std::endl;
    return a + b;
}

int Add(int a, int b, int c) {
    std::cout << "Add-3 execute" << std::endl;
    return a + b + c;
}

int main() {
    std::cout << Add(1, 2) << std::endl;
    std::cout << Add(1, 2, 3) << std::endl;
    return 0;
}
```

输出结果

```bash
Add-2 execute
3
Add-3 execute
6
```

:::

::: details （4）带默认值的参数：与其他语言一样的写法，不再叙述

:::

::: details （5）不定长参数

:::

<br />

## 必备的库文件

### random

`<random>` 的结构大致可以分为三类：

* 随机数引擎
* 分布器
* 种子源/工具

::: details （1）随机数示例

```c++
#include <iostream>
#include <random>
#include <chrono>

// 随机数平台推荐 mt19937

int main() {
    // 初始化随机数种子, 固定种子, 结果固定
    // std::mt19937 prng(42);

    // 初始化随机数种子, 运行时变化
    std::mt19937 prng(std::chrono::steady_clock::now().time_since_epoch().count());

    /*
     *  prng 是一个变量, 代表的是 mt19937实例对象
    */

    // 定义一个均匀分布器，生成 1 到 100 之间的整数, 注意是包含1和100的
    std::uniform_int_distribution<int> int_dist(1, 100);

    // 生成并输出一个随机整数: 分布器(随机数引擎)
    int number = int_dist(prng);
    std::cout << number << std::endl;

    // 生成多个随机数
    for (int i = 0; i < 9; ++i) {
        int n = int_dist(prng);
        std::cout << n << std::endl;
    }
}
```

输出结果

```bash
96
20
26
33
47
9
7
25
98
38
```

:::

::: details （2）正态分布：随机距离均值越远概率越小

![image-20250510135846538](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20250510135846538.png)

```c++
#include <iostream>
#include <random>
#include <chrono>

int main() {
    // 初始化随机数种子, 运行时变化
    std::mt19937 prng(std::chrono::steady_clock::now().time_since_epoch().count());

    /* 正态分布: 下面的代码是 均值为0，标准差为1的正态分布随机数
     * 关于范围
     *      正态分布是一个连续概率分布，其理论上没有固定的范围，因为它的值可以是任何实数（从负无穷到正无穷）
     *      然而，绝大多数的样本将会集中在均值附近，且随着距离均值的增大，生成的随机数的概率会迅速减少
     *      在实际应用中，通常可以使用68-95-99.7规则来估计正态分布的范围
     *          68%的样本会落在均值±1倍标准差范围内（即 -1 到 +1）
     *          95%的样本会落在均值±2倍标准差范围内（即 -2 到 +2
     *          99.7%的样本会落在均值±3倍标准差范围内（即 -3 到 +3）
     *          对于 normal_dist(0.0, 1.0)，大部分生成的随机数会位于 -3 到 +3 之间，但仍然有可能生成更远离均值的数值
    */
    std::normal_distribution<double> normal_dist(0.0, 1.0);


    // 生成多个随机数
    for (int i = 0; i < 9; ++i) {
        double n = normal_dist(prng);
        std::cout << n << std::endl;
    }
}
```

输出结果

```bash
0.720939
0.142195
0.0793346
-0.0617685
0.92558
0.7241
-1.08853
1.81012
0.502112
```

:::

::: details （3）伯努利分布：真假概率

```c++
#include <iostream>
#include <random>
#include <chrono>

int main() {
    // 初始化随机数种子, 运行时变化
    std::mt19937 prng(std::chrono::steady_clock::now().time_since_epoch().count());

    /* 伯努利分布: 生成二元值（0 或 1），模拟成功或失败事件的概率，适用于简单的二项式实验
     * 返回的布尔类型 ture 和 false
     * 下面的代码意思是: 1 的出现概率为 10%，0 的出现概率为 90%
     * 总结一下: 为真的概率是10%, false的概率为90%
    */
    std::bernoulli_distribution bernoulli_dist(0.1);


    // 生成多个随机数
    for (int i = 0; i < 9; ++i) {
        bool ok = bernoulli_dist(prng);
        std::cout << ok << std::endl;
    }
}
```

输出结果

```bash
0
0
0
0
0
0
1
0
0
```

:::

::: details （4）离散概率分布：每个元素有自己的权重

```c++
#include <iostream>
#include <random>
#include <chrono>

int main() {
    // 初始化随机数种子, 运行时变化
    std::mt19937 prng(std::chrono::steady_clock::now().time_since_epoch().count());

    /* 离散概率分布: 根据用户提供的每个元素的权重, 筛选出一个值(数字)
     * {70, 20, 10} 代表的意思是:
     *      第一个值的权重是 70,
     *      第二个值的权重是 20,
     *      第三个值的权重是 10,
     * 为了方便计算, 我们约定所有权重加起来是100, 方便计算
     * 返回的值是列表的索引(整数), 代表哪个权重被命中了
    */
    std::discrete_distribution<int> discrete_dist({70, 20, 10});

    // 自定义值, 对应上面的权限
    std::vector<int> values = {100, 200, 300};

    // 生成多个随机数
    for (int i = 0; i < 9; ++i) {
        int n = discrete_dist(prng);
        std::cout << n << " => " << values[n] << std::endl;
    }
}
```

输出结果

```bash
1 => 200
2 => 300
0 => 100
1 => 200
0 => 100
0 => 100
0 => 100
0 => 100
0 => 100
```

:::

::: details （5）指数分布：用于模拟事件发生的时间间隔的概率分布，短间隔常见，长间隔罕见

备注：这个到底有啥优势？

```c++
#include <iostream>
#include <random>
#include <chrono>

int main() {
    // 初始化随机数种子, 运行时变化
    std::mt19937 prng(std::chrono::steady_clock::now().time_since_epoch().count());

    /* 指数分布
     * 基础解释
     *      λ = 1, 代表的是速率，指的是单位时间内平均发生1次事件, 单位时间可以自由设定它的含义, 比如 1秒、1分钟、1小时等
     *      返回值代表多少个单位时间
     * 核心思想
     *      下一个事件会在多久之后发生, 广泛用于模拟两个事件之间的等待时间
     * 数值大小
     *      λ 越大，行为越频繁
     *      指数分布生成的值总是非负的
     *      λ参数必须为正数
     *      样本量越大，统计结果越接近理论值
    */
    std::exponential_distribution<double> exp_dist(1);

    // 生成多个随机数
    for (int i = 0; i < 9; ++i) {
        double n = exp_dist(prng);
        std::cout << n << std::endl;
    }
}
```

输出结果

```bash
0.255131
2.43
0.945206
0.578676
0.362824
0.747569
3.97356
2.45116
0.142744
```

:::

::: details （6）卡方分布：应用：检验骰子是否作弊

```c++
#include <iostream>
#include <random>
#include <vector>
#include <cmath>

// 模拟投掷骰子（n次，返回各点数出现次数）
std::vector<int> rollDice(int n, bool isCheat) {
    std::mt19937 gen(std::random_device{}());
    std::discrete_distribution<> dist;
    if (isCheat) {
        // 作弊骰子：点数6的概率是其他的两倍
        std::vector<double> weights{1, 1, 1, 1, 1, 2};
        dist = std::discrete_distribution<>(weights.begin(), weights.end());
    } else {
        // 公平骰子
        dist = std::discrete_distribution<>({1, 1, 1, 1, 1, 1});
    }

    std::vector<int> counts(6, 0);
    for (int i = 0; i < n; ++i) counts[dist(gen)]++;
    return counts;
}

// 卡方检验（返回卡方统计量）
double chiSquareTest(const std::vector<int> &observed) {
    double expected = std::accumulate(observed.begin(), observed.end(), 0.0) / observed.size();
    double chi2 = 0.0;
    for (int obs: observed) {
        chi2 += std::pow(obs - expected, 2) / expected;
    }
    return chi2;
}

int main() {
    // 模拟公平骰子和作弊骰子各600次
    auto fair_counts = rollDice(600, false);
    auto cheat_counts = rollDice(600, true);

    // 计算卡方值
    double fair_chi2 = chiSquareTest(fair_counts);
    double cheat_chi2 = chiSquareTest(cheat_counts);

    std::cout << "公平骰子的卡方值: " << fair_chi2 << "（应接近0）\n";
    std::cout << "作弊骰子的卡方值: " << cheat_chi2 << "（应明显偏大）\n";

    // 查卡方分布表（自由度=5，显著性0.05的临界值≈11.07）
    if (cheat_chi2 > 11.07) {
        std::cout << "检测到作弊！\n";
    } else {
        std::cout << "未检测到作弊。\n";
    }
    return 0;
}
```

输出结果

```bash
公平骰子的卡方值: 1.34（应接近0）
作弊骰子的卡方值: 55.12（应明显偏大）
检测到作弊！
```

:::

学生 t 分布

F 分布

魏布尔分布

<br />
