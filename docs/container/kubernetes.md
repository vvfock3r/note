# Kubernetes

官方文档：[https://kubernetes.io/zh-cn/docs/home/](https://kubernetes.io/zh-cn/docs/home/)

API文档：[https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/)



## 核心组件

文档：[https://kubernetes.io/zh-cn/docs/concepts/overview/components/](https://kubernetes.io/zh-cn/docs/concepts/overview/components/)

**控制平面组件（Control Plane Components）**

| 名称                      | 说明                                                         |
| ------------------------- | ------------------------------------------------------------ |
| `kube-apiserver`          | 集群入口，以`RESTful API`提供接口服务，所有资源的增删改查都会提交给`kube-apiserver` |
| `kube-scheduler`          | `Pod`调度器                                                  |
| `kube-controller-manager` | 控制器管理器，一个资源对应一个控制器，`kube-controller-manager`就是管理这些控制器的 |
| `etcd`                    | 兼顾一致性与高可用性的键值数据库，作为保存 Kubernetes 所有集群数据的后台数据库<br />只有``kube-apiserver``会向`etcd`写入/查询数据 |

**Node 组件**

| 名称                            | 说明                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| `kubelet`                       | Agent，在集群中每个节点（node)上运行，管理本地容器的生命周期，比如创建容器、挂载数据卷、销毁容器等 |
| `kube-proxy`                    | 网络代理，在集群中每个节点（node)上运行，负责集群内部或外部的网络会话与 Pod 进行网络通信 |
| 容器运行时（Container Runtime） | 比如`Docker`（目前已经不支持）、`Containerd`、`CRI-O`等      |



## 演示版本

```bash
# 两个Master同时也是Node节点
# 容器运行时使用Containerd
[root@node0 ~]# kubectl get node
NAME    STATUS   ROLES                  AGE     VERSION
node0   Ready    control-plane,master   3d13h   v1.23.7
node1   Ready    control-plane,master   3d13h   v1.23.7
node2   Ready    <none>                 3d13h   v1.23.7

# 版本
[root@node0 ~]# kubectl version -o yaml
clientVersion:
  buildDate: "2022-05-24T12:30:55Z"
  compiler: gc
  gitCommit: 42c05a547468804b2053ecf60a3bd15560362fc2
  gitTreeState: clean
  gitVersion: v1.23.7
  goVersion: go1.17.10
  major: "1"
  minor: "23"
  platform: linux/amd64
serverVersion:
  buildDate: "2022-05-24T12:24:41Z"
  compiler: gc
  gitCommit: 42c05a547468804b2053ecf60a3bd15560362fc2
  gitTreeState: clean
  gitVersion: v1.23.7
  goVersion: go1.17.10
  major: "1"
  minor: "23"
  platform: linux/amd64
```



## Pod

文档1：[https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/](https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/)

文档2：[https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/](https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/)



**Pod特性：**

* Pod是K8S最小的部署单元，是一组容器的集合

* 同一Pod中的容器共享**网络**和**存储**资源
* 同一Pod中的容器总是部署在同一个Node上



**Pod UID**

Kubernetes集群的整个生命周期中创建的每个对象都有一个不同的`uid`，Pod也不例外，可以通过如下命令来查看

```bash
[root@node0 k8s]# kubectl get pod demo -o json | grep -i uid
        "uid": "05b1bc5d-379a-45cf-b2d6-77642b08bcb1"
```



<br />

### 创建Pod

::: details 点击查看详情

```bash
# 生成yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: v1           # API版本
kind: Pod                # 类型为Pod
metadata:                # 指定元数据
  name: pod-1            # Pod名称
  namespace: default     # 命名空间，默认为default
  labels:                # 指定标签
    app: pod-1			 # 
spec:
  containers:            # 指定容器
  - name: pod-1-busybox  # 容器名称
    image: busybox:1.28
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
EOF

# 创建Pod
[root@node0 k8s]# kubectl apply -f demo.yml 
pod/pod-1 created
```

:::

<br />

### 查看Pod

::: details Pod和命名空间

```bash
# 查看默认命名空间下的Pod（等同于kubectl get pods -n default）
[root@node0 k8s]# kubectl get pods
NAME    READY   STATUS    RESTARTS   AGE
pod-1   1/1     Running   0          3m28s

# 查看所有命名空间下的Pod
[root@node0 k8s]# kubectl get pods -A
NAMESPACE       NAME                                          READY   STATUS    RESTARTS       AGE
default         pod-1                                         1/1     Running   0              4m56s
ingress-nginx   ingress-nginx-controller-hs8ld                1/1     Running   2 (42m ago)    11h
ingress-nginx   ingress-nginx-controller-k6qzm                1/1     Running   3 (41m ago)    11h
ingress-nginx   ingress-nginx-controller-kcggb                1/1     Running   2 (42m ago)    11h
kube-system     calico-kube-controllers-6dd874f784-wxf8q      1/1     Running   2 (43m ago)    11h
kube-system     calico-node-krtfp                             1/1     Running   2 (42m ago)    11h
kube-system     calico-node-sn44p                             1/1     Running   2 (42m ago)    11h
kube-system     calico-node-vfzzd                             1/1     Running   2 (43m ago)    11h
kube-system     coredns-76b4fb4578-5jkmj                      1/1     Running   6 (27m ago)    11h
kube-system     coredns-76b4fb4578-75bdd                      1/1     Running   8 (30m ago)    11h
kube-system     dns-autoscaler-7979fb6659-5597v               1/1     Running   2 (42m ago)    11h
kube-system     kube-apiserver-node0                          1/1     Running   3 (42m ago)    11h
kube-system     kube-apiserver-node1                          1/1     Running   3 (42m ago)    11h
kube-system     kube-controller-manager-node0                 1/1     Running   4 (42m ago)    11h
kube-system     kube-controller-manager-node1                 1/1     Running   3 (42m ago)    11h
kube-system     kube-proxy-fh2wf                              1/1     Running   2 (43m ago)    11h
kube-system     kube-proxy-znqrr                              1/1     Running   2 (42m ago)    11h
kube-system     kube-proxy-znvz6                              1/1     Running   2 (42m ago)    11h
kube-system     kube-scheduler-node0                          1/1     Running   4 (42m ago)    11h
kube-system     kube-scheduler-node1                          1/1     Running   4 (42m ago)    11h
kube-system     kubernetes-dashboard-584bfbb648-6k96s         1/1     Running   3 (41m ago)    11h
kube-system     kubernetes-metrics-scraper-5dc755864d-glpwt   1/1     Running   2 (43m ago)    11h
kube-system     metrics-server-749474f899-szbn5               1/1     Running   3 (42m ago)    11h
kube-system     nginx-proxy-node2                             1/1     Running   2 (43m ago)    11h
kube-system     nodelocaldns-cmzbt                            1/1     Running   4 (33m ago)    11h
kube-system     nodelocaldns-gkgh9                            1/1     Running   11 (30m ago)   11h
kube-system     nodelocaldns-m2zvj                            1/1     Running   2 (43m ago)    11h
```

:::

::: details 查看Pod详情

