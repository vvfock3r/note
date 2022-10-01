# Go实用模块

## 基本模块

<table>
    <thead>
    <tr>
        <th style="width: 15%;">分类说明</th>
        <th style="width: 15%;">模块名称</th>
        <th style="width: 20%;">测试版本</th>
        <th style="width: 30%;">应用举例</th>
        <th style="width: 30%;">备注</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>排序</td>
        <td><a href="#sort" style="text-decoration:none;">Sort</a></td>
        <td><li><code>Go 1.19</code></li></td>
        <td></td>
        <td></td>
    </tr>        
    </tbody>
</table>



## 实用模块

<table>
    <thead>
    <tr>
        <th style="width: 15%;">分类说明</th>
        <th style="width: 15%;">模块名称</th>
        <th style="width: 20%;">测试版本</th>
        <th style="width: 30%;">应用举例</th>
        <th style="width: 30%;">备注</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>实时重载</td>
        <td><a href="#air" style="text-decoration:none;">Air</a></td>
        <td><li><code>Go 1.19</code></li><li><code>Air v1.40.4</code></li></td>
        <td></td>
        <td></td>
    </tr>        
    <tr>
        <td>命令行界面</td>
        <td><a href="#cobra" style="text-decoration:none;">Cobra</a></td>
        <td><li><code>Go 1.19</code></li><li><code>Cobra v1.5.0</code></li></td>
        <td>Kubernetes、Docker、Containerd ...</td>
        <td></td>
    </tr>
    <tr>
        <td>配置读取</td>
        <td><a href="#viper" style="text-decoration:none;">Viper</a></td>
        <td><li><code>Go 1.19</code></li><li><code>Viper v1.12.0</code></li></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>日志记录</td>
        <td><a href="#zap" style="text-decoration:none;">Zap</a></td>
        <td><li><code>Go 1.19</code></li><li><code>Zap v1.23.0</code></li></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>ORM</td>
        <td><a href="#gorm" style="text-decoration:none;">Gorm</a></td>
        <td><li><code>Go 1.19</code></li><li><code>Gorm v1.23.9</code></li></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>访问控制</td>
        <td><a href="#casbin" style="text-decoration:none;">Casbin</a></td>
        <td><li><code>Go 1.19</code></li><li><code>Casbin v2.55.0</code></li></td>
        <td>Harbor、Docker ...</td>
        <td></td>
    </tr>        
    </tbody>
</table>
<br />

## Air

Github：[https://github.com/cosmtrek/air](https://github.com/cosmtrek/air)

<br />

### 安装

**方式一：使用go install安装**

```bash
# 直接使用go install安装后查看不了版本号，需要通过-ldflags注入
go install github.com/cosmtrek/air@v1.40.4

# 查看版本
air -v

  __    _   ___
 / /\  | | | |_)
/_/--\ |_| |_| \_ , built with Go
```

**方式二：直接下载二进制（推荐）**

```bash
# 推荐到Github下载编译好的二进制文件
air -v

  __    _   ___
 / /\  | | | |_)
/_/--\ |_| |_| \_ 1.40.4, built with Go 1.18.3
```

<br />

### 基础使用

直接执行`air`即可，它会监听当前目录下的文件，当文件发生改变后会重新编译代码并运行

这样使用虽然方便，但是定制性很差，更好的方式是：使用配置文件来控制`air`的各项参数

![image-20220925144449681](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220925144449681.png)

<br />

### 配置文件

::: details （1）生成默认的配置文件

```bash
D:\application\GoLand\demo>air init

  __    _   ___
 / /\  | | | |_)
/_/--\ |_| |_| \_ 1.40.4, built with Go 1.18.3

.air.toml file created to the current directory with the default settings
```

:::

::: details （2）默认配置文件 .air.toml 参数说明

```toml
# 工作目录设置（无须修改）
root = "."                # 根目录
testdata_dir = "testdata" # 测试数据目录
tmp_dir = "tmp"           # 临时目录

# 编译设置（根据实际情况修改）
[build]
  args_bin = []                                          # 二进制命令执行时跟的参数列表
  bin = "tmp\\main.exe"                                  # 编译出的二进制命令
  cmd = "go build -o ./tmp/main.exe ."                   # 编译
  delay = 1000                                           # 指定编译延迟时间(单位毫秒)，适用于文件频繁更改的情况（根据实际情况修改）
  exclude_dir = ["assets", "tmp", "vendor", "testdata"]  # 排除监听的目录
  exclude_file = []                                      # 排除监听的文件
  exclude_regex = ["_test.go"]                           # 排除监听的文件(使用正则表达式)
  exclude_unchanged = false                              # 排除未更改的文件
  follow_symlink = false                                 # 跟随符号连接
  full_bin = ""                                          #
  include_dir = []                                       # 监听的目录
  include_ext = ["go", "tpl", "tmpl", "html"]            # 监听的扩展名文件（根据实际情况修改）
  kill_delay = "0s"                                      #
  log = "build-errors.log"                               # 日志文件
  send_interrupt = false                                 #
  stop_on_error = true                                   # 编译错误时停止旧的二进制命令

# 颜色配置（根据个人喜好修改）
[color]
  app = ""
  build = "yellow"
  main = "magenta"
  runner = "green"
  watcher = "cyan"

[log]
  time = false              # 日志记录中输出时间（推荐开启）

[misc]
  clean_on_exit = false     # air退出时清理临时文件或目录（推荐开启）

[screen]
  clear_on_rebuild = false  # 重新构建前先清屏（根据个人喜好修改）
```

:::

::: details （3）自定义配置

```toml
# This is the default configuration file of air v1.40.4 and is modified
root = "."
testdata_dir = "testdata"
tmp_dir = "tmp"

[build]
  args_bin = []
  bin = "tmp\\main.exe"
  cmd = "go build -o ./tmp/main.exe ."
  delay = 0                                                 # modified
  exclude_dir = ["assets", "tmp", "vendor", "testdata"]
  exclude_file = []
  exclude_regex = ["_test.go"]
  exclude_unchanged = false
  follow_symlink = false
  full_bin = ""
  include_dir = []
  include_ext = ["go", "tpl", "tmpl", "html", "yaml", "yml"]  # modified
  kill_delay = "0s"
  log = "build-errors.log"
  send_interrupt = false
  stop_on_error = true

[color]
  app = ""
  build = "yellow"
  main = "magenta"
  runner = "green"
  watcher = "cyan"

[log]
  time = true                  # modified

[misc]
  clean_on_exit = true         # modified

[screen]
  clear_on_rebuild = false
```

:::

<br />

## Cobra

Cobra

* 文档：[https://cobra.dev/](https://cobra.dev/)

* Github：[https://github.com/spf13/cobra](https://github.com/spf13/cobra)

Cobra CLI

* Github：[https://github.com/spf13/cobra-cli](https://github.com/spf13/cobra-cli)

### 基础

#### 安装

```bash
# 安装cobra库（推荐安装最新版）
go get -u github.com/spf13/cobra@latest

# 安装cobra命令行工具，这可以帮我们自动生成代码（这个库不是必须要安装的）
go install github.com/spf13/cobra-cli@latest
```

<br />

#### 基本概念

```bash
git clone https://github.com/spf13/cobra.git --depth 1
```

* **Commands**：子命令，在上面的例子中对应`clone`
* **Args** ：参数，在上面的例子中对应`https://github.com/spf13/cobra.git`，这是一个由用户输入的值，对我们的程序来说是可变的值
* **Flags** ：标志，在上面的例子中对应`--depth 1`

其中Args和Flags的位置可以互换

<br />

#### 常规目录结构

```bash
demo/            # 项目根目录
  cmd/			 # 命令行目录
    cobra.go	 # 用于定义根命令,这个可以是任意文件名
  main.go		 # 项目入口文件
```

::: details 点击查看完整代码

`main.go`

```go
package main

import "demo/cmd"

func main() {
	cmd.Execute()
}
```

`cmd/cobra.go`

```go
package cmd

import (
	"fmt"
	"github.com/spf13/cobra"
	"os"
)

const (
	shortMeesage = `Short message`
	longMessage  = `
This is a very long text
For details, please refer to https://github.com/spf13/cobra`
)

var rootCmd = &cobra.Command{
	// Usage中显示的命令名称
	Use: "demo",

	// 说明文字，显示在命令行帮助信息的最上面
	// 默认显示长文本Long，若没有定义则显示Short，若Short也没有定义则不显示
	Short: shortMeesage,
	Long:  longMessage,

	// 根命令执行, 直接执行命令时做的操作
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("根命令执行...")
	},
}

// 此函数一般只定义在 根命令中，作为外部调用的入口函数
func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Fprintf(os.Stderr, err.Error())
		os.Exit(1)
	}
}
```

:::

输出结果

```bash
# 直接执行程序，对应根命令中的Run函数
C:\Users\Administrator\GolandProjects\demo>go run main.go       
根命令执行...

# 查看帮助信息
C:\Users\Administrator\GolandProjects\demo>go run main.go --help

This is a very long text
For details, please refer to https://github.com/spf13/cobra

Usage:
  demo [flags]

Flags:
  -h, --help   help for demo
```

<br />

#### 添加一个子命令（Command）

::: details 点击查看完整代码

`cmd/init/init.go`

```go
package init

import (
	"fmt"
	"github.com/spf13/cobra"
)

var Cmd = &cobra.Command{
	Use:   "init",
	Short: "System initialization",

	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("init command running...")
		fmt.Println("init command args: ", args)
	},
}
```

`cmd/cobra.go`

```go
package cmd

import (
	initialize "demo/cmd/init"  // 因为与模块默认的init函数有冲突，所以这里重命名一下
	"fmt"
	"github.com/spf13/cobra"
	"os"
)

// 中间部分代码省略...

// 在根命令中注册子命令
func init() {
	rootCmd.AddCommand(initialize.Cmd)
}

func Execute() {
	// 代码省略...
}
```

:::

输出结果

```bash
# 查看根命令帮助信息
C:\Users\Administrator\GolandProjects\demo>go run main.go -h 

This is a very long text                                   
For details, please refer to https://github.com/spf13/cobra

Usage:
  demo [flags]
  demo [command]

Available Commands:
  completion  Generate the autocompletion script for the specified shell
  help        Help about any command  # 添加完第一个子命令，默认还会加一个help子命令
  init        System initialization   # 这里是我们添加的子命令
                                                                        
Flags:                                                                  
  -h, --help   help for demo
                                                                        
Use "demo [command] --help" for more information about a command. 

# 查看init命令帮助信息 - 方式一
C:\Users\Administrator\GolandProjects\demo>go run main.go init -h
System initialization

Usage:                      
  demo init [flags]         
                            
Flags:                      
  -h, --help   help for init

# 查看init命令帮助信息 - 方式二
C:\Users\Administrator\GolandProjects\demo>go run main.go help init
System initialization

Usage:                      
  demo init [flags]         
                            
Flags:
  -h, --help   help for init
```

<br />

#### 添加一个选项（Flags）

::: details 点击查看完整代码

`cmd/init/init.go`

```go
package init

import (
	"fmt"
	"github.com/spf13/cobra"
)

// (1) 定义全局变量
var (
	output string
)

var Cmd = &cobra.Command{
	Use:   "init",
	Short: "System initialization",

	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("init command running...")
		fmt.Println("init command args: ", args)
		// (3) 函数中获取选项值
		fmt.Println("output: ", output)
	},
}

func init() {
	// (2) init函数中添加选项
	// 第1个参数: 绑定的变量
	// 第2个参数: 长选项
	// 第3个参数：短选项
	// 第4个参数：默认值
	// 第5个参数：选项说明
	Cmd.Flags().StringVarP(&output, "output", "o", "json", "Output format")
}
```

:::

输出结果

```bash
# 查看init子命令帮助信息
C:\Users\Administrator\GolandProjects\demo>go run main.go init -h    
System initialization

Usage:                                                
  demo init [flags]                                   
                                                      
Flags:                                                
  -h, --help            help for init                 
  -o, --output string   Output format (default "json")
  
# 使用参数默认值
C:\Users\Administrator\GolandProjects\demo>go run main.go init              
init command running...
init command args:  []                     
output:  json

# 使用短选项
C:\Users\Administrator\GolandProjects\demo>go run main.go init -o yaml
init command running...
init command args:  []
output:  yaml

# 使用长选项
C:\Users\Administrator\GolandProjects\demo>go run main.go init --output ini 
init command running...
init command args:  []
output:  ini   
```

<br />

#### 添加一个参数（Arg）

（1）默认情况下支持参数

```bash
C:\Users\Administrator\GolandProjects\demo>go run main.go init abc def xyz
init command running...
init command args:  [abc def xyz]
output:  json
```

（2）如果我们不想让他有参数，可以这样做

`cmd/init/init.go`

```go
var Cmd = &cobra.Command{
	Use:   "init",
	Short: "System initialization",
	// 添加这一行，意思是不允许有参数
	Args: cobra.NoArgs,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("init command running...")
		fmt.Println("init command args: ", args)
		fmt.Println("output: ", output)
	},
}
```

再次执行查看输出

```bash
C:\Users\Administrator\GolandProjects\demo>go run main.go init abc def xyz
Error: unknown command "abc" for "demo init"
Usage:                                                
  demo init [flags]                                   
                                                      
Flags:                                                
  -h, --help            help for init
  -o, --output string   Output format (default "json")

unknown command "abc" for "demo init"exit status 1
```

（3）自己处理参数

::: details 点击查看完整代码

`cmd/init/init.go`

```go
package init

import (
	"fmt"
	"github.com/spf13/cobra"
	"strings"
)

var (
	output string
)

var Cmd = &cobra.Command{
	Use:   "init",
	Short: "System initialization",
	// 自己处理参数
	Args: func(cmd *cobra.Command, args []string) error {
		// 只能传递一个参数
		if len(args) > 1 {
			return fmt.Errorf("Only one parameter can be passed for %q", cmd.CommandPath())
		} else if len(args) < 1 {
			return fmt.Errorf("At least one parameter must be passed for %q", cmd.CommandPath())
		}

		// 对参数处理,转为大写
		args[0] = strings.ToUpper(args[0])

		// 校验没问题，放行通过
		return nil
	},

	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("init command running...")
		fmt.Println("init command args: ", args)
		fmt.Println("output: ", output)
	},
}

func init() {
	Cmd.Flags().StringVarP(&output, "output", "o", "json", "Output format")
}
```

:::

输出结果

```bash
# 不传递参数
C:\Users\Administrator\GolandProjects\demo>go run main.go init   
Error: At least one parameter must be passed for "demo init"
Usage:
  demo init [flags]

Flags:
  -h, --help            help for init
  -o, --output string   Output format (default "json")

At least one parameter must be passed for "demo init"exit status 1

# 传递多个参数
C:\Users\Administrator\GolandProjects\demo>go run main.go init a b
Error: Only one parameter can be passed for "demo init"
Usage:
  demo init [flags]

Flags:
  -h, --help            help for init
  -o, --output string   Output format (default "json")

Only one parameter can be passed for "demo init"exit status 1

# 传递1个参数
C:\Users\Administrator\GolandProjects\demo>go run main.go init a 
init command running...
init command args:  [A]
output:  json
```

<br />

### 命令

#### （1）*Run函数

***Run系列函数**

1. <span style="color: blue; font-weight: bold;">PersistentPreRun</span>
2. <span style="color: green; font-weight: bold;">PreRun</span>
3. <span style="color: green; font-weight: bold;">Run</span>
4. <span style="color: green; font-weight: bold;">PostRun</span>
5. <span style="color: blue; font-weight: bold;">PersistentPostRun</span>

**解释说明**

* 函数执行顺序说明：按照上面的排序顺序执行
* `Persistent*`系列函数（蓝色字体）：如果本命令定义了该函数则执行，否则则执行父命令对应的函数，即会继承父命令的函数并执行
* `PreRun/Run/PostRun`（绿色字体）：本命令真正执行的函数

<br />

***RunE系列函数**

1. <span style="color: blue; font-weight: bold;">PersistentPreRunE</span>
2. <span style="color: green; font-weight: bold;">PreRunE</span>
3. <span style="color: green; font-weight: bold;">RunE</span>
4. <span style="color: green; font-weight: bold;">PostRunE</span>
5. <span style="color: blue; font-weight: bold;">PersistentPostRunE</span>

**解释说明**

* 与`*Run`函数类似，但是需要返回`error`类型
* 假设`*Run`和`*Rune`都定义了，那么`*Rune`会执行，而`*Run`不会执行

<br />

::: details 点击查看完整代码

`cmd/cobra.go`

```go
package cmd

import (
	initialize "demo/cmd/init"
	"fmt"
	"github.com/spf13/cobra"
	"os"
)

const (
	shortMeesage = `Short message`
	longMessage  = `
This is a very long text
For details, please refer to https://github.com/spf13/cobra`
)

var rootCmd = &cobra.Command{
	Use:   "demo",
	Short: shortMeesage,
	Long:  longMessage,
	PersistentPreRun: func(cmd *cobra.Command, args []string) {
		fmt.Println("[ root ] PersistentPreRun")
	},
	PreRun: func(cmd *cobra.Command, args []string) {
		fmt.Println("[ root ] PreRun")
	},
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("[ root ] Run")
	},
	PostRun: func(cmd *cobra.Command, args []string) {
		fmt.Println("[ root ] PostRun")
	},
	PersistentPostRun: func(cmd *cobra.Command, args []string) {
		fmt.Println("[ root ] PersistentPostRun")
	},
}

func init() {
	// 添加子命令
	rootCmd.AddCommand(initialize.Cmd)
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Fprintf(os.Stderr, err.Error())
		os.Exit(1)
	}
}
```

`cmd/init/init.go`

```go
package init

import (
	"fmt"
	"github.com/spf13/cobra"
)

var Cmd = &cobra.Command{
	Use:   "init",
	Short: "System initialization",

	PreRun: func(cmd *cobra.Command, args []string) {
		fmt.Println("[ init ] PreRun")
	},
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("[ init ] Run")
	},
	PostRun: func(cmd *cobra.Command, args []string) {
		fmt.Println("[ init ] PostRun")
	},
}
```

:::

输出结果

```bash
# 父命令函数执行
C:\Users\Administrator\GolandProjects\demo>go run main.go
[ root ] PersistentPreRun
[ root ] PreRun           
[ root ] Run              
[ root ] PostRun          
[ root ] PersistentPostRun

