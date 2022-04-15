## 环境设置

### 环境设置

**查看/设置环境变量**

```bash
go env 						# 查看所有环境变量
go env -json				# 查看所有环境变量，json格式
go env [environment]		# 查看某个具体的环境变量
go env -w GO111MODULE=on	# 设置环境变量，永久生效
go help env					# 查看env命令帮助
```

**重要环境变量**

| 环境变量      | 说明                                                         | 设置命令                                      |
| ------------- | ------------------------------------------------------------ | --------------------------------------------- |
| `GOROOT`      | Go的安装目录                                                 | 一般不用自己设置                              |
| `GOPATH`      | 代表Go的工作区，可以是一个目录，也可以是多个目录，使用逗号分隔?<br />官方说明文档：https://github.com/golang/go/wiki/GOPATH | 可以不用改，如果要修改到系统环境变量中修改    |
| `GO111MODULE` | Go 1.11版本增加的模块管理机制，建议开启                      | `go env -w GO111MODULE=on`                    |
| `GOPROXY`     | 代理地址<br />默认：https://proxy.golang.org,direct<br />七牛云：https://goproxy.cn,direct | `go env -w GOPROXY=https://goproxy.cn,direct` |



### 示例程序

```go
package main
 
import "fmt"
 
func main() {
   fmt.Println("Hello World!")
}
```

说明

- `package`声明我自己的包名；`import` 导入其他包；`func `声明函数

- 程序执行的入口必须是`main`包和`main`方法，文件名任意

- 两种运行方式

  ```bash
  # (1) 编译和运行
  go build main.go        # 编译
  ./main.exe              # 运行
  
  # (2) 编译并运行
  go run main.go
  ```



## 前置知识

### 声明关键字

| 关键字  | 说明     |
| ------- | -------- |
| `var`   | 声明变量 |
| `const` | 声明常量 |
| `func`  | 声明函数 |
| `type`  | 声明类型 |

### 变量和常量

**声明变量并赋值**

::: details 点击查看完整代码

```go
package main

import "fmt"

func main() {
	// 声明单个变量
	//	语法1：var 变量名 变量类型 = 变量值	-- 推荐使用
	//	语法2：变量名 := 变量值			-- 推荐使用,但仅支持在函数内部使用
	var Monday int = 1
	Tuesday := 2

	// 声明多个变量
	// 语法1:
	//		var (                                   -- 推荐使用
	//			变量名1 变量类型 = 变量值
	//			变量名2 变量类型 = 变量值
	//		)
	// 语法2: var 变量名1,变量名2 变量类型 = 变量值1, 变量值2
	var (
		Wednesday int = 3
		Thursday  int = 4
	)

	var Friday, Saturday, Sunday int = 5, 6, 7

	// 函数内声明的变量必须要使用，否则编译会报错；函数外的变量可以声明但不使用
	fmt.Println("周一: ", Monday)
	fmt.Println("周二: ", Tuesday)
	fmt.Println("周三: ", Wednesday)
	fmt.Println("周四: ", Thursday)
	fmt.Println("周五: ", Friday)
	fmt.Println("周六: ", Saturday)
	fmt.Println("周日: ", Sunday)
}
```

:::

输出结果

```bash
周一:  1
周二:  2
周三:  3
周四:  4
周五:  5
周六:  6
周日:  7
```

<br />

**声明变量不赋值**

```go
package main

import "fmt"

func main() {
	// 声明不赋值,默认会使用该类型的零值
	var Monday int

	fmt.Println(Monday) // 0
}
```

<br />

**声明常量**

常量使用`const`关键字声明，与`var`用法很类似，这里主要演示一下特殊的地方

::: details 点击查看完整代码

```go
package main

import "fmt"

func main() {        
	// 方式1
	const (
		Monday  int = 4
		Tuesday     // 在同一个括号内，若变量值不写，则保持跟距离最近的一个变量 类型和值一样
	)

	// 方式2
	const (
		Wednesday = iota + 3 // iota初始为0,  0 + 3 = 3
		Thursday             // 每新增一行iota自增长１, 1 + 3 = 4
		Friday               //  同理, 2 + 3 =5
		Saturday
		Sunday
	)

	fmt.Println("周一: ", Monday)
	fmt.Println("周二: ", Tuesday)
	fmt.Println("周三: ", Wednesday)
	fmt.Println("周四: ", Thursday)
	fmt.Println("周五: ", Friday)
	fmt.Println("周六: ", Saturday)
	fmt.Println("周日: ", Sunday)
}
```

:::

输出结果

```bash
周一:  4
周二:  4
周三:  3
周四:  4
周五:  5
周六:  6
周日:  7
```

### 指针

指针的值是变量的内存地址，使用指针可以在无需知道变量名字的情况下，间接读取或更新变量的值

指针类型的零值是nil

指针是可以比较的，当两个指针指向同一个变量或两个指针都为nil的时他们才相等

```go
package main

import "fmt"

func main() {
	// (1) 通过变量获取指针
	name := "Bob"     // 声明变量
	namePtr := &name  // 获取这个变量的指针赋值给 namePtr
	*namePtr = "Jack" // 通过指针获取变量，并给这个变量赋值

	fmt.Println(name)     // Jack
	fmt.Println(*namePtr) // Jack

	// (2) 直接声明指针并赋值
	var a *string = namePtr
	fmt.Println(*a) // Jack

	// (3) 直接声明空指针,后续赋值会引发panic, 原因是并没有进行内存分配,导致无法赋值
	var b *int
	fmt.Println(b) // <nil>, 指针类型的零值为nil, 这是一个空指针
	//fmt.Println(*b) // 这会报错, 因为我们自己手动这样创建的指针类型,还没有进行内存分配,解决办法可以使用new和make

	// (4) 对于值类型数据结构,使用new声明和分配内存并返回指针变量
	c := new(int)
	*c = 200
	fmt.Println(*c)

	// (5) 对与引用数据结构,使用make声明和分配内存并返回变量(注意返回的不是指针,因为引用类型就没有必要用指针了)
	s1 := make([]int, 1, 2)
	s1[0] = 300
	fmt.Println(s1)        // [300]
	fmt.Printf("%T\n", s1) // []int
}
```



### print系列函数

