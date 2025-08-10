# os/exec

文档：[https://pkg.go.dev/os/exec](https://pkg.go.dev/os/exec)

<br />

## 基础示例

::: details 执行方式1：cmd.Run 同步执行

```go
package main

import (
	"fmt"
	"os"
	"os/exec"
)

func main() {
	// 实例化Command对象
	cmd := exec.Command("go", "version")

	// 设置Command输出
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	// 执行Shell命令
	if err := cmd.Run(); err != nil {
		panic(err)
	}

	// 执行其他代码
	fmt.Println("End")
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
go version go1.20.1 windows/amd64
End

# 分析
# 1、exec.Command传递的参数全部都是分离的, 比如
#    Shell命令         go tool dist list
#    Command正确的写法  cmd := exec.Command("go", "tool", "dist", "list")
#    Command错误的写法  cmd := exec.Command("go", "tool dist list")

# 2、查看cmd.Run方法，其实是调用了 Cmd.Start 和 Cmd.Wait
func (c *Cmd) Run() error {
	if err := c.Start(); err != nil {
		return err
	}
	return c.Wait()
}

# 3、所以可以猜测一下, cmd.Run()是同步的方法，函数执行完成后才能执行后面的代码
```

:::

::: details 执行方式2：cmd.Start 异步执行

```go
package main

import (
	"fmt"
	"os"
	"os/exec"
)

func main() {
	// 实例化Command对象
	cmd := exec.Command("go", "version")

	// 设置Command输出
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	// 执行Shell命令
	if err := cmd.Start(); err != nil {
		panic(err)
	}

	// 执行其他代码
	fmt.Println("End")

	// 等待Command命令执行完成
	if err := cmd.Wait(); err != nil {
		panic(err)
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
End
go version go1.20.1 windows/amd64
```

:::

::: details 执行方式3：cmd.Output 仅捕获stdout的输出

```go
package main

import (
	"fmt"
	"os/exec"
)

func main() {
	// 实例化Command对象
	cmd := exec.Command("go", "version")

	// 执行Shell命令
	output, err := cmd.Output()
	if err != nil {
		fmt.Printf("Error: %#v\n", err.Error())
	}
	fmt.Printf("Output: %s\n", string(output))

	// 执行其他代码
	fmt.Println("End")
}
```

输出结果

```bash
# 命令执行正确时的结果
D:\application\GoLand\example>go run main.go
Output: go version go1.20.1 windows/amd64

End

# 命令执行错误时的结果,比如 cmd := exec.Command("go", "version2")
D:\application\GoLand\example>go run main.go
Error: "exit status 2"
Output: 
End


# 分析
# 1、输出结果末尾会有换行符
# 2、Output()函数内部会设置Stdout,且不允许我们自己设置Stdout
# 3、Output()函数内部调用的Run()函数
# 4、若命令报错则output为空
```

:::

::: details 执行方式4：cmd.CombinedOutput 捕获stdout和stderr输出

```go
package main

import (
	"fmt"
	"os/exec"
)

func main() {
	// 实例化Command对象
	cmd := exec.Command("go", "version")

	// 执行Shell命令
	output, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Printf("Error: %#v\n", err.Error())
	}
	fmt.Printf("Output: %s\n", string(output))

	// 执行其他代码
	fmt.Println("End")
}
```

输出结果

```bash
# 命令执行正确时的结果
D:\application\GoLand\example>go run main.go
Output: go version go1.20.1 windows/amd64

End

# 命令执行错误时的结果,比如 cmd := exec.Command("go", "version2")
D:\application\GoLand\example>go run main.go
Error: "exit status 2"
Output: go version2: unknown command
Run 'go help' for usage.

End

# 分析
# 1、输出结果末尾会有换行符
# 2、CombinedOutput方法也会将错误信息放入到output中
```

:::

<br />

## 内建命令

::: details 点击查看详情

**内建命令和外部命令概念**

```bash
# 内建命令和外部命令的概念
#   内建命令：没有独立的二进制文件,但是可以正常执行，命令所对应的代码被编译到Shell中，比如bash
#   外部命令：有独立的二进制文件，并且可以在$PATH变量中找到，可以正常执行
# 注意：有一些命令既是内建命令，外部又有独立的二进制文件,比如 pwd

# 1、说明一下我们所用的Shell是bash
[root@ap-hongkang ~]# echo $SHELL
/bin/bash

# 2、如何判断一个命令是内建命令还是外部命令：能直接执行但是which时提示找不到二进制文件，那么一般情况下我们可以认为是内建命令
[root@ap-hongkang ~]# history 1
 3008  2023-02-25 20:56:45 history 1
[root@ap-hongkang ~]# which history
/usr/bin/which: no history in (/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/usr/local/go/root/bin:/usr/local/go/path/bin:/usr/local/go/root/bin:/usr/local/go/path/bin:/root/bin)
[root@ap-hongkang ~]# type history
history is a shell builtin
```

**Go执行内建命令**

```go
package main

import (
	"flag"
	"fmt"
	"os"
	"os/exec"
	"runtime"
)

func main() {
	// 说明
	// 1、Linux使用的是pwd命令,它既是内建命令又是外部命令
	//    # type pwd ==> pwd is a shell builtin
	//    # which pwd ==> /usr/bin/pwd
	// 2、Linux为了能够有效测试，把外部的pwd命令干掉,然后测试一下还可以正常运行
	//    # mv /usr/bin/pwd /usr/bin/pwd2
	//    # pwd
	//    /root
	// 3、Windows的cd命令相当于Linux的pwd
	// 4、为了能够不用修改代码测试多种情况，我们加了一个选项 -shell,表示在默认的Shell中执行命令
	//    这样就能够享受到Shell内建命令的福利
    // 5、Windows下使用 cmd /? 查看cmd命令的帮助文档

	// 定义命令行参数
	shell := flag.Bool("shell", false, "Execute commands in the default shell")
	flag.Parse()

	// 实例化Command对象
	var cmd *exec.Cmd

	switch runtime.GOOS {
	case "linux":
		if *shell {
			cmd = exec.Command("sh", "-c", "pwd") // 正确写法
		} else {
			cmd = exec.Command("pwd") // 错误写法
		}
	case "windows":
		if *shell {
			cmd = exec.Command("cmd", "/C", "cd") // 正确写法
		} else {
			cmd = exec.Command("cd") // 错误写法
		}
	default:
		fmt.Printf("Unsupported OS: %s\n", runtime.GOOS)
		os.Exit(1)
	}

	// 执行Shell命令
	output, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Printf("Error: %#v\n", err.Error())
	}
	fmt.Printf("Output: %s\n", string(output))
}
```

输出结果

```bash
# 查看帮助
D:\application\GoLand\example>go run main.go -h
Usage of C:\Users\Administrator\AppData\Local\Temp\go-build2084943688\b001\exe\main.exe:
  -shell                                     
        Execute commands in the default shell

# --------------------------------------------------------------------------------------------

# Windows: 直接执行cd命令报错了, 因为cd是CMD的内建命令
D:\application\GoLand\example>go run main.go
Error: "exec: \"cd\": executable file not found in %PATH%"
Output:

# Windows: 在CMD中执行cd命令
D:\application\GoLand\example>go run main.go -shell
Output: D:\application\GoLand\example

# --------------------------------------------------------------------------------------------

# Linux pwd既是内建命令又是外键命令，需要把外部的pwd命令干掉
mv /usr/bin/pwd /usr/bin/pwd2

# Linux：直接执行pwd命令报错了
[root@ap-hongkang ~]# go run main.go
Error: "exec: \"pwd\": executable file not found in $PATH"
Output: 

# Linux：在Shell中执行pwd
[root@ap-hongkang ~]# go run main.go -shell
Output: /root

# 测试完成, 恢复pwd命令
mv /usr/bin/pwd2 /usr/bin/pwd

# --------------------------------------------------------------------------------------------

# 总结
# 推荐使用兼容内建命令的写法,我们能享受到的部分福利如下：
# 1、可以执行内建命令
# 2、命令可以连在一起写: cmd = exec.Command("sh", "-c", "ls -l /var/log/*.log") // 正确写法
# 3、支持通配符，参考命令如上
# 4、终端其他的特性，比如管道
```

:::

<br />

## 环境变量

::: details （1）新增一个不存在的环境变量

```go
package main

import (
	"fmt"
	"os"
	"os/exec"
)

func main() {
	// 实例化Command对象
	cmd := exec.Command("sh", "-c", "echo $MyKey")

	// 说明
	// 设置环境变量,格式为 key=value
	// 如果Env为空则使用前进程的环境
	// 如果新增环境变量的话不要直接覆盖Env变量，会有很大的问题，而是应该采用追加的方式
	cmd.Env = append(os.Environ(), "MyKey=MyValue")

	// 执行Shell命令
	output, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Printf("Error: %#v\n", err.Error())
	}
	fmt.Printf("Output: %s\n", string(output))
}
```

输出结果

```bash
[root@ap-hongkang ~]# go run main.go
Output: MyValue
```

:::

::: details （2）新增一个已存在的环境变量

```go
package main

import (
	"fmt"
	"os"
	"os/exec"
	"strings"
)

func main() {
	// 实例化Command对象
	cmd := exec.Command("sh", "-c", "ls -lh && echo $PATH")

	// 错误的写法，这会覆盖PATH原来的值
	//cmd.Env = append(os.Environ(), "PATH=/tmp")

	// 正确的写法
	// 1.先获取当前PATH变量
	// 2.组合出新PATH变量
	// 3.将新PATH加入到环境变量中
	// 注意此时变量中会有两个PATH变量,cmd.Env运行重复的key,会使用最后一个key,所以对我们并没有影响
	var oldPath = strings.TrimSpace(os.Getenv("PATH"))
	var newPath = strings.Join([]string{oldPath, "/tmp"}, string(os.PathListSeparator))
	cmd.Env = append(os.Environ(), "PATH="+newPath)

	// 执行Shell命令
	output, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Printf("Error: %#v\n", err.Error())
	}
	fmt.Printf("Output: %s\n", string(output))
}
```

输出结果

```bash
# 错误的
[root@ap-hongkang ~]# go run main.go
Error: "exit status 127"
Output: sh: ls: command not found

# 正确的
[root@ap-hongkang ~]# go run main.go
Output: total 4.0K
-rw-r--r-- 1 root root 651 Feb 26 13:32 main.go
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/usr/local/go/root/bin:/usr/local/go/path/bin:/usr/local/go/root/bin:/usr/local/go/path/bin:/root/bin:/tmp
```

:::

<br />

## 工作目录

::: details 点击查看详情

```go
package main

import (
	"flag"
	"fmt"
	"os/exec"
)

func main() {
	// 定义选项
	var dir = flag.String("dir", "", "work dir")
	flag.Parse()

	// 实例化Command对象
	cmd := exec.Command("sh", "-c", "pwd")

	// 设置工作目录
	cmd.Dir = *dir

	// 执行Shell命令
	output, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Printf("Error: %#v\n", err.Error())
	}
	fmt.Printf("Output: %s\n", string(output))
}
```

输出结果

```bash
# 默认会在当前目录下执行，这里是/root目录
[root@ap-hongkang ~]# go run main.go 
Output: /root

# 切换到/tmp目录
[root@ap-hongkang ~]# go run main.go -dir /tmp
Output: /tmp

# 当进入到一个不存在的目录时会报错
[root@ap-hongkang ~]# go run main.go -dir /abc
Error: "chdir /abc: no such file or directory"
Output: 
```

:::

<br />

## 命令预检

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"os/exec"
)

