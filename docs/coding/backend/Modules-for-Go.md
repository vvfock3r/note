# Go实用模块

## 资料

* [https://pkg.go.dev/](https://pkg.go.dev/)
* [https://github.com/avelino/awesome-go](https://github.com/avelino/awesome-go)

<br />

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
        <td>时间</td>
        <td><a href="#time" style="text-decoration:none;">time</a></td>
        <td><li><code>Go 1.19</code></li></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>排序</td>
        <td><a href="#sort" style="text-decoration:none;">sort</a></td>
        <td><li><code>Go 1.19</code></li></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>加密</td>
        <td><a href="#bcrypt" style="text-decoration:none;">bcrypt</a></td>
        <td><li><code>Go 1.19</code></li></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>序列化和反序列化</td>
        <td><a href="#json" style="text-decoration:none;">json</a></td>
        <td><li><code>Go 1.19</code></li></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>正则</td>
        <td><a href="#regexp" style="text-decoration:none;">regexp</a></td>
        <td><li><code>Go 1.19</code></li></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>系统信号</td>
        <td><a href="#signal" style="text-decoration:none;">signal</a></td>
        <td><li><code>Go 1.19</code></li></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>随机数</td>
        <td><a href="#math-rand" style="text-decoration:none;">math/rand</a></td>
        <td><li><code>Go 1.19</code></li></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>文件路径</td>
        <td><a href="#path-filepath" style="text-decoration:none;">path/filepath</a></td>
        <td><li><code>Go 1.19</code></li></td>
        <td></td>
        <td></td>
    </tr>
    </tbody>
</table>

<br />


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
    <tr>
        <td>Token</td>
        <td><a href="#jwt" style="text-decoration:none;">JWT</a></td>
        <td><li><code>Go 1.19</code></li><li><code>JWT v4.4.2</code></li></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>验证器</td>
        <td><a href="#validator" style="text-decoration:none;">Validator</a></td>
        <td><li><code>Go 1.19</code></li><li><code>Validator v10.11.1</code></li></td>
        <td></td>
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

### 输出SQL语句

文档：[https://gorm.io/zh_CN/docs/logger.html](https://gorm.io/zh_CN/docs/logger.html)

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"gorm.io/gorm/logger"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func getDB() (*gorm.DB, error) {
	username := "root"
	password := "QiNqg[l.%;H>>rO9"
	host := "43.154.36.151"
	port := 3306
	dbName := "demo"
	charSet := "utf8mb4"
	conntimeout := "5s"
	readTimeout := "10s"
	writeTimeout := "10s"

	// 初始化dsn
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

	// 初始化日志
	newLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags), // io writer（日志输出的目标，前缀和日志包含的内容——译者注）
		logger.Config{
			SlowThreshold:             time.Second, // 慢SQL阈值
			LogLevel:                  logger.Info, // 日志级别
			IgnoreRecordNotFoundError: true,        // 忽略ErrRecordNotFound（记录未找到）错误
			Colorful:                  true,        // 是否彩色输出
		},
	)

	// 连接数据库
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: newLogger,
	})
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
    
    // 若只想单独对某一条或几条语句语句进行Debug，可以将日志级别调整为logger.Silent,
    // 然后使用db.Debug().xxx
}
```

输出结果

![image-20221127193655596](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221127193655596.png)

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

::: details 点击查看完整代码

```go
	// 硬删除
	var user []User
	result = db.Unscoped().Where("name LIKE ?", "jinzhu%").Find(&user).Delete(&user)
	if result.Error != nil {
		panic(err)
	}

	fmt.Println("硬删除记录数目: ", result.RowsAffected)
```

:::

<br />

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

## Time

文档：[https://pkg.go.dev/time](https://pkg.go.dev/time)

### 概念

**协调世界时 UTC**

协调世界时（Coordinated Universal Time，UTC） 是最主要的世界时间标准，由原子钟报时，与时区无关

<br />

**Unix时间戳**

Unix时间戳指的是UTC时间 `1970-01-01 00:00:00` 到现在所经过的时间，是一个整数，与时区无关，可以分为*秒级时间戳*、*毫秒级时间戳*、*纳秒级时间戳*等

<br />

**时区**

中国处于东八区，东记为正，西记为负，中国时间也就是`+0800`,也就是说 中国时间比UTC时间快8小时，举例如下：    

```bash
中国的时间  = UTC      + (+0800)
12:00:00  = 04:00:00 + 8
```

<br />

### 时间点

#### 1）结构体

`time.Time` 结构体表示一个具有**纳秒精度**的时间点

```go
type Time struct {
	wall uint64
	ext  int64
	loc *Location
}
```

<br />

#### 2）获取当前时间

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 获取当前时间（默认为本地系统时区）
	fmt.Println(time.Now())

	// 获取当前时间（不管之前的时区是什么，将Time对象显示转为本地系统时区）
	fmt.Println(time.Now().Local())

	// 获取当前时间（不管之前的时区是什么，将Time对象显示转为UTC时间，也可以理解成是0时区）
	fmt.Println(time.Now().UTC())
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
2022-10-08 12:02:51.8149117 +0800 CST m=+0.002145601
2022-10-08 12:02:51.8260779 +0800 CST
2022-10-08 04:02:51.8260779 +0000 UTC
```

这里有一行`m=+0.002145601`是什么意思？

其实他是记录了**单调时钟**的信息，我们将在后面的章节详细介绍

:::

<br />

#### 3）挂钟和单调时钟

**我们的计算机有两种不同类型的时钟**

* 挂钟（*a wall clock*）：挂钟是我们平常所看到的系统时间，通常与NTP（网络时间协议）服务器同步。
* 单调时钟（*a monotonic clock*）：单调时钟提供了一个始终向前的时间。

**两者的不同**

* 挂钟可能会由用户或其他程序调整而改变，单调时钟不会受到用户或其他程序调整而改变
* 一般规则是挂钟是用来报时的，而单调钟是用来测量时间的

**应用场景举例**

* 当测量一项任务需要多长时间，应使用单调时钟（若使用挂钟，在测量过程中时间发生改变，则测量可能不准确）

**Go语言中挂钟和单调时钟**

```go
// fmt.Println(time.Now()) 
// m=+0.002145601代表此Time结构体包含有单调时钟的信息
2022-10-08 12:02:51.8149117 +0800 CST m=+0.002145601  

// fmt.Println(time.Now().Local())
// 这里没有m=±<value>的信息，所以这个结构体并不包含单调时钟的信息
2022-10-08 12:02:51.8260779 +0800 CST

// 在 time.Now().String() 方法注释中，我们也可以找到一部分关于这方面的信息
// String returns the time formatted using the format string
//
//	"2006-01-02 15:04:05.999999999 -0700 MST"
//
// If the time has a monotonic clock reading, the returned string
// includes a final field "m=±<value>", where value is the monotonic
// clock reading formatted as a decimal number of seconds.
//
// The returned string is meant for debugging; for a stable serialized
// representation, use t.MarshalText, t.MarshalBinary, or t.Format
// with an explicit format string.
```

官网上的参考信息：[https://pkg.go.dev/time#hdr-Monotonic_Clocks](https://pkg.go.dev/time#hdr-Monotonic_Clocks)



::: details 辅助脚本：用于调整或重置系统时间，仅适用于Linux

```bash
[root@localhost ~]# cat modify_system_time.sh 
#!/bin/bash
set -euo pipefail

# 显示帮助
function ShowUsage(){
  echo "Usage: $0 reset"
  echo "Usage: $0 add [+-]Number"
}

# 修改系统时间
function ModifySystemTime(){
    add_seconds="${1:-0}"
    timestamp_now=$(date +"%s")
    timestamp_new=$((timestamp_now + ${add_seconds}))
    time_new="$(date -d @${timestamp_new} +"%Y-%m-%d %H:%M:%S")"
    date -s "${time_new}" +"%Y-%m-%d %H:%M:%S"
}

# 重置系统时间
function ResetSystemTime(){
    ntpdate time.windows.com   
}

# 执行入口
function main(){
    action="${1:-help}"
    if [[ "${action}" == "reset" ]];then
      ResetSystemTime && exit 0 || exit 1
    fi

    if [[ "${action}" == "add" ]];then
        if [[ -n $(echo "$2" | tr -d '[\-,+,0-9]') ]];then
            ShowUsage; exit 0
        fi
      ModifySystemTime "$2" && exit 0 || exit 1
    fi

    ShowUsage
}

main "$@"
```

:::

::: details （1）使用挂钟测量程序运行时间演示：若测量过程中时间改变，【测量结果将不准确】

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 计时开始时间（此时间为挂钟时间，没有携带单调时钟信息）
	start := time.Now().Local()
	fmt.Println("开始运行:", start)

	// 模拟程序运行N秒
	time.Sleep(time.Second * 5)

	// 运行结束（这里携带或不携带单调时钟都可以）
	end := time.Now().Local()
	fmt.Println("运行结束:", end)

	// 统计计时
	fmt.Printf("运行耗时: %.2f秒\n", end.Sub(start).Seconds())
}
```

输出结果

![go_wall_clock_error](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//go_wall_clock_error.gif)

:::

::: details （2）使用单调时钟测量程序运行时间演示：若测量过程中时间改变，【测量结果依旧准确】

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 计时开始时间（此时间携带单调时钟信息）
	start := time.Now()
	fmt.Println("开始运行:", start)

	// 模拟程序运行N秒
	time.Sleep(time.Second * 5)

	// 运行结束
	end := time.Now()
	fmt.Println("运行结束:", end)

	// 统计计时
	fmt.Printf("运行耗时: %.2f秒\n", end.Sub(start).Seconds())
}
```

输出结果

![go_time_monotonic_clock_right](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//go_time_monotonic_clock_right.gif)

:::

<br />

#### 4）自定义和解析时间

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// time.Date 自定义时间，年-月-日-时-分-秒-纳秒-时区, 返回Time对象
	{
		t := time.Date(2030, 1, 1, 12, 01, 02, 0, time.Local)
		fmt.Println("1)", t)
	}

	// time.Parse 解析字符串时间，新时间的时区为UTC
	{
		t, err := time.Parse("2006-01-02 15:04:05", "2030-01-01 12:01:02")
		if err != nil {
			panic(err)
		}
		fmt.Println("2)", t)
	}
	// time.ParseInLocation 解析字符串时间，可以指定新时间的时区
	{
		t, err := time.ParseInLocation("2006-01-02 15:04:05", "2030-01-01 12:01:02", time.Local)
		if err != nil {
			panic(err)
		}
		fmt.Println("3)", t)
	}
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
1) 2030-01-01 12:01:02 +0800 CST
2) 2030-01-01 12:01:02 +0000 UTC
3) 2030-01-01 12:01:02 +0800 CST
```

:::

<br />

#### 5）格式化和序列化

::: details （1）输出格式化的字符串

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 输出基本格式化的字符串
	fmt.Println("基本用法: ", time.Now().Format("2006-01-02 15:04:05"))

	// 输出携带时区信息的字符串
	fmt.Println("携带时区: ", time.Now().Format("2006-01-02 15:04:05 -0700 MST"))

	// 指定毫秒、微妙或纳秒级别的精度，请注意下面这两个模板是合法的，但是有一些区别
	// 000000000：输出纳秒级别的时间，秒后面一定是9位数
	// 999999999：输出纳秒级别的时间，秒后面不一定是9位数，最末尾的0就给省略掉了
	fmt.Println("纳秒精度: ", time.Now().Format("2006-01-02 15:04:05.000000000 -0700 MST"))
	fmt.Println("纳秒精度: ", time.Now().Format("2006-01-02 15:04:05.999999999 -0700 MST"))

	// 输出携带单调时钟信息的字符串
	fmt.Println("单调时钟: ", time.Now().String())

	// Go预定义格式化,等等还有很多
	// time.RFC3339 是一种国际标准, T用于分隔日期和时间，Z表示0时区(即UTC时间)
	fmt.Println("RFC3339 : ", time.Now().Format(time.RFC3339))
	fmt.Println("RFC3339 : ", time.Now().UTC().Format(time.RFC3339))
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
基本用法:  2022-10-11 18:56:40
携带时区:  2022-10-11 18:56:40 +0800 CST                      
纳秒精度:  2022-10-11 18:56:40.883881000 +0800 CST            
纳秒精度:  2022-10-11 18:56:40.883881 +0800 CST               
单调时钟:  2022-10-11 18:56:40.883881 +0800 CST m=+0.015173001
RFC3339 :  2022-10-11T18:56:40+08:00                          
RFC3339 :  2022-10-11T10:56:40Z
```

:::

::: details （2）序列化和反序列化

```go
package main

import (
	"encoding/json"
	"fmt"
	"time"
)

func main() {
	// 序列化：使用的是纳秒级别的RFC3339格式，即RFC3339Nano
	timeJson, err := time.Now().MarshalJSON()
	if err != nil {
		panic(err)
	}
	fmt.Println(string(timeJson))

	// 反序列化
	var t time.Time
	err = json.Unmarshal([]byte(timeJson), &t)
	if err != nil {
		panic(err)
	}
	fmt.Println(t)
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
"2022-10-09T15:38:34.8018945+08:00"
2022-10-09 15:38:34.8018945 +0800 CST
```

说明

默认的JSON序列化方式可读性比较差，若要定制JSON序列化字符串，可以参考 JSON模块

:::

<br />

#### 6）时间戳转换

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 时间 -> 时间戳
	// 1秒   == 1000毫秒
	// 1毫秒 == 1000微妙
	// 1微妙 == 1000纳秒
	fmt.Printf("秒级时间戳   ：%d\n", time.Now().Unix())
	fmt.Printf("毫秒级时间戳 ：%d\n", time.Now().UnixMilli())
	fmt.Printf("微秒级时间戳 ：%d\n", time.Now().UnixMicro())
	fmt.Printf("纳秒级时间戳 ：%d\n", time.Now().UnixNano())

	//  时间戳  -> 转为本地时区的时间
	fmt.Println(time.Unix(1665371603, 1572000000)) // 第一个参数为秒级时间戳，第二个参数为纳秒（一般设置为0即可）,两个值相加得出最终的时间戳
	fmt.Println(time.UnixMilli(1665371603572))     // 毫秒级时间戳转为时间对象
	fmt.Println(time.UnixMicro(1665371603572000))  // 微秒级时间戳转为时间对象
	//fmt.Println(time.Unix(16653716030000000000000000000, 0)) // 当传递的值过大时候会报错
}
```

输出结果

```bash
秒级时间戳   ：1665372429
毫秒级时间戳 ：1665372429883      
微秒级时间戳 ：1665372429883642   
纳秒级时间戳 ：1665372429883642700
2022-10-10 11:13:24.572 +0800 CST 
2022-10-10 11:13:23.572 +0800 CST 
2022-10-10 11:13:23.572 +0800 CST
```

:::

<br />

#### 7）时间分段获取

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 基本信息
	fmt.Println("时间: ", time.Now())
	fmt.Println("年份: ", time.Now().Year())
	fmt.Println("月份: ", int(time.Now().Month()))
	fmt.Println("日期: ", time.Now().Day())
	fmt.Println("小时: ", time.Now().Hour())
	fmt.Println("分钟: ", time.Now().Minute())
	fmt.Println("秒数: ", time.Now().Second())
	fmt.Println("周几: ", time.Now().Weekday()) // 周日是0，周一是1，以此类推

	// 今天是今年的第几天
	fmt.Println("今天是今年的第几天: ", time.Now().YearDay())

	// 本周是今年的第几周
	year, week := time.Now().ISOWeek()
	year = year
	fmt.Println("本周是今年的第几周: ", week)

	// 本周第一天和最后一天
	var weekday int
	if time.Now().Weekday() == 0 {
		weekday = 7
	} else {
		weekday = int(time.Now().Weekday())
	}
	weekFirst := time.Now().AddDate(0, 0, -weekday+1)
	weekLast := time.Now().AddDate(0, 0, 7-weekday)
	fmt.Println("本周正数第一天：", weekFirst)
	fmt.Println("本周倒数第一天：", weekLast)

	// 本月第一天和最后一天
	monthFirst := time.Now().AddDate(0, 0, -time.Now().Day()+1)
	monthLast := time.Now().AddDate(0, 1, -time.Now().Day())
	fmt.Println("本月正数第一天：", monthFirst)
	fmt.Println("本月倒数第一天：", monthLast)

	// 本年第一天和最后一天
	yearFirst := time.Now().AddDate(0, 0, time.Now().YearDay()*-1+1)
	yearLast := yearFirst.AddDate(1, 0, -1)
	fmt.Println("本年正数第一天：", yearFirst)
	fmt.Println("本年倒数第一天：", yearLast)
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
时间:  2022-10-10 18:32:37.3697933 +0800 CST m=+0.003243701
年份:  2022
月份:  10
日期:  10
小时:  18
分钟:  32
秒数:  37
周几:  Monday
今天是今年的第几天:  283
本周是今年的第几周:  41
本周正数第一天： 2022-10-10 18:32:37.3839166 +0800 CST
本周倒数第一天： 2022-10-16 18:32:37.3839166 +0800 CST
本月正数第一天： 2022-10-01 18:32:37.3839166 +0800 CST
本月倒数第一天： 2022-10-31 18:32:37.3839166 +0800 CST
本年正数第一天： 2022-01-01 18:32:37.3839166 +0800 CST
本年倒数第一天： 2022-12-31 18:32:37.3839166 +0800 CST
```

:::

<br />

#### 8）比较操作

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 小于（早）比较，判断 当前时间 < 当前时间+1秒，输出 true
	fmt.Println(time.Now().Before(time.Now().Add(time.Second)))

	// 晚于(迟)比较，输出false
	fmt.Println(time.Now().After(time.Now().Add(time.Second)))

	// 等于比较，输出true
	t1 := time.Date(2030, 10, 1, 8, 0, 0, 0, time.Local)
	t2 := time.Date(2030, 10, 1, 0, 0, 0, 0, time.UTC)
	fmt.Println(t1.Equal(t2))

	// 判断Time对象是否为空
	var t time.Time
	fmt.Println(t.IsZero())          // true
	fmt.Println(time.Now().IsZero()) // false
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
true
false
true 
true 
false
```

:::

<br />

#### 9）加减操作

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 当前时间
	now := time.Now()

	// 加减一段时间，传入time.Duration对象，返回time.Time对象
	fmt.Println("当前时间: ", now)
	fmt.Println("加一小时: ", now.Add(time.Hour))
	fmt.Println("减一小时: ", now.Add(time.Hour*-1)) // 减法就是加一个负数
	fmt.Println("加一整年: ", now.AddDate(1, 0, 0))  // 这个丢失了单调时钟的信息

	// 两个时间相减，传入time.Time对象，返回time.Duration对象
	fmt.Println(time.Now().Sub(now))

	// --------------------------------------------------------------------------------------------------
	// Sub方法的一些快捷操作
	fmt.Println(time.Since(now)) // 等同于 time.Now().Sub(now)
	fmt.Println(time.Until(now)) // 等同于 now.Sub(time.Now())
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
当前时间:  2022-10-11 18:27:14.6471029 +0800 CST m=+0.003447101
加一小时:  2022-10-11 19:27:14.6471029 +0800 CST m=+3600.003447101
减一小时:  2022-10-11 17:27:14.6471029 +0800 CST m=-3599.996552899
加一整年:  2023-10-11 18:27:14.6471029 +0800 CST
10.1765ms
10.1765ms
-10.7192ms
```

:::

<br />

#### 10）其他操作