# 子命令没有定义Persistent*，则继承父命令的函数
C:\Users\Administrator\GolandProjects\demo>go run main.go init
[ root ] PersistentPreRun
[ init ] PreRun           
[ init ] Run              
[ init ] PostRun          
[ root ] PersistentPostRun
```

<br />

#### （2）定义别名

`cmd/init/init.go`

```go
var Cmd = &cobra.Command{
	Use:   "init",
	Short: "System initialization",
	// 定义别名
	Aliases: []string{"i", "int", "nit"},
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("init command running...")
		fmt.Println("init command args: ", args)
	},
}
```

输出结果

```bash
C:\Users\Administrator\GolandProjects\demo>go run main.go init -h
System initialization

Usage:                      
  demo init [flags]         
                            
Aliases:                    
  init, i, int, nit
                            
Flags:                      
  -h, --help   help for init
```

<br />

#### （3）静默模式

::: details 点击查看完整代码

`cmd/init/init.go`

```go
package init

import (
	"fmt"
	"github.com/spf13/cobra"
)

var Cmd = &cobra.Command{
	Use:   "init",
	Short: "System initialization",
	// 静默Usage信息
	SilenceUsage: true,
	// 静默Error信息
	SilenceErrors: true,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("init command running...")
		fmt.Println("init command args: ", args)
	},
}
```

:::

输出结果

```bash
# 开启全部静默模式：故意输入一个不存在的选项
C:\Users\Administrator\GolandProjects\demo>go run main.go init --abc 123
unknown flag: --abcexit status 1

# 关闭静默Error：SilenceErrors: false,
C:\Users\Administrator\GolandProjects\demo>go run main.go init --abc 123
Error: unknown flag: --abc
unknown flag: --abcexit status 1

# 两个都关闭（这也是默认的行为）
C:\Users\Administrator\GolandProjects\demo>go run main.go init --abc 123
Error: unknown flag: --abc
Usage:
  demo init [flags]

Flags:
  -h, --help   help for init

unknown flag: --abcexit status 1
```

<br />

#### （4）隐藏命令

::: details 点击查看完整代码

`cmd/init/init.go`

```go
package init

import (
	"fmt"
	"github.com/spf13/cobra"
)

var Cmd = &cobra.Command{
	Use:   "init",
	Short: "System initialization",
	// 隐藏命令
	Hidden: true,
	PreRun: func(cmd *cobra.Command, args []string) {
		fmt.Println("[ init ] PreRun")
	},
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("[ init ] Run")
	},
	PostRun: func(cmd *cobra.Command, args []string) {
		fmt.Println("[ init ] PostRun")
	},
}
```

:::

输出结果

```bash
# 查看根命令，并没有init子命令
C:\Users\Administrator\GolandProjects\demo>go run main.go -h   

This is a very long text                                   
For details, please refer to https://github.com/spf13/cobra

Usage:                                                                  
  demo [flags]                                                          
  demo [command]                                                        
                                                                        
Available Commands:                                                     
  completion  Generate the autocompletion script for the specified shell
  help        Help about any command                                    
                                                                        
Flags:                                                                  
  -h, --help   help for demo                                            

Use "demo [command] --help" for more information about a command.

# 但是却可以调用
C:\Users\Administrator\GolandProjects\demo>go run main.go init
[ root ] PersistentPreRun
[ init ] PreRun
[ init ] Run
[ init ] PostRun
[ root ] PersistentPostRun
```

<br />

#### （5）自动补全

文档：[https://github.com/spf13/cobra/blob/main/shell_completions.md](https://github.com/spf13/cobra/blob/main/shell_completions.md)

<br />

### 选项

#### （1）持久选项

持久选项代表**该命令下的所有子命令都会继承该选项**

::: details 点击查看完整代码

`cmd/cobra.go`

```go
package cmd

import (
	initialize "demo/cmd/init" // 因为与模块默认的init函数有冲突，所以这里重命名一下
	"fmt"
	"github.com/spf13/cobra"
	"os"
)

const (
	shortMeesage = `Short message`
	longMessage  = `
This is a very long text
For details, please refer to https://github.com/spf13/cobra`
)

var Count int

var rootCmd = &cobra.Command{
	Use:   "demo",
	Short: shortMeesage,
	Long:  longMessage,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("根命令执行...")
	},
}

func init() {
	// 根命令上的持久标志，对根命令下所有的子命令都生效
	rootCmd.PersistentFlags().IntVarP(&Count, "count", "c", -1, "verbose output")

	// 添加子命令
	rootCmd.AddCommand(initialize.Cmd)
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		_, _ = fmt.Fprintf(os.Stderr, err.Error())
		os.Exit(1)
	}
}
```

`cmd/init/init.go`

`init`子命令中并没有定义任何选项

```go
package init

import (
	"fmt"
	"github.com/spf13/cobra"
)

var Cmd = &cobra.Command{
	Use:   "init",
	Short: "System initialization",

	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("init command running...")
		fmt.Println("init command args: ", args)

		// 方式一：获取持久标志的值
		fmt.Println(cmd.Root().PersistentFlags().GetInt("count"))

		// 方式二：获取持久标志的值
		fmt.Println(cmd.Flags().GetInt("count"))
	},
}
```

:::

输出结果

```bash
# 查看帮助信息，init子命令继承了夫命令的-c选项
C:\Users\Administrator\GolandProjects\demo>go run main.go init -h    
System initialization

Usage:                                         
  demo init [flags]                            
                                               
Flags:                                         
  -h, --help   help for init                   
                                               
Global Flags:
  -c, --count int   verbose output (default -1)

# 使用选项
C:\Users\Administrator\GolandProjects\demo>go run main.go init -c 200
init command running...
init command args:  []
200 <nil>             
200 <nil>
```

<br />

#### （2）必选选项

`cmd/init/init.go`

```go
func init() {
	// 添加选项
	Cmd.Flags().StringVarP(&output, "output", "o", "json", "Output format")
	
    // 标记本地选项为必选选项
	Cmd.MarkFlagRequired("output")
    
    // 标记持久选项为必选选项
    // rootCmd.MarkPersistentFlagRequired("output")
}
```

输出结果

```bash
# 不传参数会报错
C:\Users\Administrator\GolandProjects\demo>go run main.go init
Error: required flag(s) "output" not set
Usage:                               
  demo init [flags]
                                     
Aliases:                             
  init, i, ini, nit                  
                                     
Flags:                               
  -h, --help            help for init
  -o, --output string   Output format (default "json")

required flag(s) "output" not setexit status 1
```

<br />

#### （3）多选项支持

::: details 点击查看完整代码

`cmd/init/init.go`

```go
package init

import (
	"fmt"
	"github.com/spf13/cobra"
)

var (
	output string
	value  []string
)

var Cmd = &cobra.Command{
	Use:     "init",
	Short:   "System initialization",
	Aliases: []string{"i", "ini", "nit"},

	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("init command running...")
		fmt.Println("init command args: ", args)
		fmt.Println("output: ", output)
		fmt.Println("value: ", value)
	},
}

func init() {
	// 添加选项
	Cmd.Flags().StringVarP(&output, "output", "o", "json", "Output format")

	// 支持多次调用该选项
	Cmd.Flags().StringSliceVarP(&value, "", "v", []string{}, "可以多次调用该选项")

	// StringArrayVarP和StringSliceVarP效果相同
	//Cmd.Flags().StringArrayVarP(&value, "", "v", []string{}, "可以多次调用该选项")
}
```

:::

输出结果

```bash
# 多次调用该选项
C:\Users\Administrator\GolandProjects\demo>go run main.go init -v 1 -v 2 -v 3 
init command running...
init command args:  []
output:  json
value:  [1 2 3]
```

<br />

#### （4）选项组

::: details 点击查看完整代码

`cmd/init/init.go`

```go
package init

import (
	"fmt"
	"github.com/spf13/cobra"
)

var (
	json     bool
	yaml     bool
	username string
	password string
)

var Cmd = &cobra.Command{
	Use:   "init",
	Short: "System initialization",

	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("init command running...")
		fmt.Println("init command args: ", args)
		fmt.Println("json: ", json)
		fmt.Println("yaml: ", yaml)
		fmt.Println("username: ", username)
		fmt.Println("password: ", password)
	},
}

func init() {
	// 互斥选项
	Cmd.Flags().BoolVar(&json, "json", false, "Output in JSON")
	Cmd.Flags().BoolVar(&yaml, "yaml", false, "Output in YAML")
	Cmd.MarkFlagsMutuallyExclusive("json", "yaml")

	// 使用以下其中任意一个选项，则另一个选项也必须使用
	Cmd.Flags().StringVarP(&username, "username", "u", "", "Username (required if password is set)")
	Cmd.Flags().StringVarP(&password, "password", "p", "", "Password (required if username is set)")
	Cmd.MarkFlagsRequiredTogether("username", "password")
}
```

:::

输出结果

```bash
# 两个选项为互斥选项
C:\Users\Administrator\GolandProjects\demo>go run main.go init --json --yaml
Error: if any flags in the group [json yaml] are set none of the others can be; [json yaml] were all set
...

# 单独使用则没问题
C:\Users\Administrator\GolandProjects\demo>go run main.go init --json                                         
init command running...
init command args:  []
json:  true           
yaml:  false          
username:             
password:             

C:\Users\Administrator\GolandProjects\demo>go run main.go init --yaml
init command running...
init command args:  []
json:  false          
yaml:  true           
username:             
password:

# -------------------------------------------------------------------------------------

# 若提供了-u选项，则也必须提供-p选项
C:\Users\Administrator\GolandProjects\demo>go run main.go init -u root
Error: if any flags in the group [username password] are set they must all be set; missing [password]

C:\Users\Administrator\GolandProjects\demo>go run main.go init -u root -p123456
init command running...
init command args:  []
json:  false
yaml:  false
username:  root
password:  123456
```

<br />

### 参数

#### （1）设置不允许带参数

::: details 点击查看完整代码

`cmd/init/init.go`

```go
package init

import (
	"fmt"
	"github.com/spf13/cobra"
)

var Cmd = &cobra.Command{
	Use:   "init",
	Short: "System initialization",

	// 不允许带参数
	Args: cobra.NoArgs,

	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("init Run")
		fmt.Println("init Args:", args)
	},
}
```

:::

输出结果

```bash
# 不带参数执行，没问题
C:\Users\Administrator\GolandProjects\demo>go run main.go init  
init Run
init Args: []

# 带参数执行，报错
C:\Users\Administrator\GolandProjects\demo>go run main.go init a
Error: unknown command "a" for "demo init"
Usage:                      
  demo init [flags]         
                            
Flags:                      
  -h, --help   help for init

unknown command "a" for "demo init"exit status 1
```

<br />

#### （2）设置至少带N个参数

::: details 点击查看完整代码

`cmd/init/init.go`

```go
package init

import (
	"fmt"
	"github.com/spf13/cobra"
)

var Cmd = &cobra.Command{
	Use:   "init",
	Short: "System initialization",

	// 设置至少带2个参数
	Args: cobra.MinimumNArgs(2),

	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("init Run")
		fmt.Println("init Args:", args)
	},
}
```

:::

输出结果

```bash
C:\Users\Administrator\GolandProjects\demo>go run main.go init
Error: requires at least 2 arg(s), only received 0
Usage:
  demo init [flags]

Flags:
  -h, --help   help for init

requires at least 2 arg(s), only received 0exit status 1

C:\Users\Administrator\GolandProjects\demo>go run main.go init a b
init Run
init Args: [a b]
```

<br />

#### （3）设置至多带N个参数

::: details 点击查看完整代码

`cmd/init/init.go`

```go
package init

import (
	"fmt"
	"github.com/spf13/cobra"
)

var Cmd = &cobra.Command{
	Use:   "init",
	Short: "System initialization",

	//设置至多带2个参数
	Args: cobra.MaximumNArgs(2),

	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("init Run")
		fmt.Println("init Args:", args)
	},
}
```

:::

输出结果

```bash
C:\Users\Administrator\GolandProjects\demo>go run main.go init    
init Run
init Args: []

C:\Users\Administrator\GolandProjects\demo>go run main.go init 1
init Run
init Args: [1]

C:\Users\Administrator\GolandProjects\demo>go run main.go init 1 2
init Run
init Args: [1 2]

C:\Users\Administrator\GolandProjects\demo>go run main.go init 1 2 3
Error: accepts at most 2 arg(s), received 3
Usage:                              
  demo init [flags]                 
                                    
Flags:                              
  -h, --help   help for init        
                                    
accepts at most 2 arg(s), received 3exit status 1
```

<br />

#### （4）设置参数个数范围

::: details 点击查看完整代码

`cmd/init/init.go`

```go
package init

import (
	"fmt"
	"github.com/spf13/cobra"
)

var Cmd = &cobra.Command{
	Use:   "init",
	Short: "System initialization",

	// 参数个数：最少1个，最多2个
	Args: cobra.RangeArgs(1, 2),

	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("init Run")
		fmt.Println("init Args:", args)
	},
}

```

:::

输出结果

```bash
C:\Users\Administrator\GolandProjects\demo>go run main.go init      
Error: accepts between 1 and 2 arg(s), received 0
Usage:                                    
  demo init [flags]                       
                                          
Flags:                                    
  -h, --help   help for init              
                                          
accepts between 1 and 2 arg(s), received 0exit status 1
                                                       
C:\Users\Administrator\GolandProjects\demo>go run main.go init 1
init Run
init Args: [1]

C:\Users\Administrator\GolandProjects\demo>go run main.go init 1 2
init Run
init Args: [1 2]

C:\Users\Administrator\GolandProjects\demo>go run main.go init 1 2 3
Error: accepts between 1 and 2 arg(s), received 3
Usage:
  demo init [flags]

Flags:
  -h, --help   help for init

accepts between 1 and 2 arg(s), received 3exit status 1
```

<br />

#### （5）设置参数可选值

::: details 点击查看完整代码

`cmd/init/init.go`

```go
package init

import (
	"fmt"
	"github.com/spf13/cobra"
)

var Cmd = &cobra.Command{
	Use:   "init",
	Short: "System initialization",

	// 设置只允许指定的参数
	ValidArgs: []string{"a", "c"},
	Args:      cobra.OnlyValidArgs,

	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("init Run")
		fmt.Println("init Args:", args)
	},
}
```

:::

输出结果

```bash
C:\Users\Administrator\GolandProjects\demo>go run main.go init
init Run
init Args: []

C:\Users\Administrator\GolandProjects\demo>go run main.go init a
init Run
init Args: [a]                             
                                           
C:\Users\Administrator\GolandProjects\demo>go run main.go init c
init Run
init Args: [c]                             
                                           
C:\Users\Administrator\GolandProjects\demo>go run main.go init b
Error: invalid argument "b" for "demo init"
Usage:
  demo init [flags]

Flags:
  -h, --help   help for init

invalid argument "b" for "demo init"exit status 1
```

<br />

#### （6）自定义参数校验

::: details 点击查看完整代码

`cmd/init/init.go`

```go
package init

import (
	"fmt"
	"github.com/spf13/cobra"
	"strings"
)

var Cmd = &cobra.Command{
	Use:   "init",
	Short: "System initialization",

	// 这里故意大写
	ValidArgs: []string{"A", "B"},

	// 自定义参数校验
	Args: func(cmd *cobra.Command, args []string) error {
		// 限制参数个数
		if err := cobra.RangeArgs(1, 1)(cmd, args); err != nil {
			return err
		}

		// 参数处理：全部转为小写,用于忽略参数大小写
		for k, v := range args {
			args[k] = strings.ToLower(v)
		}
		for k, v := range cmd.ValidArgs {
			cmd.ValidArgs[k] = strings.ToLower(v)
		}

		// 限制参数值范围
		if err := cobra.OnlyValidArgs(cmd, args); err != nil {
			return err
		}

		return nil
	},

	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("init Run")
		fmt.Println("init Args:", args)
	},
}
```

:::

输出结果

```bash
# (1) 仅支持1个参数
C:\Users\Administrator\GolandProjects\demo>go run main.go init 1 2 3
Error: accepts between 1 and 1 arg(s), received 3
Usage:                                    
  demo init [flags]                       
                                          
Flags:                                    
  -h, --help   help for init              
                                          
accepts between 1 and 1 arg(s), received 3exit status 1

# (2) 参数可选值: A或B
C:\Users\Administrator\GolandProjects\demo>go run main.go init A    
init Run
init Args: [a]

C:\Users\Administrator\GolandProjects\demo>go run main.go init B
init Run
init Args: [b]

C:\Users\Administrator\GolandProjects\demo>go run main.go init C
Error: invalid argument "c" for "demo init"
Usage:                      
  demo init [flags]         
                            
Flags:                      
  -h, --help   help for init

invalid argument "c" for "demo init"exit status 1

# (3) 忽略大小写
C:\Users\Administrator\GolandProjects\demo>go run main.go init a
init Run
init Args: [a]

C:\Users\Administrator\GolandProjects\demo>go run main.go init A
init Run
init Args: [a]
```

<br />

### 定制

#### （1）不显示`[flags]`

::: details 点击查看完整代码

`cmd/init/init.go`

```go
package init

import (
	"fmt"
	"github.com/spf13/cobra"
)

var Cmd = &cobra.Command{
	Use:                   "init",
	Short:                 "System initialization",
    // 不显示Usage中[flags]
	DisableFlagsInUseLine: true,
	PreRun: func(cmd *cobra.Command, args []string) {
		fmt.Println("[ init ] PreRun")
	},
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("[ init ] Run")
	},
	PostRun: func(cmd *cobra.Command, args []string) {
		fmt.Println("[ init ] PostRun")
	},
}
```

:::

输出结果

```bash
# DisableFlagsInUseLine: false （默认值）
C:\Users\Administrator\GolandProjects\demo>go run main.go init -h
System initialization

