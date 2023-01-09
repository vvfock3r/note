# Kubernetes

官方文档：[https://kubernetes.io/zh-cn/docs/home/](https://kubernetes.io/zh-cn/docs/home/)

API文档：[https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/)

Github：[https://github.com/kubernetes/kubernetes](https://github.com/kubernetes/kubernetes)



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
[root@node-1 ~]# kubectl run nginx --image=nginx:latest
pod/nginx created

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
  fat.ini: |
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
DEBUG = true
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

### Cluster AutoScaler - Node弹性伸缩

阿里云：[https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler/cloudprovider/alicloud](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler/cloudprovider/alicloud)

腾讯云：[https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler/cloudprovider/tencentcloud](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler/cloudprovider/tencentcloud)

<br />

### HPA - Pod个数弹性伸缩

文档：[https://kubernetes.io/zh-cn/docs/tasks/run-application/horizontal-pod-autoscale/](https://kubernetes.io/zh-cn/docs/tasks/run-application/horizontal-pod-autoscale/)

::: details  创建一个简单的Web应用

```bash
# 创建YAML文件
[root@node-1 ~]# cat > demo.yml <<EOF
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
        image: nginx:1.23
        resources: 
           requests:          # HPA会将这里的值作为总量与当前Pod使用量进行计算得到百分比，来判断是否需要扩容或缩容
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
[root@node-1 ~]# kubectl apply -f demo.yml

# 查看Pod
[root@node-1 ~]# kubectl get pods
NAME                    READY   STATUS    RESTARTS   AGE
demo-78d8864777-2fbcf   1/1     Running   0          4s
demo-78d8864777-nwphc   1/1     Running   0          4s
demo-78d8864777-q6n7g   1/1     Running   0          4s

# 查看Service
[root@node-1 ~]# kubectl get svc demo
NAME   TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)   AGE
demo   ClusterIP   10.233.140.171   <none>        80/TCP    20s

# 访问测试
[root@node-1 ~]# curl 10.233.140.171
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

# 看一下Pod的资源使用率
[root@node-1 ~]# kubectl top pod 
NAME                    CPU(cores)   MEMORY(bytes)   
demo-78d8864777-2fbcf   0m           3Mi             
demo-78d8864777-nwphc   0m           3Mi             
demo-78d8864777-q6n7g   0m           3Mi

# 看一下Deployment
[root@node-1 ~]# kubectl get pods
NAME                    READY   STATUS    RESTARTS   AGE
demo-78d8864777-7dmf5   1/1     Running   0          7m35s
demo-78d8864777-nwphc   1/1     Running   0          23m
[root@node-1 ~]# kubectl describe deployment
Name:                   demo
Namespace:              default
CreationTimestamp:      Wed, 24 Aug 2022 17:39:04 +0800
Labels:                 <none>
Annotations:            deployment.kubernetes.io/revision: 1
Selector:               app=web
Replicas:               2 desired | 2 updated | 2 total | 2 available | 0 unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        0
RollingUpdateStrategy:  25% max unavailable, 25% max surge
Pod Template:
  Labels:  app=web
  Containers:
   web:
    Image:      nginx:1.23
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
  Progressing    True    NewReplicaSetAvailable
  Available      True    MinimumReplicasAvailable
OldReplicaSets:  <none>
NewReplicaSet:   demo-78d8864777 (2/2 replicas created)
Events:
  Type    Reason             Age    From                   Message
  ----    ------             ----   ----                   -------
  Normal  ScalingReplicaSet  24m    deployment-controller  Scaled up replica set demo-78d8864777 to 3
  Normal  ScalingReplicaSet  13m    deployment-controller  Scaled down replica set demo-78d8864777 to 1
  Normal  ScalingReplicaSet  7m44s  deployment-controller  Scaled up replica set demo-78d8864777 to 4
```

:::

::: details  （1）基于CPU的弹性伸缩：HPA v1版本  -- 详细演示版本

```bash
# 创建YAML文件
[root@node-1 ~]# cat > hpa-v1-cpu.yaml <<EOF
apiVersion: autoscaling/v1
kind: HorizontalPodAutoscaler
metadata:
  name: demo-hpa
spec:
  minReplicas: 1     # 允许缩容到的最小副本数
  maxReplicas: 5     # 允许缩容到的最小副本数
  scaleTargetRef:    # 目标资源, 表示当前要伸缩对象是谁
    apiVersion: apps/v1
    kind: Deployment
    name: demo
  targetCPUUtilizationPercentage: 60  # 当整体的资源利用率超过60%的时候，会进行扩容
EOF

# 部署
[root@node-1 ~]# kubectl apply -f hpa-v1-cpu.yaml

# 查看HPA
[root@node-1 ~]# kubectl get hpa
NAME       REFERENCE         TARGETS   MINPODS   MAXPODS   REPLICAS   AGE
demo-hpa   Deployment/demo   0%/60%    1         5         3          116s


# 部署完成后等待5.6分钟，我们可以先测试HPA的缩容，看看会不会缩容到1个Pod
[root@node-1 ~]# kubectl get pods
NAME                    READY   STATUS    RESTARTS   AGE
demo-78d8864777-nwphc   1/1     Running   0          12m   # 缩容到1个了

# 看一下HPA事件
[root@node-1 ~]# kubectl describe hpa demo-hpa
Warning: autoscaling/v2beta2 HorizontalPodAutoscaler is deprecated in v1.23+, unavailable in v1.26+; use autoscaling/v2 HorizontalPodAutoscaler
Name:                                                  demo-hpa
Namespace:                                             default
Labels:                                                <none>
Annotations:                                           <none>
CreationTimestamp:                                     Wed, 24 Aug 2022 17:43:55 +0800
Reference:                                             Deployment/demo
Metrics:                                               ( current / target )
  resource cpu on pods  (as a percentage of request):  0% (0) / 60%
Min replicas:                                          1
Max replicas:                                          5
Deployment pods:                                       1 current / 1 desired
Conditions:
  Type            Status  Reason            Message
  ----            ------  ------            -------
  AbleToScale     True    ReadyForNewScale  recommended size matches current size
  ScalingActive   True    ValidMetricFound  the HPA was able to successfully calculate a replica count from cpu resource utilization (percentage of request)
  ScalingLimited  True    TooFewReplicas    the desired replica count is less than the minimum replica count
Events:
  Type    Reason             Age    From                       Message
  ----    ------             ----   ----                       -------
  Normal  SuccessfulRescale  3m31s  horizontal-pod-autoscaler  New size: 1; reason: All metrics below target # 缩容到1个Pod
  
# 接下来测试一下扩容
[root@node-1 ~]# yum -y install httpd-tools
[root@node-1 ~]# ab -n 100000 -c 100 http://10.233.140.171/

# CPU已经使用到了234%
[root@node-1 ~]# kubectl get hpa
NAME       REFERENCE         TARGETS    MINPODS   MAXPODS   REPLICAS   AGE
demo-hpa   Deployment/demo   234%/60%   1         5         1          11m

# 扩容到了4个
[root@node-1 ~]# kubectl get pods
NAME                    READY   STATUS    RESTARTS   AGE
demo-78d8864777-7dmf5   1/1     Running   0          91s
demo-78d8864777-j7n7p   1/1     Running   0          91s
demo-78d8864777-nwphc   1/1     Running   0          17m
demo-78d8864777-xzjrj   1/1     Running   0          91s

[root@node-1 ~]# kubectl describe hpa demo-hpa
Warning: autoscaling/v2beta2 HorizontalPodAutoscaler is deprecated in v1.23+, unavailable in v1.26+; use autoscaling/v2 HorizontalPodAutoscaler
Name:                                                  demo-hpa
Namespace:                                             default
Labels:                                                <none>
Annotations:                                           <none>
CreationTimestamp:                                     Wed, 24 Aug 2022 17:43:55 +0800
Reference:                                             Deployment/demo
Metrics:                                               ( current / target )
  resource cpu on pods  (as a percentage of request):  19% (19m) / 60%
Min replicas:                                          1
Max replicas:                                          5
Deployment pods:                                       4 current / 4 desired
Conditions:
  Type            Status  Reason               Message
  ----            ------  ------               -------
  AbleToScale     True    ScaleDownStabilized  recent recommendations were higher than current one, applying the highest recent recommendation
  ScalingActive   True    ValidMetricFound     the HPA was able to successfully calculate a replica count from cpu resource utilization (percentage of request)
  ScalingLimited  False   DesiredWithinRange   the desired count is within the acceptable range
Events:
  Type    Reason             Age   From                       Message
  ----    ------             ----  ----                       -------
  Normal  SuccessfulRescale  10m   horizontal-pod-autoscaler  New size: 1; reason: All metrics below target
  Normal  SuccessfulRescale  4m7s  horizontal-pod-autoscaler  New size: 4; reason: cpu resource utilization (percentage of request) above target  # 扩容到4个
  
[root@node-1 ~]# kubectl get hpa
NAME       REFERENCE         TARGETS   MINPODS   MAXPODS   REPLICAS   AGE
demo-hpa   Deployment/demo   13%/60%   1         5         4          13m

[root@node-1 ~]# kubectl top pod
NAME                    CPU(cores)   MEMORY(bytes)   
demo-78d8864777-7dmf5   27m          3Mi             
demo-78d8864777-j7n7p   14m          3Mi             
demo-78d8864777-nwphc   24m          3Mi             
demo-78d8864777-xzjrj   14m          3Mi
```

:::

::: details  （2）基于CPU的弹性伸缩：HPA v2版本

```bash
# 创建YAML文件
[root@node-1 ~]# cat > hpa-v2-cpu.yaml <<EOF
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:  
  name: demo-hpa
  namespace: default
spec:
  minReplicas: 1
  maxReplicas: 5
  metrics:
  - resource:
      name: cpu
      target:
        averageUtilization: 60
        type: Utilization
    type: Resource
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: demo
EOF

# 部署
[root@node-1 ~]# kubectl apply -f hpa-v2-cpu.yaml
```

:::

::: details  （3）基于CPU的弹性伸缩：使用kubectl autoscale命令创建HPA

```bash
[root@node-1 ~]# kubectl autoscale deployment demo --name demo-hpa --cpu-percent=60 --min=1 --max=5
```

:::

<br />

### VPA - Pod配置弹性伸缩

Github：[https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler)

::: details  （1）基础测试

```bash
# 创建YAML文件
[root@node-1 ~]# cat > demo.yml <<EOF
---
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
  name: demo-vpa
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
[root@node-1 ~]# kubectl apply -f demo.yml
deployment.apps/demo created
verticalpodautoscaler.autoscaling.k8s.io/demo-vpa created

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

### 用户分类

**概述**

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

### 服务账号

以下三个独立组件协作完成服务账号相关的自动化：

- `ServiceAccount` 准入控制器
- `Token `控制器
- `ServiceAccount` 控制器

::: details  （1）默认的ServiceAccount账号：default

```bash
# (1) 获取当前命名空间下的服务账号
[root@node-1 ~]# kubectl get sa
NAME      SECRETS   AGE
default   0         63d

# 查看详情，这里看到它是ServiceAccount
[root@node-1 ~]# kubectl get sa default -o yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  creationTimestamp: "2022-08-22T12:38:32Z"
  name: default
  namespace: default
  resourceVersion: "254"
  uid: 3a35a907-1b29-4259-841d-571dbe5adb8c
  
# (2) 当新建Namespace时会自动创建服务账号  
# 创建一个新的命名空间
[root@node-1 ~]# kubectl create namespace demo
namespace/demo created
[root@node-1 ~]# kubectl create namespace demo
Error from server (AlreadyExists): namespaces "demo" already exists

# 我们发现自动创建了一个ServiceAccount
[root@node-1 ~]# kubectl -n demo get sa
NAME      SECRETS   AGE
default   0         24s

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
[root@node-1 ~]# kubectl exec -it pod-1 -- sh
/ # ls -l /var/run/secrets/kubernetes.io/serviceaccount/
total 0
lrwxrwxrwx    1 root     root  13 Oct 27 06:54 ca.crt -> ..data/ca.crt       # 根证书
lrwxrwxrwx    1 root     root  16 Oct 27 06:54 namespace -> ..data/namespace # 识这个service-account-token的作用域空间
lrwxrwxrwx    1 root     root  12 Oct 27 06:54 token -> ..data/token         # 使用API Server私钥签名的JWT，用于访问API Server时验证
```

（5）每个命名空间下的default服务账号自动化工作由ServiceAccount控制器来完成

![image-20221025103255863](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221025103255863.png)

（6）xxx自动化工作由ServiceAccount准入控制器来完成

```bash
# disable-admission-plugins标志接受一个（以逗号分隔的）准入控制插件列表，用于开启准入控制器
[root@node-1 ~]# cat /etc/systemd/system/kube-apiserver.service | \
                             grep -i 'enable-admission-plugins' | \
                             grep -i ServiceAccount
  --enable-admission-plugins=NamespaceLifecycle,NodeRestriction,LimitRanger,ServiceAccount,DefaultStorageClass,ResourceQuota \
  
# disable-admission-plugins 标志，会将传入的（以逗号分隔的） 准入控制插件列表禁用，即使是默认启用的插件也会被禁用
```

:::

::: details  （2）创建自定义ServiceAccount账号（报错了~）

```bash
apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-service-account
  namespace: default
---
apiVersion: v1
kind: Secret
type: kubernetes.io/service-account-token
metadata:
  name: my-service-account
  namespace: default
  annotations:
    kubernetes.io/service-account.name: "my-service-account"
---
apiVersion: v1
kind: Pod
metadata:
  name: pod-1
  namespace: demo
  labels:
    app: pod-1
spec:
  serviceAccountName: my-service-account
  containers:
  - name: pod-1-busybox
    image: busybox:1.28
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
```

:::

<br />

### 普通用户

我们以`kubectl`客户端所使用的用户来讲解

```bash
# 查看默认的kubectl配置，此输出的内容等同于~/.kube/config，不同之处在于对一些私密的数据进行了隐藏显示
[root@node-1 k8s]# kubectl config view
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: DATA+OMITTED
    server: https://127.0.0.1:6443
  name: kubernetes
contexts:
- context:
    cluster: kubernetes
    user: admin
  name: default
current-context: default
kind: Config
preferences: {}
users:
- name: admin
  user:
    client-certificate-data: REDACTED
    client-key-data: REDACTED

# 说明
clusters		集群列表
users			用户列表
contexts		kubelet的可用上下文列表，由用户列表中的某特定用户名称和集群列表中的某特定集群名称组合而成。
current-context	kubelet当前使用的上下文名称，即上下文列表中的某个特定项

可以看到所使用的用户是admin
```