::: details （1）时间截断

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 当前时间
	fmt.Println("当前时间: ", time.Now())

	// 当前时间截断
	fmt.Println("保留到时: ", time.Now().Truncate(time.Hour))        // 保留到小时，小时后面的(分钟、秒、毫秒、微妙、纳秒等)置为0
	fmt.Println("保留到分: ", time.Now().Truncate(time.Minute))      // 保留到分钟，分钟后面的(秒、毫秒、微妙、纳秒等)置为0
	fmt.Println("保留到秒: ", time.Now().Truncate(time.Second))      // 保留到秒，秒后面的(毫秒、微妙、纳秒)等置为0
	fmt.Println("保留毫秒: ", time.Now().Truncate(time.Millisecond)) // 保留到毫秒，毫秒后面的(微妙、纳秒)等置为0
	fmt.Println("保留微妙: ", time.Now().Truncate(time.Microsecond)) // 保留到微妙，微妙后面的(纳秒)等置为0
	fmt.Println("保留纳秒: ", time.Now().Truncate(time.Nanosecond))  // 保留到纳秒

	// 相当于在原来截断的基础上，时间再往后推 3 -1 = 2小时
	fmt.Println("截三小时: ", time.Now().Truncate(time.Hour*3)) // 保留到秒，秒后面的(毫秒、微妙、纳秒)等置为0
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
当前时间:  2022-10-10 13:38:19.9412653 +0800 CST m=+0.002712201
保留到时:  2022-10-10 13:00:00 +0800 CST
保留到分:  2022-10-10 13:38:00 +0800 CST
保留到秒:  2022-10-10 13:38:19 +0800 CST
保留毫秒:  2022-10-10 13:38:19.951 +0800 CST
保留微妙:  2022-10-10 13:38:19.951616 +0800 CST
保留纳秒:  2022-10-10 13:38:19.9516164 +0800 CST
截三小时:  2022-10-10 11:00:00 +0800 CST
```

:::

::: details （2）四舍五入

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 当前时间
	fmt.Println("当前时间         : ", time.Now())

	// 当前时间四舍五入
	fmt.Println("四舍五入-保留到秒：", time.Now().Round(time.Second)) // 保留秒，根据后面的四舍五入
	fmt.Println("四舍五入-保留到分：", time.Now().Round(time.Minute)) // 保留分钟，根据后面的四舍五入
	fmt.Println("四舍五入-保留到时：", time.Now().Round(time.Hour))   // 保留小时，根据后面的四舍五入

	fmt.Println("四舍五入-保留到时：", time.Now().Round(time.Minute*1)) // 保留小时，根据后面的四舍五入
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
当前时间       :  2022-10-10 13:40:51.5158079 +0800 CST m=+0.002765001
四舍五入-保留到秒： 2022-10-10 13:40:52 +0800 CST
四舍五入-保留到分： 2022-10-10 13:41:00 +0800 CST
四舍五入-保留到时： 2022-10-10 14:00:00 +0800 CST
```

:::

::: details （3）拷贝副本

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 当前时间
	now := time.Now()

	// 休眠5秒钟
	time.Sleep(time.Second * 5)

	// 创建now的副本，第一个参数为时区，可以使用被拷贝对象的时区，也可以使用其他时区
    // 这可以达到 同一时间在不同时区的转换 效果
	nowReplica := now.In(now.Location())
	nowReplicaUTC := now.In(time.UTC)
	nowReplicaLocal := now.In(time.Local)

	// 比较一下时间是否相等
	fmt.Println(now)
	fmt.Println(nowReplica)
	fmt.Println(nowReplicaUTC)
	fmt.Println(nowReplicaLocal)

	// 比较
	fmt.Println(now.Equal(nowReplicaUTC))
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
2022-10-10 18:17:28.5551063 +0800 CST m=+0.002784801
2022-10-10 18:17:28.5551063 +0800 CST
2022-10-10 10:17:28.5551063 +0000 UTC   # UTC比CST慢8小时
2022-10-10 18:17:28.5551063 +0800 CST
true
```

:::

<br />

### 时间段

#### 1）结构体

```go
type Duration int64
```

<br />

#### 2）解析时间段

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 先构造一个指定的时间
	layout := "2006-01-02 15:04:05.000000000 -0700 MST"
	date := time.Date(2030, 1, 1, 0, 0, 0, 0, time.UTC)
	fmt.Println("原始时间: ", date.Format(layout))

	// 解析字符串时间段，有效的单位：
	// ns       纳秒
	// us or µs 微妙
	// ms       毫秒
	// s        秒
	// m        分钟
	// h        小时

	// 加1纳秒
	{
		dura, err := time.ParseDuration("1ns")
		if err != nil {
			panic(err)
		}
		fmt.Println("加一纳秒: ", date.Add(dura).Format(layout))
	}
	// 加1微秒
	{
		dura, err := time.ParseDuration("1us")
		if err != nil {
			panic(err)
		}
		fmt.Println("加一微秒: ", date.Add(dura).Format(layout))
	}
	// 加1毫秒
	{
		dura, err := time.ParseDuration("1ms")
		if err != nil {
			panic(err)
		}
		fmt.Println("加一毫秒: ", date.Add(dura).Format(layout))
	}
	// 加1秒
	{
		dura, err := time.ParseDuration("1s")
		if err != nil {
			panic(err)
		}
		fmt.Println("加一秒钟: ", date.Add(dura).Format(layout))
	}
	// 加1分钟
	{
		dura, err := time.ParseDuration("1m")
		if err != nil {
			panic(err)
		}
		fmt.Println("加一分钟: ", date.Add(dura).Format(layout))
	}
	// 加1小时
	{
		dura, err := time.ParseDuration("1h")
		if err != nil {
			panic(err)
		}
		fmt.Println("加一小时: ", date.Add(dura).Format(layout))
	}

	// 加 1小时2分钟30秒400毫秒500微妙600纳秒
	{
		dura, err := time.ParseDuration("1h2m30s400ms500us600ns")
		if err != nil {
			panic(err)
		}
		fmt.Println("组合形式: ", date.Add(dura).Format(layout))
	}
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
原始时间:  2030-01-01 00:00:00.000000000 +0000 UTC
加一纳秒:  2030-01-01 00:00:00.000000001 +0000 UTC
加一微秒:  2030-01-01 00:00:00.000001000 +0000 UTC
加一毫秒:  2030-01-01 00:00:00.001000000 +0000 UTC
加一秒钟:  2030-01-01 00:00:01.000000000 +0000 UTC
加一分钟:  2030-01-01 00:01:00.000000000 +0000 UTC
加一小时:  2030-01-01 01:00:00.000000000 +0000 UTC
组合形式:  2030-01-01 01:02:30.400500600 +0000 UTC
```

:::

<br />

#### 3）随机休眠N秒

::: details 点击查看详情

```go
package main

import (
	"math/rand"
	"time"
)

func main() {
	// 随机休眠0-9秒：错误的写法
	// 原因是：
	//   (1) Sleep(d Duration)：time.Sleep要求参数是Duration类型
	//   (2) time.Second是Duration，但是rand.Intn(10)是int类型，需要先转为Duration类型
	//time.Sleep(time.Second * rand.Intn(10))

	// 随机休眠0-9秒：正确的写法
	time.Sleep(time.Second * time.Duration(rand.Intn(10)))
}
```

:::

<br />

### 时区

#### 1）结构体

```go
type Location struct {
	name string
	zone []zone
	tx   []zoneTrans

	extend string

	cacheStart int64
	cacheEnd   int64
	cacheZone  *zone
}

// UTC时区
var UTC *Location = &utcLoc
var utcLoc = Location{name: "UTC"}

// 本地时区
var Local *Location = &localLoc
var localLoc Location
```

<br />

#### 2）自定义时区

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 自定义时区，第一个参数为时区名称（这里的CSE是我随手取的名字，并代表真实的时区），第二个参数为UTC时间秒级偏移量
	loc := time.FixedZone("CSE", 7*3600)

	// 使用自定义时区构造一个时间
	date := time.Date(2030, 1, 1, 12, 0, 0, 0, loc)

	// 查看 时区名称 和 秒级偏移量
	fmt.Println(time.Now().Zone())
	fmt.Println(date.Zone())

	// 将一个时区的时间转为另一个时区的时间
	fmt.Println(time.Now())
	fmt.Println(time.Now().In(loc))
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
CST 28800
CSE 25200                                           
2022-10-11 19:34:23.1582417 +0800 CST m=+0.013138201
2022-10-11 18:34:23.1588336 +0700 CSE                # 这里慢一个小时
```

:::

<br />

#### 3）读取已有时区

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"time"
	//_ "time/tzdata"
)

func main() {
	// 读取时区,会从以下4个地方读取
	// 1) ZONEINFO环境变量指向的目录或未压缩的zip文件
	// 2) Unix系统上的时区文件信息，一般是 /usr/share/zoneinfo 目录下
	// 3) $GOROOT/lib/time/zoneinfo.zip
	// 4) time/tzdata模块（若该模块已在代码中导入）
	zoneShangHai, err := time.LoadLocation("Asia/Shanghai")
	if err != nil {
		panic(err)
	}
	fmt.Println(zoneShangHai)

	// 综上所述，time.LoadLocation依赖于tzdata数据库
	// 需要注意的是，在windows系统上（没有安装go语言），以上代码将会报错，解决办法是：将以上代码import部分的注释打开，导入 time/tzdata数据库
}
```

输出结果

```bash
Asia/Shanghai
```

:::

<br />

### 定时器

#### 1）结构体

```go
type Ticker struct {
	C <-chan Time   // 只读的Channel（Time类型）,缓冲区长度为1（后面会讲到）
	r runtimeTimer  // 
}

// Interface to timers implemented in package runtime.
// Must be in sync with ../runtime/time.go:/^type timer
type runtimeTimer struct {
	pp       uintptr
	when     int64
	period   int64
	f        func(any, uintptr) // NOTE: must not be closure
	arg      any
	seq      uintptr
	nextwhen int64
	status   uint32
}

// 可以看到runtimeTimer相关的实现其实都在runtime/time.go中
```

<br />

#### 2）基础用法

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 先来用一下各种方法
	{
		// 实例化一个Ticker对象，指定时间间隔为1秒
		ticker := time.NewTicker(time.Second)

		// 读取Channel中的数据
		// 大多数情况下我们在意的并不是读出来的数据，而是每次读取数据之间间隔的1秒钟，
		// 比如我们将其放到for循环中，每秒执行一些操作，就很好使
		fmt.Println("读取数据: ", <-ticker.C)
		fmt.Println("读取数据: ", <-ticker.C)

		// 关闭定时器
		// 若关闭后再读取会报错: fatal error: all goroutines are asleep - deadlock!
		fmt.Println("停止定时器...")
		ticker.Stop()
		//fmt.Println("读取数据: ", <-ticker.C)

		// 重置时间间隔
		fmt.Println("重置时间为3秒钟...")
		ticker.Reset(time.Second * 3)
		fmt.Println("读取数据: ", <-ticker.C)
		fmt.Println("读取数据: ", <-ticker.C)

		// 运行结束
		fmt.Println("Execution completed")
	}
	// 通常情况下我们会这样用
	{
		ticker := time.NewTicker(time.Second)
		defer ticker.Stop()
		for t := range ticker.C {
			fmt.Println(t)
		}
	}

	// 或者这样用
	{
		ticker := time.NewTicker(time.Second)
		defer ticker.Stop()
		for {
			select {
			case t := <-ticker.C:
				fmt.Println(t)
			}
		}
	}
}

```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
读取数据:  2022-10-12 19:18:29.0027248 +0800 CST m=+1.011503901
读取数据:  2022-10-12 19:18:30.0037176 +0800 CST m=+2.012496701
停止定时器...     
重置时间为3秒钟...
读取数据:  2022-10-12 19:18:33.0189901 +0800 CST m=+5.027769201
读取数据:  2022-10-12 19:18:36.019283 +0800 CST m=+8.028062101
Execution completed
2022-10-12 19:18:37.0341358 +0800 CST m=+9.042914901
2022-10-12 19:18:38.0341197 +0800 CST m=+10.042898801
2022-10-12 19:18:39.024688 +0800 CST m=+11.033467101
2022-10-12 19:18:40.0196224 +0800 CST m=+12.028401501
...
```

:::

<br />

#### 3）NewTicker

源码

```go
func NewTicker(d Duration) *Ticker {
	if d <= 0 {
		panic(errors.New("non-positive interval for NewTicker"))
	}
	// Give the channel a 1-element time buffer.
	// If the client falls behind while reading, we drop ticks
	// on the floor until the client catches up.
	c := make(chan Time, 1)
	t := &Ticker{
		C: c,
		r: runtimeTimer{
			when:   when(d),
			period: int64(d),
			f:      sendTime,
			arg:    c,
		},
	}
	startTimer(&t.r)
	return t
}

func sendTime(c any, seq uintptr) {
	select {
	case c.(chan Time) <- Now():
	default:
	}
}
```

说明

* `NewTicker`中定义了Channel缓冲区长度为1
* `NewTicker`中使用了`sendTime`函数，用于向Channel中写入数据，可以看到会将当前时间写入Channel中，若写满了就什么也不做
* `NewTicker`函数返回前就开始计时了，对应源码中`startTimer`函数调用

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 实例化一个Ticker对象，指定时间间隔为1秒
	ticker := time.NewTicker(time.Second)

	// 休眠N秒钟
	fmt.Println("当前时间: ", time.Now())
	time.Sleep(time.Second * 10)

	// 读取Channel中的数据
	fmt.Println("读取数据: ", <-ticker.C)
	fmt.Println("读取数据: ", <-ticker.C)
	fmt.Println("读取数据: ", <-ticker.C)
	fmt.Println("读取数据: ", <-ticker.C)
	fmt.Println("读取数据: ", <-ticker.C)
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
当前时间:  2022-10-12 19:19:15.5927709 +0800 CST m=+0.002690501      # 当前时间秒数为15
读取数据:  2022-10-12 19:19:16.5975755 +0800 CST m=+1.007495101      # 休眠10秒钟后，第一次读取数据为16秒，因为计数器在休眠前就已经开始了
读取数据:  2022-10-12 19:19:26.5967247 +0800 CST m=+11.006644301     # 第二次读取数据为26秒，这是当前的时间
读取数据:  2022-10-12 19:19:27.5976074 +0800 CST m=+12.007527001
读取数据:  2022-10-12 19:19:28.5970446 +0800 CST m=+13.006964201
读取数据:  2022-10-12 19:19:29.5969086 +0800 CST m=+14.006828201
```

:::

<br />

#### 4）并发读取

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

var wg sync.WaitGroup

func main() {
	// 实例化一个Ticker对象，指定时间间隔为1秒
	ticker := time.NewTicker(time.Second)
    defer ticker.Stop()
    
	// 并发读取
	for i := 0; i < 10; i++ {
		wg.Add(1)
		go func(i int) {
			fmt.Printf("[%d] Running...\n", i)
			fmt.Printf("[%d] %s\n", i, <-ticker.C)
			wg.Done()
		}(i)
	}
	wg.Wait()
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
[9] Running...
[0] Running...
[5] Running...
[2] Running...
[3] Running...
[4] Running...
[7] Running...
[6] Running...
[1] Running...
[8] Running...
[9] 2022-10-12 19:55:09.0201071 +0800 CST m=+1.010990501
[0] 2022-10-12 19:55:10.0252197 +0800 CST m=+2.016103101
[5] 2022-10-12 19:55:11.0185944 +0800 CST m=+3.009477801
[2] 2022-10-12 19:55:12.0152827 +0800 CST m=+4.006166101
[3] 2022-10-12 19:55:13.0191294 +0800 CST m=+5.010012801
[4] 2022-10-12 19:55:14.0186506 +0800 CST m=+6.009534001
[7] 2022-10-12 19:55:15.0193323 +0800 CST m=+7.010215701
[6] 2022-10-12 19:55:16.0189496 +0800 CST m=+8.009833001
[1] 2022-10-12 19:55:17.0230555 +0800 CST m=+9.013938901
[8] 2022-10-12 19:55:18.0146137 +0800 CST m=+10.00549701
```

:::

<br />

#### 5）ticker.Stop()

* `Stop()`并不会关闭`Ticker`中的Channel，而是将其标记为*已删除*
* `Stop()`函数实现在`runtime/time.go`中，对应函数为`stopTimer`，内容太多就不看了

<br />

#### 6）time.Tick

源码

```go
func Tick(d Duration) <-chan Time {
	if d <= 0 {
		return nil
	}
	return NewTicker(d).C
}
```

说明

* `time.Tick`是`time.NewTicker`的一层包装
* 如果传递的参数<=0返回`nil`，而`time.NewTicker`会抛出`panic`
* <span style="color: red; font-weight: bold;">`time.Tick`因为没有提供关闭(`Stop`)的操作，有可能会引起资源泄露，应当避免使用这个方法</span>

::: details （1）time.Tick引起资源泄露示例

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

func tickerLoop(wg *sync.WaitGroup, quit chan struct{}) {
	defer wg.Done()
	select {
	case <-time.Tick(time.Millisecond * 100):
	case <-quit:
		return
	}
}

func main() {
	// 初始化
	n := 100000
	wg := new(sync.WaitGroup)
	quit := make(chan struct{})

	// 开启N个Goroutine
	for i := 0; i < n; i++ {
		wg.Add(1)
		go tickerLoop(wg, quit)
	}
	fmt.Printf("Making %d tickers\n", n)

	// 休眠1秒钟
	time.Sleep(1 * time.Second)

	// 发送关闭Goroutine信号
	close(quit)
	fmt.Printf("Signalling close\n")

	// 等待所有的Goroutine运行完成
	wg.Wait()

	// 用于hang住程序
	fmt.Printf("Sleeping - examine CPU activity for this process (eg top)\n")
	time.Sleep(time.Hour)
}
```

输出结果

```bash
# 编译、执行
root@ap-hongkang ~]# go build main.go
[root@ap-hongkang ~]# ./main 
Making 100000 tickers
Signalling close
Sleeping - examine CPU activity for this process (eg top)
```

![image-20221013140753891](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221013140753891.png)

:::

::: details （2）使用time.NewTicker进行修复

只需要修改`tickerLoop`函数即可，完整代码如下

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

func tickerLoop(wg *sync.WaitGroup, quit chan struct{}) {
	defer wg.Done()
	ticker := time.NewTicker(time.Millisecond * 100)
	defer ticker.Stop()
	select {
	case <-ticker.C:
	case <-quit:
		return
	}
}

func main() {
	// 初始化
	n := 100000
	wg := new(sync.WaitGroup)
	quit := make(chan struct{})

	// 开启N个Goroutine
	for i := 0; i < n; i++ {
		wg.Add(1)
		go tickerLoop(wg, quit)
	}
	fmt.Printf("Making %d tickers\n", n)

	// 休眠1秒钟
	time.Sleep(1 * time.Second)

	// 发送关闭Goroutine信号
	close(quit)
	fmt.Printf("Signalling close\n")

	// 等待所有的Goroutine运行完成
	wg.Wait()

	// 用于hang住程序
	fmt.Printf("Sleeping - examine CPU activity for this process (eg top)\n")
	time.Sleep(time.Hour)
}
```

![image-20221013191512953](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221013191512953.png)

:::

<br />

### 延时器

#### 1）结构体

```go
type Timer struct {
	C <-chan Time
	r runtimeTimer
}
```

<br />

#### 2）用法总结

延时器和定时器很类似

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

func main() {
	// time.NewTimer 同步执行
	{
		fmt.Println("当前时间: ", time.Now())

		// 延时器基本使用
		timer := time.NewTimer(time.Second * 1)
		defer timer.Stop()
		fmt.Println("当前时间: ", <-timer.C)

		// 重置时间，当延时器处于活跃状态时返回false，当处理已停止或已过期时返回false
		fmt.Println(timer.Reset(time.Second * 2))
		fmt.Println("当前时间: ", <-timer.C)
	}

	// time.NewTimer 同步执行
	{
		// 延时器基本使用
		timer := time.NewTimer(time.Second * 3)
		select {
		case <-timer.C:
			fmt.Println("当前时间: ", time.Now())
		}
	}
	// time.AfterFunc 异步执行
	{
		var wg sync.WaitGroup
		wg.Add(1)
		timer := time.AfterFunc(time.Second*4, func() {
			defer wg.Done()
			fmt.Println("当前时间: ", time.Now())
		})
		defer timer.Stop()
		wg.Wait()
	}

	// 其他
	//time.After是对NewTimer的一层封装，与time.Tick类似，不推荐使用
}
```

输出结果

```bash
当前时间:  2022-10-14 13:08:53.4813516 +0800 CST m=+0.002699601
当前时间:  2022-10-14 13:08:54.5037902 +0800 CST m=+1.025138201
false
当前时间:  2022-10-14 13:08:56.5141258 +0800 CST m=+3.035473801
当前时间:  2022-10-14 13:08:59.5199525 +0800 CST m=+6.041300501
当前时间:  2022-10-14 13:09:03.5254777 +0800 CST m=+10.04682570
```

:::

<br />

## Sort

文档：[https://pkg.go.dev/sort](https://pkg.go.dev/sort)

<br />

### 排序

#### 基本使用

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

#### 解决遗留问题

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

#### 自定义结构体排序

::: details 方式1：sort.Slice（推荐）

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

输出结果

```bash
排序前数据:
[1] {x:55 y:98 z:70}
[2] {x:22 y:49 z:35}
[3] {x:30 y:38 z:40}
[4] {x:70 y:57 z:69}
[5] {x:18 y:90 z:18}
[6] {x:32 y:65 z:10}
[7] {x:34 y:66 z:42}
[8] {x:59 y:41 z:71}
[9] {x:62 y:20 z:48}
排序后数据:         
[1] {x:18 y:90 z:18}
[2] {x:22 y:49 z:35}
[3] {x:30 y:38 z:40}
[4] {x:32 y:65 z:10}
[5] {x:34 y:66 z:42}
[6] {x:55 y:98 z:70}
[7] {x:59 y:41 z:71}
[8] {x:62 y:20 z:48}
[9] {x:70 y:57 z:69}
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

