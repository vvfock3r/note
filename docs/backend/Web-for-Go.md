## 版本介绍

```bash
# Go版本
C:\Users\Administrator>go version
go version go1.18 windows/amd64
```

## net/http Client

官方文档：[https://pkg.go.dev/net](https://pkg.go.dev/net)

### 基础示例

一个最基础的示例

```go
package main

import (
	"io"
	"log"
	"net/http"
	"os"
)

func main() {
	// 发送GET请求
	resp, err := http.Get("https://www.baidu.com")
	if err != nil {
		log.Fatal(err)
	}
	// 关闭连接
	defer func() {
		if err = resp.Body.Close(); err != nil {
			log.Fatalln(err)
		}
	}()

	// 输出到控制台
	if _, err = io.Copy(os.Stdout, resp.Body); err != nil {
		log.Fatalln(err)
	}
}
```

输出结果

```bash
<html>
<head>
        <script>
                location.replace(location.href.replace("https://","http://"));
        </script>
</head>
<body>
        <noscript><meta http-equiv="refresh" content="0;url=http://www.baidu.com/"></noscript>
</body>
</html>
```

> 这里的输出结果好像不太对，而且与curl或者其他语言发送HTTP请求的结果也不一致，这个问题可以通过修改请求头中的`User-Agent`来解决



::: details 进一步探索

（1）查看`http.Get`源码发现会调用`DefaultClient.Get`，其定义如下

```go
// http.Get定义
func Get(url string) (resp *Response, err error) {
	return DefaultClient.Get(url)
}

// DefaultClient定义
var DefaultClient = &Client{}

// Client结构体定义
type Client struct {	
	Transport RoundTripper
	CheckRedirect func(req *Request, via []*Request) error
	Jar CookieJar
	Timeout time.Duration
}
```

（2）所以可以改写一下我们的代码

```go
package main

import (
	"io"
	"log"
	"net/http"
	"os"
)

func main() {
	// 实例化Client
	client := &http.Client{}

	// 发送GET请求
	resp, err := client.Get("https://www.baidu.com")
	if err != nil {
		log.Fatal(err)
	}
	// 关闭连接
	defer func() {
		if err = resp.Body.Close(); err != nil {
			log.Fatalln(err)
		}
	}()

	// 输出到控制台
	if _, err = io.Copy(os.Stdout, resp.Body); err != nil {
		log.Fatalln(err)
	}
}
```

（3）查看`Client.Get`方法

* 使用`NewRequest`来生成`Request`对象
* 使用`Client.Do(request)`来发出请求

```go
// To make a request with custom headers, use NewRequest and Client.Do.	
// To make a request with a specified context.Context, use NewRequestWithContext and Client.Do.
func (c *Client) Get(url string) (resp *Response, err error) {
	req, err := NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}
	return c.Do(req)
}
```

（4）所以可以再次改写一下我们的代码

```go
package main

import (
	"io"
	"log"
	"net/http"
	"os"
)

func main() {
	// 实例化Client
	client := &http.Client{}

	// 发送GET请求
	//resp, err := client.Get("https://www.baidu.com")
	req, err := http.NewRequest("GET", "https://www.baidu.com", nil)
	if err != nil {
		log.Fatalln(err)
	}
	resp, err := client.Do(req)

	if err != nil {
		log.Fatal(err)
	}

	// 关闭连接
	defer func() {
		if err = resp.Body.Close(); err != nil {
			log.Fatalln(err)
		}
	}()

	// 输出到控制台
	if _, err = io.Copy(os.Stdout, resp.Body); err != nil {
		log.Fatalln(err)
	}
}
```

（5）查看`http.NewRequest`源码，本质上是调用`NewRequestWithContext`

```go
// NewRequest wraps NewRequestWithContext using context.Background.
func NewRequest(method, url string, body io.Reader) (*Request, error) {
   return NewRequestWithContext(context.Background(), method, url, body)
}
```

:::

### Request: 修改请求头

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
)

