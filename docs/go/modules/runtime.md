# runtime

## 概念

runtime概念

runtime就是程序的运行环境，很多语言都有runtime，比如说Java的runtime（虚拟机），JavaScript的runtime（浏览器内核）

Go runtime是作为程序的一部分编译到二进制可执行文件中，runtime与用户程序并没有明显的界限

Go runtime提供的功能如下：

* 内存管理
* 垃圾回收（GC）
* 协程调度（GMP）
* ...

<br />

## 基础函数

::: details （1）系统、Go和个数统计信息

```go
package main

import (
	"fmt"
	"runtime"
)

func main() {
    // 系统信息 - 编译期间确定值
	fmt.Printf("%-20s %s\n", "GOOS:", runtime.GOOS)
	fmt.Printf("%-20s %s\n", "GOARCH:", runtime.GOARCH)
	fmt.Println()

	// Go信息 - 编译期间确定值
	fmt.Printf("%-20s %s\n", "GOROOT:", runtime.GOROOT())
	fmt.Printf("%-20s %s\n", "Version:", runtime.Version())
	fmt.Println()

	// 统计信息 - 运行时获取到值
	fmt.Printf("%-20s %d\n", "Num CPU Logical:", runtime.NumCPU()) // 逻辑CPU核心数
	fmt.Printf("%-20s %d\n", "Num Goroutine:", runtime.NumGoroutine())
	fmt.Printf("%-20s %d\n", "Num CgoCall:", runtime.NumCgoCall())
}
```

输出结果

```bash
# Linux输出结果
[root@ap-hongkang example]# go run .
GOOS:                linux
GOARCH:              amd64

GOROOT:              /usr/local/go/root
Version:             go1.20

Num CPU Logical:     2
Num Goroutine:       1
Num CgoCall:         0

# Windows输出结果
D:\application\GoLand\example> go run .
GOOS:                windows
GOARCH:              amd64             
                                       
GOROOT:              D:\software\go1.21
Version:             go1.20.1          
                                       
Num CPU Logical:     8
Num Goroutine:       1
Num CgoCall:         32
```

:::

<br />

## 指标数据

::: details （1）第三方库：数据可视化

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
D:\application\GoLand\example>go run .
* Running on http://127.0.0.1:80

# 浏览器访问
http://127.0.0.1/debug/statsviz/
```

![image-20230225131519895](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230225131519895.png)

:::

::: details （2）第三方库：命令行调试工具

Github：[https://github.com/google/gops](https://github.com/google/gops)

```bash

```

:::

::: details （3）GMP：查看当前个数

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
[root@ap-hongkang example]# go run .
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

::: details （4）GMP：修改最大限额

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
[root@ap-hongkang example]# go run .
                     Pid: 2001
Current Goroutine Number: 2001
Current Machine   Number: 1004
Current Processor Number: 2
```

:::

::: details （5）读取内存信息

```go
package main

import (
	"fmt"
	"runtime"
)

func PrintMemStats() {
	// 读取内存
	var m runtime.MemStats
	runtime.ReadMemStats(&m)

	// 堆内存统计信息
	fmt.Println("堆内存统计信息:")
	fmt.Printf("  分配的活动的堆内存字节: %d\n", m.HeapAlloc) // 等于 m.Alloc
	fmt.Printf("  分配的累计的堆内存字节: %d\n", m.TotalAlloc)
	fmt.Println()
	fmt.Printf("  活动的堆对象的累积计数: %d\n", m.HeapObjects) // 等于 m.Mallocs-m.Frees
	fmt.Printf("  释放的堆对象的累积计数: %d\n", m.Frees)
	fmt.Printf("  分配的堆对象的累积计数: %d\n", m.Mallocs)
	fmt.Println()

	fmt.Printf("  从操作系统申请的堆内存字节数:   %d\n", m.HeapSys)
	fmt.Printf("  返还给操作系统的物理内存字节数: %d\n", m.HeapReleased)
	fmt.Println()

	fmt.Printf("  正在使用的Span的字节数: %d\n", m.HeapInuse)
	fmt.Printf("  未被使用的Span的字节数: %d\n", m.HeapIdle)
	fmt.Println()

	// 栈内存统计信息
	fmt.Println("栈内存统计信息:")
	fmt.Printf("  栈Span使用的字节数: %d\n", m.StackInuse)
	fmt.Printf("  从操作系统取得的栈内存大小: %d\n", m.StackSys)
	fmt.Printf("  分配的mspan数据结构的字节数: %d\n", m.MSpanInuse)
	fmt.Printf("  从操作系统为mspan获取的内存字节数: %d\n", m.MSpanSys)
	fmt.Println()

	// 垃圾回收统计信息
	fmt.Println("垃圾回收统计信息:")
	fmt.Printf("  是否允许GC:   %t\n", m.EnableGC) // 永远为true,即使是设置了GOGC=off
	fmt.Printf("  完成GC的次数: %d\n", m.NumGC)
	fmt.Printf("  强制GC的次数: %d\n", m.NumForcedGC)
	fmt.Println()

	fmt.Printf("  下一次GC目标的堆大小: %d\n", m.NextGC)
	fmt.Printf("  上一次GC纳秒级时间戳: %d\n", m.LastGC)
	fmt.Println()

	fmt.Printf("  STW暂停的累积纳秒数: %d\n", m.PauseTotalNs)
	fmt.Printf("  GC占用的CPU可用时间: %f\n", m.GCCPUFraction)
	fmt.Println()

	fmt.Printf("  垃圾回收元数据使用的内存字节数: %d\n", m.GCSys)
	fmt.Println()
}

func main() {
	PrintMemStats()
}
```

输出结果

```bash
D:\application\GoLand\example>go run .
堆内存统计信息:
  分配的活动的堆内存字节: 128736
  分配的累计的堆内存字节: 128736

  活动的堆对象的累积计数: 206
  释放的堆对象的累积计数: 2
  分配的堆对象的累积计数: 208

  从操作系统申请的堆内存字节数:   4096000 
  返还给操作系统的物理内存字节数: 3612672 

  正在使用的Span的字节数: 483328
  未被使用的Span的字节数: 3612672

栈内存统计信息:
  栈Span使用的字节数: 98304
  从操作系统取得的栈内存大小: 98304       
  分配的mspan数据结构的字节数: 24160      
  从操作系统为mspan获取的内存字节数: 32640

垃圾回收统计信息:
  是否允许GC:   true
  完成GC的次数: 0
  强制GC的次数: 0

  下一次GC目标的堆大小: 4194304
  上一次GC纳秒级时间戳: 0

  STW暂停的累积纳秒数: 0
  GC占用的CPU可用时间: 0.000000

  垃圾回收元数据使用的内存字节数: 5787976
```

:::





