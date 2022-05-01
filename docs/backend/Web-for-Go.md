## 版本介绍

```bash
# Go版本
C:\Users\Administrator>go version
go version go1.18 windows/amd64
```

## net/http之Client

官方文档：[https://pkg.go.dev/net/http](https://pkg.go.dev/net/http)

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
	// 生成client trace
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

### Client Transport：设置代理

先确保不加代理的时候能正常输出当前IP，然后再切换到代理模式，验证代理是否生效

::: details 点击查看完整代码

```go
package main

import (
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"time"
)

func main() {
	// 实例化Client(不加代理)
	//client := &http.Client{}

	// 实例化Client(添加代理)
	ProxyScheme := "http"                    // 代理协议
	ProxyHostAndPort := "192.168.0.102:7890" // 代理服务器地址和端口,请注意这里是否需要修改
	t := http.DefaultTransport.(*http.Transport)
	t.Proxy = http.ProxyURL(&url.URL{Scheme: ProxyScheme, Host: ProxyHostAndPort})
	client := &http.Client{
		Transport: t,
		Timeout:   time.Second * 15,
	}

	// 生成request对象, https://api.ip.sb/ip能以文本格式输出我们当前的IP,可以用这个网站来检测我们的代理是否生效
	req, err := http.NewRequest("GET", "https://api.ip.sb/ip", nil)
	if err != nil {
		log.Fatalln(err)
	}

	// 修改User-Agent，不修改的话会报403错误
	req.Header.Set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36")

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
```

:::

输出结果

```bash
# 未设置代理时输出
36.143.45.59

# 设置代理后输出
87.249.128.47
```

### Client Transport：添加Basic Auth认证

* 方式一：直接调用`request.SetBasicAuth("root", "123456")`
* 方式二：在Transport Proxy中注入`request.SetBasicAuth("root", "123456")`

::: details 点击查看完整代码

```go
package main

import (
	"encoding/base64"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"
	"time"
)

// 请求处理函数
func index(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "hello world!")
}

// Base64解密
func BasicAuthDecodeString(auth string) (plaintext string, err error) {
	authSlice := strings.Split(auth, " ")
	if len(authSlice) != 2 || authSlice[0] != "Basic" {
		return "", errors.New("Basic auth format error")
	}
	p, err := base64.StdEncoding.DecodeString(authSlice[1])
	return string(p), err
}

// 用户验证
func BasicAuthVerifyUser(plaintext string) bool {
	users := []string{"root:123456", "admin:654321"}
	for _, v := range users {
		if v == plaintext {
			return true
		}
	}
	return false
}

// BasicAuth装饰器
func BasicAuth(handler http.Handler) http.Handler {
	// 返回一个新的handler
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// 获取Basic Auth认证凭证
		auth := r.Header.Get("Authorization") //获取Basic base64加密后的字段

		// 验证失败
		plaintext, err := BasicAuthDecodeString(auth)
		if err != nil {
			w.Header().Set("WWW-Authenticate", `Basic realm="`+err.Error()+`"`)
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		// 用户名密码验证失败
		if !BasicAuthVerifyUser(plaintext) {
			w.Header().Set("WWW-Authenticate", `Basic realm="用户名或密码错误"`)
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		// 验证通过,调用原始handler方法
		handler.ServeHTTP(w, r)
	})
}

func RunServer() {
	addr := "127.0.0.1:80"
	http.Handle("/", BasicAuth(http.HandlerFunc(index)))
	err := http.ListenAndServe(addr, nil)
	if err != nil {
		log.Fatal(err)
	}
}

func SendRequest() {
	// 方式二：使用Transport Proxy
	t := http.DefaultTransport.(*http.Transport).Clone()
	t.Proxy = func(request *http.Request) (*url.URL, error) {
		request.SetBasicAuth("root", "123456")
		return request.URL, nil
	}

	// 实例化客户端
	client := &http.Client{
		Timeout:   time.Second * 5, // 设置每次发送请求超时时间，包含建立连接、重定向、读取正文等整个请求流程时间
		Transport: t,
	}

	// 创建Request对象
	req, err := http.NewRequest("GET", "http://127.0.0.1", nil)
	if err != nil {
		log.Fatalln(err)
	}

	// 方式一：添加Baisc Auth认证
	//req.SetBasicAuth("root", "123456")

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
}

func main() {
	// 启动服务端
	go RunServer()

	// 发送请求
	time.Sleep(time.Second)
	SendRequest()
}

```

:::

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

### Client Jar：Cookie设置与查看

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"io"
	"log"
	"math/rand"
	"net/http"
	"net/http/cookiejar"
	"net/url"
	"strconv"
	"time"
)

