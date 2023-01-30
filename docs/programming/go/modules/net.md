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
	log.Printf("connection established to %s\n", conn.RemoteAddr().Network()+"://"+conn.RemoteAddr().String())

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
		log.Printf("%s\n", string(buffer[:n]))
	}
}
```

:::

::: details （3）测试

```bash
# 启动服务端
D:\application\GoLand\example>go run server/main.go
2023/01/29 20:22:09 listen at tcp://127.0.0.1:60000

# 启动客户端
D:\application\GoLand\example>go run client/main.go
2023/01/29 20:22:28 connection established to tcp://127.0.0.1:60000
2023/01/29 20:22:28 1   Hello World!
2023/01/29 20:22:28 2   Hello World!
2023/01/29 20:22:28 3   Hello World!
2023/01/29 20:22:28 4   Hello World!
2023/01/29 20:22:28 5   Hello World!
2023/01/29 20:22:28 6   Hello World!
2023/01/29 20:22:28 7   Hello World!
2023/01/29 20:22:28 8   Hello World!
2023/01/29 20:22:28 9   Hello World!
2023/01/29 20:22:28 10  Hello World!

# 查看服务端日志
D:\application\GoLand\example>go run server/main.go
2023/01/29 20:22:09 listen at tcp://127.0.0.1:60000
2023/01/29 20:22:28 connection established from 127.0.0.1:51519
2023/01/29 20:22:28 read message：1   Hello World!
2023/01/29 20:22:28 send message: 1   Hello World!
2023/01/29 20:22:28 read message：2   Hello World!
2023/01/29 20:22:28 send message: 2   Hello World!
2023/01/29 20:22:28 read message：3   Hello World!
2023/01/29 20:22:28 send message: 3   Hello World!
2023/01/29 20:22:28 read message：4   Hello World!
2023/01/29 20:22:28 send message: 4   Hello World!
2023/01/29 20:22:28 read message：5   Hello World!
2023/01/29 20:22:28 send message: 5   Hello World!
2023/01/29 20:22:28 read message：6   Hello World!
2023/01/29 20:22:28 send message: 6   Hello World!
2023/01/29 20:22:28 read message：7   Hello World!
2023/01/29 20:22:28 send message: 7   Hello World!
2023/01/29 20:22:28 read message：8   Hello World!
2023/01/29 20:22:28 send message: 8   Hello World!
2023/01/29 20:22:28 read message：9   Hello World!
2023/01/29 20:22:28 send message: 9   Hello World!
2023/01/29 20:22:28 read message：10  Hello World!
2023/01/29 20:22:28 send message: 10  Hello World!
2023/01/29 20:22:28 connection broken from 127.0.0.1:51519
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

// NewQPS QPS构造函数
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
				message := "Hello World!"
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
# 测试说明
# 1.测试的结果会受到多种因素影响，比如服务端CPU核心数、连接数、网络质量等，这里仅仅是做一个简单的演示
# 2.默认的连接数设置的是10,机器配置都比较低,大多是2核4G配置

# -------------------------------------------------------------------------

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

# 调高连接数再测一次
[root@node-1 demo]# go run client/main.go -h 43.154.36.151:60000 -c 300

# 服务端日志显示 QPS在4000左右
2023/01/29 20:13:39 Queries Per Second: 3740
2023/01/29 20:13:40 Queries Per Second: 3998
2023/01/29 20:13:41 Queries Per Second: 3738
2023/01/29 20:13:42 Queries Per Second: 3702
2023/01/29 20:13:43 Queries Per Second: 4045
2023/01/29 20:13:44 Queries Per Second: 3950
2023/01/29 20:13:45 Queries Per Second: 3126
2023/01/29 20:13:46 Queries Per Second: 4027
```

:::

<br />

### 3）交互操作

::: details 点击查看详情

`client/main.go`

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
		log.Fatalf("dial failed: %s: %s\n", network+"://"+address, err)
	}
	defer conn.Close()
	log.Printf("connection established to %s\n", conn.RemoteAddr().Network()+"://"+conn.RemoteAddr().String())

	// 读取用户输入并发送到服务端
	stdout := bufio.NewReader(os.Stdin)
	for {
		// 修改一下终端提示符
		fmt.Printf(">>> ")

		// 读取用户输入, Ctrl+C会触发io.EOF
		input, err := stdout.ReadString('\n')
		if err != nil {
			if err != io.EOF {
				log.Printf("read message failed from input: %s\n", err)
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
		buffer := make([]byte, 1024)
		n, err := conn.Read(buffer[:])
		if err != nil {
			log.Printf("read message failed: %s\n", err)
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
2023/01/29 20:27:15 listen at tcp://127.0.0.1:60000

# 启动客户端进行测试
D:\application\GoLand\example>go run client/main.go
2023/01/29 20:27:19 connection established to tcp://127.0.0.1:60000
>>> hello
hello
>>>     world!
    world!
>>>       
>>> 
>>> 
>>> 123
123
>>>
```