Usage:
  demo init [flags]

Flags:
  -h, --help   help for init
  
# DisableFlagsInUseLine: true
C:\Users\Administrator\GolandProjects\demo>go run main.go init -h
System initialization

Usage:                      
  demo init            # 注意这一行的区别
                            
Flags:                      
  -h, --help   help for init
```

<br />

#### （2）Version选项

```go
// 代码部分
var rootCmd = &cobra.Command{
	Use:   "demo",
	Short: shortMeesage,
	Long:  longMessage,
	Version: "v1.0.0",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("[ root ] Run")
	},
}

// 演示效果
C:\Users\Administrator\GolandProjects\demo>go run main.go -h

This is a very long text                                   
For details, please refer to https://github.com/spf13/cobra

Usage:                                                                  
  demo [flags]                                                          
  demo [command]
                                                                        
Available Commands:                                                     
  completion  Generate the autocompletion script for the specified shell
  help        Help about any command                                    
  init        System initialization                                     
                                                                        
Flags:                                                                  
  -h, --help      help for demo                                         
  -v, --version   version for demo
                                                                        
Use "demo [command] --help" for more information about a command.

C:\Users\Administrator\GolandProjects\demo>go run main.go -v     
demo version v1.0.0

C:\Users\Administrator\GolandProjects\demo>go run main.go --version
demo version v1.0.0
```

如上代码所示，只需要添加`Version`字段，即可自动添加`-v/--version`选项

看起来很美好，但是有以下几个问题：

* `-v/--version`选项不支持子命令使用，会报错
* 输出信息无法定制

<br />

改进后的版本

::: details 点击查看完整代码

`cmd/cobra.go`

```go
package cmd

import (
	initialize "demo/cmd/init"
	"fmt"
	"github.com/spf13/cobra"
	"os"
)

const (
	version      = "v1.0.0"
	shortMeesage = `Short message`
	longMessage  = `
This is a very long text
For details, please refer to https://github.com/spf13/cobra`
)

// (1) 初始化变量
var Version bool

var rootCmd = &cobra.Command{
	Use:   "demo",
	Short: shortMeesage,
	Long:  longMessage,

	// (3) PersistentPreRun
	PersistentPreRun: func(cmd *cobra.Command, args []string) {
		if Version {
			fmt.Println(version)
			os.Exit(0)
		}
	},
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("[ root ] Run")
	},
}

func init() {
	// 添加子命令
	rootCmd.AddCommand(initialize.Cmd)

	// (2) 添加一个持久标志（全局选项）
	rootCmd.PersistentFlags().BoolVarP(&Version, "version", "v", false, "version message")
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Fprintf(os.Stderr, err.Error())
		os.Exit(1)
	}
}
```

:::

输出效果

```bash
# 根命令帮助信息
C:\Users\Administrator\GolandProjects\demo>go run main.go -h

This is a very long text                                   
For details, please refer to https://github.com/spf13/cobra

Usage:                                                                  
  demo [flags]                                                          
  demo [command]                                                        
                                                                        
Available Commands:                                                     
  completion  Generate the autocompletion script for the specified shell
  help        Help about any command                                    
  init        System initialization                                     
                                                                        
Flags:                                                                  
  -h, --help      help for demo                                         
  -v, --version   version message                                       
                                                                        
Use "demo [command] --help" for more information about a command.

# 根命令查看版本
C:\Users\Administrator\GolandProjects\demo>go run main.go -v
v1.0.0

# 子命令帮助信息
C:\Users\Administrator\GolandProjects\demo>go run main.go init -h
System initialization

Usage:             
  demo init [flags]

Flags:
  -h, --help   help for init

Global Flags:
  -v, --version   version message

# 子命令执行和查看版本
C:\Users\Administrator\GolandProjects\demo>go run main.go init a 
init Run
init Args: [a]

C:\Users\Administrator\GolandProjects\demo>go run main.go init a -v
v1.0.0
```

<br />

#### （3）定制Help

**1、取消Help命令**

参考：[https://github.com/spf13/cobra/issues/587](https://github.com/spf13/cobra/issues/587)

::: details 点击查看完整代码

`cmd/cobra.go`

```go
// 代码
func init() {
	rootCmd.AddCommand(initialize.Cmd)
	rootCmd.SetHelpCommand(&cobra.Command{
		Use:    "no-help",
		Hidden: true,
	})
}

// 效果
C:\Users\Administrator\GolandProjects\demo>go run main.go -h

This is a very long text                                   
For details, please refer to https://github.com/spf13/cobra

Usage:                                                                  
  demo [flags]                                                          
  demo [command]                                                        
                                                                        
Available Commands:                                                     
  completion  Generate the autocompletion script for the specified shell
  init        System initialization                                     
                                                                        
Flags:                                                                  
  -h, --help      help for demo                                         
  -v, --version   version message                                       

Use "demo [command] --help" for more information about a command.

C:\Users\Administrator\GolandProjects\demo>go run main.go help init
Error: unknown command "help" for "demo"
Run 'demo --help' for usage.
unknown command "help" for "demo"exit status 1
```

:::

**2、升级为Global Flags**

::: details 点击查看完整代码

`cmd/cobra.go`

```go
// 代码
func init() {
	rootCmd.AddCommand(initialize.Cmd)

	rootCmd.PersistentFlags().BoolVarP(&Version, "version", "v", false, "version message")
	rootCmd.PersistentFlags().BoolP("help", "h", false, "help message")

	rootCmd.SetHelpCommand(&cobra.Command{
		Use:    "no-help",
		Hidden: true,
	})
}

// 效果
C:\Users\Administrator\GolandProjects\demo>go run main.go init -h
System initialization

Usage:
  demo init [flags]

Global Flags:
  -h, --help      help message
  -v, --version   version message

// 如果不显式绑定为持久标志，那么输出效果如下
C:\Users\Administrator\GolandProjects\demo>go run main.go init -h
System initialization

Usage:                      
  demo init [flags]         
                            
Flags:                      
  -h, --help   help for init

Global Flags:
  -v, --version   version message
```

:::

**3、终极大招：手写Help信息，非必要情况下最好不要使用**

::: details 点击查看完整代码

`cmd/cobra.go`

```go
package cmd

import (
	initialize "demo/cmd/init"
	"fmt"
	"github.com/spf13/cobra"
	"os"
)

const (
	version      = "v1.0.0"
	shortMeesage = `Short message`
	longMessage  = `
This is a very long text
For details, please refer to https://github.com/spf13/cobra`
	usage = `
This is a very long text
For details, please refer to https://github.com/spf13/cobra

Usage:
  demo [flags]
  demo [command]

Available Commands:
  completion  Generate the autocompletion script for the specified shell
  help        Help about any command

BASIC COMMANDS
  init          Initialize ipfs local configuration
  add <path>    Add a file to IPFS
  cat <ref>     Show IPFS object data
  get <ref>     Download IPFS objects
  ls <ref>      List links from an object
  refs <ref>    List hashes of links from an object
  
DATA STRUCTURE COMMANDS
  block         Interact with raw blocks in the datastore
  object        Interact with raw dag nodes
  files         Interact with objects as if they were a unix filesystem
  dag           Interact with IPLD documents (experimental)

Flags:                                                                  
  -h, --help      help for demo                                         
  -v, --version   version message                                       
                                                                        
Use "demo [command] --help" for more information about a command.`
)

var Version bool

var rootCmd = &cobra.Command{
	Use:   "demo",
	Short: shortMeesage,
	Long:  longMessage,

	PersistentPreRun: func(cmd *cobra.Command, args []string) {
		if Version {
			fmt.Println(version)
			os.Exit(0)
		}
	},
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("[ root ] Run")
	},
}

func init() {
	rootCmd.AddCommand(initialize.Cmd)
	rootCmd.PersistentFlags().BoolVarP(&Version, "version", "v", false, "version message")

	// 定制-h/--help帮助信息
	rootCmd.SetHelpFunc(func(command *cobra.Command, strings []string) {
		fmt.Fprintf(os.Stdout, usage)
	})
	// 定制出错时的帮助信息，比如输入一个不存在的选项
	rootCmd.SetUsageFunc(func(*cobra.Command) error {
		fmt.Fprintf(os.Stdout, usage)
		return nil
	})
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Fprintf(os.Stderr, err.Error())
		os.Exit(1)
	}
}
```

`cmd/init/init.go`

```go
package init

import (
	"fmt"
	"github.com/spf13/cobra"
	"os"
)

const usage = `
System initialization

Usage:
  demo init [flags]

Flags:
  -h, --help               help for init     
  -v, --version            version message

Cache Flags:
      --dir string         cache dir
      --max-age duration   cache ttl

Result Flags:
  -f, --filename string    filename
  -o, --output string      output format
`

var Cmd = &cobra.Command{
	Use:   "init",
	Short: "System initialization",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("init Run")
		fmt.Println("init Args:", args)
	},
}

func init() {
	// 定制-h/--help帮助信息
	Cmd.SetHelpFunc(func(command *cobra.Command, strings []string) {
		fmt.Fprintf(os.Stdout, usage)
	})
	// 定制出错时的帮助信息，比如输入一个不存在的选项
	Cmd.SetUsageFunc(func(*cobra.Command) error {
		fmt.Fprintf(os.Stdout, usage)
		return nil
	})
}
```

:::

输出结果

```bash
# 根命令帮助信息 --> 子命令分组
C:\Users\Administrator\GolandProjects\demo>go run main.go -h     

This is a very long text
For details, please refer to https://github.com/spf13/cobra

Usage:
  demo [flags]
  demo [command]                                                        

Available Commands:
  completion  Generate the autocompletion script for the specified shell
  help        Help about any command

BASIC COMMANDS
  init          Initialize ipfs local configuration
  add <path>    Add a file to IPFS
  cat <ref>     Show IPFS object data                                   
  get <ref>     Download IPFS objects                                   
  ls <ref>      List links from an object                               
  refs <ref>    List hashes of links from an object                     

DATA STRUCTURE COMMANDS
  block         Interact with raw blocks in the datastore
  object        Interact with raw dag nodes
  files         Interact with objects as if they were a unix filesystem
  dag           Interact with IPLD documents (experimental)

Flags:
  -h, --help      help for demo
  -v, --version   version message

Use "demo [command] --help" for more information about a command.

# init子命令帮助信息 --> 选项分组
C:\Users\Administrator\GolandProjects\demo>go run main.go init -h

System initialization

Usage:
  demo init [flags]

Flags:
  -h, --help               help for init
  -v, --version            version message

Cache Flags:
      --dir string         cache dir
      --max-age duration   cache ttl

Result Flags:
  -f, --filename string    filename
  -o, --output string      output format

# 对于报错信息
C:\Users\Administrator\GolandProjects\demo>go run main.go init -a   
Error: unknown shorthand flag: 'a' in -a

System initialization

Usage:
  demo init [flags]

Flags:
  -h, --help               help for init
  -v, --version            version message

Cache Flags:
      --dir string         cache dir
      --max-age duration   cache ttl

Result Flags:
  -f, --filename string    filename
  -o, --output string      output format

unknown shorthand flag: 'a' in -aexit status 1
```

<br />

## Viper

Github：[https://github.com/spf13/viper](https://github.com/spf13/viper)

### 安装

```bash
go get github.com/spf13/viper
```

<br />

### 从文件中读取配置

#### 1）单路径搜索

:::tip

以下代码会从**当前目录**下读取`config.yaml`文件，当前目录指得是：

执行命令时所在的目录，而不是命令所在的目录，所以也就意味着当执行命令时，我们的配置文件是非固定的，随着执行目录变化而变化

:::

::: details 点击查看完整代码

`config.yaml`

```yaml
database:
  driver: mysql
  host: 127.0.0.1
  port: 3306
  username: blog
  dbname: blog
  password: 123456
```

`main.go`

```go
package main

import (
	"fmt"
	"github.com/spf13/viper"
	"log"
)

func main() {
	// 设置配置文件路径
	viper.SetConfigFile("config.yaml")

	// 读取配置文件
	if err := viper.ReadInConfig(); err != nil {
		log.Fatalln(err)
	}

	// 获取值
	fmt.Println(viper.Get("database.port"))
}
```

输出结果

```bash
3306
```

:::

<br />

#### 2）多路径搜索

::: details 避坑指南

`config.json`（当前项目目录下）

```json
{
  "database": {
    "port": 3307
  }
}
```

`/etc/config.yaml`

```yaml
database:
  driver: mysql
  host: 127.0.0.1
  port: 3306
  username: blog
  dbname: blog
  password: 123456
```

`main.go`

```go
package main

import (
	"fmt"
	"github.com/spf13/viper"
	"log"
)

func main() {
	// 设置配置文件
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
    
	// 添加搜索路径，按添加顺序搜索
	viper.AddConfigPath(".")           // 首先添加当前目录，默认不会搜索当前目录
	viper.AddConfigPath("$HOME/.demo") // 其次添加家目录
	viper.AddConfigPath("/etc")        // 最后添加etc目录

	// 读取配置文件
	if err := viper.ReadInConfig(); err != nil {
		log.Fatalln(err)
	}

	// 获取值
	fmt.Println(viper.Get("database.port"))
	fmt.Println("当前正在使用的配置文件: ", viper.ConfigFileUsed())
}
```

**输出结果**

```bash
3307
当前正在使用的配置文件:  /root/demo/config.json
```

<br />

**发现问题**

我们指定了YAML格式的配置文件，怎么读取到`config.json`了？



**查看相关源码**

```go
// SetConfigType sets the type of the configuration returned by the
// remote source, e.g. "json".
// 上面的意思是：指定远程配置文件的类型，比如从etcd、consul等读取配置，而我们想当然的认为指定的是扩展名是错误的
func SetConfigType(in string) { v.SetConfigType(in) }

func (v *Viper) SetConfigType(in string) {
	if in != "" {
		v.configType = in
	}
}

// 查看路径搜索源码
var SupportedExts = []string{"json", "toml", "yaml", "yml", "properties", "props", "prop", "hcl", "tfvars", "dotenv", "env", "ini"}
var SupportedRemoteProviders = []string{"etcd", "etcd3", "consul", "firestore"}

func (v *Viper) searchInPath(in string) (filename string) {
	v.logger.Debug("searching for config in path", "path", in)
	for _, ext := range SupportedExts {
		v.logger.Debug("checking if file exists", "file", filepath.Join(in, v.configName+"."+ext))
        // 【 路径 + configName + "." + 扩展名 】 组成的配置文件，一旦找到便返回
		if b, _ := exists(v.fs, filepath.Join(in, v.configName+"."+ext)); b {
			v.logger.Debug("found file", "file", filepath.Join(in, v.configName+"."+ext))
			return filepath.Join(in, v.configName+"."+ext)
		}
	}

    // 当configType不为空时，且 【路径+configName】存在时，则返回【路径+configName】
	if v.configType != "" {
		if b, _ := exists(v.fs, filepath.Join(in, v.configName)); b {
			return filepath.Join(in, v.configName)
		}
	}

	return ""
}
```

**解决办法1**

```go
// 配置文件指定上扩展名，同时设置配置文件类型，这样就走上面的第二段代码，返回 【路径 + 配置文件】
viper.SetConfigName("config.yaml")
viper.SetConfigType("yaml")

// 这个代码看起来有点奇怪
```

**解决办法2**

```go
// 指定真正所使用的扩展名，可以写一个或多个，前面的扩展名优先被匹配
viper.SetConfigName("config")
viper.SupportedExts = []string{"yaml"}
```

**修正完以后查看输出结果**

```bash
3306
当前正在使用的配置文件:  /etc/config.yaml
```

:::

<br />

#### 3）设置默认值

::: details 点击查看完整代码

```go
package main

import (
        "fmt"
        "github.com/spf13/viper"
        "log"
)

func main() {
        // 设置配置文件
        viper.SetConfigName("config")
        viper.SupportedExts = []string{"yaml"}

        // 添加搜索路径，按添加顺序搜索
        viper.AddConfigPath(".")
        viper.AddConfigPath("$HOME/.demo")
        viper.AddConfigPath("/etc")

        // 设置默认值, database.port1是一个不存在的key
        viper.SetDefault("database.port1", "12345")

        // 读取配置文件
        if err := viper.ReadInConfig(); err != nil {
                log.Fatalln(err)
        }

        // 获取值
        fmt.Println(viper.Get("database.port1"))
        fmt.Println("当前正在使用的配置文件: ", viper.ConfigFileUsed())
}
```

:::

输出结果

```bash
[root@localhost demo]# go run main.go
12345
当前正在使用的配置文件:  /etc/config.yaml
```

<br />

#### 4）实时读取配置

::: details 点击查看完整代码

```go
package main

import (
        "fmt"
        "github.com/fsnotify/fsnotify"
        "github.com/spf13/viper"
        "log"
        "time"
)

func main() {
        // 设置配置文件
        viper.SetConfigName("config")
        viper.SupportedExts = []string{"yaml"}

        // 添加搜索路径，按添加顺序搜索
        viper.AddConfigPath(".")
        viper.AddConfigPath("$HOME/.demo")
        viper.AddConfigPath("/etc")

        // 读取配置文件
        if err := viper.ReadInConfig(); err != nil {
                log.Fatalln(err)
        }

        // 监听配置文件变化，需要注意的是：
        // 1）一旦找到某个配置文件，只会监听这一个配置文件，对它进行改名等也不会自动寻找其他配置文件
        // 2)对已经读取过的配置文件改名，不会影响到继续读取配置
        viper.OnConfigChange(func(e fsnotify.Event) {
                fmt.Println("Config file changed:", e.Name)
        })
        viper.WatchConfig()

        // 获取值
        for {
                fmt.Println(viper.Get("database.port"))
                time.Sleep(time.Second)
        }
}
```

:::

输出结果

```bash
[root@localhost demo]# go run main.go
3306
3306
3306
3306
Config file changed: /etc/config.yaml
Config file changed: /etc/config.yaml
3308
3308
3308
```

<br />

#### 5）写入配置文件

::: details WriteConfigAs / SafeWriteConfigAs

```go
package main

import (
	"github.com/spf13/viper"
	"log"
)

var err error

