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

unicode包包含基本的 ***\*字符判断函数\****。

utf8包主要 ***\*负责rune和byte之间的转换\****。

utf16包负责 ***\*rune和uint16数组\****之间的转换



官方文档：

`unicode`：[https://pkg.go.dev/unicode](https://pkg.go.dev/unicode)

`unicode/utf8`：https://pkg.go.dev/unicode/utf8

`unicode/utf16`：https://pkg.go.dev/unicode/utf16



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
	arr := [4]int{10, 20, 30, 40}

	s1 := arr[0:2]
	s2 := s1
	s3 := append(s1, 1, 2, 3)
	s1[0] = 11

	fmt.Println(s2[0])
	fmt.Println(s3[0])
}
```

::: details 点击查看输出结果和解释

```bash
11
10

第一个为11，是因为s2和s1共用了底层数组，所以s1修改导致s2也发生变化
第二个为10，是因为创建s3时会有容量扩容操作，将s1的数据赋值给新的内存空间，s3指向新的地址，s1的修改自然影响不到s3，s3的数据还是旧的，就是10
```

:::
