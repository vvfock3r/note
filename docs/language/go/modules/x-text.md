# x/text

文档：[https://pkg.go.dev/golang.org/x/text](https://pkg.go.dev/golang.org/x/text)

<br />

## 安装模块

```bash
D:\application\GoLand\example>go get golang.org/x/text
go: added golang.org/x/text v0.7.0
```

<br />

## 修复中文乱码

::: details （1）准备环境：faker命令

```bash
# 安装Python库,用于生成假数据
D:\application\GoLand\example>python -m pip install faker

# 测试一下，输出正常
D:\application\GoLand\example>faker -l zh_CN address
安徽省大冶市山亭明路m座 582339

# Linux上同样也安装faker命令
```

:::

::: details （2）Go调用faker命令

```go
package main

import (
	"fmt"
	"os/exec"
	"runtime"
)

func main() {
	// 实例化Command对象
	var cmd *exec.Cmd
	switch runtime.GOOS {
	case "windows":
		cmd = exec.Command("cmd", "/C", "faker -l zh_CN address")
	default:
		cmd = exec.Command("sh", "-c", "faker -l zh_CN address")
	}

	// 执行Shell命令
	output, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Printf("Error: %#v\n", err.Error())
	}

	// 输出结果
	fmt.Printf("%s", string(output))
}
```

输出结果

```bash
# Windows CMD下乱码
D:\application\GoLand\example>go run main.go
�ӱ�ʡ���������سǶ���·i�� 450091

# Linux显示正常
[root@ap-hongkang example]# go run main.go
黑龙江省哈尔滨县长寿汕尾街e座 344730
```

:::

::: details （3）使用x/text进行编码转换

```go
package main

import (
	"fmt"
	"os/exec"
	"runtime"
	"strings"
	"unicode/utf8"

	"golang.org/x/text/encoding/simplifiedchinese"
)

func main() {
	// 实例化Command对象
	var cmd *exec.Cmd
	switch runtime.GOOS {
	case "windows":
		cmd = exec.Command("cmd", "/C", "faker -l zh_CN address")
	default:
		cmd = exec.Command("sh", "-c", "faker -l zh_CN address")
	}

	// 执行Shell命令
	output, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Printf("Error: %#v\n", err.Error())
	}

	// 编码转换，转为UTF-8编码
	// 1、用于解决Windows乱码问题
	// 2、Linux不需要执行此操作

	// 方式1
	//switch runtime.GOOS {
	//case "windows":
	//	output, err = simplifiedchinese.GB18030.NewDecoder().Bytes(output)
	//}

	// 方式2 - 推荐
	if !utf8.Valid(output) {
		output, err = simplifiedchinese.GB18030.NewDecoder().Bytes(output)
	}

	// 输出结果,并删除一下行末的空白
	fmt.Printf("%#v\n", strings.TrimSpace(string(output)))
}
```

输出结果

```bash
# Windows CMD下输出正常
D:\application\GoLand\example>go run main.go
"广东省拉萨县沈北新苏街c座 403711"

# Linux显示正常
[root@ap-hongkang example]# go run main.go
"安徽省上海县双滦刘路r座 617719"
```

:::