func RunServer(addr string) {
	http.HandleFunc("/", func(writer http.ResponseWriter, request *http.Request) {
		// ----------------- 查看请求头 -----------------
		fmt.Println("请求头: ")
		for k, v := range request.Header {
			fmt.Printf("%-15s: %#v\n", k, v)
		}
		// ---------------------------------------------
		_, _ = fmt.Fprintf(writer, "hello world!")
	})

	err := http.ListenAndServe(addr, nil)
	if err != nil {
		log.Fatal(err)
	}
}

func SendRequest(ServerURL string) {
	// 实例化Client
	client := &http.Client{}

	// 生成Request对象
	req, err := http.NewRequest("GET", ServerURL, nil)
	if err != nil {
		log.Fatalln(err)
	}

	// 定制Request对象
	//(1) 下面是Go默认带的请求头,在控制台可以看到覆盖了原先的值（注意：分别使用Add和Set来进行测试）
	req.Header.Add("Accept-Encoding", "compress")
	req.Header.Set("User-Agent", "Mozilla/5.0 xxx Chrome/96.0.4664.110 Safari/537.36")
	//(2)下面是使用Add, 可以看到使用的是追加方式，并且不去重
	req.Header.Add("Foo", "Bar1")
	req.Header.Add("Foo", "Bar1")
	req.Header.Add("Foo", "Bar2")
	//(3)下面是使用Set，可以看到是覆盖模式
	req.Header.Set("Ping", "Pong1")
	req.Header.Set("Ping", "Pong2")

	// 发送请求
	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}

	// 关闭连接
	defer func() {
		if err = resp.Body.Close(); err != nil {
			log.Fatalln(err)
		}
	}()

	// 输出到控制台
	if _, err = io.Copy(os.Stdout, resp.Body); err != nil {
		log.Fatalln(err)
	}
}

func main() {
	// 定义变量
	ServerListenAddr := "127.0.0.1:5000"      //	服务端监听地址
	ServerURL := "http://" + ServerListenAddr // 客户端访问地址

	// 启动服务端
	go RunServer(ServerListenAddr)

	// 启动客户端
	SendRequest(ServerURL)
}
```

:::

输出结果

```bash
# 默认的请求头输出结果
请求头:
User-Agent     : []string{"Go-http-client/1.1"}
Accept-Encoding: []string{"gzip"} 
hello world!

# 自己定制的请求头输出结果
请求头:
Ping           : []string{"Pong2"}
User-Agent     : []string{"Mozilla/5.0 xxx Chrome/96.0.4664.110 Safari/537.36"}
Accept-Encoding: []string{"compress"}
Foo            : []string{"Bar1", "Bar1", "Bar2"}
hello world!
```

### Client Timeout：基础超时控制

默认的`DefaultClient`是没有设置超时时间的，我们可以自定义超时时间，包含建立连接、重定向、读取正文等整个请求流程时间

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"time"
)

func RunServer(addr string) {
	http.HandleFunc("/", func(writer http.ResponseWriter, request *http.Request) {
		time.Sleep(time.Second * 3)
		_, _ = fmt.Fprintf(writer, "hello world!")
	})

	err := http.ListenAndServe(addr, nil)
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	// 定义变量
	ServerListenAddr := "127.0.0.1:5000"      //	服务端监听地址
	ServerURL := "http://" + ServerListenAddr // 客户端访问地址

	// 启动服务端
	go RunServer(ServerListenAddr)

	// 方式一：使用默认的DefaultClient，它没有定义超时时间，会无限等待下去
	//client := http.DefaultClient	// 为了下面的代码统一，这里给DefaultClient重新赋值一个变量，它是一个指针所以可以直接赋值

	// 方式二：实例化Client，自定义超时时间
	client := &http.Client{
		Timeout: time.Second * 2, // 设置每次发送请求超时时间，包含建立连接、重定向、读取正文等整个请求流程时间
	}

	// 发送GET请求
	resp, err := client.Get(ServerURL)
	if err != nil {
		log.Fatal("请求超时: ", err)
	}
	// 关闭连接
	defer func() {
		if err = resp.Body.Close(); err != nil {
			log.Fatalln(err)
		}
	}()

	// 输出到控制台
	if _, err = io.Copy(os.Stdout, resp.Body); err != nil {
		log.Fatalln(err)
	}
}
```

