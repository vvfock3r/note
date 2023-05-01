# Linux C 编程

<br />

## 基础语法

### 开发环境

* CLion 2023.1.1
* Arch Linux
* gcc (GCC) 12.2.1 20230201

::: details CLion 配置

1、添加SSH主机

2、运行目标设置为Linux

3、工具链设置为Linux（这一步是为了能在Windows上使用Linux API，如下图所示）

![image-20230429221412005](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230429221412005.png)

:::

<br />

### 基础语法

::: details （1）第一个程序

```c
#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    return 0;
}


// 程序解释
// #include <stdio.h>   导入头文件
// int main()           定义main函数,这是程序执行入口, int代表返回值类型
// printf               函数调用,函数来源于stdio.h
// return 0;            返回值, 0代表退出码为0
//
// 注意事项
// 1、代码后面要写分号 ;
```

:::

::: details （2）main函数完整写法

```c
#include <stdio.h>

int main(int argc, char *argv[]) {
    printf("参数个数: %d\n", argc);
    printf("参数列表:");
    for (int i = 0; i < argc; ++i) {
        printf(" %s", argv[i]);
    }
    printf("\n");

    return 0;
}

// int argc         表示传入程序的参数个数
// char *argv[]     字符串指针数组,表示传入的参数列表
```

输出结果

```bash
[root@ap-hongkang ~]# gcc -o main main.c

[root@ap-hongkang ~]# ./main a b c
参数个数: 4
参数列表: ./main a b c

[root@ap-hongkang ~]# ./main 你 好
参数个数: 3
参数列表: ./main 你 好
```

:::

::: details （3）推荐gcc编译时添加 -Wall

```c
#include <stdio.h>

int main() {
    printf(0);
    return 0;
}

// gcc -o main main.c           可以正常编译,但执行结果不正确
// gcc -Wall -o main main.c     编译会报警告,可以提早发现问题
```

输出结果

```bash
[root@archlinux ~]# gcc -o main main.c
[root@archlinux ~]# ./main

[root@archlinux ~]# gcc -Wall  -o main main.c
main.c: In function ‘main’:
main.c:4:5: warning: argument 1 null where non-null expected [-Wnonnull]
    4 |     printf(0);
      |     ^~~~~~
In file included from main.c:1:
/usr/include/stdio.h:356:12: note: in a call to function ‘printf’ declared ‘nonnull’
  356 | extern int printf (const char *__restrict __format, ...);
      |            ^~~~~~
main.c:4:5: warning: null format string [-Wformat-overflow=]
    4 |     printf(0);
      |     ^~~~~~~~~
```

:::

::: details （4）变量和常量

```c
#include <stdio.h>

// 方法1: 使用 #define 定义常量
#define PI1 3.1415926

int main() {
    // 方法2(推荐): 使用 const 定义常量
    const int PI2 = 3.1415926;

    // 定义变量
    int x = 1;
    int y = 2;
    int z = 3;

    // 定义变量的简写方式,变量类型必须相同
    int a = 1, b = 2, c = 3;

    return 0;
}
```

:::

<br />

### 函数定义

::: details （1）自定义函数

```c
#include <stdio.h>

int add(int x, int y) {
    return x + y;
}

void print(char *str) {
    printf("%s\n", str);
}

int main() {
    int z = add(1, 2);
    printf("%d\n", z);

    print("hello world!");

    return 0;
}

// 语法
// 返回值类型 函数名(参数列表)
// {
//     语句列表
// }
//
// 注意事项
// 1、不需要返回值的话使用void类型
```

输出结果

```bash
3
hello world!
```

:::

::: details （2）可变参数：方式1

```c
#include <stdio.h>

void print_ints(int num, int *args) {
    for (int i = 0; i < num; i++) {
        printf("%d ", args[i]);
    }
}

int main() {
    int nums[] = {1, 2, 3, 4, 5};
    print_ints(5, nums);
    return 0;
}

// 使用 int指针 代表可变参数
```

输出结果

```bash
1 2 3 4 5
```

:::

::: details （3）可变参数：方式2

```c
#include <stdio.h>
#include <stdarg.h>

void print_ints(int num, ...) {
    va_list args;
    va_start(args, num);

    for (int i = 0; i < num; i++) {
        int val = va_arg(args, int);
        printf("%d ", val);
    }

    va_end(args);
}

int main() {
    print_ints(5, 1, 2, 3, 4, 5);
    return 0;
}

// 使用 宏
// ... 代表可变参数
```

:::

<br />

### 逻辑语句

::: details （1）if 语句

```c
#include <stdio.h>

int main() {
    int x = 1, y = 2;
    if (x > y) {
        printf("%d > %d\n", x, y);
    } else {
        printf("%d < %d\n", x, y);
    }
    return 0;
}
```

输出结果

```bash
1 < 2
```

:::

::: details （2）switch 语句

```c
#include <stdio.h>
#include <time.h>

int main() {
    // 获取今天周几
    time_t rawtime;
    struct tm *timeinfo;
    time(&rawtime);

    timeinfo = localtime(&rawtime);
    int weekday = timeinfo->tm_wday;

    switch (weekday) {
        case 1:
            printf("周一\n");
            break;
        case 2:
            printf("周二\n");
            break;
        case 3:
            printf("周仨\n");
            break;
        case 4:
            printf("周四\n");
            break;
        case 5:
            printf("周五\n");
            break;
        case 6:
            printf("周六\n");
            break;
        default:
            printf("Unknown\n");
    }
    return 0;
}

// 语法:
// switch(控制表达式) {
//  case 常量表达式:
//      语句序列
//  case 常量表达式:
//      语句序列
//  default:
//      语句序列
// }
```

