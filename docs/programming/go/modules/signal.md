# signal

文档：[https://pkg.go.dev/os/signal](https://pkg.go.dev/os/signal)

## 接口和实现

接口源码：`os.Signal`

```go
type Signal interface {
	String() string
	Signal() // to distinguish from other Stringers
}
```

实现源码：`syscall.Signal`

::: details 点击查看详情

```go
type Signal int

func (s Signal) Signal() {}

func (s Signal) String() string {
	if 0 <= s && int(s) < len(signals) {
		str := signals[s]
		if str != "" {
			return str
		}
	}
	return "signal " + itoa.Itoa(int(s))
}

const (
	// More invented values for signals
	SIGHUP  = Signal(0x1)
	SIGINT  = Signal(0x2)
	SIGQUIT = Signal(0x3)
	SIGILL  = Signal(0x4)
	SIGTRAP = Signal(0x5)
	SIGABRT = Signal(0x6)
	SIGBUS  = Signal(0x7)
	SIGFPE  = Signal(0x8)
	SIGKILL = Signal(0x9)
	SIGSEGV = Signal(0xb)
	SIGPIPE = Signal(0xd)
	SIGALRM = Signal(0xe)
	SIGTERM = Signal(0xf)
)

var signals = [...]string{
	1:  "hangup",
	2:  "interrupt",
	3:  "quit",
	4:  "illegal instruction",
	5:  "trace/breakpoint trap",
	6:  "aborted",
	7:  "bus error",
	8:  "floating point exception",
	9:  "killed",
	10: "user defined signal 1",
	11: "segmentation fault",
	12: "user defined signal 2",
	13: "broken pipe",
	14: "alarm clock",
	15: "terminated",
}
```

:::

<br />

## 信号监听

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"
)

func main() {
	// 输出当前进程id
	fmt.Println("pid: ", os.Getpid())

	// 创建Channel，用于接收信号
	interrupt := make(chan os.Signal)

	// (1) Notify 用于将信号传递到Channel
	// (2) Notify 若没有提供具体的信号(syscall.SIGxx)，则意味着接收所有的信号
	signal.Notify(interrupt,
		syscall.SIGINT,  // kill -2 or Ctrl+C
		syscall.SIGQUIT, // kill -3 or Ctrl+\
		syscall.SIGTERM, // kill -15
	)

	// 监听信号
	for {
		select {
		case <-interrupt:
			log.Println("Received interrupt signal")
			os.Exit(0)
		}
	}
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
pid:  9308
2022/10/16 17:13:32 Received interrupt signal  # 按下Ctrl + C

# 其他说明：Windows下按下Ctrl+\并不起作用，而Linux下可以正常监听该信号
```

:::

<br />

## Channel缓冲区

`signal.Notify`向`Channel`传递信号的过程不会阻塞，若`Channel`没有足够的缓冲空间则信号将被丢弃

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	// 输出当前进程id
	fmt.Println("pid: ", os.Getpid())

	// 创建Channel，用于接收信号,第二个参数用于设置缓冲区，也可以不写，默认为0
	interrupt := make(chan os.Signal, 0)

	// (1) Notify 用于将信号传递到Channel
	// (2) Notify 若没有提供具体的信号(syscall.SIGxx)，则意味着接收所有的信号
	signal.Notify(interrupt,
		syscall.SIGINT,  // kill -2 or Ctrl+C
		syscall.SIGQUIT, // kill -3 or Ctrl+\
		syscall.SIGTERM, // kill -15
	)

	// 监听信号
	for {
		select {
		case <-interrupt:
			log.Println("Received interrupt signal")
			// 模拟程序处理信号
			time.Sleep(time.Second)
		}
	}
}
```

输出结果

```bash
# 快速按下3次 Ctrl + C,因为我们的缓冲区设置为0，所以在第一次处理信号结束之前，其他的两次信号将被丢弃，所以我们这里只能看到一条日志信息
D:\application\GoLand\demo>go run main.go
pid:  8812
2022/10/16 17:27:21 Received interrupt signal

# 将代码修改为缓冲区1，然后再快速按下3次 Ctrl + C
# 第一次接收信号后，Channel将被排空，所以将第二次的信号存储下来了，由于信号处理函数还没执行完，第三次的信号将被丢弃，所以输出了两条日志
D:\application\GoLand\demo>go run main.go
pid:  2500
2022/10/16 17:31:44 Received interrupt signal
2022/10/16 17:31:45 Received interrupt signal
```

:::

<br />

## 信号停止/重置和忽略

**信号停止**

```go
signal.Stop(interrupt)                         // 停止向Channel发送信号，也就是说信号会由系统自行处理
```

**信号重置**

```go
signal.Reset(syscall.SIGINT, syscall.SIGQUIT) // 重置指定信号，也就是说相当于我们没有监听SIGINT和SIGQUIT信号，由系统自行处理该信号
signal.Reset()                                // 重置所有信号，也就是说由系统处理所有的信号
```

**信号忽略**

```go
signal.Ignore(syscall.SIGINT, syscall.SIGQUIT) // 忽略SIGINT和SIGQUIT信号，即系统也不会帮我们处理该信号
signal.Ignored(syscall.SIGINT)                 // 检查是否忽略SIGINT信号，返回布尔值
```

**说明**

* 信号停止和信号重置，这两个函数实现的效果是一样的，除了接收的参数不一样外，有什么本质的区别吗？
* 如果信号已被忽略，那么再使用信号重置，并不会让系统重新处理该信号，也就是说信号重置会忽略已被忽略的信号

<br />

## NotifyContext

::: details 点击查看详情（代码有问题，问题在于Context可以读取多次，导致一直接收到某个信号）

```go
package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	// 输出当前进程id
	fmt.Println("pid: ", os.Getpid())

	// 信号和Context绑定
	// (1) ctx.Done会在收到信号后触发
	// (2) stop函数用于取消注册信号行为，就像信号重置一样
	ctx, stop := signal.NotifyContext(context.Background(),
		syscall.SIGINT,  // kill -2 or Ctrl+C
		syscall.SIGQUIT, // kill -3 or Ctrl+\
		syscall.SIGTERM, // kill -15
	)
	defer stop()

	// 监听信号
	for {
		select {
		case <-ctx.Done():
			log.Println("Received interrupt signal")
			time.Sleep(time.Second)
		}
	}
}
```

:::