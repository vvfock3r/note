# client-go

Github：[https://github.com/kubernetes/client-go](https://github.com/kubernetes/client-go)

文档：[https://pkg.go.dev/k8s.io/client-go](https://pkg.go.dev/k8s.io/client-go)

<br />

## 安装

关于版本问题：[https://github.com/kubernetes/client-go/blob/master/INSTALL.md](https://github.com/kubernetes/client-go/blob/master/INSTALL.md)

```bash
# 这里所使用的集群为 kubernetes v1.25.4，所以安装对应版本的client-go v0.25.4
go get k8s.io/client-go@v0.25.4
```

<br />

## Client

总共有4种客户端：

* `RESTClient`：用于以`RESTful`方式与kubernetes进行交互
* `ClientSet`：用于方便的请求kubernetes内置资源
* `DiscoveryClient`：用于请求集群的API信息，如`kubectl api-versions`
* `DynamicClient`：用于请求无类型资源，如`CRD`

说明

* `RESTClient`是最基础的客户端，使用上不是太方便，但是非常灵活，其他三种客户端均是基于`RESTClient`
* `RESTClient`是我们重点学习的客户端，`ClientSet`是我们最常用的客户端

<br />

**ClientSet**

::: details （1）在集群外部，通过配置文件连接到kubernetes

* 将配置文件`~/.kube/config`拷贝一份到项目内
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
D:\application\GoLand\demo>go run main.go                
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
D:\application\GoLand\demo>SET CGO_ENABLED=0
D:\application\GoLand\demo>SET GOOS=linux
D:\application\GoLand\demo>SET GOARCH=amd64
D:\application\GoLand\demo>go build -o main ./main.go
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

## Pod