func RunServer(addr string) {
	http.HandleFunc("/", func(writer http.ResponseWriter, request *http.Request) {
		// 服务端设置cookie
		rand.Seed(time.Now().UnixNano()) // 设置随机数种子
		cookie1 := &http.Cookie{Name: "uid", Value: strconv.Itoa(rand.Intn(999))}
		cookie2 := &http.Cookie{Name: "gid", Value: strconv.Itoa(rand.Intn(999))}
		http.SetCookie(writer, cookie1)
		http.SetCookie(writer, cookie2)

		// 返回响应
		_, err := fmt.Fprintf(writer, "hello world!")
		if err != nil {
			log.Fatalln(err)
		}
	})

	err := http.ListenAndServe(addr, nil)
	if err != nil {
		log.Fatal(err)
	}
}

func NewClient() *http.Client {
	// 实例化cookiejar
	jar, err := cookiejar.New(nil)
	if err != nil {
		log.Fatalln(err)
	}

	// 实例化Client
	// Jar参数：服务端响应设置的Cookie会自动保存，下次客户端请求时会自动带上(若要查看本次请求的Cookie必须在请求发送完成之后，即client.Do方法之后)
	// 		   客户端也可以不用该参数，而是每次请求时主动添加Cookie。
	client := &http.Client{
		Jar: jar,
	}
	return client
}

func SendRequest(client *http.Client, ServerURL string) {
	// 生成Request对象
	req, err := http.NewRequest("GET", ServerURL, nil)
	if err != nil {
		log.Fatalln(err)
	}

	// 客户端主动设置Cookie
	rand.Seed(time.Now().UnixNano()) // 设置随机数种子
	cookie := &http.Cookie{Name: "client", Value: strconv.Itoa(rand.Intn(999))}
	req.AddCookie(cookie)

	// 发送请求
	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}

	// 查看客户端携带的Cookie, 要在发送完请求以后才能查看携带的Cookie
	fmt.Printf("客户端发送请求携带的Cookie: %q\n", req.Cookies())

	// 关闭连接
	defer func() {
		if err = resp.Body.Close(); err != nil {
			log.Fatalln(err)
		}
	}()

	// 输出到控制台
	data, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	fmt.Printf("服务端响应内容: %s | 服务端设置的Cookie: %q\n", string(data), resp.Cookies())

}

func main() {
	// 定义变量
	ServerListenAddr := "127.0.0.1:5000"      //	服务端监听地址
	ServerURL := "http://" + ServerListenAddr // 客户端访问地址

	// 启动服务端
	go RunServer(ServerListenAddr)

	// 实例化客户端
	// 客户端实例化时只需要添加Jar属性，下次
	client := NewClient()

	// 发送请求
	SendRequest(client, ServerURL)

	// 查看client.Jar存储的Cookie
	fmt.Println()
	fmt.Println(client.Jar.Cookies(&url.URL{
		Scheme: "http",
		Host:   "127.0.0.1:5000",
	}))
	fmt.Println()

	// 再次发送请求，自动携带Cookie
	SendRequest(client, ServerURL)

}
```

:::

输出结果

```bash
# 在我们这个代码中，客户端每次请求时都会都会生成随机cookie（client=xxx），所以两次请求中client值不一样
# uid和gid是服务端设置的Cookie，通过client.Jar属性来自动管理，下次请求的时候会自动带上
客户端发送请求携带的Cookie: ["client=352"]
服务端响应内容: hello world! | 服务端设置的Cookie: ["uid=94" "gid=307"] 
                                                                        
[uid=94 gid=307]                                                        
                                                                        
客户端发送请求携带的Cookie: ["client=489" "uid=94" "gid=307"]           
服务端响应内容: hello world! | 服务端设置的Cookie: ["uid=489" "gid=407"]
```

### 💊 Groutine数量问题

只是简单发送一个`GET`请求，关闭连接后发现：

（1）为什么`Goroutine`数量是3？

（2）为什么会多出来2个？

（3）多出来的2个是干嘛的？

（4）换一个网站测试，发一次请求，发现`Goroutine`又变成2了，为什么？

::: details 问题1验证：Goroutine数量是3

```go
package main

