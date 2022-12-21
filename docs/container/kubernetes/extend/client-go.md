# client-go

Github：[https://github.com/kubernetes/client-go](https://github.com/kubernetes/client-go)

文档：[https://pkg.go.dev/k8s.io/client-go](https://pkg.go.dev/k8s.io/client-go)

<br />

## 连接集群

### 安装

关于版本问题：[https://github.com/kubernetes/client-go/blob/master/INSTALL.md](https://github.com/kubernetes/client-go/blob/master/INSTALL.md)

```bash
# 这里所使用的集群为 kubernetes v1.25.4，所以安装对应版本的client-go v0.25.4
go get k8s.io/client-go@v0.25.4
```

<br />

### 客户端

总共有4种客户端：

* `RESTClient`：用于以`RESTful`方式与kubernetes进行交互
* `ClientSet`：用于方便的请求`kubernetes`内置资源
* `DiscoveryClient`：用于请求集群的API信息，如`kubectl api-versions`
* `DynamicClient`：用于请求无类型资源，如`CRD`

说明

* `RESTClient`是最基础的客户端，使用上不是太方便，但是非常灵活，其他三种客户端均是基于`RESTClient`
* `RESTClient`是我们重点学习的客户端，`ClientSet`是我们最常用的客户端
* `ClientSet`的注释中写明，代码是由`client-gen`生成的

注意：

* 实例化客户端的过程并不会向kubernetes发起连接

<br />

**ClientSet**

::: details （1）在集群外部，通过配置文件连接到kubernetes

* 将配置文件`~/.kube/config`拷贝一份到项目内改名为`.kube.config`
* 确保本机可以连接配置文件中的`server`及端口

```go
package main

import (
	"encoding/json"
	"fmt"
	"os"

	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
)

// NewClientSetByConfig 在集群外部使用配置文件进行认证
func NewClientSetByConfig(kubeconfig string) (*kubernetes.Clientset, error) {
	// 参数校验
	if _, err := os.Stat(kubeconfig); err != nil {
		return nil, fmt.Errorf("kube config file not found: %s\n", kubeconfig)
	}

	// (1) 实例化*rest.Config对象, 第一个参数是APIServer地址，我们会使用配置文件中的APIServer地址，所以这里为空就好
	resetConfig, err := clientcmd.BuildConfigFromFlags("", kubeconfig)
	if err != nil {
		return nil, err
	}

	// (2) 实例化*ClientSet对象
	clientset, err := kubernetes.NewForConfig(resetConfig)
	if err != nil {
		return nil, err
	}
	return clientset, nil
}

func main() {
	// (1) 实例化ClientSet
	clientset, err := NewClientSetByConfig(".kube.config")
	if err != nil {
		panic(err)
	}

	// (2) 查看 kubernetes 版本
	serverVersionInfo, err := clientset.ServerVersion()
	if err != nil {
		panic(err)
	}
	serverVersionJson, err := json.MarshalIndent(serverVersionInfo, "", "    ")
	if err != nil {
		panic(err)
	}
	fmt.Println(string(serverVersionJson))
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go                
{
    "major": "1",
    "minor": "25",
    "gitVersion": "v1.25.4",
    "gitCommit": "872a965c6c6526caa949f0c6ac028ef7aff3fb78",
    "gitTreeState": "clean",
    "buildDate": "2022-11-09T13:29:58Z",
    "goVersion": "go1.19.3",
    "compiler": "gc",
    "platform": "linux/amd64"
}
```

:::

::: details （2）在集群内部，通过ServiceAccount连接到kubernetes

（1）Windows上编写代码

```go
package main

import (
	"encoding/json"
	"fmt"

	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
)

// NewClientSetByServiceAccount 在集群内部使用ServiceAccount进行认证
func NewClientSetByServiceAccount() (*kubernetes.Clientset, error) {
	// (1) 实例化*rest.Config对象
	resetConfig, err := rest.InClusterConfig()
	if err != nil {
		return nil, err
	}

	// (2) 实例化*ClientSet对象
	clientset, err := kubernetes.NewForConfig(resetConfig)
	if err != nil {
		return nil, err
	}

	return clientset, nil
}

func main() {
	// (1) 实例化ClientSet
	clientset, err := NewClientSetByServiceAccount()
	if err != nil {
		panic(err)
	}

	// (2) 查看 kubernetes 版本
	serverVersionInfo, err := clientset.ServerVersion()
	if err != nil {
		panic(err)
	}
	serverVersionJson, err := json.MarshalIndent(serverVersionInfo, "", "    ")
	if err != nil {
		panic(err)
	}
	fmt.Println(string(serverVersionJson))
}
```

（2）编译为Linux amd64位程序，并上传到kubernetes

```bash
D:\application\GoLand\example>SET CGO_ENABLED=0
D:\application\GoLand\example>SET GOOS=linux
D:\application\GoLand\example>SET GOARCH=amd64
D:\application\GoLand\example>go build -o main ./main.go
```

（3）构建镜像

```dockerfile
# 查看当前目录下的文件
[root@node-1 ~]# ll
total 102916
-rw-rw-rw- 1 root root      101 Nov 28 19:33 Dockerfile
-rwxr-xr-x 1 root root 39630147 Nov 28 19:19 main

# 编写Dockerfile
[root@node-1 ~]# vim Dockerfile 
FROM alpine:3.15.4
COPY ./main /
RUN chmod 755 /main
ENTRYPOINT /main

# 构建镜像
[root@node-1 ~]# docker build -t in-cluster:v1.0.0 .
```

（4）启动一个Pod测试

```bash
[root@node-1 ~]# kubectl run demo --image=in-cluster:v1.0.0

[root@node-1 ~]# kubectl logs demo
{
    "major": "1",
    "minor": "25",
    "gitVersion": "v1.25.4",
    "gitCommit": "872a965c6c6526caa949f0c6ac028ef7aff3fb78",
    "gitTreeState": "clean",
    "buildDate": "2022-11-09T13:29:58Z",
    "goVersion": "go1.19.3",
    "compiler": "gc",
    "platform": "linux/amd64"
}

[root@node-1 ~]# kubectl delete pod demo

```

:::

<br />

**RESTClient**

::: details （1）在集群外部，通过配置文件连接到kubernetes：自定义RESTClient

```go
package main

import (
	"context"
	"fmt"
	"os"

	corev1 "k8s.io/api/core/v1"
	"k8s.io/client-go/kubernetes/scheme"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
)

// NewRestClientByConfig 在集群外部使用配置文件进行认证
func NewRestClientByConfig(kubeconfig string) (*rest.RESTClient, error) {
	// 参数校验
	if _, err := os.Stat(kubeconfig); err != nil {
		return nil, fmt.Errorf("kube config file not found: %s\n", kubeconfig)
	}

	// (1) 实例化*rest.Config对象, 第一个参数是APIServer地址，我们会使用配置文件中的APIServer地址，所以这里为空就好
	restConfig, err := clientcmd.BuildConfigFromFlags("", kubeconfig)
	if err != nil {
		return nil, err
	}

	// (2) 实例化*RESTClient对象，以下两个参数必须指定否则会报错
	restConfig.GroupVersion = &corev1.SchemeGroupVersion // 指定Group Version
	restConfig.NegotiatedSerializer = scheme.Codecs      // 指定序列化协议
	restClient, err := rest.RESTClientFor(restConfig)
	if err != nil {
		return nil, err
	}

	return restClient, nil
}

func main() {
	// (1) 实例化RESTClient
	restClient, err := NewRestClientByConfig(".kube.config")
	if err != nil {
		panic(err)
	}

	// (2) 查看 kubernetes 版本
	serverVersionInfo, err := restClient.Get().AbsPath("/version").Do(context.TODO()).Raw()
	if err != nil {
		panic(err)
	}
	fmt.Println(string(body))
}
```

输出结果

```bash
{
  "major": "1",
  "minor": "25",
  "gitVersion": "v1.25.4",
  "gitCommit": "872a965c6c6526caa949f0c6ac028ef7aff3fb78",
  "gitTreeState": "clean",
  "buildDate": "2022-11-09T13:29:58Z",
  "goVersion": "go1.19.3",
  "compiler": "gc",
  "platform": "linux/amd64"
}
```

:::

::: details （2）在集群外部，通过配置文件连接到kubernetes：使用ClientSet内部的RESTClient

```go
package main

import (
	"context"
	"fmt"
	"os"

	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
)

// NewClientSetByConfig 在集群外部使用配置文件进行认证
func NewClientSetByConfig(kubeconfig string) (*kubernetes.Clientset, error) {
	// 参数校验
	if _, err := os.Stat(kubeconfig); err != nil {
		return nil, fmt.Errorf("kube config file not found: %s\n", kubeconfig)
	}

	// (1) 实例化*rest.Config对象, 第一个参数是APIServer地址，我们会使用配置文件中的APIServer地址，所以这里为空就好
	resetConfig, err := clientcmd.BuildConfigFromFlags("", kubeconfig)
	if err != nil {
		return nil, err
	}

	// (2) 实例化*ClientSet对象
	clientset, err := kubernetes.NewForConfig(resetConfig)
	if err != nil {
		return nil, err
	}
	return clientset, nil
}

func main() {
	// (1) 实例化ClientSet
	clientset, err := NewClientSetByConfig(".kube.config")
	if err != nil {
		panic(err)
	}

	// (2) 查看 kubernetes 版本
	serverVersionInfo, err := clientset.RESTClient().Get().AbsPath("/version").Do(context.TODO()).Raw()
	if err != nil {
		panic(err)
	}
	fmt.Println(string(serverVersionInfo))
}
```

输出结果

```bash
{
  "major": "1",
  "minor": "25",
  "gitVersion": "v1.25.4",
  "gitCommit": "872a965c6c6526caa949f0c6ac028ef7aff3fb78",
  "gitTreeState": "clean",
  "buildDate": "2022-11-09T13:29:58Z",
  "goVersion": "go1.19.3",
  "compiler": "gc",
  "platform": "linux/amd64"
}
```

:::

<br />

### 超时问题

默认情况下是没有超时限制的，但是在我的测试中看起来像是有超时的，下面来模拟一下

::: details （1）模拟默认的"超时"

```go
package main

import (
	"encoding/json"
	"fmt"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
	"os"
	"time"
)

// NewClientSetByConfig 在集群外部使用配置文件进行认证
func NewClientSetByConfig(kubeconfig string) (*kubernetes.Clientset, error) {
	// 参数校验
	if _, err := os.Stat(kubeconfig); err != nil {
		return nil, fmt.Errorf("kube config file not found: %s\n", kubeconfig)
	}

	// (1) 实例化*rest.Config对象, 第一个参数是APIServer地址，我们会使用配置文件中的APIServer地址，所以这里为空就好
	resetConfig, err := clientcmd.BuildConfigFromFlags("", kubeconfig)
	if err != nil {
		return nil, err
	}

	// (2) 实例化*ClientSet对象
	clientset, err := kubernetes.NewForConfig(resetConfig)
	if err != nil {
		return nil, err
	}
	return clientset, nil
}

// GetServerVersion 以格式化的JSON字符串返回kubernetes版本
func GetServerVersion(clientset *kubernetes.Clientset) (string, error) {
	serverVersionInfo, err := clientset.ServerVersion()
	if err != nil {
		return "", err
	}
	serverVersionJson, err := json.MarshalIndent(serverVersionInfo, "", "    ")
	if err != nil {
		return "", err
	}
	return string(serverVersionJson), nil
}

func main() {
	// (1) 实例化ClientSet
	clientset, err := NewClientSetByConfig(".kube.config")
	if err != nil {
		panic(err)
	}

	// (2) 查看 kubernetes 版本
	startTime := time.Now()
	versionInfo, err := GetServerVersion(clientset)
	fmt.Printf("Used %.2f seconds\n", time.Now().Sub(startTime).Seconds())
	if err != nil {
		panic(err)
	}
	fmt.Println(versionInfo)
}
```

先看一下正常的输出结果

```bash
D:\application\GoLand\example>go run main.go
Used 0.01 seconds
{
    "major": "1",
    "minor": "25",
    "gitVersion": "v1.25.4",
    "gitCommit": "872a965c6c6526caa949f0c6ac028ef7aff3fb78",
    "gitTreeState": "clean",
    "buildDate": "2022-11-09T13:29:58Z",
    "goVersion": "go1.19.3",
    "compiler": "gc",
    "platform": "linux/amd64"
}
```

然后将客户端连接kubernetes的端口改一下，让他连接不到，看一下会不会超时

```bash
# 将.kube.config中APIServer端口随便改成一个不存在的端口
server: https://api.k8s.local:64430

# 再执行脚本看一下效果，2秒钟返回了
D:\application\GoLand\example>go run main.go
Used 2.05 seconds
panic: Get "https://api.k8s.local:64430/version": dial tcp 192.168.48.151:64430: connectex: No connection could be made because the target machine actively refused it.

goroutine 1 [running]:
main.main()
        D:/application/GoLand/example/main.go:58 +0x1b4

# 默认的超时是2秒钟吗？我决定再做一个测试
# -----------------------------------------------------------------------------------------------------

# 先在服务器上监听64430端口
[root@node-1 ~]# ncat -lvp 64430
Ncat: Version 7.50 ( https://nmap.org/ncat )
Ncat: Listening on :::64430
Ncat: Listening on 0.0.0.0:64430

# 再执行脚本，超时又变成10秒钟了？
D:\application\GoLand\example>go run main.go
Used 10.01 seconds
panic: Get "https://api.k8s.local:64430/version": net/http: TLS handshake timeout

goroutine 1 [running]:                                                           
main.main()                                                                      
        D:/application/GoLand/example/main.go:58 +0x1b4                          
exit status 2

# -----------------------------------------------------------------------------------------------------

# 从代码中查一下关于超时的设置
# 在 reset.Config结构体中关于超时的说明，这样看起来应该是没有超时才对，程序应该会一直卡着才对，但是缺看起来像是有超时，这是怎么回事呢？
// The maximum length of time to wait before giving up on a server request. A value of zero means no timeout.
Timeout time.Duration

# 看上面的报错 
#   No connection could be made because the target machine actively refused it.  
#   这是服务器主动拒绝了连接，本质上是服务器返回了结果，客户端又设置的永不超时
# 
#   net/http: TLS handshake timeout
#   这是TLS握手超时了

# -----------------------------------------------------------------------------------------------------

# 于是，我准备进行下一步测试
# 思路就是开启一个HTTPs Server，然后再Handler中休眠一段时间，客户端应该就会一直卡着。服务器休眠多久客户端应该就会卡多久
[root@node-1 ~]# cat test.go 
package main

import (
        "fmt"
        "log"
        "net/http"
        "time"
)

// 处理器
func versionHandler(w http.ResponseWriter, req *http.Request) {
        time.Sleep(time.Second * 60)
}

func main() {
        // 监听地址
        addr := "0.0.0.0:64430"

        // 注册路由
        http.HandleFunc("/version", versionHandler)

        // 启动服务,证书文件根据实际情况修改
        fmt.Println("* Running on https://" + addr)
        log.Fatal(http.ListenAndServeTLS(addr, "/etc/kubernetes/pki/apiserver.crt", "/etc/kubernetes/pki/apiserver.key", nil))
}

[root@node-1 ~]# go run test.go
* Running on https://0.0.0.0:64430

D:\application\GoLand\example>go run main.go
Used 60.05 seconds
panic: unable to parse the server version: unexpected end of JSON input

goroutine 1 [running]:
main.main()
        D:/application/GoLand/example/main.go:58 +0x1b4
exit status 2

# 结论
# 1.默认是没有超时的
# 2.看起来像是有超时，本质上是发生了错误，比如服务器拒绝连接、TLS握手失败等
```

:::

::: details （2）设置超时时间

超时设置可以分为两种：

* 设置全局的超时时间，对所有请求有效
* 设置单个请求的超时时间

```bash
package main

import (
	"context"
	"encoding/json"
	"fmt"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
	"os"
	"time"
)

// NewClientSetByConfig 在集群外部使用配置文件进行认证
func NewClientSetByConfig(kubeconfig string) (*kubernetes.Clientset, error) {
	// 参数校验
	if _, err := os.Stat(kubeconfig); err != nil {
		return nil, fmt.Errorf("kube config file not found: %s\n", kubeconfig)
	}

	// (1) 实例化*rest.Config对象, 第一个参数是APIServer地址，我们会使用配置文件中的APIServer地址，所以这里为空就好
	resetConfig, err := clientcmd.BuildConfigFromFlags("", kubeconfig)
	if err != nil {
		return nil, err
	}

	// (2) 修改*reset.Config配置
	resetConfig.Timeout = time.Second * 30 // 全局超时时间设置为30秒

	// (3) 实例化*ClientSet对象
	clientset, err := kubernetes.NewForConfig(resetConfig)
	if err != nil {
		return nil, err
	}
	return clientset, nil
}

// GetServerVersion 以格式化的JSON字符串返回kubernetes版本
func GetServerVersion(clientset *kubernetes.Clientset) (string, error) {
	serverVersionInfo, err := clientset.ServerVersion()
	if err != nil {
		return "", err
	}
	serverVersionJson, err := json.MarshalIndent(serverVersionInfo, "", "    ")
	if err != nil {
		return "", err
	}
	return string(serverVersionJson), nil
}

func main() {
	// (1) 实例化ClientSet
	clientset, err := NewClientSetByConfig(".kube.config")
	if err != nil {
		panic(err)
	}

	// (2) 查看 kubernetes 版本, clientset.ServerVersion()并没有让我们传递context的参数，所以这里使用的是全局超时参数
	{
		startTime := time.Now()
		versionInfo, err := GetServerVersion(clientset)
		fmt.Printf("Used %.2f seconds\n", time.Now().Sub(startTime).Seconds())
		if err != nil {
			fmt.Println("Error:", err)
		} else {
			fmt.Println(versionInfo)
		}
	}

	// (3) 获取所有的Namespace,这里可以对某个请求设置单独的请求超时时间
	{
	    fmt.Println()
		startTime := time.Now()
		ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
		defer cancel()
		namespaceList, err := clientset.CoreV1().Namespaces().List(ctx, metav1.ListOptions{})
		fmt.Printf("Used %.2f seconds\n", time.Now().Sub(startTime).Seconds())
		if err != nil {
			fmt.Println("Error:", err)
		} else {
			for _, namespace := range namespaceList.Items {
				fmt.Println(namespace.Name)
			}
		}
	}
}
```

HTTPS Server也要添加一下对应的路由

```go
[root@node-1 ~]# cat test.go
package main

import (
        "fmt"
        "log"
        "net/http"
        "time"
)

// 处理器
func versionHandler(w http.ResponseWriter, req *http.Request) {
        time.Sleep(time.Second * 60)
}
func namespaceHandler(w http.ResponseWriter, req *http.Request) {
        time.Sleep(time.Second * 60)
}

func main() {
        // 监听地址
        addr := "0.0.0.0:64430"

        // 注册路由
        http.HandleFunc("/version", versionHandler)
        http.HandleFunc("/api/v1/namespaces", namespaceHandler)

        // 启动服务
        fmt.Println("* Running on https://" + addr)
        log.Fatal(http.ListenAndServeTLS(addr, "/etc/kubernetes/pki/apiserver.crt", "/etc/kubernetes/pki/apiserver.key", nil))
}
```

看一下效果

```bash
D:\application\GoLand\example>go run main.go
Used 30.02 seconds
Error: Get "https://api.k8s.local:64430/version?timeout=30s": context deadline exceeded

Used 5.01 seconds
Error: Get "https://api.k8s.local:64430/api/v1/namespaces": context deadline exceeded
```

:::

<br />

## 基础操作

<br />

### 导入速查

`client-go`子模块众多，所以整理了此表格方便复制粘贴

| 分类     | 导入代码                                                     | 常用对象                                     |
| -------- | ------------------------------------------------------------ | -------------------------------------------- |
| 内置对象 | `corev1 "k8s.io/api/core/v1"`                                | `Namespace`、`Pod`、`Service`...             |
|          | `appsv1 "k8s.io/api/apps/v1"`                                | `Deployment`                                 |
| 选项     | `metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"`              | `ListOptions`、`CreateOptions`、`XxxOptions` |
| 配置     | `applycorev1 "k8s.io/client-go/applyconfigurations/core/v1"` | `XxxApplyConfiguration`                      |
|          | `applymetav1 "k8s.io/client-go/applyconfigurations/meta/v1"` | `ObjectMetaApplyConfiguration`               |
| 工具     | `yamlutil "k8s.io/apimachinery/pkg/util/yaml"`               | `NewYAMLOrJSONDecoder`                       |

<br />

当我们不知道某个对象在哪个模块时，可以通过如下方式查询

```bash
# apps/v1 即 "k8s.io/api/apps/v1"
[root@node-1 ~]# kubectl api-resources | grep -Ei 'APIVERSION|deployment'
NAME                              SHORTNAMES   APIVERSION                             NAMESPACED   KIND
deployments                       deploy       apps/v1                                true         Deployment

# v1 即 "k8s.io/api/core/v1"
[root@node-1 ~]# kubectl api-resources | grep -Ei 'APIVERSION|namespace'
NAME                              SHORTNAMES   APIVERSION                             NAMESPACED   KIND
namespaces                        ns           v1                                     false        Namespace
```

<br />

### 增删改查

::: details （1）基础的增删改查：List、Get、Create、Update、Delete

```go
package main

import (
	"context"
	"fmt"
	corev1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
	"log"
	"os"
)

// NewClientSetByConfig 在集群外部使用配置文件进行认证
func NewClientSetByConfig(kubeconfig string) (*kubernetes.Clientset, error) {
	// 参数校验
	if _, err := os.Stat(kubeconfig); err != nil {
		return nil, fmt.Errorf("kube config file not found: %s\n", kubeconfig)
	}

	// (1) 实例化*rest.Config对象, 第一个参数是APIServer地址，我们会使用配置文件中的APIServer地址，所以这里为空就好
	resetConfig, err := clientcmd.BuildConfigFromFlags("", kubeconfig)
	if err != nil {
		return nil, err
	}

	// (2) 实例化*ClientSet对象
	clientset, err := kubernetes.NewForConfig(resetConfig)
	if err != nil {
		return nil, err
	}
	return clientset, nil
}

func main() {
	// 实例化ClientSet
	clientset, err := NewClientSetByConfig(".kube.config")
	if err != nil {
		panic(err)
	}

	// 初始化一个全局的Context
	ctx := context.Background()

	// (1) 输出所有的Namespace
	{
		log.Println("Namespace.List: ")
		namespaceList, err := clientset.CoreV1().Namespaces().List(ctx, metav1.ListOptions{})
		if err != nil {
			log.Fatalf("  %v\n", err)
		}
		for _, namespace := range namespaceList.Items {
			log.Printf("  %s\n", namespace.Name)
		}
	}

	// (2) 获取某个Namespace
	{
		log.Println("Namespace.Get: ")
		name := "kube-system"
		namespace, err := clientset.CoreV1().Namespaces().Get(ctx, name, metav1.GetOptions{})
		if err != nil {
			if errors.IsNotFound(err) {
				log.Printf("  %s: %t\n", name, false)
			} else {
				log.Fatalf("  %v\n", err)
			}
		} else {
			log.Printf("  %s: %t\n", namespace.Name, true)
		}
	}

	// (3) 创建一个Namespace
	{
		log.Println("Namespace.Create: ")
		namespace := corev1.Namespace{ObjectMeta: metav1.ObjectMeta{Name: "test"}}
		newNamespace, err := clientset.CoreV1().Namespaces().Create(ctx, &namespace, metav1.CreateOptions{})
		if err != nil {
			if errors.IsAlreadyExists(err) {
				log.Printf("  %s: already exists\n", namespace.Name)
			} else {
				log.Printf("  %s: %v\n", namespace.Name, err)
			}
		} else {
			log.Printf("  %s: ok\n", newNamespace.Name)
		}
	}

	// (4) 全量更新一个Namespace
	{
		log.Println("Namespace.Update: ")
		// 获取，这里为了省事直接生成一个对象
		namespace := corev1.Namespace{ObjectMeta: metav1.ObjectMeta{Name: "test"}}
		// 修改
		namespace.Labels = map[string]string{"a": "b"}
		// 更新
		newNamespace, err := clientset.CoreV1().Namespaces().Update(ctx, &namespace, metav1.UpdateOptions{})
		if err != nil {
			log.Printf("  %s: %v\n", namespace, err)
		} else {
			log.Printf("  %s: ok\n", newNamespace.Name)
		}
	}

	// (5) 删除一个Namespace
	{
		log.Println("Namespace.Delete: ")
		name := "test"
		err := clientset.CoreV1().Namespaces().Delete(ctx, name, metav1.DeleteOptions{})
		if err != nil {
			if errors.IsNotFound(err) {
				log.Printf("  %s: already deleted\n", name)
			} else {
				log.Printf("  %s: %v\n", name, err)
			}
		} else {
			log.Printf("  %s: ok\n", name)
		}
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
2022/12/18 15:18:07 Namespace.List: 
2022/12/18 15:18:07   default        
2022/12/18 15:18:07   kube-node-lease
2022/12/18 15:18:07   kube-public    
2022/12/18 15:18:07   kube-system    
2022/12/18 15:18:07 Namespace.Get:   
2022/12/18 15:18:07   kube-system: true
2022/12/18 15:18:07 Namespace.Create:  
2022/12/18 15:18:07   test: ok         
2022/12/18 15:18:07 Namespace.Update:  
2022/12/18 15:18:07   test: ok        
2022/12/18 15:18:07 Namespace.Delete: 
2022/12/18 15:18:07   test: ok
```

:::

::: details （2）基础的增删改查：List会一次性返回全部数据吗？

1.我们先写一段代码用来创建3万个Namespace

```go
package main

import (
	"context"
	"fmt"
	corev1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
	"log"
	"os"
	"runtime"
	"strconv"
	"sync"
	"time"
)

// NewClientSetByConfig 在集群外部使用配置文件进行认证
func NewClientSetByConfig(kubeconfig string) (*kubernetes.Clientset, error) {
	// 参数校验
	if _, err := os.Stat(kubeconfig); err != nil {
		return nil, fmt.Errorf("kube config file not found: %s\n", kubeconfig)
	}

	// (1) 实例化*rest.Config对象, 第一个参数是APIServer地址，我们会使用配置文件中的APIServer地址，所以这里为空就好
	resetConfig, err := clientcmd.BuildConfigFromFlags("", kubeconfig)
	if err != nil {
		return nil, err
	}

	// (2) 修改默认配置
	resetConfig.QPS = float32(runtime.NumCPU() * 2) // default 5
	resetConfig.Burst = runtime.NumCPU() * 4        // default 10

	// (3) 实例化*ClientSet对象
	clientset, err := kubernetes.NewForConfig(resetConfig)
	if err != nil {
		return nil, err
	}
	return clientset, nil
}

// CreateNamespaces 创建Namespace
//
//	prefix指定名称前缀
//	start指定开始编号
//	stop 指定结束编号
func CreateNamespaces(ctx context.Context, clientset *kubernetes.Clientset, prefix string, start int, stop int) {
	// 初始化变量
	startTime := time.Now()
	wg := sync.WaitGroup{}
	namesCh := make(chan string)
	success, failed := 0, 0

	// 生产者
	wg.Add(1)
	go func() {
		// 计算一个合适的宽度(编号前自动补0)，方便kubectl get ns时自动排序
		width := len(strconv.Itoa(stop))
		for i := start; i <= stop; i++ {
			name := strconv.Itoa(i)
			for len(name) < width {
				name = "0" + name
			}
			// 向channel中传递name
			namesCh <- prefix + name
		}
		close(namesCh)
		wg.Done()
	}()

	// 消费者
	for i := 0; i < runtime.NumCPU(); i++ {
		wg.Add(1)
		go func() {
			for name := range namesCh {
				namespace := corev1.Namespace{ObjectMeta: metav1.ObjectMeta{Name: name}}
				newNamespace, err := clientset.CoreV1().Namespaces().Create(ctx, &namespace, metav1.CreateOptions{})
				if err != nil {
					if errors.IsAlreadyExists(err) {
						log.Printf("  %s: already exists\n", namespace.Name)
						success += 1
					} else {
						log.Printf("  %s: %v\n", namespace.Name, err)
						failed += 1
					}
				} else {
					log.Printf("  %s: success\n", newNamespace.Name)
					success += 1
				}
				// 执行太快会报错，所以休眠1秒
				time.Sleep(time.Second)
			}
			wg.Done()
		}()
	}

	wg.Wait()
	log.Printf("Create %d namespaces, used %.2f seconds, success %d, failed %d\n", stop-start, time.Since(startTime).Seconds(), success, failed)
}

func main() {
	// 实例化ClientSet
	clientset, err := NewClientSetByConfig(".kube.config")
	if err != nil {
		panic(err)
	}

	// 初始化一个全局的Context
	ctx := context.Background()

	// 创建3,0000个Namespace
	CreateNamespaces(ctx, clientset, "test", 1, 30000)
}
```

输出结果

```bash
# 等待补充
```

2.`kubectl get ns`会不会返回全部数据

```bash
[root@node-1 ~]# time kubectl get ns | grep -E '^test[0-9]+' | wc -l
30000

real    0m12.170s
user    0m2.807s
sys     0m1.053s

# 这个执行时间有点久，可以优化一下吗？
# 查看帮助 kubectl get ns --help，发现有个默认参数 --chunk-size=500，尝试将他调大一点

[root@node-1 ~]# time kubectl get ns --chunk-size=30000 | grep -E '^test[0-9]+' | wc -l
30000

real    0m3.320s
user    0m2.167s
sys     0m0.770s
```

3.client-go `List`会不会返回全部数据

```go
	// 创建3,0000个Namespace
	// CreateNamespaces(ctx, clientset, "test", 1, 30000)

	// 检查Namespace个数
	startTime := time.Now()
	namespaceList, err := clientset.CoreV1().Namespaces().List(ctx, metav1.ListOptions{})
	if err != nil {
		panic(err)
	}
	log.Printf("List %d namespaces, used %.2f seconds\n", len(namespaceList.Items), time.Since(startTime).Seconds())
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
2022/12/18 20:17:14 List 30004 namespaces, used 1.02 seconds

# 确实是全部输出出来了，多出来的4个是default、kube-system等空间
```

3.client-go `List`有个`Limit`参数，用于限制返回的数量。同时返回值中还会有一个`Continue`字段，可以拿这个值获取下一次的值。这就达到了分页的效果

`kubectl get ns --chunk-size=500`实际上设置的就是`Limit`值为500

```go
	// 创建3,0000个Namespace
	// CreateNamespaces(ctx, clientset, "test", 1, 30000)

	// 检查Namespace个数
	startTime := time.Now()
	total := 0
	token := ""
	for {
		namespaceList, err := clientset.CoreV1().Namespaces().List(ctx, metav1.ListOptions{
			Limit:    100,
			Continue: token,
		})
		if err != nil {
			panic(err)
		}
		total += len(namespaceList.Items)
		if namespaceList.Continue != "" {
			token = namespaceList.Continue
		} else {
			break
		}
	}
	log.Printf("List %d namespaces, used %.2f seconds\n", total, time.Since(startTime).Seconds())
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
2022/12/18 20:29:06 List 30004 namespaces, used 16.82 seconds
```

4.结论：

`List`会一次返回所有数据，但是我们也可以采用`Limit + Continue`方式达到分页的效果

:::

::: details （3）基础的增删改查：Patch

`Patch `用来增量对象进行更新，此函数比较复杂，仅做了解

* 不需要提前获取namespace，只需要给出name即可更新，当然前提是namespace必须存在，否则会报错
* 它还要传递一个Type，可选值有：
  * `JSONPatchType`
  * `MergePatchType`
  * `StrategicMergePatchType`
  * `ApplyPatchType`
* kubectl patch默认使用的是 `StrategicMergePatchType`

**（1）JSONPatchType**

RFC6902协议：[https://www.rfc-editor.org/rfc/rfc6902](https://www.rfc-editor.org/rfc/rfc6902)

```go
	// JSONPatchType
	// op: 表示对资源对象的操作，主要有以下六种操作
	//   add
	//   replace
	//   remove
	//   move
	//   copy
	//   test
	// path: 表示被作资源对象的路径。例如/spec/containers/0/image表示要操作的对象是“spec.containers[0].image”
	// value: 表示预修改的值
	name := "test"
	patch := `[{
		"op": "add",
    	"path": "/metadata/labels/a",
    	"value": "c"
	}]`
	newNamespace, err := clientset.CoreV1().Namespaces().Patch(ctx, name, types.JSONPatchType, []byte(patch), metav1.PatchOptions{})
	if err != nil {
		log.Printf("Patch namespace failed: %s: %v\n", name, err)
	} else {
		log.Printf("Patch namespace success: %s\n", newNamespace.Name)
	}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
2022/12/18 22:10:52 Patch namespace success: test

[root@node-1 ~]# kubectl get ns test -o yaml
apiVersion: v1
kind: Namespace
metadata:
  creationTimestamp: "2022-12-18T13:47:58Z"
  labels:
    a: c
    kubernetes.io/metadata.name: test
  name: test
  resourceVersion: "891641"
  uid: 0e57ab7b-5901-4a51-8e4a-a91306eee619
spec:
  finalizers:
  - kubernetes
status:
  phase: Active
```

**（2）MergePatchType**

RFC7386协议：[https://www.rfc-editor.org/rfc/rfc7386](https://www.rfc-editor.org/rfc/rfc7386)

```go
	// MergePatchType
	// 1.若要删除一个key，需要将值设置为null。同时这也意味着想要为某个key设置值为null是不可能的
	// 2.如果想要修改数组，那么必须将完整的数组传递过去，即使只修改了一小部分
	name := "test"
	patch := `{"metadata":{"labels":{"a":"f"}}}`
	newNamespace, err := clientset.CoreV1().Namespaces().Patch(ctx, name, types.MergePatchType, []byte(patch), metav1.PatchOptions{})
	if err != nil {
		log.Printf("Patch namespace failed: %s: %v\n", name, err)
	} else {
		log.Printf("Patch namespace success: %s\n", newNamespace.Name)
	}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
2022/12/19 15:41:14 Patch namespace success: test

[root@node-1 ~]# kubectl get ns test -o yaml
apiVersion: v1
kind: Namespace
metadata:
  creationTimestamp: "2022-12-18T13:47:58Z"
  labels:
    a: f
    kubernetes.io/metadata.name: test
  name: test
  resourceVersion: "895914"
  uid: 0e57ab7b-5901-4a51-8e4a-a91306eee619
spec:
  finalizers:
  - kubernetes
status:
  phase: Active
```

:::

::: details （4）基础的增删改查：Apply

```go
import (
	applycorev1 "k8s.io/client-go/applyconfigurations/core/v1"
	applymetav1 "k8s.io/client-go/applyconfigurations/meta/v1"
)

func stringPtr(s string) *string {
	return &s
}

    // Apply：创建或更新
	// 1.Apply和Get、Update、Delete等不同，它需要传递一个xxApplyConfiguration对象
	// 2.还必须传递一个FieldManager的选项
	//   1) fieldManager字段用于跟踪哪个控制器负责本资源
	//   2) fieldManager字段通常设置为控制器的名称
	name := "test"
	namespace := applycorev1.NamespaceApplyConfiguration{
		TypeMetaApplyConfiguration: applymetav1.TypeMetaApplyConfiguration{
			Kind:       stringPtr("Namespace"),
			APIVersion: stringPtr("v1"),
		},
		ObjectMetaApplyConfiguration: &applymetav1.ObjectMetaApplyConfiguration{
			Name: &name,
		},
	}
	newNamespace, err := clientset.CoreV1().Namespaces().Apply(ctx, &namespace, metav1.ApplyOptions{FieldManager: "client-go"})
	if err != nil {
		log.Printf("Apply namespace failed: %s: %v\n", name, err)
	} else {
		log.Printf("Apply namespace success: %s\n", newNamespace.Name)
	}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
2022/12/19 16:57:19 Apply namespace success: test
```

:::

<br />

### 读取YAML

::: details （1）读取本地YAML文件，并创建（Create）对应的资源

`demo.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo
  #namespace: default
  labels:
    a: b
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: web
          image: nginx:1.23.2
          command: [ 'nginx', '-g', 'daemon off;' ]
        - name: busybox
          image: busybox:1.28
          command: [ 'sh', '-c', 'echo The app is running! && sleep 3600' ]
```

`main.go`

```go
package main

import (
	"bytes"
	"context"
	"fmt"
	appsv1 "k8s.io/api/apps/v1"
	"k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	yamlutil "k8s.io/apimachinery/pkg/util/yaml"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
	"log"
	"os"
	"runtime"
	"strings"
)

// NewClientSetByConfig 在集群外部使用配置文件进行认证
func NewClientSetByConfig(kubeconfig string) (*kubernetes.Clientset, error) {
	// 参数校验
	if _, err := os.Stat(kubeconfig); err != nil {
		return nil, fmt.Errorf("kube config file not found: %s\n", kubeconfig)
	}

	// (1) 实例化*rest.Config对象, 第一个参数是APIServer地址，我们会使用配置文件中的APIServer地址，所以这里为空就好
	resetConfig, err := clientcmd.BuildConfigFromFlags("", kubeconfig)
	if err != nil {
		return nil, err
	}

	// (2) 修改默认配置
	resetConfig.QPS = float32(runtime.NumCPU() * 2) // default 5
	resetConfig.Burst = runtime.NumCPU() * 4        // default 10

	// (3) 实例化*ClientSet对象
	clientset, err := kubernetes.NewForConfig(resetConfig)
	if err != nil {
		return nil, err
	}
	return clientset, nil
}

func main() {
	// 实例化ClientSet
	clientset, err := NewClientSetByConfig(".kube.config")
	if err != nil {
		panic(err)
	}

	// 初始化一个全局的Context
	ctx := context.Background()

	// 1.读取本地YAML文件并生成decoder对象
	yamlBytes, err := os.ReadFile("demo.yaml")
	if err != nil {
		panic(err)
	}
	decoder := yamlutil.NewYAMLOrJSONDecoder(bytes.NewReader(yamlBytes), 512)

	// 2.解码为 Deployment
	deploy := &appsv1.Deployment{}
	if err := decoder.Decode(deploy); err != nil {
		panic(err)
	}

	// 3.添加默认参数
	if strings.TrimSpace(deploy.Namespace) == "" {
		deploy.Namespace = "default"
	}

	// 4.创建Deployment
	newDeploy, err := clientset.AppsV1().Deployments(deploy.Namespace).Create(ctx, deploy, metav1.CreateOptions{})
	if err == nil {
		log.Printf("Deployment创建成功: %s\n", newDeploy.Name)
	} else if errors.IsAlreadyExists(err) {
		log.Printf("Deployment已经存在: %s\n", deploy.Name)
	} else {
		log.Printf("Deployment创建失败: %v\n", err)
	}
}
```

分析：这段代码可以跑，但是还有很大的优化空间：

* YAML中应当支持任意内置资源类型，比如`Deployment`、`Service`等
* YAML中应当同时支持操作多种资源，比如`Deployment`和`Service`，使用`---`分隔
* 程序只具备`Create`能力，我希望它能支持最常用的`Apply`和`Delete`

:::

::: details （2）优化我们的程序：支持多种资源、多种方法且返回值尽量与kubectl保持一致

思路：

* 关键在于`NewYAMLOrJSONDecoder`对象的`Decode`方法
  * 它可以解码任何对象，只要YAML或JSON格式没有错误就不会报错
  * 它是流式的，即解码一次后再次解码会从上次的位置继续往下走，并不是解码整个文件内容，而是以`---`作为一次解码
  * 综上所述
    * （1）在使用`Decode`方法前我们要知道应该要解码为什么对象
    * （2）流式的特性可以让我们的YAML文件支持多个资源配置
* 为了能尽量和`kubectl`保持一致，这里使用了`cobra`作为命令行参数解析库，并且针对错误内容进行了特殊处理
* 关于输出：
  * 正确的信息会按顺序输出，错误信息总是出现在最后的行
  * 所以思路是：遇到正确的信息直接输出；错误信息存起来放到最后面输出，同时注意退出码设置、输出到`stdout`还是`stderr`的问题
* 这里并没有参考`kubectl`源码，所以可能还有优化的空间，以后再说

`demo.yaml`

```yaml
apiVersion: v1
kind: Service
metadata:
  name: demo
  #namespace: default
spec:
  selector:
    app: web
  type: ClusterIP
  ports:
    - name: http
      protocol: TCP
      port: 80
      targetPort: 80
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo
  #namespace: default
  labels:
    a: b
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: web
          image: nginx:1.23.2
          command: [ 'nginx', '-g', 'daemon off;' ]
        - name: busybox
          image: busybox:1.28
          command: [ 'sh', '-c', 'echo The app is running! && sleep 3600' ]
```

`main.go`

```go
package main

import (
	"bytes"
	"context"
	"fmt"
	"github.com/spf13/cobra"
	"io"
	"k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	yamlutil "k8s.io/apimachinery/pkg/util/yaml"
	applyappsv1 "k8s.io/client-go/applyconfigurations/apps/v1"
	applycorev1 "k8s.io/client-go/applyconfigurations/core/v1"
	applymetav1 "k8s.io/client-go/applyconfigurations/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
	"os"
	"reflect"
	"runtime"
	"strings"
)

// Command 定义子命令
type Command string

func (s Command) String() string {
	return string(s)
}

const (
	RootCommand   Command = "kubectl"
	ApplyCommand  Command = "apply"
	DeleteCommand Command = "delete"
)

// Status 定义执行状态
type Status string

const (
	Created    Status = "created"
	Configured Status = "configured"
	Unchanged  Status = "unchanged"
	Deleted    Status = "deleted"
)

// NewClientSetByConfig 在集群外部使用配置文件进行认证
func NewClientSetByConfig(kubeconfig string) (*kubernetes.Clientset, error) {
	// 参数校验
	if _, err := os.Stat(kubeconfig); err != nil {
		return nil, fmt.Errorf("kube config file not found: %s\n", kubeconfig)
	}

	// (1) 实例化*rest.Config对象, 第一个参数是APIServer地址，我们会使用配置文件中的APIServer地址，所以这里为空就好
	resetConfig, err := clientcmd.BuildConfigFromFlags("", kubeconfig)
	if err != nil {
		return nil, err
	}

	// (2) 修改默认配置
	resetConfig.QPS = float32(runtime.NumCPU() * 2) // default 5
	resetConfig.Burst = runtime.NumCPU() * 4        // default 10

	// (3) 实例化*ClientSet对象
	clientset, err := kubernetes.NewForConfig(resetConfig)
	if err != nil {
		return nil, err
	}
	return clientset, nil
}

// GetKindList 从YAML文件中提取出所有的 Kind
func GetKindList(data []byte) ([]string, error) {
	var kindList []string
	buffer := bytes.NewBuffer(data)
	for {
		line, err := buffer.ReadString('\n')
		if err == io.EOF {
			break
		} else if err != nil {
			return nil, err
		}
		if strings.HasPrefix(line, "kind") {
			kind := strings.TrimSpace(strings.Trim(strings.Split(line, ":")[1], "\n"))
			kindList = append(kindList, kind)
		}
	}
	return kindList, nil
}

// Deployment 定义 Deployment 结构体
type Deployment struct {
	clientset *kubernetes.Clientset
}

func (d *Deployment) Decode(decoder *yamlutil.YAMLOrJSONDecoder) (*applyappsv1.DeploymentApplyConfiguration, error) {
	// 初始化deploy，并设置默认参数
	applyConfig := &applyappsv1.DeploymentApplyConfiguration{
		ObjectMetaApplyConfiguration: &applymetav1.ObjectMetaApplyConfiguration{
			Namespace: func() *string { namespace := "default"; return &namespace }(),
		},
	}

	// 解码
	err := decoder.Decode(applyConfig)
	if err != nil {
		return nil, err
	}

	return applyConfig, nil
}

func (d *Deployment) Apply(ctx context.Context, config *applyappsv1.DeploymentApplyConfiguration) (Status, error) {
	// 初始化状态
	var status Status

	// 从ApplyConfig中获取需要的配置
	namespace := *(config.Namespace)
	name := *(config.Name)

	// 提前获取一次Deployment，用于与Apply之后做对比，判断是否有更新
	before, err := d.clientset.AppsV1().Deployments(namespace).Get(ctx, name, metav1.GetOptions{})
	if err != nil {
		if errors.IsNotFound(err) {
			status = Created
		} else {
			return status, err
		}
	}
	// 创建或更新
	after, err := d.clientset.AppsV1().Deployments(namespace).Apply(ctx, config, metav1.ApplyOptions{FieldManager: "client-go"})
	if err != nil {
		return status, err
	}

	// 对比
	if status != Created {
		if !reflect.DeepEqual(before, after) {
			status = Configured
		} else {
			status = Unchanged
		}
	}

	return status, nil
}

func (d *Deployment) Delete(ctx context.Context, config *applyappsv1.DeploymentApplyConfiguration) error {
	return d.clientset.AppsV1().Deployments(*(config.Namespace)).Delete(ctx, *(config.Name), metav1.DeleteOptions{})
}

// Do 聚合方法
func (d *Deployment) Do(ctx context.Context, config *applyappsv1.DeploymentApplyConfiguration, command Command) error {
	var (
		err    error
		status Status
	)

	switch command {
	case ApplyCommand:
		status, err = d.Apply(ctx, config)
		if err == nil {
			fmt.Printf("deployment.apps/%s %s\n", *(config.Name), status)
		}
	case DeleteCommand:
		err = d.Delete(ctx, config)
		if err == nil {
			fmt.Printf("deployment.apps/%s %s\n", *(config.Name), Deleted)
		}
	}
	return err
}

// Service 定义 Service 结构体
type Service struct {
	clientset *kubernetes.Clientset
}

func (s *Service) Decode(decoder *yamlutil.YAMLOrJSONDecoder) (*applycorev1.ServiceApplyConfiguration, error) {
	// 初始化deploy，并设置默认参数
	applyConfig := &applycorev1.ServiceApplyConfiguration{
		ObjectMetaApplyConfiguration: &applymetav1.ObjectMetaApplyConfiguration{
			Namespace: func() *string { namespace := "default"; return &namespace }(),
		},
	}

	// 解码
	err := decoder.Decode(applyConfig)
	if err != nil {
		return nil, err
	}

	return applyConfig, err
}

func (s *Service) Apply(ctx context.Context, config *applycorev1.ServiceApplyConfiguration) (Status, error) {
	// 初始化状态
	var status Status

	// 从ApplyConfig中获取需要的配置
	namespace := *(config.Namespace)
	name := *(config.Name)

	// 提前获取一次Service，用于与Apply之后做对比，判断是否有更新
	before, err := s.clientset.CoreV1().Services(namespace).Get(ctx, name, metav1.GetOptions{})
	if err != nil {
		if errors.IsNotFound(err) {
			status = Created
		} else {
			return status, err
		}
	}

	// 创建或更新
	after, err := s.clientset.CoreV1().Services(namespace).Apply(ctx, config, metav1.ApplyOptions{FieldManager: "client-go"})
	if err != nil {
		return status, err
	}

	// 对比
	if status != Created {
		if !reflect.DeepEqual(before, after) {
			status = Configured
		} else {
			status = Unchanged
		}
	}

	return status, err
}

func (s *Service) Delete(ctx context.Context, config *applycorev1.ServiceApplyConfiguration) error {
	return s.clientset.CoreV1().Services(*(config.Namespace)).Delete(ctx, *(config.Name), metav1.DeleteOptions{})
}

// Do 聚合方法
func (s *Service) Do(ctx context.Context, config *applycorev1.ServiceApplyConfiguration, command Command) error {
	var (
		err    error
		status Status
	)

	switch command {
	case ApplyCommand:
		status, err = s.Apply(ctx, config)
		if err == nil {
			fmt.Printf("service/%s %s\n", *(config.Name), status)
		}
	case DeleteCommand:
		err = s.Delete(ctx, config)
		if err == nil {
			fmt.Printf("service/%s %s\n", *(config.Name), Deleted)
		}
	}
	return err
}

// DoCommandWithFile 核心方法
func DoCommandWithFile(command Command, fileName string) (err error) {
	var errorList []error

	// 实例化ClientSet
	clientset, err := NewClientSetByConfig(".kube.config")
	if err != nil {
		return err
	}

	// 初始化一个全局的Context
	ctx := context.Background()

	// 1.读取本地YAML文件
	data, err := os.ReadFile(fileName)
	if err != nil {
		return err
	}

	// 2.按行读取YAML文件，并收集所有的 kind
	kindList, err := GetKindList(data)
	if err != nil {
		return err
	}

	// 3.生成decoder对象
	decoder := yamlutil.NewYAMLOrJSONDecoder(bytes.NewReader(data), 512)

	// 4.遍历 kindList,并操作对应资源
	for _, kind := range kindList {
		switch kind {
		case "Deployment":
			// 定义Deployment结构体
			deploy := &Deployment{clientset: clientset}

			// 解码，获取 applyappsv1.DeploymentApplyConfiguration
			applyConfig, err := deploy.Decode(decoder)
			if err != nil {
				return err
			}

			// 不同的子命令执行不同的操作
			err = deploy.Do(ctx, applyConfig, command)
			if err != nil {
				errorList = append(errorList, err)
			}
		case "Service":
			// 定义Service结构体
			service := &Service{clientset: clientset}

			// 解码，获取 applycorev1.ServiceApplyConfiguration
			applyConfig, err := service.Decode(decoder)
			if err != nil {
				return err
			}

			// 不同的子命令执行不同的操作
			err = service.Do(ctx, applyConfig, command)
			if err != nil {
				errorList = append(errorList, err)
			}
		default:
			errorList = append(errorList, fmt.Errorf("Unknown kind: %s\n", kind))
		}
	}

	// 5.错误处理
	if len(errorList) > 0 {
		for _, err := range errorList {
			if errors.IsNotFound(err) {
				message := `Error from server (NotFound): error when deleting "` + fileName + `": ` + err.Error()
				_, _ = fmt.Fprintln(os.Stderr, message)
			} else {
				_, _ = fmt.Fprintln(os.Stderr, "The "+err.Error())
			}
		}
		return fmt.Errorf("")
	}

	return nil
}

// GetRootCommand 命令行参数解析
func GetRootCommand() *cobra.Command {
	// 定义命令行选项
	var fileName string

	// 根命令
	var rootCmd = &cobra.Command{
		Use:           RootCommand.String(),
		Short:         RootCommand.String() + " controls the Kubernetes cluster manager.",
		SilenceUsage:  true,
		SilenceErrors: true,
	}

	// 子命令apply，并设置必选参数-f/--filename
	var ApplyCommand = &cobra.Command{
		Use:   ApplyCommand.String(),
		Short: ApplyCommand.String() + " a configuration to a resource by fileName name or stdin.",
		Run: func(cmd *cobra.Command, args []string) {
			if err := DoCommandWithFile(ApplyCommand, fileName); err != nil {
				os.Exit(1)
			}
		},
	}
	ApplyCommand.Flags().StringVarP(&fileName, "filename", "f", "", "The files that contain the configurations to apply")

	if err := ApplyCommand.MarkFlagRequired("filename"); err != nil {
		panic(err)
	}

	// 子命令delete，并设置必选参数-f/--filename
	var DeleteCommand = &cobra.Command{
		Use:   DeleteCommand.String(),
		Short: DeleteCommand.String() + " resources by fileName names, stdin, resources and names, or by resources and label selector",
		Run: func(cmd *cobra.Command, args []string) {
			if err := DoCommandWithFile(DeleteCommand, fileName); err != nil {
				os.Exit(1)
			}
		},
	}
	DeleteCommand.Flags().StringVarP(&fileName, "filename", "f", "", "containing the resource to delete")
	if err := DeleteCommand.MarkFlagRequired("filename"); err != nil {
		panic(err)
	}

	// 将所有子命令注册到根命令中
	rootCmd.AddCommand(ApplyCommand, DeleteCommand)

	return rootCmd
}

func main() {
	rootCmd := GetRootCommand()
	if err := rootCmd.Execute(); err != nil {
		_, _ = fmt.Fprintln(os.Stderr, "error: "+err.Error())
		os.Exit(1)
	}
}
```

交叉编译并上传到Linux中

```bash
# Windows上编译为Linx ELF二进制，并上传到Linux中
SET CGO_ENABLED=0
SET GOOS=linux
SET GOARCH=amd64
go build -o main .

# 添加可执行权限
[root@node-1 ~]# chmod 755 ./main

# -----------------------------------------------------------------------------------------------------------

# 根命令帮助
[root@node-1 ~]# ./main -h
kubectl controls the Kubernetes cluster manager.

Usage:
  kubectl [command]

Available Commands:
  apply       apply a configuration to a resource by fileName name or stdin.
  completion  Generate the autocompletion script for the specified shell
  delete      delete resources by fileName names, stdin, resources and names, or by resources and label selector
  help        Help about any command

Flags:
  -h, --help   help for kubectl

Use "kubectl [command] --help" for more information about a command.

# -----------------------------------------------------------------------------------------------------------

# apply 子命令帮助
[root@node-1 ~]# ./main apply -h
apply a configuration to a resource by fileName name or stdin.

Usage:
  kubectl apply [flags]

Flags:
  -f, --filename string   The files that contain the configurations to apply
  -h, --help              help for apply

# -----------------------------------------------------------------------------------------------------------

# delete 子命令帮助
[root@node-1 ~]# ./main delete -h
delete resources by fileName names, stdin, resources and names, or by resources and label selector

Usage:
  kubectl delete [flags]

Flags:
  -f, --filename string   containing the resource to delete
  -h, --help              help for delete
```

和kubectl输出简单对比一下

```bash
# 我们的程序没有定义-k选项，所以输出是不一样的
[root@node-1 ~]# kubectl apply
error: must specify one of -f and -k

[root@node-1 ~]# ./main apply
error: required flag(s) "filename" not set

# 对于不存在的子命令
[root@node-1 ~]# kubectl abc
error: unknown command "abc" for "kubectl"
[root@node-1 ~]# echo $?
1

[root@node-1 ~]# ./main abc
error: unknown command "abc" for "kubectl"
[root@node-1 ~]# echo $?
1
```

使用

```bash
# 程序中使用的是当前目录下的.kube.config文件，所以拷贝一份
[root@node-1 ~]# cp ~/.kube/config .kube.config

# apply
[root@node-1 ~]# ./main apply -f demo.yaml 
service/demo created
deployment.apps/demo created

# 再次执行apply
[root@node-1 ~]# ./main apply -f demo.yaml
service/demo unchanged
deployment.apps/demo unchanged

# 修改后再执行apply，这里改一下Service的labels
[root@node-1 ~]# ./main apply -f demo.yaml
service/demo configured
deployment.apps/demo unchanged

# delete
[root@node-1 ~]# ./main delete -f demo.yaml 
service/demo deleted
deployment.apps/demo deleted

# 再次执行delete
[root@node-1 ~]# ./main delete -f demo.yaml
Error from server (NotFound): error when deleting "demo.yaml": services "demo" not found
Error from server (NotFound): error when deleting "demo.yaml": deployments.apps "demo" not found

# ---------------------------------------------------------------------------------------------------------------------

# 修改ClusterIP为ClusterIP1，检查报错情况
[root@node-1 ~]# ./main apply -f demo.yaml
deployment.apps/demo created
The Service "demo" is invalid: spec.type: Unsupported value: "ClusterIP1": supported values: "ClusterIP", "ExternalName", "LoadBalancer", "NodePort"
[root@node-1 ~]# echo $?
1

[root@node-1 ~]# ./main delete -f demo.yaml
deployment.apps/demo deleted
Error from server (NotFound): error when deleting "demo.yaml": services "demo" not found

# 看一下kubectl的报错情况，输出内容一样
[root@node-1 ~]# kubectl apply -f demo.yaml
deployment.apps/demo created
The Service "demo" is invalid: spec.type: Unsupported value: "ClusterIP1": supported values: "ClusterIP", "ExternalName", "LoadBalancer", "NodePort"
[root@node-1 ~]# echo $?
1

[root@node-1 ~]# kubectl delete -f demo.yaml
deployment.apps "demo" deleted
Error from server (NotFound): error when deleting "demo.yaml": services "demo" not found
```

:::

<br />

## Watch机制

### 1）基础示例

::: details 点击查看详情

```go
package main

import (
	"context"
	"fmt"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
	"log"
	"os"
	"runtime"
)

// NewClientSetByConfig 在集群外部使用配置文件进行认证
func NewClientSetByConfig(kubeconfig string) (*kubernetes.Clientset, error) {
	// 参数校验
	if _, err := os.Stat(kubeconfig); err != nil {
		return nil, fmt.Errorf("kube config file not found: %s\n", kubeconfig)
	}

	// (1) 实例化*rest.Config对象, 第一个参数是APIServer地址，我们会使用配置文件中的APIServer地址，所以这里为空就好
	resetConfig, err := clientcmd.BuildConfigFromFlags("", kubeconfig)
	if err != nil {
		return nil, err
	}

	// (2) 修改默认配置
	resetConfig.QPS = float32(runtime.NumCPU() * 2) // default 5
	resetConfig.Burst = runtime.NumCPU() * 4        // default 10

	// (3) 实例化*ClientSet对象
	clientset, err := kubernetes.NewForConfig(resetConfig)
	if err != nil {
		return nil, err
	}
	return clientset, nil
}

func main() {
	// 实例化ClientSet
	clientset, err := NewClientSetByConfig(".kube.config")
	if err != nil {
		panic(err)
	}

	// 初始化一个全局的Context
	ctx := context.Background()

	// 实例化Watch对象
	watcher, err := clientset.CoreV1().Pods("kube-system").Watch(ctx, metav1.ListOptions{})
	if err != nil {
		panic(err)
	}
	defer watcher.Stop()

	// 通过channel接收监听的事件
	for {
		event, ok := <-watcher.ResultChan()
		if !ok {
			log.Printf("%-2s Error: Channel closed\n", "")
			break
		}
		pod, ok := event.Object.(*corev1.Pod)
		if !ok {
			log.Printf("%-2s Error: Type Assertion to *corev1.Pod\n", "")
			continue
		}
		log.Printf("%-2s 事件类型: %-8s Pod名称: %-40s Pod阶段: %s\n", "", event.Type, pod.Name, pod.Status.Phase)
	}

	// 也可以使用下面的方式来接收事件
	// 两段代码实现的效果是一样的,这只是Go语言channel的两种写法而已
    // 后面我们都会以第一段代码作为示例
	//for event := range watcher.ResultChan() {
	//	pod, ok := event.Object.(*corev1.Pod)
	//	if !ok {
	//		log.Printf("%-2s Error: Type Assertion to *corev1.Pod\n", "")
	//		continue
	//	}
	//	log.Printf("%-2s 事件类型: %-8s Pod名称: %-40s Pod阶段: %s\n", "", event.Type, pod.Name, pod.Status.Phase)
	//}
	//log.Printf("%-2s Error: Channel closed\n", "")
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
2022/12/21 13:01:18    事件类型: ADDED    Pod名称: etcd-node-3                              Pod阶段: Running
2022/12/21 13:01:18    事件类型: ADDED    Pod名称: kube-apiserver-node-2                    Pod阶段: Running
2022/12/21 13:01:18    事件类型: ADDED    Pod名称: kube-controller-manager-node-2           Pod阶段: Running
2022/12/21 13:01:18    事件类型: MODIFIED Pod名称: calico-node-jwflc                        Pod阶段: Running
2022/12/21 13:01:24    事件类型: MODIFIED Pod名称: kube-controller-manager-node-1           Pod阶段: Running
```

:::

<br />

### 2）通道关闭问题

::: details （1）ResultChan Channel自动关闭：问题复现

Watch通道关闭可能的原因：

* `Watcher` 对象调用了其 `Stop()` 方法，表示停止监视
* `client-go`和`Kubernetes`之间网络出现问题
* `Kubernetes`会定期关闭通道，在我的测试中是`30`分钟左右

```bash
[root@node-1 example]# time go run main.go
2022/12/21 14:51:24    事件类型: ADDED    Pod名称: coredns-565d847f94-n7d8k                 Pod阶段: Running
2022/12/21 14:51:24    事件类型: ADDED    Pod名称: kube-proxy-72k55                         Pod阶段: Running
2022/12/21 14:51:24    事件类型: ADDED    Pod名称: coredns-565d847f94-tsksp                 Pod阶段: Running
2022/12/21 14:51:24    事件类型: ADDED    Pod名称: kube-apiserver-node-2                    Pod阶段: Running
2022/12/21 14:51:24    事件类型: ADDED    Pod名称: kube-proxy-zztls                         Pod阶段: Running
2022/12/21 14:51:24    事件类型: ADDED    Pod名称: calico-kube-controllers-798cc86c47-8jlrm Pod阶段: Running
2022/12/21 14:51:24    事件类型: ADDED    Pod名称: calico-node-jhjwp                        Pod阶段: Running
2022/12/21 14:51:24    事件类型: ADDED    Pod名称: calico-node-jwflc                        Pod阶段: Running
2022/12/21 14:51:24    事件类型: ADDED    Pod名称: etcd-node-1                              Pod阶段: Running
2022/12/21 14:51:24    事件类型: ADDED    Pod名称: etcd-node-2                              Pod阶段: Running
2022/12/21 14:51:24    事件类型: ADDED    Pod名称: etcd-node-3                              Pod阶段: Running
2022/12/21 14:51:24    事件类型: ADDED    Pod名称: kube-controller-manager-node-3           Pod阶段: Running
2022/12/21 14:51:24    事件类型: ADDED    Pod名称: kube-apiserver-node-1                    Pod阶段: Running
2022/12/21 14:51:24    事件类型: ADDED    Pod名称: kube-controller-manager-node-1           Pod阶段: Running
2022/12/21 14:51:24    事件类型: ADDED    Pod名称: kube-proxy-277hn                         Pod阶段: Running
2022/12/21 14:51:24    事件类型: ADDED    Pod名称: coredns-565d847f94-hclt9                 Pod阶段: Failed
2022/12/21 14:51:24    事件类型: ADDED    Pod名称: kube-apiserver-node-3                    Pod阶段: Running
2022/12/21 14:51:24    事件类型: ADDED    Pod名称: kube-controller-manager-node-2           Pod阶段: Running
2022/12/21 14:51:24    事件类型: ADDED    Pod名称: calico-node-fgqsz                        Pod阶段: Running
2022/12/21 14:51:24    事件类型: ADDED    Pod名称: calico-node-wckpr                        Pod阶段: Running
2022/12/21 14:51:24    事件类型: ADDED    Pod名称: kube-apiserver-front-proxy-node-4        Pod阶段: Running
2022/12/21 14:51:24    事件类型: ADDED    Pod名称: kube-proxy-xk9r7                         Pod阶段: Running
2022/12/21 14:51:24    事件类型: ADDED    Pod名称: kube-scheduler-node-1                    Pod阶段: Running
2022/12/21 14:51:24    事件类型: ADDED    Pod名称: kube-scheduler-node-2                    Pod阶段: Running
2022/12/21 14:51:24    事件类型: ADDED    Pod名称: kube-scheduler-node-3                    Pod阶段: Running


2022/12/21 15:30:48    Error: Channel closed

real    39m31.355s
user    0m2.934s
sys     0m5.210s
```

:::

::: details （2）ResultChan Channel自动关闭：两种解决办法

Watch通道关闭的解决思路：

* 个人实现：使用两层`for`循环，当检测到通道关闭后再重新创建一个`watcher`对象
* 官方实现：使用具有重试功能的`Watch`接口：`retrywatcher.go`

**（1）两层For循环：**

```go
	// pod watch
	for {
		// 实例化Watch对象
		watcher, err := clientset.CoreV1().Pods("kube-system").Watch(ctx, metav1.ListOptions{})
		if err != nil {
			panic(err)
		}

		// 通过channel接收监听的事件
		for {
			event, ok := <-watcher.ResultChan()
			if !ok {
				log.Printf("%-2s Error: Channel closed\n", "")
				break
			}
			pod, ok := event.Object.(*corev1.Pod)
			if !ok {
				log.Printf("%-2s Error: Type Assertion to *corev1.Pod\n", "")
				continue
			}
			log.Printf("%-2s 事件类型: %-8s Pod名称: %-40s Pod阶段: %s\n", "", event.Type, pod.Name, pod.Status.Phase)
		}
	}
```

输出结果

```bash
[root@node-1 example]# time go run main.go
2022/12/21 15:54:26    事件类型: ADDED    Pod名称: etcd-node-2                              Pod阶段: Running
2022/12/21 15:54:26    事件类型: ADDED    Pod名称: kube-apiserver-node-1                    Pod阶段: Running
...
2022/12/21 16:24:36    Error: Channel closed
2022/12/21 16:24:37    事件类型: ADDED    Pod名称: coredns-565d847f94-hclt9                 Pod阶段: Failed
2022/12/21 16:24:37    事件类型: ADDED    Pod名称: calico-node-fgqsz                        Pod阶段: Running
```

**（2）RetryWatcher**

```go
package main

import (
	"context"
	"fmt"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/watch"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/cache"
	"k8s.io/client-go/tools/clientcmd"
	watchtool "k8s.io/client-go/tools/watch"
	"log"
	"os"
	"runtime"
)

// NewClientSetByConfig 在集群外部使用配置文件进行认证
func NewClientSetByConfig(kubeconfig string) (*kubernetes.Clientset, error) {
	// 参数校验
	if _, err := os.Stat(kubeconfig); err != nil {
		return nil, fmt.Errorf("kube config file not found: %s\n", kubeconfig)
	}

	// (1) 实例化*rest.Config对象, 第一个参数是APIServer地址，我们会使用配置文件中的APIServer地址，所以这里为空就好
	resetConfig, err := clientcmd.BuildConfigFromFlags("", kubeconfig)
	if err != nil {
		return nil, err
	}

	// (2) 修改默认配置
	resetConfig.QPS = float32(runtime.NumCPU() * 2) // default 5
	resetConfig.Burst = runtime.NumCPU() * 4        // default 10

	// (3) 实例化*ClientSet对象
	clientset, err := kubernetes.NewForConfig(resetConfig)
	if err != nil {
		return nil, err
	}
	return clientset, nil
}

func main() {
	// 实例化ClientSet
	clientset, err := NewClientSetByConfig(".kube.config")
	if err != nil {
		panic(err)
	}

	// 初始化一个全局的Context
	ctx := context.Background()

	// 实例化watcher对象
	watchFunc := func(options metav1.ListOptions) (watch.Interface, error) {
		return clientset.CoreV1().Pods("kube-system").Watch(ctx, metav1.ListOptions{})
	}
	watcher, err := watchtool.NewRetryWatcher("1", &cache.ListWatch{WatchFunc: watchFunc})
	if err != nil {
		panic(err)
	}
	defer watcher.Stop()

	// 通过channel接收监听的事件
	for {
		event, ok := <-watcher.ResultChan()
		if !ok {
			log.Printf("%-2s Error: Channel closed\n", "")
			break
		}
		pod, ok := event.Object.(*corev1.Pod)
		if !ok {
			log.Printf("%-2s Error: Type Assertion to *corev1.Pod\n", "")
			continue
		}
		log.Printf("%-2s 事件类型: %-8s Pod名称: %-40s Pod阶段: %s\n", "", event.Type, pod.Name, pod.Status.Phase)
	}
}
```

输出结果

```bash
# 它在内部实现了重试机制，所以对于开发者来说是感知不到在什么时候重新Watched
[root@node-1 example]# time go run main.go
2022/12/21 16:53:27    事件类型: ADDED    Pod名称: kube-apiserver-node-1                    Pod阶段: Running
2022/12/21 16:53:27    事件类型: ADDED    Pod名称: kube-apiserver-node-3                    Pod阶段: Running
2022/12/21 16:53:27    事件类型: ADDED    Pod名称: kube-proxy-72k55                         Pod阶段: Running
...
2022/12/21 18:37:29    事件类型: MODIFIED Pod名称: calico-node-jwflc                        Pod阶段: Running
2022/12/21 18:38:06    事件类型: MODIFIED Pod名称: kube-apiserver-node-1                    Pod阶段: Running
2022/12/21 18:38:08    事件类型: MODIFIED Pod名称: kube-apiserver-node-1                    Pod阶段: Running
```

:::

::: details （3）两种解决方案对比

文档：[https://kubernetes.io/zh-cn/docs/reference/using-api/api-concepts/#efficient-detection-of-changes](https://kubernetes.io/zh-cn/docs/reference/using-api/api-concepts/#efficient-detection-of-changes)

**1.重新Watch时如何保证不丢失事件**

* 双层For循环：虽然它重新`Watch`时执行很快，但是理论上还是会丢失事件

* `RetryWatcher`：本质上还是调用的`Watch`方法，但是它会传递一个参数`ResourceVersion`给Watch，用于确保即使中断也会继续从上次的位置`Watch`，

  该参数初始的值对应`NewRetryWatcher`的参数（`initialResourceVersion string`）

**2.重新Watch时增加延迟，若Watch出错时可以减弱高并发产生的影响**

* 双层For循环：它没有使用`ResourceVersion`机制，所以它没有延迟时间，它需要执行的越快越好，否则就会增加丢失事件的频率
* `RetryWatcher`：它设置了最小重启延迟时间为1秒（`minRestartDelay`）,且没有提供修改的途径

**3.手动关闭通道后**

* 双层For循环：会继续重新`Watch`，这显然不太符合常理，如果让它退出的话需要我们做额外处理
* `RetryWatcher`：不会重新`Watch`，根据代码逻辑执行下一步

**4.总结**

* 推荐使用`RetryWatcher`

:::

<br />

### 3）资源过滤和事件过滤