:::

<br />

### 4）字节序

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

### 5）TCP 粘包

1、概念说明：TCP粘包和TCP拆包

TCP是面向字节流的链接，根本就没有包的概念，所谓的"TCP粘包"说法并不准确，但是问题确实是存在的。举个例子：

* 客户端向服务端发送两条数据"abc"和"123"，服务端收到了一条数据"abc123"，这就是粘包，两条或多条数据粘在一起了
* 客户端向服务端发送一条数据"hello world!"，服务端收到了两条数据"hello"和"world!"，这就是拆包，一条完整的数据被拆分为两条或多条

<br />

2、产生原因

粘包或拆包有可能发生在客户端也可能发生在服务端，但最终体现在【数据读取方】，根本原因在于【数据读取方】不能确定要读取数据的边界

可能的原因如下：

* 一些错误的用法或者说不具有普遍意义的用法：
  * 发数据时写入（开发者自己定义的）缓冲区导致粘在一起
  * 多个线程同时向一个TCP链接写数据导致粘在一起

* TCP链接建立后，双方都有一个缓冲区，如果发数据时发的太快，就会导致缓冲区内包含多条数据一起发送
* 读取方的边界设置的太小。读取方每次读取的字节太少，导致一条数据需要多次才能读完，但读取方却认为读取到了完整的多条数据

<br />

3、解决办法

* 1）使用分隔符

  每条完整的数据后面加一个分隔符，接收方按照分隔符读取。但如果数据本身就包含分隔符，这就会有问题

  此时可以对数据进行编码，比如base64，然后从编码表外找一些字符作为分隔符

* 2、使用封包法（推荐）

  * 每条数据分为`header`和`body`
  * `header`的长度是固定的，比如2个字节或4个字节，用于存储`body`的实际字节数
  * `body`的长度是不固定的，是我们要发送的真正消息
  * 读数据时先读取`header`部分，就能获取`body`的实际大小，就可以读取到一条完整的消息

<br />

::: details （1）粘包复现：客户端发送速度太快导致Socket缓冲区内的数据粘包

`client/main.go`

```go
package main

import (
	"fmt"
	"log"
	"net"
	"strconv"
    "time"
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
	log.Printf("connection established to %s\n", conn.RemoteAddr().Network()+"://"+conn.RemoteAddr().String())

	// 客户端数据发的太快
	for i := 0; i < 10; i++ {
		message := fmt.Sprintf("%-3s Hello World!", strconv.Itoa(i+1))
		if _, err = conn.Write([]byte(message)); err != nil {
			log.Printf("send message failed: %s\n", err)
			break
		}
	}
    time.Sleep(time.Second * 10)
}
```

输出结果

```bash
# 客户端
D:\application\GoLand\example>go run client/main.go
2023/01/30 15:52:54 connection established to tcp://127.0.0.1:60000

# 服务端日志
D:\application\GoLand\example>go run server/main.go
2023/01/30 15:54:31 listen at tcp://127.0.0.1:60000
2023/01/30 15:55:37 connection established from 127.0.0.1:56432
2023/01/30 15:55:37 read message：1   Hello World!
2023/01/30 15:55:37 send message: 1   Hello World!
2023/01/30 15:55:37 read message：2   Hello World!3   Hello World!4   Hello World!5   Hello World!6   Hello World!
2023/01/30 15:55:37 send message failed: write tcp 127.0.0.1:60000->127.0.0.1:56432: wsasend: An existing connection was forcibly closed by the remote host.
```

:::

::: details （2）拆包复现：读取方的边界设置的太小

```go
// process 连接处理函数
func process(conn net.Conn) {
	// 关闭连接
	defer conn.Close()

	// 读写数据
	buffer := make([]byte, 15)
```

输出结果

