# net

<br />

## 文档

文档：[https://pkg.go.dev/net](https://pkg.go.dev/net)

<br />

## TCP Server

### 1）基础示例

::: details （1）TCP Server

`server/main.go`

```go
package main

import (
	"io"
	"log"
	"net"
)

// process 连接处理函数
func process(conn net.Conn) {
	// 关闭连接
	defer conn.Close()

	// 读写数据
	buffer := make([]byte, 1024)
	for {
		// 读取数据
		n, err := conn.Read(buffer[:])
		if err != nil {
			if err == io.EOF {
				log.Printf("connection broken from %s\n", conn.RemoteAddr().String())
			} else {
				log.Printf("read failed: %s\n", err)
			}
			break
		}
		recv := string(buffer[:n])
		log.Printf("read message：%s\n", recv)

		// 原样写入数据
		if _, err := conn.Write([]byte(recv)); err != nil {
			log.Printf("send message failed: %s\n", err)
			break
		}
		log.Printf("send message: %s\n", recv)
	}
}

func main() {
	// 监听端口
	listener, err := net.Listen("tcp", "127.0.0.1:60000")
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
		log.Printf("connection established from %s\n", conn.RemoteAddr().String())

		// 启动一个goroutine处理
		go process(conn)
	}
}
```

:::

::: details （2）TCP Client

`client/main.go`

```go
package main

import (
	"fmt"
	"log"
	"net"
	"strconv"
)

func main() {
	// 定义变量
	var (
		network = "tcp"
		address = "127.0.0.1:60000"
	)

	// 建立连接
	conn, err := net.Dial(network, address)
	if err != nil {
		log.Fatalf("dial failed: %s: %s\n", network+"://"+address, err)
	}
	defer conn.Close()

	// 数据处理
	buffer := make([]byte, 1024)
	for i := 0; i < 10; i++ {
		// 发送数据到服务端
		message := fmt.Sprintf("%-3s Hello World!", strconv.Itoa(i+1))
		if _, err = conn.Write([]byte(message)); err != nil {
			log.Printf("send message failed: %s\n", err)
			break
		}

		// 读取服务端响应的数据
		n, err := conn.Read(buffer[:])
		if err != nil {
			log.Printf("read message failed: %s\n", err)
			break
		}

		// 输出服务端响应结果
		fmt.Printf("%s\n", string(buffer[:n]))
	}
}
```

:::

::: details （3）测试

```bash
# 启动服务端
D:\application\GoLand\example>go run server/main.go
2023/01/29 14:30:43 listen at tcp://127.0.0.1:60000

# 启动客户端
D:\application\GoLand\example>go run client/main.go
1   Hello World!
2   Hello World!
3   Hello World!
4   Hello World!
5   Hello World!
6   Hello World!
7   Hello World!
8   Hello World!
9   Hello World!
10  Hello World!

# 查看服务端日志
D:\application\GoLand\example>go run server/main.go
2023/01/29 14:30:43 listen at tcp://127.0.0.1:60000
2023/01/29 14:31:06 connection established from 127.0.0.1:55745
2023/01/29 14:31:06 read message：1   Hello World!
2023/01/29 14:31:06 send message: 1   Hello World!
2023/01/29 14:31:06 read message：2   Hello World!
2023/01/29 14:31:06 send message: 2   Hello World!
2023/01/29 14:31:06 read message：3   Hello World!
2023/01/29 14:31:06 send message: 3   Hello World!
2023/01/29 14:31:06 read message：4   Hello World!
2023/01/29 14:31:06 send message: 4   Hello World!
2023/01/29 14:31:06 read message：5   Hello World!
2023/01/29 14:31:06 send message: 5   Hello World!
2023/01/29 14:31:06 read message：6   Hello World!
2023/01/29 14:31:06 send message: 6   Hello World!
2023/01/29 14:31:06 read message：7   Hello World!
2023/01/29 14:31:06 send message: 7   Hello World!
2023/01/29 14:31:06 read message：8   Hello World!
2023/01/29 14:31:06 send message: 8   Hello World!
2023/01/29 14:31:06 read message：9   Hello World!
2023/01/29 14:31:06 send message: 9   Hello World!
2023/01/29 14:31:06 read message：10  Hello World!
2023/01/29 14:31:06 send message: 10  Hello World!
2023/01/29 14:31:06 connection broken from 127.0.0.1:55745
```

:::

<br />

### 2）压力测试

::: details （1）测试服务端QPS

`server/main.go`

```go
package main

import (
	"io"
	"log"
	"net"
	"sync/atomic"
	"time"
)

// QPS 统计QPS信息
type QPS struct {
	value *int32
}

func NewQPS() *QPS {
	return &QPS{value: new(int32)}
}

// Inc +1
func (q *QPS) Inc() {
	atomic.AddInt32(q.value, 1)
}

// ValueWithReset 返回当前的值,并设置value为0重新计数
func (q *QPS) ValueWithReset() int32 {
	return atomic.SwapInt32(q.value, 0)
}

var qps = NewQPS()

// process 连接处理函数
func process(conn net.Conn) {
	// 关闭连接
	defer conn.Close()

	// 读写数据
	buffer := make([]byte, 1024)
	for {
		// 读取数据
		n, err := conn.Read(buffer[:])
		if err != nil {
			if err == io.EOF {
				log.Printf("connection broken from %s\n", conn.RemoteAddr().String())
			} else {
				log.Printf("read failed: %s\n", err)
			}
			break
		}
		recv := string(buffer[:n])
		//log.Printf("read message：%s\n", recv)

		// 原样写入数据
		if _, err := conn.Write([]byte(recv)); err != nil {
			log.Printf("send message failed: %s\n", err)
			break
		}
		//log.Printf("send message: %s\n", recv)

		// QPS +1
		qps.Inc()
	}
}

func main() {
	// 监听端口
	listener, err := net.Listen("tcp", "0.0.0.0:60000")
	if err != nil {
		log.Fatalf("listen failed: %s\n", err)
	}
	log.Printf("listen at %s\n", listener.Addr().Network()+"://"+listener.Addr().String())

	// 实时输出QPS
	go func() {
		ticker := time.NewTicker(time.Second)
		defer ticker.Stop()
		for {
			select {
			case <-ticker.C:
				value := qps.ValueWithReset()
				if value != 0 {
					log.Printf("Queries Per Second: %d\n", value)
				}
			default:
			}
		}
	}()

	// 处理请求
	for {
		// 等待连接
		conn, err := listener.Accept()
		if err != nil {
			log.Printf("accept failed: %s\n", err)
			continue
		}
		log.Printf("connection established from %s\n", conn.RemoteAddr().String())

		// 启动一个goroutine处理
		go process(conn)
	}
}
```

`client/main.go`

```go
package main

import (
	"flag"
	"fmt"
	"log"
	"net"
)

var (
	h = flag.String("h", "127.0.0.1:60000", "host address")
	c = flag.Int("c", 10, "connections number")
)

func main() {
	// 解析命令行参数
	flag.Parse()

	// 定义变量
	var network = "tcp"

	// 建立连接
	conns := []net.Conn{}
	for i := 0; i < *c; i++ {
		conn, err := net.Dial("tcp", *h)
		if err != nil {
			log.Fatalf("dial failed: %s: %s\n", network+"://"+*h, err)
		}
		defer conn.Close()
		conns = append(conns, conn)
	}

	// 每个连接启一个Goroutine进行处理
	for _, conn := range conns {
		go func(conn net.Conn) {
			for {
				// 发送数据
				message := fmt.Sprintf("Hello World!")
				if _, err := conn.Write([]byte(message)); err != nil {
					log.Printf("send message failed: %s\n", err)
					return
				}

				// 读取服务端响应的数据
				buffer := make([]byte, 1024)
				n, err := conn.Read(buffer[:])
				if err != nil {
					log.Printf("read message failed: %s\n", err)
					return
				}

				// 输出服务端响应结果
				//fmt.Printf("%s\n", string(buffer[:n]))
				n = n
			}
		}(conn)
	}

	select {}
}
```

输出结果

```bash
# 本地回环接口测试
[root@node-1 demo]# go run server/main.go  # 启动服务端
[root@node-1 demo]# go run client/main.go  # 启动客户端

# 服务端日志显示 QPS在7万左右
[root@node-1 demo]# go run server/main.go
2023/01/29 16:58:43 listen at tcp://[::]:60000
2023/01/29 16:59:45 connection established from 127.0.0.1:42268
2023/01/29 16:59:45 connection established from 127.0.0.1:42270
2023/01/29 16:59:45 connection established from 127.0.0.1:42272
2023/01/29 16:59:45 connection established from 127.0.0.1:42274
2023/01/29 16:59:45 connection established from 127.0.0.1:42276
2023/01/29 16:59:45 connection established from 127.0.0.1:42278
2023/01/29 16:59:45 connection established from 127.0.0.1:42280
2023/01/29 16:59:45 connection established from 127.0.0.1:42282
2023/01/29 16:59:45 connection established from 127.0.0.1:42284
2023/01/29 16:59:45 connection established from 127.0.0.1:42286
2023/01/29 16:59:45 Queries Per Second: 11945
2023/01/29 16:59:46 Queries Per Second: 80836
2023/01/29 16:59:47 Queries Per Second: 77690
2023/01/29 16:59:48 Queries Per Second: 75832
2023/01/29 16:59:49 Queries Per Second: 76132
2023/01/29 16:59:50 Queries Per Second: 68467
2023/01/29 16:59:51 Queries Per Second: 64415
2023/01/29 16:59:52 Queries Per Second: 76862
2023/01/29 16:59:53 Queries Per Second: 75880
2023/01/29 16:59:54 Queries Per Second: 76612
2023/01/29 16:59:55 Queries Per Second: 78443

# -------------------------------------------------------------------------

# 局域网内测试
[root@node-1 demo]# go run server/main.go                                # node-1上启动服务端
[root@node-2 demo]# go run client/main.go -h 192.168.48.151:60000        # node-2上启动客户端

# 服务端日志显示 QPS在3万左右
[root@node-1 demo]# go run server/main.go
2023/01/29 17:07:59 listen at tcp://[::]:60000
2023/01/29 17:08:04 connection established from 192.168.48.152:60270
2023/01/29 17:08:04 connection established from 192.168.48.152:60272
2023/01/29 17:08:04 connection established from 192.168.48.152:60274
2023/01/29 17:08:04 connection established from 192.168.48.152:60276
2023/01/29 17:08:04 connection established from 192.168.48.152:60278
2023/01/29 17:08:04 connection established from 192.168.48.152:60280
2023/01/29 17:08:04 connection established from 192.168.48.152:60282
2023/01/29 17:08:04 connection established from 192.168.48.152:60284
2023/01/29 17:08:04 connection established from 192.168.48.152:60286
2023/01/29 17:08:04 connection established from 192.168.48.152:60288
2023/01/29 17:08:05 Queries Per Second: 21019
2023/01/29 17:08:06 Queries Per Second: 32074
2023/01/29 17:08:07 Queries Per Second: 33049
2023/01/29 17:08:08 Queries Per Second: 32242
2023/01/29 17:08:09 Queries Per Second: 33483
2023/01/29 17:08:10 Queries Per Second: 33368
2023/01/29 17:08:11 Queries Per Second: 31431
2023/01/29 17:08:12 Queries Per Second: 33508

# -------------------------------------------------------------------------

# 本地到香港节点测试
[root@ap-hongkang demo]# go run server/main.go                           # 香港节点上启动服务端
[root@node-1 demo]# go run client/main.go -h 43.154.36.151:60000         # 本地虚机上启动客户端

# 服务端日志显示 QPS在100左右
[root@ap-hongkang demo]# go run server/main.go
2023/01/29 17:10:05 listen at tcp://[::]:60000
2023/01/29 17:12:01 connection established from 183.197.36.xxx:21215
2023/01/29 17:12:02 connection established from 183.197.36.xxx:21216
2023/01/29 17:12:02 connection established from 183.197.36.xxx:21217
2023/01/29 17:12:02 connection established from 183.197.36.xxx:21218
2023/01/29 17:12:02 connection established from 183.197.36.xxx:21219
2023/01/29 17:12:02 connection established from 183.197.36.xxx:21220
2023/01/29 17:12:02 connection established from 183.197.36.xxx:21221
2023/01/29 17:12:02 connection established from 183.197.36.xxx:21222
2023/01/29 17:12:02 connection established from 183.197.36.xxx:21223
2023/01/29 17:12:02 connection established from 183.197.36.xxx:21224
2023/01/29 17:12:03 Queries Per Second: 108
2023/01/29 17:12:04 Queries Per Second: 135
2023/01/29 17:12:05 Queries Per Second: 122
2023/01/29 17:12:06 Queries Per Second: 137
2023/01/29 17:12:07 Queries Per Second: 118
2023/01/29 17:12:08 Queries Per Second: 130
2023/01/29 17:12:09 Queries Per Second: 139
2023/01/29 17:12:10 Queries Per Second: 136
```

:::

<br />

### 3）交互式

::: details TCP Client

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
	)

	// 建立连接
	conn, err := net.Dial(network, address)
	if err != nil {
		log.Printf("dial failed: %s: %s\n", network+"://"+address, err)
		return
	}
	defer conn.Close()

	// 读写对象
	stdout := bufio.NewReader(os.Stdin) // stdout读入
	writer := conn                      // writer写入到服务端
	reader := bufio.NewReader(conn)     // reader读取服务端响应
	readBuffer := make([]byte, 1024)    // buffer

	// 读取用户输入并发送到服务端
	for {
		// 修改一下终端提示符
		fmt.Printf(">>> ")

		// 读取用户输入, Ctrl+C会触发io.EOF
		input, err := stdout.ReadString('\n')
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
		if _, err = writer.Write([]byte(input)); err != nil {
			log.Printf("send message failed: %s\n", err)
			break
		}

		// 读取服务端响应的数据
		n, err := reader.Read(readBuffer[:])
		if err != nil {
			log.Printf("recv message failed: %s\n", err)
			break
		}

		// 输出服务端响应结果
		fmt.Println(string(readBuffer[:n]))
	}
}
```

输出结果

```bash
# 启动服务端
D:\application\GoLand\example>go run server/main.go
2023/01/28 17:51:07 listen at tcp://127.0.0.1:60000

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

	// 根据字节序的不同使用不同的方法转为uint类型,并输出16进制数
	fmt.Printf("%#x\n", binary.BigEndian.Uint16(b))
	fmt.Printf("%#x\n", binary.LittleEndian.Uint16(l))

	// 如果使用错误的方法
	fmt.Printf("%#x\n", binary.BigEndian.Uint16(l))
	fmt.Printf("%#x\n", binary.LittleEndian.Uint16(b))
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
大端存储: []byte{0x12, 0x34}
小端存储: []byte{0x34, 0x12}
0x1234
0x1234
0x3412
0x3412
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
	"bufio"
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
	)

	// 建立连接
	conn, err := net.Dial(network, address)
	if err != nil {
		log.Printf("dial failed: %s: %s\n", network+"://"+address, err)
		return
	}
	defer conn.Close()

	// 读写对象
	writer := conn                   // writer写入到服务端
	reader := bufio.NewReader(conn)  // reader读取服务端响应
	readBuffer := make([]byte, 1024) // buffer

	// 发送数据到服务端
	var wg sync.WaitGroup
	for i := 0; i < 100; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			// 发送数据到服务端
			if _, err = writer.Write([]byte("0123456789")); err != nil {
				log.Printf("send message failed: %s\n", err)
				return
			}
			// 读取服务端响应的数据
			n, err := reader.Read(readBuffer[:])
			if err != nil {
				log.Printf("recv message failed: %s\n", err)
				return
			}
			// 输出服务端响应结果
			fmt.Println(string(readBuffer[:n]))
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

* 根本原因
  * 【数据读取方】不能确定要读取数据包的边界
  * 【数据读取方】可能是服务端也可能是客户端

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