# color

Github：[https://github.com/fatih/color](https://github.com/fatih/color)

## 安装

```bash
go get github.com/fatih/color
```

<br />

## 基础示例

::: details （1）基础示例

```go
package main

import (
	"fmt"
	"github.com/fatih/color"
)

func main() {
	// 基础示例
	color.Blue("Hello World!")
	color.Red("Hello World!")
	color.Green("Hello World!")

	// 第一个参数实际是format，所以我们可以使用像%s这样的占位符
	color.Cyan("Hello %s!", "World")

	// xxString可以返回带颜色的字符串，但是并不打印,看一下具体是啥字符串
	fmt.Printf("%#v\n", color.YellowString("Hello World!"))
}
```

![image-20230121140355239](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230121140355239.png)

:::

::: details （2）查看一下源码

```go
// 内部调用了colorPrint
func colorPrint(format string, p Attribute, a ...interface{}) {
    // 从缓存中获取或创建一个*Color对象
	c := getCachedColor(p)

    // 添加换行符
	if !strings.HasSuffix(format, "\n") {
		format += "\n"
	}

    // 调用*Color.Print系列函数输出
	if len(a) == 0 {
		c.Print(format)
	} else {
		c.Printf(format, a...)
	}
}

// 创建*Color对象对象
func getCachedColor(p Attribute) *Color {
	colorsCacheMu.Lock()
	defer colorsCacheMu.Unlock()

	c, ok := colorsCache[p]
	if !ok {
		c = New(p)
		colorsCache[p] = c
	}

	return c
}

// Print函数
func (c *Color) Print(a ...interface{}) (n int, err error) {
	c.Set()
	defer c.unset()

	return fmt.Fprint(Output, a...)
}

// Set函数：写入ANSI颜色前缀字符，用于设置颜色，比如 \x1b[33m
func (c *Color) Set() *Color {
	if c.isNoColorSet() {
		return c
	}

	fmt.Fprintf(Output, c.format())
	return c
}

// unset函数：写入ANSI颜色后缀字符，用于取消颜色，比如 \x1b[0m
func (c *Color) unset() {
	if c.isNoColorSet() {
		return
	}

	Unset()
}
func Unset() {
	if NoColor {
		return
	}

	fmt.Fprintf(Output, "%s[%dm", escape, Reset)
}
```

:::

::: details （3）自定义Color对象

```go
package main

import (
	"fmt"
	"github.com/fatih/color"
)

func main() {
	// 根据源码可以这样写
	blue := color.New(color.FgBlue)
	blue.Println("Hello World!")

	// 也可以先实例化后添加颜色属性
	c := color.New()
	c.Add(color.FgRed)
	c.Println("Hello World!")

	// 也可以写成这样
	fmt.Fprintf(color.Output, color.GreenString("Hello World!"))
}
```

![image-20230121140450764](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230121140450764.png)

:::

::: details （4）对Windows CMD的支持

```go
package main

import (
	"fmt"
	"github.com/fatih/color"
)

func main() {
	// 不支持Windows CMD
	fmt.Printf("%s\n", color.GreenString("Hello World!"))

	// 支持Windows CMD
	fmt.Fprintf(color.Output, color.GreenString("Hello World!"))
}
```

![image-20230121140612588](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230121140612588.png)

:::

::: details （5）设置其他样式：加粗、下划线等

```go
package main

import (
	"github.com/fatih/color"
)

func main() {
	c := color.New(color.FgRed).Add(color.BgWhite).Add(color.Bold).Add(color.Underline)
	c.Println("Hello World!")
}
```

![image-20230121140644563](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230121140644563.png)

:::

<br />

## 设置局部颜色

::: details （1）设置局部颜色

```go
package main

import (
	"fmt"
	"github.com/fatih/color"
)

func main() {
	// 原理：
	//   1.使用*Color.Set方法追加颜色前缀字符，用于设置颜色
	//   2.使用color.Unset()追加颜色后缀字符，用于取消颜色
	// 注意事项:
	// color.Set == 创建一个*Color对象，并调用Set()方法
	// color.Unset 直接调用的 fmt.Fprintf

	fmt.Println("Start")

	// 方式1
	color.Set(color.FgGreen)
	fmt.Println("第1行是绿色")
	fmt.Println("第2行是绿色")
	color.Unset()

	// 方式2
	c := color.New(color.FgRed)
	c.Set()
	fmt.Println("第1行是红色")
	fmt.Println("第2行是红色")
	color.Unset()

	// 请注意：无论以上哪种方式都会被下面的行为破坏
	// 原因是color提供的相关方法都会给终端最后加一个取消颜色的后缀，这就破坏了全局颜色设置
	color.Set(color.FgGreen)
	fmt.Printf("%s\n", "这行是绿色")
	fmt.Printf("%s\n", color.RedString("这行是红色"))
	fmt.Printf("%s\n", "绿色已被破坏")
	
	fmt.Println("End")
}
```

![image-20230121140723949](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230121140723949.png)

:::

::: details （2）对未知的报错信息上色

```go
package main

import (
	"github.com/fatih/color"
)

func main() {
	// 设置全局颜色
	color.Set(color.FgRed)

	// 中间不能不能有任何color提供的相关设置颜色的方法，比如 color.RedString等

	// 模拟报错情况
	ch := make(chan struct{})
	ch <- struct{}{}
	<-ch
}
```

![image-20230121140813429](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230121140813429.png)

:::

<br />

## 混合使用颜色

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"github.com/fatih/color"
)

func main() {
	// 方式1
	{
		fmt.Fprintf(color.Output, "%s", color.RedString("abc"))
		fmt.Fprintf(color.Output, "%s", color.BlueString("def"))
		fmt.Fprintf(color.Output, "%s", color.GreenString("xyz"))
		fmt.Fprintf(color.Output, "\n")
	}

	// 方式2: Add(color.Reset)用于取消之前所有的样式,比如设置了背景色/加粗/下划线等
	//       若频繁使用这种方法会无限增加c.params切片的大小,导致内存不释放
	{
		c := color.New(color.BgCyan)
		c.Add(color.Reset).Add(color.FgRed).Printf("abc")
		c.Add(color.Reset).Add(color.FgBlue).Printf("def")
		c.Add(color.Reset).Add(color.FgGreen).Printf("xyz")
		c.Println()
	}

	// 方式3：推荐
	{
		c := color.New()
		c.Printf("%s", color.RedString("abc"))
		c.Printf("%s", color.BlueString("def"))
		c.Printf("%s", color.GreenString("xyz"))
		c.Println()
	}
}
```

![image-20230121141241487](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230121141241487.png)

:::

<br />

## 启用和禁用颜色

::: details 点击查看详情

```go
package main

import (
	"github.com/fatih/color"
)

func main() {
	// 全局关闭/启用颜色
	color.NoColor = true
	color.Red("Hello World!")
	color.NoColor = false
	color.Red("Hello World!")

	// 自定义Color关闭/启用颜色
	c := color.New(color.FgGreen)
	c.DisableColor()
	c.Println("Hello World!")
	c.EnableColor()
	c.Println("Hello World!")
}
```

![image-20230121141322156](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230121141322156.png)

:::