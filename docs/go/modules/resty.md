# resty

Github：[https://github.com/go-resty/resty](https://github.com/go-resty/resty)

<br />

## 安装

```bash
go get github.com/go-resty/resty/v2
```

<br />

## 基础示例

::: details 点击查看详情

```go
package main

import (
	"fmt"

	"github.com/go-resty/resty/v2"
)

func main() {
	// 实例化客户端
	client := resty.New()

	// 发送Get请求, 如果域名无法解析这里会报错, 当然其他情况可能也会报错
	// 1、.R() 等同于 .NewRequest(), 即 创建一个请求
	// 2、EnableTrace() 启用请求/响应跟踪，以便用于调试
	response, err := client.R().Get("https://ip.jinhui.dev")
	if err != nil {
		panic(err)
	}

	// 查看响应结果, 返回一个Response结构体指针
	fmt.Println("Response Info:")
	fmt.Printf("  Error       :  %v\n", err)
	fmt.Printf("  Status Code :  %d\n", response.StatusCode())
	fmt.Printf("  Status      :  %s\n", response.Status())
	fmt.Printf("  Proto       :  %s\n", response.Proto())
	fmt.Printf("  Time        :  %v\n", response.Time())
	fmt.Printf("  Received At :  %#v\n", response.ReceivedAt())
	fmt.Printf("  Body        :  %s\n", response.Body())
}
```

输出结果

```bash
Response Info:
  Error       :  <nil>     
  Status Code :  200       
  Status      :  200 OK    
  Proto       :  HTTP/2.0  
  Time        :  277.4418ms
  Received At :  time.Date(2023, time.July, 22, 0, 8, 13, 787241800, time.Local)
  Body        :  221.217.50.160
```

:::

<br />

## 最佳辅助

### 请求追踪

::: details 点击查看详情

```go
package main

import (
	"fmt"

	"github.com/go-resty/resty/v2"
)

func main() {
	// 实例化客户端
	client := resty.New()

	// 发送Get请求
	// 1、.R() 等同于 .NewRequest(), 即 创建一个请求
	// 2、EnableTrace()  启用请求/响应跟踪，以便用于调试
    // 3、DisableTrace() 关闭请求/响应追踪
	response, err := client.R().EnableTrace().Get("https://ip.jinhui.dev")
	if err != nil {
		panic(err)
	}

	// 查看响应结果, 返回一个Response结构体指针
	fmt.Println("Response Info:")
	fmt.Printf("  Error       :  %v\n", err)
	fmt.Printf("  Status Code :  %d\n", response.StatusCode())
	fmt.Printf("  Status      :  %s\n", response.Status())
	fmt.Printf("  Proto       :  %s\n", response.Proto())
	fmt.Printf("  Time        :  %v\n", response.Time())
	fmt.Printf("  Received At :  %#v\n", response.ReceivedAt())
	fmt.Printf("  Body        :  %s\n", response.Body())

	// 请求追踪信息
	fmt.Println("Request Trace Info:")
	traceInfo := response.Request.TraceInfo()
	fmt.Println("  DNSLookup     :", traceInfo.DNSLookup)
	fmt.Println("  ConnTime      :", traceInfo.ConnTime)
	fmt.Println("  TCPConnTime   :", traceInfo.TCPConnTime)
	fmt.Println("  TLSHandshake  :", traceInfo.TLSHandshake)
	fmt.Println("  ServerTime    :", traceInfo.ServerTime)
	fmt.Println("  ResponseTime  :", traceInfo.ResponseTime)
	fmt.Println("  TotalTime     :", traceInfo.TotalTime)
	fmt.Println("  IsConnReused  :", traceInfo.IsConnReused)
	fmt.Println("  IsConnWasIdle :", traceInfo.IsConnWasIdle)
	fmt.Println("  ConnIdleTime  :", traceInfo.ConnIdleTime)
	fmt.Println("  RequestAttempt:", traceInfo.RequestAttempt)
	fmt.Println("  RemoteAddr    :", traceInfo.RemoteAddr.String())
}
```

输出结果

```bash
Response Info:
  Error       :  <nil>     
  Status Code :  200       
  Status      :  200 OK    
  Proto       :  HTTP/2.0  
  Time        :  274.1866ms
  Received At :  time.Date(2023, time.July, 22, 0, 17, 56, 426150600, time.Local)
  Body        :  221.217.50.160

Request Trace Info:
  DNSLookup     : 12.1455ms         # 域名解析时间
  ConnTime      : 220.4072ms        # 建立连接时间
  TCPConnTime   : 54.0557ms         # TCP连接时间
  TLSHandshake  : 152.6107ms        # TLS握手时间
  ServerTime    : 53.5103ms         # 服务器处理时间, 服务器从收到请求到响应的第一个字节的时间间隔
  ResponseTime  : 803.7µs           # 请求响应的时间, 服务器从响应的第一个字节到整个响应完成的时间间隔
  TotalTime     : 274.1866ms        # 总时间
  IsConnReused  : false             # 表示是否重用连接，false表示没有重用
  IsConnWasIdle : false             # 表示连接是否处于空闲状态，false表示不是空闲状态
  ConnIdleTime  : 0s                # 连接空闲时间，0s表示没有空闲时间
  RequestAttempt: 1                 # 请求尝试次数，1表示只尝试了一次
  RemoteAddr    : 43.154.36.151:443 # 远程服务器地址和端口
  
# 解释
# 1、ConnTime 包含了 TCPConnTime 和 TLSHandshake
# 2、ResponseTime 并不包含 ServerTime
# 3、TotalTime 约等于 ConnTime + ServerTime + ResponseTime

# 分析
# 这里只能体现出一部分信息，还有一些信息比如 TLS信息、是否开启GZIP等无法体现
```

:::

<br />

### 调试模式

::: details 点击查看详情

```go
package main

import (
	"github.com/go-resty/resty/v2"
)

func main() {
	// 实例化客户端
	client := resty.New()

	// 开启调试模式
	client.SetDebug(true)

	// 发送Get请求
	_, err := client.R().Get("https://ip.jinhui.dev")
	if err != nil {
		panic(err)
	}
}
```

输出结果

```bash
2023/07/22 18:16:16.031363 DEBUG RESTY
==============================================================================
~~~ REQUEST ~~~
GET  /  HTTP/1.1
HOST   : ip.jinhui.dev
HEADERS:
        User-Agent: go-resty/2.7.0 (https://github.com/go-resty/resty)        
BODY   :
***** NO CONTENT *****
------------------------------------------------------------------------------
~~~ RESPONSE ~~~
STATUS       : 200 OK
PROTO        : HTTP/2.0
RECEIVED AT  : 2023-07-22T18:16:16.0201462+08:00
TIME DURATION: 272.2173ms
HEADERS      :
        Content-Length: 15
        Content-Type: text/plain; charset=utf-8
        Date: Sat, 22 Jul 2023 10:16:15 GMT
        Server: nginx/1.23.2
BODY         :
221.217.50.160
==============================================================================
```

:::

<br />

### 设置日志

::: details 点击查看详情

```go

```

:::

<br />

### 钩子函数

::: details 点击查看详情

```go
package main

import (
	"fmt"

	"github.com/go-resty/resty/v2"
)

func main() {
	// 实例化客户端
	client := resty.New()

	// 设置钩子函数
	client.OnBeforeRequest(func(client *resty.Client, request *resty.Request) error {
		fmt.Printf("%-20s%s\n", "OnBeforeRequest", "发送请求之前执行")
		return nil
	})
	client.OnAfterResponse(func(client *resty.Client, response *resty.Response) error {
		fmt.Printf("%-20s%s\n", "OnAfterResponse", "接收响应之后执行")
		return nil
	})
	client.OnError(func(req *resty.Request, err error) {
		fmt.Printf("%-20s%s\n", "OnError", "发生错误时执行, 具体不详")
		if v, ok := err.(*resty.ResponseError); ok {
			fmt.Println(v, ok)
		}
	})

	// 发送Get请求
	response, err := client.R().Get("https://ip.jinhui.dev")
	if err != nil {
		panic(err)
	}

	// 读取响应
	fmt.Println(response)
}
```

输出结果

```bash
OnBeforeRequest     发送请求之前执行
OnAfterResponse     接收响应之后执行
221.217.50.160
```

:::

<br />

### 超时时间

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"time"

	"github.com/go-resty/resty/v2"
)

