# automaxprocs

Github：[https://github.com/uber-go/automaxprocs](https://github.com/uber-go/automaxprocs)

文档：[https://pkg.go.dev/go.uber.org/automaxprocs](https://pkg.go.dev/go.uber.org/automaxprocs)

<br />

## 安装

```bash
D:\application\GoLand\example>go get -u go.uber.org/automaxprocs
go: added go.uber.org/automaxprocs v1.5.1
```

<br />

## 复现问题

说明：

1、启动容器时通常我们会设置最大可用的CPU核心数，比如 1核

2、容器内的Go应用是无法感知到我们设置的CPU限制，依旧使用的是默认的CPU核心数（等于主机核心数），比如2核

3、原因在于容器并不会隔离 `/proc/` 目录，而Go应用会从`/proc/cpuinfo` 中读取CPU核心数，从而读取到一个不合理的值

::: details （1）编写Go代码：main.go

```go
package main

import (
	"fmt"
	"runtime"
	"time"
)

func main() {
	// 获取CPU核心数
	fmt.Printf("cpu core: %d\n", runtime.NumCPU())

	// 获取GOMAXPROCS
	fmt.Printf("maxprocs: %d\n", runtime.GOMAXPROCS(0))

	time.Sleep(time.Hour)
}
```

:::

::: details （2）编写Dockerfile：Dockerfile

```dockerfile
# 用于程序编译
FROM golang:1.20.1 as builder
WORKDIR /build
COPY . .
RUN go build -o main main.go

# 用于程序运行
FROM alpine:3.17.2
MAINTAINER VVFock3r
WORKDIR /
COPY --from=builder /build/main .
ENTRYPOINT ["./main"]
```

:::

::: details （3）构建镜像并运行

```bash
# 构建镜像
[root@ap-hongkang example]# docker image build -t maxprocs:v1 .

# 运行容器, 可以看到虽然我们设置了容器最多使用1个逻辑CPU，但是对于容器内的Go进程来说，它可以使用2个CPU核心
# 很多情况下这并不是一个合理的值，对于高并发应用来说可能会引起系统卡顿
[root@ap-hongkang example]# docker container run --rm --cpus=1 maxprocs:v1
cpu core: 2
maxprocs: 2
```

:::

<br />

## 解决问题

::: details （1）根据容器限制自动调整GOMAXPROCS

```go
package main

import (
	"fmt"
	"runtime"
	"time"

	_ "go.uber.org/automaxprocs"
)

func main() {
	// 获取CPU核心数
	fmt.Printf("cpu core: %d\n", runtime.NumCPU())

	// 获取GOMAXPROCS
	fmt.Printf("maxprocs: %d\n", runtime.GOMAXPROCS(0))

	time.Sleep(time.Hour)
}
```

:::

::: details （2）构建镜像并运行

```bash
# 构建镜像
[root@ap-hongkang example]# docker image build -t maxprocs:v2 .

# 运行容器, 可以看到GOMAXPROCS已经调整到1了
[root@ap-hongkang example]# docker container run --rm --cpus=1 maxprocs:v2
cpu core: 2
maxprocs: 1
2023/02/27 05:12:53 maxprocs: Updating GOMAXPROCS=1: determined from CPU quota

# 如果我们限制容器为0.1核CPU，那么会设置为1
[root@ap-hongkang example]# docker container run --rm --cpus=0.1 maxprocs:v2
2023/02/27 05:13:58 maxprocs: Updating GOMAXPROCS=1: using minimum allowed GOMAXPROCS
cpu core: 2
maxprocs: 1

# 如果我们限制容器为1.9核CPU，那么也会设置为1
[root@ap-hongkang example]# docker container run --rm --cpus=1.9 maxprocs:v2
cpu core: 2
maxprocs: 1
2023/02/27 05:15:05 maxprocs: Updating GOMAXPROCS=1: determined from CPU quota
```

:::

<br />

## 修改日志

::: details 修改日志输出格式，与其他日志模块集成

```go
package main

import (
	"fmt"
	"runtime"
	"time"

	"go.uber.org/automaxprocs/maxprocs"
	"go.uber.org/zap"
)

func main() {
	// 初始化Logger
	logger, _ := zap.NewProduction()

	// 自动调整 runtime.GOMAXPROCS
	maxprocsLogFunc := func(format string, v ...any) {
		logger.Warn(fmt.Sprintf(format, v))
	}
	_, _ = maxprocs.Set(maxprocs.Logger(maxprocsLogFunc))

	// 获取CPU核心数
	fmt.Printf("cpu core: %d\n", runtime.NumCPU())

	// 获取GOMAXPROCS
	fmt.Printf("maxprocs: %d\n", runtime.GOMAXPROCS(0))

	time.Sleep(time.Hour)
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
{"level":"warn","ts":1677480181.0991318,"caller":"example/main.go:18","msg":"maxprocs: Leaving GOMAXPROCS=[8]: CPU quota undefined"}
cpu core: 8
maxprocs: 8
```

:::

<br />

## 原理分析

**基本原理是啥？**

uber出品的automaxprocs库可以识别对容器的CPU限制，然后自动设置 `GOMAXPROCS`

<br />

**如何获取CPU限制值？**

通过读取容器内的Cgroup值计算出我们所设置的CPU是多少，然后调整 `GOMAXPROCS`，示例如下

```bash
# 进入容器
[root@ap-hongkang ~]# docker exec -it naughty_hoover sh

# 进入Cgroup目录
/ # cd /sys/fs/cgroup/cpu

# 计算配额，190000 / 100000 = 1.9核，就是我们限制的CPU核心数
/sys/fs/cgroup/cpu,cpuacct # cat cpu.cfs_period_us
100000
/sys/fs/cgroup/cpu,cpuacct # cat cpu.cfs_quota_us
190000
```

<br />

**注意事项**

```bash
# 1、关于Cgroup版本
# Cgroup有两个版本，以上所有的操作都是在CentOS7中，属于Cgroup V1版本，automaxprocs同样支持Cgroup v2

# 2、如何查看Cgroup版本
[root@ap-hongkang ~]# stat -fc %T /sys/fs/cgroup/ # 输出tmpfs则为Cgroup v1
tmpfs

[root@localhost ~]# stat -fc %T /sys/fs/cgroup/ # 输出cgroup2fs则为Cgroup v2
cgroup2fs
```



