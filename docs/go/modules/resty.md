# resty

Github：[https://github.com/go-resty/resty](https://github.com/go-resty/resty)

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
	// 2、EnableTrace() 启用请求/响应跟踪，以便用于调试
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

### 超时时间

### 重试次数

### 设置代理

### 设置证书

### 钩子函数

<br />

## 常见功能