```bash
# 输出内容比较简单
[root@node0 k8s]# kubectl get pods
NAME    READY   STATUS    RESTARTS   AGE
pod-1   1/1     Running   0          24m

# 输出Pod IP和所属Node节点以及其他信息
[root@node0 k8s]# kubectl get pods -o wide
NAME    READY   STATUS    RESTARTS   AGE   IP             NODE    NOMINATED NODE   READINESS GATES
pod-1   1/1     Running   0          23m   10.233.44.14   node2   <none>           <none>

# 在Node2上看一下容器
[root@node2 ~]# crictl ps
CONTAINER       IMAGE           CREATED         STATE       NAME                ATTEMPT     POD ID
39bde5bbac45e   8c811b4aec35f   24 minutes ago  Running     pod-1-busybox       0           6143f353b06c8

# 输出更详细的信息-方式1
[root@node0 k8s]# kubectl get pod pod-1 -o json
{
    "apiVersion": "v1",
    "kind": "Pod",
    "metadata": {
        "annotations": {
            "cni.projectcalico.org/containerID": "6143f353b06c8b0f3c56b6d9c9965b73aa465b0aa9b6636f32550178e1dc7d99",
            "cni.projectcalico.org/podIP": "10.233.44.14/32",
            "cni.projectcalico.org/podIPs": "10.233.44.14/32",
            "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"v1\",\"kind\":\"Pod\",\"metadata\":{\"annotations\":{},\"labels\":{\"app\":\"pod-1\"},\"name\":\"pod-1\",\"namespace\":\"default\"},\"spec\":{\"containers\":[{\"command\":[\"sh\",\"-c\",\"echo The app is running! \\u0026\\u0026 sleep 3600\"],\"image\":\"busybox:1.28\",\"name\":\"pod-1-busybox\"}]}}\n"
        },
        "creationTimestamp": "2022-06-11T22:17:52Z",
        "labels": {
            "app": "pod-1"
        },
        "name": "pod-1",
        "namespace": "default",
        "resourceVersion": "12974",
        "uid": "37efd0b5-982b-42ec-a767-82e33504ed37"
    },
    "spec": {
        "containers": [
            {
                "command": [
                    "sh",
                    "-c",
                    "echo The app is running! \u0026\u0026 sleep 3600"
                ],
                "image": "busybox:1.28",
                "imagePullPolicy": "IfNotPresent",
                "name": "pod-1-busybox",
                "resources": {},
                "terminationMessagePath": "/dev/termination-log",
                "terminationMessagePolicy": "File",
                "volumeMounts": [
                    {
                        "mountPath": "/var/run/secrets/kubernetes.io/serviceaccount",
                        "name": "kube-api-access-kdqdc",
                        "readOnly": true
                    }
                ]
            }
        ],
        "dnsPolicy": "ClusterFirst",
        "enableServiceLinks": true,
        "nodeName": "node2",
        "preemptionPolicy": "PreemptLowerPriority",
        "priority": 0,
        "restartPolicy": "Always",
        "schedulerName": "default-scheduler",
        "securityContext": {},
        "serviceAccount": "default",
        "serviceAccountName": "default",
        "terminationGracePeriodSeconds": 30,
        "tolerations": [
            {
                "effect": "NoExecute",
                "key": "node.kubernetes.io/not-ready",
                "operator": "Exists",
                "tolerationSeconds": 300
            },
            {
                "effect": "NoExecute",
                "key": "node.kubernetes.io/unreachable",
                "operator": "Exists",
                "tolerationSeconds": 300
            }
        ],
        "volumes": [
            {
                "name": "kube-api-access-kdqdc",
                "projected": {
                    "defaultMode": 420,
                    "sources": [
                        {
                            "serviceAccountToken": {
                                "expirationSeconds": 3607,
                                "path": "token"
                            }
                        },
                        {
                            "configMap": {
                                "items": [
                                    {
                                        "key": "ca.crt",
                                        "path": "ca.crt"
                                    }
                                ],
                                "name": "kube-root-ca.crt"
                            }
                        },
                        {
                            "downwardAPI": {
                                "items": [
                                    {
                                        "fieldRef": {
                                            "apiVersion": "v1",
                                            "fieldPath": "metadata.namespace"
                                        },
                                        "path": "namespace"
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ]
    },
    "status": {
        "conditions": [
            {
                "lastProbeTime": null,
                "lastTransitionTime": "2022-06-11T22:17:53Z",
                "status": "True",
                "type": "Initialized"
            },
            {
                "lastProbeTime": null,
                "lastTransitionTime": "2022-06-11T22:17:55Z",
                "status": "True",
                "type": "Ready"
            },
            {
                "lastProbeTime": null,
                "lastTransitionTime": "2022-06-11T22:17:55Z",
                "status": "True",
                "type": "ContainersReady"
            },
            {
                "lastProbeTime": null,
                "lastTransitionTime": "2022-06-11T22:17:52Z",
                "status": "True",
                "type": "PodScheduled"
            }
        ],
        "containerStatuses": [
            {
                "containerID": "containerd://39bde5bbac45e58e09d96c9dba9a97cfb5ee26e35d4a1c5ba47953d0bb08b6b2",
                "image": "docker.io/library/busybox:1.28",
                "imageID": "docker.io/library/busybox@sha256:141c253bc4c3fd0a201d32dc1f493bcf3fff003b6df416dea4f41046e0f37d47",
                "lastState": {},
                "name": "pod-1-busybox",
                "ready": true,
                "restartCount": 0,
                "started": true,
                "state": {
                    "running": {
                        "startedAt": "2022-06-11T22:17:54Z"
                    }
                }
            }
        ],
        "hostIP": "192.168.48.135",
        "phase": "Running",
        "podIP": "10.233.44.14",
        "podIPs": [
            {
                "ip": "10.233.44.14"
            }
        ],
        "qosClass": "BestEffort",
        "startTime": "2022-06-11T22:17:53Z"
    }
}

# 输出更详细的信息-方式2
[root@node0 k8s]# kubectl describe pod pod-1
Name:         pod-1
Namespace:    default
Priority:     0
Node:         node2/192.168.48.135
Start Time:   Sun, 12 Jun 2022 06:17:53 +0800
Labels:       app=pod-1
Annotations:  cni.projectcalico.org/containerID: 6143f353b06c8b0f3c56b6d9c9965b73aa465b0aa9b6636f32550178e1dc7d99
              cni.projectcalico.org/podIP: 10.233.44.14/32
              cni.projectcalico.org/podIPs: 10.233.44.14/32
Status:       Running
IP:           10.233.44.14
IPs:
  IP:  10.233.44.14
Containers:
  pod-1-busybox:
    Container ID:  containerd://39bde5bbac45e58e09d96c9dba9a97cfb5ee26e35d4a1c5ba47953d0bb08b6b2
    Image:         busybox:1.28
    Image ID:      docker.io/library/busybox@sha256:141c253bc4c3fd0a201d32dc1f493bcf3fff003b6df416dea4f41046e0f37d47
    Port:          <none>
    Host Port:     <none>
    Command:
      sh
      -c
      echo The app is running! && sleep 3600
    State:          Running
      Started:      Sun, 12 Jun 2022 06:17:54 +0800
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-kdqdc (ro)
Conditions:
  Type              Status
  Initialized       True 
  Ready             True 
  ContainersReady   True 
  PodScheduled      True 
Volumes:
  kube-api-access-kdqdc:
    Type:                    Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds:  3607
    ConfigMapName:           kube-root-ca.crt
    ConfigMapOptional:       <nil>
    DownwardAPI:             true
QoS Class:                   BestEffort
Node-Selectors:              <none>
Tolerations:                 node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                             node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type    Reason     Age   From               Message
  ----    ------     ----  ----               -------
  Normal  Scheduled  32m   default-scheduler  Successfully assigned default/pod-1 to node2
  Normal  Pulled     32m   kubelet            Container image "busybox:1.28" already present on machine
  Normal  Created    32m   kubelet            Created container pod-1-busybox
  Normal  Started    32m   kubelet            Started container pod-1-busybox
```

