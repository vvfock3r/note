# goproxy

<br />

## 文档

Github：[https://github.com/elazarl/goproxy](https://github.com/elazarl/goproxy)

<br />

## 安装

```bash
D:\application\GoLand\example> go get github.com/elazarl/goproxy
go: added github.com/elazarl/goproxy v0.0.0-20221015165544-a0805db90819
```

<br />

## 示例

::: details 点击查看详情

```go
package main

import (
	"github.com/elazarl/goproxy"
	"log"
	"net/http"
)

func main() {
	proxy := goproxy.NewProxyHttpServer()
	proxy.Verbose = true
	log.Fatal(http.ListenAndServe(":8000", proxy))
}
```

输出结果

```bash
# 为了测试方便，我直接将程序部署在一台公网服务器上
[root@ap-hongkang demo]# go run main.go

# 获取一下本地的IP地址
C:\Users\Administrator> curl ip.jinhui.dev
183.197.xxx.xxx

# 添加http代理
C:\Users\Administrator> curl --proxy http://jinhui.dev:8000 ip.jinhui.dev 
43.154.36.151

# 服务端日志
[root@ap-hongkang demo]# go run main.go
2023/01/27 19:19:59 [001] INFO: Got request / ip.jinhui.dev GET http://ip.jinhui.dev/
2023/01/27 19:19:59 [001] INFO: Sending request GET http://ip.jinhui.dev/
2023/01/27 19:19:59 [001] INFO: Received response 200 OK
2023/01/27 19:19:59 [001] INFO: Copying response to client 200 OK [200]
2023/01/27 19:19:59 [001] INFO: Copied 14 bytes to client error=<nil>
```

:::

