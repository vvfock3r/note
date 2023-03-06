# reflect

文档：[https://pkg.go.dev/reflect](https://pkg.go.dev/reflect)

法则：[https://go.dev/blog/laws-of-reflection](https://go.dev/blog/laws-of-reflection)

<br />

## 基础用法

::: details （1）TypeOf 和 ValueOf

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	// TypeOf 运行时类型反射,返回 Type接口类型
	// 如果输入的是nil则返回nil
	fmt.Println(reflect.TypeOf("hello world!"))
	fmt.Println(reflect.TypeOf(nil))

	// ValueOf 运行时值反射, 返回 Value结构体
	// 如果输入的是nil则返回nil
	fmt.Println(reflect.ValueOf("hello world!"))
	fmt.Println(reflect.ValueOf(nil))
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
string
<nil>
hello world!
<invalid reflect.Value>
```

:::

<br />

## TypeOf

说明：

* 并不是每个类型都可以调用所有方法
* 有些方法只对函数类型有意义，有的只对Struct有意义，否则会引发panic

::: details （1）通用：类型和名称

```go
package main

import (
	"fmt"
	"reflect"
)

type Empty struct{}

func (e Empty) a() {}
func (e Empty) B() {}

func (e *Empty) c() {}
func (e *Empty) D() {}

func main() {
	// 定义对象
	var (
		v1 = "hello world!"      // 字符串
		v2 = make(chan struct{}) // channel
		v3 = Empty{}             // 结构体
		v4 = &Empty{}            // 指针
	)

	// 运行时反射其类型
	t1 := reflect.TypeOf(v1)
	t2 := reflect.TypeOf(v2)
	t3 := reflect.TypeOf(v3)
	t4 := reflect.TypeOf(v4)

	// 返回Kind类型(type Kind uint)
	fmt.Printf("类型: %s\n", t1.Kind())
	fmt.Printf("类型: %s\n", t2.Kind())
	fmt.Printf("类型: %s\n", t3.Kind())
	fmt.Printf("类型: %s\n", t4.Kind())
	fmt.Println()

	// 返回类型名称(string)
	fmt.Printf("名称: %s\n", t1.Name())
	fmt.Printf("名称: %s\n", t2.Name()) // channel没有获取到类型名称
	fmt.Printf("名称: %s\n", t3.Name())
	fmt.Printf("名称: %s\n", t4.Name()) // 指针类型没有获取到类型名称
	fmt.Println()

	// 返回字符串表示方法(string)
	fmt.Printf("字符串: %s\n", t1.String())
	fmt.Printf("字符串: %s\n", t2.String())
	fmt.Printf("字符串: %s\n", t3.String())
	fmt.Printf("字符串: %s\n", t4.String())
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
类型: string
类型: chan
类型: struct
类型: ptr

名称: string
名称:
名称: Empty
名称:

字符串: string
字符串: chan struct {}
字符串: main.Empty
字符串: *main.Empty
```

:::

::: details （2）通用：方法

```go
package main

import (
	"fmt"
	"math/rand"
	"reflect"
)

type Empty struct{}

func (e Empty) a() {}
func (e Empty) B() {}

func (e *Empty) c()          {}
func (e *Empty) D(n int) int { return rand.Intn(n) }

func main() {
	// 定义对象
	var (
		v1 = "hello world!"      // 字符串
		v2 = make(chan struct{}) // channel
		v3 = Empty{}             // 结构体
		v4 = &Empty{}            // 指针
	)

	// 运行时反射其类型
	t1 := reflect.TypeOf(v1)
	t2 := reflect.TypeOf(v2)
	t3 := reflect.TypeOf(v3)
	t4 := reflect.TypeOf(v4)

	// 返回方法个数(int)
	// 1.对于结构体而言,值方法可以使用结构体指针获取到,但是反过来则不行
	// 2.对于结构体而言，只能获取可导出的方法
	fmt.Printf("方法个数: %d\n", t1.NumMethod())
	fmt.Printf("方法个数: %d\n", t2.NumMethod())
	fmt.Printf("方法个数: %d\n", t3.NumMethod())
	fmt.Printf("方法个数: %d\n", t4.NumMethod()) // 也可以获取到值方法,原理是编译器会为值方法添加指针方法
	fmt.Println()

	// 通过索引获取方法,索引必须满足 [0, NumMethod()),返回Method结构体
	fmt.Printf("通过索引获取方法: %s\n", t4.Method(0).Name)

	// 通过名称获取方法,第二个参数代表方法是否存在,返回Method结构体
	method, ok := t4.MethodByName("D")
	if !ok {
		panic("method not found")
	}
	fmt.Printf("通过名称获取方法: %s\n", method.Name)

	// 方法调用1: method是D方法
	args := []reflect.Value{ // 构造参数，第一个参数为对象本身
		reflect.ValueOf(v4),
		reflect.ValueOf(100),
	}
	n := method.Func.Call(args)    // 调用函数
	fmt.Printf("方法调用: %d\n", n[0]) // 返回值

	// 方法调用2: 通过ValueOf进行方法调用更简单,但是方法若获取不到直接panic
	m := reflect.ValueOf(v4).MethodByName("D").Call(
		[]reflect.Value{reflect.ValueOf(100)},
	)
	fmt.Printf("方法调用: %d\n", m[0]) // 返回值
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
方法个数: 0
方法个数: 0
方法个数: 1
方法个数: 2

通过索引获取方法: B
通过名称获取方法: D
方法调用: 55
方法调用: 93
```

:::

::: details （3）通用：检测，比如将error接口转为Type接口：reflect.TypeOf((*error)(nil)).Elem()

```go
package main

import (
	"errors"
	"fmt"
	"os/exec"
	"reflect"
)

type Example struct {
	name string
}

func (e *Example) Name() string {
	return e.name
}

func (e *Example) Error() string {
	return errors.New("nothing").Error()
}

func main() {
	// 定义对象
	var (
		v1 = "hello world!"
		v2 = *exec.Command("go", "version")
		v3 = Example{name: "v2"}
		v4 = &Example{name: "v3"}
	)

	// 运行时反射其类型
	t1 := reflect.TypeOf(v1)
	t2 := reflect.TypeOf(v2)
	t3 := reflect.TypeOf(v3)
	t4 := reflect.TypeOf(v4)

	// tN是否实现某个接口类型 bool
	// 将error接口转为 Type 接口, (*error)(nil) 写法挺有意思
	ErrorType := reflect.TypeOf((*error)(nil)).Elem()
	fmt.Printf("是否实现error接口: %t\n", t1.Implements(ErrorType))
	fmt.Printf("是否实现error接口: %t\n", t2.Implements(ErrorType))
	fmt.Printf("是否实现error接口: %t\n", t3.Implements(ErrorType))
	fmt.Printf("是否实现error接口: %t\n", t4.Implements(ErrorType))
	fmt.Println()

	// tN是否可以赋值给指定类型 bool
	StringType := reflect.TypeOf((*string)(nil)).Elem()
	fmt.Printf("是否可以赋值给String类型: %t\n", t1.AssignableTo(StringType))
	fmt.Printf("是否可以赋值给String类型: %t\n", t2.AssignableTo(StringType))
	fmt.Printf("是否可以赋值给String类型: %t\n", t3.AssignableTo(StringType))
	fmt.Printf("是否可以赋值给String类型: %t\n", t4.AssignableTo(StringType))
	fmt.Println()

	// tN类型的值是否可以转换成另一个类型的值 bool
	fmt.Printf("是否可以转为String类型的值: %t\n", t1.ConvertibleTo(StringType))
	fmt.Printf("是否可以转为String类型的值: %t\n", t2.ConvertibleTo(StringType))
	fmt.Printf("是否可以转为String类型的值: %t\n", t3.ConvertibleTo(StringType))
	fmt.Printf("是否可以转为String类型的值: %t\n", t4.ConvertibleTo(StringType))
	fmt.Println()

	// tN类型是否可比较 bool
	fmt.Printf("类型是否可比较: %t\n", t1.Comparable())
	fmt.Printf("类型是否可比较: %t\n", t2.Comparable())
	fmt.Printf("类型是否可比较: %t\n", t3.Comparable())
	fmt.Printf("类型是否可比较: %t\n", t4.Comparable())
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
是否实现error接口: false
是否实现error接口: false         
是否实现error接口: false         
是否实现error接口: true          
                                 
是否可以赋值给String类型: true   
是否可以赋值给String类型: false  
是否可以赋值给String类型: false  
是否可以赋值给String类型: false  
                                 
是否可以转为String类型的值: true 
是否可以转为String类型的值: false
是否可以转为String类型的值: false
是否可以转为String类型的值: false
                                 
类型是否可比较: true             
类型是否可比较: false            
类型是否可比较: true             
类型是否可比较: true
```

:::

::: details （4）Elem()：返回子对象Type，父对象必须为 Array, Chan, Map, Pointer, or Slice其中之一

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	// 定义对象
	var (
		v1 = make([]int, 1024)
		v2 = make(map[string]string)
	)

	// 运行时反射其类型
	t1 := reflect.TypeOf(v1)
	t2 := reflect.TypeOf(v2)

	// 返回Array, Chan, Map, Pointer, or Slice的元素类型, Type
	fmt.Printf("元素类型名称: %s\n", t1.Elem().Name())
	fmt.Printf("元素类型名称: %s\n", t2.Elem().Name())
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
元素类型名称: int
元素类型名称: string
```

:::

::: details （5）函数

```go
package main

import (
	"fmt"
	"reflect"
)

func v1() {}

func v2(args ...int) int { return 0 }

func v3(a, b, c string) (int, int, error) { return 0, 0, nil }

func main() {
	// 运行时反射其类型
	t1 := reflect.TypeOf(v1)
	t2 := reflect.TypeOf(v2)
	t3 := reflect.TypeOf(v3)

	// 函数参数是否是可变参数 bool
	fmt.Printf("可变参数: %t\n", t1.IsVariadic())
	fmt.Printf("可变参数: %t\n", t2.IsVariadic())
	fmt.Printf("可变参数: %t\n", t3.IsVariadic())
	fmt.Println()

	// 函数入参个数 int
	fmt.Printf("入参个数: %d\n", t1.NumIn())
	fmt.Printf("入参个数: %d\n", t2.NumIn())
	fmt.Printf("入参个数: %d\n", t3.NumIn())
	fmt.Println()

	// 函数返回值个数 int
	fmt.Printf("返回值个数: %d\n", t1.NumOut())
	fmt.Printf("返回值个数: %d\n", t2.NumOut())
	fmt.Printf("返回值个数: %d\n", t3.NumOut())
	fmt.Println()

	// 取第i个入参/出参
	fmt.Printf("第1个入参类型: %s\n", t3.In(1).Kind())
	fmt.Printf("第1个入参名称: %s\n", t3.In(1).Name())
	fmt.Printf("第1个返回值类型: %s\n", t3.Out(1).Kind())
	fmt.Printf("第1个返回值名称: %s\n", t3.Out(1).Name())
    fmt.Println()
    
	// 函数调用, 需要借助 ValueOf, 和方法调用类似
	fmt.Println(reflect.ValueOf(v3).Call([]reflect.Value{
		reflect.ValueOf("1"),
		reflect.ValueOf("2"),
		reflect.ValueOf("3"),
	}))
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
可变参数: false
可变参数: true
可变参数: false

入参个数: 0
入参个数: 1
入参个数: 3

返回值个数: 0
返回值个数: 1
返回值个数: 3

第1个入参类型: string
第1个入参名称: string
第1个返回值类型: int
第1个返回值名称: int

[<int Value> <int Value> <error Value>]
```

:::

::: details （6）channel

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	// 定义对象
	var (
		v1 = make(chan int)
		v2 = make(<-chan int)
		v3 = make(chan<- int)
	)

	// 运行时反射其类型
	t1 := reflect.TypeOf(v1)
	t2 := reflect.TypeOf(v2)
	t3 := reflect.TypeOf(v3)

	// 返回channel的方向(type ChanDir int)
	fmt.Printf("返回channel的方向: %s\n", t1.ChanDir())
	fmt.Printf("返回channel的方向: %s\n", t2.ChanDir())
	fmt.Printf("返回channel的方向: %s\n", t3.ChanDir())
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
返回channel的方向: chan
返回channel的方向: <-chan
返回channel的方向: chan<-
```

:::

::: details （7）Array

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	// 定义对象
	v1 := [...]int{1, 2, 3}

	// 运行时反射其类型
	t1 := reflect.TypeOf(v1)

	// 返回数组长度, Int
	// 切片不能使用此方法
	fmt.Println(t1.Len())
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
3
```

:::

::: details （8）Map

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	// 定义对象
	v1 := make(map[string]int)

	// 运行时反射其类型
	t1 := reflect.TypeOf(v1)

	// 返回key类型
	fmt.Println(t1.Key())
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
string
```

:::

::: details （9）Struct

```go
package main

import (
	"fmt"
	"reflect"
)

type User struct {
	name string `validate:"required,min=4,max=15"`
	vip  bool
	Info
}

type Info struct {
	age   int
	hobby []string
}

func main() {
	// 定义对象
	v := User{}

	// 运行时反射其类型
	t := reflect.TypeOf(v)

	// 1、字段数量
	fmt.Printf("字段数量: %d\n", t.NumField())

	// 2、通过索引找字段: Field(i int) StructField
	fmt.Printf("通过索引找字段: %s\n", t.Field(0).Name)

	// 3、通过名称找结构体字段
	field, ok := t.FieldByName("name")
	if !ok {
		panic("field not found")
	}
	fmt.Printf("通过名称找字段: %s\n", field.Name)

	// 4、直接获取嵌套的结构体字段, 2: 当前结构体索引为2的字段, 1:子结构体索引为1的字段
	fmt.Printf("子结构体字段名称: %s\n", t.FieldByIndex([]int{2, 1}).Name)

	// 5、根据一个函数筛选字段，返回第一个符合条件的字段
	info, ok := t.FieldByNameFunc(func(s string) bool {
		return s == "Info"
	})
	if !ok {
		panic("not found")
	}
	fmt.Printf("使用函数筛选字段: %v\n", info.Name)

	// 6、是否是匿名字段
	fmt.Printf("是否是匿名字段: %t\n", info.Anonymous)

	// 7、是否可导出
	fmt.Printf("是否是可导出字段: %t\n", field.IsExported())

	// 8、获取字段Tag值
	validate := field.Tag.Get("validate")
	fmt.Printf("获取字段的Tag值: %s\n", validate)
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
字段数量: 3
通过索引找字段: name
通过名称找字段: name
子结构体字段名称: hobby
使用函数筛选字段: Info
是否是匿名字段: true
是否是可导出字段: false
获取字段的Tag值: required,min=4,max=15
```

:::

::: details （10）其他：对齐、模块路径、对象大小

```go
package main

import (
	"fmt"
	"os/exec"
	"reflect"
)

type User struct {
	name string
	vip  bool
	info Info
}

type Info struct {
	age   int
	hobby []string
}

func main() {
	// 定义对象
	var (
		v1 = "hello world!"
		v2 = *exec.Command("go", "version")
		v3 = User{}
		v4 = &User{}
	)

	// 运行时反射其类型
	t1 := reflect.TypeOf(v1)
	t2 := reflect.TypeOf(v2)
	t3 := reflect.TypeOf(v3)
	t4 := reflect.TypeOf(v4)

	// 内存对齐系数 int
	fmt.Printf("内存对齐系数: %d\n", t1.Align())
	fmt.Printf("内存对齐系数: %d\n", t2.Align())
	fmt.Printf("内存对齐系数: %d\n", t3.Align())
	fmt.Printf("内存对齐系数: %d\n", t4.Align())
	fmt.Println()

	// FieldAlign 怎么用还不清楚

	// 模块路径 string
	fmt.Printf("模块路径: %s\n", t1.PkgPath())
	fmt.Printf("模块路径: %s\n", t2.PkgPath()) // 指针可以获取到
	fmt.Printf("模块路径: %s\n", t3.PkgPath())
	fmt.Printf("模块路径: %s\n", t4.PkgPath()) // 指针不能获取到
	fmt.Println()

	// 大小 uintptr 类似于(不等同于?)unsafe.SizeOf
	fmt.Printf("对象大小: %d\n", t1.Size())
	fmt.Printf("对象大小: %d\n", t2.Size())
	fmt.Printf("对象大小: %d\n", t3.Size())
	fmt.Printf("对象大小: %d\n", t4.Size())

	// Bits() 返回类型的size，以bit计算，但如果类型不是Int、Uint、Float、Complex之一则panic
	//fmt.Printf("对象大小: %d\n", t1.Bits()) // panic
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
内存对齐系数: 8
内存对齐系数: 8
内存对齐系数: 8
内存对齐系数: 8

模块路径:
模块路径: os/exec
模块路径: main
模块路径:

对象大小: 16
对象大小: 352
对象大小: 56
对象大小: 8
```

:::

<br />

## ValueOf

::: details （1）获取原始值：使用内置的方法，仅支持部分对象 String Int Float Bool Bytes

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	// 定义对象
	var (
		x1 = "a"
		x2 = 10
		x3 = 3.14
		x4 = []byte("hello world!")
	)

	// 运行时反射其值
	value1 := reflect.ValueOf(x1)
	value2 := reflect.ValueOf(x2)
	value3 := reflect.ValueOf(x3)
	value4 := reflect.ValueOf(x4)

	// 转换到某个具体类型, String Int Float Bool Bytes
	v1 := value1.String()
	v2 := value2.Int()   // 可能会panic,可以先使用 CanInt 判断一下
	v3 := value3.Float() // 可能会panic,可以先使用 CanFloat 判断一下
	v4 := value4.Bytes()

	// 输出值, [1]是位置引用
	fmt.Printf("%[1]T %#[1]v\n", v1)
	fmt.Printf("%[1]T %#[1]v\n", v2)
	fmt.Printf("%[1]T %#[1]v\n", v3)
	fmt.Printf("%[1]T %#[1]v\n", v4)
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
string "a"
int64 10
float64 3.14
[]uint8 []byte{0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21}
```

:::

::: details （2）获取原始值：使用Interface获取通用接口 + 类型断言

```go
package main

import (
	"fmt"
	"reflect"
)

type User struct {
	name string
}

func main() {
	// 定义对象
	var (
		x1 = User{name: "bob"}
		x2 = map[string]int{"b": 2}
	)

	// 运行时反射其值
	v1 := reflect.ValueOf(x1)
	v2 := reflect.ValueOf(x2)

	// 使用Interface获取通用接口
	value1 := v1.Interface().(User)
	value2 := v2.Interface().(map[string]int)

	// 输出值, [1]是位置引用
	fmt.Printf("%[1]T %#[1]v\n", value1.name)
	fmt.Printf("%[1]T %#[1]v\n", value2["b"])

}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
string "bob"
int 2
```

:::

::: details （3）获取原始值：实战获取结构体不可导出字段值

```go
package main

import (
	"fmt"
	"reflect"
	"time"
)

func main() {
	// 定义对象
	t := time.Now()

	// 运行时反射
	value := reflect.ValueOf(t)

	// 遍历所有的字段
	fmt.Printf("type %s %s {\n", value.Type().Name(), value.Kind().String())
	for i := 0; i < value.NumField(); i++ {
		fieldName := value.Type().Field(i).Name // 相当于 TypeOf(t).Field(i).Name
		fieldType := value.Type().Field(i).Type // 相当于 TypeOf(t).Field(i).Type
		fieldValue := value.Field(i)
		fmt.Printf("  %-6s %-16s %v\n", fieldName, fieldType, fieldValue)
	}
	fmt.Println("}")

	// 备注:
	// value.Type().Name()   ---> Time
	// value.Type().String() ---> time.Time
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
type Time struct {
  wall   uint64           13905278706020708460
  ext    int64            4713801             
  loc    *time.Location   &{ [] []  0 0 <nil>}
}
```

:::

::: details （4）可寻址与不可寻址的概念

```go
package main

import (
	"fmt"
	"reflect"
)

type T struct {
	a string
	b int
	c bool
	d []string
	e map[int]int
}

func main() {
	// 定义对象
	var (
		x1 = "hello world!"
		x2 = []int{1, 2, 3}
	)
	// 运行时反射其值
	v1 := reflect.ValueOf(x1)
	v2 := reflect.ValueOf(&x2)

	// 是否可寻址,即是否可以使用Addr()获取值的地址
	// 1、默认情况下Value都是不可寻址的
	// 2、若要支持寻址，使用 ValueOf(指针).Elem()
	// 3、这就好像是
	//    Elem() 返回指针，类似于 &x
	//    Addr() 返回指针值，类似于 *x
	fmt.Printf("是否可寻址: %t\n", v1.CanAddr())
	fmt.Printf("是否可寻址: %t\n", v2.Elem().CanAddr())
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
是否可寻址: false
是否可寻址: true
```

:::

::: details （2）获取原始对象

```go
package main

import (
	"fmt"
	"reflect"
)

type T struct {
	a string
	b int
	c bool
	d []string
	e map[int]int
}

func main() {
	// 定义对象
	x := []int{100, 200, 300}

	// 运行时反射其值
	v := reflect.ValueOf(x)

	// 获取原始值步骤
	// 1、Interface()  返回一个interface{}
	// 2、使用断言机制强制转为普通类型
	value, ok := v.Interface().([]int)
	if !ok {
		panic("convert err")
	}
	fmt.Printf("%#v\n", value)
	fmt.Printf("%d\n", value[0])
	fmt.Printf("%T\n", value)
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
[]int{100, 200, 300}
100  
[]int
```

:::

::: details （3）修改原始对象：方法1

```go
package main

import (
	"fmt"
	"reflect"
)

type T struct {
	a string
	b int
	c bool
	d []string
	e map[int]int
}

func main() {
	// 定义对象
	x := []int{100, 200, 300}
	y := T{a: "a"}

	// 运行时反射其值
	v1 := reflect.ValueOf(&x)
	v2 := reflect.ValueOf(&y)

	// 修改原始值步骤
	// 1、要求对象是可寻址的:
	//      v = reflect.ValueOf(&x) 传递指针对象
	//      v.Elem()
	// 1、.Addr()       返回指向变量的指针
	// 2、.Interface()  返回一个interface{}
	// 3、使用断言机制强制转为普通类型
	value1, ok := v1.Elem().Addr().Interface().(*[]int)
	if !ok {
		panic("convert err")
	}
	value2, ok := v2.Elem().Addr().Interface().(*T)
	if !ok {
		panic("convert err")
	}

	// 修改值: 方法1
	(*value1)[0] = 99
	(*value2).a = "A"

	// 输出值
	fmt.Println(x)
	fmt.Println(y)
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
[99 200 300]
{A 0 false [] map[]}
```

:::

::: details （4）修改原始对象：方法2

```go
package main

import (
	"fmt"
	"reflect"
	"unsafe"
)

type T struct {
	a string
	b int
	c bool
	d []string
	e map[int]int
}

func main() {
	// 定义对象
	x := T{}

	// 运行时反射其值
	v1 := reflect.ValueOf(&x)

	// 修改值: 方法2
	// 1、要求对象是可寻址的:
	//      v = reflect.ValueOf(&x) 传递指针对象
	//      v.Elem()
	// 2、获取要修改的字段
	// 3、如果是可导出字段，则直接使用 field2.Set(reflect.ValueOf(true)) 即可修改
	// 4、如果是非可导出字段，需要使用 reflect.NewAt
	field1 := v1.Elem().FieldByName("c")

	// 适用于可导出字段
	//field1.Set(reflect.ValueOf(true))

	// 适用于可导出字段和非可导出字段
	field1 = reflect.NewAt(field1.Type(), unsafe.Pointer(field1.UnsafeAddr())).Elem()
	field1.Set(reflect.ValueOf(true))

	// 输出值
	fmt.Println(x)
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
{ 0 true [] map[]}
```

:::

::: details （5）结构体：访问和修改不可导出字段

```go
package main

import (
	"fmt"
	"reflect"
	"unsafe"
)

type T struct {
	a string
	b int
	c bool
	d []string
	e map[int]int
}

// GetUnExportedField 访问结构体非可导出字段值
func GetUnExportedField(source any, field string) reflect.Value {
	// 获取非导出字段反射对象
	v := reflect.ValueOf(source).Elem().FieldByName(field)
    // 构建指向该字段的可寻址(addressable)反射对象
	return reflect.NewAt(v.Type(), unsafe.Pointer(v.UnsafeAddr())).Elem()
}

// SetUnExportedField 修改结构体非导出字段值
func SetUnExportedField(source any, field string, value any) error {
	v := GetUnExportedField(source, field)
	rv := reflect.ValueOf(value)
	if v.Kind() != rv.Kind() {
		return fmt.Errorf("invalid kind: expected kind %v, got kind: %v", v.Kind(), rv.Kind())
	}
	v.Set(rv)
	return nil
}

func main() {
	// 实例化结构体
	t := T{
		a: "hello",
		b: 99,
		c: true,
		d: []string{"a", "b", "c"},
		e: map[int]int{10: 11},
	}

	// 获取结构体非导出字段的值
	fmt.Println(GetUnExportedField(&t, "a").String())
	fmt.Println(GetUnExportedField(&t, "b").Int())
	fmt.Println(GetUnExportedField(&t, "c").Bool())
	fmt.Println(GetUnExportedField(&t, "d").Index(1))
	fmt.Println(GetUnExportedField(&t, "e").MapIndex(reflect.ValueOf(10)))

	// 修改结构体非导出字段的值
	err := SetUnExportedField(&t, "a", "world!")
	if err != nil {
		panic(err)
	}
	fmt.Println(GetUnExportedField(&t, "a").String())
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
hello
99    
true  
b     
11    
world!
```

:::

<br />

## 深度相等

::: details （1）结构体：两个结构一样的结构体深度也是不相等的

```go
package main

import (
	"fmt"
	"reflect"
)

type A struct {
	X int
}

type B struct {
	X int
}

func main() {
	fmt.Println(reflect.DeepEqual(A{X: 1}, B{1}))
	fmt.Println(reflect.DeepEqual(A{X: 1}, A{1}))
	fmt.Println(reflect.DeepEqual(B{X: 1}, B{1}))
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
false
true
true
```

:::

::: details （1）结构体：同一个结构体的非导出字段也会进行比较

```go
package main

import (
	"fmt"
	"reflect"
)

type Point struct {
	X int
	Y int
	z int
}

func main() {
	// 同一个结构体,相同的值
	fmt.Println(reflect.DeepEqual(Point{1, 2, 3}, Point{1, 2, 3}))

	// 同一个结构体,非导出字段不同的值
	fmt.Println(reflect.DeepEqual(Point{1, 2, 3}, Point{1, 2, 4}))
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
true
false
```

:::

<br />