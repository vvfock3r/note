# C++

<br />

## 文档整理

Clion：[https://www.jetbrains.com/clion/](https://www.jetbrains.com/clion/)

MinGW：[https://www.mingw-w64.org/](https://www.mingw-w64.org/)

Visual Studio：[https://visualstudio.microsoft.com/](https://visualstudio.microsoft.com/)

<br />

## 基础

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
    //   优先左结合, 左边没东西的话, 就会右结合
    // int const x = 10; // 左结合
    const int x = 10;    // 右结合, 一般我们都会这么写

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

```c++
#include <iostream>
#include <iomanip>
#include <sstream>

int main() {
    // 定义一个字符串输出流
    std::ostringstream oss;

    // 向oss输入内容
    oss << std::scientific << 100 * 1.0;

    // 把oss流中的内容取出来, 并输出
    std::cout << oss.str() << std::endl;

    // ---------------------------------------

    // 下面的待补充

    // 定义一个字符串输入流
    std::istringstream iss;

    // 向iss输入内容

    // 把oss流中的内容取出来, 并输出

    return 0;
}
```

:::

<br />

## 入门

### 别名

::: details （1）基本用法

```c++
#include <iostream>

int main() {
    // 定义别名: 方法一
    typedef int MyInt1;

    // 定义别名: 方法二
    using MyInt2 = int;

    // 定义变量
    MyInt1 a = 10;
    MyInt2 b = 20;

    // 和直接用 int 一模一样
    int sum = a + b;
    std::cout << sum << std::endl;

    return 0;
}
```

:::

<br />

### 函数

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

### 指针

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
    
    // 深入
    // 指针的值是内存地址，本质上是一个整数（表示内存中的某个位置）
    // 指针本身有类型，比如 int*、char*、std::string* 等，类型告诉编译器这个地址指向的数据类型和大小，决定了如何访问内存。
	// 虽然指针存的是地址（整数），但不能把它当普通整数来用，因为它带有类型信息，关系到安全和内存访问正确性


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

::: details （2）通过指针修改数据

```c++
#include <iostream>

// 定义函数, 形参是一个int类型指针
void f(int *p) {
    *p = 10; // 修改值
}

int main() {
    // 定义一个变量
    int x = 20;

    // 将变量的指针传递进去
    f(&x);

    // 输出值
    std::cout << x << std::endl;

    return 0;
}
```

输出结果

```bash
10
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

::: details （3）释放内存后要将指针设置为空指针

```c++
#include <iostream>
#include <ostream>

int main() {
    // 定义变量
    int *ptr = new int(10);

    // 释放了内存
    delete ptr;
    // ptr = nullptr; // 这里必须要加上

    // 这里 ptr 不是 nullptr，if 条件成立
    if (ptr) {
        //*ptr = 42;  // 但指向的内存已经释放，危险！
        std::cout << "1" << std::endl;
    } else {
        std::cout << "2" << std::endl;
    }


    return 0;
}
```

:::

::: details （4）野指针

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

### 数组

::: details （1）数组基本用法

```c++
#include <iostream>
#include <sstream>

int main() {
    // 定义一个int数组, 元素个数为9, 当不指定个数时会自动推断, 即 array[] = { ... }
    // 注意: 不支持使用负数下标访问
    int array[9] = {1, 2, 3, 4, 5, 6, 7, 8, 9};

    // 计算最大值
    int max = 0;
    int size = sizeof(array) / sizeof(array[0]);
    for (int i = 0; i < size; i++) {
        if (array[i] > max) {
            max = array[i];
        }
    }

    // 优化for循环
    // int max = 0;
    // for (int i : array) {
    //     if (i > max) {
    //         max = i;
    //     }
    // }

    std::cout << max << std::endl;

    return 0;
}
```

:::

::: details （2）数组赋值给指针

```c++
#include <iostream>

void f(int *p) {
    *p = 10;
}

int main() {
    // 定义一个int数组
    int a[] = {1, 2, 3, 4, 5, 6, 7, 8, 9};

    // 定义一个int指针
    int *p = a;

    // 让我们输出看一下
    // 指针存储的是数组的第一个元素的地址
    std::cout << a << ", " << sizeof(a) << std::endl;
    std::cout << p << ", " << sizeof(p) << std::endl;

    // 通过指针p来获取数组所有数据, 用法就和使用a[i]一样
    int size = sizeof(a) / sizeof(a[0]); // 计算数组长度, 因为指针是不记录数据长度的
    for (int i = 0; i < size; i++) {
        std::cout << p[i] << std::endl;
    }

    return 0;
}
```

输出结果

```bash
0x32ce1ff9d0, 36
0x32ce1ff9d0, 8
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

::: details （3）数组拷贝

```c++
#include <iostream>

void copy1(int *dst, int *src, const int *src_end) {
    for (int *p = src; p < src_end; p++) {
        *dst++ = *p;
    }
}

void copy2(int *dst, const int *src, const int n) {
    for (int i = 0; i < n; i++) {
        dst[i] = src[i];
    }
}


// 完美的写法
void copy(int *dst, const int *src, const int *src_end) {
    // 如果相等直接返回
    if (src == dst) {
        return;
    }

    // 计算长度
    auto n = src_end - src;
    if (dst > src) {
        for (auto i = n - 1; i >= 0; i--) {
            dst[i] = src[i];
        }
    } else {
        for (int i = 0; i < n; i++) {
            dst[i] = src[i];
        }
    }
}


int main() {
    // 定义一个int数组
    int a[] = {1, 2, 3};


    // 第一种方法
    int b[] = {4, 5, 6};
    copy1(b, a, a + 3); // 写 a+3 也是可以的
    for (int i: b) {
        std::cout << i << std::endl;
    }

    // 第二种方法
    int c[] = {4, 5, 6};
    copy2(c, a, 3);
    for (int i: c) {
        std::cout << i << std::endl;
    }

    // 总结
    // C++中一般 dst写在前面, src写再后面
    // 指针相见返回的是long long类型, 代表其中的元素个数
    // 拷贝数组时要考虑元素顺序的问题, 是从前往后拷, 还是从后往前拷

    return 0;
}
```

输出结果

```bash
1
2
3
1
2
3
```

:::

::: details （4）字符数组

```c++
#include <iostream>

int main() {
    char name[6] = {'A', 'l', 'i', 'c', 'e', '\0'};  // 手动加上 \0

    std::cout << "名字是：" << name << std::endl;  // 正确输出：Alice

    return 0;
}
```

输出结果

```bash
Alice
```

:::

<br />

### 动态内存分配

::: details （1）malloc 和 free

```c++
#include <iostream>

int main() {
    // 语法:
    //  申请内存
    //      函数原型: void* malloc(size_t size);
    //      函数参数： size_t 要分配的字节数
    //      函数返回: 分配成功：返回一块大小为 size 的内存首地址，类型为 void*，需要强制类型转换
    //               分配失败：返回 nullptr（C 中是 NULL）
    //  释放内存：free(内存地址)

    // 分配一个能存 5 个 int 的空间
    int *arr = (int *) malloc(5 * sizeof(int));

    // 判断申请失败的情况下
    if (arr == nullptr) {
        std::cerr << "Memory allocation failed!\n";
        return 1;
    }

    // 写入数据, 并输出
    for (int i = 0; i < 5; ++i) {
        arr[i] = i * 10;
        std::cout << arr[i] << std::endl;
    }

    // 释放内存
    free(arr);

    return 0;
}
```

输出结果

```bash
0
10
20
30
40
```

:::

::: details （2）new 和 delete (推荐)

```c++
#include <iostream>

int main() {
    // 语法:
    //  申请内存
    //      说明
    //          new 是一个 运算符，不是普通的函数，因此它没有像 malloc 那样的标准函数原型。
    //          但它的行为是通过 重载的全局 operator new 函数 实现的
    //      返回值
    //          返回值类型是指定类型的指针（不需要强制类型转换）
    //          如果分配失败，会抛出 std::bad_alloc 异常, 所以不需要手动检查返回值是否为 nullptr
    //  释放内存
    //      delete 用于释放 new 分配的单个对象,
    //      delete[] 用于释放 new[] 分配的数组

    // 分配 5 个 int 的数组
    int *arr = new int[5];

    // 写入数据并输出
    for (int i = 0; i < 5; ++i) {
        arr[i] = i * 10;
        std::cout << arr[i] << std::endl;
    }

    // 释放内存
    delete []arr;

    // 别忘记将指针设置空指针, 这样做是为了避免悬空指针
    arr = nullptr;

    return 0;
}
```

输出结果

```bash
0
10
20
30
40
```

:::

<br />

### 指针数组和数组指针

指针数组是一个数组，它的每个元素都是指针，这个指针可以是任何类型

::: details （1）指针数组

```c++
int main() {
    // 指针数组： p是含有9个元素的数组, 每个元素类型是 int*
    int *p[9]; // 声明变量
    p[0] = new int(3); // 第一个指针指向: 一个int类型内存地址
    p[1] = new int[4]; // 第二个指针指向: 一个int数组内存地址, 该数据可以包含4个int数据

    return 0;
}
```

:::

<br />

## 工程化

### 头文件

::: details （1）头文件示例：头文件、体文件、main函数都在项目根目录下

`add.h`

```c++
#ifndef ADD_H
#define ADD_H
int Add(int a, int b);
#endif //ADD_H
```

`add.cpp`

```c++
int Add(int a, int b) {
    return a + b;
}
```

`main.cpp`

```c++
#include <iostream>
#include "add.h"

int main() {
    std::cout << Add(1, 2) << std::endl;

    return 0;
}
```

:::

<br />

### 命名空间

::: details （1）定义自己的命名空间，并在里面定义Add函数

`add.h`

```c++
#ifndef ADD_H
#define ADD_H

namespace my {
    int Add(int a, int b);
}

#endif //ADD_H
```

`add.cpp`

```c++
#include "add.h"

int my::Add(int a, int b) {
    return a + b;
}
```

`main.cpp`

```c++
#include <iostream>
#include "add.h"

int main() {
    std::cout << my::Add(1, 2) << std::endl;

    return 0;
}
```

:::
