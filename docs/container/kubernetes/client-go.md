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

## 实例化客户端

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

```go

```

:::