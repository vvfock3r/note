# Kubernetes

官方文档：[https://kubernetes.io/zh-cn/docs/home/](https://kubernetes.io/zh-cn/docs/home/)

API文档：[https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/)

Github：[https://github.com/kubernetes/kubernetes](https://github.com/kubernetes/kubernetes)



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

## 

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

> （1）并不是支持所有的Pod字段/Container字段作为变量值
>
> （2）还支持使用ConfigMap的值作为变量值，参考【ConfigMap】章节

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

### 如何重启一个Pod？

```bash
kubectl get pod {podname} -n {namespace} -o yaml | kubectl replace --force -f -
```



## 

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

## 

## 对外暴露应用

### Service

#### 简介

文档：[https://kubernetes.io/zh-cn/docs/concepts/services-networking/service/](https://kubernetes.io/zh-cn/docs/concepts/services-networking/service/)

每个`Service`都有一个固定的`IP`，使用标签与`Pod`进行关联，<span style="color: red; font-weight: bold;">提供统一的访问入口和负载均衡功能</span>



**Service的三种类型**

| 类型         | 简介                                   | 说明                                                         |
| ------------ | -------------------------------------- | ------------------------------------------------------------ |
| ClusterIP    | 集群内部使用（默认类型）               | 分配一个稳定的集群内部IP                                     |
| NodePort     | 对外暴露应用                           | 分配一个稳定的集群内部IP，并在每个Node节点启用一个端口来暴露服务，使其可以在集群外部访问，<br />端口访问默认为：30000 - 32767 |
| LoadBalancer | 对外暴露应用（对于公有云环境进行优化） | 与NodePort类似，不同之处在于kubernetes会请求底层云平台（例如阿里云、腾讯云等）上的负载均衡器，将每个Node（NodeIP:NodePort）作为后端添加进去 |



**Service的实现**

`iptables`和`ipvs`



**关键字段说明**

| 字段                               | 是否必填 | 可选值和默认值                                            | 说明                     |
| ---------------------------------- | -------- | --------------------------------------------------------- | ------------------------ |
| `name`                             | ×        |                                                           | 名称                     |
| `protocol`                         | ×        | `TCP`（默认）、`UDP`、`SCTP`                              | 协议                     |
| `port`                             | √        |                                                           | Service端口              |
| `targetPort`                       | ×        | 默认情况下，`targetPort` 将被设置为与 `port` 字段相同的值 | 容器端口                 |
| `nodePort`（类型为NodePort时有效） | ×        | 30000-32767（默认端口范围）                               | 集群所有节点对外暴露端口 |

<br />



**Service对外暴露的不足**

* 一个端口只能一个服务使用，端口需要提前规划
* 只支持4层负载均衡



#### 类型1：ClusterIP

::: details  点击查看详情

**创建**

```bash
[root@node0 k8s]# cat > demo.yml <<- EOF
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
        image: nginx:1.21.6

---
apiVersion: v1
kind: Service
metadata:
  name: demo
spec:
  selector:
    app: web         # 通过标签关联Pods
  type: ClusterIP    # Service类型为ClusterIP，这也是默认值
  ports:             # 端口字段，固定
    - name: http     # 定义一个名字,用来说明这是http应用
      protocol: TCP  # 协议
      port: 80       # Service端口
      targetPort: 80 # 容器端口
EOF

# 创建
[root@node0 k8s]# kubectl apply -f demo.yml
deployment.apps/demo created
service/demo created
```

**查看**

```bash
# 查看Service
[root@node0 k8s]# kubectl get svc -o wide
NAME         TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)   AGE     SELECTOR
demo         ClusterIP   10.200.216.121   <none>        80/TCP    102s    app=web
kubernetes   ClusterIP   10.200.0.1       <none>        443/TCP   7d13h   <none>

# 查看Service绑定的后端的Pods地址
[root@node0 k8s]# kubectl get ep
NAME         ENDPOINTS                                 AGE
demo         10.233.44.12:80                           3m24s
kubernetes   192.168.48.128:6443,192.168.48.134:6443   7d13h

# 查看一下Pod IP，验证是不是和Service绑定的一样
[root@node0 k8s]# kubectl get pods -o wide
NAME                   READY   STATUS    RESTARTS   AGE    IP             NODE    NOMINATED NODE   READINESS GATES
demo-799f9cf89-kcmmc   1/1     Running   0          6m1s   10.233.44.12   node2   <none>           <none>
```

**在任意的Node节点都可以访问Service IP**

```bash
# node0
[root@node0 k8s]# curl http://10.200.216.121
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

# node1
[root@node1 ~]# curl http://10.200.216.121
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

# node2
[root@node2 ~]# curl http://10.200.216.121
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

<br />

#### 类型2：NodePort

::: details  点击查看详情

**创建**

```bash
[root@node0 k8s]# cat > demo.yml <<- EOF
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
        image: nginx:1.21.6

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
      nodePort: 31000 # 指定NodePort
EOF

# 创建
[root@node0 k8s]# kubectl apply -f demo.yml
deployment.apps/demo created
service/demo created
```

**查看Service**

```bash
# 查看Service
[root@node0 k8s]# kubectl get svc -o wide
NAME         TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE     SELECTOR
demo         NodePort    10.200.214.143   <none>        80:31000/TCP   2m10s   app=web
kubernetes   ClusterIP   10.200.0.1       <none>        443/TCP        7d13h   <none>

# 查看Service绑定的后端的Pods地址
[root@node0 k8s]# kubectl get ep
NAME         ENDPOINTS                                 AGE
demo         10.233.44.13:80                           2m24s
kubernetes   192.168.48.128:6443,192.168.48.134:6443   7d13h

# 查看一下Pod IP，验证是不是和Service绑定的一样
[root@node0 k8s]# kubectl get pods -o wide
NAME                   READY   STATUS    RESTARTS   AGE     IP             NODE    NOMINATED NODE   READINESS GATES
demo-799f9cf89-2kpvx   1/1     Running   0          2m38s   10.233.44.13   node2   <none>           <none>
```

**在集群外部访问任意Node的NodePort端口**

![image-20220619085519517](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220619085519517.png)

```bash
[root@node0 k8s]# kubectl logs -f demo-799f9cf89-2kpvx 
/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
/docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
/docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
10-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.conf
10-listen-on-ipv6-by-default.sh: info: Enabled listen on IPv6 in /etc/nginx/conf.d/default.conf
/docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
/docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
/docker-entrypoint.sh: Configuration complete; ready for start up
2022/06/19 00:49:58 [notice] 1#1: using the "epoll" event method
2022/06/19 00:49:58 [notice] 1#1: nginx/1.21.6
2022/06/19 00:49:58 [notice] 1#1: built by gcc 10.2.1 20210110 (Debian 10.2.1-6) 
2022/06/19 00:49:58 [notice] 1#1: OS: Linux 3.10.0-1160.66.1.el7.x86_64
2022/06/19 00:49:58 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 1048576:1048576
2022/06/19 00:49:58 [notice] 1#1: start worker processes
2022/06/19 00:49:58 [notice] 1#1: start worker process 31
2022/06/19 00:49:58 [notice] 1#1: start worker process 32
10.233.30.0 - - [19/Jun/2022:00:53:32 +0000] "GET / HTTP/1.1" 200 615 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36" "-"
2022/06/19 00:53:32 [error] 31#31: *1 open() "/usr/share/nginx/html/favicon.ico" failed (2: No such file or directory), client: 10.233.30.0, server: localhost, request: "GET /favicon.ico HTTP/1.1", host: "192.168.48.128:31000", referrer: "http://192.168.48.128:31000/"
10.233.30.0 - - [19/Jun/2022:00:53:32 +0000] "GET /favicon.ico HTTP/1.1" 404 555 "http://192.168.48.128:31000/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36" "-"


10.233.30.0 - - [19/Jun/2022:00:54:30 +0000] "GET / HTTP/1.1" 304 0 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36" "-"
```

**查看监听端口**

```bash
# 并没有监听31000端口
[root@node0 k8s]# netstat -atlnpu | grep 31000

# 在本地监听以下31000端口
[root@node0 k8s]# nc -l -v -p 31000
Ncat: Version 7.50 ( https://nmap.org/ncat )
Ncat: Listening on :::31000
Ncat: Listening on 0.0.0.0:31000

# 再次在浏览器访问，依旧访问的是Nginx，且本地nc命令没有输出任何连接日志
```

**使用回环接口访问**

```bash
# 先访问一个肯定不存在的端口，curl命令会立即(小于1秒)返回报错信息
[root@node0 ~]# curl http://127.0.0.1:31001
curl: (7) Failed connect to 127.0.0.1:31001; Connection refused

# 当访问31000端口时超时了
[root@node0 ~]# curl http://127.0.0.1:31000 --connect-timeout 5
curl: (28) Connection timed out after 5001 milliseconds
```

**查看所使用的代理模式**

```bash
[root@node0 k8s]# kubectl logs kube-proxy-znqrr  -n kube-system | grep -Ei 'proxy|proxier|iptables|ipvs'
I0611 11:12:15.485248       1 server_others.go:269] "Using ipvs Proxier"
I0611 11:12:15.485275       1 server_others.go:271] "Creating dualStackProxier for ipvs"
E0611 11:12:15.485477       1 proxier.go:377] "Can't set sysctl, kernel version doesn't satisfy minimum version requirements" sysctl="net/ipv4/vs/conn_reuse_mode" minimumKernelVersion="4.1"
E0611 11:12:15.485961       1 proxier.go:377] "Can't set sysctl, kernel version doesn't satisfy minimum version requirements" sysctl="net/ipv4/vs/conn_reuse_mode" minimumKernelVersion="4.1"
```

:::

<br />

#### Service DNS通信

文档：[https://kubernetes.io/zh-cn/docs/concepts/services-networking/dns-pod-service/](https://kubernetes.io/zh-cn/docs/concepts/services-networking/dns-pod-service/)

`CoreDNS`是一个DNS服务器，会为每一个`Service`自动创建DNS记录用于域名解析



Cluster IP A记录格式

`<service-name>.<namespace-name>.svc.cluster.local`



::: details  同一个NameSpace下Service DNS通信

```bash
# 生成demo1 yaml文件
[root@node0 k8s]# cat > demo1.yml <<- EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo1
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      app: demo1

  template:
    metadata:
      labels:
        app: demo1
    spec:
      containers:
      - name: demo1
        image: busybox:1.28
        command:
        - sh 
        - -c
        - sleep 3600

---
apiVersion: v1
kind: Service
metadata:
  name: demo1-svc
  namespace: default
spec:
  selector:
    app: demo1        # 通过标签关联Pods
  type: NodePort      # 指定Service类型为NodePort
  ports:              # 端口字段，固定
    - name: http      # 定义一个名字,用来说明这是http应用
      protocol: TCP   # 协议
      port: 80        # Service端口
      targetPort: 80  # 容器端口
EOF

# 生成demo2 yaml文件
[root@node0 k8s]# cp demo1.yml demo2.yml 
[root@node0 k8s]# sed -ri 's/demo1/demo2/g' demo2.yml

# 创建应用
[root@node0 k8s]# kubectl apply -f demo1.yml 
deployment.apps/demo1 created
service/demo1-svc created
[root@node0 k8s]# kubectl apply -f demo2.yml 
deployment.apps/demo2 created
service/demo2-svc created

# 查看Pod
[root@node1 ~]# kubectl get pods
NAME                     READY   STATUS    RESTARTS   AGE
demo1-5f98c8db55-lxs8p   1/1     Running   0          15s
demo2-6ccd8fc5d9-btbqd   1/1     Running   0          13s

# 进入demo1容器，Service DNS通信验证
[root@node1 ~]# kubectl exec -it demo1-5f98c8db55-lxs8p -- sh