import (
	"io"
	"log"
	"net/http"
	"runtime"
	"time"
)

func main() {
	// 实例化Client	
	client := &http.Client{}

	// 发送GET请求
	resp, err := client.Get("https://www.baidu.com")
	if err != nil {
		log.Fatal(err)
	}

	// 输出到控制台
	if _, err = io.Copy(io.Discard, resp.Body); err != nil {
		log.Fatalln(err)
	}

	// 关闭连接
	err = resp.Body.Close()
	if err != nil {
		log.Fatalln(err)
	}

	// 查看goroutine数量
	for {
		time.Sleep(time.Second)
		log.Println(runtime.NumGoroutine())
	}
}

// 输出结果：3
```

:::

::: details 问题2猜想并验证-方式1：关闭连接后并没有真正销毁而是放入到连接池中了，通过调整最大空闲连接数来验证

```go
package main

import (
	"io"
	"log"
	"net/http"
	"runtime"
	"time"
)

func main() {
	// 实例化Client
	t := http.DefaultTransport.(*http.Transport).Clone()
	t.MaxIdleConns = -1 // (HTTP长连接)最大空闲连接数，0代表不限制，设置为-1，即不允许有空闲连接
	client := &http.Client{Transport: t}

	// 发送GET请求
	resp, err := client.Get("https://www.baidu.com")
	if err != nil {
		log.Fatal(err)
	}

	// 输出到控制台
	if _, err = io.Copy(io.Discard, resp.Body); err != nil {
		log.Fatalln(err)
	}

	// 关闭连接
	err = resp.Body.Close()
	if err != nil {
		log.Fatalln(err)
	}

	// 查看goroutine数量
	for {
		time.Sleep(time.Second)
		log.Println(runtime.NumGoroutine())
	}
}

// 输出结果：1
```

:::

::: details 问题2猜想并验证-方式2：通过向不同主机发请求，让连接池中的连接得不到复用，验证1个请求对应2个Groutine的想法对不对

```go
package main

import (
	"io"
	"log"
	"net/http"
	"runtime"
	"time"
)

func main() {
	// 实例化Client
	client := &http.Client{}

	// 简单封装一下
	sendRequest := func(url string) {
		// 发送GET请求
		resp, err := client.Get(url)
		if err != nil {
			log.Fatal(err)
		}

		// 输出到控制台
		if _, err = io.Copy(io.Discard, resp.Body); err != nil {
			log.Fatalln(err)
		}

		// 关闭连接
		err = resp.Body.Close()
		if err != nil {
			log.Fatalln(err)
		}
	}

	// 发送请求
	// 向两个不同的主机发送请求，连接得不到复用，每个请求创建2个goroutine，所以当发送2次请求应该总共有5个goroutine
	sendRequest("https://www.baidu.com")
	sendRequest("https://www.qq.com")
	//sendRequest("https://www.163.com")

	// 查看goroutine数量
	for {
		time.Sleep(time.Second)
		log.Println(runtime.NumGoroutine())
	}
}

// 输出结果：5
```

:::

::: details 问题3猜想<span style="color: red; font-weight: bold;">未验证</span>：1个Groutine用于读，1个Groutine用于写（求大佬指点迷津）

:::

::: details 问题4猜想并验证：该网站使用的是HTTP/2协议，HTTP/1.1是半双工，HTTP/2和WebSocket一样是全双工的，读和写可以在一个Goroutine中完成

这里使用httpstat来查看http协议，当然也可以使用其他工具，比如浏览器

![image-20220430104420307](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220430104420307.png)

> 注意事项：
>
> （1）curl默认是不支持HTTP/2协议的，除非重新编译，所以用curl测试的话会降级到HTTP/1.1
>
> ![image-20220430104801284](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220430104801284.png)
>
> （2）HTTP/2响应头中并没有看到`Keep-Alive`，这是因为HTTP/2协议规定的，它删除了很多字段，比如`Keep-Alive`、`Proxy-Connection`等
>
> ​          参考RFC 7540：[https://www.rfc-editor.org/rfc/rfc7540.html#section-8.1.2.2](https://www.rfc-editor.org/rfc/rfc7540.html#section-8.1.2.2)

:::

### 💊 Groutine泄漏之Transport

先上结论

```go
// Transports should be reused instead of created as needed.
// Transports应该被重用，而不是一旦需要就创建

