# kubebuilder

文档：[https://book.kubebuilder.io/](https://book.kubebuilder.io/)

Github：[https://github.com/kubernetes-sigs/kubebuilder](https://github.com/kubernetes-sigs/kubebuilder)

Hub：[https://operatorhub.io/](https://operatorhub.io/)

<br />

## 1.先跑起来

### 1）要求

* `kubernetes`集群，这里所使用的版本为`v1.25.4`
* `Go`：这里所使用的版本为`1.19.3`
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
# (1) 创建项目目录
[root@node-1 ~]# mkdir example && cd example

# (2) 初始化项目
#   --domain        指定域名,默认是my.domain,可以写任意字符串,后续操作中相关的名称都会放到这个域名下
#                   该名称主要体现在YAML配置 和 kubectl api-resources等中
#   --repo          指定仓库,也是go模块名,可以写任意字符串
#                   该名称主要体现在Go代码中,建议和项目名保持一致
#   --project-name  指定项目名,默认情况下以当前目录作为项目名,这里不做修改
[root@node-1 example]# kubebuilder init --domain devops.io --repo github.com/vvfock3r/example

Writing kustomize manifests for you to edit...
Writing scaffold for you to edit...
Get controller runtime:
$ go get sigs.k8s.io/controller-runtime@v0.13.0
Update dependencies:
$ go mod tidy
Next: define a resource with:
$ kubebuilder create api
```

:::

<br />

### 4）创建API

API版本：[https://kubernetes.io/zh-cn/docs/reference/using-api/#api-reference](https://kubernetes.io/zh-cn/docs/reference/using-api/#api-reference)

::: details 点击查看详情

```bash
# 说明
# 每个组都有一个或多个版本,每个组的每个版本都有一个或多个API。API也就是我们下面所指定的kind
#     --group       指定组名,任意字符串
#     --version     指定版本,任意字符串，但必须匹配正则^v\d+(?:alpha\d+|beta\d+)?$，建议按照约定填写
#     --kind        指定API,任意字符串，首字母必须大写，建议使用大驼峰命名法(每个单词首字母大写)
#     --namespaced  API是否区分命名空间,默认为true,根据实际情况设置
#                   kubectl api-resources --namespaced=false 可以查看默认的API都有哪些是不区分命名空间的,比如Node
#                   特别注意: --namespaced=false这种写法是正确的, --namespaced false这种写法是错误的,不会生效
[root@node-1 example]# kubebuilder create api --group crd --version v1beta1 --kind MyKind --namespaced=true

Create Resource [y/n]
y
Create Controller [y/n]
y
Writing kustomize manifests for you to edit...
Writing scaffold for you to edit...
api/v1beta1/mykind_types.go
controllers/mykind_controller.go
Update dependencies:
$ go mod tidy
Running make:
$ make generate
mkdir -p /root/example/bin
test -s /root/example/bin/controller-gen || GOBIN=/root/example/bin go install sigs.k8s.io/controller-tools/cmd/controller-gen@v0.9.2
/root/example/bin/controller-gen object:headerFile="hack/boilerplate.go.txt" paths="./..."
Next: implement your new API and generate the manifests (e.g. CRDs,CRs) with:
$ make manifests
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
[root@node-1 example]# tar zxf kustomize_v3.8.7_linux_amd64.tar.gz -C ./bin/ && rm -f kustomize_v3.8.7_linux_amd64.tar.gz

# (4) 查看版本
[root@node-1 example]# ./bin/kustomize version | tr ' ' '\n' | tr -d '{}'
Version:kustomize/v3.8.7
GitCommit:ad092cc7a91c07fdf63a2e4b7f13fa588a39af4f
BuildDate:2020-11-11T23:14:14Z
GoOs:linux
GoArch:amd64
```

:::

::: details （2）安装CRD

```bash
# 安装CRD
[root@node-1 example]# make install

test -s /root/example/bin/controller-gen || GOBIN=/root/example/bin go install sigs.k8s.io/controller-tools/cmd/controller-gen@v0.9.2
/root/example/bin/controller-gen rbac:roleName=manager-role crd webhook paths="./..." output:crd:artifacts:config=config/crd/bases
test -s /root/example/bin/kustomize || { curl -Ss "https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/hack/install_kustomize.sh" | bash -s -- 3.8.7 /root/example/bin; }
/root/example/bin/kustomize build config/crd | kubectl apply -f -
customresourcedefinition.apiextensions.k8s.io/mykinds.crd.devops.io created

# 检查安装是否成功
[root@node-1 example]# kubectl get crd | grep mykind
mykinds.crd.devops.io                                 2022-12-01T23:32:37Z

# 检查API是否区分命名空间
[root@node-1 example]# kubectl api-resources | grep -Ei 'KIND|MyKind'
NAME                              SHORTNAMES   APIVERSION                             NAMESPACED   KIND
mykinds                                        crd.devops.io/v1beta1                  true         MyKind
```

:::

::: details （3）验证CRD：部署一个资源，就好比是部署一个Kind: Pod的资源

```bash
# (1) 修改配置(可选)
# 在下面spec中我们增加了一个行foo: bar,foo这个字段并不是可以随意写的
# 在生成的代码中 api/<version>/<kind>_types.go 指定了可以允许我们使用foo这个字段。这是一个自动生成的示例
# type MyKindSpec struct {
#	// INSERT ADDITIONAL SPEC FIELDS - desired state of cluster
#	// Important: Run "make" to regenerate code after modifying this file
#
#	// Foo is an example field of MyKind. Edit mykind_types.go to remove/update
#	Foo string `json:"foo,omitempty"`
#}
[root@node-1 example]# vim config/samples/*.yaml
apiVersion: crd.devops.io/v1beta1
kind: MyKind
metadata:
  labels:
    app.kubernetes.io/name: mykind
    app.kubernetes.io/instance: mykind-sample
    app.kubernetes.io/part-of: example
    app.kuberentes.io/managed-by: kustomize
    app.kubernetes.io/created-by: example
  name: mykind-sample
spec:
  # TODO(user): Add fields here
  foo: bar # 增加一项配置

# (2) 部署
[root@node-1 example]# kubectl apply -f config/samples/
mykind.crd.devops.io/mykind-sample created

# (3) 查看，上面配置文件中并没有指定命名空间，所以部署在default中
[root@node-1 example]# kubectl get mykind -A
NAMESPACE   NAME            AGE
default     mykind-sample   14s

# 当设置资源不区分命名空间后，输出结果是这样的
[root@node-1 example]# kubectl get mykind -A
NAME            AGE
mykind-sample   13s

# (4) 查看详情
[root@node-1 example]# kubectl describe mykind mykind-sample
Name:         mykind-sample
Namespace:    default
Labels:       app.kuberentes.io/managed-by=kustomize
              app.kubernetes.io/created-by=example
              app.kubernetes.io/instance=mykind-sample
              app.kubernetes.io/name=mykind
              app.kubernetes.io/part-of=example
Annotations:  <none>
API Version:  crd.devops.io/v1beta1
Kind:         MyKind
Metadata:
  Creation Timestamp:  2022-12-01T23:48:49Z
  Generation:          1
  Managed Fields:
    API Version:  crd.devops.io/v1beta1
    Fields Type:  FieldsV1
    fieldsV1:
      f:metadata:
        f:annotations:
          .:
          f:kubectl.kubernetes.io/last-applied-configuration:
        f:labels:
          .:
          f:app.kuberentes.io/managed-by:
          f:app.kubernetes.io/created-by:
          f:app.kubernetes.io/instance:
          f:app.kubernetes.io/name:
          f:app.kubernetes.io/part-of:
      f:spec:
        .:
        f:foo:
    Manager:         kubectl-client-side-apply
    Operation:       Update
    Time:            2022-12-01T23:48:49Z
  Resource Version:  122610
  UID:               2effed91-59e7-455b-92c5-205b8c7fd94f
Spec:
  Foo:   bar
Events:  <none>
```

:::

<br />

### 7）部署 Controller

::: details （1）本地运行 Controller，用于代码调试

```bash
# (1) 在本地运行 Controller，用于测试
# 我们看到它监听了两个端口:
# 8080: Metrics server
# 8081: health probe
[root@node-1 example]# make run

test -s /root/example/bin/controller-gen || GOBIN=/root/example/bin go install sigs.k8s.io/controller-tools/cmd/controller-gen@v0.9.2
/root/example/bin/controller-gen rbac:roleName=manager-role crd webhook paths="./..." output:crd:artifacts:config=config/crd/bases
/root/example/bin/controller-gen object:headerFile="hack/boilerplate.go.txt" paths="./..."
go fmt ./...
go vet ./...
go run ./main.go
1.6699387477036989e+09  INFO    controller-runtime.metrics      Metrics server is starting to listen    {"addr": ":8080"}
1.6699387477044919e+09  INFO    setup   starting manager
1.6699387477055354e+09  INFO    Starting EventSource    {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind", "source": "kind source: *v1beta1.MyKind"}
1.669938747706057e+09   INFO    Starting Controller     {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind"}
1.6699387477062912e+09  INFO    Starting server {"path": "/metrics", "kind": "metrics", "addr": "[::]:8080"}
1.669938747706037e+09   INFO    Starting server {"kind": "health probe", "addr": "[::]:8081"}
1.6699387478072164e+09  INFO    Starting workers        {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind", "worker count": 1}

# (2) 查看进程
[root@node-1 ~]# netstat -atlnpu | grep main
tcp        0      0 192.168.48.151:47876    192.168.48.151:6443     ESTABLISHED 17408/main  # 与kubernetes建立连接
tcp6       0      0 :::8080                 :::*                    LISTEN      17408/main          
tcp6       0      0 :::8081                 :::*                    LISTEN      17408/main

# (3) 看一下监控的指标(排除默认的指标)
[root@node-1 ~]# curl -s http://127.0.0.1:8080/metrics | grep -Ev '^#|^go_|^process_'

certwatcher_read_certificate_errors_total 0
certwatcher_read_certificate_total 0
controller_runtime_active_workers{controller="mykind"} 0
controller_runtime_max_concurrent_reconciles{controller="mykind"} 1
controller_runtime_reconcile_errors_total{controller="mykind"} 0
controller_runtime_reconcile_total{controller="mykind",result="error"} 0
controller_runtime_reconcile_total{controller="mykind",result="requeue"} 0
controller_runtime_reconcile_total{controller="mykind",result="requeue_after"} 0
controller_runtime_reconcile_total{controller="mykind",result="success"} 0
rest_client_requests_total{code="200",host="api.k8s.local:6443",method="GET"} 31
workqueue_adds_total{name="mykind"} 0
workqueue_depth{name="mykind"} 0
workqueue_longest_running_processor_seconds{name="mykind"} 0
workqueue_queue_duration_seconds_bucket{name="mykind",le="1e-08"} 0
workqueue_queue_duration_seconds_bucket{name="mykind",le="1e-07"} 0
workqueue_queue_duration_seconds_bucket{name="mykind",le="1e-06"} 0
workqueue_queue_duration_seconds_bucket{name="mykind",le="9.999999999999999e-06"} 0
workqueue_queue_duration_seconds_bucket{name="mykind",le="9.999999999999999e-05"} 0
workqueue_queue_duration_seconds_bucket{name="mykind",le="0.001"} 0
workqueue_queue_duration_seconds_bucket{name="mykind",le="0.01"} 0
workqueue_queue_duration_seconds_bucket{name="mykind",le="0.1"} 0
workqueue_queue_duration_seconds_bucket{name="mykind",le="1"} 0
workqueue_queue_duration_seconds_bucket{name="mykind",le="10"} 0
workqueue_queue_duration_seconds_bucket{name="mykind",le="+Inf"} 0
workqueue_queue_duration_seconds_sum{name="mykind"} 0
workqueue_queue_duration_seconds_count{name="mykind"} 0
workqueue_retries_total{name="mykind"} 0
workqueue_unfinished_work_seconds{name="mykind"} 0
workqueue_work_duration_seconds_bucket{name="mykind",le="1e-08"} 0
workqueue_work_duration_seconds_bucket{name="mykind",le="1e-07"} 0
workqueue_work_duration_seconds_bucket{name="mykind",le="1e-06"} 0
workqueue_work_duration_seconds_bucket{name="mykind",le="9.999999999999999e-06"} 0
workqueue_work_duration_seconds_bucket{name="mykind",le="9.999999999999999e-05"} 0
workqueue_work_duration_seconds_bucket{name="mykind",le="0.001"} 0
workqueue_work_duration_seconds_bucket{name="mykind",le="0.01"} 0
workqueue_work_duration_seconds_bucket{name="mykind",le="0.1"} 0
workqueue_work_duration_seconds_bucket{name="mykind",le="1"} 0
workqueue_work_duration_seconds_bucket{name="mykind",le="10"} 0
workqueue_work_duration_seconds_bucket{name="mykind",le="+Inf"} 0
workqueue_work_duration_seconds_sum{name="mykind"} 0
workqueue_work_duration_seconds_count{name="mykind"} 0

# (4) 看一下健康检查
# 下面这两个路径可以在main.go找到，并且是注册了相同的函数，也就是说这俩URL的功能是一样的
[root@node-1 ~]# curl http://127.0.0.1:8081/healthz ; echo
ok
[root@node-1 ~]# curl http://127.0.0.1:8081/readyz ; echo
ok

# (5) 看一下etcd中注册的信息
[root@node-1 example]# etcdctl get "" --prefix --keys-only | grep -Ei 'example|MyKind'

/registry/apiextensions.k8s.io/customresourcedefinitions/mykinds.crd.devops.io
/registry/clusterrolebindings/example-manager-rolebinding
/registry/clusterrolebindings/example-proxy-rolebinding
/registry/clusterroles/example-manager-role
/registry/clusterroles/example-metrics-reader
/registry/clusterroles/example-proxy-role
/registry/configmaps/example-system/kube-root-ca.crt
/registry/deployments/example-system/example-controller-manager
/registry/endpointslices/example-system/example-controller-manager-metrics-service-64l9x
/registry/events/example-system/example-controller-manager-5db77999bd-5m9kz.172ccbaedd69f3c7
/registry/events/example-system/example-controller-manager-5db77999bd-5m9kz.172ccbaff3786c60
/registry/namespaces/example-system
/registry/pods/example-system/example-controller-manager-5db77999bd-5m9kz
/registry/replicasets/example-system/example-controller-manager-5db77999bd
/registry/rolebindings/example-system/example-leader-election-rolebinding
/registry/roles/example-system/example-leader-election-role
/registry/serviceaccounts/example-system/default
/registry/serviceaccounts/example-system/example-controller-manager
/registry/services/endpoints/example-system/example-controller-manager-metrics-service
/registry/services/specs/example-system/example-controller-manager-metrics-service
```

:::

::: details （2）部署到kubernetes：第一步：使用Docker构建镜像

```bash
# (1) 检查一下Dockerfile,这里只看一下需要注意的点
#     1) RUN go mod download 这里可以加一下代理，防止安装依赖包超时
#     2) FROM gcr.io 这里的镜像下载不到，需要科学上网
[root@node-1 example]# cat Dockerfile
FROM golang:1.19 as builder
RUN go mod download
FROM gcr.io/distroless/static:nonroot

# (2) 修复Dockerfile中的问题
#     1) 修改为 RUN go env -w GOPROXY=https://goproxy.cn,direct && go mod download
#     2) 提前将 gcr.io/distroless/static:nonroot 镜像导入到Docker中

# (3) 构建镜像,这里使用<项目>:<group version>作为镜像名
#     下面有个报错但是不影响，它是对包的一个校验
[root@node-1 example]# make docker-build IMG=devops.io/example:v1beat1

test -s /root/example/bin/controller-gen || GOBIN=/root/example/bin go install sigs.k8s.io/controller-tools/cmd/controller-gen@v0.9.2
/root/example/bin/controller-gen rbac:roleName=manager-role crd webhook paths="./..." output:crd:artifacts:config=config/crd/bases
/root/example/bin/controller-gen object:headerFile="hack/boilerplate.go.txt" paths="./..."
go fmt ./...
go vet ./...
test -s /root/example/bin/setup-envtest || GOBIN=/root/example/bin go install sigs.k8s.io/controller-runtime/tools/setup-envtest@latest
unable to fetch checksum for requested version: unable to fetch metadata for kubebuilder-tools-1.25.0-linux-amd64.tar.gz: Get "https://storage.googleapis.com/storage/v1/b/kubebuilder-tools/o/kubebuilder-tools-1.25.0-linux-amd64.tar.gz": read tcp 192.168.48.151:58374->172.217.163.48:443: read: connection reset by peer
KUBEBUILDER_ASSETS="" go test ./... -coverprofile cover.out
?       github.com/vvfock3r/example     [no test files]
?       github.com/vvfock3r/example/api/v1beta1 [no test files]
ok      github.com/vvfock3r/example/controllers 0.063s  coverage: 0.0% of statements
docker build -t devops.io/example:v1beat1 .
Sending build context to Docker daemon  169.5kB
Step 1/16 : FROM golang:1.19 as builder
 ---> 8ee516e10ce0
Step 2/16 : ARG TARGETOS
 ---> Using cache
 ---> af0c61e23c68
Step 3/16 : ARG TARGETARCH
 ---> Using cache
 ---> dbe4e6ff8d12
Step 4/16 : WORKDIR /workspace
 ---> Using cache
 ---> b99606c0b566
Step 5/16 : COPY go.mod go.mod
 ---> Using cache
 ---> da957e4ccfd8
Step 6/16 : COPY go.sum go.sum
 ---> Using cache
 ---> 6db2c1a346b4
Step 7/16 : RUN go env -w GOPROXY=https://goproxy.cn,direct && go mod download
 ---> Using cache
 ---> b93ee086f13a
Step 8/16 : COPY main.go main.go
 ---> Using cache
 ---> 90766ce5db70
Step 9/16 : COPY api/ api/
 ---> Using cache
 ---> 32dc93e2c120
Step 10/16 : COPY controllers/ controllers/
 ---> Using cache
 ---> 86575dbfa532
Step 11/16 : RUN CGO_ENABLED=0 GOOS=${TARGETOS:-linux} GOARCH=${TARGETARCH} go build -a -o manager main.go
 ---> Using cache
 ---> 74c042cfb76c
Step 12/16 : FROM gcr.io/distroless/static:nonroot
 ---> b152689d931f
Step 13/16 : WORKDIR /
 ---> Using cache
 ---> 2706db9c4a81
Step 14/16 : COPY --from=builder /workspace/manager .
 ---> Using cache
 ---> 24f8deafeb71
Step 15/16 : USER 65532:65532
 ---> Using cache
 ---> 38d01f7223af
Step 16/16 : ENTRYPOINT ["/manager"]
 ---> Using cache
 ---> 64b730ada8d2
Successfully built 64b730ada8d2
Successfully tagged devops.io/example:v1beat1

# (4) 可以根据实际情况选择将Docker镜像上传到镜像仓库,这里没有镜像仓库就不上传了
[root@node-1 example]# make docker-push IMG=devops.io/example:v1beat1
```

:::

::: details （3）部署到kubernetes：第二步：部署到kubernetes

```bash
# (1) 编辑参数,这里就先不修改了
[root@node-1 example]# vim config/manager/manager.yaml

# (2) 检查都会用到哪些镜像
[root@node-1 example]# find config -type f | xargs grep 'image: ' --color=auto
config/default/manager_auth_proxy_patch.yaml:   image: gcr.io/kubebuilder/kube-rbac-proxy:v0.13.0 # 需要科学上网，建议提前下载好
config/manager/manager.yaml:                    image: controller:latest                          # 这里为controller镜像

# (3) 修复镜像问题
#     1) 后面部署controller的时候我们会指定进行，也可以修改上面的镜像
#     2) 提前下载好kube-rbac-proxy镜像
#     3) 这里没有使用镜像仓库，所以需要将以上两个镜像导入到所有的node节点中

# (4) 部署
[root@node-1 example]# make deploy IMG=devops.io/example:v1beat1

test -s /root/example/bin/controller-gen || GOBIN=/root/example/bin go install sigs.k8s.io/controller-tools/cmd/controller-gen@v0.9.2
/root/example/bin/controller-gen rbac:roleName=manager-role crd webhook paths="./..." output:crd:artifacts:config=config/crd/bases
test -s /root/example/bin/kustomize || { curl -Ss "https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/hack/install_kustomize.sh" | bash -s -- 3.8.7 /root/example/bin; }
cd config/manager && /root/example/bin/kustomize edit set image controller=controller:latest
/root/example/bin/kustomize build config/default | kubectl apply -f -
namespace/example-system created
customresourcedefinition.apiextensions.k8s.io/mykinds.crd.devops.io created
serviceaccount/example-controller-manager created
role.rbac.authorization.k8s.io/example-leader-election-role created
clusterrole.rbac.authorization.k8s.io/example-manager-role created
clusterrole.rbac.authorization.k8s.io/example-metrics-reader created
clusterrole.rbac.authorization.k8s.io/example-proxy-role created
rolebinding.rbac.authorization.k8s.io/example-leader-election-rolebinding created
clusterrolebinding.rbac.authorization.k8s.io/example-manager-rolebinding created
clusterrolebinding.rbac.authorization.k8s.io/example-proxy-rolebinding created
service/example-controller-manager-metrics-service created
deployment.apps/example-controller-manager created

# (5) 查看Deployment
[root@node-1 example]# kubectl get deploy -A | grep -Ei 'NAME|example'
NAMESPACE        NAME                         READY   UP-TO-DATE   AVAILABLE   AGE
example-system   example-controller-manager   1/1     1            1           56s

# (6) 查看Pod
[root@node-1 example]# kubectl -n example-system logs example-controller-manager-bbcbc6f95-ln5p9

1.6699512538415365e+09  INFO    controller-runtime.metrics      Metrics server is starting to listen    {"addr": "127.0.0.1:8080"}
1.6699512538417842e+09  INFO    setup   starting manager
1.6699512538420582e+09  INFO    Starting server {"path": "/metrics", "kind": "metrics", "addr": "127.0.0.1:8080"}
1.6699512538421035e+09  INFO    Starting server {"kind": "health probe", "addr": "[::]:8081"}
I1202 03:20:53.842166       1 leaderelection.go:248] attempting to acquire leader lease example-system/683e8863.devops.io...
I1202 03:20:53.897282       1 leaderelection.go:258] successfully acquired lease example-system/683e8863.devops.io
1.6699512538977275e+09  DEBUG   events  example-controller-manager-bbcbc6f95-ln5p9_95a98318-77d0-4aeb-8f86-566516642d10 became leader   {"type": "Normal", "object": {"kind":"Lease","namespace":"example-system","name":"683e8863.devops.io","uid":"8050fdab-efac-49c4-981d-07b06989d146","apiVersion":"coordination.k8s.io/v1","resourceVersion":"144916"}, "reason": "LeaderElection"}
1.6699512538979065e+09  INFO    Starting EventSource    {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind", "source": "kind source: *v1beta1.MyKind"}
1.669951253897971e+09   INFO    Starting Controller     {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind"}
1.6699512540102792e+09  INFO    Starting workers        {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind", "worker count": 1}
```

:::

<br />

## 2.基础调试

### 1）Reconcile

**Controller的作用**

* Controller需要确保实际的情况与YAML文件中`Spec`期望的状态保持一致
* Controller需要是幂等的，即任意多次执行所产生的影响均与一次执行的影响相同
* Controller中我们主要修改的是`Reconcile`函数（协调），`Reconcile`函数的触发机制简介：
  * `Controller`运行起来时会触发一次
  * `Controller`所监听的资源有更新、删除等操作时会触发一次
  * 默认情况下10小时触发一次，可以通过以下方式找到相关说明：`main.go -> ctrl.Options -> SyncPeriod *time.Duration`

源码：`<project>/controllers/<kind>_controller.go`

::: details 点击查看详情

```go
/*
Copyright 2022.

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
	"sigs.k8s.io/controller-runtime/pkg/handler"
	"sigs.k8s.io/controller-runtime/pkg/source"
	"time"

	// 我需要使用Deployment结构体，但是我不知道他在哪个包下面
	// 使用 kubectl api-resources | grep -Ei 'APIVERSION|deployment' 可以发现一些蛛丝马迹：apps/v1
	appsv1 "k8s.io/api/apps/v1"
	corev1 "k8s.io/api/core/v1"
	// 这个导入可以参考main.go是如何导入的，尽量保持一致
	crdv1beta1 "github.com/vvfock3r/example/api/v1beta1"

	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/log"
)

// MyKindReconciler reconciles a MyKind object
type MyKindReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

//+kubebuilder:rbac:groups=crd.devops.io,resources=mykinds,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=crd.devops.io,resources=mykinds/status,verbs=get;update;patch
//+kubebuilder:rbac:groups=crd.devops.io,resources=mykinds/finalizers,verbs=update

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the MyKind object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.13.0/pkg/reconcile
func (r *MyKindReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	// (1) 日志
	logger := log.FromContext(ctx)

	// (2) 输入参数req代表啥?
	// req: Request,类型为自定义类型，值为Request结构体，本质上就是NamespacedName结构体
	//     Name:           名称，值取决于所要监视的资源，默认只监视自定义API的资源，在这里是 MyKind API,名称是 mykind-sample
	//     Namespace:      命名空间，值取决于所要监视的资源,同Name一样
	//     NamespacedName: 结构体，由NameSpace和Name组成
	//     string():       NamespacedName结构体的String()方法，输出格式为: <NameSpace>/<Name>
	// 分析：
	// 1) 通过req我们是无法区分出资源类型的, 也无法区分是创建、编辑、删除还是其他某种动作
	// 2) 正确的使用方式是：一个Reconciler是不需要区分是什么操作的，只要保持资源与YAML中定义的保持一样
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
	//     2.通过Get获取对应Kind类型的资源，将对应Kind结构体指针作为参数传入即可，这与读文件时传入的切片数组指针很类似
	//     3.需要对返回的error需要进一步判断资源是否存在 errors.IsNotFound(err)
	//
	// 查询某一类Kind是否存在
	// error
	//     == nil，代表Kind资源存在，则继续下一步
	//     != nil, 需要进一步判断error:
	//               (1) NotFoundError是正常的，比如Kind已经被删除、若监听了其他类型的Kind就会有这个error,
	//                   此时我们可以使用 errors.IsNotFound(err) 将它转换为nil
	//               (2) 其他错误是非正常的
	// 举例
	//     kubectl apply  返回nil，
	//     kubectl delete 返回 NotFoundError,可以通过errors.IsNotFound来判断
	//     kubectl edit   不触发 Reconcile
	var mykind crdv1beta1.MyKind
	if err := r.Get(ctx, req.NamespacedName, &mykind); err != nil {
		return ctrl.Result{}, client.IgnoreNotFound(err) // IgnoreNotFound如果是NotFoundError则返回nil
	}

	// 以上代码展开是这样的
	//var mykind crdv1beta1.MyKind
	//if err := r.Get(ctx, req.NamespacedName, &mykind); err != nil {
	//	if errors.IsNotFound(err) {
	//		return ctrl.Result{}, nil
	//	}
	//	return ctrl.Result{}, err
	//}

	// (5) Get只能获取单个，若要获取所有的Kind资源，如何操作？
	//     1.使用r.List(ctx context.Context, list ObjectList, opts ...ListOption) error
	//     2.List函数是不区分命名空间的，若要只获取当前命名空间的，可以使用可选参数：client.InNamespace(req.Namespace)
	//     3.List函数若要过滤，可以使用可选参数Matchingxx,比如根据标签过滤：client.MatchingLabels{"key": "value"}
	//     4.InNamespace和Matchingxx限制的是List和Delete操作
	// 查询kube-system命名空间下所有的Pod
	var pods corev1.PodList
	if err := r.List(ctx, &pods, client.InNamespace("kube-system")); err != nil {
		logger.Error(err, "list error")
		return ctrl.Result{}, err
	}
	fmt.Println("kube-system Pods:")
	for _, item := range pods.Items {
		fmt.Printf("  %s\n", item.Name)
	}

	return ctrl.Result{}, nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *MyKindReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&crdv1beta1.MyKind{}).
		// 如果要监听其他资源,比如Deployment,需要使用Watches函数，上面的For本质上也是在使用Watches函数
		Watches(&source.Kind{Type: &appsv1.Deployment{}}, &handler.EnqueueRequestForObject{}).
		Complete(r)
}
```

输出结果

```bash
# 将Controller跑起来
[root@node-1 example]# make run

# 部署CRD资源
[root@node-1 example]# kubectl apply -f config/samples/crd_v1beta1_mykind.yaml 
mykind.crd.devops.io/mykind-sample created

# 查看Controller输出
[root@node-1 example]# make run
test -s /root/example/bin/controller-gen || GOBIN=/root/example/bin go install sigs.k8s.io/controller-tools/cmd/controller-gen@v0.9.2
/root/example/bin/controller-gen rbac:roleName=manager-role crd webhook paths="./..." output:crd:artifacts:config=config/crd/bases
/root/example/bin/controller-gen object:headerFile="hack/boilerplate.go.txt" paths="./..."
go fmt ./...
go vet ./...
go run ./main.go
1.6701565156327682e+09  INFO    controller-runtime.metrics      Metrics server is starting to listen    {"addr": ":8080"}
1.670156515633611e+09   INFO    setup   starting manager
1.6701565156357198e+09  INFO    Starting server {"path": "/metrics", "kind": "metrics", "addr": "[::]:8080"}
1.6701565156357722e+09  INFO    Starting server {"kind": "health probe", "addr": "[::]:8081"}
1.6701565156360724e+09  INFO    Starting EventSource    {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind", "source": "kind source: *v1beta1.MyKind"}
1.6701565156361172e+09  INFO    Starting EventSource    {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind", "source": "kind source: *v1.Deployment"}
1.6701565156361263e+09  INFO    Starting Controller     {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind"}
1.6701565157439098e+09  INFO    Starting workers        {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind", "worker count": 1}

req:
{
    "CurrentTime   ": "2022-12-04 20:21:55",
    "Name          ": "calico-kube-controllers",
    "Namespace     ": "kube-system",
    "NamespacedName": "kube-system/calico-kube-controllers",
    "String        ": "kube-system/calico-kube-controllers"
}

req:
{
    "CurrentTime   ": "2022-12-04 20:21:55",
    "Name          ": "coredns",
    "Namespace     ": "kube-system",
    "NamespacedName": "kube-system/coredns",
    "String        ": "kube-system/coredns"
}

# 上面在获取Kind资源时候没有找到就退出了：crdv1beta1.MyKind
# 下面的输出是 kubectl apply -f xx.yaml之后的

req:
{
    "CurrentTime   ": "2022-12-04 20:21:59",
    "Name          ": "mykind-sample",
    "Namespace     ": "default",
    "NamespacedName": "default/mykind-sample",
    "String        ": "default/mykind-sample"
}
kube-system Pods:
  kube-apiserver-front-proxy-node-4
  kube-apiserver-node-2
  coredns-565d847f94-gxtpx
  kube-apiserver-node-1
  coredns-565d847f94-hclt9
  kube-controller-manager-node-3
  etcd-node-3
  kube-proxy-zztls
  calico-node-jwflc
  kube-controller-manager-node-1
  calico-node-fgqsz
  kube-scheduler-node-1
  kube-proxy-72k55
  etcd-node-1
  calico-node-jhjwp
  kube-scheduler-node-3
  kube-apiserver-node-3
  calico-node-wckpr
  kube-controller-manager-node-2
  coredns-565d847f94-f8xmz
  kube-proxy-xk9r7
  calico-kube-controllers-798cc86c47-8jlrm
  kube-proxy-277hn
  kube-scheduler-node-2
  etcd-node-2
```

:::

<br />

### 2）创建内置资源

当我们创建一个Pod或Deployment等内置资源时，因为它的属性比较多，所以在写代码的时候有两种写法

::: details （1）嵌套式写法

```go
func (r *MyKindReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	// 获取 CR
	var mykind crdv1beta1.MyKind
	if err := r.Get(ctx, req.NamespacedName, &mykind); err != nil {
		return ctrl.Result{}, client.IgnoreNotFound(err)
	}

	// 创建一个Deployment - 嵌套式写法
	deploy := appsv1.Deployment{
		ObjectMeta: metav1.ObjectMeta{
			Name:      "mykind-deployment",
			Namespace: "default",
			OwnerReferences: []metav1.OwnerReference{
				*metav1.NewControllerRef(mykind.GetObjectMeta(), mykind.GroupVersionKind()),
			},
		},
		Spec: appsv1.DeploymentSpec{
			Replicas: func() *int32 { r := int32(1); return &r }(),
			Selector: &metav1.LabelSelector{
				MatchLabels: map[string]string{"app": "k8s"},
			},
			Template: corev1.PodTemplateSpec{
				ObjectMeta: metav1.ObjectMeta{
					Labels: map[string]string{"app": "k8s"},
				},
				Spec: corev1.PodSpec{
					Containers: []corev1.Container{
						{
							Name:    "mykind-pod",
							Image:   "centos:7",
							Command: []string{"sh", "-c", "sleep 3600"},
						},
					},
				},
			},
		},
	}

	if err := r.Create(ctx, &deploy); client.IgnoreAlreadyExists(err) != nil {
		fmt.Println("Deployment创建失败: ", client.IgnoreAlreadyExists(err))
	} else {
		fmt.Println("Deployment创建成功或已存在")
	}

	return ctrl.Result{}, nil
}
```

:::

::: details （2）扁平式写法

```go
func (r *MyKindReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	// 获取 CR
	var mykind crdv1beta1.MyKind
	if err := r.Get(ctx, req.NamespacedName, &mykind); err != nil {
		return ctrl.Result{}, client.IgnoreNotFound(err)
	}

	// 创建一个Deployment - 扁平式写法
	var deploy appsv1.Deployment

    // metadata
	deploy.ObjectMeta = metav1.ObjectMeta{
		Name:      "mykind-deployment",
		Namespace: "default",
		OwnerReferences: []metav1.OwnerReference{
			*metav1.NewControllerRef(mykind.GetObjectMeta(), mykind.GroupVersionKind()),
		},
	}

	// 上面的 OwnerReferences 也可以改写成下面这样，有一部分字段是有Setxxx方法的
	//deploy.SetOwnerReferences([]metav1.OwnerReference{
	//	*metav1.NewControllerRef(mykind.GetObjectMeta(), mykind.GroupVersionKind()),
	//})

    // spec,下面的嵌套还可以继续提出来，这里就不写了
	deploy.Spec = appsv1.DeploymentSpec{
		Replicas: func() *int32 { r := int32(1); return &r }(),
		Selector: &metav1.LabelSelector{
			MatchLabels: map[string]string{"app": "k8s"},
		},
		Template: corev1.PodTemplateSpec{
			ObjectMeta: metav1.ObjectMeta{
				Labels: map[string]string{"app": "k8s"},
			},
			Spec: corev1.PodSpec{
				Containers: []corev1.Container{
					{
						Name:    "mykind-pod",
						Image:   "centos:7",
						Command: []string{"sh", "-c", "sleep 3600"},
					},
				},
			},
		},
	}

	if err := r.Create(ctx, &deploy); client.IgnoreAlreadyExists(err) != nil {
		fmt.Println("Deployment创建失败: ", client.IgnoreAlreadyExists(err))
	} else {
		fmt.Println("Deployment创建成功或已存在")
	}

	return ctrl.Result{}, nil
}
```

:::

<br />

### 3）Types

参考资料：[https://medium.com/@gallettilance/10-things-you-should-know-before-writing-a-kubernetes-controller-83de8f86d659](https://medium.com/@gallettilance/10-things-you-should-know-before-writing-a-kubernetes-controller-83de8f86d659)

在部署示例`CRD`资源的时候（注意不是部署`CRD`），我们提到过可以在spec下加一个foo字段，完整的YAML文件如下：

`<project>/config/samples/<group>_<version>_<kind>.yaml`

::: details 点击查看详情

```yaml
apiVersion: crd.devops.io/v1beta1
kind: MyKind
metadata:
  labels:
    app.kubernetes.io/name: mykind
    app.kubernetes.io/instance: mykind-sample
    app.kubernetes.io/part-of: example
    app.kuberentes.io/managed-by: kustomize
    app.kubernetes.io/created-by: example
  name: mykind-sample
spec:
  # TODO(user): Add fields here
  foo: bar
```

:::

上面的`foo`对应的是`<project>/api/<version>/<kind>_types.go`中的结构体

::: details 点击查看详情

```go
// Spec里面定义：期望达到什么状态
type MyKindSpec struct {
	// INSERT ADDITIONAL SPEC FIELDS - desired state of cluster
	// Important: Run "make" to regenerate code after modifying this file

	// Foo is an example field of MyKind. Edit mykind_types.go to remove/update

    // 上面的foo对应json tag里的foo, omitempty代表在写YAML的时候字段是可选的(empty)，且在序列化的时候会忽略是零值的字段(omit)
	Foo string `json:"foo,omitempty"`
}

// Status里面定义：目前是什么状态
type MyKindStatus struct {
	// INSERT ADDITIONAL STATUS FIELD - define observed state of cluster
	// Important: Run "make" to regenerate code after modifying this file
}
```

:::

我们可以修改`types.go`文件，让`YAML`文件来支持更多的字段。`types.go`文件一旦修改，需要重新安装`CRD`：`make install`

<br />

接下来做一个测试，我想让YAML文件支持更多的字段，比如说支持`name`、`image`、`command`

* 当`kubectl apply -f xx.yaml`时启动一个Pod或多个Pod
* 当`kubectl delete -f xx.yaml`时删除掉上一条命令创建的所有Pod

::: details （1）修改crd_v1beta1_mykind.yaml

```yaml
apiVersion: crd.devops.io/v1beta1
kind: MyKind
metadata:
  labels:
    app.kubernetes.io/name: mykind
    app.kubernetes.io/instance: mykind-sample
    app.kubernetes.io/part-of: example
    app.kuberentes.io/managed-by: kustomize
    app.kubernetes.io/created-by: example
    # 加个自定义标签，metadata里面加的东西跟types.go没有关系
    app: demo
  name: mykind-sample
  namespace: default
spec:
  # 添加以下字段,这些字段需要在types.go中支持，否则会报错
  containers:
    - name: pod-1
      image: busybox:1.28
      command: [ 'sh', '-c', 'echo The app is running! && sleep 3601' ]
    - name: pod-2
      image: busybox:1.28
      command: [ 'sh', '-c', 'echo The app is running! && sleep 3602' ]
    - name: pod-3
      image: busybox:1.28
      command: [ 'sh', '-c', 'echo The app is running! && sleep 3603' ]
```

:::

::: details （2）修改mykind_types.go

```go
type MyKindSpec struct {
	// INSERT ADDITIONAL SPEC FIELDS - desired state of cluster
	// Important: Run "make" to regenerate code after modifying this file

	Containers []Container `json:"containers,omitempty"`
}

type Container struct {
	Name    string   `json:"name,omitempty"`
	Image   string   `json:"image,omitempty"`
	Command []string `json:"command,omitempty"`
}

// 重新安装CRD
// make install
```

:::

::: details （3）修改mykind_controller.go

```go
/*
Copyright 2022.

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
	corev1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	// 这个导入可以参考main.go是如何导入的，尽量保持一致
	crdv1beta1 "github.com/vvfock3r/example/api/v1beta1"

	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/log"
)

// MyKindReconciler reconciles a MyKind object
type MyKindReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

//+kubebuilder:rbac:groups=crd.devops.io,resources=mykinds,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=crd.devops.io,resources=mykinds/status,verbs=get;update;patch
//+kubebuilder:rbac:groups=crd.devops.io,resources=mykinds/finalizers,verbs=update

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the MyKind object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.13.0/pkg/reconcile
func (r *MyKindReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	// (1) 日志
	logger := log.FromContext(ctx)

	// (2) 查询Kind是否存在
	var mykind crdv1beta1.MyKind
	if err := r.Get(ctx, req.NamespacedName, &mykind); err != nil {
		return ctrl.Result{}, client.IgnoreNotFound(err) // IgnoreNotFound如果是NotFoundError则返回nil
	}

	// (3) 新建Pod
	for _, container := range mykind.Spec.Containers {
		//podName := mykind.Name + "-" + container.Name + "-" + uuid.New().String()[:16]
		podName := mykind.Name + "-" + container.Name
		pod := corev1.Pod{
			ObjectMeta: metav1.ObjectMeta{
				Name:      podName,
				Namespace: req.Namespace,
				// 用于将Pod与MyKind资源关联，一旦MyKind资源被删除，那么Pod也将被删除
				OwnerReferences: []metav1.OwnerReference{
					*metav1.NewControllerRef(mykind.GetObjectMeta(), mykind.GroupVersionKind()),
				},
			},
			Spec: corev1.PodSpec{
				Containers: []corev1.Container{
					{
						Name:    container.Name,
						Image:   container.Image,
						Command: container.Command,
					},
				},
			},
		}
		err := r.Create(ctx, &pod)
		if err == nil {
			logger.Info("Create pod success: " + pod.Name)
		} else if errors.IsAlreadyExists(err) {
			logger.Info("Create pod success: " + pod.Name + ": already exists")
		} else {
			logger.Error(err, "Create pod failed: "+pod.Name)
			//return ctrl.Result{}, err
		}
	}

	return ctrl.Result{}, nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *MyKindReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&crdv1beta1.MyKind{}).
		Complete(r)
}
```

:::

::: details （4）部署测试

```bash
# 将Controller跑起来
[root@node-1 example]# make run

# 部署CRD资源
[root@node-1 example]# kubectl apply -f config/samples/crd_v1beta1_mykind.yaml 
mykind.crd.devops.io/mykind-sample created

# 查看Pod有没有创建
[root@node-1 example]# kubectl get pods 
NAME                  READY   STATUS    RESTARTS   AGE
mykind-sample-pod-1   1/1     Running   0          17s
mykind-sample-pod-2   1/1     Running   0          17s
mykind-sample-pod-3   1/1     Running   0          17s

# 删除CRD资源
[root@node-1 example]# kubectl delete -f config/samples/crd_v1beta1_mykind.yaml 
mykind.crd.devops.io "mykind-sample" deleted

# 查看Pod有没有被销毁
[root@node-1 example]# kubectl get pods 
NAME                  READY   STATUS        RESTARTS   AGE
mykind-sample-pod-1   1/1     Terminating   0          84s
mykind-sample-pod-2   1/1     Terminating   0          84s
mykind-sample-pod-3   1/1     Terminating   0          84s

# 查看Controller的日志
[root@node-1 example]# make run
test -s /root/example/bin/controller-gen || GOBIN=/root/example/bin go install sigs.k8s.io/controller-tools/cmd/controller-gen@v0.9.2
/root/example/bin/controller-gen rbac:roleName=manager-role crd webhook paths="./..." output:crd:artifacts:config=config/crd/bases
/root/example/bin/controller-gen object:headerFile="hack/boilerplate.go.txt" paths="./..."
go fmt ./...
go vet ./...
go run ./main.go
1.670156845316296e+09   INFO    controller-runtime.metrics      Metrics server is starting to listen    {"addr": ":8080"}
1.6701568453172016e+09  INFO    setup   starting manager
1.6701568453190153e+09  INFO    Starting server {"path": "/metrics", "kind": "metrics", "addr": "[::]:8080"}
1.6701568453191378e+09  INFO    Starting server {"kind": "health probe", "addr": "[::]:8081"}
1.6701568453192413e+09  INFO    Starting EventSource    {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind", "source": "kind source: *v1beta1.MyKind"}
1.6701568453192644e+09  INFO    Starting Controller     {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind"}
1.6701568454264696e+09  INFO    Starting workers        {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind", "worker count": 1}

# 手动回车，为了看起来清楚点

1.6701568863552523e+09  INFO    Create pod success: mykind-sample-pod-1 {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind", "MyKind": {"name":"mykind-sample","namespace":"default"}, "namespace": "default", "name": "mykind-sample", "reconcileID": "0725b46b-45bd-4537-aea9-818d39327f60"}
1.6701568863661957e+09  INFO    Create pod success: mykind-sample-pod-2 {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind", "MyKind": {"name":"mykind-sample","namespace":"default"}, "namespace": "default", "name": "mykind-sample", "reconcileID": "0725b46b-45bd-4537-aea9-818d39327f60"}
1.6701568863807628e+09  INFO    Create pod success: mykind-sample-pod-3 {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind", "MyKind": {"name":"mykind-sample","namespace":"default"}, "namespace": "default", "name": "mykind-sample", "reconcileID": "0725b46b-45bd-4537-aea9-818d39327f60"}

# 备注
# 这只是一个练习，它并没有实际用处，而且还有很多问题，比如，若要修改YAML文件再apply，Kind资源生效,Spec不生效,因为我们没有针对性的处理
```

:::

<br />

### 4）EventRecorder

EventRecorder可以添加事件记录，就像下面这样

![image-20221214192132247](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221214192132247.png)

::: details 点击查看详情

```go
// 1.导入包
import (
    "k8s.io/client-go/tools/record"
    corev1 "k8s.io/api/core/v1"
)

// 2.添加一个字段
type MyKindReconciler struct {
	client.Client
	Scheme   *runtime.Scheme
	Recorder record.EventRecorder // 添加一个字段
}

// 3.Reconcile函数记录日志
func (r *MyKindReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	// 获取 CR
	var mykind crdv1beta1.MyKind
	if err := r.Get(ctx, req.NamespacedName, &mykind); err != nil {
		return ctrl.Result{}, client.IgnoreNotFound(err)
	}

	// 记录一条正常类型的事件日志
	r.Recorder.Event(&mykind, corev1.EventTypeNormal, "reason", "message")

	// 休眠1秒
	time.Sleep(time.Second)

	// 记录一条错误类型的事件日志
	r.Recorder.Event(&mykind, corev1.EventTypeWarning, "reason2", "message2")

	return ctrl.Result{}, nil
}

// 4.Recorder还没有具体的实现，需要修改main.go
	if err = (&controllers.MyKindReconciler{
		Client:   mgr.GetClient(),
		Scheme:   mgr.GetScheme(),
		Recorder: mgr.GetEventRecorderFor("example"),    // 添加这行
	}).SetupWithManager(mgr); err != nil {
		setupLog.Error(err, "unable to create controller", "controller", "MyKind")
		os.Exit(1)
	}
```

输出结果

```bash
# 查看效果,可以看到最新的事件在最下面
[root@node-1 example]# kubectl describe mykind mykind-sample | sed -n '/Events:/, $'p
Events:
  Type     Reason   Age   From     Message
  ----     ------   ----  ----     -------
  Normal   reason   6s    example  message
  Warning  reason2  5s    example  message2
```

:::

<br />

### 5）Owner

* owner表示资源的从属关系，比如一个 ReplicaSet 是一组 Pod 的 `Owner`,在每个Pod上通过`metadata.ownerReferences`引用`ReplicaSet `的信息
* 创建内置资源时，Kubernetes 会自动设置 `metadata.ownerReference` 的值
* 创建自定义资源时，需要我们手动设置`metadata.ownerReference` 的值
* 当我们设置了这种从属关系之后，删除Owner也会将下属资源删除，举例说明：
  * 删除Deployment，也会将对应的Pod删除
  * 删除CR资源时，所关联的其他资源也将删除

::: details （1）查看内置资源的metadata.ownerReference

```bash
# 看一下Deployment
[root@node-1 ~]# kubectl -n kube-system get deploy
NAME                      READY   UP-TO-DATE   AVAILABLE   AGE
calico-kube-controllers   1/1     1            1           28d
coredns                   2/2     2            2           28d

# 找到对应的Pod
[root@node-1 ~]# kubectl -n kube-system get pod | grep coredns
coredns-565d847f94-d484w                   1/1     Running   4 (11m ago)    109m
coredns-565d847f94-f8xmz                   1/1     Running   45 (11m ago)   28d
coredns-565d847f94-hclt9                   0/1     Error     6              28d

# 查看每个Pod的metadata.ownerReferences,可以看到他们的"父级"都是同一个ReplicaSet
[root@node-1 ~]# kubectl -n kube-system get pod coredns-565d847f94-d484w -o yaml | yq '.metadata.ownerReferences'
- apiVersion: apps/v1
  blockOwnerDeletion: true
  controller: true
  kind: ReplicaSet
  name: coredns-565d847f94
  uid: cba893a3-4977-40b2-b5af-d78cf31e2db6
  
[root@node-1 ~]# kubectl -n kube-system get pod coredns-565d847f94-f8xmz -o yaml | yq '.metadata.ownerReferences'
- apiVersion: apps/v1
  blockOwnerDeletion: true
  controller: true
  kind: ReplicaSet
  name: coredns-565d847f94
  uid: cba893a3-4977-40b2-b5af-d78cf31e2db6
  
[root@node-1 ~]# kubectl -n kube-system get pod coredns-565d847f94-hclt9 -o yaml | yq '.metadata.ownerReferences'
- apiVersion: apps/v1
  blockOwnerDeletion: true
  controller: true
  kind: ReplicaSet
  name: coredns-565d847f94
  uid: cba893a3-4977-40b2-b5af-d78cf31e2db6
  
# 看一下ReplicaSet的metadata.ownerReferences，它的"父级"是Deployment
[root@node-1 ~]# kubectl -n kube-system get rs coredns-565d847f94 -o yaml | yq '.metadata.ownerReferences'
- apiVersion: apps/v1
  blockOwnerDeletion: true
  controller: true
  kind: Deployment
  name: coredns
  uid: 3e1304da-60c7-4119-964c-3304293fe70a
  
# 看一下Deployment的metadata.ownerReferences
[root@node-1 ~]# kubectl -n kube-system get deploy coredns -o yaml | yq '.metadata.ownerReferences'
null
```

:::

::: details （2）自定义资源手动关联metadata.ownerReference

```go
/*
Copyright 2022.

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
	"fmt"
	appsv1 "k8s.io/api/apps/v1"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"sigs.k8s.io/controller-runtime/pkg/handler"
	"sigs.k8s.io/controller-runtime/pkg/source"

	// 这个导入可以参考main.go是如何导入的，尽量保持一致
	crdv1beta1 "github.com/vvfock3r/example/api/v1beta1"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
)

// MyKindReconciler reconciles a MyKind object
type MyKindReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

//+kubebuilder:rbac:groups=crd.devops.io,resources=mykinds,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=crd.devops.io,resources=mykinds/status,verbs=get;update;patch
//+kubebuilder:rbac:groups=crd.devops.io,resources=mykinds/finalizers,verbs=update

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the MyKind object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.13.0/pkg/reconcile

func (r *MyKindReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	// 获取 CR
	var mykind crdv1beta1.MyKind
	if err := r.Get(ctx, req.NamespacedName, &mykind); err != nil {
		return ctrl.Result{}, client.IgnoreNotFound(err)
	}

	// 创建一个Deployment	
	deploy := appsv1.Deployment{
		// deployment metadata
		ObjectMeta: metav1.ObjectMeta{
			Name:      "mykind-deployment",
			Namespace: "default",
			OwnerReferences: []metav1.OwnerReference{
				*metav1.NewControllerRef(mykind.GetObjectMeta(), mykind.GroupVersionKind()),
			},
		},
		// deployment spec
		Spec: appsv1.DeploymentSpec{
			Replicas: func() *int32 { r := int32(1); return &r }(),
			Selector: &metav1.LabelSelector{
				MatchLabels: map[string]string{"app": "k8s"},
			},
			// template
			Template: corev1.PodTemplateSpec{
				ObjectMeta: metav1.ObjectMeta{
					Labels: map[string]string{"app": "k8s"},
				},
				// spec
				Spec: corev1.PodSpec{
					// containers
					Containers: []corev1.Container{
						{
							Name:    "mykind-pod",
							Image:   "centos:7",
							Command: []string{"sh", "-c", "sleep 3600"},
						},
					},
				},
			},
		},
	}
	if err := r.Create(ctx, &deploy); client.IgnoreAlreadyExists(err) != nil {
		fmt.Println("Deployment创建失败: ", client.IgnoreAlreadyExists(err))
	} else {
		fmt.Println("Deployment创建成功或已存在")
	}

	return ctrl.Result{}, nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *MyKindReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&crdv1beta1.MyKind{}).
		Complete(r)
}
```

输出效果

```bash
# 查看Deployment
[root@node-1 ~]# kubectl get deploy
NAME                READY   UP-TO-DATE   AVAILABLE   AGE
mykind-deployment   0/1     1            0           6m6s

# 查看Deployment的metadata.ownerReferences，它的"父级"就是我们的CR资源
[root@node-1 ~]# kubectl get deploy mykind-deployment -o yaml | yq '.metadata.ownerReferences'
- apiVersion: crd.devops.io/v1beta1
  blockOwnerDeletion: true
  controller: true
  kind: MyKind
  name: mykind-sample
  uid: 99bd8795-81ab-4a37-aabd-199df5bf7471

# 查看一下对应的Pod，"父级"是ReplicaSet，和原生的Deployment一样
[root@node-1 ~]# kubectl get pod mykind-deployment-9d64b486b-hcqv8 -o yaml | yq '.metadata.ownerReferences'
- apiVersion: apps/v1
  blockOwnerDeletion: true
  controller: true
  kind: ReplicaSet
  name: mykind-deployment-9d64b486b
  uid: 4f09d7bf-3374-417b-8e0d-13c916b8fb0f
  
# 当我们把CR资源删除以后，Deployment也会自动删除
[root@node-1 example]# kubectl delete -f config/samples/crd_v1beta1_mykind.yaml
```

:::

::: details （3）监控Deployment发生变化

若Deployment发生变化，此时我们的Reconcile是感知不到的，这不太符合我们的预期

我们想让这个Deployment一直在运行，除非是我们手动删除了CR资源

此时可以使用Owns来监控Deployment，Deployment一旦发生变化会通过`.metadata.ownerReferences`传递到我们的Reconcile中

```go
func (r *MyKindReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&crdv1beta1.MyKind{}).
		Owns(&appsv1.Deployment{}). // 添加这行
		Complete(r)
}
```

查看效果

```bash
# 删除Deployment后，会通知到Reconcile，然后它帮我们又创建一个新的Deployment
[root@node-1 example]# kubectl delete deploy mykind-deployment

[root@node-1 example]# kubectl get deploy 
NAME                READY   UP-TO-DATE   AVAILABLE   AGE
mykind-deployment   0/1     1            0           10s
```

:::

注意事项：

* 设置了`.metadata.ownerReferences`的资源必须和其指定的"父级"资源属于同一个命名空间，否则就会出现逻辑错误，举个例子：

  * 代码中Deployment创建成功
  * `kubectl get deploy -A`却查询不到
  * `kubectl get pods -A`可以查到，但是却是`Terminating`状态

* 在我们上面的例子中，正确的写法应该是`Namespace: req.Namespace`，而不是可以写任意命名空间

* `OwnerReference`结构体注释中关于命名空间的描述

  ```go
  // OwnerReference contains enough information to let you identify an owning
  // object. An owning object must be in the same namespace as the dependent, or
  // be cluster-scoped, so there is no namespace field.
  // +structType=atomic
  type OwnerReference struct {
  	...
  }
  ```

<br />

### 6）监听其他资源

按照正规的思路，一个Controller应该只需要监控一种资源，即监控CR本身自己。但是也支持监视其他资源，比如Pod、Deployment等

::: details 默认生成的代码只会监视CR资源

```go
// 关键点在于下面的For
func (r *MyKindReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&crdv1beta1.MyKind{}).
		Complete(r)
}

// 1.查看For源码的注释，发现
//     For(&crdv1beta1.MyKind{}).
//                 等于
//     	Watches(
//			&source.Kind{Type: &crdv1beta1.MyKind{}},
//			&handler.EnqueueRequestForObject{},
//		).

// 2.Owns上面我们讲过，查看Owns源码的注释，发现
//     Owns(&appsv1.Deployment{}).
//                等于   
//		Watches(
//			&source.Kind{Type: &appsv1.Deployment{}},
//			&handler.EnqueueRequestForOwner{
//				OwnerType:    &crdv1beta1.MyKind{},
//				IsController: true,
//			},
//		).

// 3.For和Owns都是对Watches的一层包装，让我们使用更简单，所以关键点在于Watches函数
```

:::

::: details Watches函数参数

```go
// 函数签名
func (blder *Builder) Watches(src source.Source, eventhandler handler.EventHandler, opts ...WatchesOption) *Builder

// 参数
//   source                       事件源，比如要监控Deployment，可以写做&source.Kind{Type: &appsv1.Deployment{}}
//   EventHandler                 事件入队处理，支持三种方式：
//     EnqueueRequestForObject    资源变动时将资源<Namespace/Name>加入workqueue
//     EnqueueRequestForOwner     资源变动时将资源ownerReference中指定的资源的<Namespace/Name>加入workqueue
//     EnqueueRequestsFromMapFunc 定义一个关联函数，资源变动时生成一组Reconcile.Request
```

:::

::: details （1）EnqueueRequestForObject：资源变动时将资源 Namespace/Name 加入workqueue

```go
// 这个最容易理解，哪个资源变动，就将资源的<Namespace/Name>作为req传递到Reconcile中

import (
    corev1 "k8s.io/api/core/v1"
    "sigs.k8s.io/controller-runtime/pkg/source"
    "sigs.k8s.io/controller-runtime/pkg/handler"
)

func (r *MyKindReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	fmt.Println(req)
	return ctrl.Result{}, nil
}

func (r *MyKindReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&crdv1beta1.MyKind{}).
		// 监控所有的Pod,并将Pod的<Namespce>/<Name>作为req传到Reconcile中
		Watches(&source.Kind{Type: &corev1.Pod{}}, &handler.EnqueueRequestForObject{}).
		Complete(r)
}
```

输出结果

```bash
[root@node-1 example]# make run
test -s /root/example/bin/controller-gen || GOBIN=/root/example/bin go install sigs.k8s.io/controller-tools/cmd/controller-gen@v0.9.2
/root/example/bin/controller-gen rbac:roleName=manager-role crd webhook paths="./..." output:crd:artifacts:config=config/crd/bases
/root/example/bin/controller-gen object:headerFile="hack/boilerplate.go.txt" paths="./..."
go fmt ./...
go vet ./...
go run ./main.go
1.6710905158347652e+09  INFO    controller-runtime.metrics      Metrics server is starting to listen    {"addr": ":8080"}
1.671090515835489e+09   INFO    setup   starting manager
1.671090515837014e+09   INFO    Starting server {"kind": "health probe", "addr": "[::]:8081"}
1.6710905158370821e+09  INFO    Starting server {"path": "/metrics", "kind": "metrics", "addr": "[::]:8080"}
1.6710905158372035e+09  INFO    Starting EventSource    {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind", "source": "kind source: *v1beta1.MyKind"}
1.6710905158372345e+09  INFO    Starting EventSource    {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind", "source": "kind source: *v1.Pod"}
1.6710905158372438e+09  INFO    Starting Controller     {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind"}
1.6710905159385548e+09  INFO    Starting workers        {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind", "worker count": 1}
/mykind-sample
kube-system/kube-scheduler-node-1
kube-system/kube-scheduler-node-3
kube-system/kube-scheduler-node-2
kube-system/kube-proxy-277hn
kube-system/coredns-565d847f94-d484w
kube-system/etcd-node-1
kube-system/coredns-565d847f94-f8xmz
kube-system/kube-apiserver-node-3
kube-system/coredns-565d847f94-hclt9
kube-system/etcd-node-2
kube-system/kube-controller-manager-node-1
kube-system/calico-node-wckpr
kube-system/calico-node-jhjwp
kube-system/kube-apiserver-node-2
kube-system/kube-controller-manager-node-2
kube-system/calico-node-jwflc
kube-system/calico-node-fgqsz
default/mykind-deployment-9d64b486b-l9kdl
default/mykind-deployment-7bc7889bc-79ccg
kube-system/calico-kube-controllers-798cc86c47-8jlrm
kube-system/kube-apiserver-front-proxy-node-4
kube-system/kube-proxy-zztls
kube-system/kube-apiserver-node-1
kube-system/etcd-node-3
kube-system/kube-controller-manager-node-3
kube-system/kube-proxy-xk9r7
kube-system/kube-proxy-72k55
```

:::

::: details （2）EnqueueRequestForOwner：资源变动时将资源ownerReference中指定的资源的 Namespace/Name 加入workqueue

```go
/*
Copyright 2022.

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
	"fmt"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"sigs.k8s.io/controller-runtime/pkg/handler"
	"sigs.k8s.io/controller-runtime/pkg/source"

	// 这个导入可以参考main.go是如何导入的，尽量保持一致
	crdv1beta1 "github.com/vvfock3r/example/api/v1beta1"
	appsv1 "k8s.io/api/apps/v1"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
)

// MyKindReconciler reconciles a MyKind object
type MyKindReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

//+kubebuilder:rbac:groups=crd.devops.io,resources=mykinds,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=crd.devops.io,resources=mykinds/status,verbs=get;update;patch
//+kubebuilder:rbac:groups=crd.devops.io,resources=mykinds/finalizers,verbs=update

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the MyKind object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.13.0/pkg/reconcile

func (r *MyKindReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	fmt.Println(req)

	// 获取 CR
	var mykind crdv1beta1.MyKind
	if err := r.Get(ctx, req.NamespacedName, &mykind); err != nil {
		return ctrl.Result{}, client.IgnoreNotFound(err)
	}

	// 创建一个Deployment - 嵌套式写法
	deploy := appsv1.Deployment{
		ObjectMeta: metav1.ObjectMeta{
			Name:      "mykind-deployment",
			Namespace: "default",
			OwnerReferences: []metav1.OwnerReference{
				*metav1.NewControllerRef(mykind.GetObjectMeta(), mykind.GroupVersionKind()),
			},
		},
		Spec: appsv1.DeploymentSpec{
			Replicas: func() *int32 { r := int32(1); return &r }(),
			Selector: &metav1.LabelSelector{
				MatchLabels: map[string]string{"app": "k8s"},
			},
			Template: corev1.PodTemplateSpec{
				ObjectMeta: metav1.ObjectMeta{
					Labels: map[string]string{"app": "k8s"},
				},
				Spec: corev1.PodSpec{
					Containers: []corev1.Container{
						{
							Name:    "mykind-pod",
							Image:   "centos:7",
							Command: []string{"sh", "-c", "sleep 3600"},
						},
					},
				},
			},
		},
	}

	if err := r.Create(ctx, &deploy); client.IgnoreAlreadyExists(err) != nil {
		fmt.Println("Deployment创建失败: ", client.IgnoreAlreadyExists(err))
	} else {
		fmt.Println("Deployment创建成功或已存在")
	}

	return ctrl.Result{}, nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *MyKindReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&crdv1beta1.MyKind{}).
		// 监控所有的Deployment,但需要满足以下条件：
		//   <Deployment>.metadata.ownerReferences.kind == MyKind
		// 将满足条件的Deployment引用的CR的<Namespce>/<Name>作为req传到Reconcile中。注意传递的不是Deployment的信息
		// 下面的代码等同于 Owns(&appsv1.Deployment{}).
		Watches(&source.Kind{Type: &appsv1.Deployment{}}, &handler.EnqueueRequestForOwner{
			OwnerType:    &crdv1beta1.MyKind{},
			IsController: true,
		}).				
		Complete(r)
}
```

:::

::: details （3）EnqueueRequestsFromMapFunc：定义一个关联函数，资源变动时生成一组Reconcile.Request，这里模拟Owns函数

```go
/*
Copyright 2022.

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
	"fmt"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/types"
	"sigs.k8s.io/controller-runtime/pkg/handler"
	"sigs.k8s.io/controller-runtime/pkg/reconcile"
	"sigs.k8s.io/controller-runtime/pkg/source"

	// 这个导入可以参考main.go是如何导入的，尽量保持一致
	crdv1beta1 "github.com/vvfock3r/example/api/v1beta1"
	appsv1 "k8s.io/api/apps/v1"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
)

// MyKindReconciler reconciles a MyKind object
type MyKindReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

//+kubebuilder:rbac:groups=crd.devops.io,resources=mykinds,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=crd.devops.io,resources=mykinds/status,verbs=get;update;patch
//+kubebuilder:rbac:groups=crd.devops.io,resources=mykinds/finalizers,verbs=update

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the MyKind object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.13.0/pkg/reconcile

func (r *MyKindReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	// 获取 CR
	var mykind crdv1beta1.MyKind
	if err := r.Get(ctx, req.NamespacedName, &mykind); err != nil {
		return ctrl.Result{}, client.IgnoreNotFound(err)
	}

	// 创建一个Deployment - 嵌套式写法
	deploy := appsv1.Deployment{
		ObjectMeta: metav1.ObjectMeta{
			Name:      "mykind-deployment",
			Namespace: "default",
			OwnerReferences: []metav1.OwnerReference{
				*metav1.NewControllerRef(mykind.GetObjectMeta(), mykind.GroupVersionKind()),
			},
		},
		Spec: appsv1.DeploymentSpec{
			Replicas: func() *int32 { r := int32(1); return &r }(),
			Selector: &metav1.LabelSelector{
				MatchLabels: map[string]string{"app": "k8s"},
			},
			Template: corev1.PodTemplateSpec{
				ObjectMeta: metav1.ObjectMeta{
					Labels: map[string]string{"app": "k8s"},
				},
				Spec: corev1.PodSpec{
					Containers: []corev1.Container{
						{
							Name:    "mykind-pod",
							Image:   "centos:7",
							Command: []string{"sh", "-c", "sleep 3600"},
						},
					},
				},
			},
		},
	}

	namespacedName := deploy.Namespace + "/" + deploy.Name
	if err := r.Create(ctx, &deploy); client.IgnoreAlreadyExists(err) != nil {
		fmt.Printf("Deployment创建失败: %s: %s\n", namespacedName, client.IgnoreAlreadyExists(err))
	} else {
		fmt.Printf("Deployment创建成功或已存在: %s\n", namespacedName)
	}

	return ctrl.Result{}, nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *MyKindReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&crdv1beta1.MyKind{}).
		Watches(&source.Kind{Type: &appsv1.Deployment{}}, handler.EnqueueRequestsFromMapFunc(func(object client.Object) []reconcile.Request {
			// 查看一下对象的Namespace和Name
			//fmt.Printf("Object NamespacedName: %s\n", object.GetNamespace()+"/"+object.GetName())
			// 模拟Owns函数
			var requestList []reconcile.Request
			for _, owner := range object.GetOwnerReferences() {
				if owner.Kind == "MyKind" {
					// 传递的是Deployment的NamespacedName
					//requestList = append(requestList, reconcile.Request{
					//	NamespacedName: types.NamespacedName{
					//		Namespace: object.GetNamespace(),
					//		Name:      object.GetName(),
					//	},
					//})
					// 传递的是CR的NamespacedName
					requestList = append(requestList, reconcile.Request{
						NamespacedName: types.NamespacedName{
							Namespace: object.GetNamespace(),
							Name:      owner.Name,
						},
					})

					// 两者的区别在于Name不同，而Namespace是相同的，为什么Namespace是相同的？
					// OwnerReference的注释中说的很清楚
					// An owning object must be in the same namespace as the dependent, or be cluster-scoped, so there is no namespace field
				}
			}
			return requestList
		})).		
		Complete(r)
}
```

:::

<br />

### 7）监听指定事件

默认情况下会监听所有事件，我们可以通过`WithEventFilter`来监听或不监听某些事件

::: details （1）全局过滤指定事件

```go
func (r *MyKindReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	fmt.Println("Running...")
	return ctrl.Result{}, nil
}

func (r *MyKindReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&crdv1beta1.MyKind{}).
		// 事件过滤: 假如我不想监听删除事件,那么让DeleteFunc返回false即可
		WithEventFilter(predicate.Funcs{
			CreateFunc: func(createEvent event.CreateEvent) bool {
				return true
			},
			DeleteFunc: func(e event.DeleteEvent) bool {
				return false
			},
			UpdateFunc: func(updateEvent event.UpdateEvent) bool {
				return true
			},
			GenericFunc: func(genericEvent event.GenericEvent) bool {
				return true
			},
		}).
		Complete(r)
}
```

输出结果

```bash
# 启动Controller
[root@node-1 example]# make run
test -s /root/example/bin/controller-gen || GOBIN=/root/example/bin go install sigs.k8s.io/controller-tools/cmd/controller-gen@v0.9.2
/root/example/bin/controller-gen rbac:roleName=manager-role crd webhook paths="./..." output:crd:artifacts:config=config/crd/bases
/root/example/bin/controller-gen object:headerFile="hack/boilerplate.go.txt" paths="./..."
go fmt ./...
go vet ./...
go run ./main.go
1.671108174078604e+09   INFO    controller-runtime.metrics      Metrics server is starting to listen    {"addr": ":8080"}
1.67110817407954e+09    INFO    setup   starting manager
1.671108174080219e+09   INFO    Starting server {"path": "/metrics", "kind": "metrics", "addr": "[::]:8080"}
1.6711081740804477e+09  INFO    Starting server {"kind": "health probe", "addr": "[::]:8081"}
1.671108174080466e+09   INFO    Starting EventSource    {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind", "source": "kind source: *v1beta1.MyKind"}
1.6711081740805044e+09  INFO    Starting Controller     {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind"}
1.6711081741840272e+09  INFO    Starting workers        {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind", "worker count": 1}
Running...     # 程序启动输出一次

# 删除CR，Controller并没有日志输出
[root@node-1 example]# kubectl delete -f config/samples/crd_v1beta1_mykind.yaml
mykind.crd.devops.io "mykind-sample" deleted

# 创建CR，Controller有日志输出：Running...
[root@node-1 example]# kubectl apply -f config/samples/crd_v1beta1_mykind.yaml
mykind.crd.devops.io/mykind-sample created
```

:::

::: details （2）Watches中过滤指定事件

```go
func (r *MyKindReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	fmt.Println("Running...")
	return ctrl.Result{}, nil
}

func (r *MyKindReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&crdv1beta1.MyKind{}).
		Watches(
			&source.Kind{Type: &corev1.Pod{}},
			&handler.EnqueueRequestForObject{},
            // 事件过滤: 只监听删除事件
			builder.WithPredicates(predicate.Funcs{
				CreateFunc: func(createEvent event.CreateEvent) bool {
					return false
				},
				DeleteFunc: func(e event.DeleteEvent) bool {
					return true
				},
				UpdateFunc: func(updateEvent event.UpdateEvent) bool {
					return false
				},
				GenericFunc: func(genericEvent event.GenericEvent) bool {
					return false
				},
			})).
		Complete(r)
}
```

输出结果

```bash
# 创建、删除Pod走一遍流程即可明白
```

:::

<br />

### 8）Finalizer

Finalizer表示预删除操作

在一般情况下，如果资源被删除之后，我们虽然能够被触发删除事件，但是这个时候从 Cache 里面无法读取任何被删除对象的信息，这样一来，导致很多垃圾清理工作因为信息不足无法进行。

Finalizer字段用于处理这种情况。只要对象 ObjectMeta 里面的 Finalizers 不为空，对该对象的 delete 操作就会转变为 update 操作，具体说就是 update deletionTimestamp 字段，其意义就是告诉 K8s 的 GC "在deletionTimestamp 这个时刻之后，只要 Finalizers 为空，就立马删除掉该对象"

所以一般的使用姿势就是在创建对象时把 Finalizers 设置好（string切片），然后处理 DeletionTimestamp 不为空的 update 操作（实际是 delete），根据 Finalizers 的值执行完所有的 pre-delete hook（此时可以在 Cache 里面读取到被删除对象的任何信息）之后将 Finalizers 置为空即可

::: details 准备一段普通的Controller代码

```go
/*
Copyright 2022.

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
	"fmt"
	appsv1 "k8s.io/api/apps/v1"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	// 这个导入可以参考main.go是如何导入的，尽量保持一致
	crdv1beta1 "github.com/vvfock3r/example/api/v1beta1"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
)

// MyKindReconciler reconciles a MyKind object
type MyKindReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

//+kubebuilder:rbac:groups=crd.devops.io,resources=mykinds,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=crd.devops.io,resources=mykinds/status,verbs=get;update;patch
//+kubebuilder:rbac:groups=crd.devops.io,resources=mykinds/finalizers,verbs=update

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the MyKind object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.13.0/pkg/reconcile

func (r *MyKindReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	// 获取 CR
	var mykind crdv1beta1.MyKind
	if err := r.Get(ctx, req.NamespacedName, &mykind); err != nil {
		return ctrl.Result{}, client.IgnoreNotFound(err)
	}

	// 创建一个Deployment - 嵌套式写法
	deploy := appsv1.Deployment{
		ObjectMeta: metav1.ObjectMeta{
			Name:      "mykind-deployment",
			Namespace: req.Namespace,
			OwnerReferences: []metav1.OwnerReference{
				*metav1.NewControllerRef(mykind.GetObjectMeta(), mykind.GroupVersionKind()),
			},
		},
		Spec: appsv1.DeploymentSpec{
			Replicas: func() *int32 { r := int32(1); return &r }(),
			Selector: &metav1.LabelSelector{
				MatchLabels: map[string]string{"app": "k8s"},
			},
			Template: corev1.PodTemplateSpec{
				ObjectMeta: metav1.ObjectMeta{
					Labels: map[string]string{"app": "k8s"},
				},
				Spec: corev1.PodSpec{
					Containers: []corev1.Container{
						{
							Name:    "mykind-pod",
							Image:   "busybox:1.29",
							Command: []string{"sh", "-c", "sleep 3600"},
						},
					},
				},
			},
		},
	}

	namespacedName := deploy.Namespace + "/" + deploy.Name
	if err := r.Create(ctx, &deploy); client.IgnoreAlreadyExists(err) != nil {
		fmt.Printf("Deployment创建失败: %s: %s\n", namespacedName, client.IgnoreAlreadyExists(err))
	} else {
		fmt.Printf("Deployment创建成功或已存在: %s\n", namespacedName)
	}

	return ctrl.Result{}, nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *MyKindReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&crdv1beta1.MyKind{}).
		Owns(&appsv1.Deployment{}).
		Complete(r)
}

```

分析代码

* Controller确保集群存在一个名叫mykind-deployment的Deployment
* 当CR被删除以后，Deployment也会被删除（`OwnerReferences`起的作用）
* 当Deployment被删除后，会自动创建一个新的Deployment（`Owns(&appsv1.Deployment{})`起的作用）

:::

::: details （1）修改CR增加 finalizer 字段，因为控制器没有对应的处理逻辑，所以CR将无法直接删除

```bash
# 先将原来的CR删除
[root@node-1 example]# kubectl delete -f config/samples/crd_v1beta1_mykind.yaml
mykind.crd.devops.io "mykind-sample" deleted

# 修改CR，增加 finalizers
apiVersion: crd.devops.io/v1beta1
kind: MyKind
metadata:
  labels:
    app.kubernetes.io/name: mykind
    app.kubernetes.io/instance: mykind-sample
    app.kubernetes.io/part-of: example
    app.kuberentes.io/managed-by: kustomize
    app.kubernetes.io/created-by: example
  name: mykind-sample
  finalizers:
    - kubernetes
spec:

# 部署 CR
[root@node-1 example]# kubectl apply -f config/samples/crd_v1beta1_mykind.yaml
mykind.crd.devops.io/mykind-sample created

# 再删除CR，因为我们的控制器还没有处理finalizers的逻辑，所以这里会一直卡着，删不掉
# 它其实已经进入了删除的逻辑，等 finalizers逻辑处理完成后会自动删除
[root@node-1 example]# kubectl delete -f config/samples/crd_v1beta1_mykind.yaml
mykind.crd.devops.io "mykind-sample" deleted

# 如果要删掉它的话，需要先将 finalizers 字段去掉。将下面两行删掉
# 此时 kubectl delete -f xx.yaml 会立即返回
[root@node-1 ~]# kubectl edit mykind mykind-sample
  finalizers:
  - kubernetes
```

:::

::: details （2）Controller处理 finalizer 逻辑

```go
/*
Copyright 2022.

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
	"fmt"
	appsv1 "k8s.io/api/apps/v1"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"time"

	// 这个导入可以参考main.go是如何导入的，尽量保持一致
	crdv1beta1 "github.com/vvfock3r/example/api/v1beta1"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
)

// MyKindReconciler reconciles a MyKind object
type MyKindReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

//+kubebuilder:rbac:groups=crd.devops.io,resources=mykinds,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=crd.devops.io,resources=mykinds/status,verbs=get;update;patch
//+kubebuilder:rbac:groups=crd.devops.io,resources=mykinds/finalizers,verbs=update

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the MyKind object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.13.0/pkg/reconcile

func (r *MyKindReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	// 获取 CR
	var mykind crdv1beta1.MyKind
	if err := r.Get(ctx, req.NamespacedName, &mykind); err != nil {
		return ctrl.Result{}, client.IgnoreNotFound(err)
	}

	// 上面获取了CR，说明系统中存在CR资源
	// 如果CR的 DeletionTimestamp 有值，说明执行了删除操作（对Reconcile来说是触发了Update DeletionTimestamp的事件），
	// 我们需要处理 finalizer
	if !mykind.ObjectMeta.DeletionTimestamp.IsZero() {
		for _, v := range mykind.ObjectMeta.Finalizers {
			fmt.Printf("处理Finalizers: %s\n", v)
			time.Sleep(time.Second * 3) // 模拟耗时
		}
		// 处理完成后置为空切片
		mykind.ObjectMeta.Finalizers = []string{}
		// 提交更新
		err := r.Update(ctx, &mykind)
		if err != nil {
			fmt.Printf("更新CR失败: %s\n", req.NamespacedName)
			return ctrl.Result{}, err
		} else {
			fmt.Printf("更新CR成功: %s\n", req.NamespacedName)
			return ctrl.Result{}, nil
		}
	}

	// 创建一个Deployment - 嵌套式写法
	deploy := appsv1.Deployment{
		ObjectMeta: metav1.ObjectMeta{
			Name:      "mykind-deployment",
			Namespace: req.Namespace,
			OwnerReferences: []metav1.OwnerReference{
				*metav1.NewControllerRef(mykind.GetObjectMeta(), mykind.GroupVersionKind()),
			},
		},
		Spec: appsv1.DeploymentSpec{
			Replicas: func() *int32 { r := int32(1); return &r }(),
			Selector: &metav1.LabelSelector{
				MatchLabels: map[string]string{"app": "k8s"},
			},
			Template: corev1.PodTemplateSpec{
				ObjectMeta: metav1.ObjectMeta{
					Labels: map[string]string{"app": "k8s"},
				},
				Spec: corev1.PodSpec{
					Containers: []corev1.Container{
						{
							Name:    "mykind-pod",
							Image:   "busybox:1.29",
							Command: []string{"sh", "-c", "sleep 3600"},
						},
					},
				},
			},
		},
	}

	namespacedName := deploy.Namespace + "/" + deploy.Name
	if err := r.Create(ctx, &deploy); client.IgnoreAlreadyExists(err) != nil {
		fmt.Printf("Deployment创建失败: %s: %s\n", namespacedName, client.IgnoreAlreadyExists(err))
	} else {
		fmt.Printf("Deployment创建成功或已存在: %s\n", namespacedName)
	}

	return ctrl.Result{}, nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *MyKindReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&crdv1beta1.MyKind{}).
		Owns(&appsv1.Deployment{}).
		Complete(r)
}

```

输出结果

```bash
# 部署带有finalizers字段的CR
[root@node-1 example]# grep finalizers config/samples/crd_v1beta1_mykind.yaml -A 1
  finalizers:
    - kubernetes

[root@node-1 example]# kubectl apply -f config/samples/crd_v1beta1_mykind.yaml 
mykind.crd.devops.io/mykind-sample created

# 将控制器起起来
[root@node-1 example]# make run

# 删除CR
[root@node-1 example]# kubectl delete -f config/samples/crd_v1beta1_mykind.yaml 
mykind.crd.devops.io "mykind-sample" deleted

# 查看控制器日志
处理Finalizers: kubernetes
更新CR成功: default/mykind-sample
```

:::

::: details （3）创建一个带finalizer的Deployment

将CR YAML文件和控制器代码回滚到不带finalizer的初始状态，然后再继续下一步

**练习效果：**

* 创建一个带finalizer的Deployment，让使用者感觉不到它的存在，但是开发者可以在删除Deployment前做一些额外的事情

**问题：**

* 创建一个带finalizer的Deployment，
* 此时若将CR删除，Deployment由于有finalizer不会被删除，而是变更为Update事件，传递的是MyKind的NamespacedName（`Owns`的作用），
* 但是CR已经删除了，Reconcile会立即返回（因为我们的代码中获取不到CR就会立即返回）
* 造成的结果就是CR被删了，Deployment还存在（DeletionTimestamp已经有值了），该如何解决？

**分析：**

* 我们要在CR删除之前处理好Deployment的finalizer，所以我们给CR动态注入一个finalizer
* 当CR被删除，在处理CR的finalizer代码中处理Deployment的finalizer，达到删除Deployment的效果

```go
/*
Copyright 2022.

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
	"fmt"
	appsv1 "k8s.io/api/apps/v1"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/types"
	// 这个导入可以参考main.go是如何导入的，尽量保持一致
	crdv1beta1 "github.com/vvfock3r/example/api/v1beta1"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
)

// MyKindReconciler reconciles a MyKind object
type MyKindReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

//+kubebuilder:rbac:groups=crd.devops.io,resources=mykinds,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=crd.devops.io,resources=mykinds/status,verbs=get;update;patch
//+kubebuilder:rbac:groups=crd.devops.io,resources=mykinds/finalizers,verbs=update

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the MyKind object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.13.0/pkg/reconcile

func (r *MyKindReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	// 获取 CR
	var mykind crdv1beta1.MyKind
	if err := r.Get(ctx, req.NamespacedName, &mykind); err != nil {
		return ctrl.Result{}, client.IgnoreNotFound(err)
	}

	// 给CR注入Finalizers，原因后面讲
	if len(mykind.ObjectMeta.Finalizers) <= 0 {
		mykind.ObjectMeta.Finalizers = []string{"kubernetes"}
		if err := r.Update(ctx, &mykind); err != nil {
			fmt.Printf("为CR注入Finalizers失败: %s\n", mykind.Namespace+"/"+mykind.Name)
			return ctrl.Result{}, err
		}
	}

	// 获取Deployment
	var deploy appsv1.Deployment
	namespaced := types.NamespacedName{Namespace: req.Namespace, Name: "mykind-deployment"}
	err := r.Get(ctx, namespaced, &deploy)
	// 成功获取到Deployment, 当 DeletionTimestamp不为空的时候处理finalizer
	if err == nil {
		fmt.Printf("Get Deployment success: %s\n", deploy.Namespace+"/"+deploy.Name)
		// 处理CR的finalizer
		if !mykind.ObjectMeta.DeletionTimestamp.IsZero() {
			// 处理Deployment 的finalizer
			deploy.ObjectMeta.Finalizers = []string{}
			if err := r.Update(ctx, &deploy); err != nil {
				fmt.Println("更新Deployment Finalizer失败")
				return ctrl.Result{}, err
			} else {
				fmt.Println("更新Deployment Finalizer成功")
			}
			// 处理完成后置为空切片
			mykind.ObjectMeta.Finalizers = []string{}
			// 提交更新
			err := r.Update(ctx, &mykind)
			if err != nil {
				fmt.Printf("更新CR失败: %s\n", req.NamespacedName)
				return ctrl.Result{}, err
			} else {
				fmt.Printf("更新CR成功: %s\n", req.NamespacedName)
				return ctrl.Result{}, nil
			}
		}
	}
	// 未获取到Deployment，可能是还没有创建 或者 Get出错，需要判断
	if err != nil {
		// 出错了，函数返回
		if client.IgnoreNotFound(err) != nil {
			fmt.Printf("Get deployment error: %s\n", namespaced.String())
			return ctrl.Result{}, err
		}
		// 未找到，原因是还没有创建，那么就创建一个Deployment - 嵌套式写法
		fmt.Printf("Get Deployment none: %s\n", deploy.Namespace+"/"+deploy.Name)
		deploy := appsv1.Deployment{
			ObjectMeta: metav1.ObjectMeta{
				Name:      "mykind-deployment",
				Namespace: req.Namespace,
				OwnerReferences: []metav1.OwnerReference{
					*metav1.NewControllerRef(mykind.GetObjectMeta(), mykind.GroupVersionKind()),
				},
				Finalizers: []string{"kubernetes"},
			},
			Spec: appsv1.DeploymentSpec{
				Replicas: func() *int32 { r := int32(1); return &r }(),
				Selector: &metav1.LabelSelector{
					MatchLabels: map[string]string{"app": "k8s"},
				},
				Template: corev1.PodTemplateSpec{
					ObjectMeta: metav1.ObjectMeta{
						Labels: map[string]string{"app": "k8s"},
					},
					Spec: corev1.PodSpec{
						Containers: []corev1.Container{
							{
								Name:    "mykind-pod",
								Image:   "busybox:1.29",
								Command: []string{"sh", "-c", "sleep 3600"},
							},
						},
					},
				},
			},
		}

		namespacedName := deploy.Namespace + "/" + deploy.Name
		if err := r.Create(ctx, &deploy); client.IgnoreAlreadyExists(err) != nil {
			fmt.Printf("Deployment创建失败: %s: %s\n", namespacedName, client.IgnoreAlreadyExists(err))
		} else {
			fmt.Printf("Deployment创建成功或已存在: %s\n", namespacedName)
		}
	}

	return ctrl.Result{}, nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *MyKindReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&crdv1beta1.MyKind{}).
		Owns(&appsv1.Deployment{}).
		Complete(r)
}
```

输出结果

```bash
# 创建CR然后删除
[root@node-1 example]# kubectl apply -f config/samples/crd_v1beta1_mykind.yaml 
mykind.crd.devops.io/mykind-sample created
[root@node-1 example]# kubectl delete -f config/samples/crd_v1beta1_mykind.yaml 
mykind.crd.devops.io "mykind-sample" deleted

# Controller日志
Get Deployment none: /
Deployment创建成功或已存在: default/mykind-deployment
Get Deployment success: default/mykind-deployment
Get Deployment success: default/mykind-deployment
Get Deployment success: default/mykind-deployment
Get Deployment success: default/mykind-deployment
Get Deployment success: default/mykind-deployment
Get Deployment success: default/mykind-deployment
更新Deployment Finalizer成功
更新CR成功: default/mykind-sample

# 查看Deployment
[root@node-1 example]# kubectl get deploy 
No resources found in default namespace.
```

:::

<br />

### 9）Webhook

<br />

### 10）+kubebuilder

文档：[https://book.kubebuilder.io/reference/markers.html](https://book.kubebuilder.io/reference/markers.html)

::: details （1）printcolumn：kubectl展示参数

文档：[https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/#additional-printer-columns](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/#additional-printer-columns)

1.默认情况下是这样的

```bash
[root@node-1 example]# kubectl get mykind 
NAME            AGE
mykind-sample   2m56s
```

2.接下来修改types.go文件

```go
//+kubebuilder:object:root=true
//+kubebuilder:subresource:status

// 添加下面两行
//+kubebuilder:printcolumn:name="APIVERSION",type="string",JSONPath=".apiVersion",priority=0,description="The group version of mykind."
//+kubebuilder:printcolumn:name="AGE",type="date",JSONPath=".metadata.creationTimestamp",priority=0,description="The creation duration of mykind"

// MyKind is the Schema for the mykinds API
type MyKind struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   MyKindSpec   `json:"spec,omitempty"`
	Status MyKindStatus `json:"status,omitempty"`
}
```

3.重新安装CRD

```bash
[root@node-1 example]# make install
test -s /root/example/bin/controller-gen || GOBIN=/root/example/bin go install sigs.k8s.io/controller-tools/cmd/controller-gen@v0.9.2
/root/example/bin/controller-gen rbac:roleName=manager-role crd webhook paths="./..." output:crd:artifacts:config=config/crd/bases
/root/example/bin/kustomize build config/crd | kubectl apply -f -
customresourcedefinition.apiextensions.k8s.io/mykinds.crd.devops.io configured
```

4.kubectl验证

```bash
[root@node-1 example]# kubectl get mykind 
NAME            APIVERSION              AGE
mykind-sample   crd.devops.io/v1beta1   27m
```

5.注意点

* 如果我要新加字段，那么默认的AGE便不再显示，需要我们手动再加上去
* 字段顺序与我们添加的顺序保持一致
* 字段名默认会大写，即使我们写的是小写的名称
* NAME字段比较特殊，它总是会显示，如果我们自定义一个NAME字段，它并不会将第一个NAME给顶掉，而是会有两个NAME字段
* `priority`参数，默认为0，意思是只标准视图中显示，当设置为>0时，使用`kubectl get xx -o wide`时候会显示

:::

::: details （2）自动实现runtime.Object接口，一般不需要修改

文档：[https://xuejipeng.github.io/kubebuilder-doc-cn/cronjob-tutorial/other-api-files.html#zz_generateddeepcopygo](https://xuejipeng.github.io/kubebuilder-doc-cn/cronjob-tutorial/other-api-files.html#zz_generateddeepcopygo)

```go
//+kubebuilder:object:root=true

// 1.上面这行注释用于实现runtime.Object接口，生成的代码在 api/<version>/zz_generated.deepcopy.go中，核心方法是DeepCopyObject
// 2.若将他改为false，在Reconcile使用时,Get等函数就不可以传入&mykind，因为没有实现runtime.Object接口
// var mykind crdv1beta1.MyKind
//   if err := r.Get(ctx, req.NamespacedName, &mykind); err != nil {
//     return ctrl.Result{}, client.IgnoreNotFound(err) // IgnoreNotFound如果是NotFoundError则返回nil
// }
// 3.我们可以看一下有这个标记的有 MyKind和MyKindList，在zz_generated.deepcopy.go中可以找到MyKind和MyKindList的DeepCopyObject方法
// 4.修改后需要使用 make generate 重新生成代码
```

:::

::: details （3）开启状态子资源，一般不需要修改

文档：[https://book.kubebuilder.io/reference/generating-crd.html#subresources](https://book.kubebuilder.io/reference/generating-crd.html#subresources)

```go
//+kubebuilder:subresource:status

// 1.通常建议在所有具有状态字段的资源上使用子资源
// 2.在我们的示例中，MyKind开启了状态子资源，而MyKindList没有开启状态子资源
// 3.启用后，主资源的更新不会更改状态。同样，对status子资源的更新只能更改status字段
//   或者说，外部修改的status将不会被捕获，只能通过控制器使用status().update()来修改

// 以后补充
```

:::

::: details （4）开启伸缩子资源

文档：[https://book.kubebuilder.io/reference/generating-crd.html#scale](https://book.kubebuilder.io/reference/generating-crd.html#scale)

```go
// +kubebuilder:subresource:scale:specpath=.spec.replicas,statuspath=.status.replicas,selectorpath=.status.selector

// 以后补充
```

:::

::: details （5）配置CRD范围和别名

文档：[https://book.kubebuilder.io/reference/markers/crd.html](https://book.kubebuilder.io/reference/markers/crd.html)

```go
//+kubebuilder:resource:scope=Cluster,shortName=mk;mk1;mk2

// 参数有很多：
//   scope=Cluster    配置CRD范围，可选值：Cluster, Namespaced
//   shortName        配置CRD别名,比如说namespace的别名是ns。上面配置了3个别名，使用分号隔开

// 修改后需要使用 make install 重新安装CRD
```

**scope**

```bash
# 当我们配置好CRD范围为集群范围后
//+kubebuilder:resource:scope=Cluster

# 再次查看一下，NAMESPACED变为false了
[root@node-1 example]# kubectl api-resources | grep -Ei 'SHORTNAMES|KIND'
NAME                              SHORTNAMES   APIVERSION                             NAMESPACED   KIND
mykinds                           mk,mk1,mk2   crd.devops.io/v1beta1                  false        MyKind
```

**shortName**

```bash
[root@node-1 example]# kubectl api-resources | grep -Ei 'SHORTNAMES|KIND'
NAME                              SHORTNAMES   APIVERSION                             NAMESPACED   KIND
mykinds                           mk,mk1,mk2   crd.devops.io/v1beta1                  true         MyKind
[root@node-1 example]# kubectl get mykind
NAME            APIVERSION              AGE
mykind-sample   crd.devops.io/v1beta1   3h32m
[root@node-1 example]#
[root@node-1 example]#
[root@node-1 example]# kubectl get mk
NAME            APIVERSION              AGE
mykind-sample   crd.devops.io/v1beta1   3h32m
[root@node-1 example]#
[root@node-1 example]# kubectl get mk1
NAME            APIVERSION              AGE
mykind-sample   crd.devops.io/v1beta1   3h32m
[root@node-1 example]# kubectl get mk2
NAME            APIVERSION              AGE
mykind-sample   crd.devops.io/v1beta1   3h32m
```

:::

::: details （6）CRD字段验证

文档：[https://book.kubebuilder.io/reference/markers/crd-validation.html](https://book.kubebuilder.io/reference/markers/crd-validation.html)

```go
//+kubebuilder:default=            设置默认值
//+kubebuilder:validation:Enum={}  设置枚举

// 更多的慢慢补充
```

:::

<br />

## 3.基础原理

### 架构图

文档：[https://book.kubebuilder.io/architecture.html](https://book.kubebuilder.io/architecture.html)

![image-20221206114340050](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221206114340050.png)

<br />

### 程序入口

`main`方法是我们程序的入口，它一般定义在`main.go`中，我们看一下他都做了什么事

::: details main.go源码

```go
/*
Copyright 2022.

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

package main

import (
	"flag"
	"os"

	// Import all Kubernetes client auth plugins (e.g. Azure, GCP, OIDC, etc.)
	// to ensure that exec-entrypoint and run can make use of them.
	_ "k8s.io/client-go/plugin/pkg/client/auth"

	"k8s.io/apimachinery/pkg/runtime"
	utilruntime "k8s.io/apimachinery/pkg/util/runtime"
	clientgoscheme "k8s.io/client-go/kubernetes/scheme"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/healthz"
	"sigs.k8s.io/controller-runtime/pkg/log/zap"

	crdv1beta1 "github.com/vvfock3r/example/api/v1beta1"
	"github.com/vvfock3r/example/controllers"
	//+kubebuilder:scaffold:imports
)

var (
	scheme   = runtime.NewScheme()
	setupLog = ctrl.Log.WithName("setup")
)

func init() {
	utilruntime.Must(clientgoscheme.AddToScheme(scheme))

	utilruntime.Must(crdv1beta1.AddToScheme(scheme))
	//+kubebuilder:scaffold:scheme
}

func main() {
	// 1.设置命令行参数
	var metricsAddr string
	var enableLeaderElection bool
	var probeAddr string
	flag.StringVar(&metricsAddr, "metrics-bind-address", ":8080", "The address the metric endpoint binds to.")
	flag.StringVar(&probeAddr, "health-probe-bind-address", ":8081", "The address the probe endpoint binds to.")
	flag.BoolVar(&enableLeaderElection, "leader-elect", false,
		"Enable leader election for controller manager. "+
			"Enabling this will ensure there is only one active controller manager.")
	opts := zap.Options{
		Development: true,
	}
	opts.BindFlags(flag.CommandLine)
	flag.Parse()

	ctrl.SetLogger(zap.New(zap.UseFlagOptions(&opts)))

	// 2.创建Manager
	mgr, err := ctrl.NewManager(ctrl.GetConfigOrDie(), ctrl.Options{
		Scheme:                 scheme,
		MetricsBindAddress:     metricsAddr,
		Port:                   9443,
		HealthProbeBindAddress: probeAddr,
		LeaderElection:         enableLeaderElection,
		LeaderElectionID:       "683e8863.devops.io",
		// LeaderElectionReleaseOnCancel defines if the leader should step down voluntarily
		// when the Manager ends. This requires the binary to immediately end when the
		// Manager is stopped, otherwise, this setting is unsafe. Setting this significantly
		// speeds up voluntary leader transitions as the new leader don't have to wait
		// LeaseDuration time first.
		//
		// In the default scaffold provided, the program ends immediately after
		// the manager stops, so would be fine to enable this option. However,
		// if you are doing or is intended to do any operation such as perform cleanups
		// after the manager stops then its usage might be unsafe.
		// LeaderElectionReleaseOnCancel: true,
	})
	if err != nil {
		setupLog.Error(err, "unable to start manager")
		os.Exit(1)
	}

	// 3.将我们的 controllers 注册到 Manager 中
	if err = (&controllers.MyKindReconciler{
		Client: mgr.GetClient(),
		Scheme: mgr.GetScheme(),
	}).SetupWithManager(mgr); err != nil {
		setupLog.Error(err, "unable to create controller", "controller", "MyKind")
		os.Exit(1)
	}
	//+kubebuilder:scaffold:builder

	// 4.添加健康检查和就绪检查,可以看到都是调用了相同的处理函数
	if err := mgr.AddHealthzCheck("healthz", healthz.Ping); err != nil {
		setupLog.Error(err, "unable to set up health check")
		os.Exit(1)
	}
	if err := mgr.AddReadyzCheck("readyz", healthz.Ping); err != nil {
		setupLog.Error(err, "unable to set up ready check")
		os.Exit(1)
	}

	// 5.启动Manager
	setupLog.Info("starting manager")
	if err := mgr.Start(ctrl.SetupSignalHandler()); err != nil {
		setupLog.Error(err, "problem running manager")
		os.Exit(1)
	}
}
```

:::

分析：

* 设置命令行参数
* 创建Manager
* 将我们的 controllers 注册到 Manager 中
* 添加健康检查（healthz）和就绪检查（readyz），都是调用的healthz.Ping函数
* 启动Manager

<br />

#### Leader选举

在设置命令行参数时我们看到有这样一个参数

```go
	flag.BoolVar(&enableLeaderElection, "leader-elect", false,
        // 开启Leader选举，它将确保只有一个活跃的controller manager
		"Enable leader election for controller manager. "+
			"Enabling this will ensure there is only one active controller manager.")
// 翻译过来就是：
// 1.当我们部署了多副本Manager时，对于同一个事件，所有的Manager都会处理一遍
// 2.当设置了leader-elect参数后，所有的Manager会自动选举出一个Leader，由Leader统一处理
// 3.当Leader挂掉后，会重新进行选举，达到高可用的效果
```

下面我们来测试一下

::: details 1、修改controller，让他循环调度，并输出当前的时间

```go
func (r *MyKindReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	_ = log.FromContext(ctx)
	fmt.Println(time.Now().Format("2006-01-02 15:04:05"))
	return ctrl.Result{RequeueAfter: time.Second * 1}, nil
}
```

:::

::: details 2、测试一下是否按预期工作，后面我们就可以直接调用go run main.go来启动Manager

```bash
[root@node-1 example]# make run
test -s /root/example/bin/controller-gen || GOBIN=/root/example/bin go install sigs.k8s.io/controller-tools/cmd/controller-gen@v0.9.2
/root/example/bin/controller-gen rbac:roleName=manager-role crd webhook paths="./..." output:crd:artifacts:config=config/crd/bases
/root/example/bin/controller-gen object:headerFile="hack/boilerplate.go.txt" paths="./..."
go fmt ./...
go vet ./...
go run ./main.go
1.67030183172172e+09    INFO    controller-runtime.metrics      Metrics server is starting to listen    {"addr": ":8080"}
1.670301831722304e+09   INFO    setup   starting manager
1.6703018317233853e+09  INFO    Starting server {"path": "/metrics", "kind": "metrics", "addr": "[::]:8080"}
1.6703018317236047e+09  INFO    Starting server {"kind": "health probe", "addr": "[::]:8081"}
1.67030183172399e+09    INFO    Starting EventSource    {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind", "source": "kind source: *v1beta1.MyKind"}
1.6703018317240117e+09  INFO    Starting Controller     {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind"}
1.6703018318252802e+09  INFO    Starting workers        {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind", "worker count": 100}
2022-12-06 12:43:51
2022-12-06 12:43:52
2022-12-06 12:43:53
2022-12-06 12:43:54
```

:::

::: details 3、查看一下命令行参数

```bash
[root@node-1 example]# go run main.go -h
Usage of /tmp/go-build2568223212/b001/exe/main:
  -health-probe-bind-address string
        The address the probe endpoint binds to. (default ":8081")
  -kubeconfig string
        Paths to a kubeconfig. Only required if out-of-cluster.
  -leader-elect
        Enable leader election for controller manager. Enabling this will ensure there is only one active controller manager.
  -metrics-bind-address string
        The address the metric endpoint binds to. (default ":8080")
  -zap-devel
        Development Mode defaults(encoder=consoleEncoder,logLevel=Debug,stackTraceLevel=Warn). Production Mode defaults(encoder=jsonEncoder,logLevel=Info,stackTraceLevel=Error) (default true)
  -zap-encoder value
        Zap log encoding (one of 'json' or 'console')
  -zap-log-level value
        Zap Level to configure the verbosity of logging. Can be one of 'debug', 'info', 'error', or any integer value > 0 which corresponds to custom debug levels of increasing verbosity
  -zap-stacktrace-level value
        Zap Level at and above which stacktraces are captured (one of 'info', 'error', 'panic').
  -zap-time-encoding value
        Zap time encoding (one of 'epoch', 'millis', 'nano', 'iso8601', 'rfc3339' or 'rfc3339nano'). Defaults to 'epoch'.
```

:::

::: details 4、启动两个Manager，看看效果，验证是不是同时都在进行处理

```bash
# 终端1
[root@node-1 example]# go run main.go 
1.6703020330145264e+09  INFO    controller-runtime.metrics      Metrics server is starting to listen    {"addr": ":8080"}
1.6703020330149448e+09  INFO    setup   starting manager
1.6703020330155623e+09  INFO    Starting server {"path": "/metrics", "kind": "metrics", "addr": "[::]:8080"}
1.6703020330156145e+09  INFO    Starting server {"kind": "health probe", "addr": "[::]:8081"}
1.6703020330159233e+09  INFO    Starting EventSource    {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind", "source": "kind source: *v1beta1.MyKind"}
1.6703020330159447e+09  INFO    Starting Controller     {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind"}
1.6703020331177087e+09  INFO    Starting workers        {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind", "worker count": 100}
2022-12-06 12:47:13
2022-12-06 12:47:14
2022-12-06 12:47:15
2022-12-06 12:47:16
2022-12-06 12:47:17
2022-12-06 12:47:18

# 终端2，这里要修改一下健康检查和Metrics的端口
[root@node-1 example]# go run main.go -health-probe-bind-address ":8082" -metrics-bind-address ":8083" 
1.6703020338751724e+09  INFO    controller-runtime.metrics      Metrics server is starting to listen    {"addr": ":8083"}
1.670302033875485e+09   INFO    setup   starting manager
1.6703020338762925e+09  INFO    Starting server {"path": "/metrics", "kind": "metrics", "addr": "[::]:8083"}
1.6703020338763382e+09  INFO    Starting server {"kind": "health probe", "addr": "[::]:8082"}
1.6703020338770015e+09  INFO    Starting EventSource    {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind", "source": "kind source: *v1beta1.MyKind"}
1.6703020338770266e+09  INFO    Starting Controller     {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind"}
1.670302033979318e+09   INFO    Starting workers        {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind", "worker count": 100}
2022-12-06 12:47:13
2022-12-06 12:47:14
2022-12-06 12:47:15
2022-12-06 12:47:16
2022-12-06 12:47:17
2022-12-06 12:47:18
```

:::

::: details 5、启动两个Manager，开启Leader选举选项

```bash
# 终端1：启动报错了，原因是我们的Manager没有在集群中部署来启动(in-cluster),需要指定 LeaderElectionNamespace 参数
[root@node-1 example]# go run main.go -leader-elect
1.6703022001695514e+09  ERROR   setup   unable to start manager {"error": "unable to find leader election namespace: not running in-cluster, please specify LeaderElectionNamespace"}
main.main
        /root/example/main.go:90
runtime.main
        /usr/local/go/go1.19.3/src/runtime/proc.go:250
exit status 1

# 解决办法有两种：
#   1.将Manager部署到集群中，在生产环境我们会使用这种方式
#   2.修改Manager启动参数，添加 LeaderElectionNamespace参数，为了方便，使用这种方法测试


# 修改main.go，然后重新测试
	mgr, err := ctrl.NewManager(ctrl.GetConfigOrDie(), ctrl.Options{
		Scheme:                  scheme,
		MetricsBindAddress:      metricsAddr,
		Port:                    9443,
		HealthProbeBindAddress:  probeAddr,
		LeaderElection:          enableLeaderElection,
		LeaderElectionID:        "683e8863.devops.io",
		LeaderElectionNamespace: "default",     // 添加这一行

# ------------------------------------------------------------------------------------------

# 1.Manager1 先启动，它顺理成章的成了Leader,开始工作
[root@node-1 example]# go run main.go -leader-elect
1.6703025195201068e+09  INFO    controller-runtime.metrics      Metrics server is starting to listen    {"addr": ":8080"}
1.6703025195203595e+09  INFO    setup   starting manager
1.6703025195214355e+09  INFO    Starting server {"path": "/metrics", "kind": "metrics", "addr": "[::]:8080"}
1.6703025195215063e+09  INFO    Starting server {"kind": "health probe", "addr": "[::]:8081"}
I1206 12:55:19.521593  109310 leaderelection.go:248] attempting to acquire leader lease default/683e8863.devops.io...
I1206 12:55:36.286356  109310 leaderelection.go:258] successfully acquired lease default/683e8863.devops.io
1.670302536286516e+09   DEBUG   events  node-1_2cf35bd4-6482-4c1c-8cba-e5c6e5c7cb47 became leader       {"type": "Normal", "object": {"kind":"Lease","namespace":"default","name":"683e8863.devops.io","uid":"4d1e1ffd-1db3-49bd-bc2e-eb92b718bf02","apiVersion":"coordination.k8s.io/v1","resourceVersion":"380155"}, "reason": "LeaderElection"}
1.6703025362868667e+09  INFO    Starting EventSource    {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind", "source": "kind source: *v1beta1.MyKind"}
1.6703025362869081e+09  INFO    Starting Controller     {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind"}
1.6703025363879519e+09  INFO    Starting workers        {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind", "worker count": 100}
2022-12-06 12:55:36
2022-12-06 12:55:37
2022-12-06 12:55:38
2022-12-06 12:55:39
2022-12-06 12:55:40

# 2.Manager2 保持静默模式
[root@node-1 example]# go run main.go -health-probe-bind-address ":8082" -metrics-bind-address ":8083" -leader-elect
1.6703025215551794e+09  INFO    controller-runtime.metrics      Metrics server is starting to listen    {"addr": ":8083"}
1.6703025215578227e+09  INFO    setup   starting manager
1.670302521558717e+09   INFO    Starting server {"path": "/metrics", "kind": "metrics", "addr": "[::]:8083"}
1.6703025215588038e+09  INFO    Starting server {"kind": "health probe", "addr": "[::]:8082"}
I1206 12:55:21.559406  109462 leaderelection.go:248] attempting to acquire leader lease default/683e8863.devops.io...

# 3.将 Manager1 关掉
2022-12-06 12:58:29
2022-12-06 12:58:30
^C1.670302711080575e+09 INFO    Stopping and waiting for non leader election runnables
1.67030271108063e+09    INFO    Stopping and waiting for leader election runnables
1.6703027110806446e+09  INFO    Shutdown signal received, waiting for all workers to finish     {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind"}
1.670302711080734e+09   INFO    All workers finished    {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind"}
1.6703027110807533e+09  INFO    Stopping and waiting for caches
1.6703027110808523e+09  INFO    Stopping and waiting for webhooks
1.6703027110808756e+09  INFO    Wait completed, proceeding to shutdown the manager

# 4.检查 Manager2会不会接替Leader继续工作
[root@node-1 example]# go run main.go -health-probe-bind-address ":8082" -metrics-bind-address ":8083" -leader-elect
1.6703025215551794e+09  INFO    controller-runtime.metrics      Metrics server is starting to listen    {"addr": ":8083"}
1.6703025215578227e+09  INFO    setup   starting manager
1.670302521558717e+09   INFO    Starting server {"path": "/metrics", "kind": "metrics", "addr": "[::]:8083"}
1.6703025215588038e+09  INFO    Starting server {"kind": "health probe", "addr": "[::]:8082"}
I1206 12:55:21.559406  109462 leaderelection.go:248] attempting to acquire leader lease default/683e8863.devops.io...
I1206 12:58:48.648045  109462 leaderelection.go:258] successfully acquired lease default/683e8863.devops.io
1.6703027286481993e+09  DEBUG   events  node-1_c3b8dde5-14ee-4050-820a-f97cb1c8afbd became leader       {"type": "Normal", "object": {"kind":"Lease","namespace":"default","name":"683e8863.devops.io","uid":"4d1e1ffd-1db3-49bd-bc2e-eb92b718bf02","apiVersion":"coordination.k8s.io/v1","resourceVersion":"380571"}, "reason": "LeaderElection"}
1.670302728648579e+09   INFO    Starting EventSource    {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind", "source": "kind source: *v1beta1.MyKind"}
1.670302728648621e+09   INFO    Starting Controller     {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind"}
1.6703027287503834e+09  INFO    Starting workers        {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind", "worker count": 100}
2022-12-06 12:58:48
2022-12-06 12:58:49
2022-12-06 12:58:50
2022-12-06 12:58:51

# 5.可以看到中间有一个延迟，这里就不深究了

# 6.这时候再把 Manager1起起来，它应该保持静默模式
[root@node-1 example]# go run main.go -leader-elect
1.6703027963906808e+09  INFO    controller-runtime.metrics      Metrics server is starting to listen    {"addr": ":8080"}
1.6703027963910198e+09  INFO    setup   starting manager
1.6703027963913834e+09  INFO    Starting server {"path": "/metrics", "kind": "metrics", "addr": "[::]:8080"}
1.670302796391423e+09   INFO    Starting server {"kind": "health probe", "addr": "[::]:8081"}
I1206 12:59:56.391514  116906 leaderelection.go:248] attempting to acquire leader lease default/683e8863.devops.io...
```

:::

#### NewManager

```go
// 可以看到NewManager接收两个参数，第一个参数是获取client-go中的*rest.Config，第二个参数是可选选项
mgr, err := ctrl.NewManager(ctrl.GetConfigOrDie(), ctrl.Options{
		Scheme:                  scheme,
		MetricsBindAddress:      metricsAddr,
		Port:                    9443,
		HealthProbeBindAddress:  probeAddr,
		LeaderElection:          enableLeaderElection,
		LeaderElectionID:        "683e8863.devops.io",
	})

func GetConfigOrDie() *rest.Config {
	config, err := GetConfig()
	if err != nil {
		log.Error(err, "unable to get kubeconfig")
		os.Exit(1)
	}
	return config
}

// 再继续往下追发现配置文件获取顺序：
// 1.命令行参数 -kubeconfig
// 2.环境变量   KUBECONFIG
// 3.in-cluster config
// 4.判断$HOME是否存在(os.LookupEnv("HOME"),即使值为空也会返回true)，若存在则获取当前用户的 家目录/.kube/config 文件
//   如果HOME变量不存在，那么会报错 go: module cache not found: neither GOMODCACHE nor GOPATH is set
//   这个报错是go语言引起的，跟我们这里关系不大
```

看一下NewManager都做了什么

::: details 点击查看详情

```go
func New(config *rest.Config, options Options) (Manager, error) {
	// Set default values for options fields
	// 1.设置默认参数
	options = setOptionsDefaults(options)

	// 2.创建一个cluster对象，cluster提供与K8S集群交互的各种方法
	cluster, err := cluster.New(config, func(clusterOptions *cluster.Options) {
		clusterOptions.Scheme = options.Scheme
		clusterOptions.MapperProvider = options.MapperProvider
		clusterOptions.Logger = options.Logger
		clusterOptions.SyncPeriod = options.SyncPeriod // 这个参数值得关注，默认大约10小时会调用一次Reconcile
		clusterOptions.Namespace = options.Namespace
		clusterOptions.NewCache = options.NewCache
		clusterOptions.NewClient = options.NewClient
		clusterOptions.ClientDisableCacheFor = options.ClientDisableCacheFor
		clusterOptions.DryRunClient = options.DryRunClient
		clusterOptions.EventBroadcaster = options.EventBroadcaster //nolint:staticcheck
	})
	if err != nil {
		return nil, err
	}

	// 3.创建一个事件记录器 recorderProvider
	// Create the recorder provider to inject event recorders for the components.
	// TODO(directxman12): the log for the event provider should have a context (name, tags, etc) specific
	// to the particular controller that it's being injected into, rather than a generic one like is here.
	recorderProvider, err := options.newRecorderProvider(config, cluster.GetScheme(), options.Logger.WithName("events"), options.makeBroadcaster)
	if err != nil {
		return nil, err
	}

	// 4.初始化选举配置 resourceLock
	// Create the resource lock to enable leader election)
	var leaderConfig *rest.Config
	var leaderRecorderProvider *intrec.Provider

	if options.LeaderElectionConfig == nil {
		leaderConfig = rest.CopyConfig(config)
		leaderRecorderProvider = recorderProvider
	} else {
		leaderConfig = rest.CopyConfig(options.LeaderElectionConfig)
		leaderRecorderProvider, err = options.newRecorderProvider(leaderConfig, cluster.GetScheme(), options.Logger.WithName("events"), options.makeBroadcaster)
		if err != nil {
			return nil, err
		}
	}

	resourceLock, err := options.newResourceLock(leaderConfig, leaderRecorderProvider, leaderelection.Options{
		LeaderElection:             options.LeaderElection,
		LeaderElectionResourceLock: options.LeaderElectionResourceLock,
		LeaderElectionID:           options.LeaderElectionID,
		LeaderElectionNamespace:    options.LeaderElectionNamespace,
	})
	if err != nil {
		return nil, err
	}

	// 5.创建metrics和健康检查listener
	// Create the metrics listener. This will throw an error if the metrics bind
	// address is invalid or already in use.
	metricsListener, err := options.newMetricsListener(options.MetricsBindAddress)
	if err != nil {
		return nil, err
	}

	// By default we have no extra endpoints to expose on metrics http server.
	metricsExtraHandlers := make(map[string]http.Handler)

	// Create health probes listener. This will throw an error if the bind
	// address is invalid or already in use.
	healthProbeListener, err := options.newHealthProbeListener(options.HealthProbeBindAddress)
	if err != nil {
		return nil, err
	}

	// 6.创建一个runnables对象
	errChan := make(chan error)
	runnables := newRunnables(options.BaseContext, errChan)

	return &controllerManager{
		stopProcedureEngaged:          pointer.Int64(0),
		cluster:                       cluster,
		runnables:                     runnables,
		errChan:                       errChan,
		recorderProvider:              recorderProvider,
		resourceLock:                  resourceLock,
		metricsListener:               metricsListener,
		metricsExtraHandlers:          metricsExtraHandlers,
		controllerOptions:             options.Controller,
		logger:                        options.Logger,
		elected:                       make(chan struct{}),
		port:                          options.Port,
		host:                          options.Host,
		certDir:                       options.CertDir,
		webhookServer:                 options.WebhookServer,
		leaseDuration:                 *options.LeaseDuration,
		renewDeadline:                 *options.RenewDeadline,
		retryPeriod:                   *options.RetryPeriod,
		healthProbeListener:           healthProbeListener,
		readinessEndpointName:         options.ReadinessEndpointName,
		livenessEndpointName:          options.LivenessEndpointName,
		gracefulShutdownTimeout:       *options.GracefulShutdownTimeout,
		internalProceduresStop:        make(chan struct{}),
		leaderElectionStopped:         make(chan struct{}),
		leaderElectionReleaseOnCancel: options.LeaderElectionReleaseOnCancel,
	}, nil
}
```

:::

分析：

* 设置默认参数
* 创建一个cluster对象，cluster提供与K8S集群交互的各种方法
* 创建一个事件记录器 recorderProvider
* 初始化选举配置
* 创建metrics和健康检查listener
* 创建一个runnables对象

<br />

#### cluster.New

::: details 点击查看详情

```go
func New(config *rest.Config, opts ...Option) (Cluster, error) {
	// 1.kubeconfig 配置文件
	if config == nil {
		return nil, errors.New("must specify Config")
	}

	// 2.配置参数，这里使用到了 函数式选项模式
	options := Options{}
	for _, opt := range opts {
		opt(&options)
	}

	// 3.未配置的参数设置默认参数
	options = setOptionsDefaults(options)

	// 4.创建 mapper provider，用于go类型映射到Kubernetes API
	// Create the mapper provider
	mapper, err := options.MapperProvider(config)
	if err != nil {
		options.Logger.Error(err, "Failed to get API Group-Resources")
		return nil, err
	}

	// 5.创建 Cache 并注册到 informers, Cache的作用是为客户端读取提供缓存
	// Create the cache for the cached read client and registering informers
	cache, err := options.NewCache(config, cache.Options{Scheme: options.Scheme, Mapper: mapper, Resync: options.SyncPeriod, Namespace: options.Namespace})
	if err != nil {
		return nil, err
	}

	clientOptions := client.Options{Scheme: options.Scheme, Mapper: mapper}

	// 5.创建一个Client，直接和API Server交互，这里仅用作从API Server读取数据，称为Reader。它应该还会写入缓存
	apiReader, err := client.New(config, clientOptions)
	if err != nil {
		return nil, err
	}

	// 6.创建另一个Client，用于从缓存中读取数据，和写入数据到API Server
	writeObj, err := options.NewClient(cache, config, clientOptions, options.ClientDisableCacheFor...)
	if err != nil {
		return nil, err
	}

	// 以上两个客户端就是读写分离，一个用于读取，一个用于写入

	// 7.DryRun，并不真正执行，所以这时候会创建一个特定的客户端代替上面的 写客户端
	if options.DryRunClient {
		writeObj = client.NewDryRunClient(writeObj)
	}

	// 8.创建一个事件记录器
	// Create the recorder provider to inject event recorders for the components.
	// TODO(directxman12): the log for the event provider should have a context (name, tags, etc) specific
	// to the particular controller that it's being injected into, rather than a generic one like is here.
	recorderProvider, err := options.newRecorderProvider(config, options.Scheme, options.Logger.WithName("events"), options.makeBroadcaster)
	if err != nil {
		return nil, err
	}

	return &cluster{
		config:           config,
		scheme:           options.Scheme,
		cache:            cache,
		fieldIndexes:     cache,
		client:           writeObj,
		apiReader:        apiReader,
		recorderProvider: recorderProvider,
		mapper:           mapper,
		logger:           options.Logger,
	}, nil
}
```

:::

分析：

* 创建了两个客户端，用于针对API Server的读写分离
* 创建Cache，并注册到 informers

<br />

#### runnables

从字面意思上理解是**可运行对象**

::: details 点击查看详情

```go
// runnables包含4个分组
type runnables struct {
	Webhooks       *runnableGroup
	Caches         *runnableGroup
	LeaderElection *runnableGroup
	Others         *runnableGroup
}

// 组定义
type runnableGroup struct {
	ctx    context.Context
	cancel context.CancelFunc

	start        sync.Mutex
	startOnce    sync.Once
	started      bool
	startQueue   []*readyRunnable
	startReadyCh chan *readyRunnable

	stop     sync.RWMutex
	stopOnce sync.Once
	stopped  bool

	// errChan is the error channel passed by the caller
	// when the group is created.
	// All errors are forwarded to this channel once they occur.
	errChan chan error

	// ch is the internal channel where the runnables are read off from.
	ch chan *readyRunnable

	// wg is an internal sync.WaitGroup that allows us to properly stop
	// and wait for all the runnables to finish before returning.
	wg *sync.WaitGroup
}

type readyRunnable struct {
	Runnable
	Check       runnableCheck
	signalReady bool
}

// 接口定义
type Runnable interface {
	// Start starts running the component.  The component will stop running
	// when the context is closed. Start blocks until the context is closed or
	// an error occurs.
	Start(context.Context) error
}

// runnableCheck can be passed to Add() to let the runnable group determine that a
// runnable is ready. A runnable check should block until a runnable is ready,
// if the returned result is false, the runnable is considered not ready and failed.
type runnableCheck func(ctx context.Context) bool
```

:::

<br />

#### SetupWithManager

::: details 点击查看详情

```go
// 将Manager传入一个叫做NewControllerManagedBy的函数中，最终调用 Complete
func (r *MyKindReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&crdv1beta1.MyKind{}).
		Complete(r)
}

func ControllerManagedBy(m manager.Manager) *Builder {
	return &Builder{mgr: m}
}

// Complete
func (blder *Builder) Complete(r reconcile.Reconciler) error {
	_, err := blder.Build(r)
	return err
}

func (blder *Builder) Build(r reconcile.Reconciler) (controller.Controller, error) {
	if r == nil {
		return nil, fmt.Errorf("must provide a non-nil Reconciler")
	}
	if blder.mgr == nil {
		return nil, fmt.Errorf("must provide a non-nil Manager")
	}
	if blder.forInput.err != nil {
		return nil, blder.forInput.err
	}
	// Checking the reconcile type exist or not
	if blder.forInput.object == nil {
		return nil, fmt.Errorf("must provide an object for reconciliation")
	}

    // 这里是注册逻辑
	// Set the ControllerManagedBy
	if err := blder.doController(r); err != nil {
		return nil, err
	}

    // 这里是Watch逻辑
	// Set the Watch
	if err := blder.doWatch(); err != nil {
		return nil, err
	}

	return blder.ctrl, nil
}


func (blder *Builder) doController(r reconcile.Reconciler) error {
	globalOpts := blder.mgr.GetControllerOptions()

	ctrlOptions := blder.ctrlOptions
	if ctrlOptions.Reconciler == nil {
		ctrlOptions.Reconciler = r
	}

	// Retrieve the GVK from the object we're reconciling
	// to prepopulate logger information, and to optionally generate a default name.
	gvk, err := getGvk(blder.forInput.object, blder.mgr.GetScheme())
	if err != nil {
		return err
	}

	// Setup concurrency.
	if ctrlOptions.MaxConcurrentReconciles == 0 {
		groupKind := gvk.GroupKind().String()

		if concurrency, ok := globalOpts.GroupKindConcurrency[groupKind]; ok && concurrency > 0 {
			ctrlOptions.MaxConcurrentReconciles = concurrency
		}
	}

	// Setup cache sync timeout.
	if ctrlOptions.CacheSyncTimeout == 0 && globalOpts.CacheSyncTimeout != nil {
		ctrlOptions.CacheSyncTimeout = *globalOpts.CacheSyncTimeout
	}

	controllerName := blder.getControllerName(gvk)

	// Setup the logger.
	if ctrlOptions.LogConstructor == nil {
		log := blder.mgr.GetLogger().WithValues(
			"controller", controllerName,
			"controllerGroup", gvk.Group,
			"controllerKind", gvk.Kind,
		)

		ctrlOptions.LogConstructor = func(req *reconcile.Request) logr.Logger {
			log := log
			if req != nil {
				log = log.WithValues(
					gvk.Kind, klog.KRef(req.Namespace, req.Name),
					"namespace", req.Namespace, "name", req.Name,
				)
			}
			return log
		}
	}

    // 创建Controller，挂载Builder结构体的ctrl字段上
	// Build the controller and return.
	blder.ctrl, err = newController(controllerName, blder.mgr, ctrlOptions)
	return err
}

// newController 将Controller添加到Runnable中
func New(name string, mgr manager.Manager, options Options) (Controller, error) {
	c, err := NewUnmanaged(name, mgr, options)
	if err != nil {
		return nil, err
	}

	// Add the controller as a Manager components
	return c, mgr.Add(c)
}
```

:::

<br />

#### Manager.Start

::: details 点击查看详情

```go
func (cm *controllerManager) Start(ctx context.Context) (err error) {
	// 1.为啥要加锁呢?
	cm.Lock()
	if cm.started {
		cm.Unlock()
		return errors.New("manager already started")
	}
	var ready bool
	defer func() {
		// Only unlock the manager if we haven't reached
		// the internal readiness condition.
		if !ready {
			cm.Unlock()
		}
	}()

	// Initialize the internal context.
	cm.internalCtx, cm.internalCancel = context.WithCancel(ctx)

	// 2.同于通知关闭完成的channel
	// This chan indicates that stop is complete, in other words all runnables have returned or timeout on stop request
	stopComplete := make(chan struct{})
	defer close(stopComplete)
	// This must be deferred after closing stopComplete, otherwise we deadlock.
	defer func() {
		// https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-459889618-1533579787.jpg
		stopErr := cm.engageStopProcedure(stopComplete)
		if stopErr != nil {
			if err != nil {
				// Utilerrors.Aggregate allows to use errors.Is for all contained errors
				// whereas fmt.Errorf allows wrapping at most one error which means the
				// other one can not be found anymore.
				err = kerrors.NewAggregate([]error{err, stopErr})
			} else {
				err = stopErr
			}
		}
	}()

	// 3.将cluster作为runnable对象添加到Manager中，添加到哪个分组里去了？
	// Add the cluster runnable.
	if err := cm.add(cm.cluster); err != nil {
		return fmt.Errorf("failed to add cluster to runnables: %w", err)
	}

	// 4.使用Goroutine启动Metrics Server
	// Metrics should be served whether the controller is leader or not.
	// (If we don't serve metrics for non-leaders, prometheus will still scrape
	// the pod but will get a connection refused).
	if cm.metricsListener != nil {
		cm.serveMetrics()
	}

	// 5.使用Goroutine启动健康检查Server
	// Serve health probes.
	if cm.healthProbeListener != nil {
		cm.serveHealthProbes()
	}

	// 6.启动Webhook
	// First start any webhook servers, which includes conversion, validation, and defaulting
	// webhooks that are registered.
	//
	// WARNING: Webhooks MUST start before any cache is populated, otherwise there is a race condition
	// between conversion webhooks and the cache sync (usually initial list) which causes the webhooks
	// to never start because no cache can be populated.
	if err := cm.runnables.Webhooks.Start(cm.internalCtx); err != nil {
		if !errors.Is(err, wait.ErrWaitTimeout) {
			return err
		}
	}

	// 7.启动Cache
	// Start and wait for caches.
	if err := cm.runnables.Caches.Start(cm.internalCtx); err != nil {
		if !errors.Is(err, wait.ErrWaitTimeout) {
			return err
		}
	}

	// 8.启动该其他
	// Start the non-leaderelection Runnables after the cache has synced.
	if err := cm.runnables.Others.Start(cm.internalCtx); err != nil {
		if !errors.Is(err, wait.ErrWaitTimeout) {
			return err
		}
	}

	// 9.选举相关
	// Start the leader election and all required runnables.
	{
		ctx, cancel := context.WithCancel(context.Background())
		cm.leaderElectionCancel = cancel
		go func() {
			if cm.resourceLock != nil {
				if err := cm.startLeaderElection(ctx); err != nil {
					cm.errChan <- err
				}
			} else {
				// Treat not having leader election enabled the same as being elected.
				if err := cm.startLeaderElectionRunnables(); err != nil {
					cm.errChan <- err
				}
				close(cm.elected)
			}
		}()
	}

	// 10.开启循环，监听 SIGTERM 和 SIGINT 信号，和Manager错误，任意一个触发就退出
	ready = true
	cm.Unlock()
	select {
	case <-ctx.Done():
		// We are done
		return nil
	case err := <-cm.errChan:
		// Error starting or running a runnable
		return err
	}
}
```

:::

<br />

### 问题探究

#### Reconcile函数是如何触发的

::: details （1）从Controller启动开始便会一直从队列中获取

（我们自己的Controller）`Complete` -->  `Build` --> `doController` --> `newController` --> `NewUnmanaged` --> `controller.Controller` --> `(c *Controller) Start` --> `for c.processNextWorkItem(ctx) {}` -->

```go
// 不断的从队列中获取，然后执行 c.reconcileHandler(ctx, obj)
func (c *Controller) processNextWorkItem(ctx context.Context) bool {
	obj, shutdown := c.Queue.Get()
	if shutdown {
		// Stop working
		return false
	}

	// We call Done here so the workqueue knows we have finished
	// processing this item. We also must remember to call Forget if we
	// do not want this work item being re-queued. For example, we do
	// not call Forget if a transient error occurs, instead the item is
	// put back on the workqueue and attempted again after a back-off
	// period.
	defer c.Queue.Done(obj)

	ctrlmetrics.ActiveWorkers.WithLabelValues(c.Name).Add(1)
	defer ctrlmetrics.ActiveWorkers.WithLabelValues(c.Name).Add(-1)

	c.reconcileHandler(ctx, obj)
	return true
}

// c.Reconcile 去调用我们的Reconcile，然后根据结果判断是否需要重试，
// 需要注意的是若err != nil 或 只设置了Requeue的话，会使用限流策略，而使用RequeueAfter则不会限流
func (c *Controller) reconcileHandler(ctx context.Context, obj interface{}) {
	// Update metrics after processing each item
	reconcileStartTS := time.Now()
	defer func() {
		c.updateMetrics(time.Since(reconcileStartTS))
	}()

	// Make sure that the object is a valid request.
	req, ok := obj.(reconcile.Request)
	if !ok {
		// As the item in the workqueue is actually invalid, we call
		// Forget here else we'd go into a loop of attempting to
		// process a work item that is invalid.
		c.Queue.Forget(obj)
		c.LogConstructor(nil).Error(nil, "Queue item was not a Request", "type", fmt.Sprintf("%T", obj), "value", obj)
		// Return true, don't take a break
		return
	}

	log := c.LogConstructor(&req)

	log = log.WithValues("reconcileID", uuid.NewUUID())
	ctx = logf.IntoContext(ctx, log)

	// RunInformersAndControllers the syncHandler, passing it the Namespace/Name string of the
	// resource to be synced.
	result, err := c.Reconcile(ctx, req)
	switch {
	case err != nil:
		c.Queue.AddRateLimited(req)
		ctrlmetrics.ReconcileErrors.WithLabelValues(c.Name).Inc()
		ctrlmetrics.ReconcileTotal.WithLabelValues(c.Name, labelError).Inc()
		log.Error(err, "Reconciler error")
	case result.RequeueAfter > 0:
		// The result.RequeueAfter request will be lost, if it is returned
		// along with a non-nil error. But this is intended as
		// We need to drive to stable reconcile loops before queuing due
		// to result.RequestAfter
		c.Queue.Forget(obj)
		c.Queue.AddAfter(req, result.RequeueAfter)
		ctrlmetrics.ReconcileTotal.WithLabelValues(c.Name, labelRequeueAfter).Inc()
	case result.Requeue:
		c.Queue.AddRateLimited(req)
		ctrlmetrics.ReconcileTotal.WithLabelValues(c.Name, labelRequeue).Inc()
	default:
		// Finally, if no error occurs we Forget this item so it does not
		// get queued again until another change happens.
		c.Queue.Forget(obj)
		ctrlmetrics.ReconcileTotal.WithLabelValues(c.Name, labelSuccess).Inc()
	}
}
```

:::

::: details （2）队列是谁添加的？：For、Watches、Owns

```go
func (blder *Builder) doWatch() error {
    // 1.For
	// Reconcile type
	typeForSrc, err := blder.project(blder.forInput.object, blder.forInput.objectProjection)
	if err != nil {
		return err
	}
	src := &source.Kind{Type: typeForSrc}
	hdler := &handler.EnqueueRequestForObject{}
	allPredicates := append(blder.globalPredicates, blder.forInput.predicates...)
	if err := blder.ctrl.Watch(src, hdler, allPredicates...); err != nil {
		return err
	}

    // 2.Owns
	// Watches the managed types
	for _, own := range blder.ownsInput {
		typeForSrc, err := blder.project(own.object, own.objectProjection)
		if err != nil {
			return err
		}
		src := &source.Kind{Type: typeForSrc}
		hdler := &handler.EnqueueRequestForOwner{
			OwnerType:    blder.forInput.object,
			IsController: true,
		}
		allPredicates := append([]predicate.Predicate(nil), blder.globalPredicates...)
		allPredicates = append(allPredicates, own.predicates...)
		if err := blder.ctrl.Watch(src, hdler, allPredicates...); err != nil {
			return err
		}
	}

    // 3.Watches
	// Do the watch requests
	for _, w := range blder.watchesInput {
		allPredicates := append([]predicate.Predicate(nil), blder.globalPredicates...)
		allPredicates = append(allPredicates, w.predicates...)

		// If the source of this watch is of type *source.Kind, project it.
		if srckind, ok := w.src.(*source.Kind); ok {
			typeForSrc, err := blder.project(srckind.Type, w.objectProjection)
			if err != nil {
				return err
			}
			srckind.Type = typeForSrc
		}

		if err := blder.ctrl.Watch(w.src, w.eventhandler, allPredicates...); err != nil {
			return err
		}
	}
	return nil
}

// Predicate用于事件过滤
// Predicate filters events before enqueuing the keys.
type Predicate interface {
	// Create returns true if the Create event should be processed
	Create(event.CreateEvent) bool

	// Delete returns true if the Delete event should be processed
	Delete(event.DeleteEvent) bool

	// Update returns true if the Update event should be processed
	Update(event.UpdateEvent) bool

	// Generic returns true if the Generic event should be processed
	Generic(event.GenericEvent) bool
}
```

:::

::: details （3）缓存同步：默认为10小时

```go
// Cache.New里面的默认参数中

var defaultResyncTime = 10 * time.Hour

func defaultOpts(config *rest.Config, opts Options) (Options, error) {
	// Use the default Kubernetes Scheme if unset
	if opts.Scheme == nil {
		opts.Scheme = scheme.Scheme
	}

	// Construct a new Mapper if unset
	if opts.Mapper == nil {
		var err error
		opts.Mapper, err = apiutil.NewDiscoveryRESTMapper(config)
		if err != nil {
			log.WithName("setup").Error(err, "Failed to get API Group-Resources")
			return opts, fmt.Errorf("could not create RESTMapper from config")
		}
	}

	// Default the resync period to 10 hours if unset
	if opts.Resync == nil {
		opts.Resync = &defaultResyncTime
	}
	return opts, nil
}
```

:::

总结：

* Controller通过For、Watches、Owns添加要监控的资源，若有变更事件（Create/Delete/Update/Generic）会通过Event进行过滤，然后添加到队列中
* Controller会一直从队列中取，然后触发Reconcile
* Cache会定时同步（10小时），从而也会触发Reconcile

<br />

#### Reconcile函数的限流行为

::: details （1）先看一下效果

```go
// 测试1代码部分
func (r *MyKindReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	_ = log.FromContext(ctx)
	fmt.Println(time.Now().Format("2006-01-02 15:04:05"))
	time.Sleep(time.Second)
	return ctrl.Result{Requeue: true}, nil
}

// 测试1效果：间隔时长会变得越来越大
2022-12-10 18:54:27
2022-12-10 18:54:28
2022-12-10 18:54:29
2022-12-10 18:54:30
2022-12-10 18:54:31
2022-12-10 18:54:32
2022-12-10 18:54:33
2022-12-10 18:54:34
2022-12-10 18:54:36
2022-12-10 18:54:38
2022-12-10 18:54:42
2022-12-10 18:54:48
2022-12-10 18:54:59
2022-12-10 18:55:21
2022-12-10 18:56:03

// 测试2代码部分
func (r *MyKindReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	_ = log.FromContext(ctx)
	fmt.Println(time.Now().Format("2006-01-02 15:04:05"))
	return ctrl.Result{RequeueAfter: time.Second}, nil
}

// 测试2效果：符合预期
2022-12-10 18:56:45
2022-12-10 18:56:46
2022-12-10 18:56:47
2022-12-10 18:56:48
2022-12-10 18:56:49
2022-12-10 18:56:50
2022-12-10 18:56:51
2022-12-10 18:56:52
2022-12-10 18:56:53
2022-12-10 18:56:54
2022-12-10 18:56:55
2022-12-10 18:56:56
2022-12-10 18:56:57
2022-12-10 18:56:58
2022-12-10 18:56:59
2022-12-10 18:57:00
2022-12-10 18:57:01
2022-12-10 18:57:02
2022-12-10 18:57:03
2022-12-10 18:57:04
2022-12-10 18:57:05
2022-12-10 18:57:06
2022-12-10 18:57:07
2022-12-10 18:57:08
2022-12-10 18:57:09
2022-12-10 18:57:10
2022-12-10 18:57:11
2022-12-10 18:57:12
2022-12-10 18:57:13
```

:::

::: details （2）对返回值的处理

```go
// 关键在于对部分返回值加入了限流策略
func (c *Controller) reconcileHandler(ctx context.Context, obj interface{}) {
	// Update metrics after processing each item
	reconcileStartTS := time.Now()
	defer func() {
		c.updateMetrics(time.Since(reconcileStartTS))
	}()

	// Make sure that the object is a valid request.
	req, ok := obj.(reconcile.Request)
	if !ok {
		// As the item in the workqueue is actually invalid, we call
		// Forget here else we'd go into a loop of attempting to
		// process a work item that is invalid.
		c.Queue.Forget(obj)
		c.LogConstructor(nil).Error(nil, "Queue item was not a Request", "type", fmt.Sprintf("%T", obj), "value", obj)
		// Return true, don't take a break
		return
	}

	log := c.LogConstructor(&req)

	log = log.WithValues("reconcileID", uuid.NewUUID())
	ctx = logf.IntoContext(ctx, log)

	// RunInformersAndControllers the syncHandler, passing it the Namespace/Name string of the
	// resource to be synced.
	result, err := c.Reconcile(ctx, req)
	switch {
	case err != nil:
		c.Queue.AddRateLimited(req)
		ctrlmetrics.ReconcileErrors.WithLabelValues(c.Name).Inc()
		ctrlmetrics.ReconcileTotal.WithLabelValues(c.Name, labelError).Inc()
		log.Error(err, "Reconciler error")
	case result.RequeueAfter > 0:
		// The result.RequeueAfter request will be lost, if it is returned
		// along with a non-nil error. But this is intended as
		// We need to drive to stable reconcile loops before queuing due
		// to result.RequestAfter
		c.Queue.Forget(obj)
		c.Queue.AddAfter(req, result.RequeueAfter)
		ctrlmetrics.ReconcileTotal.WithLabelValues(c.Name, labelRequeueAfter).Inc()
	case result.Requeue:
		c.Queue.AddRateLimited(req)
		ctrlmetrics.ReconcileTotal.WithLabelValues(c.Name, labelRequeue).Inc()
	default:
		// Finally, if no error occurs we Forget this item so it does not
		// get queued again until another change happens.
		c.Queue.Forget(obj)
		ctrlmetrics.ReconcileTotal.WithLabelValues(c.Name, labelSuccess).Inc()
	}
}

// 看一下默认的限流策略
// DefaultControllerRateLimiter is a no-arg constructor for a default rate limiter for a workqueue.  It has
// both overall and per-item rate limiting.  The overall is a token bucket and the per-item is exponential
func DefaultControllerRateLimiter() RateLimiter {
	return NewMaxOfRateLimiter(
		NewItemExponentialFailureRateLimiter(5*time.Millisecond, 1000*time.Second),
		// 10 qps, 100 bucket size.  This is only for retry speed and its only the overall factor (not per item)
		&BucketRateLimiter{Limiter: rate.NewLimiter(rate.Limit(10), 100)},
	)
}
```

:::

<br />

#### result.RequeueAfter 请求丢失问题

::: details 点击查看详情

```go
// Controller代码
func (r *MyKindReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	_ = log.FromContext(ctx)
	fmt.Println(time.Now().Format("2006-01-02 15:04:05"))

	return ctrl.Result{RequeueAfter: time.Minute}, nil
}

// 启动Controller
[root@node-1 example]# make run
test -s /root/example/bin/controller-gen || GOBIN=/root/example/bin go install sigs.k8s.io/controller-tools/cmd/controller-gen@v0.9.2
/root/example/bin/controller-gen rbac:roleName=manager-role crd webhook paths="./..." output:crd:artifacts:config=config/crd/bases
/root/example/bin/controller-gen object:headerFile="hack/boilerplate.go.txt" paths="./..."
go fmt ./...
go vet ./...
go run ./main.go
1.6708233638217475e+09  INFO    controller-runtime.metrics      Metrics server is starting to listen    {"addr": ":8080"}
1.67082336382204e+09    INFO    setup   starting manager
1.6708233638229964e+09  INFO    Starting server {"path": "/metrics", "kind": "metrics", "addr": "[::]:8080"}
1.6708233638231144e+09  INFO    Starting server {"kind": "health probe", "addr": "[::]:8081"}
1.6708233638235025e+09  INFO    Starting EventSource    {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind", "source": "kind source: *v1beta1.MyKind"}
1.670823363823529e+09   INFO    Starting Controller     {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind"}
1.670823363927608e+09   INFO    Starting workers        {"controller": "mykind", "controllerGroup": "crd.devops.io", "controllerKind": "MyKind", "worker count": 1}
2022-12-12 13:36:03
2022-12-12 13:36:08  // 这里对config/samples/crd_v1beta1_mykind.yaml做了一次修改,然后kubectl apply -f xx.yaml
2022-12-12 13:37:03
2022-12-12 13:38:03

// 上面可以看到，08秒做的修改触发了Reconcile，但是后面就不会再触发，也就是请求丢了
// 原因还是在于限流队列中
	result, err := c.Reconcile(ctx, req)
	switch {
	case err != nil:
		c.Queue.AddRateLimited(req)
		ctrlmetrics.ReconcileErrors.WithLabelValues(c.Name).Inc()
		ctrlmetrics.ReconcileTotal.WithLabelValues(c.Name, labelError).Inc()
		log.Error(err, "Reconciler error")
	case result.RequeueAfter > 0:
        // 请求会丢失
		// The result.RequeueAfter request will be lost, if it is returned
		// along with a non-nil error. But this is intended as
		// We need to drive to stable reconcile loops before queuing due
		// to result.RequestAfter
		c.Queue.Forget(obj)
		c.Queue.AddAfter(req, result.RequeueAfter)
		ctrlmetrics.ReconcileTotal.WithLabelValues(c.Name, labelRequeueAfter).Inc()
	case result.Requeue:
		c.Queue.AddRateLimited(req)
		ctrlmetrics.ReconcileTotal.WithLabelValues(c.Name, labelRequeue).Inc()
	default:
		// Finally, if no error occurs we Forget this item so it does not
		// get queued again until another change happens.
		c.Queue.Forget(obj)
		ctrlmetrics.ReconcileTotal.WithLabelValues(c.Name, labelSuccess).Inc()
	}
```

:::

<br />

## 4.实战

### 1）Deployment过期置零

**方案一：通过一个全局的Controller来控制所有的Deployment**

::: details （1）初始化

```bash
# 项目初始化
[root@node-1 ~]# mkdir crd-zero && cd crd-zero
[root@node-1 crd-zero]# kubebuilder init --domain devops.io --repo github.com/vvfock3r/crd-zero

# 创建API，不区分命名空间
[root@node-1 crd-zero]# kubebuilder create api --group crd --version v1beta1 --kind Zero --namespaced=false
```

:::

::: details （2）定义types文件

```yaml
/*
Copyright 2022.

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

package v1beta1

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// EDIT THIS FILE!  THIS IS SCAFFOLDING FOR YOU TO OWN!
// NOTE: json tags are required.  Any new fields you add must have json tags for the fields to be serialized.

// ZeroSpec defines the desired state of Zero
type ZeroSpec struct {
}

// +kubebuilder:validation:Enum=Running;HasError;UnKnown
type Status string

const (
	Running  Status = "Running"
	HasError Status = "HasError"
)

// ZeroStatus defines the observed state of Zero
type ZeroStatus struct {
	Status           Status `json:"status,omitempty"`
	Watched          string `json:"watched,omitempty"`
	Expired          string `json:"expired,omitempty"`
	NextScheduleTime string `json:"nextScheduleTime,omitempty"`
}

//+kubebuilder:object:root=true
//+kubebuilder:subresource:status
//+kubebuilder:resource:scope=Cluster
//+kubebuilder:printcolumn:name="STATUS",type="string",JSONPath=".status.status",priority=0
//+kubebuilder:printcolumn:name="WATCHED",type="string",JSONPath=".status.watched",priority=0
//+kubebuilder:printcolumn:name="EXPIRED",type="string",JSONPath=".status.expired",priority=0
//+kubebuilder:printcolumn:name="NEXTSCHEDULE",type="string",JSONPath=".status.nextScheduleTime",priority=0
//+kubebuilder:printcolumn:name="AGE",type="date",JSONPath=".metadata.creationTimestamp",priority=0

// Zero is the Schema for the zeroes API
type Zero struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   ZeroSpec   `json:"spec,omitempty"`
	Status ZeroStatus `json:"status,omitempty"`
}

//+kubebuilder:object:root=true

// ZeroList contains a list of Zero
type ZeroList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []Zero `json:"items"`
}

func init() {
	SchemeBuilder.Register(&Zero{}, &ZeroList{})
}
```

:::

::: details （3）编写Controller

```go
/*
Copyright 2022.

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
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/log"
	"sort"
	"strconv"
	"time"

	crdv1beta1 "github.com/vvfock3r/crd-zero/api/v1beta1"
	appsv1 "k8s.io/api/apps/v1"
)

const (
	LabelDateTime       = "2006-01-02-15-04-05"
	HumanDateTime       = "2006-01-02 15:04:05"
	DefaultRequeueAfter = time.Second * 5
)

// ZeroReconciler reconciles a Zero object
type ZeroReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

//+kubebuilder:rbac:groups=crd.devops.io,resources=zeroes,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=crd.devops.io,resources=zeroes/status,verbs=get;update;patch
//+kubebuilder:rbac:groups=crd.devops.io,resources=zeroes/finalizers,verbs=update

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the Zero object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.13.0/pkg/reconcile
func (r *ZeroReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	// 初始化日志
	logger := log.FromContext(ctx)

	// 获取 CR
	var zero crdv1beta1.Zero
	if err := r.Get(ctx, req.NamespacedName, &zero); err != nil {
		logger.Error(err, "not found cr resource for <Kind: Zero>")
		return ctrl.Result{RequeueAfter: DefaultRequeueAfter}, nil
	}

	// 设置初始状态
	zero.Status = crdv1beta1.ZeroStatus{
		Status:           crdv1beta1.Running,
		Watched:          "0/0",
		Expired:          "0/0",
		NextScheduleTime: "",
	}

	// 获取所有符合要求的 deployment
	var deploymentList appsv1.DeploymentList
	hasLabels := []string{"devops-create", "devops-expire"}
	if err := r.List(ctx, &deploymentList, client.HasLabels(hasLabels)); err != nil {
		r.UpdateStatus(ctx, &zero)
		logger.Info("no deployment matches")
		return ctrl.Result{RequeueAfter: DefaultRequeueAfter}, nil
	}

	// 对标签值做一次校验，并对deployment进行分类
	//   expireItems  已过期的，可能已经被调度也可能未被调度
	//   readyItems   未过期的，已经准备好被调度
	var expireItems []appsv1.Deployment
	var readyItems []appsv1.Deployment
	for _, item := range deploymentList.Items {
		// 获取标签值
		createdString, _ := item.Labels["devops-create"]
		expireString, _ := item.Labels["devops-expire"]

		// 对标签值格式进行校验
		created, err := time.ParseInLocation(LabelDateTime, createdString, time.Local)
		if err != nil {
			zero.Status.Status = crdv1beta1.HasError
			logger.Error(err, "label value format error: "+item.Namespace+"/"+item.Name)
			continue
		}
		expire, err := time.ParseDuration(expireString)
		if err != nil {
			zero.Status.Status = crdv1beta1.HasError
			logger.Error(err, "label value format error: "+item.Namespace+"/"+item.Name)
			continue
		}

		// 校验通过，进行分类
		if time.Now().After(created.Add(expire)) {
			expireItems = append(expireItems, item)
		} else {
			item.Labels["devops-nextSchedule"] = created.Add(expire).Format(HumanDateTime) // 临时标签
			readyItems = append(readyItems, item)
		}
	}

	// 排序,按照到期时间从近到远
	sort.Slice(readyItems, func(i, j int) bool {
		ti, _ := time.ParseInLocation(HumanDateTime, readyItems[i].Labels["devops-nextSchedule"], time.Local)
		tj, _ := time.ParseInLocation(HumanDateTime, readyItems[j].Labels["devops-nextSchedule"], time.Local)
		return ti.After(tj)
	})

	// Deployment副本数置零
	var expireDone int
	for _, item := range expireItems {
		// 若已置零则跳过
		if *item.Spec.Replicas <= 0 {
			expireDone += 1
			continue
		}
		// 置零
		item.Spec.Replicas = new(int32)
		err := r.Update(ctx, &item)
		if err != nil {
			zero.Status.Status = crdv1beta1.HasError
			logger.Error(err, "set replicas to zero failed: "+item.Namespace+"/"+item.Name)
		} else {
			expireDone += 1
			logger.Info("set replicas to zero success: " + item.Namespace + "/" + item.Name)
		}
	}

	// 设置状态
	{
		// 设置状态: Watched
		valid := strconv.Itoa(len(readyItems) + len(expireItems))
		total := strconv.Itoa(len(deploymentList.Items))
		zero.Status.Watched = valid + "/" + total

		// 设置状态: Expired
		zero.Status.Expired = strconv.Itoa(expireDone) + "/" + strconv.Itoa(len(expireItems))

		// 设置状态: NextScheduleTime
		if len(readyItems) > 0 {
			zero.Status.NextScheduleTime = readyItems[0].Labels["devops-nextSchedule"]
		}

		// 更新状态
		r.UpdateStatus(ctx, &zero)
	}

	return ctrl.Result{RequeueAfter: DefaultRequeueAfter}, nil
}

func (r *ZeroReconciler) UpdateStatus(ctx context.Context, zero *crdv1beta1.Zero) {
	logger := log.FromContext(ctx)
	err := r.Status().Update(ctx, zero)
	if err != nil {
		logger.Error(err, "update status error")
	}
}

// SetupWithManager sets up the controller with the Manager.
func (r *ZeroReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&crdv1beta1.Zero{}).
		// 监控 Deployment
        // 这里不能监控Deployment，否则遇到Deployment事件，上面的CR就获取不到了，所以也就导致不能使用Watch方式来进行调度
		//Watches(&source.Kind{Type: &appsv1.Deployment{}}, &handler.EnqueueRequestForObject{}).
		Complete(r)
}
```

:::

::: details （4）验证

```bash
# 部署Deployment
  labels:
      devops-expire: "1h"
      devops-create: "2022-12-13-17-03-00"

# 查看
[root@node-1 ~]# kubectl get zero
NAME       STATUS    WATCHED   EXPIRED   NEXTSCHEDULE          AGE
zero-pro   Running   2/2       1/1       2022-12-13 18:03:00   88s

# 再次查看
[root@node-1 ~]# kubectl get zero
NAME       STATUS    WATCHED   EXPIRED   NEXTSCHEDULE   AGE
zero-pro   Running   2/2       2/2                      9m4s
```

:::

<br />

**方案二：手动创建一个ExpireReplicaSet资源，用于控制指定的Deployment**

