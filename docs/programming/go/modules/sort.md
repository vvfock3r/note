# Sort

文档：[https://pkg.go.dev/sort](https://pkg.go.dev/sort)

<br />

## 排序

### 基本使用

::: details （1）基本使用

```go
package main

import (
	"fmt"
	"sort"
)

func main() {
	// int切片排序
	{
		data := []int{4, 5, 3, 1, 2}
		sort.Ints(data)
		fmt.Printf("%#v\n", data)
		fmt.Println(sort.IntsAreSorted(data)) // 检查是否已排序
	}

	// float64切片排序
	{
		data := []float64{0.4, 0.5, 0.3, 0.1, 0.2}
		sort.Float64s(data)
		fmt.Printf("%#v\n", data)
		fmt.Println(sort.Float64sAreSorted(data)) // 检查是否已排序
	}

	// 字符串切片排序
	{
		data := []string{"H", "e", "l", "l", "o", " ", "W", "o", "r", "l", "d", "!"}
		sort.Strings(data)
		fmt.Printf("%#v\n", data)
		fmt.Println(sort.StringsAreSorted(data)) // 检查是否已排序
	}
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
[]int{1, 2, 3, 4, 5}
true
[]float64{0.1, 0.2, 0.3, 0.4, 0.5}
true
[]string{" ", "!", "H", "W", "d", "e", "l", "l", "l", "o", "o", "r"}
true
```

:::

从上面可以看到：

* 默认都是按升序排序，如何按照降序排序？
* 默认不支持像`int32`、`float32`这种切片结构，该如何解决？
* 排序函数是直接对数据进行操作的，如何返回一份新的排序好的数据？

::: details （2）简单看一下源码

```go
// 查看sort.Ints源码
func Ints(x []int) { Sort(IntSlice(x)) }

// --------------------------------------------------------------------------------
// 看一下IntSlice，他是一个自定义类型，且实现了一堆方法
type IntSlice []int

func (x IntSlice) Len() int           { return len(x) }
func (x IntSlice) Less(i, j int) bool { return x[i] < x[j] }
func (x IntSlice) Swap(i, j int)      { x[i], x[j] = x[j], x[i] }
func (x IntSlice) Sort() { Sort(x) }

// --------------------------------------------------------------------------------
// 看一下Sort函数，sort函数需要一个Interface类型的数据，Interface是一个接口，定义了3个方法
func Sort(data Interface) {
	n := data.Len()
	if n <= 1 {
		return
	}
	limit := bits.Len(uint(n))
	pdqsort(data, 0, n, limit)
}

type Interface interface {
	Len() int	
	Less(i, j int) bool
	Swap(i, j int)
}

// 我们来总结一下：
//   (1) 函数内部会将int切片转为自定义类型IntSlice，该自定义类型实现了Interface接口，从而可以作为参数传到Sort函数中，Sort函数就是用来真正实现排序的
//   (2) 对于sort.Float64s和sort.Strings，也是一样的套路

// --------------------------------------------------------------------------------
// 所以也可以写成下面这个样子

package main

import (
	"fmt"
	"sort"
)

func main() {
	// int切片排序
	data := []int{4, 5, 3, 1, 2}
	sort.Sort(sort.IntSlice(data))
	fmt.Printf("%#v\n", data)
}
```

:::

<br />

### 解决遗留问题

这里我们来解决上面遗留的几个问题

::: details （1）如何倒序排序？

```go
package main

import (
	"fmt"
	"sort"
)

func main() {
	// int切片倒叙排序
	{
		data := []int{4, 5, 3, 1, 2}
		sort.Sort(sort.Reverse(sort.IntSlice(data)))
		fmt.Printf("%#v\n", data)
		fmt.Println(sort.IsSorted(sort.Reverse(sort.IntSlice(data)))) // 检查是否已降序排序
	}

	// float64切片排序
	{
		data := []float64{0.4, 0.5, 0.3, 0.1, 0.2}
		sort.Sort(sort.Reverse(sort.Float64Slice(data)))
		fmt.Printf("%#v\n", data)
		fmt.Println(sort.IsSorted(sort.Reverse(sort.Float64Slice(data)))) // 检查是否已降序排序
	}

	// 字符串切片排序
	{
		data := []string{"H", "e", "l", "l", "o", " ", "W", "o", "r", "l", "d", "!"}
		sort.Sort(sort.Reverse(sort.StringSlice(data)))
		fmt.Printf("%#v\n", data)
		fmt.Println(sort.IsSorted(sort.Reverse(sort.StringSlice(data)))) // 检查是否已降序排序
	}
}

// --------------------------------------------------------------------------------------------

// 观察这段代码 sort.Sort(sort.Reverse(sort.IntSlice(data)))
// 这里多了一层 sort.Reverse，这是什么意思呢？

type reverse struct {
	Interface
}

func (r reverse) Less(i, j int) bool {
	return r.Interface.Less(j, i)      // 可以看到这里调换了i和j的顺序，从而实现倒序，非常巧妙
}

// 对于检查是否倒叙排序，我们也采用类似的方法就得到了如下的代码
sort.IsSorted(sort.Reverse(sort.IntSlice(data)))
```

:::

::: details （2）如何对类似于int32、float32这种切片结构排序？

我们可以参考`[]int`实现像`IntSlice32`类型，但是这样做未免太麻烦了，有什么好的解决方案吗？

```go
package main

import (
	"fmt"
	"sort"
)

func main() {
	// int32切片排序：通过向sort.Slice传递自定义比较函数来实现排序
	// 这里还需要注意2点：
	//   (1) 查看sort.Slice源码，发现内部使用了反射，所以初步估计此函数效率会差一些
	//   (2) 我们可以很方便的在自定义比较函数中控制><来实现正序或倒序排序
	data := []int32{4, 5, 3, 1, 2}
	sort.Slice(data, func(i, j int) bool {
		return data[i] > data[j]
	})
	fmt.Printf("%#v\n", data)

	// 是否已经排好序
	fmt.Println(sort.SliceIsSorted(data, func(i, j int) bool {
		return data[i] > data[j]
	}))
}

// -----------------------------------------------------------------------

// 我们可以做一下性能测试
package main

import (
	"sort"
	"testing"
)

func BenchmarkSortInts(b *testing.B) {
	for i := 0; i < b.N; i++ {
		data := []int{4, 5, 3, 1, 2}
		sort.Ints(data)
	}
}

func BenchmarkSortSlice(b *testing.B) {
	for i := 0; i < b.N; i++ {
		data := []int{4, 5, 3, 1, 2}
		sort.Slice(data, func(i, j int) bool {
			return data[i] < data[j]
		})
	}
}

// 输出结果
D:\application\GoLand\demo>go test -bench .
goos: windows
goarch: amd64
pkg: demo
cpu: Intel(R) Core(TM) i7-4790K CPU @ 4.00GHz
BenchmarkSortInts-8      9327727               120.6 ns/op
BenchmarkSortSlice-8     7123986               170.0 ns/op
PASS
ok      demo    2.670s
```

:::

::: details （3）不直接修改数据，而是返回一份新的排好序的数据？

`sort`包没有提供返回新数据的函数，所以这里只能将数据拷贝一份，然后在进行修改

```go
package main

import (
	"fmt"
	"sort"
)

func main() {
	// 源数据
	data := []int{4, 5, 3, 1, 2}

	// 将源数据拷贝一份，需要特别注意深浅拷贝的区别
	data2 := make([]int, len(data))
	copy(data2, data)

	// 对新数据进行排序
	sort.Ints(data2)

	// 查看新老数据
	fmt.Println(data)
	fmt.Println(data2)
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
[4 5 3 1 2]
[1 2 3 4 5]
```

:::

<br />

### 自定义结构体排序

::: details 方式1：sort.Slice（推荐）

```go
package main

import (
	"fmt"
	"math/rand"
	"sort"
	"time"
)

type Point struct {
	x int
	y int
	z int
}

func main() {
	// 初始化
	var points []Point
	var RandInt = func(start, end int) int {
		return start + rand.Intn(end-start) // 包含start,但是不包含end
	}
	rand.Seed(time.Now().UnixNano())

	// 生成数据
	for i := 0; i < 9; i++ {
		point := Point{RandInt(10, 99), RandInt(10, 99), RandInt(10, 99)}
		points = append(points, point)
	}

	// 查看数据
	fmt.Println("排序前数据: ")
	for i := 0; i < len(points); i++ {
		fmt.Printf("[%d] %+v\n", i+1, points[i])
	}

	// 排序 - 方式一，因为用了反射，性能差点意思，但是胜在简单/灵活，推荐使用
	sort.Slice(points, func(i, j int) bool {
		return points[i].x < points[j].x
	})

	// 查看数据
	fmt.Println("排序后数据: ")
	for i := 0; i < len(points); i++ {
		fmt.Printf("[%d] %+v\n", i+1, points[i])
	}
}
```

输出结果

```bash
排序前数据:
[1] {x:55 y:98 z:70}
[2] {x:22 y:49 z:35}
[3] {x:30 y:38 z:40}
[4] {x:70 y:57 z:69}
[5] {x:18 y:90 z:18}
[6] {x:32 y:65 z:10}
[7] {x:34 y:66 z:42}
[8] {x:59 y:41 z:71}
[9] {x:62 y:20 z:48}
排序后数据:         
[1] {x:18 y:90 z:18}
[2] {x:22 y:49 z:35}
[3] {x:30 y:38 z:40}
[4] {x:32 y:65 z:10}
[5] {x:34 y:66 z:42}
[6] {x:55 y:98 z:70}
[7] {x:59 y:41 z:71}
[8] {x:62 y:20 z:48}
[9] {x:70 y:57 z:69}
```

:::

::: details 方式2：自定义PointSlice类型，并实现Len、Less、Swap方法

```go
package main

import (
	"fmt"
	"math/rand"
	"sort"
	"time"
)

type Point struct {
	x int
	y int
	z int
}

type PointSlice []Point

func (p PointSlice) Len() int {
	return len(p)
}
func (p PointSlice) Less(i, j int) bool {
	return p[i].x < p[j].x
}
func (p PointSlice) Swap(i, j int) {
	p[i], p[j] = p[j], p[i]
}

func (p PointSlice) Sort() PointSlice {
	sort.Sort(p)
	return p
}

func main() {
	// 初始化
	var points []Point
	var RandInt = func(start, end int) int {
		return start + rand.Intn(end-start) // 包含start,但是不包含end
	}
	rand.Seed(time.Now().UnixNano())

	// 生成数据
	for i := 0; i < 9; i++ {
		point := Point{RandInt(10, 99), RandInt(10, 99), RandInt(10, 99)}
		points = append(points, point)
	}

	// 查看数据
	fmt.Println("排序前数据: ")
	for i := 0; i < len(points); i++ {
		fmt.Printf("[%d] %+v\n", i+1, points[i])
	}

	// 排序 - 方式二，自定义PointSlice类型，并实现Len、Less、Swap方法
	points2 := PointSlice(points) // 转为PointSlice对象
	sort.Sort(points2)            // 使用sort包排序
	points = points2              // 再转为[]Point结构

	// 查看数据
	fmt.Println("排序后数据: ")
	for i := 0; i < len(points); i++ {
		fmt.Printf("[%d] %+v\n", i+1, points[i])
	}
}
```

输出结果

```bash
排序前数据:
[1] {x:46 y:45 z:40}
[2] {x:28 y:36 z:47}
[3] {x:58 y:10 z:29}
[4] {x:84 y:88 z:70}
[5] {x:49 y:57 z:81}
[6] {x:32 y:82 z:93}
[7] {x:20 y:21 z:86}
[8] {x:12 y:23 z:51}
[9] {x:30 y:50 z:14}
排序后数据:         
[1] {x:12 y:23 z:51}
[2] {x:20 y:21 z:86}
[3] {x:28 y:36 z:47}
[4] {x:30 y:50 z:14}
[5] {x:32 y:82 z:93}
[6] {x:46 y:45 z:40}
[7] {x:49 y:57 z:81}
[8] {x:58 y:10 z:29}
[9] {x:84 y:88 z:70}
```

:::

::: details 方式2的第一次优化：简化代码

```go
package main

import (
	"fmt"
	"math/rand"
	"sort"
	"time"
)

type Point struct {
	x int
	y int
	z int
}

type PointSlice []Point

func (p PointSlice) Len() int {
	return len(p)
}
func (p PointSlice) Less(i, j int) bool {
	return p[i].x < p[j].x
}
func (p PointSlice) Swap(i, j int) {
	p[i], p[j] = p[j], p[i]
}

func (p PointSlice) Sort() PointSlice {
	sort.Sort(p)
	return p
}

func (p PointSlice) SortWithReverse() PointSlice {
	sort.Sort(sort.Reverse(p))
	return p
}

func main() {
	// 初始化
	var points []Point
	var RandInt = func(start, end int) int {
		return start + rand.Intn(end-start) // 包含start,但是不包含end
	}
	rand.Seed(time.Now().UnixNano())

	// 生成数据
	for i := 0; i < 9; i++ {
		point := Point{RandInt(10, 99), RandInt(10, 99), RandInt(10, 99)}
		points = append(points, point)
	}

	// 查看数据
	fmt.Println("排序前数据: ")
	for i := 0; i < len(points); i++ {
		fmt.Printf("[%d] %+v\n", i+1, points[i])
	}

	// 排序 - 方式二的第一次优化
	//  (1) 给PointSlice增加了一个Sort方法，我们下面的代码看起来就简练很多了
	//  (2) 并且赠送了一个SortWithReverse,用来倒序排序
	points = PointSlice(points).Sort()

	// 查看数据
	fmt.Println("排序后数据: ")
	for i := 0; i < len(points); i++ {
		fmt.Printf("[%d] %+v\n", i+1, points[i])
	}
}
```

输出结果

```bash
排序前数据:
[1] {x:73 y:65 z:96}
[2] {x:37 y:28 z:47}
[3] {x:37 y:63 z:90}
[4] {x:92 y:88 z:21}
[5] {x:89 y:18 z:69}
[6] {x:55 y:97 z:34}
[7] {x:19 y:40 z:26}
[8] {x:78 y:28 z:59}
[9] {x:82 y:26 z:98}
排序后数据:         
[1] {x:19 y:40 z:26}
[2] {x:37 y:28 z:47}
[3] {x:37 y:63 z:90}
[4] {x:55 y:97 z:34}
[5] {x:73 y:65 z:96}
[6] {x:78 y:28 z:59}
[7] {x:82 y:26 z:98}
[8] {x:89 y:18 z:69}
[9] {x:92 y:88 z:21}
```

:::

::: details 方式2的第二次优化：支持自定义比较函数（推荐）

```go
package main

import (
	"fmt"
	"math/rand"
	"sort"
	"time"
)

type Point struct {
	x int
	y int
	z int
}

type PointList struct {
	pslice []Point
	less   func(i, j Point) bool // 这里是重点，这里是我们自定义的比较函数,内部字段
}

func (p PointList) Len() int {
	return len(p.pslice)
}

// 这里是重点
func (p PointList) Less(i, j int) bool {
	return p.less(p.pslice[i], p.pslice[j])
}

func (p PointList) Swap(i, j int) {
	p.pslice[i], p.pslice[j] = p.pslice[j], p.pslice[i]
}

// 支持自定义比较函数的排序函数
func (p PointList) SortFunc(less func(i, j Point) bool) PointList {
	p.less = less
	sort.Stable(p)
	return p
}

// 构造函数
func NewPointList(pslice []Point) PointList {
	return PointList{pslice: pslice}
}

func main() {
	// 初始化
	var points []Point
	var RandInt = func(start, end int) int {
		return start + rand.Intn(end-start) // 包含start,但是不包含end
	}
	rand.Seed(time.Now().UnixNano())

	// 生成数据
	for i := 0; i < 9; i++ {
		point := Point{RandInt(10, 99), RandInt(10, 99), RandInt(10, 99)}
		points = append(points, point)
	}

	// 查看数据
	fmt.Println("排序前数据: ")
	for i := 0; i < len(points); i++ {
		fmt.Printf("[%d] %+v\n", i+1, points[i])
	}

	// 排序
	pointSort := NewPointList(points)
	pointSort.SortFunc(func(i, j Point) bool {
		return i.x < j.x
	})

	// 查看数据
	fmt.Println("排序后数据: ")
	for i := 0; i < len(points); i++ {
		fmt.Printf("[%d] %+v\n", i+1, points[i])
	}
}

// 总结：
//   (1) 如果是单纯为了排序，这种方法不可取，因为太复杂了，但是，
//   (2) 如果本身就有一个这样的结构体，要给他增加一个排序方法，这种方式就很好用了
```

输出结果

```bash
排序前数据:
[1] {x:75 y:49 z:79}
[2] {x:25 y:18 z:15}
[3] {x:12 y:82 z:52}
[4] {x:50 y:61 z:20}
[5] {x:22 y:77 z:22}
[6] {x:34 y:61 z:20}
[7] {x:42 y:81 z:16}
[8] {x:82 y:25 z:15}
[9] {x:83 y:53 z:72}
排序后数据:         
[1] {x:12 y:82 z:52}
[2] {x:22 y:77 z:22}
[3] {x:25 y:18 z:15}
[4] {x:34 y:61 z:20}
[5] {x:42 y:81 z:16}
[6] {x:50 y:61 z:20}
[7] {x:75 y:49 z:79}
[8] {x:82 y:25 z:15}
[9] {x:83 y:53 z:72}
```

:::

<br />

### 包含多个排序条件

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"math/rand"
	"sort"
	"time"
)

