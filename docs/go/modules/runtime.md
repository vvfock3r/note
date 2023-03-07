# runtime

## 基础概念

runtime概念

runtime就是程序的运行环境，很多语言都有runtime，比如说Java的runtime（虚拟机），JavaScript的runtime（浏览器内核）

Go runtime是作为程序的一部分编译到二进制可执行文件中，runtime与用户程序并没有明显的界限

Go runtime提供的功能如下：

* 内存管理
* 垃圾回收（GC）
* 协程调度（GMP）
* ...

<br />

## 指标数据

::: details （1）数据可视化

Github：[https://github.com/arl/statsviz](https://github.com/arl/statsviz)

**1、安装**

```bash
D:\application\GoLand\example>go get github.com/arl/statsviz@latest
go: downloading github.com/arl/statsviz v0.5.1
go: added github.com/arl/statsviz v0.5.1
go: added github.com/gorilla/websocket v1.4.2
```

**2、编写代码**

```go
package main

import (
	"fmt"
	"github.com/arl/statsviz"
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

	// 注册可视化路由
	err := statsviz.RegisterDefault()
	if err != nil {
		panic(err)
	}

	// 启动服务
	fmt.Println("* Running on http://" + addr)
	log.Fatal(http.ListenAndServe(addr, nil))
}
```

**3、启动服务**

```bash
# 启动服务
D:\application\GoLand\example>go run main.go
* Running on http://127.0.0.1:80

# 浏览器访问
http://127.0.0.1/debug/statsviz/
```

![image-20230225131519895](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230225131519895.png)

:::

::: details （2）GMP：查看当前个数和调整最大限额

```go

```

:::





