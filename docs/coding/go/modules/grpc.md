## gRPC

**gRPC**

* 官网：[https://grpc.io/docs/languages/go/](https://grpc.io/docs/languages/go/)
* 文档：[https://github.com/grpc/grpc/tree/master/doc](https://github.com/grpc/grpc/tree/master/doc)
* Github：[https://github.com/grpc/grpc](https://github.com/grpc/grpc)

**Protocol Buffers**

* 官网：[https://developers.google.com/protocol-buffers/](https://developers.google.com/protocol-buffers/)
* Github：[https://github.com/protocolbuffers/protobuf](https://github.com/protocolbuffers/protobuf)

<br />

### 安装依赖

::: details （1）安装protoc命令

下载地址：[https://github.com/protocolbuffers/protobuf](https://github.com/protocolbuffers/protobuf)

```bash
# 安装protoc
C:\Users\Administrator>protoc --version
libprotoc 3.21.9

# protoc支持生成Python、Java、C++等代码，但是默认不支持生成Go代码
C:\Users\Administrator>protoc
Usage: protoc [OPTION] PROTO_FILES
Parse PROTO_FILES and generate output based on the options given:
  ...
  --cpp_out=OUT_DIR           Generate C++ header and source.
  --csharp_out=OUT_DIR        Generate C# source file.
  --java_out=OUT_DIR          Generate Java source file.
  --kotlin_out=OUT_DIR        Generate Kotlin file.
  --objc_out=OUT_DIR          Generate Objective-C header and source.
  --php_out=OUT_DIR           Generate PHP source file.
  --pyi_out=OUT_DIR           Generate python pyi stub.
  --python_out=OUT_DIR        Generate Python source file.
  --ruby_out=OUT_DIR          Generate Ruby source file.
```

:::

::: details （2）安装protoc-gen-go命令

```bash
# 安装
C:\Users\Administrator>go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
C:\Users\Administrator>go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

# 查看版本
C:\Users\Administrator>protoc-gen-go --version
protoc-gen-go v1.28.1

C:\Users\Administrator>protoc-gen-go-grpc --version
protoc-gen-go-grpc 1.2.0
```

:::

::: details （3）安装grpc-gateway命令

下载地址：[https://github.com/grpc-ecosystem/grpc-gateway](https://github.com/grpc-ecosystem/grpc-gateway)

可以使用`go install`安装，但是强烈不建议。因为会丢失版本信息，如下所示

```bash
C:\Users\Administrator>protoc-gen-grpc-gateway -version
Version dev, commit unknown, built at unknown
```

建议直接下载二进制命令

```bash
# 查看版本
C:\Users\Administrator>protoc-gen-grpc-gateway --version
Version 2.14.0, commit fb3f4344d4f1d8c813694275c0448a0eacb125d6, built at 2022-11-15T22:45:09Z

C:\Users\Administrator>protoc-gen-openapiv2 --version
Version 2.14.0, commit fb3f4344d4f1d8c813694275c0448a0eacb125d6, built at 2022-11-15T22:45:09Z
```

:::

<br />

### 目录结构

![image-20221122183044304](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221122183044304.png)

* 每块独立的内容都会新建一个目录来做演示，`grpc_unary`便是为我们第一次学习`gRPC`所创建的目录，当然目录名叫什么都可以
* `unary`这个名字并不是随便写的，它代表`gRPC`中最简单的一种调用模型`Unary RPC`（一元RPC），即：客户端发送单个请求并获得单个响应
* `proto`目录：用来编写`ProtoBuf`序列化协议文件以及存放生成的`Go`代码
* `client`目录：客户端代码，它是一个独立的包，有自己的`main`方法
* `server`目录：服务端代码，它是一个独立的包，有自己的`main`方法

<br />

### 基础示例

::: details （1）编写 .proto 文件

`grpc_unary/proto/echoserver.proto`

```protobuf
// 定义ProtoBuf协议版本
// 现在主流的也是最新的是proto3
syntax = "proto3";

// 定义ProtoBuf包名,用于Protoc内部
// 在生成的Go代码中并不会用到这个字段
package echoserver;

// 定义Go包名
// 这个值写法有很多,后面再详细讲解
option go_package = "./;echoserver";

// 定义一个Message，对应Go语言结构体，用于封装请求数据
// string: 字符串类型
// data: 变量明
// 1: 这里的1是指编号为1,并不是值为1，可以理解成data是一段数据中的第1个字段
//   在同一个message中，多个字段的编号不能重复
message EchoRequest {
  string data = 1;
}

// 用于封装响应数据
message EchoResponse {
  string data = 1;
}

// 定义一个服务,对应Go的Interface（名称为：<Service>Server）
service Echo {
  // 定义一个方法
  rpc Say (EchoRequest) returns (EchoResponse);
}
```

:::

::: details （2）生成Go代码

> Windows环境下使用^，和Linux下的 \ 效果一样 

```bash
# 方式1
D:\application\GoLand\demo\grpc_unary\proto> protoc --proto_path=. ^
    --go_out=. ^
    --go_opt=paths=source_relative ^
    --go-grpc_out=. ^
    --go-grpc_opt=paths=source_relative ^
*.proto

# 方式2
D:\application\GoLand\demo\grpc_unary\proto> protoc --proto_path=. ^
    --go_out=paths=source_relative:. ^
    --go-grpc_out=paths=source_relative:. ^
*.proto

# ---------------------------------------------------------------------------

# 特别说明
# 1) 第1种方式参数虽然多，但是看起来更清楚一些，所以推荐第1种方式
# 2) Windows命令行中的上下键不能将^命令都连起来，所以下面这样使用更适合，支持上下键：
#    protoc --proto_path=. --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative *.proto


# 参数说明
# --proto_path  指定proto文件的搜索路径,等同于使用-I参数

# --go_out      生成的Go代码存放目录,.代表当前目录，若指定其他目录需要提前创建好,在这个例子中会生成 echoserver.pb.go 文件
# --go_opt      指定go_out的参数，paths=source_relative的意思是相对目录

# --go-grpc_out 生成的Go代码存放目录,.代表当前目录，若指定其他目录需要提前创建好,在这个例子中会生成 echoserver_grpc.pb.go 文件
# --go-grpc_opt 指定go-grpc_out的参数，paths=source_relative的意思是相对目录

# 两个Go文件有啥异同?
# (1) 他们俩属于同一个包
# (2) pb的意思是ProtoBuf
# (3) echoserver.pb.go       生成Message相关的代码，对应Go结构体
# (4) echoserver_grpc.pb.go  生成Service生成的代码，对应Go接口，包含客户端和服务端代码
#                            这是gRPC专门为ProtoBuf编写的插件，所以才会生成Service相关代码
```

:::

::: details （3）编写服务端代码

`grpc_unary/server/main.go`

```go
package main

import (
	"context"
	pb "demo/grpc_unary/proto"
	"fmt"
	"log"
	"net"

	"google.golang.org/grpc"
)

// 定义一个结构体, UnimplementedEchoServer必须要写
type EchoServer struct {
	pb.UnimplementedEchoServer
}

// 实现EchoServer接口方法
func (e *EchoServer) Say(ctx context.Context, req *pb.EchoRequest) (*pb.EchoResponse, error) {
	log.Println("Receive request: ", req)
	return &pb.EchoResponse{Data: req.Data}, nil
}

func main() {
	// (1) 实例化一个gRPC Server
	server := grpc.NewServer()

	// (2) 将EchoServer注册到gRPC Server中
	pb.RegisterEchoServer(server, &EchoServer{})

	// (3) 监听一个TCP端口
	listener, err := net.Listen("tcp", "0.0.0.0:8080")
	if err != nil {
		log.Fatalf("failed to listen: %v\n", err)
	}

	// (4) 启动服务，由gRPC Server处理连接
	fmt.Printf("server listening at %s://%s\n", listener.Addr().Network(), listener.Addr().String())
	log.Fatalln(server.Serve(listener))
}
```

:::

::: details （4）编写客户端代码

`grpc_unary/client/main.go`

```go
package main

import (
	"context"
	pb "demo/grpc_unary/proto"
	"fmt"
	"log"
	"strconv"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func main() {
	// (1) 连接gRPC Server    
    // 因为我们并没有使用任何认证，所以需要加上 grpc.WithTransportCredentials(insecure.NewCredentials())
	conn, err := grpc.Dial("localhost:8080", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("failed to connect echoserver: %v\n", err)
	}
	defer conn.Close()

	// (2) 实例化Client
	client := pb.NewEchoClient(conn)

	// (3) 发送消息
	for i := 0; i < 10; i++ {
		message := pb.EchoRequest{Data: strconv.Itoa(i)}
		res, err := client.Say(context.Background(), &message)
		if err != nil {
			log.Printf("Remote Call Say error: %v\n", err)
			continue
		}
		fmt.Println(res.Data)
	}
}
```

:::

::: details （5）测试

```bash
# 启动服务端
D:\application\GoLand\demo\grpc_unary\server>go run main.go
server listening at tcp://[::]:8080

# 发送数据
D:\application\GoLand\demo\grpc_unary\client>go run main.go
0
1
2
3
4
5
6
7
8
9

# 服务端查看日志
D:\application\GoLand\demo\grpc_unary\server>go run main.go
server listening at tcp://[::]:8080
2022/11/23 11:52:32 Receive request:  data:"0"
2022/11/23 11:52:32 Receive request:  data:"1"
2022/11/23 11:52:32 Receive request:  data:"2"
2022/11/23 11:52:32 Receive request:  data:"3"
2022/11/23 11:52:32 Receive request:  data:"4"
2022/11/23 11:52:32 Receive request:  data:"5"
2022/11/23 11:52:32 Receive request:  data:"6"
2022/11/23 11:52:32 Receive request:  data:"7"
2022/11/23 11:52:32 Receive request:  data:"8"
2022/11/23 11:52:32 Receive request:  data:"9"
```

:::

::: details （6）继续完善：添加一个Ping方法，用于测试客户端和服务端连接是否正常

`grpc_unary/proto/echoserver.proto`

```protobuf
// 定义ProtoBuf协议版本
// 现在主流的也是最新的是proto3
syntax = "proto3";

import "google/protobuf/empty.proto";

// 定义ProtoBuf包名,用于Protoc内部
// 在生成的Go代码中并不会用到这个字段
package echoserver;

// 定义Go包名
// 这个值写法有很多,后面再详细讲解
option go_package = "./;echoserver";

// 定义一个Message，对应Go语言结构体，用于封装请求数据
// string: 字符串类型
// data: 变量明
// 1: 这里的1是指编号为1,并不是值为1，可以理解成data是一段数据中的第1个字段
//   在同一个message中，多个字段的编号不能重复
message EchoRequest {
  string data = 1;
}

// 用于封装响应数据
message EchoResponse {
  string data = 1;
}

// 定义一个服务,对应Go的Interface（名称为：<Service>Server）
service Echo {
  // 定义一个方法
  rpc Say (EchoRequest) returns (EchoResponse);
  // 定义Ping方法，用于测试客户端和服务端连接是否正常
  // 它没有参数，但是ProtoBuf必须要求我们传入一个参数，解决方法有两种：
  //   (1) 定义一个Empty的Message,里面什么字段都没有
  //   (2) 使用内置的Empty Message
  // 返回值是 "pong"
  rpc Ping(google.protobuf.Empty) returns (EchoResponse);
}
```

`grpc_unary/server/main.go`

```go
package main

import (
	"context"
	pb "demo/grpc_unary/proto"
	"fmt"
	"log"
	"net"

	"google.golang.org/protobuf/types/known/emptypb"

	"google.golang.org/grpc"
)

// 定义一个结构体, UnimplementedEchoServer必须要写
type EchoServer struct {
	pb.UnimplementedEchoServer
}

// 实现EchoServer接口方法
func (e *EchoServer) Ping(ctx context.Context, req *emptypb.Empty) (*pb.EchoResponse, error) {
	log.Println("Receive request: Ping")
	return &pb.EchoResponse{Data: "pong"}, nil
}
func (e *EchoServer) Say(ctx context.Context, req *pb.EchoRequest) (*pb.EchoResponse, error) {
	log.Println("Receive request: ", req)
	return &pb.EchoResponse{Data: req.Data}, nil
}

func main() {
	// (1) 实例化一个gRPC Server
	server := grpc.NewServer()

	// (2) 将EchoServer注册到gRPC Server中
	pb.RegisterEchoServer(server, &EchoServer{})

	// (3) 监听一个TCP端口
	listener, err := net.Listen("tcp", "0.0.0.0:8080")
	if err != nil {
		log.Fatalf("failed to listen: %v\n", err)
	}

	// (4) 启动服务，由gRPC Server处理连接
	fmt.Printf("server listening at %s://%s\n", listener.Addr().Network(), listener.Addr().String())
	log.Fatalln(server.Serve(listener))
}
```

`grpc_unary/client/main.go`

```go
package main

import (
	"context"
	pb "demo/grpc_unary/proto"
	"fmt"
	"log"
	"strconv"

	"github.com/golang/protobuf/ptypes/empty"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func main() {
	// (1) 连接gRPC Server
	conn, err := grpc.Dial("localhost:8080", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("failed to connect echoserver: %v\n", err)
	}
	defer conn.Close()

	// (2) 实例化Client
	client := pb.NewEchoClient(conn)

	// (3) 连接测试
	_, err = client.Ping(context.Background(), &empty.Empty{})
	if err != nil {
		log.Fatalf("Remote Call Ping error: %v\n", err)
	}

	// (4) 发送消息
	for i := 0; i < 10; i++ {
		message := pb.EchoRequest{Data: strconv.Itoa(i)}
		res, err := client.Say(context.Background(), &message)
		if err != nil {
			log.Printf("Remote Call Say error: %v\n", err)
			continue
		}
		fmt.Println(res.Data)
	}
}
```

:::

<br />

### 服务方法

文档：[https://grpc.io/docs/what-is-grpc/core-concepts/#service-definition](https://grpc.io/docs/what-is-grpc/core-concepts/#service-definition)

<br />

#### 一元 RPC

一元 RPC（`Unary RPC`）：

* 客户端向服务器发送单个请求并获取单个响应，就像正常的函数调用一样
* 参考：基础示例

<br />

#### 服务器流式 RPC

服务器流式 RPC（`Server streaming RPCs`）：

* 客户端向服务器发送请求并获取流以读取一系列消息
* 客户端从返回的流中读取，直到没有更多消息为止
* gRPC 保证单个 RPC 调用中的消息排序

<br />

下面实现一个文件下载服务器，客户端发送文件到服务器，服务器以流式数据返回给客户端

::: details （1）编写 .proto 文件

`grpc_streaming_server/proto/file_download_server.proto`

```protobuf
syntax = "proto3";

package filedownload;

option go_package = "./;filedownload";

message FileDownloadRequest {
  string name = 1;
}

message FileDownloadResponse {
  bytes data = 1;
  string md5 = 2;
}

service FileDownload {
  rpc FileDownload (FileDownloadRequest) returns (stream FileDownloadResponse); // 注意stream位置
}
```

:::

::: details （2）生成代码

```bash
D:\application\GoLand\demo\grpc_streaming_server\proto>protoc --proto_path=. --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative *.proto
```

:::

::: details （3）编写服务端代码

`grpc_streaming_server/server/main.go`

```go
package main

import (
	"crypto/md5"
	pb "demo/grpc_streaming_server/proto"
	"encoding/hex"
	"fmt"
	"io"
	"log"
	"net"
	"os"
	"strings"

	"google.golang.org/grpc"
)

func MD5(b []byte) string {
	sum := md5.Sum(b)
	return hex.EncodeToString(sum[:])
}

type FileDownloadServer struct {
	pb.UnimplementedFileDownloadServer
}

func (s *FileDownloadServer) FileDownload(req *pb.FileDownloadRequest, server pb.FileDownload_FileDownloadServer) error {
	log.Println("filedownload request: ", req.GetName())

	// 参数校验
	fileName := strings.TrimSpace(req.GetName())
	if fileName == "" {
		return fmt.Errorf("missing file name")
	}

	// 打开文件
	f, err := os.OpenFile(fileName, os.O_RDONLY, os.ModePerm)
	if err != nil {
		log.Printf("open file failed: %s\n", fileName)
		return err
	}
	defer f.Close()

	// 读取文件并发送数据
	buffer := make([]byte, 1024)
	for {
		n, err := f.Read(buffer)
		if n == 0 {
			if err == io.EOF {
				log.Printf("send file success: %s, total %d bytes\n", fileName)
				break
			}
			if err != nil {
				log.Printf("read file error: %s: %v\n", fileName, err)
				return err
			}
		}

		// 发送数据
		err = server.Send(&pb.FileDownloadResponse{
			Data: buffer[:n],
			Md5:  MD5(buffer[:n]),
		})
		if err != nil {
			log.Printf("send file error: %s: %v\n", fileName, err)
            return err
		}
	}
	return nil
}

func main() {
	// (1) 实例化一个gRPC Server
	server := grpc.NewServer()

	// (2) 将FileDownloadServer注册到gRPC Server
	pb.RegisterFileDownloadServer(server, &FileDownloadServer{})

	// (3) 监听一个TCP端口
	listener, err := net.Listen("tcp", ":8081")
	if err != nil {
		log.Fatalf("failed to listen: %v\n", err)
	}

	// (4) 启动服务，由gRPC Server处理连接
	fmt.Printf("server listening at %s://%s\n", listener.Addr().Network(), listener.Addr().String())
	log.Fatalln(server.Serve(listener))
}
```

:::

::: details （4）编写客户端代码

`grpc_streaming_server/client/main.go`

```go
package main

import (
	"context"
	"crypto/md5"
	bp "demo/grpc_streaming_server/proto"
	"encoding/hex"
	"io"
	"log"
	"os"
	"path/filepath"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func MD5(b []byte) string {
	sum := md5.Sum(b)
	return hex.EncodeToString(sum[:])
}

func main() {
	// (1) 连接gRPC Server
	conn, err := grpc.Dial("localhost:8081", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("failed to connect filedownload server: %v\n", err)
	}
	defer conn.Close()

	// (2) 实例化Client
	client := bp.NewFileDownloadClient(conn)

	// (3) 发送文件下载请求，获取数据流对象
	requestName := "F:/.HOMES/admin/系统镜像/CentOS-7-x86_64-DVD-1708.iso"
	stream, err := client.FileDownload(context.Background(), &bp.FileDownloadRequest{Name: requestName})
	if err != nil {
		log.Fatalf("failed to send request to filedownload server: %s: %v\n", requestName, err)
	}

	// （4）打开本地文件
	_, fileName := filepath.Split(requestName)
	f, err := os.OpenFile(fileName, os.O_RDWR|os.O_CREATE|os.O_TRUNC, os.ModePerm)
	if err != nil {
		log.Fatalf("Open file error: %s: %v\n", requestName, err)
	}
	defer f.Close()

	// (5) 从流中持续接收数据写入到文件中
	for {
		// 接收数据
		res, err := stream.Recv()
		if res == nil {
			if err == io.EOF {
				log.Printf("download file success: %s\n", fileName)
				break
			}
			if err != nil {
				log.Fatalf("receive data error: %v\n", err)
			}
		}

		// 校验MD5
		if MD5(res.Data) != res.Md5 {
			log.Fatalf("download file failed: %s: MD5 verification failed\n", fileName)
		}

		// 写入本地文件
		_, err = f.Write(res.Data)
		if err != nil {
			log.Fatalf("write file error: %s: %v\n", fileName, err)
		}
	}
}
```

:::

<br />

#### 客户端流式 RPC

客户端流式 RPC（`Client streaming RPCs`）：

* 客户端写入一系列消息并将它们发送到服务器
* 客户端完成消息写入后，它会等待服务器读取消息并返回响应
* gRPC 保证单个 RPC 调用中的消息排序

下面实现一个文件上传服务器，客户端以流式数据发送文件到服务器

::: details （1）编写 .proto 文件

`grpc_streaming_client/proto/file_upload_server.proto`

:::

::: details （2）生成代码

```bash
D:\application\GoLand\demo\grpc_streaming_client\proto>protoc --proto_path=. --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative *.proto
```

:::

::: details （3）编写服务端代码

`grpc_streaming_client/server/main.go`

```go
package main

import (
	"crypto/md5"
	pb "demo/grpc_streaming_client/proto"
	"encoding/hex"
	"fmt"
	"io"
	"log"
	"net"
	"os"
	"strings"

	"google.golang.org/grpc"
)

func MD5(b []byte) string {
	sum := md5.Sum(b)
	return hex.EncodeToString(sum[:])
}

type FileUploadServer struct {
	pb.UnimplementedFileUploadServer
}

func (s *FileUploadServer) FileUpload(server pb.FileUpload_FileUploadServer) error {
	var (
		fileName string             // 文件绝对路径，表示上传到哪
		f        io.ReadWriteCloser // 表示打开的文件对象
	)

	for {
		// (1) 接收数据
		res, err := server.Recv()

		// (2) 错误处理
		if res == nil {
			if err == io.EOF {
				break
			}
			if err != nil {
				log.Printf("Recv data error: %v\n", err)
				return err
			}
		}

		// (3) 初始化文件对象
		if fileName == "" || f == nil {
			fileName = strings.TrimSpace(res.Name)
			f, err = os.OpenFile(fileName, os.O_RDWR|os.O_CREATE|os.O_TRUNC, os.ModePerm)
			if err != nil {
				log.Printf("open file error: %v\n", err)
				return err
			}
			defer f.Close()
		}

		// (4) 校验MD5
		if MD5(res.Data) != res.Md5 {
			log.Printf("MD5 verification failed: %s\n", fileName)
			return fmt.Errorf("MD5 verification failed")
		}

		// (5) 写入到文件
		_, err = f.Write(res.Data)
		if err != nil {
			log.Printf("write data to file error: %v\n", err)
		}
	}

	// 返回响应
	if err := server.SendAndClose(&pb.FileUploadResponse{Status: true}); err != nil {
		log.Printf("send and close error: %s: %v\n", fileName, err)
		return err
	}
	return nil
}

func main() {
	// (1) 实例化一个gRPC Server
	server := grpc.NewServer()

	// (2) 将FileDownloadServer注册到gRPC Server
	pb.RegisterFileUploadServer(server, &FileUploadServer{})

	// (3) 监听一个TCP端口
	listener, err := net.Listen("tcp", ":8082")
	if err != nil {
		log.Fatalf("failed to listen: %v\n", err)
	}

	// (4) 启动服务，由gRPC Server处理连接
	fmt.Printf("server listening at %s://%s\n", listener.Addr().Network(), listener.Addr().String())
	log.Fatalln(server.Serve(listener))
}
```

:::

::: details （4）编写客户端代码

`grpc_client_streaming/client/main.go`

```go
package main

import (
	"context"
	"crypto/md5"
	pb "demo/grpc_streaming_client/proto"
	"encoding/hex"
	"fmt"
	"io"
	"log"
	"os"
	"strconv"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func MD5(b []byte) string {
	sum := md5.Sum(b)
	return hex.EncodeToString(sum[:])
}

func main() {
	// (1) 连接gRPC Server
	conn, err := grpc.Dial("localhost:8082", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("failed to connect fileupload server: %v\n", err)
	}
	defer conn.Close()

	// (2) 实例化 Client
	client := pb.NewFileUploadClient(conn)

	// (3) 实例化 ClientStream
	stream, err := client.FileUpload(context.Background())
	if err != nil {
		log.Fatalf("failed to init stream client: %v\n", err)
	}

	// (4) 打开文件
	fileName := "F:/.HOMES/admin/系统镜像/CentOS-7-x86_64-DVD-1708.iso"
	f, err := os.OpenFile(fileName, os.O_RDONLY, os.ModePerm)
	if err != nil {
		log.Fatalf("failed to open file: %s: %v\n", fileName, err)
	}
	defer f.Close()

	// (5) 准备并发送数据
	buffer := make([]byte, 1024)
	fileSavePath := "./CentOS-7.iso" + strconv.Itoa(time.Now().Second())
	for {
		n, err := f.Read(buffer)

		// 错误处理
		if n == 0 {
			if err == io.EOF {
				break
			}
			if err != nil {
				log.Fatalf("read file error: %v\n", err)
			}
		}

		// 发送数据
		message := &pb.FileUploadRequest{
			Name: fileSavePath,
			Data: buffer[:n],
			Md5:  MD5(buffer[:n]),
		}
		if err := stream.Send(message); err != nil {
			log.Fatalf("send file error: %s: %v\n", fileName, err)
		}
	}

	// (6) 关闭并接收响应
	res, err := stream.CloseAndRecv()
	if err != nil {
		log.Fatalf("failed to close and recv: %s: %v\n", fileName, err)
	}
	fmt.Println("来自服务端响应: ", res.Status)
}
```

:::

<br />

#### 双向流式 RPC

双向流式 RPC（`Bidirectional streaming RPCs`）：

* 双方使用读写流发送一系列消息

* 这两个流独立运行，因此客户端和服务器可以按照他们喜欢的任何顺序读取和写入：例如，

  服务器可以在写入响应之前等待接收所有客户端消息，或者它可以交替读取一条消息然后写入一条消息，或其他一些读写组合

* gRPC 保证每个流中消息的顺序

<br />

### 核心概念

#### 元数据

文档：[https://github.com/grpc/grpc-go/blob/master/Documentation/grpc-metadata.md](https://github.com/grpc/grpc-go/blob/master/Documentation/grpc-metadata.md)

`Metadata`简单理解就是HTTP Header中的 key-value，上面文档写的非常详细，建议直接看文档



**（1）一元RPC**

新建目录`grpc_metadata_unary`，并基于**基础示例**进行修改

::: details （1）修改客户端代码

```go
package main

import (
	"context"
	pb "demo/grpc_metadata_unary/proto"
	"fmt"
	"log"
	"strconv"
	"time"

	"github.com/golang/protobuf/ptypes/empty"
	"google.golang.org/grpc/metadata"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func main() {
	// (1) 连接gRPC Server
	conn, err := grpc.Dial("localhost:8080", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("failed to connect echoserver: %v\n", err)
	}
	defer conn.Close()

	// (2) 实例化Client
	client := pb.NewEchoClient(conn)

	// ----------------------------------------------------------------
	// (3) metadata使用
	// 1.生成元数据,有两种方式; 如果Paires接收的个数是奇数会panic
	md1 := metadata.New(map[string]string{
		"Userame":  "bob",
		"Password": "123456",
	})
	//md2 := metadata.Pairs(
	//	"Username", "jack",
	//	"Password", "qaz.12345",
	//)

	// 2.生成context,有两种方式
	// 生成一个新的Context，旧Context的数据将被覆盖
	ctx := metadata.NewOutgoingContext(context.Background(), md1)
	// 追加数据
	ctx = metadata.AppendToOutgoingContext(ctx, "timestamp", strconv.FormatInt(time.Now().Unix(), 10))
	// ----------------------------------------------------------------

	// (4) 连接测试
	// 3.使用context
	_, err = client.Ping(ctx, &empty.Empty{})
	if err != nil {
		log.Fatalf("Remote Call Ping error: %v\n", err)
	}

	// (5) 发送消息
	// 4.使用context
	for i := 0; i < 10; i++ {
		message := pb.EchoRequest{Data: strconv.Itoa(i)}
		res, err := client.Say(ctx, &message)
		if err != nil {
			log.Printf("gRPC error: %v\n", err)
			continue
		}
		fmt.Println(res.Data)
	}
}
```

:::

::: details （2）修改服务端代码

```go
package main

import (
	"context"
	pb "demo/grpc_metadata_unary/proto"
	"fmt"
	"log"
	"net"

	"google.golang.org/grpc/metadata"

	"google.golang.org/protobuf/types/known/emptypb"

	"google.golang.org/grpc"
)

// 定义一个结构体, UnimplementedEchoServer必须要写
type EchoServer struct {
	pb.UnimplementedEchoServer
}

// 实现EchoServer接口方法
func (e *EchoServer) Ping(ctx context.Context, req *emptypb.Empty) (*pb.EchoResponse, error) {
	log.Println("Receive request: Ping")

	// 取出metadata
	md, ok := metadata.FromIncomingContext(ctx)
	if ok {
		for k, v := range md {
			fmt.Printf("%s: %s\n", k, v)
		}
	}
	return &pb.EchoResponse{Data: "pong"}, nil
}
func (e *EchoServer) Say(ctx context.Context, req *pb.EchoRequest) (*pb.EchoResponse, error) {
	log.Println("Receive request: ", req)
	return &pb.EchoResponse{Data: req.Data}, nil
}

func main() {
	// (1) 实例化一个gRPC Server
	server := grpc.NewServer()

	// (2) 将EchoServer注册到gRPC Server中
	pb.RegisterEchoServer(server, &EchoServer{})

	// (3) 监听一个TCP端口
	listener, err := net.Listen("tcp", "0.0.0.0:8080")
	if err != nil {
		log.Fatalf("failed to listen: %v\n", err)
	}

	// (4) 启动服务，由gRPC Server处理连接
	fmt.Printf("server listening at %s://%s\n", listener.Addr().Network(), listener.Addr().String())
	log.Fatalln(server.Serve(listener))
}
```

:::

::: details （3）服务端输出结果

```bash
D:\application\GoLand\demo\grpc_metadata_unary\server>go run main.go
server listening at tcp://[::]:8080
2022/11/24 12:53:24 Receive request: Ping
:authority: [localhost:8080]                  
content-type: [application/grpc]              
user-agent: [grpc-go/1.51.0]                  
userame: [bob]                                
password: [123456]                            
timestamp: [1669265604]
2022/11/24 12:53:24 Receive request:  data:"0"
2022/11/24 12:53:24 Receive request:  data:"1"
2022/11/24 12:53:24 Receive request:  data:"2"
2022/11/24 12:53:24 Receive request:  data:"3"
2022/11/24 12:53:24 Receive request:  data:"4"
2022/11/24 12:53:24 Receive request:  data:"5"
2022/11/24 12:53:24 Receive request:  data:"6"
2022/11/24 12:53:24 Receive request:  data:"7"
2022/11/24 12:53:24 Receive request:  data:"8"
2022/11/24 12:53:24 Receive request:  data:"9"
```

:::

<br />

#### 拦截器

**（1）一元RPC**

新建目录`grpc_interceptor_unary`，并基于**基础示例**进行修改

::: details （1）服务端拦截器

```go
package main

import (
	"context"
	pb "demo/grpc_interceptor_unary/proto"
	"fmt"
	"log"
	"net"
	"time"

	"google.golang.org/protobuf/types/known/emptypb"

	"google.golang.org/grpc"
)

// 定义一个结构体, UnimplementedEchoServer必须要写
type EchoServer struct {
	pb.UnimplementedEchoServer
}

// 实现EchoServer接口方法
func (e *EchoServer) Ping(ctx context.Context, req *emptypb.Empty) (*pb.EchoResponse, error) {
	log.Println("Receive request: Ping")
	return &pb.EchoResponse{Data: "pong"}, nil
}
func (e *EchoServer) Say(ctx context.Context, req *pb.EchoRequest) (*pb.EchoResponse, error) {
	log.Println("Receive request: ", req)
	return &pb.EchoResponse{Data: req.Data}, nil
}

func WithServerPerRequestTime() grpc.ServerOption {
	return grpc.UnaryInterceptor(func(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
		// 计算耗时，handler是真正执行的函数
		log.Printf("WithPerRequestTime Start...\n")
		start := time.Now()
		resp, err := handler(ctx, req)
		time.Sleep(time.Millisecond * 1) // handler运行的太快了,所以这里增加一点耗时
		ms := time.Since(start).Milliseconds()

		// 输出日志并返回
		log.Printf("WithPerRequestTime Return... [%d ms]\n", ms)
		return resp, err
	})
}

func main() {
	// (1) 实例化一个gRPC Server
	// grpc.NewServer可以传递可变参数，类型是 ServerOption
	// grpc.UnaryInterceptor 返回一个 ServerOption
	server := grpc.NewServer(WithServerPerRequestTime())

	// (2) 将EchoServer注册到gRPC Server中
	pb.RegisterEchoServer(server, &EchoServer{})

	// (3) 监听一个TCP端口
	listener, err := net.Listen("tcp", "0.0.0.0:8080")
	if err != nil {
		log.Fatalf("failed to listen: %v\n", err)
	}

	// (4) 启动服务，由gRPC Server处理连接
	fmt.Printf("server listening at %s://%s\n", listener.Addr().Network(), listener.Addr().String())
	log.Fatalln(server.Serve(listener))
}
```

输出结果

```bash
server listening at tcp://[::]:8080
2022/11/24 14:21:31 WithPerRequestTime Start...
2022/11/24 14:21:31 Receive request: Ping
2022/11/24 14:21:32 WithPerRequestTime Return... [14 ms]
2022/11/24 14:21:32 WithPerRequestTime Start...
2022/11/24 14:21:32 Receive request:  data:"0"
2022/11/24 14:21:32 WithPerRequestTime Return... [14 ms]
2022/11/24 14:21:32 WithPerRequestTime Start...
2022/11/24 14:21:32 Receive request:  data:"1"
2022/11/24 14:21:32 WithPerRequestTime Return... [14 ms]
2022/11/24 14:21:32 WithPerRequestTime Start...
2022/11/24 14:21:32 WithPerRequestTime Start...
2022/11/24 14:21:32 Receive request:  data:"6"
2022/11/24 14:21:32 WithPerRequestTime Return... [14 ms]
2022/11/24 14:21:32 WithPerRequestTime Start...
2022/11/24 14:21:32 Receive request:  data:"7"
2022/11/24 14:21:32 WithPerRequestTime Return... [14 ms]
2022/11/24 14:21:32 WithPerRequestTime Start...
2022/11/24 14:21:32 Receive request:  data:"8"
2022/11/24 14:21:32 WithPerRequestTime Return... [14 ms]
2022/11/24 14:21:32 WithPerRequestTime Start...
2022/11/24 14:21:32 Receive request:  data:"9"
2022/11/24 14:21:32 WithPerRequestTime Return... [14 ms]
```

:::

::: details （2）客户端拦截器

```go
package main

import (
	"context"
	pb "demo/grpc_interceptor_unary/proto"
	"fmt"
	"log"
	"strconv"

	"github.com/golang/protobuf/ptypes/empty"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func WithClientOptionToken() grpc.DialOption {
	return grpc.WithUnaryInterceptor(func(ctx context.Context, method string, req, reply interface{}, cc *grpc.ClientConn, invoker grpc.UnaryInvoker, opts ...grpc.CallOption) error {
		// 断言,修改值
		if req, ok := req.(*pb.EchoRequest); ok {
			req.Data = "[ " + req.Data + " ]"
		}

		// invoker是我们真正执行的调用
		err := invoker(ctx, method, req, reply, cc, opts...)
		return err
	})
}

func main() {
	// (1) 连接gRPC Server
	// grpc.Dial可以接收可变参数: DialOption
	// grpc.WithUnaryInterceptor() 返回一个 DialOption
	conn, err := grpc.Dial("localhost:8080",
		grpc.WithTransportCredentials(insecure.NewCredentials()),
		WithClientOptionToken(),
	)
	if err != nil {
		log.Fatalf("failed to connect echoserver: %v\n", err)
	}
	defer conn.Close()

	// (2) 实例化Client
	client := pb.NewEchoClient(conn)

	// (3) 连接测试
	_, err = client.Ping(context.Background(), &empty.Empty{})
	if err != nil {
		log.Fatalf("Remote Call Ping error: %v\n", err)
	}

	// (4) 发送消息
	for i := 0; i < 10; i++ {
		message := pb.EchoRequest{Data: strconv.Itoa(i)}
		res, err := client.Say(context.Background(), &message)
		if err != nil {
			log.Printf("gRPC error: %v\n", err)
			continue
		}
		fmt.Println(res.Data)
	}
}
```

输出结果

```bash
[ 0 ]
[ 1 ]
[ 2 ]
[ 3 ]
[ 4 ]
[ 5 ]
[ 6 ]
[ 7 ]
[ 8 ]
[ 9 ]
```

:::

<br />

#### 验证器

Github：[https://github.com/bufbuild/protoc-gen-validate](https://github.com/bufbuild/protoc-gen-validate)

**该项目目前处于alpha 阶段，推荐稳定以后再使用**

<br />

新建目录`grpc_validate`，并基于**基础示例**进行修改

::: details （1）安装 protoc-gen-validate 命令

```bash
# 下载代码
$ git clone https://github.com/bufbuild/protoc-gen-validate
$ cd protoc-gen-validate/

# 切到指定版本
$ git checkout v0.9.0

# 编译安装
$ go install .

# 它没有提供任何查看版本的选项，所以直接执行一直卡着不报错就算安装完成了
$ protoc-gen-validate
```

:::

::: details （2）下载validate.proto文件

Github：[https://github.com/bufbuild/protoc-gen-validate/tree/v0.9.0/validate](https://github.com/bufbuild/protoc-gen-validate/tree/v0.9.0/validate)

推荐放到项目目录为：`proto/validate/validate.proto`

:::

::: details （3）修改 .proto 文件

```protobuf
// 定义ProtoBuf协议版本
// 现在主流的也是最新的是proto3
syntax = "proto3";

import "google/protobuf/empty.proto";
import "validate/validate.proto";   // 修改地方1/2

// 定义ProtoBuf包名,用于Protoc内部
// 在生成的Go代码中并不会用到这个字段
package echoserver;

// 定义Go包名
// 这个值写法有很多,后面再详细讲解
option go_package = "./;echoserver";

// 定义一个Message，对应Go语言结构体，用于封装请求数据
// string: 字符串类型
// data: 变量明
// 1: 这里的1是指编号为1,并不是值为1，可以理解成data是一段数据中的第1个字段
//   在同一个message中，多个字段的编号不能重复
message EchoRequest {
  string data = 1 [(validate.rules).string.email = true];  // 修改地方2/2
}

// 用于封装响应数据
message EchoResponse {
  string data = 1;
}

// 定义一个服务,对应Go的Interface（名称为：<Service>Server）
service Echo {
  // 定义一个方法
  rpc Say (EchoRequest) returns (EchoResponse);
  // 定义Ping方法，用于测试客户端和服务端连接是否正常
  // 它没有参数，但是ProtoBuf必须要求我们传入一个参数，解决方法有两种：
  //   (1) 定义一个Empty的Message,里面什么字段都没有
  //   (2) 使用内置的Empty Message
  // 返回值是 "pong"
  rpc Ping(google.protobuf.Empty) returns (EchoResponse);
}
```

这里会飘红，但是不影响后续使用

![image-20221124181245054](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221124181245054.png)

:::

::: details （4）生成Go代码

```bash
D:\application\GoLand\demo\grpc_validate\proto>protoc --proto_path=. --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative  --validate_out="lang=go:." *.proto
```

:::

::: details （5）修改服务端代码

```go
func (e *EchoServer) Say(ctx context.Context, req *pb.EchoRequest) (*pb.EchoResponse, error) {
	log.Println("Receive request: ", req)
	// 数据校验
	if err := req.ValidateAll(); err != nil {
		log.Println(err)
		return nil, err
	}
	return &pb.EchoResponse{Data: req.Data}, nil
}
```

:::

::: details （6）查看输出日志

```bash
server listening at tcp://[::]:8080
2022/11/24 17:58:27 Receive request: Ping
2022/11/24 17:58:27 Receive request:  data:"0"
invalid EchoRequest.Data: value must be a valid email address | caused by: mail: missing '@' or angle-addr
2022/11/24 17:58:27 Receive request:  data:"1"
invalid EchoRequest.Data: value must be a valid email address | caused by: mail: missing '@' or angle-addr
2022/11/24 17:58:27 Receive request:  data:"2"
invalid EchoRequest.Data: value must be a valid email address | caused by: mail: missing '@' or angle-addr
2022/11/24 17:58:27 Receive request:  data:"3"
invalid EchoRequest.Data: value must be a valid email address | caused by: mail: missing '@' or angle-addr
2022/11/24 17:58:27 Receive request:  data:"4"
invalid EchoRequest.Data: value must be a valid email address | caused by: mail: missing '@' or angle-addr
2022/11/24 17:58:27 Receive request:  data:"5"
invalid EchoRequest.Data: value must be a valid email address | caused by: mail: missing '@' or angle-addr
2022/11/24 17:58:27 Receive request:  data:"6"
invalid EchoRequest.Data: value must be a valid email address | caused by: mail: missing '@' or angle-addr
2022/11/24 17:58:27 Receive request:  data:"7"
invalid EchoRequest.Data: value must be a valid email address | caused by: mail: missing '@' or angle-addr
2022/11/24 17:58:27 Receive request:  data:"8"
invalid EchoRequest.Data: value must be a valid email address | caused by: mail: missing '@' or angle-addr
2022/11/24 17:58:27 Receive request:  data:"9"
invalid EchoRequest.Data: value must be a valid email address | caused by: mail: missing '@' or angle-addr
```

:::

<br />

#### 状态码

文档：

* [https://github.com/grpc/grpc/blob/master/doc/statuscodes.md](https://github.com/grpc/grpc/blob/master/doc/statuscodes.md)
* [https://github.com/grpc/grpc/blob/master/doc/http-grpc-status-mapping.md](https://github.com/grpc/grpc/blob/master/doc/http-grpc-status-mapping.md)

新建目录`grpc_status`，并基于**基础示例**进行修改

::: details （1）服务端返回错误

```go
func (e *EchoServer) Say(ctx context.Context, req *pb.EchoRequest) (*pb.EchoResponse, error) {
	log.Println("Receive request: ", req)

	// 参数校验，假设这里只允许传递 0-5
	n, err := strconv.Atoi(req.Data)
	if err != nil || n < 0 || n > 5 {
		return nil, status.Error(codes.InvalidArgument, "Must be between 0 and 5")
	}

	return &pb.EchoResponse{Data: req.Data}, nil
}
```

:::

::: details （2）客户端解码错误

```go
	// (4) 发送消息
	for i := 0; i < 10; i++ {
		message := pb.EchoRequest{Data: strconv.Itoa(i)}
		res, err := client.Say(context.Background(), &message)
		if err != nil {
			// 通过error反解出status，但是并不一定能成功
			st, ok := status.FromError(err)
			if ok {
				fmt.Println("错误代码: ", st.Code())
				fmt.Println("错误消息: ", st.Message())
				continue
			}

			// 不能反解的错误
			log.Printf("gRPC error: %v\n", err)
			continue
		}
		fmt.Println(res.Data)
	}
```

:::

::: details （3）输出结果

```bash
D:\application\GoLand\demo\grpc_status\client>go run main.go
0
1                                 
2                                 
3                                 
4                                 
5                                 
错误代码:  InvalidArgument        
错误消息:  Must be between 0 and 5
错误代码:  InvalidArgument
错误消息:  Must be between 0 and 5
错误代码:  InvalidArgument
错误消息:  Must be between 0 and 5
错误代码:  InvalidArgument
错误消息:  Must be between 0 and 5
```

:::

<br />

### 简单优化

#### 超时机制

新建目录`grpc_timeout`，并基于**基础示例**进行修改

::: details （1）客户端超时机制

```go
package main

import (
	"context"
	pb "demo/grpc_unary/proto"
	"fmt"
	"log"
	"strconv"
	"time"

	"google.golang.org/grpc/codes"

	"google.golang.org/grpc/status"

	"github.com/golang/protobuf/ptypes/empty"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func main() {
	// (1) 连接gRPC Server
	conn, err := grpc.Dial("localhost:8080", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("failed to connect echoserver: %v\n", err)
	}
	defer conn.Close()

	// (2) 实例化Client
	client := pb.NewEchoClient(conn)

	// (3) 生成context
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*1)
	defer cancel()

	// (3) 连接测试
	_, err = client.Ping(ctx, &empty.Empty{})
	if err != nil {
		// 解码错误
		st, ok := status.FromError(err)
		if ok {
			if st.Code() == codes.DeadlineExceeded {
				log.Fatalf("Remote Call Ping error: timeout\n")
			}
		}
		// 未知错误
		log.Fatalf("Remote Call Ping error: %v\n", err)
	}

	// (4) 发送消息
	for i := 0; i < 10; i++ {
		message := pb.EchoRequest{Data: strconv.Itoa(i)}
		res, err := client.Say(ctx, &message)
		if err != nil {
			log.Printf("gRPC error: %v\n", err)
			continue
		}
		fmt.Println(res.Data)
	}
}
```

:::

::: details （2）服务端超时机制

```go
package main

import (
	"context"
	pb "demo/grpc_unary/proto"
	"fmt"
	"log"
	"net"
	"time"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/emptypb"

	"google.golang.org/grpc"
)

// 定义一个结构体, UnimplementedEchoServer必须要写
type EchoServer struct {
	pb.UnimplementedEchoServer
}

// 实现EchoServer接口方法
func (e *EchoServer) Ping(ctx context.Context, req *emptypb.Empty) (*pb.EchoResponse, error) {
	log.Println("Receive request: Ping")

	// 服务器处理-方式1
	for i := 0; i < 3; i++ {
		// 模拟耗时操作
		log.Println("Sleep 1 second")
		time.Sleep(time.Second)

		// 判断客户端是否已经完成
		select {
		case <-ctx.Done():
			log.Printf("EchoServer.Ping return")
			return nil, status.Error(codes.Canceled, "EchoServer.Ping canceled")
		default:
		}
	}

	// 服务器处理-方式2
	//handler := func() chan struct{} {
	//	ch := make(chan struct{})
	//	go func() {
	//		time.Sleep(time.Second * 3)
	//		ch <- struct{}{}
	//	}()
	//	return ch
	//}
	//select {
	//case <-ctx.Done():
	//	log.Printf("EchoServer.Ping return")
	//	return nil, status.Error(codes.Canceled, "EchoServer.Ping canceled")
	//case <-handler():
	//	break
	//}

	return &pb.EchoResponse{Data: "pong"}, nil
}
func (e *EchoServer) Say(ctx context.Context, req *pb.EchoRequest) (*pb.EchoResponse, error) {
	log.Println("Receive request: ", req)
	return &pb.EchoResponse{Data: req.Data}, nil
}

func main() {
	// (1) 实例化一个gRPC Server
	server := grpc.NewServer()

	// (2) 将EchoServer注册到gRPC Server中
	pb.RegisterEchoServer(server, &EchoServer{})

	// (3) 监听一个TCP端口
	listener, err := net.Listen("tcp", "0.0.0.0:8080")
	if err != nil {
		log.Fatalf("failed to listen: %v\n", err)
	}

	// (4) 启动服务，由gRPC Server处理连接
	fmt.Printf("server listening at %s://%s\n", listener.Addr().Network(), listener.Addr().String())
	log.Fatalln(server.Serve(listener))
}
```

:::

::: details （3）输出结果

```bash
server listening at tcp://[::]:8080
2022/11/25 14:41:44 Receive request: Ping
2022/11/25 14:41:44 Sleep 1 second
2022/11/25 14:41:45 EchoServer.Ping return
```

:::

<br />

#### TLS证书

新建目录`grpc_tls`，并基于**基础示例**进行修改

证书配置：

* 创建证书参考：[https://jinhui.dev/linux/shell.html#cfssl](https://jinhui.dev/linux/shell.html#cfssl)

* 将证书放到和代码同一目录中

  ![image-20221127140751508](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221127140751508.png)





**（1）单向认证**

::: details （1）修改服务端代码

```go
func main() {
    // 初始化证书配置
	credential, err := credentials.NewServerTLSFromFile("server.pem", "server-key.pem")
	if err != nil {
		log.Fatalf("failed to init tls")
	}

	// (1) 实例化一个gRPC Server
	server := grpc.NewServer(grpc.Creds(credential))
```

:::

::: details （2）修改客户端代码

```go
func main() {
    // 初始化CA配置, 用于校验服务器证书
	// 第二个参数填写证书中允许的服务器名称，可以是IP也可以是域名，取决于证书的hosts字段
	credential, err := credentials.NewClientTLSFromFile("ca.pem", "127.0.0.1")
	if err != nil {
		log.Fatalf("failed to init tls")
	}

	// (1) 连接gRPC Server
	conn, err := grpc.Dial("localhost:8080", grpc.WithTransportCredentials(credential))
```

:::

<br />

**（2）双向认证**

::: details （1）修改服务端代码

```go
func main() {
    // 初始化服务器证书配置，用于提供给客户端校验
	serverCert, err := tls.LoadX509KeyPair("server.pem", "server-key.pem")
	if err != nil {
		log.Fatalf("LoadX509KeyPair error: %v\n", err)
	}

	// 实例化CA对象,用来校验客户端证书
	caCertPool := x509.NewCertPool()
	caCert, err := os.ReadFile("ca.pem")
	if err != nil {
		log.Fatalln("failed to read ca certificates")
	}
	if !caCertPool.AppendCertsFromPEM(caCert) {
		log.Fatalln("failed to append certificates to cert poll")
	}

	// 实例化 credentials
	credential := credentials.NewTLS(&tls.Config{
		Certificates: []tls.Certificate{serverCert},  // 服务器证书
		ClientAuth:   tls.RequireAndVerifyClientCert, // 服务器认证客户端方式: 服务器必须校验客户端证书
		ClientCAs:    caCertPool,                     // 该参数用于 客户端 验证 服务端 所使用的CA机构
	})

	// (1) 实例化一个gRPC Server
	server := grpc.NewServer(grpc.Creds(credential))
```

:::

::: details （2）修改客户端代码

```go
func main() {
    // 初始化客户端证书配置，用于提供给服务端校验
	clientCert, err := tls.LoadX509KeyPair("client.pem", "client-key.pem")
	if err != nil {
		log.Fatalf("LoadX509KeyPair error: %v\n", err)
	}

	// 实例化CA对象,用来校验服务端证书
	caCertPool := x509.NewCertPool()
	caCert, err := os.ReadFile("ca.pem")
	if err != nil {
		log.Fatalln("failed to read ca certificates")
	}
	if !caCertPool.AppendCertsFromPEM(caCert) {
		log.Fatalln("failed to append certificates to cert poll")
	}

	// 实例化 credentials
	credential := credentials.NewTLS(&tls.Config{
		Certificates: []tls.Certificate{clientCert}, // 客户端证书
		ServerName:   "127.0.0.1",                   // 证书中允许的服务器名称，可以是IP也可以是域名，取决于证书的hosts字段
		RootCAs:      caCertPool,                    // 该参数用于 服务端 验证 客户端 所使用的CA机构
	})

	// (1) 连接gRPC Server
	conn, err := grpc.Dial("localhost:8080", grpc.WithTransportCredentials(credential))
```

:::

<br />

### Gateway

Github：[https://github.com/grpc-ecosystem/grpc-gateway](https://github.com/grpc-ecosystem/grpc-gateway)

`gRPC Gateway`可以为`RPC Server`暴露为一个`RESTful HTTP API`接口

新建目录`grpc_gateway`，并基于**基础示例**进行修改

::: details （1）新增YAML文件（也可以使用修改.proto文件的方式）

`grpc_gateway/proto/echoserver.pb.gw.yaml`

```yaml
type: google.api.Service
config_version: 3

http:
  rules:
    - selector: echoserver.Echo.Say # 处理函数 selector,组成: <ProtoBuf Package>.<Service>.<Function>
      get: /say # 暴露的HTTP方法和路径
    - selector: echoserver.Echo.Ping
      get: /ping
```

:::

::: details （2）生成代码

```bash
# 这会额外生成gateway的代码：echoserver.pb.gw.go
D:\application\GoLand\demo\grpc_gateway\proto> protoc --proto_path=. --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative --grpc-gateway_out=. --grpc-gateway_opt=paths=source_relative,grpc_api_configuration=echoserver.pb.gw.yaml *.proto
```

:::

::: details （3）修改服务端代码

```go
package main

import (
	"context"
	pb "demo/grpc_gateway/proto"
	"fmt"
	"log"
	"net"
	"net/http"
	"os"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/protobuf/encoding/protojson"

	"google.golang.org/protobuf/types/known/emptypb"

	"google.golang.org/grpc"
)

// 定义一个结构体, UnimplementedEchoServer必须要写
type EchoServer struct {
	pb.UnimplementedEchoServer
}

// 实现EchoServer接口方法
func (e *EchoServer) Ping(ctx context.Context, req *emptypb.Empty) (*pb.EchoResponse, error) {
	log.Println("Receive request: Ping")
	return &pb.EchoResponse{Data: "pong"}, nil
}
func (e *EchoServer) Say(ctx context.Context, req *pb.EchoRequest) (*pb.EchoResponse, error) {
	log.Println("Receive request: ", req)
	return &pb.EchoResponse{Data: req.Data}, nil
}

func gRPCServerStart() {
	// (1) 实例化一个gRPC Server
	server := grpc.NewServer()

	// (2) 将EchoServer注册到gRPC Server中
	pb.RegisterEchoServer(server, &EchoServer{})

	// (3) 监听一个TCP端口
	listener, err := net.Listen("tcp", "0.0.0.0:8080")
	if err != nil {
		log.Fatalf("failed to listen: %v\n", err)
	}

	// (4) 启动服务，由gRPC Server处理连接
	fmt.Printf("grpc server listening at %s://%s\n", listener.Addr().Network(), listener.Addr().String())
	log.Fatalln(server.Serve(listener))
}

func gRPCGatewayStart() {
	// 实例化Context
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	// 实例化Mux,注意这里的是grpc中的runtime
	mux := runtime.NewServeMux(
		// 下面这段代码用于不显示值为空的字段
		runtime.WithMarshalerOption(runtime.MIMEWildcard, &runtime.JSONPb{
			MarshalOptions: protojson.MarshalOptions{
				UseProtoNames: true,
			},
			UnmarshalOptions: protojson.UnmarshalOptions{
				DiscardUnknown: true,
			},
		}),
	)

	// 注册, 8080是gRPC Server的端口
	opt := []grpc.DialOption{grpc.WithTransportCredentials(insecure.NewCredentials())}
	err := pb.RegisterEchoHandlerFromEndpoint(ctx, mux, ":8080", opt)
	if err != nil {
		log.Fatalf("failed to listen: %v\n", err)
	}

	// 启动 HTTP Server
	fmt.Printf("grpc gateway listening at http://0.0.0.0:80\n")
	log.Fatalln(http.ListenAndServe(":80", mux))
}

func main() {
	ch := make(chan struct{})
	go func() {
		gRPCGatewayStart()
		ch <- struct{}{}
	}()
	go func() {
		gRPCServerStart()
		ch <- struct{}{}
	}()
	select {
	case <-ch:
		os.Exit(1)
	}
}
```

:::

::: details （4）测试

```bash
# 启动服务
D:\application\GoLand\demo\grpc_gateway\server>go run main.go
grpc gateway listening at http://0.0.0.0:80
grpc server listening at tcp://[::]:8080

# 测试接口
C:\Users\Administrator>curl "http://localhost/ping"
{"data":"pong"}
C:\Users\Administrator>curl "http://localhost/say?data=hello"
{"data":"hello"}
```

:::