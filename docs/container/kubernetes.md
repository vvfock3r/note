# Kubernetes

官方文档：[https://kubernetes.io/zh-cn/docs/home/](https://kubernetes.io/zh-cn/docs/home/)



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



## Pod

文档1：[https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/](https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/)

文档2：[https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/](https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/)

Pod是K8S最小的部署单元，是一组容器的集合

同一Pod中的容器共享网络名称空间和存储资源

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

### 容器探针

文档1：[https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/pod-lifecycle/#container-probes](https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/pod-lifecycle/#container-probes)

文档2：[https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/](https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)

| 检查类型                               | 说明                                   | 若不提供该字段的默认值 | 若提供该字段                                     | 若检查失败执行的动作                                         |
| -------------------------------------- | -------------------------------------- | ---------------------- | ------------------------------------------------ | ------------------------------------------------------------ |
| **存活检查<br />（`livenessProbe`）**  | 检查容器是否正在运行                   | `Success`              | - - -                                            | `kubelet `会杀死容器<br />并根据其重启策略决定下一步操作     |
| **就绪检查<br />（`readinessProbe`）** | 检查容器是否准备好<br />为请求提供服务 | `Success`              | 初始状态为`Failure`                              | 检查失败会从service endpoints中删除该IP，<br />检查成功则会把IP加进去 |
| **启动检查<br />（`startupProbe`）**   | 检查容器是否已经启动                   | `Success`              | 所有其他探针都会被禁用，<br />直到此探针成功为止 | `kubelet `会杀死容器<br />并根据其重启策略决定下一步操作     |

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

### 调度策略

文档总览：[https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/](https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/)

`kube-scheduler`是默认的调度器，对每一个新创建的`Pod`或者是未被调度的`Pod`，`kube-scheduler`会选择一个最优的 Node 去运行这个`Pod`

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

```bash
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

```bash
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

```bash
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
          #   (2) 多个matchExpressions之间不是【且】的关系
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
