# pty

Github：[https://github.com/creack/pty](https://github.com/creack/pty)

文档：[https://pkg.go.dev/github.com/creack/pty](https://pkg.go.dev/github.com/creack/pty)

<br />

## 安装

```bash
# 注意：该库不支持Windows
go get github.com/creack/pty
```

<br />

## 示例

::: details 点击查看详情

```go
package main

import (
	"io"
	"os"
	"os/exec"

	"github.com/creack/pty"
)

func main() {
	// 实例化一个Cmd
	cmd := exec.Command("grep", "--color=auto", "bar")

	// 创建一个伪终端会话, 可以对它读取和写入数据, 返回值类型是 *os.File
	ptmx, err := pty.Start(cmd)
	if err != nil {
		panic(err)
	}

	// 启动一个协程, 向伪终端写入数据
	go func() {
		_, err = ptmx.Write([]byte("foo\n"))
		if err != nil {
			panic(err)
		}
		_, err = ptmx.Write([]byte("bar\n"))
		if err != nil {
			panic(err)
		}
		_, err = ptmx.Write([]byte("baz\n"))
		if err != nil {
			panic(err)
		}
		_, err = ptmx.Write([]byte{4}) // EOT
		if err != nil {
			panic(err)
		}
	}()

	// 这里会报错, 不知道为什么?
	// 将伪终端的输出写入到os.Stdout中, 这将会将 grep 命令的输出打印到终端屏幕上
	_, err = io.Copy(os.Stdout, ptmx)
	if err != nil {
		panic(err)
	}
}
```

输出结果

:::