文档：[https://pkg.go.dev/fmt](https://pkg.go.dev/fmt)

| 分类           | 函数                                  | 说明                            |
| -------------- | ------------------------------------- | ------------------------------- |
| 输出到控制台   | `fmt.Print(string)`                   | 不换行                          |
|                | `fmt.Println(string)`                 | 自动换行，`ln`意为`line`        |
|                | `fmt.Printf(格式化字符, 字符串)`      | 格式化输出                      |
| 作为返回值返回 | `fmt.Sprint()`                        |                                 |
|                | `fmt.Sprintln()`                      |                                 |
|                | `fmt.Sprintf(格式化字符, 字符串对象)` |                                 |
| 接收用户输入   | `fmt.Scan(指针对象)`                  | 将控制台接收的值 赋值给指针对象 |

`printf`格式化字符串

| 分类       | 修饰符       | 说明                                                         |
| ---------- | ------------ | ------------------------------------------------------------ |
| 常用       | `%T`         | 数据类型                                                     |
|            | `%v`         | 获取数据的值，如果实现了 `error `接口，仅表示错误消息        |
|            | `%+v`        | 获取数据的值，如果是结构体会携带字段名                       |
|            | `%#v`        | 获取数据的值，如果是结构体会携带结构体名和字段名             |
| 指针       | `%p`         | 指针地址（带 `0x`）                                          |
|            | `%#p`        | 指针地址（不带 `0x`）                                        |
| 字符串     | `%s`         | 字符串或字节切片                                             |
|            | `%c`         | Unicode码点对应的字符                                        |
|            | `%q`         | 对于字符串或字节切片，结果会加上双引号；<br />对于`byte`或`rune，`结果会加上单引号 |
| 字符串宽度 | `%5s`        | 最小宽度为5（默认右对齐）                                    |
|            | `%-5s`       | 最小宽度为5（左对齐）                                        |
|            | `%.5s`       | 最大宽度为5，多出部分会截断                                  |
|            | `%5.7s`      | 最小宽度为5，最大宽度为7                                     |
|            | `%-5.7s`     | 最小宽度为5，最大宽度为7（左对齐）                           |
|            | `%5.3s`      | 如果宽度大于3，则截断                                        |
|            | `%05s`       | 如果宽度小于5，就会在字符串前面补零                          |
| 整型       | `%b`         | 二进制数                                                     |
|            | `%o`         | 八进制数                                                     |
|            | `%#o`        | 八进制数                                                     |
|            | `%d`         | 十进制数                                                     |
|            | `%x`         | 打印16进制数，a-f                                            |
|            | `%X`         | 打印16进制数，A-F                                            |
|            | `%#x`、`%#X` | 打印16进制数，带`0x`、`0X`                                   |
|            | `% x`、`% X` | 打印16进制数，前面带一个空格                                 |
| 浮点数     | `%f`         | 浮点数, 默认保留6位小数，即`%.6`                             |
|            | `%e`         | 科学计数法，默认保留6位小数，即`%.6e`                        |
| 指针       | `%p`         | 指针，十六进制表示，带前缀`0x`                               |
|            | `%#p`        | 指针，十六进制表示，不带前缀`0x`                             |
| 布尔值     | `%t`         | 打印`true`或`false`                                          |

::: details 点击查看完整代码

```go
package main

import "fmt"

type Person struct {
	Name string
	Age  int
}

func main() {
	person := Person{Name: "Bob", Age: 20}
	numbers := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}

	// 常用类型
	fmt.Printf("%T\n", person)
	fmt.Printf("%v\n", person)
	fmt.Printf("%+v\n", person)
	fmt.Printf("%#v\n", person)
	//main.Person
	//{Bob 20}
	//{Name:Bob Age:20}
	//main.Person{Name:"Bob", Age:20}

	// 指针类型，值类型需要使用&获取指针地址，引用类型加不加&都可以
	fmt.Printf("%p, %p\n", &person, numbers)
	fmt.Printf("%#p, %#p\n", &person, &numbers)
	//0xc000004078, 0xc0000161e0
	//c000004078, c0000161e0

	// 字符串
	fmt.Printf("%s, %s\n", "北京", []byte("北京"))
	fmt.Printf("%#x\n", []rune("北京")[0]) // 0x5317, 字符串 -> unicode -> 16进制
	fmt.Printf("%c\n", 0x5317)
	fmt.Printf("%q, %q, %q\n", "北京", []byte("北京"), 0x5317)
	//北京, 北京
	//0x5317
	//北
	//"北京", "北京", '北'

	// 字符串宽度
	fmt.Printf("%5s\n", "ABC")
	fmt.Printf("%-5s\n", "ABC")
	fmt.Printf("%.5s\n", "ABCDEF")
	fmt.Printf("%5.3s\n", "ABCDEF")
	//ABC
	//ABC
	//ABCDE
	//ABC

	// 整型
	fmt.Printf("%b\n", 3)
	fmt.Printf("%o\n", 9)
	fmt.Printf("%#o\n", 9)
	fmt.Printf("%x\n", 15)
	fmt.Printf("%X\n", 15)
	fmt.Printf("%X\n", 15)
	fmt.Printf("%#x\n", 15)
	fmt.Printf("%#X\n", 15)
	fmt.Printf("% X\n", 15)
	//11
	//11
	//011
	//f
	//F
	//F
	//0xf
	//0XF
	// F

	// 	浮点数
	fmt.Printf("%.2f\n", 2.985)                     // 并非四舍五入
	fmt.Printf("%.2f\n", 2.986)                     // 也不是完全舍去小数
	fmt.Printf("%f\n", 3.3333333333333333333333333) // 默认保留六位小数
	fmt.Printf("%f\n", 3.0)                         // 默认保留六位小数，即%.06
	fmt.Printf("%e\n", 123456.789)                  // 科学计数法， 默认为%.6e；计算方法为：123456.789 = 1.23456789 * 10^5 = 1.23456789e5，又因为是保留6位小数，所以1.234568

	// 指针
	a := 1
	fmt.Printf("%p\n", &a)
	fmt.Printf("%#p\n", &a)
	//0xc0000181c0
	//c0000181c0

	// 布尔值
	fmt.Printf("%t\n", 1 > 2)
	// false
}
```

:::

### 算术运算符

| 运算符 | 说明                                                         |
| ------ | ------------------------------------------------------------ |
| +      | 加                                                           |
| -      | 减                                                           |
| *      | 乘                                                           |
| /      | 除，<br />整数相除会舍弃小数部分，比如`10 /3 = 3`,  <br />有任意一个是浮点数结果就是浮点数，比如`10 / 3.0 = 3.3333333333333335` |
| %      | 取余，值的符号和除数符号保持一致<br />`10 % 3 = 1`<br />`10 % -3 = 1`<br />`-10 % 3 = -1` |
| ++     | 支持i++，但不支持++i                                         |
| \--    | 同++                                                         |

示例代码

::: details 点击查看完整代码

```go
package main

import "fmt"

func main() {
	fmt.Println(1 + 1)           // 2
	fmt.Println(1 - 1)           // 0
	fmt.Println(2 * 2)           // 4
	fmt.Println(3 / 2)           // 1, 整数相除会舍弃小数部分
	fmt.Println(10 / 3.0)        // 3.3333333333333335
	fmt.Println(10 / float32(3)) // 3.3333333
	fmt.Println(10 / float64(3)) // 3.3333333333333335, 默认的浮点数是float64
	fmt.Println(10 % 3)          // 1
	fmt.Println(-10 % 3)         // -1
	fmt.Println(10 % -3)         // 1

	i := 1
	// 下面使用都会报语法错误， i++是一条语句，不是表达式，没有返回值
	//j := i++
	//fmt.Println(i++)
	i++
	fmt.Println(i) // 2
}
```

:::

### 循环语句

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
)

func main() {
	// ------------------------- 基础语法 --------------------------------
	// C语言风格循环
	for i := 0; i < 3; i++ {
		fmt.Println(i)
	}

	// range循环
	list := []int{3, 4, 5}
	for k, v := range list {
		fmt.Printf("%#v[%d]=%d\n", list, k, v)
	}

	// 类似while
	n := 6
	for n <= 8 {
		fmt.Println(n)
		n++
	}

	// 死循环
	//for {
	//	fmt.Println(time.Now())
	//}

	// ------------------------- 陷阱 --------------------------------
	fmt.Println("\n陷阱代码：")
	data1 := []int{100, 200, 300}
	data2 := []*int{}
	for _, v := range data1 {
		data2 = append(data2, &v)
	}

	for _, v := range data2 {
		fmt.Println(*v) // 输出3个300
	}
	// 原因
	// v是一个临时变量，每次循环并不重新分配内存地址，而是仅改值而已，
	// 这就导致当最后一次循环完成后，v的值被重置为300

	// ------------------------- 解决 --------------------------------
	fmt.Println("\n修正代码-方式1：")
	data3 := []*int{}
	for k, _ := range data1 {
		data3 = append(data3, &data1[k]) // 通过key来获取原始数据data1中的地址
	}

	for _, v := range data3 {
		fmt.Println(*v) // 输出100 200 300
	}

	fmt.Println("\n修正代码-方式2：")
	data4 := []*int{}
	for _, v := range data1 {
		temp := v //使用新变量，每次循环都会重新开辟内存空间
		data4 = append(data4, &temp)
	}

	for _, v := range data4 {
		fmt.Println(*v) // 输出100 200 300
	}
}
```

:::

输出结果

```bash
0
1                  
2                  
[]int{3, 4, 5}[0]=3
[]int{3, 4, 5}[1]=4
[]int{3, 4, 5}[2]=5
6                  
7                  
8                  
                   
陷阱代码：         
300                
300                
300                
                   
修正代码-方式1：   
100                
200                
300                
                   
修正代码-方式2：   
100                
200                
300      
```

### 判断语句

::: details 点击查看完整代码

```go
package main

import "fmt"

func main() {
	// if判断
	fmt.Println("if判断")
	a := 100
	b := 200
	if x, y := a, b; x < y {
		fmt.Printf("%d < %d\n", x, y)
	}

	// switch
	fmt.Println("\nswitch判断")
	for i := 0; i < 5; i++ {
		switch i {
		case 0, 2:
			fmt.Println(i, "0-2")
		case 1, 3:
			fmt.Println(i, "1-3")
		default:
			fmt.Println(i, "Default")
		}
	}

	fmt.Println("\nswitch-fallthrough判断")
	c := 100
	switch c {
	case 50:
		fmt.Println("50")
	case 100:
		fmt.Println("100")
		fallthrough // 遇到fallthrough，会继续执行代码后面的case， default不执行
	case 200:
		fmt.Println("200")
	case 300:
		fmt.Println("300")
	default:
		fmt.Println("Default")
	}
}
```

:::

输出结果

```bash
if判断
100 < 200             
                      
switch判断            
0 0-2                 
1 1-3                 
2 0-2                 
3 1-3                 
4 Default             
                      