func main() {
	// 有时候执行一个外部命令的时候需要先检查它是否存在,此时LookPath就很好用
	// 如果传入参数包含路径分隔符，那么它会基于Cmd.Dir的相对路径或者绝对路径查找这个程序
	//如果不包含路径分隔符，那么会从PATH环境变量中查找文件
	for _, command := range []string{"echo", "sed", "awk", "jq", "yq", "cfssl", "kubectl"} {
		path, err := exec.LookPath(command)
		if err != nil {
			fmt.Printf("%-20s not found\n", command)
		} else {
			fmt.Printf("%-20s %s\n", command, path)
		}
	}
}
```

输出结果

```bash
# Windows
D:\application\GoLand\example>go run main.go
echo                 not found
sed                  not found
awk                  not found
jq                   not found
yq                   D:\tools\yq.exe
cfssl                D:\tools\cfssl\cfssl.exe
kubectl              D:\tools\kubectl.exe

# Linux
[root@ap-hongkang ~]# go run main.go 
echo                 /usr/bin/echo
sed                  /usr/bin/sed
awk                  /usr/bin/awk
jq                   /usr/bin/jq
yq                   not found
cfssl                /usr/local/bin/cfssl
kubectl              /usr/bin/kubectl
```

:::

<br />

## 超时设置

::: details （1）关于是否产生新的shell进程的说明

```bash
# 关于是否产生新进程的问题
# 说明：通过pstree -p | grep -C 5 xxx可以查看进程的父子关系

