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

**（4）使用telnet工具测试**

```bash
# telnet测试
C:\Users\Administrator> telnet 127.0.0.1 60000
aabb112233

# 服务端日志
D:\application\GoLand\example>go run server/main.go
2023/01/28 12:57:24 listen at tcp://127.0.0.1:60000
2023/01/28 13:02:17 received message from client： a
2023/01/28 13:02:25 received message from client： b
2023/01/28 13:02:26 received message from client： c
2023/01/28 13:02:27 received message from client： 1
2023/01/28 13:02:28 received message from client： 2
2023/01/28 13:02:28 received message from client： 3
```

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

### 2）字节序

字节序，顾名思义就是字节的顺序。举个例子，`0x1234`使用两个字节储存，高位是`0x12`，低位是`0x34`

<br />

根据字节存储顺序可以分为：

* 小端字节序（`Little endinan`）
  * 低位字节在前，高位字节在后，比如`0x3412`
* 大端字节序（`Big endian`）
  * 高位字节在前，低位字节在后，符合人类读写数值的方式，比如`0x1234`

<br />

根据字节所处的位置可以分为：

* 主机字节序：CPU存储时采用的字节顺序，不同的CPU设计时采用的字节序是不同的。Intel与AMD CPU，一般都是Little endian
* 网络字节序：网络传输时采用的字节顺序，TCP/IP协议规定以大端字节序传输

主机字节序和网络字节序的转换关系：

* 主机发送数据到网络上，必须将主机字节序转换到网络字节序

* 主机从网络中接收数据，必须将网络字节序转换为主机字节序
* 如果主机字节序和网络字节序相同，那么转换函数就什么都不做

<br />

::: details （1）检查本地主机的字节序

1、通过Shell命令检查

```bash
[root@ap-hongkang ~]# lscpu | grep 'Byte Order' | awk -F: '{print $2}'
          Little Endian
```

2、编写Go代码检查

```go
package main

import (
	"fmt"
	"unsafe"
)

// IsLittleEndian 是否是小端字节序
func IsLittleEndian() bool {
	n := 0x1234
	return *(*byte)(unsafe.Pointer(&n)) == 0x34
}

func main() {
	fmt.Println(IsLittleEndian())
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
true
```

:::

::: details （2）大小端字节序转换

```go
package main

import (
	"encoding/binary"
	"fmt"
)

func main() {
	// 定义变量
	v := 0x1234
	b := make([]byte, 2)
	l := make([]byte, 2)

	// 转为大端存储
	binary.BigEndian.PutUint16(b, uint16(v))
	fmt.Printf("大端存储: %#v\n", b)

	// 转为小端存储
	binary.LittleEndian.PutUint16(l, uint16(v))
	fmt.Printf("小端存储: %#v\n", l)

	// 根据字节序的不同使用不同的方法转为uint类型
	fmt.Println(binary.BigEndian.Uint16(b))
	fmt.Println(binary.LittleEndian.Uint16(l))

	// 如果使用错误的方法
	fmt.Println(binary.BigEndian.Uint16(l))
	fmt.Println(binary.LittleEndian.Uint16(b))
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
大端存储: []byte{0x12, 0x34}
小端存储: []byte{0x34, 0x12}
4660
4660
13330
13330
```

:::

<br />

### 3）TCP 粘包

::: details （1）问题复现及原因

**（1）自己写代码测试，多个Goroutine同时发送数据**

`client/main.go`

```go
package main

import (
	"fmt"
	"log"
	"net"
	"sync"
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

	// 发送数据到服务端
	var wg sync.WaitGroup
	for i := 0; i < 100; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			// 发送数据到服务端
			if _, err = conn.Write([]byte("0123456789")); err != nil {
				log.Printf("send message failed: %s\n", err)
				return
			}

			// 读取服务端响应的数据
			n, err := conn.Read(buffer[:])
			if err != nil {
				log.Printf("recv message failed: %s\n", err)
				return
			}

			// 输出服务端响应结果
			fmt.Println(string(buffer[:n]))
		}()
	}

	wg.Wait()
}
```

