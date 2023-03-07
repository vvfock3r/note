# unsafe

文档：[https://pkg.go.dev/unsafe](https://pkg.go.dev/unsafe)

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

::: details （1）uintptr基础示例

```go
package main

import (
	"fmt"
	"unsafe"
)

type Point struct {
	X int
	Y int
}

func main() {
	// 实例化Point对象
	p := Point{X: 10, Y: 20}

	// 修改X的值
	xPtr := (*int)(unsafe.Pointer(&p))
	*xPtr = 100

	// 修改Y的值，此时需要通过uintptr进行参与计算，找到Y的指针地址
	yPtr := (*int)(unsafe.Pointer(
		uintptr(unsafe.Pointer(&p)) + unsafe.Offsetof(p.Y)),
	)
	*yPtr = 200

	// 输出
	fmt.Printf("%#v\n", p)
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
main.Point{X:100, Y:200}
```

:::

<br />

