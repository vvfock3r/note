# net

<br />

## 文档

文档：[https://pkg.go.dev/net](https://pkg.go.dev/net)

<br />

## TCP Server

### 1）基础示例

::: details （1）TCP Server

**（1）编写Go代码 `server/main.go`**

```go
package main

import (
	"bufio"
	"io"
	"log"
	"net"
)

// process 连接处理函数
func process(conn net.Conn, buffer []byte) {
	// 关闭连接
	defer conn.Close()

	// 读写数据
	reader := bufio.NewReader(conn)
	for {
		// 读取数据
		n, err := reader.Read(buffer[:])
		if err != nil {
			if err != io.EOF {
				log.Printf("read failed from client: %s\n", err)
			}
			break
		}
		recvStr := string(buffer[:n])
		log.Println("received message from client：", recvStr)

		// 写入数据
		if _, err := conn.Write([]byte(recvStr)); err != nil {
			log.Printf("send message failed to client: ", err)
			break
		}
	}
}

func main() {
	// 定义变量
	var (
		network = "tcp"
		address = "127.0.0.1:60000"
		buffer  = make([]byte, 4096)
	)

	// 监听端口
	listener, err := net.Listen(network, address)
	if err != nil {
		log.Fatalf("listen failed: %s\n", err)
	}
	log.Printf("listen at %s\n", listener.Addr().Network()+"://"+listener.Addr().String())

	// 处理请求
	for {
		// 等待连接
		conn, err := listener.Accept()
		if err != nil {
			log.Printf("accept failed: %s\n", err)
			continue
		}

		// 启动一个goroutine处理
		go process(conn, buffer)
	}
}
```

**（2）启动服务端**

```bash
D:\application\GoLand\example>go run server/main.go
2023/01/28 12:33:19 listen at tcp://127.0.0.1:60000
```

**（3）使用Socket调试工具进行测试，可根据实际情况选择一款自己喜欢的**

![image-20230128123232787](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230128123232787.png)

![image-20230128123447301](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230128123447301.png)

![image-20230128123534006](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230128123534006.png)

:::

::: details （2）TCP Client

```go
package main

import (
	"bufio"
	"fmt"
	"io"
	"log"
	"net"
	"os"
	"strings"
)

func main() {
	// 定义变量
	var (
		network = "tcp"
		address = "127.0.0.1:60000"
		buffer  = [4096]byte{}
	)

	// 建立连接
	conn, err := net.Dial(network, address)
	if err != nil {
		log.Printf("dial failed: %s: %s\n", network+"://"+address, err)
		return
	}
	defer conn.Close()

	// 读取用户输入并发送到服务端
	reader := bufio.NewReader(os.Stdin)
	for {
		// 修改一下终端提示符
		fmt.Printf(">>> ")

		// 读取用户输入, Ctrl+C会触发io.EOF
		input, err := reader.ReadString('\n')
		if err != nil {
			if err != io.EOF {
				log.Printf("read failed from input: %s\n", err)
			}
			break
		}

		// 删除回车符,支持Windows和Linux
		input = strings.TrimRight(input, "\r\n")

		// 如果什么也没输入直接按的回车则重新等待用户输入
		if input == "" {
			continue
		}

		// 如果输入q则退出
		if strings.ToLower(input) == "q" {
			break
		}

		// 发送数据到服务端
		if _, err = conn.Write([]byte(input)); err != nil {
			log.Printf("send message failed: %s\n", err)
			break
		}

		// 读取服务端响应的数据
		n, err := conn.Read(buffer[:])
		if err != nil {
			log.Printf("recv message failed: %s\n", err)
			break
		}

		// 输出服务端响应结果
		fmt.Println(string(buffer[:n]))
	}
}
```

输出结果

```bash
# 启动服务端
D:\application\GoLand\example>go run server/main.go
2023/01/28 11:56:26 listen at tcp://127.0.0.1:60000

# 启动客户端进行测试
D:\application\GoLand\example>go run client/main.go
>>> hello
hello
>>> world
world
```

:::

<br />

### 2）TCP 粘包



<br />

### 3）压力测试

<br />

### 4）数据加密

<br />

### 5）数据压缩

<br />

### 6）心跳机制

<br />