输出结果

```bash
排序前数据:
[1] {x:46 y:45 z:40}
[2] {x:28 y:36 z:47}
[3] {x:58 y:10 z:29}
[4] {x:84 y:88 z:70}
[5] {x:49 y:57 z:81}
[6] {x:32 y:82 z:93}
[7] {x:20 y:21 z:86}
[8] {x:12 y:23 z:51}
[9] {x:30 y:50 z:14}
排序后数据:         
[1] {x:12 y:23 z:51}
[2] {x:20 y:21 z:86}
[3] {x:28 y:36 z:47}
[4] {x:30 y:50 z:14}
[5] {x:32 y:82 z:93}
[6] {x:46 y:45 z:40}
[7] {x:49 y:57 z:81}
[8] {x:58 y:10 z:29}
[9] {x:84 y:88 z:70}
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

输出结果

```bash
排序前数据:
[1] {x:73 y:65 z:96}
[2] {x:37 y:28 z:47}
[3] {x:37 y:63 z:90}
[4] {x:92 y:88 z:21}
[5] {x:89 y:18 z:69}
[6] {x:55 y:97 z:34}
[7] {x:19 y:40 z:26}
[8] {x:78 y:28 z:59}
[9] {x:82 y:26 z:98}
排序后数据:         
[1] {x:19 y:40 z:26}
[2] {x:37 y:28 z:47}
[3] {x:37 y:63 z:90}
[4] {x:55 y:97 z:34}
[5] {x:73 y:65 z:96}
[6] {x:78 y:28 z:59}
[7] {x:82 y:26 z:98}
[8] {x:89 y:18 z:69}
[9] {x:92 y:88 z:21}
```

:::

::: details 方式2的第二次优化：支持自定义比较函数（推荐）

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

type PointList struct {
	pslice []Point
	less   func(i, j Point) bool // 这里是重点，这里是我们自定义的比较函数,内部字段
}

func (p PointList) Len() int {
	return len(p.pslice)
}

// 这里是重点
func (p PointList) Less(i, j int) bool {
	return p.less(p.pslice[i], p.pslice[j])
}

func (p PointList) Swap(i, j int) {
	p.pslice[i], p.pslice[j] = p.pslice[j], p.pslice[i]
}

// 支持自定义比较函数的排序函数
func (p PointList) SortFunc(less func(i, j Point) bool) PointList {
	p.less = less
	sort.Stable(p)
	return p
}

// 构造函数
func NewPointList(pslice []Point) PointList {
	return PointList{pslice: pslice}
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
	pointSort := NewPointList(points)
	pointSort.SortFunc(func(i, j Point) bool {
		return i.x < j.x
	})

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

输出结果

```bash
排序前数据:
[1] {x:75 y:49 z:79}
[2] {x:25 y:18 z:15}
[3] {x:12 y:82 z:52}
[4] {x:50 y:61 z:20}
[5] {x:22 y:77 z:22}
[6] {x:34 y:61 z:20}
[7] {x:42 y:81 z:16}
[8] {x:82 y:25 z:15}
[9] {x:83 y:53 z:72}
排序后数据:         
[1] {x:12 y:82 z:52}
[2] {x:22 y:77 z:22}
[3] {x:25 y:18 z:15}
[4] {x:34 y:61 z:20}
[5] {x:42 y:81 z:16}
[6] {x:50 y:61 z:20}
[7] {x:75 y:49 z:79}
[8] {x:82 y:25 z:15}
[9] {x:83 y:53 z:72}
```

:::

<br />

#### 包含多个排序条件

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

#### 按照指定顺序排序

::: details （1）基础版本

```go
package main

import (
	"fmt"
	"sort"
)

func main() {
	// 功能解释: 将 data 按照 reference 中的元素顺序来排序

	// 原始数据
	data := []int{7, 1, 3, 9, 0, 4, 1, 8, 9, 0, 2, 5}

	// 排序数据
	reference := []int{5, 4, 3, 2, 1, 0, 9, 8, 7, 6}

	// 索引函数
	getIndex := func(r []int, v int) int {
		for i := range r {
			if r[i] == v {
				return i
			}
		}
		return len(r)
	}

	// 按指定数据进行排序
	sort.Slice(data, func(i, j int) bool {
		return getIndex(reference, data[i]) < getIndex(reference, data[j])
	})

	// 查看排序后的结果
	fmt.Printf("%+v\n", data)
}

// 需要注意的点:
//   (1) 排序数据(reference)中是否包含原始数据的所有种类?
//   (2) 不包含时我们的排序结果是如何分布的? 如何修改分布情况?
//
// 总结: 这里面学问还是比较大的,建议在包含原始数据种类的情况下可以大胆使用
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
[5 4 3 2 1 1 0 0 9 9 8 7]
```

:::

::: details （2）优化版本，增加一层缓存，减少遍历次数

```go
package main

import (
	"fmt"
	"sort"
)

func main() {
	// 功能解释: 将 data 按照 reference 中的元素顺序来排序

	// 原始数据
	data := []int{7, 1, 3, 9, 0, 4, 1, 8, 9, 0, 2, 5}

	// 排序数据
	reference := []int{5, 4, 3, 2, 1, 0, 9, 8, 7, 6}

	// 对排序数据生成缓存
	makeCache := func(r []int) map[int]int {
		m := make(map[int]int, len(r))
		for k, v := range r {
			m[v] = k
		}
		return m
	}
	cache := makeCache(reference)

	// 索引函数,修改为从缓存中读取
	getIndex := func(r map[int]int, v int) int {
		if index, ok := r[v]; ok {
			return index
		}
		return len(r)
	}

	// 按指定数据进行排序
	sort.Slice(data, func(i, j int) bool {
		return getIndex(cache, data[i]) < getIndex(cache, data[j])
	})

	// 查看排序后的结果
	fmt.Printf("%+v\n", data)
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
[5 4 3 2 1 1 0 0 9 9 8 7]
```

:::

<br />

#### 稳定和不稳定排序

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

### 二分查找

二分查找有一个前提：<span style="color: red; font-weight: bold;">数据必须是已经排好序的，可以是升序或者降序</span>

#### 基本使用

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"sort"
)

func main() {
	{
		// int切片,已经按升序排好序
		a := []int{1, 3, 6, 10, 15, 21, 28, 36, 45, 55}

		// 返回切片中>=11的第一个元素的索引
		fmt.Println(sort.SearchInts(a, 11))
	}

	{
		// float64切片,已经按升序排好序
		a := []float64{1.0, 2.0, 3.3, 4.6, 6.1, 7.2, 8.0}

		// 返回切片中>=2.1的第一个元素的索引
		fmt.Println(sort.SearchFloat64s(a, 2.1))
	}

	{
		// 字符串切片,已经按第一个字符升序排好序
		a := []string{"bob", "jack", "xiaoming"}

		// 返回切片中第一个字符>=j的第一个元素的索引
		fmt.Println(sort.SearchStrings(a, "j"))
	}
}
```

输出结果

```bash
4
2
1
```

这里的套路和排序一致，我们在后面看一下如何降序搜索等

:::

<br />

#### 进一步使用

::: details （1）使用sort.Search

```go
package main

import (
	"fmt"
	"sort"
)

func main() {
	// int切片
	a := []int32{1, 3, 28, 10, 21, 15, 45, 6, 55, 36}
	fmt.Printf("原始数据: %v\n\n", a)

	{
		// 升序排序
		sort.Slice(a, func(i, j int) bool {
			return a[i] < a[j]
		})
		fmt.Printf("升序排序: %v\n", a)

		// 返回切片中>=11的第一个元素的索引
		i := sort.Search(len(a), func(i int) bool {
			return a[i] >= 11
		})
		fmt.Printf("找到索引: %v\n\n", i)

		// 总结: 在升序排序中,查找时需要使用>或>=
	}

	{
		// 按降序排序
		sort.Slice(a, func(i, j int) bool {
			return a[i] > a[j]
		})
		fmt.Printf("降序排序: %+v\n", a)

		// 返回切片中>=11的第一个元素的索引
		i := sort.Search(len(a), func(i int) bool {
			return a[i] <= 11
		})
		fmt.Printf("找到索引: %v\n\n", i)

		// 总结: 在降序排序中,查找时需要使用<或<=
	}
}
```

输出结果

```bash
原始数据: [1 3 28 10 21 15 45 6 55 36]

升序排序: [1 3 6 10 15 21 28 36 45 55]
找到索引: 4                           
                                      
降序排序: [55 45 36 28 21 15 10 6 3 1]
找到索引: 6
```

:::

**引出问题**

（1）`sort.Search`的第一个参数`n`是什么意思？

第一个参数代表索引结束范围，使用`len(a)`，拿到最大索引，也就意味着允许查找整个切片

（2）若未找到的话会返回什么值？

若未找到会返回`n`的值，即返回`sort.Search`第一个参数的值

（3）`sort.Search`始终都会返回一个索引值（`int`），通常我们还要和`len(a)`做一次判断，来检查返回的索引是否存在。有办法简化这一步骤吗？

可以，使用`sort.Find`

::: details （2）使用sort.Find：sort.Search的升级版本

```go
package main

import (
	"fmt"
	"sort"
)

func main() {
	// int切片
	a := []int32{1, 3, 28, 10, 21, 15, 45, 6, 55, 36}
	fmt.Printf("原始数据: %v\n", a)

	{
		// 升序排序
		sort.Slice(a, func(i, j int) bool {
			return a[i] < a[j]
		})
		fmt.Printf("\n升序排序: %v\n", a)

		// 检查切片中是否有 >= 11的值
		index, found := sort.Find(len(a), func(i int) int {
			if a[i] >= 11 {
				return 0 // 若找到返回0
			}
			return 1 // 若没找到,升序切片,返回>0的值
		})
		fmt.Printf("是否找到: %v\n", found)
		fmt.Printf("索引是啥: %v\n", index)
		fmt.Printf("索引的值: %v\n", a[index]) // 若没找到,这里会索引越界报错
	}

	{
		// 按降序排序
		sort.Slice(a, func(i, j int) bool {
			return a[i] > a[j]
		})
		fmt.Printf("\n降序排序: %+v\n", a)

		// 检查切片中是否有 <= 11的值
		index, found := sort.Find(len(a), func(i int) int {
			if a[i] <= 11 {
				return 0 // 若找到返回0
			}
			return 1 // 若没找到,降序切片,返回>0的值
		})
		fmt.Printf("是否找到: %v\n", found)
		fmt.Printf("索引是啥: %v\n", index)
		fmt.Printf("索引的值: %v\n", a[index]) // 若没找到,这里会索引越界报错
	}

	// 总结:
	// (1) 不管是升序还是降序,若找到了返回0,若没找到返回>0的值
	// (2) 若没找到的话,还是和sort.Search一样,索引的值为n,即len(a)
}
```

输出结果

```bash
原始数据: [1 3 28 10 21 15 45 6 55 36]

升序排序: [1 3 6 10 15 21 28 36 45 55]
是否找到: true                        
索引是啥: 4                           
索引的值: 15                          
                                      
降序排序: [55 45 36 28 21 15 10 6 3 1]
是否找到: true                        
索引是啥: 6                           
索引的值: 10
```

:::

<br />

## Bcrypt

文档：[https://pkg.go.dev/golang.org/x/crypto/bcrypt](https://pkg.go.dev/golang.org/x/crypto/bcrypt)

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"strings"

	"golang.org/x/crypto/bcrypt"
)

// 加密
func Encrypt(password string) (string, error) {
	//hashed, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	hashed, err := bcrypt.GenerateFromPassword([]byte(password), 11)
	if err != nil {
		return "", err
	}
	return string(hashed), nil
}

// 验证
func ValidatePasswordHashed(hashed, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashed), []byte(password))
	if err != nil {
		return false
	}
	return true
}
func main() {
	// 加密和验证
	// 密码
	password := "qaz.123"
	fmt.Println("密码: ", password)

	// 加密
	hashed, err := Encrypt(password)
	if err != nil {
		panic(err)
	}
	fmt.Println("密文: ", hashed)

	// 验证密文
	fmt.Println("验证: ", ValidatePasswordHashed(hashed, password))

	// ----------------------------------------------------------------------------------------------------------------

	// 关于Cost
	fmt.Println()
	fmt.Printf("Cost取值范围: %d - %d (default: %d)\n", bcrypt.MinCost, bcrypt.MaxCost, bcrypt.DefaultCost)
	cost, err := bcrypt.Cost([]byte(hashed))
	fmt.Printf("提取密文Cost: %d\n", cost)

	// ----------------------------------------------------------------------------------------------------------------
	fmt.Println()
	hashedSlice := strings.Split(hashed, "$")
	fmt.Printf("提权密文算法标识符: %s\n", hashedSlice[1])
	fmt.Printf("提取密文随机盐的值: %s\n", hashedSlice[3][:22]) // 随机盐22位

}
```

:::

输出结果

```bash
D:\application\GoLand\demo>go run main.go
密码:  qaz.123
密文:  $2a$11$4u1Pil6uElumGXdICycN/.jhUmK4iatfUi8VwSO9fbgA0WxwgMTd2
验证:  true

Cost取值范围: 4 - 31 (default: 10)
提取密文Cost: 11

提权密文算法标识符: 2a
提取密文随机盐的值: 4u1Pil6uElumGXdICycN/.
```

注意事项

* `cost`值（`GenerateFromPassword`函数的第二个参数）越大,加密速度越慢，同样解密速度也会变慢，一般建议使用默认值（`bcrypt.DefaultCost`）即可

  当加密用户登录密码时，避免因为`cost`过大导致加解密缓慢从而影响用户体验

* 对同一个密码多次进行加密会得到不同的密文，因为 随机盐 存储在了密文中

<br />

## JWT

官网：[https://jwt.io/](https://jwt.io/)

Go客户端库：[https://github.com/golang-jwt/jwt](https://github.com/golang-jwt/jwt)

<br />

### 安装

```bash
go get -u github.com/golang-jwt/jwt/v4
```

<br />

### 示例

::: details 点击查看详情

```go
package main

import (
	"fmt"

	"github.com/golang-jwt/jwt/v4"
)

func main() {
	// 填入第一段信息（Header信息）
	token := jwt.New(jwt.SigningMethodHS256)

	// 填入第二段信息（Payload信息）
	token.Claims = jwt.MapClaims{"sub": "1234567890", "name": "John Doe", "iat": 1516239022}

	// 组合第一段和第二段信息，下面3段代码是一样的，输出结果也是一样的
	{
		sig, err := token.SigningString()
		if err != nil {
			panic(err)
		}
		fmt.Printf("组合第一和第二段信息: %s\n", sig)
	}
	{
		sig, err := token.SigningString()
		if err != nil {
			panic(err)
		}
		fmt.Printf("组合第一和第二段信息: %s\n", sig)
	}
	{
		sig, err := token.SigningString()
		if err != nil {
			panic(err)
		}
		fmt.Printf("组合第一和第二段信息: %s\n", sig)
	}

	// 计算签名，下面3段代码是一样的，key一样，所以输出结果也是一样的
	fmt.Println()
	{
		t, err := token.SignedString([]byte("hello world!"))
		if err != nil {
			panic(err)
		}
		fmt.Printf("通过以上信息计算签名: %s\n", t)
	}
	{
		t, err := token.SignedString([]byte("hello world!"))
		if err != nil {
			panic(err)
		}
		fmt.Printf("通过以上信息计算签名: %s\n", t)
	}
	{
		t, err := token.SignedString([]byte("hello world!"))
		if err != nil {
			panic(err)
		}
		fmt.Printf("通过以上信息计算签名: %s\n", t)
	}

	// 查看JWT
	fmt.Println()
	fmt.Printf("查看JWT第一段: Header   : %#v\n", token.Header)
	fmt.Printf("查看JWT第二段: Payload  : %#v\n", token.Claims)
	fmt.Printf("查看JWT第三段: Signature: %#v\n", token.Signature)
}
```

输出结果

![image-20221003172743697](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221003172743697.png)

发现了什么？

* `JWT`中`Payload`在库中称为`Claims`

* `Token.SigningString()`仅仅是用来组合第一段和第二段信息的

* `Token.SignedString(key interface{})`才是签发`token`的方法，参数必须是`[]byte`，否则会报错 `key is of invalid type`

* 生成`token`以后并不会存储在`Token.Signature`中；在解析`token`时才会使用这个字段存储

* 也可以在实例化时填入`Payload`：

  ```go
  // 填入第一段和第二段信息（Header和Payload信息）
  claims := jwt.MapClaims{"sub": "1234567890", "name": "John Doe", "iat": 1516239022}
  token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
  ```

* 我们所有的参数和 https://jwt.io/ 上的保持一致，但是token却不一样，这是为什么呢？

  原因在于`payload`中的数据顺序不一致，我们修改一下官网中`payload`数据顺序

  ![image-20221003185834897](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221003185834897.png)

  

:::

<br />

### Payload

文档：[https://jwt.io/introduction](https://jwt.io/introduction)

这里主要说一下 [Registered claims](https://tools.ietf.org/html/rfc7519#section-4.1)，他是一组已经提前预定义好的claims，包括以下7个字段

* `iss`（Issuer）：签发人
* `sub`（Subject）：主题
* `aud`（Audience）：受众，也就是预期接收者
* `exp`（Expiration Time）：过期时间
* `nbf`（Not Before）：生效时间
* `iat`（Issued At）：签发时间
* `jti`（JWT ID）: JWT ID

我们也可以自定义字段，比如

```json
{
    "admin": true
}
```

在 `golang-jwt/jwt`库中也有相关的定义

```go
type RegisteredClaims struct {
	// the `iss` (Issuer) claim. See https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.1
	Issuer string `json:"iss,omitempty"`

	// the `sub` (Subject) claim. See https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.2
	Subject string `json:"sub,omitempty"`

	// the `aud` (Audience) claim. See https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.3
	Audience ClaimStrings `json:"aud,omitempty"`

	// the `exp` (Expiration Time) claim. See https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.4
	ExpiresAt *NumericDate `json:"exp,omitempty"`

	// the `nbf` (Not Before) claim. See https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.5
	NotBefore *NumericDate `json:"nbf,omitempty"`

	// the `iat` (Issued At) claim. See https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.6
	IssuedAt *NumericDate `json:"iat,omitempty"`

	// the `jti` (JWT ID) claim. See https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.7
	ID string `json:"jti,omitempty"`
}
```

<br />

### 签发和验证Token

::: details 点击查看详情

```go
package main

import (
	"encoding/base64"
	"errors"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

type Claims struct {
	RegisteredClaims
	PrivateClaims
}

type RegisteredClaims = jwt.RegisteredClaims

type PrivateClaims struct {
	UserName string `json:"username,omitempty"`
	NickName string `json:"nickname,omitempty"`
}

// 核心结构体
type JsonWebToken struct {
	secretKey string
}

// 签发token字符串
func (j *JsonWebToken) CreateToken(c Claims) (string, error) {
	// 实例化Token对象
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, c)

	// 签发token
	return token.SignedString([]byte(j.secretKey))
}

// 解析token字符串
func (j *JsonWebToken) ParseToken(tokenString string) (*Claims, error) {
	// 解析token字符串
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(j.secretKey), nil
	})
	if err != nil {
		return nil, err
	}

	// 验证token是否有效
	if !token.Valid {
		return nil, err
	}

	// 类型断言
	if claims, ok := token.Claims.(*Claims); ok {
		return claims, nil
	} else {
		return nil, errors.New("type Assertion error for JsonWebToken.Claims")
	}
}