switch-fallthrough判断
100                   
200
```

## 

## 数据类型

### 数字

**数字类型**

| 分类       | 关键字    |
| ---------- | --------- |
| 有符号整数 | `int8`    |
|            | `int16`   |
|            | `int32`   |
|            | `int64`   |
| 无符号整数 | `uint8`   |
|            | `uint16`  |
|            | `uint32`  |
|            | `uint64`  |
| 浮点数     | `float32` |
|            | `float64` |

**查看各类型取值范围**

取值范围计算：

（1）有符号整数: -2的(n-1)次方 ~ (2的(n-1)次方 -1)，因为第一位表示符号位，实际位数为n-1，同时正数中0代表一个数字，所以正数取值范围要-1

（2）无符号整数: 0 ~ (2的n次方-1)

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"math"
	"strconv"
)

func main() {
	// 计算系统位数(32 or 64)
	fmt.Printf("当前操作系统位数: %d\n", strconv.IntSize)

	// 有符号整数
	fmt.Println("\n有符号整数")
	fmt.Printf("int8 取值范围: %20d ~ %-d\n", math.MinInt8, math.MaxInt8)
	fmt.Printf("int16取值范围: %20d ~ %-d\n", math.MinInt16, math.MaxInt16)
	fmt.Printf("int32取值范围: %20d ~ %-d\n", math.MinInt32, math.MaxInt32)
	fmt.Printf("int64取值范围: %20d ~ %-d\n", math.MinInt64, math.MaxInt64)
	fmt.Printf("int  取值范围: %20d ~ %-d\n", math.MinInt, math.MaxInt)

	// 无符号整数
	fmt.Println("\n无符号整数")
	fmt.Printf("uint8  取值范围: %d ~ %-d\n", 0, math.MaxUint8)
	fmt.Printf("uint16 取值范围: %d ~ %-d\n", 0, math.MaxUint16)
	fmt.Printf("uint32 取值范围: %d ~ %-d\n", 0, math.MaxUint32)
	fmt.Printf("uint64 取值范围: %d ~ %-d\n", 0, uint64(math.MaxUint64)) // 这里需要转为uint64
	fmt.Printf("uint   取值范围: %d ~ %-d\n", 0, uint64(math.MaxUint))   // 这里需要转为uint64

	// 浮点数
	fmt.Println("\n浮点数")
	fmt.Printf("float32 取值范围: %10.1e ~ %-10.1e\n", math.SmallestNonzeroFloat32, math.MaxFloat32)
	fmt.Printf("float64 取值范围: %10.1e ~ %-10.1e\n", math.SmallestNonzeroFloat64, math.MaxFloat64)
}
```

:::

输出结果

```bash
当前操作系统位数: 64

有符号整数                                               
int8 取值范围:                 -128 ~ 127                
int16取值范围:               -32768 ~ 32767              
int32取值范围:          -2147483648 ~ 2147483647         
int64取值范围: -9223372036854775808 ~ 9223372036854775807
int  取值范围: -9223372036854775808 ~ 9223372036854775807
                                                         
无符号整数                                               
uint8  取值范围: 0 ~ 255                                 
uint16 取值范围: 0 ~ 65535                               
uint32 取值范围: 0 ~ 4294967295                          
uint64 取值范围: 0 ~ 18446744073709551615                
uint   取值范围: 0 ~ 18446744073709551615                
                                                         
浮点数                                                   
float32 取值范围:    1.4e-45 ~ 3.4e+38                   
float64 取值范围:   4.9e-324 ~ 1.8e+308
```

### 字符串相关

#### **三种类型声明**

::: details 点击查看完整代码

```go
package main

import "fmt"

func main() {
	// 字符串声明
	var s1 string = "\"hello\" world!" // (1) 方法1：使用双引号，如果字符串也包含双引号则需要转义
	var s2 string = `"hello" world!`   // (2) 方法2：使用反引号，不需要转义，支持多行字符串
	fmt.Printf("%s\n", s1)
	fmt.Printf("%s\n", s2)

	// 字节声明
	var b1 byte = 'a'      // 使用单引号声明
	var b2 uint8 = 'b'     // byte的本质就是uint8, 代表一个ASCII字符，无法表示中文
	fmt.Printf("%c\n", b1) // 可以使用%c或%q，不能使用%s
	fmt.Printf("%q\n", b2)

	// 字符声明
	var r1 rune = '中'  // 使用单引号声明
	var r2 int32 = '国' // rune的本质就是int32, 代表一个Unicode字符，除了能表示ASCII还能表示中文
	fmt.Printf("%c\n", r1)
	fmt.Printf("%q\n", r2) // 可以使用%c或%q，不能使用%s
}
```

:::

输出结果

```bash
"hello" world!
"hello" world!
a             
'b'           
中            
'国'
```

#### 字符串的本质

字符串的本质就是字节数组

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"unicode/utf8"
)

func main() {
	// 字符串定义
	s1 := "北京欢迎你"
	fmt.Printf("        字符串: %-s\n", s1)

	// ------------------------------------------------------------------

	// 计算字符串长度
	fmt.Printf("计算字符串长度: %d\n", len(s1))            // 15
	fmt.Printf("  计算字节长度: %d\n", len([]byte(s1)))   // 15
	fmt.Printf("  计算rune长度: %d\n", len([]rune(s1))) // 5
	fmt.Printf("  计算rune长度: %d\n", utf8.RuneCountInString(s1)) // 5
    
	// ------------------------------------------------------------------

	// 按照字节遍历 - 遍历出来是乱码
	for i := 0; i < len(s1); i++ {
		fmt.Printf("string[%d]=%c\n", i, s1[i])
	}

	// 按照字节数组遍历 - 遍历出来是乱码，和上面的结果是一样的
	s2 := []byte(s1)
	for i := 0; i < len(s2); i++ {
		fmt.Printf("string[%d]=%c\n", i, s2[i])
	}
	// 使用range遍历 - 下标具有不确定性
	for index, value := range s1 {
		fmt.Printf("string[%d]=%c\n", index, value)
	}

	// 使用rune遍历 - 完美
	s3 := []rune(s1)
	for i := 0; i < len(s3); i++ {
		fmt.Printf("string[%d]=%c\n", i, s3[i])
	}
}
```

:::

输出结果

```bash
        字符串: 北京欢迎你
计算字符串长度: 15
  计算字节长度: 15
  计算rune长度: 5 
  计算rune长度: 5 

中间乱码省略...

