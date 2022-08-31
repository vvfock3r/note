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

#### 基本概念

```bash
git clone https://github.com/spf13/cobra.git --depth 1
```

* **Commands**：子命令，在上面的例子中对应`clone`
* **Args** ：参数，在上面的例子中对应`https://github.com/spf13/cobra.git`，这是一个由用户输入的值，对我们的程序来说是可变的值
* **Flags** ：标志，在上面的例子中对应`--depth 1`

其中Args和Flags的位置可以互换

#### 常规目录结构

```bash
demo/               # 项目根目录
    cmd/			# 命令行目录
		root.go		# 用于定义根命令
	main.go			# 项目入口文件
```

::: details 常规目录结构

`main.go`

```go
package main

import "demo/cmd"

func main() {
	cmd.Execute()
}
```

`cmd/root.go`

```go
package cmd

import (
	"fmt"
	"github.com/spf13/cobra"
	"os"
)

var rootCmd = &cobra.Command{
	// Usage中显示的命令名称
	Use: "kubectl",

	// 说明文字，显示在命令行帮助信息的最上面
	// 默认显示长文本Long，若没有定义则显示Short，若Short也没有定义则不显示
	Short: "Short kubectl controls the Kubernetes cluster manager",
	Long:  `Long kubectl controls the Kubernetes cluster manager`,

	// 根命令执行, 直接执行命令时做的操作
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("直接执行命令显示帮助信息:")
		if err := cmd.Usage(); err != nil {
			fmt.Println(err)
			os.Exit(1)
		}
	},
}

// 此函数一般只定义在 根命令中，作为外部调用的入口函数
func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
```

:::

输出结果

```bash
# 直接执行程序，对应根命令中的Run函数
C:\Users\Administrator\GolandProjects\demo>go run main.go
直接执行命令显示帮助信息:
Usage:
  kubectl [flags]
                               
Flags:
  -h, --help   help for kubectl
  
# 默认生成的帮助信息
C:\Users\Administrator\GolandProjects\demo>go run main.go --help
Long kubectl controls the Kubernetes cluster manager

Usage:
  kubectl [flags]

Flags:
  -h, --help   help for kubectl
```



#### 添加一个子命令（Command）

::: details 点击查看完整代码

`cmd/get.go`

```go
package cmd

import (
	"fmt"
	"github.com/spf13/cobra"
)

// 根命令中添加get子命令
func init() {
	rootCmd.AddCommand(getCmd)
}

// 定义get命令
var getCmd = &cobra.Command{
	Use:   "get", // get子命令
	Short: "Display one or many resources.",
	Long: `Display one or many resources.

 Prints a table of the most important information about the specified resources. You can filter the list using a label
selector and the --selector flag. If the desired resource type is namespaced you will only see results in your current
namespace unless you pass --all-namespaces.

 By specifying the output as 'template' and providing a Go template as the value of the --template flag, you can filter
the attributes of the fetched resources.

Use "kubectl api-resources" for a complete list of supported resources.`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("get command exec")
		fmt.Println("args: ", args)
	},
}
```

:::

输出结果

```bash
# 根命令帮助信息
C:\Users\Administrator\GolandProjects\demo>go run main.go -h 
Long kubectl controls the Kubernetes cluster manager

Usage:                                                                  
  kubectl [flags]                                                       
  kubectl [command]                                                     
                                                                        
Available Commands:                                                     
  completion  Generate the autocompletion script for the specified shell
  get         Display one or many resources.                            
  help        Help about any command                                    
                                                                        
Flags:                                                                  
  -h, --help   help for kubectl                                         

Use "kubectl [command] --help" for more information about a command.

# get命令执行
C:\Users\Administrator\GolandProjects\demo>go run main.go get   
get command exec
args: []

# get命令帮助信息-查看方式1
C:\Users\Administrator\GolandProjects\demo>go run main.go get --help
Display one or many resources.

 Prints a table of the most important information about the specified resources. You can filter the list using a label
selector and the --selector flag. If the desired resource type is namespaced you will only see results in your current
namespace unless you pass --all-namespaces.

 By specifying the output as 'template' and providing a Go template as the value of the --template flag, you can filter
the attributes of the fetched resources.

Use "kubectl api-resources" for a complete list of supported resources.

Usage:
  kubectl get [flags]

Flags:
  -h, --help   help for get

# get命令帮助信息-查看方式2
C:\Users\Administrator\GolandProjects\demo>go run main.go help get       
Display one or many resources.

 Prints a table of the most important information about the specified resources. You can filter the list using a label
selector and the --selector flag. If the desired resource type is namespaced you will only see results in your current
namespace unless you pass --all-namespaces.

 By specifying the output as 'template' and providing a Go template as the value of the --template flag, you can filter
the attributes of the fetched resources.

Use "kubectl api-resources" for a complete list of supported resources.

Usage:
  kubectl get [flags]

Flags:
  -h, --help   help for get
```