// 签发token字符串（先使用base64对密钥编码）
func (j *JsonWebToken) CreateTokenWithBase64(c Claims) (string, error) {
	// 实例化Token对象
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, c)

	// secret使用base64编码
	secretKeyBase64 := base64.StdEncoding.EncodeToString([]byte(j.secretKey))

	// 签发token
	return token.SignedString([]byte(secretKeyBase64))
}

// 解析token字符串（先使用base64对密钥编码）
func (j *JsonWebToken) ParseTokenWithBase64(tokenString string) (*Claims, error) {
	// 解析token字符串
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		// secret使用base64编码
		secretKeyBase64 := base64.StdEncoding.EncodeToString([]byte(j.secretKey))
		return []byte(secretKeyBase64), nil
	})
	if err != nil {
		return nil, err
	}

	// 验证token是否有效
	if !token.Valid {
		return nil, err
	}

	// 类型断言
	if claims, ok := token.Claims.(*Claims); ok {
		return claims, nil
	} else {
		return nil, errors.New("type Assertion error for JsonWebToken.Claims")
	}
}

// 构造函数
func NewJsonWebToken(secretKey string) *JsonWebToken {
	return &JsonWebToken{secretKey}
}

func main() {
	// 实例化Jwt对象
	j := NewJsonWebToken("3E9yQqWT8F52hnIS")

	// 创建Claims对象
	claims := Claims{
		RegisteredClaims: RegisteredClaims{
			// 签发人
			Issuer: "https://jinhui.dev",
			// 主题
			Subject: "User Access Token",
			// 签发时间
			IssuedAt: jwt.NewNumericDate(time.Now()),
			// 生效时间，这里指定1秒后才会生效，若报错 token is not valid yet 说明还未生效
			NotBefore: jwt.NewNumericDate(time.Now().Add(time.Second * 1)),
			// 过期时间，这里指定生效以后2小时后就过期，若报错 token is expired by 2.9s 说明已经过期
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Second * 1).Add(time.Hour * 2)),
		},
		PrivateClaims: PrivateClaims{
			UserName: "admin",
			NickName: "自由女神跃长空【中文测试】",
		},
	}

	// 生成tokenString
	tokenString, err := j.CreateToken(claims)
	if err != nil {
		panic(err)
	}
	fmt.Println("Token   : ", tokenString)

	// 等待Token生效
	time.Sleep(time.Second)

	// 解析tokenString为Claims结构体
	c, err := j.ParseToken(tokenString)
	if err != nil {
		panic(err)
	}

	// 查看数据
	fmt.Printf("签发人  : %s\n", c.RegisteredClaims.Issuer)
	fmt.Printf("主题    : %s\n", c.RegisteredClaims.Subject)
	fmt.Printf("签发时间: %s\n", c.RegisteredClaims.IssuedAt)
	fmt.Printf("生效时间: %s\n", c.RegisteredClaims.NotBefore)
	fmt.Printf("过期时间: %s\n", c.RegisteredClaims.ExpiresAt)
}
```

输出结果

```bash
Token   :  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2ppbmh1aS5kZXYiLCJzdWIiOiJVc2VyIEFjY2VzcyBUb2tlbiIsImV4cCI6MTY2NDg3MTU0OSwibmJmIjoxNjY0ODY0MzQ5LCJpYXQiOjE2NjQ4NjQzNDgsInVzZXJuYW1lIjoiYWRtaW4iLCJuaWNrbmFtZSI6IuiH
queUseWls-elnui3g-mVv-epuuOAkOS4reaWh-a1i-ivleOAkSJ9.Euo2G2lFsPdjA-eZU26OxBIX6rbk0MHPyz_Saa2tKz0
签发人  : https://jinhui.dev
主题    : User Access Token
签发时间: 2022-10-04 14:19:08 +0800 CST
生效时间: 2022-10-04 14:19:09 +0800 CST
过期时间: 2022-10-04 16:19:09 +0800 CST
```

说明

* 这里并没有对`aud`（受众）测试
* 封装以后并没有暴露`jwt`内部对象（比如`Token`），如果有需要可以再修改一下代码

:::

<br />

## json

文档：[https://pkg.go.dev/encoding/json](https://pkg.go.dev/encoding/json)

<br />

### json vs jsoniter

`jsoniter`是一个第三方库,其特点是：快，更快

* 文档：[https://jsoniter.com/](https://jsoniter.com/)

* Github：[https://github.com/json-iterator/go](https://github.com/json-iterator/go)

**安装**

```bash
go get github.com/json-iterator/go
```

**简单性能测试**

看一下有没有传说中的神奇？这里只做一个极简单的测试

* OS：`Window 10`
* Go：`1.19`
* jsoniter：`v1.1.12`

::: details 点击查看详情

`main_test.go`

```go
package main

import (
	"encoding/json"
	"testing"

	jsoniter "github.com/json-iterator/go"
)

type ColorGroup struct {
	ID     int
	Name   string
	Colors []string
}

// 结构体
var groupStruct = ColorGroup{
	ID:     1,
	Name:   "Reds",
	Colors: []string{"Crimson", "Red", "Ruby", "Maroon"},
}

// Json字符串
var groupJson = []byte(`{"ID":1,"Name":"Reds","Colors":["Crimson","Red","Ruby","Maroon"]}`)

func BenchmarkJsoniterMarshal(b *testing.B) {
	for i := 0; i < b.N; i++ {
		_, err := jsoniter.Marshal(groupStruct)
		if err != nil {
			b.Error("Marshal error")
		}
	}
}

func BenchmarkJsoniterUnmarshal(b *testing.B) {
	for i := 0; i < b.N; i++ {
		g := new(ColorGroup)
		if err := jsoniter.Unmarshal(groupJson, g); err != nil {
			b.Error("Unmarshal error")
		}
	}
}

func BenchmarkJsonMarshal(b *testing.B) {
	for i := 0; i < b.N; i++ {
		_, err := json.Marshal(groupStruct)
		if err != nil {
			b.Error("Marshal error")
		}
	}
}

func BenchmarkJsonUnmarshal(b *testing.B) {
	for i := 0; i < b.N; i++ {
		g := new(ColorGroup)
		if err := json.Unmarshal(groupJson, g); err != nil {
			b.Error("Unmarshal error")
		}
	}
}
```

输出结果

```bash
D:\application\GoLand\demo>go test --bench .
goos: windows
goarch: amd64
pkg: demo
cpu: Intel(R) Core(TM) i7-4790K CPU @ 4.00GHz
BenchmarkJsoniterMarshal-8       3549688               340.4 ns/op
BenchmarkJsoniterUnmarshal-8     1790677               662.8 ns/op
BenchmarkJsonMarshal-8           2914536               384.1 ns/op
BenchmarkJsonUnmarshal-8          664804               1643  ns/op
PASS
ok      demo    6.336s
```

:::

<br />

### 示例

序列化：将Go对象转为JSO格式的数据

反序列化：将JSON格式的数据转为Go对象

Go对象最常用的就是`Struct`，也支持像`map[string]any`这种结构

::: details 点击查看详情

```go
package main

import (
	"encoding/json"
	"fmt"
)

type User struct {
	ID          int
	UserName    string
	NickName    string
	Sex         string
	Age         int
	Description string
	Hobbies     []string
	salary      string
}

