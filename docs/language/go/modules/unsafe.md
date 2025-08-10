# unsafe

文档：[https://pkg.go.dev/unsafe](https://pkg.go.dev/unsafe)

<br />

## 基础函数

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"unsafe"
)

type Point struct {
	X int
	Y int
	Z int
}

func main() {
	// 定义对象
	s := "hello world!"
	p := Point{10, 20, 30}

	// 基础函数, 返回值都是 uintptr

	// 1、在64位系统上，每个类型的对齐系数都是固定的
	fmt.Printf("对齐系数: %d\n", unsafe.Alignof(s))

	// 2、字符串本质是个结构体,所以会输出16
	//   type stringStruct struct {
	//	   str unsafe.Pointer 占用8个字节,存储底层数组的指针
	//	   len int            占用8个字节,存储底层数组的长度
	//   }
	fmt.Printf("对象大小: %d\n", unsafe.Sizeof(s))

	// 3、用于结构体的偏移,
	// X是第一个字段偏,移为0
	// Y的偏移地址就是 unsafe.Sizeof(X)
	// Z的偏移地址就是 unsafe.Sizeof(X) + unsafe.Sizeof(Y)
	fmt.Printf("偏移地址X: %d\n", unsafe.Offsetof(p.X))
	fmt.Printf("偏移地址Y: %d\n", unsafe.Offsetof(p.Y))
	fmt.Printf("偏移地址Z: %d\n", unsafe.Offsetof(p.Z))
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
对齐系数: 8
对象大小: 16 
偏移地址X: 0 
偏移地址Y: 8 
偏移地址Z: 16
```

:::

<br />

## 通用指针

**unsafe.Pointer**

* `unsafe.Pointer`是一个指针类型，表示一个通用类型的指针
* `unsafe.Pointer`指针和任意类型的指针互相转换
* `unsafe.Pointer`指针不可以参与运算

::: details （1）Pointer基础示例

```go
package main

import (
	"fmt"
	"unsafe"
)

func main() {
	// 定义变量
	n := 10

	// 转为通用指针，并转为float64指针类型
	var p = (*float64)(unsafe.Pointer(&n))

	// 修改n
	*p = *p * 3

	// 输出值
	fmt.Println(n)

	// 把p(*float64)再转回去
	x := *(*int)(unsafe.Pointer(p))
	fmt.Println(x)
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
30
30

# 分析
# 首选，这段程序并没有实际的意义, 它将*int指针转为*float64指针，然后再对值进行运算
# 其次，它为我们演示了Pointer的使用示例，如果不使用unsafe.unsafe.Pointer，那么这段程序将报错
```

:::

::: details （2）Pointer转换要求

```go
package main

import (
	"fmt"
	"unsafe"
)

func Int64To32(n int64) int32 {
	return *(*int32)(unsafe.Pointer(&n))
}

func Int32To64(n int32) int64 {
	return *(*int64)(unsafe.Pointer(&n))
}

func main() {
	fmt.Println("int64 => int32: ", Int64To32(9))
	fmt.Println("int32 => int64: ", Int32To64(9))
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
int64 => int32:  9              # 转换没问题
int32 => int64:  38654705673    # 转换有问题

# 要求：
# 1、转化的目标类型的size 要 <= 原类型size
# 2、前后两种类型有等价的内存布局
```

:::

::: details （3）String 和 []Byte 的互相转换：早期做法

```go
package main

import (
	"fmt"
	"unsafe"
)

func StringToBytes(s string) []byte {
	return *(*[]byte)(unsafe.Pointer(&s))
}

func BytesToString(b []byte) string {
	return *(*string)(unsafe.Pointer(&b))
}

func main() {
	str := "最可爱的人"

	b := StringToBytes(str)
	s := BytesToString(b)

	fmt.Printf("%T %#v\n", b, b)
	fmt.Printf("%T %#v\n", s, s)
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
[]uint8 []byte{0xe6, 0x9c, 0x80, 0xe5, 0x8f, 0xaf, 0xe7, 0x88, 0xb1, 0xe7, 0x9a, 0x84, 0xe4, 0xba, 0xba}
string "最可爱的人"
```

:::

::: details （4）String 和 []Byte 的互相转换：推荐做法（要求Go 1.20+）

```go
package main

import (
	"fmt"
	"unsafe"
)

func StringToBytes(s string) []byte {
	return unsafe.Slice(unsafe.StringData(s), len(s))
}

func BytesToString(b []byte) string {
	return unsafe.String(unsafe.SliceData(b), len(b))
}

func main() {
	str := "最可爱的人"

	b := StringToBytes(str)
	s := BytesToString(b)

	fmt.Printf("%T %#v\n", b, b)
	fmt.Printf("%T %#v\n", s, s)
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
[]uint8 []byte{0xe6, 0x9c, 0x80, 0xe5, 0x8f, 0xaf, 0xe7, 0x88, 0xb1, 0xe7, 0x9a, 0x84, 0xe4, 0xba, 0xba}
string "最可爱的人"
```

:::

<br />

## 指针运算

**uintptr**

* `uintptr`是一个整数类型，其大小足以容纳任何指针
* `uintptr`可以与`unsafe.Pointer`互相转换
* `uintptr`的主要作用就是参与指针运算

::: details （1）直接构造出 unsafe.Pointer 指针

```go
package main

import (
	"fmt"
	"unsafe"
)

type Point struct {
	X int
	Y int
	Z int
}

func main() {
	// 实例化Point对象
	p := Point{X: 10, Y: 20, Z: 30}

	// 获取X的指针,并修改值
	xPtr := (*int)(unsafe.Pointer(&p))
	*xPtr = 100

	// 方式一：使用unsafe.Offsetof直接找到对应字段的偏移地址
	// 获取Y和Z的指针并修改值
	yPtr := (*int)(unsafe.Pointer(uintptr(unsafe.Pointer(&p)) + unsafe.Offsetof(p.Y)))
	*yPtr = 200
	zPtr := (*int)(unsafe.Pointer(uintptr(unsafe.Pointer(&p)) + unsafe.Offsetof(p.Z)))
	*zPtr = 300

	// -------------------------------------------------------------------------------

	// 方式二：使用unsafe.Sizeof计算出对应字段的偏移地址
	// 获取Y和Z的指针并修改值
	//yPtr := (*int)(unsafe.Pointer(uintptr(unsafe.Pointer(&p)) + unsafe.Sizeof(p.X)))
	//*yPtr = 200
	//zPtr := (*int)(unsafe.Pointer(uintptr(unsafe.Pointer(&p)) + unsafe.Sizeof(p.X) + unsafe.Sizeof(p.Y)))
	//*zPtr = 300

	// 方式三：上面两种方式的本质就是加上偏移地址,所以可以通过提前计算好偏移,直接相加,对与非导出字段这很好用
	//yPtr := (*int)(unsafe.Pointer(uintptr(unsafe.Pointer(&p)) + uintptr(8)))
	//*yPtr = 200
	//zPtr := (*int)(unsafe.Pointer(uintptr(unsafe.Pointer(&p)) + uintptr(16)))
	//*zPtr = 300

	// 输出
	fmt.Printf("%#v\n", p)
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
main.Point{X:100, Y:200, Z:300}
```

:::

::: details （2）使用 unsafe.Add 构造出 unsafe.Pointer  指针

```go
package main

import (
	"fmt"
	"unsafe"
)

type Point struct {
	X int
	Y int
	Z int
}

func main() {
	// 实例化Point对象
	p := Point{X: 10, Y: 20, Z: 30}

	// 获取X的指针,并修改值
	xPtr := (*int)(unsafe.Pointer(&p))
	*xPtr = 100

	// 方式一：使用unsafe.Offsetof直接找到对应字段的偏移地址
	yPtr := (*int)(unsafe.Add(unsafe.Pointer(&p), unsafe.Offsetof(p.Y)))
	*yPtr = 200
	zPtr := (*int)(unsafe.Add(unsafe.Pointer(&p), unsafe.Offsetof(p.Z)))
	*zPtr = 300

	// -------------------------------------------------------------------------------

	// 方式二：使用unsafe.Sizeof计算出对应字段的偏移地址
	//yPtr := (*int)(unsafe.Add(unsafe.Pointer(&p), unsafe.Sizeof(p.X)))
	//*yPtr = 200
	//zPtr := (*int)(unsafe.Add(unsafe.Pointer(&p), unsafe.Sizeof(p.X)+unsafe.Sizeof(p.Y)))
	//*zPtr = 300

	// 方式三：上面两种方式的本质就是加上偏移地址,所以可以通过提前计算好偏移,直接相加,对与非导出字段这很好用
	//yPtr := (*int)(unsafe.Add(unsafe.Pointer(&p), uintptr(8)))
	//*yPtr = 200
	//zPtr := (*int)(unsafe.Add(unsafe.Pointer(&p), uintptr(16)))
	//*zPtr = 300

	// 输出
	fmt.Printf("%#v\n", p)
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
main.Point{X:100, Y:200, Z:300}
```

:::

<br />

