# Kubernetes

## 文档

官方文档：[https://kubernetes.io/zh-cn/docs/home/](https://kubernetes.io/zh-cn/docs/home/)

API文档：[https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/)

Github：[https://github.com/kubernetes/kubernetes](https://github.com/kubernetes/kubernetes)

<br />

## 组件说明

文档：[https://kubernetes.io/zh-cn/docs/concepts/overview/components/](https://kubernetes.io/zh-cn/docs/concepts/overview/components/)

::: details （1）控制平面组件（Control Plane）

控制平面（Control Plane Components）包含以下组件

**（1）APIServer**

Kube-APIServer 是 Kubernetes 最重要的核心组件之一，主要提供以下功能：

* 提供管理集群的 `REST API` 接口，包括:
  * 认证 Authentication
  * 授权 Authorization
  * 准入 Admission（Mutating & Valiating）

* 提供其他模块之间的数据交互和通信的枢纽（其他模块通过 APIServer 查询或修改数据，只有 APIServer 才直接操作 etcd）

* APIServer 提供 etcd 数据缓存以减少集群对 etcd 的访问

**（2）Etcd**

etcd 是 CoreOS 基于Raft协议开发的高度一致的分布式key-value 存储，可用于服务发现、共享配置以及一致性保障（如数据库选主、分布式锁等）

etcd用于长久保存 Kubernetes API对象，只有``kube-apiserver``会向`etcd`写入/查询数据

**（3）Controller Manager**

* Controller Manager 是集群的大脑，是确保整个集群动起来的关键；
* 作用是确保 Kubernetes 遵循声明式系统规范，确保系统的真实状态（ActualState）与用户定义的期望状态（Desired State）一致；
* Controller Manager 是多个控制器的组合，每个 Controller 事实上都是一个control loop，负责侦听其管控的对象，当对象发生变更时完成配置；
* Controller 配置失败通常会触发自动重试，整个集群会在控制器不断重试的机制下确保最终一致性（ **Eventual Consistency**）。

**（4）Scheduler**

特殊的 Controller，工作原理与其他控制器无差别。

Scheduler 的特殊职责在于监控当前集群所有未调度的 Pod，并且获取当前集群所有节点的健康状况和资源使用情况，为待调度 Pod 选择最佳计算节点，完成调度。

调度阶段分为：

* Predict：过滤不能满足业务需求的节点，如资源不足、端口冲突等。
* Priority：按既定要素将满足调度需求的节点评分，选择最佳节点。
* Bind：将计算节点与 Pod 绑定，完成调度

:::

::: details （2）Node节点组件

**（1）kubelet**

Agent，在集群中每个节点（Noede)上运行

* 监视Node资源状况，定期向APIServer上报
* 管理本地容器的生命周期，比如创建容器、挂载数据卷、销毁容器等

**（2）kube-proxy**

网络代理，在集群中每个节点（Node)上运行

* 负责集群内部或外部的网络会话与 Pod 进行网络通信
* 负责对正在服务的Pods进行负载均衡

**（3）容器运行时（Container Runtime）**

比如`Docker`、`Containerd`、`CRI-O`等

:::

<br />

## 演示版本

::: details 点击查看详情

```bash
[root@node-1 ~]# kubectl get nodes
NAME     STATUS   ROLES           AGE   VERSION
node-1   Ready    control-plane   23m   v1.25.4
node-2   Ready    control-plane   15m   v1.25.4
node-3   Ready    control-plane   14m   v1.25.4
node-4   Ready    <none>          13m   v1.25.4
```

:::

<br />

## 系统信息

::: details 点击查看详情

```bash
# 查看都有哪些version
[root@node-1 ~]# kubectl api-versions
admissionregistration.k8s.io/v1
apiextensions.k8s.io/v1
apiregistration.k8s.io/v1
apps/v1
authentication.k8s.io/v1
authorization.k8s.io/v1
autoscaling/v1
autoscaling/v2
autoscaling/v2beta2
batch/v1
certificates.k8s.io/v1
coordination.k8s.io/v1
crd.projectcalico.org/v1
discovery.k8s.io/v1
events.k8s.io/v1
flowcontrol.apiserver.k8s.io/v1beta1
flowcontrol.apiserver.k8s.io/v1beta2
metrics.k8s.io/v1beta1
networking.k8s.io/v1
node.k8s.io/v1
policy/v1
rbac.authorization.k8s.io/v1
scheduling.k8s.io/v1
storage.k8s.io/v1
storage.k8s.io/v1beta1
v1

# 查看都有哪些资源
[root@node-1 ~]# kubectl api-resources
NAME                              SHORTNAMES   APIVERSION                             NAMESPACED   KIND
bindings                                       v1                                     true         Binding
componentstatuses                 cs           v1                                     false        ComponentStatus
configmaps                        cm           v1                                     true         ConfigMap
endpoints                         ep           v1                                     true         Endpoints
events                            ev           v1                                     true         Event
limitranges                       limits       v1                                     true         LimitRange
namespaces                        ns           v1                                     false        Namespace
nodes                             no           v1                                     false        Node
persistentvolumeclaims            pvc          v1                                     true         PersistentVolumeClaim
persistentvolumes                 pv           v1                                     false        PersistentVolume
pods                              po           v1                                     true         Pod
podtemplates                                   v1                                     true         PodTemplate
replicationcontrollers            rc           v1                                     true         ReplicationController
resourcequotas                    quota        v1                                     true         ResourceQuota
secrets                                        v1                                     true         Secret
serviceaccounts                   sa           v1                                     true         ServiceAccount
services                          svc          v1                                     true         Service
...

# 输出控制平面和群集服务的地址
[root@node-1 ~]# kubectl cluster-info
Kubernetes control plane is running at https://api.k8s.local:6443
CoreDNS is running at https://api.k8s.local:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.

# 查看集群详细信息（输出内容非常多）
[root@node-1 ~]# kubectl cluster-info dump
{
    "kind": "NodeList",
    "apiVersion": "v1",
    "metadata": {
        "resourceVersion": "852954"
    },
    "items": [
        {
            "metadata": {
                "name": "node-1",
                "uid": "d9d1becb-7dab-4dd0-ba72-42b36e33c06f",
                "resourceVersion": "852395",
                "creationTimestamp": "2022-08-22T15:20:33Z",
                "labels": {
                    "beta.kubernetes.io/arch": "amd64",
                    "beta.kubernetes.io/os": "linux",
                    "kubernetes.io/arch": "amd64",
                    "kubernetes.io/hostname": "node-1",
                    "kubernetes.io/os": "linux"
                },
                "annotations": {
                    "node.alpha.kubernetes.io/ttl": "0",
                    "projectcalico.org/IPv4Address": "192.168.48.142/24",
                    "projectcalico.org/IPv4IPIPTunnelAddr": "10.200.84.128",
                    "volumes.kubernetes.io/controller-managed-attach-detach": "true"
                }
            },
```

:::

<br />

## Pod基础

文档1：[https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/](https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/)

文档2：[https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/](https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/)

Pause容器：[https://kubernetes.io/zh-cn/docs/concepts/windows/intro/#pause-container](https://kubernetes.io/zh-cn/docs/concepts/windows/intro/#pause-container)



**Pod说明：**

* Pod是一个逻辑的概念
* Pod中可以包含一个或多个容器，容器共享**网络**和**存储**资源，这需要用到一个中间容器`Pause`，这是创建`Pod`时启动的第一个容器
* Pod是K8S最小的部署单元，也就是说同一Pod中的容器总是部署在同一个Node上

<br />

### 增删改查

::: details （1）创建Pod

```bash
# 方式一：使用kubectl run
[root@node-1 ~]# kubectl run busybox --image=busybox:latest --command -- sleep 3600
pod/busybox created

# -------------------------------------------------------------------------

# 方式二：使用YAML文件
# 创建Yaml文件
[root@node-1 ~]# cat > busybox.yaml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: busybox
  namespace: default
  labels:
    app: busybox
spec:
  containers:
  - name: busybox
    image: busybox:latest
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
EOF

# 创建Pod
[root@node-1 ~]# kubectl apply -f busybox.yaml
pod/busybox created

# -------------------------------------------------------------------------

# 扩展
# 1.对于其他资源，需要使用 kubectl create 创建
# 2.不管是kubectl run还是kubectl create都可以添加一个-o yaml参数，在创建资源的同时会将YAML文件输出
[root@node-1 ~]# kubectl create namespace demo -o yaml
apiVersion: v1
kind: Namespace
metadata:
  creationTimestamp: "2023-01-12T11:56:13Z"
  labels:
    kubernetes.io/metadata.name: demo
  name: demo
  resourceVersion: "32766"
  uid: b5dc2888-219e-4ece-8389-8a8655ed7627
spec:
  finalizers:
  - kubernetes
status:
  phase: Active
```

:::

::: details （2）查看Pod

```bash
# 查看默认命名空间下的Pod, 等同于kubectl get pods -n default
[root@node-1 ~]# kubectl get pods
NAME      READY   STATUS    RESTARTS   AGE
busybox   1/1     Running   0          9s
nginx     1/1     Running   0          15s

# 查看所有命名空间下的Pod
[root@node-1 ~]# kubectl get pods -A
NAMESPACE     NAME                                       READY   STATUS    RESTARTS        AGE
default       busybox                                    1/1     Running   0               18s
default       nginx                                      1/1     Running   0               24s
kube-system   calico-kube-controllers-798cc86c47-7mtnz   1/1     Running   1 (16m ago)     26m
kube-system   calico-node-2992p                          1/1     Running   2 (7m37s ago)   22m
kube-system   calico-node-fwrzv                          1/1     Running   1 (16m ago)     24m
kube-system   calico-node-rt9xl                          1/1     Running   1 (16m ago)     26m
kube-system   calico-node-wvrzz                          1/1     Running   1 (16m ago)     23m
kube-system   coredns-565d847f94-dhfjc                   1/1     Running   1 (16m ago)     31m
kube-system   coredns-565d847f94-kln2g                   1/1     Running   1 (16m ago)     31m
kube-system   etcd-node-1                                1/1     Running   1 (16m ago)     31m
kube-system   etcd-node-2                                1/1     Running   1 (16m ago)     24m
kube-system   etcd-node-3                                1/1     Running   1 (16m ago)     23m
kube-system   kube-apiserver-node-1                      1/1     Running   1 (16m ago)     31m
kube-system   kube-apiserver-node-2                      1/1     Running   1 (16m ago)     24m
kube-system   kube-apiserver-node-3                      1/1     Running   2 (16m ago)     23m
kube-system   kube-controller-manager-node-1             1/1     Running   2 (16m ago)     31m
kube-system   kube-controller-manager-node-2             1/1     Running   1 (16m ago)     24m
kube-system   kube-controller-manager-node-3             1/1     Running   1 (16m ago)     22m
kube-system   kube-proxy-826fr                           1/1     Running   2 (7m37s ago)   19m
kube-system   kube-proxy-bfnqc                           1/1     Running   1 (16m ago)     19m
kube-system   kube-proxy-cgsl9                           1/1     Running   1 (16m ago)     19m
kube-system   kube-proxy-fbs9j                           1/1     Running   1 (16m ago)     19m
kube-system   kube-scheduler-node-1                      1/1     Running   2 (16m ago)     31m
kube-system   kube-scheduler-node-2                      1/1     Running   1 (16m ago)     24m
kube-system   kube-scheduler-node-3                      1/1     Running   1 (16m ago)     22m

# 默认情况下输出比较简单
[root@node-1 ~]# kubectl get pods
NAME      READY   STATUS    RESTARTS   AGE
busybox   1/1     Running   0          37s
nginx     1/1     Running   0          43s

# 输出Pod IP和所属Node节点以及其他信息
[root@node-1 ~]# kubectl get pods -o wide
NAME      READY   STATUS    RESTARTS   AGE   IP              NODE     NOMINATED NODE   READINESS GATES
busybox   1/1     Running   0          55s   10.100.217.77   node-4   <none>           <none>
nginx     1/1     Running   0          61s   10.100.217.76   node-4   <none>           <none>

# 在Node4上看一下容器
[root@node-4 ~]# crictl ps
CONTAINER           IMAGE           CREATED         STATE      NAME         ATTEMPT  POD ID              POD
0a0ac630736db       busybox@sha256  4 minutes ago   Running    busybox      0        f52aabb72c35c       busybox
d059a65474095       nginx@sha256:0  4 minutes ago   Running    nginx        0        f9e9c163c189a       nginx
6444b44e70320       54637cb36d4a1   11 minutes ago  Running    calico-node  2        d0a71fdbbbf9e       calico-node-2992p
ec79cc78c52e7       2c2bc18642790   11 minutes ago  Running    kube-proxy   2        dcd60a494dd10       kube-proxy-826fr

# 输出更详细的信息-方式1
[root@node-1 ~]# kubectl get pod nginx -o json

# 输出更详细的信息-方式2
[root@node-1 ~]# kubectl describe pod nginx

# 通过yaml文件查看Pod
[root@node-1 ~]# kubectl get -f busybox.yaml
NAME      READY   STATUS    RESTARTS   AGE
busybox   1/1     Running   0          7m2s

[root@node-1 ~]# kubectl describe -f busybox.yaml
```

:::

::: details （3）自定义输出格式

```bash
# 默认的输出格式
[root@node-1 ~]# kubectl get pods
NAME            READY   STATUS        RESTARTS   AGE
busybox         1/1     Running       0          19s
nginx           1/1     Running       0          44m

# 自定义输出
[root@node-1 ~]# kubectl get pods -o custom-columns=NAMESPACE:.metadata.namespace,NAME:.metadata.name,NODENAME:.spec.nodeName,CREATE:.metadata.creationTimestamp
NAMESPACE   NAME      NODENAME   CREATE
default     busybox   node-4     2023-01-05T03:46:44Z
default     nginx     node-4     2023-01-05T03:02:24Z
```

:::

::: details （4）编辑Pod

```bash
[root@node-1 ~]# kubectl edit pod nginx
```

:::

::: details （5）删除Pod

```bash
# 删除Pod方式1：直接删除Pod(默认命名空间下)
[root@node-1 ~]# kubectl delete pod nginx
pod "nginx" deleted

# 删除Pod方式2：根据yaml文件删除
[root@node-1 ~]# kubectl delete -f busybox.yaml
pod "busybox" deleted
```

:::

::: details （5）重启Pod（本质上是重新创建Pod）

```bash
# 语法: kubectl get pod {podname} -n {namespace} -o yaml | kubectl replace --force -f -
[root@node-1 ~]# kubectl get pod nginx -o yaml | kubectl replace --force -f -
pod "nginx" deleted
pod/nginx replaced
```

:::

<br />

### 资源限制

内存限制：[https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/assign-memory-resource/](https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/assign-memory-resource/)

CPU限制：[https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/assign-cpu-resource/](https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/assign-cpu-resource/)

LimitRange：[https://kubernetes.io/zh-cn/docs/concepts/policy/limit-range/](https://kubernetes.io/zh-cn/docs/concepts/policy/limit-range/)

::: details （1）限制单个Pod可用资源

```bash
# 生成yaml文件
# requests: 用于请求获取多少资源，这在调度时会参考此值
# limits：  用于限制最多可以使用多少资源
[root@node-1 ~]#  cat > pod-resources.yaml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: pod-resources
  labels:
    app: pod-resources
spec:
  containers:
  - name: pod-resources
    image: busybox:latest
    command: ['sh', '-c', 'cat /dev/zero | gzip -9 > /dev/null']
    resources:
        requests:
            memory: "100Mi"
            cpu: "0.1"
        limits:
            memory: "200Mi"
            cpu: "0.5"
EOF

# 创建Pod
[root@node-1 ~]# kubectl apply -f pod-resources.yaml
pod/pod-resources created

# 查看Pod资源限制
# CPU单位换算：1 CPU = 1000m CPU
[root@node-1 ~]# kubectl describe -f pod-resources.yaml
    Limits:
      cpu:     500m          
      memory:  200Mi
    Requests:
      cpu:        100m
      memory:     100Mi

# 查看Pod资源消耗, 使用kubectl top命令前需要安装Metrics Server
[root@node-1 ~]# kubectl top pod pod-resources
NAME            CPU(cores)   MEMORY(bytes)   
pod-resources   497m         4Mi
```

:::

::: details （2）限制某个命名空间下的所有Pod可用资源

```bash
# 给命名空间下的资源添加默认值和可允许设置的范围
# default        定义默认限制值, Limits
# defaultRequest 定义默认请求值，Requests
# max 和 min      定义覆盖default值可以最大和最小使用的范围
# type           类型
#      Container 针对每个容器，而不是Pod
#      Pod       针对Pod，而不管其包含多少个容器
#                当使用此种类型时不允许设置default和defaultRequests,并且创建Pod时必须设置资源限制参数

# default和min/max的关系
#   default用于定义默认值,min和max用于限制用户自定义配置的可选范围
#   default字段的值是可以被具体资源的Requests和Limits覆盖的
#   default的值要在min和max的范围中

# 创建LimitRange时对已经存在的Pod不生效,需要重建Pod才能生效

[root@node-1 ~]# cat > limitrange.yaml <<- EOF
apiVersion: v1
kind: LimitRange
metadata:
  name: limitrange
  namespace: default
spec:
  limits:
  - default:
      cpu: 500m
      memory: 500Mi
    defaultRequest:
      cpu: 100m
      memory: 100Mi
    max:
      cpu: "1"
      memory: 1024Mi
    min:
      cpu: 50m
      memory: 50Mi
    type: Container
EOF

[root@node-1 ~]# kubectl apply -f limitrange.yaml
limitrange/limitrange created

[root@node-1 ~]# kubectl get limits
NAME         CREATED AT
limitrange   2023-01-05T03:09:54Z

# 此时我创建一个Pod
[root@node-1 ~]# kubectl run nginx --image=nginx:latest
pod/nginx created

# 默认会添加上Requests和Limits
[root@node-1 ~]# kubectl describe pod nginx
    Limits:
      cpu:     500m
      memory:  500Mi
    Requests:
      cpu:        100m
      memory:     100Mi
```

:::

<br />

### 变量注入

文档1：[https://kubernetes.io/zh-cn/docs/tasks/inject-data-application/](https://kubernetes.io/zh-cn/docs/tasks/inject-data-application/)

文档2：[https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.25/#envvar-v1-core](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.25/#envvar-v1-core)

方式：

* 直接定义变量
* Pod字段作为变量值
* Container字段作为变量值
* ConfigMap字段作为变量值
* Secret字段作为变量值

注意：

并不是支持所有的Pod字段/Container字段作为变量值，可以在上面文档中查看具体支持的值，比如

```yaml
Selects a field of the pod: supports metadata.name, metadata.namespace, `metadata.labels['<KEY>']`, `metadata.annotations['<KEY>']`, spec.nodeName, spec.serviceAccountName, status.hostIP, status.podIP, status.podIPs.
```

::: details 点击查看详情

```bash
# 创建yaml文件
[root@node-1 ~]# cat > busybox.yaml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: busybox
  labels:
    app: busybox
spec:
  containers:
  - name: busybox
    image: busybox:latest
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
    resources:
      limits:
        memory: "64Mi"
        cpu: "250m"    
    env:
      # 直接定义变量
      - name: myName
        value: "My name is vvfock3r"
      # Pod字段作为变量值
      - name: myNode 
        valueFrom:
          fieldRef:
            fieldPath: spec.nodeName
      # Container字段作为变量值
      - name: myMemoryLimit
        valueFrom:
          resourceFieldRef:
            containerName: busybox
            resource: limits.memory
EOF

# 创建Pod
[root@node-1 ~]# kubectl apply -f busybox.yaml 
pod/busybox created

# 检查变量
[root@node-1 ~]# kubectl exec -it busybox -- sh
/ # echo ${myName}
My name is vvfock3r
/ # echo ${myNode}
node-4
/ # echo ${myMemoryLimit}
67108864
```

:::

<br />

### 重启策略

文档：[https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/pod-lifecycle/#restart-policy](https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/pod-lifecycle/#restart-policy)

* 当 Pod 中的容器退出时，`kubelet` 会按指数回退方式计算重启的延迟（10s、20s、40s、...），其最长延迟为 5 分钟
* 一旦某容器执行了 10 分钟并且没有出现问题，`kubelet` 对该容器的重启回退计时器执行重置操作

::: details 点击查看详情

```bash
# 创建yaml文件
[root@node-1 ~]# vim busybox.yaml
apiVersion: v1
kind: Pod
metadata:
  name: busybox
  labels:
    app: busybox
spec:
  containers:
  - name: busybox
    image: busybox:latest
    command: ['sh', '-c']
    # 将每次启动时间写入持久化目录中
    args:
      - echo $(date +"%Y-%m-%d %H:%M:%S") >> /data/start.log && exit 1        
    volumeMounts:
      - name: data
        mountPath: /data
  # 数据持久化到宿主机目录
  volumes:
    - name: data
      hostPath:
        path: /data
        type: Directory
  # 指定Node节点，确保每次都调度到同一台机器
  nodeName: node-4
  # 指定重启策略,Always为默认值
  restartPolicy: Always

# 在node-4上创建/data目录
[root@node-4 ~]# mkdir -p /data

# 创建Pod
[root@node-1 ~]# kubectl apply -f busybox.yaml 
pod/busybox created

# 登录到node-4机器，查看/data/start.log文件
# 可以看到，每次启动时间是有延迟的
[root@node-4 ~]# cat -n /data/start.log
     1  2023-01-05 05:00:12
     2  2023-01-05 05:00:16
     3  2023-01-05 05:00:32
     4  2023-01-05 05:01:03
     5  2023-01-05 05:01:47
     6  2023-01-05 05:03:19
     7  2023-01-05 05:06:08
```

:::

<br />

### 容器探针

文档1：[https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/pod-lifecycle/#container-probes](https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/pod-lifecycle/#container-probes)

文档2：[https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/](https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)

| 检查类型                               | 说明                                   | 默认值    | 若提供该字段                               | 若检查失败执行的动作                                         |
| -------------------------------------- | -------------------------------------- | --------- | ------------------------------------------ | ------------------------------------------------------------ |
| **启动检查<br />（`startupProbe`）**   | 检查容器是否已经启动                   | `Success` | 所有其他探针都会被禁用，直到此探针成功为止 | `kubelet `会杀死容器<br />并根据其重启策略决定下一步操作     |
| **存活检查<br />（`livenessProbe`）**  | 检查容器是否正在运行                   | `Success` | - - -                                      | `kubelet `会杀死容器<br />并根据其重启策略决定下一步操作     |
| **就绪检查<br />（`readinessProbe`）** | 检查容器是否准备好<br />为请求提供服务 | `Success` | 初始状态为`Failure`                        | 检查失败会从service endpoints中删除该IP<br />检查成功则会把IP加进去 |

::: details 点击查看详情

```bash
# 创建yaml文件
[root@node-1 ~]# cat > busybox.yaml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: busybox
  labels:
    app: busybox
spec:
  containers:
  - name: demo
    image: busybox:latest
    command: ['sh', '-c']
    args:
      - 'touch /tmp/healthy && echo The app is running! && sleep 10 && rm -vf /tmp/healthy && sleep 3600'
    # 存活检查
    livenessProbe:
      exec:
        command:
          - cat
          - /tmp/healthy
      initialDelaySeconds: 5      # 在执行第一次探测前等待5秒钟
      periodSeconds: 5            # 以后每隔5秒探测一次,默认值是10
EOF

# 创建Pod
[root@node-1 ~]# kubectl apply -f busybox.yaml
pod/busybox created

# 在容器运行10秒以后存活检查将失败，此时默认会重启重启
[root@node-1 ~]# kubectl describe pod busybox
Events:
  Type     Reason     Age              From               Message
  ----     ------     ----             ----               -------
  Normal   Scheduled  24s              default-scheduler  Successfully assigned default/busybox to node-4
  Normal   Pulling    23s              kubelet            Pulling image "busybox:latest"
  Normal   Pulled     21s              kubelet            Successfully pulled image "busybox:latest" in 2.632794621s
  Normal   Created    21s              kubelet            Created container demo
  Normal   Started    20s              kubelet            Started container demo
  Warning  Unhealthy  4s (x2 over 9s)  kubelet            Liveness probe failed: cat: can't open '/tmp/healthy': No such file or directory
```

:::

<br />

### 多个容器

**（1）共享网络和存储示例**

::: details  共享网络演示（无须做任何配置就支持）

```bash
# 生成yaml文件,Pod包含多个容器
[root@node-1 ~]# cat > busybox.yaml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: busybox
spec:
  containers:
  - name: busybox1
    image: busybox:latest
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
  - name: busybox2
    image: busybox:latest
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
EOF

# 创建Pod
[root@node-1 ~]# kubectl apply -f busybox.yaml
pod/busybox created

# 查看Pod，READY下面是2/2
[root@node-1 ~]# kubectl get pods -o wide
NAME      READY   STATUS    RESTARTS   AGE   IP               NODE     NOMINATED NODE   READINESS GATES
busybox   2/2     Running   0          16s   10.100.217.106   node-4   <none>           <none>

# 在node-4节点上查看容器
[root@node-4 ~]# crictl ps
CONTAINER       IMAGE                CREATED         STATE      NAME       ATTEMPT  POD ID         POD
81f4d5fa11016   busybox@sha256:05a   28 seconds ago  Running    busybox2   0        81fbf723119c8  busybox
46da77d116044   busybox@sha256:05a   33 seconds ago  Running    busybox1   0        81fbf723119c8  busybox

# 在busybox1中监听80端口
[root@node-1 ~]# kubectl exec busybox -c busybox1 -it -- sh
/ # nc -lvp 80
listening on [::]:80 ...

# 在busybox2中访问80端口
[root@node-1 ~]# kubectl exec busybox -c busybox2 -it -- sh
/ # telnet 127.0.0.1 80
Connected to 127.0.0.1

# busybox1中已经能看到连接了
/ # nc -lvp 80
listening on [::]:80 ...
connect to [::ffff:127.0.0.1]:80 from [::ffff:127.0.0.1]:42024 ([::ffff:127.0.0.1]:42024)
```

:::

::: details  共享存储演示（需要配合【卷】一起使用）

```bash
# 生成yaml文件,Pod包含多个容器
[root@node-1 ~]# cat > busybox.yaml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: busybox
spec:
  containers:
  - name: busybox1
    image: busybox:latest
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
    volumeMounts:
      - name: data
        mountPath: /data
  - name: busybox2
    image: busybox:latest
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
    volumeMounts:
      - name: data
        mountPath: /data
  volumes:
    - name: data      
      emptyDir: {} # 临时存储卷，与Pod生命周期绑定在一起，如果Pod被删除了卷也会被删除
EOF

# 创建Pod
[root@node-1 ~]# kubectl apply -f busybox.yaml
pod/busybox created

# 查看Pod，READY下面是2/2
[root@node-1 ~]# kubectl get pods -o wide
NAME      READY   STATUS    RESTARTS   AGE   IP               NODE     NOMINATED NODE   READINESS GATES
busybox   2/2     Running   0          11s   10.100.217.107   node-4   <none>           <none>

# 在busybox1中写入数据/data/test.log
[root@node-1 ~]# kubectl exec busybox -c busybox1 -it -- sh
/ # seq 10 > /data/test.log

# 在busybox2中查看数据
[root@node-1 ~]# kubectl exec busybox -c busybox2 -it -- sh
/ # ls -l /data
total 4
-rw-r--r--    1 root     root            21 Jan  5 05:26 test.log
/ # cat /data/test.log
1
2
3
4
5
6
7
8
9
10
```

:::

<br />

**（2）共享进程命名空间**

文档：[https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/share-process-namespace/](https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/share-process-namespace/)

::: details  点击查看详情

```bash
# 生成yaml文件
[root@node-1 ~]# cat > busybox.yaml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: busybox
spec:
  # 共享进程命名空间
  shareProcessNamespace: true
  containers:
  - name: busybox1
    image: busybox:latest
    command: ['sh', '-c', "echo `date '+%Y-%m-%d %H:%M:%S'` The app is running! && sleep 3600"]
  - name: busybox2
    image: busybox:latest
    command: ['sh', '-c', "echo `date '+%Y-%m-%d %H:%M:%S'` The app is running! && sleep 3600"]
EOF

# 创建Pod
[root@node-1 ~]# kubectl apply -f busybox.yaml
pod/busybox created

# 在任意一个容器中执行ps命令
[root@node-1 ~]# kubectl exec -it busybox -c busybox1 -- ps aux
PID   USER     TIME  COMMAND
    1 65535     0:00 /pause
    7 root      0:00 sleep 3600
   12 root      0:00 sleep 3600
   18 root      0:00 ps aux
```

:::

<br />

**（3）Init容器**

文档：[https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/init-containers/](https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/init-containers/)

特点：

* 先于应用容器运行，且必须运行完成以后才会运行应用容器
* 可以有多个Init容器，每个Init容器运行完成之后才会运行下一个Init容器

注意事项：

* Pod 重启会导致Init容器重新执行，所以Init容器的代码应该是幂等的（即任意多次执行所产生的影响与一次执行的影响相同）

::: details  点击查看详情

```bash
# 生成yaml文件
[root@node-1 ~]# cat > busybox.yaml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: busybox
spec:
  containers:
  - name: busybox
    image: busybox:latest
    command: ['sh', '-c', "echo `date '+%Y-%m-%d %H:%M:%S'` The app is running! && sleep 3600"]
  initContainers:
  - name: init1
    image: busybox:latest
    command: ['sh', '-c', "echo `date '+%Y-%m-%d %H:%M:%S'` init1 start running && sleep 10"]
  - name: init2
    image: busybox:latest
    command: ['sh', '-c', "echo `date '+%Y-%m-%d %H:%M:%S'` init2 start running && sleep 10"]
EOF

# 创建Pod
[root@node-1 ~]# kubectl apply -f busybox.yaml
pod/busybox created

# 查看Pod
[root@node-1 ~]# kubectl get pods -o wide
NAME      READY   STATUS     RESTARTS   AGE   IP               NODE     NOMINATED NODE   READINESS GATES
busybox   0/1     Init:0/2   0          13s   10.100.217.109   node-4   <none>           <none>

[root@node-1 ~]# kubectl get pods -o wide
NAME      READY   STATUS     RESTARTS   AGE   IP               NODE     NOMINATED NODE   READINESS GATES
busybox   0/1     Init:1/2   0          24s   10.100.217.109   node-4   <none>           <none>

[root@node-1 ~]# kubectl get pods -o wide
NAME      READY   STATUS            RESTARTS   AGE   IP               NODE     NOMINATED NODE   READINESS GATES
busybox   1/1     PodInitializing   0          39s   10.100.217.109   node-4   <none>           <none>

[root@node-1 ~]# kubectl get pods -o wide
NAME      READY   STATUS    RESTARTS   AGE   IP               NODE     NOMINATED NODE   READINESS GATES
busybox   1/1     Running   0          39s   10.100.217.109   node-4   <none>           <none>

# 查看容器日志
[root@node-1 ~]# kubectl logs busybox -c init1 && kubectl logs busybox -c init2 && kubectl logs busybox -c busybox
2023-01-05 13:32:35 init1 start running
2023-01-05 13:32:35 init2 start running
2023-01-05 13:32:35 The app is running!
```

:::

<br />

### 回调钩子

文档：[https://kubernetes.io/zh-cn/docs/concepts/containers/container-lifecycle-hooks/](https://kubernetes.io/zh-cn/docs/concepts/containers/container-lifecycle-hooks/)

有两个回调暴露给容器：

* `postStart`：容器创建之后执行，它和我们定义的容器的`command`命令是并行执行的
* `preStop`：容器终止之前执行，执行完成之后再向容器发送终止信号

::: details  点击查看详情

```bash
# 生成yaml文件
[root@node-1 ~]# vim busybox.yaml
apiVersion: v1
kind: Pod
metadata:
  name: busybox
spec:
  containers:
  - name: busybox
    image: busybox:latest
    command: ['sh', '-c', 'echo "`date +"%Y-%m-%d %H:%M:%S"` command   running" >> /tmp/demo.log && sleep 3600']
    lifecycle:
      postStart:
        exec:
          command: ['sh', '-c', 'echo "`date +"%Y-%m-%d %H:%M:%S"` postStart running" >> /tmp/demo.log']
      preStop:
        exec:
          command: ['sh', '-c', 'echo "`date +"%Y-%m-%d %H:%M:%S"` preStop   running" >> /tmp/demo.log && sleep 10']

# 创建Pod
[root@node-1 ~]# kubectl apply -f busybox.yaml
pod/busybox created

# 查看日志
[root@node-1 ~]# kubectl exec -it busybox -- cat /tmp/demo.log
2023-01-05 05:51:07 command   running
2023-01-05 05:51:07 postStart running

# 另开一个终端,删除Pod,此时再查看日志
[root@node-1 ~]# kubectl exec -it busybox -- cat /tmp/demo.log
2023-01-05 05:51:07 command   running
2023-01-05 05:51:07 postStart running
2023-01-05 05:51:34 preStop   running
```

:::

<br />

### 修改Hosts

文档：[https://kubernetes.io/zh-cn/docs/tasks/network/customize-hosts-file-for-pods/](https://kubernetes.io/zh-cn/docs/tasks/network/customize-hosts-file-for-pods/)

::: details  向容器的/etc/hosts添加记录

```bash
# 创建YAML
[root@node-1 ~]# cat > busybox.yaml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: busybox
spec:
  hostAliases:
  - ip: "127.0.0.1"
    hostnames:
    - "a.com"
    - "b.com"
  - ip: "10.1.2.3"
    hostnames:
    - "c.com"
    - "d.com"
  containers:
  - name: busybox1
    image: busybox:latest
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
  - name: busybox2
    image: busybox:latest
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
EOF

# 创建Pod
[root@node-1 ~]# kubectl apply -f busybox.yaml
pod/busybox created

# 分别查看两个容器中的/etc/hosts
[root@node-1 ~]# kubectl exec -it busybox -c busybox1 -- cat /etc/hosts
[root@node-1 ~]# kubectl exec -it busybox -c busybox2 -- cat /etc/hosts
# Kubernetes-managed hosts file.
127.0.0.1       localhost
::1     localhost ip6-localhost ip6-loopback
fe00::0 ip6-localnet
fe00::0 ip6-mcastprefix
fe00::1 ip6-allnodes
fe00::2 ip6-allrouters
10.100.217.110  busybox

# Entries added by HostAliases.
127.0.0.1       a.com   b.com
10.1.2.3        c.com   d.com

# 我们可以得到结论
# (1) Pod中的容器中的/etc/hosts与宿主机的不一致
# (2) Pod中的多容器中的/etc/hosts一致
# (3) 使用spec.hostAliases我们可以向/etc/hosts中添加条目
```

:::

<br />

## Pod调度

文档总览：[https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/](https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/)

`kube-scheduler`是默认的调度器，对每一个新创建的`Pod`或者是未被调度的`Pod`，`kube-scheduler`会选择一个最优的 Node 去运行这个`Pod`

<br />

### 直接指定Node

文档：[https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/assign-pod-node/#nodename](https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/assign-pod-node/#nodename)

* 使用`nodeName`后的调度不经过默认的调度器，当然也不受默认调度器的约束，指定节点上的`kubelet `会尝试将 Pod 放到该节点上
* 使用`nodeName`后的优先级会高于使用默认调度器的规则，比如 `nodeSelector` 或亲和性与非亲和性的规则
* 使用`nodeName`后的调度依旧可以调度后含有污点的节点上

::: details 点击查看详情

```yaml
# 生成yaml文件
[root@node-1 ~]# cat > busybox.yaml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: busybox
  labels:
    app: busybox
spec:
  containers:
  - name: busybox
    image: busybox:latest
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
  nodeName: node-1
EOF

# 创建Pod
[root@node-1 ~]# kubectl apply -f busybox.yaml
pod/busybox created

# 查看Pod调度在哪个Node上
[root@node-1 ~]# kubectl get pods -o wide
NAME      READY   STATUS    RESTARTS   AGE   IP              NODE     NOMINATED NODE   READINESS GATES
busybox   1/1     Running   0          46s   10.100.84.141   node-1   <none>           <none>
```

:::

<br />

### 污点和容忍度

文档：[https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/taint-and-toleration/](https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/taint-and-toleration/)

**污点（Taint）**：给某个节点打污点，是为了避免Pod调度到该节点上，比如控制平面节点

**容忍度（Toleration）**：给Pod配置容忍度，允许Pod调度到含有特定污点的节点上

::: details （1）污点基础操作

```bash
# 查看所有的Node节点的污点
[root@node-1 ~]# kubectl describe nodes | grep -Ei '\bname:|taints'
Name:               node-1
Taints:             node-role.kubernetes.io/control-plane:NoSchedule
Name:               node-2
Taints:             node-role.kubernetes.io/control-plane:NoSchedule
Name:               node-3
Taints:             node-role.kubernetes.io/control-plane:NoSchedule
Name:               node-4
Taints:             <none>

# 给node-1节点添加一个污点
# 解释：
#   （1）a=b是一个键值对，写啥都可以，但尽量是有意义的名称,其中值可以不写，=也不用写
#   （2）最后一个字段含义
#       NoSchedule         一定不能被调度到该节点上
#       PreferNoSchedule   尽量不要调度到这个节点
#       NoExecute          不仅不会调度，还会驱逐Node上已有的Pod
[root@node-1 ~]# kubectl taint node node-1 a=b:NoSchedule
node/node-1 tainted

# 查看node-1节点的污点,为了能显示完整，这里使用sed来处理
[root@node-1 ~]# kubectl describe node node-1 | sed -rn '/Taints/,/Unschedulable:/'p | sed '$d'
Taints:             a=b:NoSchedule
                    node-role.kubernetes.io/control-plane:NoSchedule

# 删除污点
[root@node-1 ~]# kubectl taint node node-1 a:NoSchedule-
node/node-1 untainted

# 添加/删除控制平面节点污点
[root@node-1 ~]# kubectl taint node node-1 node-role.kubernetes.io/control-plane:NoSchedule-
node/node-1 untainted
[root@node-1 ~]# kubectl taint node node-1 node-role.kubernetes.io/control-plane:NoSchedule
node/node-1 tainted
```

::: details （2）污点演示：NoExecute

```bash
# 生成yaml文件
[root@node-1 ~]# cat > busybox.yaml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: busybox
  labels:
    app: busybox
spec:
  containers:
  - name: busybox
    image: busybox:latest
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
EOF

# 创建Pod
[root@node-1 ~]# kubectl apply -f busybox.yaml
pod/busybox created

# 查看Pod调度在哪个Node上
[root@node-1 ~]# kubectl get pods -o wide
NAME      READY   STATUS    RESTARTS   AGE   IP               NODE     NOMINATED NODE   READINESS GATES
busybox   1/1     Running   0          9s    10.100.217.118   node-4   <none>           <none>

# 对node-4节点上的Pod驱逐
[root@node-1 ~]# kubectl taint node node-4 taint-test:NoExecute
node/node-4 tainted

# 再次查看Pod，已经在销毁中了
[root@node-1 ~]# kubectl get pods -o wide
NAME      READY   STATUS        RESTARTS   AGE   IP               NODE     NOMINATED NODE   READINESS GATES
busybox   1/1     Terminating   0          79s   10.100.217.118   node-4   <none>           <none>

# 删除污点
[root@node-1 ~]# kubectl taint node node-4 taint-test:NoExecute-
```

:::

::: details （3）容忍度演示：Tolerations

```bash
# 查看所有的Node节点的污点
[root@node-1 ~]# kubectl describe nodes | grep -Ei '\bname:|taints'
Name:               node-1
Taints:             node-role.kubernetes.io/control-plane:NoSchedule
Name:               node-2
Taints:             node-role.kubernetes.io/control-plane:NoSchedule
Name:               node-3
Taints:             node-role.kubernetes.io/control-plane:NoSchedule
Name:               node-4
Taints:             <none>

# 给node-4打上污点, Pod驱逐
[root@node-1 ~]# kubectl taint nodes node-4 tolerations-test:NoExecute
node/node-4 tainted

# 生成yaml文件，故意分配给node-4节点，这将导致一分配就销毁，但是配置了污点容忍，就可以保持Running状态
[root@node-1 ~]# cat > busybox.yaml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: busybox
  labels:
    app: busybox
spec:
  containers:
  - name: busybox
    image: busybox:latest
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
  nodeName: node-4
  # 配置容忍度
  tolerations:
    # key为空表示匹配任意的key
    - key: ""
      # 默认值是Equal, 这里设置为Exists
      operator: "Exists"
EOF

# 创建Pod
[root@node-1 ~]# kubectl apply -f busybox.yaml
pod/busybox created

# 查看Pod
[root@node-1 ~]# kubectl get pods -o wide
NAME      READY   STATUS    RESTARTS   AGE   IP               NODE     NOMINATED NODE   READINESS GATES
busybox   1/1     Running   0          6s    10.100.217.120   node-4   <none>           <none>

# 查看Pod配置的容忍度
[root@node-1 ~]# kubectl describe pod busybox | grep -i Tolerations
Tolerations:                 op=Exists
```

:::

::: details （4）删除所有控制平面节点的所有污点

```bash
# 添加/删除控制平面节点污点
[root@node-1 ~]# kubectl taint node node-1 node-role.kubernetes.io/control-plane:NoSchedule-
node/node-1 untainted
[root@node-1 ~]# kubectl taint node node-2 node-role.kubernetes.io/control-plane:NoSchedule-
node/node-2 untainted
[root@node-1 ~]# kubectl taint node node-3 node-role.kubernetes.io/control-plane:NoSchedule-
node/node-3 untainted

# 查看污点
[root@node-1 ~]# kubectl describe nodes | grep -Ei '\bname:|taints'
Name:               node-1
Taints:             <none>
Name:               node-2
Taints:             <none>
Name:               node-3
Taints:             <none>
Name:               node-4
Taints:             <none>

# 如果想加上去的话执行下面的操作
[root@node-1 ~]# kubectl taint node node-1 node-role.kubernetes.io/control-plane:NoSchedule
node/node-1 tainted
```

<br />

### 标签匹配

文档：[https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/assign-pod-node/#nodeselector](https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/assign-pod-node/#nodeselector)

`nodeSelector`会根据标签匹配合适的节点来调度Pod

::: details 点击查看详情

```bash
# 查看所有的节点的标签
[root@node-1 ~]# kubectl get nodes --show-labels | sed -r 's/,/\n                                                  /'g
NAME     STATUS   ROLES           AGE   VERSION   LABELS
node-1   Ready    control-plane   19h   v1.25.4   beta.kubernetes.io/arch=amd64
                                                  beta.kubernetes.io/os=linux
                                                  kubernetes.io/arch=amd64
                                                  kubernetes.io/hostname=node-1
                                                  kubernetes.io/os=linux
                                                  node-role.kubernetes.io/control-plane=
                                                  node.kubernetes.io/exclude-from-external-load-balancers=
node-2   Ready    control-plane   19h   v1.25.4   beta.kubernetes.io/arch=amd64
                                                  beta.kubernetes.io/os=linux
                                                  kubernetes.io/arch=amd64
                                                  kubernetes.io/hostname=node-2
                                                  kubernetes.io/os=linux
                                                  node-role.kubernetes.io/control-plane=
                                                  node.kubernetes.io/exclude-from-external-load-balancers=
node-3   Ready    control-plane   19h   v1.25.4   beta.kubernetes.io/arch=amd64
                                                  beta.kubernetes.io/os=linux
                                                  kubernetes.io/arch=amd64
                                                  kubernetes.io/hostname=node-3
                                                  kubernetes.io/os=linux
                                                  node-role.kubernetes.io/control-plane=
                                                  node.kubernetes.io/exclude-from-external-load-balancers=
node-4   Ready    <none>          19h   v1.25.4   beta.kubernetes.io/arch=amd64
                                                  beta.kubernetes.io/os=linux
                                                  kubernetes.io/arch=amd64
                                                  kubernetes.io/hostname=node-4
                                                  kubernetes.io/os=linux

# 题外话
# 我们使用 kubectl get nodes 的时候，为什么控制平面节点会显示 control-plane 呢？
# 因为控制平面节点包含一个标签 node-role.kubernetes.io/control-plane: ""
# 如果我把非控制平面节点也打上这个标签,那么 kubectl get nodes 的时候也会显示成控制平面节点

# 给node-1和node-2打一个标签
[root@node-1 ~]# kubectl label node node-1 diskType=ssd
node/node-1 labeled
[root@node-1 ~]# kubectl label node node-2 diskType=ssd
node/node-2 labeled

# 如果想删除标签，那么使用 <标签名->
[root@node-1 ~]# kubectl label node node-1 diskType-
node/node-1 unlabeled

# 生成yaml文件
[root@node-1 ~]# cat > busybox.yaml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: busybox
  labels:
    app: busybox
spec:
  containers:
  - name: busybox
    image: busybox:latest
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
  nodeSelector:
    kubernetes.io/os: linux   # 选择系统为linux标签的节点
    diskType: ssd             # 选择diskType=ssd标签的节点
EOF

# 创建Pod
[root@node-1 ~]# kubectl apply -f busybox.yaml
pod/busybox created

# 查看Pod调度在哪个Node上
[root@node-1 ~]# kubectl get pods -o wide
NAME      READY   STATUS    RESTARTS   AGE   IP             NODE     NOMINATED NODE   READINESS GATES
busybox   1/1     Running   0          9s    10.100.247.5   node-2   <none>           <none>
```

:::

<br />

### 节点亲和性

文档：[https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/assign-pod-node/#affinity-and-anti-affinity](https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/assign-pod-node/#affinity-and-anti-affinity)

`requiredDuringSchedulingIgnoredDuringExecution`：调度器只有在规则被满足的时候才能执行调度

`preferredDuringSchedulingIgnoredDuringExecution`：调度器会尝试寻找满足对应规则的节点。如果找不到匹配的节点，调度器仍然会调度该 Pod

::: details （一）requiredDuringSchedulingIgnoredDuringExecution 基础示例

这是一个基础示例，只要节点同时满足以下两个条件即可被调度，不满足不调度

* 系统为linux
* 节点含有标签diskType=ssd

```yaml
# 生成yaml文件
[root@node-1 ~]# cat > busybox.yaml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: busybox
  labels:
    app: busybox
spec:
  containers:
  - name: busybox
    image: busybox:latest
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
          - matchExpressions:
            - key: kubernetes.io/os
              operator: In
              values:
              - linux
            - key: diskType
              operator: In
              values:
              - ssd
EOF

# 创建Pod
[root@node-1 ~]# kubectl apply -f busybox.yaml
pod/busybox created

# 查看Pod调度在哪个Node上
[root@node-1 ~]# kubectl get pods -o wide
NAME      READY   STATUS    RESTARTS   AGE   IP             NODE     NOMINATED NODE   READINESS GATES
busybox   1/1     Running   0          31s   10.100.247.6   node-2   <none>           <none>
```

:::

::: details nodeSelectorTerms：若包含多个nodeSelectorTerms则只有最后一个生效，覆盖的关系

```yaml
# 生成yaml文件
[root@node-1 ~]# cat > busybox.yaml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: busybox
  labels:
    app: busybox
spec:
  containers:
  - name: busybox
    image: busybox:latest
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
          - matchExpressions:
            - key: kubernetes.io/hostname
              operator: In
              values:
              - node-1
        nodeSelectorTerms:
          - matchExpressions:
            - key: kubernetes.io/hostname
              operator: In
              values:
              - node-2
        nodeSelectorTerms:
          - matchExpressions:
            - key: kubernetes.io/hostname
              operator: In
              values:
              - node-3
EOF

# 创建Pod
[root@node-1 ~]# kubectl apply -f busybox.yaml
pod/busybox created

# 查看Pod调度在哪个Node上
[root@node-1 ~]# kubectl get pods -o wide
NAME      READY   STATUS    RESTARTS   AGE   IP              NODE     NOMINATED NODE   READINESS GATES
busybox   1/1     Running   0          20m   10.100.139.68   node-3   <none>           <none>
```

:::

::: details matchExpressions：同一nodeSelectorTerms下若包含多个matchExpressions只要满足一个即可被调度，或的关系

```yaml
# 生成yaml文件
[root@node-1 ~]# cat > busybox.yaml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: busybox
  labels:
    app: busybox
spec:
  containers:
  - name: busybox
    image: busybox:latest
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
          # 第一个matchExpressions可以被满足，第二个matchExpressions肯定不会被满足
          # 以此来说明:
          #   (1) 多个matchExpressions之间不是【覆盖】的关系
          #   (2) 多个matchExpressions之间不是【与】的关系
          #   (3) 多个matchExpressions之间是【或】的关系        
          - matchExpressions:
            - key: kubernetes.io/hostname
              operator: In
              values:
              - node-1
          - matchExpressions:
            - key: kubernetes.io/hostname
              operator: In
              values:
              - node-999
EOF

# 创建Pod
[root@node-1 ~]# kubectl apply -f busybox.yaml
pod/busybox created

# 查看Pod调度在哪个Node上
[root@node-1 ~]# kubectl get pods -o wide
NAME      READY   STATUS    RESTARTS   AGE   IP              NODE     NOMINATED NODE   READINESS GATES
busybox   1/1     Running   0          6s    10.100.84.160   node-1   <none>           <none>
```

:::

::: details key：同一matchExpressions下若包含多个key需要全部满足才可被调度，与的关系

```yaml
# 生成yaml文件
[root@node-1 ~]# cat > busybox.yaml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: busybox
  labels:
    app: busybox
spec:
  containers:
  - name: busybox
    image: busybox:latest
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
          - matchExpressions:
            - key: kubernetes.io/hostname
              operator: In
              values:
              - node-1
            - key: kubernetes.io/os
              operator: In
              values:
              - windows
EOF

# 创建Pod
[root@node-1 ~]# kubectl apply -f busybox.yaml
pod/busybox created

# 查看Pod调度在哪个Node上，因为不满足kubernetes.io/os，所以一直未被调度成功
[root@node-1 ~]# kubectl get pods -o wide
NAME      READY   STATUS    RESTARTS   AGE   IP       NODE     NOMINATED NODE   READINESS GATES
busybox   0/1     Pending   0          25s   <none>   <none>   <none>           <none>
```

:::

::: details 关联关系：key、operator、values之间的关联关系

`operator`支持`In`、`NotIn`、`Exists`、`DoesNotExist`、`Gt` 和 `Lt` 作为操作符

`In`：满足一个条件即可调度，或的关系

```yaml
# 生成yaml文件
[root@node-1 ~]# cat > busybox.yaml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: busybox
  labels:
    app: busybox
spec:
  containers:
  - name: busybox
    image: busybox:latest
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
          - matchExpressions:
            - key: kubernetes.io/hostname
              operator: In
              values:
              - node-2
              - node-3
EOF

# 创建Pod
[root@node-1 ~]# kubectl apply -f busybox.yaml
pod/busybox created

# 查看Pod调度在哪个Node上
[root@node-1 ~]# kubectl get pods -o wide
NAME      READY   STATUS    RESTARTS   AGE   IP              NODE     NOMINATED NODE   READINESS GATES
busybox   1/1     Running   0          7s    10.100.139.69   node-3   <none>           <none>
```

`NotIn`：全部不满足才会调度，与的关系

```yaml
# 生成yaml文件
[root@node-1 ~]# cat > busybox.yaml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: busybox
  labels:
    app: busybox
spec:
  containers:
  - name: busybox
    image: busybox:latest
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
          - matchExpressions:
            - key: kubernetes.io/hostname
              operator: NotIn
              values:
              - node-1
              - node-2
              - node-3
EOF

# 创建Pod
[root@node-1 ~]# kubectl apply -f busybox.yaml
pod/busybox created

# 查看Pod调度在哪个Node上
[root@node-1 ~]# kubectl get pods -o wide
NAME      READY   STATUS    RESTARTS   AGE   IP               NODE     NOMINATED NODE   READINESS GATES
busybox   1/1     Running   0          8s    10.100.217.121   node-4   <none>           <none>
```

`Exists`：标签存在即可被调度，不支持`values`字段

```yaml
# 生成yaml文件
[root@node-1 ~]# cat > busybox.yaml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: busybox
  labels:
    app: busybox
spec:
  containers:
  - name: busybox
    image: busybox:latest
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
          - matchExpressions:
            - key: kubernetes.io/hostname
              operator: Exists
            - key: node-role.kubernetes.io/control-plane
              operator: Exists
EOF

# 创建Pod
[root@node-1 ~]# kubectl apply -f busybox.yaml
pod/busybox created

# 查看Pod调度在哪个Node上
[root@node-1 ~]# kubectl get pods -o wide
NAME      READY   STATUS    RESTARTS   AGE   IP              NODE     NOMINATED NODE   READINESS GATES
busybox   1/1     Running   0          11s   10.100.139.70   node-3   <none>           <none>
```

`DoesNotExist`：标签不存在才会被调度，不支持`values`字段

```yaml
# 生成yaml文件
[root@node-1 ~]# cat > busybox.yaml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: busybox
  labels:
    app: busybox
spec:
  containers:
  - name: busybox
    image: busybox:latest
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
          - matchExpressions:
            - key: kubernetes.io/hostname
              operator: Exists
            - key: node-role.kubernetes.io/control-plane
              operator: DoesNotExist
EOF

# 创建Pod
[root@node-1 ~]# kubectl apply -f busybox.yaml
pod/busybox created

# 查看Pod调度在哪个Node上
[root@node-1 ~]# kubectl get pods -o wide
NAME      READY   STATUS    RESTARTS   AGE   IP               NODE     NOMINATED NODE   READINESS GATES
busybox   1/1     Running   0          5s    10.100.217.124   node-4   <none>           <none>
```

`Gt`：标签值大于所指定的值才会被调度

`Lt`：标签值小于所指定的值才会被调度

```yaml
# 给节点打个标签
[root@node-1 ~]# kubectl label node node-1 weight=1
[root@node-1 ~]# kubectl label node node-2 weight=2
[root@node-1 ~]# kubectl label node node-3 weight=3

# 生成yaml文件
[root@node-1 ~]# cat > busybox.yaml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: busybox
  labels:
    app: busybox
spec:
  containers:
  - name: busybox
    image: busybox:latest
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
          - matchExpressions:
            - key: weight
              operator: Gt
              values:
              - "1"   # 这里必须写字符串类型，不能写数字类型
            - key: weight
              operator: Lt
              values:
              - "3"  # 这里必须写字符串类型，不能写数字类型
EOF

# 创建Pod
[root@node-1 ~]# kubectl apply -f busybox.yaml
pod/busybox created

# 查看Pod调度在哪个Node上
[root@node-1 ~]# kubectl get pods -o wide
NAME      READY   STATUS    RESTARTS   AGE   IP             NODE     NOMINATED NODE   READINESS GATES
busybox   1/1     Running   0          11s   10.100.247.9   node-2   <none>           <none>
```

:::

<br />

::: details （二）preferredDuringSchedulingIgnoredDuringExecution基础示例

`preferredDuringSchedulingIgnoredDuringExecution`写法与`requiredDuringSchedulingIgnoredDuringExecution`类似，这里给出一个基础示例

```yaml
# 生成yaml文件
[root@node-1 ~]# cat > busybox.yaml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: busybox
  labels:
    app: busybox
spec:
  containers:
  - name: busybox
    image: busybox:latest
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
  affinity:
    nodeAffinity:
      # 软限制
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 1
        preference:
          matchExpressions:
          # 指定一个肯定不会存在的key和值
          - key: non-exists-key
            operator: In
            values:
            - any-value
EOF

# 创建Pod
[root@node-1 ~]# kubectl apply -f busybox.yaml
pod/busybox created

# 查看Pod调度在哪个Node上
[root@node-1 ~]# kubectl get pods -o wide
NAME      READY   STATUS    RESTARTS   AGE   IP               NODE     NOMINATED NODE   READINESS GATES
busybox   1/1     Running   0          8s    10.100.217.125   node-4   <none>           <none>
```

:::

<br />

::: details （三）matchExpressions和matchFields匹配时的不同

`matchExpressions`用于标签匹配，`matchFields`用于字段匹配（或称为属性匹配），参考如下官方资料

文档：[https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/#nodeselectorterm-v1-core](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/#nodeselectorterm-v1-core)

![image-20220614145526005](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220614145526005.png)

```yaml
# 生成yaml文件
[root@node-1 ~]# cat > busybox.yaml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: busybox
  labels:
    app: busybox
spec:
  containers:
  - name: busybox
    image: busybox:latest
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
          # 匹配字段metadata.name是node-1的node
          - matchFields:
            - key: metadata.name
              operator: In
              values:
              - node-1
EOF

# 创建Pod
[root@node-1 ~]# kubectl apply -f busybox.yaml
pod/busybox created

# 查看Pod调度在哪个Node上
[root@node-1 ~]# kubectl get pods -o wide
NAME      READY   STATUS    RESTARTS   AGE   IP              NODE     NOMINATED NODE   READINESS GATES
busybox   1/1     Running   0          10s   10.100.84.164   node-1   <none>           <none>
```

:::

<br />

## 工作负载控制器

### 简介

工作负载控制器（`Workload`）是K8S的一个抽象概念，用于部署和管理`Pod`，使用标签与Pod关联

工作负载控制器（`Workload`）实现了Pod的运维工作，例如滚动更新、伸缩、副本管理、维护Pod状态等

常用的工作负载控制器

| 工作负载控制器 | 说明                        |
| -------------- | --------------------------- |
| Deployment     | 无状态应用部署              |
| StatefulSet    | 有状态应用部署              |
| DaemonSet      | 确保所有Node都运行同一个Pod |
| Job            | 一次性任务                  |
| Cronjob        | 定时任务                    |

<br />

### Deployment

文档：[https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/deployment/](https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/deployment/)

::: details （1）基础示例

```bash
# 生成yaml文件      
[root@node-1 ~]# cat > deployment.yaml <<- EOF
apiVersion: apps/v1     # API版本
kind: Deployment        # 类型为 Deployment
metadata:               # Deployment元数据
  name: nginx           #   名称
  namespace: default    #   所属命名空间
spec:                   # Deployment定义
  replicas: 3           #   定义预期的Pod副本数量
  selector:             #   定义标签选择器
    matchLabels:        #     用于与指定标签的Pod关联
      app: web          #
  template:             # Pod模板
    metadata:           #   Pod元数据
      labels:           #     定义Pod标签
        app: web        #
    spec:               #   Pod定义
      containers:
      - name: web
        image: nginx:latest
        command: ['nginx', '-g', 'daemon off;']
EOF

# 创建Deployment
[root@node-1 ~]# kubectl apply -f deployment.yaml
deployment.apps/nginx created

# 查看Deployment
[root@node-1 ~]# kubectl get deploy -o wide
NAME    READY   UP-TO-DATE   AVAILABLE   AGE   CONTAINERS   IMAGES         SELECTOR
nginx   3/3     3            3           10s   web          nginx:latest   app=web

# 查看Pod
[root@node-1 ~]# kubectl get pods -o wide
NAME                    READY   STATUS    RESTARTS   AGE   IP              NODE     NOMINATED NODE   READINESS GATES
nginx-7d7b7d595-25tgn   1/1     Running   0          21s   10.100.217.66   node-4   <none>           <none>
nginx-7d7b7d595-mmttw   1/1     Running   0          21s   10.100.84.166   node-1   <none>           <none>
nginx-7d7b7d595-s8glt   1/1     Running   0          21s   10.100.247.11   node-2   <none>           <none>

# 当我随便删除一个Pod
[root@node-1 ~]# kubectl delete pod nginx-7d7b7d595-25tgn
pod "nginx-7d7b7d595-25tgn" deleted

# 可以在到Pod又被重新创建出来了，副本数重新恢复为3个,这其实是ReplicaSet控制器的功劳
[root@node-1 ~]# kubectl get pods -o wide
NAME                    READY   STATUS    RESTARTS   AGE   IP              NODE     NOMINATED NODE   READINESS GATES
nginx-7d7b7d595-mmttw   1/1     Running   0          47s   10.100.84.166   node-1   <none>           <none>
nginx-7d7b7d595-nqg6j   1/1     Running   0          10s   10.100.217.67   node-4   <none>           <none>
nginx-7d7b7d595-s8glt   1/1     Running   0          47s   10.100.247.11   node-2   <none>           <none>

# 查看ReplicaSet
# 1.Deployment控制器会自动创建ReplicaSet   ReplicaSet命名规则    [Deployment名称]-[hash]
# 2.Deployment控制器会给ReplicaSet添加标签  ReplicaSet标签命名规则 pod-template-hash=[hash]
# 2.ReplicaSet控制器会维护Pod数量          Pod的命名规则为：      [Deployment名称]-[hash]-[随机字符串]
[root@node-1 ~]# kubectl get rs -o wide
NAME              DESIRED   CURRENT   READY   AGE   CONTAINERS   IMAGES         SELECTOR
nginx-7d7b7d595   3         3         3       99s   web          nginx:latest   app=web,pod-template-hash=7d7b7d595
```

:::

<br />

### ReplicaSet

文档：[https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/replicaset/](https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/replicaset/)

`ReplicaSet`控制器会自动维护Pod数量（新建或删除等），通常我们不需要显示使用它，而是使用更高级的对象，比如`Deployment `、`DaemonSet`等

::: details  (1) 通过污点驱逐说明ReplicaSet会自动新建Pod

```bash
# 看一下default命名空间下的Pod
[root@node-1 ~]# kubectl get pods -o wide
NAME                    READY   STATUS    RESTARTS   AGE   IP              NODE     NOMINATED NODE   READINESS GATES
nginx-7d7b7d595-4wqp2   1/1     Running   0          8s    10.100.139.79   node-3   <none>           <none>
nginx-7d7b7d595-wvr6c   1/1     Running   0          8s    10.100.84.168   node-1   <none>           <none>
nginx-7d7b7d595-xv678   1/1     Running   0          8s    10.100.217.71   node-4   <none>           <none>

# 给node-1打一个污点，用于驱逐其上的Pod
[root@node-1 ~]# kubectl taint node node-1 replicaset-test:NoExecute
node/node-1 tainted

# 查看node-1上的Pod已经被销毁，同时在node-4上又启动了一个新Pod，维持Pod数量
[root@node-1 ~]# kubectl get pods -o wide
NAME                    READY   STATUS    RESTARTS   AGE   IP              NODE     NOMINATED NODE   READINESS GATES
nginx-7d7b7d595-4wqp2   1/1     Running   0          29s   10.100.139.79   node-3   <none>           <none>
nginx-7d7b7d595-jss5h   1/1     Running   0          7s    10.100.217.72   node-4   <none>           <none>
nginx-7d7b7d595-xv678   1/1     Running   0          29s   10.100.217.71   node-4   <none>           <none>

# 看一下ReplicaSet的日志
[root@node-1 ~]# kubectl get rs
NAME              DESIRED   CURRENT   READY   AGE
nginx-7d7b7d595   3         3         3       60s

[root@node-1 ~]# kubectl describe rs nginx-7d7b7d595
Name:           nginx-7d7b7d595
Namespace:      default
Selector:       app=web,pod-template-hash=7d7b7d595
Labels:         app=web
                pod-template-hash=7d7b7d595
Annotations:    deployment.kubernetes.io/desired-replicas: 3
                deployment.kubernetes.io/max-replicas: 4
                deployment.kubernetes.io/revision: 1
Controlled By:  Deployment/nginx
Replicas:       3 current / 3 desired
Pods Status:    3 Running / 0 Waiting / 0 Succeeded / 0 Failed
Pod Template:
  Labels:  app=web
           pod-template-hash=7d7b7d595
  Containers:
   web:
    Image:      nginx:latest
    Port:       <none>
    Host Port:  <none>
    Command:
      nginx
      -g
      daemon off;
    Environment:  <none>
    Mounts:       <none>
  Volumes:        <none>
Events:
  Type    Reason            Age   From                   Message
  ----    ------            ----  ----                   -------
  Normal  SuccessfulCreate  80s   replicaset-controller  Created pod: nginx-7d7b7d595-xv678
  Normal  SuccessfulCreate  80s   replicaset-controller  Created pod: nginx-7d7b7d595-wvr6c
  Normal  SuccessfulCreate  80s   replicaset-controller  Created pod: nginx-7d7b7d595-4wqp2
  Normal  SuccessfulCreate  58s   replicaset-controller  Created pod: nginx-7d7b7d595-jss5h # 新建Pod
  
# 清理污点
[root@node-1 ~]# kubectl taint node node-1 replicaset-test:NoExecute-
node/node-1 untainted
```

:::

::: details  (2) 通过更新Deployment中replicas来控制Pod数量

```bash
# 看一下当前的Pod
[root@node-1 ~]# kubectl get pods -o wide
NAME                    READY   STATUS    RESTARTS   AGE     IP              NODE     NOMINATED NODE   READINESS GATES
nginx-7d7b7d595-4wqp2   1/1     Running   0          2m42s   10.100.139.79   node-3   <none>           <none>
nginx-7d7b7d595-jss5h   1/1     Running   0          2m20s   10.100.217.72   node-4   <none>           <none>
nginx-7d7b7d595-xv678   1/1     Running   0          2m42s   10.100.217.71   node-4   <none>           <none>

# 修改deployment.yaml中的replicas为1，并使其生效
[root@node-1 ~]# kubectl apply -f deployment.yaml
deployment.apps/nginx configured

# 再次查看Pod
[root@node-1 ~]# kubectl get pods -o wide
NAME                    READY   STATUS    RESTARTS   AGE     IP              NODE     NOMINATED NODE   READINESS GATES
nginx-7d7b7d595-4wqp2   1/1     Running   0          3m30s   10.100.139.79   node-3   <none>           <none>

# 看一下ReplicaSet的日志
[root@node-1 ~]# kubectl get rs
NAME              DESIRED   CURRENT   READY   AGE
nginx-7d7b7d595   1         1         1       3m55s
[root@node-1 ~]# kubectl describe rs nginx-7d7b7d595
Name:           nginx-7d7b7d595
Namespace:      default
Selector:       app=web,pod-template-hash=7d7b7d595
Labels:         app=web
                pod-template-hash=7d7b7d595
Annotations:    deployment.kubernetes.io/desired-replicas: 1
                deployment.kubernetes.io/max-replicas: 2
                deployment.kubernetes.io/revision: 1
Controlled By:  Deployment/nginx
Replicas:       1 current / 1 desired
Pods Status:    1 Running / 0 Waiting / 0 Succeeded / 0 Failed
Pod Template:
  Labels:  app=web
           pod-template-hash=7d7b7d595
  Containers:
   web:
    Image:      nginx:latest
    Port:       <none>
    Host Port:  <none>
    Command:
      nginx
      -g
      daemon off;
    Environment:  <none>
    Mounts:       <none>
  Volumes:        <none>
Events:
  Type    Reason            Age    From                   Message
  ----    ------            ----   ----                   -------
  Normal  SuccessfulCreate  4m3s   replicaset-controller  Created pod: nginx-7d7b7d595-xv678
  Normal  SuccessfulCreate  4m3s   replicaset-controller  Created pod: nginx-7d7b7d595-wvr6c
  Normal  SuccessfulCreate  4m3s   replicaset-controller  Created pod: nginx-7d7b7d595-4wqp2
  Normal  SuccessfulCreate  3m41s  replicaset-controller  Created pod: nginx-7d7b7d595-jss5h
  Normal  SuccessfulDelete  43s    replicaset-controller  Deleted pod: nginx-7d7b7d595-jss5h  # 删除Pod
  Normal  SuccessfulDelete  43s    replicaset-controller  Deleted pod: nginx-7d7b7d595-xv678  # 删除Pod
```

:::

<br />

### DaemonSet

文档：[https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/daemonset/](https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/daemonset/)

注意：如果节点含有污点，没有配置容忍度的话不会调度到该节点

::: details  点击查看详情

```bash
# 生成yaml文件      
[root@node-1 ~]# cat > daemonset.yaml <<- EOF
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: nginx
  namespace: default
spec:  
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
        image: nginx:latest
        command: ['nginx', '-g', 'daemon off;']
EOF

# 创建DaemonSet
[root@node-1 ~]# kubectl apply -f daemonset.yaml
daemonset.apps/nginx created

# 查看DaemonSet
[root@node-1 ~]# kubectl get ds -o wide
NAME    DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE   CONTAINERS   IMAGES         SELECTOR
nginx   3         3         3       3            3           <none>          37s   web          nginx:latest   app=web

# 查看Pod
[root@node-1 ~]# kubectl get pods -o wide
NAME          READY   STATUS    RESTARTS   AGE   IP              NODE     NOMINATED NODE   READINESS GATES
nginx-bwxgg   1/1     Running   0          39s   10.100.84.170   node-1   <none>           <none>
nginx-cx97z   1/1     Running   0          39s   10.100.247.12   node-2   <none>           <none>
nginx-fdgkm   1/1     Running   0          39s   10.100.217.75   node-4   <none>           <none>
nginx-wchml   1/1     Running   0          39s   10.100.139.81   node-3   <none>           <none>
```

:::

<br />

### Job

文档：[https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/job/](https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/job/)

::: details  （1）基础示例

以下是计算π 到小数点后 2000 位，并将结果打印出来，大约需要 10 秒钟完成

```bash
# 生成yaml文件      
[root@node-1 ~]# cat > job.yaml <<- EOF
apiVersion: batch/v1
kind: Job
metadata:
  name: job
  namespace: default
spec:
  template:
    spec:
      containers:
      - name: job
        image: perl:5.34.0
        command: ["perl",  "-Mbignum=bpi", "-wle", "print bpi(2000)"]
      restartPolicy: Never
EOF

# 创建Job
[root@node-1 ~]# kubectl apply -f job.yaml
job.batch/job created

# 查看Job
[root@node-1 ~]# kubectl get jobs -o wide
NAME   COMPLETIONS   DURATION   AGE   CONTAINERS   IMAGES        SELECTOR
job    1/1           9s         17s   job          perl:5.34.0   controller-uid=0c15e5d1-64ae-4085-9668-e633bbe33461

# 查看Pod
[root@node-1 ~]# kubectl get pods -o wide
NAME        READY   STATUS      RESTARTS   AGE   IP              NODE     NOMINATED NODE   READINESS GATES
job-p6r7v   0/1     Completed   0          27s   10.100.217.77   node-4   <none>           <none>

# 查看Pod日志
[root@node-1 ~]# kubectl logs job-p6r7v
3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632788659361533818279682303019520353018529689957736225994138912497217752834791315155748572424541506959508295331168617278558890750983817546374649393192550604009277016711390098488240128583616035637076601047101819429555961989467678374494482553797747268471040475346462080466842590694912933136770289891521047521620569660240580381501935112533824300355876402474964732639141992726042699227967823547816360093417216412199245863150302861829745557067498385054945885869269956909272107975093029553211653449872027559602364806654991198818347977535663698074265425278625518184175746728909777727938000816470600161452491921732172147723501414419735685481613611573525521334757418494684385233239073941433345477624168625189835694855620992192221842725502542568876717904946016534668049886272327917860857843838279679766814541009538837863609506800642251252051173929848960841284886269456042419652850222106611863067442786220391949450471237137869609563643719172874677646575739624138908658326459958133904780275901
```

:::

::: details  （2）重启策略

Job 中 Pod 的 `RestartPolicy`用于设置重启策略

* 该字段必须显示设置
*  只能设置为 `Never` 或 `OnFailure` 

```bash
# 生成yaml文件      
[root@node-1 ~]# cat > job.yaml <<- EOF
apiVersion: batch/v1
kind: Job
metadata:
  name: job
  namespace: default
spec:
  template:
    spec:
      containers:
      - name: job
        image: busybox:latest
        command: ['sh', '-c', 'sleep 5 && exit 1']
      restartPolicy: OnFailure
EOF

# 创建Job
[root@node-1 ~]# kubectl apply -f job.yaml
job.batch/job created

# OnFailure: 失败后会重启
[root@node-1 ~]# kubectl get pods
NAME        READY   STATUS   RESTARTS      AGE
job-8qjcv   0/1     Error    4 (55s ago)   2m9s

# -------------------------------------------------------
# 我们将restartPolicy修改为Never,然后重新测试一遍

# Never: 失败后会重新创建Pod
[root@node-1 ~]# kubectl get pods
NAME        READY   STATUS   RESTARTS   AGE
job-96jkz   0/1     Error    0          68s
job-bdnhf   0/1     Error    0          45s
job-js2xn   0/1     Error    0          104s
job-k2h7j   0/1     Error    0          80s
job-lvrs7   0/1     Error    0          56s
job-r6fwp   0/1     Error    0          32s
job-z99xm   0/1     Error    0          93s
```

:::

<br />

### Cronjob

文档：[https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/cron-jobs/](https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/cron-jobs/)

::: details  点击查看详情

```bash
# 生成yaml文件      
[root@node-1 ~]# cat > cronjob.yaml <<- EOF
apiVersion: batch/v1
kind: CronJob
metadata:
  name: hello
spec:
  schedule: "* * * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: hello
            image: busybox:latest
            imagePullPolicy: IfNotPresent
            command:
            - /bin/sh
            - -c
            - date; echo Hello from the Kubernetes cluster
          restartPolicy: OnFailure
EOF


# 创建CronJob
[root@node-1 ~]# kubectl apply -f cronjob.yaml
cronjob.batch/hello created

# 查看CronJob
[root@node-1 ~]# kubectl get cj
NAME    SCHEDULE    SUSPEND   ACTIVE   LAST SCHEDULE   AGE
hello   * * * * *   False     0        <none>          8s

# 每分钟会创建出一个Job
[root@node-1 ~]# kubectl get job
NAME             COMPLETIONS   DURATION   AGE
hello-27883020   1/1           4s         66s
hello-27883021   1/1           4s         6s

# 每个Job对应一个Pod
[root@node-1 ~]# kubectl get pods
NAME                   READY   STATUS      RESTARTS   AGE
hello-27883020-sfc2c   0/1     Completed   0          80s
hello-27883021-bq7f6   0/1     Completed   0          20s

# 查看Pod日志
[root@node-1 ~]# kubectl logs hello-27883020-sfc2c
Fri Jan  6 05:00:01 UTC 2023
Hello from the Kubernetes cluster
```

:::

<br />

## 应用对外暴露

### Service

文档：[https://kubernetes.io/zh-cn/docs/concepts/services-networking/service/](https://kubernetes.io/zh-cn/docs/concepts/services-networking/service/)

**Service说明**

* 每个`Service`都有一个固定的`IP`，使用标签与`Pod`进行关联，提供统一的访问入口和负载均衡功能
* Kubernetes 为 Service 和 Pod 创建 DNS 记录
  * Service Cluster IP A记录格式：`<service-name>.<namespace-name>.svc.cluster.local`
* Service的不足
  * 一个端口只能一个服务使用，端口需要提前规划
  * 只支持4层负载均衡，不支持7层负载均衡

<br />

**Service基础**

::: details  Service的实现方式

* `iptables`
* `ipvs`

注意：若`kube-proxy`使用`iptables`模型则不可以使用`ping`来测试通信，若使用`ipvs`模型则支持`ping`来测试通信

```bash
# 查看Service实现方式
[root@node-1 ~]# kubectl get pods -A | grep kube-proxy
kube-system   kube-proxy-826fr                           1/1     Running   15 (18h ago)     42h
kube-system   kube-proxy-bfnqc                           1/1     Running   15 (18h ago)     42h
kube-system   kube-proxy-cgsl9                           1/1     Running   13 (18h ago)     42h
kube-system   kube-proxy-fbs9j                           1/1     Running   17 (18h ago)     42h

[root@node-1 ~]# kubectl logs kube-proxy-826fr -n kube-system | grep -Ei 'proxy|proxier|iptables|ipvs'
I0106 02:24:14.250094       1 server_others.go:269] "Using ipvs Proxier"
I0106 02:24:14.250126       1 server_others.go:271] "Creating dualStackProxier for ipvs"
E0106 02:24:14.250533       1 proxier.go:390] "Can't set sysctl, kernel version doesn't satisfy minimum version requirements" sysctl="net/ipv4/vs/conn_reuse_mode" minimumKernelVersion="4.1"
I0106 02:24:14.250712       1 proxier.go:449] "IPVS scheduler not specified, use rr by default"
E0106 02:24:14.251054       1 proxier.go:390] "Can't set sysctl, kernel version doesn't satisfy minimum version requirements" sysctl="net/ipv4/vs/conn_reuse_mode" minimumKernelVersion="4.1"
I0106 02:24:14.251165       1 proxier.go:449] "IPVS scheduler not specified, use rr by default"
```

:::

::: details  Service常用的三种类型

| 类型         | 简介                                   | 说明                                                         |
| ------------ | -------------------------------------- | ------------------------------------------------------------ |
| ClusterIP    | 集群内部使用（默认类型）               | 分配一个稳定的集群内部IP                                     |
| NodePort     | 对外暴露应用                           | 分配一个稳定的集群内部IP，并在每个Node节点启用一个端口来暴露服务，使其可以在集群外部访问，<br />端口访问默认为：30000 - 32767 |
| LoadBalancer | 对外暴露应用（对于公有云环境进行优化） | 与NodePort类似，不同之处在于kubernetes会请求底层云平台（例如阿里云、腾讯云等）上的负载均衡器，将每个Node（NodeIP:NodePort）作为后端添加进去 |

:::

::: details  Service字段说明

| 字段                               | 是否必填 | 可选值和默认值                                            | 说明                     |
| ---------------------------------- | -------- | --------------------------------------------------------- | ------------------------ |
| `name`                             | ×        |                                                           | 名称                     |
| `protocol`                         | ×        | `TCP`（默认）、`UDP`、`SCTP`                              | 协议                     |
| `port`                             | √        |                                                           | Service端口              |
| `targetPort`                       | ×        | 默认情况下，`targetPort` 将被设置为与 `port` 字段相同的值 | 容器端口                 |
| `nodePort`（类型为NodePort时有效） | ×        | 30000-32767（默认端口范围）                               | 集群所有节点对外暴露端口 |

:::

<br />

**Service实践**

::: details  （1）ClusterIP

```bash
# 生成yaml文件
[root@node-1 ~]# cat > service.yaml <<- EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: demo
        image: nginx:latest
---
apiVersion: v1
kind: Service
metadata:
  name: demo
spec:
  selector:
    app: web          # 通过标签关联Pods
  type: ClusterIP     # Service类型为ClusterIP，这也是默认值
  ports:              # 端口字段，固定
    - name: http      # 定义一个名字,用来说明这是http应用
      protocol: TCP   # 协议
      port: 80        # Service端口
      targetPort: 80  # 容器端口
EOF

# 创建
[root@node-1 ~]# kubectl apply -f service.yaml 
deployment.apps/demo created
service/demo created

# 查看Service
[root@node-1 ~]# kubectl get svc -o wide
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE   SELECTOR
demo         ClusterIP   10.200.144.88   <none>        80/TCP    83s   app=web
kubernetes   ClusterIP   10.200.0.1      <none>        443/TCP   42h   <none>

# 查看Service绑定的后端的Pods地址
[root@node-1 ~]# kubectl get ep
NAME         ENDPOINTS                                                     AGE
demo         10.100.217.111:80                                             97s
kubernetes   192.168.48.151:6443,192.168.48.152:6443,192.168.48.153:6443   42h

# 查看一下Pod IP，验证是不是和Service绑定的一样
[root@node-1 ~]# kubectl get pods -o wide
NAME                    READY   STATUS    RESTARTS   AGE    IP               NODE     NOMINATED NODE   READINESS GATES
demo-8559c7f799-rlh22   1/1     Running   0          2m1s   10.100.217.111   node-4   <none>           <none>

# 在任意的Node节点都可以访问Service IP

[root@node-1 ~]# curl http://10.200.144.88 -I
HTTP/1.1 200 OK
Server: nginx/1.23.3
Date: Fri, 06 Jan 2023 05:23:27 GMT
Content-Type: text/html
Content-Length: 615
Last-Modified: Tue, 13 Dec 2022 15:53:53 GMT
Connection: keep-alive
ETag: "6398a011-267"
Accept-Ranges: bytes

[root@node-2 ~]# curl http://10.200.144.88 -I
HTTP/1.1 200 OK
Server: nginx/1.23.3
Date: Fri, 06 Jan 2023 05:23:48 GMT
Content-Type: text/html
Content-Length: 615
Last-Modified: Tue, 13 Dec 2022 15:53:53 GMT
Connection: keep-alive
ETag: "6398a011-267"
Accept-Ranges: bytes
```

:::

::: details  （2）NodePort

```bash
# 生成yaml文件
[root@node-1 ~]# cat > service.yaml <<- EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: demo
        image: nginx:latest
---
apiVersion: v1
kind: Service
metadata:
  name: demo
spec:
  selector:
    app: web          # 通过标签关联Pods
  type: NodePort      # Service类型为NodePort
  ports:              # 端口字段，固定
    - name: http      # 定义一个名字,用来说明这是http应用
      protocol: TCP   # 协议
      port: 80        # Service端口
      targetPort: 80  # 容器端口
      nodePort: 31000 # 指定NodePort,若不指定会随机选择端口
EOF

# 创建
[root@node-1 ~]# kubectl apply -f service.yaml 
deployment.apps/demo created
service/demo created

# 查看Service
[root@node-1 ~]# kubectl get svc -o wide
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE   SELECTOR
demo         NodePort    10.200.32.173   <none>        80:31000/TCP   23s   app=web
kubernetes   ClusterIP   10.200.0.1      <none>        443/TCP        42h   <none>

# 查看Service绑定的后端的Pods地址
[root@node-1 ~]# kubectl get ep
NAME         ENDPOINTS                                                     AGE
demo         10.100.217.112:80                                             32s
kubernetes   192.168.48.151:6443,192.168.48.152:6443,192.168.48.153:6443   42h

# 查看一下Pod IP，验证是不是和Service绑定的一样
[root@node-1 ~]# kubectl get pods -o wide
NAME                    READY   STATUS    RESTARTS   AGE   IP               NODE     NOMINATED NODE   READINESS GATES
demo-8559c7f799-4k796   1/1     Running   0          43s   10.100.217.112   node-4   <none>           <none>

# 在集群外部访问任意Node的NodePort端口
C:\Users\Administrator>curl http://192.168.48.153:31000 -I
HTTP/1.1 200 OK
Server: nginx/1.23.3
Date: Fri, 06 Jan 2023 05:29:01 GMT
Content-Type: text/html
Content-Length: 615
Last-Modified: Tue, 13 Dec 2022 15:53:53 GMT
Connection: keep-alive
ETag: "6398a011-267"
Accept-Ranges: bytes

# 查看监听端口，并没有监听31000端口
[root@node-1 ~]# netstat -atlnpu | grep 31000

# 在本地监听以下31000端口
[root@node-1 ~]# yum -y install nc
[root@node-1 ~]# nc -l -v -p 31000
Ncat: Version 7.50 ( https://nmap.org/ncat )
Ncat: Listening on :::31000
Ncat: Listening on 0.0.0.0:31000

# 再次在集群外部访问，依旧访问的是Nginx，且本地nc命令没有输出任何连接日志
C:\Users\Administrator>curl http://192.168.48.153:31000 -I
HTTP/1.1 200 OK
Server: nginx/1.23.3
Date: Fri, 06 Jan 2023 05:31:42 GMT
Content-Type: text/html
Content-Length: 615
Last-Modified: Tue, 13 Dec 2022 15:53:53 GMT
Connection: keep-alive
ETag: "6398a011-267"
Accept-Ranges: bytes

# 使用回环接口访问,先访问一个肯定不存在的端口，curl命令会立即(小于1秒)返回报错信息
[root@node-1 ~]# curl http://127.0.0.1:31001
curl: (7) Failed connect to 127.0.0.1:31001; Connection refused

# 当访问31000端口时超时了
[root@node-1 ~]# curl http://127.0.0.1:31000 --connect-timeout 5
curl: (28) Connection timed out after 5001 milliseconds
```

:::

<br />

**Service DNS通信**

文档：[https://kubernetes.io/zh-cn/docs/concepts/services-networking/dns-pod-service/](https://kubernetes.io/zh-cn/docs/concepts/services-networking/dns-pod-service/)

::: details  同一个NameSpace下Service DNS通信

```bash
# 生成yaml文件
[root@node-1 ~]# cat > service.yaml <<- EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: demo
        image: busybox:latest
        command: ['sh', '-c', 'echo The app is running! && sleep 3600']
---
apiVersion: v1
kind: Service
metadata:
  name: demo
  namespace: default
spec:
  selector:
    app: web          # 通过标签关联Pods
  type: ClusterIP     # Service类型为ClusterIP，这也是默认值
  ports:              # 端口字段，固定
    - name: http      # 定义一个名字,用来说明这是http应用
      protocol: TCP   # 协议
      port: 80        # Service端口
      targetPort: 80  # 容器端口
EOF

# 生成service2.yaml
[root@node-1 ~]# cp service.yaml service2.yaml 
[root@node-1 ~]# sed -ri 's/demo/demo2/g' service2.yaml

# 创建应用
[root@node-1 ~]# kubectl apply -f service.yaml 
deployment.apps/demo created
service/demo created
[root@node-1 ~]# kubectl apply -f service2.yaml 
deployment.apps/demo2 created
service/demo2 created

# 查看Pod
[root@node-1 ~]# kubectl get pods -o wide
NAME                     READY   STATUS    RESTARTS   AGE   IP               NODE     NOMINATED NODE   READINESS GATES
demo-546b654cf4-b449d    1/1     Running   0          12s   10.100.217.115   node-4   <none>           <none>
demo2-648c6ddf84-r8kqd   1/1     Running   0          8s    10.100.217.94    node-4   <none>           <none>

# 进入demo容器，Service DNS通信验证
[root@node-1 ~]# kubectl exec -it demo-546b654cf4-b449d -- sh

# (1) 直接ping service-name
/ # ping demo2 -c 4
PING demo2 (10.200.105.74): 56 data bytes
64 bytes from 10.200.105.74: seq=0 ttl=64 time=0.056 ms
64 bytes from 10.200.105.74: seq=1 ttl=64 time=0.079 ms
64 bytes from 10.200.105.74: seq=2 ttl=64 time=0.079 ms
64 bytes from 10.200.105.74: seq=3 ttl=64 time=0.149 ms

--- demo2 ping statistics ---
4 packets transmitted, 4 packets received, 0% packet loss
round-trip min/avg/max = 0.056/0.090/0.149 ms


# (2) 域名解析，可以得到IP和完整的域名
/ # nslookup demo2
Server:         10.200.0.10
Address:        10.200.0.10:53

Name:   demo2.default.svc.cluster.local
Address: 10.200.105.74

# 在demo2容器中进行Service DNS通信验证
[root@node-1 ~]# kubectl exec -it demo2-648c6ddf84-r8kqd -- ping demo -c 4
PING demo (10.200.81.10): 56 data bytes
64 bytes from 10.200.81.10: seq=0 ttl=64 time=0.059 ms
64 bytes from 10.200.81.10: seq=1 ttl=64 time=0.134 ms
64 bytes from 10.200.81.10: seq=2 ttl=64 time=0.146 ms
64 bytes from 10.200.81.10: seq=3 ttl=64 time=0.102 ms

--- demo ping statistics ---
4 packets transmitted, 4 packets received, 0% packet loss
round-trip min/avg/max = 0.059/0.110/0.146 ms
```

:::

::: details  不同NameSpace下Service DNS通信

```bash
# 生成yaml文件
[root@node-1 ~]# cat > service.yaml <<- EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: demo
        image: busybox:latest
        command: ['sh', '-c', 'echo The app is running! && sleep 3600']
---
apiVersion: v1
kind: Service
metadata:
  name: demo
  namespace: default
spec:
  selector:
    app: web          # 通过标签关联Pods
  type: ClusterIP     # Service类型为ClusterIP，这也是默认值
  ports:              # 端口字段，固定
    - name: http      # 定义一个名字,用来说明这是http应用
      protocol: TCP   # 协议
      port: 80        # Service端口
      targetPort: 80  # 容器端口
EOF

# 生成service2.yaml
[root@node-1 ~]# cp service.yaml service2.yaml 
[root@node-1 ~]# sed -ri 's/demo/demo2/g' service2.yaml
[root@node-1 ~]# sed -ri 's/(.*)(namespace:)(.*)/\1\2 kube-public/g' service2.yaml

# 创建应用
[root@node-1 ~]# kubectl apply -f service.yaml 
deployment.apps/demo created
service/demo created
[root@node-1 ~]# kubectl apply -f service2.yaml 
deployment.apps/demo2 created
service/demo2 created

# 查看Pod
[root@node-1 ~]# kubectl get pods -n default
NAME                    READY   STATUS    RESTARTS   AGE
demo-546b654cf4-mtd98   1/1     Running   0          11s

[root@node-1 ~]# kubectl get pods -n kube-public
NAME                     READY   STATUS        RESTARTS   AGE
demo2-648c6ddf84-scjgh   1/1     Running       0          11s

# 进入demo容器，Service DNS通信验证
[root@node1 ~]# kubectl exec -it demo-546b654cf4-mtd98 -- sh

# (1) 直接ping service-name是不可以的，因为在不同的namespace下
/ # ping demo2
ping: bad address 'demo2'

# (2) 可以使用service-name.namespace-name来通信
/ # ping demo2.kube-public -c 4
PING demo2.kube-public (10.200.120.104): 56 data bytes
64 bytes from 10.200.120.104: seq=0 ttl=64 time=0.078 ms
64 bytes from 10.200.120.104: seq=1 ttl=64 time=0.108 ms
64 bytes from 10.200.120.104: seq=2 ttl=64 time=0.080 ms
64 bytes from 10.200.120.104: seq=3 ttl=64 time=0.099 ms

--- demo2.kube-public ping statistics ---
4 packets transmitted, 4 packets received, 0% packet loss
round-trip min/avg/max = 0.078/0.091/0.108 ms

# 在demo2容器中进行Service DNS通信验证
[root@node-1 ~]# kubectl exec -it demo2-648c6ddf84-scjgh -n kube-public -- ping demo.default -c 4
PING demo.default (10.200.210.157): 56 data bytes
64 bytes from 10.200.210.157: seq=0 ttl=64 time=0.086 ms
64 bytes from 10.200.210.157: seq=1 ttl=64 time=0.085 ms
64 bytes from 10.200.210.157: seq=2 ttl=64 time=0.078 ms
64 bytes from 10.200.210.157: seq=3 ttl=64 time=0.094 ms

--- demo.default ping statistics ---
4 packets transmitted, 4 packets received, 0% packet loss
round-trip min/avg/max = 0.078/0.085/0.094 ms
```

:::

<br />

### Ingress

文档：[https://kubernetes.io/zh-cn/docs/concepts/services-networking/ingress/](https://kubernetes.io/zh-cn/docs/concepts/services-networking/ingress/)

说明：以下基于Ingress Nginx（Kubernetes官方维护版本）进行演示

<br />

**基础示例**

::: details  （1）部署HTTP应用

文档：[https://kubernetes.github.io/ingress-nginx/user-guide/basic-usage/](https://kubernetes.github.io/ingress-nginx/user-guide/basic-usage/)

**1、部署应用**

```bash
# 生成yaml文件
[root@node-1 ~]# cat > nginx.yaml <<- EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
  namespace: default
spec:
  replicas: 1
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
        image: nginx:latest
---
apiVersion: v1
kind: Service
metadata:
  name: web
  namespace: default
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
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web
  namespace: default
spec:
  ingressClassName: nginx      # 指定ingress类名
  rules:                        # 指定ingress规则
    - host: a.com               # 定义主机，可选
      http:                     # 
        paths:                  # 路径列表
        - path: /               #   路径
          pathType: Prefix      #   前缀匹配，区分大小写
          backend:              #   定义后端
            service:            #   service
              name: web         #     service name
              port:             #     service port
                number: 80      #
EOF

# 部署应用
[root@node-1 ~]# kubectl apply -f nginx.yaml
deployment.apps/web created
service/web created
ingress.networking.k8s.io/web created

# 查看Service
[root@node-1 ~]# kubectl get svc -o wide
NAME         TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)   AGE     SELECTOR
kubernetes   ClusterIP   10.200.0.1       <none>        443/TCP   3d22h   <none>
web          ClusterIP   10.200.103.161   <none>        80/TCP    17s     app=web

# 查看Ingress
[root@node-1 ~]# kubectl get ingress -o wide
NAME   CLASS   HOSTS   ADDRESS   PORTS   AGE
web    nginx   a.com             80      29s

# 查看Pod
[root@node-1 ~]# kubectl get pods -o wide
NAME                   READY   STATUS    RESTARTS   AGE   IP               NODE     NOMINATED NODE   READINESS GATES
web-6d59d875f6-q9lf5   1/1     Running   0          41s   10.100.217.121   node-4   <none>           <none>
```

**2、访问测试**

```bash
# 1、本地绑定hosts文件
192.168.48.151 a.com

# 2.访问Ingress Service NodePort端口
C:\Users\Administrator>curl a.com:32261
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>

# 3.访问Ingress Service端口（需Ingress NGINX设置使用宿主机网络）
C:\Users\Administrator>curl a.com
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

:::

::: details  （2）基于HTTP应用，部署HTTPS应用

文档：[https://kubernetes.io/zh-cn/docs/concepts/services-networking/ingress/#tls](https://kubernetes.io/zh-cn/docs/concepts/services-networking/ingress/#tls)

**1、提前申请好证书，这里使用[mkcert](https://github.com/FiloSottile/mkcert)生成自签证书，并且已经导入CA（即客户端已经信任由mkcert的自签证书，浏览器显示小绿锁）**

```bash
# 生成自谦证书
C:\Users\Administrator\Desktop>mkcert a.com

Created a new certificate valid for the following names 📜
 - "a.com"

The certificate is at "./a.com.pem" and the key at "./a.com-key.pem" ✅

It will expire on 8 April 2025 🗓
```

**2、使用命令行创建TLS类型Secret**

```bash
[root@node-1 ~]# kubectl create secret tls a.com --cert=a.com.pem --key=a.com-key.pem
secret/a.com created
```

**3、Ingress中指定所使用的证书**

```bash
[root@node-1 ~]# vim nginx.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web
  namespace: default
spec:
  ingressClassName: nginx       # 指定ingress类名
  tls:                          # TLS配置
  - hosts:                      #   定义主机
      - a.com                   #   
    secretName: a.com           # secret name
  rules:
    - host: a.com
  rules:                  
    - host: a.com        
      http:             
        paths:         
        - path: /     
          pathType: Prefix
          backend:       
            service:    
              name: demo-svc
              port:        
                number: 80

[root@node-1 ~]# kubectl apply -f nginx.yaml
deployment.apps/web unchanged
service/web unchanged
ingress.networking.k8s.io/web configured
```

**4、验证HTTPS**

![image-20230108174556369](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230108174556369.png)

**5、若使用`HTTP`协议则会返回`308`重定向**

若要改变其行为参考下面的连接

[https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#server-side-https-enforcement-through-redirect](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#server-side-https-enforcement-through-redirect)

```bash
C:\Users\Administrator\Desktop>curl http://a.com -I
HTTP/1.1 308 Permanent Redirect
Date: Sun, 08 Jan 2023 09:48:01 GMT
Content-Type: text/html
Content-Length: 164
Connection: keep-alive
Location: https://a.com # 重定向后新的地址
```

:::

<br />

**个性化配置**

文档：[https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/)

::: details  （1）Basic Auth 认证

文档1：[https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#authentication](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#authentication)

文档2：[https://kubernetes.github.io/ingress-nginx/examples/auth/basic/](https://kubernetes.github.io/ingress-nginx/examples/auth/basic/)

**1、先准备密码文件，并进行base64编码**

```bash
# 创建密码文件
[root@node-1 ~]# touch basic-auth.txt

# 使用htpasswd添加用户到密码文件
[root@node-1 ~]# yum -y install httpd-tools
[root@node-1 ~]# htpasswd basic-auth.txt admin    # 添加第一个用户，密码admin123
[root@node-1 ~]# htpasswd basic-auth.txt root     # 添加第二个用户，密码root123

# 查看一下文件
[root@node-1 ~]# cat basic-auth.txt
admin:$apr1$cXirwo.u$9stcR4GavYRyNEAM7CzER0
root:$apr1$ZY71LrZn$1EwOsOIdLtPVgQp76dFIv1

# base64编码
[root@node-1 ~]# cat basic-auth.txt | base64 | tr -d "\n" | awk '{print $0}'
YWRtaW46JGFwcjEkY1hpcndvLnUkOXN0Y1I0R2F2WVJ5TkVBTTdDekVSMApyb290OiRhcHIxJFpZNzFMclpuJDFFd09zT0lkTHRQVmdRcDc2ZEZJdjEK
```

**2、编写YAML**

```bash
[root@node-1 ~]# cat > nginx.yaml <<- EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
  namespace: default
spec:
  replicas: 1
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
        image: nginx:latest
---
apiVersion: v1
kind: Service
metadata:
  name: web
  namespace: default
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
# 创建Secret
apiVersion: v1
kind: Secret
metadata:
  name: basic-auth        # secret名称
  namespace: default
type: Opaque
# data.auth是固定的,值是我们上面密码文件base64编码过后的值
data:
  auth: YWRtaW46JGFwcjEkY1hpcndvLnUkOXN0Y1I0R2F2WVJ5TkVBTTdDekVSMApyb290OiRhcHIxJFpZNzFMclpuJDFFd09zT0lkTHRQVmdRcDc2ZEZJdjEK
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web
  namespace: default
  annotations:
    nginx.ingress.kubernetes.io/auth-type: basic                       # 认证类型
    nginx.ingress.kubernetes.io/auth-secret: basic-auth                # 认证所用的secret名称，与上面的secret名称要对应
    nginx.ingress.kubernetes.io/auth-secret-type: auth-file            # 认证所用的secret类型，auth-file是默认值
    nginx.ingress.kubernetes.io/auth-realm: 'Authentication Required'  # 未认证时的提示消息
spec:
  ingressClassName: nginx
  rules:        
    - host: a.com
      http:    
        paths:
        - path: /
          pathType: Prefix
          backend:
            service:
              name: web
              port:        
                number: 80
EOF

# 创建
[root@node-1 ~]# kubectl apply -f nginx.yaml 
deployment.apps/web created
service/web created
secret/basic-auth created
ingress.networking.k8s.io/web created
```

**3、访问测试**

```bash
# 默认返回401
C:\Users\Administrator\Desktop>curl -I http://a.com
HTTP/1.1 401 Unauthorized
Date: Sun, 08 Jan 2023 10:27:48 GMT
Content-Type: text/html
Content-Length: 172
Connection: keep-alive
WWW-Authenticate: Basic realm="Authentication Required"

# 输入用户名密码
C:\Users\Administrator\Desktop>curl -I http://a.com -u "admin:admin123"
HTTP/1.1 200 OK
Date: Sun, 08 Jan 2023 10:28:04 GMT
Content-Type: text/html
Content-Length: 615
Connection: keep-alive
Last-Modified: Tue, 13 Dec 2022 15:53:53 GMT
ETag: "6398a011-267"
Accept-Ranges: bytes

# 输入用户名密码
C:\Users\Administrator\Desktop>curl -I http://a.com -u "root:root123"
HTTP/1.1 200 OK
Date: Sun, 08 Jan 2023 10:28:17 GMT
Content-Type: text/html
Content-Length: 615
Connection: keep-alive
Last-Modified: Tue, 13 Dec 2022 15:53:53 GMT
ETag: "6398a011-267"
Accept-Ranges: bytes

# 输错密码
C:\Users\Administrator\Desktop>curl -I http://a.com -u "root:abc"
HTTP/1.1 401 Unauthorized
Date: Sun, 08 Jan 2023 10:28:31 GMT
Content-Type: text/html
Content-Length: 172
Connection: keep-alive
WWW-Authenticate: Basic realm="Authentication Required"
```

:::

::: details  （2）自定义Server块配置示例：比如根据User-Agent禁止某些工具访问

文档：[https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#server-snippet](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#server-snippet)

备注：

* 带`snippet`字眼的都是用来做自定义配置的

* `snippet`依赖`Ingress NGINX Controller`的`ConfigMap`中的`allow-snippet-annotations`（默认为true）

  参考：[https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/#allow-snippet-annotations](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/#allow-snippet-annotations)

```bash
# 编写YAML文件
[root@node-1 ~]# vim nginx.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
  namespace: default
spec:
  replicas: 1
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
        image: nginx:latest
---
apiVersion: v1
kind: Service
metadata:
  name: web
  namespace: default
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
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web
  namespace: default
  annotations:
    nginx.ingress.kubernetes.io/server-snippet: |
      # 禁止使用curl等工具
      if ($http_user_agent ~* "curl|wget") {
        return 403;
      }
spec:
  ingressClassName: nginx
  rules:        
    - host: a.com
      http:    
        paths:
        - path: /
          pathType: Prefix
          backend:
            service:
              name: web
              port:        
                number: 80

# 创建
[root@node-1 ~]# kubectl apply -f nginx.yaml 
deployment.apps/web created
service/web created
ingress.networking.k8s.io/web created

# 测试：直接使用curl和wget会返回403
C:\Users\Administrator\Desktop>curl http://a.com -I
HTTP/1.1 403 Forbidden
Date: Sun, 08 Jan 2023 10:46:39 GMT
Content-Type: text/html
Content-Length: 146
Connection: keep-alive

# 修改User-Agent后，可以正常访问
C:\Users\Administrator\Desktop>curl http://a.com -I --user-agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"
HTTP/1.1 200 OK
Date: Sun, 08 Jan 2023 10:47:16 GMT
Content-Type: text/html
Content-Length: 615
Connection: keep-alive
Last-Modified: Tue, 13 Dec 2022 15:53:53 GMT
```

:::

::: details  （2）自定义location块配置示例：添加Request-Id

文档：[https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#configuration-snippet](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#configuration-snippet)

```bash
# 编写YAML文件
[root@node-1 ~]# vim nginx.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
  namespace: default
spec:
  replicas: 1
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
        image: nginx:latest
---
apiVersion: v1
kind: Service
metadata:
  name: web
  namespace: default
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
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web
  namespace: default
  annotations:
    nginx.ingress.kubernetes.io/configuration-snippet: |
      more_set_headers "Request-Id: $req_id";
spec:
  ingressClassName: nginx
  rules:        
    - host: a.com
      http:    
        paths:
        - path: /
          pathType: Prefix
          backend:
            service:
              name: web
              port:        
                number: 80

# 创建
[root@node-1 ~]# kubectl apply -f nginx.yaml 
deployment.apps/web created
service/web created
ingress.networking.k8s.io/web created

# 测试
C:\Users\Administrator\Desktop>curl http://a.com -I
HTTP/1.1 200 OK
Date: Sun, 08 Jan 2023 10:49:03 GMT
Content-Type: text/html
Content-Length: 615
Connection: keep-alive
Last-Modified: Tue, 13 Dec 2022 15:53:53 GMT
ETag: "6398a011-267"
Accept-Ranges: bytes
Request-Id: c4dd6afadb27cab2b516871a0ff4c221  # Request-Id
```

:::

<br />

## 应用程序配置

### ConfigMap

文档：[https://kubernetes.io/zh-cn/docs/concepts/configuration/configmap/](https://kubernetes.io/zh-cn/docs/concepts/configuration/configmap/)

::: details  （1）创建ConfigMap

```yaml
# 生成yaml文件
[root@node-1 ~]# cat > configmap.yaml <<- EOF
apiVersion: v1
kind: ConfigMap
metadata:
  name: demo
  namespace: default  
data:
  # 类属性键
  env: fat
  # 类文件键
  fat.ini: |
    HOST  = 0.0.0.0
    PORT  = 8080
    DEBUG = true
# 设置为不可变更，这会导致
#   (1) 保护应用，不能修改此ConfigMap，只能重新创建
#   (2) 关闭K8S对此ConfigMap的监视，当ConfigMap数量特别多的时候能显著提升K8S性能
#   (3) 还有一种写法是 fat.ini: |-
#       |  文件最后一行添加换行符
#       |- 文件最后一行不会添加换行符
#immutable: true
EOF

# 创建
[root@node-1 ~]# kubectl apply -f configmap.yaml
configmap/demo created

# 查看
[root@node-1 ~]# kubectl get cm
NAME               DATA   AGE
demo               2      27s
kube-root-ca.crt   1      4d

# 查看详情
[root@node-1 ~]# kubectl describe cm demo
Name:         demo
Namespace:    default
Labels:       <none>
Annotations:  <none>

Data
====
env:
----
fat
fat.ini:
----
HOST  = 0.0.0.0
PORT  = 8080
DEBUG = true


BinaryData
====

Events:  <none>
```

:::

::: details  （2）使用ConfigMap：作为变量注入到容器、作为配置文件挂载到容器中

```bash
# 生成yaml文件
[root@node-1 ~]# cat > configmap.yaml <<- EOF
apiVersion: v1
kind: ConfigMap
metadata:
  name: demo
  namespace: default
data:
  env: pro
  pro.ini: |
    HOST  = 127.0.0.1
    PORT  = 80
    DEBUG = false
  fat.ini: |-
    HOST  = 0.0.0.0
    PORT  = 8080
    DEBUG = true
---
apiVersion: v1
kind: Pod
metadata:
  name: demo
spec:
  containers:
    - name: demo
      image: busybox:latest
      command: ["sh", "-c", "sleep 3600"]
      # 通过ConfigMap给容器注入变量
      env:
        - name: ENV                     # 变量名, 用于容器内读取，这里故意写成和ConfigMap中的key不一致
          valueFrom:                    #
            configMapKeyRef:            # 变量值来自ConfigMap
              name: demo                # ConfigMap的名称
              key: env                  # ConfigMap的key
      # 将ConfigMap中的值作为文件挂载到容器中
      volumeMounts:
      - name: config              # 名称和下面的保持一致
        mountPath: "/etc/demo/"   # 定义挂载目录, /etc/demo目录不存在会自动创建
        readOnly: true
  volumes:
    - name: config           # 定义名称
      configMap:             # 指定来自ConfigMap
        name: demo           # 和ConfigMap名称保持一致                     
        items:               # 来自 ConfigMap 的一组键，将被创建为文件
        - key: "pro.ini"     # 指定key
          path: "PRO.ini"    # 定义挂载以后的文件名
        - key: "fat.ini"     # 指定key
          path: "FAT.ini"    # 定义挂载以后的文件名
EOF

# 创建
[root@node-1 ~]# kubectl apply -f configmap.yaml
configmap/demo configured
pod/demo created

# 进入容器验证
[root@node-1 ~]# kubectl exec -it demo -- sh
/ # echo ${ENV}
pro
/ # ls /etc/demo/
FAT.ini  PRO.ini
/ # cat /etc/demo/PRO.ini
HOST  = 127.0.0.1
PORT  = 80
DEBUG = false
/ # cat /etc/demo/FAT.ini
HOST  = 0.0.0.0
PORT  = 8080
DEBUG = true/ #    # 注意这里并没有换行符
```

:::

::: details  （3）测试ConfigMap修改后Pod会不会同步更新

```bash
# 修改ConfigMap
[root@node-1 ~]# kubectl edit cm demo
apiVersion: v1
data:
  env: fat            # 这里修改为fat
  fat.ini: |
    HOST  = 0.0.0.0
    PORT  = 8080
    DEBUG = true
    SECRET = 123456   # 这里新增一个配置
  pro.ini: |
    HOST  = 127.0.0.1
    PORT  = 80
    DEBUG = false
kind: ConfigMap

# 进入容器验证
[root@node-1 ~]# kubectl exec -it demo -- sh
/ # echo ${ENV}            # 环境变量并没有更新
pro
/ # cat /etc/demo/FAT.ini  # 文件内容发生更新
HOST  = 0.0.0.0
PORT  = 8080
DEBUG = true
SECRET = 123456

# 重建Pod
[root@node-1 ~]# kubectl get pod demo -o yaml | kubectl replace --force -f -
pod "demo" deleted
pod/demo replaced

# 再次进入容器验证
[root@node-1 ~]# kubectl exec -it demo -- sh
/ # echo ${ENV}            # 环境变量发生更新
fat
/ # cat /etc/demo/FAT.ini
HOST  = 0.0.0.0
PORT  = 8080
DEBUG = true
SECRET = 123456
```

:::

<br />

### Secret

文档：[https://kubernetes.io/zh-cn/docs/concepts/configuration/secret/](https://kubernetes.io/zh-cn/docs/concepts/configuration/secret/)

* `Secret` 类似于ConfigMap，但专门用于保存机密数据

* 默认情况下`Secret`的数据未加密存储在etcd中，但是我们为`Secret`启用静态加密功能

::: details  （1）创建示例Secret

```bash
# base64编码
[root@node-1 ~]# echo -n admin | base64
YWRtaW4=
[root@node-1 ~]# echo -n 123456 | base64
MTIzNDU2

# 生成yaml文件
[root@node-1 ~]# cat > secret.yaml <<- EOF
apiVersion: v1
kind: Secret
metadata:
  name: demo
  namespace: default
type: Opaque          # Opaque: 用户定义的任意数据, 默认类型
#immutable: true      # 将Secret标记为不可更改，默认值为false

# ----------------------------------------------------
# 下面的data和stringdata所实现的效果相同，任选一个即可
# ----------------------------------------------------
# data是可选的
# data中写k-v数据
# data中的v必须是base64编码
data:
  username: YWRtaW4=
  password: MTIzNDU2

# stringdata是可选的
# stringdata中写k-v数据
# stringdata中的v直接写明文
# stringdata比data优先级高
#stringData:
#  username: admin
#  password: 123456
EOF

# 创建
[root@node-1 ~]# kubectl apply -f secret.yaml
secret/demo created

# 查看
[root@node-1 ~]# kubectl get secrets
NAME   TYPE     DATA   AGE
demo   Opaque   2      49s

# 查看详情
[root@node-1 ~]# kubectl get secret demo -o yaml
apiVersion: v1
data:
  password: MTIzNDU2
  username: YWRtaW4=
kind: Secret
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"v1","data":{"password":"MTIzNDU2","username":"YWRtaW4="},"kind":"Secret","metadata":{"annotations":{},"name":"demo","namespace":"default"},"type":"Opaque"}
  creationTimestamp: "2023-01-09T06:15:07Z"
  name: demo
  namespace: default
  resourceVersion: "114453"
  uid: 9745d23f-5199-479b-a559-15f6ff132555
type: Opaque
```

:::

::: details  （2）使用Secret：作为变量注入到容器、作为配置文件挂载到容器中

```bash
# 生成yaml文件
[root@node-1 ~]# cat > secret.yaml <<- EOF
apiVersion: v1
kind: Secret
metadata:
  name: demo
  namespace: default  
type: Opaque
stringData:
  env: pro
  username: admin
  password: qaz.12345
  host.ini: |
   1.1.1.1
   2.2.2.2
   3.3.3.3
---
apiVersion: v1
kind: Pod
metadata:
  name: demo
spec:
  containers:
    - name: demo
      image: busybox:latest
      command: ["sh", "-c", "sleep 3600"]
      # 通过ConfigMap给容器注入变量
      env:
        - name: ENV                      # 变量名, 用于容器内读取，这里故意写成和Secret中的key不一致
          valueFrom:                     #
            secretKeyRef:                # 变量值来自Secret
              name: demo                 #
              key: env                   #
              optional: false            # 此值为默认值；意味着 "mysecret"
      # 将Secret中的值作为文件挂载到容器中(这一段配置和使用ConfigMap一样)
      volumeMounts:
      - name: config                      # 名称和下面的保持一致
        mountPath: "/etc/demo/config"     # 定义挂载目录
        readOnly: true
      - name: username                    # 名称和下面的保持一致
        mountPath: "/etc/demo/username"   # 定义挂载目录
        readOnly: true
  volumes:
    # 将整个secret作为文件挂载
    - name: config               # 定义名称
      secret:                    # 指定来自Secret
        secretName: demo         # 和Secret名称保持一致                     
        optional: false          # 默认设置，意味着 "demo-secret" 必须已经存在
    # 将secret中某个key作为文件挂载
    - name: username
      secret:
        secretName: demo
        items:
        - key: username
          path: username.ini
EOF

# 创建
[root@node-1 ~]# kubectl apply -f secret.yaml 
secret/demo configured
pod/demo created

# 进入容器验证
[root@node-1 ~]# kubectl exec -it demo -- sh

/ # echo ${ENV}
pro

/ # cd /etc/demo/ && ls -lh
total 0      
drwxrwxrwt    3 root     root         160 Jan  9 06:26 config
drwxrwxrwt    3 root     root         100 Jan  9 06:26 username

/etc/demo # ls -lh config/
total 0      
lrwxrwxrwx    1 root     root          10 Jan  9 06:26 env -> ..data/env
lrwxrwxrwx    1 root     root          15 Jan  9 06:26 host.ini -> ..data/host.ini
lrwxrwxrwx    1 root     root          15 Jan  9 06:26 password -> ..data/password
lrwxrwxrwx    1 root     root          15 Jan  9 06:26 username -> ..data/username

/etc/demo # cat config/env | awk '{print $0}'
pro
/etc/demo # cat config/host.ini
1.1.1.1
2.2.2.2
3.3.3.3
/etc/demo # cat config/username | awk '{print $0}'
admin
/etc/demo # cat config/password | awk '{print $0}'
qaz.12345

/etc/demo # cat username/username.ini  | awk '{print $0}'
admin
```

:::

::: details （3）创建TLS类型的Secret，用于保存证书 --- 方法1：使用命令行创建TLS类型Secret

```bash
[root@node-1 ~]# kubectl create secret tls a.com --cert=a.com.pem --key=a.com-key.pem
secret/a.com created
[root@node-1 ~]# kubectl get secret a.com -o yaml
apiVersion: v1
data:
  tls.crt: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUVYakNDQXNhZ0F3SUJBZ0lSQUppODJIL0RraVByRzZPZHZEMkFiUGt3RFFZSktvWklodmNOQVFFTEJRQXcKZ1pjeEhqQWNCZ05WQkFvVEZXMXJZMlZ5ZENCa1pYWmxiRzl3YldWdWRDQkRRVEUyTURRR0ExVUVDd3d0UkVWVApTMVJQVUMweU1rczRNRlU0WEVGa2JXbHVhWE4wY21GMGIzSkFSRVZUUzFSUFVDMHlNa3M0TUZVNE1UMHdPd1lEClZRUURERFJ0YTJObGNuUWdSRVZUUzFSUFVDMHlNa3M0TUZVNFhFRmtiV2x1YVhOMGNtRjBiM0pBUkVWVFMxUlAKVUMweU1rczRNRlU0TUI0WERUSXpNREV3T0RBNU16WTBPVm9YRFRJMU1EUXdPREE1TXpZME9Wb3dZVEVuTUNVRwpBMVVFQ2hNZWJXdGpaWEowSUdSbGRtVnNiM0J0Wlc1MElHTmxjblJwWm1sallYUmxNVFl3TkFZRFZRUUxEQzFFClJWTkxWRTlRTFRJeVN6Z3dWVGhjUVdSdGFXNXBjM1J5WVhSdmNrQkVSVk5MVkU5UUxUSXlTemd3VlRnd2dnRWkKTUEwR0NTcUdTSWIzRFFFQkFRVUFBNElCRHdBd2dnRUtBb0lCQVFDNWJPUEZBc1U3NWxCMHAvY1NwRFdVN3hGcgpaZXB2am9sZEZRdHJZRHpqSkZNRjZqbmZESFVCV2V4Rmc5RkdnakNVRVIxMzd1K2s4bFRUMHo5NUV3aFExSE95ClcramtZVkhaa1NtSVVSTzJLQ1J4c1J5dFBVN3gzRERPR213SnBHWmtTRlRHVCszVENrQkFUUkhETHQ2cDl2c0QKMGNaV1R4Rzh1Rkk0cklJdFlrMnY1M1I4UWpVTmpvdmxhQ2g2dG55MmdDL01mdVk5bUFnWDNnZmhRL2VleFE2bApubU9mTVUzS1VlSmdPb2hIT2VDMG9lMForK0grTTAvblY5d3E4OWhrNXFKSWI5NHR6WmRqamhVdWRRMlJXQ2o0CnY1U2hCWXd3cmlvdGg5TGExbTA3WXE2dVJ6dXl4VTE5M3h6ZmdHR0pyaS82Ujl0VmZ0LzZJWkJuMERHckFnTUIKQUFHaldqQllNQTRHQTFVZER3RUIvd1FFQXdJRm9EQVRCZ05WSFNVRUREQUtCZ2dyQmdFRkJRY0RBVEFmQmdOVgpIU01FR0RBV2dCVHNsQy9ZTkExQ1QzQXV4UmxNR1QvSWo2eHB3VEFRQmdOVkhSRUVDVEFIZ2dWaExtTnZiVEFOCkJna3Foa2lHOXcwQkFRc0ZBQU9DQVlFQXljQzFta3FRZGZkUzRYTmpuUjdCZU4rODZwN3k5ZjhPdlh4UFZpbmcKNnBQaWFtaU10R3NaTTZJKzZmZnZ2RmUrVzdoSmI2VTE4Yjh0SnoxVENzUFpmd0c0Y0ZhK2QwQTY5NGxxYXZoNwpoZEk4QzlHOTJuTXdmcWplcmJJVzRsKzVqdkFtTHRPK2Jsc0RNN1lRRm9MUGlUdU9pYXN5SFNlSXN5a3Zvc0xLCm9pM3ZwY1VFSlVwa3pBKzdod09FL04zWStlMzI2d3dSZVBGVms3YTVUTC9HSXorQURNbXFJL0MyVjdKaVM1SHAKSnRBQkhiMFlzVURlWUFXQ21MTXpFU2k5bVpDbW4rQk9PNXZzeEU2aUVyQmI2ckkrcFhYdURXQ2J3ZUx5dmJSQwppci9XZllDSldQQkU2S0p0TFJESmNiQ2lUZDFIQ3hrZkU4dXJBSmNWUDdiMTgra05kRW40M2tZOXEwZXVzS1cvCnVHenF5a2lNR29QUDZaMmJCTDhMWExiTTk0blpTSWt5TXJwaXBqbFZnR2ZHcC9heS9zTkJpam4wTFB6eTNqM1gKNjlaSGVsZUFtaHBQbE1HRXZXQTJFQU0rVkhQa2tGdHoyWnRSZ2hJRWEwU25vZ1BuWGhxZjV4RUdWU25KNTJnZAo3OHN2ZUdqcFZ1K2F0Qk5kTFUzL3JPbDAKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=
  tls.key: LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUV2Z0lCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktnd2dnU2tBZ0VBQW9JQkFRQzViT1BGQXNVNzVsQjAKcC9jU3BEV1U3eEZyWmVwdmpvbGRGUXRyWUR6akpGTUY2am5mREhVQldleEZnOUZHZ2pDVUVSMTM3dStrOGxUVAowejk1RXdoUTFIT3lXK2prWVZIWmtTbUlVUk8yS0NSeHNSeXRQVTd4M0RET0dtd0pwR1prU0ZUR1QrM1RDa0JBClRSSERMdDZwOXZzRDBjWldUeEc4dUZJNHJJSXRZazJ2NTNSOFFqVU5qb3ZsYUNoNnRueTJnQy9NZnVZOW1BZ1gKM2dmaFEvZWV4UTZsbm1PZk1VM0tVZUpnT29oSE9lQzBvZTBaKytIK00wL25WOXdxODloazVxSkliOTR0elpkagpqaFV1ZFEyUldDajR2NVNoQll3d3Jpb3RoOUxhMW0wN1lxNnVSenV5eFUxOTN4emZnR0dKcmkvNlI5dFZmdC82CklaQm4wREdyQWdNQkFBRUNnZ0VBYy8ydHJYdkNMV294UWdnZ0FrVStUMkFOSVlXclZRVnc0QTFlQzFrMFBWSm4KclBlTUkvOEM0a21DQnlvaUsxMGRUa0kya09PaWZTZ3A4Q2ZoT0xlekoveitNc0JUdXlrMXJrZWtGMlhBVXQ1aApqYzBoQnkybXlKelkydFNrYUpPeWlXREZ4eGdReVVkTVVlemtBNWk2S05BYXpaVFg0UDJ0TnNTR2luVS9LV3VYCnhpY0kzTVV5d241WlVBVXAxc09KTksxZFF6YzdmMjY0b1UyNkV5djMwZk5tT2syQ3pYVjZkZXVMZElNMVN2SDMKakxpemsrd1VCOU00M1RDVFlNRFZmUW5GbXliNWw2eTZ2Y2NjNm5DbytROWlPZ2pjODhuaENZT1RyTCtsUFdXWQpmMDJQVTJveFdHdGNYRHZEcW9RdTBzc1J2RUMwV0VlK28wbFhiRTZtWVFLQmdRREwyNzA0eEk0RmEwNXhkbVUyCk1panpVS2ZCL1JJSnd3MUZuY3BzRVREMURuRVlpTWx2UjVQM29nMXArN1hsU2JzK2VnTUZQSnZYdGQ0UUZJZG8KbW5vT2FzUEgybU5VRGN6cXhMZFNtWS9qRVFlaG1sNlB4dmFmUE5BRHBMaENDaHY5cWFVZDJLa2Q4bitYVmRRUQpvcEVrMGNoYXZRUkdvazdjOERlQkEzZytGUUtCZ1FEbzJqRXU3aGZaOWdVVTB1SWRHS0xyQ1NMR3gwZUFpdmEyCjR3dHJjeDVCcFhiYXhxakM2c2lTOVNaYzkyVzZRWjFLaWd5aDViaFFHTWVMWjR5dXRENHp6Q0dXZTl1ejYvVjQKRTNNbjRnUjkvZm9WajFFUWRtYzN4QUdKZUczd1pscWlHQ0p2aUZuZkZ2M2VyR0JHQmVKRDVMaTRKT1VvL1F3TQozSFJTV1FwZ3Z3S0JnSDZWMFRiSjNvS0E4bkhFR2U4QVVLdGQzdjIzWHBjUE5sT1BPcDNHUXdjNFU0UHZsRjEwCkxlNXNBelpYWmNpZDh4WkZmMUNtSlFOYVhDelNBbzh5dFMzMG4rT2V1V1Q5T014aklJNjY2ajBPV3hXL0hJN2MKOWxGRTJzb1lZNDRtWnVFcGtXMHFGMEdRVGlnejFINEw1R0xmblRDekJFKzBBNUp2MjVkU0J6MU5Bb0dCQUtZZQp1OFh5WUp2RUUzMzJzUS8yK292Wm1iRGNqTnRjeUlSVFdGdFE1bjRJOE5GRnR6SlAwOFpjRlFGd0VtZ2QxWHhQCkhwSUYxRWQ0Vml2VE5SK1NRV29zc0sydU1XQ2I3eVM2STRhSmpaRGhONkJYL1lwVUhuRS9hYVZNZ0lwb1N6S24KS3pJTXdha1J1dzQ0UmZyT3ljeU1DV2grRWVyN0ZMUzhObFJsWjZ6N0FvR0JBTWt2WTU1cFRNbDBJYTZwdnRuUAorbUxjSFlPWGxjNngwR2JQdXFnNDd3cis0MGkxbWxYNVIyVmlLWEJMMTBkNC96R0tIRDhMNTRMTnFxNTdXbXJ4Ck1hejhUNHZNSDFSRjZEdytEYWRxV2JlK0JEU0FqcHE2M3E1Tko1TmhQWlV1ekR4S2JUclRiaysyT0lDTWYwTS8KV280NzNnaU9hQlNheWp6dFlmcnAxWkN6Ci0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0K
kind: Secret
metadata:
  creationTimestamp: "2023-01-09T06:42:48Z"
  name: a.com
  namespace: default
  resourceVersion: "117460"
  uid: 50d20715-fe8e-4281-b021-936727834096
type: kubernetes.io/tls
```

:::

::: details  （4）创建TLS类型的Secret，用于保存证书 --- 方法2：使用YAML文件创建TLS类型Secret

**1、先将证书进行base64编码**

```bash
[root@node-1 ~]# cat a.com.pem | base64 | tr -d "\n" | awk '{print $0}'
LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUVYakNDQXNhZ0F3SUJBZ0lSQVArekg5RzBPMWdyeEJCMXNCRVVEaUl3RFFZSktvWklodmNOQVFFTEJRQXcKZ1pjeEhqQWNCZ05WQkFvVEZXMXJZMlZ5ZENCa1pYWmxiRzl3YldWdWRDQkRRVEUyTURRR0ExVUVDd3d0UkVWVApTMVJQVUMweU1rczRNRlU0WEVGa2JXbHVhWE4wY21GMGIzSkFSRVZUUzFSUFVDMHlNa3M0TUZVNE1UMHdPd1lEClZRUURERFJ0YTJObGNuUWdSRVZUUzFSUFVDMHlNa3M0TUZVNFhFRmtiV2x1YVhOMGNtRjBiM0pBUkVWVFMxUlAKVUMweU1rczRNRlU0TUI0WERUSXlNRFl5TVRBMk5EY3lPRm9YRFRJME1Ea3lNVEEyTkRjeU9Gb3dZVEVuTUNVRwpBMVVFQ2hNZWJXdGpaWEowSUdSbGRtVnNiM0J0Wlc1MElHTmxjblJwWm1sallYUmxNVFl3TkFZRFZRUUxEQzFFClJWTkxWRTlRTFRJeVN6Z3dWVGhjUVdSdGFXNXBjM1J5WVhSdmNrQkVSVk5MVkU5UUxUSXlTemd3VlRnd2dnRWkKTUEwR0NTcUdTSWIzRFFFQkFRVUFBNElCRHdBd2dnRUtBb0lCQVFDZXhRNzBBaWkwY1BvRmswRWVxa2Jhdi9hUwpjclRETEZyT0xoNkpPYUgrNHNmZU1kZFJ0UkRXRFhJTitCNlhvaTRCalNLdE5nVFRPRjlYcmYyOUNZYWsvZG05CndUbXgxaHRQaWx6dkRxTkJXVmNwSGFicExpOERMQWF4bUs0N1FYb2JmSkl5U0FYazllemRTNmQ4Sk1xQ055U0cKSWU0cnhlVTdIM2tuUDhMSE5tTmZMNWNEc1QrdTFSYWVKblVMTzBNUzZqTG5Ga2VGY0tUQk56T3pjR1ZNNWdqcQpzVnpmLzZ6MXJScUdFdDRpNWFJZzdwRUxVVWRxdmxFRFJOOVBpampMTG5oQjlTbGJWKzZ4Q0RvRERxbEx6YXhtCmQxNnVyQ284NURyYUJlMXUzMC8xK3BQakpHOWE2S3RId2NxTmJhY1dUSjRxZnhPbmtEMEE3b1VZYXpQNUFnTUIKQUFHaldqQllNQTRHQTFVZER3RUIvd1FFQXdJRm9EQVRCZ05WSFNVRUREQUtCZ2dyQmdFRkJRY0RBVEFmQmdOVgpIU01FR0RBV2dCVHNsQy9ZTkExQ1QzQXV4UmxNR1QvSWo2eHB3VEFRQmdOVkhSRUVDVEFIZ2dWaExtTnZiVEFOCkJna3Foa2lHOXcwQkFRc0ZBQU9DQVlFQWF2aGpJTGxXSkF6aGdVMUdaKzJZK1ozeXFQdGlUc0NhNGRKWXRCL3MKdURoZjEwTGlxUEtPcEFKWmZ1ZllWM2NYNGU1eDg2NnZTQWFKbDlYbkpvL0VDNXpIc0tOclphSG10Qm9QOE9IOQoyOVJ2WWtOL1pad2tQdEx0T0FCRmNtakM3Y1kvQnJnbDE3WEJzVnFzRFVOdDI4dG9hSEJVTE9lcndtMjNrbFJSCm9naHhRN3RncVJuR1VNb1M1Sm4wR3hGQXBxbXBHN3FrNnpGak9ad0RwUDZ2N2F2Yi9oOGx3NGJtRFJaMDVTaXAKbEdGU3pldXhiU2FGNFNTUFVrUXdYVTI0RmRjODE1WnJoMnBYSE11ZDhGRUd1UVhSbDVGTGNVc3J6YkgraHpUMApKZmJ3cjQxT1RET2RVd09GOHI1dkRtKy9tM1lyTmh4WkVMSnpObjdldXowU3Uwc2gxMEJWYUhuSTV4bU41RXJECmxjN0sxeFRNM1paVkpQUHlDZDgxVnJzM1F2akdpSlN0bVFld2kxc3Z3TjI1dnI4Qlg2MytCTDNYV29rRGJoVFoKbzdCRlc0TDZ2cVJzL3dvWjUyYmVCT1N2MnRLeGlSQnE2dnVJVlREbGdTTzAzbTRPWlFRbEI1V3c4WmZ0V1dScQpWY1E2VTljYUtWSk03Q3JmSEtXZGtPOWUKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=

[root@node-1 ~]# cat a.com-key.pem | base64 | tr -d "\n" | awk '{print $0}'
LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUV2QUlCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktZd2dnU2lBZ0VBQW9JQkFRQ2V4UTcwQWlpMGNQb0YKazBFZXFrYmF2L2FTY3JURExGck9MaDZKT2FIKzRzZmVNZGRSdFJEV0RYSU4rQjZYb2k0QmpTS3ROZ1RUT0Y5WApyZjI5Q1lhay9kbTl3VG14MWh0UGlsenZEcU5CV1ZjcEhhYnBMaThETEFheG1LNDdRWG9iZkpJeVNBWGs5ZXpkClM2ZDhKTXFDTnlTR0llNHJ4ZVU3SDNrblA4TEhObU5mTDVjRHNUK3UxUmFlSm5VTE8wTVM2akxuRmtlRmNLVEIKTnpPemNHVk01Z2pxc1Z6Zi82ejFyUnFHRXQ0aTVhSWc3cEVMVVVkcXZsRURSTjlQaWpqTExuaEI5U2xiVis2eApDRG9ERHFsTHpheG1kMTZ1ckNvODVEcmFCZTF1MzAvMStwUGpKRzlhNkt0SHdjcU5iYWNXVEo0cWZ4T25rRDBBCjdvVVlhelA1QWdNQkFBRUNnZ0VBY01SZC9vbWFCNjlHcGJjVlJZYURsTk5MZW5EbVdzbWlKVmMwY1JyeUtHdEMKc2xxTUtJaUdVTUowQTkvN09wQUNSUy9OTldGc3cra0NMdkJ4akZhN3YyeGR2eDBDc1lEMUhPV1ZaR1h0Sm5raQpJeDNnY3paT1JkNTdVcUN5LzN0ZUV5L0RWdHM0OUlxSGxoWXArMDdXVnU1N2pwbUM1S3hHU0Z2dVhTWTRYZXp3CitoYzlnbkx2NldaM2g0ZEFGQjRhZTAxWUNTQk00dUFmRXNSaWlGMFJRbXYrZHBCRkVzTHBHZ2pYNDF3MTNTMzAKMmFOZlZQUEFXaFlIYk5RUFNacnB0QTlwRTUvTHYzSGlBUXVsMC84VUNkNFovckZ6R0xMTmUrV1duSUx3NEtNQgplM3o0ekVDMm9pU3UvSXpRdE5Bd0FjSkg3OUtOZUgrcGZmQ3pQd1g2RVFLQmdRRElERmRpVmZnZkxMNC83OGZ5CmNhODJrTXp0WjdFTW1LVmZub0xIdEVKc2VSMEtHWVk3YURJbUYxYmJYVmhpdTlseHFIcEJFWm5ualJuLzBCS3EKU0sydnVFOG9DdEJGaVpCamtpdWFYdDZXSi9pZkY0dzk4Z3MrVG5hbzNZK3lkODhEbDF0NVhwL2o0SVhPYnR5cApnTmtjY3M4aVpZMkNIT1hVdFNNTzFhN2cvd0tCZ1FETExTTXVERFNkZ09OZzJEZTAyVGk1b1kwMGVwNnVFanI5CndXM1hzdVBUdlhpeDVTd2ZaOG10ZytPZlZqTU0rNkRqMmRkLzZMZGVCNS9kZUhraGNFL0UyYUFWSWNkSjJxTFIKeVYySzhVUS9Xak9VNGVyZ1JMOG9iMmw4bDRBMXpEWHROZ3JPNFFsUVRyNk1KaHlscThJMDRHb01tUXJXaVB6Tgp6OHdvemUvekJ3S0JnRmtiWmpFZktnNTQxNldUSVBVVlBuNkhzVUJ1VjZiTXQ1MEg5aWtPV2lnSEtyQTgvbFduCjYrNmJwc3kvbjRjYk5aZ3krNEhRWFVXT3pHM3VPT0l3eld6Z0pDSXA3dXVLZ3c1WEphVDFiU0JsWFpFLzQvQVQKeUg1UVpQcUM5bWNBaHUyS2xleFNBZFozUkNMWHJ1S3h5Z09xQUNuS0ltWTZpUVZlU2VkcHR5UHhBb0dBTFdidgp4cGw1cEh5cDB2bGVNVzZkSzNZN2JLKytCOTRSQ3FXUDJ6U2hqcTUzYXlGd0k3QjRzK3FXRWdRY01sbUVrWVliCmp2eTlCU2tsQTBPcHBkeElKeEFPb3NwQ2szRmxFd1l4Zmh2K0NUNHA2cW8xWjFwVmNUNjhUdGc0RVUySiszRXAKSnlQSWhnYWl0QVRNUUFWS3g3QWlZcUJNZUxaeDc3Znd3bW1LcGo4Q2dZQUZXU215ckdIdG1Qa1F4SjhRMEViRQpuWnl4aE56bFprc2ZTc2NtNm95OXhYeWFMWllMem0zdWdFSmVkb3cxdkJYdFJtaXJtT0pXTXRzK0ZIeXU2cDhKCjk1OTVLcmxMQ1p4WXJLaXpLc2xaUjV3VDI3aW5xdDF1dlJsb0prOWpudUU0cXdKdDlYSndQQXpoSzRDc3g4S1YKZXVZVU53Zy9GYTA0VWFEMFpYa245dz09Ci0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0K
```

**2、创建YAML文件https.yaml**

![image-20220621155809588](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220621155809588.png)

注意事项：上面base64编码的证书内容之间不能有换行符，否则会有这种报错

```bash
[root@node-1 ~]# kubectl apply -f secret.yaml
error: error parsing https.yml: error converting YAML to JSON: yaml: line 9: could not find expected ':'
```

**3、创建**

```bash
[root@node-1 ~]# kubectl apply -f secret.yaml
secret/a.com created
```

:::

<br />

## 应用数据存储

文档：[https://kubernetes.io/zh-cn/docs/concepts/storage/volumes/](https://kubernetes.io/zh-cn/docs/concepts/storage/volumes/)

<br />

### 数据卷

| 分类 | 卷         | 说明                                                         |
| ---- | ---------- | ------------------------------------------------------------ |
| 本地 | `emptyDir` | 临时存储卷，与Pod生命周期绑定在一起，如果Pod被删除，那么临时卷也将被删除 |
|      | `hostPath` | 将Pod所在节点上的文件系统挂载到容器中                        |
| 网络 | `nfs`      | NFS支持                                                      |
|      | `cephfs`   | Ceph支持                                                     |

::: details  （1）emptyDir：须保证在同一个Pod中才能共享数据

```bash
# 生成yaml文件
[root@node-1 ~]# cat > deployment.yaml <<- EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo
  namespace: default
spec:
  replicas: 3
  selector:
    matchLabels:
      app: demo
  template:
    metadata:
      labels:           
        app: demo
    spec:
      containers:
      - name: demo1
        image: busybox:latest
        command: ['sh', '-c', 'echo The app is running! && sleep 3600']
        volumeMounts:
          - name: data
            mountPath: /data1      # 一般情况下两个容器会设置相同的挂载点，这里仅为学习演示，所以设置不同的挂载点
      - name: demo2
        image: busybox:latest
        command: ['sh', '-c', 'echo The app is running! && sleep 3600']
        volumeMounts:
          - name: data
            mountPath: /data2      # 一般情况下两个容器会设置相同的挂载点，这里仅为学习演示，所以设置不同的挂载点
      volumes:
        - name: data         
          emptyDir: {}             # 临时存储卷，与Pod生命周期绑定在一起，如果Pod被删除了卷也会被删除
EOF

# 创建
[root@node-1 ~]# kubectl apply -f deployment.yaml 
deployment.apps/demo created

# 查看Pod
[root@node-1 ~]# kubectl get pods -o wide
NAME                    READY   STATUS        RESTARTS   AGE   IP              NODE     NOMINATED NODE   READINESS GATES
demo-868999645d-96swt   2/2     Running       0          24s   10.100.84.172   node-1   <none>           <none>
demo-868999645d-jrrnv   2/2     Running       0          24s   10.100.247.17   node-2   <none>           <none>
demo-868999645d-qhdbs   2/2     Running       0          24s   10.100.217.82   node-4   <none>           <none>

# 同一个Pod内测试共享存储
[root@node-1 ~]# kubectl exec -it demo-868999645d-96swt -c demo1 -- sh 
/ # seq 10 > /data1/1.txt
[root@node-1 ~]# kubectl exec -it demo-868999645d-96swt -c demo2 -- sh 
/ # cat /data2/1.txt
1
2
3
4
5
6
7
8
9
10

# 不同Pod数据是不共享的
[root@node-1 ~]# kubectl exec -it demo-868999645d-jrrnv -c demo2 -- sh
/ # ls /data2/
```

:::

::: details  （2）hostPath：需保证在同一个Node节点上的Pod才能共享数据

```bash
# 生成yaml文件
[root@node-1 ~]# cat > deployment.yaml <<- EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo
  namespace: default
spec:
  replicas: 6
  selector:
    matchLabels:
      app: demo
  template:
    metadata:
      labels:           
        app: demo
    spec:
      containers:
      - name: demo1
        image: busybox:latest
        command: ['sh', '-c', 'echo The app is running! && sleep 3600']
        volumeMounts:
          - name: data
            mountPath: /data1      # 一般情况下两个容器会设置相同的挂载点，这里仅为学习演示，所以设置不同的挂载点
      - name: demo2
        image: busybox:latest
        command: ['sh', '-c', 'echo The app is running! && sleep 3600']
        volumeMounts:
          - name: data
            mountPath: /data2     # 一般情况下两个容器会设置相同的挂载点，这里仅为学习演示，所以设置不同的挂载点
      volumes:
        - name: data
          hostPath:
            path: /tmp            # 所有宿主机都有/tmp目录
            type: Directory
EOF

# 创建
[root@node-1 ~]# kubectl apply -f deployment.yaml 
deployment.apps/demo created

# 查看Pod
[root@node-1 ~]# kubectl get pods -o wide
NAME                   READY   STATUS    RESTARTS   AGE   IP              NODE     NOMINATED NODE   READINESS GATES
demo-5758846f9-b8pgf   2/2     Running   0          31s   10.100.84.173   node-1   <none>           <none>
demo-5758846f9-bvzwl   2/2     Running   0          31s   10.100.217.84   node-4   <none>           <none>
demo-5758846f9-dr9r6   2/2     Running   0          31s   10.100.217.85   node-4   <none>           <none>
demo-5758846f9-qkgr7   2/2     Running   0          31s   10.100.84.174   node-1   <none>           <none>
demo-5758846f9-rl4t9   2/2     Running   0          31s   10.100.247.18   node-2   <none>           <none>
demo-5758846f9-wrrv9   2/2     Running   0          31s   10.100.139.67   node-3   <none>           <none>

# 在Node-1节点的容器上写入数据
[root@node-1 ~]# kubectl exec -it demo-5758846f9-b8pgf -c demo1 -- sh
/ # seq 3 >/data1/node-1.txt

# 在同一个Pod不同容器中查看数据
[root@node-1 ~]# kubectl exec -it demo-5758846f9-b8pgf -c demo2 -- sh
/ # cat /data2/node-1.txt
1
2
3

# 在同一个Node节点上的不同Pod中查看数据
[root@node-1 ~]# kubectl exec -it demo-5758846f9-qkgr7 -c demo1 -- cat /data1/node-1.txt
1
2
3
[root@node-1 ~]# kubectl exec -it demo-5758846f9-qkgr7 -c demo2 -- cat /data2/node-1.txt
1
2
3

# 在不同的Node节点上看不到数据
[root@node-1 ~]# kubectl exec -it demo-5758846f9-bvzwl -c demo1 -- sh
/ # ls -l /data1/
total 0
drwx------    2 root     root             6 Jan  6 02:22 vmware-root_772-2990547578
drwx------    2 root     root             6 Jan  8 13:48 vmware-root_773-4256676260
drwx------    2 root     root             6 Jan  6 09:12 vmware-root_774-2999002104
drwx------    2 root     root             6 Jan  5 02:53 vmware-root_775-4248221734
drwx------    2 root     root             6 Jan  4 11:11 vmware-root_776-2965448177
drwx------    2 root     root             6 Jan  5 11:11 vmware-root_777-4281777711
drwx------    2 root     root             6 Jan  9 08:06 vmware-root_778-2956993651
drwx------    2 root     root             6 Jan  8 11:22 vmware-root_779-4290232237
drwx------    2 root     root             6 Jan  8 09:14 vmware-root_780-2957124724
drwx------    2 root     root             6 Jan  9 06:14 vmware-root_781-4290101162
drwx------    2 root     root             6 Jan  8 14:12 vmware-root_783-4281646632
drwx------    2 root     root             6 Jan  8 10:07 vmware-root_784-2966103535
drwx------    2 root     root             6 Jan  5 01:29 vmware-root_787-4290625459
drwx------    2 root     root             6 Jan  8 10:44 vmware-root_793-4248746047
```

:::

::: details  （3）nfs

**准备工作**

安装NFS Server及依赖：[https://jinhui.dev/container/kubernetes/deploy/binary.html#_5-nfs%E5%AD%98%E5%82%A8](https://jinhui.dev/container/kubernetes/deploy/binary.html#_5-nfs%E5%AD%98%E5%82%A8)

**测试NFS**

```bash
# 生成yaml文件
[root@node-1 ~]# cat > deployment.yaml <<- EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo
  namespace: default
spec:
  replicas: 6
  selector:
    matchLabels:
      app: demo
  template:
    metadata:
      labels:           
        app: demo
    spec:
      containers:
      - name: demo1
        image: busybox:latest
        command: ['sh', '-c', 'echo The app is running! && sleep 3600']
        volumeMounts:
          - name: data
            mountPath: /data1      # 一般情况下两个容器会设置相同的挂载点，这里仅为学习演示，所以设置不同的挂载点
      - name: demo2
        image: busybox:latest
        command: ['sh', '-c', 'echo The app is running! && sleep 3600']
        volumeMounts:
          - name: data
            mountPath: /data2     # 一般情况下两个容器会设置相同的挂载点，这里仅为学习演示，所以设置不同的挂载点
      volumes:
        - name: data
          nfs:
            server: 192.168.48.151
            path: /data/k8s
EOF

# 创建
[root@node-1 ~]# kubectl apply -f deployment.yaml
deployment.apps/demo created

# 查看Pod
[root@node-1 ~]# kubectl get pods -o wide
NAME                    READY   STATUS    RESTARTS   AGE   IP              NODE     NOMINATED NODE   READINESS GATES
demo-688f46966b-4mcr9   2/2     Running   0          19s   10.100.139.68   node-3   <none>           <none>
demo-688f46966b-fwbr4   2/2     Running   0          19s   10.100.247.20   node-2   <none>           <none>
demo-688f46966b-kf8gn   2/2     Running   0          19s   10.100.247.19   node-2   <none>           <none>
demo-688f46966b-mlw4l   2/2     Running   0          19s   10.100.217.89   node-4   <none>           <none>
demo-688f46966b-p7bqq   2/2     Running   0          19s   10.100.217.87   node-4   <none>           <none>
demo-688f46966b-znlp8   2/2     Running   0          19s   10.100.84.175   node-1   <none>           <none>

# 在node-1节点上的容器写入数据
[root@node-1 ~]# kubectl exec -it demo-688f46966b-znlp8 -c demo1 -- sh
/ # seq 3 > /data1/node-1.txt

# 在node-2上的容器上查看数据
[root@node-1 ~]# kubectl exec -it demo-688f46966b-fwbr4 -c demo1 -- sh
/ # cat /data1/node-1.txt
1
2
3

# 查看node上的挂载情况
[root@node-1 ~]# mount | grep -i nfs
sunrpc on /var/lib/nfs/rpc_pipefs type rpc_pipefs (rw,relatime)
nfsd on /proc/fs/nfsd type nfsd (rw,relatime)
192.168.48.151:/data/k8s on /var/lib/kubelet/pods/39ee3145-e2e5-41a0-9e79-800bd78cdcc5/volumes/kubernetes.io~nfs/data type nfs4 (rw,relatime,vers=4.1,rsize=524288,wsize=524288,namlen=255,hard,proto=tcp,timeo=600,retrans=2,sec=sys,clientaddr=192.168.48.151,local_lock=none,addr=192.168.48.151)

[root@node-2 ~]# mount | grep -i nfs
192.168.48.151:/data/k8s on /var/lib/kubelet/pods/66398b7f-89e2-46a2-bf7e-3513b1174dca/volumes/kubernetes.io~nfs/data type nfs4 (rw,relatime,vers=4.1,rsize=524288,wsize=524288,namlen=255,hard,proto=tcp,timeo=600,retrans=2,sec=sys,clientaddr=192.168.48.152,local_lock=none,addr=192.168.48.151)
192.168.48.151:/data/k8s on /var/lib/kubelet/pods/4d8694ed-57d8-4b17-8e4e-48b8e5f5c720/volumes/kubernetes.io~nfs/data type nfs4 (rw,relatime,vers=4.1,rsize=524288,wsize=524288,namlen=255,hard,proto=tcp,timeo=600,retrans=2,sec=sys,clientaddr=192.168.48.152,local_lock=none,addr=192.168.48.151)
```

:::

<br />

### 持久卷

文档：[https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/](https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/)

注意：PV不区分命名空间，PVC区分命名空间

<br />

**基础示例**

::: details （1）创建PV（PersistentVolume）

```bash
# 生成yaml文件
[root@node-1 ~]# cat > pv.yaml <<- EOF
apiVersion: v1
kind: PersistentVolume
metadata:
  name: demo
  namespace: default
spec:
  capacity:                                 # pv容量
    storage: 100Gi                          #
  volumeMode: Filesystem                    # 卷模式
  accessModes:                              # 访问模式
  - ReadWriteMany                           #
  persistentVolumeReclaimPolicy: Delete     # 回收策略
  storageClassName: local-storage           # 存储类
  local:                                    # 持久卷类型,local代表节点上挂载的本地存储设备
    path: /data/k8s/pv                      # 每个Node节点上必须存在此目录
  nodeAffinity:                             # 使用local卷时，你需要设置 PersistentVolume 对象的 nodeAffinity 字段
    required:
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/os
          operator: In
          values:
          - linux
EOF

# 创建
[root@node-1 ~]# kubectl apply -f pv.yaml
persistentvolume/demo created
 
# 查看PV,状态为Available
[root@node-1 ~]# kubectl get pv -o wide
NAME   CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM   STORAGECLASS    REASON   AGE   VOLUMEMODE
demo   100Gi      RWX            Delete           Available           local-storage            9s    Filesystem
```

:::

::: details  （2）创建PVC（PersistentVolumeClaims）

```bash
# 生成yaml文件
[root@node-1 ~]# cat > pvc.yaml <<- EOF
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: demo
  namespace: default
spec:
  volumeMode: Filesystem                    # 卷模式
  accessModes:                              # 访问模式
  - ReadWriteMany
  storageClassName: local-storage           # 存储类
  resources:                                # 资源
    requests:                               #   需求
      storage: 5Gi
EOF

# 创建
[root@node-1 ~]# kubectl apply -f pvc.yaml 
persistentvolumeclaim/demo created

# 查看PVC，状态为Bound
[root@node-1 ~]# kubectl get pvc -o wide
NAME   STATUS   VOLUME   CAPACITY   ACCESS MODES   STORAGECLASS    AGE   VOLUMEMODE
demo   Bound    demo     100Gi      RWX            local-storage   11s   Filesystem

# 查看PV，状态已经变为Bound
[root@node-1 ~]# kubectl get pv -o wide
NAME   CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM          STORAGECLASS    REASON   AGE    VOLUMEMODE
demo   100Gi      RWX            Delete           Bound    default/demo   local-storage            107s   Filesystem
```

:::

::: details  （3）使用PVC（PersistentVolumeClaims）

```bash
# 生成yaml文件
[root@node-1 ~]# cat > deployment.yaml <<- EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo
  namespace: default
spec:
  replicas: 3
  selector:
    matchLabels:
      app: demo
  template:
    metadata:
      labels:           
        app: demo
    spec:
      containers:
      - name: demo
        image: busybox:latest
        command: ['sh', '-c', 'echo The app is running! && sleep 3600']
        volumeMounts:
          - name: data
            mountPath: /data
      volumes:
        - name: data
          persistentVolumeClaim:   # 固定字段
            claimName: demo        # 指定PVC名称
EOF

# 创建
[root@node-1 ~]# kubectl apply -f deployment.yaml 
deployment.apps/demo created

# 查看Deployment
[root@node-1 ~]# kubectl get deploy -o wide
NAME   READY   UP-TO-DATE   AVAILABLE   AGE   CONTAINERS   IMAGES           SELECTOR
demo   3/3     3            3           7s    demo         busybox:latest   app=demo

# 查看Pod
[root@node-1 ~]# kubectl get pods -o wide
NAME                   READY   STATUS    RESTARTS   AGE   IP              NODE     NOMINATED NODE   READINESS GATES
demo-b46946dd8-c5wkh   1/1     Running   0          20s   10.100.217.90   node-4   <none>           <none>
demo-b46946dd8-px2tn   1/1     Running   0          20s   10.100.247.21   node-2   <none>           <none>
demo-b46946dd8-w4qxp   1/1     Running   0          20s   10.100.84.176   node-1   <none>           <none>

# --------------------------------------------------------------------------------------------------------------------

# 因为我们的PV使用的local卷，所以每个节点上的Pod数据并不共享，下面来实验一下

# (1) node-1节点生成数据
[root@node-1 ~]# seq 3 > /data/k8s/pv/node-1.txt

# (2) node-1节点上的Pod可以正常拿到数据
[root@node-1 ~]# kubectl exec -it demo-b46946dd8-w4qxp -- cat /data/node-1.txt
1
2
3

# (3) node-2节点上的Pod则看不到数据
[root@node-1 ~]# kubectl exec -it demo-b46946dd8-px2tn -- cat /data/node-1.txt
cat: can't open '/data/node-1.txt': No such file or directory
command terminated with exit code 1
```

:::

<br />

**PV 类型**

::: details  PV 类型简介

文档：[https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/#types-of-persistent-volumes](https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/#types-of-persistent-volumes)

| 分类 | 卷         | 说明                                                         |
| ---- | ---------- | ------------------------------------------------------------ |
| 本地 | `local`    | 节点上挂载的本地存储设备（各节点之间数据不共享）             |
|      | `hostPath` | 仅供单节点测试使用；不适用于多节点集群； 请尝试使用 `local` 卷作为替代 |
| 网络 | `nfs`      | NFS支持                                                      |
|      | `cephfs`   | Ceph支持                                                     |

:::

::: details  NFS 示例

```bash
# 生成yaml文件
[root@node-1 ~]# cat > deployment.yaml <<- EOF
apiVersion: v1
kind: PersistentVolume
metadata:
  name: demo
spec:
  capacity:                                 # pv容量
    storage: 100Gi                          #
  volumeMode: Filesystem                    # 卷模式
  accessModes:                              # 访问模式
  - ReadWriteMany                           #
  persistentVolumeReclaimPolicy: Delete     # 回收策略
  storageClassName: local-storage           # 存储类
  nfs:
    server: 192.168.48.151                  # NFS地址
    path: /data/k8s                         # NFS中共享的路径
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: demo
  namespace: default
spec:
  volumeMode: Filesystem                    # 卷模式
  accessModes:                              # 访问模式
  - ReadWriteMany
  storageClassName: local-storage           # 存储类
  resources:                                # 资源
    requests:                               #   需求
      storage: 5Gi
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo
  namespace: default
spec:
  replicas: 3
  selector:
    matchLabels:
      app: demo
  template:
    metadata:
      labels:           
        app: demo
    spec:
      containers:
      - name: demo
        image: busybox:latest
        command: ['sh', '-c', 'echo The app is running! && sleep 3600']
        volumeMounts:
          - name: data
            mountPath: /data
      volumes:
        - name: data
          persistentVolumeClaim:   # 固定字段
            claimName: demo        # 指定PVC名称
EOF

# 创建
[root@node-1 ~]# kubectl apply -f deployment.yaml 
persistentvolume/demo created
persistentvolumeclaim/demo created
deployment.apps/demo created

# 查看Pod
[root@node-1 ~]# kubectl get pods -o wide
NAME                   READY   STATUS    RESTARTS   AGE   IP              NODE     NOMINATED NODE   READINESS GATES
demo-b46946dd8-4vtkv   1/1     Running   0          8s    10.100.247.23   node-2   <none>           <none>
demo-b46946dd8-87jxs   1/1     Running   0          8s    10.100.217.95   node-4   <none>           <none>
demo-b46946dd8-qs896   1/1     Running   0          8s    10.100.84.178   node-1   <none>           <none>

# 在NFS中创建一些数据
[root@node-1 ~]# seq 3 > /data/k8s/all_node_share.txt

# 在所有的节点的Pod中查看数据
[root@node-1 ~]# kubectl exec -it demo-b46946dd8-4vtkv -- cat /data/all_node_share.txt
1
2
3
[root@node-1 ~]# kubectl exec -it demo-b46946dd8-87jxs -- cat /data/all_node_share.txt
1
2
3
[root@node-1 ~]# kubectl exec -it demo-b46946dd8-qs896 -- cat /data/all_node_share.txt
1
2
3
```

:::

<br />

**PV和PVC的存储类**

::: details  存储类简介

文档：[https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/#class](https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/#class)

* 存储类其实就是一个标识，是一个字符串，`Kubernetes` 本身并不清楚各种类代表的什么
* 存储类会影响`PVC`绑定`PV`

:::

::: details  PVC指定一个不存在的存储类，看看会发生什么

```bash
# 生成yaml文件
[root@node-1 ~]# cat > deployment.yaml <<- EOF
apiVersion: v1
kind: PersistentVolume
metadata:
  name: demo
spec:
  capacity:                                 # pv容量
    storage: 100Gi                          #
  volumeMode: Filesystem                    # 卷模式
  accessModes:                              # 访问模式
  - ReadWriteMany                           #
  persistentVolumeReclaimPolicy: Delete     # 回收策略
  storageClassName: nfs-1                   # 存储类
  nfs:
    server: 192.168.48.151                  # NFS地址
    path: /data/k8s                         # NFS中共享的路径
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: demo
  namespace: default
spec:
  volumeMode: Filesystem                    # 卷模式
  accessModes:                              # 访问模式
  - ReadWriteMany
  storageClassName: nfs-2                   # 存储类,与PV存储类不一致
  resources:                                # 资源
    requests:                               #   需求
      storage: 5Gi
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo
  namespace: default
spec:
  replicas: 3
  selector:
    matchLabels:
      app: demo
  template:
    metadata:
      labels:           
        app: demo
    spec:
      containers:
      - name: demo
        image: busybox:latest
        command: ['sh', '-c', 'echo The app is running! && sleep 3600']
        volumeMounts:
          - name: data
            mountPath: /data
      volumes:
        - name: data
          persistentVolumeClaim:   # 固定字段
            claimName: demo        # 指定PVC名称
EOF

# 创建
[root@node-1 ~]# kubectl apply -f deployment.yaml 
persistentvolume/demo created
persistentvolumeclaim/demo created
deployment.apps/demo created

# 查看Pod
[root@node-1 ~]# kubectl get pods -o wide
NAME                   READY   STATUS    RESTARTS   AGE   IP       NODE     NOMINATED NODE   READINESS GATES
demo-b46946dd8-5xghz   0/1     Pending   0          11s   <none>   <none>   <none>           <none>
demo-b46946dd8-n8gd6   0/1     Pending   0          11s   <none>   <none>   <none>           <none>
demo-b46946dd8-wp7ns   0/1     Pending   0          11s   <none>   <none>   <none>           <none>

# 查看Pod详情
[root@node-1 ~]# kubectl describe pod demo-b46946dd8-5xghz
...
Events:
  Type     Reason            Age   From               Message
  ----     ------            ----  ----               -------
  Warning  FailedScheduling  31s   default-scheduler  0/4 nodes are available: 4 pod has unbound immediate PersistentVolumeClaims. preemption: 0/4 nodes are available: 4 Preemption is not helpful for scheduling.
```

:::

<br />

**PV 回收策略**

::: details  PV 回收策略简介

文档：[https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/#reclaiming](https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/#reclaiming)

| 回收策略        | 说明                                                         |
| --------------- | ------------------------------------------------------------ |
| 保留（Retain）  | 用户可以手动回收资源（默认回收策略）                         |
| 删除（Delete）  | 自动删除PV对象                                               |
| 回收（Recycle） | 回收策略 `Recycle` 已被废弃。取而代之的建议方案是使用动态供应 |

:::

::: details  保留（Retain）策略说明：保留PV，并将PV状态设置为Released

```bash
# 生成yaml文件
[root@node-1 ~]# cat > deployment.yaml <<- EOF
apiVersion: v1
kind: PersistentVolume
metadata:
  name: demo
spec:
  capacity:                                 # pv容量
    storage: 100Gi                          #
  volumeMode: Filesystem                    # 卷模式
  accessModes:                              # 访问模式
  - ReadWriteMany                           #
  persistentVolumeReclaimPolicy: Retain     # 回收策略
  storageClassName: local-storage           # 存储类
  local:                                    # 持久卷类型,local代表节点上挂载的本地存储设备
    path: /data/k8s
  nodeAffinity:                             # 使用local卷时，你需要设置 PersistentVolume 对象的 nodeAffinity 字段
    required:
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/os
          operator: In
          values:
          - linux
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: demo
  namespace: default
spec:
  volumeMode: Filesystem                    # 卷模式
  accessModes:                              # 访问模式
  - ReadWriteMany
  storageClassName: local-storage           # 存储类
  resources:                                # 资源
    requests:                               #   需求
      storage: 5Gi
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo
  namespace: default
spec:
  replicas: 3
  selector:
    matchLabels:
      app: demo
  template:
    metadata:
      labels:           
        app: demo
    spec:
      containers:
      - name: demo
        image: busybox:latest
        command: ['sh', '-c', 'echo The app is running! && sleep 3600']
        volumeMounts:
          - name: data
            mountPath: /data
      volumes:
        - name: data
          persistentVolumeClaim:   # 固定字段
            claimName: demo        # 指定PVC名称
EOF

# 创建
[root@node-1 ~]# kubectl apply -f deployment.yaml 
persistentvolume/demo created
persistentvolumeclaim/demo created
deployment.apps/demo created

# 查看Pod
[root@node-1 ~]# kubectl get pods -o wide
NAME                   READY   STATUS    RESTARTS   AGE   IP              NODE     NOMINATED NODE   READINESS GATES
demo-b46946dd8-j5msj   1/1     Running   0          12s   10.100.84.179   node-1   <none>           <none>
demo-b46946dd8-q9bfd   1/1     Running   0          12s   10.100.217.96   node-4   <none>           <none>
demo-b46946dd8-r29tv   1/1     Running   0          12s   10.100.247.24   node-2   <none>           <none>

# 删除Deployment
[root@node-1 ~]# kubectl delete deploy demo
deployment.apps "demo" deleted

# 查看PVC和PV
[root@node-1 ~]# kubectl get pvc
NAME   STATUS   VOLUME   CAPACITY   ACCESS MODES   STORAGECLASS    AGE
demo   Bound    demo     100Gi      RWX            local-storage   42s

[root@node-1 ~]# kubectl get pv
NAME   CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM          STORAGECLASS    REASON   AGE
demo   100Gi      RWX            Retain           Bound    default/demo   local-storage            44s

# 删除PVC
[root@node-1 ~]# kubectl delete pvc demo
persistentvolumeclaim "demo" deleted

# 查看PV，状态变为Released(已释放)，由于卷上仍然存在这前一申领人的数据，该卷还不能用于其他申领
[root@node-1 ~]# kubectl get pv
NAME   CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS     CLAIM          STORAGECLASS    REASON   AGE
demo   100Gi      RWX            Retain           Released   default/demo   local-storage            100s
```

:::

::: details  删除（Delete）策略说明：NFS和local等都不支持Delete策略，故本次测试的并不充分

```bash
# 生成yaml文件
[root@node-1 ~]# cat > deployment.yaml <<- EOF
apiVersion: v1
kind: PersistentVolume
metadata:
  name: demo
spec:
  capacity:                                 # pv容量
    storage: 100Gi                          #
  volumeMode: Filesystem                    # 卷模式
  accessModes:                              # 访问模式
  - ReadWriteMany                           #
  persistentVolumeReclaimPolicy: Delete     # 回收策略
  storageClassName: local-storage           # 存储类
  nfs:
    server: 192.168.48.151                  # NFS地址
    path: /data/k8s                         # NFS中共享的路径
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: demo
  namespace: default
spec:
  volumeMode: Filesystem                    # 卷模式
  accessModes:                              # 访问模式
  - ReadWriteMany
  storageClassName: local-storage           # 存储类
  resources:                                # 资源
    requests:                               #   需求
      storage: 5Gi
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo
  namespace: default
spec:
  replicas: 3
  selector:
    matchLabels:
      app: demo
  template:
    metadata:
      labels:           
        app: demo
    spec:
      containers:
      - name: demo
        image: busybox:latest
        command: ['sh', '-c', 'echo The app is running! && sleep 3600']
        volumeMounts:
          - name: data
            mountPath: /data
      volumes:
        - name: data
          persistentVolumeClaim:   # 固定字段
            claimName: demo        # 指定PVC名称
EOF

# 创建
[root@node-1 ~]# kubectl apply -f deployment.yaml 
persistentvolume/demo created
persistentvolumeclaim/demo created
deployment.apps/demo created


# 查看PV
[root@node-1 ~]# kubectl get pv
NAME   CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM          STORAGECLASS    REASON   AGE
demo   100Gi      RWX            Delete           Bound    default/demo   local-storage            22s

# 查看PVC
[root@node-1 ~]# kubectl get pvc
NAME   STATUS   VOLUME   CAPACITY   ACCESS MODES   STORAGECLASS    AGE
demo   Bound    demo     100Gi      RWX            local-storage   31s

# 删除Deployment
[root@node-1 ~]# kubectl delete deploy demo
deployment.apps "demo" deleted

# 再次查看PV，没有发生变化
[root@node-1 ~]# kubectl get pv
NAME   CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM          STORAGECLASS    REASON   AGE
demo   100Gi      RWX            Delete           Bound    default/demo   local-storage            50s

# 再次查看PVC，没有发生变化
[root@node-1 ~]# kubectl get pvc
NAME   STATUS   VOLUME   CAPACITY   ACCESS MODES   STORAGECLASS    AGE
demo   Bound    demo     100Gi      RWX            local-storage   61s

# 删除PVC
[root@node-1 ~]# kubectl delete pvc demo
persistentvolumeclaim "demo" deleted

# 查看PV，状态变为Failed
[root@node-1 ~]# kubectl get pv
NAME   CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM          STORAGECLASS    REASON   AGE
demo   100Gi      RWX            Delete           Failed   default/demo   local-storage            84s

# 看一下Failed的详情，没有找到插件来删除PV，也就是说NFS类型的持久卷并不支持Delete回收策略
# 经测试，本地存储local也不支持Delete回收策略
[root@node-1 ~]# kubectl describe pv demo
...
Events:
  Type     Reason              Age   From                         Message
  ----     ------              ----  ----                         -------
  Warning  VolumeFailedDelete  24s   persistentvolume-controller  error getting deleter volume plugin for volume "demo": no deletable volume plugin matched
```

:::

<br />

**PV动态供给**

::: details PV动态供给简介

文档：

* [https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/#dynamic](https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/#dynamic)
* [https://kubernetes.io/zh-cn/docs/concepts/storage/storage-classes/#nfs](https://kubernetes.io/zh-cn/docs/concepts/storage/storage-classes/#nfs)

安装依赖：

* [https://jinhui.dev/container/kubernetes/deploy/binary.html#_5-nfs%E5%AD%98%E5%82%A8](https://jinhui.dev/container/kubernetes/deploy/binary.html#_5-nfs%E5%AD%98%E5%82%A8)

:::

::: details  使用NFS动态供给：我们不再需要自定义PV，而是由NFS驱动动态创建PV

```bash
# 生成yaml文件
[root@node-1 ~]# cat > deployment.yaml <<- EOF
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: demo
  namespace: kube-public                    # 故意将命名空间设置为和NFS外部驱动不一样，看是否会有限制
spec:
  volumeMode: Filesystem                    # 卷模式
  accessModes:                              # 访问模式
  - ReadWriteMany
  storageClassName: nfs-client              # 存储类
  resources:                                # 资源
    requests:                               #   需求
      storage: 5Gi
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo
  namespace: kube-public
spec:
  replicas: 3
  selector:
    matchLabels:
      app: demo
  template:
    metadata:
      labels:           
        app: demo
    spec:
      containers:
      - name: demo
        image: busybox:latest
        command: ['sh', '-c', 'echo The app is running! && sleep 3600']
        volumeMounts:
          - name: data
            mountPath: /data
      volumes:
        - name: data
          persistentVolumeClaim:   # 固定字段
            claimName: demo        # 指定PVC名称
EOF

# 创建
[root@node-1 ~]# kubectl apply -f deployment.yaml 
persistentvolumeclaim/demo created
deployment.apps/demo created

# 查看Pod
[root@node-1 ~]# kubectl get pods -n kube-public -o wide
NAME                   READY   STATUS    RESTARTS   AGE   IP              NODE     NOMINATED NODE   READINESS GATES
demo-b46946dd8-6sxtf   1/1     Running   0          13s   10.100.217.92   node-4   <none>           <none>
demo-b46946dd8-gvjh5   1/1     Running   0          13s   10.100.84.181   node-1   <none>           <none>
demo-b46946dd8-tsbgv   1/1     Running   0          13s   10.100.247.26   node-2   <none>           <none>

# 查看PV（不区分命名空间）
[root@node-1 ~]# kubectl get pv
NAME                                       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM              STORAGECLASS   REASON   AGE
pvc-8633c79b-4d69-4d93-8c2b-55e0d075400f   5Gi        RWX            Delete           Bound    kube-public/demo   nfs-client              25s

# 查看PVC（PVC需要区分命名空间）
[root@node-1 ~]# kubectl get pvc -n kube-public
NAME   STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
demo   Bound    pvc-8633c79b-4d69-4d93-8c2b-55e0d075400f   5Gi        RWX            nfs-client     63s

# 查看NFS目录内容
[root@node-1 ~]# ls -l /data/k8s/
total 0
drwxrwxrwx 2 root root 6 Jan  9 19:35 kube-public-demo-pvc-8633c79b-4d69-4d93-8c2b-55e0d075400f

# 写入点内容
[root@node-1 ~]# seq 10 > /data/k8s/kube-public-demo-pvc-8633c79b-4d69-4d93-8c2b-55e0d075400f/test.txt

# 删除Deployment和PVC
[root@node-1 ~]# kubectl delete -f deployment.yaml 
persistentvolumeclaim "demo" deleted
deployment.apps "demo" deleted

# 检查PV已经自动删除
[root@node-1 ~]# kubectl get pv
No resources found

# 检查NFS中的内容是否删除
# 因为我们NFS驱动的archiveOnDelete为false，所以这里会真的把数据删除，而不是将目录改名(以archived-开头)
[root@node-1 ~]# ls /data/k8s/
```

:::

<br />

**PV和PVC的访问模式**

::: details 访问模式简介

文档：[https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/#access-modes](https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/#access-modes)

| 访问模式         | 简写 | 说明                                                         |
| ---------------- | ---- | ------------------------------------------------------------ |
| ReadWriteMany    | RWX  | 卷可以被多个节点以读写方式挂载                               |
| ReadOnlyMany     | ROX  | 卷可以被多个节点以只读方式挂载                               |
| ReadWriteOnce    | RWO  | 卷可以被一个节点以读写方式挂载。 ReadWriteOnce 访问模式也允许运行在同一节点上的多个 Pod 访问卷。 |
| ReadWriteOncePod | RWOP | 卷可以被单个 Pod 以读写方式挂载。 如果你想确保整个集群中只有一个 Pod 可以读取或写入该 PVC， 请使用ReadWriteOncePod 访问模式。这只支持 CSI 卷以及需要 Kubernetes 1.22 以上版本。 |

注意事项：

* 访问模式会影响`PVC`绑定`PV`

:::

::: details ReadWriteOnce示例（测试有问题）

```bash
# 生成yaml文件
[root@node-1 ~]# cat > deployment.yaml <<- EOF
apiVersion: v1
kind: PersistentVolume
metadata:
  name: demo
spec:
  capacity:                                 # pv容量
    storage: 100Gi                          #
  volumeMode: Filesystem                    # 卷模式
  accessModes:                              # 访问模式
  - ReadWriteOnce                           #
  persistentVolumeReclaimPolicy: Retain     # 回收策略
  storageClassName: local-storage           # 存储类
  nfs:
    server: 192.168.48.151                  # NFS地址
    path: /data/k8s                         # NFS中共享的路径
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: demo
  namespace: default
spec:
  volumeMode: Filesystem                    # 卷模式
  accessModes:                              # 访问模式
  - ReadWriteOnce
  storageClassName: local-storage           # 存储类
  resources:                                # 资源
    requests:                               #   需求
      storage: 5Gi
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo
  namespace: default
spec:
  replicas: 3
  selector:
    matchLabels:
      app: demo
  template:
    metadata:
      labels:           
        app: demo
    spec:
      containers:
      - name: demo
        image: busybox:latest
        command: ['sh', '-c', 'echo The app is running! && sleep 3600']
        volumeMounts:
          - name: data
            mountPath: /data
      volumes:
        - name: data
          persistentVolumeClaim:   # 固定字段
            claimName: demo        # 指定PVC名称
EOF

# 创建
[root@node-1 ~]# kubectl apply -f deployment.yaml 
persistentvolume/demo created
persistentvolumeclaim/demo created
deployment.apps/demo created

# 查看Pod
[root@node-1 ~]# kubectl get pods -o wide
NAME                   READY   STATUS    RESTARTS   AGE     IP               NODE     NOMINATED NODE   READINESS GATES
demo-b46946dd8-2j2xm   1/1     Running   0          3m33s   10.100.84.185    node-1   <none>           <none>
demo-b46946dd8-8wgdc   1/1     Running   0          3m33s   10.100.247.30    node-2   <none>           <none>
demo-b46946dd8-lnczz   1/1     Running   0          3m33s   10.100.217.101   node-4   <none>           <none>

# 可以写入
[root@node-1 ~]# kubectl exec -it demo-b46946dd8-2j2xm -- sh
/ # seq 10 > /data/1.txt

# 可以写入
[root@node-1 ~]# kubectl exec -it demo-b46946dd8-8wgdc -- sh
/ # echo 11 >> /data/1.txt
```

:::

<br />

## 应用发布策略

<br />

### 策略说明

| 发布策略                    | 说明                                                         | 备注                                          |
| --------------------------- | ------------------------------------------------------------ | --------------------------------------------- |
| RollingUpdate - 滚动更新    | 先启动新版本的Pod，待其启动完成后，再杀死旧Pod               | 默认的更新策略；更新过程中新老Pod都会收到请求 |
| Recreate - 重新创建         | 现有的全部Pods被杀死成功后，才会创建新版本的 Pod             | 特殊情况下有可能会用到此方式                  |
| 蓝绿部署（也称为红/黑部署） | 同时启动2个版本的Pod，通过Service匹配指定的版本              | 更新过程中只有某一个版本能收到请求            |
| 金丝雀部署                  | 先更新少量的Pod，待验证后（有可能时间比较久），<br />再全量更新Pod | 新老版本会持久收到请求                        |

<br />

### 滚动更新

::: details  配置说明

文档：[https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/deployment/#strategy](https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/deployment/#strategy)

| 字段                                                         | 可选字段 | 默认值          | 说明                                                         |
| ------------------------------------------------------------ | -------- | --------------- | ------------------------------------------------------------ |
| 更新策略类型<br />（`.spec.strategy.type`）                  | 是       | `RollingUpdate` |                                                              |
| 最大不可用<br />（`.spec.strategy.rollingUpdate.maxUnavailable`） | 是       | `25%`           | 可以是绝对数字（例如，5），<br />也可以是所需 Pods 的百分比（例如，10%）；<br />百分比值会转换成绝对数并去除小数部分 |
| 最大峰值<br />（`.spec.strategy.rollingUpdate.maxSurge`）    | 是       | `25%`           | 可以是绝对数字（例如，5），<br />也可以是所需 Pods 的百分比（例如，10%）；<br />百分比值会通过向上取整转换为绝对数 |
| 最短就绪时间<br />（`.spec.minReadySeconds`）                | 是       | 0               | 指定新创建的 Pod 在没有任意容器崩溃情况下的最小就绪时间， 只有超出这个时间 Pod 才被视为可用 |

:::

::: details  滚动更新示例

```bash
# 创建yaml文件
[root@node-1 ~]# cat > deployment.yaml <<- EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo
  namespace: default
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  strategy:
    rollingUpdate:
      maxSurge: 2    # 设置每次更新2个Pod
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: demo
        image: busybox:1.33
        command: ['sh', '-c', 'sleep 60 && touch /tmp/healthy && echo The app is running! && sleep 3600']
        readinessProbe:
          exec:
            command:
              - cat
              - /tmp/healthy
          initialDelaySeconds: 1
          periodSeconds: 1
EOF

# 创建Deployment
[root@node-1 ~]# kubectl apply -f deployment.yaml
deployment.apps/demo created

# 查看
[root@node-1 ~]# kubectl rollout status deploy/demo
Waiting for deployment "demo" rollout to finish: 0 of 3 updated replicas are available...
Waiting for deployment "demo" rollout to finish: 1 of 3 updated replicas are available...
Waiting for deployment "demo" rollout to finish: 2 of 3 updated replicas are available...
deployment "demo" successfully rolled out

[root@node-1 ~]# kubectl get pods
NAME                    READY   STATUS    RESTARTS   AGE
demo-697c86c7d5-4m4df   1/1     Running   0          83s
demo-697c86c7d5-54wj7   1/1     Running   0          83s
demo-697c86c7d5-9l5g5   1/1     Running   0          83s

# 修改busybox镜像版本为1.34，然后更新deployment
[root@node-1 ~]# kubectl apply -f deployment.yaml
deployment.apps/demo configured

# 查看Pod,新创建了2个，等待就绪检查成功后会删除2个旧的Pod
[root@node-1 ~]# kubectl get pods
NAME                    READY   STATUS    RESTARTS   AGE
demo-697c86c7d5-4m4df   1/1     Running   0          2m4s
demo-697c86c7d5-54wj7   1/1     Running   0          2m4s
demo-697c86c7d5-9l5g5   1/1     Running   0          2m4s
demo-b6466464-bxcj5     0/1     Running   0          11s
demo-b6466464-sqm79     0/1     Running   0          11s

# 第3个Pod已经开始更新了
[root@node-1 ~]# kubectl get pods
NAME                    READY   STATUS        RESTARTS   AGE
demo-697c86c7d5-4m4df   1/1     Running       0          3m4s
demo-697c86c7d5-54wj7   1/1     Terminating   0          3m4s
demo-697c86c7d5-9l5g5   1/1     Terminating   0          3m4s
demo-b6466464-bxcj5     1/1     Running       0          71s
demo-b6466464-pdt4f     0/1     Running       0          6s
demo-b6466464-sqm79     1/1     Running       0          71s

[root@node-1 ~]# kubectl rollout status deploy/demo
Waiting for deployment "demo" rollout to finish: 2 out of 3 new replicas have been updated...
Waiting for deployment "demo" rollout to finish: 2 out of 3 new replicas have been updated...
Waiting for deployment "demo" rollout to finish: 2 out of 3 new replicas have been updated...
Waiting for deployment "demo" rollout to finish: 2 out of 3 new replicas have been updated...
Waiting for deployment "demo" rollout to finish: 2 old replicas are pending termination...
Waiting for deployment "demo" rollout to finish: 2 old replicas are pending termination...
Waiting for deployment "demo" rollout to finish: 1 old replicas are pending termination...
Waiting for deployment "demo" rollout to finish: 1 old replicas are pending termination...
deployment "demo" successfully rolled out

[root@node-1 ~]# kubectl get pods
NAME                    READY   STATUS        RESTARTS   AGE
demo-b6466464-bxcj5     1/1     Running       0          2m36s
demo-b6466464-pdt4f     1/1     Running       0          91s
demo-b6466464-sqm79     1/1     Running       0          2m36s
```

:::

<br />

### 蓝绿部署

::: details  蓝绿部署示例

```bash
# 创建Deployment blue版本
[root@node-1 ~]# cat > deployment-blue.yaml <<- EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo-blue
  namespace: default
spec:
  replicas: 3  
  selector:
    matchLabels:
      app: web
      strategy: blue
  template:
    metadata:
      labels:
        app: web
        strategy: blue
    spec:
      containers:
      - name: demo
        image: nginx:1.22
EOF

# 创建Deployment green版本
cp deployment-blue.yaml deployment-green.yaml
sed -ri 's/name: demo-blue/name: demo-green/'    deployment-green.yaml    # 修改Deployment名字
sed -ri 's/strategy: blue/strategy: green/'      deployment-green.yaml    # 修改蓝绿版本标识符，这里使用标签来做
sed -ri 's/image: nginx:1.22/image: nginx:1.23/' deployment-green.yaml    # 新版本镜像升级

# 创建Service
[root@node-1 ~]# cat > service.yaml <<- EOF
apiVersion: v1
kind: Service
metadata:
  name: demo
spec:
  selector:
    app: web
    strategy: blue
  type: NodePort
  ports:
    - name: http
      protocol: TCP
      port: 80
      targetPort: 80
      nodePort: 31000
EOF

# 部署blue和greeen版本
[root@node-1 ~]# kubectl apply -f deployment-blue.yaml
deployment.apps/demo-blue created

[root@node-1 ~]# kubectl apply -f deployment-green.yaml 
deployment.apps/demo-green created

[root@node-1 ~]# kubectl apply -f service.yaml 
service/demo created

# 查看Pod
[root@node-1 ~]# kubectl get pods 
NAME                          READY   STATUS    RESTARTS   AGE
demo-blue-89db777c8-hnlrt     1/1     Running   0          2m37s
demo-blue-89db777c8-qz62x     1/1     Running   0          6m
demo-blue-89db777c8-tkm5v     1/1     Running   0          6m
demo-green-57dff5b896-cx6qb   1/1     Running   0          5m23s
demo-green-57dff5b896-dh7zv   1/1     Running   0          5m23s
demo-green-57dff5b896-xqdf4   1/1     Running   0          5m23s

# 查看Service
[root@node-1 ~]# kubectl get svc
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
demo         NodePort    10.200.229.23   <none>        80:31000/TCP   2m42s
kubernetes   ClusterIP   10.200.0.1      <none>        443/TCP        5d1h

# 访问测试(blue版本)
[root@node-1 ~]# curl http://192.168.48.151:31000 -I
HTTP/1.1 200 OK
Server: nginx/1.22.1
Date: Mon, 09 Jan 2023 12:45:24 GMT
Content-Type: text/html
Content-Length: 615
Last-Modified: Wed, 19 Oct 2022 08:02:20 GMT
Connection: keep-alive
ETag: "634faf0c-267"
Accept-Ranges: bytes

# 版本切换(人为修改service)
[root@node-1 ~]# sed -ri 's/strategy: blue/strategy: green/' service.yaml
[root@node-1 ~]# kubectl apply -f service.yaml 
service/demo configured

# 再次访问
[root@node-1 ~]# curl http://192.168.48.151:31000 -I
HTTP/1.1 200 OK
Server: nginx/1.23.3
Date: Mon, 09 Jan 2023 12:46:14 GMT
Content-Type: text/html
Content-Length: 615
Last-Modified: Tue, 13 Dec 2022 15:53:53 GMT
Connection: keep-alive
ETag: "6398a011-267"
Accept-Ranges: bytes
```

:::

<br />

### 金丝雀部署

金丝雀部署在蓝绿部署的基础上，只需要把service中的`spec.selector.strategy`字段去掉即可（在本例子中是此字段，实际情况应该会不一样）

滚动更新就是一个自动化更新的金丝雀发布

<br />

## 弹性伸缩

Github：[https://github.com/kubernetes/autoscaler](https://github.com/kubernetes/autoscaler)

<br />

### Node弹性伸缩

阿里云：[https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler/cloudprovider/alicloud](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler/cloudprovider/alicloud)

腾讯云：[https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler/cloudprovider/tencentcloud](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler/cloudprovider/tencentcloud)

<br />

### HPA - Pod横向伸缩（个数调整）

文档：[https://kubernetes.io/zh-cn/docs/tasks/run-application/horizontal-pod-autoscale/](https://kubernetes.io/zh-cn/docs/tasks/run-application/horizontal-pod-autoscale/)

::: details  创建一个简单的Web应用

```bash
# 创建YAML文件
[root@node-1 ~]# cat > deployment.yaml <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo
  namespace: default
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
        image: nginx:latest
        resources: 
           # HPA会将这里的值作为总量与当前Pod使用量进行计算得到百分比，来判断是否需要扩容或缩容
           requests:
             memory: "100Mi"
             cpu: "100m"
---
apiVersion: v1
kind: Service
metadata:
  name: demo
spec:
  ports:
  - port: 80
    protocol: TCP
    targetPort: 80
  selector:
    app: web
EOF

# 部署
[root@node-1 ~]# kubectl apply -f deployment.yaml 
deployment.apps/demo created
service/demo created

# 查看Pod
[root@node-1 ~]# kubectl get pods
NAME                    READY   STATUS    RESTARTS   AGE
demo-79f76cc597-4txm9   1/1     Running   0          117s
demo-79f76cc597-gd886   1/1     Running   0          117s
demo-79f76cc597-h442l   1/1     Running   0          117s

# 查看Service
[root@node-1 ~]# kubectl get svc demo
NAME   TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE
demo   ClusterIP   10.200.140.52   <none>        80/TCP    2m6s

# 访问测试
[root@node-1 ~]# curl 10.200.140.52 -I
HTTP/1.1 200 OK
Server: nginx/1.23.3
Date: Tue, 10 Jan 2023 05:43:19 GMT
Content-Type: text/html
Content-Length: 615
Last-Modified: Tue, 13 Dec 2022 15:53:53 GMT
Connection: keep-alive
ETag: "6398a011-267"
Accept-Ranges: bytes

# 看一下Pod的资源使用率
[root@node-1 ~]# kubectl top pod
NAME                    CPU(cores)   MEMORY(bytes)   
demo-79f76cc597-4txm9   0m           1Mi             
demo-79f76cc597-gd886   0m           1Mi             
demo-79f76cc597-h442l   1m           2Mi

# 看一下Deployment
[root@node-1 ~]# kubectl describe deployment demo
Name:                   demo
Namespace:              default
CreationTimestamp:      Tue, 10 Jan 2023 13:41:00 +0800
Labels:                 <none>
Annotations:            deployment.kubernetes.io/revision: 1
Selector:               app=web
Replicas:               3 desired | 3 updated | 3 total | 3 available | 0 unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        0
RollingUpdateStrategy:  25% max unavailable, 25% max surge
Pod Template:
  Labels:  app=web
  Containers:
   web:
    Image:      nginx:latest
    Port:       <none>
    Host Port:  <none>
    Requests:
      cpu:        100m
      memory:     100Mi
    Environment:  <none>
    Mounts:       <none>
  Volumes:        <none>
Conditions:
  Type           Status  Reason
  ----           ------  ------
  Available      True    MinimumReplicasAvailable
  Progressing    True    NewReplicaSetAvailable
OldReplicaSets:  <none>
NewReplicaSet:   demo-79f76cc597 (3/3 replicas created)
Events:
  Type    Reason             Age    From                   Message
  ----    ------             ----   ----                   -------
  Normal  ScalingReplicaSet  2m38s  deployment-controller  Scaled up replica set demo-79f76cc597 to 3
```

:::

::: details  （1）基于CPU的弹性伸缩：HPA v2版本

```bash
# 创建YAML文件
[root@node-1 ~]# cat > hpa-v2-cpu.yaml <<EOF
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:  
  name: demo
  namespace: default
spec:
  minReplicas: 1    # 允许缩容到的最小副本数
  maxReplicas: 5    # 允许扩容到的最大副本数
  metrics:
  - resource:
      name: cpu
      target:
        averageUtilization: 60  # 当整体的资源利用率超过60%的时候，会进行扩容,否则会进行缩容
        type: Utilization
    type: Resource
  scaleTargetRef:               # 目标资源, 表示当前要伸缩对象是谁
    apiVersion: apps/v1
    kind: Deployment
    name: demo
EOF

# 部署
[root@node-1 ~]# kubectl apply -f hpa-v2-cpu.yaml
horizontalpodautoscaler.autoscaling/demo-hpa created

# 查看HPA
[root@node-1 ~]# kubectl get hpa
NAME   REFERENCE         TARGETS   MINPODS   MAXPODS   REPLICAS   AGE
demo   Deployment/demo   0%/60%    1         5         3          17s

# 部署完成后等待5.6分钟，我们可以先测试HPA的缩容，看看会不会缩容到1个Pod
[root@node-1 ~]# kubectl get pods
NAME                    READY   STATUS    RESTARTS   AGE
demo-79f76cc597-4txm9   1/1     Running   0          22m  # 已经缩容到1个Pod了

# 看一下HPA事件
[root@node-1 ~]# kubectl describe hpa demo
...
Events:
  Type    Reason             Age    From                       Message
  ----    ------             ----   ----                       -------
  Normal  SuccessfulRescale  9m15s  horizontal-pod-autoscaler  New size: 1; reason: All metrics below target  # 缩容到1个Pod
  
# 接下来测试一下扩容
[root@node-1 ~]# yum -y install httpd-tools
[root@node-1 ~]# ab -n 100000 -c 100 http://10.200.140.52/

# CPU已经使用到了 262% 了
[root@node-1 ~]# kubectl get hpa
NAME   REFERENCE         TARGETS    MINPODS   MAXPODS   REPLICAS   AGE
demo   Deployment/demo   262%/60%   1         5         1          22m

# 扩容到了5个
[root@node-1 ~]# kubectl get pods
NAME                    READY   STATUS    RESTARTS   AGE
demo-79f76cc597-4txm9   1/1     Running   0          31m
demo-79f76cc597-4vvh8   1/1     Running   0          17s
demo-79f76cc597-b8zkr   1/1     Running   0          32s
demo-79f76cc597-bkgdt   1/1     Running   0          32s
demo-79f76cc597-gj8sn   1/1     Running   0          32s

# 看一下HPA事件,先扩容到了4个，随后又扩容到5个
[root@node-1 ~]# kubectl describe hpa demo
Events:
  Type    Reason             Age   From                       Message
  ----    ------             ----  ----                       -------
  Normal  SuccessfulRescale  17m   horizontal-pod-autoscaler  New size: 1; reason: All metrics below target
  Normal  SuccessfulRescale  52s   horizontal-pod-autoscaler  New size: 4; reason: cpu resource utilization (percentage of request) above target
  Normal  SuccessfulRescale  36s   horizontal-pod-autoscaler  New size: 5; reason:
  
# 看一下资源使用率
[root@node-1 ~]# kubectl top pod
NAME                    CPU(cores)   MEMORY(bytes)   
demo-79f76cc597-4txm9   0m           2Mi             
demo-79f76cc597-4vvh8   0m           2Mi             
demo-79f76cc597-b8zkr   0m           13Mi            
demo-79f76cc597-bkgdt   0m           2Mi             
demo-79f76cc597-gj8sn   0m           2Mi
```

:::

::: details  （2）基于CPU的弹性伸缩：HPA v1版本

```bash
# 创建YAML文件
[root@node-1 ~]# cat > hpa-v1-cpu.yaml <<EOF
apiVersion: autoscaling/v1
kind: HorizontalPodAutoscaler
metadata:
  name: demo
spec:
  minReplicas: 1     
  maxReplicas: 5     
  scaleTargetRef:    # 目标资源, 表示当前要伸缩对象是谁
    apiVersion: apps/v1
    kind: Deployment
    name: demo
  targetCPUUtilizationPercentage: 60  # 当整体的资源利用率超过60%的时候，会进行扩容,否则会进行缩容
EOF
```

:::

::: details  （3）基于CPU的弹性伸缩：使用kubectl autoscale命令创建HPA

```bash
[root@node-1 ~]# kubectl autoscale deployment demo --name demo --cpu-percent=60 --min=1 --max=5
```

:::

<br />

### VPA - Pod纵向伸缩（配置调整）

Github：[https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler)

::: details  （1）基础测试

```bash
# 创建YAML文件
[root@node-1 ~]# cat > deployment.yaml <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo
spec:
  selector:
    matchLabels:
      app: demo
  replicas: 2
  template:
    metadata:
      labels:
        app: demo
    spec:
      containers:
        - name: demo
          image: ubuntu:22.04
          resources:
            requests:
              cpu: 100m
              memory: 50Mi
            # 设置limits是requests的1.8倍
            limits:
              cpu: 180m
              memory: 90Mi
          command: ["/bin/sh"]
          args:
            - "-c"
            - "while true; do timeout 0.5s yes >/dev/null; sleep 0.5s; done"
---
apiVersion: "autoscaling.k8s.io/v1"
kind: VerticalPodAutoscaler
metadata:
  name: demo
spec:
  updatePolicy:
    # VPA运行模式
    updateMode: Auto
  targetRef:
    apiVersion: "apps/v1"
    kind: Deployment
    name: demo
  resourcePolicy:
    containerPolicies:
      - containerName: '*'
		# 允许的最低配置
        minAllowed:
          cpu: 100m
          memory: 50Mi
		# 允许的最高配置
        maxAllowed:
          cpu: 300m
          memory: 200Mi
        controlledResources: ["cpu", "memory"]
EOF

# 部署
[root@node-1 ~]# kubectl apply -f deployment.yaml
deployment.apps/demo created
verticalpodautoscaler.autoscaling.k8s.io/demo created

# 等待几分钟

# 查看一下Pod配置
# (1) requests和resources的数值都变了
# (2) 其中主要是requests的值，范围在minAllowed - maxAllowed之间
# (3) limits的值则是根据【Pod原来的limits/requests的比例】动态调整，在本例子中是1.8倍的调整
[root@node-1 ~]# kubectl get pod demo-75b4c9c96d-p84pb -o yaml | grep 'resources:' -A 6
    resources:
      limits:
        cpu: 540m
        memory: 360Mi
      requests:
        cpu: 300m
        memory: 200Mi
```

:::

<br />

## 访问控制

文档：[https://kubernetes.io/zh-cn/docs/reference/access-authn-authz/](https://kubernetes.io/zh-cn/docs/reference/access-authn-authz/)

<br />

### 配置用户

**用户分类**

在Kubernetes中，用户分为两类：

* 服务账号（ServiceAccount）：Kubernetes内部所使用的用户，比如：Pod调用Kubernetes API
* 普通用户（Normal Users）：Kubernetes外部所使用的用户，比如kubectl访问ApiServer

下面来对比一下两种用户

| 类目         | 普通用户                     | 服务账号                                                     |
| ------------ | ---------------------------- | ------------------------------------------------------------ |
| 针对对象     | 人                           | Pod                                                          |
| 生效范围     | 集群内全局生效（集群内唯一） | 某个Namespace下<br />（不同Namespace下相同的Service Account会被认为是不同的账号/资源） |
| 主要认证方法 | Basic认证、X509证书认证      | Service Account token                                        |
| 举例         | kubectl                      | Pod                                                          |

<br />

**服务账号**

::: details  （1）默认的ServiceAccount账号：default

```bash
# (1) 获取当前命名空间下的服务账号
[root@node-1 ~]# kubectl get sa
NAME      SECRETS   AGE
default   0         5d22h

# 查看详情，这里看到它是ServiceAccount
[root@node-1 ~]# kubectl get sa default -o yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  creationTimestamp: "2023-01-04T10:52:59Z"
  name: default
  namespace: default
  resourceVersion: "339"
  uid: 01c82354-fca9-4db4-9e8c-d71693bd31e5
  
# (2) 当新建Namespace时会自动创建服务账号  
# 创建一个新的命名空间
[root@node-1 ~]# kubectl create namespace demo
namespace/demo created

# 我们发现自动创建了一个ServiceAccount
[root@node-1 ~]# kubectl -n demo get sa
NAME      SECRETS   AGE
default   0         17s

# 查看详情
[root@node-1 ~]# kubectl -n demo get sa default -o yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  creationTimestamp: "2022-10-25T01:53:05Z"
  name: default
  namespace: demo
  resourceVersion: "875344"
  uid: 61764636-badd-4732-9b47-a2bd817e12f4
  
# (3) 删除服务账号又会自动创建
[root@node-1 ~]# kubectl -n demo delete sa default && kubectl -n demo get sa
serviceaccount "default" deleted
NAME      SECRETS   AGE
default   0         1s

# (4) 进入Pod查看ServiceAccount详情
[root@node-1 ~]# kubectl run busybox --image=busybox:latest --command -- sleep 3600
pod/busybox created

[root@node-1 ~]# kubectl exec -it busybox -- sh
/ # ls -l /var/run/secrets/kubernetes.io/serviceaccount/
total 0
lrwxrwxrwx  1 root  root    13 Jan 10 09:04 ca.crt -> ..data/ca.crt       # CA公钥
lrwxrwxrwx  1 root  root    16 Jan 10 09:04 namespace -> ..data/namespace # 识这个service-account-token的作用域空间
lrwxrwxrwx  1 root  root    12 Jan 10 09:04 token -> ..data/token         # 使用API Server私钥签名的JWT，用于访问API Server时验证

~ # cat /var/run/secrets/kubernetes.io/serviceaccount/ca.crt ; echo
-----BEGIN CERTIFICATE-----
MIIC/jCCAeagAwIBAgIBADANBgkqhkiG9w0BAQsFADAVMRMwEQYDVQQDEwprdWJl
cm5ldGVzMB4XDTIzMDEwNDEwNTIzMVoXDTMzMDEwMTEwNTIzMVowFTETMBEGA1UE
AxMKa3ViZXJuZXRlczCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAO0d
BKQ5BxmZGi73w1o9bicnggsBSPvKXBbUsQFk69Ne7y2YCsX3wMWqzKoklFTOuUx2
t0Ti6Kz4qpPVWUHvFSbMm5iSBUbFO/rAngXGjHlto2JCjcvZZxSKjdl43tRkwHJY
pwO8kshSJ08SIkFnmqFfuDc+caApFBhc7zxClufZMJ9WKYF63bYyQ/5Lw0vheoEE
02PYnr5qvPgXSNafrLKoC357tyOp8xzcTf01gKX9Hc6yV1UckrqkQ+L8uiz1DpHL
c9bVACDZKoSlCpu9iHlUm365et+YvLfFSqOq9LTTyP40tSiwTqRWKfsvxVVfBQ0m
Vs76RYF1yoxgOlKnUnUCAwEAAaNZMFcwDgYDVR0PAQH/BAQDAgKkMA8GA1UdEwEB
/wQFMAMBAf8wHQYDVR0OBBYEFKk+wr2HLiZ1SzBG+n+Rl5SIFQgpMBUGA1UdEQQO
MAyCCmt1YmVybmV0ZXMwDQYJKoZIhvcNAQELBQADggEBABHjo0DBjvaDm/IHnS32
QCfw8omB9eul+wBTRPAm+Xo77K2dcVwn0/SOd7S3mPSAYltdBwlF2EqJ8VkQ8z70
Nao3wG5W2wY9Uic+vcJwf0Dj97qMQ8FeCGpSvH1fhOE/vP4Jy0hYpy77WbEu30QT
WgB/ASF8UZP9OekBov+VQ5yAwnFBuvZe6qFBO1HpV33EfuU8XgTLiaVPm4Olqy4g
5Ed0Zo/3H9dvxktbPJoX6jD8S1r8hEjg/F2OhIC2HB2HjJNT365ll2qLGZ55NVcZ
RNOOc0JFUDvOk9YDODOoC7b/qSEw3hBxISfYAQTIE929ZE9ir5xZsAHXgW7KnPgo
2sc=
-----END CERTIFICATE-----

~ # cat /var/run/secrets/kubernetes.io/serviceaccount/namespace ; echo
default

~ # cat /var/run/secrets/kubernetes.io/serviceaccount/token ; echo
eyJhbGciOiJSUzI1NiIsImtpZCI6InhISDZQY0dxQkFKcVNLRmxkNGxUWDU0RXlkNU1FMXN1S1pJTTk4eXRJZFUifQ.eyJhdWQiOlsiaHR0cHM6Ly9rdWJlcm5ldGVzLmRlZmF1bHQuc3ZjLmNsdXN0ZXIubG9jYWwiXSwiZXhwIjoxNzA0ODc3NDU5LCJpYXQiOjE2NzMzNDE0NTksImlzcyI6Imh0dHBzOi8va3ViZXJuZXRlcy5kZWZhdWx0LnN2Yy5jbHVzdGVyLmxvY2FsIiwia3ViZXJuZXRlcy5pbyI6eyJuYW1lc3BhY2UiOiJkZWZhdWx0IiwicG9kIjp7Im5hbWUiOiJidXN5Ym94IiwidWlkIjoiOWM0NDgwYTMtOWU5Mi00ZWE1LTg3MTgtZWNmYTI2YzE5ZDRmIn0sInNlcnZpY2VhY2NvdW50Ijp7Im5hbWUiOiJkZWZhdWx0IiwidWlkIjoiMDFjODIzNTQtZmNhOS00ZGI0LTllOGMtZDcxNjkzYmQzMWU1In0sIndhcm5hZnRlciI6MTY3MzM0NTA2Nn0sIm5iZiI6MTY3MzM0MTQ1OSwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50OmRlZmF1bHQ6ZGVmYXVsdCJ9.RstrSlDyF10uJiwna6V5UL5Cemsl6zVrK5xLcoN9oSTiF7jm6IlWPCyos7G1u_Uww5Ngp00h7-XFxUOXv_SWsETDM1W7C4UTiP2PA8sv_nmBJ86lqC8ft9DtZ_WXYFD-ukJj3SuC98vQiESCz71YpQskm2yBjl6uiIfzUh2FMb5AuD1tRyaNYg4Ictv0nM62_VcTsL9ZJBoQqVUHAHRUngSRPQT_psA-4ycTgXf99mWD1ZNROWgpZAOJ9J2QScz4TNJndeM-OCOLM_M2rsH2ctro9dFPQjLwJ_N2laau6qLRnMQTmER9Oqzl84Ntc7GzXDenJttmjE0gSubFvfMQ-g
```

:::

::: details  （2）创建自定义ServiceAccount账号

```bash
# 创建yaml文件
[root@node-1 ~]# cat > serviceaccount.yaml <<- EOF
apiVersion: v1
kind: ServiceAccount
metadata:
  name: demo
  namespace: default
---
apiVersion: v1
kind: Secret
type: kubernetes.io/service-account-token
metadata:
  name: demo
  annotations:
    kubernetes.io/service-account.name: demo
---
apiVersion: v1
kind: Pod
metadata:
  name: demo
  namespace: default
spec:
  serviceAccountName: demo
  containers:
  - name: busybox
    image: busybox:latest
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
EOF

# 部署
[root@node-1 ~]# kubectl apply -f serviceaccount.yaml 
serviceaccount/demo created
secret/demo created
pod/demo created

# 查看Pod所使用的serviceAccountName
[root@node-1 ~]# kubectl get pod demo -o yaml | grep -i serviceAccountName:
  serviceAccountName: demo
```

:::

<br />

**普通用户**

::: details  （1）kubectl所使用的用户

```bash
# 查看默认的kubectl配置，此输出的内容等同于~/.kube/config，不同之处在于对一些私密的数据进行了隐藏显示
[root@node-1 ~]# kubectl config view
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: DATA+OMITTED
    server: https://api.k8s.local:6443
  name: kubernetes
contexts:
- context:
    cluster: kubernetes
    user: kubernetes-admin
  name: kubernetes-admin@kubernetes
current-context: kubernetes-admin@kubernetes
kind: Config
preferences: {}
users:
- name: kubernetes-admin
  user:
    client-certificate-data: REDACTED
    client-key-data: REDACTED

# 说明
# clusters		    集群列表,在这里我们只有一个集群
# users			    用户列表,在这里我们只有一个用户 kubernetes-admin
# contexts		    上下文列表，由用户列表中的某特定用户名称和集群列表中的某特定集群名称组合而成。
# current-context	kubelet当前使用的上下文名称，即上下文列表中的某个特定项

# 总结
# current-context作为入口,我们可以知道kubectl是 <使用哪个用户> 连接到 <哪个kubernetes集群>
```

:::

::: details  （2）创建用户

```bash
# 定义变量
[root@node-1 ~]# UserName=kubernetes-jack  # 仿照默认的kubernetes-admin用户创建一个新用户
[root@node-1 ~]# UserGroup=cluster-reader  # 用户组,可以自定义,在后面可以我们对单独的用户授权,也可以直接对一个组进行授权
[root@node-1 ~]# ClusterName=kubernetes    # 集群名称,需要根据现有的集群名称来填写,可以从~/.kube/config中获取

# 创建证书私钥文件
[root@node-1 ~]# openssl genrsa -out ${UserName}.key 2048
[root@node-1 ~]# ls -lh
-rw-r--r-- 1 root root 1.7K Jan 10 19:58 kubernetes-jack.key  # 证书私钥文件

# 创建证书请求文件
#   CN代表用户
#   O代表用户组
[root@node-1 ~]# openssl req -new \
    -key ${UserName}.key \
    -out ${UserName}.csr \
    -subj "/CN=${UserName}/O=${UserGroup}"
    
[root@node-1 ~]# ls -lh
total 8.0K
-rw-r--r-- 1 root root  928 Jan 10 19:59 kubernetes-jack.csr  # 证书请求文件
-rw-r--r-- 1 root root 1.7K Jan 10 19:58 kubernetes-jack.key

# 生成证书
#   注意CA文件位置是否正确
#   有效期3650天,10年
[root@node-1 ~]# openssl x509 -req \
    -in ${UserName}.csr \
    -CA /etc/kubernetes/pki/ca.crt \
    -CAkey /etc/kubernetes/pki/ca.key \
    -CAcreateserial \
    -out ${UserName}.crt \
    -days 3650

[root@node-1 ~]# ls -lh
total 12K
-rw-r--r-- 1 root root 1013 Jan 10 20:00 kubernetes-jack.crt  # 证书公钥文件
-rw-r--r-- 1 root root  928 Jan 10 19:59 kubernetes-jack.csr
-rw-r--r-- 1 root root 1.7K Jan 10 19:58 kubernetes-jack.key

# 配置用户
# --embed-certs 用于将证书文件内容写入到配置文件,否则只会将证书的路径写入到配置文件中
[root@node-1 ~]# kubectl config set-credentials ${UserName} \
    --client-certificate=${UserName}.crt \
    --client-key=${UserName}.key \
    --embed-certs=true

# 查看用户
[root@node-1 ~]# kubectl config view | yq .users
- name: kubernetes-admin
  user:
    client-certificate-data: REDACTED
    client-key-data: REDACTED
- name: kubernetes-jack
  user:
    client-certificate-data: REDACTED
    client-key-data: REDACTED

# 配置Context
[root@node-1 ~]# kubectl config set-context ${UserName}@kubernetes \
    --cluster=${ClusterName} \
    --user=${UserName}

# 查看Context
[root@node-1 ~]# kubectl config view | yq .contexts
- context:
    cluster: kubernetes
    user: kubernetes-admin
  name: kubernetes-admin@kubernetes
- context:
    cluster: kubernetes
    namespace: kube-system
    user: demo
  name: kubernetes-jack@kubernetes

# 测试报错了，因为我们还没有给用户赋予任何的权限
[root@node-1 ~]# kubectl get pods --context=${UserName}@${ClusterName}
Error from server (Forbidden): pods is forbidden: User "kubernetes-jack" cannot list resource "pods" in API group "" in the namespace "default"
```

:::

::: details  （3）删除用户

```bash
# 先查看一下配置
[root@node-1 ~]# kubectl config view
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: DATA+OMITTED
    server: https://api.k8s.local:6443
  name: kubernetes
contexts:
- context:
    cluster: kubernetes
    user: kubernetes-admin
  name: kubernetes-admin@kubernetes
- context:
    cluster: kubernetes
    user: kubernetes-jack
  name: kubernetes-jack@kubernetes
current-context: kubernetes-admin@kubernetes
kind: Config
preferences: {}
users:
- name: kubernetes-admin
  user:
    client-certificate-data: REDACTED
    client-key-data: REDACTED
- name: kubernetes-jack
  user:
    client-certificate: /root/kubernetes-jack.crt
    client-key: /root/kubernetes-jack.key

# 删除User
[root@node-1 ~]# kubectl config delete-user kubernetes-jack
deleted user kubernetes-jack from /root/.kube/config

# 删除Context
[root@node-1 ~]# kubectl config delete-context kubernetes-jack@kubernetes
deleted context kubernetes-jack@kubernetes from /root/.kube/config

# 查看配置
[root@node-1 ~]# kubectl config view
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: DATA+OMITTED
    server: https://api.k8s.local:6443
  name: kubernetes
contexts:
- context:
    cluster: kubernetes
    user: kubernetes-admin
  name: kubernetes-admin@kubernetes
current-context: kubernetes-admin@kubernetes
kind: Config
preferences: {}
users:
- name: kubernetes-admin
  user:
    client-certificate-data: REDACTED
    client-key-data: REDACTED
```

:::

<br />

### 配置角色

**角色分类**

* 角色分为两类：`Role` 和 `ClusterRole `

* `Role`只在某个命名空间下生效，`ClusterRole`在所有命名空间都生效

<br />

::: details  （1）创建角色

```bash
# 创建角色
[root@node-1 ~]# kubectl create clusterrole cluster-reader \
    --resource=pods,deployments,configmaps,cronjobs \
    --verb=get,list,watch \
    -o yaml

apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  creationTimestamp: "2023-01-12T11:40:36Z"
  name: cluster-reader
  resourceVersion: "31071"
  uid: 245ad3b7-9bf3-4f5b-8eac-832f725bba40
rules:
- apiGroups:
  - ""          # pods、configmaps等属于核心组，组名为空
  resources:
  - pods
  - configmaps
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - apps          # deployments 属于 apps 资源组
  resources:
  - deployments
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - batch         # cronjobs 属于 batch 资源组
  resources:
  - cronjobs
  verbs:
  - get
  - list
  - watch

# rules说明
#   apiGroups  API资源组 kubectl api-resources -o wide 第三列(APIVERSION)就是组,但是不需要包含里面的版本号,比如v1
#                       如果为空则代表核心组,即 APIVERSION=v1
#                       使用命令行方式创建的话不需要我们显式指定apiGroups
#   resources  资源对象  kubectl api-resources -o wide 第一列(NAME)就是所有的resources
#   verbs      权限列表  kubectl api-resources -o wide 最后一列(VERBS)可以找到所有的权限列表

# apiGroups和resources对照关系验证
[root@node-1 ~]# kubectl api-resources | grep -Ei 'NAME\b|pods|deployments|configmaps|cronjobs'
NAME                              SHORTNAMES   APIVERSION                             NAMESPACED   KIND
configmaps                        cm           v1                                     true         ConfigMap
pods                              po           v1                                     true         Pod
deployments                       deploy       apps/v1                                true         Deployment
cronjobs                          cj           batch/v1                               true         CronJob
```

:::

::: details  （2）用户和角色绑定

```bash
[root@node-1 ~]# kubectl create clusterrolebinding cluster-reader \
    --clusterrole=cluster-reader \
    --user=kubernetes-jack \
    -o yaml

apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  creationTimestamp: "2023-01-12T11:45:20Z"
  name: cluster-reader
  resourceVersion: "31558"
  uid: 77566c03-2cd4-433b-b736-d954caa2daf2
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-reader
subjects:
- apiGroup: rbac.authorization.k8s.io
  kind: User
  name: kubernetes-jack
  
# 此时再进行测试就不报错了
[root@node-1 ~]# kubectl get pods --context=kubernetes-jack@kubernetes

# 如果我们要删除一个Pod，会报错没有权限
[root@node-1 ~]# kubectl run busybox --image=busybox:latest --command -- sleep 3600

[root@node-1 ~]# kubectl delete pod busybox --context=kubernetes-jack@kubernetes 
Error from server (Forbidden): pods "busybox" is forbidden: User "kubernetes-jack" cannot delete resource "pods" in API group "" in the namespace "default"

[root@node-1 ~]# kubectl delete pod busybox 
pod "busybox" deleted

# 测试其他资源
[root@node-1 ~]# kubectl get configmaps --context=kubernetes-jack@kubernetes
NAME               DATA   AGE
kube-root-ca.crt   1      5h7m

[root@node-1 ~]# kubectl get secrets --context=kubernetes-jack@kubernetes
Error from server (Forbidden): secrets is forbidden: User "kubernetes-jack" cannot list resource "secrets" in API group "" in the namespace "default"

[root@node-1 ~]# kubectl get daemonsets --context=kubernetes-jack@kubernetes
Error from server (Forbidden): daemonsets.apps is forbidden: User "kubernetes-jack" cannot list resource "daemonsets" in API group "apps" in the namespace "default"
```

:::

::: details  （3）用户组和角色绑定

```bash
[root@node-1 ~]# kubectl create clusterrolebinding cluster-reader \
    --clusterrole=cluster-reader \
    --group=cluster-reader \
    -o yaml

apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  creationTimestamp: "2023-01-13T10:31:43Z"
  name: cluster-reader
  resourceVersion: "39492"
  uid: b8b40c4c-ef76-47a4-9644-4baae6d32a76
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-reader
subjects:
- apiGroup: rbac.authorization.k8s.io
  kind: Group          # 这里不再是User，而是Group
  name: cluster-reader
  
# 此时再进行测试也不会报错
[root@node-1 ~]# kubectl get pods --context=kubernetes-jack@kubernetes
```

:::

<br />

### kubectl用户的角色和权限

::: details  （1）找到用户

```bash
# 看一下配置，找到所使用的用户
[root@node-1 ~]# kubectl config view
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: DATA+OMITTED
    server: https://api.k8s.local:6443
  name: kubernetes
contexts:
- context:
    cluster: kubernetes
    user: kubernetes-admin                    # 2.找到对应的用户 kubernetes-admin
  name: kubernetes-admin@kubernetes
current-context: kubernetes-admin@kubernetes  # 1、从这里入手找到对应的context
kind: Config
preferences: {}
users:
- name: kubernetes-admin
  user:
    client-certificate-data: REDACTED
    client-key-data: REDACTED

# 也可以通过其他方式找到
[root@node-1 ~]# kubectl config get-contexts
CURRENT   NAME                          CLUSTER      AUTHINFO           NAMESPACE
*         kubernetes-admin@kubernetes   kubernetes   kubernetes-admin 
```

:::

::: details  （2）找到用户所在的组

```bash
# 找到kubernetes-admin用户的client-certificate-data数据
[root@node-1 ~]# kubectl config view --raw -o yaml | \
    yq '.users[] | select(.name=="kubernetes-admin")' | \
    yq '.user.client-certificate-data' | \
    base64 -d > kubernetes-admin.pem

[root@node-1 ~]# cat kubernetes-admin.pem 
-----BEGIN CERTIFICATE-----
MIIDITCCAgmgAwIBAgIIG2EFs8wVeLowDQYJKoZIhvcNAQELBQAwFTETMBEGA1UE
AxMKa3ViZXJuZXRlczAeFw0yMzAxMTIwNjQyMzRaFw0yNDAxMTIwNjQyMzdaMDQx
FzAVBgNVBAoTDnN5c3RlbTptYXN0ZXJzMRkwFwYDVQQDExBrdWJlcm5ldGVzLWFk
bWluMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtaxw3H0GQgNuImF7
neyXa75k19wqxbU9UmCdA/5nTi5sSO7Xspx7+JBkUV+luCFyTJVK2O4Yr324SVMO
Eo1+7X9IngctPqiF9Psv7COD24q3COpU7nDJleX26pvxmwHK7pjBtO+pNvOzAYFm
nKdgKyfMk8qqFw48dgFjhr9h2Hrm0eHN+RVD27vWYOEWOMoUb2NhiQFEo/H0c2DP
KhgjccArYHaBvo7pAAnfJP+QEwwtsQCYNKunxFCWYqL3q0T+oL9QK8gPtea/h73V
nvc2PqqtEw5f51rlfZu5dv6PaxPvpWtC82TIgfMZSeFJB24U2nrEvsGP0zaxCty/
ae6JpQIDAQABo1YwVDAOBgNVHQ8BAf8EBAMCBaAwEwYDVR0lBAwwCgYIKwYBBQUH
AwIwDAYDVR0TAQH/BAIwADAfBgNVHSMEGDAWgBQJ1jamDLrlQtFoHPj5ikxvnFKp
UTANBgkqhkiG9w0BAQsFAAOCAQEAXilqAlBbX8w2iUW7M0dmzQNayJV+eoIO4KnT
yOoQ0ocwseQHtP6Ht2whHnPt7HyGvUpjnU+JLiqWIk79Y/LflfpKZOSOGL1PVSOf
H5Gz0DIn4/wOGO8295Fzb8b0wjWpkAGbGRkZGV6/aywpEF0E7h60v11/8OKrBAmZ
qeitYqo0ozqPnGiv6XXR/oAUjPHiXaqvWdEy3Ks6XOa7mod1blCeh9vOD57tp0Q4
dsciUixKB8VObcu3fF2e2zJdmyI8+GBdl0ShVZIJsXlSOqk5F4UXTaUJ3PtdInZB
S38so+s1M5Qy3Jv5MaOvBCGG88VnVYLt3P34nVpbMOiBrlP6KQ==
-----END CERTIFICATE-----

# 使用cfssl工具解密
[root@node-1 ~]# cfssl certinfo --cert kubernetes-admin.pem
{
  "subject": {
    "common_name": "kubernetes-admin",
    "organization": "system:masters",         # 这里就是kubernetes-admin用户所在的组
    "names": [
      "system:masters",
      "kubernetes-admin"
    ]
  },
  "issuer": {
    "common_name": "kubernetes",
    "names": [
      "kubernetes"
    ]
  },
  "serial_number": "1972864381546231994",
  "not_before": "2023-01-12T06:42:34Z",
  "not_after": "2024-01-12T06:42:37Z",
  "sigalg": "SHA256WithRSA",
  "authority_key_id": "09:D6:36:A6:0C:BA:E5:42:D1:68:1C:F8:F9:8A:4C:6F:9C:52:A9:51",
  "subject_key_id": "",
  "pem": "-----BEGIN CERTIFICATE-----\nMIIDITCCAgmgAwIBAgIIG2EFs8wVeLowDQYJKoZIhvcNAQELBQAwFTETMBEGA1UE\nAxMKa3ViZXJuZXRlczAeFw0yMzAxMTIwNjQyMzRaFw0yNDAxMTIwNjQyMzdaMDQx\nFzAVBgNVBAoTDnN5c3RlbTptYXN0ZXJzMRkwFwYDVQQDExBrdWJlcm5ldGVzLWFk\nbWluMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtaxw3H0GQgNuImF7\nneyXa75k19wqxbU9UmCdA/5nTi5sSO7Xspx7+JBkUV+luCFyTJVK2O4Yr324SVMO\nEo1+7X9IngctPqiF9Psv7COD24q3COpU7nDJleX26pvxmwHK7pjBtO+pNvOzAYFm\nnKdgKyfMk8qqFw48dgFjhr9h2Hrm0eHN+RVD27vWYOEWOMoUb2NhiQFEo/H0c2DP\nKhgjccArYHaBvo7pAAnfJP+QEwwtsQCYNKunxFCWYqL3q0T+oL9QK8gPtea/h73V\nnvc2PqqtEw5f51rlfZu5dv6PaxPvpWtC82TIgfMZSeFJB24U2nrEvsGP0zaxCty/\nae6JpQIDAQABo1YwVDAOBgNVHQ8BAf8EBAMCBaAwEwYDVR0lBAwwCgYIKwYBBQUH\nAwIwDAYDVR0TAQH/BAIwADAfBgNVHSMEGDAWgBQJ1jamDLrlQtFoHPj5ikxvnFKp\nUTANBgkqhkiG9w0BAQsFAAOCAQEAXilqAlBbX8w2iUW7M0dmzQNayJV+eoIO4KnT\nyOoQ0ocwseQHtP6Ht2whHnPt7HyGvUpjnU+JLiqWIk79Y/LflfpKZOSOGL1PVSOf\nH5Gz0DIn4/wOGO8295Fzb8b0wjWpkAGbGRkZGV6/aywpEF0E7h60v11/8OKrBAmZ\nqeitYqo0ozqPnGiv6XXR/oAUjPHiXaqvWdEy3Ks6XOa7mod1blCeh9vOD57tp0Q4\ndsciUixKB8VObcu3fF2e2zJdmyI8+GBdl0ShVZIJsXlSOqk5F4UXTaUJ3PtdInZB\nS38so+s1M5Qy3Jv5MaOvBCGG88VnVYLt3P34nVpbMOiBrlP6KQ==\n-----END CERTIFICATE-----\n"
}
```

:::

::: details  （3）找到用户或用户组绑定的角色

```bash
# 先使用用户搜索一次,输出为空,说明很有可能是绑定的用户组
[root@node-1 ~]# kubectl get clusterrolebinding -o wide | grep -E 'NAME|kubernetes-admin'
NAME               ROLE                           AGE   USERS     GROUPS            SERVICEACCOUNTS

# 再使用用户组搜索一次, 可以发现对应的角色为：cluster-admin
[root@node-1 ~]# kubectl get clusterrolebinding -o wide | grep -E 'NAME|system:masters'
NAME               ROLE                           AGE   USERS     GROUPS            SERVICEACCOUNTS
cluster-admin      ClusterRole/cluster-admin      28h             system:masters
```

:::

::: details  （4）找到角色的权限

```bash
[root@node-1 ~]# kubectl get clusterrole cluster-admin -o yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  annotations:
    rbac.authorization.kubernetes.io/autoupdate: "true"
  creationTimestamp: "2023-01-12T06:42:47Z"
  labels:
    kubernetes.io/bootstrapping: rbac-defaults
  name: cluster-admin
  resourceVersion: "73"
  uid: aab7e61c-3f99-4c57-84a4-b4483e901111
rules:
- apiGroups:
  - '*'
  resources:
  - '*'
  verbs:
  - '*'
- nonResourceURLs:
  - '*'
  verbs:
  - '*'

# 可以发现对所有的资源拥有所有的权限
```

:::

<br />

### 默认的serviceaccount权限

::: details  （1）启动一个容器，找到token

```bash
# 创建一个容器(注意不要在default命名空间下,这是为了和default的serviceaccount区分开)
[root@node-1 ~]# kubectl -n kube-system run busybox --image=busybox:latest --command -- sleep 3600
pod/busybox created

# 将token文件拷贝出来，方便后面利用宿主机的工具和时区来分析
[root@node-1 ~]# kubectl -n kube-system exec -it busybox -- ls -lha /var/run/secrets/kubernetes.io/serviceaccount
total 0      
drwxrwxrwt    3 root     root         140 Jan 14 01:03 .
drwxr-xr-x    3 root     root          28 Jan 14 01:03 ..
drwxr-xr-x    2 root     root         100 Jan 14 01:03 ..2023_01_14_01_03_54.681982277
lrwxrwxrwx    1 root     root          31 Jan 14 01:03 ..data -> ..2023_01_14_01_03_54.681982277
lrwxrwxrwx    1 root     root          13 Jan 14 01:03 ca.crt -> ..data/ca.crt
lrwxrwxrwx    1 root     root          16 Jan 14 01:03 namespace -> ..data/namespace
lrwxrwxrwx    1 root     root          12 Jan 14 01:03 token -> ..data/token

[root@node-1 ~]# kubectl -n kube-system cp \
    busybox:/var/run/secrets/kubernetes.io/serviceaccount/..2023_01_14_01_03_54.681982277/token \
    token

# 查看token
[root@node-1 ~]# cat token ; echo
eyJhbGciOiJSUzI1NiIsImtpZCI6Ik40SHBLeTUxMUhheVJSM2lzWklkeXlDS1IxUklnSkVFUU9NLTVVYk1UcHcifQ.eyJhdWQiOlsiaHR0cHM6Ly9rdWJlcm5ldGVzLmRlZmF1bHQuc3ZjLmNsdXN0ZXIubG9jYWwiXSwiZXhwIjoxNzA1MTk0MjM0LCJpYXQiOjE2NzM2NTgyMzQsImlzcyI6Imh0dHBzOi8va3ViZXJuZXRlcy5kZWZhdWx0LnN2Yy5jbHVzdGVyLmxvY2FsIiwia3ViZXJuZXRlcy5pbyI6eyJuYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsInBvZCI6eyJuYW1lIjoiYnVzeWJveCIsInVpZCI6IjM1ODk0MjA0LWFkNzUtNGVmNC05YmE0LWFlZDI0NGU2NTMyNSJ9LCJzZXJ2aWNlYWNjb3VudCI6eyJuYW1lIjoiZGVmYXVsdCIsInVpZCI6ImIyZDQ0NzkxLTUzOWMtNGJkZS1hYTg3LTY2ODFjODllNmU4YSJ9LCJ3YXJuYWZ0ZXIiOjE2NzM2NjE4NDF9LCJuYmYiOjE2NzM2NTgyMzQsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDprdWJlLXN5c3RlbTpkZWZhdWx0In0.lp9HaBtHINn2K4yWylzT59zGP7zcU2hUO1n2DsCCzHE22yvcck_KmM9YajTE_biYdWDfsc-QLgQcqqdCjEckz3PGI5GfM11HSGnWwPnB5v5RtJVBVJey-FrkeK5lozIiIRkzxgcbN7zZb1zu_4koCuNX8_9D8q23euchhRTz6hdSgLJDIOF-PS1IyZDSWGRcXl2Ka-IWOxNbaYrxuOV1ui-fEH5_jlk1fKU80NyxkYYbi2kTV-9lgZuToEGavWjQrUXydmAv4qxu9RUloYtITAKZlKzxQQb6-wuBJMgU9Oj_Ps4q3nj1S2qnk-RX5gTJFOGvj7o3TFp_Lg1BvAk-nQ
```

:::

::: details  （2）解密token

![image-20230114093058795](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230114093058795.png)

分析结果：

* `HEADER`部分主要声明了alg（加密方式），kid是什么没有见过，先不管它

* `PAYLOAD`部分是我们最主要的数据，可以看到有很多的字段，其中大部分都是JWT预定义的字段，比如`exp`用于指定token过期时间，

  关于这部分可以参考：[https://jinhui.dev/coding/backend/Modules-for-Go.html#payload](https://jinhui.dev/coding/backend/Modules-for-Go.html#payload)

* `PAYLOAD`中有一个`"sub": "system:serviceaccount:kube-system:default"`，看起来像是和角色相关的

解密数据：

```bash
# token签发时间 - iat
[root@node-1 ~]# date -d @1673658234 +"%Y-%m-%d %H:%M:%S"
2023-01-14 09:03:54

# token生效时间 - nbf
[root@node-1 ~]# date -d @1673658234 +"%Y-%m-%d %H:%M:%S"
2023-01-14 09:03:54

# token过期时间 - exp
[root@node-1 ~]# date -d @1705194234 +"%Y-%m-%d %H:%M:%S"
2024-01-14 09:03:54

# 查看绑定的角色(输出结果已经省略无关的信息)
[root@node-1 ~]# kubectl get clusterrolebinding -n kube-system -o wide | grep -E 'NAME|serviceaccount'
NAME                                    ROLE                                                 GROUPS                
system:service-account-issuer-discovery ClusterRole/system:service-account-issuer-discovery  system:serviceaccounts

# 查看角色权限
[root@node-1 ~]# kubectl get clusterrole system:service-account-issuer-discovery -o yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  annotations:
    rbac.authorization.kubernetes.io/autoupdate: "true"
  creationTimestamp: "2023-01-12T06:42:47Z"
  labels:
    kubernetes.io/bootstrapping: rbac-defaults
  name: system:service-account-issuer-discovery
  resourceVersion: "102"
  uid: 6a98f1fd-e8f0-4c77-a091-32f0e3f1d608
rules:
- nonResourceURLs:
  - /.well-known/openid-configuration
  - /openid/v1/jwks
  verbs:
  - get
```

:::

::: details  （3）验证权限

**1.使用client-go编写一段代码**

* 代码需要运行在集群中
* 实现的功能是监听kube-system下的所有Pod

```go
package main

import (
	"context"
	"encoding/json"
	"fmt"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"log"
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

	// (3) 监听kube-system下的所有Pod
    // 实例化Watch对象
	watcher, err := clientset.CoreV1().Pods("kube-system").Watch(context.TODO(), metav1.ListOptions{})
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

**2.Windows下编译并上传到Linux主机上**

```bash
D:\application\GoLand\example>SET CGO_ENABLED=0
D:\application\GoLand\example>SET GOOS=linux
D:\application\GoLand\example>SET GOARCH=amd64
D:\application\GoLand\example>go build -o main ./main.go
```

**3.测试默认的ServiceAccount权限**

```bash
# 为了演示简单,这里直接将二进制拷贝进去，而不是编写Dockerfile再打镜像
[root@node-1 ~]# kubectl -n kube-system cp main busybox:/

# 进入到容器中执行
[root@node-1 ~]# kubectl -n kube-system exec -it busybox -- sh
/ # chmod 755 main 
/ # ./main 
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
panic: unknown (get pods)

goroutine 1 [running]:
main.main()
        D:/application/GoLand/example/main.go:52 +0x405
        
# 可以看到kubernetes集群的版本输出出来了，但是watch操作报错了
```

**4.临时修改default ServiceAccount的权限**

```bash
# 开一个新终端修改权限
[root@node-1 ~]# kubectl edit clusterrole system:service-account-issuer-discovery
rules:
- nonResourceURLs:
  - /.well-known/openid-configuration
  - /openid/v1/jwks
  verbs:
  - get
- apiGroups:        # 新增这行及以下部分,给 default ServiceAccount最高的权限
  - '*'
  resources:
  - '*'
  verbs:
  - '*'
- nonResourceURLs:
  - '*'
  verbs:
  - '*'

# 在上一步骤的终端继续测试，可以正常执行了
/ # ./main
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
2023/01/14 02:53:02    事件类型: ADDED    Pod名称: calico-node-tkpkm                        Pod阶段: Running
2023/01/14 02:53:02    事件类型: ADDED    Pod名称: kube-apiserver-node-1                    Pod阶段: Running
2023/01/14 02:53:02    事件类型: ADDED    Pod名称: kube-controller-manager-node-2           Pod阶段: Running
2023/01/14 02:53:02    事件类型: ADDED    Pod名称: kube-proxy-skqfc                         Pod阶段: Running
2023/01/14 02:53:02    事件类型: ADDED    Pod名称: kube-scheduler-node-1                    Pod阶段: Running
2023/01/14 02:53:02    事件类型: ADDED    Pod名称: busybox                                  Pod阶段: Running
2023/01/14 02:53:02    事件类型: ADDED    Pod名称: calico-node-j9jw8                        Pod阶段: Running
2023/01/14 02:53:02    事件类型: ADDED    Pod名称: calico-node-vrn9t                        Pod阶段: Running
2023/01/14 02:53:02    事件类型: ADDED    Pod名称: etcd-node-2                              Pod阶段: Running
2023/01/14 02:53:02    事件类型: ADDED    Pod名称: kube-proxy-87wnc                         Pod阶段: Running
2023/01/14 02:53:02    事件类型: ADDED    Pod名称: kube-proxy-9fvlt                         Pod阶段: Running
2023/01/14 02:53:02    事件类型: ADDED    Pod名称: calico-node-fvq28                        Pod阶段: Running
2023/01/14 02:53:02    事件类型: ADDED    Pod名称: coredns-565d847f94-rz9rm                 Pod阶段: Running
2023/01/14 02:53:02    事件类型: ADDED    Pod名称: coredns-565d847f94-wqdb4                 Pod阶段: Running
2023/01/14 02:53:02    事件类型: ADDED    Pod名称: kube-apiserver-node-3                    Pod阶段: Running
2023/01/14 02:53:02    事件类型: ADDED    Pod名称: kube-controller-manager-node-1           Pod阶段: Running
2023/01/14 02:53:02    事件类型: ADDED    Pod名称: calico-kube-controllers-798cc86c47-jwg5l Pod阶段: Running
2023/01/14 02:53:02    事件类型: ADDED    Pod名称: etcd-node-1                              Pod阶段: Running
2023/01/14 02:53:02    事件类型: ADDED    Pod名称: etcd-node-3                              Pod阶段: Running
2023/01/14 02:53:02    事件类型: ADDED    Pod名称: kube-apiserver-node-2                    Pod阶段: Running
2023/01/14 02:53:02    事件类型: ADDED    Pod名称: kube-controller-manager-node-3           Pod阶段: Running
2023/01/14 02:53:02    事件类型: ADDED    Pod名称: kube-proxy-lmn5s                         Pod阶段: Running
2023/01/14 02:53:02    事件类型: ADDED    Pod名称: kube-scheduler-node-2                    Pod阶段: Running
2023/01/14 02:53:02    事件类型: ADDED    Pod名称: kube-scheduler-node-3                    Pod阶段: Running
```

:::

<br />

## 节点管理

### 临时下线与恢复

::: details  （1）暴力删除节点：kubectl delete node NODE

```bash
[root@node-1 ~]# kubectl get node
NAME     STATUS   ROLES           AGE   VERSION
node-1   Ready    control-plane   29h   v1.25.4
node-2   Ready    control-plane   29h   v1.25.4
node-3   Ready    control-plane   29h   v1.25.4
node-4   Ready    <none>          29h   v1.25.4

[root@node-1 ~]# kubectl delete node node-4
node "node-4" deleted

[root@node-1 ~]# kubectl get node
NAME     STATUS   ROLES           AGE   VERSION
node-1   Ready    control-plane   29h   v1.25.4
node-2   Ready    control-plane   29h   v1.25.4
node-3   Ready    control-plane   29h   v1.25.4

# 如果要恢复的话需要重启kubelet服务
[root@node-4 ~]# systemctl restart kubelet.service

[root@node-1 ~]# kubectl get node
NAME     STATUS   ROLES           AGE   VERSION
node-1   Ready    control-plane   29h   v1.25.4
node-2   Ready    control-plane   29h   v1.25.4
node-3   Ready    control-plane   29h   v1.25.4
node-4   Ready    <none>          25s   v1.25.4
```

:::

::: details  （2）设置节点不可调度，不影响已经在运行中的Pod：kubectl cordon NODE

```bash
[root@node-1 ~]# kubectl get node
NAME     STATUS   ROLES           AGE   VERSION
node-1   Ready    control-plane   29h   v1.25.4
node-2   Ready    control-plane   29h   v1.25.4
node-3   Ready    control-plane   29h   v1.25.4
node-4   Ready    <none>          25m   v1.25.4

# 设置节点不可调度
[root@node-1 ~]# kubectl cordon node-4
node/node-4 cordoned

[root@node-1 ~]# kubectl get node
NAME     STATUS                     ROLES           AGE   VERSION
node-1   Ready                      control-plane   29h   v1.25.4
node-2   Ready                      control-plane   29h   v1.25.4
node-3   Ready                      control-plane   29h   v1.25.4
node-4   Ready,SchedulingDisabled   <none>          25m   v1.25.4

# 恢复节点为可调度
[root@node-1 ~]# kubectl uncordon node-4
node/node-4 uncordoned

[root@node-1 ~]# kubectl get node
NAME     STATUS   ROLES           AGE   VERSION
node-1   Ready    control-plane   29h   v1.25.4
node-2   Ready    control-plane   29h   v1.25.4
node-3   Ready    control-plane   29h   v1.25.4
node-4   Ready    <none>          26m   v1.25.4
```

:::

::: details  （3）先设置节点不可调度，然后优雅终止Pod：kubectl drain NODE

```bash
# 选项说明
# --force                 对于未声明控制器的Pod需要添加此参数
# --ignore-daemonsets     忽略DaemonSet管理下的Pod
# --delete-emptydir-data  即使存在使用emptyDir的pod（节点耗尽时将删除的本地数据），也要继续

# 为了平滑迁移,必须保证要驱逐的Pod副本数大于1
[root@node-1 ~]# kubectl drain node-4 --force --ignore-daemonsets --delete-emptydir-data
node/node-4 cordoned
Warning: ignoring DaemonSet-managed Pods: kube-system/calico-node-vrn9t, kube-system/kube-proxy-lmn5s
node/node-4 drained

[root@node-1 ~]# kubectl get node
NAME     STATUS                     ROLES           AGE   VERSION
node-1   Ready                      control-plane   46h   v1.25.4
node-2   Ready                      control-plane   46h   v1.25.4
node-3   Ready                      control-plane   46h   v1.25.4
node-4   Ready,SchedulingDisabled   <none>          16h   v1.25.4

# 恢复节点可调度
[root@node-1 ~]# kubectl uncordon node-4
node/node-4 uncordoned
```

:::

<br />

### 证书签名请求

文档：[https://kubernetes.io/zh-cn/docs/reference/access-authn-authz/certificate-signing-requests/#normal-user](https://kubernetes.io/zh-cn/docs/reference/access-authn-authz/certificate-signing-requests/#normal-user)

下面演示使用证书签名请求来创建普通用户

::: details （1）创建私钥和证书请求文件

```bash
# 定义变量
[root@node-1 ~]# UserName=kubernetes-zhangsan  # 仿照默认的kubernetes-admin用户创建一个新用户
[root@node-1 ~]# UserGroup=cluster-reader      # 用户组,可以自定义,在后面可以我们对单独的用户授权,也可以直接对一个组进行授权
[root@node-1 ~]# ClusterName=kubernetes        # 集群名称,需要根据现有的集群名称来填写,可以从~/.kube/config中获取

# 创建证书私钥
[root@node-1 ~]# openssl genrsa -out ${UserName}.key 2048
Generating RSA private key, 2048 bit long modulus
.+++
.....................+++
e is 65537 (0x10001)

# 创建证书请求文件
[root@node-1 ~]# openssl req -new -key ${UserName}.key -out ${UserName}.csr
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [XX]:
State or Province Name (full name) []:
Locality Name (eg, city) [Default City]:
Organization Name (eg, company) [Default Company Ltd]:cluster-reader            # 用户组
Organizational Unit Name (eg, section) []:
Common Name (eg, your name or your server's hostname) []:kubernetes-zhangsan    # 用户名
Email Address []:

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
An optional company name []:
```

:::

::: details （2）创建证书签名请求：CertificateSigningRequest

```bash
[root@node-1 ~]# request=$(cat ${UserName}.csr | base64 | tr -d "\n")
[root@node-1 ~]# cat <<EOF | kubectl apply -f -
apiVersion: certificates.k8s.io/v1
kind: CertificateSigningRequest
metadata:
  name: ${UserName}
spec:
  request: ${request}
  signerName: kubernetes.io/kube-apiserver-client
  expirationSeconds: 86400  # 过期时间设置为1天
  usages:
  - client auth
EOF

certificatesigningrequest.certificates.k8s.io/kubernetes-zhangsan created
```

:::

::: details （3）批准证书签名请求

```bash
# 先查看一下，最后一列是 Pending 状态
[root@node-1 ~]# kubectl get csr
NAME                  AGE   SIGNERNAME                            REQUESTOR          REQUESTEDDURATION   CONDITION
kubernetes-zhangsan   4s    kubernetes.io/kube-apiserver-client   kubernetes-admin   24h                 Pending

# 批准证书签名请求
[root@node-1 ~]# kubectl certificate approve ${UserName}
certificatesigningrequest.certificates.k8s.io/kubernetes-zhangsan approved

# 再次查看,最后一列已经是 Approved,Issued
[root@node-1 ~]# kubectl get csr
NAME                  AGE    SIGNERNAME                            REQUESTOR          REQUESTEDDURATION   CONDITION
kubernetes-zhangsan   2m1s   kubernetes.io/kube-apiserver-client   kubernetes-admin   24h                 Approved,Issued
```

:::

::: details （4）导出证书

```bash
[root@node-1 ~]# kubectl get csr ${UserName} -o jsonpath='{.status.certificate}'| base64 -d > ${UserName}.crt

[root@node-1 ~]# cat ${UserName}.crt
-----BEGIN CERTIFICATE-----
MIIDOjCCAiKgAwIBAgIQVQHoYldYgy4GnL3N5MF9jTANBgkqhkiG9w0BAQsFADAV
MRMwEQYDVQQDEwprdWJlcm5ldGVzMB4XDTIzMDExNDA1NDkwN1oXDTIzMDExNTA1
NDkwN1owVTELMAkGA1UEBhMCWFgxFTATBgNVBAcTDERlZmF1bHQgQ2l0eTEVMBMG
A1UECgwMJHtVc2VyR3JvdXB9MRgwFgYDVQQDDA/Dr8K/JHtVc2VyTmFtZX0wggEi
MA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC4ilgrsnsm5qDJxxdghQde0Ptl
djsp96Ehax1fRz9NaHmDlvaRp+q/Q+zcl7BP3TePIxozC6mkS6qiidTR+lBmrDS3
lwDkDjPKEe+FiG+xwo/77JnlkMroIn3OG0EATvbW9cJcWDUpOpsYn+liQVQDx+Z6
poiFR4o+BYB150/zvVjvEcMzZR2lsr721/ANLb8i+6dsICkJmlv9Ys6Xh2OEqk6z
60SeKm3TijAcD5dIgEu/Qtw14/faJ72FZA01Ct1OPP8bo5UVcm/BSmoEJzeZvAHB
Qrp/XlBaE17gXonQPguSGVbkAAOnlncR9GgkfI+xWcFZ+zcPde8EaxheOmtHAgMB
AAGjRjBEMBMGA1UdJQQMMAoGCCsGAQUFBwMCMAwGA1UdEwEB/wQCMAAwHwYDVR0j
BBgwFoAUCdY2pgy65ULRaBz4+YpMb5xSqVEwDQYJKoZIhvcNAQELBQADggEBAKeI
L1kMw4Sxf0aZS/Nkw7s8G63+c8c0+U0VaLtMSgmO6abSS4pJ9aUW76vYxsSs4geq
iFO+ZsIrFqbZte87YGLLtrs0SnZOtVUiUwWpzuvykcDpoC/GINA+G6DnrkfmAmCo
9Z/ker780hKBpAWpENuhPbLJtVGZ9LlEf+5fC0qBtnToUX1oj0Z6qnB2+zdERHIN
Jhh2FXZPgYhLlW4rEkb0JxTwZ3yJcMQBADeZfNJ12elafZ2C48/pbH/uzM/lZa/Z
AUeV9F3eXt4d0ydcltSbQk6CCtQZMVQ3A1bxwDA0EWRXv0LqVpD8vqe+eS+ZxZQl
vENQo9oAaVDn6hmUCb4=
-----END CERTIFICATE-----
```

:::

::: details （5）创建角色和角色绑定

```bash
# 创建角色
[root@node-1 ~]# kubectl create clusterrole cluster-reader --resource=* --verb=get,list,watch
clusterrole.rbac.authorization.k8s.io/cluster-reader created

# 用户和角色绑定
[root@node-1 ~]# kubectl create clusterrolebinding cluster-reader --clusterrole=cluster-reader --user=${UserName}
clusterrolebinding.rbac.authorization.k8s.io/cluster-reader created
```

:::

::: details （6）添加到 kubeconfig

```bash
# 添加用户
[root@node-1 ~]# kubectl config set-credentials ${UserName} \
    --client-key=${UserName}.key \
    --client-certificate=${UserName}.crt \
    --embed-certs=true

User "kubernetes-zhangsan" set.

# 添加context
[root@node-1 ~]# kubectl config set-context ${UserName}@${ClusterName} --cluster=${ClusterName} --user=${UserName}
Context "kubernetes-zhangsan@kubernetes" created.
```

:::

::: details （7）测试

```bash
# Get权限没有问题
[root@node-1 ~]# kubectl get pods --context=${UserName}@${ClusterName} -A
NAMESPACE     NAME                                       READY   STATUS    RESTARTS         AGE
kube-system   calico-kube-controllers-798cc86c47-jwg5l   1/1     Running   8 (3h10m ago)    47h
kube-system   calico-node-fvq28                          1/1     Running   9 (3h10m ago)    47h
kube-system   calico-node-j9jw8                          1/1     Running   10 (3h10m ago)   47h
kube-system   calico-node-tkpkm                          1/1     Running   10 (3h10m ago)   47h
kube-system   calico-node-vrn9t                          1/1     Running   3 (3h10m ago)    18h
kube-system   coredns-565d847f94-rz9rm                   1/1     Running   8 (3h10m ago)    47h
kube-system   coredns-565d847f94-wqdb4                   1/1     Running   8 (3h10m ago)    47h
kube-system   etcd-node-1                                1/1     Running   8 (3h10m ago)    47h
kube-system   etcd-node-2                                1/1     Running   9 (3h10m ago)    47h
kube-system   etcd-node-3                                1/1     Running   8 (3h10m ago)    47h
kube-system   kube-apiserver-node-1                      1/1     Running   13 (82m ago)     47h
kube-system   kube-apiserver-node-2                      1/1     Running   16 (81m ago)     47h
kube-system   kube-apiserver-node-3                      1/1     Running   10 (82m ago)     47h
kube-system   kube-controller-manager-node-1             1/1     Running   8 (3h10m ago)    47h
kube-system   kube-controller-manager-node-2             1/1     Running   8 (3h10m ago)    47h
kube-system   kube-controller-manager-node-3             1/1     Running   8 (3h10m ago)    47h
kube-system   kube-proxy-87wnc                           1/1     Running   9 (3h10m ago)    47h
kube-system   kube-proxy-9fvlt                           1/1     Running   8 (3h10m ago)    47h
kube-system   kube-proxy-lmn5s                           1/1     Running   3 (3h10m ago)    18h
kube-system   kube-proxy-skqfc                           1/1     Running   8 (3h10m ago)    47h
kube-system   kube-scheduler-node-1                      1/1     Running   8 (3h10m ago)    47h
kube-system   kube-scheduler-node-2                      1/1     Running   8 (3h10m ago)    47h
kube-system   kube-scheduler-node-3                      1/1     Running   8 (3h10m ago)    47h

# 因为我们并没有对kubernetes-zhangsan授权Create权限,所以创建Pod时拒绝了
[root@node-1 ~]# kubectl run nginx --image=nginx:latest --context=${UserName}@${ClusterName} 
Error from server (Forbidden): pods is forbidden: User "kubernetes-zhangsan" cannot create resource "pods" in API group "" in the namespace "default"
```

:::

<br />

## Helm

文档：[https://helm.sh/zh/docs/](https://helm.sh/zh/docs/)

Artifact Hub：[https://artifacthub.io](https://artifacthub.io)

<br />

### 基础知识

::: details （1）演示使用版本

```bash
[root@node-1 ~]# helm version --short
v3.10.3+g835b733
```

:::

::: details （2）三大概念

文档：[https://helm.sh/zh/docs/intro/using_helm/#%E4%B8%89%E5%A4%A7%E6%A6%82%E5%BF%B5](https://helm.sh/zh/docs/intro/using_helm/#%E4%B8%89%E5%A4%A7%E6%A6%82%E5%BF%B5)

* *Chart* 代表着 Helm 包
* *Repository（仓库）* 是用来存放和共享 charts 的地方
* *Release* 是运行在 Kubernetes 集群中的 chart 的实例

Helm 安装 *charts* 到 Kubernetes 集群中，每次安装都会创建一个新的 *release*

:::

::: details （3）数据存储位置

文档：[https://helm.sh/zh/docs/helm/helm/](https://helm.sh/zh/docs/helm/helm/)

```bash
# 默认的缓存路径
[root@node-1 ~]# ls -lh $HOME/.cache/helm
total 0
drwxr-xr-x 2 root root 56 Jan 15 13:03 repository

# 默认的配置路径
[root@node-1 ~]# ls -lh $HOME/.config/helm
total 4.0K
-rw------- 1 root root   0 Jan 15 13:01 repositories.lock
-rw-r--r-- 1 root root 246 Jan 15 13:03 repositories.yaml

# 默认的数据路径,这里还没有任何数据
[root@node-1 ~]# ls -lh $HOME/.local/share/helm
ls: cannot access /root/.local/share/helm: No such file or directory
```

:::

<br />

### Chart创建

文档：[https://helm.sh/zh/docs/chart_template_guide/getting_started/](https://helm.sh/zh/docs/chart_template_guide/getting_started/)

::: details （1）创建Chart

```bash
# 创建Chart
[root@node-1 ~]# helm create mychart
Creating mychart

# 查看目录结构
[root@node-1 ~]# cd mychart/
[root@node-1 nginx]# tree
.
├── charts                       # 空目录
├── Chart.yaml                   # Chart的描述信息
├── templates                    # 模板目录
│   ├── deployment.yaml          #      Deployment对象
│   ├── _helpers.tpl             # 放置可以通过chart复用的模板辅助对象
│   ├── hpa.yaml                 #      HPA对象
│   ├── ingress.yaml             #      Ingress对象
│   ├── NOTES.txt                # helm install后展示给用户的信息
│   ├── serviceaccount.yaml      #      ServiceAccount对象
│   ├── service.yaml             #      Service对象
│   └── tests                    # 测试目录
│       └── test-connection.yaml # 
└── values.yaml                  # 用于渲染模板中引用的变量

3 directories, 10 files
```

:::

::: details （2）部署和卸载Chart

```bash
# 第一个参数是Release Name, 第二个参数是Chart目录
[root@node-1 mychart]# helm install demo .
NAME: demo
LAST DEPLOYED: Sun Jan 15 20:08:39 2023
NAMESPACE: default
STATUS: deployed
REVISION: 1
NOTES:
1. Get the application URL by running these commands:
  export POD_NAME=$(kubectl get pods --namespace default -l "app.kubernetes.io/name=mychart,app.kubernetes.io/instance=demo" -o jsonpath="{.items[0].metadata.name}")
  export CONTAINER_PORT=$(kubectl get pod --namespace default $POD_NAME -o jsonpath="{.spec.containers[0].ports[0].containerPort}")
  echo "Visit http://127.0.0.1:8080 to use your application"
  kubectl --namespace default port-forward $POD_NAME 8080:$CONTAINER_PORT

# 查看已经部署Chart列表
[root@node-1 mychart]# helm ls
NAME    NAMESPACE       REVISION        UPDATED                                 STATUS          CHART           APP VERSION
demo    default         1               2023-01-15 20:08:39.026732741 +0800 CST deployed        mychart-0.1.0   1.16.0

# 卸载Chart
[root@node-1 mychart]# helm uninstall demo
release "demo" uninstalled
```

:::

::: details （3）检查部署了哪些对象

```bash
# 检查templates目录中的kubernetes对象是否已经部署

# 自动部署了一个Deployment
[root@node-1 mychart]# kubectl get deploy
NAME           READY   UP-TO-DATE   AVAILABLE   AGE
demo-mychart   1/1     1            1           55s

# Pod中跑的镜像是nginx:1.16.0
[root@node-1 mychart]# kubectl get pods
NAME                          READY   STATUS    RESTARTS   AGE
demo-mychart-8fccf9c8-72z5x   1/1     Running   0          2m54s

[root@node-1 mychart]# kubectl get pod -o yaml | yq '.items[] | .spec.containers[] | .image'
nginx:1.16.0

# 自动部署了一个Service
[root@node-1 mychart]# kubectl get service
NAME           TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE
demo-mychart   ClusterIP   10.200.46.91   <none>        80/TCP    66s
kubernetes     ClusterIP   10.200.0.1     <none>        443/TCP   3d5h

# 自动部署了一个ServiceAccount
[root@node-1 mychart]# kubectl get serviceaccount
NAME           SECRETS   AGE
default        0         3d5h
demo-mychart   0         76s

# HPA没有自动部署
[root@node-1 mychart]# kubectl get hpa
No resources found in default namespace.

# Ingress没有自动部署
[root@node-1 mychart]# kubectl get ingress
No resources found in default namespace.

# 看看能不能访问
[root@node-1 mychart]# curl 10.200.46.91 -I
HTTP/1.1 200 OK
Server: nginx/1.16.0
Date: Sun, 15 Jan 2023 12:10:14 GMT
Content-Type: text/html
Content-Length: 612
Last-Modified: Tue, 23 Apr 2019 10:18:21 GMT
Connection: keep-alive
ETag: "5cbee66d-264"
Accept-Ranges: bytes

# 默认情况下他会给我创建一个Nginx镜像的Deployment
```

:::

::: details （4）查看最终渲染的YAML文件

```bash
[root@node-1 mychart]# helm install demo . --dry-run 
NAME: demo
LAST DEPLOYED: Mon Jan 16 12:38:42 2023
NAMESPACE: default
STATUS: pending-install
REVISION: 1
HOOKS:
---
# Source: mychart/templates/tests/test-connection.yaml
apiVersion: v1
kind: Pod
metadata:
  name: "demo-mychart-test-connection"
  labels:
    helm.sh/chart: mychart-0.1.0
    app.kubernetes.io/name: mychart
    app.kubernetes.io/instance: demo
    app.kubernetes.io/version: "1.16.0"
    app.kubernetes.io/managed-by: Helm
  annotations:
    "helm.sh/hook": test
spec:
  containers:
    - name: wget
      image: busybox
      command: ['wget']
      args: ['demo-mychart:80']
  restartPolicy: Never
MANIFEST:
---
# Source: mychart/templates/serviceaccount.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: demo-mychart
  labels:
    helm.sh/chart: mychart-0.1.0
    app.kubernetes.io/name: mychart
    app.kubernetes.io/instance: demo
    app.kubernetes.io/version: "1.16.0"
    app.kubernetes.io/managed-by: Helm
---
# Source: mychart/templates/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: demo-mychart
  labels:
    helm.sh/chart: mychart-0.1.0
    app.kubernetes.io/name: mychart
    app.kubernetes.io/instance: demo
    app.kubernetes.io/version: "1.16.0"
    app.kubernetes.io/managed-by: Helm
spec:
  type: ClusterIP
  ports:
    - port: 80
      targetPort: http
      protocol: TCP
      name: http
  selector:
    app.kubernetes.io/name: mychart
    app.kubernetes.io/instance: demo
---
# Source: mychart/templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo-mychart
  labels:
    helm.sh/chart: mychart-0.1.0
    app.kubernetes.io/name: mychart
    app.kubernetes.io/instance: demo
    app.kubernetes.io/version: "1.16.0"
    app.kubernetes.io/managed-by: Helm
spec:
  replicas: 1
  selector:
    matchLabels:
      app.kubernetes.io/name: mychart
      app.kubernetes.io/instance: demo
  template:
    metadata:
      labels:
        app.kubernetes.io/name: mychart
        app.kubernetes.io/instance: demo
    spec:
      serviceAccountName: demo-mychart
      securityContext:
        {}
      containers:
        - name: mychart
          securityContext:
            {}
          image: "nginx:1.16.0"
          imagePullPolicy: IfNotPresent
          ports:
            - name: http
              containerPort: 80
              protocol: TCP
          livenessProbe:
            httpGet:
              path: /
              port: http
          readinessProbe:
            httpGet:
              path: /
              port: http
          resources:
            {}

NOTES:
1. Get the application URL by running these commands:
  export POD_NAME=$(kubectl get pods --namespace default -l "app.kubernetes.io/name=mychart,app.kubernetes.io/instance=demo" -o jsonpath="{.items[0].metadata.name}")
  export CONTAINER_PORT=$(kubectl get pod --namespace default $POD_NAME -o jsonpath="{.spec.containers[0].ports[0].containerPort}")
  echo "Visit http://127.0.0.1:8080 to use your application"
  kubectl --namespace default port-forward $POD_NAME 8080:$CONTAINER_PORT
```

:::

::: details （5）Chart.yaml 和 values.yaml 简单说明

```bash
# Deployment配置
[root@node-1 mychart]# vim values.yaml
replicaCount: 1              # Pod副本数
image:
  repository: nginx          # 镜像名称，可以看到默认是nginx
  pullPolicy: IfNotPresent   # 镜像拉取策略
  # Overrides the image tag whose default is the chart appVersion.
  tag: ""                    # 镜像tag,若未设置则使用 Chart.yaml文件中的appVersion值
imagePullSecrets: []
nameOverride: ""             # 默认的name是  Chart.yaml文件中的name值，此值可以覆盖它
fullnameOverride: ""         # 默认的fullname是: <helm install时的name>-<Chart.yaml.name>，此值可以覆盖它

# Service配置
service:
  type: ClusterIP
  port: 80

# ServiceAccount配置
serviceAccount:
  # Specifies whether a service account should be created
  create: true       # 默认开启
  # Annotations to add to the service account
  annotations: {}
  # The name of the service account to use.
  # If not set and create is true, a name is generated using the fullname template
  name: ""           # 默认使用fullname

# Ingress配置
ingress:
  enabled: false      # 默认关闭
  className: ""
  annotations: {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  hosts:
    - host: chart-example.local
      paths:
        - path: /
          pathType: ImplementationSpecific
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local
  
# HPA配置
autoscaling:
  enabled: false   # 默认关闭
  minReplicas: 1
  maxReplicas: 100
  targetCPUUtilizationPercentage: 80
  # targetMemoryUtilizationPercentage: 80
  
# 资源限制设置
resources: {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #   cpu: 100m
  #   memory: 128Mi
  # requests:
  #   cpu: 100m
  #   memory: 128Mi
  
# 容器探针等其他设置，没有在values.yaml文件中，而在具体的资源模板中
[root@node-1 mychart]# vim templates/deployment.yaml
      containers:
        - name: {{ .Chart.Name }}
          securityContext:
            {{- toYaml .Values.securityContext | nindent 12 }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag | default .Chart.AppVersion }}"
          imagePullPolicy: {{ .Values.image.pullPolicy }}
          ports:
            - name: http
              containerPort: {{ .Values.service.port }}
              protocol: TCP
          livenessProbe:
            httpGet:
              path: /
              port: http
          readinessProbe:
            httpGet:
              path: /
              port: http
          resources:
            {{- toYaml .Values.resources | nindent 12 }}
```

:::

::: details （6）定制：运行一个最简单的busybox:latest Pod

```bash
# 将不需要的模板文件全部删除
[root@node-1 mychart]# [root@node-1 mychart]# rm -rf templates/hpa.yaml \
    templates/ingress.yaml \
    templates/serviceaccount.yaml \
    templates/NOTES.txt \
    templates/tests

[root@node-1 mychart]# ls -lh templates/
total 8.0K
-rw-r--r-- 1 root root  594 Jan 16 17:27 deployment.yaml
-rw-r--r-- 1 root root 1.8K Jan 15 20:07 _helpers.tpl

# 修改deployment模板，只保留必要的配置
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "mychart.fullname" . }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      {{- include "mychart.selectorLabels" . | nindent 6 }}
  template:
    metadata:
      labels:
        {{- include "mychart.selectorLabels" . | nindent 8 }}
    spec:
      containers:
        - name: {{ .Chart.Name }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag | default .Chart.AppVersion }}"
          imagePullPolicy: {{ .Values.image.pullPolicy }}
          command: ['sh', '-c', 'sleep 3600']

# 修改 values.yaml
[root@node-1 mychart]# vim values.yaml
# Default values for mychart.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 3

image:
  repository: busybox
  pullPolicy: IfNotPresent
  # Overrides the image tag whose default is the chart appVersion.
  tag: latest

nameOverride: ""
fullnameOverride: ""

# 部署
[root@node-1 mychart]# helm install busybox . 
NAME: busybox
LAST DEPLOYED: Mon Jan 16 17:35:12 2023
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None

# 查看
[root@node-1 mychart]# helm ls
NAME    NAMESPACE       REVISION        UPDATED                                 STATUS          CHART           APP VERSION
busybox default         1               2023-01-16 17:35:12.340235152 +0800 CST deployed        mychart-0.1.0   1.16.0

# 查看Deployment
[root@node-1 mychart]# kubectl get deploy
NAME              READY   UP-TO-DATE   AVAILABLE   AGE
busybox-mychart   3/3     3            3           45s

# 查看Pod
[root@node-1 mychart]# kubectl get pods
NAME                               READY   STATUS    RESTARTS   AGE
busybox-mychart-54df4476bf-h7rx5   1/1     Running   0          47s
busybox-mychart-54df4476bf-qc2ww   1/1     Running   0          47s
busybox-mychart-54df4476bf-x9dpq   1/1     Running   0          47s
```

:::

<br />

### Chart内置对象

文档：[https://helm.sh/zh/docs/chart_template_guide/getting_started/](https://helm.sh/zh/docs/chart_template_guide/getting_started/)

::: details （1）Release 对象描述了版本发布本身

```bash
# 编辑NOTES.txt
[root@node-1 mychart]# vim templates/NOTES.txt
Release对象描述了版本发布本身
对象                        说明                                                                渲染的值
.Release.Name               Release名称（helm install时指定的Name就是ReleaseName）                 {{ .Release.Name }}
.Release.Namespace          Release命名空间，默认是default（helm install --namespace可以指定该值）   {{ .Release.Namespace }}
.Release.IsInstall          如果当前操作是安装的话，该值将被设置为true                                {{ .Release.IsInstall }}
.Release.IsUpgrade          如果当前操作是升级或回滚的话，该值将被设置为true                            {{ .Release.IsUpgrade }}
.Release.Revision           此次修订的版本号。安装时是1，每次升级或回滚都会自增                          {{ .Release.Revision }}
.Release.Service            该service用来渲染当前模板。Helm里始终Helm                               {{ .Release.Service }}

# 查看渲染的值
[root@node-1 mychart]# helm install demo . --dry-run --namespace kube-system 
NAME: demo
LAST DEPLOYED: Tue Jan 17 12:34:20 2023
NAMESPACE: kube-system
STATUS: pending-install
REVISION: 1
TEST SUITE: None
HOOKS:
MANIFEST:
---
# Source: mychart/templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo-mychart
spec:
  replicas: 3
  selector:
    matchLabels:
      app.kubernetes.io/name: mychart
      app.kubernetes.io/instance: demo
  template:
    metadata:
      labels:
        app.kubernetes.io/name: mychart
        app.kubernetes.io/instance: demo
    spec:
      containers:
        - name: mychart
          image: "busybox:latest"
          imagePullPolicy: IfNotPresent
          command: ['sh', '-c', 'sleep 3600']

NOTES:
Release对象描述了版本发布本身  
对象                        说明                                                                   渲染的值
.Release.Name               Release名称（helm install时指定的Name就是ReleaseName）                    demo
.Release.Namespace          Release命名空间，默认是default（helm install --namespace可以指定该值）      kube-system
.Release.IsInstall          如果当前操作是安装的话，该值将被设置为true                                   true
.Release.IsUpgrade          如果当前操作是升级或回滚的话，该值将被设置为true                              false
.Release.Revision           此次修订的版本号。安装时是1，每次升级或回滚都会自增                            1
.Release.Service            该service用来渲染当前模板。Helm里始终Helm                                 Helm

# 需要注意的是：
# helm install 时可以传入 --namespace 参数，对应模板的 {{ .Release.Namespace }}，
# 如果我们并没有在模板中并没有使用该变量，那么会给你造成一种错觉：
# 我明明指定了命名空间为kube-system，为什么还是将Deployment部署在default命名空间中?

# 此时可以修改 deployment.yaml
[root@node-1 mychart]# vim templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "mychart.fullname" . }}
  namespace: {{ .Release.Namespace | default "default" }}  # 新增这一行
...

# 未传入命名空间时是default
[root@node-1 mychart]# helm install demo . --dry-run | head -20
NAME: demo
LAST DEPLOYED: Tue Jan 17 12:40:13 2023
NAMESPACE: default
STATUS: pending-install
REVISION: 1
TEST SUITE: None
HOOKS:
MANIFEST:
---
# Source: mychart/templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo-mychart
  namespace: default    # 默认命名空间
spec:
  replicas: 3
  selector:
    matchLabels:
      app.kubernetes.io/name: mychart
      
# 传入命名空间后使用指定的值
[root@node-1 mychart]# helm install demo . --dry-run --namespace kube-system | head -20
NAME: demo
LAST DEPLOYED: Tue Jan 17 12:41:11 2023
NAMESPACE: kube-system
STATUS: pending-install
REVISION: 1
TEST SUITE: None
HOOKS:
MANIFEST:
---
# Source: mychart/templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo-mychart
  namespace: kube-system  # --namespace所传递的值
spec:
  replicas: 3
  selector:
    matchLabels:
      app.kubernetes.io/name: mychart
```

:::

::: details （2）Values对象是使用values.yaml文件提供的数据（主要控制变量的地方），Chart对象是使用Chart.yaml文件提供的数据

举例忽略，没有特别好讲的

:::

::: details （3）Files对象在chart中提供访问所有的非特殊文件的对象

注意事项：[https://helm.sh/zh/docs/chart_template_guide/accessing_files/](https://helm.sh/zh/docs/chart_template_guide/accessing_files/)

```bash
# 这里只举一个最简单的例子

# 修改NOTES.txt
[root@node-1 mychart]# vim templates/NOTES.txt
{{ .Files.Get "config.ini" }}

# 在Chart根目录下创建文件
[root@node-1 mychart]# vim config.ini
[dbservers]
db01.intranet.mydomain.net
db02.intranet.mydomain.net
10.25.1.56
10.25.1.57

# 渲染
[root@node-1 mychart]# helm install demo . --dry-run  | sed -rn '/NOTES:/,$'p
NOTES:
[dbservers]
db01.intranet.mydomain.net
db02.intranet.mydomain.net
10.25.1.56
10.25.1.57
```

:::

::: details （4）Capabilities提供关于Kubernetes集群支持功能的信息

```bash
# 修改NOTES.txt
[root@node-1 mychart]# vim templates/NOTES.txt
Kubernetes版本:         {{ .Capabilities.KubeVersion.Version }}
Helm版本:               {{ .Capabilities.HelmVersion.Version }}
HPA v2版本是否安装:      {{ .Capabilities.APIVersions.Has "autoscaling/v2" }}

# 渲染
[root@node-1 mychart]# helm install demo . --dry-run  | sed -rn '/NOTES:/,$'p
NOTES:
Kubernetes版本:         v1.25.4
Helm版本:               v3.10.3
是否安装HPA v2版本:       true

# 使用kubectl检查HPA版本
[root@node-1 mychart]# kubectl api-versions | grep autoscaling
autoscaling/v1
autoscaling/v2
autoscaling/v2beta2
```

:::

::: details （5）Template对象 包含当前被执行的当前模板信息

```bash
# 修改NOTES.txt
[root@node-1 mychart]# vim templates/NOTES.txt
Template.Name        {{ .Template.Name }}
Template.BasePath    {{ .Template.BasePath }}

# 渲染
[root@node-1 mychart]# helm install demo . --dry-run  | sed -rn '/NOTES:/,$'p
NOTES:
Template.Name        mychart/templates/NOTES.txt
Template.BasePath    mychart/templates
```

:::

<br />

### Chart模板函数

说明：介绍一下如何避坑

文档：

* [https://helm.sh/zh/docs/chart_template_guide/functions_and_pipelines/](https://helm.sh/zh/docs/chart_template_guide/functions_and_pipelines/)
* [https://helm.sh/zh/docs/chart_template_guide/function_list/](https://helm.sh/zh/docs/chart_template_guide/function_list/)

::: details （1）查看对象类型，若类型不匹配在使用操作符（lt、gt）等可能会报错

```bash
[root@node-1 mychart]# vim templates/NOTES.txt
{{ .Values.number            | printf "%T" }}
{{ .Values.number | int      | printf "%T" }}
{{ .Values.number | int64    | printf "%T" }}
{{ .Values.number | toString | printf "%T" }}

[root@node-1 mychart]# vim values.yaml
number: 100

[root@node-1 mychart]# helm install demo . --dry-run | sed -rn '/NOTES:/,$'p
NOTES:
float64
int
int64
string

# 分析：
# 1.values.yaml中的数字默认是float64类型的
# 2.通过int、int64等可以转换为int类型
# 3.通过toString可以转为字符串

# 在官方文档printf函数中并没有提到 %T,不过没关系，Helm是用Go写的，有一些地方是相通的，测试一下便知道了
```

:::

::: details （2）操作符是个函数，两种用法举例

```bash
# 用法1
# gt 2 1 的意思是判断 2 > 1
[root@node-1 mychart]# vim templates/NOTES.txt
{{ if gt 2 1 }}
2 > 1
{{ else }}
2 < 1
{{ end }}

[root@node-1 mychart]# helm install demo . --dry-run | sed -rn '/NOTES:/,$'p
NOTES:
2 > 1

# 用法2
# 2 | gt 1 等同于 gt 1 2
[root@node-1 mychart]# vim templates/NOTES.txt
{{ if 2 | gt 1 }}
1 > 2
{{ else }}
1 < 2
{{ end }}

[root@node-1 mychart]# helm install demo . --dry-run | sed -rn '/NOTES:/,$'p
NOTES:
1 < 2

# 如果两个数字类型不一致，在比较前要转换一下类型，否则会报错
[root@node-1 mychart]# vim templates/NOTES.txt
{{ if 2.0 | gt 1 }}
1 > 2
{{ else }}
1 < 2
{{ end }}

[root@node-1 mychart]# helm install demo . --dry-run | sed -rn '/NOTES:/,$'p
Error: INSTALLATION FAILED: template: mychart/templates/NOTES.txt:1:12: executing "mychart/templates/NOTES.txt" at <gt 1>: error calling gt: incompatible types for comparison

# 此时方法2就很好用，方法1我不知道如何转换类型
{{ if 2.0 | int | gt 1 }}
1 > 2
{{ else }}
1 < 2
{{ end }}

[root@node-1 mychart]# helm install demo . --dry-run | sed -rn '/NOTES:/,$'p
NOTES:
1 < 2

# 但在某些情况下方法1会更好用
```

:::

<br />

### Chart流程控制

文档：[https://helm.sh/zh/docs/chart_template_guide/control_structures/](https://helm.sh/zh/docs/chart_template_guide/control_structures/)

::: details （1）if  [ else if ]  [ else ] end 语句

```bash
# 编写values
[root@node-1 mychart]# vim values.yaml
score: 90

# 编写template
[root@node-1 mychart]# ls -lh templates/
total 4.0K
-rw-r--r-- 1 root root 226 Jan 17 19:28 configmap.yaml

[root@node-1 mychart]# vim templates/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Values.name | default .Release.Name }}
  namespace: {{ .Release.Namespace | default "default" }}
data:
  key1: value1
  {{ if ge .Values.score 90.0 }}
  grade: "A"
  {{ else if ge .Values.score 70.0 }}
  grade: "B"
  {{ else if ge .Values.score 60.0 }}
  grade: "C"
  {{ else }}
  grade: "D"
  {{ end }}
  key3: value3

# 渲染
[root@node-1 mychart]# helm install demo . --dry-run | sed -r '/^apiVersion/, $'p
[root@node-1 mychart]# helm install demo . --dry-run | sed -rn '/^apiVersion/, $'p
apiVersion: v1
kind: ConfigMap
metadata:
  name: demo
  namespace: default
data:
  key1: value1
  
  grade: "A"
  
  key3: value3
  
# 看一下存在的问题
# 1.渲染出来多了两行空白,需要删除掉
# 2.Values.score我们并没有判断它的上限和下限，比如最高不能大于100，最低不能小于0
# 3.if语句和固定值的k-v混合起来比较乱

# 解决问题1: 渲染出来多了两行空白,需要删除掉
# 将if左侧和end右侧的空白删除即可
  {{- if ge .Values.score 90.0 }}
  grade: "A"
  {{ else if ge .Values.score 70.0 }}
  grade: "B"
  {{ else if ge .Values.score 60.0 }}
  grade: "C"
  {{ else }}
  grade: "D"
  {{ end -}}

[root@node-1 mychart]# helm install demo . --dry-run | sed -rn '/^apiVersion/, $'p
apiVersion: v1
kind: ConfigMap
metadata:
  name: demo
  namespace: default
data:
  key1: value1
  grade: "A"
  key3: value3
  
# 解决问题2: Values.score我们并没有判断它的上限和下限，比如最高不能大于100，最低不能小于0
# 通过if判断一下，如果大于100或小于0则给他报错
# 但是并没有找到可以主动报错的函数，所以只能使用 required + 一个肯定不存在的变量 来变相达到目的
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Values.name | default .Release.Name }}
  namespace: {{ .Release.Namespace | default "default" }}
data:
  key1: value1
  {{- if or ( gt .Values.score 100.0 ) ( lt .Values.score 0.0 ) }}
  {{ required ".Values.score: The value cannot be greater than 100 or less than 0" .Values.nonkey }}
  {{ else if ge .Values.score 90.0 }}
  grade: "A"
  {{ else if ge .Values.score 70.0 }}
  grade: "B"
  {{ else if ge .Values.score 60.0 }}
  grade: "C"
  {{ else }}
  grade: "D"
  {{ end -}}
  key3: value3
  
[root@node-1 mychart]# cat values.yaml 
score: 900
[root@node-1 mychart]# helm install demo . --dry-run
Error: INSTALLATION FAILED: execution error at (mychart/templates/configmap.yaml:9:5): .Values.score: The value cannot be greater than 100 or less than 0

# 解决问题3: if语句和固定值的k-v混合起来比较乱
# 利用nindent函数和删除空白组合操作，达到代码缩进的效果
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Values.name | default .Release.Name }}
  namespace: {{ .Release.Namespace | default "default" }}
data:
  key1: value1
  {{- if or ( gt .Values.score 100.0 ) ( lt .Values.score 0.0 ) }}
      {{ required ".Values.score: The value cannot be greater than 100 or less than 0" .Values.nonkey }}
  {{ else if ge .Values.score 90.0 }}
      {{- "grade: A" | nindent 2 }}
  {{ else if ge .Values.score 70.0 }}
      {{- "grade: B" | nindent 2 }}
  {{ else if ge .Values.score 60.0 }}
      {{- "grade: C" | nindent 2 }}
  {{ else }}
      {{- "grade: D" | nindent 2 }}
  {{ end -}}
  key3: value3

# 也可以这样写
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Values.name | default .Release.Name }}
  namespace: {{ .Release.Namespace | default "default" }}
data:
  key1: value1
  {{- if or ( gt .Values.score 100.0 ) ( lt .Values.score 0.0 ) }} {{ required ".Values.score: The value cannot be greater than 100 or less than 0" .Values.nonkey }}
  {{ else if ge .Values.score 90.0 }} {{- "grade: A" | nindent 2 }}
  {{ else if ge .Values.score 70.0 }} {{- "grade: B" | nindent 2 }}
  {{ else if ge .Values.score 60.0 }} {{- "grade: C" | nindent 2 }}
  {{ else }}                          {{- "grade: D" | nindent 2 }}
  {{ end -}}
  key3: value3

# 渲染结果
[root@node-1 mychart]# helm install demo . --dry-run | sed -rn '/^apiVersion/, $'p
apiVersion: v1
kind: ConfigMap
metadata:
  name: demo
  namespace: default
data:
  key1: value1
  grade: A
  key3: value3
```

:::

::: details （2）with end 语句：指定作用域范围

```bash
# 还是使用if语句中的例子，我们给他加上作用域改写一下

# 编写values
[root@node-1 mychart]# cat values.yaml 
score: 90

# 使用with .Values ... end 后,在该作用域内我们直接可以使用.score
# 同时他也会有限制，就是不能访问父级作用域的对象，但是我们可以使用$.Values来访问所有对象, $代表根作用域且不可改变
[root@node-1 mychart]# vim templates/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Values.name | default .Release.Name }}
  namespace: {{ .Release.Namespace | default "default" }}
data:
  key1: value1
  {{- with .Values }}
  {{- if or ( gt .score 100.0 ) ( lt .score 0.0 ) }} {{ required ".Values.score: The value cannot be greater than 100 or less than 0" .nonkey }}
  {{ else if ge .score 90.0 }} {{- "grade: A" | nindent 2 }}
  {{ else if ge .score 70.0 }} {{- "grade: B" | nindent 2 }}
  {{ else if ge .score 60.0 }} {{- "grade: C" | nindent 2 }}
  {{ else }}                   {{- "grade: D" | nindent 2 }}
  {{ end -}}
  {{ end -}}
  key3: value3

# 渲染
[root@node-1 mychart]# helm install demo . --dry-run | sed -rn '/^apiVersion/, $'p
apiVersion: v1
kind: ConfigMap
metadata:
  name: demo
  namespace: default
data:
  key1: value1
  grade: A
  key3: value3
```

:::

::: details （3）range end语句：循环操作

```bash
# 编写values
[root@node-1 mychart]# vim values.yaml
pizzaToppings:
  - mushrooms
  - cheese
  - peppers
  - onions
  
# 编写template
[root@node-1 mychart]# vim templates/configmap.yaml 
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Values.name | default .Release.Name }}
  namespace: {{ .Release.Namespace | default "default" }}
data:
  toppings: |
    key1: value1
    {{- range $.Values.pizzaToppings }}
    {{ . }}: true
    {{- end }}
    key3: value3

# 渲染
[root@node-1 mychart]# helm install demo . --dry-run | sed -rn '/^apiVersion/, $'p
apiVersion: v1
kind: ConfigMap
metadata:
  name: demo
  namespace: default
data:
  toppings: |
    key1: value1
    mushrooms: true
    cheese: true
    peppers: true
    onions: true
    key3: value3
```

:::

<br />

### Chart模板管理

文档：[https://helm.sh/zh/docs/chart_template_guide/named_templates/](https://helm.sh/zh/docs/chart_template_guide/named_templates/)

::: details （1）定义模板：define

```bash
# 注意点：
# 1.模板名称是全局的，如果声明两个相同名称的模板，哪个最后加载就使用哪个
# 2.模板命名的常见惯例是使用chart名称作为模板前缀，比如 {{ define "mychart.labels" }}
# 3.模板可以定义在具体的对象中比如Deployment，也可以定义在单独的文件中，一般以_xx.tpl命名,比如_helpers.tpl

# 定义模板
[root@node-1 mychart]# vim templates/_helpers.tpl
{{/* Generate basic labels */}}
{{- define "mychart.labels" }}
  date: {{ now | htmlDate }}
{{- end }}
```

:::

::: details （2）导入模板：template 和 include(推荐)

```bash
[root@node-1 mychart]# vim templates/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Values.name | default .Release.Name }}
  namespace: {{ .Release.Namespace | default "default" }}
  labels: {{ include "mychart.labels" . | indent 2 }}
data:
```

:::

<br />

### 客户端常用命令

::: details （1）安装时优先使用命令行显式传递的值

```bash
# 创建chart
[root@node-1 ~]# helm create mychart

# 安装chart，使用set覆盖values.yaml文件中的值
[root@node-1 ~]# helm install demo mychart --set replicaCount=3

# 查看Pod数量
[root@node-1 ~]# kubectl get pods -o wide
NAME                          READY   STATUS    RESTARTS   AGE   IP               NODE     NOMINATED NODE   READINESS GATES
demo-mychart-8fccf9c8-67d92   1/1     Running   0          9s    10.100.217.104   node-4   <none>           <none>
demo-mychart-8fccf9c8-6xgn8   1/1     Running   0          9s    10.100.217.102   node-4   <none>           <none>
demo-mychart-8fccf9c8-xc6ck   1/1     Running   0          9s    10.100.217.103   node-4   <none>           <none>
```

:::

::: details （2）添加/更新和删除仓库

```bash
# 添加仓库
[root@node-1 ~]# helm repo add gitlab http://charts.gitlab.io/
"gitlab" has been added to your repositories

# 查看仓库列表
[root@node-1 ~]# helm repo list
NAME    URL                     
gitlab  http://charts.gitlab.io/

# 删除仓库
[root@node-1 ~]# helm repo remove gitlab
"gitlab" has been removed from your repositories

# 更新仓库
[root@node-1 ~]# helm repo update
Hang tight while we grab the latest from your chart repositories...
...Successfully got an update from the "gitlab" chart repository
Update Complete. ⎈Happy Helming!⎈
```

:::

::: details （3）拉取Chart编辑后再进行安装

```bash
# 安装ES官方源
[root@node-1 ~]# helm repo add elastic https://helm.elastic.co
"elastic" has been added to your repositories

# 拉取指定版本的Chart并解压
[root@node-1 ~]# helm pull elastic/elasticsearch --version 8.5.1 --untar

# 查看
[root@node-1 ~]# ls -l elasticsearch/
total 76
-rw-r--r--  1 root root   339 Jan 20 16:01 Chart.yaml
drwxr-xr-x 14 root root   211 Jan 20 16:01 examples
-rw-r--r--  1 root root    29 Jan 20 16:01 Makefile
-rw-r--r--  1 root root 51906 Jan 20 16:01 README.md
drwxr-xr-x  3 root root  4096 Jan 20 16:01 templates
-rw-r--r--  1 root root  9581 Jan 20 16:01 values.yaml
```

:::

<br />

## Istio

文档：[https://istio.io/latest/zh/docs/](https://istio.io/latest/zh/docs/)

<br />

### 演示版本

::: details 点击查看详情

```bash
[root@node-1 ~]# istioctl version
client version: 1.16.2
control plane version: 1.16.2
data plane version: 1.16.2 (1 proxies)
```

:::

<br />

### Bookinfo应用：部署

文档：[https://istio.io/latest/zh/docs/examples/bookinfo/](https://istio.io/latest/zh/docs/examples/bookinfo/)

::: details （1）部署Bookinfo应用

**部署前记录信息**

```bash
# 查看Proxy个数，这里是1个
[root@node-1 ~]# istioctl version
client version: 1.16.2
control plane version: 1.16.2
data plane version: 1.16.2 (1 proxies)

# 查看Proxy列表，输出内容太多省略一部分列
[root@node-1 ~]# istioctl proxy-status
NAME                         CLUSTER        CDS        LDS       ISTIOD                      VERSION
istio-ingressgateway-xxx     Kubernetes     SYNCED     SYNCED    istiod-784bcfdd5d-mj66c     1.16.2

# 查看要部署的Deployment,重点关注containers，每个Deployment只包含一个容器
[root@node-1 ~]# cd istio-1.16.2
[root@node-1 istio-1.16.2]# vim samples/bookinfo/platform/kube/bookinfo.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: details-v1
  labels:
    app: details
    version: v1
spec:
  replicas: 1
  selector:
    matchLabels:
      app: details
      version: v1
  template:
    metadata:
      labels:
        app: details
        version: v1
    spec:
      serviceAccountName: bookinfo-details
      containers:
      - name: details
        image: docker.io/istio/examples-bookinfo-details-v1:1.17.0
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 9080
        securityContext:
          runAsUser: 1000
```

**部署**

```bash
# 为default命名空间打上标签 istio-injection=enabled，Istio会默认自动注入Sidecar
[root@node-1 istio-1.16.2]# kubectl label namespace default istio-injection=enabled

# 查看labels
[root@node-1 istio-1.16.2]# kubectl get ns default -o yaml | yq .metadata.labels
istio-injection: enabled
kubernetes.io/metadata.name: default

# 部署bookinfo应用
[root@node-1 istio-1.16.2]# kubectl apply -f samples/bookinfo/platform/kube/bookinfo.yaml
service/details created
serviceaccount/bookinfo-details created
deployment.apps/details-v1 created
service/ratings created
serviceaccount/bookinfo-ratings created
deployment.apps/ratings-v1 created
service/reviews created
serviceaccount/bookinfo-reviews created
deployment.apps/reviews-v1 created
deployment.apps/reviews-v2 created
deployment.apps/reviews-v3 created
service/productpage created
serviceaccount/bookinfo-productpage created
deployment.apps/productpage-v1 created

# 检查Pod是否已正常启动
[root@node-1 istio-1.16.2]# kubectl get pods
NAME                             READY   STATUS    RESTARTS   AGE
details-v1-5ffd6b64f7-d9w6z      2/2     Running   0          15s
productpage-v1-979d4d9fc-njr26   2/2     Running   0          15s
ratings-v1-5f9699cfdf-z8flq      2/2     Running   0          15s
reviews-v1-569db879f5-jqz76      2/2     Running   0          15s
reviews-v2-65c4dc6fdc-cbk6k      2/2     Running   0          15s
reviews-v3-c9c4fb987-55qht       2/2     Running   0          15s

# 在容器内执行命令验证某个应用是否正常
[root@node-1 istio-1.16.2]# kubectl exec -it $(kubectl get pod -l app=ratings -o jsonpath='{.items[0].metadata.name}') -c ratings -- curl productpage:9080/productpage | grep -o "<title>.*</title>"

<title>Simple Bookstore App</title>

# Service全部是ClusterIP类型，意味着在外部还不能直接访问服务
[root@node-1 istio-1.16.2]# kubectl get svc
NAME          TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE
details       ClusterIP   10.200.170.236   <none>        9080/TCP   5m34s
kubernetes    ClusterIP   10.200.0.1       <none>        443/TCP    27d
productpage   ClusterIP   10.200.86.64     <none>        9080/TCP   5m34s
ratings       ClusterIP   10.200.24.209    <none>        9080/TCP   5m34s
reviews       ClusterIP   10.200.136.49    <none>        9080/TCP   5m34s
```

**部署前后对比**

```bash
# Proxy数量变成了7个
[root@node-1 istio-1.16.2]# istioctl version
client version: 1.16.2
control plane version: 1.16.2
data plane version: 1.16.2 (7 proxies)

# 查看Proxy列表，输出内容太多省略一部分列
[root@node-1 istio-1.16.2]# istioctl proxy-status
NAME                                               CLUSTER        ISTIOD                      VERSION
details-v1-5ffd6b64f7-d9w6z.default                Kubernetes     istiod-784bcfdd5d-mj66c     1.16.2
istio-ingressgateway-6cc5d8b655-t6h9d.istio-system Kubernetes     istiod-784bcfdd5d-mj66c     1.16.2
productpage-v1-979d4d9fc-njr26.default             Kubernetes     istiod-784bcfdd5d-mj66c     1.16.2
ratings-v1-5f9699cfdf-z8flq.default                Kubernetes     istiod-784bcfdd5d-mj66c     1.16.2
reviews-v1-569db879f5-jqz76.default                Kubernetes     istiod-784bcfdd5d-mj66c     1.16.2
reviews-v2-65c4dc6fdc-cbk6k.default                Kubernetes     istiod-784bcfdd5d-mj66c     1.16.2
reviews-v3-c9c4fb987-55qht.default                 Kubernetes     istiod-784bcfdd5d-mj66c     1.16.2

# ----------------------------------------------------------------------------------------------------

# 查看Pods,注意所有的READY都是2，意味着每个Pod中都包含两个容器,意味着istio自动注入是成功的
[root@node-1 istio-1.16.2]# kubectl get pods
NAME                             READY   STATUS    RESTARTS   AGE
details-v1-5ffd6b64f7-d9w6z      2/2     Running   0          51s
productpage-v1-979d4d9fc-njr26   2/2     Running   0          51s
ratings-v1-5f9699cfdf-z8flq      2/2     Running   0          51s
reviews-v1-569db879f5-jqz76      2/2     Running   0          51s
reviews-v2-65c4dc6fdc-cbk6k      2/2     Running   0          51s
reviews-v3-c9c4fb987-55qht       2/2     Running   0          51s

# 查看Pod中的容器名称和镜像
[root@node-1 istio-1.16.2]# kubectl get pod details-v1-5ffd6b64f7-lccmd -o yaml | yq '.spec.containers[] | {.name: .image}'
details: docker.io/istio/examples-bookinfo-details-v1:1.17.0
istio-proxy: docker.io/istio/proxyv2:1.16.2
```

:::

::: details （2）外部访问Bookinfo应用：使用 Gateway API（Gateway API需要额外安装，以后再补充）

:::

::: details （3）外部访问Bookinfo应用：使用 Istio Gateway

```bash
# 创建Gateway
[root@node-1 istio-1.16.2]# kubectl apply -f samples/bookinfo/networking/bookinfo-gateway.yaml
gateway.networking.istio.io/bookinfo-gateway created
virtualservice.networking.istio.io/bookinfo created

# 查看Gateway
[root@node-1 istio-1.16.2]# kubectl get gateway
NAME               AGE
bookinfo-gateway   12s

# 确定 Ingress IP 和端口
# 如果 EXTERNAL-IP 值已设置，说明环境正在使用外部负载均衡，可以用其为 Ingress Gateway 提供服务。
# 如果 EXTERNAL-IP 值为 <none> （或持续显示<pending>），说明环境没有为 Ingress Gateway 提供外部负载均衡，无法使用 Ingress Gateway
# 在这种情况下，您可以使用服务的 Node Port 访问网关
[root@node-1 istio-1.16.2]# kubectl -n istio-system get svc istio-ingressgateway
NAME                   TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)                                      AGE
istio-ingressgateway   LoadBalancer   10.200.78.163   <pending>     15021:32313/TCP,80:30053/TCP,443:30511/TCP   19h

# ------------------------------------------------------------------------------------------------------------------

# 使用NodePort方式访问网关

# Ingress HTTP Port
[root@node-1 istio-1.16.2]# kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="http2")].nodePort}' ; echo
30053

# Ingress HTTPS Port
[root@node-1 istio-1.16.2]# kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="https")].nodePort}' ; echo
30511

# Ingress TCP Port(输出为空)
[root@node-1 istio-1.16.2]# kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="tcp")].nodePort}' ; echo

# Ingress Host
[root@node-1 istio-1.16.2]# kubectl -n istio-system get po -l istio=ingressgateway -o jsonpath='{.items[0].status.hostIP}' ; echo
192.168.48.154
```

![image-20230209125715425](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230209125715425.png)

:::

::: details （4）Istio Gateway：定义服务版本

```bash
# 先查看一下，是空的
[root@node-1 istio-1.16.2]# kubectl get destinationrules 
No resources found in default namespace.

# 部署
[root@node-1 istio-1.16.2]# kubectl apply -f samples/bookinfo/networking/destination-rule-all.yaml
destinationrule.networking.istio.io/productpage created
destinationrule.networking.istio.io/reviews created
destinationrule.networking.istio.io/ratings created
destinationrule.networking.istio.io/details created

# 再次查看
[root@node-1 istio-1.16.2]# kubectl get destinationrules 
NAME          HOST          AGE
details       details       2s
productpage   productpage   2s
ratings       ratings       2s
reviews       reviews       2s
```

:::

<br />

### Bookinfo应用：可观察性

文档：[https://istio.io/latest/zh/docs/tasks/observability/](https://istio.io/latest/zh/docs/tasks/observability/)

::: details （1）集成Prometheus

```bash
# 部署
[root@node-1 ~]# kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.16/samples/addons/prometheus.yaml

# 查看Pod
[root@node-1 ~]# kubectl -n istio-system get pods
NAME                                    READY   STATUS    RESTARTS        AGE
istio-ingressgateway-6cc5d8b655-t6h9d   1/1     Running   2 (5h44m ago)   23h
istiod-784bcfdd5d-mj66c                 1/1     Running   2 (5h44m ago)   23h
prometheus-85949fddb-r9bjv              2/2     Running   0               3m
```

:::

::: details （2）网格可视化

文档：[https://istio.io/latest/zh/docs/tasks/observability/kiali/](https://istio.io/latest/zh/docs/tasks/observability/kiali/)

**注意：需要先集成Prometheus插件，否则overview页面会报错**

```bash
# 安装Kiali
[root@node-1 ~]# kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.16/samples/addons/kiali.yaml

serviceaccount/kiali created
configmap/kiali created
clusterrole.rbac.authorization.k8s.io/kiali-viewer created
clusterrole.rbac.authorization.k8s.io/kiali created
clusterrolebinding.rbac.authorization.k8s.io/kiali created
role.rbac.authorization.k8s.io/kiali-controlplane created
rolebinding.rbac.authorization.k8s.io/kiali-controlplane created
service/kiali created
deployment.apps/kiali created

# 查看Pod
[root@node-1 ~]# kubectl -n istio-system get pods
NAME                                    READY   STATUS    RESTARTS        AGE
istio-ingressgateway-6cc5d8b655-t6h9d   1/1     Running   2 (4h18m ago)   21h
istiod-784bcfdd5d-mj66c                 1/1     Running   2 (4h17m ago)   21h
kiali-849958788-8dqxj                   1/1     Running   0               40s

# 查看Service
[root@node-1 ~]# kubectl -n istio-system get svc kiali
NAME    TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)              AGE
kiali   ClusterIP   10.200.20.232   <none>        20001/TCP,9090/TCP   52s

# 启动kiali dashboard
[root@node-1 ~]# istioctl dashboard kiali --address=192.168.48.151
http://192.168.48.151:20001/kiali
Failed to open browser; open http://192.168.48.151:20001/kiali in your browser.

# 写段Shell命令持续发送请求，这样kiali才能将流量可视化
[root@node-1 ~]# while true ; do curl -I http://192.168.48.154:30053/productpage ; sleep 1; done
```

**服务调用关系：**

![image-20230209162052106](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230209162052106.png)

**服务版本之间的调用关系**

![image-20230209162329377](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230209162329377.png)

:::

<br />

### Bookinfo应用：流量管理

文档：[https://istio.io/latest/zh/docs/tasks/traffic-management/](https://istio.io/latest/zh/docs/tasks/traffic-management/)

::: details （1）配置请求路由：

:::