func main() {
	viper.Set("Host", "127.0.0.1")
	viper.Set("Port", 80)
	viper.Set("UserName", "root")
	viper.Set("Password", "qaz.123")

	// 覆盖写入配置文件（若配置文件存在会覆盖）
	err = viper.WriteConfigAs("./a.yaml")
	if err != nil {
		log.Fatalln("[ 1 ] " + err.Error())
	}

	// 安全写入配置文件（若配置文件存在会报错）
	err = viper.SafeWriteConfigAs("./a.yaml")
	if err != nil {
		log.Fatalln("[ 2 ] " + err.Error())
	}
}
```

输出结果

```bash
2022/09/04 16:04:02 [ 2 ] Config File "./a.yaml" Already Exists
```

:::

::: details WriteConfig/ SafeWriteConfig

`config.yaml`

```yaml
database:
    dbname: blog
    host: 192.168.100.20
    password: qaz.123
    port: 3306
    username: root
```

`main.go`

```go
package main

import (
	"github.com/spf13/viper"
	"log"
)

var err error

func main() {
	// 设置配置文件
	viper.SetConfigName("config")
    viper.SupportedExts = []string{"yaml"}
	viper.AddConfigPath(".")
	viper.AddConfigPath("$HOME")

	// 读取配置文件
	if err := viper.ReadInConfig(); err != nil {
		log.Fatalln(err)
	}

	// 设置新的值
	viper.Set("database.port", 12345)

	// 覆盖写入配置文件
	err = viper.WriteConfig()
	if err != nil {
		log.Fatalln("[ 1 ] " + err.Error())
	}

	// 安全写入配置文件
	err = viper.SafeWriteConfig()
	if err != nil {
		log.Fatalln("[ 2 ] " + err.Error())
	}
}
```

输出结果

```bash
2022/09/04 16:09:04 [ 2 ] Config File "C:\\Users\\Administrator\\GolandProjects\\demo\\config.yaml" Already Exists
```

:::

<br />

### 从其他位置读取配置

#### 1）io.Reader

::: details 点击查看完整代码

```go
package main

import (
	"bytes"
	"fmt"
	"github.com/spf13/viper"
	"log"
)

func main() {
	// 设置配置
	viper.SetConfigType("yaml")
	var yamlExample = []byte(`
Hacker: true
name: steve
hobbies:
- skateboarding
- snowboarding
- go
clothing:
  jacket: leather
  trousers: denim
age: 35
eyes : brown
beard: true
`)

	// 读取配置
	if err := viper.ReadConfig(bytes.NewBuffer(yamlExample)); err != nil {
		log.Fatalln(err)
	}

	// 获取值
	fmt.Println(viper.Get("name"))
}
```

输出结果

```bash
steve
```

:::

<br />

#### 2）环境变量

说明：

* `viper`并不会直接读取环境变量，而是会用到一个中间变量，我们大多数都在操作这个中间变量
* 1个中间变量可以对应1个或多个环境变量
* 环境变量不区分大小写

::: details SetEnvPrefix 和 BindEnv

```go
package main

import (
	"fmt"
	"github.com/spf13/viper"
	"log"
	"os"
)

func main() {
	// 设置环境变量
	if err := os.Setenv("ID", "12"); err != nil {
		log.Fatalln(err)
	}
	if err := os.Setenv("SPF_ID", "13"); err != nil {
		log.Fatalln(err)
	}
	if err := os.Setenv("TEST_ID", "15"); err != nil {
		log.Fatalln(err)
	}

	// ------------------------------------------------------------------
	// 设置环境变量前缀,如果多次设置后面的会覆盖前面的
	viper.SetEnvPrefix("spf")

	// 提供了一个参数(中间变量)，这会组合出环境变量，格式是:
	//   设置了前缀的情况下: 前缀_中间变量,即 SPF_ID
	//   未设置前缀的情况下: 中间变量，即ID
	if err := viper.BindEnv("id"); err != nil {
		log.Fatalln(err)
	}

	// ------------------------------------------------------------------

	// 提供两个或多个参数，中间变量、环境变量...
	if err := viper.BindEnv("id", "TEST_ID"); err != nil {
		log.Fatalln(err)
	}

	// ------------------------------------------------------------------

	// 获取值（中间变量）
	fmt.Println(viper.Get("id"))
}
```

输出结果

```bash
13
```

:::

::: details SetEnvPrefix 和 AutomaticEnv

```go
package main

import (
	"fmt"
	"github.com/spf13/viper"
	"log"
	"os"
)

func main() {
	// 设置环境变量
	if err := os.Setenv("ID", "12"); err != nil {
		log.Fatalln(err)
	}
	if err := os.Setenv("SPF_ID", "13"); err != nil {
		log.Fatalln(err)
	}
	if err := os.Setenv("TEST_ID", "15"); err != nil {
		log.Fatalln(err)
	}

	// ------------------------------------------------------------------
	// 设置环境变量前缀,如果多次设置后面的会覆盖前面的
	viper.SetEnvPrefix("spf")

	// 自动匹配
	// 1) 若设置了前缀，匹配规则: 前缀_中间变量
	// 2) 若没有设置前缀，匹配规则：中间变量
	viper.AutomaticEnv()

	// ------------------------------------------------------------------

	// 获取值（中间变量）
	fmt.Println(viper.Get("id"))
}
```

输出结果

```bash
13
```

:::

<br />

#### 3）命令行

::: details 点击查看完整代码

`main.go`

```go
package main

import (
	"demo/cmd"
	"fmt"
	"github.com/spf13/viper"
)

func main() {
	cmd.Execute()
	fmt.Println("[ Viper ] Host: ", viper.Get("host"))
	fmt.Println("[ Viper ] Port: ", viper.Get("port"))
}
```

`cmd/cobra.go`

```go
package cmd

import (
	"fmt"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	"log"
	"os"
)

var (
	Host string
	Port string
)

var rootCmd = &cobra.Command{
	Use:   "demo",
	Short: "Short message",
	Long:  `Long message`,

	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("[ root ] Run")
		fmt.Println("[ root ] Host:", Host)
		fmt.Println("[ root ] Port:", Port)
	},
}

func init() {
	rootCmd.Flags().StringVarP(&Host, "host", "", "1.1.1.1", "host")
	rootCmd.Flags().StringVarP(&Port, "port", "", "80", "port")

	// 绑定配置
	if err := viper.BindPFlag("host", rootCmd.Flags().Lookup("host")); err != nil {
		log.Fatalln(err)
	}
	if err := viper.BindPFlag("port", rootCmd.Flags().Lookup("port")); err != nil {
		log.Fatalln(err)
	}
	viper.SetDefault("host", "127.0.0.1")
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Fprintf(os.Stderr, err.Error())
		os.Exit(1)
	}
}
```

:::

输出结果

```bash
C:\Users\Administrator\GolandProjects\demo>go run main.go --host 192.168.1.1 --port 12345
[ root ] Run
[ root ] Host: 192.168.1.1  
[ root ] Port: 12345        
[ Viper ] Host:  192.168.1.1
[ Viper ] Port:  12345

C:\Users\Administrator\GolandProjects\demo>go run main.go                   
[ root ] Run
[ root ] Host: 1.1.1.1
[ root ] Port: 80
[ Viper ] Host:  127.0.0.1
[ Viper ] Port:  80
```

<br />

### 优先级

按照优先级**从高到底**排序：

1. `viper.Set(key string, value interface{})`设置的值
2. **命令行**（`Flag`）中读取的值
3. **环境变量**中读取的值
4. **配置文件**中读取的值
5. **远程Key/Value存储**中读取的值
6. **默认值**

<br />

### 获取值

#### 1）Get*系列函数

（1）自动转换类型

若key存在则返回value，自动转为合适的类型，比如值为80会转为int类型，true会转为bool类型

若key不存在则会返回nil，类型也为nil

- `Get(key string) : interface{}`

<br />

（2）返回指定的类型

若key存在，若value能转为对应类型则返回，若不能转为对应类型则返回零值

若key不存在则返回零值

- `GetBool(key string) : bool`
- `GetFloat64(key string) : float64`
- `GetInt(key string) : int`
- `GetIntSlice(key string) : []int`
- `GetString(key string) : string`
- `GetStringMap(key string) : map[string]interface{}`
- `GetStringMapString(key string) : map[string]string`
- `GetStringSlice(key string) : []string`
- `GetTime(key string) : time.Time`
- `GetDuration(key string) : time.Duration`

<br />

（3）`viper.IsSet`检查key是否存在，但是它并不会检查cobra设置的默认值，除非我们再使用`viper.SetDefault`显式设置一遍

- `IsSet(key string) : bool`

<br />

获取所有配置

- `AllSettings() : map[string]interface{}`

::: details 点击查看完整代码

`main.go`

```go
package main

import (
	"demo/cmd"
	"fmt"
	"github.com/spf13/viper"
)

func main() {
	cmd.Execute()

	// Get获取Key
	fmt.Println("Get | Key  存在:",
		fmt.Sprint(viper.Get("host")),
		fmt.Sprintf("%T", viper.Get("host")),
	)
	fmt.Println("Get | Key不存在:",
		fmt.Sprint(viper.Get("non-key")),
		fmt.Sprintf("%T", viper.Get("non-key")),
	)
	fmt.Println()

	// GetInt获取Key
	fmt.Println("GetInt | Key  存在 | Value为Int类型   :",
		fmt.Sprint(viper.GetInt("port")),
		fmt.Sprintf("%T", viper.GetInt("port")),
	)
	fmt.Println("GetInt | Key  存在 | Value为String类型:",
		fmt.Sprint(viper.GetInt("host")),
		fmt.Sprintf("%T", viper.GetInt("host")),
	)
	fmt.Println("GetInt | Key不存在                    :",
		fmt.Sprint(viper.GetInt("non-key")),
		fmt.Sprintf("%T", viper.GetInt("non-key")),
	)
	fmt.Println()

	// IsSet检测Key是否显示设置
	//   viper.Set/SetDefault设置的值	返回true
	//   通过命令行传递的值				返回true
	//   通过cobra设置的默认值				返回false
	fmt.Println("IsSet | Key  存在:", viper.IsSet("verbose"))
	fmt.Println("IsSet | Key不存在:", viper.IsSet("non-key"))
	fmt.Println()

	// 获取所有配置
	fmt.Println("AllSettings: ")
	for k, v := range viper.AllSettings() {
		fmt.Print(k, "  ==>  ", v)
		fmt.Println()
	}
}
```

`cmd/cobra.go`

```go
package cmd

import (
	"fmt"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	"log"
	"os"
)

var (
	Host    string
	Port    int
	Verbose bool
)

var rootCmd = &cobra.Command{
	Use:   "demo",
	Short: "Short message",
	Long:  `Long message`,

	Run: func(cmd *cobra.Command, args []string) {
	},
}

func init() {
	rootCmd.Flags().StringVarP(&Host, "host", "", "127.0.0.1", "host")
	rootCmd.Flags().IntVarP(&Port, "port", "", 80, "port")
	rootCmd.Flags().BoolVarP(&Verbose, "verbose", "", true, "verbose")

	// 绑定配置（若未配置会自动使用上面的默认值）
	if err := viper.BindPFlag("host", rootCmd.Flags().Lookup("host")); err != nil {
		log.Fatalln(err)
	}
	if err := viper.BindPFlag("port", rootCmd.Flags().Lookup("port")); err != nil {
		log.Fatalln(err)
	}
	if err := viper.BindPFlag("verbose", rootCmd.Flags().Lookup("verbose")); err != nil {
		log.Fatalln(err)
	}

	// 这里设置与否，viper都能正确获取到值
	// 如果没有设置这里，并且命令行不传对应选项的话，使用viper.IsSet会返回false
	//viper.SetDefault("host", rootCmd.Flags().Lookup("host").Value)
	//viper.SetDefault("port", rootCmd.Flags().Lookup("port").Value)
	//viper.SetDefault("verbose", rootCmd.Flags().Lookup("verbose").Value)
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Fprintf(os.Stderr, err.Error())
		os.Exit(1)
	}
}
```

:::

输出结果

```bash
# 直接执行
C:\Users\Administrator\GolandProjects\demo>go run main.go
Get | Key  存在: 127.0.0.1 string
Get | Key不存在: <nil> <nil>

GetInt | Key  存在 | Value为Int类型    : 80 int
GetInt | Key  存在 | Value为String类型 : 0 int   # !
GetInt | Key不存在                    : 0 int

IsSet | Key  存在: false # !
IsSet | Key不存在: false

AllSettings:
host  ==>  127.0.0.1
port  ==>  80
verbose  ==>  true

# 传递参数
C:\Users\Administrator\GolandProjects\demo>go run main.go --verbose       
Get | Key  存在: 127.0.0.1 string
Get | Key不存在: <nil> <nil>

GetInt | Key  存在 | Value为Int类型   : 80 int
GetInt | Key  存在 | Value为String类型: 0 int
GetInt | Key不存在                    : 0 int

IsSet | Key  存在: true  # !
IsSet | Key不存在: false

AllSettings:
verbose  ==>  true
host  ==>  127.0.0.1
port  ==>  80
```

<br />

#### 2）提取子树

::: details 点击查看完整代码

`config.yaml`

```yaml
cache:
  cache1:
    max-items: 100
    item-size: 64
  cache2:
    max-items: 200
    item-size: 80
```

`main.go`

```go
package main

import (
	"fmt"
	"github.com/spf13/viper"
	"log"
)

func main() {
	// 设置配置文件
	viper.SetConfigFile("config.yaml")

	// 读取配置文件
	if err := viper.ReadInConfig(); err != nil {
		log.Fatalln(err)
	}

	// 提取子树
	vp := viper.Sub("cache.cache2")  // 返回*viper实例
	fmt.Println(vp.Get("max-items"))
}
```

:::

输出结果

```bash
200
```

<br />

#### 3）解码到结构体

:::tip

只会解码一致的部分

:::

::: details 点击查看完整代码

`config.yaml`

```yaml
database:
  host: 192.168.100.20
  port: 3306
  username: root
  password: qaz.123
  dbname: blog
```

`main.go`

```go
package main

import (
	"fmt"
	"github.com/spf13/viper"
	"log"
)

type Config struct {
	Host     string
	Port     int
	Username string
	Password string
	Dbname   string
}

func main() {
	// 设置配置文件
	viper.SetConfigFile("config.yaml")

	// 读取配置文件
	if err := viper.ReadInConfig(); err != nil {
		log.Fatalln(err)
	}

	// 映射到结构体，注意：结构体首字母需要大写
	var config Config
	if err := viper.Sub("database").Unmarshal(&config); err != nil {
		log.Fatalln(err)
	}
	fmt.Println(config.Host)
	fmt.Println(config.Port)
	fmt.Println(config.Username)
	fmt.Println(config.Password)
	fmt.Println(config.Dbname)
}
```

:::

输出结果

```bash
192.168.100.20
3306   
root   
qaz.123
blog
```

<br />

#### 4）自定义解码

待补充

<br />

## Zap

Github：[https://github.com/uber-go/zap](https://github.com/uber-go/zap)



### 安装

```bash
go get -u go.uber.org/zap
```

<br />

### 默认的Logger

```go
package main

import (
	"go.uber.org/zap"
	"time"
)

func main() {
	// 提供不同默认参数的3种Logger
	proLogger, _ := zap.NewProduction()
	devLogger, _ := zap.NewDevelopment()
	exampleLogger := zap.NewExample()

	// 打印一下日志看看效果
	proLogger.Info("Hello World!")
	devLogger.Info("Hello World!")
	exampleLogger.Info("Hello World!")

	// 默认这3种日志是不能打印非结构化数据的，以下3条语句编译会报错
	//proLogger.Info(time.Now())
	//devLogger.Info(time.Now())
	//exampleLogger.Info(time.Now())

	// Logger分为两种：
	//   Logger: 性能最好，但是只支持结构化数据，使用不太方便
	//   SugaredLogger: 比Logger性能差，比标准库或第三方日志库性能要好，支持非结构化数据，使用较方便
	sugarlogger := proLogger.Sugar()  // Logger转SugaredLogger
	sugarlogger.Info(time.Now())      // 输出非结构化日志
	proLogger = sugarlogger.Desugar() // SugaredLogger转Logger
}
```

输出结果

```bash
C:\Users\Administrator\GolandProjects\demo>go run main.go
{"level":"info","ts":1663367983.4938114,"caller":"demo/main.go:15","msg":"Hello World!"}
2022-09-17T06:39:43.493+0800    INFO    demo/main.go:16 Hello World!                                                           
{"level":"info","msg":"Hello World!"}
{"level":"info","ts":1663367983.508526,"caller":"demo/main.go:28","msg":"2022-09-17 06:39:43.5085261 +0800 CST m=+0.018391001"}
```

<br />

### 自定义Logger

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"os"
	"time"
)

func getEncoer() zapcore.Encoder {
	// 使用预设的ProductionEncoder配置初始化encoder，并作一些修改
	encoderConfig := zap.NewProductionEncoderConfig()
	encoderConfig.ConsoleSeparator = " "
	encoderConfig.EncodeTime = func(t time.Time, enc zapcore.PrimitiveArrayEncoder) {
		enc.AppendString(t.Format("2006-01-02 15:04:05.000"))
	}
	encoderConfig.EncodeLevel = func(level zapcore.Level, enc zapcore.PrimitiveArrayEncoder) {
		enc.AppendString(fmt.Sprintf("[ %-5s ]", level.CapitalString()))
	}
	encoder := zapcore.NewConsoleEncoder(encoderConfig)
	return encoder
}

func getWriteSyncer() zapcore.WriteSyncer {
	file, err := os.OpenFile("./test.log", os.O_CREATE|os.O_APPEND|os.O_WRONLY, os.ModePerm)
	if err != nil {
		panic(err)
	}
	fileHandler := zapcore.AddSync(file)
	stdoutHandler := zapcore.AddSync(os.Stdout)
	writeSyncer := zapcore.NewMultiWriteSyncer(fileHandler, stdoutHandler)
	return writeSyncer
}

func main() {
	// 初始化core
	encoder := getEncoer()
	writeSyncer := getWriteSyncer()
	core := zapcore.NewCore(encoder, writeSyncer, zapcore.DebugLevel)

	// 初始化logger
	logger := zap.New(core, zap.AddCaller()).Sugar()

	// 输出日志
	logger.Debug("Hello World!")
	logger.Info("Hello World!")
	logger.Warn("Hello World!")
	logger.Error("Hello World!")
	logger.Panic("Hello World!")
}
```