# /root/sleep.sh            产生一个新的sh进程,并在里面执行脚本
# ./sleep.sh                产生一个新的sh进程,并在里面执行脚本
# bash /root/sleep.sh       产生一个新的sh进程,并在里面执行脚本
# . /root/sleep.sh          在当前sh中执行脚本
# source /root/sleep.sh     在当前sh中执行脚本

# bash -c 方式有可能会产生新bash进程，也有可能在当前bash中执行，取决于运行的命令是什么
# bash -c "sleep 120"       对于单条命令会在当前sh中执行脚本
# bash -c "source sleep.sh" 对于多条命令,会产生一个新的sh进程,并在里面执行脚本
```

:::

::: details （2）使用CommandContext设置超时：测试子进程完美，测试孙子进程发现问题

`test.sh`

```bash
#!/usr/bin/env bash

sleep 300
```

`main.go`

```go
package main

import (
	"context"
	"flag"
	"log"
	"os/exec"
	"time"
)

func main() {
	// 定义命令行参数
	newproc := flag.Bool("newproc", false, "Start command in new process")
	flag.Parse()

	//设置context
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	// 实例化CommandContext对象
	var cmd *exec.Cmd
	if *newproc {
		cmd = exec.CommandContext(ctx, "sh", "-c", "bash test.sh")
	} else {
		cmd = exec.CommandContext(ctx, "sh", "-c", "sleep 300")
	}

	// 执行Shell命令
	log.Printf("Start")
	output, err := cmd.CombinedOutput()
	if err != nil {
		log.Printf("Error: %#v\n", err.Error())
	}
	log.Printf("Output: %s\n", string(output))

	// 模拟常驻内存的程序
	log.Println("Cmd run complete")
	time.Sleep(time.Hour)
}
```

测试执行子进程

```bash
# 先确认一下当前系统没有启动sleep进程
[root@ap-hongkang ~]# pstree -p | grep -C 5 sleep