```bash
# 客户端日志
D:\application\GoLand\example>go run client/main.go
2023/01/30 16:06:12 connection established to tcp://127.0.0.1:60000
2023/01/30 16:06:12 1   Hello World
2023/01/30 16:06:12 !              
2023/01/30 16:06:12 2   Hello World
2023/01/30 16:06:12 !3   Hello Worl
2023/01/30 16:06:12 d!4   Hello Wor
2023/01/30 16:06:12 ld!5   Hello Wo
2023/01/30 16:06:12 rld!6   Hello W
2023/01/30 16:06:12 orld!
2023/01/30 16:06:12 7   Hello World
2023/01/30 16:06:12 !8   Hello Worl

# 服务端日志
D:\application\GoLand\example>go run server/main.go
2023/01/30 16:06:11 listen at tcp://127.0.0.1:60000
2023/01/30 16:06:12 connection established from 127.0.0.1:56875
2023/01/30 16:06:12 read message：1   Hello World
2023/01/30 16:06:12 send message: 1   Hello World
2023/01/30 16:06:12 read message：!              
2023/01/30 16:06:12 send message: !              
2023/01/30 16:06:12 read message：2   Hello World
2023/01/30 16:06:12 send message: 2   Hello World
2023/01/30 16:06:12 read message：!3   Hello Worl
2023/01/30 16:06:12 send message: !3   Hello Worl
2023/01/30 16:06:12 read message：d!4   Hello Wor
2023/01/30 16:06:12 send message: d!4   Hello Wor
2023/01/30 16:06:12 read message：ld!5   Hello Wo
2023/01/30 16:06:12 send message: ld!5   Hello Wo
2023/01/30 16:06:12 read message：rld!6   Hello W
2023/01/30 16:06:12 send message: rld!6   Hello W
2023/01/30 16:06:12 read message：orld!          
2023/01/30 16:06:12 send message: orld!          
2023/01/30 16:06:12 read message：7   Hello World
2023/01/30 16:06:12 send message: 7   Hello World
2023/01/30 16:06:12 read message：!8   Hello Worl
2023/01/30 16:06:12 send message: !8   Hello Worl
2023/01/30 16:06:12 read message：d!9   Hello Wor
2023/01/30 16:06:12 send message: d!9   Hello Wor
2023/01/30 16:06:12 read failed: read tcp 127.0.0.1:60000->127.0.0.1:56875: wsarecv: An established connection was aborted by the software in your host machine
```

:::

::: details （3）解决方案之封包法：客户端

```go
package main

import (
	"bytes"
	"encoding/binary"
	"fmt"
	"log"
	"net"
	"strconv"
)

// encode 数据编码，添加header，并返回完整的字节切片
func encode(data string) ([]byte, error) {
	//获取实际的消息大小, int32类型，固定占用4个字节
	var header = int32(len(data))

	// 创建一个临时缓冲区
	var buffer = new(bytes.Buffer)

	// 写入头部信息，大端字节序
	err := binary.Write(buffer, binary.BigEndian, header)
	if err != nil {
		return nil, err
	}

	// 写入消息主体
	err = binary.Write(buffer, binary.BigEndian, []byte(data))
	if err != nil {
		return nil, err
	}

	// 返回由header和body组成的完整消息
	return buffer.Bytes(), nil
}

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
	log.Printf("connection established to %s\n", conn.RemoteAddr().Network()+"://"+conn.RemoteAddr().String())

	// 客户端数据发的太快
	for i := 0; i < 10; i++ {
		message, err := encode(fmt.Sprintf("%-3s Hello World!", strconv.Itoa(i+1)))  // 封包
		if err != nil {
			log.Printf("encode message failed: %s\n", err)
			break
		}
		if _, err = conn.Write([]byte(message)); err != nil {
			log.Printf("send message failed: %s\n", err)
			break
		}
	}
}
```

:::

::: details （4）解决方案之封包法：服务端

```go
package main

import (
	"bytes"
	"encoding/binary"
	"log"
	"net"
)

// decode 解析消息头，返回实际消息体的长度。
// 此函数会修改指针偏移，如果想要更加安全的方式可以考虑使用bufio reader Peek方法
func decode(conn net.Conn) (int32, error) {
	// 读取消息头
	header := make([]byte, 4)
	_, err := conn.Read(header)
	if err != nil {
		log.Printf("read message header failed：%s\n", err)
		return 0, err
	}
	// 解析消息头，获取消息体长度
	var size int32
	err = binary.Read(bytes.NewReader(header), binary.BigEndian, &size)
	if err != nil {
		log.Printf("decode message header failed：%s\n", err)
		return 0, err
	}

	return size, nil
}

// process 连接处理函数
func process(conn net.Conn) {
	// 关闭连接
	defer conn.Close()

	// 读写数据
	for {
		// 解码,获取实际的消息长度
		size, err := decode(conn)
		if err != nil {
			log.Printf("decode message body failed：%s\n", err)
			break
		}

		// 读取真正的消息数据
        // 注意：这里的size是一个动态值，如果比较大的话很有可能撑爆内存，需要优化
		buffer := make([]byte, size)
		n, err := conn.Read(buffer)
		if err != nil {
			log.Printf("read message body failed：%s\n", err)
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

::: details （5）解决方案之封包法：服务端优化版本

```go

```

:::

<br />

### 6）数据加密

<br />

### 7）数据压缩

<br />

### 8）心跳机制

<br />

### 9）读写缓冲