func main() {
	// 实例化客户端
	client := resty.New()

	// 设置超时时间(全局生效)
	client.SetTimeout(time.Second * 5)

	// 发送Get请求
	response, err := client.R().Get("https://ip.jinhui.dev")
	if err != nil {
		panic(err)
	}

	// 读取响应
	fmt.Println(response)
}
```

输出结果

```bash
221.217.50.160
```

:::

<br />

### 请求重试

::: details （1）基本配置

```go
package main

import (
	"fmt"
	"time"

	"github.com/go-resty/resty/v2"
)

func main() {
	// 实例化客户端
	client := resty.New()

	// 设置重试参数, 在设置重试前最好先显示设置一下超时参数
	// 1、SetRetryCount  		重试3次 即最多会发送4次请求
	// 2、SetRetryWaitTime		每次重试前的等待时间
	// 3、SetRetryMaxWaitTime	用法不详
	// 4、SetRetryAfter			重试后的回调函数
    // 5、重试的触发条件是什么?      不详
	client.SetTimeout(time.Second * 5).SetRetryCount(3).SetRetryWaitTime(time.Second)

	// 发送Get请求
	response, err := client.R().Get("https://ip.jinhui.dev")
	if err != nil {
		panic(err)
	}

	// 读取响应
	fmt.Println(response)
}
```

:::

::: details （2）自定义重试条件

```go
package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/go-resty/resty/v2"
)

