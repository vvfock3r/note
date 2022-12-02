# kubebuilder

Github：[https://github.com/kubernetes-sigs/kubebuilder](https://github.com/kubernetes-sigs/kubebuilder)

文档：[https://book.kubebuilder.io/](https://book.kubebuilder.io/)

<br />

## 基础示例

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
# 创建项目目录
[root@node-1 ~]# mkdir example && cd example

# 初始化项目
#   --domain 指定域名,默认是my.domain,可以写任意字符串,后续操作中相关的名称都会放到这个域名下
#            该名称主要体现在YAML配置 和 kubectl api-resources等中
#   --repo   指定仓库,也是go模块名,可以写任意字符串
#            该名称主要体现在Go代码中,建议和项目名保持一致
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
# (1) 每个组都有一个或多个版本,每个组的每个版本都有一个或多个API。API也就是我们下面所指定的kind
# (2) --group   指定组名,任意字符串
# (3) --version 指定版本,任意字符串，但必须匹配正则^v\d+(?:alpha\d+|beta\d+)?$，建议按照约定填写
# (4) --kind    指定API,任意字符串，首字母必须大写，建议使用大驼峰命名法(每个单词首字母大写)
[root@node-1 example]# kubebuilder create api --group crd --version v1beta1 --kind MyKind

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

[root@node-1 example]# kubectl api-resources | grep -Ei 'KIND|mykind'
NAME                              SHORTNAMES   APIVERSION                             NAMESPACED   KIND
mykinds                                        crd.devops.io/v1beta1                  true         MyKind
```

:::

::: details （3）验证CRD：部署一个资源，就好比是部署一个`Kind: Pod`的资源

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

# (2) 部署,上面配置文件中并没有指定命名空间，所以部署在default中
[root@node-1 example]# kubectl apply -f config/samples/
mykind.crd.devops.io/mykind-sample created

# (3) 查看
[root@node-1 example]# kubectl get mykind
NAME            AGE
mykind-sample   18s

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
```

:::

::: details （2）部署到kubernetes：第二步：部署到kubernetes

```bash
# (1) 编辑参数,这里就先不修改了
[root@node-1 example]# vim config/manager/manager.yaml

# (2) 检查都会用到哪些镜像
[root@node-1 example]# find config -type f | xargs grep 'image: ' --color=auto
config/default/manager_auth_proxy_patch.yaml:   image: gcr.io/kubebuilder/kube-rbac-proxy:v0.13.0 # 需要科学上网，建议提前下载好
config/manager/manager.yaml:                    image: controller:latest                          # 这里修改为上一步镜像地址

# (3) 修复镜像问题
#     1) 将controller镜像修改为我们的镜像，如下所示
#     2) 提前下载好kube-rbac-proxy镜像
#     3) 这里没有使用镜像仓库，所以需要将以上两个镜像导入到所有的node节点中
[root@node-1 example]# vim config/manager/manager.yaml
image: devops.io/example:v1beat1

# (4) 部署
[root@node-1 example]# make deploy
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
			return ctrl.Result{}, nil
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