// Transports are safe for concurrent use by multiple goroutines.
// Transports线程安全
```

代码演示

::: details 复现Transport引起的Goroutine泄漏

```go
package main

import (
	"io"
	"log"
	"net/http"
	"runtime"
	"sync"
	"time"
)

func sendRequest(wg *sync.WaitGroup) {
	defer wg.Done()

	// 实例化客户端
	client := &http.Client{
		Transport: &http.Transport{
			Proxy:                 http.ProxyFromEnvironment,
			ForceAttemptHTTP2:     true,
			MaxIdleConns:          100,
			IdleConnTimeout:       30 * time.Second,	// 调整为30,方便测试
			TLSHandshakeTimeout:   10 * time.Second,
			ExpectContinueTimeout: 1 * time.Second,
		},
	}

	// 发送GET请求
	resp, err := client.Get("https://www.baidu.com")
	if err != nil {
		log.Fatal(err)
	}

	// 关闭连接
	defer func() {
		err = resp.Body.Close()
		if err != nil {
			log.Fatalln(err)
		}
	}()

	// 丢弃响应
	if _, err = io.Copy(io.Discard, resp.Body); err != nil {
		log.Fatalln(err)
	}
}

func main() {
	// 定义变量
	wg := &sync.WaitGroup{}

	// 发送多个请求
	for i := 0; i < 300; i++ {
		wg.Add(1)
		go sendRequest(wg)
	}

	// 等待goroutine运行结束
	wg.Wait()

	// 查看goroutine数量
	for {
		n := runtime.NumGoroutine()
		log.Println(n)
		if n == 1 {
			break
		}
		time.Sleep(time.Second * 1)
	}
}
```

:::

输出结果

```bash
# (1)最后一个Goroutine运行完成后，立即查看Goroutine数量得到601
# 300 * 2 +1 = 601
#     300：300个请求
#       2: 对HTTP/1.1网站说1个请求对应2个goroutine
#       1: 主goroutine
# (2) 后面Groutine为什么又少了呢？
#     看一下时间差，差了30秒左右，再看一下代码 IdleConnTimeout: 30 * time.Second, 正好可以对应上，原因是空闲连接超时被干掉了
# (3) 之前介绍过有这样一个参数，DefaultMaxIdleConnsPerHost=2，这意味着空闲连接中的100个连接只有两个连接分配给该主机，300个连接和这个参数不是冲突了吗？
#     其实并没有冲突，因为每个Transport都是全新的，对他来说只有1个连接
2022/04/30 15:43:31 601
2022/04/30 15:43:32 601
2022/04/30 15:43:33 601
2022/04/30 15:43:34 601
2022/04/30 15:43:35 601
2022/04/30 15:43:36 601
2022/04/30 15:43:37 601
2022/04/30 15:43:38 601
2022/04/30 15:43:39 601
2022/04/30 15:43:40 601
2022/04/30 15:43:41 601
2022/04/30 15:43:43 601
2022/04/30 15:43:44 601
2022/04/30 15:43:45 601
2022/04/30 15:43:46 601
2022/04/30 15:43:47 601
2022/04/30 15:43:48 601
2022/04/30 15:43:49 385
2022/04/30 15:43:50 292
2022/04/30 15:43:51 209
2022/04/30 15:43:52 209
2022/04/30 15:43:53 209
2022/04/30 15:43:54 170
2022/04/30 15:43:55 59
2022/04/30 15:43:56 59
2022/04/30 15:43:57 59
2022/04/30 15:43:58 59
2022/04/30 15:43:59 59
2022/04/30 15:44:00 59
2022/04/30 15:44:01 59
2022/04/30 15:44:02 1
```

::: details 修复Transport引起的Goroutine泄漏

```go
package main

import (
	"io"
	"log"
	"net/http"
	"runtime"
	"sync"
	"time"
)