func main() {
	// 实例化客户端
	client := resty.New()

	// 设置重试参数, 在设置重试前最好先显示设置一下超时参数
	// 1、SetRetryCount  		重试3次 即最多会发送4次请求
	// 2、SetRetryWaitTime		每次重试前的等待时间
	// 3、SetRetryMaxWaitTime	用法不详
	// 4、SetRetryAfter			重试后的回调函数
	client.SetTimeout(time.Second * 5).SetRetryCount(3).SetRetryWaitTime(time.Second)

	// 自定义重试条件
	client.AddRetryCondition(
		func(r *resty.Response, err error) bool {
			return r.StatusCode() == http.StatusTooManyRequests
		},
	)

	// 发送Get请求
	response, err := client.R().Get("https://ip.jinhui.dev")
	if err != nil {
		panic(err)
	}

	// 读取响应
	fmt.Println(response)
}
```

:::

<br />

### 设置代理

::: details 点击查看详情

```go
package main

import (
	"fmt"

	"github.com/go-resty/resty/v2"
)

func main() {
	// 实例化客户端
	client := resty.New()

	// 设置代理
	// 1、如果代理要求认证, 则使用类似的语法 http://username:password@proxy.com:8080
	// 2、都支持哪些类型的代理? 不详, 一般常见的应该都支持
    // 3、client.RemoveProxy() 可以移除代理
    // 4、client.IsProxySet()  判断是否设置了代理
	client.SetProxy("http://127.0.0.1:7890")

	// 发送Get请求
	response, err := client.R().Get("https://ip.jinhui.dev")
	if err != nil {
		panic(err)
	}

	// 读取响应
	fmt.Println(response)
}
```

输出结果

```bash
18.162.191.69
```

:::

<br />

### 设置证书

::: details 点击查看详情

```go

```

:::

<br />

### 重定向策略

::: details 点击查看详情

```go

```

:::

<br />

### 设置请求头

::: details 点击查看详情

```go
package main

import (
	"fmt"

	"github.com/go-resty/resty/v2"
)

func main() {
	// 实例化客户端
	client := resty.New()

	// 设置请求头
	// 1、client.SetHeader() 	用于一次设置一个键值对
	// 2、client.SetHeaders()	用于一次设置多个键值对
	client.SetHeaders(map[string]string{
		"Content-Type": "application/json",
		"User-Agent":   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
	})

	// 发送Get请求
	response, err := client.R().Get("https://ip.jinhui.dev")
	if err != nil {
		panic(err)
	}

	// 读取响应
	fmt.Println(response)
}
```

:::

<br />

### 设置认证

::: details 点击查看详情

```go

```

:::

<br />

### 设置Cookie

::: details 点击查看详情

```go

```

:::

<br />

## 常见功能