# （1）直接ping service-name
/ # ping demo2-svc    
PING demo2-svc (10.200.121.230): 56 data bytes
64 bytes from 10.200.121.230: seq=0 ttl=64 time=0.074 ms
64 bytes from 10.200.121.230: seq=1 ttl=64 time=0.078 ms
64 bytes from 10.200.121.230: seq=2 ttl=64 time=0.087 ms
64 bytes from 10.200.121.230: seq=3 ttl=64 time=0.087 ms
^C
--- demo2-svc ping statistics ---
4 packets transmitted, 4 packets received, 0% packet loss
round-trip min/avg/max = 0.074/0.081/0.087 ms


# （2）域名解析，可以得到IP和完整的域名 demo2-svc.default.svc.cluster.local
/ # nslookup demo2-svc
Server:    169.254.25.10
Address 1: 169.254.25.10

Name:      demo2-svc
Address 1: 10.200.121.230 demo2-svc.default.svc.cluster.local

# （3）demo2，啥也不是
/ # ping demo2
ping: bad address 'demo2'

# 在demo2容器中进行Service DNS通信验证
[root@node1 ~]# kubectl exec -it demo2-6ccd8fc5d9-btbqd -- ping demo1-svc
PING demo1-svc (10.200.25.248): 56 data bytes
64 bytes from 10.200.25.248: seq=0 ttl=64 time=0.069 ms
64 bytes from 10.200.25.248: seq=1 ttl=64 time=0.125 ms
64 bytes from 10.200.25.248: seq=2 ttl=64 time=0.118 ms
64 bytes from 10.200.25.248: seq=3 ttl=64 time=0.111 ms
^C
--- demo1-svc ping statistics ---
4 packets transmitted, 4 packets received, 0% packet loss
round-trip min/avg/max = 0.069/0.105/0.125 ms
```

:::

::: details  不同NameSpace下Service DNS通信

```bash
# 生成demo1 yaml文件
[root@node0 k8s]# cat > demo1.yml <<- EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo1
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      app: demo1

  template:
    metadata:
      labels:
        app: demo1
    spec:
      containers:
      - name: demo1
        image: busybox:1.28
        command:
        - sh 
        - -c
        - sleep 3600

---
apiVersion: v1
kind: Service
metadata:
  name: demo1-svc
  namespace: default
spec:
  selector:
    app: demo1        # 通过标签关联Pods
  type: NodePort      # 指定Service类型为NodePort
  ports:              # 端口字段，固定
    - name: http      # 定义一个名字,用来说明这是http应用
      protocol: TCP   # 协议
      port: 80        # Service端口
      targetPort: 80  # 容器端口
EOF

# 生成demo2 yaml文件
[root@node0 k8s]# cp demo1.yml demo2.yml 
[root@node0 k8s]# sed -ri 's/demo1/demo2/g' demo2.yml
[root@node0 k8s]# sed -ri 's/(.*)(namespace:)(.*)/\1\2 kube-public/g' demo2.yml

# 创建应用
[root@node0 k8s]# kubectl apply -f demo1.yml 
deployment.apps/demo1 created
service/demo1-svc created
[root@node0 k8s]# kubectl apply -f demo2.yml 
deployment.apps/demo2 created
service/demo2-svc created

# 查看Pod
[root@node0 k8s]# kubectl get pods -n default
NAME                     READY   STATUS    RESTARTS   AGE
demo1-5f98c8db55-dcl7h   1/1     Running   0          22s

[root@node0 k8s]# kubectl get pods -n kube-public
NAME                     READY   STATUS    RESTARTS   AGE
demo2-6ccd8fc5d9-5l4qk   1/1     Running   0          24s

# 进入demo1容器，Service DNS通信验证
[root@node1 ~]# kubectl exec -it demo1-5f98c8db55-dcl7h -- sh

# （1）直接ping service-name是不可以的，因为在不同的namespace下
/ # ping demo2-svc   
ping: bad address 'demo2-svc'


# （2）可以使用service-name.namespace-name来通信
/ # ping demo2-svc.kube-public
PING demo2-svc.kube-public (10.200.23.194): 56 data bytes
64 bytes from 10.200.23.194: seq=0 ttl=64 time=0.122 ms
64 bytes from 10.200.23.194: seq=1 ttl=64 time=0.078 ms
64 bytes from 10.200.23.194: seq=2 ttl=64 time=0.103 ms
64 bytes from 10.200.23.194: seq=3 ttl=64 time=0.137 ms
^C
--- demo2-svc.kube-public ping statistics ---
4 packets transmitted, 4 packets received, 0% packet loss
round-trip min/avg/max = 0.078/0.110/0.137 ms

# 在demo2容器中进行Service DNS通信验证
[root@node0 k8s]# kubectl exec -it demo2-6ccd8fc5d9-5l4qk -n kube-public -- ping demo1-svc.default
PING demo1-svc.default (10.200.242.177): 56 data bytes
64 bytes from 10.200.242.177: seq=0 ttl=64 time=0.075 ms
64 bytes from 10.200.242.177: seq=1 ttl=64 time=0.078 ms
64 bytes from 10.200.242.177: seq=2 ttl=64 time=0.102 ms
64 bytes from 10.200.242.177: seq=3 ttl=64 time=0.099 ms
^C
--- demo1-svc.default ping statistics ---
4 packets transmitted, 4 packets received, 0% packet loss
round-trip min/avg/max = 0.075/0.088/0.102 ms
```

:::

<br />

### Ingress简介

文档：[https://kubernetes.io/zh-cn/docs/concepts/services-networking/ingress/](https://kubernetes.io/zh-cn/docs/concepts/services-networking/ingress/)

#### HTTP访问

文档：[https://kubernetes.github.io/ingress-nginx/user-guide/basic-usage/](https://kubernetes.github.io/ingress-nginx/user-guide/basic-usage/)

::: details  点击查看详情

```bash
# 生成yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo
  namespace: default
spec:
  replicas: 1
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
        image: nginx:1.21.6
---
apiVersion: v1
kind: Service
metadata:
  name: demo-svc
  namespace: default
spec:
  selector:
    app: demo
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
  name: ingress-demo
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
              name: demo-svc    #     service name
              port:             #     service port
                number: 80      #
EOF

# 创建应用
[root@node0 k8s]# kubectl apply -f demo.yml 
deployment.apps/demo created
service/demo-svc created
ingress.networking.k8s.io/ingress-demo created

# 查看Service
[root@localhost k8s]# kubectl get svc -o wide
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE    SELECTOR
demo-svc     ClusterIP   10.200.159.80   <none>        80/TCP    14m    app=demo
kubernetes   ClusterIP   10.200.0.1      <none>        443/TCP   100m   <none>

# 查看Ingress
[root@localhost k8s]# kubectl get ingress -o wide
NAME           CLASS   HOSTS   ADDRESS   PORTS   AGE
ingress-demo   nginx   a.com             80      14m

# 查看Pod
[root@localhost k8s]# kubectl get pods -o wide
NAME                    READY   STATUS    RESTARTS   AGE   IP             NODE    NOMINATED NODE   READINESS GATES
demo-59ddb745c4-mkkgw   1/1     Running   0          14m   10.233.44.20   node2   <none>           <none>
```

**本地绑定hosts文件**

```bash
192.168.48.128	a.com
```

**浏览器访问 Ingress Service NodePort端口**

![image-20220621090229523](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220621090229523.png)

**浏览器访问Ingress Service端口（需Ingress NGINX设置使用宿主机网络）**

![image-20220621152327693](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220621152327693.png)

:::

<br />

#### HTTPS访问

文档：[https://kubernetes.io/zh-cn/docs/concepts/services-networking/ingress/#tls](https://kubernetes.io/zh-cn/docs/concepts/services-networking/ingress/#tls)

一、在HTTP能访问的基础上做一些简单的操作即可

::: details  1、提前申请好证书，这里使用mkcert生成自签证书

```bash
# 生成自谦证书
C:\Users\Administrator\Desktop>mkcert a.com

Created a new certificate valid for the following names 📜
 - "a.com"

The certificate is at "./a.com.pem" and the key at "./a.com-key.pem" ✅

It will expire on 21 September 2024 🗓
```

:::

::: details  2、使用命令行创建TLS类型Secret

```bash
[root@node0 k8s]# kubectl create secret tls https --cert=a.com.pem --key=a.com-key.pem
```

:::

::: details  3、Ingress中指定所使用的证书

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-demo
  namespace: default
spec:
  ingressClassName: nginx       # 指定ingress类名
  tls:                          # TLS配置
  - hosts:                      #   定义主机
      - a.com                   #   
    secretName: https           # secret name
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
```

:::

::: details  总结：完成的YAML文件（包含HTTPS证书base64编码）