string[0]=北
string[3]=京
string[6]=欢
string[9]=迎
string[12]=你
string[0]=北
string[1]=京
string[2]=欢
string[3]=迎
string[4]=你
```

#### strings包

官方文档：[https://pkg.go.dev/strings](https://pkg.go.dev/strings)

中文文档：[https://studygolang.com/static/pkgdoc/pkg/strings.htm](https://studygolang.com/static/pkgdoc/pkg/strings.htm)



常用函数

| 分类       | 函数                                                | 说明                                                         |
| ---------- | --------------------------------------------------- | ------------------------------------------------------------ |
| 字符串相等 | `func EqualFold(s, t string) bool`                  | 判断两个`UTF-8`字符串是否相等，不区分大小写                  |
| 前后缀判断 | `func HasPrefix(s, prefix string) bool`             | 判断`s`是否有前缀字符串`prefix`                              |
|            | `func HasSuffix(s, suffix string) bool`             | 判断`s`是否有后缀字符串`suffix `                             |
| 字符串包含 | `func Contains(s, substr string) bool`              | 判断字符串`s`是否包含子串`substr`                            |
|            | `func ContainsRune(s string, r rune) bool`          | 判断字符串s是否包含`utf-8`码值`r`                            |
|            | `func ContainsAny(s, chars string) bool`            | 判断字符串s是否包含字符串`chars`中的任一字符                 |
| 大小写     | `func ToLower(s string) string`                     | 返回将所有字母都转为对应的小写版本的拷贝                     |
|            | `func ToUpper(s string) string`                     | 返回将所有字母都转为对应的大写版本的拷贝                     |
| 清除       | `func Trim(s string, cutset string) string`         | 返回将s前后端所有`cutset`包含的`utf-8`码值都去掉的字符串     |
|            | `func TrimSpace(s string) string`                   | 返回将s前后端所有空白都去掉的字符串                          |
|            | `func TrimFunc(s string, f func(rune) bool) string` | 返回将s前后端所有满足`f`的`unicode`码值都去掉的字符串        |
| 分割       | `func Split(s, sep string) []string`                | 以`sep`作为分割符分割字符串直接末尾，<br />如果`sep`为空则返回每个`Unicode`码点 |
|            | `func SplitN(s, sep string, n int) []string`        | 同`Split`，参数`n`决定返回的切片的数目<br />`n` == 0，返回`nil`（空切片零值）<br />`n` > 0 返回的切片最多n个子字符串；最后一个子字符串包含未进行切割的部分<br />`n` < 0 : 返回所有的子字符串组成的切片 |
|            | `func SplitAfter(s, sep string) []string`           | 同`Split`，只是会保留分隔符                                  |
|            |                                                     |                                                              |
| 连接       | `func Join(a []string, sep string) string`          | 将一系列字符串连接为一个字符串，之间用sep来分隔              |

示例代码

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"strings"
	"unicode"
)

func main() {
	// 字符串相等判断
	fmt.Println("字符串相等判断")
	fmt.Println(strings.EqualFold("go", "GO")) // true, 不区分大小写
	fmt.Println("go" == "GO")                  // false, 区分大小写

	// 字符串前后缀匹配
	fmt.Println("\n字符串前后缀匹配")
	fmt.Println(strings.HasPrefix("hello", "he"))
	fmt.Println(strings.HasPrefix("hello", " he"))

	// 字符串包含匹配
	fmt.Println("\n字符串包含匹配")
	fmt.Println(strings.Contains("hello", "ell"))
	fmt.Println(strings.ContainsRune("中华人民共和国", '人'))
	fmt.Println(strings.ContainsAny("中华人民共和国", "你是哪里的人啊？"))

	// 大小写转换
	fmt.Println("\n大小写转换")
	fmt.Println(strings.ToLower("Hello")) // hello

	// 清除
	fmt.Println("\n清除")
	fmt.Println(strings.Trim("hello world!", "l!"))                       // hello world, !被清除了，说明并没有将l!作为一个整体
	fmt.Println(strings.Trim("@!hello world!", "!@"))                     // hello world, 再次测试一下，验证成功
	fmt.Println(strings.TrimSpace(" 	hello world "))                      // 清除两侧的空白
	fmt.Println(strings.TrimFunc(" hello world HAHA", func(r rune) bool { // 清除两侧的空白和大写字母
		return unicode.IsSpace(r) || unicode.IsUpper(r)
	}))

	// 分割
	fmt.Println("\n分割")
	fmt.Printf("%q\n", strings.Split("a,b,c", ","))     // ["a" "b" "c"]
	fmt.Printf("%q\n", strings.Split("aab", "a"))       // ["" "" "b"]
	fmt.Printf("%q\n", strings.Split("a b c", ""))      // ["a" " " "b" " " "c"]
	fmt.Printf("%q\n", strings.SplitN("a b c", "1", 2)) // 参数n决定返回的切片的数目

	// 连接
	fmt.Println("\n连接")
	fmt.Println(strings.Join([]string{"hello", "world", "!"}, " "))
}
```

:::

输出结果

```bash
字符串相等判断
true            
false           
                
字符串前后缀匹配
true            
false           
                
字符串包含匹配  
true            
true            
true            
                
大小写转换      
hello           
                
清除            
hello world     
hello world     
hello world     
hello world     
                
分割            
["a" "b" "c"]   
["" "" "b"]     
["a" " " "b" " " "c"]
["a b c"]

连接
hello world !
```

#### bytes包