# 执行程序,默认以子进程的方式运行外部命令
[root@ap-hongkang example]# go run main.go
2023/02/26 16:16:45 Start
2023/02/26 16:16:50 Error: "signal: killed"
2023/02/26 16:16:50 Output: 
2023/02/26 16:16:50 Cmd run complete

# ctx超时时间内查看一下进程树
[root@ap-hongkang ~]# pstree -p | grep -C 5 sleep
           |              |-{polkitd}(903)
           |              `-{polkitd}(931)
           |-rsyslogd(1114)-+-{rsyslogd}(1128)
           |                `-{rsyslogd}(1287)
           |-sgagent(2205)---{sgagent}(2206)
           |-sshd(5831)-+-sshd(3061036)---sshd(3061049)-+-bash(3061804)---go(3132241)-+-main(3132276)-+-sleep(3132282)
           |            |                               |                             |               |-{main}(3132278)
           |            |                               |                             |               |-{main}(3132279)
           |            |                               |                             |               |-{main}(3132280)
           |            |                               |                             |               `-{main}(3132281)
           |            |                               |                             |-{go}(3132242)

# ctx超时以后再查看一下子进程是否存在
[root@ap-hongkang ~]# pstree -p | grep -C 5 sleep

# 总结：很完美
```

测试执行孙子进程