#### 添加一个选项（Flags）

::: details 点击查看完整代码

`cmd/get.go`

```go
package cmd

import (
	"fmt"
	"github.com/spf13/cobra"
)

// 定义选项
var output string

func init() {
	rootCmd.AddCommand(getCmd)

	// 添加选项
	getCmd.Flags().StringVarP(&output, "output", "o", "json", "Output format")
}

var getCmd = &cobra.Command{
	Use:   "get", // get子命令
	Short: "Display one or many resources.",
	Long: `Display one or many resources.

 Prints a table of the most important information about the specified resources. You can filter the list using a label
selector and the --selector flag. If the desired resource type is namespaced you will only see results in your current
namespace unless you pass --all-namespaces.

 By specifying the output as 'template' and providing a Go template as the value of the --template flag, you can filter
the attributes of the fetched resources.

Use "kubectl api-resources" for a complete list of supported resources.`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("get command exec")
		fmt.Println("args: ", args)
		// 获取选项的值
		fmt.Println("output: ", output)
	},
}
```

:::

输出结果

```bash
C:\Users\Administrator\GolandProjects\demo>go run main.go get -h
Display one or many resources.                                                                                         
                                                                                                                       
 Prints a table of the most important information about the specified resources. You can filter the list using a label 
selector and the --selector flag. If the desired resource type is namespaced you will only see results in your current 
namespace unless you pass --all-namespaces.                                                                            
                                                                                                                       
 By specifying the output as 'template' and providing a Go template as the value of the --template flag, you can filter
the attributes of the fetched resources.                                                                               
                                                                                                                       
Use "kubectl api-resources" for a complete list of supported resources.                                                

Usage:                                                
  kubectl get [flags]                                 
                                                      
Flags:                                                
  -h, --help            help for get                  
  -o, --output string   Output format (default "json")

C:\Users\Administrator\GolandProjects\demo>go run main.go get   
get command exec
args:  []    
output:  json

C:\Users\Administrator\GolandProjects\demo>go run main.go get -o wide
get command exec
args:  []    
output:  wide
```

#### 添加一个参数（Arg）

::: details 点击查看完整代码

`cmd/get.go`

```go
package cmd

import (
	"fmt"
	"github.com/spf13/cobra"
	"strings"
)

// 定义选项
var output string

func init() {
	rootCmd.AddCommand(getCmd)

	getCmd.Flags().StringVarP(&output, "output", "o", "json", "Output format")
}

var getCmd = &cobra.Command{
	Use:   "get", // get子命令
	Short: "Display one or many resources.",
	Long:  `Display one or many resources.`,

	// 添加参数预处理处理函数，可以用于参数校验(这个不是必须的)
	Args: func(cmd *cobra.Command, args []string) error {
		args[0] = strings.ToUpper(args[0]) // 转为大写
		return nil
	},

	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("get command exec")
		fmt.Println("args: ", args)
		// 获取选项的值
		fmt.Println("output: ", output)
	},
}
```

:::

输出结果

```bash
C:\Users\Administrator\GolandProjects\demo>go run main.go get abc123
get command exec
args:  [ABC123]
output:  json  
```