:::

输出结果

```bash
# 超时输出结果
2022/04/28 09:12:26 请求超时: Get "http://127.0.0.1:5000": context deadline exceeded (Client.Timeout exceeded while awaiting headers)

# 未超时输出结果
hello world!
```



### Client Transport：更精细的超时控制

DefaultTransport介绍

```go
type Client struct {
	// Transport specifies the mechanism by which individual
	// HTTP requests are made.
	// If nil, DefaultTransport is used.	// 这里可以看到默认使用 DefaultTransport
	Transport RoundTripper		
    // ...
}
```

DefaultTransport源码

```go
// Transport结构体提供了很多的选项，下面每一个选项都可以在那里找到帮助信息
var DefaultTransport RoundTripper = &Transport{
	Proxy: ProxyFromEnvironment,
	DialContext: defaultTransportDialContext(&net.Dialer{
		Timeout:   30 * time.Second,			// TCP握手超时时间，默认永不超时
		KeepAlive: 30 * time.Second,			// TCP探测连接的对端是否存活间隔时间，如果为负值则禁用探针
	}),
	ForceAttemptHTTP2:     true,				// 当使用自定义的Dial, DialTLS, or DialContext func or TLSClientConfig时，是否开启HTTP/2
    MaxIdleConns:          100,					// (HTTP长连接)最大空闲连接数，0代表不限制
    IdleConnTimeout:       90 * time.Second,	// (HTTP长连接)每个连接最长空闲时间，0代表不限制
	TLSHandshakeTimeout:   10 * time.Second,	// TLS握手超时时间，0代表永不超时
	ExpectContinueTimeout: 1 * time.Second,		// Client在发送包含"Expect: 100-continue"的Header到收到继续发送Body的Response之间的时间
}
```

Transport默认值

```go
type Transport struct {
    	// MaxConnsPerHost optionally limits the total number of
	// connections per host, including connections in the dialing,
	// active, and idle states. On limit violation, dials will block.
	//
	// Zero means no limit.
    MaxConnsPerHost int							// (对每个远程主机)最大连接数, 0代表不限制
    
	// MaxIdleConnsPerHost, if non-zero, controls the maximum idle
	// (keep-alive) connections to keep per-host. If zero,
	// DefaultMaxIdleConnsPerHost is used.
	MaxIdleConnsPerHost int						// (对每个远程主机)的最大空闲连接数，默认使用DefaultMaxIdleConnsPerHost定义的值   
}

const DefaultMaxIdleConnsPerHost = 2			// 默认为2，这意味着空闲连接中的100个连接只有两个连接分配给该主机；这个值比较小，可以改大一些
```

### Client Transport：连接复用测试

::: details 点击查看完整代码

