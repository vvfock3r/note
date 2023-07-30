# go-runewidth

Github：[https://github.com/mattn/go-runewidth](https://github.com/mattn/go-runewidth)

文档：[https://pkg.go.dev/github.com/mattn/go-runewidth](https://pkg.go.dev/github.com/mattn/go-runewidth)

<br />

## 中文对齐问题

::: details （1）先看一个有问题的例子

```go
package main

import (
	"fmt"
)

func main() {
	// 假设我有一段数据
	var data = [][]string{
		{"abcde", "|"},
		{"一", "|"},
		{"二三", "|"},
		{"四五a", "|"},
	}

	// 第一列设置宽度为5, 对齐输出
	width := 5
	for _, line := range data {
		fmt.Printf("%-*s  %s\n", width, line[0], line[1])
	}
}
```

输出结果

```bash
abcde  |
一      | 
二三     |
四五a    |

# 分析一下
# 第一行: 纯字母的数据, 对齐肯定没有问题
# 第二行: 包含一个汉字, 要求宽度为5, 实际是占了6个字符
# 第三行: 包含俩个汉字, 要求宽度为5, 实际是占了7个字符
# 第四行: 包含俩个汉字和一个字母, 要求宽度为5, 实际是占了7个字符

# 得到结论
# 在fmt.Printf中, 若包含汉字会额外占据一个宽度, 我们应该针对每个汉字减去这一个宽度, 才能让中文对齐

# 解决办法
# 针对数据做中文检测, 若检测到N个中文, 宽度就减去N
# 但是go-runewidth并没有提供检测中文的办法, 而是提供了数据显示宽度的函数, 所以需要我们套用一个简单的公式来处理
```

:::

::: details （2）测试 runewidth.StringWidth 函数

```go
package main

import (
	"fmt"

	"github.com/mattn/go-runewidth"
)

func main() {
	fmt.Println(len("中"))                   // 3
	fmt.Println(runewidth.StringWidth("中")) // 2
	fmt.Println()

	fmt.Println(len("中国"))                   // 6
	fmt.Println(runewidth.StringWidth("中国")) // 4
}

// 发现了什么?
// len函数计算的长度 - runewidth.StringWidth计算的长度 = 多出来的长度
// 总长度 - 多出来的长度 = 实际显示对齐应该设置的长度
```

:::

::: details （3）使用 runewidth.StringWidth 解决第一列中文对齐的问题

```go
package main

import (
	"fmt"
	"regexp"

	"github.com/mattn/go-runewidth"
)

func main() {
	// 假设我有一段数据
	var data = [][]string{
		{"abcde", "|"},
		{"一", "|"},
		{"二三", "|"},
		{"四五a", "|"},
	}

	// 第一列设置宽度为5, 对齐输出
	width := 5
	for _, line := range data {
		newWidth := width - (len(line[0]) - runewidth.StringWidth(line[0]))
		fmt.Printf("%-*s  %s\n", newWidth, line[0], line[1])
	}
}
```

以下我们分别在 **Windows平台（GoLand、CMD、PowerShell、Git Bash）**和 **Linux** 平台进行测试的结果，很完美

![image-20230730150426962](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230730150426962.png)

![image-20230730150450939](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230730150450939.png)

![image-20230730150526146](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230730150526146.png)

![image-20230730150346234](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230730150346234.png)

![image-20230730150820307](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230730150820307.png)

:::

::: details （4）文本加颜色的情况下分析

**1、添加颜色后不对齐**

```go
package main

import (
	"fmt"

	"github.com/fatih/color"
	"github.com/mattn/go-runewidth"
)

func main() {
	// 假设我有一段数据
	var data = [][]string{
		{"abcde", "|"},
		{"一", "|"},
		{"二三", "|"},
		{"四五a", "|"},
	}

	// 第一列设置宽度为5, 对齐输出
	width := 5
	for _, line := range data {
		line[0] = color.CyanString(line[0]) // 添加颜色
		newWidth := width - (len(line[0]) - runewidth.StringWidth(line[0]))
		fmt.Printf("%-*s  %s\n", newWidth, line[0], line[1])
	}
}
```

**2、分析一下**

```go
package main

import (
	"fmt"

	"github.com/fatih/color"
	"github.com/mattn/go-runewidth"
)

func main() {
    fmt.Println(len(color.CyanString("中")))                   // 未加颜色时: 3
	fmt.Println(runewidth.StringWidth(color.CyanString("中"))) // 未加颜色时: 2
	fmt.Println()

	fmt.Println(len(color.CyanString("中国")))                   // 未加颜色时: 6
	fmt.Println(runewidth.StringWidth(color.CyanString("中国"))) // 未加颜色时: 4
}
```

输出结果

```bash
12
9 
  
15
11

# 发现了什么?
# len统计的长度: 比没加颜色的时候+ 9
# len比runewidth.StringWidth多的差值：N个汉字 + 2
```

**3、改写一下代码**

```go
package main

import (
	"fmt"

	"github.com/fatih/color"
	"github.com/mattn/go-runewidth"
)

func main() {
	// 假设我有一段数据
	var data = [][]string{
		{"abcde", "|"},
		{"一", "|"},
		{"二三", "|"},
		{"四五a", "|"},
	}

	// 第一列设置宽度为5, 对齐输出
	width := 5
	for _, line := range data {
		field1 := line[0]                   // 第一个字段原始值
		line[0] = color.CyanString(line[0]) // 添加颜色

		// 总宽度+9, 并且统计的是未加颜色的值
		newWidth := width + 9 - (len(field1) - runewidth.StringWidth(field1))
		fmt.Printf("%-*s  %s\n", newWidth, line[0], line[1])
	}
}
```

**4、如果文本中包含两段颜色的情况下**

```go
package main

import (
	"fmt"

	"github.com/fatih/color"
	"github.com/mattn/go-runewidth"
)

func main() {
	// 假设我有一段数据
	var data = [][]string{
		{"abcde", "|"},
		{"一", "|"},
		{"二三", "|"},
		{"四五a", "|"},
	}

	// 第一列设置宽度为5, 对齐输出
	width := 6
	for _, line := range data {
		// 假设文本里包含两段颜色情况下
		field1 := line[0] + "a"                                    // 第一个字段原始值
		line[0] = color.CyanString(line[0] + color.RedString("a")) // 添加颜色

		// 总宽度+18, 并且统计的是未加颜色的值
		newWidth := width + 18 - (len(field1) - runewidth.StringWidth(field1)) // 这里需要改成18, 两段颜色, 所以 9 * 2
		fmt.Printf("%-*s  %s\n", newWidth, line[0], line[1])
	}
}
```

输出结果

![image-20230730164926277](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230730164926277.png)

:::

::: details （5）编写一个通用的函数

```go
package main

import (
	"fmt"
	"regexp"

	"github.com/fatih/color"
	"github.com/mattn/go-runewidth"
)

// AlignWidth 输入一个字符串和想要的宽度, 输出实际应该设置的宽度
func AlignWidth(text string, width int) int {
	// 检查文本是否包含颜色
	var hasColor bool
	re, _ := regexp.Compile(`\x1b\[[0-9;]*[mK]`)
	if re.MatchString(text) {
		hasColor = true
	}

	// 文本包含颜色处理方法
	if hasColor {
		textNoColor := re.ReplaceAllString(text, "")
		count := len(re.FindAllStringIndex(text, -1))
		growWidth := count / 2 * 9
		return width + growWidth - (len(textNoColor) - runewidth.StringWidth(textNoColor))
	}

	// 文本不包含颜色处理方法
	return width - (len(text) - runewidth.StringWidth(text))
}

func main() {
	// 假设我有一段数据
	var data = [][]string{
		{"abcde", "|"},
		{"一", "|"},
		{"二三", "|"},
		{"四五a", "|"},
	}

	// 第一列设置宽度为7, 对齐输出
	width := 7
	for _, line := range data {
		line[0] = color.CyanString(line[0]) + color.RedString("c") + color.GreenString("d")
		fmt.Printf("%-*s  %s\n", AlignWidth(line[0], width), line[0], line[1])
	}
}
```

![image-20230730184904730](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230730184904730.png)

**函数说明**

* 此函数可以拿来直接用，当然，还有很大的优化空间
* 背景颜色、加粗、下划线等均没有进行测试，若有问题，需要微调正则
* cygwin等终端没有进行测试，若以后测试了，补充到文档中

:::