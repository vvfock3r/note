# Java核心语法

## 一、环境搭建（Windows）

JDK下载：[https://www.oracle.com/java/technologies/downloads/](https://www.oracle.com/java/technologies/downloads/)

1、下载并安装`jdk-8u341-windows-x64.exe`

2、检查版本

```bash
C:\Users\Administrator>java -version  # 注意是 -version 而不是--version
java version "1.8.0_341"
Java(TM) SE Runtime Environment (build 1.8.0_341-b10)
Java HotSpot(TM) 64-Bit Server VM (build 25.341-b10, mixed mode)
```

3、配置环境变量，目的是可以正常使用`javac`命令以及其他的命令

```bash
C:\Users\Administrator>javac -version
javac 1.8.0_341
```

4、编写源文件（文件名`Main`要和类名`Main`保持一致）

`Main.java`

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello world!");
    }
}
```

5、编译`.java`文件（这会生成一个名为`Main.class`的文件）

```bash
javac Main.java
```

6、运行程序

```bash
java Main
```

:::tip IDE下载

`IntelliJ IDEA`下载地址：[https://www.jetbrains.com/idea/](https://www.jetbrains.com/idea/)

:::

## 

## 二、数据类型

### 命名规则

**标识符命名规则**

* 标识符可以由字母、数字、下划线和$组成，不能以数字开头
* 标识符严格区分大小写
* 标识符不能是Java关键字和保留字
* 标识符的命名最好能反映出其作用

**变量命名规则**

* 需要满足标识符规则
* 需要符合驼峰命名规则
* 变量名的长度没有限制
* 尽量简单，做到见名知意

**类命名规则**

* 满足`Pascal`命名规则（每个单词的首字母大写）

### 变量声明

语法：`<数据类型> <变量名> [ = 值];`

### 基本数据类型

**概览**

| 大分类 | 小分类   | 数据类型  | 说明            | 字节 |
| ------ | -------- | --------- | --------------- | ---- |
| 数值型 | 整数类型 | `byte`    | 字节型          | 1    |
|        |          | `short`   | 短整型          | 2    |
|        |          | `int`     | 整型            | 4    |
|        |          | `long`    | 长整型          | 8    |
|        | 浮点类型 | `float`   | 单精度浮点型    | 4    |
|        |          | `double`  | 双精度浮点型    | 8    |
| 字符型 |          | `char`    | 单个字符        | 2    |
| 布尔型 |          | `boolean` | `true`或`false` | 1    |

:::tip 进制

* 八进制：以0开头，包含0-7之间的数字
* 十六进制：以0x或0X开头，包含0-9和字母a-f或A-F
* 十进制：直接写数字即可

:::

::: details （1）数值型基本使用

```java
public class Main {
    // 查看数据类型
    private static String getType(Object obj) {
        return obj.getClass().toString();
    }

    public static void main(String[] args) {
        // 定义一个整型
        int n = 999;
        System.out.println(n);

        // 定义一个单精度浮点型变量，数字后面加f或F
        float f = 123.456f;
        System.out.println(f);

        // 定义一个双精度浮点型变量，数字后面加d或D
        double d = 123456d;
        System.out.println(d);

        // 默认情况下表示的是 double类型
        System.out.println(getType(123.0));
        System.out.println(getType(123.0d));
        System.out.println(getType(123.0f));

        // 将 大范围类型 赋值给 小范围类型，程序会报错
        // f = d;
    }
}
```

输出结果

```bash
999
123.456
123456.0
class java.lang.Double
class java.lang.Double
class java.lang.Float
```

:::