```go
package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/http/httptrace"
	"os"
	"strconv"
	"time"
)

func RunServer(addr string) {
	http.HandleFunc("/", func(writer http.ResponseWriter, request *http.Request) {
		time.Sleep(time.Second * 3)
		msg := time.Now().Format("2006/01/02 15:04:05") + " HTTP Server Response: hello world!\n"
		_, _ := fmt.Fprintf(writer, msg)
	})

	err := http.ListenAndServe(addr, nil)
	if err != nil {
		log.Fatal(err)
	}
}

func NewClient() *http.Client {
	// 实例化Transport
	t := http.DefaultTransport.(*http.Transport).Clone()
	t.MaxIdleConnsPerHost = 3 // 设置每个主机最大空闲连接数

	// 实例化客户端
	client := &http.Client{
		Timeout:   time.Second * 5, // 设置每次发送请求超时时间，包含建立连接、重定向、读取正文等整个请求流程时间
		Transport: t,
	}
	return client
}

func SendRequest(client *http.Client, url string, number int) {
	// ------------------- 这里是核心代码 ----------------------
	// 生成client trace context
	clientTrace := &httptrace.ClientTrace{
		GotConn: func(GotConnInfo httptrace.GotConnInfo) {
			reused := strconv.FormatBool(GotConnInfo.Reused)   // 连接复用
			wasidle := strconv.FormatBool(GotConnInfo.WasIdle) // 该连接是否来自连接池
			idleTime := GotConnInfo.IdleTime
			log.Printf("连接复用: %-5s | 来自连接池: %-5s | 该连接已空闲的时间: %-5s\n", reused, wasidle, idleTime)
		},
	}
	traCtx := httptrace.WithClientTrace(context.Background(), clientTrace)

	// 生成request
	req, err := http.NewRequestWithContext(traCtx, http.MethodGet, url, nil)
	if err != nil {
		log.Fatalln(err)
	}
	// --------------------------------------------
	for i := 0; i < number; i++ {
		go func() {
			// 发送GET请求
			resp, err := client.Do(req)
			if err != nil {
				log.Fatal("请求超时: ", err)
			}
			// 关闭连接
			defer func() {
				if err = resp.Body.Close(); err != nil {
					log.Fatalln(err)
				}
			}()
			// 输出到控制台
			if _, err = io.Copy(os.Stdout, resp.Body); err != nil {
				log.Fatalln(err)
			}
		}()
	}

}

func main() {
	// 定义变量
	ServerListenAddr := "127.0.0.1:5000"      //	服务端监听地址
	ServerURL := "http://" + ServerListenAddr // 客户端访问地址

	// 启动服务端
	go RunServer(ServerListenAddr)

	// 实例化Client
	client := NewClient()

	// 启动客户端
	go SendRequest(client, ServerURL, 5) // 发送3次请求
	time.Sleep(time.Second * 5)          // 等待以上请求处理完毕，下次请求会复用上面的请求
	go SendRequest(client, ServerURL, 5) // 发送3次请求
	select {}                            // 阻塞
}
```

:::

输出结果

```bash
# 刚开始连接池为空，所以都是新创建的连接
2022/04/28 12:59:53 连接复用: false | 来自连接池: false | 该连接已空闲的时间: 0s
2022/04/28 12:59:53 连接复用: false | 来自连接池: false | 该连接已空闲的时间: 0s
2022/04/28 12:59:53 连接复用: false | 来自连接池: false | 该连接已空闲的时间: 0s
2022/04/28 12:59:53 连接复用: false | 来自连接池: false | 该连接已空闲的时间: 0s
2022/04/28 12:59:53 连接复用: false | 来自连接池: false | 该连接已空闲的时间: 0s
2022/04/28 12:59:56 HTTP Server Response: hello world!
2022/04/28 12:59:56 HTTP Server Response: hello world!
2022/04/28 12:59:56 HTTP Server Response: hello world!
2022/04/28 12:59:56 HTTP Server Response: hello world!
2022/04/28 12:59:56 HTTP Server Response: hello world!

# 再次发送HTTP请求，同一台主机复用到了3个连接，可以通过调整NewClient中MaxIdleConnsPerHost参数来复用同一台主机更多连接
2022/04/28 12:59:58 连接复用: true  | 来自连接池: true  | 该连接已空闲的时间: 1.978283s
2022/04/28 12:59:58 连接复用: true  | 来自连接池: true  | 该连接已空闲的时间: 1.978283s
2022/04/28 12:59:58 连接复用: true  | 来自连接池: true  | 该连接已空闲的时间: 1.978283s
2022/04/28 12:59:58 连接复用: false | 来自连接池: false | 该连接已空闲的时间: 0s       
2022/04/28 12:59:58 连接复用: false | 来自连接池: false | 该连接已空闲的时间: 0s       
2022/04/28 13:00:01 HTTP Server Response: hello world!
2022/04/28 13:00:01 HTTP Server Response: hello world!
2022/04/28 13:00:01 HTTP Server Response: hello world!
2022/04/28 13:00:01 HTTP Server Response: hello world!
2022/04/28 13:00:01 HTTP Server Response: hello world!
```

### Client CheckRedirect: 重定向策略

通过`Client.Do`方法追踪到默认重定向策略函数，即最多允许10次重定向

