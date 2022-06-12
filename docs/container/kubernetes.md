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

### 注入变量

