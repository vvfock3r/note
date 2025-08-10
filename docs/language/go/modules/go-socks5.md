# go-socks5

<br />

## 文档

Github：[https://github.com/armon/go-socks5](https://github.com/armon/go-socks5)

说明：

* 最近更新时间在2016年
* frp项目中在使用该库

<br />

## 安装

```bash
D:\application\GoLand\example> go get github.com/armon/go-socks5
go: added github.com/armon/go-socks5 v0.0.0-20160902184237-e75332964ef5
go: added golang.org/x/net v0.5.0
```

<br />

## 示例

::: details 点击查看详情

```go
package main

import "github.com/armon/go-socks5"

func main() {
	// 初始化配置
	conf := &socks5.Config{}

	// 创建Server
	server, err := socks5.New(conf)
	if err != nil {
		panic(err)
	}

	// 启动服务
	if err := server.ListenAndServe("tcp", "0.0.0.0:8000"); err != nil {
		panic(err)
	}
}
```

输出结果

```bash
# 为了测试方便，我直接将程序部署在一台公网服务器上
[root@ap-hongkang demo]# go run main.go

# 获取一下本地的IP地址
C:\Users\Administrator> curl ip.jinhui.dev                             
183.197.xxx.xxx

# 添加socks5代理
C:\Users\Administrator> curl --proxy socks5://jinhui.dev:8000 ip.jinhui.dev 
43.154.36.151
```

:::

<br />

## Basic Auth认证

::: details 点击查看详情

```go
package main

import "github.com/armon/go-socks5"

func main() {
	// 初始化配置，配置用户名和密码
	conf := &socks5.Config{
		Credentials: socks5.StaticCredentials{
			"zhangsan": "123456",
			"lisi":     "abcdefg",
			"wangwu":   "qaz.123",
		},
	}

	// 创建Server
	server, err := socks5.New(conf)
	if err != nil {
		panic(err)
	}

	// 启动服务
	if err := server.ListenAndServe("tcp", "0.0.0.0:8000"); err != nil {
		panic(err)
	}
}
```

输出结果

```bash
# 直接访问提示没有认证
C:\Users\Administrator> curl --proxy socks5://jinhui.dev:8000 ip.jinhui.dev
curl: (97) No authentication method was acceptable.

# 添写用户名和密码
C:\Users\Administrator> curl --proxy socks5://zhangsan:123456@jinhui.dev:8000 ip.jinhui.dev
43.154.36.151

C:\Users\Administrator> curl --proxy socks5://lisi:abcdefg@jinhui.dev:8000 ip.jinhui.dev
43.154.36.151

C:\Users\Administrator> curl --proxy socks5://wangwu:qaz.123@jinhui.dev:8000 ip.jinhui.dev
43.154.36.151

# 密码填写错误，用户被拒绝
C:\Users\Administrator> curl --proxy socks5://wangwu:123456@jinhui.dev:8000 ip.jinhui.dev
curl: (97) User was rejected by the SOCKS5 server (1 1).
```

:::