func sendRequest(wg *sync.WaitGroup, client *http.Client) {
	defer wg.Done()
	// 发送GET请求
	resp, err := client.Get("https://www.baidu.com")
	if err != nil {
		log.Fatal(err)
	}

	// 关闭连接
	defer func() {
		err = resp.Body.Close()
		if err != nil {
			log.Fatalln(err)
		}
	}()

	// 丢弃响应
	if _, err = io.Copy(io.Discard, resp.Body); err != nil {
		log.Fatalln(err)
	}
}

func main() {
	// 定义变量
	wg := &sync.WaitGroup{}

	// 实例化客户端
	client := &http.Client{
		Transport: &http.Transport{
			Proxy:                 http.ProxyFromEnvironment,
			ForceAttemptHTTP2:     true,
			MaxIdleConns:          100,
			IdleConnTimeout:       30 * time.Second,	// 调整为30,方便测试
			TLSHandshakeTimeout:   10 * time.Second,
			ExpectContinueTimeout: 1 * time.Second,
		},
	}

	// 发送多个请求
	for i := 0; i < 300; i++ {
		wg.Add(1)
		go sendRequest(wg, client)
	}

	// 等待goroutine运行结束
	wg.Wait()

	// 查看goroutine数量
	for {
		n := runtime.NumGoroutine()
		log.Println(n)
		if n == 1 {
			break
		}
		time.Sleep(time.Second * 1)
	}
}
```

:::

输出结果

```bash
2022/04/30 16:00:25 461
2022/04/30 16:00:28 353
2022/04/30 16:00:29 227
2022/04/30 16:00:30 223
2022/04/30 16:00:31 73
2022/04/30 16:00:32 57
2022/04/30 16:00:33 57
2022/04/30 16:00:34 57
2022/04/30 16:00:35 47
2022/04/30 16:00:36 9
2022/04/30 16:00:37 7
2022/04/30 16:00:38 7
2022/04/30 16:00:39 5	# 实际上到这里已经结束，连接池中保留了2个空闲连接
2022/04/30 16:00:40 5
2022/04/30 16:00:41 5
2022/04/30 16:00:42 5
2022/04/30 16:00:43 5
2022/04/30 16:00:44 5
2022/04/30 16:00:45 5
2022/04/30 16:00:46 5
2022/04/30 16:00:47 5
2022/04/30 16:00:48 5
2022/04/30 16:00:49 5
2022/04/30 16:00:50 5
2022/04/30 16:00:51 5
2022/04/30 16:00:52 5
2022/04/30 16:00:53 5
2022/04/30 16:00:54 5
2022/04/30 16:00:56 1
```





## net/http/httptrace：HTTP请求跟踪

官方文档：[https://pkg.go.dev/net/http/httptrace](https://pkg.go.dev/net/http/httptrace)



### 精简版httpstat

下面的代码是仿[httpstat](https://github.com/davecheney/httpstat) 写的一个精简版本，重在学习

::: details 点击查看完整代码

```go
package main

import (
	"context"
	"crypto/tls"
	"fmt"
	"github.com/fatih/color"
	"io"
	"log"
	"net/http"
	"net/http/httptrace"
	"strings"
	"time"
)