```bash
# 先确认一下当前系统没有启动sleep进程
[root@ap-hongkang ~]# pstree -p | grep -C 5 sleep

# 执行程序,这会新开一个sh进程，然后再执行具体的命令
[root@ap-hongkang example]# go run main.go -newproc
2023/02/26 16:19:06 Start

# ctx超时时间内查看进程树
[root@ap-hongkang ~]# pstree -p | grep -C 5 sleep
           |              |-{polkitd}(903)
           |              `-{polkitd}(931)
           |-rsyslogd(1114)-+-{rsyslogd}(1128)
           |                `-{rsyslogd}(1287)
           |-sgagent(2205)---{sgagent}(2206)
           |-sshd(5831)-+-sshd(3061036)---sshd(3061049)-+-bash(3061804)---go(3132641)-+-main(3132674)-+-bash(3132678)---sleep(31326+
           |            |                               |                             |               |-{main}(3132675)
           |            |                               |                             |               |-{main}(3132676)
           |            |                               |                             |               `-{main}(3132677)
           |            |                               |                             |-{go}(3132642)
           |            |                               |                             |-{go}(3132643)

# ctx超时时间后查看进程树,sleep进程已经脱离父进程
[root@ap-hongkang ~]# pstree -p | grep -C 5 sleep
           |              |-{polkitd}(903)
           |              `-{polkitd}(931)
           |-rsyslogd(1114)-+-{rsyslogd}(1128)
           |                `-{rsyslogd}(1287)
           |-sgagent(2205)---{sgagent}(2206)
           |-sleep(3132679)
           |-sshd(5831)-+-sshd(3061036)---sshd(3061049)-+-bash(3061804)---go(3132641)-+-main(3132674)-+-{main}(3132675)
           |            |                               |                             |               |-{main}(3132676)
           |            |                               |                             |               `-{main}(3132677)
           |            |                               |                             |-{go}(3132642)
           |            |                               |                             |-{go}(3132643)

# 此时我们的代码也并没有向下执行(没有输出后面的日志)，而像是卡住了一样

# 问题总结：
# 1、孙子进程并没有被超时机制所杀死
# 2、父进程会卡住，并不会继续向下执行代码
```

:::

::: details （3）使用CommandContext设置超时：修复孙子进程问题，仅支持Linux

`test.sh`

```bash
#!/usr/bin/env bash

sleep 300
```

`main.go`

```go
package main

import (
	"context"
	"flag"
	"log"
	"os/exec"
	"syscall"
	"time"
)

func main() {
	// 定义命令行参数
	newproc := flag.Bool("newproc", false, "Start command in new process")
	flag.Parse()

	//设置context
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	// 实例化CommandContext对象
	var cmd *exec.Cmd
	if *newproc {
		cmd = exec.CommandContext(ctx, "sh", "-c", "bash test.sh")
	} else {
		cmd = exec.CommandContext(ctx, "sh", "-c", "sleep 300")
	}

	// 设置Cmd.WaitDelay,用于ctx超时后,我们的程序可以正常往下执行
	cmd.WaitDelay = time.Duration(-1)

	//杀掉孙子进程方式(1/2): 创建一个新的进程组
	cmd.SysProcAttr = &syscall.SysProcAttr{Setpgid: true}
	cmd.Cancel = func() error {
		// 杀掉孙子进程方式(2/2): 向进程组发送Kill信号
		_ = syscall.Kill(-cmd.Process.Pid, syscall.SIGKILL)
		return cmd.Process.Kill()
	}

	// 执行Shell命令
	log.Printf("Start")
	output, err := cmd.CombinedOutput()
	if err != nil {
		log.Printf("Error: %#v\n", err.Error())
	}
	log.Printf("Output: %s\n", string(output))

	// 模拟常驻内存的程序
	log.Println("Cmd run complete")
	time.Sleep(time.Hour)
}
```

输出结果

