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



## 数据类型

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