输出结果

```bash
周六
```

:::

::: details （3）while 语句

```c
#include <stdio.h>

int main() {
    int n = 1;
    while (n < 10) {
        printf("%d\n", n);
        n++;
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
```

:::

::: details （4）do/while 语句

```c
#include <stdio.h>

int main() {
    int n = 1;
    do {
        printf("%d\n", n);
        n++;
    } while (n < 10);
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
```

:::

::: details （5）for 语句

```c
#include <stdio.h>

int main() {
    for (int i = 0; i < 10; ++i) {
        printf("%d\n",i);
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
```

:::

<br />

### 结构体

::: details （1）定义和访问结构体

```c
#include <stdio.h>
#include "string.h"

// 定义结构体
struct Person {
    char name[50];
    int age;
    char address[100];
};

int main() {
    // 定义结构体变量
    // struct 结构体类型名 结构体变量名;
    struct Person persion;

    // 赋值: 方法1, 字符串赋值
    // 要确保目标字符串(即第一个参数)有足够的空间来存储源字符串(即第二个参数)的内容，以避免缓冲区溢出问题
    strcpy(persion.name, "bob");
    strcpy(persion.address, "Main Street, New York, NY 10001");

    // 赋值: 方法2
    persion.age = 18;

    // 访问
    printf("Name: %s\n", persion.name);
    printf("Age : %d\n", persion.age);
    printf("Addr : %s\n", persion.address);

    return 0;
}

// 结构体语法:
// struct [结构体名称] {
// [成员1数据类型] [成员1名称];
// [成员2数据类型] [成员2名称];
// ...
// [成员n数据类型] [成员n名称];
// };
// 
// 也可以声明变量时赋值
// struct Person persion = {"Tom", 25, "123 Main Street, New York, NY 10001"};
```

输出结果

```bash
Name: bob                             
Age : 18                              
Addr : Main Street, New York, NY 10001
```

:::

<br />

### 数组

::: details （1）定义和访问数组

```c
#include <stdio.h>

int main() {
    // 定义一个由4个元素的数组
    int count[4];

    // 修改值
    count[0] = 100;
    count[1] = 200;
    count[2] = 300;
    count[3] = 400;

    // 输出值
    for (int i = 0; i < 4; ++i) {
        printf("%d\n", count[i]);
    }

    return 0;
}

// 注意:
//  数组的所有元素类型必须相同
//  也可以定义时赋值 int count[4] = {1,2,3,4};
```

输出结果

```bash
100
200
300
400
```

:::

::: details （2）字符数组表示字符串

```c
#include <stdio.h>

int main() {
    // 定义一个长度为 100的字符数组
    char str[100] = "Hello, World!";

    // 输出值
    printf("%s\n", str);

    return 0;
}

// 注意
// 所能容纳的字符个数最大是100个
```

输出结果

```bash
Hello, World!
```

:::

::: details （3）字符指针表示字符串

```c
#include <stdio.h>

int main() {
    // 定义一个字符指针
    char *str = "Hello, World!";

    // 输出值
    printf("%s\n", str);

    return 0;
}

// 注意
// 所能容纳的字符个数不限制
```

输出结果

```bash
Hello, World!
```

:::

<br />

### 指针

::: details （1）指针定义

```c
#include <stdio.h>

int main() {
    // 定义一个int类型普通变量 x
    int x = 100;
    // 定义一个int类型指针变量 y
    int *y = &x;
    printf("%d %d\n", x, *y);
    return 0;
}
```

输出结果

```bash
100 100
```

:::

::: details （2）野指针

```c
#include <stdio.h>
#include <stddef.h>

int main() {
    // 像下面这种指向不确定地址的指针称为"野指针"(Unbound Pointer)
    int *x;

    // 为避免出现野指针,在定义指针变量时就应该给它明确的初值,或者把它初始化为NULL
    // NULL这是一个特殊的指针值，表示指针不指向任何有效的内存地址
    // NULL在C标准库的头文件stddef.h中定义
    int *y = NULL;

    printf("%d\n", *x);
    printf("%d\n", *y);

    return 0;
}
```

输出结果

```bash
-923205632
```

:::

::: details （3）指针与函数

```c
#include <stdio.h>

int *swap(int *px, int *py) {
    int temp;
    temp = *px;
    *px = *py;
    *py = temp;
    return px;
}

int main(void) {
    int x = 10, y = 20;
    int *z = swap(&x, &y);
    printf("x=%d y=%d *z=%d\n", x, y, *z);
    return 0;
}

// 注意
// 1、在函数声明或定义中，如果函数返回值是指针类型，则需要在函数名前面加上*来表示该函数返回一个指针类型的值
// 2、函数形参也是一样
```

输出结果

```bash
x=20 y=10 *z=20
```

:::

::: details （4）指针与数组

```c
#include <stdio.h>

int main(void) {
    int a[9] = {100, 208, 300};

    // 取值并++
    int va = a[0];
    va++;
    printf("%d %d\n", a[0], va);

    // 取指针并++,这会取到下一个元素的值
    int *pa = &a[0];
    pa++;
    printf("%d %d\n", a[0], *pa);

    return 0;
}
```

输出结果

```bash
100 101
100 208
```

:::

<br />

## 系统调用

### GNU扩展

<br />

## Go调用C代码