官方文档：[https://pkg.go.dev/bytes](https://pkg.go.dev/bytes)

中文文档：[https://studygolang.com/static/pkgdoc/pkg/bytes.htm](https://studygolang.com/static/pkgdoc/pkg/bytes.htm)

bytes包实现了操作`[]byte`的常用函数，与`string`包函数类似，简单介绍几个方法

| 分类     | 函数                               | 说明                                                         |
| -------- | ---------------------------------- | ------------------------------------------------------------ |
| 相等判断 | `func Equal(a, b []byte) bool`     | 判断两个切片的内容是否完全相同                               |
|          | `func EqualFold(s, t []byte) bool` | 判断两个`utf-8`编码切片（将unicode大写、小写、标题三种格式字符视为相同）是否相同 |
| 转换     | `func Runes(s []byte) []rune`      | 返回和s等价的[]rune切片                                      |

```go
package main

import (
	"bytes"
	"fmt"
)

func main() {
	// 字节切片相等判断
	fmt.Println("字节切片相等判断")
	fmt.Println(bytes.Equal([]byte("ABC"), []byte("ABC")))     // 完全相等
	fmt.Println(bytes.EqualFold([]byte("ABC"), []byte("abc"))) // 不区分大小写

	// 转换
	fmt.Println("\n转换")
	fmt.Printf("%q\n", bytes.Runes([]byte("你好")))
}

// 输出结果
// true
// true       
// ['你' '好']
```

#### unicode系列

`unicode`包包含基本的字符判断函数。

`utf8`包主要负责`rune`和`byte`之间的转换。

`utf16`包负责`rune`和`uint16`数组之间的转换



官方文档：

`unicode`：[https://pkg.go.dev/unicode](https://pkg.go.dev/unicode)

`unicode/utf8`：[https://pkg.go.dev/unicode/utf8](https://pkg.go.dev/unicode/utf8)

`unicode/utf16`：[https://pkg.go.dev/unicode/utf16](https://pkg.go.dev/unicode/utf16)



| 包名            | 分类        | 函数                                                       | 说明                                                         |
| --------------- | ----------- | ---------------------------------------------------------- | ------------------------------------------------------------ |
| `unicode`       | 字符判断    | `func Is(rangeTab *RangeTable, r rune) bool`               | 判断`r`是否在`RangeTable`内                                  |
|                 |             | `func IsSpace(r rune) bool`                                | 是否是空白字符（空字符串会报错）                             |
|                 |             | `func IsDigit(r rune) bool`                                | 是否是十进制数字                                             |
|                 |             | `func IsNumber(r rune) bool`                               | 是否是数字                                                   |
|                 |             | `func IsLetter(r rune) bool`                               | 是否是字母                                                   |
|                 |             | `func IsLower(r rune) bool`                                | 是否是小写字母                                               |
|                 |             | `func IsUpper(r rune) bool`                                | 是否是大写字母                                               |
|                 | 转换        | `func ToLower(r rune) rune`                                | 返回对应的小写字符                                           |
|                 |             | `func ToUpper(r rune) rune`                                | 返回对应的小写字符                                           |
| `unicode/utf8`  | bytes转rune | `func DecodeRune(p []byte) (r rune, size int)`             | 解码 []byte中**第一个**`UTF-8` 编码序列，返回该码值和长度    |
|                 |             | `func DecodeLastRune(p []byte) (r rune, size int)`         | 同`DecodeRune`，是最后一个`UTF-8` 编码序列                   |
|                 |             | `func DecodeRuneInString(s string) (r rune, size int)`     | 同`DecodeRune`，传入的是字符串                               |
|                 |             | `func DecodeLastRuneInString(s string) (r rune, size int)` | 同`DecodeRune`，传入的是字符串，是最后一个`UTF-8` 编码序列   |
|                 | rune转bytes | `func EncodeRune(p []byte, r rune) int`                    | 将 rune的`UTF-8 `编码序列写入`[]byte`，并返回写入的字节数。p需要满足足够的长度 |
|                 | 检测        | `func FullRune(p []byte) bool`                             | 检测`[]byte`是否包含一个完整 `UTF-8`编码（只要包含一个就返回true） |
|                 |             | `func FullRuneInString(s string) bool`                     | 同上，输入是一个字符串                                       |
|                 |             | `func RuneStart(b byte) bool`                              | 检测字节 byte b 是否可以作为某个 rune 编码的第一个字节       |
|                 |             | `func Valid(p []byte) bool`                                | 检测切片`[]byte`是否包含完整且合法的`UTF-8`编码序列（不能有乱码） |
|                 |             | `func ValidRune(r rune) bool`                              | 检测字符`rune`是否包含完整且合法的`UTF-8`编码序列            |
|                 |             | `func ValidString(s string) bool`                          | 检测字符串`string`是否包含完整且合法的`UTF-8`编码序列        |
|                 | 统计        | `func RuneCount(p []byte) int`                             | 统计`[]byte`中`rune`的个数                                   |
|                 |             | `func RuneCountInString(s string) (n int)`                 | 同上，输入是字符串                                           |
|                 |             | `func RuneLen(r rune) int`                                 | 统计`rune`编码后的字节数                                     |
| `unicode/utf16` | 转换        | `func Encode(s []rune) []uint16`                           | 编码`rune`数组为`uint16`数组                                 |
|                 |             | `func Decode(s []uint16) []rune`                           | 解码`uint16`数组为`rune`数组                                 |

> 编码：字符串 -> bytes， rune -> bytes
>
> 解码：bytes -> rune， bytes -> 字符串

示例代码

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"unicode"
	"unicode/utf16"
	"unicode/utf8"
)

func main() {
	// unicode包 - 判断
	fmt.Println("unicode包 - 判断")
	fmt.Println(unicode.Is(unicode.Scripts["Han"], 'a')) // 判断是否是汉字
	fmt.Println(unicode.Is(unicode.Scripts["Han"], '中'))
	fmt.Println(unicode.IsSpace(' ')) // true

	// unicode包 - 转换
	fmt.Println("\nunicode包 - 转换")
	fmt.Printf("%c\n", unicode.ToLower('A'))
	fmt.Printf("%c\n", unicode.ToLower('中'))

	// unicode/utf8 - bytes转rune
	fmt.Println("\nunicode/utf8 -bytes转rune")
	fmt.Println(utf8.DecodeRune([]byte("你好")))     // 解码第一个，20320 3
	fmt.Printf("%c\n", 20320)                      // 你
	fmt.Println(utf8.DecodeLastRune([]byte("你好"))) // 解码最后一个，22909 3
	fmt.Printf("%c\n", 22909)                      // 好
	fmt.Println(utf8.DecodeRuneInString("你好"))
	fmt.Println(utf8.DecodeLastRuneInString("你好"))

	// unicode/utf8 - rune转bytes
	fmt.Println("\nunicode/utf8 - rune转bytes")
	buf := make([]byte, 3)
	fmt.Println(utf8.EncodeRune(buf, '世'))
	fmt.Printf("%#v\n", buf) // []byte{0xe4, 0xb8, 0x96}

	// unicode/utf8 - 检测
	fmt.Println("\nunicode/utf8 - 检测")
	buf2 := []byte{228, 184, 150}           // 世
	buf3 := []byte{228, 184, 150, 228, 184} // 在buf2的基础上再加上两个字节, 世\xe4\xb8

	fmt.Println(utf8.FullRune(buf2))     // true
	fmt.Println(utf8.FullRune(buf3))     // true
	fmt.Println(utf8.FullRune(buf2[:2])) // false

	fmt.Println(utf8.Valid(buf2)) // true
	fmt.Println(utf8.Valid(buf3)) // false
	fmt.Printf("%q\n", buf3)

	// unicode/utf16 - rune与uint16转换
	fmt.Printf("%#v\n", utf16.Encode([]rune("你好")))            // []uint16{0x4f60, 0x597d}
	fmt.Printf("%q\n", utf16.Decode([]uint16{0x4f60, 0x597d})) // ['你' '好']
}
```

:::

> utf8编码下，英文占1个字节，汉字占3个字节；
>
> utf16编码下，英文占1个字节，汉字占1个字节



### 布尔值

布尔值的零值是`false`，布尔值无法隐式转换为数值(1或0)



### 数组

数组的特点

* 数组一旦定义，元素个数不可改变，即不能增加或删除元素；可以改元素的值
* 元素数据类型必须一致
* 相同数据类型、长度固定的序列才是一样的，即`[2]int`和`[3]int`是不同
* 数组的零值是元素数据类型的零值
* 没有"空数组"的说法
* 数组是值类型

#### 声明

::: details 点击查看完整代码

```go
package main

import "fmt"

func main() {
	var a1 [3]int                   // 声明数组；3代表数组元素个数（必须指定）；未赋值则默认使用零值，这里是0
	var a2 [3]int = [3]int{4, 5, 6} // 声明并赋值
	a3 := [3]int{7, 8, 9}           // 短变量声明
	a4 := [...]int{10, 11, 12}      //使用...后数组长度会自动判断；...只能用在值的位置上不可以用在类型的位置上
	a5 := [...]int{1: -1}           // 索引1的位置数据是-1，其他位置是零值

	fmt.Printf("%#v\n", a1)
	fmt.Printf("%#v\n", a2)
	fmt.Printf("%#v\n", a3)
	fmt.Printf("%#v\n", a4)
	fmt.Printf("%#v\n", a5)
}
```

:::

输出结果

```bash
[3]int{0, 0, 0}
[3]int{4, 5, 6}   
[3]int{7, 8, 9}   
[3]int{10, 11, 12}
[2]int{0, -1}   
```

#### 基本操作

::: details 点击查看完整代码

```go
package main

import "fmt"

func main() {
	a := [...]int{10, 11, 12, 13, 14, 15}

	// 遍历
	for i := 0; i < len(a); i++ {
		fmt.Println(a[i])
	}
	for _, v := range a {
		fmt.Println(v)
	}

	// 截取
	fmt.Println(a[:3]) // 索引0-2，注意不支持[:-2]这种负数表示方法
}
```

:::

输出结果

```bash
10
11        
12        
13        
14        
15        
10        
11        
12        
13        
14        
15        
[10 11 12]
```

#### 多维数组

```go
package main

import "fmt"

func main() {
	// 二维数组
	a2 := [2][3]int{}
	fmt.Println(a2) // [[0 0 0] [0 0 0]]

	// 三维数组
	a3 := [1][2][3]int{}
	fmt.Println(a3)
	/*
	   [                            第一个数组为长度为1的数组
	      [                         第一个数组的第1个元素为另一个长度为2的数组
	         [0 0 0] [0 0 0]        每个数组有两个元素，每个元素是一个长度为3的数组
	      ]
	   ]

	*/
}
```

### 切片

切片是长度可变的数组，切片的特点

* 可以动态添加删除元素

* 所有元素数据类型也必须是一样

* 切片的零值是`nil`

* 切片是引用类型

  

切片由三部分组成

* 指针：存放底层数组的内存地址
* 长度：指的是切片的元素个数，使用`len(切片)`输出长度
* 容量：底层数组的长度，使用`cap(切片)`输出容量大小

#### 声明

```go
package main

import "fmt"

func main() {
	// 声明方式1：与数组类似，不同的是不需要指定元素个数
	var s1 []int  // 只声明，默认为零值，即nil
	s2 := []int{} // 空切片

	fmt.Printf("%#v\n", s1)
	fmt.Printf("%#v\n", s2)

	// 声明方式2：使用make
	s3 := make([]int, 1, 2) //声明一个int类型的切片,长度为1，容量为2；如果容量不指定，那么容量等同于长度
	fmt.Printf("%#v\n", s3)

	// 查看长度和容量
	fmt.Println(len(s1), len(s2), len(s3))
	fmt.Println(cap(s1), cap(s2), cap(s3))
}
```

输出结果

```bash
[]int(nil)
[]int{} 
[]int{0}
0 0 1   
0 0 2   
```

#### 基本操作

::: details 点击查看完整代码

```go
package main

import (
	"bytes"
	"fmt"
)

func EqualStringSlice(a, b []string) bool {
	length := len(a)
	if length != len(b) {
		return false
	}

	for i := 0; i < length; i++ {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}

func main() {
	s1 := []int{1, 2, 3, 4, 5}
	fmt.Printf("原始数据：%#v\n", s1)

	// 添加元素
	s1 = append(s1, 6, 7, '8', '中') // 可以一次添加多个， '8'和'中'虽然为rune，本质上还是int类型
	fmt.Printf("添加元素：%#v\n", s1)    // []int{1, 2, 3, 4, 5, 6, 7, 56, 20013}

	// 删除元素
	s1 = s1[1:len(s1)]                 // 删除第一个元素
	fmt.Printf("删除元素(第一个)：%#v\n", s1)  //
	s1 = s1[:len(s1)-1]                // 删除最后一个元素
	fmt.Printf("删除元素(最后一个)：%#v\n", s1) //

	// 切片浅拷贝
	s2 := s1[:]   // 浅拷贝
	s3 := s1[1:3] // 浅拷贝
	fmt.Printf("使用[:]浅拷贝：%p <---> %p\n", s1, s2)
	fmt.Printf("使用[:]浅拷贝：%p <---> %p\n", s1[1:3], s3)

	// 切片深拷贝
	s4 := make([]int, len(s1), cap(s1))
	copy(s4, s1)
	fmt.Printf("使用copy深拷贝：%p <---> %p\n", s1, s4) // 深拷贝方式1
	s5 := make([]int, len(s1), cap(s1))
	for _, v := range s1 {
		s5 = append(s5, v)
	}
	fmt.Printf("遍历方式：%p <---> %p\n", s1, s5) // 深拷贝方式2

	// 解包：切片...
	s6 := append(s1, s1...)
	fmt.Printf("解包用法示例：%#v\n", s6) //

	// 切片比较 - byte切片使用提供的函数比较
	a1 := []uint8{11, 40, 78, 115, 253}
	a2 := []uint8{11, 40, 78, 115, 253}
	fmt.Printf("[]byte切片比较: %t\n", bytes.Equal(a1, a2))

	// 切片比较 - 非byte类型
	a3 := []string{"hello", "world"}
	a4 := []string{"hello", "world"}
	fmt.Printf("[]string切片比较: %t\n", EqualStringSlice(a3, a4))
}
```

:::

输出结果

```bash
原始数据：[]int{1, 2, 3, 4, 5}
添加元素：[]int{1, 2, 3, 4, 5, 6, 7, 56, 20013}        
删除元素(第一个)：[]int{2, 3, 4, 5, 6, 7, 56, 20013}   
删除元素(最后一个)：[]int{2, 3, 4, 5, 6, 7, 56}        
使用[:]浅拷贝：0xc00012e0f8 <---> 0xc00012e0f8         
使用[:]浅拷贝：0xc00012e100 <---> 0xc00012e100         
使用copy深拷贝：0xc00012e0f8 <---> 0xc00012e190        
遍历方式：0xc00012e0f8 <---> 0xc000156000              
解包用法示例：[]int{2, 3, 4, 5, 6, 7, 56, 2, 3, 4, 5, 6, 7, 56}
[]byte切片比较: true                                   
[]string切片比较: true
```

#### 容量扩容机制

当**长度==容量**时，再`append()`插入元素，go会重新申请一个底层数组，将原数据数据拷贝过去，修改切片指针，再用来存放我们插入的数据

两个并不准确的结论：

* 当原切片长度小于1024时，新切片的容量会直接翻倍
* 当原切片的容量大于等于1024时，会反复地增加25%，直到新容量超过所需要的容量

**测试1：可以看到是翻倍的**

::: details 点击查看完整代码

```go
package main

import "fmt"

func main() {
	// 定义切片
	s := make([]int, 0)
	fmt.Printf("当前长度: %2d | 当前容量: %2d\n", len(s), cap(s))

	// 循环添加元素
	for i := 0; i <= 18; i++ {
		s = append(s, 100)
		fmt.Printf("当前长度: %2d | 当前容量: %2d\n", len(s), cap(s))
	}

	// 输出结果
	//当前长度:  0 | 当前容量:  0
	//当前长度:  1 | 当前容量:  1
	//当前长度:  2 | 当前容量:  2
	//当前长度:  3 | 当前容量:  4
	//当前长度:  4 | 当前容量:  4
	//当前长度:  5 | 当前容量:  8
	//当前长度:  6 | 当前容量:  8
	//当前长度:  7 | 当前容量:  8
	//当前长度:  8 | 当前容量:  8
	//当前长度:  9 | 当前容量: 16
	//当前长度: 10 | 当前容量: 16
	//当前长度: 11 | 当前容量: 16
	//当前长度: 12 | 当前容量: 16
	//当前长度: 13 | 当前容量: 16
	//当前长度: 14 | 当前容量: 16
	//当前长度: 15 | 当前容量: 16
	//当前长度: 16 | 当前容量: 16
	//当前长度: 17 | 当前容量: 32
	//当前长度: 18 | 当前容量: 32
	//当前长度: 19 | 当前容量: 32
}
```

:::

**测试2：可以看到并不是25%**

::: details 点击查看完整代码

```go
package main

import "fmt"

func main() {
	// 定义切片
	s := make([]int, 2000)
	fmt.Printf("当前长度: %2d | 当前容量: %2d\n", len(s), cap(s))

	// 循环添加元素
	for i := 0; i <= 10; i++ {
		s = append(s, 100)
		fmt.Printf("当前长度: %2d | 当前容量: %2d\n", len(s), cap(s))
	}

	// 输出结果
	//当前长度: 2000 | 当前容量: 2000
	//当前长度: 2001 | 当前容量: 2720
	//当前长度: 2002 | 当前容量: 2720
	//当前长度: 2003 | 当前容量: 2720
	//当前长度: 2004 | 当前容量: 2720
	//当前长度: 2005 | 当前容量: 2720
	//当前长度: 2006 | 当前容量: 2720
	//当前长度: 2007 | 当前容量: 2720
	//当前长度: 2008 | 当前容量: 2720
	//当前长度: 2009 | 当前容量: 2720
	//当前长度: 2010 | 当前容量: 2720
	//当前长度: 2011 | 当前容量: 2720
}
```

:::

不同版本的`go`扩容机制也并不一样，具体还需要去看源代码`src/runtime/slice.go`中的`growslice`函数

#### 容量扩容面试题

```go
package main

import "fmt"

func main() {
	s1 := []int{10, 20, 30, 40}
	s2 := s1

	s1 = append(s1, 1, 2, 3)
	s1[0] = 11

	fmt.Println(s1[0])
	fmt.Println(s2[0])
}
```

::: details 点击查看输出结果和解释

```bash
11
10

第一个为11
第二个为10，是因为s1添加元素后会有容量扩容操作，将s1的数据赋值给新的内存空间，s1指向新的地址，s1的修改自然影响不到s2，s2的数据还是旧的，就是10
```

:::

### 映射

映射是存储一系列无序的key/value键值对

key只能为可使用==运算的值类型（字符串、数字、布尔、数组），value可以为任意类型

零值为nil

#### 声明

```go
package main

import "fmt"

func main() {
	// 直接声明
	var names1 map[string]string     //使用var声明但是不初始化(没有分配内存空间)后面赋值会报错；不带大括号的是类型
	var names2 = map[string]string{} // 声明并初始化；带大括号的是值

	// 使用make声明
	var names3 = make(map[string]string)      // 使用make声明并初始化
	var names4 = make(map[string]string, 100) // 使用make声明并初始化，并指定容量（注意：map的容量不可以使用cap函数获取，会报错）

	// 尝试赋值
	//names1["a"] = "b" // 这个会报错，panic: assignment to entry in nil map
	names2["a"] = "b"
	names3["a"] = "b"
	names4["a"] = "b"

	fmt.Printf("类型: %T | 值: %#v | 元素个数: %d\n", names1, names1, len(names1))
	fmt.Printf("类型: %T | 值: %#v | 元素个数: %d\n", names2, names2, len(names2))
	fmt.Printf("类型: %T | 值: %#v | 元素个数: %d\n", names3, names3, len(names3))
	fmt.Printf("类型: %T | 值: %#v | 元素个数: %d\n", names4, names4, len(names4))

	//类型: map[string]string | 值: map[string]string(nil) | 元素个数: 0
	//类型: map[string]string | 值: map[string]string{"a":"b"} | 元素个数: 1
	//类型: map[string]string | 值: map[string]string{"a":"b"} | 元素个数: 1
	//类型: map[string]string | 值: map[string]string{"a":"b"} | 元素个数: 1
}
```

#### 基本操作

```go
package main

import "fmt"

func main() {
	// 声明数组
	names := make(map[string]string)

	// 添加元素，若已存在会覆盖
	names["Top1"] = "Go"
	names["Top2"] = "Python"
	names["Top3"] = "JavaScript"
	names["Top4"] = ""

	// 删除元素, delete函数只用于map，函数无返回值
	delete(names, "Top3")

	// 遍历map，遍历出来是无序的
	for k, v := range names {
		fmt.Printf("names[%s]=%s\n", k, v)
	}
	//names[Top2]=Python
	//names[Top4]=
	//names[Top1]=Go

	// 判断元素是否存在,若不存在默认会返回对应基本数据类型的零值,所以我们一定要通过返回的布尔值来判断元素是否存在
	key := "Top4"
	if v, ok := names[key]; ok {
		fmt.Printf("Key %s exists and value is %q\n", key, v)
	} else {
		fmt.Printf("Key %s does not exist\n", key)
	}
	// Key Top4 exists and value is ""
}
```

#### value可以是一个方法

map的value可以是一个方法

```go
package main

import "fmt"

func main() {
	m1 := map[int]func(op int) int{}

	m1[1] = func(op int) int { return op }
	m1[2] = func(op int) int { return op * op }
	m1[3] = func(op int) int { return op * op * op }

	fmt.Println(m1) // map[1:0x47b920 2:0x47b940 3:0x47b960]

	fmt.Println(m1[1](2), m1[2](2), m1[3](2)) // 2 4 8
}
```

#### 实现set类型

go语言中没有``set``类型，可以使用map来自定义`set`

```go
package main

import "fmt"

func main() {
	// 初始化set
	intSet := make(map[int]bool)

	// 添加元素
	intSet[1] = true
	intSet[2] = false

	// 删除元素
	delete(intSet, 2)

	// 检查元素是否存在
	n := 1
	if intSet[n] {
		fmt.Printf("%d is in set", n)
	} else {
		fmt.Printf("%d is not in set", n)
	}
	// 1 is in set
}
```

### 数据类型总结🎉

| 数据类型 | 元素是否有序 | 值类型/引用类型 | 指针类型初始化关键字 | 零值               |
| -------- | ------------ | --------------- | -------------------- | ------------------ |
| 数字     | ✔            | 值类型          | `new`                | `0`                |
| 字符串   | ✔            | 值类型          | `new`                | 空字符串           |
| 布尔值   | ✔            | 值类型          | `new`                | `false`            |
| 数组     | ✔            | 值类型          | `new`                | 元素数据类型的零值 |
| 切片     | ✔            | 引用类型        | `make`               | `nil`              |
| 映射     | ❌            | 引用类型        | `make`               | `nil`              |

## 

## 函数

### 函数定义

* 函数可以没有返回值，也可以有多个返回值

#### 基本示例

```go
package main

import "fmt"

// 参数x和y都是int类型，函数返回值也是int类型
func add(x, y int) int {
	return x + y
}

func main() {
	fmt.Println(add(1, 2))
	fmt.Println(add(3, 4))
}
```

#### 可省略参数

```go
package main

import "fmt"

// options ...数据类型，这样定义的参数可以不传值
func Login(host, port, username, password string, options ...map[string]string) {
	fmt.Println(host, port, username, password, options)
}

func main() {
	Login("0.0.0.0", "3306", "root", "123456")
	Login("0.0.0.0", "3306", "root", "123456", map[string]string{"ssl": "true"})
}

//0.0.0.0 3306 root 123456 []
//0.0.0.0 3306 root 123456 [map[ssl:true]]
```

#### 实参为nil

```go
package main

import "fmt"

// 定义函数
func MyFunc(s []string) []string {
	s = append(s, "hello world!")
	return s
}

func main() {
	// 函数要求传入一个字符串切片，而他的零值为nil，所以我们可以传入nil，在函数内部相当于是: s := make([]string, 0)
	fmt.Println(MyFunc(nil)) // [hello world!]
}
```



#### 接受任意类型参数

并不推荐这样写函数，仅作学习使用

```go
package main

import "fmt"

// 使用可省略参数 + interface，可接受任何类型的参数（包括不传），函数内部使用断言再去判断参数类型
func test(i ...interface{}) {
	if len(i) >= 1 {
		if m, ok := i[0].(map[string]string); ok {
			fmt.Println(m["name"])
		}
	} else {
		fmt.Println("anomoy")
	}
}

func main() {
	test()
	test(map[string]string{
		"name": "bob",
	})
}
```

### 内置函数

#### copy

```go
package main

import "fmt"

func main() {
	// 位数相同的情况下，全部覆盖
	var s = []int{1, 2, 3}
	copy(s, []int{3, 2, 1})
	fmt.Println(s) // [3, 2, 1]

	// dst位数少的情况下，只覆盖部分
	var s1 = []int{1, 2}
	copy(s1, []int{3, 2, 1})
	fmt.Println(s1) // [3, 2]

	// dst为空的情况下，copy之后还是空
	var s2 = []int{}
	copy(s2, []int{1, 2, 3})
	fmt.Println(s2) // []

	// src位数少的情况下，只覆盖部分
	var s3 = []int{4, 4, 4}
	copy(s3, []int{3, 2})
	fmt.Println(s3) // [3 2 4]
}
```

### defer延迟调用

defer是延迟调用，比如有`A`、`B`两个函数，在`A`函数中`defer B()`，那么就意味着在`A`函数`return`或`panic`之后调用`B`函数

#### defer应用场景

* 释放资源

  ```go
  m.mutex.Lock()
  defer m.mutex.Unlock()
  ```

* 异常处理

* 修改函数返回值



#### defer机制

* defer后面的表达式不能加圆括号

  ::: details 点击查看完整代码

  ```go
  package main
  
  import "fmt"
  
  func main() {
  	defer (fmt.Println(1))	// defer后面的函数调用，不能加括号，会报语法错误
  }
  
  ```

  :::

* 若执行多次`defer语句`，则满足`LIFO`（后进先出），即<span style="color: red;font-weight: bold;">后defer的先执行</span>

* <span style="color: red;font-weight: bold;">被defer的函数的参数在执行到defer语句的时候就被确定下来了</span>

  ::: details 点击查看完整代码

  ```go
  package main
  
  import "fmt"
  
  func test1() {
  	fmt.Println("测试1")
  	for i := 0; i <= 5; i++ {
  		defer fmt.Printf("%d %p \n", i, &i)
  	}
  }
  
  func test2() {
  	fmt.Println("\n测试2")
  	for i := 0; i <= 5; i++ {
  		defer func() {
  			fmt.Printf("%d %p \n", i, &i)
  		}()
  	}
  }
  
  func test3() {
  	fmt.Println("\n测试3")
  	for i := 0; i <= 5; i++ {
  		defer func(i int) {
  			fmt.Printf("%d %p \n", i, &i)
  		}(i)
  	}
  }
  
  func main() {
  	test1()
  	test2()
  	test3()
  }
  ```

  :::

  ::: details 点击查看输出结果

  ```bash
  测试1
  5 0xc0000180b8 
  4 0xc0000180b8 
  3 0xc0000180b8 
  2 0xc0000180b8 
  1 0xc0000180b8 
  0 0xc0000180b8 
                 
  测试2          
  6 0xc0000180f0 
  6 0xc0000180f0 
  6 0xc0000180f0 
  6 0xc0000180f0 
  6 0xc0000180f0 
  6 0xc0000180f0 
                 
  测试3          
  5 0xc0000180f8 
  4 0xc000018110 
  3 0xc000018118 
  2 0xc000018120 
  1 0xc000018128 
  0 0xc000018130 
  ```

  :::

* <span style="color: red;font-weight: bold;">defer和return执行顺序的问题</span>

  ::: details 点击查看完整代码

  ```go
  package main
  
  import "fmt"
  
  // 在defer中修改返回值成功，前提是必须提前声明返回值
  func add1(x, y int) (result int) {
  	defer func() {
  		result += 10
  	}()
  	return x + y
  }
  
  // 在defer中修改返回值失败，并未提前声明返回值
  // 原因是：
  // 		return并非原子操作，共分为两步，赋值和函数返回
  //		赋值：将结果写入到返回值中，如果未提前声明，就写入到一个临时变量中
  //		函数返回：函数带着当前返回值退出
  // 执行顺序：return赋值 --> defer --> return函数返回
  
  func add2(x, y int) int {
  	result := x + y // result必须定义在前面
  	fmt.Printf("%p\n", &result)
  	defer func() {
  		result += 10
  		fmt.Printf("%p\n", &result)
  	}()
  	return result
  }
  
  func main() {
  	fmt.Println(add1(1, 2)) // 13
  	fmt.Println(add2(4, 5)) // 9
  }
  ```

  :::

* defer可以捕捉`panic`

  ::: details 点击查看完整代码

  ```go
  package main
  
  import "fmt"
  
  func Close() {
  	// recover函数只能用在defer中
  	if err := recover(); err != nil {
  		fmt.Println("panic: ", err)
  	} else {
  		fmt.Println("Close success!")
  	}
  }
  
  func WithPanic() {
  	defer Close()
  	panic(1)
  }
  
  func NonPanic() {
  	defer Close()
  }
  
  func main() {
  	WithPanic()
  	NonPanic()
  }
  
  // 输出结果
  // panic:  1
  // Close success!
  ```

  :::

* derfer一定会执行吗？

  ```go
  package main
  
  import (
  	"fmt"
  	"os"
  )
  
  func main() {
  	defer fmt.Println("defer called")
  	os.Exit(0)
  }
  
  // 运行之后，发现什么都没有输出，说明defer没有正常执行
  ```


## 

## 别名和自定义类型

### 基础

```go
package main

import "fmt"

func add(x, y int) int {
	return x + y
}

func main() {
	// 定义别名， 使用=， 不能给Counter添加方法等
	type Counter = int

	// 使用，可以继续像使用int一样使用，本质上它就是int
	var a Counter = 20
	fmt.Println(add(1, a)) // 21

	// ------------------------------------------------------
	// 自定义类型, 这是一个全新的类型
	type Number int

	// 错误使用自定义类型
	var b Number = 100
	//fmt.Println(add(1, b)) // 这里会报错，因为Number已经是全新的类型了

	// 类型转换
	fmt.Printf("%T %#v\n", int8(b), int8(b))     // int8 100
	fmt.Printf("%T %#v\n", Number(a), Number(a)) // main.Number 20
}
```

### 仿`http handler`对象转换

::: details 点击查看完整代码

```go
package main
 
import "fmt"
 
// 自定义类型
// 可以使用HandFunc(函数名) 将函数转为HandFunc对象，函数需要和HandFunc保持签名一致
type HandFunc func(x int, y int) int
 
// 自定义类型-扩展方法
func (f HandFunc) ServeHTTP(x int, y int) int {
   // 这里的f是HandFunc对象，也是上面所说的函数对象
   // 所以这里调用f(x, y)就相当于调用 函数(x, y)
   return f(x, y)
}
 
// 自定义函数
func add(x int, y int) int {
   return x + y
}
 
func main() {
   // 将自定义函数转为自定义类型
   add2 := HandFunc(add)
   fmt.Printf("%T\n", add)
   fmt.Printf("%T\n", add2)
 
   // 正常调用
   fmt.Println(add(1, 2))
   fmt.Println(add2(1, 2))
 
   // 自定义类型可以调用更多的方法
   fmt.Println(add2.ServeHTTP(1, 2))
}
```

:::

输出结果

```bash
func(int, int) int
main.HandFunc
3            
3            
3        
```

## 

## 结构体

Go语言的结构体其实就相当于其他编程语言的类

### 定义和初始化

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
)

// 结构体定义语法
//     语法1： type 结构体名称 struct {}
//     语法2： 还可以定义匿名结构体，参考下方代码
type User struct {
	id      int
	name    string
	address string
	phone   string
}

func main() {
	// 初始化空结构体
	fmt.Println(User{}) // {0   }

	//使用字面量初始化
	user1 := User{
		id: 1, name: "Serry", address: "广东省", phone: "19111111111",
	}
	fmt.Println(user1) // {1 Serry 广东省 19111111111}

	// 使用属性初始化
	var user2 User
	user2.id = 1
	user2.name = "Bob"
	user2.address = "河北省保定市"
	user2.phone = "13788888888"
	fmt.Println(user2) // {1 Bob 河北省保定市 13788888888}

	// 使用new函数初始化【指针类型结构体】
	var user3 *User = new(User)
	fmt.Println(user3) // &{0   }

	// 定义匿名结构体并初始化
	user4 := struct {
		id    int
		phone string
	}{
		id:    1,
		phone: "12345678910",
	}

	fmt.Println(user4) // {1 12345678910}
}
```

:::

### 自定义Tag

已知使用了结构体`Tag`的库：[https://github.com/golang/go/wiki/Well-known-struct-tags](https://github.com/golang/go/wiki/Well-known-struct-tags)

`Tag`使用语法

```go
`key1:"value1" key2:"value2" key3:"value3"...` // 键值对用空格分隔
```



::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"reflect"
)

type User struct {
	Name     string `my:"username"`
	Age      uint8
	Password string `my:"min=6,max=10"`
}

func GetTag(u User) {
	// 通过反射获取类型
	t := reflect.TypeOf(u)

	// 代码						类型							说明
	// t.NumField()											结构体字段数量
	// t.Field(0)											第1个字段
	//	t.Field(1).Name 		字符串						字段名，这里是 Name
	// 	t.Field(1).Tag  		StructTag(自定义字符串类型)	Tag，这里是 my:"username"
	//  t.Field(1).Tag.Get()	方法							根据key获取value, key不存在返回空字符串

	fmt.Printf("%-10s   %-s\n", "Struct Key", "Tag Value")
	for i := 0; i < t.NumField(); i++ {
		field := t.Field(i)
		key := field.Name
		value := field.Tag.Get("my")
		fmt.Printf("%-10s   %-s\n", key, value)
	}
}

func main() {
	user := User{
		Name:     "Jack",
		Age:      5,
		Password: "123456",
	}
	GetTag(user)
}
```

:::

输出结果

```bash
Struct Key   Tag Value
Name         username    
Age                      
Password     min=6,max=10
```



### 结构体组合

类似于类的继承

::: details 点击查看完整代码

```go
package main

import "fmt"

type Addr struct {
	province string
	street   string
	number   string
}

type User struct {
	id    int
	name  string
	addr  Addr
	phone string
}

func main() {
	var addr = Addr{
		province: "Hebei",
		street:   "天威路",
		number:   "10",
	}

	var user = User{
		id:    1,
		name:  "bob",
		addr:  addr,
		phone: "137111111111",
	}

	fmt.Println(user)
}
```

:::

### 结构体方法

**语法**

```go
// 定义结构体
type Person struct {
	name string
}

// 一般我们会为结构体定义一个构造方法（这不是必须的）
func NewPerson(name string) *Person {
	return &Person{name: name}
}

// 定义结构体方法
// 语法：func (接收者变量 接收者类型) 方法名(参数列表) (返回参数)
//      接收者变量: 建议使用接收者类型名称首字母的小写，而不是self、this之类的命名
//      接收者类型：值类型和指针类型
func (p *Person) GetName() string {
	return p.name
}
```

**值接收者会进行结构体拷贝**

测试1：值接收者会将结构体拷贝一份到方法内

::: details 点击查看完整代码

```go
package main

import "fmt"

type Person struct {
	name string
}

func NewPerson(name string) Person {
	return Person{name: name}
}

func (p Person) GetName() string {
	return p.name
}
func (p Person) SetName(name string) {
	fmt.Printf("SetName: %p\n", &p)
	p.name = name
}

func main() {
	bob := NewPerson("bob")
	fmt.Printf("main: %p\n", &bob)

	bob.SetName("jack")
	fmt.Println(bob.GetName())

	// 输出结果
	// main: 0xc00004a250
	// SetName: 0xc00004a260
	// bob
    // 总结：值接收者会将结构体拷贝一份到方法内，所以导致并没有对结构体修改成功
}
```

:::

测试2：指针接收者不会拷贝结构体

::: details 点击查看完整代码

```go
package main

import "fmt"

type Person struct {
	name string
}

func NewPerson(name string) *Person {
	return &Person{name: name}
}

func (p *Person) GetName() string {
    // 这里是一个语法糖，本质上为 return (*p).name
	return p.name
}
func (p *Person) SetName(name string) {
	fmt.Printf("SetName: %p\n", p)
	p.name = name
}

func main() {
	bob := NewPerson("bob")
	fmt.Printf("main: %p\n", bob)

	bob.SetName("jack")
	fmt.Println(bob.GetName())

	// 输出结果
	// main: 0xc00010e110
	// SetName: 0xc00010e110
	// jack
    // 总结：指针接收者不会拷贝结构体，所以对结构体修改成功
}
```

:::

**结构体是map-v的怪异行为**

::: details 点击查看完整代码

```go
package main

type Person struct {
	Name string
	Sex  string
	Age  int
}

func main() {
	m := map[uint]Person{
		0: Person{"张无忌", "男", 20},
		1: Person{"赵敏", "女", 21},
	}

	// 测试1：这会报错 cannot assign to struct field m[0].Age in map
	m[0].Age += 1

	// 测试2：迂回解决
	//tmp := m[0]
	//tmp.Age += 1
	//m[0] = tmp
	//fmt.Println(m[0].Age)

	// 测试3：定义map为指针类型后解决
	//m2 := map[uint]*Person{
	//	0: &Person{"张无忌", "男", 20},
	//	1: &Person{"赵敏", "女", 21},
	//}
	//
	//m2[0].Age += 1
	//fmt.Println(m2[0].Age)
}
```

:::

### 函数式选项模式✨

该模式解决的问题是如何更动态灵活地为对象配置参数

```go
package main

import "fmt"

// 定义结构体
type User struct {
	Name string // 必须字段
	Age  uint8  // 非必须
	Sex  string // 非必须
}

// 定义各种选项
type Option func(*User)

func WithAge(age uint8) Option {
	return func(user *User) {
		user.Age = age
	}
}

func WithSex(sex string) Option {
	return func(user *User) {
		user.Sex = sex
	}
}

// 构造方法
func NewUser(name string, options ...Option) *User {
	// (1) 必须有的字段直接写到函数签名中，这里只有一个name
	// (2) 可有可无的通过options动态传递
	// (3) 以后若增加新的选项，也不需要改构造函数

	user := &User{Name: name}
	for _, option := range options {
		option(user)
	}
	return user
}

func main() {
	bob := NewUser("bob")
	jack := NewUser("jack", WithAge(20), WithSex("man"))

	fmt.Printf("%#v\n", bob)
	fmt.Printf("%#v\n", jack)
    // 输出结果
    // &main.User{Name:"bob", Age:0x0, Sex:""}
    // &main.User{Name:"jack", Age:0x14, Sex:"man"}
}
```

