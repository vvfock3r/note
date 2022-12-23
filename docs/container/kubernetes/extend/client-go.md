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

| 分类       | 导入代码                                                     | 常用对象                                     |
| ---------- | ------------------------------------------------------------ | -------------------------------------------- |
| 内置的对象 | `corev1 "k8s.io/api/core/v1"`                                | `Namespace`、`Pod`、`Service`...             |
|            | `appsv1 "k8s.io/api/apps/v1"`                                | `Deployment`                                 |
| 选项和配置 | `metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"`              | `ListOptions`、`CreateOptions`、`XxxOptions` |
|            | `applycorev1 "k8s.io/client-go/applyconfigurations/core/v1"` | `XxxApplyConfiguration`                      |
|            | `applymetav1 "k8s.io/client-go/applyconfigurations/meta/v1"` | `ObjectMetaApplyConfiguration`               |
| Watch系列  | `watchtool "k8s.io/client-go/tools/watch"`                   | `NewRetryWatcher`                            |
| 工具模块   | `yamlutil "k8s.io/apimachinery/pkg/util/yaml"`               | `NewYAMLOrJSONDecoder`                       |

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

## 日志设置

### 1）日志说明

文档：

* 主要参考资料：[https://github.com/kubernetes/community/blob/master/contributors/devel/sig-instrumentation/logging.md](https://github.com/kubernetes/community/blob/master/contributors/devel/sig-instrumentation/logging.md)

* 结构化日志记录：https://github.com/kubernetes/enhancements/tree/master/keps/sig-instrumentation/1602-structured-logging

* 上下文日志记录：[https://github.com/kubernetes/enhancements/blob/master/keps/sig-instrumentation/3077-contextual-logging/README.md](https://github.com/kubernetes/enhancements/blob/master/keps/sig-instrumentation/3077-contextual-logging/README.md)

Github：

* klog ：[https://github.com/kubernetes/klog](https://github.com/kubernetes/klog)

* logr ：[https://github.com/go-logr/logr](https://github.com/go-logr/logr)

说明：

* Kubernetes 项目使用`klog`进行日志记录，由于结构化日志和上下文日志记录的引入，Kubernetes 正在迁移以使用`logr`作为其日志记录接口

<br />

### 2）命令行参数

初始化命令行参数参数并不是必须的，但是在下面我们可以看到它为我们预设了大量的选项，让我们用起来更方便

::: details 点击查看详情

```go
package main

import (
	"flag"
	"k8s.io/klog/v2"
)

func main() {
	// 初始化命令行参数
	klog.InitFlags(nil)

	// 解析命令行参数
	flag.Parse()

	// 输出日志
	klog.Info("Info")
	klog.Warning("Warning")
	klog.Error("Error")
	klog.Fatal("Fatal")    // 这里会使程序退出    
	klog.Info("No output") // 这一行永远不会输出出来
}
```

输出结果

```bash
# 输出结果
D:\application\GoLand\example>go run main.go     
I1223 12:30:38.017340   11656 main.go:16] Info
W1223 12:30:38.031649   11656 main.go:17] Warning
E1223 12:30:38.031649   11656 main.go:18] Error  
F1223 12:30:38.031649   11656 main.go:19] Fatal  
exit status 255

# 查看命令行参数
D:\application\GoLand\example>go run main.go -h
Usage of C:\Users\Administrator\AppData\Local\Temp\go-build2493560398\b001\exe\main.exe:
  -add_dir_header
        If true, adds the file directory to the header of the log messages
  -alsologtostderr
        log to standard error as well as files (no effect when -logtostderr=true)
  -log_backtrace_at value
        when logging hits line file:N, emit a stack trace
  -log_dir string
        If non-empty, write log files in this directory (no effect when -logtostderr=true)
  -log_file string
        If non-empty, use this log file (no effect when -logtostderr=true)
  -log_file_max_size uint
        Defines the maximum size a log file can grow to (no effect when -logtostderr=true). Unit is megabytes. If the value is 0, the maximum file size is unlimited. (default 1800)
  -logtostderr
        log to standard error instead of files (default true)
  -one_output
        If true, only write logs to their native severity level (vs also writing to each lower severity level; no effect when -logtostderr=true)
  -skip_headers
        If true, avoid header prefixes in the log messages
  -skip_log_headers
        If true, avoid headers when opening log files (no effect when -logtostderr=true)
  -stderrthreshold value
        logs at or above this threshold go to stderr when writing to files and stderr (no effect when -logtostderr=true or -alsologtostderr=false) (default 2)
  -v value
        number for the log level verbosity
  -vmodule value
        comma-separated list of pattern=N settings for file-filtered logging
```

:::

<br />

### 3）结构化日志

文档：

* 使用什么方法：[https://github.com/kubernetes/community/blob/master/contributors/devel/sig-instrumentation/logging.md#what-method-to-use](https://github.com/kubernetes/community/blob/master/contributors/devel/sig-instrumentation/logging.md#what-method-to-use)

* 日志记录结构：[https://github.com/kubernetes/enhancements/tree/master/keps/sig-instrumentation/1602-structured-logging#log-message-structure](https://github.com/kubernetes/enhancements/tree/master/keps/sig-instrumentation/1602-structured-logging#log-message-structure)

说明：

* 对于每个格式化方法 ( `Infof`, `Errorf`) 我们将添加匹配的结构化方法 ( `InfoS`, `ErrorS`)
  * `klog.InfoS`：用于记录常规日志
  * `klog.ErrorS`：用于记录错误日志
* 日志记录结构为： `<message> <key1>=<value1> <key2>=<value2>`，说明如下
  * 将日志消息与其参数分开
  * 将日志参数视为键值对
  * 易于解析和查询
  * 对日志消息及其参数有具体的指导

::: details （1）InfoS 示例

```go
package main

import (
	"k8s.io/klog/v2"
	"time"
)

type Request struct {
	Method  string
	Timeout int
	secret  string
}

func (req Request) String() string {
	return req.Method
}

func main() {
	// 键值对参数
	klog.InfoS("Received HTTP request", "method", "GET", "URL", "/metrics", "latency", time.Second)

	// 数组形式
	klog.InfoS("Received HTTP request", []any{"method", "GET", "URL", "/metrics", "latency", time.Second}...)

	// ---------------------------------------------------------------------------------------------------------------

	// 结构体参数,若结构体有String方法，则会使用String方法里面的内容
	request := Request{Method: "GET", Timeout: 30, secret: "pony"}
	klog.InfoS("Request finished", "request", request)

	// 但是我想把结构体中所有的内容都输出来，怎么做呢?
	// 没有找到特别好的办法，所以自定义了一个类型，它没有String方法    
	type KlogRequest Request
	klog.InfoS("Request finished", "request", KlogRequest(request))
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
I1223 15:37:39.838107    8220 main.go:20] "Received HTTP request" method="GET" URL="/metrics" latency="1s"
I1223 15:37:39.851077    8220 main.go:23] "Received HTTP request" method="GET" URL="/metrics" latency="1s"
I1223 15:37:39.851077    8220 main.go:27] "Request finished" request="GET"                                
I1223 15:37:39.851077    8220 main.go:32] "Request finished" request={Method:GET Timeout:30 secret:pony}

# 分析
# 其实我们绝大部分情况并不需要直接输出结构体内容，原因如下：
# 1.若结构体字段很少，直接写字段输出即可
# 2.若结构体字段很多，那么直接输出不太合适，日志会显得很乱
# 3.若结构体字段不少也不多，倒是可以可以采用这种办法，但是它的格式和上面的格式完全不一样，我还不确定当我们用代码处理的时候会不会有问题
```

:::

::: details （2）InfoS 对 Kubernetes 对象的引用

```go
package main

import (
	"context"
	"fmt"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
	"k8s.io/klog/v2"
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
	klog.InfoS("Kubernetes server info",
		"version", serverVersionInfo,
		"platform", serverVersionInfo.Platform,
		"goVersion", serverVersionInfo.GoVersion,
	)

	// (3) 查看Pod
	// 1.klog.KObj传入的对象需要实现以下两个接口
	//     GetName() string
	//     GetNamespace() string
	// 2.注意我们需要传入的是指针对象，才能满足上面的接口
	// 3.klog.KObj返回值 namespace/name, 如果没有namespace则返回 name
	podList, err := clientset.CoreV1().Pods("kube-system").List(context.TODO(), metav1.ListOptions{})
	if err != nil {
		panic(err)
	}
	pod := podList.Items[0]
	klog.InfoS("Random pod", "pod", klog.KObj(&pod), "status", pod.Status.Phase)

	// (4) 查看Namespace
	// 1.klog.KRef传入一个namespace和name，返回namespace/name
	// 2.感觉用处不大
	namespaceList, err := clientset.CoreV1().Namespaces().List(context.TODO(), metav1.ListOptions{})
	namespace := namespaceList.Items[0]
	klog.InfoS("Random namespace", "namespace", klog.KRef("", namespace.Name))
	klog.InfoS("Random namespace", "namespace", namespace.Name)
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
I1223 16:29:47.044782    7568 main.go:46] "Kubernetes server info" version="v1.25.4" platform="linux/amd64" goVersion="go1.19.3"
I1223 16:29:47.081949    7568 main.go:63] "Random pod" pod="kube-system/calico-kube-controllers-798cc86c47-gglzh" status=Running
I1223 16:29:48.358169    7568 main.go:68] "Random namespace" namespace="default"
I1223 16:29:48.358169    7568 main.go:69] "Random namespace" namespace="default"
```

:::

::: details （3）ErrorS 示例

```go
package main

import (
	"fmt"
	"k8s.io/klog/v2"
)

func main() {
	// 错误日志
	err := fmt.Errorf("timeout")
	klog.ErrorS(err, "Failed to update pod status")
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
E1223 16:33:25.123614    4840 main.go:11] "Failed to update pod status" err="timeout"
```

:::

<br />

### 4）设置日志级别

说明：

* klog并不是通过像`DEBUG`、`INFO`、`WARN`、`ERROR`这种方式来设置日志级别的
* klog通过使用`V-levels`的机制来设置日志级别
  * 全局有一个Level，它类似于我们通常设置的日志级别，它控制着低于或高于此日志级别的才会输出
  * 全局Level本质是int32类型，默认值是零值0
  * `klog.InfoS`等函数不受Level的限制，总是会输出
  * `klog.V(<Level>).Info`这种显示指定Level的才会受到限制
  * **等于或小于全局Level的日志才会输出，大于全局Level的日志不会输出**

::: details （1）测试默认的Level

```go
package main

import (
	"k8s.io/klog/v2"
)

func main() {
	// 日志级别测试
	for i := -3; i < 6; i++ {
		level := klog.Level(i)
		klog.V(level).InfoS("klog", "Level", level.String())
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
I1223 17:32:54.692647   10424 main.go:11] "klog" Level="-3"
I1223 17:32:54.705785   10424 main.go:11] "klog" Level="-2"
I1223 17:32:54.705785   10424 main.go:11] "klog" Level="-1"
I1223 17:32:54.705785   10424 main.go:11] "klog" Level="0"
```

:::

::: details （2）指定Level的方式：命令行参数

```go
package main

import (
	"flag"
	"k8s.io/klog/v2"
)

func main() {
	// 初始化命令行参数
	klog.InitFlags(nil)
	flag.Parse()

	// 日志级别测试
	for i := -3; i < 6; i++ {
		level := klog.Level(i)
		klog.V(level).InfoS("klog", "Level", level.String())
	}
}
```

输出结果

```bash
# 看一下命令行参数文档
D:\application\GoLand\example>go run main.go -h
...
  -v value
        number for the log level verbosity

# 命令行不传参数，还是默认的Level 0
D:\application\GoLand\example>go run main.go
I1223 17:33:44.256171   10992 main.go:16] "klog" Level="-3"
I1223 17:33:44.268614   10992 main.go:16] "klog" Level="-2"
I1223 17:33:44.268614   10992 main.go:16] "klog" Level="-1"
I1223 17:33:44.268614   10992 main.go:16] "klog" Level="0"

# 设置全局Level为2
D:\application\GoLand\example>go run main.go -v=2
I1223 17:34:11.469717    8976 main.go:16] "klog" Level="-3"
I1223 17:34:11.482664    8976 main.go:16] "klog" Level="-2"
I1223 17:34:11.483204    8976 main.go:16] "klog" Level="-1"
I1223 17:34:11.483204    8976 main.go:16] "klog" Level="0"
I1223 17:34:11.483204    8976 main.go:16] "klog" Level="1"
I1223 17:34:11.483204    8976 main.go:16] "klog" Level="2"
```

:::

::: details （3）指定Level的方式：使用flag设置默认Level

```go
package main

import (
	"flag"
	"k8s.io/klog/v2"
)

func main() {
	// 初始化命令行参数
	klog.InitFlags(nil)

	// (1) 这里设置默认的Level, 如果命令行参数中指定-v的话会覆盖此参数
	if err := flag.Set("v", "2"); err != nil {
		panic(err)
	}

	flag.Parse()

	// (2) 如果在 flag.Parse() 之后再去 Set，那么就会覆盖命令行中指定的参数
	//     一般情况下我们不会这么用，仅作了解，避免写bug
	//if err := flag.Set("v", "4"); err != nil {
	//	panic(err)
	//}

	// 日志级别测试
	for i := -3; i < 6; i++ {
		level := klog.Level(i)
		klog.V(level).InfoS("klog", "Level", level.String())
	}
}
```

输出结果

```bash
# 默认全局Level变成了2
D:\application\GoLand\example>go run main.go
I1223 17:34:49.625088    9564 main.go:28] "klog" Level="-3"
I1223 17:34:49.638219    9564 main.go:28] "klog" Level="-2"
I1223 17:34:49.638219    9564 main.go:28] "klog" Level="-1"
I1223 17:34:49.638724    9564 main.go:28] "klog" Level="0" 
I1223 17:34:49.638762    9564 main.go:28] "klog" Level="1" 
I1223 17:34:49.638762    9564 main.go:28] "klog" Level="2"

# 命令行中手动指定Level，会覆盖我们设置的默认值
D:\application\GoLand\example>go run main.go -v=-1
I1223 17:35:13.185796    7812 main.go:28] "klog" Level="-3"
I1223 17:35:13.198536    7812 main.go:28] "klog" Level="-2"
I1223 17:35:13.198536    7812 main.go:28] "klog" Level="-1"

# 如果将上面注释的代码打开，不管命令行传递任何参数都会被覆盖成4
D:\application\GoLand\example>go run main.go -v=-1
I1223 17:35:28.408730    6580 main.go:28] "klog" Level="-3"
I1223 17:35:28.421870    6580 main.go:28] "klog" Level="-2"
I1223 17:35:28.422083    6580 main.go:28] "klog" Level="-1"
I1223 17:35:28.422083    6580 main.go:28] "klog" Level="0"
I1223 17:35:28.422083    6580 main.go:28] "klog" Level="1"
I1223 17:35:28.422083    6580 main.go:28] "klog" Level="2"
I1223 17:35:28.422620    6580 main.go:28] "klog" Level="3"
I1223 17:35:28.422620    6580 main.go:28] "klog" Level="4"
```

:::

<br />

## Watch机制

### 1）基础示例代码

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
}
```

备注

```go
	// 上面的for循环代码也可以使用下面的方式来接收事件
	// 两段代码实现的效果是一样的,这只是Go语言channel的两种写法而已    
	//for event := range watcher.ResultChan() {
	//	pod, ok := event.Object.(*corev1.Pod)
	//	if !ok {
	//		log.Printf("%-2s Error: Type Assertion to *corev1.Pod\n", "")
	//		continue
	//	}
	//	log.Printf("%-2s 事件类型: %-8s Pod名称: %-40s Pod阶段: %s\n", "", event.Type, pod.Name, pod.Status.Phase)
	//}
	//log.Printf("%-2s Error: Channel closed\n", "")
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

通道关闭可能的原因：

* `Watcher` 对象调用了其 `Stop()` 方法，表示停止监视
* `client-go`和`Kubernetes`之间网络出现问题
* `Kubernetes`会定期关闭通道，在我的测试中是`30`分钟左右
* `ListOptions`有一个参数`TimeoutSeconds *int64`，默认值为0，即永不过期，但是仍然受到上面`30`分钟左右的限制；如果将他设置为600秒，那么在10分钟之后也将会关闭通道

```bash
# 直接关闭Kubernetes节点测试
D:\application\GoLand\example>go run main.go
2022/12/21 05:30:43    事件类型: MODIFIED Pod名称: kube-controller-manager-node-3           Pod阶段: Running
2022/12/21 05:30:44    事件类型: MODIFIED Pod名称: kube-apiserver-node-3                    Pod阶段: Running
2022/12/21 05:30:54    Error: Channel closed

# Kubernetes定期关闭通道测试
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

* `RetryWatcher`：本质上还是调用的`Watch`方法，但是它会传递一个参数`ResourceVersion`给Watch，用于确保即使中断也会继续从上次的位置（`ResourceVersion`的下一个）`Watch`，该参数初始的值对应`NewRetryWatcher`的参数（`initialResourceVersion string`）

**2.重新Watch时增加延迟，若Watch出错时可以减弱高并发产生的影响**

* 双层For循环：它没有使用`ResourceVersion`机制，所以它没有延迟时间，它需要执行的越快越好，否则就会增加丢失事件的频率
* `RetryWatcher`：它设置了最小重启延迟时间为1秒（`minRestartDelay`）,且没有提供修改的途径

**3.手动关闭通道后**

* 双层For循环：会继续重新`Watch`，这显然不太符合常理，如果让它退出的话需要我们做额外处理
* `RetryWatcher`：不会重新`Watch`，根据代码逻辑执行下一步

**4.总结**

* 推荐使用`RetryWatcher`，后面的代码我们都以`RetryWatcher`作为示例

:::

<br />

### 3）监控进度持久化

主要利用了`ResourceVersion`字段：

* 每个对象都有一个`ResourceVersion`，它是一个字符串，但实际上是一个数字
* `ResourceVersion`并不是kubernetes生成的，它使用的是etcd中的Revision，代表一个key在全局中的唯一编号
* 举个例子：
  * 创建一个Pod（pod-1），它的`ResourceVersion`是1000
  * 随后又创建一个Pod（pod-2），它的`ResourceVersion`是1001
  * 此时对pod-1进行一次更新，它的`ResourceVersion`变为1002


注意事项总结：

* `ResourceVersion`并不会永久保存，这取决于etcd保留多长时间（默认保留5分钟）
* Watch函数接收到的`ResourceVersion`可能是乱序的，比如先接收到一个大的`ResourceVersion`，随后又接收到一个小的`ResourceVersion`
* Watch指定开始位置的`ResourceVersion`时会严格按照比该值大的事件来接收

::: details pods.yaml

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod-1 
  namespace: default
  labels:
    app: pod-1
spec:
  containers:
  - name: busybox 
    image: busybox:1.25
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
---
apiVersion: v1
kind: Pod
metadata:
  name: pod-2
  namespace: default
  labels:
    app: pod-2
spec:
  containers:
  - name: busybox
    image: busybox:1.25
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
---
apiVersion: v1
kind: Pod
metadata:
  name: pod-3
  namespace: default
  labels:
    app: pod-3
spec:
  containers:
  - name: busybox
    image: busybox:1.25
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
```

:::

::: details （1）Watch ResourceVersion 使用方式

下面这段代码会把ResourceVersion的值输出出来

```bash
	// 实例化Watch对象
	watcher, err := clientset.CoreV1().Pods("default").Watch(ctx, metav1.ListOptions{})

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
		log.Printf("%-2s 事件类型: %-8s Pod名称: %-8s Pod阶段: %-10s ResourceVersion: %s\n",
			"", event.Type, pod.Name, pod.Status.Phase, pod.ResourceVersion,
		)
	}
```

输出结果

```bash
# 程序跑起来之后,手动创建3个Pod:
#    kubectl apply -f pods.yaml
D:\application\GoLand\example>go run main.go
2022/12/22 06:10:57    事件类型: ADDED    Pod名称: pod-1   Pod阶段: Pending    ResourceVersion: 1051823
2022/12/22 06:10:57    事件类型: MODIFIED Pod名称: pod-1   Pod阶段: Pending    ResourceVersion: 1051824
2022/12/22 06:10:58    事件类型: MODIFIED Pod名称: pod-1   Pod阶段: Pending    ResourceVersion: 1051828
2022/12/22 06:11:02    事件类型: ADDED    Pod名称: pod-2   Pod阶段: Pending    ResourceVersion: 1051835
2022/12/22 06:11:02    事件类型: MODIFIED Pod名称: pod-2   Pod阶段: Pending    ResourceVersion: 1051836
2022/12/22 06:11:02    事件类型: MODIFIED Pod名称: pod-2   Pod阶段: Pending    ResourceVersion: 1051839
2022/12/22 06:11:04    事件类型: MODIFIED Pod名称: pod-1   Pod阶段: Pending    ResourceVersion: 1051842
2022/12/22 06:11:07    事件类型: MODIFIED Pod名称: pod-1   Pod阶段: Running    ResourceVersion: 1051847
2022/12/22 06:11:09    事件类型: ADDED    Pod名称: pod-3   Pod阶段: Pending    ResourceVersion: 1051853
2022/12/22 06:11:11    事件类型: MODIFIED Pod名称: pod-3   Pod阶段: Pending    ResourceVersion: 1051856
2022/12/22 06:11:15    事件类型: MODIFIED Pod名称: pod-3   Pod阶段: Pending    ResourceVersion: 1051861
2022/12/22 06:11:24    事件类型: MODIFIED Pod名称: pod-2   Pod阶段: Pending    ResourceVersion: 1051879
2022/12/22 06:11:27    事件类型: MODIFIED Pod名称: pod-2   Pod阶段: Running    ResourceVersion: 1051888
2022/12/22 06:11:36    事件类型: MODIFIED Pod名称: pod-3   Pod阶段: Pending    ResourceVersion: 1051907
2022/12/22 06:11:39    事件类型: MODIFIED Pod名称: pod-3   Pod阶段: Running    ResourceVersion: 1051915
```

然后停止程序，修改代码

```go
	// 实例化Watch对象
	watcher, err := clientset.CoreV1().Pods("default").Watch(ctx, metav1.ListOptions{
		ResourceVersion: "1051823", // 这里指定我们从哪个版本开启监听
	})
```

然后再运行起来，可以看到`1051823`之后的事件都会监听到（不含`1051823`本身）

```bash
D:\application\GoLand\example>go run main.go
2022/12/22 06:13:39    事件类型: MODIFIED Pod名称: pod-1   Pod阶段: Pending    ResourceVersion: 1051824
2022/12/22 06:13:39    事件类型: MODIFIED Pod名称: pod-1   Pod阶段: Pending    ResourceVersion: 1051828
2022/12/22 06:13:39    事件类型: ADDED    Pod名称: pod-2   Pod阶段: Pending    ResourceVersion: 1051835
2022/12/22 06:13:39    事件类型: MODIFIED Pod名称: pod-2   Pod阶段: Pending    ResourceVersion: 1051836
2022/12/22 06:13:40    事件类型: MODIFIED Pod名称: pod-2   Pod阶段: Pending    ResourceVersion: 1051839
2022/12/22 06:13:40    事件类型: MODIFIED Pod名称: pod-1   Pod阶段: Pending    ResourceVersion: 1051842
2022/12/22 06:13:40    事件类型: MODIFIED Pod名称: pod-1   Pod阶段: Running    ResourceVersion: 1051847
2022/12/22 06:13:40    事件类型: ADDED    Pod名称: pod-3   Pod阶段: Pending    ResourceVersion: 1051853
2022/12/22 06:13:40    事件类型: MODIFIED Pod名称: pod-3   Pod阶段: Pending    ResourceVersion: 1051856
2022/12/22 06:13:40    事件类型: MODIFIED Pod名称: pod-3   Pod阶段: Pending    ResourceVersion: 1051861
2022/12/22 06:13:40    事件类型: MODIFIED Pod名称: pod-2   Pod阶段: Pending    ResourceVersion: 1051879
2022/12/22 06:13:40    事件类型: MODIFIED Pod名称: pod-2   Pod阶段: Running    ResourceVersion: 1051888
2022/12/22 06:13:40    事件类型: MODIFIED Pod名称: pod-3   Pod阶段: Pending    ResourceVersion: 1051907
2022/12/22 06:13:40    事件类型: MODIFIED Pod名称: pod-3   Pod阶段: Running    ResourceVersion: 1051915
```

:::

::: details （2）RetryWatcher ResourceVersion 使用方式

它有两种使用方式：

* `metav1.ListOptions{}` 指定 `ResourceVersion `，这种使用方式和直接使用`Watch`的输出结果一样
* `NewRetryWatcher` 指定 `initialResourceVersion`（内部还是`ResourceVersion`），这种方式可能会丢失事件，因为`List`的时候可能某些资源已经被删除，该资源属于不被`Watch`的对象，那么对应的事件也就被丢弃了。解决办法就是同时指定 `metav1.ListOptions{}`

综上所述，`metav1.ListOptions{}` 中必须指定 `ResourceVersion `，而`NewRetryWatcher` 指定不指定都可以

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

...

	// 实例化watcher对象
	watchFunc := func(options metav1.ListOptions) (watch.Interface, error) {
		return clientset.CoreV1().Pods("default").Watch(ctx, metav1.ListOptions{})
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
		log.Printf("%-2s 事件类型: %-8s Pod名称: %-8s Pod阶段: %-10s ResourceVersion: %s\n",
			"", event.Type, pod.Name, pod.Status.Phase, pod.ResourceVersion,
		)
	}
```

输出结果

```bash
# 程序跑起来之后,手动创建3个Pod:
#    kubectl apply -f pods.yaml

D:\application\GoLand\example>go run main.go
2022/12/22 07:55:44    事件类型: ADDED    Pod名称: pod-1    Pod阶段: Pending    ResourceVersion: 1059681
2022/12/22 07:55:44    事件类型: ADDED    Pod名称: pod-2    Pod阶段: Pending    ResourceVersion: 1059682
2022/12/22 07:55:44    事件类型: MODIFIED Pod名称: pod-1    Pod阶段: Pending    ResourceVersion: 1059683
2022/12/22 07:55:44    事件类型: MODIFIED Pod名称: pod-2    Pod阶段: Pending    ResourceVersion: 1059684
2022/12/22 07:55:44    事件类型: ADDED    Pod名称: pod-3    Pod阶段: Pending    ResourceVersion: 1059687
2022/12/22 07:55:44    事件类型: MODIFIED Pod名称: pod-2    Pod阶段: Pending    ResourceVersion: 1059688
2022/12/22 07:55:45    事件类型: MODIFIED Pod名称: pod-3    Pod阶段: Pending    ResourceVersion: 1059691
2022/12/22 07:55:45    事件类型: MODIFIED Pod名称: pod-1    Pod阶段: Pending    ResourceVersion: 1059695
2022/12/22 07:55:45    事件类型: MODIFIED Pod名称: pod-3    Pod阶段: Pending    ResourceVersion: 1059696
2022/12/22 07:55:47    事件类型: MODIFIED Pod名称: pod-2    Pod阶段: Pending    ResourceVersion: 1059701
2022/12/22 07:55:48    事件类型: MODIFIED Pod名称: pod-3    Pod阶段: Pending    ResourceVersion: 1059706
2022/12/22 07:55:48    事件类型: MODIFIED Pod名称: pod-2    Pod阶段: Running    ResourceVersion: 1059711
2022/12/22 07:55:49    事件类型: MODIFIED Pod名称: pod-1    Pod阶段: Pending    ResourceVersion: 1059713
2022/12/22 07:55:50    事件类型: MODIFIED Pod名称: pod-1    Pod阶段: Running    ResourceVersion: 1059721
2022/12/22 07:55:50    事件类型: MODIFIED Pod名称: pod-3    Pod阶段: Running    ResourceVersion: 1059722
```

然后停止程序，修改代码

```go
	// 实例化watcher对象
	watchFunc := func(options metav1.ListOptions) (watch.Interface, error) {
		return clientset.CoreV1().Pods("default").Watch(ctx, metav1.ListOptions{ResourceVersion: "1059681"})
	}
```

然后再运行起来，可以看到`1059681`之后的事件都会监听到（不含`1059681`本身）

```bash
D:\application\GoLand\example>go run main.go
2022/12/22 07:57:52    事件类型: ADDED    Pod名称: pod-2    Pod阶段: Pending    ResourceVersion: 1059682
2022/12/22 07:57:52    事件类型: MODIFIED Pod名称: pod-1    Pod阶段: Pending    ResourceVersion: 1059683
2022/12/22 07:57:52    事件类型: MODIFIED Pod名称: pod-2    Pod阶段: Pending    ResourceVersion: 1059684
2022/12/22 07:57:52    事件类型: ADDED    Pod名称: pod-3    Pod阶段: Pending    ResourceVersion: 1059687
2022/12/22 07:57:52    事件类型: MODIFIED Pod名称: pod-2    Pod阶段: Pending    ResourceVersion: 1059688
2022/12/22 07:57:52    事件类型: MODIFIED Pod名称: pod-3    Pod阶段: Pending    ResourceVersion: 1059691
2022/12/22 07:57:52    事件类型: MODIFIED Pod名称: pod-1    Pod阶段: Pending    ResourceVersion: 1059695
2022/12/22 07:57:52    事件类型: MODIFIED Pod名称: pod-3    Pod阶段: Pending    ResourceVersion: 1059696
2022/12/22 07:57:52    事件类型: MODIFIED Pod名称: pod-2    Pod阶段: Pending    ResourceVersion: 1059701
2022/12/22 07:57:52    事件类型: MODIFIED Pod名称: pod-3    Pod阶段: Pending    ResourceVersion: 1059706
2022/12/22 07:57:52    事件类型: MODIFIED Pod名称: pod-2    Pod阶段: Running    ResourceVersion: 1059711
2022/12/22 07:57:52    事件类型: MODIFIED Pod名称: pod-1    Pod阶段: Pending    ResourceVersion: 1059713
2022/12/22 07:57:52    事件类型: MODIFIED Pod名称: pod-1    Pod阶段: Running    ResourceVersion: 1059721
2022/12/22 07:57:52    事件类型: MODIFIED Pod名称: pod-3    Pod阶段: Running    ResourceVersion: 1059722
```

然后停止程序，修改代码，这次只修改`NewRetryWatcher`

```go
	// 实例化watcher对象
	watchFunc := func(options metav1.ListOptions) (watch.Interface, error) {
		return clientset.CoreV1().Pods("default").Watch(ctx, metav1.ListOptions{}) // 将这里的 ResourceVersion 删掉
	}
	watcher, err := watchtool.NewRetryWatcher("1059681", &cache.ListWatch{WatchFunc: watchFunc}) // 添加到这里
```

然后再运行起来，发现有一些事件丢失了，但是现在还不是最致命的，起码3个Pod事件都在

```bash
D:\application\GoLand\example>go run main.go
2022/12/22 08:00:24    事件类型: ADDED    Pod名称: pod-2    Pod阶段: Running    ResourceVersion: 1059711
2022/12/22 08:00:24    事件类型: ADDED    Pod名称: pod-1    Pod阶段: Running    ResourceVersion: 1059721
2022/12/22 08:00:24    事件类型: ADDED    Pod名称: pod-3    Pod阶段: Running    ResourceVersion: 1059722
```

下面来测试一下删除事件

```bash
# 将程序的ResourceVersion置为初始状态
# 程序跑起来之后,手动创建3个Pod:
#    kubectl delete -f pods.yaml

D:\application\GoLand\example>go run main.go
2022/12/22 08:02:08    事件类型: ADDED    Pod名称: pod-1    Pod阶段: Running    ResourceVersion: 1059721
2022/12/22 08:02:08    事件类型: ADDED    Pod名称: pod-3    Pod阶段: Running    ResourceVersion: 1059722
2022/12/22 08:02:08    事件类型: ADDED    Pod名称: pod-2    Pod阶段: Running    ResourceVersion: 1059711
2022/12/22 08:02:12    事件类型: MODIFIED Pod名称: pod-1    Pod阶段: Running    ResourceVersion: 1060358
2022/12/22 08:02:13    事件类型: MODIFIED Pod名称: pod-2    Pod阶段: Running    ResourceVersion: 1060360
2022/12/22 08:02:13    事件类型: MODIFIED Pod名称: pod-3    Pod阶段: Running    ResourceVersion: 1060363
2022/12/22 08:02:44    事件类型: MODIFIED Pod名称: pod-1    Pod阶段: Running    ResourceVersion: 1060416
2022/12/22 08:02:45    事件类型: MODIFIED Pod名称: pod-2    Pod阶段: Running    ResourceVersion: 1060418
2022/12/22 08:02:45    事件类型: MODIFIED Pod名称: pod-3    Pod阶段: Running    ResourceVersion: 1060420
2022/12/22 08:02:48    事件类型: MODIFIED Pod名称: pod-1    Pod阶段: Running    ResourceVersion: 1060428
2022/12/22 08:02:48    事件类型: MODIFIED Pod名称: pod-1    Pod阶段: Running    ResourceVersion: 1060431
2022/12/22 08:02:48    事件类型: DELETED  Pod名称: pod-1    Pod阶段: Running    ResourceVersion: 1060432
2022/12/22 08:02:52    事件类型: MODIFIED Pod名称: pod-2    Pod阶段: Running    ResourceVersion: 1060442
2022/12/22 08:02:52    事件类型: MODIFIED Pod名称: pod-2    Pod阶段: Running    ResourceVersion: 1060443
2022/12/22 08:02:52    事件类型: DELETED  Pod名称: pod-2    Pod阶段: Running    ResourceVersion: 1060444
2022/12/22 08:02:52    事件类型: MODIFIED Pod名称: pod-3    Pod阶段: Running    ResourceVersion: 1060445
2022/12/22 08:02:53    事件类型: MODIFIED Pod名称: pod-3    Pod阶段: Running    ResourceVersion: 1060448
2022/12/22 08:02:53    事件类型: DELETED  Pod名称: pod-3    Pod阶段: Running    ResourceVersion: 1060449

# 如果只是修改 NewRetryWatcher 中的 ResourceVersion，如下所示，会发现什么事件也监控不到，因为资源都被删除了, List不到哇
	watcher, err := watchtool.NewRetryWatcher("1059721", &cache.ListWatch{WatchFunc: watchFunc})
	if err != nil {
		panic(err)
	}

# 如果只修改 metav1.ListOptions，发现即使资源删除也可以正常监控到
	watchFunc := func(options metav1.ListOptions) (watch.Interface, error) {
		return clientset.CoreV1().Pods("default").Watch(ctx, metav1.ListOptions{ResourceVersion: "1059721"})
	}
```

:::

::: details （3）事件乱序问题

```bash
# 先创建3个Pod
#    kubectl apply -f pods.yaml

# 多等一会，然后进行Watch，不指定ResourceVersion
# 可以看到他们的ResourceVersion是乱序的
D:\application\GoLand\example>go run main.go
2022/12/22 08:45:34    事件类型: ADDED    Pod名称: pod-2    Pod阶段: Running    ResourceVersion: 1064294
2022/12/22 08:45:34    事件类型: ADDED    Pod名称: pod-1    Pod阶段: Running    ResourceVersion: 1064241
2022/12/22 08:45:34    事件类型: ADDED    Pod名称: pod-3    Pod阶段: Running    ResourceVersion: 1064266
# 这里我手动修改了Pod-1的标签，然后触发的下面的事件,避免后续什么事件也看不到
2022/12/22 08:46:01    事件类型: MODIFIED Pod名称: pod-1    Pod阶段: Running    ResourceVersion: 1064803

# 然后停止程序，修改代码，若指定的是4294，则不会监控到4241和4266，但是会监控到4803
	// 实例化watcher对象
	watchFunc := func(options metav1.ListOptions) (watch.Interface, error) {
		return clientset.CoreV1().Pods("default").Watch(ctx, metav1.ListOptions{ResourceVersion: "1064294"})
	}

# 运行起来看看效果
# 1064241 和 1064266 丢失了，虽然他们的顺序更靠后，但是他们小于 1064294
D:\application\GoLand\example>go run main.go
2022/12/22 08:47:49    事件类型: MODIFIED Pod名称: pod-1    Pod阶段: Running    ResourceVersion: 1064803

# 结论
# 虽然接收的事件可能是乱序的，但是好像并没有太大的影响
```

:::

::: details （4）有了以上基础，我们写一个持久化ResourceVersion到磁盘的Watch，即使程序短暂停止也不会丢失Watch事件

这里需要注意的点：

* 若ResourceVersion太老，即etcd中已经没有这个值了，会有 `event.Type == watch.Error`，需要我们处理一下

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

// GetResourceVersion 获取本地 ResourceVersion
func GetResourceVersion(fileName string) (resourceVersion []byte, err error) {
	// 如果文件不存在则: 创建文件并写入初始的 ResourceVersion = ""
	if _, err := os.Stat(fileName); err != nil {
		if !os.IsNotExist(err) {
			return resourceVersion, err
		}
		return resourceVersion, os.WriteFile(fileName, []byte(""), os.ModePerm)
	}

	// 读取 ResourceVersion
	return os.ReadFile(fileName)
}

// SetResourceVersion 设置本地 ResourceVersion
func SetResourceVersion(fileName string, resourceVersion []byte) error {
	return os.WriteFile(fileName, resourceVersion, os.ModePerm)
}

// NewRetryWatcher 创建一个RetryWatcher
func NewRetryWatcher(ctx context.Context, clientset *kubernetes.Clientset, resourceVersion string) (*watchtool.RetryWatcher, error) {
	watchFunc := func(options metav1.ListOptions) (watch.Interface, error) {
		return clientset.CoreV1().Pods("default").Watch(ctx, metav1.ListOptions{ResourceVersion: resourceVersion})
	}
	return watchtool.NewRetryWatcher("1", &cache.ListWatch{WatchFunc: watchFunc})
}

func main() {
	// 实例化ClientSet
	clientset, err := NewClientSetByConfig(".kube.config")
	if err != nil {
		panic(err)
	}

	// 初始化一个全局的Context
	ctx := context.Background()

	// 获取本地最新的 ResourceVersion, 若获取不到则返回 空字节数组
	fileName := "resource-version.txt"
	resourceVersion, err := GetResourceVersion(fileName)
	if err != nil {
		panic(err)
	}

	// 实例化watcher对象, 指定开始位置 resourceVersion
	watcher, err := NewRetryWatcher(ctx, clientset, string(resourceVersion))
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

		// 如果Type是否为Error，并且 Reason == metav1.StatusReasonExpired，则重新创建watcher
		if event.Type == watch.Error {
			status, ok := event.Object.(*metav1.Status)
			if !ok {
				log.Printf("%-2s Error: Type Assertion to *metav1.Status\n", "")
				break
			}
			if status.Reason == metav1.StatusReasonExpired {
				// watcher并不能动态修改 resourceVersion，所以这里只好重新创建一个
				watcher.Stop()
				watcher, err = NewRetryWatcher(ctx, clientset, "")
				if err == nil {
					log.Printf("%-2s Warn: %s\n", "", status.Message)
					continue
				}
			}
			log.Printf("%-2s Error: event.Type error: %s\n", "", status.Message)
			break
		}

		// 断言为指定资源
		pod, ok := event.Object.(*corev1.Pod)
		if !ok {
			log.Printf("%-2s Error: Type Assertion to *corev1.Pod\n", "")
			continue
		}

		// 处理函数
		log.Printf("%-2s 事件类型: %-8s Pod名称: %-8s Pod阶段: %-10s ResourceVersion: %s\n",
			"", event.Type, pod.Name, pod.Status.Phase, pod.ResourceVersion,
		)

		// 处理完成后将 ResourceVersion 持久化，
		// 未处理前不要持久化 ResourceVersion，因为下一次启动程序Watch的时候会从下一次的 ResourceVersion 开始 Watch
		if err := SetResourceVersion(fileName, []byte(pod.ResourceVersion)); err != nil {
			fmt.Printf("%-2s Write ResourceVersion(%s) to file(%s) failed\n", pod.ResourceVersion, fileName)
		}
	}
	watcher.Stop()
}
```

输出结果

```bash
# 启动程序，然后创建3个Pod
#   kubectl apply -f pods.yaml
D:\application\GoLand\example>go run main.go
2022/12/22 13:08:56    事件类型: ADDED    Pod名称: pod-1    Pod阶段: Pending    ResourceVersion: 1081378
2022/12/22 13:08:56    事件类型: MODIFIED Pod名称: pod-1    Pod阶段: Pending    ResourceVersion: 1081379
2022/12/22 13:08:56    事件类型: ADDED    Pod名称: pod-2    Pod阶段: Pending    ResourceVersion: 1081380
2022/12/22 13:08:56    事件类型: MODIFIED Pod名称: pod-1    Pod阶段: Pending    ResourceVersion: 1081382
2022/12/22 13:08:56    事件类型: MODIFIED Pod名称: pod-2    Pod阶段: Pending    ResourceVersion: 1081383
2022/12/22 13:08:56    事件类型: ADDED    Pod名称: pod-3    Pod阶段: Pending    ResourceVersion: 1081384
2022/12/22 13:08:56    事件类型: MODIFIED Pod名称: pod-3    Pod阶段: Pending    ResourceVersion: 1081386
2022/12/22 13:08:56    事件类型: MODIFIED Pod名称: pod-2    Pod阶段: Pending    ResourceVersion: 1081388
2022/12/22 13:08:56    事件类型: MODIFIED Pod名称: pod-3    Pod阶段: Pending    ResourceVersion: 1081389
2022/12/22 13:08:58    事件类型: MODIFIED Pod名称: pod-1    Pod阶段: Pending    ResourceVersion: 1081394
2022/12/22 13:08:58    事件类型: MODIFIED Pod名称: pod-3    Pod阶段: Pending    ResourceVersion: 1081400
2022/12/22 13:08:59    事件类型: MODIFIED Pod名称: pod-1    Pod阶段: Running    ResourceVersion: 1081403
2022/12/22 13:08:59    事件类型: MODIFIED Pod名称: pod-2    Pod阶段: Pending    ResourceVersion: 1081406
2022/12/22 13:09:00    事件类型: MODIFIED Pod名称: pod-2    Pod阶段: Running    ResourceVersion: 1081416
2022/12/22 13:09:00    事件类型: MODIFIED Pod名称: pod-3    Pod阶段: Running    ResourceVersion: 1081417

# 关掉程序
# 此时查看 resource-version.txt文件内容，值为 1081417

# 然后对Pod进行一顿操作
[root@node-1 ~]# kubectl delete -f pods.yaml 
pod "pod-1" deleted
pod "pod-2" deleted
pod "pod-3" deleted

[root@node-1 ~]# kubectl apply -f pods.yaml 
pod/pod-1 created
pod/pod-2 created
pod/pod-3 created

# 然后启动程序，检查上面的操作事件有没有接收到
D:\application\GoLand\example>go run main.go
2022/12/22 13:12:07    事件类型: MODIFIED Pod名称: pod-1    Pod阶段: Running    ResourceVersion: 1081629
2022/12/22 13:12:07    事件类型: MODIFIED Pod名称: pod-2    Pod阶段: Running    ResourceVersion: 1081630
2022/12/22 13:12:07    事件类型: MODIFIED Pod名称: pod-3    Pod阶段: Running    ResourceVersion: 1081633
2022/12/22 13:12:07    事件类型: MODIFIED Pod名称: pod-1    Pod阶段: Running    ResourceVersion: 1081685
2022/12/22 13:12:07    事件类型: MODIFIED Pod名称: pod-3    Pod阶段: Running    ResourceVersion: 1081690
2022/12/22 13:12:07    事件类型: MODIFIED Pod名称: pod-2    Pod阶段: Running    ResourceVersion: 1081691
2022/12/22 13:12:07    事件类型: MODIFIED Pod名称: pod-1    Pod阶段: Running    ResourceVersion: 1081701
2022/12/22 13:12:07    事件类型: MODIFIED Pod名称: pod-1    Pod阶段: Running    ResourceVersion: 1081702
2022/12/22 13:12:07    事件类型: DELETED  Pod名称: pod-1    Pod阶段: Running    ResourceVersion: 1081703  # 删除pod-1
2022/12/22 13:12:07    事件类型: MODIFIED Pod名称: pod-3    Pod阶段: Running    ResourceVersion: 1081705
2022/12/22 13:12:07    事件类型: MODIFIED Pod名称: pod-3    Pod阶段: Running    ResourceVersion: 1081706
2022/12/22 13:12:07    事件类型: DELETED  Pod名称: pod-3    Pod阶段: Running    ResourceVersion: 1081707  # 删除pod-3
2022/12/22 13:12:07    事件类型: MODIFIED Pod名称: pod-2    Pod阶段: Running    ResourceVersion: 1081708
2022/12/22 13:12:07    事件类型: MODIFIED Pod名称: pod-2    Pod阶段: Running    ResourceVersion: 1081710
2022/12/22 13:12:07    事件类型: DELETED  Pod名称: pod-2    Pod阶段: Running    ResourceVersion: 1081711  # 删除pod-2
2022/12/22 13:12:07    事件类型: ADDED    Pod名称: pod-1    Pod阶段: Pending    ResourceVersion: 1081736  # 添加pod-1
2022/12/22 13:12:07    事件类型: MODIFIED Pod名称: pod-1    Pod阶段: Pending    ResourceVersion: 1081737
2022/12/22 13:12:07    事件类型: ADDED    Pod名称: pod-2    Pod阶段: Pending    ResourceVersion: 1081738  # 添加pod-2
2022/12/22 13:12:07    事件类型: ADDED    Pod名称: pod-3    Pod阶段: Pending    ResourceVersion: 1081739  # 添加pod-3
2022/12/22 13:12:07    事件类型: MODIFIED Pod名称: pod-2    Pod阶段: Pending    ResourceVersion: 1081740
2022/12/22 13:12:07    事件类型: MODIFIED Pod名称: pod-3    Pod阶段: Pending    ResourceVersion: 1081743
2022/12/22 13:12:07    事件类型: MODIFIED Pod名称: pod-1    Pod阶段: Pending    ResourceVersion: 1081744
2022/12/22 13:12:07    事件类型: MODIFIED Pod名称: pod-2    Pod阶段: Pending    ResourceVersion: 1081746
2022/12/22 13:12:07    事件类型: MODIFIED Pod名称: pod-3    Pod阶段: Pending    ResourceVersion: 1081747
2022/12/22 13:12:07    事件类型: MODIFIED Pod名称: pod-1    Pod阶段: Pending    ResourceVersion: 1081756
2022/12/22 13:12:07    事件类型: MODIFIED Pod名称: pod-3    Pod阶段: Pending    ResourceVersion: 1081761
2022/12/22 13:12:07    事件类型: MODIFIED Pod名称: pod-2    Pod阶段: Pending    ResourceVersion: 1081766
2022/12/22 13:12:07    事件类型: MODIFIED Pod名称: pod-1    Pod阶段: Running    ResourceVersion: 1081775
2022/12/22 13:12:07    事件类型: MODIFIED Pod名称: pod-3    Pod阶段: Running    ResourceVersion: 1081776
2022/12/22 13:12:07    事件类型: MODIFIED Pod名称: pod-2    Pod阶段: Running    ResourceVersion: 1081777

# 停掉程序，手动修改resource-version.txt的值为1000，模拟 etcd中已经没有ResourceVersion的值
# 预估程序行为：使用空字符串的ResourceVersion重新创建一个watcher
D:\application\GoLand\example>go run main.go
2022/12/22 13:16:05    Warn: too old resource version: 1000 (1080816)
2022/12/22 13:16:05    事件类型: ADDED    Pod名称: pod-3    Pod阶段: Running    ResourceVersion: 1081776
2022/12/22 13:16:05    事件类型: ADDED    Pod名称: pod-1    Pod阶段: Running    ResourceVersion: 1081775
2022/12/22 13:16:05    事件类型: ADDED    Pod名称: pod-2    Pod阶段: Running    ResourceVersion: 1081777
```

:::

<br />

### 4）监控资源过滤

总结：

* 命名空间：原生只支持单个和所有命名空间
* 资源类型：原生只支持监控一种资源
* 资源过滤：原生只支持标签和字段过滤

::: details （1）监控所有命名空间下的资源

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

const WatchdAllNamespace = ""

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
		return clientset.CoreV1().Pods(WatchdAllNamespace).Watch(ctx, metav1.ListOptions{})
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
		log.Printf("%-2s 事件类型: %-8s 命名空间: %-16s Pod名称: %-40s\n", "",
			event.Type, pod.Namespace, pod.Name,
		)
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
2022/12/22 16:44:13    事件类型: ADDED    命名空间: kube-system      Pod名称: kube-scheduler-node-2                   
2022/12/22 16:44:13    事件类型: ADDED    命名空间: kube-system      Pod名称: calico-node-wckpr                       
2022/12/22 16:44:13    事件类型: ADDED    命名空间: kube-system      Pod名称: etcd-node-2                             
2022/12/22 16:44:13    事件类型: ADDED    命名空间: kube-system      Pod名称: etcd-node-3                             
2022/12/22 16:44:13    事件类型: ADDED    命名空间: kube-system      Pod名称: kube-proxy-277hn                        
2022/12/22 16:44:13    事件类型: ADDED    命名空间: kube-system      Pod名称: calico-kube-controllers-798cc86c47-8jlrm
2022/12/22 16:44:14    事件类型: ADDED    命名空间: kube-system      Pod名称: kube-scheduler-node-3                   
2022/12/22 16:44:14    事件类型: ADDED    命名空间: kube-system      Pod名称: kube-proxy-xk9r7                        
2022/12/22 16:44:14    事件类型: ADDED    命名空间: kube-system      Pod名称: kube-scheduler-node-1                   
2022/12/22 16:44:14    事件类型: ADDED    命名空间: kube-system      Pod名称: coredns-565d847f94-n7d8k                
2022/12/22 16:44:14    事件类型: ADDED    命名空间: kube-system      Pod名称: etcd-node-1                             
2022/12/22 16:44:14    事件类型: ADDED    命名空间: kube-system      Pod名称: kube-controller-manager-node-1          
2022/12/22 16:44:14    事件类型: ADDED    命名空间: kube-system      Pod名称: kube-proxy-72k55                        
2022/12/22 16:44:14    事件类型: ADDED    命名空间: kube-system      Pod名称: kube-apiserver-node-3                   
2022/12/22 16:44:14    事件类型: ADDED    命名空间: kube-system      Pod名称: kube-proxy-zztls                        
2022/12/22 16:44:14    事件类型: ADDED    命名空间: kube-system      Pod名称: calico-node-fgqsz                       
2022/12/22 16:44:14    事件类型: ADDED    命名空间: kube-system      Pod名称: coredns-565d847f94-hclt9                
2022/12/22 16:44:14    事件类型: ADDED    命名空间: kube-system      Pod名称: coredns-565d847f94-tsksp
2022/12/22 16:44:14    事件类型: ADDED    命名空间: kube-system      Pod名称: kube-apiserver-front-proxy-node-4
2022/12/22 16:44:14    事件类型: ADDED    命名空间: kube-system      Pod名称: calico-node-jwflc
2022/12/22 16:44:14    事件类型: ADDED    命名空间: kube-system      Pod名称: kube-apiserver-node-1
2022/12/22 16:44:14    事件类型: ADDED    命名空间: kube-system      Pod名称: kube-controller-manager-node-2
2022/12/22 16:44:14    事件类型: ADDED    命名空间: kube-system      Pod名称: calico-node-jhjwp
2022/12/22 16:44:14    事件类型: ADDED    命名空间: kube-system      Pod名称: kube-apiserver-node-2
2022/12/22 16:44:14    事件类型: ADDED    命名空间: kube-system      Pod名称: kube-controller-manager-node-3
2022/12/22 16:44:14    事件类型: ADDED    命名空间: default          Pod名称: pod-2
2022/12/22 16:44:14    事件类型: ADDED    命名空间: default          Pod名称: pod-3
2022/12/22 16:44:14    事件类型: ADDED    命名空间: default          Pod名称: pod-1
```

:::

::: details （2）对资源进行过滤，比如只监控带指定标签的Pod

```go
// 监控包含app=pod标签并且包含id=1标签的Pod
	watchFunc := func(options metav1.ListOptions) (watch.Interface, error) {
		return clientset.CoreV1().Pods(WatchdAllNamespace).Watch(ctx, metav1.ListOptions{
			LabelSelector: "app=pod-1,id=1",
		})
	}

// 监控包含app标签并且包含id标签的Pod
	watchFunc := func(options metav1.ListOptions) (watch.Interface, error) {
		return clientset.CoreV1().Pods(WatchdAllNamespace).Watch(ctx, metav1.ListOptions{
			LabelSelector: "app,id",
		})
	}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
2022/12/22 17:12:28    事件类型: ADDED    命名空间: default          Pod名称: pod-1                                   
2022/12/22 17:12:37    事件类型: MODIFIED 命名空间: default          Pod名称: pod-1                                   
2022/12/22 17:12:37    事件类型: ADDED    命名空间: default          Pod名称: pod-2
```

:::

<br />

### 5）监控事件研究

::: details （1）研究一下事件的类型

```go
type EventType string

const (
	Added    EventType = "ADDED"
	Modified EventType = "MODIFIED"
	Deleted  EventType = "DELETED"
	Bookmark EventType = "BOOKMARK"
	Error    EventType = "ERROR"
)

type Event struct {
	Type EventType

	// Object is:
	//  * If Type is Added or Modified: the new state of the object.
	//  * If Type is Deleted: the state of the object immediately before deletion.
	//  * If Type is Bookmark: the object (instance of a type being watched) where
	//    only ResourceVersion field is set. On successful restart of watch from a
	//    bookmark resourceVersion, client is guaranteed to not get repeat event
	//    nor miss any events.
	//  * If Type is Error: *api.Status is recommended; other types may make sense
	//    depending on context.
	Object runtime.Object
}

// 这里有两个类型需要重点关注

// Bookmark
//   以RetryWatcher作为示例讲解Bookmark
//   RetryWatcher内部使用了ResourceVersion以保证重试时事件不丢失，且重试时有最小1秒的间隔事件
//   假设最后一次Watch得到ResourceVersion为1000，然后一些我们不关心的Pod一直在产生事件导致ResourceVersion已经变成2000了，
//   这时候我们Watch中断需要重新Watch，但是我们会使用之前的ResourceVersion，服务端就会报错too old resource version: 1000 (2000)，
//   一般的解决办法就是重新List
//   使用Bookmark的话，即使是我们不关心的Pod也会通知到我们，但只会给我们ResourceVersion信息，这时候我们可以更新本地缓存的ResourceVersion,
//   下次重试导致的Watch时ResourceVersion不会太老而报错
//   备注: 只有第一次Watch或重新Watch时候才会使用ResourceVersion。没有找到合适的测试方法，以后再进行测试

// Error
//   出现Error可能的原因，目前就见过以下几个：
//     1.too old resource version: <old> (<new>)
//   当出现Error时，我们可以把它断言为 event.Object.(*metav1.Status)
```

:::

<br />