:::

::: details 通过yaml文件查看

```bash
[root@node0 k8s]# kubectl get -f demo.yml
[root@node0 k8s]# kubectl describe -f demo.yml
```

:::

<br />

### 删除Pod

::: details 点击查看详情

```bash
# 删除Pod方式1：直接删除Pod(默认命名空间下)
[root@node0 k8s]# kubectl delete pod pod-1
pod "pod-1" deleted

# 删除Pod方式2：根据yaml文件删除
[root@node0 k8s]# kubectl delete -f demo.yml 
pod "mypod" deleted
```

:::

<br />

### 资源限制

内存限制：[https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/assign-memory-resource/](https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/assign-memory-resource/)

CPU限制：[https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/assign-cpu-resource/](https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/assign-cpu-resource/)

若`Pod`未配置资源限制，同时`NameSpace`也没有配置资源限制（`limitrange`），则有可能会使用节点的所有资源

::: details 点击查看详情

```bash
# 生成yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: pod-resources
  labels:
    app: pod-resources
spec:
  containers:
  - name: pod-resources
    image: busybox:1.28
    command: ['sh', '-c', 'cat /dev/zero | gzip -9 > /dev/null']
    resources:
        limits:
            memory: "200Mi"
            cpu: "0.5"
        requests:
            memory: "100Mi"
            cpu: "0.1"
EOF

# 创建Pod
[root@node0 k8s]# kubectl apply -f demo.yml 
pod/pod-resources created

# 查看Pod资源限制
# CPU单位换算：1 CPU = 1000m CPU
[root@node0 k8s]# kubectl describe -f demo.yml
    Limits:
      cpu:     500m          
      memory:  200Mi
    Requests:
      cpu:        100m
      memory:     100Mi

# 查看Pod资源消耗
[root@node0 k8s]# kubectl top pod pod-resources
NAME            CPU(cores)   MEMORY(bytes)   
pod-resources   500m         0Mi
```

:::

<br />

### 变量注入