func main() {
	// 定义计时变量
	var (
		dnsStartTime, dnsDoneTime           time.Time
		tcpStartTime, tcpDoneTime           time.Time
		tlsStartTime, tlsDoneTime           time.Time
		httpConnStartTime, httpConnDoneTime time.Time
		httpFirstRespByte                   time.Time
	)

	// 定义输出模板
	const httpsTemplate = `` +
		`  DNS Lookup   TCP Connection   TLS Handshake   Server Processing   Content Transfer` + "\n" +
		`[%s  |     %s  |    %s  |        %s  |       %s  ]` + "\n" +
		`            |                |               |                   |                  |` + "\n" +
		`   namelookup:%s      |               |                   |                  |` + "\n" +
		`                       connect:%s     |                   |                  |` + "\n" +
		`                                   pretransfer:%s         |                  |` + "\n" +
		`                                                     starttransfer:%s        |` + "\n" +
		`                                                                               total:%s` + "\n"

	// 创建Client Trace对象
	trace := &httptrace.ClientTrace{
		// DNS解析计时
		DNSStart: func(info httptrace.DNSStartInfo) {
			dnsStartTime = time.Now()
		},
		DNSDone: func(dnsInfo httptrace.DNSDoneInfo) {
			dnsDoneTime = time.Now()
		},
		// TCP3次握手计时
		ConnectStart: func(network, addr string) {
			tcpStartTime = time.Now()
		},
		ConnectDone: func(network, addr string, err error) {
			tcpDoneTime = time.Now()
			fmt.Printf("\n%s%s\n", color.GreenString("Connected to "), color.CyanString(addr))
		},
		// TLS握手计时
		TLSHandshakeStart: func() {
			tlsStartTime = time.Now()
		},
		TLSHandshakeDone: func(state tls.ConnectionState, err error) {
			tlsDoneTime = time.Now()
		},
		// HTTP/HTTPS建立连接后调用
		GotConn: func(info httptrace.GotConnInfo) {
			httpConnStartTime = time.Now()
		},
		// 获取服务端响应头第一个字节后调用
		GotFirstResponseByte: func() {
			httpFirstRespByte = time.Now()
		},
	}

	// 创建Client Trace Context
	traCtx := httptrace.WithClientTrace(context.Background(), trace)

	// 生成Request对象，上面所创建的trace Context都是为了创建Request
	req, err := http.NewRequestWithContext(traCtx, "GET", "https://yu-jinhui.com", nil)
	if err != nil {
		log.Fatalln(err)
	}

	// 实例化Client，偷个懒直接用默认的客户端
	client := http.DefaultClient
	client.Timeout = time.Second * 5 // 设置超时时间
	client.CheckRedirect = func(req *http.Request, via []*http.Request) error {
		return http.ErrUseLastResponse // 拒绝重定向
	}

	// 发送请求
	resp, err := client.Do(req)
	if err != nil {
		log.Fatalln(err)
	}

	// 读取响应头
	fmt.Printf("\n%s/%s\n", color.GreenString("HTTPS"), color.CyanString("%d.%d %s", resp.ProtoMajor, resp.ProtoMinor, resp.Status))
	for k, v := range resp.Header {
		s := strings.Join(v, ",")
		fmt.Printf("%s: %s\n", k, color.CyanString("%s", s))
	}

	// 丢弃响应
	if _, err := io.Copy(io.Discard, resp.Body); err != nil {
		log.Fatalln(err)
	}
	fmt.Printf(color.CyanString("\n%s\n", "Body discarded"))

	// 关闭连接(放回连接池中)
	if err := resp.Body.Close(); err != nil {
		log.Fatalln(err)
	}

	// 连接断开时间
	httpConnDoneTime = time.Now()

	// 输出内容
	fmta := func(d time.Duration) string {
		return color.CyanString("%7dms", int(d/time.Millisecond))
	}

	fmt.Println()
	fmt.Printf(
		httpsTemplate,
		// 第一行
		fmta(dnsDoneTime.Sub(dnsStartTime)),
		fmta(tcpDoneTime.Sub(tcpStartTime)),
		fmta(tlsDoneTime.Sub(tlsStartTime)),
		fmta(httpFirstRespByte.Sub(httpConnStartTime)),
		fmta(httpConnDoneTime.Sub(httpFirstRespByte)),
		// 第二行
		fmta(dnsDoneTime.Sub(dnsStartTime)),
		fmta(tcpDoneTime.Sub(dnsStartTime)),
		fmta(httpConnStartTime.Sub(dnsStartTime)),
		fmta(httpFirstRespByte.Sub(dnsStartTime)),
		fmta(httpConnDoneTime.Sub(dnsStartTime)),
	)
}
```

:::

输出结果

![image-20220429211410766](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220429211410766.png)

## net/http之Server

官方文档：[https://pkg.go.dev/net/http](https://pkg.go.dev/net/http)

### 基础示例

```go
package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
)

// 处理器
func indexHandler(w http.ResponseWriter, req *http.Request) {
	io.WriteString(w, "Hello, world!\n")
}

func main() {
	// 监听地址
	addr := "127.0.0.1:80"

	// 注册路由
	http.HandleFunc("/", indexHandler)

	// 启动服务
	fmt.Println("* Running on http://" + addr)
	log.Fatal(http.ListenAndServe(addr, nil))
}
```

客户端访问测试

```bash
C:\Users\Administrator\Desktop>curl http://127.0.0.1
Hello, world!
```

::: details 进一步探索

（1）查看`http.HandleFunc`源码，发现这与`http.Get`是一个套路

```go
// (1) 真正使用的是DefaultServeMux的HandleFunc方法
// HandleFunc registers the handler function for the given pattern
// in the DefaultServeMux.
// The documentation for ServeMux explains how patterns are matched.
func HandleFunc(pattern string, handler func(ResponseWriter, *Request)) {
	DefaultServeMux.HandleFunc(pattern, handler)
}

