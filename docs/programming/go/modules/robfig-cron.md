# Cron

Github：[https://github.com/robfig/cron](https://github.com/robfig/cron)

文档：[https://pkg.go.dev/github.com/robfig/cron/v3](https://pkg.go.dev/github.com/robfig/cron/v3)

## 安装

```bash
go get github.com/robfig/cron/v3
```

<br />

## 基础

### 基础示例

::: details 点击查看详情

```go
package main

import (
	"github.com/robfig/cron/v3"
	"log"
	"time"
)

func main() {
	// 实例化Cron
	crontab := cron.New()

	// 添加一个计划任务，每分钟执行一次, 第一个参数spec代表<分 时 日 月 周>
	id, err := crontab.AddFunc("* * * * *", func() {
		log.Println("Every Minute")
	})
	if err != nil {
		panic(err)
	}
	log.Printf("Add crontab job success: %d\n", id)

	// 启动计划任务
	crontab.Run()
}
```

扩展

```go
// 启动计划任务的两种方法
// 1.Run()   会在当前协程中启动，也就是说会阻塞代码向下执行
// 2.Start() 会在新的协程中启动，也就是说不会阻塞代码向下执行
crontab.Start()

// 停止计划任务
crontab.Stop()

// 删除一个计划任务
crontab.Remove(id)

// 查看某个计划任务
entry := crontab.Entry(id)
if entry.ID == 0 {
	log.Printf("Entry not found: id=%d\n", id)
}

// 查看所有的计划任务
entries := crontab.Entries()
for _, entry := range entries {
	fmt.Println(entry.ID)
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
2022/12/28 16:49:22 Add crontab job success: 1
2022/12/28 16:50:00 Every Minute
2022/12/28 16:51:00 Every Minute
2022/12/28 16:52:00 Every Minute
2022/12/28 16:53:00 Every Minute
2022/12/28 16:54:00 Every Minute

# 分析
# 经过多次测试，发现会从下个分钟整秒开始执行
```

:::

<br />

### 秒级任务

::: details 点击查看详情

```go
package main

import (
	"github.com/robfig/cron/v3"
	"log"
)

func main() {
	// 实例化Cron,添加可选项: cron.WithSeconds()
	crontab := cron.New(cron.WithSeconds())

	// 每5秒执行一次, 这里的字段会变成6个，第一个字段代表秒，其他字段保持不变
	id, err := crontab.AddFunc("*/5 * * * * *", func() {
		log.Println("Every 5 Second")
	})
	if err != nil {
		panic(err)
	}
	log.Printf("Add crontab job success: %d\n", id)

	// 启动计划任务
	crontab.Run()
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
2022/12/28 17:05:41 Add crontab job success: 1
2022/12/28 17:05:45 Every 5 Second
2022/12/28 17:05:50 Every 5 Second
2022/12/28 17:05:55 Every 5 Second
2022/12/28 17:06:00 Every 5 Second
2022/12/28 17:06:05 Every 5 Second
2022/12/28 17:06:10 Every 5 Second

# 分析
# 经过多次测试，发现会从下个整除5的秒数开始
```

:::

<br />

### 设置时区

::: details （1）设置时区：仅对单个任务生效

```go
package main

import (
	"fmt"
	"github.com/robfig/cron/v3"
	"log"
	"time"
	_ "time/tzdata"
)

func main() {
	// 实例化Cron,添加可选项: cron.WithSeconds()
	crontab := cron.New(cron.WithSeconds())

	// 每5秒执行一次, 这里的字段会变成6个，第一个字段代表秒，其他字段保持不变
	spec := fmt.Sprintf("CRON_TZ=Asia/Tokyo */5 * %d * * *", time.Now().Hour()+1) // 小时+1
	id, err := crontab.AddFunc(spec, func() {
		log.Println("Every 5 Second")
	})
	if err != nil {
		panic(err)
	}
	log.Printf("Add crontab job success: %d\n", id)

	// 启动计划任务
	crontab.Run()
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
2022/12/29 17:25:55 Add crontab job success: 1
2022/12/29 17:26:00 Every 5 Second
2022/12/29 17:26:05 Every 5 Second
2022/12/29 17:26:10 Every 5 Second
```

:::

::: details （2）设置时区：对所有任务生效

```go
package main

import (
	"fmt"
	"github.com/robfig/cron/v3"
	"log"
	"time"
	_ "time/tzdata"
)

func main() {
	// 读取日本东京时区（UTC+9）
	tokyo, err := time.LoadLocation("Asia/Tokyo")
	if err != nil {
		panic(err)
	}

	// 实例化Cron,添加可选项: cron.WithSeconds()
	crontab := cron.New(cron.WithSeconds(), cron.WithLocation(tokyo))

	// 每5秒执行一次, 这里的字段会变成6个，第一个字段代表秒，其他字段保持不变
	spec := fmt.Sprintf("*/5 * %d * * *", time.Now().Hour()+1) // 小时+1
	id, err := crontab.AddFunc(spec, func() {
		log.Println("Every 5 Second")
	})
	if err != nil {
		panic(err)
	}
	log.Printf("Add crontab job success: %d\n", id)

	// 启动计划任务
	crontab.Run()
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
2022/12/30 09:13:48 Add crontab job success: 1
2022/12/30 09:13:50 Every 5 Second
2022/12/30 09:13:55 Every 5 Second
2022/12/30 09:14:00 Every 5 Second
```

:::

<br />

### Job接口

::: details （1）源码

```go
// AddFunc 会将我们的函数进行类型转换，然后调用 AddJob
func (c *Cron) AddFunc(spec string, cmd func()) (EntryID, error) {
	return c.AddJob(spec, FuncJob(cmd))
}

// Job接口需要实现一个Run方法
type Job interface {
	Run()
}

// 如何转换呢
// 自定义了一个FuncJob类型，然后它在Run方法中调用我们原始的函数
type FuncJob func()

func (f FuncJob) Run() { f() }
```

:::

::: details （2）自定义Job接口

```go
package main

import (
	"github.com/robfig/cron/v3"
	"log"
)

type MyCronJob struct {}

func (j *MyCronJob) Run() {
	log.Println("MyCronJob Run")
}

func main() {
	// 实例化Cron,添加可选项: cron.WithSeconds()
	crontab := cron.New(cron.WithSeconds())

	// 方式一
	id, err := crontab.AddJob("*/5 * * * * *", &MyCronJob{})
	if err != nil {
		panic(err)
	}
	log.Printf("Add crontab job success: %d\n", id)

	// 方式二
	id, err = crontab.AddJob("*/5 * * * * *", cron.FuncJob(func() {
		log.Println("FuncJob Run")
	}))
	log.Printf("Add crontab job success: %d\n", id)

	// 启动计划任务
	crontab.Run()
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
2022/12/29 17:35:52 Add crontab job success: 1
2022/12/29 17:35:52 Add crontab job success: 2
2022/12/29 17:35:55 FuncJob Run
2022/12/29 17:35:55 MyJob Run
2022/12/29 17:36:00 FuncJob Run
2022/12/29 17:36:00 MyJob Run
```

:::

<br />

### Schedule接口

::: details （1）源码

```go
// spec会被解析为schedule, 然后调用 Schedule 方法
func (c *Cron) AddJob(spec string, cmd Job) (EntryID, error) {
	schedule, err := c.parser.Parse(spec)
	if err != nil {
		return 0, err
	}
	return c.Schedule(schedule, cmd), nil
}

// Schedule 方法
func (c *Cron) Schedule(schedule Schedule, cmd Job) EntryID {
	c.runningMu.Lock()
	defer c.runningMu.Unlock()
	c.nextID++
	entry := &Entry{
		ID:         c.nextID,
		Schedule:   schedule,
		WrappedJob: c.chain.Then(cmd),
		Job:        cmd,
	}
	if !c.running {
		c.entries = append(c.entries, entry)
	} else {
		c.add <- entry
	}
	return entry.ID
}

// Schedule 接口
type Schedule interface {
	// Next returns the next activation time, later than the given time.
	// Next is invoked initially, and then each time the job is run.
	Next(time.Time) time.Time
}
```

:::

::: details （2）自定义Schedule接口

```go
package main

import (
	"github.com/robfig/cron/v3"
	"log"
	"time"
)

// MyCron
type MyCron struct {
	Interval time.Duration
}

// 实现 Schedule 接口, Next返回下一次调度的时间
func (c *MyCron) Next(time.Time) time.Time {
	return time.Now().Add(c.Interval)
}

// 实现 Job 接口
func (c *MyCron) Run() {
	log.Printf("Every %.0f Seconds\n", c.Interval.Seconds())
}

func main() {
	// 实例化Cron,添加可选项: cron.WithSeconds()
	crontab := cron.New(cron.WithSeconds())

	// 每5秒执行一次, 这里的字段会变成6个，第一个字段代表秒，其他字段保持不变
	myCron := MyCron{Interval: time.Second * 2}
	id := crontab.Schedule(&myCron, &myCron)
	log.Printf("Add crontab job success: %d\n", id)

	// 启动计划任务
	crontab.Run()
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
2022/12/29 17:48:55 Add crontab job success: 1
2022/12/29 17:48:57 Every 2 Seconds
2022/12/29 17:48:59 Every 2 Seconds
2022/12/29 17:49:01 Every 2 Seconds
2022/12/29 17:49:03 Every 2 Seconds
```

:::

<br />

### 实现一次性任务

`cron`默认不支持一次性任务，所以需要自己来封装

::: details 点击查看详情

```go
package main

import (
	"github.com/robfig/cron/v3"
	"log"
	"time"
)

// MyCronSpec
type MyCronSpec struct {
	At        time.Time
	Scheduled bool
}

// 实现 Schedule 接口, Next返回下一次调度的时间
func (s *MyCronSpec) Next(time.Time) time.Time {
	if s.Scheduled {
		return time.Time{} // 零值不会进行调度
	}
	s.Scheduled = true
	return s.At
}

// MyCronJob
type MyCronJob struct{}

// 实现 Job 接口
func (j *MyCronJob) Run() {
	log.Printf("Run at %s\n", time.Now().Format("2006-01-02 15:04:05"))
}

func main() {
	// 实例化Cron,添加可选项: cron.WithSeconds()
	crontab := cron.New(cron.WithSeconds())

	// 每5秒执行一次, 这里的字段会变成6个，第一个字段代表秒，其他字段保持不变
	id := crontab.Schedule(
		&MyCronSpec{At: time.Now().Add(time.Second * 5)},
		&MyCronJob{},
	)
	log.Printf("Add crontab job success: %d\n", id)

	// 删除零值的任务
	go func() {
		for {
			zeroEntries := []cron.Entry{}
			for _, entry := range crontab.Entries() {
				if entry.Next.IsZero() {
					zeroEntries = append(zeroEntries, entry)
				}
			}
			for _, entry := range zeroEntries {
				crontab.Remove(entry.ID)
			}
			time.Sleep(time.Second)
		}
	}()

	// 启动计划任务
	crontab.Run()
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
2022/12/29 18:59:07 Add crontab job success: 1
2022/12/29 18:59:12 Run at 2022-12-29 18:59:12
```

:::

<br />

## 深入

### 任务装饰器

::: details （1）任务装饰器：仅对单个任务生效

```go
package main

import (
	"fmt"
	"github.com/robfig/cron/v3"
	"log"
	"math/rand"
	"time"
)

func CronTimerWrapper() cron.JobWrapper {
	return func(job cron.Job) cron.Job {
		return cron.FuncJob(func() {
			start := time.Now()
			job.Run()
			log.Printf("Used %.2f seconds\n", time.Since(start).Seconds())
		})
	}
}

func main() {
	// 初始化随机数种子
	rand.Seed(time.Now().UnixNano())

	// 实例化Cron,添加可选项: cron.WithSeconds()
	crontab := cron.New(cron.WithSeconds())

	// 每2秒执行一次
	id, err := crontab.AddJob(
		"*/5 * * * * *",
		cron.NewChain(CronTimerWrapper()).Then(cron.FuncJob(func() {
			fmt.Println()
			log.Printf("Job start")
			time.Sleep(time.Millisecond * time.Duration(1000+rand.Intn(4000)))
			log.Println("Job end")
		})),
	)
	if err != nil {
		panic(err)
	}
	log.Printf("Add crontab job success: %d\n", id)

	// 启动计划任务
	crontab.Run()
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
2022/12/29 20:40:50 Add crontab job success: 1

2022/12/29 20:40:55 Job start
2022/12/29 20:40:56 Job end
2022/12/29 20:40:56 Used 1.44 seconds

2022/12/29 20:41:00 Job start
2022/12/29 20:41:03 Job end
2022/12/29 20:41:03 Used 3.05 seconds

2022/12/29 20:41:05 Job start
2022/12/29 20:41:07 Job end
2022/12/29 20:41:07 Used 2.00 seconds
```

分析

```go
// NewChain(m1, m2, m3).Then(job) 等于 m1(m2(m3(job)))
```

:::

::: details （2）任务装饰器：对所有任务生效

```go
package main

import (
	"fmt"
	"github.com/robfig/cron/v3"
	"log"
	"math/rand"
	"time"
)

func CronTimerWrapper() cron.JobWrapper {
	return func(job cron.Job) cron.Job {
		return cron.FuncJob(func() {
			start := time.Now()
			job.Run()
			log.Printf("Used %.2f seconds\n", time.Since(start).Seconds())
		})
	}
}

func main() {
	// 初始化随机数种子
	rand.Seed(time.Now().UnixNano())

	// 实例化Cron,添加可选项: cron.WithSeconds()
	crontab := cron.New(cron.WithSeconds(), cron.WithChain(CronTimerWrapper()))

	// 每2秒执行一次
	id, err := crontab.AddJob("*/5 * * * * *", cron.FuncJob(func() {
		fmt.Println()
		log.Printf("Job start")
		time.Sleep(time.Millisecond * time.Duration(1000+rand.Intn(4000)))
		log.Println("Job end")
	}))
	if err != nil {
		panic(err)
	}
	log.Printf("Add crontab job success: %d\n", id)

	// 启动计划任务
	crontab.Run()
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
2022/12/30 08:56:17 Add crontab job success: 1

2022/12/30 08:56:20 Job start
2022/12/30 08:56:24 Job end
2022/12/30 08:56:24 Used 4.53 seconds

2022/12/30 08:56:25 Job start
2022/12/30 08:56:27 Job end
2022/12/30 08:56:27 Used 2.82 seconds

2022/12/30 08:56:30 Job start
2022/12/30 08:56:33 Job end
2022/12/30 08:56:33 Used 3.96 seconds
```

:::

<br />

### 执行时长过长

::: details （1）每2秒执行一次任务，但是任务需要5秒才能执行完成

```go
package main

import (
	"github.com/robfig/cron/v3"
	"log"
	"time"
)

func main() {
	// 实例化Cron,添加可选项: cron.WithSeconds()
	crontab := cron.New(cron.WithSeconds())

	// 每2秒执行一次
	id, err := crontab.AddFunc("*/2 * * * * *", func() {
		log.Println("Start")
		time.Sleep(time.Second * 5)
	})
	if err != nil {
		panic(err)
	}
	log.Printf("Add crontab job success: %d\n", id)

	// 启动计划任务
	crontab.Run()
}
```

输出结果

```bash
# 可以看到，cron只管调度，不会管我们任务有没有完成
D:\application\GoLand\example>go run main.go
2022/12/29 19:27:51 Add crontab job success: 1
2022/12/29 19:27:52 Start
2022/12/29 19:27:54 Start
2022/12/29 19:27:56 Start
2022/12/29 19:27:58 Start
2022/12/29 19:28:00 Start
2022/12/29 19:28:02 Start
```

:::

::: details （2）当上一个任务执行完再执行下一个任务，特点：不会丢任务，但可能会堆积任务

```go
package main

import (
	"github.com/robfig/cron/v3"
	"log"
	"time"
)

func main() {
	// 实例化Cron,添加可选项: cron.WithSeconds()
	crontab := cron.New(cron.WithSeconds())

	// 每2秒执行一次
	id, err := crontab.AddJob(
		"*/2 * * * * *",
		cron.NewChain(cron.DelayIfStillRunning(cron.DefaultLogger)).Then(cron.FuncJob(func() {
			log.Println("Start")
			time.Sleep(time.Second * 5)
		})),
	)
	if err != nil {
		panic(err)
	}
	log.Printf("Add crontab job success: %d\n", id)

	// 启动计划任务
	crontab.Run()
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
2022/12/29 20:10:51 Add crontab job success: 1
2022/12/29 20:10:52 Start
2022/12/29 20:10:57 Start
2022/12/29 20:11:02 Start
2022/12/29 20:11:07 Start
2022/12/29 20:11:12 Start
2022/12/29 20:11:17 Start
2022/12/29 20:11:22 Start
```

:::

::: details （3）当上一个任务未执行完前不再进行调度，上一个任务执行完后再继续调度，特点：不会堆积任务，但可能会丢任务

```go
package main

import (
	"github.com/robfig/cron/v3"
	"log"
	"time"
)

func main() {
	// 实例化Cron,添加可选项: cron.WithSeconds()
	crontab := cron.New(cron.WithSeconds())

	// 每2秒执行一次
	id, err := crontab.AddJob(
		"*/2 * * * * *",
		cron.NewChain(cron.SkipIfStillRunning(cron.DefaultLogger)).Then(cron.FuncJob(func() {
			log.Println("Start")
			time.Sleep(time.Second * 5)
		})),
	)
	if err != nil {
		panic(err)
	}
	log.Printf("Add crontab job success: %d\n", id)

	// 启动计划任务
	crontab.Run()
}
```

输出结果

```bash
# 可以看到这里间隔了6秒，那是因为中间的任务跳过了，等下一次任务的时候要和2秒对齐
D:\application\GoLand\example>go run main.go
2022/12/29 20:10:04 Add crontab job success: 1
2022/12/29 20:10:06 Start
2022/12/29 20:10:12 Start
2022/12/29 20:10:18 Start
2022/12/29 20:10:24 Start
2022/12/29 20:10:30 Start
2022/12/29 20:10:36 Start
```

:::

<br />

### 执行时 panic

::: details （1）若任务panic的话，将退出进程

```go
package main

import (
	"fmt"
	"github.com/robfig/cron/v3"
	"log"
)

func main() {
	// 实例化Cron,添加可选项: cron.WithSeconds()
	crontab := cron.New(cron.WithSeconds())

	// 每5秒执行一次
	id, err := crontab.AddFunc("*/5 * * * * *", func() {
		log.Println("Start")
		panic(fmt.Errorf("timeout"))
	})
	if err != nil {
		panic(err)
	}
	log.Printf("Add crontab job success: %d\n", id)

	// 启动计划任务
	crontab.Run()
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
2022/12/30 08:52:50 Add crontab job success: 1
2022/12/30 08:52:55 Start
panic: timeout

goroutine 18 [running]:
main.main.func1()
        D:/application/GoLand/example/main.go:16 +0x6e
github.com/robfig/cron/v3.FuncJob.Run(0x0?)
        D:/application/GoPath/pkg/mod/github.com/robfig/cron/v3@v3.0.1/cron.go:136 +0x1a
github.com/robfig/cron/v3.(*Cron).startJob.func1()
        D:/application/GoPath/pkg/mod/github.com/robfig/cron/v3@v3.0.1/cron.go:312 +0x6a
created by github.com/robfig/cron/v3.(*Cron).startJob
        D:/application/GoPath/pkg/mod/github.com/robfig/cron/v3@v3.0.1/cron.go:310 +0xad
exit status 2
```

:::

::: details （2）捕获所有任务的 panic

```go
package main

import (
	"fmt"
	"github.com/robfig/cron/v3"
	"log"
)

func main() {
	// 实例化Cron,添加可选项: cron.WithSeconds()
	crontab := cron.New(cron.WithSeconds(), cron.WithChain(cron.Recover(cron.DefaultLogger)))

	// 每5秒执行一次
	id, err := crontab.AddFunc("*/5 * * * * *", func() {
		log.Println("Start")
		panic(fmt.Errorf("timeout"))
	})
	if err != nil {
		panic(err)
	}
	log.Printf("Add crontab job success: %d\n", id)

	// 启动计划任务
	crontab.Run()
}
```

输出结果

```bash
# 程序并不会退出
D:\application\GoLand\example>go run main.go
2022/12/30 09:06:08 Add crontab job success: 1
2022/12/30 09:06:10 Start
cron: 2022/12/30 09:06:10 panic, error=timeout, stack=...
goroutine 5 [running]:
github.com/robfig/cron/v3.Recover.func1.1.1()
        D:/application/GoPath/pkg/mod/github.com/robfig/cron/v3@v3.0.1/chain.go:45 +0x85
panic({0x6dc4c0, 0xc000050030})
        C:/Users/Administrator/sdk/go1.19.2/src/runtime/panic.go:884 +0x212
main.main.func1()
        D:/application/GoLand/example/main.go:16 +0x6e
github.com/robfig/cron/v3.FuncJob.Run(0x0?)
        D:/application/GoPath/pkg/mod/github.com/robfig/cron/v3@v3.0.1/cron.go:136 +0x1a
github.com/robfig/cron/v3.Recover.func1.1()
        D:/application/GoPath/pkg/mod/github.com/robfig/cron/v3@v3.0.1/chain.go:53 +0x73
github.com/robfig/cron/v3.FuncJob.Run(0x0?)
        D:/application/GoPath/pkg/mod/github.com/robfig/cron/v3@v3.0.1/cron.go:136 +0x1a
github.com/robfig/cron/v3.(*Cron).startJob.func1()
        D:/application/GoPath/pkg/mod/github.com/robfig/cron/v3@v3.0.1/cron.go:312 +0x6a
created by github.com/robfig/cron/v3.(*Cron).startJob
        D:/application/GoPath/pkg/mod/github.com/robfig/cron/v3@v3.0.1/cron.go:310 +0xad
```

:::