# C++

<br />

## 文档

Clion：[https://www.jetbrains.com/clion/](https://www.jetbrains.com/clion/)

MinGW：[https://www.mingw-w64.org/](https://www.mingw-w64.org/)

<br />

## 第一个程序

::: details （1）输出 Hello World!

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

::: details （3）Clion：去掉符号表和调试信息

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

## 基本数据类型

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

## 变量常量枚举

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

















