# math/rand

文档：[https://pkg.go.dev/math/rand](https://pkg.go.dev/math/rand)

<br />

## 随机数概念

**（1）伪随机数和真随机数**

通常我们使用的是<span style="color: red; font-weight: bold;">伪随机数</span>，特点是生成速度快，缺点是不够安全（下面会讲到），而<span style="color: red; font-weight: bold;">真正的随机数</span>是使用物理现象产生的：比如掷钱币、骰子、转轮、使用电子元件的噪音、核裂变等。对于计算机来说，可以通过读取硬件信息来产生真随机数或更加接近真随机数的数字

**（2）随机数种子**

我们所使用的`math/rand`是通过特定的算法来产生伪随机数，比如说下面这个算法

```c++
RAND_SEED = (RAND_SEED * 123 + 59 ) % 65536;
```

1. `RAND_SEED`是随机数种子，本质上就是一个数字

2. 通常它会有一个初始值，带入公式后我们会得到一个随机数，同时会把这个随机数作为种子，用于下次产生随机数

3. 这会产生一种现象，只要初始随机数种子确定，那么它所产生的前N项随机数就是确定的，也就是说多次运行程序产生的前N项随机数就是确定的

   

<br />

## 生成随机数

### Go 1.20之前

::: details 错误示例（1）：使用初始的随机数种子

```go
package main

import (
	"fmt"
	"math/rand"
)

func main() {
	for i := 0; i < 9; i++ {
		fmt.Println(rand.Intn(100)) // 获取 0 - 100之间的随机数，包含0，不包含100
	}
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
81
87
47
59
81
18
25
40
56

D:\application\GoLand\demo>go run main.go
81
87
47
59
81
18
25
40
56

# 分析
# 1、对于一次执行来说是随机的，对于多次执行来说是非随机的
# 2、执行两次，输出的随机数一样,这说明两次使用了相同的随机数种子
# 3、那么math/rand包中初始的随机数种子是多少呢？查看一下rand.Seed函数
// Seed uses the provided seed value to initialize the default Source to a
// deterministic state. If Seed is not called, the generator behaves as
// if seeded by Seed(1). Seed values that have the same remainder when
// divided by 2³¹-1 generate the same pseudo-random sequence.
// Seed, unlike the Rand.Seed method, is safe for concurrent use.
func Seed(seed int64) { globalRand.Seed(seed) }
# 可以很清楚的看到：如果Seed未被调用，那么初始随机数种子是1
# 为了验证，我们使用1和2作为种子测试一下，是否符合我们猜想，这里就不贴结果了
package main

import (
	"fmt"
	"math/rand"
)

func main() {
	rand.Seed(1) // 设置初始随机数种子是1
	for i := 0; i < 9; i++ {
		fmt.Println(rand.Intn(100)) // 获取 0 - 100之间的随机数，包含0，不包含100
	}
}
```

:::

::: details 错误示例（2）：多次初始化随机数种子，且使用相同的随机数种子

```go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	for i := 0; i < 9; i++ {
		rand.Seed(time.Now().UnixNano()) // 每次产生随机数都重新初始化种子，并且我还使用了纳秒作为种子，精度够高吧（偷笑..嘿嘿嘿）
		fmt.Println(rand.Intn(100))      // 获取 0 - 100之间的随机数，包含0，不包含100
	}
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
93
93
93
93
93
93
79
79
79

D:\application\GoLand\demo>go run main.go
81
81
81
81
81
81
20
27
27

# 现象
# 这...怎么这么多重复的？这好像不是随机数吧？

# 分析
# 首先，初始随机数种子不应该多次初始化
# 其次，我们分析一下为什么会出现重复的数字:
#      因为for循环运行的特别快，所以导致多次循环中都获取到了同一纳秒的时间戳，并且使用相同的值重新初始化了随机数种子，
#      那么就相当于随机数算法又从头开始计算随机数了，算出来的随机数都是算法中第一个数字，所以就会导致重复了
```

:::

::: details 正确示例

```go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	// 初始随机数种子设置为一个动态的值，且只设置一次，避免算法又从头开始计算导致的重复
	rand.Seed(time.Now().UnixNano())

	// 产生随机数
	for i := 0; i < 9; i++ {
		fmt.Println(rand.Intn(100)) // 获取 0 - 100之间的随机数，包含0，不包含100
	}
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
91
32
84
11
47
76
84
79
42

D:\application\GoLand\demo>go run main.go
47
42
19
27
72
38
88
63
73
```

:::

<br />

### Go 1.20之后

::: details （1）使用系统自动设置的随机数种子

```go
package main

import (
	"fmt"
	"math/rand"
)

func main() {
	for i := 0; i < 9; i++ {
		fmt.Println(rand.Intn(100)) // 获取 0 - 100之间的随机数，包含0，不包含100
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
14
90
77
51
56
82
29
40
19

D:\application\GoLand\example>go run main.go
84
48
28
43
30
62
28
15
70

# 分析
# 1、Go 1.20及以后已经不推荐使用rand.Seed函数了, rand会自动为我们设置全局随机数种子。Seed函数说明如下
// Seed uses the provided seed value to initialize the default Source to a
// deterministic state. Seed values that have the same remainder when
// divided by 2³¹-1 generate the same pseudo-random sequence.
// Seed, unlike the Rand.Seed method, is safe for concurrent use.
//
// If Seed is not called, the generator is seeded randomly at program startup.
//
// Prior to Go 1.20, the generator was seeded like Seed(1) at program startup.
// To force the old behavior, call Seed(1) at program startup.
// Alternately, set GODEBUG=randautoseed=0 in the environment
// before making any calls to functions in this package.
//
// Deprecated: Programs that call Seed and then expect a specific sequence
// of results from the global random source (using functions such as Int)
// can be broken when a dependency changes how much it consumes
// from the global random source. To avoid such breakages, programs
// that need a specific result sequence should use NewRand(NewSource(seed))
// to obtain a random generator that other packages cannot access.
# 2、全局随机数种子有可能被其他模块所修改，所以更好的办法是使用非全局随机数种子,也就是说使用非全局的Rand对象
```

:::

::: details （2）使用自定义Rand对象

```go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	// 实例化一个非全局的Rand对象,这样做的目的是保护随机数种子不被外部依赖修改
	r := rand.New(rand.NewSource(time.Now().UnixNano()))

	// 使用r代替rand
	for i := 0; i < 9; i++ {
		fmt.Println(r.Intn(100)) // 获取 0 - 100之间的随机数，包含0，不包含100
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
55
62
0
74
27
41
84
92
11

D:\application\GoLand\example>go run main.go
61
12
58
29
73
98
61
90
79
```

:::

<br />

## 随机数的切片操作

### 填充字节切片

::: details 填充到字节切片

```go
package main

import (
	"crypto/md5"
	"crypto/rand"
	"encoding/base64"
	"fmt"
)

func main() {
	// 生成随机数据（比如 10 MB）
	// rand.Read 已经被废弃了，使用 crypto/rand.Read
	// 只需要导入 crypto/rand 即可
	const dataSize = 10 * 1024 * 1024
	data := make([]byte, dataSize)
	n, err := rand.Read(data) // 将随机字节填充到切片中, 保证写满整个切片
	if n != dataSize || err != nil {
		panic("rand.Read failed")
	}

	// 计算MD5值并转为base64
	dataMD5 := md5.Sum(data)
	fmt.Println(base64.StdEncoding.EncodeToString(dataMD5[:]))
}
```

输出结果

```bash
o7AmRvFcg8FBMI3nfaRURw==
```

:::

<br />

### 打乱顺序

::: details 基础版本：打乱数字切片

```go
package main

import (
	"fmt"
	mrand "math/rand"
)

func main() {
	nums := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}

	// 打乱顺序，参数解释：
	// 		n：切片长度
	// 		swap：交换函数，参数 i, j，表示交换索引 i 和 j 的元素
	//      也就是说，你需要告诉 Shuffle 如何交换元素，它就会随机调用 swap 来乱序
	//
    // 切片类型不限：可以是 []int、[]string 或自定义结构体切片
    // Shuffle 不直接操作切片，它只调用你提供的 swap 函数, 更加灵活
    // 也就是说，如果切片中的元素是结构体，我可以将所有结构体中某个字段随机打乱，而结构体顺序将始终保持一致
	mrand.Shuffle(len(nums), func(i, j int) {
		nums[i], nums[j] = nums[j], nums[i]
	})
	fmt.Println(nums)
}
```

输出结果

```bash
[6 5 0 2 9 4 1 7 3 8]
```

:::

::: details 进阶版本：打乱结构体切片

```go
package main

import (
	"fmt"
	"math/rand"
)

type Item struct {
	Name  string
	Value int
}

func main() {
	items := []Item{
		{"A", 1},
		{"B", 2},
		{"C", 3},
		{"D", 4},
	}

	fmt.Println("打乱前:", items)

	rand.Shuffle(len(items), func(i, j int) {
		items[i].Value, items[j].Value = items[j].Value, items[i].Value
	})

	fmt.Println("打乱后:", items)
}
```

输出结果

```bash
打乱前: [{A 1} {B 2} {C 3} {D 4}]
打乱后: [{A 3} {B 4} {C 1} {D 2}]
```

:::

<br />

## 同时导入两个rand包

::: details 点击查看详情

```go
package main

import (
	crand "crypto/rand"
	"encoding/base64"
	"fmt"
	mrand "math/rand"
)

func main() {
	// crypto/rand
	buf := make([]byte, 16)
	_, _ = crand.Read(buf)
	fmt.Println("crypto/rand:", base64.StdEncoding.EncodeToString(buf))

	// math/rand
	n := mrand.Intn(100)
	fmt.Println("math/rand:", n)
}
```

输出结果

```bash
crypto/rand: 84Q/fBjSpQxCtyX6mTJp+w==
math/rand: 81
```

:::