:::

输出结果

```bash
C:\Users\Administrator\GolandProjects\demo>go run main.go
2022-09-17 08:31:15.933 [ DEBUG ] demo/main.go:46 Hello World!
2022-09-17 08:31:15.947 [ INFO  ] demo/main.go:47 Hello World!
2022-09-17 08:31:15.949 [ WARN  ] demo/main.go:48 Hello World!
2022-09-17 08:31:15.949 [ ERROR ] demo/main.go:49 Hello World!
2022-09-17 08:31:15.949 [ PANIC ] demo/main.go:50 Hello World!
panic: Hello World!

goroutine 1 [running]:
go.uber.org/zap/zapcore.CheckWriteAction.OnWrite(0x0?, 0x0?, {0x0?, 0x0?, 0xc000054560?})
        D:/application/GoPath/pkg/mod/go.uber.org/zap@v1.23.0/zapcore/entry.go:198 +0x65
go.uber.org/zap/zapcore.(*CheckedEntry).Write(0xc000024c30, {0x0, 0x0, 0x0})
        D:/application/GoPath/pkg/mod/go.uber.org/zap@v1.23.0/zapcore/entry.go:264 +0x3ec
go.uber.org/zap.(*SugaredLogger).log(0xc000109e98, 0x4, {0x0?, 0x0?}, {0xc000109ea0?, 0x1?, 0x1?}, {0x0, 0x0, 0x0})
        D:/application/GoPath/pkg/mod/go.uber.org/zap@v1.23.0/sugar.go:287 +0xee
go.uber.org/zap.(*SugaredLogger).Panic(...)
        D:/application/GoPath/pkg/mod/go.uber.org/zap@v1.23.0/sugar.go:145
main.main()
        C:/Users/Administrator/GolandProjects/demo/main.go:50 +0x350                                               
exit status 2
```

<br />

### 合并多个Core

假设我们需要做一些差异化配置，比如终端的日志级别为Debug，而文件的日志级别为WARN，

这时可以生成多个Core，然后再进行合并Core操作

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"os"
	"time"
)

func getEncoer() zapcore.Encoder {
	// 使用预设的ProductionEncoder配置初始化encoder，并作一些修改
	encoderConfig := zap.NewProductionEncoderConfig()
	encoderConfig.ConsoleSeparator = " "
	encoderConfig.EncodeTime = func(t time.Time, enc zapcore.PrimitiveArrayEncoder) {
		enc.AppendString(t.Format("2006-01-02 15:04:05.000"))
	}
	encoderConfig.EncodeLevel = func(level zapcore.Level, enc zapcore.PrimitiveArrayEncoder) {
		enc.AppendString(fmt.Sprintf("[ %-5s ]", level.CapitalString()))
	}
	encoder := zapcore.NewConsoleEncoder(encoderConfig)
	return encoder
}

func getFileWriteSyncer() zapcore.WriteSyncer {
	file, err := os.OpenFile("./test.log", os.O_CREATE|os.O_APPEND|os.O_WRONLY, os.ModePerm)
	if err != nil {
		panic(err)
	}
	fileHandler := zapcore.AddSync(file)
	writeSyncer := zapcore.NewMultiWriteSyncer(fileHandler)
	return writeSyncer
}

func getConsoleWriteSyncer() zapcore.WriteSyncer {
	stdoutHandler := zapcore.AddSync(os.Stdout)
	writeSyncer := zapcore.NewMultiWriteSyncer(stdoutHandler)
	return writeSyncer
}

func main() {
	// 初始化core
	encoder := getEncoer()
	core := zapcore.NewTee(
		zapcore.NewCore(encoder, getConsoleWriteSyncer(), zapcore.DebugLevel),
		zapcore.NewCore(encoder, getFileWriteSyncer(), zapcore.WarnLevel),
	)

	// 初始化logger
	logger := zap.New(core, zap.AddCaller()).Sugar()

	// 输出日志
	logger.Debug("Hello World!")
	logger.Info("Hello World!")
	logger.Warn("Hello World!")
	logger.Error("Hello World!")
	logger.Panic("Hello World!")
}
```

:::

<br />

### 日志切割方案

lumberjack：[https://github.com/natefinch/lumberjack](https://github.com/natefinch/lumberjack)

**安装**

```bash
go get gopkg.in/natefinch/lumberjack.v2
go: added gopkg.in/natefinch/lumberjack.v2 v2.0.0
```

**使用**

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"gopkg.in/natefinch/lumberjack.v2"
	"os"
	"time"
)

func getEncoer() zapcore.Encoder {
	// 使用预设的ProductionEncoder配置初始化encoder，并作一些修改
	encoderConfig := zap.NewProductionEncoderConfig()
	encoderConfig.ConsoleSeparator = " "
	encoderConfig.EncodeTime = func(t time.Time, enc zapcore.PrimitiveArrayEncoder) {
		enc.AppendString(t.Format("2006-01-02 15:04:05.000"))
	}
	encoderConfig.EncodeLevel = func(level zapcore.Level, enc zapcore.PrimitiveArrayEncoder) {
		enc.AppendString(fmt.Sprintf("[ %-5s ]", level.CapitalString()))
	}
	encoder := zapcore.NewConsoleEncoder(encoderConfig)
	return encoder
}

func getFileWriteSyncer() zapcore.WriteSyncer {
	lumberJackLogger := &lumberjack.Logger{
		Filename:   "./test.log", // 日志文件
		MaxSize:    10,           // 日志文件的最大大小(单位为MB)
		MaxBackups: 5,            // 保留旧文件的最大个数
		MaxAge:     30,           // 保留旧文件的最大时长(单位为天)
		Compress:   false,        // 是否压缩/归档旧文件
	}
	fileHandler := zapcore.AddSync(lumberJackLogger)
	writeSyncer := zapcore.NewMultiWriteSyncer(fileHandler)
	return writeSyncer
}

func getConsoleWriteSyncer() zapcore.WriteSyncer {
	stdoutHandler := zapcore.AddSync(os.Stdout)
	writeSyncer := zapcore.NewMultiWriteSyncer(stdoutHandler)
	return writeSyncer
}

func main() {
	// 初始化core
	encoder := getEncoer()
	core := zapcore.NewTee(
		zapcore.NewCore(encoder, getConsoleWriteSyncer(), zapcore.DebugLevel),
		zapcore.NewCore(encoder, getFileWriteSyncer(), zapcore.WarnLevel),
	)

	// 初始化logger
	logger := zap.New(core, zap.AddCaller()).Sugar()

	// 输出日志
	logger.Debug("Hello World!")
	logger.Info("Hello World!")
	logger.Warn("Hello World!")
	logger.Error("Hello World!")
	logger.Panic("Hello World!")
}
```

:::

<br />

## Gorm