```go
func defaultCheckRedirect(req *Request, via []*Request) error {
	if len(via) >= 10 {
		return errors.New("stopped after 10 redirects")
	}
	return nil
}
```

::: details 点击查看完整代码

```go
package main

import (
	"io"
	"log"
	"net/http"
	"os"
)

func RunServer(addr string) {
	http.HandleFunc("/", func(writer http.ResponseWriter, request *http.Request) {
		writer.Header().Set("Location", "/demo")
		writer.WriteHeader(301)
	})

	http.HandleFunc("/demo", func(writer http.ResponseWriter, request *http.Request) {
		writer.Header().Set("Location", "https://www.baidu.com")
		writer.WriteHeader(301)
	})

	err := http.ListenAndServe(addr, nil)
	if err != nil {
		log.Fatal(err)
	}
}

func SendRequest(ServerURL string) {
	// 实例化Client
	client := &http.Client{
		CheckRedirect: func(req *http.Request, via []*http.Request) error {
			//
			log.Printf("当前请求地址: %q | 当前请求来源地址: %q\n", req.URL, req.Referer())
			log.Printf("已访问过的地址集合: \n")
			for _, v := range via {
				log.Printf("   已访问过的地址: %q | 地址来源: %q\n", v.URL, v.Referer())
			}
			log.Println()

			return nil // 可以正常重定向
			//return http.ErrUseLastResponse // 禁止重定向
		},
	}

	// 生成Request对象
	req, err := http.NewRequest("GET", ServerURL, nil)
	if err != nil {
		log.Fatalln(err)
	}

	// 发送请求
	resp, err := client.Do(req)

	if err != nil {
		log.Fatal(err)
	}

	// 关闭连接
	defer func() {
		if err = resp.Body.Close(); err != nil {
			log.Fatalln(err)
		}
	}()

	// 输出到控制台
	if _, err = io.Copy(os.Stdout, resp.Body); err != nil {
		log.Fatalln(err)
	}
}

func main() {
	// 定义变量
	ServerListenAddr := "127.0.0.1:5000"      //	服务端监听地址
	ServerURL := "http://" + ServerListenAddr // 客户端访问地址

	// 启动服务端
	go RunServer(ServerListenAddr)

	// 启动客户端
	SendRequest(ServerURL)
}
```

:::

输出结果

```bash
# 允许重定向策略输出结果
# 访问 http://127.0.0.1:5000/ --> 重定向至http://127.0.0.1:5000/demo/ --> 重定向至https://www.baidu.com 输出结果
2022/04/28 17:07:02 当前请求地址: "http://127.0.0.1:5000/demo" | 当前请求来源地址: "http://127.0.0.1:5000"
2022/04/28 17:07:02 已访问过的地址集合:
2022/04/28 17:07:02    已访问过的地址: "http://127.0.0.1:5000" | 地址来源: ""
2022/04/28 17:07:02
2022/04/28 17:07:02 当前请求地址: "https://www.baidu.com" | 当前请求来源地址: "http://127.0.0.1:5000/demo"
2022/04/28 17:07:02 已访问过的地址集合:
2022/04/28 17:07:02    已访问过的地址: "http://127.0.0.1:5000" | 地址来源: ""
2022/04/28 17:07:02    已访问过的地址: "http://127.0.0.1:5000/demo" | 地址来源: "http://127.0.0.1:5000"
2022/04/28 17:07:02
<html>
<head>
        <script>
                location.replace(location.href.replace("https://","http://"));
        </script>
</head>
<body>
        <noscript><meta http-equiv="refresh" content="0;url=http://www.baidu.com/"></noscript>
</body>
</html>

# 禁止重定向输出结果
2022/04/28 17:11:12 当前请求地址: "http://127.0.0.1:5000/demo" | 当前请求来源地址: "http://127.0.0.1:5000"
2022/04/28 17:11:12 已访问过的地址集合:                                      
2022/04/28 17:11:12    已访问过的地址: "http://127.0.0.1:5000" | 地址来源: ""
2022/04/28 17:11:12         
```