type Point struct {
	x int
	y int
	z int
}

func main() {
	// 初始化
	var points []Point
	var RandInt = func(start, end int) int {
		return start + rand.Intn(end-start) // 包含start,但是不包含end
	}
	rand.Seed(time.Now().UnixNano())

	// 生成数据
	for i := 0; i < 9; i++ {
		point := Point{RandInt(10, 15), RandInt(10, 15), RandInt(10, 15)}
		points = append(points, point)
	}

	// 查看数据
	fmt.Println("排序前数据: ")
	for i := 0; i < len(points); i++ {
		fmt.Printf("[%d] %+v\n", i+1, points[i])
	}

	// 排序：按照多条件排序
	sort.Slice(points, func(i, j int) bool {
		// 第一条件: 按照x升序排序
		if points[i].x != points[j].x {
			return points[i].x < points[j].x
		}

		// 第二条件：按照y降序排序
		if points[i].y != points[j].y {
			return points[i].y > points[j].y
		}

		// 第三条件：按照z升序排序
		return points[i].z < points[j].z
	})

	// 查看数据
	fmt.Println("排序后数据: ")
	for i := 0; i < len(points); i++ {
		fmt.Printf("[%d] %+v\n", i+1, points[i])
	}
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
排序前数据: 
[1] {x:16 y:14 z:16}
[2] {x:14 y:18 z:16}
[3] {x:12 y:18 z:13}
[4] {x:17 y:11 z:18}
[5] {x:12 y:12 z:19}
[6] {x:14 y:13 z:10}
[7] {x:17 y:19 z:16}
[8] {x:14 y:18 z:18}
[9] {x:18 y:19 z:17}
排序后数据:
[1] {x:12 y:18 z:13}
[2] {x:12 y:12 z:19}
[3] {x:14 y:18 z:16}
[4] {x:14 y:18 z:18}
[5] {x:14 y:13 z:10}
[6] {x:16 y:14 z:16}
[7] {x:17 y:19 z:16}
[8] {x:17 y:11 z:18}
[9] {x:18 y:19 z:17}
```

:::

<br />

### 按照指定顺序排序

::: details （1）基础版本

```go
package main

import (
	"fmt"
	"sort"
)

func main() {
	// 功能解释: 将 data 按照 reference 中的元素顺序来排序

	// 原始数据
	data := []int{7, 1, 3, 9, 0, 4, 1, 8, 9, 0, 2, 5}

	// 排序数据
	reference := []int{5, 4, 3, 2, 1, 0, 9, 8, 7, 6}

	// 索引函数
	getIndex := func(r []int, v int) int {
		for i := range r {
			if r[i] == v {
				return i
			}
		}
		return len(r)
	}

	// 按指定数据进行排序
	sort.Slice(data, func(i, j int) bool {
		return getIndex(reference, data[i]) < getIndex(reference, data[j])
	})

	// 查看排序后的结果
	fmt.Printf("%+v\n", data)
}

// 需要注意的点:
//   (1) 排序数据(reference)中是否包含原始数据的所有种类?
//   (2) 不包含时我们的排序结果是如何分布的? 如何修改分布情况?
//
// 总结: 这里面学问还是比较大的,建议在包含原始数据种类的情况下可以大胆使用
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
[5 4 3 2 1 1 0 0 9 9 8 7]
```

:::

::: details （2）优化版本，增加一层缓存，减少遍历次数

```go
package main

import (
	"fmt"
	"sort"
)

func main() {
	// 功能解释: 将 data 按照 reference 中的元素顺序来排序

	// 原始数据
	data := []int{7, 1, 3, 9, 0, 4, 1, 8, 9, 0, 2, 5}

	// 排序数据
	reference := []int{5, 4, 3, 2, 1, 0, 9, 8, 7, 6}

	// 对排序数据生成缓存
	makeCache := func(r []int) map[int]int {
		m := make(map[int]int, len(r))
		for k, v := range r {
			m[v] = k
		}
		return m
	}
	cache := makeCache(reference)

	// 索引函数,修改为从缓存中读取
	getIndex := func(r map[int]int, v int) int {
		if index, ok := r[v]; ok {
			return index
		}
		return len(r)
	}

	// 按指定数据进行排序
	sort.Slice(data, func(i, j int) bool {
		return getIndex(cache, data[i]) < getIndex(cache, data[j])
	})

	// 查看排序后的结果
	fmt.Printf("%+v\n", data)
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
[5 4 3 2 1 1 0 0 9 9 8 7]
```

:::

<br />

### 稳定和不稳定排序

因为代码不容出测试出结果，我们直接举个假想的例子来说明

```go
// 排序规则：仅按照x的值来进行排序

// 排序前数据:
{x:26 y:45 z:16}
{x:37 y:19 z:45}
{x:26 y:36 z:94}

// 排序后数据:
{x:26 y:36 z:94}
{x:26 y:45 z:16}
{x:37 y:19 z:45}

// 发现什么问题了吗？
// (1) 首先，的确是按照x值进行排序了
// (2) 其次，我们看y值的数据，原始数据中y=45为第一条数据，排序后变成第二条数据了，
//          它其实放到第一条顺序也是可以的，同样满足按照x值排序
//          像这种 => 可能会发生排序后的顺序与原始顺序不一致的情况，我们就称为不稳定排序，反之称为稳定排序
// (3) sort.Sort和sort.Slice是不稳定排序
// (4) sort.Stable和sort.SliceStable是对应的稳定排序
```

<br />

## 二分查找

二分查找有一个前提：<span style="color: red; font-weight: bold;">数据必须是已经排好序的，可以是升序或者降序</span>

### 基本使用

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"sort"
)

func main() {
	{
		// int切片,已经按升序排好序
		a := []int{1, 3, 6, 10, 15, 21, 28, 36, 45, 55}

		// 返回切片中>=11的第一个元素的索引
		fmt.Println(sort.SearchInts(a, 11))
	}

	{
		// float64切片,已经按升序排好序
		a := []float64{1.0, 2.0, 3.3, 4.6, 6.1, 7.2, 8.0}

		// 返回切片中>=2.1的第一个元素的索引
		fmt.Println(sort.SearchFloat64s(a, 2.1))
	}

	{
		// 字符串切片,已经按第一个字符升序排好序
		a := []string{"bob", "jack", "xiaoming"}

		// 返回切片中第一个字符>=j的第一个元素的索引
		fmt.Println(sort.SearchStrings(a, "j"))
	}
}
```

输出结果

```bash
4
2
1
```

这里的套路和排序一致，我们在后面看一下如何降序搜索等

:::

<br />

### 进一步使用

::: details （1）使用sort.Search

```go
package main

import (
	"fmt"
	"sort"
)

func main() {
	// int切片
	a := []int32{1, 3, 28, 10, 21, 15, 45, 6, 55, 36}
	fmt.Printf("原始数据: %v\n\n", a)

	{
		// 升序排序
		sort.Slice(a, func(i, j int) bool {
			return a[i] < a[j]
		})
		fmt.Printf("升序排序: %v\n", a)

		// 返回切片中>=11的第一个元素的索引
		i := sort.Search(len(a), func(i int) bool {
			return a[i] >= 11
		})
		fmt.Printf("找到索引: %v\n\n", i)

		// 总结: 在升序排序中,查找时需要使用>或>=
	}

	{
		// 按降序排序
		sort.Slice(a, func(i, j int) bool {
			return a[i] > a[j]
		})
		fmt.Printf("降序排序: %+v\n", a)

		// 返回切片中>=11的第一个元素的索引
		i := sort.Search(len(a), func(i int) bool {
			return a[i] <= 11
		})
		fmt.Printf("找到索引: %v\n\n", i)

		// 总结: 在降序排序中,查找时需要使用<或<=
	}
}
```

输出结果

```bash
原始数据: [1 3 28 10 21 15 45 6 55 36]

升序排序: [1 3 6 10 15 21 28 36 45 55]
找到索引: 4                           
                                      
降序排序: [55 45 36 28 21 15 10 6 3 1]
找到索引: 6
```

:::

**引出问题**

（1）`sort.Search`的第一个参数`n`是什么意思？

第一个参数代表索引结束范围，使用`len(a)`，拿到最大索引，也就意味着允许查找整个切片

（2）若未找到的话会返回什么值？

若未找到会返回`n`的值，即返回`sort.Search`第一个参数的值

（3）`sort.Search`始终都会返回一个索引值（`int`），通常我们还要和`len(a)`做一次判断，来检查返回的索引是否存在。有办法简化这一步骤吗？

可以，使用`sort.Find`

::: details （2）使用sort.Find：sort.Search的升级版本

```go
package main

import (
	"fmt"
	"sort"
)

func main() {
	// int切片
	a := []int32{1, 3, 28, 10, 21, 15, 45, 6, 55, 36}
	fmt.Printf("原始数据: %v\n", a)

	{
		// 升序排序
		sort.Slice(a, func(i, j int) bool {
			return a[i] < a[j]
		})
		fmt.Printf("\n升序排序: %v\n", a)

		// 检查切片中是否有 >= 11的值
		index, found := sort.Find(len(a), func(i int) int {
			if a[i] >= 11 {
				return 0 // 若找到返回0
			}
			return 1 // 若没找到,升序切片,返回>0的值
		})
		fmt.Printf("是否找到: %v\n", found)
		fmt.Printf("索引是啥: %v\n", index)
		fmt.Printf("索引的值: %v\n", a[index]) // 若没找到,这里会索引越界报错
	}

	{
		// 按降序排序
		sort.Slice(a, func(i, j int) bool {
			return a[i] > a[j]
		})
		fmt.Printf("\n降序排序: %+v\n", a)

		// 检查切片中是否有 <= 11的值
		index, found := sort.Find(len(a), func(i int) int {
			if a[i] <= 11 {
				return 0 // 若找到返回0
			}
			return 1 // 若没找到,降序切片,返回>0的值
		})
		fmt.Printf("是否找到: %v\n", found)
		fmt.Printf("索引是啥: %v\n", index)
		fmt.Printf("索引的值: %v\n", a[index]) // 若没找到,这里会索引越界报错
	}

	// 总结:
	// (1) 不管是升序还是降序,若找到了返回0,若没找到返回>0的值
	// (2) 若没找到的话,还是和sort.Search一样,索引的值为n,即len(a)
}
```

输出结果

```bash
原始数据: [1 3 28 10 21 15 45 6 55 36]

升序排序: [1 3 6 10 15 21 28 36 45 55]
是否找到: true                        
索引是啥: 4                           
索引的值: 15                          
                                      
降序排序: [55 45 36 28 21 15 10 6 3 1]
是否找到: true                        
索引是啥: 6                           
索引的值: 10
```

:::