文档1：[https://kubernetes.io/zh-cn/docs/tasks/inject-data-application/](https://kubernetes.io/zh-cn/docs/tasks/inject-data-application/)

文档2：[https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/#envvar-v1-core](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/#envvar-v1-core)

![image-20220613081846919](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220613081846919.png)

![image-20220613081904820](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220613081904820.png)

::: details 直接定义变量、Pod字段作为变量值、Container字段作为变量值

```bash
# 创建yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: pod-env
  labels:
    app: pod-env
spec:
  containers:
  - name: pod-env
    image: busybox:1.28
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
            containerName: pod-env
            resource: limits.memory
EOF

# 创建Pod
[root@node0 k8s]# kubectl apply -f demo.yml 
pod/pod-env created

# 检查变量
[root@node0 k8s]# kubectl exec -it pod-env -- sh
/ # echo ${myName}
My name is vvfock3r
/ # echo ${myNode}
node2
/ # echo ${myMemoryLimit}
67108864
```

:::

> 并不是支持所有的Pod字段/Container字段作为变量值

<br />

### 重启策略

文档：[https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/pod-lifecycle/#restart-policy](https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/pod-lifecycle/#restart-policy)

默认值是`Always`

每次重启之间是有延迟的且时间不等，最长5分钟

::: details 点击查看详情

```bash
# 创建yaml文件
[root@node0 k8s]# vim demo.yml
apiVersion: v1
kind: Pod
metadata:
  name: demo
  labels:
    app: demo
spec:
  containers:
  - name: demo
    image: busybox:1.28
    command: ['sh', '-c']
    # 将每次启动时间写入持久化目录中
    args:
      - echo $(date +"%Y-%m-%d %H:%M:%S") >> /data/start.log &&
        exit 1
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
  nodeName: node2

# 创建Pod
[root@node0 k8s]# kubectl apply -f demo.yml 
pod/pod-env created

# 登录到node2机器，查看/data/start.log文件
# 可以看到，每次启动时间是有延迟的
[root@node2 ~]# cat -n /data/start.log 
     1  2022-06-13 03:01:20
     2  2022-06-13 03:01:20
     3  2022-06-13 03:01:34
     4  2022-06-13 03:02:05
     5  2022-06-13 03:02:51
     6  2022-06-13 03:04:18
```

:::

<br />

### 容器探针

文档1：[https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/pod-lifecycle/#container-probes](https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/pod-lifecycle/#container-probes)

文档2：[https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/](https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)

| 检查类型                               | 说明                                   | 若不提供该字段的默认值 | 若提供该字段                               | 若检查失败执行的动作                                         |
| -------------------------------------- | -------------------------------------- | ---------------------- | ------------------------------------------ | ------------------------------------------------------------ |
| **存活检查<br />（`livenessProbe`）**  | 检查容器是否正在运行                   | `Success`              | - - -                                      | `kubelet `会杀死容器<br />并根据其重启策略决定下一步操作     |
| **就绪检查<br />（`readinessProbe`）** | 检查容器是否准备好<br />为请求提供服务 | `Success`              | 初始状态为`Failure`                        | 检查失败会从service endpoints中删除该IP，检查成功则会把IP加进去 |
| **启动检查<br />（`startupProbe`）**   | 检查容器是否已经启动                   | `Success`              | 所有其他探针都会被禁用，直到此探针成功为止 | `kubelet `会杀死容器<br />并根据其重启策略决定下一步操作     |

::: details 点击查看详情

```bash
# 创建yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: demo
  labels:
    app: demo
spec:
  containers:
  - name: demo
    image: busybox:1.28
    command: ['sh', '-c', 'touch /tmp/healthy && echo The app is running! && sleep 10 && rm -vf /tmp/healthy && sleep 3600']
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
[root@node0 k8s]# kubectl apply -f demo.yml 
pod/demo created

# 在容器运行10秒以后存活检查将失败，此时默认会重启重启
[root@node0 k8s]# kubectl describe pod demo
Events:
  Type     Reason     Age               From               Message
  ----     ------     ----              ----               -------
  Normal   Scheduled  34s               default-scheduler  Successfully assigned default/demo to node2
  Normal   Pulled     33s               kubelet            Container image "busybox:1.28" already present on machine
  Normal   Created    33s               kubelet            Created container demo
  Normal   Started    33s               kubelet            Started container demo
  Warning  Unhealthy  9s (x3 over 19s)  kubelet            Liveness probe failed: cat: can't open '/tmp/healthy': No such file or directory
  Normal   Killing    9s                kubelet            Container demo failed liveness probe, will be restarted
```

:::

<br />

### 调度策略

文档总览：[https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/](https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/)

`kube-scheduler`是默认的调度器，对每一个新创建的`Pod`或者是未被调度的`Pod`，`kube-scheduler`会选择一个最优的 Node 去运行这个`Pod`

<br />

#### 标签匹配 - nodeSelector

文档：[https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/assign-pod-node/#nodeselector](https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/assign-pod-node/#nodeselector)

nodeSelector会根据标签匹配合适的节点来调度Pod

::: details 点击查看详情

```bash
# 查看所有的节点
[root@node0 k8s]# kubectl get nodes
NAME    STATUS   ROLES                  AGE   VERSION
node0   Ready    control-plane,master   41h   v1.23.7
node1   Ready    control-plane,master   41h   v1.23.7
node2   Ready    <none>                 41h   v1.23.7

# 查看所有的节点的标签
[root@node0 k8s]# kubectl get nodes --show-labels
NAME    STATUS   ROLES                  AGE   VERSION   LABELS
node0   Ready    control-plane,master   41h   v1.23.7   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=node0,kubernetes.io/os=linux,node-role.kubernetes.io/control-plane=,node-role.kubernetes.io/master=,node.kubernetes.io/exclude-from-external-load-balancers=
node1   Ready    control-plane,master   41h   v1.23.7   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=node1,kubernetes.io/os=linux,node-role.kubernetes.io/control-plane=,node-role.kubernetes.io/master=,node.kubernetes.io/exclude-from-external-load-balancers=
node2   Ready    <none>                 41h   v1.23.7   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=node2,kubernetes.io/os=linux

# 给node0和node1打一个标签
[root@node0 k8s]# kubectl label node node1 diskType=ssd
node/node1 labeled

# 如果想删除标签，那么使用 <标签名->
[root@node0 k8s]# kubectl label node node1 diskType-
node/node0 unlabeled

# 生成yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: demo
  labels:
    app: demo
spec:
  containers:
  - name: demo
    image: busybox:1.28
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
  nodeSelector:
    diskType: ssd             # 选择diskType=ssd标签的节点
    kubernetes.io/os: linux   # 选择系统为linux标签的节点
EOF

# 创建Pod
[root@node0 k8s]# kubectl apply -f demo.yml 
pod/demo created

# 查看Pod调度在哪个Node上
[root@node0 k8s]# kubectl get pods -o wide
NAME   READY   STATUS    RESTARTS   AGE   IP              NODE    NOMINATED NODE   READINESS GATES
demo   1/1     Running   0          4s    10.233.154.17   node1   <none>           <none>
```

:::

<br />

#### 节点亲和性 - affinity.nodeAffinity

文档：[https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/assign-pod-node/#affinity-and-anti-affinity](https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/assign-pod-node/#affinity-and-anti-affinity)

`requiredDuringSchedulingIgnoredDuringExecution`：调度器只有在规则被满足的时候才能执行调度

`preferredDuringSchedulingIgnoredDuringExecution`：调度器会尝试寻找满足对应规则的节点。如果找不到匹配的节点，调度器仍然会调度该 Pod

```bash
# 先给3个节点分别打上标签,后面要用到
[root@node0 k8s]# kubectl label node node0 nodeName=node0
[root@node0 k8s]# kubectl label node node1 nodeName=node1
[root@node0 k8s]# kubectl label node node2 nodeName=node2
```

::: details （一）requiredDuringSchedulingIgnoredDuringExecution 基础示例

这是一个基础示例，只要节点同时满足以下两个条件即可被调度，不满足不调度

* 系统为linux
* 节点含有标签diskType=ssd

```yaml
# 生成yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: demo
  labels:
    app: demo
spec:
  containers:
  - name: demo
    image: busybox:1.28
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
[root@node0 k8s]# kubectl apply -f demo.yml 
pod/demo created

# 查看Pod调度在哪个Node上
[root@node0 k8s]# kubectl get pods -o wide
NAME   READY   STATUS    RESTARTS   AGE   IP              NODE    NOMINATED NODE   READINESS GATES
demo   1/1     Running   0          1s    10.233.154.22   node1   <none>           <none>
```

:::

::: details 若包含多个nodeSelectorTerms则只有最后一个生效，覆盖的关系

```yaml
# 生成yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: demo
  labels:
    app: demo
spec:
  containers:
  - name: demo
    image: busybox:1.28
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:

        nodeSelectorTerms:
          - matchExpressions:
            - key: nodeName
              operator: In
              values:
              - node0

        nodeSelectorTerms:
          - matchExpressions:
            - key: nodeName
              operator: In
              values:
              - node2

        nodeSelectorTerms:
          - matchExpressions:
            - key: nodeName
              operator: In
              values:
              - node1
EOF

# 创建Pod
[root@node0 k8s]# kubectl apply -f demo.yml 
pod/demo created

# 查看Pod调度在哪个Node上
[root@node0 k8s]# kubectl get pods -o wide
NAME   READY   STATUS    RESTARTS   AGE   IP              NODE    NOMINATED NODE   READINESS GATES
demo   1/1     Running   0          98s   10.233.154.23   node1   <none>           <none>
```

:::

::: details 同一nodeSelectorTerms下若包含多个matchExpressions只要满足一个即可被调度，或的关系

```yaml
# 生成yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: demo
  labels:
    app: demo
spec:
  containers:
  - name: demo
    image: busybox:1.28
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
            - key: nodeName
              operator: In
              values:
              - node0
          - matchExpressions:
            - key: nodeName
              operator: In
              values:
              - node999
EOF

# 创建Pod
[root@node0 k8s]# kubectl apply -f demo.yml 
pod/demo created

# 查看Pod调度在哪个Node上
[root@node0 k8s]# kubectl get pods -o wide
NAME   READY   STATUS    RESTARTS   AGE   IP             NODE    NOMINATED NODE   READINESS GATES
demo   1/1     Running   0          4s    10.233.30.24   node0   <none>           <none>
```

:::

::: details 同一matchExpressions下若包含多个key需要全部满足才可被调度，与的关系

```yaml
# 生成yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: demo
  labels:
    app: demo
spec:
  containers:
  - name: demo
    image: busybox:1.28
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
          - matchExpressions:
            - key: nodeName
              operator: In
              values:
              - node0
            - key: kubernetes.io/os
              operator: In
              values:
              - linux
EOF

# 创建Pod
[root@node0 k8s]# kubectl apply -f demo.yml 
pod/demo created

# 查看Pod调度在哪个Node上
[root@node0 k8s]# kubectl get pods -o wide
NAME   READY   STATUS    RESTARTS   AGE   IP             NODE    NOMINATED NODE   READINESS GATES
demo   1/1     Running   0          5s    10.233.30.25   node0   <none>           <none>
```

:::

::: details key、operator、values之间的关系

`operator`支持`In`、`NotIn`、`Exists`、`DoesNotExist`、`Gt` 和 `Lt` 作为操作符

`In`：满足一个条件即可调度，或的关系

```yaml
# 生成yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: demo
  labels:
    app: demo
spec:
  containers:
  - name: demo
    image: busybox:1.28
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
          - matchExpressions:
            - key: nodeName
              operator: In
              values:
              - node0
              - node1
EOF

# 创建Pod
[root@node0 k8s]# kubectl apply -f demo.yml 
pod/demo created

# 查看Pod调度在哪个Node上
[root@node0 k8s]# kubectl get pods -o wide
NAME   READY   STATUS    RESTARTS   AGE   IP             NODE    NOMINATED NODE   READINESS GATES
demo   1/1     Running   0          3s    10.233.30.26   node0   <none>           <none>
```

`NotIn`：全部不满足才会调度，与的关系

```yaml
# 生成yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: demo
  labels:
    app: demo
spec:
  containers:
  - name: demo
    image: busybox:1.28
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
          - matchExpressions:
            - key: nodeName
              operator: NotIn
              values:
              - node0
              - node1
EOF

# 创建Pod
[root@node0 k8s]# kubectl apply -f demo.yml 
pod/demo created

# 查看Pod调度在哪个Node上
[root@node0 k8s]# kubectl get pods -o wide
NAME   READY   STATUS    RESTARTS   AGE   IP             NODE    NOMINATED NODE   READINESS GATES
demo   1/1     Running   0          6s    10.233.44.63   node2   <none>           <none>
```

`Exists`：标签存在即可被调度，不支持`values`字段

```yaml
# 生成yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: demo
  labels:
    app: demo
spec:
  containers:
  - name: demo
    image: busybox:1.28
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
          - matchExpressions:
            - key: nodeName
              operator: Exists
            - key: node-role.kubernetes.io/control-plane
              operator: Exists
            - key: node-role.kubernetes.io/master
              operator: Exists
EOF

# 创建Pod
[root@node0 k8s]# kubectl apply -f demo.yml 
pod/demo created

# 查看Pod调度在哪个Node上
[root@node0 k8s]# kubectl get pods -o wide
NAME   READY   STATUS    RESTARTS   AGE   IP             NODE    NOMINATED NODE   READINESS GATES
demo   1/1     Running   0          81s   10.233.30.27   node0   <none>           <none>
```

`DoesNotExist`：标签不存在才会被调度，不支持`values`字段

```yaml
# 生成yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: demo
  labels:
    app: demo
spec:
  containers:
  - name: demo
    image: busybox:1.28
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
          - matchExpressions:
            - key: nodeName
              operator: Exists
            - key: node-role.kubernetes.io/control-plane
              operator: DoesNotExist
            - key: node-role.kubernetes.io/master
              operator: DoesNotExist
EOF

# 创建Pod
[root@node0 k8s]# kubectl apply -f demo.yml 
pod/demo created

# 查看Pod调度在哪个Node上
[root@node0 k8s]# kubectl get pods -o wide
NAME   READY   STATUS    RESTARTS   AGE   IP             NODE    NOMINATED NODE   READINESS GATES
demo   1/1     Running   0          4s    10.233.44.65   node2   <none>           <none>
```

`Gt`：标签值大于所指定的值才会被调度

`Lt`：标签值小于所指定的值才会被调度

```yaml
# 给节点打个标签
[root@node0 k8s]# kubectl label node node0 weight=1
[root@node0 k8s]# kubectl label node node1 weight=2
[root@node0 k8s]# kubectl label node node2 weight=3

# 生成yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: demo
  labels:
    app: demo
spec:
  containers:
  - name: demo
    image: busybox:1.28
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
[root@node0 k8s]# kubectl apply -f demo.yml 
pod/demo created

# 查看Pod调度在哪个Node上
[root@node0 k8s]# kubectl get pods -o wide
NAME   READY   STATUS    RESTARTS   AGE   IP              NODE    NOMINATED NODE   READINESS GATES
demo   1/1     Running   0          5s    10.233.154.25   node1   <none>           <none>
```

:::

::: details （二）preferredDuringSchedulingIgnoredDuringExecution基础示例

`preferredDuringSchedulingIgnoredDuringExecution`写法与`requiredDuringSchedulingIgnoredDuringExecution`类似，这里给出一个基础示例

```yaml
# 生成yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: demo
  labels:
    app: demo
spec:
  containers:
  - name: demo
    image: busybox:1.28
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
  affinity:
    nodeAffinity:
      # 软限制
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 1
        preference:
          matchExpressions:
          # 指定一个肯定不会存在的key和值
          - key: a-nonexistent-key
            operator: In
            values:
            - any-value
EOF

# 创建Pod
[root@node0 k8s]# kubectl apply -f demo.yml 
pod/demo created

# 查看Pod调度在哪个Node上
[root@node0 k8s]# kubectl get pods -o wide
NAME   READY   STATUS    RESTARTS   AGE   IP             NODE    NOMINATED NODE   READINESS GATES
demo   1/1     Running   0          25s   10.233.44.67   node2   <none>           <none>
```

:::

::: details （三）matchExpressions和matchFields匹配时的不同

`matchExpressions`用于标签匹配，`matchFields`用于字段匹配（或称为属性匹配），参考如下官方资料

文档：[https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/#nodeselectorterm-v1-core](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/#nodeselectorterm-v1-core)

![image-20220614145526005](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220614145526005.png)

```yaml
# 生成yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: demo
  labels:
    app: demo
spec:
  containers:
  - name: demo
    image: busybox:1.28
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
          # 匹配字段metadata.name是node1的node
          - matchFields:
            - key: metadata.name
              operator: In
              values:
              - node1
EOF

# 创建Pod
[root@node0 k8s]# kubectl apply -f demo.yml 
pod/demo created

# 查看Pod调度在哪个Node上
[root@node0 k8s]# kubectl get pods -o wide
NAME   READY   STATUS    RESTARTS   AGE   IP              NODE    NOMINATED NODE   READINESS GATES
demo   1/1     Running   0          4s    10.233.154.26   node1   <none>           <none>
```

:::

<br />

#### 直接指定Node - nodeName

文档：[https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/assign-pod-node/#nodename](https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/assign-pod-node/#nodename)

使用`nodeName`后调度器会忽略该Pod，而指定节点上的`kubelet `会尝试将 Pod 放到该节点上

使用 `nodeName` 规则的优先级会高于使用 `nodeSelector` 或亲和性与非亲和性的规则

```yaml
# 生成yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: demo
  labels:
    app: demo
spec:
  containers:
  - name: demo
    image: busybox:1.28
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']

  nodeName: node1
EOF

# 创建Pod
[root@node0 k8s]# kubectl apply -f demo.yml 
pod/demo created

# 查看Pod调度在哪个Node上
[root@node0 k8s]# kubectl get pods -o wide
NAME   READY   STATUS    RESTARTS   AGE   IP              NODE    NOMINATED NODE   READINESS GATES
demo   1/1     Running   0          2s    10.233.154.27   node1   <none>           <none>
```

<br />

#### 污点和容忍度策略

文档：[https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/taint-and-toleration/](https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/taint-and-toleration/)

污点（Taint）：给某个节点打污点，是为了避免Pod调度到该节点上

容忍度（Toleration）：给Pod配置容忍度，允许Pod调度到含有特定污点的节点上

**污点基础操作**

```bash
# 给node2节点打一个污点
# 解释：
#   （1）a=b是一个键值对，写啥都可以
#   （2）最后一个字段含义
#       NoSchedule         一定不能被调度到该节点上
#       PreferNoSchedule   尽量不要调度到这个节点
#       NoExecute          不仅不会调度，还会驱逐Node上已有的Pod
[root@node0 k8s]# kubectl taint node node2 a=b:NoSchedule

# 查看node2节点的污点
[root@node0 k8s]# kubectl describe node node2 | grep -i taint
Taints:             a=b:NoSchedule

# 删除污点
[root@node0 k8s]# kubectl taint node node2 a:NoSchedule-
```

::: details  污点演示：NoExecute

```bash
# 查看所有的Node节点的污点
[root@node0 k8s]# kubectl describe nodes | grep Taints
Taints:             <none>
Taints:             <none>
Taints:             <none>

# 生成yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: demo
  labels:
    app: demo
spec:
  containers:
  - name: demo
    image: busybox:1.28
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
EOF

# 创建Pod
[root@node0 k8s]# kubectl apply -f demo.yml 
pod/demo created

# 查看Pod调度在哪个Node上
[root@node0 k8s]# kubectl get pods -o wide
NAME   READY   STATUS    RESTARTS   AGE   IP             NODE    NOMINATED NODE   READINESS GATES
demo   1/1     Running   0          2s    10.233.44.72   node2   <none>           <none>

# 对node2节点进行Pod驱逐
[root@node0 k8s]# kubectl taint node node2 a=b:NoExecute

# 再次查看Pod，已经在销毁中了
[root@node0 k8s]# kubectl get pods -o wide
NAME   READY   STATUS        RESTARTS   AGE     IP             NODE    NOMINATED NODE   READINESS GATES
demo   1/1     Terminating   0          2m56s   10.233.44.72   node2   <none>           <none>
```

:::

::: details  容忍度演示：Tolerations

```bash
# 当前节点中只有node2是含有污点的，驱逐Pod
[root@node0 k8s]# kubectl describe nodes | grep Taints
Taints:             <none>
Taints:             <none>
Taints:             a=b:NoExecute

[root@node0 k8s]# kubectl describe nodes node2 | grep Taints
Taints:             a=b:NoExecute

# 生成yaml文件，故意分配给node2节点，这将导致一分配就销毁，但是配置了污点容忍，就可以保持Running状态
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: demo
  labels:
    app: demo
spec:
  containers:
  - name: demo
    image: busybox:1.28
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']

  nodeName: node2

  # 配置容忍度
  tolerations:
    # key为空表示匹配任意的key
    - key: ""
      # 默认值是Equal, 这里设置为Exists
      operator: "Exists"
EOF

# 创建Pod
[root@node0 k8s]# kubectl apply -f demo.yml 
pod/demo created

# 查看Pod
[root@node0 k8s]# kubectl get pods -o wide
NAME   READY   STATUS    RESTARTS   AGE     IP             NODE    NOMINATED NODE   READINESS GATES
demo   1/1     Running   0          4m18s   10.233.44.74   node2   <none>           <none>

# 查看Pod配置的容忍度
[root@node0 k8s]# kubectl describe pod demo | grep -i Tolerations
Tolerations:                 op=Exists
```

:::

<br />

### 多容器

<br />

#### 共享网络和存储示例

::: details  共享网络演示（无须做任何配置就支持）

```bash
# 生成yaml文件,Pod包含多个容器
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: demo
spec:
  containers:
  - name: demo1
    image: busybox:1.28
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
  - name: demo2
    image: busybox:1.28
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
EOF

# 创建Pod
[root@node0 k8s]# kubectl apply -f demo.yml 
pod/demo created

# 查看Pod，READY下面是2/2
[root@node0 k8s]# kubectl get pods -o wide
NAME   READY   STATUS    RESTARTS   AGE   IP             NODE    NOMINATED NODE   READINESS GATES
demo   2/2     Running   0          12s   10.233.44.83   node2   <none>           <none>

# 在node2节点上查看容器
[root@node2 ~]# crictl ps
CONTAINER           IMAGE               CREATED              STATE      NAME     ATTEMPT POD ID
dbf33c853a860       8c811b4aec35f       About a minute ago   Running    demo2    0       8b92e2da21dbc
ac0bd7d433c67       8c811b4aec35f       About a minute ago   Running    demo1    0       8b92e2da21dbc

# 在demo1中监听80端口
[root@node0 k8s]# kubectl exec demo -c demo1 -it -- sh
/ # nc -lvp 80
listening on [::]:80 ...

# 在demo2中访问80端口
[root@node0 k8s]# kubectl exec demo -c demo2 -it -- sh
/ # telnet 127.0.0.1 80

# demo1中已经能看到连接了
/ # nc -lvp 80
listening on [::]:80 ...
connect to [::ffff:127.0.0.1]:80 from [::ffff:127.0.0.1]:58970 ([::ffff:127.0.0.1]:58970)
```

:::

::: details  共享存储演示（需要配合【卷】一起使用）

```bash
# 生成yaml文件,Pod包含多个容器
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: demo
spec:
  containers:
  - name: demo1
    image: busybox:1.28
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
    volumeMounts:
      - name: data
        mountPath: /data
  - name: demo2
    image: busybox:1.28
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
    volumeMounts:
      - name: data
        mountPath: /data

  volumes:
    - name: data
      # 临时存储卷，与Pod生命周期绑定在一起，如果Pod被删除了卷也会被删除
      emptyDir: {}
EOF

# 创建Pod
[root@node0 k8s]# kubectl apply -f demo.yml 
pod/demo created

# 查看Pod，READY下面是2/2
[root@node0 k8s]# kubectl get pods -o wide
NAME   READY   STATUS    RESTARTS   AGE   IP             NODE    NOMINATED NODE   READINESS GATES
demo   2/2     Running   0          6s    10.233.44.84   node2   <none>           <none>

# 在demo1中写入数据/data/test.log
[root@node0 k8s]# kubectl exec demo -c demo1 -it -- sh
/ # seq 10 > /data/test.log

# 在demo2中查看数据
[root@node0 k8s]# kubectl exec demo -c demo2 -it -- sh
/ # ls -l /data
total 4
-rw-r--r--    1 root     root            21 Jun 15 01:31 test.log

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

#### 共享进程命名空间

文档：[https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/share-process-namespace/](https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/share-process-namespace/)

::: details  点击查看详情

```bash
# 生成yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: demo
spec:
  # 共享进程命名空间
  shareProcessNamespace: true
  containers:
  - name: demo1
    image: busybox:1.28
    command: ['sh', '-c', "echo `date '+%Y-%m-%d %H:%M:%S'` The app is running! && sleep 3600"]
  - name: demo2
    image: busybox:1.28
    command: ['sh', '-c', "echo `date '+%Y-%m-%d %H:%M:%S'` The app is running! && sleep 3600"]
EOF

# 创建Pod
[root@node0 k8s]# kubectl apply -f demo.yml 
pod/demo created

# 进入任意一个容器中查看进程
[root@node0 k8s]# kubectl exec -it demo -c demo1 -- sh
/ # ps aux
PID   USER     TIME  COMMAND
    1 root      0:00 /pause
    7 root      0:00 sleep 3600
   14 root      0:00 sleep 3600
   21 root      0:00 sh
   27 root      0:00 ps aux
```

:::

<br />

#### Init容器

文档：[https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/init-containers/](https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/init-containers/)

特点：

* 先于应用容器运行，且必须运行完成以后才会运行应用容器
* 可以有多个Init容器，每个Init容器运行完成之后才会运行下一个Init容器

注意事项：

* Pod 重启会导致Init容器重新执行，所以Init容器的代码应该是幂等的（即任意多次执行所产生的影响与一次执行的影响相同）

::: details  点击查看详情

```bash
# 生成yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: v1
kind: Pod
metadata:
  name: demo
spec:
  containers:
  - name: demo
    image: busybox:1.28
    command: ['sh', '-c', "echo `date '+%Y-%m-%d %H:%M:%S'` The app is running! && sleep 3600"]

  initContainers:
  - name: init1
    image: busybox:1.28
    command: ['sh', '-c', "echo `date '+%Y-%m-%d %H:%M:%S'` init1 start running && sleep 10"]
  - name: init2
    image: busybox:1.28
    command: ['sh', '-c', "echo `date '+%Y-%m-%d %H:%M:%S'` init2 start running && sleep 10"]
EOF

# 创建Pod
[root@node0 k8s]# kubectl apply -f demo.yml 
pod/demo created

# 查看Pod
[root@node0 k8s]# kubectl get pods -o wide
NAME   READY   STATUS     RESTARTS   AGE   IP             NODE    NOMINATED NODE   READINESS GATES
demo   0/1     Init:0/2   0          2s    10.233.44.92   node2   <none>           <none>

[root@node0 k8s]# kubectl get pods -o wide
NAME   READY   STATUS     RESTARTS   AGE   IP             NODE    NOMINATED NODE   READINESS GATES
demo   0/1     Init:1/2   0          14s   10.233.44.92   node2   <none>           <none>

[root@node0 k8s]# kubectl get pods -o wide
NAME   READY   STATUS            RESTARTS   AGE   IP             NODE    NOMINATED NODE   READINESS GATES
demo   0/1     PodInitializing   0          23s   10.233.44.92   node2   <none>           <none>

[root@node0 k8s]# kubectl get pods -o wide
NAME   READY   STATUS    RESTARTS   AGE   IP             NODE    NOMINATED NODE   READINESS GATES
demo   1/1     Running   0          26s   10.233.44.92   node2   <none>           <none>

# 查看容器日志
[root@node0 k8s]# kubectl logs demo -c init1 && kubectl logs demo -c init2 && kubectl logs demo -c demo
2022-06-15 23:16:44 init1 start running
2022-06-15 23:16:55 init2 start running
2022-06-15 23:17:06 The app is running!
```

:::

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

<br />

#### 基础示例

::: details  点击查看详情

```bash
# 生成yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: apps/v1     # API版本
kind: Deployment        # 类型为 Deployment
metadata:               # Deployment元数据
  name: demo            #   Deployment名称
  namespace: default    #   Deployment所属命名空间
spec:                   # Deployment定义
  replicas: 3           #   定义预期的Pod副本数量
  selector:             #   定义标签选择器
    matchLabels:        #     用于与指定标签的Pod关联
      app: web

  template:             # Pod模板
    metadata:           #   Pod元数据
      labels:           #     定义Pod标签
        app: web        #
    spec:               #   Pod定义
      containers:
      - name: web
        image: nginx:1.21.6
        command: ['nginx', '-g', 'daemon off;']
      - name: other
        image: busybox:1.28
        command: ['sh', '-c', 'echo The app is running! && sleep 3600']
EOF

# 创建Deployment
[root@node0 k8s]# kubectl apply -f demo.yml 
deployment.apps/demo created
```

:::

1、查看deployments

```bash
[root@node0 ~]# kubectl get deploy -o wide --show-labels
NAME   READY   UP-TO-DATE   AVAILABLE   AGE     CONTAINERS   IMAGES                      SELECTOR   LABELS
demo   3/3     3            3           7m21s   web,other    nginx:1.21.6,busybox:1.28   app=web    <none>
```

2、查看ReplicaSet

![image-20220617051518147](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220617051518147.png)

> （1）Deployment控制器会自动创建ReplicaSet，命名规则为：`[Deployment名称]-[hash]`
>
> （2）Deployment控制器会给ReplicaSet添加`pod-template-hash=[hash]`标签

3、查看Pods

![image-20220617052152945](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220617052152945.png)

> （1）ReplicaSet控制器会维护Pod数量，Pod的命名规则为：`[Deployment名称]-[hash]-[随机字符串]`
>
> （2）ReplicaSet控制器会给Pod添加上`pod-template-hash=[hash]`标签

<br />

#### ReplicaSet

ReplicaSet控制器会自动维护Pod数量（新建或删除等）

::: details  (1) 通过污点驱逐说明ReplicaSet会自动新建Pod

```bash
# 看一下当前的Pod
[root@node0 ~]# kubectl get pods -o wide
NAME                    READY   STATUS    RESTARTS   AGE   IP              NODE    NOMINATED NODE   READINESS GATES
demo-6b86f546b6-5fdxd   2/2     Running   0          43m   10.233.44.108   node2   <none>           <none>
demo-6b86f546b6-9qmwm   2/2     Running   0          43m   10.233.30.55    node0   <none>           <none>
demo-6b86f546b6-plq7k   2/2     Running   0          43m   10.233.154.49   node1   <none>           <none>

# 给node2打一个污点，用于驱逐其上的Pod
[root@node0 ~]# kubectl taint node node2 a=b:NoExecute

# 查看Pod，发现node2上的正在销毁，同时在node1上又启动了一个新Pod，维持Pod数量
[root@node0 ~]# kubectl get pods -o wide
NAME                    READY   STATUS        RESTARTS   AGE   IP              NODE    NOMINATED NODE   READINESS GATES
demo-6b86f546b6-5fdxd   2/2     Terminating   0          43m   10.233.44.108   node2   <none>           <none>
demo-6b86f546b6-9qmwm   2/2     Running       0          43m   10.233.30.55    node0   <none>           <none>
demo-6b86f546b6-mrccc   2/2     Running       0          2s    10.233.154.50   node1   <none>           <none>
demo-6b86f546b6-plq7k   2/2     Running       0          43m   10.233.154.49   node1   <none>           <none>

# 等稳定后再查看Pod
[root@node0 ~]# kubectl get pods -o wide
NAME                    READY   STATUS    RESTARTS   AGE     IP              NODE    NOMINATED NODE   READINESS GATES
demo-6b86f546b6-9qmwm   2/2     Running   0          46m     10.233.30.55    node0   <none>           <none>
demo-6b86f546b6-mrccc   2/2     Running   0          2m33s   10.233.154.50   node1   <none>           <none>
demo-6b86f546b6-plq7k   2/2     Running   0          46m     10.233.154.49   node1   <none>           <none>

# 看一下ReplicaSet的日志
[root@node0 ~]# kubectl get rs
NAME              DESIRED   CURRENT   READY   AGE
demo-6b86f546b6   3         3         3       47m

[root@node0 ~]# kubectl describe rs demo-6b86f546b6
Name:           demo-6b86f546b6
Namespace:      default
Selector:       app=web,pod-template-hash=6b86f546b6
Labels:         app=web
                pod-template-hash=6b86f546b6
Annotations:    deployment.kubernetes.io/desired-replicas: 3
                deployment.kubernetes.io/max-replicas: 4
                deployment.kubernetes.io/revision: 1
Controlled By:  Deployment/demo
Replicas:       3 current / 3 desired
Pods Status:    3 Running / 0 Waiting / 0 Succeeded / 0 Failed
Pod Template:
  Labels:  app=web
           pod-template-hash=6b86f546b6
  Containers:
   web:
    Image:      nginx:1.21.6
    Port:       <none>
    Host Port:  <none>
    Command:
      nginx
      -g
      daemon off;
    Environment:  <none>
    Mounts:       <none>
   other:
    Image:      busybox:1.28
    Port:       <none>
    Host Port:  <none>
    Command:
      sh
      -c
      echo The app is running! && sleep 3600
    Environment:  <none>
    Mounts:       <none>
  Volumes:        <none>
Events:
  Type    Reason            Age    From                   Message
  ----    ------            ----   ----                   -------
  Normal  SuccessfulCreate  48m    replicaset-controller  Created pod: demo-6b86f546b6-5fdxd
  Normal  SuccessfulCreate  48m    replicaset-controller  Created pod: demo-6b86f546b6-plq7k
  Normal  SuccessfulCreate  48m    replicaset-controller  Created pod: demo-6b86f546b6-9qmwm
  Normal  SuccessfulCreate  4m23s  replicaset-controller  Created pod: demo-6b86f546b6-mrccc  # 新建Pod
```

:::

::: details  (2) 通过更新Deployment中replicas来控制Pod数量

```bash
# 看一下当前的Pod
[root@node0 ~]# kubectl get pods -o wide
NAME                    READY   STATUS    RESTARTS   AGE     IP              NODE    NOMINATED NODE   READINESS GATES
demo-6b86f546b6-9qmwm   2/2     Running   0          53m     10.233.30.55    node0   <none>           <none>
demo-6b86f546b6-mrccc   2/2     Running   0          9m43s   10.233.154.50   node1   <none>           <none>
demo-6b86f546b6-plq7k   2/2     Running   0          53m     10.233.154.49   node1   <none>           <none>

# 修改demo.yaml中的replicas为1，并使其生效
[root@node0 k8s]# kubectl apply -f demo.yml 
deployment.apps/demo configured

# 再次查看Pod，可以看到有两个正在销毁
[root@node0 ~]# kubectl get pods -o wide
NAME                    READY   STATUS        RESTARTS   AGE     IP              NODE    NOMINATED NODE   READINESS GATES
demo-6b86f546b6-9qmwm   2/2     Running       0          53m     10.233.30.55    node0   <none>           <none>
demo-6b86f546b6-mrccc   2/2     Terminating   0          9m52s   10.233.154.50   node1   <none>           <none>
demo-6b86f546b6-plq7k   2/2     Terminating   0          53m     10.233.154.49   node1   <none>           <none>

# 等稳定后再查看Pod
[root@node0 ~]# kubectl get pods -o wide
NAME                    READY   STATUS    RESTARTS   AGE   IP             NODE    NOMINATED NODE   READINESS GATES
demo-6b86f546b6-9qmwm   2/2     Running   0          56m   10.233.30.55   node0   <none>           <none>

# 看一下ReplicaSet的日志
[root@node0 ~]# kubectl get rs 
NAME              DESIRED   CURRENT   READY   AGE
demo-6b86f546b6   1         1         1       57m

[root@node0 ~]# kubectl describe rs demo-6b86f546b6
Name:           demo-6b86f546b6
Namespace:      default
Selector:       app=web,pod-template-hash=6b86f546b6
Labels:         app=web
                pod-template-hash=6b86f546b6
Annotations:    deployment.kubernetes.io/desired-replicas: 1
                deployment.kubernetes.io/max-replicas: 2
                deployment.kubernetes.io/revision: 1
Controlled By:  Deployment/demo
Replicas:       1 current / 1 desired
Pods Status:    1 Running / 0 Waiting / 0 Succeeded / 0 Failed
Pod Template:
  Labels:  app=web
           pod-template-hash=6b86f546b6
  Containers:
   web:
    Image:      nginx:1.21.6
    Port:       <none>
    Host Port:  <none>
    Command:
      nginx
      -g
      daemon off;
    Environment:  <none>
    Mounts:       <none>
   other:
    Image:      busybox:1.28
    Port:       <none>
    Host Port:  <none>
    Command:
      sh
      -c
      echo The app is running! && sleep 3600
    Environment:  <none>
    Mounts:       <none>
  Volumes:        <none>
Events:
  Type    Reason            Age    From                   Message
  ----    ------            ----   ----                   -------
  Normal  SuccessfulCreate  57m    replicaset-controller  Created pod: demo-6b86f546b6-5fdxd
  Normal  SuccessfulCreate  57m    replicaset-controller  Created pod: demo-6b86f546b6-plq7k
  Normal  SuccessfulCreate  57m    replicaset-controller  Created pod: demo-6b86f546b6-9qmwm
  Normal  SuccessfulCreate  13m    replicaset-controller  Created pod: demo-6b86f546b6-mrccc
  Normal  SuccessfulDelete  3m49s  replicaset-controller  Deleted pod: demo-6b86f546b6-mrccc  # 删除Pod
  Normal  SuccessfulDelete  3m49s  replicaset-controller  Deleted pod: demo-6b86f546b6-plq7k  # 删除Pod
```

:::

<br />

#### 滚动更新

文档：[https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/deployment/#strategy](https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/deployment/#strategy)



**更新策略**

（1）滚动更新（`RollingUpdate`）

更新时会创建一个新的`ReplicaSet`，并将其扩容为1，等待其就绪，然后将旧`ReplicaSet`缩容1；如此循环，直到旧`ReplicaSet`为0后将其删除

这是默认的更新策略

（2）重新创建（`Recreate`）

现有的全部Pods被杀死成功后，才会创建新版本的 Pod



**滚动更新**

| 字段                                                         | 可选字段 | 默认值          | 说明 |
| ------------------------------------------------------------ | -------- | --------------- | ---- |
| 更新策略类型<br />（`.spec.strategy.type`）                  | 是       | `RollingUpdate` |      |
| 最大不可用<br />（`.spec.strategy.rollingUpdate.maxUnavailable`） | 是       | `25%`           |      |
| 最大峰值<br />（`.spec.strategy.rollingUpdate.maxSurge`）    | 是       | `25%`           |      |
| 最短就绪时间<br />（`.spec.minReadySeconds`）                | 是       | 0               |      |

::: details  滚动更新示例

```bash
# 创建yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
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
[root@node0 k8s]# kubectl apply -f demo.yml 
deployment.apps/demo created

# 查看
[root@node0 k8s]# kubectl rollout status deploy/demo
Waiting for deployment "demo" rollout to finish: 0 of 3 updated replicas are available...
Waiting for deployment "demo" rollout to finish: 2 of 3 updated replicas are available...
deployment "demo" successfully rolled out

[root@node0 k8s]# kubectl get pods
NAME                    READY   STATUS    RESTARTS   AGE
demo-5b978c7d6d-hvkjp   1/1     Running   0          70s
demo-5b978c7d6d-svknh   1/1     Running   0          70s
demo-5b978c7d6d-tsbn4   1/1     Running   0          70s

# 修改busybox镜像版本为1.34，然后更新deployment
[root@node0 k8s]# kubectl apply -f demo.yml 
deployment.apps/demo configured

# 查看Pod,新创建了2个，等待就绪检查成功后会删除2个旧的Pod
[root@node0 k8s]# kubectl get pods
NAME                    READY   STATUS    RESTARTS   AGE
demo-5b978c7d6d-hvkjp   1/1     Running   0          2m57s
demo-5b978c7d6d-svknh   1/1     Running   0          2m57s
demo-5b978c7d6d-tsbn4   1/1     Running   0          2m57s
demo-8f99576b9-26g8x    0/1     Running   0          7s
demo-8f99576b9-r4kbm    0/1     Running   0          7s

[root@node0 k8s]# kubectl rollout status deploy/demo
Waiting for deployment "demo" rollout to finish: 2 out of 3 new replicas have been updated...
Waiting for deployment "demo" rollout to finish: 2 out of 3 new replicas have been updated...
Waiting for deployment "demo" rollout to finish: 2 out of 3 new replicas have been updated...
Waiting for deployment "demo" rollout to finish: 2 out of 3 new replicas have been updated...
Waiting for deployment "demo" rollout to finish: 2 out of 3 new replicas have been updated...
Waiting for deployment "demo" rollout to finish: 2 old replicas are pending termination...
Waiting for deployment "demo" rollout to finish: 1 old replicas are pending termination...
deployment "demo" successfully rolled out

[root@node0 k8s]# kubectl get pods
NAME                   READY   STATUS    RESTARTS   AGE
demo-8f99576b9-26g8x   1/1     Running   0          2m40s
demo-8f99576b9-r4kbm   1/1     Running   0          2m40s
demo-8f99576b9-vrfvx   1/1     Running   0          99s
```

:::

