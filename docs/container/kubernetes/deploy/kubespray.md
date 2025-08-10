## 🍁 使用kubespray部署

文档1：[https://kubernetes.io/zh-cn/docs/setup/production-environment/tools/kubespray/](https://kubernetes.io/zh-cn/docs/setup/production-environment/tools/kubespray/)

文档2：[https://github.com/kubernetes-sigs/kubespray](https://github.com/kubernetes-sigs/kubespray)

### 必读说明

**（1）节点规划**

:::tip

根据以下信息安装操作系统，安装完成后不需要做任何操作

:::

| 主机名 | Master节点 | Node节点 | Etcd节点 | 其他节点        | 内存 | CPU  | 静态IP         |
| ------ | ---------- | -------- | -------- | --------------- | ---- | ---- | -------------- |
| node0  | ✔          | ✔        | ✔        | Ansible主控节点 | 4G   | 2核  | 192.168.48.128 |
| node1  | ✔          | ✔        | ✔        |                 | 4G   | 2核  | 192.168.48.134 |
| node2  |            | ✔        | ✔        |                 | 4G   | 2核  | 192.168.48.135 |

**（2）版本说明**

| 名称       |         版本 | 备注                                       |
| ---------- | -----------: | ------------------------------------------ |
| OS         | `Centos 7.9` | 所使用镜像为`CentOS-7-x86_64-DVD-1708.iso` |
| kubespray  |    `v2.19.0` |                                            |
| Kubernetes |    `v1.23.7` | `kubespray v2.19.0`默认安装版本            |

**（3）科学上网**

在部署过程中需要去海外下载镜像，需要主机能够科学上网（直连或者通过`HTTP_PROXY`方式）

**（4）最低配置**

支持主流系统，内存最低2G，CPU最低2核，磁盘30G以上

### 系统初始化

参考：【手动部署-系统初始化】章节

### 配置Ansible主控节点

Ansible主控节点部署在哪里都可以，只要能控制K8s Node节点即可

```bash
# 生成keygen（执行ssh-keygen，一路回车下去）
[root@localhost ~]# ssh-keygen

# 配置SSH免密登录
[root@localhost ~]# ssh-copy-id root@192.168.48.128
[root@localhost ~]# ssh-copy-id root@192.168.48.134
[root@localhost ~]# ssh-copy-id root@192.168.48.135

# 验证免密登录
[root@localhost ~]# ssh root@192.168.48.128  "hostname"
[root@localhost ~]# ssh root@192.168.48.134  "hostname"
[root@localhost ~]# ssh root@192.168.48.135  "hostname"

# 安装基础软件
[root@localhost ~]# yum install epel-release python3 git wget -y
[root@localhost ~]# python3 --version
Python 3.6.8

# 升级pip到最新版(可选,推荐)
[root@localhost ~]# pip3 install --upgrade pip -i https://mirrors.aliyun.com/pypi/simple

# 下载kubespray源码
# 若因网络下载失败，可以使用我们准备好的代理（科学上网），wget -c后面添加 -e "http_proxy=http://192.168.5.103:7890"
[root@localhost ~]# wget -c https://github.com/kubernetes-sigs/kubespray/archive/v2.19.0.tar.gz 
[root@localhost ~]# tar zxf v2.19.0.tar.gz && cd kubespray-2.19.0

# 安装Python依赖（因为我们是Python 3.6.8，所以这里要使用requirements-2.11.txt，详细信息参考GitHub）
[root@localhost kubespray-2.19.0]# pip3 install -r requirements-2.11.txt -i https://mirrors.aliyun.com/pypi/simple

# 生成项目配置
[root@localhost kubespray-2.19.0]# cp -rpf inventory/sample inventory/mycluster

# 使用真实的hostname（否则会自动把你的hostname改成node1/node2...这种哦）
[root@localhost kubespray-2.19.0]# export USE_REAL_HOSTNAME=true

# 指定配置文件位置
[root@localhost kubespray-2.19.0]# export CONFIG_FILE=inventory/mycluster/hosts.yaml

# 定义ip列表（你的服务器内网ip地址列表，3台及以上，前两台默认为master节点）
[root@localhost kubespray-2.19.0]# declare -a IPS=(
  192.168.48.128
  192.168.48.134
  192.168.48.135
)

# 生成配置文件
[root@localhost kubespray-2.19.0]# python3 contrib/inventory_builder/inventory.py ${IPS[@]}
DEBUG: Adding group all
DEBUG: Adding group kube-master
DEBUG: Adding group kube-node
DEBUG: Adding group etcd
DEBUG: Adding group k8s-cluster
DEBUG: Adding group calico-rr
DEBUG: adding host node0 to group all
DEBUG: adding host node1 to group all
DEBUG: adding host node2 to group all
DEBUG: adding host node0 to group etcd
DEBUG: adding host node1 to group etcd
DEBUG: adding host node2 to group etcd
DEBUG: adding host node0 to group kube-master
DEBUG: adding host node1 to group kube-master
DEBUG: adding host node0 to group kube-node
DEBUG: adding host node1 to group kube-node
DEBUG: adding host node2 to group kube-node
```

### 节点个性化配置

```bash
# 定制化配置文件
# 1. 节点组织配置（这里可以调整每个节点的角色）
[root@localhost kubespray-2.19.0]# cat inventory/mycluster/hosts.yaml
all:
  hosts:
    node0:
      ansible_host: 192.168.48.128
      ip: 192.168.48.128
      access_ip: 192.168.48.128
    node1:
      ansible_host: 192.168.48.134
      ip: 192.168.48.134
      access_ip: 192.168.48.134
    node2:
      ansible_host: 192.168.48.135
      ip: 192.168.48.135
      access_ip: 192.168.48.135
  children:
    kube_control_plane:
      hosts:
        node0:
        node1:
    kube_node:
      hosts:
        node0:
        node1:
        node2:
    etcd:
      hosts:
        node0:
        node1:
        node2:
    k8s_cluster:
      children:
        kube_control_plane:
        kube_node:
    calico_rr:
      hosts: {}
      
# 2. containerd配置（自v2.18.0开始默认使用containerd作为容器运行时）
[root@localhost kubespray-2.19.0]# vi inventory/mycluster/group_vars/all/containerd.yml

# 3. 全局配置（可以在这配置http(s)代理实现外网访问）
[root@localhost kubespray-2.19.0]# vi inventory/mycluster/group_vars/all/all.yml
http_proxy: "http://192.168.0.100:7890"     # 配置代理
https_proxy: "http://192.168.0.100:7890"    # 配置代理


# 4. k8s集群配置（包括设置容器运行时、svc网段、pod网段等）
[root@localhost kubespray-2.19.0]# vi inventory/mycluster/group_vars/k8s_cluster/k8s-cluster.yml
kube_version: v1.23.7                  # K8S版本信息，无需修改（也不要随意修改）
kube_service_addresses: 10.200.0.0/16  # 默认为10.233.0.0/18，修改为10.200.0.0/16
kube_pods_subnet: 10.233.0.0/16        # 默认10.233.64.0/18，修改为10.233.0.0/16
container_manager: containerd	       # 配置容器引擎，不用修改

# 5. 修改etcd部署类型为host（默认是docker）
[root@localhost kubespray-2.19.0]# vi inventory/mycluster/group_vars/etcd.yml
etcd_deployment_type: host      # 配置etcd部署方式，默认是docker，如果使用containerd的话，必须使用宿主机部署，即host

# 6. 附加组件（ingress、dashboard等）
[root@localhost kubespray-2.19.0]# vi inventory/mycluster/group_vars/k8s_cluster/addons.yml
dashboard_enabled: true			# 修改为true
ingress_nginx_enabled: true		# 修改为true
metrics_server_enabled: true    # 修改为true
```

### 部署Kubernetes集群

```bash
# 使用tmux(可选)
[root@localhost kubespray-2.19.0]# yum install tmux -y
[root@localhost kubespray-2.19.0]# tmux new -s k8s_install

# 部署Kubernetes集群（这一步执行的时间可能会很长，这里我使用time命令来统计一下时长）
# 如果想查看详细信息或定位出错的task，可以添加-vvvv
[root@localhost kubespray-2.19.0]# time ansible-playbook -i inventory/mycluster/hosts.yaml  -b cluster.yml

real    29m43.274s
user    8m22.444s
sys     3m51.848s
```

> 安装步骤执行时长并不稳定，根据系统配置、网络质量而不同，快则半小时，慢则几个小时



### 检查集群状态

```bash
# 查看节点状态(Master节点执行)
[root@localhost kubespray-2.19.0]# kubectl get node
NAME    STATUS   ROLES                  AGE   VERSION
node0   Ready    control-plane,master   15m   v1.23.7
node1   Ready    control-plane,master   14m   v1.23.7
node2   Ready    <none>                 13m   v1.23.7

# 查看Master节点组件状态(Master节点执行)
[root@localhost kubespray-2.19.0]# kubectl get cs
Warning: v1 ComponentStatus is deprecated in v1.19+
NAME                 STATUS    MESSAGE                         ERROR
controller-manager   Healthy   ok                              
scheduler            Healthy   ok                              
etcd-2               Healthy   {"health":"true","reason":""}   
etcd-0               Healthy   {"health":"true","reason":""}   
etcd-1               Healthy   {"health":"true","reason":""}   

# 查看Pod状态
[root@localhost kubespray-2.19.0]# kubectl get pods -A
NAMESPACE       NAME                                          READY   STATUS    RESTARTS   AGE
ingress-nginx   ingress-nginx-controller-hs8ld                1/1     Running   0          13m
ingress-nginx   ingress-nginx-controller-k6qzm                1/1     Running   0          13m
ingress-nginx   ingress-nginx-controller-kcggb                1/1     Running   0          13m
kube-system     calico-kube-controllers-6dd874f784-wxf8q      1/1     Running   0          13m
kube-system     calico-node-krtfp                             1/1     Running   0          14m
kube-system     calico-node-sn44p                             1/1     Running   0          14m
kube-system     calico-node-vfzzd                             1/1     Running   0          14m
kube-system     coredns-76b4fb4578-5jkmj                      1/1     Running   0          12m
kube-system     coredns-76b4fb4578-75bdd                      1/1     Running   0          13m
kube-system     dns-autoscaler-7979fb6659-5597v               1/1     Running   0          12m
kube-system     kube-apiserver-node0                          1/1     Running   1          16m
kube-system     kube-apiserver-node1                          1/1     Running   1          15m
kube-system     kube-controller-manager-node0                 1/1     Running   1          16m
kube-system     kube-controller-manager-node1                 1/1     Running   1          15m
kube-system     kube-proxy-fh2wf                              1/1     Running   0          14m
kube-system     kube-proxy-znqrr                              1/1     Running   0          14m
kube-system     kube-proxy-znvz6                              1/1     Running   0          14m
kube-system     kube-scheduler-node0                          1/1     Running   1          16m
kube-system     kube-scheduler-node1                          1/1     Running   1          15m
kube-system     kubernetes-dashboard-584bfbb648-6k96s         1/1     Running   0          12m
kube-system     kubernetes-metrics-scraper-5dc755864d-glpwt   1/1     Running   0          12m
kube-system     metrics-server-749474f899-szbn5               1/1     Running   0          12m
kube-system     nginx-proxy-node2                             1/1     Running   0          14m
kube-system     nodelocaldns-cmzbt                            1/1     Running   0          12m
kube-system     nodelocaldns-gkgh9                            1/1     Running   0          12m
kube-system     nodelocaldns-m2zvj                            1/1     Running   0          12m
```

### 清理代理设置

```bash
# 清理Containerd HTTP代理
[root@localhost ~]# cat /etc/systemd/system/containerd.service.d/http-proxy.conf
[Service]
Environment="HTTP_PROXY=http://192.168.0.100:7890" "HTTPS_PROXY=http://192.168.0.100:7890" "NO_PROXY=192.168.48.128,node0,node0.cluster.local,192.168.48.134,node1,node1.cluster.local,192.168.48.135,node2,node2.cluster.local,127.0.0.1,localhost,10.200.0.0/16,10.233.0.0/16,svc,svc.cluster.local"

[root@localhost ~]# mv /etc/systemd/system/containerd.service.d/http-proxy.conf /etc/systemd/system/containerd.service.d/http-proxy.conf_$(date +"%Y-%m-%d-%H%M%S")
[root@localhost ~]# systemctl daemon-reload
[root@localhost ~]# systemctl restart containerd

# 清理Yum HTTP代理(把grep出来的代理配置注释或删除即可)
[root@localhost ~]# grep 7890 -r /etc/yum*
/etc/yum.conf:proxy=http://192.168.0.100:7890
```



### 访问dashboard

```bash
# 创建service
[root@localhost ~]# cat > dashboard-svc.yaml <<EOF
apiVersion: v1
kind: Service
metadata:
  namespace: kube-system
  name: dashboard
  labels:
    app: dashboard
spec:
  type: NodePort
  selector:
    k8s-app: kubernetes-dashboard
  ports:
  - name: https
    nodePort: 30000
    port: 443
    targetPort: 8443
EOF

[root@localhost ~]# kubectl apply -f dashboard-svc.yaml

# 访问dashboard
为了集群安全，从 1.7 开始，dashboard 只允许通过 https 访问，我们使用nodeport的方式暴露服务，可以使用 https://NodeIP:NodePort 地址访问 
关于自定义证书 默认dashboard的证书是自动生成的，肯定是非安全的证书，如果大家有域名和对应的安全证书可以自己替换掉。使用安全的域名方式访问dashboard。 
在dashboard-all.yaml中增加dashboard启动参数，可以指定证书文件，其中证书文件是通过secret注进来的。
- –tls-cert-file
- dashboard.cer
- –tls-key-file
- dashboard.key

# 创建service account
[root@localhost ~]# kubectl create sa dashboard-admin -n kube-system

# 创建角色绑定关系
[root@localhost ~]# kubectl create clusterrolebinding dashboard-admin --clusterrole=cluster-admin --serviceaccount=kube-system:dashboard-admin

# 查看dashboard-admin的secret名字
[root@localhost ~]# ADMIN_SECRET=$(kubectl get secrets -n kube-system | grep dashboard-admin | awk '{print $1}')

# 打印secret的token
[root@localhost ~]# kubectl describe secret -n kube-system ${ADMIN_SECRET} | grep -E '^token' | awk '{print $2}'

# 浏览器访问
[root@localhost ~]# https://192.168.48.128:30000/
```



### FAQ

**（1）Download file error**

![image-20211229101545405](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211229101545405.png)

> 下载文件出错，从以下方面排查
>
> * 检查本地网络、代理服务器是否正常
> * 检查配置是否写错
>   * 比如将代理服务器的`http://`误写成了`https://`
>   * 比如将代理服务器的`http://`误写成`http:/`

<br />

**（2）组件状态为Unhealthy**

`scheduler`和`controller-manager`组件状态为`Unhealthy`

```bash
# 修复Unhealthy(在所有Master上操作)
[root@localhost ~]# vi /etc/kubernetes/manifests/kube-controller-manager.yaml
    # - --port=0    # 将这一行注释掉
[root@localhost ~]# vi /etc/kubernetes/manifests/kube-scheduler.yaml
    # - --port=0    # 将这一行注释掉

# 重启kubelet
[root@localhost ~]# systemctl restart kubelet
```

<br />

**（3）SSH超时**

**错误描述**

`Ansible`连接报错信息：`Timeout (12s) waiting for privilege escalation prompt`

手动调用`ssh`命令则会一直卡着

**解决办法**

方法1：关闭SSH反向解析（推荐使用）

```bash
[root@node0 kubespray-2.19.0]# vi /etc/ssh/sshd_config 
UseDNS no

[root@node0 ~]# systemctl restart sshd.service
```

方法2：调整Ansible SSH超时时间

```bash
# 调大超时时间
[root@node0 kubespray-2.19.0]# vim ansible.cfg 
[ssh_connection]
# ...
timeout = 300			# 设置超时时间300秒
gather_timeout = 300    # 设置超时时间300秒
```

## 