Github：[https://github.com/go-gorm/gorm](https://github.com/go-gorm/gorm)

文档：[https://gorm.io/zh_CN/docs/](https://gorm.io/zh_CN/docs/)

### 安装

```bash
go get -u gorm.io/gorm
go get -u gorm.io/driver/sqlite
go get -u gorm.io/driver/mysql
```

<br />

### 数据库版本

```bash
mysql> status;
--------------
mysql  Ver 8.0.30 for Linux on x86_64 (MySQL Community Server - GPL)

Connection id:          15
Current database:       demo
Current user:           root@192.168.48.133
SSL:                    Cipher in use is ECDHE-RSA-AES128-GCM-SHA256
Current pager:          stdout
Using outfile:          ''
Using delimiter:        ;
Server version:         8.0.30 MySQL Community Server - GPL
Protocol version:       10
Connection:             192.168.48.133 via TCP/IP
Server characterset:    utf8mb4
Db     characterset:    utf8mb4
Client characterset:    utf8mb4
Conn.  characterset:    utf8mb4
TCP port:               3306
Binary data as:         Hexadecimal
Uptime:                 1 hour 1 min 41 sec

Threads: 2  Questions: 82  Slow queries: 0  Opens: 205  Flush tables: 3  Open tables: 124  Queries per second avg: 0.022
--------------
```

<br />

### 连接数据库

DSN格式：[https://github.com/go-sql-driver/mysql#dsn-data-source-name](https://github.com/go-sql-driver/mysql#dsn-data-source-name)

::: details 连接MySQL

```go
package main

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func getDB() (*gorm.DB, error) {
	username := "root"
	password := "QiNqg[l.%;H>>rO9"
	host := "192.168.48.133"
	port := 3306
	dbName := "demo"
	charSet := "utf8mb4"
	conntimeout := "5s"
	readTimeout := "10s"
	writeTimeout := "10s"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=True&loc=Local&charset=%s&timeout=%s&readTimeout=%s&writeTimeout=%s",
		username,
		password,
		host,
		port,
		dbName,
		charSet,
		conntimeout,
		readTimeout,
		writeTimeout,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	return db, err
}

func main() {
	db, err := getDB()
	if err != nil {
		panic(err)
	}
	fmt.Printf("%T\n", db)
	fmt.Printf("%#v\n", db)
}
```

输出结果

```bash
*gorm.DB
&gorm.DB{Config:(*gorm.Config)(0xc0001c4240), Error:error(nil), RowsAffected:0, Statement:(*gorm.Statement)(0xc0001d0380), clone:1}
```

:::

<br />

### 定义模型

文档：

* 定义模型：[https://gorm.io/zh_CN/docs/models.html](https://gorm.io/zh_CN/docs/models.html)
* 约定大于配置：[https://gorm.io/zh_CN/docs/conventions.html](https://gorm.io/zh_CN/docs/conventions.html)

::: details 嵌入gorm.Model和其他结构体

```go
type User1 struct {
	gorm.Model
	Name string
}

// 等效于
type User2 struct {
	ID        uint `gorm:"primaryKey"` // id为主键
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"` // 普通索引
	Name      string
}

// =============================================================

type Author struct {
    Name  string
    Email string
}
type Blog struct {
  ID      int
  Author  Author `gorm:"embedded"`
  Upvotes int32
}

// 等效于
type Blog struct {
  ID       int64
  Name     string
  Email    string
  Upvotes  int32
}
```

:::

<br />

### 自动建表

文档：[https://gorm.io/zh_CN/docs/migration.html](https://gorm.io/zh_CN/docs/migration.html)

::: details AutoMigrate简单示例

```go
package main

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"log"
)

func getDB() (*gorm.DB, error) {
	username := "root"
	password := "QiNqg[l.%;H>>rO9"
	host := "192.168.48.133"
	port := 3306
	dbName := "demo"
	charSet := "utf8mb4"
	conntimeout := "5s"
	readTimeout := "10s"
	writeTimeout := "10s"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=True&loc=Local&charset=%s&timeout=%s&readTimeout=%s&writeTimeout=%s",
		username,
		password,
		host,
		port,
		dbName,
		charSet,
		conntimeout,
		readTimeout,
		writeTimeout,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	return db, err
}

type User struct {
	gorm.Model
	Name string
}

type Role struct {
	Name string
}

func main() {
	// 连接数据库
	db, err := getDB()
	if err != nil {
		panic(err)
	}

	// 自动创建表
	//err = db.AutoMigrate(&User{}, &Role{})
	err = db.Set("gorm:table_options", "ENGINE=InnoDB").AutoMigrate(&User{}, &Role{})
	if err != nil {
		log.Fatalln(err)
	}
}
```

:::

<br />

### 增加记录

文档：[https://gorm.io/zh_CN/docs/create.html](https://gorm.io/zh_CN/docs/create.html)

#### 增加单条记录

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"time"
)

func getDB() (*gorm.DB, error) {
	username := "root"
	password := "QiNqg[l.%;H>>rO9"
	host := "192.168.48.133"
	port := 3306
	dbName := "demo"
	charSet := "utf8mb4"
	conntimeout := "5s"
	readTimeout := "10s"
	writeTimeout := "10s"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=True&loc=Local&charset=%s&timeout=%s&readTimeout=%s&writeTimeout=%s",
		username,
		password,
		host,
		port,
		dbName,
		charSet,
		conntimeout,
		readTimeout,
		writeTimeout,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	return db, err
}

type User struct {
	gorm.Model
	Name     string
	Age      int
	Birthday time.Time
}

func main() {
	// 连接数据库
	db, err := getDB()
	if err != nil {
		panic(err)
	}

	// 若表存在则删除
	//err = db.Migrator().DropTable(&User{})
	//if err != nil {
	//	panic(err)
	//}

	// 自动创建表
	err = db.AutoMigrate(&User{})
	if err != nil {
		panic(err)
	}

	// 添加单条记录
	user := User{Name: "Jinzhu", Age: 18, Birthday: time.Now()}
	result := db.Create(&user)

	// 检查错误
	if result.Error != nil {
		panic(err)
	}
    
    // 查看gorm.Model字段
	fmt.Println("ID       : ", user.ID)
	fmt.Println("CreatedAt: ", user.CreatedAt)
	fmt.Println("UpdatedAt: ", user.UpdatedAt)
	fmt.Println("DeletedAt: ", user.DeletedAt)
}
```

输出结果

```bash
ID       :  1
CreatedAt:  2022-09-18 13:35:27.769 +0800 CST    
UpdatedAt:  2022-09-18 13:35:27.769 +0800 CST    
DeletedAt:  {0001-01-01 00:00:00 +0000 UTC false}  // DeletedAt是一个结构体
```

:::

#### 批量插入记录

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"time"
)

func getDB() (*gorm.DB, error) {
	username := "root"
	password := "QiNqg[l.%;H>>rO9"
	host := "192.168.48.133"
	port := 3306
	dbName := "demo"
	charSet := "utf8mb4"
	conntimeout := "5s"
	readTimeout := "10s"
	writeTimeout := "10s"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=True&loc=Local&charset=%s&timeout=%s&readTimeout=%s&writeTimeout=%s",
		username,
		password,
		host,
		port,
		dbName,
		charSet,
		conntimeout,
		readTimeout,
		writeTimeout,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	return db, err
}

type User struct {
	gorm.Model
	Name     string
	Age      int
	Birthday time.Time
}

func main() {
	// 连接数据库
	db, err := getDB()
	if err != nil {
		panic(err)
	}

	// 若表存在则删除
	err = db.Migrator().DropTable(&User{})
	if err != nil {
		panic(err)
	}

	// 自动创建表
	err = db.AutoMigrate(&User{})
	if err != nil {
		panic(err)
	}

	// 批量添加记录，只需要传递Slice即可
	var users = []User{
		{Name: "jinzhu1", Birthday: time.Now()},
		{Name: "jinzhu2", Birthday: time.Now()},
		{Name: "jinzhu3", Birthday: time.Now()},
	}
	result := db.Create(&users)

	// 检查错误
	if result.Error != nil {
		panic(err)
	}

	// 查看数据
	for _, user := range users {
		fmt.Println("ID       : ", user.ID)
		fmt.Println("CreatedAt: ", user.CreatedAt)
		fmt.Println("UpdatedAt: ", user.UpdatedAt)
		fmt.Println("DeletedAt: ", user.DeletedAt)
	}
}
```

输出结果

```bash
ID       :  1
CreatedAt:  2022-09-18 14:07:14.931 +0800 CST    
UpdatedAt:  2022-09-18 14:07:14.931 +0800 CST    
DeletedAt:  {0001-01-01 00:00:00 +0000 UTC false}
ID       :  2
CreatedAt:  2022-09-18 14:07:14.931 +0800 CST    
UpdatedAt:  2022-09-18 14:07:14.931 +0800 CST    
DeletedAt:  {0001-01-01 00:00:00 +0000 UTC false}
ID       :  3
CreatedAt:  2022-09-18 14:07:14.931 +0800 CST    
UpdatedAt:  2022-09-18 14:07:14.931 +0800 CST    
DeletedAt:  {0001-01-01 00:00:00 +0000 UTC false}
```

:::

#### 分批插入数据

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"strconv"
	"time"
)

func getDB() (*gorm.DB, error) {
	username := "root"
	password := "QiNqg[l.%;H>>rO9"
	host := "192.168.48.133"
	port := 3306
	dbName := "demo"
	charSet := "utf8mb4"
	conntimeout := "5s"
	readTimeout := "10s"
	writeTimeout := "10s"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=True&loc=Local&charset=%s&timeout=%s&readTimeout=%s&writeTimeout=%s",
		username,
		password,
		host,
		port,
		dbName,
		charSet,
		conntimeout,
		readTimeout,
		writeTimeout,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	return db, err
}

type User struct {
	gorm.Model
	Name     string
	Age      int
	Birthday time.Time
}

func main() {
	// 连接数据库
	db, err := getDB()
	if err != nil {
		panic(err)
	}

	// 若表存在则删除
	err = db.Migrator().DropTable(&User{})
	if err != nil {
		panic(err)
	}

	// 自动创建表
	err = db.AutoMigrate(&User{})
	if err != nil {
		panic(err)
	}

	// 批量添加记录，只需要传递Slice即可
	var users = []User{}
	for i := 0; i < 100; i++ {
		user := User{Name: "jinzhu" + strconv.Itoa(i), Birthday: time.Now()}
		users = append(users, user)
	}
	result := db.CreateInBatches(&users, 10) // 每次插入10条数据

	// 检查错误
	if result.Error != nil {
		panic(err)
	}

	// 查看数据
	for _, user := range users {
		fmt.Println("ID       : ", user.ID)
		fmt.Println("CreatedAt: ", user.CreatedAt)
		fmt.Println("UpdatedAt: ", user.UpdatedAt)
		fmt.Println("DeletedAt: ", user.DeletedAt)
	}
}
```

:::

#### 使用部分字段

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"time"
)

func getDB() (*gorm.DB, error) {
	username := "root"
	password := "QiNqg[l.%;H>>rO9"
	host := "192.168.48.133"
	port := 3306
	dbName := "demo"
	charSet := "utf8mb4"
	conntimeout := "5s"
	readTimeout := "10s"
	writeTimeout := "10s"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=True&loc=Local&charset=%s&timeout=%s&readTimeout=%s&writeTimeout=%s",
		username,
		password,
		host,
		port,
		dbName,
		charSet,
		conntimeout,
		readTimeout,
		writeTimeout,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	return db, err
}

type User struct {
	gorm.Model
	Name     string
	Age      int
	Birthday time.Time
}

func main() {
	// 连接数据库
	db, err := getDB()
	if err != nil {
		panic(err)
	}

	// 若表存在则删除
	err = db.Migrator().DropTable(&User{})
	if err != nil {
		panic(err)
	}

	// 自动创建表
	err = db.AutoMigrate(&User{})
	if err != nil {
		panic(err)
	}

	// 添加单条记录
	user := User{Name: "Jinzhu1", Age: 18}
	result := db.Select("Name", "CreatedAt").Create(&user) // 用指定的字段创建记录

	// 检查错误
	if result.Error != nil {
		panic(err)
	}

	// 查看gorm.Model字段
	fmt.Println("ID       : ", user.ID)
	fmt.Println("CreatedAt: ", user.CreatedAt)
	fmt.Println("UpdatedAt: ", user.UpdatedAt)
	fmt.Println("DeletedAt: ", user.DeletedAt)

	// ======================================================================================

	// 添加单条记录
	user = User{Name: "Jinzhu2", Age: 18}
	result = db.Omit("Age", "CreatedAt", "Birthday").Create(&user) // 忽略指定的字段

	// 检查错误
	if result.Error != nil {
		panic(err)
	}

	// 查看gorm.Model字段
	fmt.Println("ID       : ", user.ID)
	fmt.Println("CreatedAt: ", user.CreatedAt)
	fmt.Println("UpdatedAt: ", user.UpdatedAt)
	fmt.Println("DeletedAt: ", user.DeletedAt)
}
```

:::

#### time.Time类型

* 插入数据时若某个字段（基本数据类型）不传递值，会使用其零值
* time.Time类型若不传递值可能会报错

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"time"
)

func getDB() (*gorm.DB, error) {
	username := "root"
	password := "QiNqg[l.%;H>>rO9"
	host := "192.168.48.133"
	port := 3306
	dbName := "demo"
	charSet := "utf8mb4"
	conntimeout := "5s"
	readTimeout := "10s"
	writeTimeout := "10s"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=True&loc=Local&charset=%s&timeout=%s&readTimeout=%s&writeTimeout=%s",
		username,
		password,
		host,
		port,
		dbName,
		charSet,
		conntimeout,
		readTimeout,
		writeTimeout,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	return db, err
}

type User struct {
	gorm.Model
	Name     string
	Age      int
	Birthday time.Time
}

func main() {
	// 连接数据库
	db, err := getDB()
	if err != nil {
		panic(err)
	}

	// 若表存在则删除
	err = db.Migrator().DropTable(&User{})
	if err != nil {
		panic(err)
	}

	// 自动创建表
	err = db.AutoMigrate(&User{})
	if err != nil {
		panic(err)
	}

	// 批量添加记录，Age和Birthday都没有传值，默认使用零值
	var users = []User{
		{Name: "jinzhu1"},
	}
	result := db.Create(&users)

	// 检查错误
	if result.Error != nil {
		panic(err)
	}

	// 查看数据
	for _, user := range users {
		fmt.Println("ID       : ", user.ID)
		fmt.Println("CreatedAt: ", user.CreatedAt)
		fmt.Println("UpdatedAt: ", user.UpdatedAt)
		fmt.Println("DeletedAt: ", user.DeletedAt)
	}
}
```

**Time.time类型插入时报错**

![image-20220918141751000](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220918141751000.png)

解决办法1：修改数据库

![image-20220918142825999](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220918142825999.png)

![image-20220918142843485](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220918142843485.png)

解决办法2：修改为*Time.time类型（推荐）

```go
type User struct {
	gorm.Model
	Name     string
	Age      int
	Birthday *time.Time
}

func getTimePtr(t time.Time) *time.Time {
	return &t
}


    // 批量添加记录，若要传递数据不能直接使用&time.Now()
	var users = []User{
		{Name: "jinzhu1"},
		{Name: "jinzhu1", Birthday: getTimePtr(time.Now())},
	}
	result := db.Create(&users)
```

![image-20220918141933930](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220918141933930.png)

:::

<br />

### 查询记录

文档：

* [https://gorm.io/zh_CN/docs/query.html](https://gorm.io/zh_CN/docs/query.html)
* [https://gorm.io/zh_CN/docs/advanced_query.html](https://gorm.io/zh_CN/docs/advanced_query.html)

#### 查询所有对象

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"strconv"
	"time"
)

func getDB() (*gorm.DB, error) {
	username := "root"
	password := "QiNqg[l.%;H>>rO9"
	host := "192.168.48.133"
	port := 3306
	dbName := "demo"
	charSet := "utf8mb4"
	conntimeout := "5s"
	readTimeout := "10s"
	writeTimeout := "10s"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=True&loc=Local&charset=%s&timeout=%s&readTimeout=%s&writeTimeout=%s",
		username,
		password,
		host,
		port,
		dbName,
		charSet,
		conntimeout,
		readTimeout,
		writeTimeout,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	return db, err
}

type User struct {
	gorm.Model
	Name     string
	Age      int
	Birthday time.Time
}

func main() {
	// 连接数据库
	db, err := getDB()
	if err != nil {
		panic(err)
	}

	// 若表存在则删除
	err = db.Migrator().DropTable(&User{})
	if err != nil {
		panic(err)
	}

	// 自动创建表
	err = db.AutoMigrate(&User{})
	if err != nil {
		panic(err)
	}

	// 批量添加记录，只需要传递Slice即可
	var users []User
	for i := 0; i < 100; i++ {
		user := User{Name: "jinzhu" + strconv.Itoa(i), Birthday: time.Now()}
		users = append(users, user)
	}
	result := db.CreateInBatches(&users, 10) // 每次插入10条数据

	// 检查错误
	if result.Error != nil {
		panic(err)
	}

	// 查询所有记录
	var users2 []User
	result = db.Find(&users2) // select * from users;

	// 检查错误
	if result.Error != nil {
		panic(err)
	}

	// 查看信息
	fmt.Println("记录条数: ", result.RowsAffected) // 等同于len(users)
	for _, user := range users2 {
		fmt.Println("Name: ", user.Name)
	}
}
```

:::

#### 指定单条记录

* 查询时它自动添加 `LIMIT 1` 
* 没有找到记录时返回 `ErrRecordNotFound` 错误

```go
// 获取第一条记录（主键升序）
db.First(&user)  // SELECT * FROM users ORDER BY id LIMIT 1;

// 获取最后一条记录（主键降序）
db.Last(&user)   // SELECT * FROM users ORDER BY id DESC LIMIT 1;

// 获取一条记录，没有指定排序字段
db.Take(&user)  // SELECT * FROM users LIMIT 1;

// ------------------------------------------------------------

// 返回值
result.RowsAffected // 返回找到的记录数
result.Error        // returns error or nil

// ------------------------------------------------------------
// 未找到记录时

// First/Last/Take会返回ErrRecordNotFound错误，然后通过result.RowsAffected判断是否查询到记录
errors.Is(result.Error, gorm.ErrRecordNotFound)

// 若要避免ErrRecordNotFound错误可以使用Find
db.Limit(1).Find(&user)
```

#### 指定查询条件

```go
// ==
db.Where("name = ?", "jinzhu211").Find(&user)
// SELECT * FROM users WHERE name = 'jinzhu';

// != or <>
db.Where("name != ?", "jinzhu").Find(&users)
// SELECT * FROM users WHERE name != 'jinzhu';

// IN
db.Where("name IN ?", []string{"jinzhu", "jinzhu 2"}).Find(&users)
// SELECT * FROM users WHERE name IN ('jinzhu','jinzhu 2');

// LIKE
db.Where("name LIKE ?", "%jin%").Find(&users)
// SELECT * FROM users WHERE name LIKE '%jin%';

// AND
db.Where("name = ? AND age >= ?", "jinzhu", "22").Find(&users)
// SELECT * FROM users WHERE name = 'jinzhu' AND age >= 22;

// Time
db.Where("updated_at > ?", lastWeek).Find(&users)
// SELECT * FROM users WHERE updated_at > '2000-01-01 00:00:00';

// BETWEEN
db.Where("created_at BETWEEN ? AND ?", lastWeek, today).Find(&users)
// SELECT * FROM users WHERE created_at BETWEEN '2000-01-01 00:00:00' AND '2000-01-08 00:00:00';
```

<br />

### 更新记录

文档：[https://gorm.io/zh_CN/docs/update.html](https://gorm.io/zh_CN/docs/update.html)

#### 更新指定字段

* `Update`：只支持更新单个字段
* `Updates`：支持更新1个或多个字段

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"time"
)

func getDB() (*gorm.DB, error) {
	username := "root"
	password := "QiNqg[l.%;H>>rO9"
	host := "192.168.48.133"
	port := 3306
	dbName := "demo"
	charSet := "utf8mb4"
	conntimeout := "5s"
	readTimeout := "10s"
	writeTimeout := "10s"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=True&loc=Local&charset=%s&timeout=%s&readTimeout=%s&writeTimeout=%s",
		username,
		password,
		host,
		port,
		dbName,
		charSet,
		conntimeout,
		readTimeout,
		writeTimeout,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	return db, err
}

type User struct {
	gorm.Model
	Name     string
	Age      int
	Birthday time.Time
}

func main() {
	// 连接数据库
	db, err := getDB()
	if err != nil {
		panic(err)
	}

	// 若表存在则删除
	err = db.Migrator().DropTable(&User{})
	if err != nil {
		panic(err)
	}

	// 自动创建表
	err = db.AutoMigrate(&User{})
	if err != nil {
		panic(err)
	}

	// 批量添加记录，只需要传递Slice即可
	var users = []User{
		{Name: "jinzhu1", Birthday: time.Now()},
		{Name: "jinzhu2", Birthday: time.Now()},
		{Name: "jinzhu3", Birthday: time.Now()},
	}
	result := db.Create(&users)

	// 检查错误
	if result.Error != nil {
		panic(err)
	}

	// 查询并更新，注意点：
	// (1) 若没有找到记录不会新增记录
	// (2) 若找到记录,Update只能更新单个字段(还会自动更新updated_at字段),Updates支持更新1个或多个字段
	// (3) 若旧纪录和新记录完全相同,那么只会更新updated_at字段
	var user []User
	result = db.Where("name LIKE ?", "%jinzhu%").Find(&user).Update("name", "2")
	//result = db.Where("name LIKE ?", "%jinzhu%").Find(&user).Updates(map[string]any{
	//	"name": "bob",
	//	"age":  18,
	//})

	if result.Error != nil {
		panic(err)
	}
	fmt.Println("更新记录数目: ", result.RowsAffected)
}
```

:::

#### 排除指定字段

```go
	// Omit忽略某些字段,在下面这个例子种,只会更新updated_at
	var user []User
	result = db.
		Where("name LIKE ?", "%jinzhu%").Find(&user).
		Omit("name", "age").
		Updates(map[string]any{
			"name": "bob2",
			"age":  20,
		})

	if result.Error != nil {
		panic(err)
	}
	fmt.Println("更新记录数目: ", result.RowsAffected)
```

#### 更新所有字段

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"time"
)

func getDB() (*gorm.DB, error) {
	username := "root"
	password := "QiNqg[l.%;H>>rO9"
	host := "192.168.48.133"
	port := 3306
	dbName := "demo"
	charSet := "utf8mb4"
	conntimeout := "5s"
	readTimeout := "10s"
	writeTimeout := "10s"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=True&loc=Local&charset=%s&timeout=%s&readTimeout=%s&writeTimeout=%s",
		username,
		password,
		host,
		port,
		dbName,
		charSet,
		conntimeout,
		readTimeout,
		writeTimeout,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	return db, err
}

type User struct {
	gorm.Model
	Name     string
	Age      int
	Birthday time.Time
	Grade    int
}

func main() {
	// 连接数据库
	db, err := getDB()
	if err != nil {
		panic(err)
	}

	// 若表存在则删除
	err = db.Migrator().DropTable(&User{})
	if err != nil {
		panic(err)
	}

	// 自动创建表
	err = db.AutoMigrate(&User{})
	if err != nil {
		panic(err)
	}

	// 批量添加记录，只需要传递Slice即可
	var users = []User{
		{Name: "jinzhu1", Age: 18, Birthday: time.Now()},
		{Name: "jinzhu2", Age: 19, Birthday: time.Now()},
		{Name: "jinzhu3", Age: 20, Birthday: time.Now()},
	}
	result := db.Create(&users)

	// 检查错误
	if result.Error != nil {
		panic(err)
	}

	// 先查询一下
	var user User
	result = db.Where("name = ?", "jinzhu2").Find(&user)
	if result.Error != nil {
		panic(err)
	}

	// 更新所有字段 ( deleted_at字段除外 )
	user.Name = "example"
	result = db.Save(&user)

	if result.Error != nil {
		panic(err)
	}
	fmt.Println("更新记录数目: ", result.RowsAffected)
}
```

:::

#### 使用SQL表达式

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"time"
)

func getDB() (*gorm.DB, error) {
	username := "root"
	password := "QiNqg[l.%;H>>rO9"
	host := "192.168.48.133"
	port := 3306
	dbName := "demo"
	charSet := "utf8mb4"
	conntimeout := "5s"
	readTimeout := "10s"
	writeTimeout := "10s"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=True&loc=Local&charset=%s&timeout=%s&readTimeout=%s&writeTimeout=%s",
		username,
		password,
		host,
		port,
		dbName,
		charSet,
		conntimeout,
		readTimeout,
		writeTimeout,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	return db, err
}

type User struct {
	gorm.Model
	Name     string
	Age      int
	Birthday time.Time
	Grade    int
}

func main() {
	// 连接数据库
	db, err := getDB()
	if err != nil {
		panic(err)
	}

	// 若表存在则删除
	err = db.Migrator().DropTable(&User{})
	if err != nil {
		panic(err)
	}

	// 自动创建表
	err = db.AutoMigrate(&User{})
	if err != nil {
		panic(err)
	}

	// 批量添加记录，只需要传递Slice即可
	var users = []User{
		{Name: "jinzhu1", Age: 18, Birthday: time.Now()},
		{Name: "jinzhu2", Age: 19, Birthday: time.Now()},
		{Name: "jinzhu3", Age: 20, Birthday: time.Now()},
	}
	result := db.Create(&users)

	// 检查错误
	if result.Error != nil {
		panic(err)
	}

	// 使用SQL表达式更新
	var user []User
	result = db.Where("name LIKE ?", "%jinzhu%").Find(&user).Updates(map[string]any{
		"age":   gorm.Expr("age * 0.5 + age * 0.5 + 10"),
		"grade": gorm.Expr("grade + ?", 60),
	})

	if result.Error != nil {
		panic(err)
	}
	fmt.Println("更新记录数目: ", result.RowsAffected)
}
```

:::

<br />

### 删除记录

#### 软删除

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"time"
)

func getDB() (*gorm.DB, error) {
	username := "root"
	password := "QiNqg[l.%;H>>rO9"
	host := "192.168.48.133"
	port := 3306
	dbName := "demo"
	charSet := "utf8mb4"
	conntimeout := "5s"
	readTimeout := "10s"
	writeTimeout := "10s"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=True&loc=Local&charset=%s&timeout=%s&readTimeout=%s&writeTimeout=%s",
		username,
		password,
		host,
		port,
		dbName,
		charSet,
		conntimeout,
		readTimeout,
		writeTimeout,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	return db, err
}

type User struct {
	gorm.Model
	Name     string
	Age      int
	Birthday time.Time
}

func main() {
	// 连接数据库
	db, err := getDB()
	if err != nil {
		panic(err)
	}

	// 若表存在则删除
	err = db.Migrator().DropTable(&User{})
	if err != nil {
		panic(err)
	}

	// 自动创建表
	err = db.AutoMigrate(&User{})
	if err != nil {
		panic(err)
	}

	// 批量添加记录，只需要传递Slice即可
	var users = []User{
		{Name: "jinzhu1", Age: 18, Birthday: time.Now()},
		{Name: "jinzhu2", Age: 19, Birthday: time.Now()},
		{Name: "jinzhu3", Age: 20, Birthday: time.Now()},
		{Name: "1jinzhu", Age: 18, Birthday: time.Now()},
		{Name: "2jinzhu", Age: 19, Birthday: time.Now()},
		{Name: "3jinzhu", Age: 20, Birthday: time.Now()},
	}
	result := db.Create(&users)

	// 检查错误
	if result.Error != nil {
		panic(err)
	}

	// 查询并删除,默认是软删除,即更新deleted_at为当前时间
	var user []User
	result = db.Where("name LIKE ?", "jinzhu%").Find(&user).Delete(&user)
	if result.Error != nil {
		panic(err)
	}

	fmt.Println("删除记录数目: ", result.RowsAffected)
}
```

:::

#### 操作软删除

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"time"
)

func getDB() (*gorm.DB, error) {
	username := "root"
	password := "QiNqg[l.%;H>>rO9"
	host := "192.168.48.133"
	port := 3306
	dbName := "demo"
	charSet := "utf8mb4"
	conntimeout := "5s"
	readTimeout := "10s"
	writeTimeout := "10s"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=True&loc=Local&charset=%s&timeout=%s&readTimeout=%s&writeTimeout=%s",
		username,
		password,
		host,
		port,
		dbName,
		charSet,
		conntimeout,
		readTimeout,
		writeTimeout,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	return db, err
}

type User struct {
	gorm.Model
	Name     string
	Age      int
	Birthday time.Time
}

func main() {
	// 连接数据库
	db, err := getDB()
	if err != nil {
		panic(err)
	}

	// 若表存在则删除
	err = db.Migrator().DropTable(&User{})
	if err != nil {
		panic(err)
	}

	// 自动创建表
	err = db.AutoMigrate(&User{})
	if err != nil {
		panic(err)
	}

	// 批量添加记录，只需要传递Slice即可
	var users = []User{
		{Name: "jinzhu1", Age: 18, Birthday: time.Now()},
		{Name: "jinzhu2", Age: 19, Birthday: time.Now()},
		{Name: "jinzhu3", Age: 20, Birthday: time.Now()},
		{Name: "1jinzhu", Age: 18, Birthday: time.Now()},
		{Name: "2jinzhu", Age: 19, Birthday: time.Now()},
		{Name: "3jinzhu", Age: 20, Birthday: time.Now()},
	}
	result := db.Create(&users)

	// 检查错误
	if result.Error != nil {
		panic(err)
	}

	// 查询并删除,默认是软删除,即更新deleted_at为当前时间
	var user []User
	result = db.Where("name LIKE ?", "jinzhu%").Find(&user).Delete(&user)
	if result.Error != nil {
		panic(err)
	}

	fmt.Println("删除记录数目: ", result.RowsAffected)

	// 查找软删除的记录
	// Unscoped()会操作所有记录,包括软删除的记录
	result = db.Unscoped().Where("deleted_at is not null").Find(&users)
	if result.Error != nil {
		panic(err)
	}
	fmt.Println("找到软删除记录数目: ", result.RowsAffected)

	for _, user := range users {
		fmt.Println(user.Name)
	}
}
```