// -------------------------------------------------------------------------
// (2) DefaultServeMux是ServeMux指针
// DefaultServeMux is the default ServeMux used by Serve.
var DefaultServeMux = &defaultServeMux

var defaultServeMux ServeMux

// -------------------------------------------------------------------------
// (3) ServeMux是一个结构体

// ServeMux is an HTTP request multiplexer.
// It matches the URL of each incoming request against a list of registered
// patterns and calls the handler for the pattern that
// most closely matches the URL.
// ServeMux是一个请求多路复用器,后面的意思是维护【请求URL】与【处理函数Handler】之间的映射
type ServeMux struct {
	mu    sync.RWMutex
	m     map[string]muxEntry
	es    []muxEntry // slice of entries sorted from longest to shortest.
	hosts bool       // whether any patterns contain hostnames
}

// -------------------------------------------------------------------------
// (4) ListenAndServe默认会调用DefaultServeMux，若我们想使用自定义的ServeMux，handler参数需要改一下

// ListenAndServe listens on the TCP network address addr and then calls
// Serve with handler to handle requests on incoming connections.
// Accepted connections are configured to enable TCP keep-alives.
//
// The handler is typically nil, in which case the DefaultServeMux is used.
// 如果handler为nil的话，使用DefaultServeMux

// ListenAndServe always returns a non-nil error.
// ListenAndServe总是返回非nil的错误
func ListenAndServe(addr string, handler Handler) error {
	server := &Server{Addr: addr, Handler: handler}
	return server.ListenAndServe()
}
```

（2）我们可以使用自定义的`ServeMux`来代替`DefaultServeMux`

```go
package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
)

// 处理器
func indexHandler(w http.ResponseWriter, req *http.Request) {
	io.WriteString(w, "Hello, world!\n")
}

func main() {
	// 监听地址
	addr := "127.0.0.1:80"

	// 实例化请求多路复用器
	mux := http.NewServeMux()

	// 注册路由
	mux.HandleFunc("/", indexHandler)

	// 启动服务
	fmt.Println("* Running on http://" + addr)
	log.Fatal(http.ListenAndServe(addr, mux))
}
```

:::

### 理解Handler

`net/http`包中到处都是`Handler`，理解`Handler`是非常重要的

**（1）`http.Handler`和`http.HandlerFunc`**

```go
// 注释部分挑重要的翻译一下
// (1) http.Handler就是用来处理Request请求的并返回响应
// (2) http.Handler不应该修改Request相关数据
// 总结：Handler就是定义了一个ServeHTTP方法的接口，ServeHTTP用来处理Request并返回响应
type Handler interface {
	ServeHTTP(ResponseWriter, *Request)
}

// -----------------------------------------------------------
// (1) HandlerFunc是一个自定义类型，是一个函数类型，它的值就是一个函数
// (2) HandlerFunc函数实现了Handler接口
// (3) 像HandlerFunc这样的我们一般称为接口型函数
type HandlerFunc func(ResponseWriter, *Request)		// 主要的作用是：类型转换，将函数类型转为HandlerFunc类型（注意并不会改变值）

// ServeHTTP calls f(w, r).
func (f HandlerFunc) ServeHTTP(w ResponseWriter, r *Request) {	// HandlerFunc类型实现了Handler接口，ServeHTTP会调用包装后的函数
	f(w, r)
}

