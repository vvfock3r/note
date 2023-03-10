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

::: details （1）第三方库：数据可视化：statsviz

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

::: details （2）第三方库：命令行工具：gops

Github：[https://github.com/google/gops](https://github.com/google/gops)

文档：[https://pkg.go.dev/github.com/google/gops](https://pkg.go.dev/github.com/google/gops)

**1、安装二进制命令**

```bash
# 安装
go install github.com/google/gops@latest

# 查看gops版本
# 无
```

**2、简单使用**

```bash
# 1、不带任何参数,会列出当前系统所有使用Go编译的程序
# PID   PPID    进程名称                  编译所用的Go版本 程序路径
[root@ap-hongkang ~]# gops
974     1       containerd               go1.18.7      /usr/bin/containerd
1297    1       dockerd                  go1.18.7      /usr/bin/dockerd
1853    1297    docker-proxy             go1.18.7      /usr/bin/docker-proxy
1878    1       containerd-shim-runc-v2  go1.18.7      /usr/bin/containerd-shim-runc-v2
27505   1       frps                     go1.18.9      /usr/local/frp_0.46.0_linux_amd64/frps
1966607 1297    docker-proxy             go1.18.7      /usr/bin/docker-proxy
1966595 1297    docker-proxy             go1.18.7      /usr/bin/docker-proxy
1966622 1       containerd-shim-runc-v2  go1.18.7      /usr/bin/containerd-shim-runc-v2
1970546 1894353 gops                     go1.20        /usr/local/go/path/bin/gops
675466  1       YDLive                   go1.14.4      /usr/local/qcloud/YunJing/YDLive/YDLive
1188091 675466  YDService                go1.14.4      /usr/local/qcloud/YunJing/YDEyes/YDService

# 2、gops <pid> [duration]
[root@ap-hongkang ~]# gops 1297
parent PID:     1
threads:        15
memory usage:   3.619%
cpu usage:      0.192%
username:       root
cmd+args:       /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
elapsed time:   98-07:18:55
local/remote:   :::2377 <-> :::0 (LISTEN)
local/remote:   :::7946 <-> :::0 (LISTEN)
local/remote:   :::7946 <-> :::0 (NONE)
local/remote:   /var/run/docker/metrics.sock:0 <-> :0 (NONE)
local/remote:   /var/run/docker/libnetwork/a975082efaa8.sock:0 <-> :0 (NONE)
local/remote:   /var/run/docker/swarm/control.sock:0 <-> :0 (NONE)
local/remote:   /var/run/docker.sock:0 <-> :0 (NONE)
local/remote:   @00008:0 <-> :0 (NONE)
local/remote:   :0 <-> :0 (NONE)
local/remote:   :0 <-> :0 (NONE)
```

**3、Agent**

文档中所有包含`(<pid>|<addr>)`这种格式的用法，都需要在程序内部启用gops agent

嵌入Agent

```go
package main

import (
	"log"
	"time"

	"github.com/google/gops/agent"
)

func main() {
	if err := agent.Listen(agent.Options{}); err != nil {
		log.Fatal(err)
	}
	time.Sleep(time.Hour)
}
```

使用

```bash
[root@ap-hongkang ~]# gops
974     1       containerd               go1.18.7 /usr/bin/containerd
1297    1       dockerd                  go1.18.7 /usr/bin/dockerd
1853    1297    docker-proxy             go1.18.7 /usr/bin/docker-proxy
1878    1       containerd-shim-runc-v2  go1.18.7 /usr/bin/containerd-shim-runc-v2
27505   1       frps                     go1.18.9 /usr/local/frp_0.46.0_linux_amd64/frps
675466  1       YDLive                   go1.14.4 /usr/local/qcloud/YunJing/YDLive/YDLive
1970915 1       containerd-shim-runc-v2  go1.18.7 /usr/bin/containerd-shim-runc-v2
1988455 1988064 gops                     go1.20   /usr/local/go/path/bin/gops
1988429 1894353 gops-agent-test        * go1.20   /root/example/gops-agent-test
1970886 1297    docker-proxy             go1.18.7 /usr/bin/docker-proxy
1970899 1297    docker-proxy             go1.18.7 /usr/bin/docker-proxy
1188091 675466  YDService                go1.14.4 /usr/local/qcloud/YunJing/YDEyes/YDService

[root@ap-hongkang ~]# gops stats 1988429
goroutines: 2
OS threads: 6
GOMAXPROCS: 2
num CPU: 2

[root@ap-hongkang ~]# gops memstats 1988429
alloc: 66.15KB (67736 bytes)
total-alloc: 134.02KB (137240 bytes)
sys: 11.19MB (11729936 bytes)
lookups: 0
mallocs: 247
frees: 54
heap-alloc: 66.15KB (67736 bytes)
heap-sys: 3.69MB (3866624 bytes)
heap-idle: 3.29MB (3448832 bytes)
heap-in-use: 408.00KB (417792 bytes)
heap-released: 3.12MB (3268608 bytes)
heap-objects: 193
stack-in-use: 320.00KB (327680 bytes)
stack-sys: 320.00KB (327680 bytes)
stack-mspan-inuse: 22.97KB (23520 bytes)
stack-mspan-sys: 31.88KB (32640 bytes)
stack-mcache-inuse: 2.34KB (2400 bytes)
stack-mcache-sys: 15.23KB (15600 bytes)
other-sys: 572.40KB (586142 bytes)
gc-sys: 6.58MB (6897728 bytes)
next-gc: when heap-alloc >= 4.00MB (4194304 bytes)
last-gc: 2023-03-10 18:05:43.563380153 +0800 CST
gc-pause-total: 44.583µs
gc-pause: 44583
gc-pause-end: 1678442743563380153
num-gc: 1
num-forced-gc: 1
gc-cpu-fraction: 9.052035116712755e-07
enable-gc: true
debug-gc: false
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





