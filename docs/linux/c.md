# Linux C编程

<br />

## 基础语法

### 环境

* CLion 2023.1.1
* Arch Linux
* gcc (GCC) 12.2.1 20230201

<br />

### 基础

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

### 函数



<br />

## 系统调用