// 这里不是太容易理解
// (1) 其实就是有一个原始函数，经过自定义类型包装一下，原始函数类型发生改变，新类型的函数我们就暂且叫他包装函数，用以区分
// (2) 我们自定义的类型实现了Handler接口，所以包装函数也自动实现了Handler接口
// (3) ServeHTTP方法会调用我们的包装函数
```

如果还是不太理解，可以看一下如下代码

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
)

// 定义一个很普通的函数Add
func Add(x, y int) int {
	return x + y
}

// 自定义接口
type Handler interface {
	ServeHTTP(x, y int) int
}

// 自定义类型
type HandlerFunc func(int, int) int

// 给自定义类型绑定一个方法
func (h HandlerFunc) ServeHTTP(x, y int) int {
	return h(x, y)
}

func main() {
	// (1) 查看Add函数的类型
	fmt.Printf("%T\n", Add) // func(int, int) int

	// (2) 改变Add函数类型
	Add2 := HandlerFunc(Add)     // 注意这里并不是函数调用，而是类型转换
	fmt.Printf("%T\n", Add2)    // main.HandlerFunc; 函数Add还是原来的Add,只不过它的类型已经变成HandlerFunc类型了
	fmt.Println(Add2(100, 200)) // 300; 调用都是没有问题的,值没有变,变得是类型, 因为HandlerFunc类型实现了Handler接口,所以Add2自动实现了Handler接口

	// (3) 声明接口类型变量,并给他赋值
	var Add3 Handler                          // Add3为接口类型
	Add3 = Add2                               // Add2实现了该接口,所以可以赋值
	fmt.Printf("%T\n", Add3)                  // main.HandlerFunc
	fmt.Println(Add3.(HandlerFunc)(150, 350)) // 500, Add3是接口，断言得到值类型,然后就可以正常调用
	fmt.Println(Add3.ServeHTTP(999, 1))       // 调用ServeHTTP方法也是可以的
}
```

:::

**（2）`http.Handle`和`http.HandleFunc`**

* 这两个和`DefaultServeMux`是深度绑定的
* 注意这几个函数单词拼写，一个是`ler`一个是`le`

```go
// Handle registers the handler for the given pattern
// in the DefaultServeMux.
// The documentation for ServeMux explains how patterns are matched.
// 总结：传入Handler接口类型，给DefaultServeMux增加路由与Handler映射（Handle源码含义）
func Handle(pattern string, handler Handler) {
    DefaultServeMux.Handle(pattern, handler)
}


// -----------------------------------------------------------------------------
// HandleFunc registers the handler function for the given pattern
// in the DefaultServeMux.
// The documentation for ServeMux explains how patterns are matched.
// 总结：传入一个函数，自动转为Handler接口类型，并给DefaultServeMux增加路由与Handler映射（Handle源码含义）
func HandleFunc(pattern string, handler func(ResponseWriter, *Request)) {
	DefaultServeMux.HandleFunc(pattern, handler)
}

// HandleFunc registers the handler function for the given pattern.
func (mux *ServeMux) HandleFunc(pattern string, handler func(ResponseWriter, *Request)) { // 自定义mux时可以用这个函数
	if handler == nil {
		panic("http: nil handler")
	}
	mux.Handle(pattern, HandlerFunc(handler))	// 这个HandlerFunc是通用的，并没有和DefaultServeMux绑定，注意单词拼写是ler不是le
}

// -----------------------------------------------------------------------------
// 总结：
// (1) 上面两个函数都是在操作DefaultServeMux，我们如果我们使用自定义的ServeMux时候，是不需要使用这俩方法的
// (2) 上面两个函数都是干同一件事，就是给DefaultServeMux增加一条路由与Handler的映射关系，不同的是传入的参数不同
```

（4）简单应用：注册路由的两种方式

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
)

// 处理器
func indexHandler(w http.ResponseWriter, req *http.Request) {
	io.WriteString(w, "Hello, world!\n")
}

func main() {
	// 监听地址
	addr := "127.0.0.1:80"

	// 实例化请求多路复用器
	mux := http.NewServeMux()

	// 注册路由-方式1
	mux.HandleFunc("/", indexHandler)
	// 我们可以看一下HandleFunc源码,其内部会自动将indexHandler类型转变为HandlerFunc类型，并调用Handle方法
	//func (mux *ServeMux) HandleFunc(pattern string, handler func(ResponseWriter, *Request)) {
	//	if handler == nil {
	//		panic("http: nil handler")
	//	}
	//	mux.Handle(pattern, HandlerFunc(handler))
	//}

	// 注册路由-方式2
	// 我们也可以自己进行类型转换，然后直接传递一个Handler类型的值进去
	h := http.HandlerFunc(indexHandler) // indexHandler不能为nil，否则会报错
	mux.Handle("/test", h)

	// 启动服务
	fmt.Println("* Running on http://" + addr)
	log.Fatal(http.ListenAndServe(addr, mux))
}
```

:::

### ServeMux

