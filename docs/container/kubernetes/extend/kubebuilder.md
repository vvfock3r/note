# kubebuilder

Github：[https://github.com/kubernetes-sigs/kubebuilder](https://github.com/kubernetes-sigs/kubebuilder)

文档：[https://book.kubebuilder.io/](https://book.kubebuilder.io/)

<br />

## 基础示例

### 1）要求

* `kubernetes`集群，这里所使用的版本为`v1.25.4`
* 如果开发环境是Windows系统需要注意：
  * `kubebuilder`只提供了Linux和Mac的安装包，没有提供Windows的包
  * 安装Windows版本`kubebuilder`的话还要安装一堆的依赖，不想折腾
  * 这里直接在Linux上进行所有的操作，但是写代码还是要在Windows GoLand中写，可以利用一下GoLand的SFTP自动上传功能，体验超级好
  * 实现的效果就是：GoLand中按下Ctrl + S保存，便会自动上传到Linux中，然后再手动重启服务。具体如何操作可以自行搜索

<br />

### 2）安装

文档：[https://book.kubebuilder.io/quick-start.html](https://book.kubebuilder.io/quick-start.html)

::: details 点击查看详情

```bash
# 安装 gcc
[root@node-1 ~]#  yum -y install gcc gcc-c++

# 安装 go
[root@node-1 ~]# go version
go version go1.19.3 linux/amd64

# 安装 kubebuilder
[root@node-1 ~]# curl -L -o kubebuilder https://go.kubebuilder.io/dl/latest/$(go env GOOS)/$(go env GOARCH)
[root@node-1 ~]# chmod +x kubebuilder && mv kubebuilder /usr/local/bin/

[root@localhost ~]# kubebuilder version 
Version: main.version{KubeBuilderVersion:"3.7.0", KubernetesVendor:"1.24.1", GitCommit:"3bfc84ec8767fa760d1771ce7a0cb05a9a8f6286", BuildDate:"2022-09-20T17:21:57Z", GoOs:"linux", GoArch:"amd64"}
```

:::

<br />

### 3）创建项目

::: details 点击查看详情

```bash
# 创建项目目录
[root@node-1 ~]# mkdir example && cd example

# 初始化
#   --domain 指定域名,默认是my.domain,可以写任意字符串
#   --repo   指定仓库,也是go模块名,可以写任意字符串
[root@node-1 example]# kubebuilder init --domain example.io --repo github.com/vvfock3r/demo
```

:::

<br />

### 4）创建API

::: details 点击查看详情

```bash
[root@node-1 example]# kubebuilder create api --group batch --version v1 --kind MyDemo
```

:::

<br />

### 5）make文档

::: details 点击查看详情

```bash
[root@node-1 example]# make help

Usage:
  make <target>

General
  help             Display this help.

Development
  manifests        Generate WebhookConfiguration, ClusterRole and CustomResourceDefinition objects.
  generate         Generate code containing DeepCopy, DeepCopyInto, and DeepCopyObject method implementations.
  fmt              Run go fmt against code.
  vet              Run go vet against code.
  test             Run tests.

Build
  build            Build manager binary.
  run              Run a controller from your host.
  docker-build     Build docker image with the manager.
  docker-push      Push docker image with the manager.
  docker-buildx    Build and push docker image for the manager for cross-platform support

Deployment
  install          Install CRDs into the K8s cluster specified in ~/.kube/config.
  uninstall        Uninstall CRDs from the K8s cluster specified in ~/.kube/config. Call with ignore-not-found=true to ignore resource not found errors during deletion.
  deploy           Deploy controller to the K8s cluster specified in ~/.kube/config.
  undeploy         Undeploy controller from the K8s cluster specified in ~/.kube/config. Call with ignore-not-found=true to ignore resource not found errors during deletion.

Build Dependencies
  kustomize        Download kustomize locally if necessary.
  controller-gen   Download controller-gen locally if necessary.
  envtest          Download envtest-setup locally if necessary.
```

:::

<br />

### 6）部署 CRD

::: details （1）安装kustomize

安装CRD时候会自动安装此工具，但由于Github访问可能会失败，故提前下载好。必须放到`bin`目录下

```bash
# 安装kustomize
# (1) 可以先查看一下默认使用的是哪个版本
[root@node-1 example]# cat Makefile | grep 'KUSTOMIZE_VERSION ?='
KUSTOMIZE_VERSION ?= v3.8.7

# (2) 下载对应版本
[root@node-1 example]# wget -c https://github.com/kubernetes-sigs/kustomize/releases/download/kustomize%2Fv3.8.7/kustomize_v3.8.7_linux_amd64.tar.gz

# (3) 解压,放入项目的bin目录下
[root@node-1 example]# tar zxf kustomize_v3.8.7_linux_amd64.tar.gz -C ./bin/

# (4) 查看版本
[root@node-1 example]# ./bin/kustomize version
{Version:kustomize/v3.8.7 GitCommit:ad092cc7a91c07fdf63a2e4b7f13fa588a39af4f BuildDate:2020-11-11T23:14:14Z GoOs:linux GoArch:amd64}
```

:::

::: details （2）安装CRD

```bash
# 安装CRD
[root@node-1 example]# make install

# 检查安装是否成功
[root@node-1 example]# kubectl get crd | grep mydemo
mydemoes.batch.example.io                             2022-11-30T10:57:08Z

[root@node-1 example]# kubectl api-resources | grep -Ei 'KIND|MyDemo'
NAME                              SHORTNAMES   APIVERSION                             NAMESPACED   KIND
mydemoes                                       batch.example.io/v1                    true         MyDemo
```

:::

::: details （3）验证CRD

```bash
# 部署一个资源
[root@node-1 example]# vim config/samples/batch_v1_mydemo.yaml
spec:
  # TODO(user): Add fields here
  foo: bar  # 任意增加一个字段

[root@node-1 project]# kubectl apply -f config/samples/batch_v1_mydemo.yaml

# 查看
[root@node-1 example]# kubectl get mydemo
NAME            AGE
mydemo-sample   20s

# 查看详情
[root@node-1 example]# kubectl describe mydemo mydemo-sample
```

:::

<br />

### 7）部署 Controller

::: details （1）在本地运行 Controller，用于测试

```bash
# 在本地运行 Controller，用于测试
[root@node-1 example]# make run
```

:::

::: details （2）部署到kubernetes

```bash
# 构建镜像
# [root@node-1 example]# make docker-build IMG=a/b

# 编辑参数
[root@node-1 example]# vim config/manager/manager.yaml

# 检查都会用到哪些镜像
[root@node-1 config]# find . -type f | xargs grep 'image: ' --color=auto
./manager/manager.yaml:        image: controller:latest
./default/manager_auth_proxy_patch.yaml:        image: gcr.io/kubebuilder/kube-rbac-proxy:v0.13.0

# 部署
[root@node-1 example]# make deploy
```

:::

<br />

### 8）调试 Controller

::: details 点击查看详情

```go
/*
Copyright 2022. 1122

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	batchv1 "github.com/vvfock3r/demo/api/v1"
	appsv1 "k8s.io/api/apps/v1"
	"k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/handler"
	"sigs.k8s.io/controller-runtime/pkg/log"
	"sigs.k8s.io/controller-runtime/pkg/source"
	"time"
)

// MyDemoReconciler reconciles a MyDemo object
type MyDemoReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

//+kubebuilder:rbac:groups=batch.example.io,resources=mydemoes,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=batch.example.io,resources=mydemoes/status,verbs=get;update;patch
//+kubebuilder:rbac:groups=batch.example.io,resources=mydemoes/finalizers,verbs=update

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the MyDemo object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.13.0/pkg/reconcile
func (r *MyDemoReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	// (1) 日志
	logger := log.FromContext(ctx)
	_ = logger

	// (2) 输入参数req代表啥?
	// req: Request,类型为自定义类型，值为Request结构体，本质上就是NamespacedName结构体
	//     Name:           值取决于所要监视的资源，可能是Pod Name，也可能是Deployment Name
	//     Namespace:      命名空间
	//     NamespacedName: 结构体，由NameSpace和Name组成
	//     string():       NamespacedName结构体的String()方法，输出格式为: <NameSpace>/<Name>
	// 分析：
	// 1) 通过req我们是无法区分出资源类型的, 也无法区分是创建、编辑、删除还是其他某种动作
	// 2) 正确的使用方式是：一个Reconciler最好只处理一种类型的资源,也并不区分是何种操作
	reqInfo := map[string]string{
		"CurrentTime   ": time.Now().Format("2006-01-02 15:04:05"),
		"Name          ": req.Name,
		"Namespace     ": req.Namespace,
		"NamespacedName": fmt.Sprintf("%v", req.NamespacedName),
		"String        ": req.String(),
	}
	reqInfoJson, _ := json.MarshalIndent(reqInfo, "", "    ")
	fmt.Printf("\nreq:\n%s\n", string(reqInfoJson))

	// (3) 返回值 ctrl.Result{} 代表啥？
	// type Result struct {
	//	  Requeue 告诉 Controller 是否需要重新处理该请求，即重新入队列,Re-queue
	//	  当请求处理失败时可以将这个值置为true，并返回；默认为false，代表处理成功不需要重新入队
	//	  Requeue bool
	//
	//    RequeueAfter告诉Controller延迟多久后入队，当这个值为非0时会自动将Requeue置为true
	//	  RequeueAfter time.Duration
	// }
	// 分析：当处理失败时可以将返回值设置为true，达到一直重试的效果

	// (4) 如何获取到指定Kind类型的资源，比如Pod、Deployment？
	//     1.需要先watch对应类型的资源，需要修改 SetupWithManager 函数
	//     2.通过Get或List获取对应Kind类型的资源，将对应Kind结构体指针作为参数传入即可，这与读文件时传入的切片数组指针很类似
	//     3.需要对返回的error需要进一步判断资源是否存在 errors.IsNotFound(err)
	//
	var mydemo batchv1.MyDemo
	err := r.Get(ctx, req.NamespacedName, &mydemo)
	if err != nil {
		// 可能是 资源类型不匹配 或 资源匹配但是已经被删除
		if errors.IsNotFound(err) {
			logger.Error(err, "not found")
		} else {
			logger.Error(err, "unknown error")
		}
	}

	return ctrl.Result{}, nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *MyDemoReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		// 如果要监听其他资源,比如Deployment,需要使用Watches函数
		// 下面的For本质上也是在使用Watches函数
		Watches(&source.Kind{Type: &appsv1.Deployment{}}, &handler.EnqueueRequestForObject{}).
		For(&batchv1.MyDemo{}).
		Complete(r)
}
```

:::

<br />

### 9）调试 types



<br />

## 深入原理



<br />

## 实战1：

