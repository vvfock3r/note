# readline

Github：[https://github.com/chzyer/readline](https://github.com/chzyer/readline)

## 安装

```bash
go get github.com/chzyer/readline
```

<br />

## 基本用法

::: details （1）基本用法

```go
package main

import (
	"fmt"

	"github.com/chzyer/readline"
)

func main() {
	// 实例化 readline
	rl, err := readline.New("> ")
	if err != nil {
		panic(err)
	}
	defer func() { _ = rl.Close() }()

	// 读取用户输入
	// 相关函数
	// 	Readline()					读取用户输入并返回字符串
	// 	ReadSlice()  				读取用户输入并返回字节切片
	// 	ReadlineWithDefault(string)	设置一个前缀, 返回前缀+用户输入, 前缀也会显示在输入界面
	// 什么时候会返回错误?
	// 	1.Ctrl+C 会返回 &errors.errorString{s:"Interrupt"}, Windows和Linux表现一致
	//  2.Ctrl+D 会返回 &errors.errorString{s:"EOF"}, Windows和Linux表现一致
	//  3.Ctrl+Z Linux会挂起进程, Windows表现不太一样, 不会将控制权交给用户
	// 其他
	// 	1.退格键好用
	//  2.中文没问题
	//  3.上翻可以找到历史记录
	for {
		line, err := rl.Readline()
		if err != nil {
			fmt.Printf("%#v\n", err)
			break
		}
		fmt.Println("You entered:", line)
	}
}
```

:::

::: details （2）读取密码

```go
package main

import (
	"fmt"

	"github.com/chzyer/readline"
)

func main() {
	// 实例化 readline
	rl, err := readline.New("> ")
	if err != nil {
		panic(err)
	}
	defer func() { _ = rl.Close() }()

	// 读取用户输入
	for {
		password, err := rl.ReadPassword("请输入密码: ")
		if err != nil {
			fmt.Printf("%#v\n", err)
			break
		}
		if string(password) == "123456" {
			break
		} else {
			fmt.Println("密码错误, 请重新输入")
			continue
		}
	}
}
```

:::

::: details （3）New函数和结构体

```go
func New(prompt string) (*Instance, error) {
	return NewEx(&Config{Prompt: prompt})
}

type Instance struct {
	Config    *Config		// 配置选项
	Terminal  *Terminal     // 底层终端交互
	Operation *Operation    // 这里实现一些特殊的功能
}
```

:::

<br />

## 配置选项

### 结构体

::: details 点击查看详情

```go
type Config struct {
	Prompt string	// 提示语, 支持颜色

	HistoryFile string			// 持久化历史记录所使用的文件
	HistoryLimit           int	// 历史记录最大保留个数, 默认500, -1关闭历史记录
	DisableAutoSaveHistory bool // 关闭保存历史记录
	HistorySearchFold bool		// 搜索历史记录不区分大小写

	AutoComplete AutoCompleter	// 使用TAB自动完成

	Listener Listener			// 任何按键都会传递给 Listener

	Painter Painter				// 实现Painter接口用于绘制提示文本和输入行

	VimMode bool				// Vim模式, Vim模式允许使用类似Vim的按键绑定来编辑输入行

	InterruptPrompt string		// 当用户按下中断键（通常是Ctrl+C）时显示的提示文本
	EOFPrompt       string		// 当用户按下EOF键（通常是Ctrl+D）时显示的提示文本

	FuncGetWidth func() int		// 一个返回终端宽度的函数。它用于动态处理终端宽度变化

	Stdin       io.ReadCloser	// 用于读取用户输入的输入流
	StdinWriter io.Writer		// 用于写入数据以显示给用户的输出流
	Stdout      io.Writer		// 用于写入标准输出消息的标准输出流
	Stderr      io.Writer		// 用于写入错误消息的标准错误流

	EnableMask bool				// 如果设置为true，输入将被掩码处理（例如用星号替代字符），以隐藏敏感信息，如密码
	MaskRune   rune				// 当EnableMask设置为true时，将用作掩码的符文
                                // 经过测试, 这个功能不能用


	UniqueEditLine bool			// 用户提交输入后将抹除编辑行。这通常在输入法中使用


	FuncFilterInputRune func(rune) (rune, bool)	// 一个函数，用于过滤输入符文。它可用于禁用某些键组合或将特定键转换为不同的操作

	FuncIsTerminal      func() bool		// 一个函数，用于确定输入是否为终端。它允许即使stdout不是tty，也可以强制使用交互模式
	FuncMakeRaw         func() error	// 设置终端为原始模式（非规范模式）以无行缓冲和字符处理方式读取输入的函数
	FuncExitRaw         func() error	// 在使用原始模式后恢复终端到原始状态的函数
	FuncOnWidthChanged  func(func())	// 注册处理终端宽度变化的回调函数
	ForceUseInteractive bool			// 如果设置为true，即使stdout不是tty，也会强制使用交互模式

	// private fields
	inited    bool
	opHistory *opHistory
	opSearch  *opSearch
}
```

:::

<br />

### 使用颜色

::: details 给提示语添加颜色，Windows和Linux均可使用

```go
package main

import (
	"fmt"

	"github.com/chzyer/readline"
)

func main() {
	// 实例化 readline, 颜色在Windows和Linux均可使用
	rl, err := readline.NewEx(&readline.Config{
		Prompt: "\033[31m>\033[0m ",
	})
	if err != nil {
		panic(err)
	}
	defer func() { _ = rl.Close() }()

	// 读取用户输入
	for {
		line, err := rl.Readline()
		if err != nil {
			fmt.Printf("%#v\n", err)
			break
		}
		fmt.Println("You entered:", line)
	}
}
```

:::

<br />

### 历史记录

::: details （1）默认情况：开启历史记录，存储在内存中，最大存储500条

```go
package main

import (
	"fmt"

	"github.com/chzyer/readline"
)

func main() {
	// 实例化 readline
	rl, err := readline.New("> ")
	if err != nil {
		panic(err)
	}
	defer func() { _ = rl.Close() }()

	fmt.Println(rl.Config.HistoryLimit)           // 500
	fmt.Println(rl.Config.HistoryFile)            // 空
	fmt.Println(rl.Config.HistorySearchFold)      // false, 区分大小写
	fmt.Println(rl.Config.DisableAutoSaveHistory) // false, 开启自动保存到HistoryFile

	// 读取用户输入
	for {
		line, err := rl.Readline()
		if err != nil {
			fmt.Printf("%#v\n", err)
			break
		}
		fmt.Println("You entered:", line)
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run .
500

false
false

# 下面输入几条命令
> abc123
You entered: abc123
> 456abc
You entered: 456abc
> ABC789
You entered: ABC789

# 然后按下Ctrl+R进行历史命令搜索, 输入a, 会匹配到 456abc, 规则如下:
# 1.Ctrl+R会从最近的历史开始搜索, 所以搜索到第一个ABC789
# 2.因为设置了区分大小写, 所以匹配不到, 继续往上搜索, 得到 456abc
# 3.456abc满足, 所以显示在 输入界面中
# 4、按方向键 -> 可以定位到 输入界面中
> 456abc
bck-i-search: a 

# 此时再按下Ctrl+R, 会继续向前搜索
> abc123
bck-i-search: a 
```

:::

<br />

### 命令补全

### 键盘事件