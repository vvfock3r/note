# math/rand

文档：[https://pkg.go.dev/math/rand](https://pkg.go.dev/math/rand)

<br />

## 随机数种子

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

# 如上所示，执行两次，输出的随机数居然一样？
# 总结一下就是：对于一次执行来说是随机的，对于多次执行来说是非随机的
```

说明

（1）伪随机数和真随机数

通常我们使用的是<span style="color: red; font-weight: bold;">伪随机数</span>，特点是生成速度快，缺点是不够安全（下面会讲到），而<span style="color: red; font-weight: bold;">真正的随机数</span>是使用物理现象产生的：比如掷钱币、骰子、转轮、使用电子元件的噪音、核裂变等。对于计算机来说，可以通过读取硬件信息来产生真随机数或更加接近真随机数的数字

（2）随机数种子

我们所使用的`math/rand`是通过特定的算法来产生伪随机数，比如说下面这个算法

```c++
RAND_SEED = (RAND_SEED * 123 + 59 ) % 65536;
```

1. `RAND_SEED`是随机数种子，本质上就是一个数字

2. 通常它会有一个初始值，带入公式后我们会得到一个随机数，同时会把这个随机数作为种子，用于下次产生随机数

3. 这会产生一种现象：只要初始随机数种子确定，那么它所产生的前N项随机数就是确定的，也就是说多次运行程序产生的前N项随机数就是确定的，

   这就解释了我们上面所看到的现象

4. 那么`math/rand`包中初始的随机数种子是多少呢？查看一下`rand.Seed`函数

   ```go
   // Seed uses the provided seed value to initialize the default Source to a
   // deterministic state. If Seed is not called, the generator behaves as
   // if seeded by Seed(1). Seed values that have the same remainder when
   // divided by 2³¹-1 generate the same pseudo-random sequence.
   // Seed, unlike the Rand.Seed method, is safe for concurrent use.
   func Seed(seed int64) { globalRand.Seed(seed) }
   ```

   可以很清楚的看到：如果`Seed`未被调用，那么初始随机数种子是1。为了验证，我们使用1和2作为种子测试一下，是否符合我们猜想，这里就不贴结果了

   ```go
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

# 这...怎么这么多重复的？这好像不是随机数吧？
```

说明

首先，初始随机数种子不应该多次初始化。

其次，我们分析一下为什么会出现重复的数字：

因为`for`循环运行的特别快，所以导致多次循环中都获取到了同一纳秒的时间戳，并且使用相同的值重新初始化了随机数种子，那么就相当于随机数算法又从头开始计算随机数了，算出来的随机数都是算法中第一个数字，所以就会导致重复了

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