输出结果

```bash
# 客户端
D:\application\GoLand\example>go run client/main.go
0123456789
01234567890123456789012345678901234567890123456789
0123456789
012345678901234567890123456789
0123456789

# 服务端日志
D:\application\GoLand\example>go run server/main.go
2023/01/28 13:13:13 listen at tcp://127.0.0.1:60000
2023/01/28 13:14:38 received message from client： 0123456789
2023/01/28 13:14:38 received message from client： 01234567890123456789012345678901234567890123456789
2023/01/28 13:14:38 received message from client： 0123456789                                        
2023/01/28 13:14:38 received message from client： 012345678901234567890123456789                    
2023/01/28 13:14:38 received message from client： 0123456789                                        
2023/01/28 13:14:38 received message from client： 0123456789                                        
2023/01/28 13:14:38 received message from client： 01234567890123456789                              
2023/01/28 13:14:38 received message from client： 012345678901234567890123456789
```

**（2）使用Socket调试工具测试**

![image-20230128131657646](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230128131657646.png)

**（3）粘包的原因和解决办法**

* 原因：
  * 根本原因在于接收方不确定将要传输的数据包的大小。
  * 接收方conn.Read会读取一个固定大小的字节数，不能确定读取多少字节为一个完整的数据
* 解决办法
  * 1、每条完整的数据后面加一个分隔符，接收方按照分隔符读取。但如果数据本身就包含分隔符，这就会有问题
  * 2、每条数据进行封装，加上固定长度的包头信息，里面存储了实际数据的长度

:::

::: details （2）服务端封包

```go
package main

import (
	"bufio"
	"bytes"
	"encoding/binary"
	"log"
	"net"
)

// process 连接处理函数
func process(conn net.Conn) {
	// 关闭连接
	defer conn.Close()

	// 读写数据
	reader := bufio.NewReader(conn)
	for {
		// 读取消息头，获取消息体长度
		head, err := reader.Peek(4)
		if err != nil {
			break
		}
		b := bytes.NewBuffer(head)

		var length int32
		err = binary.Read(b, binary.BigEndian, &length)
		if err != nil {
			break
		}

		// Buffered返回缓冲中现有的可读取的字节数
		if int32(reader.Buffered()) < length+4 {
			break
		}

		// 读取真正的消息数据
		pack := make([]byte, int(4+length))
		_, err = reader.Read(pack)
		if err != nil {
			break
		}
		recvStr := string(pack[4:])
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
		go process(conn)
	}
}
```

:::

::: details （3）客户端封包

```go
package main

import (
	"bytes"
	"encoding/binary"
	"fmt"
	"log"
	"net"
	"sync"
)

func Encode(message string) ([]byte, error) {
	var length = int32(len(message))

	var pkg = new(bytes.Buffer)
	err := binary.Write(pkg, binary.BigEndian, length)
	if err != nil {
		return nil, err
	}

	err = binary.Write(pkg, binary.BigEndian, []byte(message))
	if err != nil {
		return nil, err
	}

	return pkg.Bytes(), nil
}

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

	// 发送数据到服务端
	var wg sync.WaitGroup
	for i := 0; i < 100; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			// 发送数据到服务端
			b, err := Encode("0123456789")
			if err != nil {
				return
			}
			if _, err = conn.Write(b); err != nil {
				log.Printf("send message failed: %s\n", err)
				return
			}

			// 读取服务端响应的数据
			n, err := conn.Read(buffer[:])
			if err != nil {
				log.Printf("recv message failed: %s\n", err)
				return
			}

			// 输出服务端响应结果
			fmt.Println(string(buffer[:n]))
		}()
	}

	wg.Wait()
}
```

:::

<br />

### 4）压力测试

<br />

### 5）数据加密

<br />

### 6）数据压缩

<br />

### 7）心跳机制

<br />