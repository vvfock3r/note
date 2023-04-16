# syscall

文档：[https://pkg.go.dev/syscall](https://pkg.go.dev/syscall)

<br />

## Linux API

说明：以下函数只能在Linux（类Unix）下调用

::: details （1）线程ID

```go
package main

import (
	"fmt"
	"syscall"
)

func main() {
	// 获取当前线程ID
	tid := syscall.Gettid()
	fmt.Printf("Thread ID: %d\n", tid)
}
```

输出结果

```bash
[root@localhost example]# go run .
Thread ID: 2299
```

:::

::: details （2）向PID发送信号

```go
package main

import (
	"os"
	"syscall"
)

func main() {
	// 给当前进程发送SIGTERM信号
	err := syscall.Kill(os.Getpid(), syscall.SIGTERM)
	if err != nil {
		panic(err)
	}
}
```

输出结果

```bash
[root@localhost example]# go run .
signal: terminated
```

:::