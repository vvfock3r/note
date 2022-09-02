# Go实用模块

## 分组目录

<table>
    <thead>
    <tr>
        <th style="width: 15%;">分类说明</th>
        <th style="width: 15%;">模块名称</th>
        <th style="width: 15%;">测试版本</th>
        <th style="width: 15%;">应用举例</th>
        <th style="width: 40%;">备注</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>命令行界面</td>
        <td><a href="#cobra" style="text-decoration:none;">Cobra</a></td>
        <td><li><code>Go 1.19</code></li><li><code>Cobra v1.5.0</code></li></td>
        <td>Kubernetes、Docker、Containerd ...</td>
        <td></td>
    </tr>
    </tbody>
</table>

<br />

## Cobra

Cobra

* 文档：[https://cobra.dev/](https://cobra.dev/)

* Github：[https://github.com/spf13/cobra](https://github.com/spf13/cobra)

Cobra CLI

* Github：[https://github.com/spf13/cobra-cli](https://github.com/spf13/cobra-cli)

### 基础示例

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

#### （5）

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

### 帮助信息

#### （1）Usage：不显示`[flags]`

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

