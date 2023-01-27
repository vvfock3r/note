# rate

文档：[https://pkg.go.dev/golang.org/x/time/rate](https://pkg.go.dev/golang.org/x/time/rate)

## 安装

```bash
go get golang.org/x/time/rate
```

## 初始化桶

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"golang.org/x/time/rate"
	"log"
	"time"
)

func main() {
	// 实例化一个令牌桶对象，使用数字指定速率
	{
		// 实例化一个令牌桶对象, 10代表桶容量, 1代表每秒放入1个Token到桶中
        // 如果下面的1传入一个变量的话，需要使用rate.Limit(n)来进行类型转换
		limiter := rate.NewLimiter(1, 10)

		// 查看令牌桶信息
		log.Printf("桶容量: %d\n", limiter.Burst())
		log.Printf("桶内令牌数量: %.2f\n", limiter.Tokens())
		log.Printf("令牌放入桶中的速率: %.2f/s\n", limiter.Limit())
		fmt.Println()
	}

	// 实例化一个令牌桶对象，使用rate.Every指定速率
	{
		// 实例化一个令牌桶对象
		// 每500毫秒放入一个Token到桶中，换算一下，每秒可以放入2个Token到桶中
		limiter := rate.NewLimiter(rate.Every(time.Millisecond*500), 20)

		// 查看令牌桶信息
		log.Printf("桶容量: %d\n", limiter.Burst())
		log.Printf("桶内令牌数量: %.2f\n", limiter.Tokens())
		log.Printf("令牌放入桶中的速率: %.2f/s\n", limiter.Limit())
		fmt.Println()
	}

	// 实例化一个令牌桶对象，使用rate.Inf指定速率，rate.Inf值为math.MaxFloat64，代表不限制速率
	{
		// 实例化一个令牌桶对象
		// 每500毫秒放入一个Token到桶中，换算一下，每秒可以放入2个Token到桶中
		limiter := rate.NewLimiter(rate.Inf, 30)

		// 查看令牌桶信息
		log.Printf("桶容量: %d\n", limiter.Burst())
		log.Printf("桶内令牌数量: %.2f\n", limiter.Tokens())
		log.Printf("令牌放入桶中的速率: %.2f/s\n", limiter.Limit())
		fmt.Println()
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
2023/01/02 05:41:30 桶容量: 10
2023/01/02 05:41:30 桶内令牌数量: 10.00
2023/01/02 05:41:30 令牌放入桶中的速率: 1.00/s

2023/01/02 05:41:30 桶容量: 20
2023/01/02 05:41:30 桶内令牌数量: 20.00
2023/01/02 05:41:30 令牌放入桶中的速率: 2.00/s

2023/01/02 05:41:30 桶容量: 30
2023/01/02 05:41:30 桶内令牌数量: 30.00
2023/01/02 05:41:30 令牌放入桶中的速率: 179769313486231570814527423731704356798070567525844996598917476803157260780028538760589558632766878171540458953514382464234321326889464182768467546703537516986049910576551282076245490090389328
944075868508455133942304583236903222948165808559332123348274797826204144723168738177180919299881250404026184124858368.00/s
```

:::

<br />

## 消费令牌

::: details （1）Wait / WaitN

```go
package main

import (
	"context"
	"golang.org/x/time/rate"
	"log"
	"math"
)

func main() {
	// 实例化一个令牌桶对象
	limiter := rate.NewLimiter(1, 10)

	// Wait(ctx) 实际调用的是 WaitN(ctx, 1)，表示我要消费1个Token
	// 如果此时桶内Token数量不足1个，那么Wait方法将会一直阻塞
	err := limiter.Wait(context.TODO())
	if err != nil {
		panic(err)
	} else {
		log.Println("消费1个Token")
	}

	// 如果要消费的Token数量大于桶容量，那么会报错
	err = limiter.WaitN(context.TODO(), 11)
	log.Println(err)

	// 如果速率设置的是rate.Inf，则超过桶容量也不会报错
	limiter.SetLimit(rate.Inf)
	err = limiter.WaitN(context.TODO(), math.MaxInt64)
	log.Println(err)
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
2023/01/01 20:51:20 消费1个Token
2023/01/01 20:51:20 rate: Wait(n=11) exceeds limiter's burst 10
2023/01/01 20:51:20 <nil>
```

:::

::: details （2）Allow / AllowN

```go
package main

import (
	"fmt"
	"golang.org/x/time/rate"
	"time"
)

func main() {
	// 实例化一个令牌桶对象
	limiter := rate.NewLimiter(1, 10)

	// Allow() 等同于 AllowN(time.Now(), 1)
	// 表示在某一时刻，要消费桶内1个Token，满足则消费1个Token并返回true，不满足则不消费Token并返回false
	{
		ok := limiter.Allow()
		fmt.Println(ok)
	}
	{
		ok := limiter.AllowN(time.Now(), 9)
		fmt.Println(ok)
	}
	{
		ok := limiter.Allow()
		fmt.Println(ok)
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
true
true
false
```

:::

::: details （3）Reserve / ReserveN

```go
package main

import (
	"context"
	"golang.org/x/time/rate"
	"log"
	"time"
)

func main() {
	// 实例化一个令牌桶对象,每10秒放入一个新令牌
	limiter := rate.NewLimiter(rate.Every(time.Second*10), 10)
	log.Printf("初始化桶成功, 桶内令牌数量: %.2f\n", limiter.Tokens())

	// 将桶内令牌消耗完
	err := limiter.WaitN(context.TODO(), 10)
	if err != nil {
		panic(err)
	}
	log.Printf("消费所有令牌, 剩余令牌数量: %.2f\n", limiter.Tokens())

	// Reserve() 实际调用的是 ReserveN(time.Now(), 1)，这个对象比较复杂
	//  1.表示要消耗1个Token
	//  2.无论Token是否充足，都会返回一个 *Reservation 对象
	//  3.可以将它比作是提前消费，调用Reserve后桶内可能出现负值
	r := limiter.Reserve()
	if !r.OK() {
		panic("limiter reserve not ok")
	}
	log.Printf("调用Reserve,  桶内令牌数量: %.2f\n", limiter.Tokens())

	// r.Delay()会告诉我们需要等待多久才能满足我们的要求（消耗指定数量的令牌）
	// 如果桶内有足量Token，返回0
	// 如果桶内没有足量token，返回需要等待的时间
	time.Sleep(r.Delay())
	log.Printf("等待令牌成功, 桶内令牌数量: %.2f\n", limiter.Tokens())

	// r.Cancel() 用于取消，用于归还Token
	// 将 r.Delay() 代码注释掉，就可以看到令牌数量为0（而不是负数），就代表归还了令牌
	//r.Cancel()
	//log.Printf("取消令牌成功, 桶内令牌数量: %.2f\n", limiter.Tokens())
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
2023/01/02 06:18:25 初始化桶成功, 桶内令牌数量: 10.00
2023/01/02 06:18:25 消费所有令牌, 剩余令牌数量: 0.00 
2023/01/02 06:18:25 调用Reserve, 桶内令牌数量: -1.00 # 可以看到为负值了，提前消费
2023/01/02 06:18:35 等待令牌成功, 桶内令牌数量: 0.00
```

:::

::: details （4）一直消费的情况限流表现

```go
package main

import (
	"context"
	"golang.org/x/time/rate"
	"log"
)

func main() {
	// 实例化一个令牌桶对象
	limiter := rate.NewLimiter(1, 10)

	// 一直消费的情况限流表现
	for i := 0; i < 15; i++ {
		err := limiter.Wait(context.TODO())
		if err != nil {
			panic(err)
		} else {
			log.Printf("消费%-2d个Token\n", i+1)
		}
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
2023/01/01 21:07:42 消费1 个Token
2023/01/01 21:07:42 消费2 个Token
2023/01/01 21:07:42 消费3 个Token
2023/01/01 21:07:42 消费4 个Token
2023/01/01 21:07:42 消费5 个Token
2023/01/01 21:07:42 消费6 个Token
2023/01/01 21:07:42 消费7 个Token
2023/01/01 21:07:42 消费8 个Token
2023/01/01 21:07:42 消费9 个Token
2023/01/01 21:07:42 消费10个Token  # 1秒内将桶内令牌消费完毕,等待桶内添加令牌
2023/01/01 21:07:43 消费11个Token
2023/01/01 21:07:44 消费12个Token
2023/01/01 21:07:45 消费13个Token
2023/01/01 21:07:46 消费14个Token
2023/01/01 21:07:47 消费15个Token

# 分析
# 如果我们开发一个接口，要求每秒最多可以调用100次，那么可以设置桶容量为100，令牌产生速率为 100.0/每秒
```

:::

<br />

## 动态调整

::: details 点击查看详情

```go
package main

import (
	"golang.org/x/time/rate"
	"log"
)

func main() {
	// 实例化一个令牌桶对象,每10秒放入一个新令牌
	limiter := rate.NewLimiter(1, 10)
	log.Printf("初始化桶成功, 桶大小: %d, 令牌放入速率: %.2f/每秒, 桶内令牌数量: %.2f\n", limiter.Burst(), limiter.Limit(), limiter.Tokens())

	// 设置桶大小，如果是一个更大容量的桶，桶内原先令牌数量并不会增加
	limiter.SetBurst(20)
	log.Printf("重置容量成功, 桶大小: %d, 令牌放入速率: %.2f/每秒, 桶内令牌数量: %.2f\n", limiter.Burst(), limiter.Limit(), limiter.Tokens())

	// 设置速率
	limiter.SetLimit(2)
	log.Printf("重置速率成功, 桶大小: %d, 令牌放入速率: %.2f/每秒, 桶内令牌数量: %.2f\n", limiter.Burst(), limiter.Limit(), limiter.Tokens())
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
2023/01/02 06:29:26 初始化桶成功, 桶大小: 10, 令牌放入速率: 1.00/每秒, 桶内令牌数量: 10.00
2023/01/02 06:29:26 重置容量成功, 桶大小: 20, 令牌放入速率: 1.00/每秒, 桶内令牌数量: 10.00
2023/01/02 06:29:26 重置速率成功, 桶大小: 20, 令牌放入速率: 2.00/每秒, 桶内令牌数量: 10.00
```

:::

<br />

## Gin 限流

::: details （1）接口级别的限流

```go
package main

import (
	"context"
	"github.com/gin-gonic/gin"
	"golang.org/x/time/rate"
	"log"
	"net/http"
)

// DefaultRateLimiterPerSecond 设置每秒可以允许多少个请求通过
func DefaultRateLimiterPerSecond(n int) gin.HandlerFunc {
	limiter := rate.NewLimiter(rate.Limit(n), n)
	return func(ctx *gin.Context) {
		err := limiter.Wait(context.TODO())
		if err != nil {
			ctx.AbortWithStatus(http.StatusForbidden)
		}
		ctx.Next()
	}
}

func main() {
	r := gin.Default()

    // 设置限流速率为 2个请求/每秒
	r.Use(DefaultRateLimiterPerSecond(2))

	r.GET("/", func(ctx *gin.Context) {
		ctx.String(http.StatusOK, "Hello World!\n")
	})

	log.Fatalln(r.Run(":8080"))
}
```

输出结果

```bash
# 启动服务
[root@ap-hongkang example]# go run main.go
[GIN-debug] [WARNING] Creating an Engine instance with the Logger and Recovery middleware already attached.

[GIN-debug] [WARNING] Running in "debug" mode. Switch to "release" mode in production.
 - using env:   export GIN_MODE=release
 - using code:  gin.SetMode(gin.ReleaseMode)

[GIN-debug] GET    /                         --> main.main.func1 (4 handlers)
[GIN-debug] [WARNING] You trusted all proxies, this is NOT safe. We recommend you to set a value.
Please check https://pkg.go.dev/github.com/gin-gonic/gin#readme-don-t-trust-all-proxies for details.
[GIN-debug] Listening and serving HTTP on :8080

# 并发为4，总共发送20个请求
[root@ap-hongkang ~]# ab -n 20 -c 4 http://127.0.0.1:8080/

# 查看服务端日志，可以看到每秒最多接收2个请求，达到限流的效果
[GIN] 2023/01/02 - 12:20:11 | 200 |       21.18µs |       127.0.0.1 | GET      "/"
[GIN] 2023/01/02 - 12:20:11 | 200 |      17.253µs |       127.0.0.1 | GET      "/"
[GIN] 2023/01/02 - 12:20:12 | 200 |  500.562883ms |       127.0.0.1 | GET      "/"
[GIN] 2023/01/02 - 12:20:12 | 200 |   1.00016178s |       127.0.0.1 | GET      "/"
[GIN] 2023/01/02 - 12:20:13 | 200 |  1.500026354s |       127.0.0.1 | GET      "/"
[GIN] 2023/01/02 - 12:20:13 | 200 |  1.999918761s |       127.0.0.1 | GET      "/"
[GIN] 2023/01/02 - 12:20:14 | 200 |  1.999009418s |       127.0.0.1 | GET      "/"
[GIN] 2023/01/02 - 12:20:14 | 200 |  1.999215305s |       127.0.0.1 | GET      "/"
[GIN] 2023/01/02 - 12:20:15 | 200 |  1.999091714s |       127.0.0.1 | GET      "/"
[GIN] 2023/01/02 - 12:20:15 | 200 |  2.000244565s |       127.0.0.1 | GET      "/"
[GIN] 2023/01/02 - 12:20:16 | 200 |  2.000399844s |       127.0.0.1 | GET      "/"
[GIN] 2023/01/02 - 12:20:16 | 200 |  2.000598087s |       127.0.0.1 | GET      "/"
[GIN] 2023/01/02 - 12:20:17 | 200 |  2.000667347s |       127.0.0.1 | GET      "/"
[GIN] 2023/01/02 - 12:20:17 | 200 |   1.99966652s |       127.0.0.1 | GET      "/"
[GIN] 2023/01/02 - 12:20:18 | 200 |  1.999973276s |       127.0.0.1 | GET      "/"
[GIN] 2023/01/02 - 12:20:18 | 200 |  1.998798644s |       127.0.0.1 | GET      "/"
[GIN] 2023/01/02 - 12:20:19 | 200 |  1.998724785s |       127.0.0.1 | GET      "/"
[GIN] 2023/01/02 - 12:20:19 | 200 |  1.999201499s |       127.0.0.1 | GET      "/"
[GIN] 2023/01/02 - 12:20:20 | 200 |  1.998554988s |       127.0.0.1 | GET      "/"
[GIN] 2023/01/02 - 12:20:20 | 200 |  2.000254673s |       127.0.0.1 | GET      "/"
```

:::

::: details （2）用户级别的限流

* 为了演示核心功能，通过查询字符串来传递token，且不会对token做任何校验
* 每个token分配一个`*rate.Limiter`，存储在一个Map中，用于实现每个人都有自己的限流，而不是所有人共用限流
* 以下代码会引起内存泄漏，原因是Map会持续增长，并没有添加定时清理的功能

```go
package main

import (
	"context"
	"github.com/gin-gonic/gin"
	"golang.org/x/time/rate"
	"log"
	"net/http"
)

// TokenRateLimiterPerSecond 设置每个Token每秒可以允许多少个请求通过
func TokenRateLimiterPerSecond(n int) gin.HandlerFunc {
	limiterMap := make(map[string]*rate.Limiter)
	return func(ctx *gin.Context) {
		// 获取Token
		token, ok := ctx.GetQuery("token")
		if !ok {
			ctx.AbortWithStatus(http.StatusForbidden)
		}

		// 获取或创建每个用户专属的*rate.Limiter
		limiter, ok := limiterMap[token]
		if !ok {
			limiter = rate.NewLimiter(rate.Limit(n), n)
			limiterMap[token] = limiter
		}

		// 接口限流
		err := limiter.Wait(context.TODO())
		if err != nil {
			ctx.AbortWithStatus(http.StatusForbidden)
		}

		ctx.Next()
	}
}

func main() {
	r := gin.Default()

	r.Use(TokenRateLimiterPerSecond(2))

	r.GET("/", func(ctx *gin.Context) {
		ctx.String(http.StatusOK, "Hello World!\n")
	})

	log.Fatalln(r.Run(":8080"))
}
```

输出结果

```bash
# 开两个终端，模拟两个不同的用户
[root@ap-hongkang ~]# ab -n 100 -c 4 http://127.0.0.1:8080/?token=1
[root@ap-hongkang ~]# ab -n 100 -c 4 http://127.0.0.1:8080/?token=2

# 查看服务端日志
[GIN-debug] Listening and serving HTTP on :8080
[GIN] 2023/01/02 - 13:32:42 | 200 |       15.75µs |       127.0.0.1 | GET      "/?token=1"
[GIN] 2023/01/02 - 13:32:42 | 200 |      13.515µs |       127.0.0.1 | GET      "/?token=1"
[GIN] 2023/01/02 - 13:32:42 | 200 |      24.927µs |       127.0.0.1 | GET      "/?token=2"
[GIN] 2023/01/02 - 13:32:42 | 200 |       11.14µs |       127.0.0.1 | GET      "/?token=2"
[GIN] 2023/01/02 - 13:32:43 | 200 |   499.85989ms |       127.0.0.1 | GET      "/?token=1"
[GIN] 2023/01/02 - 13:32:43 | 200 |  500.203013ms |       127.0.0.1 | GET      "/?token=2"
[GIN] 2023/01/02 - 13:32:43 | 200 |  1.000143954s |       127.0.0.1 | GET      "/?token=1"
[GIN] 2023/01/02 - 13:32:43 | 200 |  1.000389053s |       127.0.0.1 | GET      "/?token=2"
[GIN] 2023/01/02 - 13:32:44 | 200 |  1.500406647s |       127.0.0.1 | GET      "/?token=1"
[GIN] 2023/01/02 - 13:32:44 | 200 |  1.499648267s |       127.0.0.1 | GET      "/?token=2"
[GIN] 2023/01/02 - 13:32:44 | 200 |  1.999804832s |       127.0.0.1 | GET      "/?token=1"
[GIN] 2023/01/02 - 13:32:44 | 200 |  2.000190914s |       127.0.0.1 | GET      "/?token=2"
[GIN] 2023/01/02 - 13:32:45 | 200 |  1.999461467s |       127.0.0.1 | GET      "/?token=1"
[GIN] 2023/01/02 - 13:32:45 | 200 |  1.999454553s |       127.0.0.1 | GET      "/?token=2"
[GIN] 2023/01/02 - 13:32:45 | 200 |  2.032093153s |       127.0.0.1 | GET      "/?token=1"
[GIN] 2023/01/02 - 13:32:45 | 200 |  1.998775342s |       127.0.0.1 | GET      "/?token=2"
[GIN] 2023/01/02 - 13:32:46 | 200 |  2.500122517s |       127.0.0.1 | GET      "/?token=1"
[GIN] 2023/01/02 - 13:32:46 | 200 |   1.99945802s |       127.0.0.1 | GET      "/?token=2"
[GIN] 2023/01/02 - 13:32:46 | 200 |  2.498879778s |       127.0.0.1 | GET      "/?token=1"
[GIN] 2023/01/02 - 13:32:46 | 200 |  1.998611856s |       127.0.0.1 | GET      "/?token=2"
[GIN] 2023/01/02 - 13:32:47 | 200 |  2.500059819s |       127.0.0.1 | GET      "/?token=1"
[GIN] 2023/01/02 - 13:32:47 | 200 |   1.99902485s |       127.0.0.1 | GET      "/?token=2"
[GIN] 2023/01/02 - 13:32:47 | 200 |  2.500410859s |       127.0.0.1 | GET      "/?token=1"
[GIN] 2023/01/02 - 13:32:47 | 200 |  2.000191887s |       127.0.0.1 | GET      "/?token=2"
```

:::

::: details （3）用户级别的限流 - 优化版本

```go
package main

import (
	"context"
	"github.com/gin-gonic/gin"
	"golang.org/x/time/rate"
	"log"
	"net/http"
	"sync"
	"time"
)

type BucketRateLimiter struct {
	mu      sync.Mutex
	entries map[string]limiter
}

type limiter struct {
	limiter *rate.Limiter // 限速器
	have    bool          // 当前是否正在持有limiter
	last    time.Time     // 上次持有limiter的时间
}

func NewBucketRateLimiter() *BucketRateLimiter {
	return &BucketRateLimiter{
		entries: make(map[string]limiter),
	}
}

// Apply 返回一个 *rate.Limiter
func (b *BucketRateLimiter) Apply(token string, limit int) *rate.Limiter {
	b.mu.Lock()
	defer b.mu.Unlock()
	item, ok := b.entries[token]
	if ok {		
        item.have = true
        item.last = time.Now()
		b.entries[token] = item
	} else {
		item = limiter{
			limiter: rate.NewLimiter(rate.Limit(limit), limit),
			have:    true,
			last:    time.Now(),
		}
		b.entries[token] = item
	}

	return item.limiter
}

// Done 每个token处理完成后都应该调用Done方法，不管处理成功还是处理失败，原因是调用Done()后支持被Clean()函数清理
func (b *BucketRateLimiter) Done(token string) {
	b.mu.Lock()
	defer b.mu.Unlock()
	item, ok := b.entries[token]
	if !ok {
		return
	}
	item.have = false
	b.entries[token] = item
}

// Clean 清理过期的Limiter
func (b *BucketRateLimiter) Clean(before time.Duration) {
	b.mu.Lock()
	defer b.mu.Unlock()
	tokens := []string{}
	for token, item := range b.entries {
		if !item.have && time.Since(item.last) > before {
			tokens = append(tokens, token)
		}
	}
	for _, token := range tokens {
		delete(b.entries, token)
	}
	log.Printf("BucketRateLimiter entries number: %d\n", len(b.entries))
}

// TokenRateLimiterPerSecond 设置每个Token每秒可以允许多少个请求通过
func TokenRateLimiterPerSecond(limit int) gin.HandlerFunc {
	// 初始化
	limiters := NewBucketRateLimiter()

	// 定时清理过期的限速器
	go func() {
		ticker := time.NewTicker(time.Second * 60)
		defer ticker.Stop()
		for {
			select {
			case <-ticker.C:
				limiters.Clean(time.Second * 60)
			default:
			}
		}
	}()
	return func(ctx *gin.Context) {
		// 获取Token
		token, ok := ctx.GetQuery("token")
		if !ok {
			ctx.AbortWithStatus(http.StatusForbidden)
		}

		// 获取或创建每个用户专属的*rate.limiter
		limiter := limiters.Apply(token, limit)
		defer limiters.Done(token)

		// 接口限流
		err := limiter.Wait(context.TODO())
		if err != nil {
			ctx.AbortWithStatus(http.StatusForbidden)
		}

		ctx.Next()
	}
}

func main() {
	r := gin.Default()

	r.Use(TokenRateLimiterPerSecond(2))

	r.GET("/", func(ctx *gin.Context) {
		ctx.String(http.StatusOK, "Hello World!\n")
	})

	log.Fatalln(r.Run(":8080"))
}
```

输出结果

```bash
# 客户端发送HTTP请求
[root@ap-hongkang ~]# for i in `seq 100`; do ab -n 2 -c 2 http://127.0.0.1:8080/?token=${i}; done

# 服务端日志
...
[GIN] 2023/01/02 - 19:56:08 | 200 |      14.097µs |       127.0.0.1 | GET      "/?token=96"
[GIN] 2023/01/02 - 19:56:08 | 200 |      11.111µs |       127.0.0.1 | GET      "/?token=96"
[GIN] 2023/01/02 - 19:56:08 | 200 |      21.049µs |       127.0.0.1 | GET      "/?token=97"
[GIN] 2023/01/02 - 19:56:08 | 200 |      11.251µs |       127.0.0.1 | GET      "/?token=97"
[GIN] 2023/01/02 - 19:56:08 | 200 |      15.079µs |       127.0.0.1 | GET      "/?token=98"
[GIN] 2023/01/02 - 19:56:08 | 200 |      11.211µs |       127.0.0.1 | GET      "/?token=98"
[GIN] 2023/01/02 - 19:56:08 | 200 |      14.387µs |       127.0.0.1 | GET      "/?token=99"
[GIN] 2023/01/02 - 19:56:08 | 200 |      11.372µs |       127.0.0.1 | GET      "/?token=99"
[GIN] 2023/01/02 - 19:56:08 | 200 |      23.384µs |       127.0.0.1 | GET      "/?token=100"
[GIN] 2023/01/02 - 19:56:08 | 200 |      11.852µs |       127.0.0.1 | GET      "/?token=100"
2023/01/02 19:57:06 BucketRateLimiter entries number: 100
2023/01/02 19:58:06 BucketRateLimiter entries number: 0
```

:::