```bash
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo
  namespace: default
spec:
  replicas: 1
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
        image: nginx:1.21.6
---
apiVersion: v1
kind: Service
metadata:
  name: demo-svc
  namespace: default
spec:
  selector:
    app: demo
  type: ClusterIP
  ports:
    - name: http
      protocol: TCP
      port: 80
      targetPort: 80
---
apiVersion: v1
kind: Secret
metadata:
  name: https
  namespace: default
data:
  tls.crt: |
    LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUVYakNDQXNhZ0F3SUJBZ0lSQVArekg5RzBPMWdyeEJCMXNCRVVEaUl3RFFZSktvWklodmNOQVFFTEJRQXcKZ1pjeEhqQWNCZ05WQkFvVEZXMXJZMlZ5ZENCa1pYWmxiRzl3YldWdWRDQkRRVEUyTURRR0ExVUVDd3d0UkVWVApTMVJQVUMweU1rczRNRlU0WEVGa2JXbHVhWE4wY21GMGIzSkFSRVZUUzFSUFVDMHlNa3M0TUZVNE1UMHdPd1lEClZRUURERFJ0YTJObGNuUWdSRVZUUzFSUFVDMHlNa3M0TUZVNFhFRmtiV2x1YVhOMGNtRjBiM0pBUkVWVFMxUlAKVUMweU1rczRNRlU0TUI0WERUSXlNRFl5TVRBMk5EY3lPRm9YRFRJME1Ea3lNVEEyTkRjeU9Gb3dZVEVuTUNVRwpBMVVFQ2hNZWJXdGpaWEowSUdSbGRtVnNiM0J0Wlc1MElHTmxjblJwWm1sallYUmxNVFl3TkFZRFZRUUxEQzFFClJWTkxWRTlRTFRJeVN6Z3dWVGhjUVdSdGFXNXBjM1J5WVhSdmNrQkVSVk5MVkU5UUxUSXlTemd3VlRnd2dnRWkKTUEwR0NTcUdTSWIzRFFFQkFRVUFBNElCRHdBd2dnRUtBb0lCQVFDZXhRNzBBaWkwY1BvRmswRWVxa2Jhdi9hUwpjclRETEZyT0xoNkpPYUgrNHNmZU1kZFJ0UkRXRFhJTitCNlhvaTRCalNLdE5nVFRPRjlYcmYyOUNZYWsvZG05CndUbXgxaHRQaWx6dkRxTkJXVmNwSGFicExpOERMQWF4bUs0N1FYb2JmSkl5U0FYazllemRTNmQ4Sk1xQ055U0cKSWU0cnhlVTdIM2tuUDhMSE5tTmZMNWNEc1QrdTFSYWVKblVMTzBNUzZqTG5Ga2VGY0tUQk56T3pjR1ZNNWdqcQpzVnpmLzZ6MXJScUdFdDRpNWFJZzdwRUxVVWRxdmxFRFJOOVBpampMTG5oQjlTbGJWKzZ4Q0RvRERxbEx6YXhtCmQxNnVyQ284NURyYUJlMXUzMC8xK3BQakpHOWE2S3RId2NxTmJhY1dUSjRxZnhPbmtEMEE3b1VZYXpQNUFnTUIKQUFHaldqQllNQTRHQTFVZER3RUIvd1FFQXdJRm9EQVRCZ05WSFNVRUREQUtCZ2dyQmdFRkJRY0RBVEFmQmdOVgpIU01FR0RBV2dCVHNsQy9ZTkExQ1QzQXV4UmxNR1QvSWo2eHB3VEFRQmdOVkhSRUVDVEFIZ2dWaExtTnZiVEFOCkJna3Foa2lHOXcwQkFRc0ZBQU9DQVlFQWF2aGpJTGxXSkF6aGdVMUdaKzJZK1ozeXFQdGlUc0NhNGRKWXRCL3MKdURoZjEwTGlxUEtPcEFKWmZ1ZllWM2NYNGU1eDg2NnZTQWFKbDlYbkpvL0VDNXpIc0tOclphSG10Qm9QOE9IOQoyOVJ2WWtOL1pad2tQdEx0T0FCRmNtakM3Y1kvQnJnbDE3WEJzVnFzRFVOdDI4dG9hSEJVTE9lcndtMjNrbFJSCm9naHhRN3RncVJuR1VNb1M1Sm4wR3hGQXBxbXBHN3FrNnpGak9ad0RwUDZ2N2F2Yi9oOGx3NGJtRFJaMDVTaXAKbEdGU3pldXhiU2FGNFNTUFVrUXdYVTI0RmRjODE1WnJoMnBYSE11ZDhGRUd1UVhSbDVGTGNVc3J6YkgraHpUMApKZmJ3cjQxT1RET2RVd09GOHI1dkRtKy9tM1lyTmh4WkVMSnpObjdldXowU3Uwc2gxMEJWYUhuSTV4bU41RXJECmxjN0sxeFRNM1paVkpQUHlDZDgxVnJzM1F2akdpSlN0bVFld2kxc3Z3TjI1dnI4Qlg2MytCTDNYV29rRGJoVFoKbzdCRlc0TDZ2cVJzL3dvWjUyYmVCT1N2MnRLeGlSQnE2dnVJVlREbGdTTzAzbTRPWlFRbEI1V3c4WmZ0V1dScQpWY1E2VTljYUtWSk03Q3JmSEtXZGtPOWUKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=
  tls.key: |
    LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUV2QUlCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktZd2dnU2lBZ0VBQW9JQkFRQ2V4UTcwQWlpMGNQb0YKazBFZXFrYmF2L2FTY3JURExGck9MaDZKT2FIKzRzZmVNZGRSdFJEV0RYSU4rQjZYb2k0QmpTS3ROZ1RUT0Y5WApyZjI5Q1lhay9kbTl3VG14MWh0UGlsenZEcU5CV1ZjcEhhYnBMaThETEFheG1LNDdRWG9iZkpJeVNBWGs5ZXpkClM2ZDhKTXFDTnlTR0llNHJ4ZVU3SDNrblA4TEhObU5mTDVjRHNUK3UxUmFlSm5VTE8wTVM2akxuRmtlRmNLVEIKTnpPemNHVk01Z2pxc1Z6Zi82ejFyUnFHRXQ0aTVhSWc3cEVMVVVkcXZsRURSTjlQaWpqTExuaEI5U2xiVis2eApDRG9ERHFsTHpheG1kMTZ1ckNvODVEcmFCZTF1MzAvMStwUGpKRzlhNkt0SHdjcU5iYWNXVEo0cWZ4T25rRDBBCjdvVVlhelA1QWdNQkFBRUNnZ0VBY01SZC9vbWFCNjlHcGJjVlJZYURsTk5MZW5EbVdzbWlKVmMwY1JyeUtHdEMKc2xxTUtJaUdVTUowQTkvN09wQUNSUy9OTldGc3cra0NMdkJ4akZhN3YyeGR2eDBDc1lEMUhPV1ZaR1h0Sm5raQpJeDNnY3paT1JkNTdVcUN5LzN0ZUV5L0RWdHM0OUlxSGxoWXArMDdXVnU1N2pwbUM1S3hHU0Z2dVhTWTRYZXp3CitoYzlnbkx2NldaM2g0ZEFGQjRhZTAxWUNTQk00dUFmRXNSaWlGMFJRbXYrZHBCRkVzTHBHZ2pYNDF3MTNTMzAKMmFOZlZQUEFXaFlIYk5RUFNacnB0QTlwRTUvTHYzSGlBUXVsMC84VUNkNFovckZ6R0xMTmUrV1duSUx3NEtNQgplM3o0ekVDMm9pU3UvSXpRdE5Bd0FjSkg3OUtOZUgrcGZmQ3pQd1g2RVFLQmdRRElERmRpVmZnZkxMNC83OGZ5CmNhODJrTXp0WjdFTW1LVmZub0xIdEVKc2VSMEtHWVk3YURJbUYxYmJYVmhpdTlseHFIcEJFWm5ualJuLzBCS3EKU0sydnVFOG9DdEJGaVpCamtpdWFYdDZXSi9pZkY0dzk4Z3MrVG5hbzNZK3lkODhEbDF0NVhwL2o0SVhPYnR5cApnTmtjY3M4aVpZMkNIT1hVdFNNTzFhN2cvd0tCZ1FETExTTXVERFNkZ09OZzJEZTAyVGk1b1kwMGVwNnVFanI5CndXM1hzdVBUdlhpeDVTd2ZaOG10ZytPZlZqTU0rNkRqMmRkLzZMZGVCNS9kZUhraGNFL0UyYUFWSWNkSjJxTFIKeVYySzhVUS9Xak9VNGVyZ1JMOG9iMmw4bDRBMXpEWHROZ3JPNFFsUVRyNk1KaHlscThJMDRHb01tUXJXaVB6Tgp6OHdvemUvekJ3S0JnRmtiWmpFZktnNTQxNldUSVBVVlBuNkhzVUJ1VjZiTXQ1MEg5aWtPV2lnSEtyQTgvbFduCjYrNmJwc3kvbjRjYk5aZ3krNEhRWFVXT3pHM3VPT0l3eld6Z0pDSXA3dXVLZ3c1WEphVDFiU0JsWFpFLzQvQVQKeUg1UVpQcUM5bWNBaHUyS2xleFNBZFozUkNMWHJ1S3h5Z09xQUNuS0ltWTZpUVZlU2VkcHR5UHhBb0dBTFdidgp4cGw1cEh5cDB2bGVNVzZkSzNZN2JLKytCOTRSQ3FXUDJ6U2hqcTUzYXlGd0k3QjRzK3FXRWdRY01sbUVrWVliCmp2eTlCU2tsQTBPcHBkeElKeEFPb3NwQ2szRmxFd1l4Zmh2K0NUNHA2cW8xWjFwVmNUNjhUdGc0RVUySiszRXAKSnlQSWhnYWl0QVRNUUFWS3g3QWlZcUJNZUxaeDc3Znd3bW1LcGo4Q2dZQUZXU215ckdIdG1Qa1F4SjhRMEViRQpuWnl4aE56bFprc2ZTc2NtNm95OXhYeWFMWllMem0zdWdFSmVkb3cxdkJYdFJtaXJtT0pXTXRzK0ZIeXU2cDhKCjk1OTVLcmxMQ1p4WXJLaXpLc2xaUjV3VDI3aW5xdDF1dlJsb0prOWpudUU0cXdKdDlYSndQQXpoSzRDc3g4S1YKZXVZVU53Zy9GYTA0VWFEMFpYa245dz09Ci0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0K
type: kubernetes.io/tls
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-demo
  namespace: default
spec:
  ingressClassName: nginx       # 指定ingress类名
  tls:                          # TLS配置
  - hosts:                      #   定义主机
      - a.com                   #
    secretName: https           # secret name，里面存的是HTTPS证书
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
EOF
```

:::

二、验证HTTPS

![image-20220621161135198](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220621161135198.png)

三、须知：配置完成后，若使用`HTTP`协议则会返回`308`重定向

