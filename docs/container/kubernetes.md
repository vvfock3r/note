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