func main() {
	// 准备数据
	user := User{
		ID:       1,
		UserName: "Bob",
		NickName: "鲍勃",
		Sex:      "man",
		Age:      18,
		Hobbies:  []string{"play", "play", "play"},
		salary:   "30k",
	}
	userJson := []byte(`{"ID":1,"UserName":"Bob","NickName":"鲍勃","Sex":"man","Age":18,"Description":"","Hobbies":["play","play","play"]}`)

	// 序列化：struct --> []byte
	{
		byteData, err := json.Marshal(user)
		if err != nil {
			panic(err)
		}
		fmt.Println(string(byteData))
	}
	{
		byteData, err := json.MarshalIndent(user, "", "    ") // 这里会格式化输出
		if err != nil {
			panic(err)
		}
		fmt.Println(string(byteData))
	}
	// 反序列化：[]byte --> struct
	{
		var user User
		if err := json.Unmarshal(userJson, &user); err != nil {
			panic(err)
		}
		fmt.Printf("%#v\n", user)
	}
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
{"ID":1,"UserName":"Bob","NickName":"鲍勃","Sex":"man","Age":18,"Description":"","Hobbies":["play","play","play"]}
{
    "ID": 1,
    "UserName": "Bob",
    "NickName": "鲍勃",
    "Sex": "man",
    "Age": 18,
    "Description": "",
    "Hobbies": [
        "play",
        "play",
        "play"
    ]
}
main.User{ID:1, UserName:"Bob", NickName:"鲍勃", Sex:"man", Age:18, Description:"", Hobbies:[]string{"play", "play", "play"}, salary:""}
```

注意事项

* 序列化时需要结构体为可导出字段，在这个例子中`salary`并没有被序列化

:::

<br />

### 使用Tag

::: details 点击查看详情

```go
package main

import (
	"encoding/json"
	"fmt"
)

type User struct {
	ID          int    `json:"id"`       // 序列化后json中会显示id，反序列化也一样
	UserName    string `json:"username"` // 序列化后json中会显示username，反序列化也一样
	NickName    string
	Sex         string
	Age         int
	Description string   `json:"description,omitempty"` // 序列化后json中会显示description，反序列化也一样；如果该字段没有显示传值，不显示零值，而是忽略这个字段
	Hobbies     []string // 键改名的位置也可以不传，就变成了这样： `json:",omitempty"`
	Salary string `json:"-"` // 序列化时忽略此字段， 如果改成 "-," 那么就是序列化后键为-，注意有没有逗号的区别
}

func main() {
	// 准备数据
	user := User{
		ID:       1,
		UserName: "Bob",
		NickName: "鲍勃",
		Sex:      "man",
		Age:      18,
		Hobbies:  []string{"play", "play", "play"},
		Salary:   "30k",
	}
	userJson := []byte(`{"id":1,"username":"Bob","NickName":"鲍勃","Sex":"man","Age":18,"Hobbies":["play","play","play"]}`)

	// 序列化：struct --> []byte
	{
		byteData, err := json.Marshal(user)
		if err != nil {
			panic(err)
		}
		fmt.Println(string(byteData))
	}
	{
		byteData, err := json.MarshalIndent(user, "", "    ") // 这里会格式化输出
		if err != nil {
			panic(err)
		}
		fmt.Println(string(byteData))
	}
	// 反序列化：[]byte --> struct
	{
		var user User
		if err := json.Unmarshal(userJson, &user); err != nil {
			panic(err)
		}
		fmt.Printf("%#v\n", user)
	}
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
{"id":1,"username":"Bob","NickName":"鲍勃","Sex":"man","Age":18,"Hobbies":["play","play","play"]}
{                                                                                                                              
    "id": 1,                                                                                                                     
    "username": "Bob",                                                                                                           
    "NickName": "鲍勃",                                                                                                           
    "Sex": "man",                                                                                                               
    "Age": 18,                                                                                                                   
    "Hobbies": [                                                                                                                 
        "play",                                                                                                                 
        "play",                                                                                                                 
        "play"                                                                                                                   
    ]                                                                                                                           
}                                                                                                                               
main.User{ID:1, UserName:"Bob", NickName:"鲍勃", Sex:"man", Age:18, Description:"", Hobbies:[]string{"play", "play", "play"}, Salary:""}
```

:::

<br />

### 默认编码类型

JSON 和 Go 类型不是一对一匹配的。下表描述了编码和解码时的类型关系

| Go类型                   | JSON类型  |
| ------------------------ | --------- |
| `bool`                   | `boolean` |
| `float64`                | `number`  |
| `string`                 | `string`  |
| `[]interface{}`          | `arrays`  |
| `map[string]interface{}` | `objects` |
| `nil`                    | `null`    |

序列化时很少会遇到错误，但反序列化往往会导致错误，下面我们来一一演示

::: details （1）错误示例：类型不匹配类报错：JSON为字符串类型的数字，Go为int

```go
package main

import (
	"encoding/json"
	"fmt"
)

type User struct {
	ID int `json:"id"`
}

func main() {
	// 准备数据，注意下面的1是字符串，而不是数字类型
	userJson := []byte(`{"id": "1"}`)

	// 反序列化
	var user User
	if err := json.Unmarshal(userJson, &user); err != nil {
		panic(err)
	}
	fmt.Printf("%#v\n", user)
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
panic: json: cannot unmarshal string into Go struct field User.id of type int
                                                                             
goroutine 1 [running]:                                                       
main.main()                                                                  
        D:/application/GoLand/demo/main.go:19 +0xdd                          
exit status 2
```

:::

::: details （2）错误示例：溢出类报错：JSON为数字256，Go为uint8类型

```go
package main

import (
	"encoding/json"
	"fmt"
)

type User struct {
	ID uint8 `json:"id"` // uint8范围为0-255
}

func main() {
	// 准备数据，注意下面
	userJson := []byte(`{"id": 256}`)

	// 反序列化
	var user User
	if err := json.Unmarshal(userJson, &user); err != nil {
		panic(err)
	}
	fmt.Println(user.ID)
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go                                    
panic: json: cannot unmarshal number 256 into Go struct field User.id of type uint8
                                                                                   
goroutine 1 [running]:                                                             
main.main()                                                                        
        D:/application/GoLand/demo/main.go:19 +0xda                                
exit status 2
```

:::

::: details （3）注意null和nil

```go
package main

import (
	"encoding/json"
	"fmt"
)

type User struct {
	ID1 int  `json:"id1"`
	ID2 *int `json:"id2"`
}

func main() {
	// 准备数据
	userJson := []byte(`{"id1": null, "id2": null}`)

	// 反序列化
	var user User
	if err := json.Unmarshal(userJson, &user); err != nil {
		panic(err)
	}
	fmt.Println(user.ID1)
	fmt.Println(user.ID2)
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
0
<nil>
```

:::

<br />

### 自定义序列化和反序列化

::: details （1）我们先来研究一下time.Time是如何序列化和反序列化的

```go
package main

import (
	"encoding/json"
	"fmt"
	"time"
)

type User struct {
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time
}

func GetTimePtr(t time.Time) *time.Time {
	return &t
}

func main() {
	// 准备数据
	userStruct := User{
		CreatedAt: time.Now().Add(time.Second * -2),
		UpdatedAt: time.Now().Add(time.Second * -1),
		DeletedAt: GetTimePtr(time.Now()),
	}

	// 序列化
	userJson, err := json.MarshalIndent(userStruct, "", "    ")
	if err != nil {
		panic(err)
	}
	fmt.Printf("序列化：\n%s\n", string(userJson))

	// 反序列化
	var user User
	if err := json.Unmarshal(userJson, &user); err != nil {
		panic(err)
	}
	fmt.Printf("\n反序列化：\n%#v\n", user)

	// time.Time
	fmt.Printf("\ntime.Time格式研究：\n")
	fmt.Println(time.Now().Format(time.RFC3339Nano)) // 序列化后的时间格式
	fmt.Println(user.CreatedAt)                      // 这个是结构体中存储的时间，也是反序列化后的时间
	fmt.Println(time.Now().Local())                  // 这个和上面一样
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
序列化：
{
    "CreatedAt": "2022-10-05T12:07:15.1143662+08:00",
    "UpdatedAt": "2022-10-05T12:07:16.1143662+08:00",
    "DeletedAt": "2022-10-05T12:07:17.1143662+08:00"
}

反序列化：
main.User{CreatedAt:time.Date(2022, time.October, 5, 12, 7, 15, 114366200, time.Local), UpdatedAt:time.Date(2022, time.October, 5, 12, 7, 16, 114366200, time.Local), DeletedAt:time.Date(2022, time.October, 5, 12, 7, 17, 114366200, t
ime.Local)}

time.Time格式研究：
2022-10-05T12:07:17.1244844+08:00
2022-10-05 12:07:15.1143662 +0800 CST
2022-10-05 12:07:17.1249966 +0800 CST
```

:::

::: details （2）重写序列化方法 1：直接给结构体写序列化方法

```go
package main

import (
	"encoding/json"
	"fmt"
	"time"
)

type User struct {
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time
}

// 实现 json.Marshaler 接口
func (u User) MarshalJSON() ([]byte, error) {
	return []byte(`{"a":1,"b":"2"}`), nil
}

func GetTimePtr(t time.Time) *time.Time {
	return &t
}

func main() {
	// 准备数据
	userStruct := User{
		CreatedAt: time.Now().Add(time.Second * -2),
		UpdatedAt: time.Now().Add(time.Second * -1),
		DeletedAt: GetTimePtr(time.Now()),
	}

	// 序列化
	userJson, err := json.MarshalIndent(userStruct, "", "    ")
	if err != nil {
		panic(err)
	}
	fmt.Printf("序列化：\n%s\n", string(userJson))

	// 反序列化
	var user User
	if err := json.Unmarshal(userJson, &user); err != nil {
		panic(err)
	}
	fmt.Printf("\n反序列化：\n%#v\n", user)
	fmt.Println(user.CreatedAt)
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
序列化：    
{           
    "a": 1, 
    "b": "2"
}           

反序列化：
main.User{CreatedAt:time.Date(1, time.January, 1, 0, 0, 0, 0, time.UTC), UpdatedAt:time.Date(1, time.January, 1, 0, 0, 0, 0, time.UTC), DeletedAt:<nil>}
0001-01-01 00:00:00 +0000 UTC
```

说明

直接在结构体上重写序列化方法并不好，因为我们要兼顾所有的字段，更好的方法是仅修改time.Time序列化方式

:::

::: details （3）重写序列化方法2：为自定义类型编写序列化和反序列化方法

```go
package main

import (
	"encoding/json"
	"fmt"
	"strings"
	"time"
)

var (
	timeLayout = "2006-01-02 15:04:05 -0700 MST"
)

type User struct {
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt Time      `json:"updated_at"`
	DeletedAt *Time     `json:"deleted_at"`
}

type Time time.Time

// 序列化：实现 json.Marshaler 接口
// 注意事项：如果返回前的字符串不加双引号会报错：json: error calling MarshalJSON for type main.Time: invalid character '-' after top-level value
func (t Time) MarshalJSON() ([]byte, error) {
	s := time.Time(t).Format(timeLayout)
	//return []byte(s), nil
	return []byte(`"` + s + `"`), nil
}

// 反序列化：实现 json.Unmarshaler 接口
// 注意事项：(1)删除双引号 (2) 这里是指针方法
func (t *Time) UnmarshalJSON(data []byte) error {
	// 同样这里要删除字符串中的双引号，不然也会报错
	timeString := strings.ReplaceAll(string(data), `"`, "")

	// 解析为time.Time对象
	timeObj, err := time.ParseInLocation(timeLayout, timeString, time.Local)
	if err != nil {
		return err
	}

	// 转为Time对象并赋值
	*t = Time(timeObj)
	return nil
}

// 用于直接fmt.Println时的格式化输出
func (t Time) String() string {
	return time.Time(t).String()
}

// 用于Time内嵌到结构体，fmt.Println(结构体)时格式化输出
func (t Time) GoString() string {
	return time.Time(t).GoString()
}

// 获取指针
func GetTimePtr(t time.Time) *Time {
	newT := Time(t)
	return &newT
}

func main() {
	// 准备数据
	userStruct := User{
		CreatedAt: time.Now().Add(time.Second * -2),
		UpdatedAt: Time(time.Now().Add(time.Second * -1)),
		DeletedAt: GetTimePtr(time.Now()),
	}

	// 序列化
	fmt.Println("序列化：")
	userJson, err := json.MarshalIndent(userStruct, "", "    ")
	if err != nil {
		panic(err)
	}
	fmt.Printf("%s\n", string(userJson))

	// 反序列化
	fmt.Println("反序列化：")
	var user User
	if err := json.Unmarshal(userJson, &user); err != nil {
		panic(err)
	}
	fmt.Printf("%#v\n", user)
	fmt.Println(time.Time(user.CreatedAt))
	fmt.Println(time.Time(user.UpdatedAt))
	fmt.Println(time.Time(*user.DeletedAt))
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
序列化：
{
    "created_at": "2022-10-09T15:51:57.0971573+08:00",
    "updated_at": "2022-10-09 15:51:58 +0800 CST",
    "deleted_at": "2022-10-09 15:51:59 +0800 CST"
}
反序列化：
main.User{CreatedAt:time.Date(2022, time.October, 9, 15, 51, 57, 97157300, time.Local), UpdatedAt:time.Date(2022, time.October, 9, 15, 51, 58, 0, time.Local), DeletedAt:time.Date(2022, time.October, 9, 15, 51, 59, 0, time.Local)}
2022-10-09 15:51:57.0971573 +0800 CST
2022-10-09 15:51:58 +0800 CST
2022-10-09 15:51:59 +0800 CST
```

:::

<br />

### 流式序列化和反序列化

::: details （1）基础示例：将用户输入的JSON转为Go对象，并添加一个id字段，然后输出到标准输出

```go
package main

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
)

func main() {
	var id int

	// 自定义解码器和编码器
	for {
		// 解码器（NewDecoder）：从输入中(这里是os.Stdint)读取数据，反序列化并存储到&v中
		v := map[string]any{}
		err := json.NewDecoder(os.Stdin).Decode(&v)

		// 输入完成：使用 echo {"id": 1} | go run main.go 这种格式时err会有io.EOF错误，代表输入已经结束
		// 这会在下一次for循环才会读取到这个错误，所以这里直接退出循环即可
		if err == io.EOF {
			fmt.Println("Complete!")
			break
		}

		// 反序列化错误
		if err != nil {
			fmt.Println("Decode Error: ", err)
			continue
		}

		// 添加一个id
        id++
		v["id"] = id
        
		// NewEncoder（编码器）：将&v的数据序列化为JSON并写入到输出中(这里是os.Stdout)
		if err := json.NewEncoder(os.Stdout).Encode(&v); err != nil {
			fmt.Println("Encode Error: ", err)
			continue
		}
	}
}
```

输出结果

```bash
# 交互式输入
D:\application\GoLand\demo>go run main.go
{}									# => 用户输入
{"id":1}
{"name": "bob"} 					# => 用户输入
{"id":2,"name":"bob"}
{"name": "bob", "sex": "man"} 		# => 用户输入
{"id":3,"name":"bob","sex":"man"}
Complete!
exit status 0xc000013a

# 使用管道输入
D:\application\GoLand\demo>echo {"name": "bob"} | go run main.go 
{"id":1,"name":"bob"}
Complete!

# 错误用法示例
D:\application\GoLand\demo>go run main.go                        
a			   # => 用户输入
Decode Error:  invalid character 'a' looking for beginning of value
{a: 1} 		   # => 用户输入
Decode Error:  invalid character 'a' looking for beginning of object key string
"{"a": 1}"	   # => 用户输入
Decode Error:  json: cannot unmarshal string into Go value of type map[string]interface {}
Complete!
```

可以看到，我们的程序可以正确执行，但是仍然有很大的改善空间

* 所输入的JSON不能包含双引号，兼容性不够好
* 输出时不能格式化输出

:::

::: details （2）改善程序

```go
package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"strings"
)

func main() {
	id := 0

	// 自定义解码器和编码器
	for {
		// 从标准输入读取输入，按行读取
		reader := bufio.NewReader(os.Stdin)
		data, err := reader.ReadString('\n')
		if err == io.EOF {
			fmt.Println("Read Complete!")
			break
		}
		if err != nil {
			fmt.Println("Read Error: ", err)
		}

		// 删除输入中行首和行尾的双引号和单引号
		// 注意：因为不知道行首是单引号还是双引号，所以需要将他们写两次
		for _, v := range []string{`"`, `'`, `"`, `'`} {
			data = strings.Trim(data, v)
		}

		// 反序列化
		v := map[string]any{}
		err = json.NewDecoder(strings.NewReader(data)).Decode(&v)

		if err == io.EOF {
			fmt.Println("Decoder Complete!")
			break
		}

		// 反序列化错误
		if err != nil {
			fmt.Println("Decode Error: ", err)
			continue
		}

		// 添加一个id
		id++
		v["id"] = id

		// 序列化，并格式化输出
		encoder := json.NewEncoder(os.Stdout)
		encoder.SetIndent("", "    ")
		if err := encoder.Encode(&v); err != nil {
			fmt.Println("Encode Error: ", err)
			continue
		}

	}
}
```

输出结果

```bash
# 测试1
D:\application\GoLand\demo>echo '{"name": "bob"}' | go run main.go   
{                
    "id": 1,     
    "name": "bob"
}                
Read Complete!

D:\application\GoLand\demo>echo "{"name": "bob"}" | go run main.go 
{                
    "id": 1,     
    "name": "bob"
}                
Read Complete!

D:\application\GoLand\demo>echo {"name": "bob"} | go run main.go   
{                
    "id": 1,     
    "name": "bob"
}                
Read Complete!

# 测试2
D:\application\GoLand\demo>go run main.go
{}
{          
    "id": 1
}          
"{}" 
{          
    "id": 2
}          
"{"name": "bob"}" 
{                
    "id": 3,     
    "name": "bob"
}                
Read Complete!
```

说明

我们是按照行来读取的，这对于像已经格式化好的JSON，我们是无法读取的，此时可以迂回解决

```bash
# 先把所有的换行符去掉，然后最后加一个换行符，这就等同于将JSON压缩为1行，当然了还包括一下空白，不用去管它
[root@ap-hongkang ~]# cat test.json | tr -d '\n' | sed -r 's/(.*)/\1\n/' | go run main.go
```

`test.json`

```json
{
  "__inputs": [],
  "__elements": {},
  "__requires": [
    {
      "type": "panel",
      "id": "gauge",
      "name": "Gauge",
      "version": ""
    },
    {
      "type": "grafana",
      "id": "grafana",
      "name": "Grafana",
      "version": "9.1.6"
    },
    {
      "type": "panel",
      "id": "graph",
      "name": "Graph (old)",
      "version": ""
    },
    {
      "type": "datasource",
      "id": "prometheus",
      "name": "Prometheus",
      "version": "1.0.0"
    }
  ],
  "annotations": {
    "list": [
      {
        "builtIn": 1,
        "datasource": {
          "type": "grafana",
          "uid": "-- Grafana --"
        },
        "enable": true,
        "hide": true,
        "iconColor": "rgba(0, 211, 255, 1)",
        "name": "Annotations & Alerts",
        "target": {
          "limit": 100,
          "matchAny": false,
          "tags": [],
          "type": "dashboard"
        },
        "type": "dashboard"
      }
    ]
  }
}
```

:::

<br />

## regexp

文档：

* [https://pkg.go.dev/regexp](https://pkg.go.dev/regexp)
* [https://pkg.go.dev/regexp/syntax](https://pkg.go.dev/regexp/syntax)

<br />

### 匹配测试 - Match*

Match系列函数用于 **匹配是否包含指定模式的子字符串**，返回 **布尔值** 用于告知是否匹配

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"regexp"
	"strings"
)

func main() {
	// 原始数据
	data := "To be, or not to be, that is the question."

	// 正则表达式 (?i)代表不区分大小写，同时不参与分组
	re := `(?i)(to)(\s)(be)`

	// 字符串匹配
	{
		matched, err := regexp.MatchString(re, data)
		fmt.Println(matched, err)
	}
	// 字节匹配
	{
		matched, err := regexp.Match(re, []byte(data))
		fmt.Println(matched, err)
	}

	// io.RuneReader接口匹配
	{
		matched, err := regexp.MatchReader(re, strings.NewReader(data))
		fmt.Println(matched, err)
	}
}
```

输出 结果

```bash
D:\application\GoLand\demo>go run main.go
true <nil>
true <nil>
true <nil>
```

:::

<br />

### 提前编译 - \*Compile*

**`*Compile*`系列函数让我们提前编译正则表达式，避免使用时临时编译，可以获得更好的性能：**

* `regexp.Compile`：编译正则表达式，返回`*Regexp`和`error`
* `regexp.MustCompile`：编译正则表达式，返回`*Regexp`，当编译遇到错误时它会直接`panic`

**上面两个函数都有对应的`POSIX`函数**

* `regexp.CompilePOSIX`：与`Compile`类似，但是是最左最长匹配
* `regexp.MustCompilePOSIX`：与`MustCompile`l类似，但是是最左最长匹配

**其他说明**

* 推荐使用：可以获得更好的性能
* 注意事项：在代码编译阶段（go build），它不能发现正则表达式中的错误

<br />

::: details （1）regexp.Compile：编译正则时会校验是否有error，正则匹配时不返回error

```go
package main

import (
	"fmt"
	"regexp"
	"strings"
)

func main() {
	// 原始数据
	data := "To be, or not to be, that is the question."

	// 提前编译正则，可以获得更好的性能
	re, err := regexp.Compile(`(?i)(to)(\s)(be)`)
	if err != nil {
		panic(err)
	}

	// 字符串匹配
	{
		matched := re.MatchString(data)
		fmt.Println(matched)
	}
	// 字节匹配
	{
		matched := re.Match([]byte(data))
		fmt.Println(matched)
	}

	// io.RuneReader接口匹配
	{
		matched := re.MatchReader(strings.NewReader(data))
		fmt.Println(matched)
	}
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
true
true
true
```

:::

::: details （2）regexp.MustCompile：不返回错误，而是当编译正则表达式有错误时直接panic；正则匹配时不返回error

```go
package main

import (
	"fmt"
	"regexp"
	"strings"
)

func main() {
	// 原始数据
	data := "To be, or not to be, that is the question."

	// 提前编译正则，可以获得更好的性能
	// MustCompile：不返回错误，而是当有错误时直接panic
	re := regexp.MustCompile(`(?i)(to)(\s)(be)`)

	// 字符串匹配
	{
		matched := re.MatchString(data)
		fmt.Println(matched)
	}
	// 字节匹配
	{
		matched := re.Match([]byte(data))
		fmt.Println(matched)
	}

	// io.RuneReader接口匹配
	{
		matched := re.MatchReader(strings.NewReader(data))
		fmt.Println(matched)
	}
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
true
true
true
```

:::

::: details （3）Compile 和 CompilePOSIX 的区别

```go
package main

import (
	"fmt"
	"regexp"
)

func main() {
	// 定义数据
	str := "foobarbat"

	// (1) 第一个例子
	{
		// 编译正则表达式
		pattern := "foo|foobar"
		rPCRE, _ := regexp.Compile(pattern)
		rPOSIX, _ := regexp.CompilePOSIX(pattern)

		// 查看输出结果有什么不同
		fmt.Println(rPCRE.FindString(str))  // "foo"
		fmt.Println(rPOSIX.FindString(str)) // "foobar"
	}

	// (2) 这里修改正则为 (foobar|foo)
	{
		// 编译正则表达式
		pattern := "foobar|foo"
		rPCRE, _ := regexp.Compile(pattern)
		rPOSIX, _ := regexp.CompilePOSIX(pattern)

		// 查看输出结果有什么不同
		fmt.Println(rPCRE.FindString(str))  // "foobar"
		fmt.Println(rPOSIX.FindString(str)) // "foobar"
	}
}
```

输出结果

```bash
foo
foobar
foobar
foobar
```

:::

<br />

### 提取子串 - Find*

Find*系列用于提取子串，有4、5种类函数，又互相组合成大概有十几个函数

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"regexp"
)

func main() {
	// 原始数据
	data := "To be, or not to be, that is the question."

	// 编译正则表达式 (?i)代表不区分大小写，同时不参与分组
	re := regexp.MustCompile(`(?i)(to)(\s)(be)`)

	// Find        提取子字符串，输入和输出都是字节切片
	// FindString  提取子字符串，输入和输出都是字符串
	// 根据实际情况使用字节版本的还是字符串版本的
	fmt.Println(string(re.Find([]byte(data)))) // To be
	fmt.Println(re.FindString(data))           // To be

	// FindIndex       返回匹配的索引范围，输入字节切片,输出int切片
	// FindStringIndex 返回匹配的索引范围，输入字符串,输出int切片
	fmt.Println(re.FindIndex([]byte(data))) // [0 5]
	fmt.Println(re.FindStringIndex(data))   // [0 5]

	// FindSubmatch 返回一个二维字节切片，第一个元素为匹配的子字符串，后面的元素为分组数据(默认情况下一个括号是一个分组),分组是从1开始计数的
	//              也就是说 FindSubmatch比Find要高级一点，返回的数据种类多一些，可以根据需要来选择哪些数据
	fmt.Println(string(re.FindSubmatch([]byte(data))[0])) // To be
	fmt.Println(string(re.FindSubmatch([]byte(data))[3])) // be，怎么来的呢？因为第3个分组匹配的是be

	// FindAllString 提取所有符合的子字符串，第二个参数代表提取几个，<0的值代表提取所有
	fmt.Printf("%#v\n", re.FindAllString(data, -1)) // []string{"To be", "to be"}

	// FindAllStringSubmatchIndex 提取所有的 匹配的字符串和分组数据 的索引
	// 这个就比较牛逼了, 输出结果是：[[0 5 0 2 2 3 3 5] [14 19 14 16 16 17 17 19]]，下面来解释一下
	// (1) 因为是FindAllxx且个数为-1，所以会提取出所有符合条件的，对应上面 切片的2个元素(同样也是切片)
	// (2) 第一个切片中，0,5代表匹配元素的索引范围， 0,2代表第一个分组的索引范围，2,3代表第二个分组的索引范文，3,5代表第三个分组的索引范围
	// (3) 第二个切片同理
	fmt.Println(re.FindAllStringSubmatchIndex(data, -1))
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
To be
To be                                        
[0 5]                                        
[0 5]                                        
To be                                        
be                                           
[]string{"To be", "to be"}                   
[[0 5 0 2 2 3 3 5] [14 19 14 16 16 17 17 19]]
```

:::

<br />

### 正则替换 - ReplaceAll*

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"regexp"
	"strings"
)

func main() {
	// 原始数据
	data := "To be, or not to be, that is the question."

	// 提前编译正则，可以获得更好的性能
	re := regexp.MustCompile(`(?i)(to)(\s)(be)`)

	// 注意事项
	//   (1) ReplaceAll*替换不会修改原数据
	//   (2) 只有ReplaceAll这一系列函数，意味着只能全部替换; 若要指定替换N次，请看最后面的解决方案

	// (1) ReplaceAll: 全部替换，输入和输出都是字节切片
	fmt.Println("(1) ", string(re.ReplaceAll([]byte(data), []byte("TO BE"))))

	// (2) ReplaceAllString: 全部替换，输入和输出都是字符串
	fmt.Println("(2) ", re.ReplaceAllString(data, "TO BE"))

	// (3) ReplaceAllLiteralString：带Literal字眼的不支持使用分组，请看下面示例
	fmt.Println("(3) ", re.ReplaceAllString(data, "${1}"))        // 这里的${1}指代匹配到的值，可能是to、TO、To、tO, $1代表原值
	fmt.Println("(3) ", re.ReplaceAllLiteralString(data, "${1}")) // 带Literal字眼的不支持使用分组

	// (4) ReplaceAllStringFunc: 带Func字眼的可以让我们传入一个函数，指定要替换的值
	//     不支持${1}
	fmt.Println("(4) ", re.ReplaceAllStringFunc(data, func(s string) string {
		return strings.ToUpper(s) // s代表匹配到的值
	}))

	// 替换N次
	counter := 0       // 这是一个计数器,无须修改
	replaceNumber := 1 // 指定替换几次，根据实际情况修改
	fmt.Println("(5) ", re.ReplaceAllStringFunc(data, func(s string) string {
		if counter >= replaceNumber {
			return s
		}
		counter++
		return re.ReplaceAllString(s, "TO BE")
	}))

	// 仅替换最后N次（为了避免与上面的变量有冲突，这里将代码放到一个单独的块中）
	{
		counter := 0                          // 计数器,无须修改
		matches := re.FindAllString(data, -1) // 匹配项切片
		matchedNumber := len(matches) - 1     // 倒着数，我们要修改前N项，这里就-N，这里修改最后一项匹配，所以-1
		fmt.Println("(6) ", re.ReplaceAllStringFunc(data, func(s string) string {
			if counter >= matchedNumber {
				return re.ReplaceAllString(s, "TO BE")
			}
			counter++
			return s
		}))
	}

	// 查看原始数据
	fmt.Println("(7) ", data)
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
(1)  TO BE, or not TO BE, that is the question.
(2)  TO BE, or not TO BE, that is the question.
(3)  To, or not to, that is the question.      
(3)  ${1}, or not ${1}, that is the question.  
(4)  TO BE, or not TO BE, that is the question.
(5)  TO BE, or not to be, that is the question.
(6)  To be, or not TO BE, that is the question.
(7)  To be, or not to be, that is the question.
```

:::

<br />

## signal

文档：[https://pkg.go.dev/os/signal](https://pkg.go.dev/os/signal)

### 接口和实现

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

### 信号监听

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

### Channel缓冲区

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

### 信号停止/重置和忽略

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

### NotifyContext

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

<br />

## validator

Github：[https://github.com/go-playground/validator](https://github.com/go-playground/validator)

文档：[https://pkg.go.dev/github.com/go-playground/validator](https://pkg.go.dev/github.com/go-playground/validator)

### 安装

```bash
go get github.com/go-playground/validator/v10
```

<br />

### 数据类型

#### 验证变量

::: details 点击查看详情

```go
package main

import (
	"fmt"

	"github.com/go-playground/validator/v10"
)

func main() {
	// 实例化validator对象
	validate := validator.New()

	// validate.Var：验证单个变量
	{
		// 定义变量
		password := "123456"

		// 验证password是否符合规范
		// (1) 多个tag使用逗号连接，并且不能有空格,会panic
		err := validate.Var(password, "required,min=8")
		if err != nil {
			fmt.Println(err)
		}
	}

	// validate.VarWithValue：验证两个变量之间的关系
	{
		s1 := "abcd"
		s2 := "abce"
		err := validate.VarWithValue(s1, s2, "eqcsfield") // eqcsfield这个tag的意思是：s1是否等于s2
		if err != nil {
			fmt.Println(err)
		}
	}

	// 其他
	// validate.Var内部调用的是 validate.VarCtx
	// validate.VarWithValue内部调用的是 validate.VarWithValueCtx
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
Key: '' Error:Field validation for '' failed on the 'min' tag
Key: '' Error:Field validation for '' failed on the 'eqcsfield' tag
```

:::

<br />

#### 验证结构体

::: details 点击查看详情

```go
package main

import (
	"fmt"

	"github.com/go-playground/validator/v10"
)

type person struct {
	Name                string `validate:"required,min=4,max=15"`
	Email               string `validate:"required,email"`
	Age                 int    `validate:"required,numeric,min=18"`
	DriverLicenseNumber string `validate:"omitempty,len=12,numeric"`
}

func main() {
	// 实例化validator对象
	validate := validator.New()

	// 创建一个person对象
	p := person{
		Name:                "Bob",
		Email:               "test@example.com",
		Age:                 0,
		DriverLicenseNumber: "",
	}

	// validate.Struct：对结构体进行验证，需要满足以下几点才会进行验证
	// 1) 要求字段必须是可导出的
	// 2) 要求带有validate标签
	// 3) 要求没有忽略验证此字段，即 `validate: "-"` 会忽略验证
	{
		// 验证
		fmt.Printf("validate.Struct:\n")
		err := validate.Struct(p)
		if err != nil {
			fmt.Println(err)
		}
	}

	// validate.StructExcept: 忽略某些字段
	{
		fmt.Printf("\nvalidate.StructExcept:\n")
		err := validate.StructExcept(p, "Age")
		if err != nil {
			fmt.Println(err)
		}
	}

	// validate.StructPartial: 只验证某些字段
	{
		fmt.Printf("\nvalidate.StructPartial:\n")
		err := validate.StructPartial(p, "Name")
		if err != nil {
			fmt.Println(err)
		}
	}

	// validate.StructFiltered: 使用自定义函数过滤需要排除哪些字段，返回true时排除该字段，返回false会验证该字段
	{
		fmt.Printf("\nvalidate.StructFiltered:\n")
		err := validate.StructFiltered(p, func(ns []byte) bool {
			if string(ns) == "person.Age" { // 对Age字段不验证
				return true
			}
			return false // 其他字段默认会验证
		})
		if err != nil {
			fmt.Println(err)
		}
	}

	// 其他
	// 以上函数内部均使用的是 xxCtx，我们也可以自己调用
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
validate.Struct:
Key: 'person.Name' Error:Field validation for 'Name' failed on the 'min' tag   
Key: 'person.Age' Error:Field validation for 'Age' failed on the 'required' tag
                                                                               
validate.StructExcept:                                                         
Key: 'person.Name' Error:Field validation for 'Name' failed on the 'min' tag   
                                                                               
validate.StructPartial:                                                        
Key: 'person.Name' Error:Field validation for 'Name' failed on the 'min' tag   
                                                                               
validate.StructFiltered:                                                       
Key: 'person.Name' Error:Field validation for 'Name' failed on the 'min' tag
```

:::

<br />

### 关于错误

#### 错误类型

* 如果是 **标签写法类** 等错误，那么`validator`会直接 `panic`
* 如果是 **函数用法类** 等错误，那么`validator`会返回 `InvalidValidationError`
* 如果是 **校验失败类** 等错误，那么`validator`会返回 `ValidationErrors`

::: details 标签写法有错时产生panic

```go
package main

import (
	"fmt"

	"github.com/go-playground/validator/v10"
)

func main() {
	// 实例化validator对象
	validate := validator.New()

	// 定义变量
	password := "123456"

	// 验证password是否符合规范, 我们可以故意写错标签，以使validator产生panic
	// 1) 标签之间的逗号后面加个空格
	// 2) 写一个不支持的标签，比如 required1
	err := validate.Var(password, "required1,min=8")
	if err != nil {
		fmt.Println(err)
	}
}
```

:::

::: details 函数使用错误返回InvalidValidationError

```go
package main

import (
	"fmt"

	"github.com/go-playground/validator/v10"
)

type person struct {
	Name                string `validate:"required,min=4,max=15"`
	Email               string `validate:"required,email"`
	Age                 int    `validate:"required,numeric,min=18"`
	DriverLicenseNumber string `validate:"omitempty,len=12,numeric"`
}

// 创建一个person对象
var p = person{
	Name:                "Bob",
	Email:               "test@example.com",
	Age:                 0,
	DriverLicenseNumber: "",
}

func main() {
	// 实例化validator对象
	validate := validator.New()

	// 对结构体进行验证，但是却传了一个nil
	{
		err := validate.Struct(nil)
		if err != nil {
			fmt.Printf("%T\n", err)
		}
	}

	// 对结构体进行验证，但是却传了一个字符串
	{
		err := validate.Struct("haha")
		if err != nil {
			fmt.Printf("%T\n", err)
		}
	}
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
*validator.InvalidValidationError
*validator.InvalidValidationError
```

:::

::: details 校验失败返回ValidationErrors

```go
package main

import (
	"fmt"

	"github.com/go-playground/validator/v10"
)

type person struct {
	Name                string `validate:"required,min=4,max=15"`
	Email               string `validate:"required,email"`
	Age                 int    `validate:"required,numeric,min=18"`
	DriverLicenseNumber string `validate:"omitempty,len=12,numeric"`
}

func main() {
	// 实例化validator对象
	validate := validator.New()

	// 创建一个person对象
	var p = person{
		Name:                "Bob",
		Email:               "test@example.com",
		Age:                 0,
		DriverLicenseNumber: "",
	}

	// 对结构体进行验证
	err := validate.Struct(p)

	// 检查错误
	if err != nil {
		// 输出错误类型
		fmt.Printf("%T\n", err)
		fmt.Printf("%+v\n\n", err)

		// InvalidValidationError，一般是函数用法不对等
		if _, ok := err.(*validator.InvalidValidationError); ok {
			fmt.Println(err)
		}

		// err包含以下3个值：
		//   nil
		//   InvalidValidationError
		//   ValidationErrors
		// 前两个我们都处理了，所以这里留下来的错误只能是ValidationErrors
		// ValidationErrors，一般是真的验证失败了，通过断言我们可以获取到一些详情
		errs := err.(validator.ValidationErrors)
		for _, err := range errs {
			fmt.Println("Namespace      : ", err.Namespace())
			fmt.Println("Field          : ", err.Field())
			fmt.Println("StructNamespace: ", err.StructNamespace())
			fmt.Println("StructField    : ", err.StructField())
			fmt.Println("Tag            : ", err.Tag())
			fmt.Println("ActualTag      : ", err.ActualTag())
			fmt.Println("Kind           : ", err.Kind())
			fmt.Println("Type           : ", err.Type())
			fmt.Println("Value          : ", err.Value())
			fmt.Println("Param          : ", err.Param())
			fmt.Println()
		}
	}
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
validator.ValidationErrors
Key: 'person.Name' Error:Field validation for 'Name' failed on the 'min' tag   
Key: 'person.Age' Error:Field validation for 'Age' failed on the 'required' tag
                                                                               
Namespace      :  person.Name                                                  
Field          :  Name                                                         
StructNamespace:  person.Name                                                  
StructField    :  Name                                                         
Tag            :  min                                                          
ActualTag      :  min                                                          
Kind           :  string                                                       
Type           :  string                                                       
Value          :  Bob                                                          
Param          :  4                                                            
                                                                               
Namespace      :  person.Age                                                   
Field          :  Age                                                          
StructNamespace:  person.Age                                                   
StructField    :  Age                                                          
Tag            :  required                                                     
ActualTag      :  required                                                     
Kind           :  int                                                          
Type           :  int                                                          
Value          :  0                                                            
Param          :    
```

:::

<br />

#### 自定义错误信息

::: details 先创建一个文件，用于编写错误翻译函数

`validator.go`

```go
package main

import "github.com/go-playground/validator/v10"

// ValidatorEntry 错误条目
type ValidatorEntry map[string]string

// ValidatorTranslate 错误翻译器
func ValidatorTranslate(e error, f func() map[string]string) []ValidatorEntry {
	// 检查nil值
	if e == nil {
		return []ValidatorEntry{}
	}

	// 初始化
	field := "Field"       // 字段名
	message := "Message"   // 消息主体名
	m := f()               // 映射
	var s []ValidatorEntry // 返回值

	// InvalidValidationError 一般是函数用法不对,比如 validate.Struct(nil)
	if _, ok := e.(*validator.InvalidValidationError); ok {
		if v, ok := m["InvalidValidationError"]; ok {
			s = append(s, ValidatorEntry{field: "InvalidValidationError", message: v})
		} else {
			s = append(s, ValidatorEntry{field: "InvalidValidationError", message: e.Error()})
		}
		return s
	}

	// ValidationErrors，一般是真的验证失败了，通过断言我们可以获取到一些详情
	if errs, ok := e.(validator.ValidationErrors); ok {
		for _, err := range errs {
			key := err.Field() + "." + err.Tag()
			if v, ok := m[key]; ok {
				s = append(s, ValidatorEntry{field: err.Field(), message: v})
			} else {
				s = append(s, ValidatorEntry{field: err.Field(), message: err.Error()})
			}
		}
		return s
	}
	return []ValidatorEntry{{field: "UnknownValidationError", message: e.Error()}}
}
```

:::

::: details （1）普通结构体测试

```go
package main

import (
	"encoding/json"
	"fmt"

	"github.com/go-playground/validator/v10"
)

// 定义结构体
type person struct {
	Name                string `validate:"required,min=4,max=15"`
	Email               string `validate:"required,email"`
	Age                 int    `validate:"required,numeric,min=18"`
	DriverLicenseNumber string `validate:"omitempty,len=12,numeric"`
}

// Validator 定义翻译接口，可以定义为结构体方法，也可以单独定义一个方法
func (p person) Validator() map[string]string {
	return map[string]string{
		"InvalidValidationError": "验证参数无效",
		"Name.required":          "用户名为必填项",
		"Name.min":               "用户名最少4个字符",
		"Name.max":               "用户名最多15个字符",
		"Age.required":           "年龄为必填项",
	}
}

func main() {
	// 创建一个person对象
	var p = person{
		Name:                "Bob",
		Email:               "test#example.com",
		Age:                 0,
		DriverLicenseNumber: "",
	}

	// 实例化validator对象
	validate := validator.New()

	// 对结构体进行验证
	err := validate.Struct(p)

	// 翻译错误，返回一个map切片
	errMessage := ValidatorTranslate(err, p.Validator)

	// 格式化输出
	msg, err := json.MarshalIndent(errMessage, "", "    ")
	if err != nil {
		panic(err)
	}
	fmt.Println(string(msg))
}
```

输出结果

```bash
D:\application\GoLand\demo>go run .
[
    {
        "Field": "Name",
        "Message": "用户名最少4个字符"
    },
    {
        "Field": "Email",
        "Message": "Key: 'person.Email' Error:Field validation for 'Email' failed on the 'email' tag"
    },
    {
        "Field": "Age",
        "Message": "年龄为必填项"
    }
]
```

:::

::: details （2）Gin参数绑定测试

```go
package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

// 定义结构体,注意需要将 validate 修改为 binding
type person struct {
	Name                string `json:"name" binding:"required,min=4,max=15"`
	Email               string `json:"email" binding:"required,email"`
	Age                 int    `json:"age" binding:"required,numeric,min=18"`
	DriverLicenseNumber string `json:"driverLicenseNumber" binding:"omitempty,len=12,numeric"`
}

// Validator 定义翻译接口，可以定义为结构体方法，也可以单独定义一个方法
func (p person) Validator() map[string]string {
	return map[string]string{
		"InvalidValidationError": "验证参数无效",
		"Name.required":          "用户名为必填项",
		"Name.min":               "用户名最少4个字符",
		"Name.max":               "用户名最多15个字符",
		"Age.required":           "年龄为必填项",
	}
}

func main() {
	r := gin.Default()
	r.POST("/", func(c *gin.Context) {
		// Gin参数绑定
		var p person
		err := c.ShouldBind(&p)

		// 翻译错误，返回一个map切片
		errMessage := ValidatorTranslate(err, p.Validator)

		// 返回响应
		c.JSON(http.StatusOK, errMessage)
	})
	log.Fatalln(r.Run("0.0.0.0:6666"))
}
```

输出结果

![image-20221018165811618](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221018165811618.png)

![image-20221018165918108](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221018165918108.png)

:::

<br />

### 各类验证

#### 字段验证

文档：[https://github.com/go-playground/validator#fields](https://github.com/go-playground/validator#fields)

**字段**

| 标签       | 描述                             |
| ---------- | -------------------------------- |
| eqcsfield  | 要求字段等于另一个字段           |
| eqfield    | 要求字段等于另一个字段           |
|            |                                  |
| gtcsfield  | 要求字段值大于另一个字段值       |
| gtfield    | 要求字段值大于另一个字段值       |
|            |                                  |
| gtecsfield | 要求字段值大于或等于另一个字段值 |
| gtefield   | 要求字段值大于或等于另一个字段值 |
|            |                                  |
| ltcsfield  | 要求字段值小于另一个字段值       |
| ltfield    | 要求字段值小于另一个字段值       |
|            |                                  |
| ltecsfield | 要求字段值小于或等于另一个字段值 |
| ltefield   | 要求字段值小于或等于另一个字段值 |
|            |                                  |
| necsfield  | 要求字段值不等于另一个字段值     |
| nefield    | 要求字段值不等于另一个字段值     |

**说明**

* 标签组成：比较符号 + 是否跨Struct(cross struct) + field
* 测试时发现，即使使用不带`cs`的也可以跨结构体验证，不知道是理解的不对还是用法不对？

**适用场景举例**

* 用户修改密码时确认两次密码输入一致

::: details 点击查看详情

```go
package main

import (
	"fmt"

	"github.com/go-playground/validator/v10"
)

type User struct {
	Name            string `validate:"eqcsfield=UserInfo.ChineseName"`
	Password        string `validate:"eqfield=ConfirmPassword"`
	ConfirmPassword string
	UserInfo
}

type UserInfo struct {
	ChineseName string
	EnglishName string
}

func main() {
	// 实例化validator对象
	validate := validator.New()

	// 创建对象
	userInfo := UserInfo{
		ChineseName: "李四",
		EnglishName: "Bob",
	}
	user := User{
		Name:            "张三",
		Password:        "123456",
		ConfirmPassword: "1234567",
		UserInfo:        userInfo,
	}

	// 验证
	err := validate.Struct(user)
	if err != nil {
		fmt.Println(err)
	}
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
Key: 'User.Name' Error:Field validation for 'Name' failed on the 'eqcsfield' tag      
Key: 'User.Password' Error:Field validation for 'Password' failed on the 'eqfield' tag
```

:::

<br />

#### 更多验证

字段太多了，这里只举几个例子

::: details 点击查看详情

```go
package main

import (
	"fmt"

	"github.com/go-playground/validator/v10"
)

func main() {
	// 实例化validator对象
	validate := validator.New()

	// cidr
	fmt.Println("01) ", validate.Var("192.168.0.1", "cidr"))
	fmt.Println("02) ", validate.Var("192.168.0.1/24", "cidr"))

	// datauri
	imageBase64 := "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAAEGCAMAAAAExGooAAABIFBMVEVp1+T///8AAAD20qJs3utq2udt3+z/2qj816b8/Pxp2OT51aTZ2dn5+fnv7+9hx9Pl5eXi4uLJycnU1NRn0t/s7OxYtL/Dw8Njy9e3t7fW1tZWr7pGkJmYmJjBwcFewMysrKxRpa/qyJouKCeLioo9fYVzcnJKmKGhoaFCh5CDgoI3cnkAICQtZGtRTk4QAAAAERRqamoqWF45OTkTExPbu5B5Z0/BpX82JxqZg2UHLjFFQ0MdR0xwb28aPkMXLjEAFhlOQTarknBxYE4qJSTRsoqLd1scEQ8CJypbW1s4MjESJCYSNTkgICBQTEshQ0ggGxYpOj9eUD04LSc5X2VENisgDxAAABIyT1RBNiciEgQvIhUkHxcRDABVSTgXGRv97dS0AAAWxklEQVR4nNVdi1vaSNePh0lAuWNEKCCg3BEVqLIKVesdi61vu/u923fb7v//X3wzISGTzOQilzqe59ndZ2mTnN+c+5mbtLZ8iiU3s41K7WAPNDq8f97rH4xrlUIjm4okosv9mLTEd61vbZYqY53t/fNRp9psNqvNarvd6fVG5w9H0z+Bx24hG4kt6aNLAhCNlFrDe8LdWa+aLxczqoQUhGRkkKIgWVIz8XQ93x49kL+4N26kliCNJQDYyraGhKNRu56OS5htJMuSA8myTMCoxVyzs4+fGVZS668KYCtbO8R89Kq5uDbijpxzgChqujnCD49LW68EIFLA+n7ZqRcJ535Zt8JAcro6wYIoza1McwOIVJ6x1uSLkv9h54NAcryJMdTe/U4AsUYf6005syDzJoZiG4th+3cBiNQAzuuqsgzmp7QhI7W+D487vwPANnY51fgSudcJKeUJPKZWDWD7ER7qWO+XzT4hGZUfYPxCl/QyAJtDOCsvRe/5hOQ8QIP+YixVahQapU3HwP0SALEuHNVXyL4GIdODoSGEZKEPBn1u8DG8AEAJoCmhjWWwScKYIquqqqUYliGRlTKAZsypA+Kn03FVVuNp4mlbvGDhACAWefcuaYG8NYReBi2Fe0XNVXtGZjdp14uKBYOsfoHWWnII+3lVh4fjpBLHnrbkC0CsND7UE+HuLMpnAco2z6PlNfILgzDxlzh/ODxoNbI7O9lsofsI8NDM0O+WURWw7tRlZH0y3oMxIwQGQKSLX9jOl9O5cp7kW2PNsdVgZBl+zLcaz9Xz+Xy9nM5IyKdbwkyQiNVI0nzEsmOATpx6/YZSBygq7NN56NstwQYA2ylUi1pCScYXFZtHMNyMDqFJjTMemXJ7AiZd9uo4KHtbB1I7AJUER+gF/FlakigNR3F2UJQc3NhkYAWwo9mpRZqoTNLenDkcSMlhNg5rpc1pcRWL7FRwbPtS9oIgk3FtOGTP0Qp8ooWAigAcBBjY0AVABb6wdopRX5qvlmUM6LFhH8VoFruMuqsiyeoIPrgknZEnyFEfl+MAGQ6CMjZwJwA1aLMsoBxcmC9C6TMYb3IZSHbhrOjspuSi7h0daf0AysjywCeVo0VVsHyfAtCCJmM3hP/J7DWy1MYW4cjBuz7knRBg2e95JgljyFnt4BwRmdtGYr/PB1CCqsIoMX7JhTTjPzOxxnmGWtDhaxEezr6P2vHAovdYXTq4bEurFr3Av2Z5AJLQY8cfK+KlOf5FuE96cJCFHk8G+D2P3uxjU7p/oEO90oRPxMv14rR/QBP6XTMAQ+B8WP1kGhL2C0Pvwi+FB40D4OLeX834Dpr0ACg93VHTgpHLQFVvBoCs1YCmiodGkDZ+xYM49NNAyHLsQGmD34KxZXU9qp5xTGgRqFBhAexNKE+fyZXTOBygJvaMs18nPgexBUW72RWh4JP/tSj2hPSjOV0EZeqdyuiGAZAy/4YsdbRHOuniTB02yCB66b9BN+c2EaDRk1/+SSxSbcLTiDYtPLDmWOoAukcmwgszRZj9KKc9/A9Fm5bh0p59Qa27ZVfBT1NeKMvCRhCxAVg3BYfaZo6TnjGinPedvsjS+MECAPWe/T+LXenEmoTmWABFMEvnKYDILIKQCG5Qe/YQHsQXVNublngkZ/wLj1DWlgMhzRONaABxMDswUwClme1j/ZopEP0SX27coMcO7dHqYITgndp4XPCKx1u4ELCIIG43Yg4A03JQbwaA8qsqrxZypgJQAJSern2bT9P3VtwfXttrW42A2HGbDi5YH8x8ZgqgtW8VGKEv5muw1Rh1xE5teNByToemFKGsR5J0H5qajczY/enumTUUyqpFgSwy5QDIsxYsoY6uQZFHnQX36Yl1XP/MvlacyjtGFUDuUaEBNjesdGyutQPm37arENaWKf1Nq/HZNAffnLHw5I7gs2kE2ItoAaRGAQDXp7OQsQLAKmM1i6OaHQA2YiNUoxwjAMMEohQLn10B1CamBOoau/Sz4O6WUmwo//TFGgYol2i4UdPKpwjOaa3LTJ9o0Ty4xqYCmK9rHkbXaAvwtIJNy+BN30G51g1uNkrnkKQ5ZnVbxWnks/Bw4MZDyQQgN++nv9DkGhVZANhvmkaFrZTuw+sAWrSZyMqXI/oVWAeTa7QFaOSWmmbN3BwDWKcBHESjfXcArApJ8pcLY4DxaFrkpwNI0nk4AWxJCacAdkzm3+N/3HI7CgAesCj98Db5U1cLYoxYe4keaeXM0XtLVmyk0x+oPFxuWqO5rkJZygW13AHQKjT1QluU7WTdY1kB2JZWXE/xUHzf9mEDQAwuzMzNYvQSMWISumZ22ND4casOsBFvmA9rLuzAUP9E4olKJjl0cM6pbScjpDd+bQM3KylT0NPrfzzgVreL3Sgpo2eesEJUbs+Nhw9USYAmms7SFtR1ezZ6WGXLalQFVUaZDgydW4sl6E37D1iDMrb2xL4m87HBwGZs7O7K+1Q2J+vlR8W0INfSLsU4IUkzw7Ja5cVwqi9UggutMaVcfLGXVD1tEJPUILoyEaNFiPV3mgkaCDz6Qx8uWf4xU4DrrC6nrUp35rCUq7gUzjBlOXYCmtNsmABc8zmc0tNPj3R1e9clNuCR18asHnD2kg63K2zrja5j51LN1NlQntF7SSVf/K+NJ5bsN2dGHu++QMuauM1eUndIoGzt9SQepKNPbIP0XA+8iRbOR/sFdz4SNieAzl0t3soAXwDEs2S5DzATHIkKdJhXoLrpvWKeo1gD5uO+2yr9ffu3DRagxn2AnWKyl3RTHtxdn4WSjA3hmsrV85vU4rmgKYAOX4wsAHtRbYjAqwybUf+BeV6+cC8BDCpAntOYnHKQB673YgHU2EhOWJj41ePKbBCns1Rk4gZ7AfvUEJ//thP/1l6KK4Ahv79ctM2MOFEWWyEJgxtIjteb7XY1nyOLWopw4zk90AJODJ6RyjckBkDUwQ1gJfLTmdjWKosNXFRUzQ5fL4fInJd7aykxxLbjMsumTLhlEDvNaulK0S9oOzgymoz5AcVsL00hSEg9h5ZLDVEAsxPOJdQG3nMMgBJbThgIOp4ttpbuguUR2OhCJc1uJyGu4wjZlhy+a6oATwkZABWQnOSoVKHrZopJY46M6o6ZMlAkMtUOFbaOeIcTgJ7L/OCULO0sFwDjM0dHQKanDh3XhcVa8DBVArnM8g9EsDIqdgAeK9tbxjhEk9naMx79oo+p/gxXfgyAGzYOUwjiI/jMtcUEHkVjNp9VIEKacGRFLWvieTwYj8dDssr3qJ1T/a1UuOT5QTsAJyekk6zkJnBTsKlBovQZZ4Gq/iAuW3kAjPfi2FAsN8lq5F6njX2s4nf5FxrxOiF2APZEjAMhTWZwuoXtSDKRSEa2C6TnNjKXlqDZtJCV2gZAaUOPcMh1kS8LgOuG7AAijsmICQFJueq5ydl5u2zqgKw2n7j8Px/+m/fwM14A8rxWjh3ADi8T4mBQ1EwxnculixmV1gGUe4LrwQmH/93ja/iPu6f3+miZlxLaATTYpozjCzWy/IR99cfjYCjw1c7/9W44HLz9Rgxh7jVrRp/bHUCFXxD5I+xmr0PhQCAQvPpGs39yHMQ/BsKBE/hzAS3iTrPYAbT2F/nC4VfCPqZQ6Pjq5Ouvj7++nlzdhkL6rxgY/D3/62VeQ8wOoDtxjmNehNqHuwargXBIo6DJvYZgAH/ObQfyGaeqsgMYjuYHoB7ehQIehGVQnlfGqMcJBHYAe9xqwBdhL3Ec9gIQCH39d24AnRtvAPdumYTH+6uHQU/+A+Fbp3zdxwc4gcAOANrzA+j85QNAIPB/1XkB1DkdZQaAW1Xn8f72Nz8Awt/mHSOso2xFwAKY243iUM9yG2at4rA55ydwksVWBAyAed+uRcor2guFQ8Hd4+PdcNDiSENXjiWfjw+woZgFMH+6gv7+FjB4DQcDg5Nn+C+Ow3+dkuzC+H33/u95HfWsResKwHHhpI8PFOE6jIcbDz3m/j08tj5AJdUY/xc+DgJTMYQCHw/9ZIsOxMklbADWFwGg5XKD493bq+tnuKlESKuBTCdHs0O4uTsOhILh22+H8zpRieQSrhMci9oAQZD7DxC12atMra1mWB1ZE//t6/VfcLFIRq1wmmvLtAGJFArF3JG5yH88y+BT0Gz//eXPxXawKJwO9XIlQCAolJyHYMyqbEJa2ya60LuVB7Y5t8RAphOdtfdnTenE3AkEDeD8NwCw+LqnWfIS82oW+CHUY6f4l5gLsQDW/531EaILubcZANvuBw6ABbJRA4HZQY2+f28CWFg3qZVjLgBu5q8HdKJcBQVg/X5R0RIAbXaWxQ6gv0BFpgMYzeQcfT9ToSUBeGYKAjsA3kqLl5HcNOfDbpYMoHrouY9skaJeB1A0/ajpRpdjA1W2ollqW0X/zGw+sAEzjxRdihttegOoHC38GVw4NXT+Oz2jhip591x9vLnJztbaARQW6czphDpEiWI16OGgoKVzsQp/b81LX5z3BvCC3qgL9WCPzBjIkhz/BAelMUB7KacH+ADAnad/MSnlTq8aJ5Omspzfh8vmkjbycpas2AFw1jzO9Skz85SRumgWOnsrZ6JyjgmO1yM/AJLzty5XT7zGkB0AswdHJMIAmGVnnFlKoSXgCWDteQk5y6rIF4AF+usrJ18APi+cjq6OfAHo7r9xABX7FhyByBeAZWRzqyJjQ5ErgNJSkqHVkC8AO8tJhlZCvgC8EzgZ8gUgIXAy5AtADPJvG0B0gWm+VZOcZhfcMADWBU6GfAGw7H8RjPwB+Lxwc3FlhAEw51OwAMYPIgNgZrr9Lr8XgvwB4OwEFIV4ewhYAA3eKTFikD8AnM2kohBvsQQLQOBsDgNgNpKzALh7GcUg3mYyFoDjFo7XJ38ABE5H5bgfADGBAXD2QLAAovSxToKRLwDrCy5YWSWp7DYkHoAlzCeuitgVT5zzRhdeLrE6kqESi7kBWI/FEollTEmviNAlAPx7UKBOnKcApCoH090j4gJQ9n9dnZ58xzy2kjYASXLyy/eT06vB4H/ilmTKw9dgSFsTCTBOUACSY4CTgbbYPxz6Q2AA57+C+qrUU/2MBg1AAeA0ENTXrIZFBjD6bizPDgVO4GBdA7A+hpNdc82wyABQ5x9zfXnwipxzI5G1kVf0qnOhAbT/R63OxghaGEDFyr/YAKqHNKvBO0hKSbizrfoX2AvJTdi1LuWvSS1m0b/AcQDlqW06WJlCdyAdnWABWFb4CwyA3md0fB0IYSuQ4JRsHTRxhXcFTubkHNwa3v4Yfgx2/xlK45/Hgx+zn3GIGAg8V49rysEsENz+wMlDUkrgf3+7NZxT8Pj0p8CrJcjJlyeBkDHWV/AOu9EInBomQKIbHCxjed6KCAP4DD8HOr/Yi0YxgKjhR8OhwU+obAlcE2s1ZaIPHwdhkrQF9EjchQD53+DgI/STQrdV9PNJsgA/7ga3g3/IbIFE+ig/r24Hd7hS0HoWAje2MF1qO3J3tPPKnjb1bDSi3TUy1tuOArcWcSQ7M1aWJ1N0PbD1zrxpTuDmLm8Px5tqr5OCwH7OJAugIu4EB+8M6zc1xcQ7HONNTfJpC/A9AQg8zco73eNNTXRruzVdO3NrYi810BYfJzwACL3ylXO+yptabqNVNO88AAg8wyTx5uo5x7SJnMuxU91vatGfRAqCHQ8AIi+7lIzzi90ANARe+CpxzhjirNwVWQDsNB8DoHYkcCbBOfPyRSf9CUCq/ZQnBsAiJyT9DvIEsCdyLiex5xW+qT00hPY9AETnPjznN5EXgJjAnVFC8lnNHYDnYZGvTJ4AhN6KKPkAIHRnVPIBYFPsZNQbwLbYyagkP3h4oeXs6F4hebnREu9GV5HIKxIv51CAFdKRBwCRN/IR8sxGxQfgUQ8s4WSPlZJnRSY+AI+auHL52iy6k2dbpbL46TarJO/GlugAPFuLogPw7E6LDoA5nOSNGbH3FJPoADxnKQWPA6hnP3r6jaUSyrn98G8WgNDZqGwvB95aOs3eZ/S2KjLOPqy3VRNztnTbAYh8rAT3UjK2sSVyXwhV79c8AIjdWqSOAnUC4HAtpBi0gdiDp5n5AYE3Yfnbivgo8hlbnPP72Uk+gRds+Tmuc60i8Dwx6rF3Y7+ppQZ+zl7n3FEuDPE2dLMAtsTdD82uN+MBEHjNHOowcZi3avFg4YObV0XyEeeCXN7ZKvLcV4atlPhXFLMAtkW1Yl4U4B/LIOhUNzpnowB3T72gycRGhnuzKgdAS8xYTF+z7Q5AUCNA5+ztCXwAYh4sgcMw925eDoC18ZmAEkBNv3d0u11R/IokH3EviOYCiAmoQ7iW4V8szAOwNhZvkkAZPXH55wPYFq63gk2Ye0e6A4C1+55gCR3qcO4TdAFQEKwskzO8W01dAMSgLZQIUJuXx7kAwOmEKlBOjS2Adz23G4AtoY42UDqOAnACgEUQF6aukdNOLsgFQHQp964sh9Dk2cEFuQBYawgTC1CePWHRB4C1x/3X5nxK2II59yr7ABCBjhCuVJ44xTAPADialQUwAxwCmENSfQJYGwqwBBOVHWOwN4AYTF6d/yJw7uX2C2Bt87V9Kc6BntwMwAsArs1eNSeS1SN+HekbADbk6ushkNVP7FHlLwSAU4pXQyBnLrz59wSAEbxSWofil+CchPoHsEZuo/vt3nRDQmmA41PoO6ahfgGk3gNMlnOh20tIqcM/u6HgLXhpkbcNfD8eAKR/ryHIUht+kQvLQ8fPnKvd/QNI9OEuEA4d/wHNha52fiGh4gTuQvqha/+4y8AVQBamh4qFA9dwHv9daiTj/Nk8zCy8++waC9wAtLAY9RPFgliNmr/HlpXiOXylT9/chSfmSllfAMZwFzTPBdy9JjecrxwCUttwOLCc/hi6dSsInAEc2E7xDA1+QK+orBSCLNXBcvjpVPynvNk9LwC2U0i1U+hOATqZ1UkByfV9gO92/vGXv9sXHHsDKDD8a3p0B9COr0QKssZ+P1WiDFiTPPnnlj+54QIgCSdB/WmrNAMYQi+3rKs+TfaVeBXgM6m9Yn0LgivCQ/Crfcm0F4AuTM2HEcEVOfQZ9vOZJYpBRlKuB9A1jn0Zw8DQIjz22nGiA8dg4NQbPQ1pTw9oGYTI8A8bqa2dIRZDWV2KGLDqpNtHcF+gnP0BzE6vDJ1qaHbZtWauAHa08ztD399b1GfwEz7oM53JyqGOYREQssY9NtyurW7fM89FxUwQMC/sTpfI0bbBU1OUxI3ewSMtx01yVviXZhopc0lCRkgp1rHmQDfLVI0xeDbsLzzQ1MCxuegMIHwMX01jCu/+YgchUsC6BKNmOqMg/7KQCe9qOk+Yf2zxeyZJ+D4TwY9fIazMTr0VPoAUVqHQL+qE4dDxD34wie60yEmN+518Lq4iVxyyxjlS47lm54EwX8s6Jznb8DU0s4JdzIvTX+QDiGLbH8DVTIHc8/JYqtF9Js5p0qvmy+mMOr1gmSIMSsWM1/Pt0Rn5i8/jQsqjUinBif75XTg9cQ7FjhMcgWvTgoNX8OhVGcUi2Ur3BqZ0eTYa9Xq9Dib8n9Fosq//AfQ/FLIRr3dpVIDrsKZGOAi8vL0eg5+zEQiHT4A/ycyhaDK106i0at3x5+HjHqbH/vBg/KFVKZS2NxMuWSVLDVxLkcP6B4fzdKcTY/ioAQgHb/9wGYBVEq5mf53efYfhfPXADhYBxr97Av+6dldXSNEGdhBD50yUkGt3+vvp1TVAy6O5t1KKen3crSJLHQA8Vbx6e69M/w+WWhzNf9cNYgAAAABJRU5ErkJggg=="
	fmt.Println("03) ", validate.Var(imageBase64, "datauri"))

	// fqdn: 全限定域名，即同时带有主机名和域名的名称
	fmt.Println("04) ", validate.Var("jinhui.dev", "fqdn"))

	// hostname
	fmt.Println("05) ", validate.Var("jinhui.dev", "hostname"))
	fmt.Println("06) ", validate.Var("jinhui.dev", "hostname_rfc1123"))
	fmt.Println("07) ", validate.Var("jinhui.dev:80", "hostname_port"))
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
01)  Key: '' Error:Field validation for '' failed on the 'cidr' tag
02)  <nil>
03)  <nil>
04)  <nil>
05)  <nil>
06)  <nil>
07)  <nil>
```

:::

<br />

#### 特殊符号说明

* `,`：用于隔开多个验证标记，多个验证标记需要都满足才算验证成功，请注意逗号后面不能有空格
* `-`：用于跳过该字段，不进行验证
* `|`：用于多个验证标记，但是只需满足其中一个即可

<br />

#### 常用验证标记

待补充

<br />

### 注册自定义函数

#### 自定义验证失败时结构体字段名称

::: details （1）普通结构体使用示例

```go
package main

import (
	"fmt"
	"reflect"
	"strings"

	"github.com/go-playground/validator/v10"
)

type User struct {
	FirstName string `validate:"max=1" json:"firstName" `
	LastName  string `validate:"max=1"`
	Age       uint8
}

func main() {
	// 实例化User对象
	user := User{
		FirstName: "龙城",
		LastName:  "慕容",
	}

	// 实例化validator对象
	validate := validator.New()

	// 在校验发生错误时，修改错误中的Tag名称
	// 下面的代码会使用json的值代替默认的结构体字段名称，若未定义json则继续使用原字段名称
	validate.RegisterTagNameFunc(func(field reflect.StructField) string {
		name := strings.SplitN(field.Tag.Get("json"), ",", 2)[0]
		if name == "" {
			return field.Name
		}
		return name
	})

	// 验证
	fmt.Println(validate.Struct(user))
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
Key: 'User.firstName' Error:Field validation for 'firstName' failed on the 'max' tag  # 注意这里是firstName而不是FirstName
Key: 'User.LastName' Error:Field validation for 'LastName' failed on the 'max' tag
```

:::

::: details （2）Gin注册使用示例

参考：[https://gin-gonic.com/docs/examples/custom-validators/](https://gin-gonic.com/docs/examples/custom-validators/)

```go
package main

import (
	"log"
	"net/http"
	"reflect"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/validator/v10"
)

// 定义结构体,注意需要将 validate 修改为 binding
type person struct {
	Name                string `json:"name" binding:"required,min=4,max=15"`
	Email               string `json:"email" binding:"required,email"`
	Age                 int    `json:"age" binding:"required,numeric,min=18"`
	DriverLicenseNumber string `json:"driverLicenseNumber" binding:"omitempty,len=12,numeric"`
}

// Validator 定义翻译接口，可以定义为结构体方法，也可以单独定义一个方法
// 原先的字段名称Name修改未json定义的name和age
func (p person) Validator() map[string]string {
	return map[string]string{
		"InvalidValidationError": "验证参数无效",
		"name.required":          "用户名为必填项",
		"name.min":               "用户名最少4个字符",
		"name.max":               "用户名最多15个字符",
		"age.required":           "年龄为必填项",
	}
}

func main() {
	// Gin初始化
	r := gin.Default()

	// 自定义验证失败时结构体字段名称
	if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
		v.RegisterTagNameFunc(func(field reflect.StructField) string {
			name := strings.SplitN(field.Tag.Get("json"), ",", 2)[0]
			if name == "" {
				return field.Name
			}
			return name
		})
	}

	r.POST("/", func(c *gin.Context) {
		// Gin参数绑定
		var p person
		err := c.ShouldBind(&p)

		// 翻译错误，返回一个map切片
		errMessage := ValidatorTranslate(err, p.Validator)

		// 返回响应
		c.JSON(http.StatusOK, errMessage)
	})
	log.Fatalln(r.Run("0.0.0.0:6666"))
}
```

输出结果

![image-20221019193400519](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221019193400519.png)

:::

<br />

#### 自定义验证标记

这里仿照`min`的效果来写一个`min2`

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"strconv"

	"github.com/go-playground/validator/v10"
)

type User struct {
	Name string `validate:"min2=4"`
	Age  uint8  `validate:"min2=4"`
}

func main() {
	// 实例化User对象
	user := User{
		Name: "bob",
		Age:  3,
	}

	// 实例化validator对象
	validate := validator.New()

	// 自定义验证标记, 返回值true代表验证通过，false代表验证未通过
	min2 := func(fl validator.FieldLevel) bool {
		// 获取标记名：       fl.GetTag()
		// 获取标记值：       fl.Param()
		// 获取结构体字段名：  fl.FieldName()
		// 获取结构体字段类型：fl.Field().Type()
		// 获取结构体字段值：  fl.Field().Interface()

		// 获取标记值，并转为uint64类型
		tagValue, err := strconv.ParseUint(fl.Param(), 10, 64)
		if err != nil {
			return false
		}

		// 定义字段长度
		// 1) 验证标记 若只需要 支持一种数据类型，直接断言即可
		// 2) 我们这里使用查询来让它支持多种基础类型, 不能直接写成 case int, int8,后面使用uint64(v)会报错
		var fieldValueOrLength uint64
		switch v := fl.Field().Interface().(type) {
		case string:
			fieldValueOrLength = uint64(len(v))
		case int:
			fieldValueOrLength = uint64(v)
		case int8:
			fieldValueOrLength = uint64(v)
		case int16:
			fieldValueOrLength = uint64(v)
		case int32:
			fieldValueOrLength = uint64(v)
		case int64:
			fieldValueOrLength = uint64(v)
		case uint:
			fieldValueOrLength = uint64(v)
		case uint8:
			fieldValueOrLength = uint64(v)
		case uint16:
			fieldValueOrLength = uint64(v)
		case uint32:
			fieldValueOrLength = uint64(v)
		default:
			return false // 不支持的类型
		}

		// 字段长度满足标记最小长度返回true,否则返回false
		return fieldValueOrLength >= tagValue
	}
    
    // 注册自定义验证标记
	err := validate.RegisterValidation("min2", min2)
	if err != nil {
		panic(err)
	}

	// 验证
	fmt.Println(validate.Struct(user))
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
Key: 'User.Name' Error:Field validation for 'Name' failed on the 'min2' tag
Key: 'User.Age' Error:Field validation for 'Age' failed on the 'min2' tag
```

:::

<br />

## math/rand

文档：[https://pkg.go.dev/math/rand](https://pkg.go.dev/math/rand)

<br />

### 随机数种子

::: details 错误示例（1）：使用初始的随机数种子

```go
package main

import (
	"fmt"
	"math/rand"
)

func main() {
	for i := 0; i < 9; i++ {
		fmt.Println(rand.Intn(100)) // 获取 0 - 100之间的随机数，包含0，不包含100
	}
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
81
87
47
59
81
18
25
40
56

D:\application\GoLand\demo>go run main.go
81
87
47
59
81
18
25
40
56

# 如上所示，执行两次，输出的随机数居然一样？
# 总结一下就是：对于一次执行来说是随机的，对于多次执行来说是非随机的
```

说明

（1）伪随机数和真随机数

通常我们使用的是<span style="color: red; font-weight: bold;">伪随机数</span>，特点是生成速度快，缺点是不够安全（下面会讲到），而<span style="color: red; font-weight: bold;">真正的随机数</span>是使用物理现象产生的：比如掷钱币、骰子、转轮、使用电子元件的噪音、核裂变等。对于计算机来说，可以通过读取硬件信息来产生真随机数或更加接近真随机数的数字

（2）随机数种子

我们所使用的`math/rand`是通过特定的算法来产生伪随机数，比如说下面这个算法

```c++
RAND_SEED = (RAND_SEED * 123 + 59 ) % 65536;
```

1. `RAND_SEED`是随机数种子，本质上就是一个数字

2. 通常它会有一个初始值，带入公式后我们会得到一个随机数，同时会把这个随机数作为种子，用于下次产生随机数

3. 这会产生一种现象：只要初始随机数种子确定，那么它所产生的前N项随机数就是确定的，也就是说多次运行程序产生的前N项随机数就是确定的，

   这就解释了我们上面所看到的现象

4. 那么`math/rand`包中初始的随机数种子是多少呢？查看一下`rand.Seed`函数

   ```go
   // Seed uses the provided seed value to initialize the default Source to a
   // deterministic state. If Seed is not called, the generator behaves as
   // if seeded by Seed(1). Seed values that have the same remainder when
   // divided by 2³¹-1 generate the same pseudo-random sequence.
   // Seed, unlike the Rand.Seed method, is safe for concurrent use.
   func Seed(seed int64) { globalRand.Seed(seed) }
   ```

   可以很清楚的看到：如果`Seed`未被调用，那么初始随机数种子是1。为了验证，我们使用1和2作为种子测试一下，是否符合我们猜想，这里就不贴结果了

   ```go
   package main
   
   import (
   	"fmt"
   	"math/rand"
   )
   
   func main() {
   	rand.Seed(1) // 设置初始随机数种子是1
   	for i := 0; i < 9; i++ {
   		fmt.Println(rand.Intn(100)) // 获取 0 - 100之间的随机数，包含0，不包含100
   	}
   }
   ```

:::

::: details 错误示例（2）：多次初始化随机数种子，且使用相同的随机数种子

```go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	for i := 0; i < 9; i++ {
		rand.Seed(time.Now().UnixNano()) // 每次产生随机数都重新初始化种子，并且我还使用了纳秒作为种子，精度够高吧（偷笑..嘿嘿嘿）
		fmt.Println(rand.Intn(100))      // 获取 0 - 100之间的随机数，包含0，不包含100
	}
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
93
93
93
93
93
93
79
79
79

D:\application\GoLand\demo>go run main.go
81
81
81
81
81
81
20
27
27

# 这...怎么这么多重复的？这好像不是随机数吧？
```

说明

首先，初始随机数种子不应该多次初始化。

其次，我们分析一下为什么会出现重复的数字：

因为`for`循环运行的特别快，所以导致多次循环中都获取到了同一纳秒的时间戳，并且使用相同的值重新初始化了随机数种子，那么就相当于随机数算法又从头开始计算随机数了，算出来的随机数都是算法中第一个数字，所以就会导致重复了

:::

::: details 正确示例

```go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	// 初始随机数种子设置为一个动态的值，且只设置一次，避免算法又从头开始计算导致的重复
	rand.Seed(time.Now().UnixNano())

	// 产生随机数
	for i := 0; i < 9; i++ {
		fmt.Println(rand.Intn(100)) // 获取 0 - 100之间的随机数，包含0，不包含100
	}
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
91
32
84
11
47
76
84
79
42

D:\application\GoLand\demo>go run main.go
47
42
19
27
72
38
88
63
73
```

:::

<br />

## path/filepath

文档：[https://pkg.go.dev/path/filepath](https://pkg.go.dev/path/filepath)

<br />

### 两种目录

**目录说明**

Go可以输出目录的路径，但是会受到一些外在因素的影响，因此我将目录分为两类，并解释会受到何种因素的影响

**（1）运行时所在目录：执行程序时用户所在的目录**

* 以下两种执行代码输出的目录路径是不一样的，因为用户所在的目录发生了变化
  * `go run example/main.go`
  * `cd example && go run main.go`
* 我们写的代码大部分情况都是使用这种目录，比如`os.Open`、`os.WriteFile`、`filepath.Abs`等函数
* `go run`和`go build`输出的结果一致，因为用户所在的目录没有发生变化

**（2）二进制所在目录：二进制命令所在的目录**

* 只要程序（二进制命令）路径没有发生变化，那么不管在哪个目录下执行程序输出结果都不会有影响
* 在特殊情况下可能会用到这种目录，比如在项目内部记录一些数据、日志等
* `go run`和`go build`输出的结果不一致，因为`go run`会把代码编译到一个临时目录中，也就是说二进制命令目录发生了变化

**演示环境**

* Linux演示环境项目目录： `/root/example`
* Windows演示环境目录：`D:\application\GoLand\example`

::: details （1）运行时所在目录

```go
package main

import (
	"fmt"
	"os"
)

// 字符串格式化模板
const FORMAT = "%-20s %s\n"

func main() {
	// 运行时所在目录
	pwd, err := os.Getwd()
    if err != nil {
        panic(err)
    }
	fmt.Printf(FORMAT, "运行时所在目录:", pwd)
}
```

输出结果

```bash
# -------------------------------------------------------------------
# Linux

# 先编译一下
[root@ap-hongkang example]# go build main.go

# 在项目根目录下运行
[root@ap-hongkang example]# go run main.go && ./main
运行时所在目录:             /root/example
运行时所在目录:             /root/example

# 切换到其他目录运行
[root@ap-hongkang example]# cd ..
[root@ap-hongkang ~]# go run example/main.go && ./example/main
运行时所在目录:             /root
运行时所在目录:             /root

# -----------------------------------------------------------------
# Windows

# 先编译一下
D:\application\GoLand\example>go build main.go

# 在项目根目录下运行
D:\application\GoLand\example>go run main.go && main.exe
运行时所在目录:             D:\application\GoLand\example
运行时所在目录:             D:\application\GoLand\example

# 切换到其他目录运行
D:\application\GoLand\example>cd ..
D:\application\GoLand>go run example/main.go && example\main.exe
运行时所在目录:             D:\application\GoLand
运行时所在目录:             D:\application\GoLand
```

:::

::: details （2）二进制所在目录

备注：使用`os.Executable`重新改写一下会简单一些，以后再做

```go
package main

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
)

// 字符串格式化模板
const FORMAT = "%-20s %s\n"

// GetBinaryFilePath 获取二进制命令路径
func GetBinaryFilePath(followSymLinks bool) (filePath string, fileName string, err error) {
	// 获取二进制命令的文件名，根据执行方式不同结果不同:
	// 1.以绝对路径执行，获取到绝对路径
	// 2.以相对路径执行，获取到相对路径
	file, err := exec.LookPath(os.Args[0])
	if err != nil {
		return filePath, fileName, err
	}

	// 获取文件的绝对路径
	// 1.文件在不在它并不会校验
	// 2.如果传入一个绝对路径,它直接返回
	// 3.如果传入一个相对路径，它会使用 运行时目录 + 相对路径 组合出一个绝对路径再返回
	fileAbsPath, err := filepath.Abs(file)
	if err != nil {
		return filePath, fileName, err
	}

	// 是否跟随符号链接
	// 1.Linux只跟随软连接，不跟随硬链接
	// 2.Linux支持跟随多级软连接
	// 3.Windows 10下总是跟随快捷方式
	//   CMD下无法执行快捷方式的二进制命令，此时直接点击快捷方式执行(代码加一下Sleep暂停操作)
	if followSymLinks {
		fileAbsPath, err = filepath.EvalSymlinks(fileAbsPath)
	}

	// 将路径分割，提取出目录和文件名
	filePath = filepath.Dir(fileAbsPath)
	fileName = filepath.Base(fileAbsPath)

	return filePath, fileName, nil
}

func main() {
	// 二进制所在目录
	filePath, fileName, err := GetBinaryFilePath(true)
	if err != nil {
		panic(err)
	}
	fmt.Printf(FORMAT, "二进制所在目录:", filePath)
	fmt.Printf(FORMAT, "二进制文件名称:", fileName)
}
```

**（1）基础测试**

```bash
# -------------------------------------------------------------------
# Linux

# 先编译一下
[root@ap-hongkang example]# go build main.go

# (1) 在项目根目录下运行 - go run
[root@ap-hongkang example]# go run main.go
二进制所在目录:             /tmp/go-build1293444666/b001/exe
二进制文件名称:             main

[root@ap-hongkang example]# ll /tmp/go-build1293444666/b001/exe  # 查看一下目录，报错不存在，因为运行完该目录就被删除了
ls: cannot access '/tmp/go-build1293444666/b001/exe': No such file or directory

[root@ap-hongkang example]# go run -work main.go # 添加-work参数，会将临时目录输出出来并且不会删除临时目录
WORK=/tmp/go-build4122350003
二进制所在目录:             /tmp/go-build4122350003/b001/exe
二进制文件名称:             main

[root@ap-hongkang example]# ll /tmp/go-build4122350003/b001/exe/  # 进到目录查看一下
total 1308
-rwxr-xr-x 1 root root 1339392 Dec 27 15:55 main

[root@ap-hongkang example]# /tmp/go-build4122350003/b001/exe/main 
二进制所在目录:             /tmp/go-build4122350003/b001/exe
二进制文件名称:             main

# (2) 在项目根目录下运行 - go build
[root@ap-hongkang example]# ./main 
二进制所在目录:             /root/example
二进制文件名称:             main

# (3) 切换到其他目录运行
[root@ap-hongkang example]# cd ..
[root@ap-hongkang ~]# go run example/main.go 
二进制所在目录:             /tmp/go-build601928247/b001/exe
二进制文件名称:             main

[root@ap-hongkang ~]# ./example/main
二进制所在目录:             /root/example
二进制文件名称:             main

# -------------------------------------------------------------------
# Windows

# 先编译一下
D:\application\GoLand\example>go build main.go

# (1) 在项目根目录下运行 - go run
D:\application\GoLand\example>go run main.go
二进制所在目录:             C:\Users\Administrator\AppData\Local\Temp\go-build4082603138\b001\exe
二进制文件名称:             main.exe

# (2) 在项目根目录下运行 - go build
D:\application\GoLand\example>.\main.exe 
二进制所在目录:             D:\application\GoLand\example
二进制文件名称:             main.exe

# (3) 切换到其他目录运行
D:\application\GoLand\example>cd ..

D:\application\GoLand>go run example/main.go
二进制所在目录:             C:\Users\Administrator\AppData\Local\Temp\go-build1999072041\b001\exe
二进制文件名称:             main.exe

D:\application\GoLand>example\main.exe
二进制所在目录:             D:\application\GoLand\example
二进制文件名称:             main.exe
```

**（2）Linux软硬链接下的表现情况**

```bash
# 制作软链接和硬链接
[root@ap-hongkang ~]# ln -s /root/example/main /usr/bin/main-soft
[root@ap-hongkang ~]# ln /root/example/main /usr/bin/main-hard

# 不追随软链接情况下
[root@ap-hongkang ~]# main-soft
二进制所在目录:             /usr/bin
二进制文件名称:             main-soft

# 追随软链接情况下
[root@ap-hongkang ~]# main-soft
二进制所在目录:             /root/example
二进制文件名称:             main

# 硬链接
[root@ap-hongkang ~]# main-hard
二进制所在目录:             /usr/bin
二进制文件名称:             main-hard
```

**（3）Windows快捷方式下的表现**

* Windows下的快捷方式相当于软连接，硬链接不测试了
* 设置`followSymLinks = false`
* `main`函数加一下暂停，方便观看输出 `time.Sleep(time.Minute)`

创建软链接

```bash
# 可以直接右键创建快捷方式，也可以使用如下命令创建
C:\Users\Administrator>mklink C:\Users\Administrator\Desktop\main.exe D:\application\GoLand\example\main.exe
为 C:\Users\Administrator\Desktop\main.exe <<===>> D:\application\GoLand\example\main.exe 创建的符号链接
```

输出结果

![image-20221227162928620](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221227162928620.png)

结论：Windows下总是追随快捷方式（软连接）

:::

<br />

### 函数示例

::: details （1）filepath.Abs：获取文件或目录的绝对路径，filepath.IsAbs：返回路径是否是绝对路径

```go
package main

import (
	"fmt"
	"path/filepath"
)

func main() {
	// filepath.Abs：获取文件或目录的绝对路径
	// 1.文件或目录在不在它并不会校验
	// 2.如果传入一个绝对路径,它直接返回
	// 3.如果传入一个相对路径，它会使用 运行时目录 + 相对路径 组合出一个绝对路径再返回
    // 4.特殊值: 空字符串会转为 .
	fmt.Println(filepath.Abs("/abc"))
	fmt.Println(filepath.Abs("abc"))
	fmt.Println(filepath.Abs("C:/abc"))
	fmt.Println(filepath.Abs("."))
	fmt.Println(filepath.Abs(""))
}
```

输出结果

```bash
# Windows下输出结果
D:\application\GoLand\example>go run main.go
D:\abc <nil> # 测试绝对路径，Windows下没有/,或者说Windows下有多个/，每个驱动器(C盘/D盘等)都是一个根, /abc => D:\abc
D:\application\GoLand\example\abc <nil>  # 测试相对路径，程序运行时用户所在目录 + 相对目录
C:\abc <nil>                             # Windows下的绝对目录，原样输出
D:\application\GoLand\example <nil>      # 特殊目录测试
D:\application\GoLand\example <nil>      # 特殊目录测试

# Windows下切换一个驱动器，可以看到前两个输出都变成C盘路径了
C:\Users\Administrator>go run D:\application\GoLand\example\main.go
C:\abc <nil>
C:\Users\Administrator\abc <nil>
C:\abc <nil>
C:\Users\Administrator <nil>
C:\Users\Administrator <nil>

# Linux下输出结果
[root@ap-hongkang example]# go run main.go
/abc <nil>
/root/example/abc <nil>
/root/example/C:/abc <nil>    # Linux下不认Windows的驱动,所以路径变成这样了
/root/example <nil>
/root/example <nil>

# 注意事项
# filepath.Abs：如果传入的相对路径，会使用 程序运行时用户所在目录 + 相对目录
```

:::

::: details （2）filepath.Base：路径最后一个元素，filepath.Dir：除路径最后最后一个元素外的所有元素

```go
package main

import (
	"fmt"
	"path/filepath"
)

func main() {
	// filepath.Base：获取路径的最后一个元素
	fmt.Println(filepath.Base("/var/lib"))
	fmt.Println(filepath.Base("/var/lib/"))
	fmt.Println(filepath.Base("/var/lib//"))
	fmt.Println(filepath.Base(""))
	fmt.Println(filepath.Base("."))
	fmt.Println(filepath.Base(".."))

	fmt.Printf("\n------------------------------\n\n")

	// filepath.Dir：提取路径除最后一个元素外的路径
	fmt.Println(filepath.Dir("/var/lib"))
	fmt.Println(filepath.Dir("/var/lib/"))
	fmt.Println(filepath.Dir(""))
	fmt.Println(filepath.Dir("."))
	fmt.Println(filepath.Dir(".."))
}
```

输出结果

```bash
# Windows下执行输出结果
D:\application\GoLand\example>go run main.go
lib
lib                           
lib                           
.                             
.                             
..                            
                              
------------------------------

\var                          
\var\lib  # 这里需要注意
.                             
.                             
.                             


# Linux下执行输出结果
[root@ap-hongkang example]# go run main.go
lib
lib
lib
.
.
..

------------------------------

/var
/var/lib  # 这里需要注意
.
.
.
```

:::

::: details （3）filepath.Split：路径分割

```go
package main

import (
	"fmt"
	"path/filepath"
)

func main() {
	// filepath.Split：路径分割

	var dir, file string

	dir, file = filepath.Split("/var/lib")
	fmt.Printf("Dir: %s\t File: %s\n", dir, file)

	dir, file = filepath.Split("/var/lib/")
	fmt.Printf("Dir: %s\t File: %s\n", dir, file)

	dir, file = filepath.Split(filepath.Clean("/var/lib/"))
	fmt.Printf("Dir: %s\t File: %s\n", dir, file)
}
```

输出结果

```bash
# Windows下执行输出结果
D:\application\GoLand\example>go run main.go
Dir: /var/       File: lib
Dir: /var/lib/   File:
Dir: \var\       File: lib

# Linux下执行输出结果
[root@ap-hongkang example]# go run main.go
Dir: /var/       File: lib
Dir: /var/lib/   File: 
Dir: /var/       File: lib
```

:::

::: details （4）filepath.SplitList：用于分割环境变量或GOPATH变量,根据os.PathListSeparator分割

```go
package main

import (
	"fmt"
	"path/filepath"
)

func main() {
	// filepath.SplitList：用于分割环境变量或GOPATH变量,根据os.PathListSeparator分割
	//   Windows: ;
	//   Linux:   :
	fmt.Printf("%#v\n", filepath.SplitList("C:/abc;D:/def;F:/xyz"))
	fmt.Printf("%#v\n", filepath.SplitList("/bin:/usr/sbin:/usr/local/bin"))
}
```

输出结果

```bash
# Windows下执行输出结果
D:\application\GoLand\example>go run main.go
[]string{"C:/abc", "D:/def", "F:/xyz"}
[]string{"/bin:/usr/sbin:/usr/local/bin"}

# Linux下执行输出结果
[root@ap-hongkang example]# go run main.go 
[]string{"C", "/abc;D", "/def;F", "/xyz"}
[]string{"/bin", "/usr/sbin", "/usr/local/bin"}
```

:::

::: details （5）filepath.Join：路径组合

```go
package main

import (
	"fmt"
	"path/filepath"
)

func main() {
	// filepath.Join: 路径组合
	fmt.Println(filepath.Join("a", "b", "c"))
	fmt.Println(filepath.Join("a", "b/c"))
	fmt.Println(filepath.Join("a/b", "c"))
	fmt.Println(filepath.Join("a/b", "/c"))
	fmt.Println(filepath.Join("a/b", "../../../xyz"))
}
```

输出结果

```bash
# Windows下执行输出结果
D:\application\GoLand\example>go run main.go
a\b\c
a\b\c
a\b\c
a\b\c
..\xyz

# Linux下执行输出结果
[root@ap-hongkang example]# go run main.go 
a/b/c
a/b/c
a/b/c
a/b/c
../xyz
```

:::

::: details （6）filepath.Clean：返回与路径等效的最短路径名；路径分隔符自动替换为系统路径分隔符

```go
package main

import (
	"fmt"
	"path/filepath"
)

func main() {
	// filepath.Clean：返回与路径等效的最短路径名
	fmt.Println(filepath.Clean("."))
	fmt.Println(filepath.Clean("~"))
	fmt.Println(filepath.Clean("/var/lib/.."))
	fmt.Println(filepath.Clean("/var/lib/.."))
	fmt.Println(filepath.Clean("/var/lib"))
	fmt.Println(filepath.Clean("/var/lib/."))
	fmt.Println(filepath.Clean("/var/lib/./"))
	fmt.Println(filepath.Clean("/var/lib/././"))
}
```

输出结果

```bash
# Windows下执行输出结果
D:\application\GoLand\example>go run main.go
.
~       
\var    
\var    
\var\lib
\var\lib
\var\lib
\var\lib

# Linux下执行输出结果
[root@ap-hongkang example]# go run main.go
.
~
/var
/var
/var/lib
/var/lib
/var/lib
/var/lib
```

:::

<br />

### 模式匹配

匹配语法

```bash
pattern:
	{ term }
term:
	'*'         matches any sequence of non-Separator characters
	'?'         matches any single non-Separator character
	'[' [ '^' ] { character-range } ']'
	            character class (must be non-empty)
	c           matches character c (c != '*', '?', '\\', '[')
	'\\' c      matches character c

character-range:
	c           matches character c (c != '\\', '-', ']')
	'\\' c      matches character c
	lo '-' hi   matches character c for lo <= c <= hi
```

::: details （1）filepath.Glob：返回匹配的结果

```go
package main

import (
	"fmt"
	"path/filepath"
)

func main() {
	// filepath.Glob: 模式匹配
	fmt.Println(filepath.Glob("C:/*"))
	fmt.Println(filepath.Glob("/*/*/bin"))
}
```

输出结果

```bash
# Windows下执行输出结果
D:\application\GoLand\example>go run main.go
D:\application\GoLand\example>go run main.go
[C:\$360Section C:\$Recycle.Bin C:\$WinREAgent C:\360SANDBOX C:\CIMTEMP C:\Documents and Settings C:\DumpStack.log C:\DumpStack.log.tmp C:\PerfLogs C:\Plugin C:\Program Files C:\Program Files (x86) C:\ProgramData C:\Recovery C:\Syst
em Volume Information C:\Users C:\WCH.CN C:\Windows C:\bootTel.dat C:\hiberfil.sys C:\pagefile.sys C:\swapfile.sys C:\sys] <nil>
[\application\GoPath\bin \software\Cygwin\bin \software\EDU\bin \software\Git\bin \software\GoLand 2022.2.3\bin \software\IntelliJ IDEA 2022.2\bin \software\Microsoft VS Code\bin \software\PyCharm Community Edition 2021.3.1\bin \sof
tware\VMwareWorkstationPro\bin \software\WebStorm 2022.2.2\bin \software\jdk-8u341\bin \software\protoc-21.9-win64\bin] <nil>

# Linux下执行输出结果
[root@ap-hongkang example]# go run main.go 
[] <nil>
[/lib/debug/bin /opt/cni/bin /opt/containerd/bin /usr/local/bin] <nil>
```

:::

::: details （2）filepath.Match：判断字符串是否满足模式

```go
package main

import (
	"fmt"
	"path/filepath"
)

func main() {
	// filepath.Match: 判断字符串是否满足模式
	fmt.Println(filepath.Match("C:/*", "C:/Program Files"))
	fmt.Println(filepath.Match("*/bin", "/usr/local/bin"))
	fmt.Println(filepath.Match("C:\\*", "C:\\Program Files\\abc"))
}
```

输出结果

```bash
# Windows下执行输出结果
D:\application\GoLand\example>go run main.go
true <nil>
true <nil>
false <nil>

# Linux下执行输出结果
[root@ap-hongkang example]# go run main.go 
true <nil>
false <nil>
false <nil>

# 分析
# 1.Windows路径分隔符是\\，Linux路径分隔符是/
# 2./在Windos看来就是普通的字符串，\\在Linux看来也是普通字符串
```

:::

<br />

### 目录遍历

待补充