若要改变其行为参考：[https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#server-side-https-enforcement-through-redirect](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#server-side-https-enforcement-through-redirect)

```bash
[root@node0 k8s]# curl http://a.com -I
HTTP/1.1 308 Permanent Redirect
Date: Tue, 21 Jun 2022 07:36:14 GMT
Content-Type: text/html
Content-Length: 164
Connection: keep-alive
Location: https://a.com     # 重定向后新的地址
```

<br />

#### 个性化配置

文档：[https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/)



::: details  （1）Basic Auth 认证

文档1：[https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#authentication](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#authentication)

文档2：[https://kubernetes.github.io/ingress-nginx/examples/auth/basic/](https://kubernetes.github.io/ingress-nginx/examples/auth/basic/)

**（1）先准备密码文件，并进行base64编码**

```bash
# 创建密码文件
[root@node0 k8s]# touch basic-auth.txt

# 使用htpasswd添加用户到密码文件
[root@node0 k8s]# htpasswd basic-auth.txt admin    # 添加第一个用户，密码admin123
[root@node0 k8s]# htpasswd basic-auth.txt root     # 添加第二个用户，密码root123

# 查看一下文件
[root@node0 k8s]# cat basic-auth.txt
admin:$apr1$ZIRZeV/i$3/aYk.LQDVWwtM6YMLIRl/
root:$apr1$iSc..JDp$uN5izoBG4XCTTVC19mSCS0

# base64编码
[root@node0 k8s]# cat basic-auth.txt | base64 | tr -d "\n" | awk '{print $0}'
YWRtaW46JGFwcjEkWklSWmVWL2kkMy9hWWsuTFFEVld3dE02WU1MSVJsLwpyb290OiRhcHIxJGlTYy4uSkRwJHVONWl6b0JHNFhDVFRWQzE5bVNDUzAK
```

**（2）编写YAML**

```bash
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo
  namespace: default
spec:
  replicas: 1
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
        image: nginx:1.21.6
---
apiVersion: v1
kind: Service
metadata:
  name: demo-svc
  namespace: default
spec:
  selector:
    app: demo
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
  auth: YWRtaW46JGFwcjEkWklSWmVWL2kkMy9hWWsuTFFEVld3dE02WU1MSVJsLwpyb290OiRhcHIxJGlTYy4uSkRwJHVONWl6b0JHNFhDVFRWQzE5bVNDUzAK
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-demo
  namespace: default
  annotations:
    nginx.ingress.kubernetes.io/auth-type: basic                       # 认证类型
    nginx.ingress.kubernetes.io/auth-secret: basic-auth                # 认证所用的secret名称，与上面的secret名称要对应
    nginx.ingress.kubernetes.io/auth-secret-type: auth-file            # 认证所用的secret类型，auth-file是默认值
    nginx.ingress.kubernetes.io/auth-realm: 'Authentication Required!' # 未认证时的提示消息
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
              name: demo-svc
              port:        
                number: 80
EOF

# 创建
[root@node0 k8s]# kubectl apply -f demo.yml 
deployment.apps/demo created
service/demo-svc created
secret/basic-auth created
ingress.networking.k8s.io/ingress-demo created
```

**（3）访问测试**

```bash
# 确认域名已有解析记录
[root@node0 k8s]# cat /etc/hosts | grep a.com
192.168.48.134 node1.cluster.local node1 a.com

# 默认返回401
[root@node0 k8s]# curl -I http://a.com 
HTTP/1.1 401 Unauthorized
Date: Fri, 24 Jun 2022 11:04:55 GMT
Content-Type: text/html
Content-Length: 172
Connection: keep-alive
WWW-Authenticate: Basic realm="Authentication Required!"

# 输入用户名密码
[root@node0 k8s]# curl -I http://a.com -u "admin:admin123"
HTTP/1.1 200 OK
Date: Fri, 24 Jun 2022 11:05:09 GMT
Content-Type: text/html
Content-Length: 615
Connection: keep-alive
Last-Modified: Tue, 25 Jan 2022 15:03:52 GMT
ETag: "61f01158-267"
Accept-Ranges: bytes

# 输入用户名密码
[root@node0 k8s]# curl -I http://a.com -u "root:root123"
HTTP/1.1 200 OK
Date: Fri, 24 Jun 2022 11:05:17 GMT
Content-Type: text/html
Content-Length: 615
Connection: keep-alive
Last-Modified: Tue, 25 Jan 2022 15:03:52 GMT
ETag: "61f01158-267"
Accept-Ranges: bytes

# 输错密码
[root@node0 k8s]# curl -I http://a.com -u "root:abc"
HTTP/1.1 401 Unauthorized
Date: Fri, 24 Jun 2022 11:06:00 GMT
Content-Type: text/html
Content-Length: 172
Connection: keep-alive
WWW-Authenticate: Basic realm="Authentication Required!"
```

:::

::: details  （2）自定义Server块配置示例：根据User-Agent禁止某些工具访问

文档：[https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#server-snippet](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#server-snippet)

PS：

* 带`snippet`字眼的都是用来做自定义配置的

* `snippet`依赖`Ingress NGINX Controller`的`ConfigMap`中的`allow-snippet-annotations`（默认为true）

  参考：[https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/#allow-snippet-annotations](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/#allow-snippet-annotations)

```bash
# 编写YAML文件
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo
  namespace: default
spec:
  replicas: 1
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
        image: nginx:1.21.6
---
apiVersion: v1
kind: Service
metadata:
  name: demo-svc
  namespace: default
spec:
  selector:
    app: demo
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
  name: ingress-demo
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
              name: demo-svc
              port:        
                number: 80
EOF

# 创建
[root@node0 k8s]# kubectl apply -f demo.yml 
deployment.apps/demo created
service/demo-svc created
ingress.networking.k8s.io/ingress-demo created

# 测试：直接使用curl和wget会返回403
[root@node0 k8s]#  curl http://a.com -I
HTTP/1.1 403 Forbidden
Date: Sat, 25 Jun 2022 03:29:47 GMT
Content-Type: text/html
Content-Length: 146
Connection: keep-alive

[root@node0 k8s]# wget http://a.com 
--2022-06-25 11:30:14--  http://a.com/
Resolving a.com (a.com)... 192.168.48.134
Connecting to a.com (a.com)|192.168.48.134|:80... connected.
HTTP request sent, awaiting response... 403 Forbidden
2022-06-25 11:30:14 ERROR 403: Forbidden.

# 修改User-Agent后，可以正常访问
[root@node0 k8s]# curl http://a.com -I --user-agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"
HTTP/1.1 200 OK
Date: Sat, 25 Jun 2022 03:31:39 GMT
Content-Type: text/html
Content-Length: 615
Connection: keep-alive
Last-Modified: Tue, 25 Jan 2022 15:03:52 GMT
ETag: "61f01158-267"
Accept-Ranges: bytes

[root@node0 k8s]# wget http://a.com --user-agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"
--2022-06-25 11:31:57--  http://a.com/
Resolving a.com (a.com)... 192.168.48.134
Connecting to a.com (a.com)|192.168.48.134|:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: 615 [text/html]
Saving to: ‘index.html’

100%[=================================================================>] 615         --.-K/s   in 0s      

2022-06-25 11:31:57 (72.9 MB/s) - ‘index.html’ saved [615/615]
```

:::

::: details  （2）自定义location块配置示例：添加Request-Id

文档：[https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#configuration-snippet](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#configuration-snippet)

```bash
# 编写YAML文件
[root@node0 k8s]# vim demo.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo
  namespace: default
spec:
  replicas: 1
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
        image: nginx:1.21.6
---
apiVersion: v1
kind: Service
metadata:
  name: demo-svc
  namespace: default
spec:
  selector:
    app: demo
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
  name: ingress-demo
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
              name: demo-svc
              port:        
                number: 80

# 创建
[root@node0 k8s]# kubectl apply -f demo.yml 
deployment.apps/demo created
service/demo-svc created
ingress.networking.k8s.io/ingress-demo created

# 测试
[root@node0 ~]# curl http://a.com -I
HTTP/1.1 200 OK
Date: Sat, 25 Jun 2022 08:33:28 GMT
Content-Type: text/html
Content-Length: 615
Connection: keep-alive
Last-Modified: Tue, 25 Jan 2022 15:03:52 GMT
ETag: "61f01158-267"
Accept-Ranges: bytes
Request-Id: 58e26b9b04deabb8cf407b71429a34ac   # Request-Id
```

:::

## 

## 应用程序配置

### ConfigMap

文档：[https://kubernetes.io/zh-cn/docs/concepts/configuration/configmap/](https://kubernetes.io/zh-cn/docs/concepts/configuration/configmap/)

::: details  （1）创建ConfigMap

```yaml
# 生成yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: v1
kind: ConfigMap
metadata:
  name: demo
  namespace: default
  annotations:
    kubernetes.io/description: ConfigMap学习
             
data:
  # 类属性键
  env: prod

  # 类文件键
  conf.ini: |
    HOST  = 0.0.0.0
    PORT  = 8080
    DEBUG = false
# 设置为不可变更，这会导致
#   (1) 保护应用，不能修改此ConfigMap，只能重新创建
#   (2) 关闭K8S对此ConfigMap的监视，当ConfigMap数量特别多的时候能显著提升K8S性能
#immutable: true
EOF

# 创建
[root@node0 k8s]# kubectl apply -f demo.yml 
configmap/demo created

# 查看
[root@node0 k8s]# kubectl get configmap 
NAME               DATA   AGE
demo               2      19s
demo-configmap     2      6m26s
kube-root-ca.crt   1      5d1h

[root@node0 k8s]# kubectl describe configmap demo
Name:         demo
Namespace:    default
Labels:       <none>
Annotations:  kubernetes.io/description: ConfigMap学习

Data
====
conf.ini:
----
HOST  = 0.0.0.0
PORT  = 8080
DEBUG = false

env:
----
prod

BinaryData
====

Events:  <none>
```

:::

::: details  （2）使用ConfigMap：作为变量注入到容器、作为配置文件挂载到容器中

```bash
# 生成yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: v1
kind: ConfigMap
metadata:
  name: demo-configmap
  namespace: default
  annotations:
    kubernetes.io/description: ConfigMap学习
             
data:
  # 类属性键
  env: prod

  # 类文件键
  conf1.ini: |
    HOST  = 0.0.0.0
    PORT  = 8080
    DEBUG = true

  conf2.ini: |
    HOST  = 127.0.0.1
    PORT  = 80
    DEBUG = false
---
apiVersion: v1
kind: Pod
metadata:
  name: demo
spec:
  containers:
    - name: demo
      image: busybox:1.28
      command: ["sleep", "3600"]

      # 通过ConfigMap给容器注入变量
      env:
        - name: ENV                     # 变量名, 用于容器内读取，这里故意写成和ConfigMap中的key不一致
          valueFrom:                    #
            configMapKeyRef:            # 变量值来自ConfigMap
              name: demo-configmap      #
              key: env                  #

      # 将ConfigMap中的值作为文件挂载到容器中
      volumeMounts:
      - name: config              # 名称和下面的保持一致
        mountPath: "/etc/demo/"   # 定义挂载目录
        readOnly: true

  volumes:
    - name: config           # 定义名称
      configMap:             # 指定来自ConfigMap
        name: demo-configmap # 和ConfigMap名称保持一致                     
        items:               # 来自 ConfigMap 的一组键，将被创建为文件
        - key: "conf1.ini"    # 指定key
          path: "CONF1.ini"   # 定义挂载以后的文件名
        - key: "conf2.ini"   # 指定key
          path: "CONF2.ini"  # 定义挂载以后的文件名
EOF

# 创建
[root@node0 k8s]# kubectl apply -f demo.yml 
configmap/demo-configmap created
pod/demo created

# 进入容器，验证
[root@node0 k8s]# kubectl exec -it demo -- sh
/ # echo ${ENV}
prod
/ # ls /etc/demo/
CONF1.ini  CONF2.ini
/ # cat /etc/demo/CONF1.ini
HOST  = 0.0.0.0
PORT  = 8080
DEBUG = true
/ # cat /etc/demo/CONF2.ini
HOST  = 127.0.0.1
PORT  = 80
DEBUG = false
```

:::

<br />

### Secret

文档：[https://kubernetes.io/zh-cn/docs/concepts/configuration/secret/](https://kubernetes.io/zh-cn/docs/concepts/configuration/secret/)

`Secret` 类似于ConfigMap，但专门用于保存机密数据

默认情况下`Secret`的数据未加密存储在etcd中，但是我们为`Secret`启用静态加密功能

::: details  （1）创建示例Secret

```bash
# 生成yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: v1
kind: Secret
metadata:
  name: demo-secret
  namespace: default
  annotations:
    kubernetes.io/description: Secret学习

# Opaque: 用户定义的任意数据, 默认类型
type: Opaque

# 将Secret标记为不可更改，默认值为false
#immutable: true

# ----------------------------------------------------
# 下面的data和stringdata所实现的效果相同，任选一个即可
# ----------------------------------------------------
# data是可选的
# data中写k-v数据
# data中的v必须是base64编码
data:
  username: YWRtaW4=
  password: MWYyZDFlMmU2N2Rm

# stringdata是可选的
# stringdata中写k-v数据
# stringdata中的v直接写明文
# stringdata比data优先级高
#stringData:
#  username: admin
#  password: 1f2d1e2e67df
EOF

# 创建
[root@node0 k8s]# kubectl apply -f demo.yml
secret/demo-secret created

# 查看
[root@node0 k8s]# kubectl get secrets
NAME                  TYPE                                  DATA   AGE
default-token-p7d2l   kubernetes.io/service-account-token   3      5d6h
demo-secret           Opaque                                2      6s

[root@node0 k8s]# kubectl describe secret demo-secret 
Name:         demo-secret
Namespace:    default
Labels:       <none>
Annotations:  kubernetes.io/description: Secret学习

Type:  Opaque

Data
====
password:  12 bytes
username:  5 bytes

[root@node0 k8s]# kubectl get secret demo-secret -o yaml
apiVersion: v1
data:
  password: MWYyZDFlMmU2N2Rm
  username: YWRtaW4=
kind: Secret
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"v1","data":{"password":"MWYyZDFlMmU2N2Rm","username":"YWRtaW4="},"kind":"Secret","metadata":{"annotations":{"kubernetes.io/description":"Secret学习"},"name":"demo-secret","namespace":"default"},"type":"Opaque"}
    kubernetes.io/description: Secret学习
  creationTimestamp: "2022-06-26T06:10:41Z"
  name: demo-secret
  namespace: default
  resourceVersion: "107901"
  uid: 67255d95-14ab-4b97-81bf-524f558b48cf
type: Opaque
```

:::

::: details  （2）使用Secret：作为变量注入到容器、作为配置文件挂载到容器中

```bash
# 生成yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: v1
kind: Secret
metadata:
  name: demo-secret
  namespace: default
  annotations:
    kubernetes.io/description: Secret学习
type: Opaque
stringData:
  env: prod
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
      image: busybox:1.28
      command: ["sleep", "3600"]

      # 通过ConfigMap给容器注入变量
      env:
        - name: ENV                     # 变量名, 用于容器内读取，这里故意写成和Secret中的key不一致
          valueFrom:                    #
            secretKeyRef:               # 变量值来自Secret
              name: demo-secret         #
              key: env                  #
              optional: false           # 此值为默认值；意味着 "mysecret"

      # 将Secret中的值作为文件挂载到容器中(这一段配置和使用ConfigMap一样)
      volumeMounts:

      - name: config          # 名称和下面的保持一致
        mountPath: "/etc/demo/config"   # 定义挂载目录
        readOnly: true

      - name: username            # 名称和下面的保持一致
        mountPath: "/etc/demo/username"   # 定义挂载目录
        readOnly: true

  volumes:

    # 将整个secret作为文件挂载
    - name: config           # 定义名称
      secret:                    # 指定来自Secret
        secretName: demo-secret  # 和Secret名称保持一致                     
        optional: false          # 默认设置，意味着 "demo-secret" 必须已经存在

    # 将secret中某个key作为文件挂载
    - name: username
      secret:
        secretName: demo-secret
        items:
        - key: username
          path: username.ini
EOF

# 创建
[root@node0 k8s]# kubectl apply -f demo.yml 
secret/demo-secret created
pod/demo created

# 进入容器，验证
[root@node0 k8s]# kubectl exec -it demo -- sh
/etc/demo # echo ${ENV}
prod

/ # cd /etc/demo/
/etc/demo # ls -lh
total 0
drwxrwxrwt    3 root     root         160 Jun 27 03:27 config
drwxrwxrwt    3 root     root         100 Jun 27 03:27 username

/etc/demo # ls -lh config/
total 0
lrwxrwxrwx    1 root     root          10 Jun 27 03:27 env -> ..data/env
lrwxrwxrwx    1 root     root          15 Jun 27 03:27 host.ini -> ..data/host.ini
lrwxrwxrwx    1 root     root          15 Jun 27 03:27 password -> ..data/password
lrwxrwxrwx    1 root     root          15 Jun 27 03:27 username -> ..data/username

/etc/demo # cat config/env | awk '{print $0}'
prod
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
[root@node0 k8s]# kubectl create secret tls https --cert=a.com.pem --key=a.com-key.pem
```

:::

::: details  （4）创建TLS类型的Secret，用于保存证书 --- 方法2：使用YAML文件创建TLS类型Secret

① 先将证书进行base64编码

```bash
[root@node-1 ~]# cat a.com.pem | base64 | tr -d "\n" | awk '{print $0}'
LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUVYakNDQXNhZ0F3SUJBZ0lSQVArekg5RzBPMWdyeEJCMXNCRVVEaUl3RFFZSktvWklodmNOQVFFTEJRQXcKZ1pjeEhqQWNCZ05WQkFvVEZXMXJZMlZ5ZENCa1pYWmxiRzl3YldWdWRDQkRRVEUyTURRR0ExVUVDd3d0UkVWVApTMVJQVUMweU1rczRNRlU0WEVGa2JXbHVhWE4wY21GMGIzSkFSRVZUUzFSUFVDMHlNa3M0TUZVNE1UMHdPd1lEClZRUURERFJ0YTJObGNuUWdSRVZUUzFSUFVDMHlNa3M0TUZVNFhFRmtiV2x1YVhOMGNtRjBiM0pBUkVWVFMxUlAKVUMweU1rczRNRlU0TUI0WERUSXlNRFl5TVRBMk5EY3lPRm9YRFRJME1Ea3lNVEEyTkRjeU9Gb3dZVEVuTUNVRwpBMVVFQ2hNZWJXdGpaWEowSUdSbGRtVnNiM0J0Wlc1MElHTmxjblJwWm1sallYUmxNVFl3TkFZRFZRUUxEQzFFClJWTkxWRTlRTFRJeVN6Z3dWVGhjUVdSdGFXNXBjM1J5WVhSdmNrQkVSVk5MVkU5UUxUSXlTemd3VlRnd2dnRWkKTUEwR0NTcUdTSWIzRFFFQkFRVUFBNElCRHdBd2dnRUtBb0lCQVFDZXhRNzBBaWkwY1BvRmswRWVxa2Jhdi9hUwpjclRETEZyT0xoNkpPYUgrNHNmZU1kZFJ0UkRXRFhJTitCNlhvaTRCalNLdE5nVFRPRjlYcmYyOUNZYWsvZG05CndUbXgxaHRQaWx6dkRxTkJXVmNwSGFicExpOERMQWF4bUs0N1FYb2JmSkl5U0FYazllemRTNmQ4Sk1xQ055U0cKSWU0cnhlVTdIM2tuUDhMSE5tTmZMNWNEc1QrdTFSYWVKblVMTzBNUzZqTG5Ga2VGY0tUQk56T3pjR1ZNNWdqcQpzVnpmLzZ6MXJScUdFdDRpNWFJZzdwRUxVVWRxdmxFRFJOOVBpampMTG5oQjlTbGJWKzZ4Q0RvRERxbEx6YXhtCmQxNnVyQ284NURyYUJlMXUzMC8xK3BQakpHOWE2S3RId2NxTmJhY1dUSjRxZnhPbmtEMEE3b1VZYXpQNUFnTUIKQUFHaldqQllNQTRHQTFVZER3RUIvd1FFQXdJRm9EQVRCZ05WSFNVRUREQUtCZ2dyQmdFRkJRY0RBVEFmQmdOVgpIU01FR0RBV2dCVHNsQy9ZTkExQ1QzQXV4UmxNR1QvSWo2eHB3VEFRQmdOVkhSRUVDVEFIZ2dWaExtTnZiVEFOCkJna3Foa2lHOXcwQkFRc0ZBQU9DQVlFQWF2aGpJTGxXSkF6aGdVMUdaKzJZK1ozeXFQdGlUc0NhNGRKWXRCL3MKdURoZjEwTGlxUEtPcEFKWmZ1ZllWM2NYNGU1eDg2NnZTQWFKbDlYbkpvL0VDNXpIc0tOclphSG10Qm9QOE9IOQoyOVJ2WWtOL1pad2tQdEx0T0FCRmNtakM3Y1kvQnJnbDE3WEJzVnFzRFVOdDI4dG9hSEJVTE9lcndtMjNrbFJSCm9naHhRN3RncVJuR1VNb1M1Sm4wR3hGQXBxbXBHN3FrNnpGak9ad0RwUDZ2N2F2Yi9oOGx3NGJtRFJaMDVTaXAKbEdGU3pldXhiU2FGNFNTUFVrUXdYVTI0RmRjODE1WnJoMnBYSE11ZDhGRUd1UVhSbDVGTGNVc3J6YkgraHpUMApKZmJ3cjQxT1RET2RVd09GOHI1dkRtKy9tM1lyTmh4WkVMSnpObjdldXowU3Uwc2gxMEJWYUhuSTV4bU41RXJECmxjN0sxeFRNM1paVkpQUHlDZDgxVnJzM1F2akdpSlN0bVFld2kxc3Z3TjI1dnI4Qlg2MytCTDNYV29rRGJoVFoKbzdCRlc0TDZ2cVJzL3dvWjUyYmVCT1N2MnRLeGlSQnE2dnVJVlREbGdTTzAzbTRPWlFRbEI1V3c4WmZ0V1dScQpWY1E2VTljYUtWSk03Q3JmSEtXZGtPOWUKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=

[root@node-1 ~]# cat a.com-key.pem | base64 | tr -d "\n" | awk '{print $0}'
LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUV2QUlCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktZd2dnU2lBZ0VBQW9JQkFRQ2V4UTcwQWlpMGNQb0YKazBFZXFrYmF2L2FTY3JURExGck9MaDZKT2FIKzRzZmVNZGRSdFJEV0RYSU4rQjZYb2k0QmpTS3ROZ1RUT0Y5WApyZjI5Q1lhay9kbTl3VG14MWh0UGlsenZEcU5CV1ZjcEhhYnBMaThETEFheG1LNDdRWG9iZkpJeVNBWGs5ZXpkClM2ZDhKTXFDTnlTR0llNHJ4ZVU3SDNrblA4TEhObU5mTDVjRHNUK3UxUmFlSm5VTE8wTVM2akxuRmtlRmNLVEIKTnpPemNHVk01Z2pxc1Z6Zi82ejFyUnFHRXQ0aTVhSWc3cEVMVVVkcXZsRURSTjlQaWpqTExuaEI5U2xiVis2eApDRG9ERHFsTHpheG1kMTZ1ckNvODVEcmFCZTF1MzAvMStwUGpKRzlhNkt0SHdjcU5iYWNXVEo0cWZ4T25rRDBBCjdvVVlhelA1QWdNQkFBRUNnZ0VBY01SZC9vbWFCNjlHcGJjVlJZYURsTk5MZW5EbVdzbWlKVmMwY1JyeUtHdEMKc2xxTUtJaUdVTUowQTkvN09wQUNSUy9OTldGc3cra0NMdkJ4akZhN3YyeGR2eDBDc1lEMUhPV1ZaR1h0Sm5raQpJeDNnY3paT1JkNTdVcUN5LzN0ZUV5L0RWdHM0OUlxSGxoWXArMDdXVnU1N2pwbUM1S3hHU0Z2dVhTWTRYZXp3CitoYzlnbkx2NldaM2g0ZEFGQjRhZTAxWUNTQk00dUFmRXNSaWlGMFJRbXYrZHBCRkVzTHBHZ2pYNDF3MTNTMzAKMmFOZlZQUEFXaFlIYk5RUFNacnB0QTlwRTUvTHYzSGlBUXVsMC84VUNkNFovckZ6R0xMTmUrV1duSUx3NEtNQgplM3o0ekVDMm9pU3UvSXpRdE5Bd0FjSkg3OUtOZUgrcGZmQ3pQd1g2RVFLQmdRRElERmRpVmZnZkxMNC83OGZ5CmNhODJrTXp0WjdFTW1LVmZub0xIdEVKc2VSMEtHWVk3YURJbUYxYmJYVmhpdTlseHFIcEJFWm5ualJuLzBCS3EKU0sydnVFOG9DdEJGaVpCamtpdWFYdDZXSi9pZkY0dzk4Z3MrVG5hbzNZK3lkODhEbDF0NVhwL2o0SVhPYnR5cApnTmtjY3M4aVpZMkNIT1hVdFNNTzFhN2cvd0tCZ1FETExTTXVERFNkZ09OZzJEZTAyVGk1b1kwMGVwNnVFanI5CndXM1hzdVBUdlhpeDVTd2ZaOG10ZytPZlZqTU0rNkRqMmRkLzZMZGVCNS9kZUhraGNFL0UyYUFWSWNkSjJxTFIKeVYySzhVUS9Xak9VNGVyZ1JMOG9iMmw4bDRBMXpEWHROZ3JPNFFsUVRyNk1KaHlscThJMDRHb01tUXJXaVB6Tgp6OHdvemUvekJ3S0JnRmtiWmpFZktnNTQxNldUSVBVVlBuNkhzVUJ1VjZiTXQ1MEg5aWtPV2lnSEtyQTgvbFduCjYrNmJwc3kvbjRjYk5aZ3krNEhRWFVXT3pHM3VPT0l3eld6Z0pDSXA3dXVLZ3c1WEphVDFiU0JsWFpFLzQvQVQKeUg1UVpQcUM5bWNBaHUyS2xleFNBZFozUkNMWHJ1S3h5Z09xQUNuS0ltWTZpUVZlU2VkcHR5UHhBb0dBTFdidgp4cGw1cEh5cDB2bGVNVzZkSzNZN2JLKytCOTRSQ3FXUDJ6U2hqcTUzYXlGd0k3QjRzK3FXRWdRY01sbUVrWVliCmp2eTlCU2tsQTBPcHBkeElKeEFPb3NwQ2szRmxFd1l4Zmh2K0NUNHA2cW8xWjFwVmNUNjhUdGc0RVUySiszRXAKSnlQSWhnYWl0QVRNUUFWS3g3QWlZcUJNZUxaeDc3Znd3bW1LcGo4Q2dZQUZXU215ckdIdG1Qa1F4SjhRMEViRQpuWnl4aE56bFprc2ZTc2NtNm95OXhYeWFMWllMem0zdWdFSmVkb3cxdkJYdFJtaXJtT0pXTXRzK0ZIeXU2cDhKCjk1OTVLcmxMQ1p4WXJLaXpLc2xaUjV3VDI3aW5xdDF1dlJsb0prOWpudUU0cXdKdDlYSndQQXpoSzRDc3g4S1YKZXVZVU53Zy9GYTA0VWFEMFpYa245dz09Ci0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0K
```

② 创建YAML文件https.yaml

![image-20220621155809588](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220621155809588.png)

> 特别注意：上面base64编码的证书内容之间不能有换行符，否则会有这种报错
>
> ```bash
> [root@node-1 ~]# kubectl apply -f https.yaml 
> error: error parsing https.yml: error converting YAML to JSON: yaml: line 9: could not find expected ':'
> ```

:::

## 

## 数据存储

文档：[https://kubernetes.io/zh-cn/docs/concepts/storage/volumes/](https://kubernetes.io/zh-cn/docs/concepts/storage/volumes/)

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
      app: demo
  template:
    metadata:
      labels:           
        app: demo
    spec:
      containers:
      - name: demo1
        image: busybox:1.28
        command: ['sh', '-c', 'echo The app is running! && sleep 3600']
        volumeMounts:
          - name: data
            mountPath: /data1      # 一般情况下两个容器会设置相同的挂载点，这里仅为学习演示，所以设置不同的挂载点
      - name: demo2
        image: busybox:1.28
        command: ['sh', '-c', 'echo The app is running! && sleep 3600']
        volumeMounts:
          - name: data
            mountPath: /data2     # 一般情况下两个容器会设置相同的挂载点，这里仅为学习演示，所以设置不同的挂载点

      volumes:
        - name: data
          # 临时存储卷，与Pod生命周期绑定在一起，如果Pod被删除了卷也会被删除
          emptyDir: {}
EOF

# 创建
[root@node0 k8s]# kubectl apply -f demo.yml 
deployment.apps/demo created

# 查看Pod
[root@node0 k8s]# kubectl get pods -o wide
NAME                   READY   STATUS    RESTARTS   AGE   IP              NODE    NOMINATED NODE   READINESS GATES
demo-85846f8b7-4qtv6   2/2     Running   0          23s   10.233.154.30   node1   <none>           <none>
demo-85846f8b7-brvdl   2/2     Running   0          23s   10.233.44.96    node2   <none>           <none>
demo-85846f8b7-h7h7n   2/2     Running   0          23s   10.233.30.30    node0   <none>           <none>

# 同一个Pod内测试共享存储
[root@node0 k8s]# kubectl exec -it demo-85846f8b7-4qtv6 -c demo1 -- sh 
/ # seq 10 > /data1/1.txt
[root@node0 k8s]# kubectl exec -it demo-85846f8b7-4qtv6 -c demo2 -- sh 
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
[root@node0 k8s]# kubectl exec -it demo-85846f8b7-brvdl -c demo2 -- sh 
/ # ls /data2/
```

:::

::: details  （2）hostPath：需保证在同一个Node节点上的Pod才能共享数据

```bash
# 生成yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
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
        image: busybox:1.28
        command: ['sh', '-c', 'echo The app is running! && sleep 3600']
        volumeMounts:
          - name: data
            mountPath: /data1      # 一般情况下两个容器会设置相同的挂载点，这里仅为学习演示，所以设置不同的挂载点
      - name: demo2
        image: busybox:1.28
        command: ['sh', '-c', 'echo The app is running! && sleep 3600']
        volumeMounts:
          - name: data
            mountPath: /data2     # 一般情况下两个容器会设置相同的挂载点，这里仅为学习演示，所以设置不同的挂载点

      volumes:
        - name: data
          hostPath:
            path: /tmp         # 所有宿主机都有/tmp目录
            type: Directory
EOF

# 创建
[root@node0 k8s]# kubectl apply -f demo.yml 
deployment.apps/demo created

# 查看Pod
[root@node0 ~]# kubectl get pods -o wide
NAME                    READY   STATUS    RESTARTS   AGE     IP              NODE    NOMINATED NODE   READINESS GATES
demo-7557dc6f66-4gk49   2/2     Running   0          2m47s   10.233.154.36   node1   <none>           <none>
demo-7557dc6f66-4tvlr   2/2     Running   0          2m47s   10.233.30.38    node0   <none>           <none>
demo-7557dc6f66-7l9rv   2/2     Running   0          2m47s   10.233.44.102   node2   <none>           <none>
demo-7557dc6f66-9479q   2/2     Running   0          2m47s   10.233.154.35   node1   <none>           <none>
demo-7557dc6f66-f67g8   2/2     Running   0          2m47s   10.233.44.101   node2   <none>           <none>
demo-7557dc6f66-tglgk   2/2     Running   0          2m47s   10.233.30.37    node0   <none>           <none>

# 在Node0节点的容器上写入数据
[root@node0 ~]# kubectl exec -it demo-7557dc6f66-tglgk -c demo1 -- sh
/ # seq 3 >/data1/node0-1.txt

# 在同一个Pod不同容器中查看数据
/ # [root@node0 ~]# kubectl exec -it demo-7557dc6f66-tglgk -c demo2 -- sh
/ # cat /data2/node0-1.txt 
1
2
3

# 在同一个Node节点上的不同Pod中查看数据
/ # [root@node0 ~]# kubectl exec -it demo-7557dc6f66-4tvlr -c demo1 -- cat /data1/node0-1.txt
1
2
3
[root@node0 ~]# kubectl exec -it demo-7557dc6f66-4tvlr -c demo2 -- cat /data2/node0-1.txt
1
2
3

# 在不同的Node节点上看不到数据
[root@node0 ~]# kubectl exec -it demo-7557dc6f66-4gk49 -c demo1 -- sh
/ # ls -l /data1/
total 4
drwxr-xr-x    5 root     root          4096 Jun 20 23:15 releases
drwx------    2 root     root             6 Jun 26 02:15 vmware-root_780-2957124724
drwx------    2 root     root             6 Jun 21 06:23 vmware-root_783-4281646632
drwx------    2 root     root             6 Jun 20 22:21 vmware-root_785-4282170929
drwx------    2 root     root             6 Jun 24 02:34 vmware-root_786-2957649005
drwx------    2 root     root             6 Jun 26 00:27 vmware-root_788-2957517930
drwx------    2 root     root             6 Jun 25 07:57 vmware-root_790-2965972456
drwx------    2 root     root             6 Jun 25 03:22 vmware-root_800-2999657415
```

:::

::: details  （3）nfs

**准备工作**

安装NFS Server及依赖：[https://jinhui.dev/container/kubernetes-deploy-binary.html#_5-nfs存储](https://jinhui.dev/container/kubernetes-deploy-binary.html#_5-nfs存储)

**测试NFS**

```bash
# 生成yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
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
        image: busybox:1.28
        command: ['sh', '-c', 'echo The app is running! && sleep 3600']
        volumeMounts:
          - name: data
            mountPath: /data1      # 一般情况下两个容器会设置相同的挂载点，这里仅为学习演示，所以设置不同的挂载点
      - name: demo2
        image: busybox:1.28
        command: ['sh', '-c', 'echo The app is running! && sleep 3600']
        volumeMounts:
          - name: data
            mountPath: /data2     # 一般情况下两个容器会设置相同的挂载点，这里仅为学习演示，所以设置不同的挂载点

      volumes:
        - name: data
          nfs:
            server: 192.168.48.128
            path: /data/k8s
EOF

# 创建
[root@node0 k8s]# kubectl apply -f demo.yml 
deployment.apps/demo created

# 查看Pod
[root@node0 k8s]# kubectl get pods -o wide
NAME                    READY   STATUS    RESTARTS   AGE   IP             NODE    NOMINATED NODE   READINESS GATES
demo-57ff9bdfd7-5m6zj   2/2     Running   0          44s   10.233.44.4    node2   <none>           <none>
demo-57ff9bdfd7-dlr5s   2/2     Running   0          44s   10.233.44.5    node2   <none>           <none>
demo-57ff9bdfd7-kl7rp   2/2     Running   0          44s   10.233.30.4    node0   <none>           <none>
demo-57ff9bdfd7-sm9d2   2/2     Running   0          44s   10.233.30.5    node0   <none>           <none>
demo-57ff9bdfd7-xvdrm   2/2     Running   0          44s   10.233.154.7   node1   <none>           <none>
demo-57ff9bdfd7-zkmlr   2/2     Running   0          44s   10.233.154.8   node1   <none>           <none>

# 在node2节点上的容器写入数据
[root@node0 k8s]# kubectl exec -it demo-57ff9bdfd7-5m6zj -c demo1 -- sh
/ # seq 3 > /data1/node2

# 在node1上的容器上查看数据
[root@node0 k8s]# kubectl exec -it demo-57ff9bdfd7-xvdrm -c demo1 -- sh
/ # ls /data1/
node2
/ # cat /data1/node2
1
2
3

# 查看node上的挂载情况
[root@node1 ~]# mount | grep -i nfs
192.168.48.128:/data/k8s on /var/lib/kubelet/pods/07f6dfbc-ba37-405e-a5b5-45281b764913/volumes/kubernetes.io~nfs/data type nfs4 (rw,relatime,vers=4.1,rsize=524288,wsize=524288,namlen=255,hard,proto=tcp,timeo=600,retrans=2,sec=sys,clientaddr=192.168.48.134,local_lock=none,addr=192.168.48.128)
192.168.48.128:/data/k8s on /var/lib/kubelet/pods/35f5d23d-e65c-406f-ac91-ad4adfca060e/volumes/kubernetes.io~nfs/data type nfs4 (rw,relatime,vers=4.1,rsize=524288,wsize=524288,namlen=255,hard,proto=tcp,timeo=600,retrans=2,sec=sys,clientaddr=192.168.48.134,local_lock=none,addr=192.168.48.128)
```

:::

### 持久卷

文档：[https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/](https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/)

注意：

* PV不区分命名空间，PVC区分命名空间

#### 示例

::: details 第一步：创建PV（PersistentVolume）

```bash
# 生成yaml文件
[root@node0 k8s]# cat > pv.yml <<- EOF
apiVersion: v1
kind: PersistentVolume
metadata:
  name: demo-pv
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
    path: /data/pv
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
[root@node0 k8s]# kubectl apply -f pv.yml
persistentvolume/demo-pv created
 
 # 查看PV
[root@node0 k8s]# kubectl get pv -o wide
NAME      CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM   STORAGECLASS    REASON   AGE   VOLUMEMODE
demo-pv   100Gi      RWX            Delete           Available           local-storage            6s    Filesystem
```

:::

::: details  第二步：创建PVC（PersistentVolumeClaims）

```bash
# 生成yaml文件
[root@node0 k8s]# cat > pvc.yml <<- EOF
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: demo-pvc
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
[root@node0 k8s]# kubectl apply -f pvc.yml 
persistentvolumeclaim/demo-pvc created

# 查看PVC，状态为Bound
[root@node0 k8s]# kubectl get pvc -o wide
NAME       STATUS   VOLUME    CAPACITY   ACCESS MODES   STORAGECLASS    AGE   VOLUMEMODE
demo-pvc   Bound    demo-pv   100Gi      RWX            local-storage   4s    Filesystem

# 再次查看我们的PV，发现状态已经变为Bound
[root@node0 k8s]# kubectl get pv -o wide
NAME      CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM              STORAGECLASS    REASON   AGE   VOLUMEMODE
demo-pv   100Gi      RWX            Delete           Bound    default/demo-pvc   local-storage            10m   Filesystem
```

:::

::: details  第三步：使用PVC（PersistentVolumeClaims）

```bash
# 生成yaml文件
[root@node0 k8s]# cat > pvc.yml <<- EOF
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
        image: busybox:1.28
        command: ['sh', '-c', 'echo The app is running! && sleep 3600']
        volumeMounts:
          - name: data
            mountPath: /data
      volumes:
        - name: data
          persistentVolumeClaim:   # 固定字段
            claimName: demo-pvc    # 指定PVC名称
EOF

# 创建
[root@node0 k8s]# kubectl apply -f demo.yml 
deployment.apps/demo created

# 查看Deployment
[root@node0 k8s]# kubectl get deploy -o wide
NAME   READY   UP-TO-DATE   AVAILABLE   AGE   CONTAINERS   IMAGES         SELECTOR
demo   3/3     3            3           16s   demo         busybox:1.28   app=demo

# 查看Pod
[root@node0 k8s]# kubectl get pods -o wide
NAME                   READY   STATUS    RESTARTS   AGE   IP              NODE    NOMINATED NODE   READINESS GATES
demo-c846f7545-445zm   1/1     Running   0          18s   10.233.154.13   node1   <none>           <none>
demo-c846f7545-8jxkv   1/1     Running   0          18s   10.233.30.22    node0   <none>           <none>
demo-c846f7545-jsfx2   1/1     Running   0          18s   10.233.44.9     node2   <none>           <none>

# 因为我们的PV使用的local卷，所以每个节点上的Pod数据并不共享，下面来实验一下

# (1) node0节点生成数据
[root@node0 k8s]# seq 3 > /data/pv/node0.txt 
# (2) node0节点上的Pod可以正常拿到数据
[root@node0 k8s]# kubectl exec -it demo-c846f7545-8jxkv -- cat /data/node0.txt
1
2
3
# (3) node1节点上的Pod则看不到数据
[root@node0 k8s]# kubectl exec -it demo-c846f7545-445zm -- cat /data/node0.txt
cat: can't open '/data/node0.txt': No such file or directory
command terminated with exit code 1
```

:::

#### PV 类型

文档：[https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/#types-of-persistent-volumes](https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/#types-of-persistent-volumes)

| 分类 | 卷         | 说明                                                         |
| ---- | ---------- | ------------------------------------------------------------ |
| 本地 | `local`    | 节点上挂载的本地存储设备（各节点之间数据不共享）             |
|      | `hostPath` | 仅供单节点测试使用；不适用于多节点集群； 请尝试使用 `local` 卷作为替代 |
| 网络 | `nfs`      | NFS支持                                                      |
|      | `cephfs`   | Ceph支持                                                     |

::: details  nfs示例

```bash
# 生成yaml文件
[root@node0 k8s]# cat > pvc.yml <<- EOF
apiVersion: v1
kind: PersistentVolume
metadata:
  name: demo-pv
spec:
  capacity:                                 # pv容量
    storage: 100Gi                          #
  volumeMode: Filesystem                    # 卷模式
  accessModes:                              # 访问模式
  - ReadWriteMany                           #
  persistentVolumeReclaimPolicy: Delete     # 回收策略
  storageClassName: local-storage           # 存储类
  nfs:
    server: 192.168.48.128                  # NFS地址
    path: /data/k8s                         # NFS中共享的路径
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: demo-pvc
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
        image: busybox:1.28
        command: ['sh', '-c', 'echo The app is running! && sleep 3600']
        volumeMounts:
          - name: data
            mountPath: /data
      volumes:
        - name: data
          persistentVolumeClaim:   # 固定字段
            claimName: demo-pvc    # 指定PVC名称
EOF

# 创建
[root@node0 k8s]# kubectl apply -f demo.yml
persistentvolume/demo-pv created
persistentvolumeclaim/demo-pvc created
deployment.apps/demo created

# 查看Pod
[root@node0 k8s]# kubectl get pods -o wide
NAME                   READY   STATUS    RESTARTS   AGE   IP              NODE    NOMINATED NODE   READINESS GATES
demo-c846f7545-57jmd   1/1     Running   0          7s    10.233.154.14   node1   <none>           <none>
demo-c846f7545-9nmj2   1/1     Running   0          7s    10.233.30.23    node0   <none>           <none>
demo-c846f7545-qzpd4   1/1     Running   0          7s    10.233.44.10    node2   <none>           <none>

# 在NFS中创建一些数据
[root@node0 k8s]# ll /data/k8s
total 0
[root@node0 k8s]# seq 3 > /data/k8s/all.txt

# 在所有的节点的Pod中查看数据
[root@node0 k8s]# kubectl exec -it demo-c846f7545-57jmd -- cat /data/all.txt
1
2
3

[root@node0 k8s]# kubectl exec -it demo-c846f7545-9nmj2 -- cat /data/all.txt
1
2
3

[root@node0 k8s]# kubectl exec -it demo-c846f7545-qzpd4 -- cat /data/all.txt
1
2
3
```

:::

#### 存储类

文档：[https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/#class](https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/#class)

* 存储类其实就是一个标识，是一个字符串，`Kubernetes` 本身并不清楚各种类代表的什么
* 存储类会影响`PVC`绑定`PV`

::: details  PVC指定一个不存在的存储类，看看会发生什么

```bash
# 生成yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: v1
kind: PersistentVolume
metadata:
  name: demo-pv
spec:
  capacity:                                 # pv容量
    storage: 100Gi                          #
  volumeMode: Filesystem                    # 卷模式
  accessModes:                              # 访问模式
  - ReadWriteMany                           #
  persistentVolumeReclaimPolicy: Delete     # 回收策略
  storageClassName: nfs-1                   # 存储类
  nfs:
    server: 192.168.48.128                  # NFS地址
    path: /data/k8s                         # NFS中共享的路径
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: demo-pvc
  namespace: default
spec:
  volumeMode: Filesystem                    # 卷模式
  accessModes:                              # 访问模式
  - ReadWriteMany
  storageClassName: nfs-2                   # 存储类
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
        image: busybox:1.28
        command: ['sh', '-c', 'echo The app is running! && sleep 3600']
        volumeMounts:
          - name: data
            mountPath: /data
      volumes:
        - name: data
          persistentVolumeClaim:   # 固定字段
            claimName: demo-pvc    # 指定PVC名称
EOF

# 创建
[root@node0 k8s]# kubectl apply -f demo.yml 
persistentvolume/demo-pv created
persistentvolumeclaim/demo-pvc created
deployment.apps/demo unchanged

# 查看Pod
[root@node0 k8s]# kubectl get pods -o wide
NAME                   READY   STATUS    RESTARTS   AGE   IP       NODE     NOMINATED NODE   READINESS GATES
demo-c846f7545-4kmw7   0/1     Pending   0          5s    <none>   <none>   <none>           <none>
demo-c846f7545-fg7tx   0/1     Pending   0          5s    <none>   <none>   <none>           <none>
demo-c846f7545-tps5k   0/1     Pending   0          5s    <none>   <none>   <none>           <none>

# 查看Pod详情
[root@node0 k8s]# kubectl describe pod demo-c846f7545-4kmw7
...
Events:
  Type     Reason            Age   From               Message
  ----     ------            ----  ----               -------
  Warning  FailedScheduling  22s   default-scheduler  0/3 nodes are available: 3 pod has unbound immediate PersistentVolumeClaims.
```

:::

#### PV 回收策略

文档：[https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/#reclaiming](https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/#reclaiming)

| 回收策略        | 说明                                                         |
| --------------- | ------------------------------------------------------------ |
| 保留（Retain）  | 用户可以手动回收资源（默认回收策略）                         |
| 删除（Delete）  | 自动删除PV对象                                               |
| 回收（Recycle） | 回收策略 `Recycle` 已被废弃。取而代之的建议方案是使用动态供应 |

::: details  保留（Retain）策略说明：保留PV，并将PV状态设置为Released

```bash
# 生成yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: v1
kind: PersistentVolume
metadata:
  name: demo-pv
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
  name: demo-pvc
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
        image: busybox:1.28
        command: ['sh', '-c', 'echo The app is running! && sleep 3600']
        volumeMounts:
          - name: data
            mountPath: /data
      volumes:
        - name: data
          persistentVolumeClaim:   # 固定字段
            claimName: demo-pvc    # 指定PVC名称
EOF

# 创建
[root@node0 k8s]# kubectl apply -f demo.yml 
persistentvolume/demo-pv created
persistentvolumeclaim/demo-pvc created
deployment.apps/demo created

# 查看Pod
[root@node0 k8s]# kubectl get pods
NAME                   READY   STATUS    RESTARTS   AGE
demo-c846f7545-fd9kk   1/1     Running   0          20s
demo-c846f7545-fxm49   1/1     Running   0          20s
demo-c846f7545-jcsfq   1/1     Running   0          20s

# 删除Deployment
[root@node0 k8s]# kubectl delete deploy demo
deployment.apps "demo" deleted

# 查看PVC和PV
[root@node0 k8s]# kubectl get pvc
NAME       STATUS   VOLUME    CAPACITY   ACCESS MODES   STORAGECLASS    AGE
demo-pvc   Bound    demo-pv   100Gi      RWX            local-storage   31s

[root@node0 k8s]# kubectl get pv
NAME      CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM              STORAGECLASS    REASON   AGE
demo-pv   100Gi      RWX            Retain           Bound    default/demo-pvc   local-storage            34s

# 删除PVC
[root@node0 k8s]# kubectl delete pvc demo-pvc
persistentvolumeclaim "demo-pvc" deleted

# 查看PV，状态变为Released(已释放)，由于卷上仍然存在这前一申领人的数据，该卷还不能用于其他申领
[root@node0 k8s]# kubectl get pv
NAME      CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS     CLAIM              STORAGECLASS    REASON   AGE
demo-pv   100Gi      RWX            Retain           Released   default/demo-pvc   local-storage            72s
```

:::

::: details  删除（Delete）策略说明：NFS和local等都不支持Delete策略，故本次测试的并不充分

```bash
# 生成yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: v1
kind: PersistentVolume
metadata:
  name: demo-pv
spec:
  capacity:                                 # pv容量
    storage: 100Gi                          #
  volumeMode: Filesystem                    # 卷模式
  accessModes:                              # 访问模式
  - ReadWriteMany                           #
  persistentVolumeReclaimPolicy: Delete     # 回收策略
  storageClassName: local-storage           # 存储类
  nfs:
    server: 192.168.48.128                  # NFS地址
    path: /data/k8s                         # NFS中共享的路径
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: demo-pvc
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
        image: busybox:1.28
        command: ['sh', '-c', 'echo The app is running! && sleep 3600']
        volumeMounts:
          - name: data
            mountPath: /data
      volumes:
        - name: data
          persistentVolumeClaim:   # 固定字段
            claimName: demo-pvc    # 指定PVC名称
EOF

# 查看Deployment
root@node0 k8s]# kubectl get deploy
NAME   READY   UP-TO-DATE   AVAILABLE   AGE
demo   3/3     3            3           29s

# 查看PV
[root@node0 k8s]# kubectl get pv
NAME      CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM              STORAGECLASS    REASON   AGE
demo-pv   100Gi      RWX            Delete           Bound    default/demo-pvc   local-storage            31s

# 查看PVC
[root@node0 k8s]# kubectl get pvc
NAME       STATUS   VOLUME    CAPACITY   ACCESS MODES   STORAGECLASS    AGE
demo-pvc   Bound    demo-pv   100Gi      RWX            local-storage   33s

# 删除Deployment
[root@node0 k8s]# kubectl delete deploy demo
deployment.apps "demo" deleted

# 再次查看PV，没有发生变化
[root@node0 k8s]# kubectl get pv
NAME      CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM              STORAGECLASS    REASON   AGE
demo-pv   100Gi      RWX            Delete           Bound    default/demo-pvc   local-storage            2m48s

# 再次查看PVC，没有发生变化
[root@node0 k8s]# kubectl get pvc
NAME       STATUS   VOLUME    CAPACITY   ACCESS MODES   STORAGECLASS    AGE
demo-pvc   Bound    demo-pv   100Gi      RWX            local-storage   2m50s

# 删除PVC
[root@node0 k8s]# kubectl delete pvc demo-pvc
persistentvolumeclaim "demo-pvc" deleted

# 查看PV，状态变为Failed
[root@node0 k8s]# kubectl get pv
NAME      CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM              STORAGECLASS    REASON   AGE
demo-pv   100Gi      RWX            Delete           Failed   default/demo-pvc   local-storage            4m17s

# 看一下Failed的详情，没有找到插件来删除PV，也就是说NFS类型的持久卷并不支持Delete回收策略
# 经测试，本地存储local也不支持Delete回收策略
[root@node0 k8s]# kubectl describe pv demo-pv
...
Events:
  Type     Reason              Age   From                         Message
  ----     ------              ----  ----                         -------
  Warning  VolumeFailedDelete  112s  persistentvolume-controller  error getting deleter volume plugin for volume "demo-pv": no deletable volume plugin matched
```

:::

#### PV动态供给

文档：

* [https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/#dynamic](https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/#dynamic)
* [https://kubernetes.io/zh-cn/docs/concepts/storage/storage-classes/#nfs](https://kubernetes.io/zh-cn/docs/concepts/storage/storage-classes/#nfs)

安装依赖：

* [https://jinhui.dev/container/kubernetes-deploy-binary.html#_5-nfs存储](https://jinhui.dev/container/kubernetes-deploy-binary.html#_5-nfs存储)

::: details  使用NFS动态供给：我们不再需要自定义PV，而是由NFS驱动动态创建PV

```bash
# 生成yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: demo-pvc
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
        image: busybox:1.28
        command: ['sh', '-c', 'echo The app is running! && sleep 3600']
        volumeMounts:
          - name: data
            mountPath: /data
      volumes:
        - name: data
          persistentVolumeClaim:   # 固定字段
            claimName: demo-pvc    # 指定PVC名称
EOF

# 创建
[root@node0 k8s]# kubectl apply -f demo.yml 
persistentvolumeclaim/demo-pvc created
deployment.apps/demo created

# 查看Pod
[root@node0 k8s]# kubectl get pods -n kube-public -o wide
NAME                   READY   STATUS    RESTARTS   AGE   IP              NODE    NOMINATED NODE   READINESS GATES
demo-c846f7545-q4wj8   1/1     Running   0          26s   10.233.154.25   node1   <none>           <none>
demo-c846f7545-qslk7   1/1     Running   0          26s   10.233.44.29    node2   <none>           <none>
demo-c846f7545-tccdw   1/1     Running   0          26s   10.233.30.34    node0   <none>           <none>

# 查看PV（不区分命名空间的）
[root@node0 k8s]# kubectl get pv 
NAME                                       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM                  STORAGECLASS   REASON   AGE
pvc-dfbc1a8a-d97b-4db4-9e13-63e39ed054ff   5Gi        RWX            Delete           Bound    kube-public/demo-pvc   nfs-client              77s

# 查看PVC（PVC需要区分命名空间）
[root@node0 k8s]# kubectl get pvc
No resources found in default namespace.

[root@node0 k8s]# kubectl get pvc -n kube-public
NAME       STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
demo-pvc   Bound    pvc-dfbc1a8a-d97b-4db4-9e13-63e39ed054ff   5Gi        RWX            nfs-client     92s

# 查看NFS目录内容
[root@node0 k8s]# ls -l /data/k8s
total 0
drwxrwxrwx. 2 root root 6 Jul 14 17:41 kube-public-demo-pvc-pvc-dfbc1a8a-d97b-4db4-9e13-63e39ed054ff

[root@node0 k8s]# ls -l /data/k8s/kube-public-demo-pvc-pvc-dfbc1a8a-d97b-4db4-9e13-63e39ed054ff/
total 0

# 写入点内容
[root@node0 k8s]# seq 10 > /data/k8s/kube-public-demo-pvc-pvc-dfbc1a8a-d97b-4db4-9e13-63e39ed054ff/a.txt

# 删除Deployment和PVC
[root@node0 k8s]# kubectl delete -f demo.yml
persistentvolumeclaim "demo-pvc" deleted
deployment.apps "demo" deleted

# 检查PV是否删除
[root@node0 k8s]# kubectl get pv
No resources found

# 检查NFS中的内容是否删除
# 因为我们NFS驱动的archiveOnDelete为false，所以这里会真的把数据删除，而不是将目录改名(以archived-开头)
[root@node0 k8s]# ls /data/k8s/
```

:::

#### 访问模式

文档：[https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/#access-modes](https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/#access-modes)

| 访问模式         | 简写形式 | 说明                                                         |
| ---------------- | -------- | ------------------------------------------------------------ |
| ReadWriteMany    | RWX      | 卷可以被多个节点以读写方式挂载                               |
| ReadOnlyMany     | ROX      | 卷可以被多个节点以只读方式挂载                               |
| ReadWriteOnce    | RWO      | 卷可以被一个节点以读写方式挂载。 ReadWriteOnce 访问模式也允许运行在同一节点上的多个 Pod 访问卷。 |
| ReadWriteOncePod | RWOP     | 卷可以被单个 Pod 以读写方式挂载。 如果你想确保整个集群中只有一个 Pod 可以读取或写入该 PVC， 请使用ReadWriteOncePod 访问模式。这只支持 CSI 卷以及需要 Kubernetes 1.22 以上版本。 |

注意事项：

* 访问模式会影响`PVC`绑定`PV`

::: details ReadWriteOnce示例

```bash
# 生成yaml文件
[root@node0 k8s]# cat > demo.yml <<- EOF
apiVersion: v1
kind: PersistentVolume
metadata:
  name: demo-pv
spec:
  capacity:                                 # pv容量
    storage: 100Gi                          #
  volumeMode: Filesystem                    # 卷模式
  accessModes:                              # 访问模式
  - ReadWriteOnce                           #
  persistentVolumeReclaimPolicy: Retain     # 回收策略
  storageClassName: local-storage           # 存储类
  nfs:
    server: 192.168.48.128                  # NFS地址
    path: /data/k8s                         # NFS中共享的路径
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: demo-pvc
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
        image: busybox:1.28
        command: ['sh', '-c', 'echo The app is running! && sleep 3600']
        volumeMounts:
          - name: data
            mountPath: /data
      volumes:
        - name: data
          persistentVolumeClaim:   # 固定字段
            claimName: demo-pvc    # 指定PVC名称
EOF

# 创建
[root@node0 k8s]# kubectl apply -f demo.yml 
persistentvolumeclaim/demo-pvc created
deployment.apps/demo created
```

:::

## 

## 应用发布策略

### 策略说明

| 发布策略                        | 说明                                             | 备注                                          |
| ------------------------------- | ------------------------------------------------ | --------------------------------------------- |
| RollingUpdate - 滚动更新        | 先启动新版本的Pod，待其启动完成后，再杀死旧Pod   | 默认的更新策略；更新过程中新老Pod都会收到请求 |
| Recreate - 重新创建             | 现有的全部Pods被杀死成功后，才会创建新版本的 Pod |                                               |
| 蓝绿部署（有时也称为红/黑部署） | 同时启动2个版本的Pod，通过Service匹配指定的版本  | 更新过程中只有某一个版本能收到请求            |
| 金丝雀部署                      |                                                  |                                               |



### 滚动更新

文档：[https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/deployment/#strategy](https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/deployment/#strategy)

**配置说明**

| 字段                                                         | 可选字段 | 默认值          | 说明                                                         |
| ------------------------------------------------------------ | -------- | --------------- | ------------------------------------------------------------ |
| 更新策略类型<br />（`.spec.strategy.type`）                  | 是       | `RollingUpdate` |                                                              |
| 最大不可用<br />（`.spec.strategy.rollingUpdate.maxUnavailable`） | 是       | `25%`           | 可以是绝对数字（例如，5），<br />也可以是所需 Pods 的百分比（例如，10%）；<br />百分比值会转换成绝对数并去除小数部分 |
| 最大峰值<br />（`.spec.strategy.rollingUpdate.maxSurge`）    | 是       | `25%`           | 可以是绝对数字（例如，5），<br />也可以是所需 Pods 的百分比（例如，10%）；<br />百分比值会通过向上取整转换为绝对数 |
| 最短就绪时间<br />（`.spec.minReadySeconds`）                | 是       | 0               | 指定新创建的 Pod 在没有任意容器崩溃情况下的最小就绪时间， 只有超出这个时间 Pod 才被视为可用 |

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

### 蓝绿部署

```bash
# 创建Deployment blue版本
[root@node-1 ~]# cat > demo-deployment-blue.yml <<- EOF
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
cp demo-deployment-blue.yml demo-deployment-green.yml
sed -ri 's/name: demo-blue/name: demo-green/' demo-deployment-green.yml    # 修改Deployment名字
sed -ri 's/strategy: blue/strategy: green/' demo-deployment-green.yml      # 修改蓝绿版本标识符，这里使用标签来做
sed -ri 's/image: nginx:1.22/image: nginx:1.23/' demo-deployment-green.yml # 新版本镜像升级


# 创建Service
[root@node-1 ~]# cat > demo-service.yml <<- EOF
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

[root@node-1 ~]# kubectl get pods
NAME                         READY   STATUS    RESTARTS   AGE
demo-blue-79cff87869-4glmt   1/1     Running   0          3s
demo-blue-79cff87869-m4gct   1/1     Running   0          3s
demo-blue-79cff87869-zhsx7   1/1     Running   0          3s
demo-green-98f4b7bbf-5f27q   1/1     Running   0          3s
demo-green-98f4b7bbf-cnj88   1/1     Running   0          3s
demo-green-98f4b7bbf-trs6f   1/1     Running   0          3s

[root@node-1 ~]# kubectl get svc
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
demo         NodePort    10.233.40.213   <none>        80:31000/TCP   9s

# 访问测试（blue版本）
[root@node-1 ~]# curl http://192.168.48.142:31000 -I
HTTP/1.1 200 OK
Server: nginx/1.22.0
Date: Tue, 30 Aug 2022 01:56:35 GMT
Content-Type: text/html
Content-Length: 615
Last-Modified: Mon, 23 May 2022 23:59:19 GMT
Connection: keep-alive
ETag: "628c1fd7-267"
Accept-Ranges: bytes

# 版本切换（人为修改service）
sed -ri 's/strategy: blue/strategy: green/' demo-service.yml
kubectl apply -f demo-service.yml

# 再次访问
[root@node-1 ~]# curl http://192.168.48.142:31000 -I
HTTP/1.1 200 OK
Server: nginx/1.23.1
Date: Tue, 30 Aug 2022 01:59:43 GMT
Content-Type: text/html
Content-Length: 615
Last-Modified: Tue, 19 Jul 2022 14:05:27 GMT
Connection: keep-alive
ETag: "62d6ba27-267"
Accept-Ranges: bytes
```

### 金丝雀部署

金丝雀部署在蓝绿部署的基础上，只需要把service中的`spec.selector.strategy`字段去掉即可（在本例子中是此字段，实际情况应该会不一样）

## 

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
