# pterm

Github：[https://github.com/pterm/pterm](https://github.com/pterm/pterm)

文档：[https://docs.pterm.sh](https://docs.pterm.sh)

<br />

## 安装

```bash
go get github.com/pterm/pterm
```

注意

```go
// 1、本教程所有代码均对源码做了一个简单的修改，在Show方法中, 将%s: 修改为 %s
areaText = p.TextStyle.Sprintf("%s", text[0])

// 2、这个库挺骚气, 但是多终端兼容性差一些, 请确认执行环境是否满足
```

<br />

## 交互式

### 确认操作：Confirm

::: details 点击查看详情

```go
package main

import (
	"github.com/pterm/pterm"
)

func main() {
	// 1、默认按下y或n后, 不需要按回车就会执行后面的代码
	// 2、除了y/n, 其他按键不管用
	// 3、按下y后输入的地方会显示Yes, 按下n后输入的地方显示No
	// 4、Show函数可以添加文本, 用于自定义提示语
	// 5、Show函数返回布尔值, 代表y或n
	result, err := pterm.DefaultInteractiveConfirm.Show()
	if err != nil {
		panic(err)
	}
	pterm.Info.Printfln("You answered: %t", result)
}
```

:::

<br />

### 输入操作：Input

::: details （1）普通输入框

```go
package main

import (
	"github.com/pterm/pterm"
)

func main() {
	// 1、行尾自动追加 : 和一个空格
	// 2、如果想要去掉这个:, 好像并没有好的办法, 但好在修改源码特别容易
    //
    // 注意事项
    // 1、GoLand中执行正常
    // 2、CMD中执行正常
    // 3、Git Bash执行不正常
    // 4、PowerShell执行正常
	result, err := pterm.DefaultInteractiveTextInput.Show("What is your name? ")
	if err != nil {
		panic(err)
	}
	pterm.Info.Printfln("You answered: %s", result)
}
```

:::

::: details （2）密码输入框

```go
package main

import (
	"github.com/pterm/pterm"
)

func main() {
	// 定制输入框
	PasswordInput := pterm.InteractiveTextInputPrinter{
		DefaultText: "Password: ",
		TextStyle:   &pterm.ThemeDefault.PrimaryStyle,
		Mask:        "*", // 掩码, 密码框的核心
	}

	// 显示输入框
	password, err := PasswordInput.Show()
	if err != nil {
		panic(err)
	}

	// 输出结果
	pterm.Info.Printfln("You password: %s", password)
}
```

:::

<br />

### 单选操作：Select

::: details 点击查看详情

```go
package main

import (
	"github.com/pterm/pterm"
)

func main() {
	// 显示单选框
	// 1、上下方向键选择, 回车键确认
	// 2、可输入内容进行搜索
	// 3、注意: 按下空格键默认执行搜索的操作, 但是又搜索不到, 所以看起来就像是所有的选项都没了,
	//   解决办法是按退格键删掉空格就好了
	result, err := pterm.DefaultInteractiveSelect.
		WithOptions([]string{"a", "b", "c", "d"}).
		Show()
	if err != nil {
		panic(err)
	}

	// 输出结果
	pterm.Info.Printfln("You answered: %s", result)
}
```

:::

<br />

### 多选操作：Multiselect

::: details 点击查看详情

```go
package main

import (
	"github.com/pterm/pterm"
)

func main() {
	// 显示多选框
	// 1、上下键选择
	// 2、可输入内容进行搜索, 若输入空格依旧和单选框一样, 所有选项就没了
	// 3、回车键选择单项
	// 4、右方向键全选, 左方向键全不选
	// 5、Tab键确认, 会执行后面的代码
	// 注意事项
	// 1、×和√在Windows CMD显示有问题
	// 2、Git Bash直接屏幕都花了, 并且也不能用
	// 3、×在PowerShell中显示一场
	// 4、GoLand中运行正常
	result, err := pterm.DefaultInteractiveMultiselect.
		WithOptions([]string{"a", "b", "c", "d"}).
		Show()
	if err != nil {
		panic(err)
	}

	// 输出结果
	pterm.Info.Printfln("You answered: %s", result)
}
```

:::