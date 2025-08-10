# singleflight

文档：[https://pkg.go.dev/golang.org/x/sync/singleflight](https://pkg.go.dev/golang.org/x/sync/singleflight)

<br />

## 安装

```bash
D:\application\GoLand\example>go get golang.org/x/sync/singleflight
go: added golang.org/x/sync v0.1.0
```

<br />

## 用法

::: details 先准备一段普通的代码：开多个协程并发执行now()函数

```go
package main

import (
	"fmt"
	"math/rand"
	"sync"
	"time"
)

func now() (time.Time, error) {
	time.Sleep(time.Second * time.Duration(rand.Intn(3)))
	return time.Now(), nil
}

func main() {
	var wg sync.WaitGroup

	for i := 0; i < 10; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			v, err := now()
			if err != nil {
				panic(err)
			}
			fmt.Println(v)
		}()
	}

	wg.Wait()
}
```

输出结果

```bash
# 可以看到每次获取到的结果都不一样
D:\application\GoLand\example>go run .
2023-03-13 14:11:13.9915456 +0800 CST m=+0.003147101
2023-03-13 14:11:13.9915456 +0800 CST m=+0.003147101
2023-03-13 14:11:13.9915456 +0800 CST m=+0.003147101
2023-03-13 14:11:13.9915456 +0800 CST m=+0.003147101
2023-03-13 14:11:15.0001038 +0800 CST m=+1.011705301
2023-03-13 14:11:15.0001818 +0800 CST m=+1.011783301
2023-03-13 14:11:15.0001818 +0800 CST m=+1.011783301
2023-03-13 14:11:15.0001818 +0800 CST m=+1.011783301
2023-03-13 14:11:15.9932493 +0800 CST m=+2.004850801
2023-03-13 14:11:15.9932493 +0800 CST m=+2.004850801
```

:::

::: details （1）使用singleflight Do方法将相同请求合并为单个请求，所有请求共享返回结果

```go
package main

import (
	"fmt"
	"math/rand"
	"sync"
	"time"

	"golang.org/x/sync/singleflight"
)

func now() (time.Time, error) {
	time.Sleep(time.Second * time.Duration(rand.Intn(3)))
	return time.Now(), nil
}

func main() {
	var wg sync.WaitGroup
	var sf singleflight.Group

	for i := 0; i < 10; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			// key用于对请求(函数)做一个标识,同时有相同标识符的请求过来,只会执行一次真正的函数
			// 函数执行完成后，所有具有相同标识符的请求共享结果
            // shared 指示是否向多个调用方提供了结果
			v, err, shared := sf.Do("now", func() (interface{}, error) {
				return now()
			})
			if err != nil {
				panic(err)
			}
			v = v.(time.Time)
			fmt.Println(v, shared)
		}()
	}

	wg.Wait()
}
```

输出结果 

```bash
D:\application\GoLand\example>go run .
2023-03-13 14:11:55.4598169 +0800 CST m=+1.014792001 true
2023-03-13 14:11:55.4598169 +0800 CST m=+1.014792001 true
2023-03-13 14:11:55.4598169 +0800 CST m=+1.014792001 true
2023-03-13 14:11:55.4598169 +0800 CST m=+1.014792001 true
2023-03-13 14:11:55.4598169 +0800 CST m=+1.014792001 true
2023-03-13 14:11:55.4598169 +0800 CST m=+1.014792001 true
2023-03-13 14:11:55.4598169 +0800 CST m=+1.014792001 true
2023-03-13 14:11:55.4598169 +0800 CST m=+1.014792001 true
2023-03-13 14:11:55.4598169 +0800 CST m=+1.014792001 true
2023-03-13 14:11:55.4598169 +0800 CST m=+1.014792001 true
```

:::

::: details （2）使用singleflight DoChan方法将相同请求合并为单个请求，所有请求共享返回结果

```go
package main

import (
	"fmt"
	"math/rand"
	"sync"
	"time"

	"golang.org/x/sync/singleflight"
)

func now() (time.Time, error) {
	time.Sleep(time.Second * time.Duration(rand.Intn(3)))
	return time.Now(), nil
}

func main() {
	var wg sync.WaitGroup
	var sf singleflight.Group

	for i := 0; i < 10; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			// DoChan 与 Do类似，但不会阻塞，返回值 <-chan Result
			ch := sf.DoChan("now", func() (interface{}, error) {
				return now()
			})
			ret := <-ch
			if ret.Err != nil {
				panic(ret.Err)
			}

			fmt.Println(ret.Val, ret.Shared)
		}()
	}

	wg.Wait()
}
```

输出结果

```bash
D:\application\GoLand\example>go run .
2023-03-13 14:20:33.6545332 +0800 CST m=+0.003770701 true
2023-03-13 14:20:33.6545332 +0800 CST m=+0.003770701 true
2023-03-13 14:20:33.6545332 +0800 CST m=+0.003770701 true
2023-03-13 14:20:33.6545332 +0800 CST m=+0.003770701 true
2023-03-13 14:20:33.6545332 +0800 CST m=+0.003770701 true
2023-03-13 14:20:33.6545332 +0800 CST m=+0.003770701 true
2023-03-13 14:20:33.6545332 +0800 CST m=+0.003770701 true
2023-03-13 14:20:33.6545332 +0800 CST m=+0.003770701 true
2023-03-13 14:20:33.6545332 +0800 CST m=+0.003770701 true
2023-03-13 14:20:33.6545332 +0800 CST m=+0.003770701 true
```

:::

::: details （3）使用singleflight Forget 阻止请求合并

```go
package main

import (
	"fmt"
	"math/rand"
	"sync"
	"time"

	"golang.org/x/sync/singleflight"
)

func now() (time.Time, error) {
	time.Sleep(time.Second * time.Duration(rand.Intn(3)))
	return time.Now(), nil
}

func main() {
	var wg sync.WaitGroup
	var sf singleflight.Group

	for i := 0; i < 10; i++ {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()

			// 如果 i == 3,则删除key,这样就会真正取执行函数，而不是等待并复用之前相同的key的返回结果
			if i == 3 {
				sf.Forget("now")
			}

			// DoChan 与 Do类似，但不会阻塞，返回值 <-chan Result
			ch := sf.DoChan("now", func() (interface{}, error) {
				return now()
			})
			ret := <-ch
			if ret.Err != nil {
				panic(ret.Err)
			}

			fmt.Println(ret.Val, ret.Shared, i)
		}(i)
	}

	wg.Wait()
}
```

输出结果

```bash
# 说明
# 1、虽然我们想让 i == 3时真正执行一次函数，但是由于是并发执行, 真正执行函数的可能并不是 i ==3
# 2、在下面的输出中，出现了两种结果，因为中途我们曾经删除过一次这个key
D:\application\GoLand\example>go run .
2023-03-13 14:37:12.0786217 +0800 CST m=+1.004918701 true 0
2023-03-13 14:37:12.0786217 +0800 CST m=+1.004918701 true 3
2023-03-13 14:37:12.0786217 +0800 CST m=+1.004918701 true 5
2023-03-13 14:37:12.0786217 +0800 CST m=+1.004918701 true 1
2023-03-13 14:37:12.0786217 +0800 CST m=+1.004918701 true 4
2023-03-13 14:37:13.0915347 +0800 CST m=+2.017831701 true 8
2023-03-13 14:37:13.0915347 +0800 CST m=+2.017831701 true 9
2023-03-13 14:37:13.0915347 +0800 CST m=+2.017831701 true 2
2023-03-13 14:37:13.0915347 +0800 CST m=+2.017831701 true 6
2023-03-13 14:37:13.0915347 +0800 CST m=+2.017831701 true 7

# 分析：不管有多少次的请求，实际真实的请求取决于 i == 3出现的次数
```

:::

<br />

## 总结

singleflight用于将多个相同的请求转为一个请求，结果复用

* 适合的场景说明：请求幂等的情况下 
* 可能的问题说明：一个请求阻塞会导致所有调用者出现问题，这时可以使用 Forget 删除key，但调用 Forget的时机值得仔细考虑
* 实际的场景举例：防止缓存击穿