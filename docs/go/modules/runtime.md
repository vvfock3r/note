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

::: details （2）GMP：查看当前个数

```go
package main

import (
	"fmt"
	"runtime"
	"runtime/pprof"
	"time"
)

func Print() {
	g := runtime.NumGoroutine()
	m := pprof.Lookup("threadcreate").Count()
	p := runtime.GOMAXPROCS(0)

	fmt.Printf("Pid: %d\n", g)
	fmt.Printf("Current Goroutine Number: %d\n", g)
	fmt.Printf("Current Machine   Number: %d\n", m)
	fmt.Printf("Current Processor Number: %d\n", p)
}

func main() {
    Print()
	time.Sleep(time.Hour)
}
```

输出结果

```bash
[root@ap-hongkang example]# go run main.go
Pid: 900645
Current Goroutine Number: 1
Current Machine   Number: 5
Current Processor Number: 2

# 同时还可以使用top命令来验证一下系统线程数量
[root@ap-hongkang ~]# top -H -p900645
    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND                                                   
 900645 root      20   0  710612   1828   1344 S   0.0   0.1   0:00.00 main
 900646 root      20   0  710612   1828   1344 S   0.0   0.1   0:00.00 main
 900647 root      20   0  710612   1828   1344 S   0.0   0.1   0:00.00 main
 900648 root      20   0  710612   1828   1344 S   0.0   0.1   0:00.00 main
 900649 root      20   0  710612   1828   1344 S   0.0   0.1   0:00.00 main
```

:::

::: details （3）GMP：修改最大限额

```go
package main

import (
	"fmt"
	"os/exec"
	"runtime"
	"runtime/debug"
	"runtime/pprof"
	"time"
)

func Print() {
	g := runtime.NumGoroutine()
	m := pprof.Lookup("threadcreate").Count()
	p := runtime.GOMAXPROCS(0)

	fmt.Printf("Pid: %d\n", g)
	fmt.Printf("Current Goroutine Number: %d\n", g)
	fmt.Printf("Current Machine   Number: %d\n", m)
	fmt.Printf("Current Processor Number: %d\n", p)
}

func main() {
	// Goroutine没有提供接口配置限额

	// Machine 默认最大是10000, 超过最大限额会后panic
	debug.SetMaxThreads(1024)

	// Processor 默认是 runtime.NumCPU(), 超过后不会panic
	runtime.GOMAXPROCS(2)

	// 起一些Goroutine
	for i := 0; i < 1000; i++ {
		go func() {
			cmd := exec.Command("sh", "-c", "sleep 300")
			_, err := cmd.CombinedOutput()
			if err != nil {
				panic(err)
			}
		}()
	}
    
	// 再次查看	
    time.Sleep(time.Second * 5)
	Print()

	time.Sleep(time.Hour)
}
```

输出结果

```bash
[root@ap-hongkang example]# go run main.go
                     Pid: 2001
Current Goroutine Number: 2001
Current Machine   Number: 1004
Current Processor Number: 2
```

:::

::: details （3）读取CPU和内存使用量

```go
```

输出结果

```bash

```

:::