:::

#### 硬删除

```go
	// 硬删除
	var user []User
	result = db.Unscoped().Where("name LIKE ?", "jinzhu%").Find(&user).Delete(&user)
	if result.Error != nil {
		panic(err)
	}

	fmt.Println("硬删除记录数目: ", result.RowsAffected)
```

<br />

:::

### CURD总结

#### 钩子函数

文档：[https://gorm.io/zh_CN/docs/hooks.html](https://gorm.io/zh_CN/docs/hooks.html)

<br />

### 关系模型

#### 一对一



#### 一对多

一对多关系，通常在多的一方添加一个字段，用于存放主表主键的值，我们管这个字段叫**外键**



#### 多对多

多对多关系，需要创建第三张表，表中至少包含两个字段分别作为**外键**指向各自一方的主键

<br />

## Casbin

Github：[https://github.com/casbin/casbin](https://github.com/casbin/casbin)

文档：[https://casbin.io/zh/docs/overview](https://casbin.io/zh/docs/overview)

在线编辑器：[https://casbin.io/zh/editor](https://casbin.io/zh/editor)

### 在线调试

**（1）ACL示例**

![img](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//D1B8068391CF41F698965C29302C9C49.png)

<br />

**以上图的例子说明**

* 模型文件定义输入格式

  ```bash
  # 模型文件中定义的输入格式
  [request_definition]
  r = sub, obj, act
  
  # 和输入一一对应起来
  alice 对应 sub
  data1 对应 obj
  read  对应 act
  r 代表着这是一个变量，后面通过r.sbu可以调用到alice
  ```

* 模型文件定义规则格式

  ```bash
  # 模型文件中定义规则格式
  [policy_definition]
  p = sub, obj, act
  
  # 对于Policy文件中的第一条数据来说
  sub  对应 alice
  obj  对应 data1
  act  对应 read
  
  # 实际上还有一个字段 eft，他只有两个值 allow(允许,这是默认值)、deny(拒绝)
  ```

* 模型文件定义匹配规则

  ```bash
  # 这里的意思是：输入和定义必须完全匹配
  # 这里可以定义各种各样的规则，有可能会匹配到多条，所以到这里还不能最终确定是允许还是拒绝
  [matchers]
  m = r.sub == p.sub && r.obj == p.obj && r.act == p.act
  ```

* 模型文件定义最终允许还是拒绝；`policy_effect`总共就支持几种，挑选一种合适自己的即可

  参考文档：[https://casbin.io/zh/docs/syntax-for-models#policy-effect%E5%AE%9A%E4%B9%89](https://casbin.io/zh/docs/syntax-for-models#policy-effect%E5%AE%9A%E4%B9%89)
  
  ```bash
  # 这里的意思是：只要有一个是允许的最终就会允许
  [policy_effect]
  e = some(where (p.eft == allow))
  ```

  看下面的例子，虽然我们定义了deny，但policy_effect中定义**只要有一条允许最终就是允许**，所以返回结果是`true`

  ![image-20220919152946411](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220919152946411.png)

  修改一下`policy_effect`，需要满足两个条件才可以：（1）允许（2）不允许有拒绝
  
  所以这里返回了`false`
  
  ![image-20220919153045186](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220919153045186.png)

**（2）RBAC示例**

![image-20220919154506579](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220919154506579.png)

**在RBAC模型中**：

* 输入参数保持不变

* 模型文件中增加了角色定义

  ```bash
  [role_definition] # 定义角色
  g = _, _          # 这里的两个参数一般代表：用户, 角色，关系为：用户属于某个角色
  ```

* 匹配规则中也增加了角色处理

  ```bash
  [matchers]
  m = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act
  
  # g(r.sub, p.sub) 这一句比较难理解
  #  (1) g是一个函数,他会判断r.sub是否属于p.sub这个角色，返回true或false
  #  (2) 他会找到r.sub的角色，并根据规则文件中角色的权限来判断
  #  (3) 同时也会使用自己的权限来判断（规则文件中直接对用户进行做的授权）
  ```

<br />

### 模块安装

```bash
go get github.com/casbin/casbin/v2
```

<br />

### 适配器（Adapters）

文档

* [https://casbin.io/zh/docs/policy-storage](https://casbin.io/zh/docs/policy-storage)
* [https://casbin.io/zh/docs/adapters](https://casbin.io/zh/docs/adapters)

适配器（`Adapter`）就是定义如何存储和读写`Policy`

* 我们也可以不使用任何适配器，将模型和`Policy`全部在代码中写死，但是这不利于扩展
* 常用的适配器有：文件（内置）、数据库（需安装对应模块）

<br />

#### （1）仅使用代码

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"github.com/casbin/casbin/v2"
	"github.com/casbin/casbin/v2/model"
	"log"
)

func main() {
	var (
		ok  bool
		err error
	)

	// 定义模型和规则
	modelString := `
		[request_definition]
		r = sub, obj, act
		
		[policy_definition]
		p = sub, obj, act
		
		[role_definition]
		g = _, _
		
		[policy_effect]
		e = some(where (p.eft == allow))
		
		[matchers]
		m = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act
	`
	policies := [][]string{
		{"p", "alice", "data3", "read"},
		{"p", "alice", "data4", "write"},

		{"p", "admin", "data1", "read"},
		{"p", "admin", "data1", "write"},

		{"p", "admin", "data2", "read"},
		{"p", "admin", "data2", "write"},

		{"g", "alice", "admin"},
	}

	// 初始化模型
	m, err := model.NewModelFromString(modelString)
	if err != nil {
		log.Fatalf("error: NewModelFromString: %s", err)
	}

	// 初始化Casbin
	e, err := casbin.NewEnforcer(m)
	if err != nil {
		log.Fatalf("error: NewEnforcer: %s", err)
	}

	// 动态添加规则
	// (1) 使用AddPolicy、AddRoleForUser等函数添加时，返回值第一个参数为布尔值，true代表添加成功，false代表对象已经存在，无需重复添加，
	//     根据实际情况选择是否使用这个值，如果不使用直接忽略掉即可，即使用_丢弃掉
	// (2) 若要一次性添加多条规则，可以使用AddPolicies，但是需要注意
	//     假如多条规则中任意一个规则若已经存在在当前的e对象中，那么所有的规则都不会被添加
	for _, policy := range policies {
		if policy[0] == "p" {
			_, err = e.AddPolicy(policy[1:])
			if err != nil {
				log.Fatalf("error: AddPolicy: %s", err)
			}
		} else if policy[0] == "g" {
			_, err = e.AddRoleForUser(policy[1], policy[2], policy[3:]...)
			if err != nil {
				log.Fatalf("error: AddRoleForUser: %s", err)
			}
		} else {
			log.Fatalf("error: Unknown ptype: %s", policy[0])
		}
	}

	// 获取所有的规则
	fmt.Println(e.GetPolicy()) // 只能获取p，不能获取g

	// 定义输入参数
	sub := "alice"
	obj := "data1"
	act := "read"

	// 校验输入是否有权限
	ok, err = e.Enforce(sub, obj, act)
	if err != nil {
		log.Fatalf("error: Enforce: %s", err)
	}

	// 校验结果
	if ok {
		fmt.Println("通过")
	} else {
		fmt.Println("拒绝")
	}
}
```

:::

#### （2）文件适配器

::: details 点击查看完整代码

`model.conf`

```ini
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act
```

`policy.csv`

```
g, alice, admin

p, alice, data3, read
p, alice, data4, write

p, admin, data1, read
p, admin, data1, write
p, admin, data2, read
p, admin, data2, write
```

`main.go`

```go
package main

import (
	"fmt"
	"github.com/casbin/casbin/v2"
	fileadapter "github.com/casbin/casbin/v2/persist/file-adapter"
)

func main() {
	// 初始化Casbin
	//e, err := casbin.NewEnforcer("./model.conf", "./policy.csv")
	//if err != nil {
	//	panic(err)
	//}

	// 以上代码等同于如下代码
	a := fileadapter.NewAdapter("./policy.csv")
	e, err := casbin.NewEnforcer("./model.conf", a)
	if err != nil {
		panic(err)
	}

	// 定义输入参数
	sub := "alice"
	obj := "data2"
	act := "read"

	// 校验输入是否有权限
	ok, err := e.Enforce(sub, obj, act)
	if err != nil {
		panic(err)
	}

	// 校验结果
	if ok {
		fmt.Println("通过")
	} else {
		fmt.Println("拒绝")
	}
}
```

:::

#### （3）Gorm适配器

文档：[https://github.com/casbin/gorm-adapter](https://github.com/casbin/gorm-adapter)

安装

```bash
go get github.com/casbin/gorm-adapter/v3
```

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"github.com/casbin/casbin/v2"
	"github.com/casbin/casbin/v2/model"
	gormadapter "github.com/casbin/gorm-adapter/v3"
	"log"
)

func main() {
	var (
		ok  bool
		err error
	)

	// 定义模型和规则
	modelString := `
		[request_definition]
		r = sub, obj, act
		
		[policy_definition]
		p = sub, obj, act
		
		[role_definition]
		g = _, _
		
		[policy_effect]
		e = some(where (p.eft == allow))
		
		[matchers]
		m = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act
	`
	policies := [][]string{
		{"p", "alice", "data3", "read"},
		{"p", "alice", "data4", "write"},

		{"p", "admin", "data1", "read"},
		{"p", "admin", "data1", "write"},

		{"p", "admin", "data2", "read"},
		{"p", "admin", "data2", "write"},

		{"g", "alice", "admin"},
	}

	// 初始化模型
	m, err := model.NewModelFromString(modelString)
	if err != nil {
		log.Fatalf("error: NewModelFromString: %s", err)
	}

	// 初始化Gorm适配器, 参数true会自动创建表 casbin_rule
	// 如果已经有一个Gorm实例，可以通过 gormadapter.NewAdapterByDB(gormInstance) 来实例适配器
	adapter, _ := gormadapter.NewAdapter("mysql", "root:QiNqg[l.%;H>>rO9@tcp(192.168.48.133:3306)/demo", true)

	// 初始化casbin
	e, err := casbin.NewEnforcer(m, adapter)
	if err != nil {
		log.Fatalf("error: NewEnforcer: %s", err)
	}

	// 从数据库中读取规则
	if err = e.LoadPolicy(); err != nil {
		log.Fatalf("error: read policy from adapter: %s", err)
	}

	// 动态添加规则
	for _, policy := range policies {
		if policy[0] == "p" {
			_, err = e.AddPolicy(policy[1:])
			if err != nil {
				log.Fatalf("error: AddPolicy: %s", err)
			}
		} else if policy[0] == "g" {
			_, err = e.AddRoleForUser(policy[1], policy[2], policy[3:]...)
			if err != nil {
				log.Fatalf("error: AddRoleForUser: %s", err)
			}
		} else {
			log.Fatalf("error: Unknown ptype: %s", policy[0])
		}
	}

	// 保存规则到数据库中
	//  (1) 这会删除所有存储中的policy规则并将当前规则保存到数据库中，当规则较多时会可能会引起性能问题
	//  (2) Gorm支持自动保存规则，所以下面的代码不会必须的
	//      自动保存：https://casbin.io/zh/docs/adapters#%E8%87%AA%E5%8A%A8%E4%BF%9D%E5%AD%98
	if err = e.SavePolicy(); err != nil {
		log.Fatalf("error: SavePolicy: %s", err)
	}

	// 定义输入参数
	sub := "alice"
	obj := "data1"
	act := "read"

	// 校验输入是否有权限
	ok, err = e.Enforce(sub, obj, act)
	if err != nil {
		log.Fatalf("error: Enforce: %s", err)
	}

	// 校验结果
	if ok {
		fmt.Println("通过")
	} else {
		fmt.Println("拒绝")
	}
}
```

输出结果

```bash
# 查看数据库
mysql> use demo;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> show tables;
+----------------+
| Tables_in_demo |
+----------------+
| casbin_rule    |
+----------------+
1 row in set (0.01 sec)

mysql> desc casbin_rule;
+-------+-----------------+------+-----+---------+----------------+
| Field | Type            | Null | Key | Default | Extra          |
+-------+-----------------+------+-----+---------+----------------+
| id    | bigint unsigned | NO   | PRI | NULL    | auto_increment |
| ptype | varchar(100)    | YES  | MUL | NULL    |                |
| v0    | varchar(100)    | YES  |     | NULL    |                |
| v1    | varchar(100)    | YES  |     | NULL    |                |
| v2    | varchar(100)    | YES  |     | NULL    |                |
| v3    | varchar(100)    | YES  |     | NULL    |                |
| v4    | varchar(100)    | YES  |     | NULL    |                |
| v5    | varchar(100)    | YES  |     | NULL    |                |
+-------+-----------------+------+-----+---------+----------------+
8 rows in set (0.00 sec)

mysql> select * from casbin_rule order by id;
+----+-------+-------+-------+-------+------+------+------+
| id | ptype | v0    | v1    | v2    | v3   | v4   | v5   |
+----+-------+-------+-------+-------+------+------+------+
|  1 | p     | alice | data3 | read  |      |      |      |
|  2 | p     | alice | data4 | write |      |      |      |
|  3 | p     | admin | data1 | read  |      |      |      |
|  4 | p     | admin | data1 | write |      |      |      |
|  5 | p     | admin | data2 | read  |      |      |      |
|  6 | p     | admin | data2 | write |      |      |      |
|  7 | g     | alice | admin |       |      |      |      |
+----+-------+-------+-------+-------+------+------+------+
7 rows in set (0.01 sec)
```

:::

<br />

### 匹配器（Matchers）

文档

* 基本介绍：[https://casbin.io/zh/docs/syntax-for-models#匹配器](https://casbin.io/zh/docs/syntax-for-models#匹配器)

* 内置函数：[https://casbin.io/zh/docs/function](https://casbin.io/zh/docs/function)
* 函数源码：[https://github.com/casbin/casbin/blob/master/util/builtin_operators.go](https://github.com/casbin/casbin/blob/master/util/builtin_operators.go)

<br />

#### keyMatch：仅支持*的URL匹配

![image-20220921104614645](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220921104614645.png)

<br />

#### keyMatch2：支持*和:的URL匹配

![image-20220921104534570](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220921104534570.png)

<br />

#### keyMatch3：支持*和{}的URL匹配

![image-20220921104449235](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220921104449235.png)

<br />

#### keyMatch4：严格模式的keyMatch3

如果Policy中出现两次`{id}`，那么

**（1）`keyMatch3`允许传递不同的值**

![image-20220921105333528](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220921105333528.png)

**（2）`keyMatch4`要求值必须相等**

![image-20220921105610083](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220921105610083.png)

<br />

#### regexMatch：正则表达式匹配

![image-20220921111238869](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220921111238869.png)

<br />

#### 自定义比较函数

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"github.com/casbin/casbin/v2"
	"github.com/casbin/casbin/v2/model"
	"log"
	"regexp"
)

// (1) 编写自定义函数，这里是把 RegexMatch代码拷出来了，并做了一些简单的修改，用来测试
func RegexMatch(key1 string, key2 string) bool {
	res, err := regexp.MatchString(key2, key1)
	if err != nil {
		panic(err)
	}
	return res
}

func RegexMatchFunc(args ...any) (any, error) {
	name1 := args[0].(string)
	name2 := args[1].(string)
	return bool(RegexMatch(name1, name2)), nil
}

func main() {
	var (
		ok  bool
		err error
	)

	// 定义模型和规则
	// (3) 模型中使用自定义函数
	modelString := `
		[request_definition]
		r = sub, obj, act
		
		[policy_definition]
		p = sub, obj, act
		
		[role_definition]
		g = _, _
		
		[policy_effect]
		e = some(where (p.eft == allow))
		
		[matchers]
		m = g(r.sub, p.sub) && ( r.obj == p.obj || my_func(r.obj, p.obj) ) && r.act == p.act
	`
	// (4) obj对应的位置我们可以写一些正则
	policies := [][]string{
		{"p", "alice", "data3", "read"},
		{"p", "alice", "data4", "write"},

		{"p", "admin", "(^data1$)|(^data2$)", "read"},
		{"p", "admin", "(^data1$)|(^data2$)", "write"},
		{"g", "alice", "admin"},
	}

	// 初始化模型
	m, err := model.NewModelFromString(modelString)
	if err != nil {
		log.Fatalf("error: NewModelFromString: %s", err)
	}

	// 初始化Casbin
	e, err := casbin.NewEnforcer(m)
	if err != nil {
		log.Fatalf("error: NewEnforcer: %s", err)
	}

	// (2) 注册自定义函数
	e.AddFunction("my_func", RegexMatchFunc)

	// 动态添加规则
	for _, policy := range policies {
		if policy[0] == "p" {
			_, err = e.AddPolicy(policy[1:])
			if err != nil {
				log.Fatalf("error: AddPolicy: %s", err)
			}
		} else if policy[0] == "g" {
			_, err = e.AddRoleForUser(policy[1], policy[2], policy[3:]...)
			if err != nil {
				log.Fatalf("error: AddRoleForUser: %s", err)
			}
		} else {
			log.Fatalf("error: Unknown ptype: %s", policy[0])
		}
	}

	// 定义输入参数
	sub := "alice"
	obj := "data1"
	act := "read"

	// 校验输入是否有权限
	ok, err = e.Enforce(sub, obj, act)
	if err != nil {
		log.Fatalf("error: Enforce: %s", err)
	}

	// 校验结果
	if ok {
		fmt.Println("通过")
	} else {
		fmt.Println("拒绝")
	}
}
```

:::

<br />

#### 超级管理员模式

文档：[https://casbin.io/zh/docs/supported-models](https://casbin.io/zh/docs/supported-models)

比如超级管理员设置为`root`，那么只需要更新`model`为

```bash
m = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act || r.sub == "root"
```

<br />

## Swagger

文档：[https://swagger.io/](https://swagger.io/)

<br />

## Sort

文档：[https://pkg.go.dev/sort](https://pkg.go.dev/sort)

<br />

### 基本使用

::: details （1）基本使用

```go
package main

import (
	"fmt"
	"sort"
)

func main() {
	// int切片排序
	{
		data := []int{4, 5, 3, 1, 2}
		sort.Ints(data)
		fmt.Printf("%#v\n", data)
		fmt.Println(sort.IntsAreSorted(data)) // 检查是否已排序
	}

	// float64切片排序
	{
		data := []float64{0.4, 0.5, 0.3, 0.1, 0.2}
		sort.Float64s(data)
		fmt.Printf("%#v\n", data)
		fmt.Println(sort.Float64sAreSorted(data)) // 检查是否已排序
	}

	// 字符串切片排序
	{
		data := []string{"H", "e", "l", "l", "o", " ", "W", "o", "r", "l", "d", "!"}
		sort.Strings(data)
		fmt.Printf("%#v\n", data)
		fmt.Println(sort.StringsAreSorted(data)) // 检查是否已排序
	}
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
[]int{1, 2, 3, 4, 5}
true
[]float64{0.1, 0.2, 0.3, 0.4, 0.5}
true
[]string{" ", "!", "H", "W", "d", "e", "l", "l", "l", "o", "o", "r"}
true
```

:::

从上面可以看到：

* 默认都是按升序排序，如何按照降序排序？
* 默认不支持像`int32`、`float32`这种切片结构，该如何解决？
* 排序函数是直接对数据进行操作的，如何返回一份新的排序好的数据？

::: details （2）简单看一下源码

```go
// 查看sort.Ints源码
func Ints(x []int) { Sort(IntSlice(x)) }

// --------------------------------------------------------------------------------
// 看一下IntSlice，他是一个自定义类型，且实现了一堆方法
type IntSlice []int

func (x IntSlice) Len() int           { return len(x) }
func (x IntSlice) Less(i, j int) bool { return x[i] < x[j] }
func (x IntSlice) Swap(i, j int)      { x[i], x[j] = x[j], x[i] }
func (x IntSlice) Sort() { Sort(x) }

// --------------------------------------------------------------------------------
// 看一下Sort函数，sort函数需要一个Interface类型的数据，Interface是一个接口，定义了3个方法
func Sort(data Interface) {
	n := data.Len()
	if n <= 1 {
		return
	}
	limit := bits.Len(uint(n))
	pdqsort(data, 0, n, limit)
}

type Interface interface {
	Len() int	
	Less(i, j int) bool
	Swap(i, j int)
}

// 我们来总结一下：
//   (1) 函数内部会将int切片转为自定义类型IntSlice，该自定义类型实现了Interface接口，从而可以作为参数传到Sort函数中，Sort函数就是用来真正实现排序的
//   (2) 对于sort.Float64s和sort.Strings，也是一样的套路

// --------------------------------------------------------------------------------
// 所以也可以写成下面这个样子

package main

import (
	"fmt"
	"sort"
)

func main() {
	// int切片排序
	data := []int{4, 5, 3, 1, 2}
	sort.Sort(sort.IntSlice(data))
	fmt.Printf("%#v\n", data)
}
```

:::

<br />

### 解决遗留的问题

这里我们来解决上面遗留的几个问题

::: details （1）如何倒序排序？

```go
package main

import (
	"fmt"
	"sort"
)

func main() {
	// int切片倒叙排序
	{
		data := []int{4, 5, 3, 1, 2}
		sort.Sort(sort.Reverse(sort.IntSlice(data)))
		fmt.Printf("%#v\n", data)
		fmt.Println(sort.IsSorted(sort.Reverse(sort.IntSlice(data)))) // 检查是否已降序排序
	}

	// float64切片排序
	{
		data := []float64{0.4, 0.5, 0.3, 0.1, 0.2}
		sort.Sort(sort.Reverse(sort.Float64Slice(data)))
		fmt.Printf("%#v\n", data)
		fmt.Println(sort.IsSorted(sort.Reverse(sort.Float64Slice(data)))) // 检查是否已降序排序
	}

	// 字符串切片排序
	{
		data := []string{"H", "e", "l", "l", "o", " ", "W", "o", "r", "l", "d", "!"}
		sort.Sort(sort.Reverse(sort.StringSlice(data)))
		fmt.Printf("%#v\n", data)
		fmt.Println(sort.IsSorted(sort.Reverse(sort.StringSlice(data)))) // 检查是否已降序排序
	}
}

// --------------------------------------------------------------------------------------------

// 观察这段代码 sort.Sort(sort.Reverse(sort.IntSlice(data)))
// 这里多了一层 sort.Reverse，这是什么意思呢？

type reverse struct {
	Interface
}

func (r reverse) Less(i, j int) bool {
	return r.Interface.Less(j, i)      // 可以看到这里调换了i和j的顺序，从而实现倒序，非常巧妙
}

// 对于检查是否倒叙排序，我们也采用类似的方法就得到了如下的代码
sort.IsSorted(sort.Reverse(sort.IntSlice(data)))
```

:::

::: details （2）如何对类似于int32、float32这种切片结构排序？

我们可以参考`[]int`实现像`IntSlice32`类型，但是这样做未免太麻烦了，有什么好的解决方案吗？

```go
package main

import (
	"fmt"
	"sort"
)

func main() {
	// int32切片排序：通过向sort.Slice传递自定义比较函数来实现排序
	// 这里还需要注意2点：
	//   (1) 查看sort.Slice源码，发现内部使用了反射，所以初步估计此函数效率会差一些
	//   (2) 我们可以很方便的在自定义比较函数中控制><来实现正序或倒序排序
	data := []int32{4, 5, 3, 1, 2}
	sort.Slice(data, func(i, j int) bool {
		return data[i] > data[j]
	})
	fmt.Printf("%#v\n", data)

	// 是否已经排好序
	fmt.Println(sort.SliceIsSorted(data, func(i, j int) bool {
		return data[i] > data[j]
	}))
}

// -----------------------------------------------------------------------

// 我们可以做一下性能测试
package main

import (
	"sort"
	"testing"
)

func BenchmarkSortInts(b *testing.B) {
	for i := 0; i < b.N; i++ {
		data := []int{4, 5, 3, 1, 2}
		sort.Ints(data)
	}
}

func BenchmarkSortSlice(b *testing.B) {
	for i := 0; i < b.N; i++ {
		data := []int{4, 5, 3, 1, 2}
		sort.Slice(data, func(i, j int) bool {
			return data[i] < data[j]
		})
	}
}

// 输出结果
D:\application\GoLand\demo>go test -bench .
goos: windows
goarch: amd64
pkg: demo
cpu: Intel(R) Core(TM) i7-4790K CPU @ 4.00GHz
BenchmarkSortInts-8      9327727               120.6 ns/op
BenchmarkSortSlice-8     7123986               170.0 ns/op
PASS
ok      demo    2.670s
```

:::

::: details （3）不直接修改数据，而是返回一份新的排好序的数据？

`sort`包没有提供返回新数据的函数，所以这里只能将数据拷贝一份，然后在进行修改

```go
package main

import (
	"fmt"
	"sort"
)

func main() {
	// 源数据
	data := []int{4, 5, 3, 1, 2}

	// 将源数据拷贝一份，需要特别注意深浅拷贝的区别
	data2 := make([]int, len(data))
	copy(data2, data)

	// 对新数据进行排序
	sort.Ints(data2)

	// 查看新老数据
	fmt.Println(data)
	fmt.Println(data2)
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
[4 5 3 1 2]
[1 2 3 4 5]
```

:::

<br />

### 自定义结构体排序

::: details 方式1：sort.Slice

```go
package main

import (
	"fmt"
	"math/rand"
	"sort"
	"time"
)

type Point struct {
	x int
	y int
	z int
}

func main() {
	// 初始化
	var points []Point
	var RandInt = func(start, end int) int {
		return start + rand.Intn(end-start) // 包含start,但是不包含end
	}
	rand.Seed(time.Now().UnixNano())

	// 生成数据
	for i := 0; i < 9; i++ {
		point := Point{RandInt(10, 99), RandInt(10, 99), RandInt(10, 99)}
		points = append(points, point)
	}

	// 查看数据
	fmt.Println("排序前数据: ")
	for i := 0; i < len(points); i++ {
		fmt.Printf("[%d] %+v\n", i+1, points[i])
	}

	// 排序 - 方式一，因为用了反射，性能差点意思，但是胜在简单/灵活，推荐使用
	sort.Slice(points, func(i, j int) bool {
		return points[i].x < points[j].x
	})

	// 查看数据
	fmt.Println("排序后数据: ")
	for i := 0; i < len(points); i++ {
		fmt.Printf("[%d] %+v\n", i+1, points[i])
	}
}

```

:::

::: details 方式2：自定义PointSlice类型，并实现Len、Less、Swap方法

```go
package main

import (
	"fmt"
	"math/rand"
	"sort"
	"time"
)

type Point struct {
	x int
	y int
	z int
}

type PointSlice []Point

func (p PointSlice) Len() int {
	return len(p)
}
func (p PointSlice) Less(i, j int) bool {
	return p[i].x < p[j].x
}
func (p PointSlice) Swap(i, j int) {
	p[i], p[j] = p[j], p[i]
}

func (p PointSlice) Sort() PointSlice {
	sort.Sort(p)
	return p
}

func main() {
	// 初始化
	var points []Point
	var RandInt = func(start, end int) int {
		return start + rand.Intn(end-start) // 包含start,但是不包含end
	}
	rand.Seed(time.Now().UnixNano())

	// 生成数据
	for i := 0; i < 9; i++ {
		point := Point{RandInt(10, 99), RandInt(10, 99), RandInt(10, 99)}
		points = append(points, point)
	}

	// 查看数据
	fmt.Println("排序前数据: ")
	for i := 0; i < len(points); i++ {
		fmt.Printf("[%d] %+v\n", i+1, points[i])
	}

	// 排序 - 方式二，自定义PointSlice类型，并实现Len、Less、Swap方法
	points2 := PointSlice(points) // 转为PointSlice对象
	sort.Sort(points2)            // 使用sort包排序
	points = points2              // 再转为[]Point结构

	// 查看数据
	fmt.Println("排序后数据: ")
	for i := 0; i < len(points); i++ {
		fmt.Printf("[%d] %+v\n", i+1, points[i])
	}
}
```

:::

::: details 方式2的第一次优化：简化代码

```go
package main

import (
	"fmt"
	"math/rand"
	"sort"
	"time"
)

type Point struct {
	x int
	y int
	z int
}

type PointSlice []Point

func (p PointSlice) Len() int {
	return len(p)
}
func (p PointSlice) Less(i, j int) bool {
	return p[i].x < p[j].x
}
func (p PointSlice) Swap(i, j int) {
	p[i], p[j] = p[j], p[i]
}

func (p PointSlice) Sort() PointSlice {
	sort.Sort(p)
	return p
}

func (p PointSlice) SortWithReverse() PointSlice {
	sort.Sort(sort.Reverse(p))
	return p
}

func main() {
	// 初始化
	var points []Point
	var RandInt = func(start, end int) int {
		return start + rand.Intn(end-start) // 包含start,但是不包含end
	}
	rand.Seed(time.Now().UnixNano())

	// 生成数据
	for i := 0; i < 9; i++ {
		point := Point{RandInt(10, 99), RandInt(10, 99), RandInt(10, 99)}
		points = append(points, point)
	}

	// 查看数据
	fmt.Println("排序前数据: ")
	for i := 0; i < len(points); i++ {
		fmt.Printf("[%d] %+v\n", i+1, points[i])
	}

	// 排序 - 方式二的第一次优化
	//  (1) 给PointSlice增加了一个Sort方法，我们下面的代码看起来就简练很多了
	//  (2) 并且赠送了一个SortWithReverse,用来倒序排序
	points = PointSlice(points).Sort()

	// 查看数据
	fmt.Println("排序后数据: ")
	for i := 0; i < len(points); i++ {
		fmt.Printf("[%d] %+v\n", i+1, points[i])
	}
}
```

:::

::: details 方式2的第二次优化：支持自定义比较函数

```go
package main

import (
	"fmt"
	"math/rand"
	"sort"
	"time"
)

type Point struct {
	x int
	y int
	z int
}

type PointSort struct {
	pslice []Point
	less   func(i, j Point) bool // 这里是重点，这里是我们自定义的比较函数
}

func (p PointSort) Len() int {
	return len(p.pslice)
}

// 这里是重点
func (p PointSort) Less(i, j int) bool {
	return p.less(p.pslice[i], p.pslice[j])
}

func (p PointSort) Swap(i, j int) {
	p.pslice[i], p.pslice[j] = p.pslice[j], p.pslice[i]
}

func main() {
	// 初始化
	var points []Point
	var RandInt = func(start, end int) int {
		return start + rand.Intn(end-start) // 包含start,但是不包含end
	}
	rand.Seed(time.Now().UnixNano())

	// 生成数据
	for i := 0; i < 9; i++ {
		point := Point{RandInt(10, 99), RandInt(10, 99), RandInt(10, 99)}
		points = append(points, point)
	}

	// 查看数据
	fmt.Println("排序前数据: ")
	for i := 0; i < len(points); i++ {
		fmt.Printf("[%d] %+v\n", i+1, points[i])
	}

	// 排序
	psort := PointSort{
		pslice: points,
		less: func(i, j Point) bool {
			return i.x < j.x
		},
	}
	sort.Sort(psort)
	points = psort.pslice

	// 查看数据
	fmt.Println("排序后数据: ")
	for i := 0; i < len(points); i++ {
		fmt.Printf("[%d] %+v\n", i+1, points[i])
	}
}

// 总结：
//   (1) 如果是单纯为了排序，这种方法不可取，因为太复杂了，但是，
//   (2) 如果本身就有一个这样的结构体，要给他增加一个排序方法，这种方式就很好用了
```

:::

<br />

### 包含多个排序条件

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"math/rand"
	"sort"
	"time"
)

type Point struct {
	x int
	y int
	z int
}

func main() {
	// 初始化
	var points []Point
	var RandInt = func(start, end int) int {
		return start + rand.Intn(end-start) // 包含start,但是不包含end
	}
	rand.Seed(time.Now().UnixNano())

	// 生成数据
	for i := 0; i < 9; i++ {
		point := Point{RandInt(10, 15), RandInt(10, 15), RandInt(10, 15)}
		points = append(points, point)
	}

	// 查看数据
	fmt.Println("排序前数据: ")
	for i := 0; i < len(points); i++ {
		fmt.Printf("[%d] %+v\n", i+1, points[i])
	}

	// 排序：按照多条件排序
	sort.Slice(points, func(i, j int) bool {
		// 第一条件: 按照x升序排序
		if points[i].x != points[j].x {
			return points[i].x < points[j].x
		}

		// 第二条件：按照y降序排序
		if points[i].y != points[j].y {
			return points[i].y > points[j].y
		}

		// 第三条件：按照z升序排序
		return points[i].z < points[j].z
	})

	// 查看数据
	fmt.Println("排序后数据: ")
	for i := 0; i < len(points); i++ {
		fmt.Printf("[%d] %+v\n", i+1, points[i])
	}
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
排序前数据: 
[1] {x:16 y:14 z:16}
[2] {x:14 y:18 z:16}
[3] {x:12 y:18 z:13}
[4] {x:17 y:11 z:18}
[5] {x:12 y:12 z:19}
[6] {x:14 y:13 z:10}
[7] {x:17 y:19 z:16}
[8] {x:14 y:18 z:18}
[9] {x:18 y:19 z:17}
排序后数据:
[1] {x:12 y:18 z:13}
[2] {x:12 y:12 z:19}
[3] {x:14 y:18 z:16}
[4] {x:14 y:18 z:18}
[5] {x:14 y:13 z:10}
[6] {x:16 y:14 z:16}
[7] {x:17 y:19 z:16}
[8] {x:17 y:11 z:18}
[9] {x:18 y:19 z:17}
```

:::

<br />

### 稳定和不稳定排序

因为代码不容出测试出结果，我们直接举个假想的例子来说明

```go
// 排序规则：仅按照x的值来进行排序

// 排序前数据:
{x:26 y:45 z:16}
{x:37 y:19 z:45}
{x:26 y:36 z:94}

// 排序后数据:
{x:26 y:36 z:94}
{x:26 y:45 z:16}
{x:37 y:19 z:45}

// 发现什么问题了吗？
// (1) 首先，的确是按照x值进行排序了
// (2) 其次，我们看y值的数据，原始数据中y=45为第一条数据，排序后变成第二条数据了，
//          它其实放到第一条顺序也是可以的，同样满足按照x值排序
//          像这种 => 可能会发生排序后的顺序与原始顺序不一致的情况，我们就称为不稳定排序，反之称为稳定排序
// (3) sort.Sort和sort.Slice是不稳定排序
// (4) sort.Stable和sort.SliceStable是对应的稳定排序
```

<br />

### 非切片类型排序

<br />

### 插入数据时排序

<br />
