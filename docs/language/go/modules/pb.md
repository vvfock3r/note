# pb

Github：[https://github.com/cheggaaa/pb](https://github.com/cheggaaa/pb)

文档：[https://pkg.go.dev/github.com/cheggaaa/pb/v3](https://pkg.go.dev/github.com/cheggaaa/pb/v3)

<br />

## 安装

```bash
go get github.com/cheggaaa/pb/v3
```

<br />

## 基础示例

::: details 点击查看详情

```go
package main

import (
	"time"

	"github.com/cheggaaa/pb/v3"
)

func main() {
	// 创建并启动
	// 1、360指的是总数量
	// 2、可以简写成 pb.StartNew(count)
	count := 360
	bar := pb.New(count).Start()

	// 进度 +1
	// 1、这里是线程安全的, 源码中使用了原子操作 atomic.AddInt64
	// 2、bar.Increment() 内部调用了 pb.Add64(1), 可根据实际情况添加指定进度
	for i := 0; i < count; i++ {
		bar.Increment()
		time.Sleep(time.Millisecond)
	}

	// 进度条完成, 根据实际情况可以写成 defer bar.Finish()
	bar.Finish()
}
```

输出结果

![20230821212746](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//20230821212746.gif)

:::

<br />

## 基础设置

比如设置宽度等，实际用到了再补充到这里，也比较简单

<br />

## 模板设置

PS：模板的可玩性很高

::: details （1）内置的模板

```go
package pb

var (
	// Full - preset with all default available elements
	// Example: 'Prefix 20/100 [-->______] 20% 1 p/s ETA 1m Suffix'
	Full ProgressBarTemplate = `{{with string . "prefix"}}{{.}} {{end}}{{counters . }} {{bar . }} {{percent . }} {{speed . }} {{rtime . "ETA %s"}}{{with string . "suffix"}} {{.}}{{end}}`

	// Default - preset like Full but without elapsed time
	// Example: 'Prefix 20/100 [-->______] 20% 1 p/s Suffix'
	Default ProgressBarTemplate = `{{with string . "prefix"}}{{.}} {{end}}{{counters . }} {{bar . }} {{percent . }} {{speed . }}{{with string . "suffix"}} {{.}}{{end}}`

	// Simple - preset without speed and any timers. Only counters, bar and percents
	// Example: 'Prefix 20/100 [-->______] 20% Suffix'
	Simple ProgressBarTemplate = `{{with string . "prefix"}}{{.}} {{end}}{{counters . }} {{bar . }} {{percent . }}{{with string . "suffix"}} {{.}}{{end}}`
)
```

使用方法

```go
	count := 360
	bar := pb.Full.Start(count)
```

:::

::: details （2）最精简的模板

```go
package main

import (
	"time"

	"github.com/cheggaaa/pb/v3"
)

func main() {
	// 自定义模板
	count := 360
	//tpl := `{{ counters . }}` // 只想要数字的情况下
	//tpl := `{{ bar . }}` // 只想要进度条的情况下
	tpl := `{{ percent . }}` // 只想要百分比的情况下
	bar := pb.New(count).SetTemplateString(tpl).Start()

	// 进度 +1
	for i := 0; i < count; i++ {
		bar.Increment()
		time.Sleep(time.Millisecond)
	}

	// 进度条完成, 根据实际情况可以写成 defer bar.Finish()
	bar.Finish()
}
```

输出结果

![20230821215336.png](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//20230821215336.png.gif)

:::

::: details （3）自定义简单样式

```go
// 源码: pb/v3/element.go

// 默认的关键字如下
var elements = map[string]Element{
	"percent":  ElementPercent,
	"counters": ElementCounters,
	"bar":      adaptiveWrap(ElementBar),
	"speed":    ElementSpeed,
	"rtime":    ElementRemainingTime,
	"etime":    ElementElapsedTime,
	"string":   ElementString,
	"cycle":    ElementCycle,
}

// 默认的样式定义如下
var (
	defaultBarEls = [5]string{"[", "-", ">", "_", "]"}
)
```

简单优化一下

```go
package main

import (
	"time"

	"github.com/cheggaaa/pb/v3"
)

func main() {
	// 自定义模板
	count := 360
	tpl := `{{ bar . "[" "#" "#" " " "]" }} {{ percent . }} {{ etime . "ETA %s" }}`
	bar := pb.New(count).SetTemplateString(tpl).Start()

	// 进度 +1
	for i := 0; i < count; i++ {
		bar.Increment()
		time.Sleep(time.Millisecond)
	}

	// 进度条完成, 根据实际情况可以写成 defer bar.Finish()
	bar.Finish()
}
```

输出结果

![20230821221000](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//20230821221000.gif)

:::

::: details （4）添加颜色支持

```go
package main

import (
	"time"

	"github.com/cheggaaa/pb/v3"
)

func main() {
	// 添加颜色, 颜色所使用的库可以在go.mod中找到, 由 github.com/fatih/color 提供解析
	count := 360
	tpl := `{{ bar . "[" "#" "#" " " "]" | cyan }} {{ percent . | yellow }} {{ etime . "ETA %s" | red }}`
	bar := pb.New(count).SetTemplateString(tpl).Start()

	// 进度 +1
	for i := 0; i < count; i++ {
		bar.Increment()
		time.Sleep(time.Millisecond)
	}

	// 进度条完成, 根据实际情况可以写成 defer bar.Finish()
	bar.Finish()
}
```

输出结果

![20230821221919](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//20230821221919.gif)

:::