```bash
# 先确认一下当前系统没有启动sleep进程
[root@ap-hongkang ~]# pstree -p | grep -C 5 sleep

# 启动程序
[root@ap-hongkang example]# go run main.go -newproc
2023/02/26 17:05:43 Start
2023/02/26 17:05:48 Error: "signal: killed"
2023/02/26 17:05:48 Output: 
2023/02/26 17:05:48 Cmd run complete

# ctx超时后再检查一下孙子进程，发现已经被干掉了
[root@ap-hongkang ~]# pstree -p | grep -C 5 sleep
```

:::

<br />

## 乱码问题

参考：[https://jinhui.dev/go/modules/x-text.html](https://jinhui.dev/go/modules/x-text.html)

<br />

## 交互执行

::: details （1）交互式执行

```go
package main

import (
	"os"
	"os/exec"
)

func main() {
	cmd := exec.Command("python3")

	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Run(); err != nil {
		panic(err)
	}
}
```

输出结果

```bash
Python 3.6.8 (default, Nov 16 2020, 16:55:22) 
[GCC 4.8.5 20150623 (Red Hat 4.8.5-44)] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import sys           # 手动输入交互式命令
>>> sys.version_info     # 手动输入交互式命令
sys.version_info(major=3, minor=6, micro=8, releaselevel='final', serial=0)
>>>

# 说明
# 核心代码主要是下面三行
# cmd.Stdin = os.Stdin
# cmd.Stdout = os.Stdout
# cmd.Stderr = os.Stderr
```

:::

::: details （2）将交互式转为非交互式执行

```go
package main

import (
	"bytes"
	"fmt"
	"os"
	"os/exec"
)

func InteractiveCommand(command string, args ...string) (stdout, stderr string, err error) {
	// 构建Command对象
	cmd := exec.Command(command)

	// 创建一个管道, 在w中写入数据,从r可以读出数据
	r, w, err := os.Pipe()
	if err != nil {
		return
	}
	cmd.Stdin = r // w中写入，可以直接写入到cmd.stdin

	// 捕获命令输出结果
	var stdoutBuf bytes.Buffer
	var stderrBuf bytes.Buffer
	cmd.Stdout = &stdoutBuf
	cmd.Stderr = &stderrBuf

	// 异步执行
	err = cmd.Start()
	if err != nil {
		return
	}

	// 输入参数
	for _, arg := range args {
		_, err = w.WriteString(arg)
		if err != nil {
			return
		}
	}

	// 关闭输入
	err = w.Close()
	if err != nil {
		return
	}

	// 如果在执行过程中有错误，这里会报错
	err = cmd.Wait()

	return stdoutBuf.String(), stderrBuf.String(), err
}

func main() {
	stdout, stderr, err := InteractiveCommand(
		"python3",
		"import sys\n",
		"print(sys.version_info)",
	)

	fmt.Printf("error:\n%#v\n\n", err)
	fmt.Printf("stdout:\n%s\n\n", stdout)
	fmt.Printf("stderr:\n%s\n", stderr)
}
```

输出结果

```bash
# 正常情况下输出结果
error:
<nil>

stdout:
sys.version_info(major=3, minor=6, micro=8, releaselevel='final', serial=0)


stderr:

# 当有错误时输出结果，比如我故意写成 print(sys.version_info2)
error:
&exec.ExitError{ProcessState:(*os.ProcessState)(0xc0000aa0a8), Stderr:[]uint8(nil)}

stdout:


stderr:
Traceback (most recent call last):
  File "<stdin>", line 2, in <module>
AttributeError: module 'sys' has no attribute 'version_info2'
```

:::

::: details （3）在交互式中执行命令后，并保持在交互式状态（未解决）

以下代码是最原始的，需要修改

```go
package main

import (
	"os"
	"os/exec"
)

func main() {
	cmd := exec.Command("sh")

	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Run(); err != nil {
		panic(err)
	}
}
```

输出结果

```bash
# 我要达到的效果如下描述

sh-4.2# hostname         # 这是通过程序执行的命令
localhost.localdomain    # 这是输出
sh-4.2#                  # 保持在原本命令的交互状态中
```

:::
