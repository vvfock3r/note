# kubernetes部署方式

文档：[https://kubernetes.io/docs/setup/production-environment/tools/](https://kubernetes.io/docs/setup/production-environment/tools/)

| 部署方式   | 复杂性 | 灵活性 | 描述                                            |
| ---------- | ------ | ------ | ----------------------------------------------- |
| Kubespray  | 简单   | 自定义 | 基于`kubeadm`和`Ansible`来部署                  |
| kubeadm    | 适中   | 自定义 | `Kubeadm `是一个快捷搭建`kubernetes`的安装工具  |
| 二进制部署 | 复杂   | 灵活   | 二进制部署                                      |
| kops       | 未知   | 未知   | 在AWS上安装Kubernetes群集，本文档不考虑这种方式 |



## 使用kubespray部署

文档1：[https://kubernetes.io/zh-cn/docs/setup/production-environment/tools/kubespray/](https://kubernetes.io/zh-cn/docs/setup/production-environment/tools/kubespray/)

文档2：[https://github.com/kubernetes-sigs/kubespray](https://github.com/kubernetes-sigs/kubespray)

### 前置要求

* 在部署过程中需要去海外下载镜像，需要主机能够科学上网（直连或者通过`HTTP_PROXY`方式）
* 支持主流系统，内存最低2G，CPU最低2核，磁盘30G以上

###  版本说明

| 名称       |         版本 | 备注                            |
| ---------- | -----------: | ------------------------------- |
| OS         | `Centos 7.9` |                                 |
| kubespray  |    `v2.19.0` |                                 |
| Kubernetes |    `v1.23.7` | `kubespray v2.19.0`默认安装版本 |



### 节点规划

| 主机名 | Master节点 | Node节点 | Etcd节点 | 其他节点        | 内存 | CPU  | 静态IP         |
| ------ | ---------- | -------- | -------- | --------------- | ---- | ---- | -------------- |
| node0  | √          | √        | √        | Ansible主控节点 | 4G   | 2核  | 192.168.48.128 |
| node1  | √          | √        | √        |                 | 4G   | 2核  | 192.168.48.134 |
| node2  |            | √        | √        |                 | 4G   | 2核  | 192.168.48.135 |

> 根据以上信息安装操作系统，安装完成后不需要做任何操作



### 更新系统

```bash
# 更新系统并重启
[root@localhost ~]# yum -y update && reboot

# 查看系统版本
[root@localhost ~]# cat /etc/redhat-release
CentOS Linux release 7.9.2009 (Core)
```



### 设置静态内网IP（可选）

如果使用`VMware Workstation`等在本地部署，需要保证使用静态内网IP地址

```bash
[root@localhost ~]# vi /etc/sysconfig/network-scripts/ifcfg-ens33
TYPE="Ethernet"
PROXY_METHOD="none"
BROWSER_ONLY="no"
BOOTPROTO="static"		# 设置为静态IP
DEFROUTE="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
NAME="ens33"
UUID="068dc849-6e8c-4bed-b2de-2fe66c424521"
DEVICE="ens33"
ONBOOT="yes"			# 开启自启
IPADDR=192.168.48.140	# IP，根据实际情况修改
NETMASK=255.255.255.0	# 子网掩码
GATEWAY=192.168.48.2	# 默认网关，根据实际情况修改
DNS1=192.168.48.2       # DNS1
DNS2=8.8.8.8            # DNS2

# 重启网络
[root@localhost ~]# systemctl restart network.service

# 测试网络
[root@localhost ~]# ping -c 4 www.baidu.com
PING www.a.shifen.com (39.156.66.14) 56(84) bytes of data.
64 bytes from 39.156.66.14 (39.156.66.14): icmp_seq=1 ttl=128 time=27.3 ms
64 bytes from 39.156.66.14 (39.156.66.14): icmp_seq=2 ttl=128 time=28.0 ms
64 bytes from 39.156.66.14 (39.156.66.14): icmp_seq=3 ttl=128 time=43.1 ms
64 bytes from 39.156.66.14 (39.156.66.14): icmp_seq=4 ttl=128 time=23.9 ms

--- www.a.shifen.com ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3005ms
rtt min/avg/max/mdev = 23.975/30.612/43.163/7.406 ms

# 重启系统（可选）
[root@localhost ~]# reboot
```

### 系统初始化

```bash
# 修改主机名
[root@localhost ~]# hostnamectl set-hostname node0
[root@localhost ~]# hostnamectl set-hostname node1
[root@localhost ~]# hostnamectl set-hostname node2

# 关闭selinux
[root@localhost ~]# setenforce 0 && sed -ri 's/(^SELINUX=)(.*)/\1disabled/' /etc/selinux/config

# 关闭防火墙
[root@localhost ~]# systemctl stop firewalld && systemctl disable firewalld

# 设置iptables规则
[root@localhost ~]# iptables -F && iptables -X && iptables -F -t nat && iptables -X -t nat && iptables -P FORWARD ACCEPT

# 关闭swap
[root@localhost ~]# swapoff -a && vi /etc/fstab
[root@localhost ~]# free -m && cat /etc/fstab

# K8S参数设置
[root@localhost ~]# cat > /etc/sysctl.d/kubernetes.conf <<EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_nonlocal_bind = 1
net.ipv4.ip_forward = 1
vm.swappiness = 0
vm.overcommit_memory = 1
EOF
# 使配置生效
[root@localhost ~]# sysctl -p /etc/sysctl.d/kubernetes.conf

# 时间同步
[root@localhost ~]# yum install ntpdate -y
[root@localhost ~]# ntpdate time.windows.com

# 移除docker相关软件包（可选）
[root@localhost ~]# yum remove -y docker* && rm -vf /etc/docker/daemon.json
```

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

#### Download file error

![image-20211229101545405](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20211229101545405.png)

> 下载文件出错，从以下方面排查
>
> * 检查本地网络、代理服务器是否正常
> * 检查配置是否写错
>   * 比如将代理服务器的`http://`误写成了`https://`
>   * 比如将代理服务器的`http://`误写成`http:/`
>

<br />

#### 组件状态为Unhealthy

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

#### SSH超时

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

## 使用二进制部署

### 配置主机名

```bash
# 配置主机名
[root@localhost ~]# hostnamectl set-hostname node0
[root@localhost ~]# hostnamectl set-hostname node1
[root@localhost ~]# hostnamectl set-hostname node2

# 添加主机名解析
[root@localhost ~]# vi /etc/hosts
# kubernetes
192.168.48.142 node0
192.168.48.143 node1
192.168.48.144 node2
```

### 安装依赖包

```bash
[root@localhost ~]# yum install -y socat conntrack ipvsadm ipset jq sysstat curl iptables libseccomp yum-utils
```

### 关闭防火墙等服务

```bash
# 关闭防火墙
[root@localhost ~]# systemctl stop firewalld && systemctl disable firewalld

# 关闭selinux
[root@localhost ~]# setenforce 0 && getenforce
[root@localhost ~]# sed -ri 's/(^SELINUX=)(.*)/\1disabled/' /etc/selinux/config
[root@localhost ~]# grep -E '^SELINUX=' /etc/selinux/config

# 设置iptables规则
[root@localhost ~]# iptables -F && iptables -X && iptables -F -t nat && iptables -X -t nat && iptables -P FORWARD ACCEPT

# 关闭swap
[root@localhost ~]# swapoff -a && free –h
[root@localhost ~]# vi /etc/fstab

# 关闭dnsmasq(否则可能导致容器无法解析域名)
[root@localhost ~]# service dnsmasq stop && systemctl disable dnsmasq
```

### 调整内核参数

::: tip 

若出现如下报错

```bash
[root@localhost ~]# sysctl -p /etc/sysctl.d/kubernetes.conf
sysctl: cannot stat /proc/sys/net/bridge/bridge-nf-call-ip6tables: No such file or directory
sysctl: cannot stat /proc/sys/net/bridge/bridge-nf-call-iptables: No such file or directory
net.ipv4.ip_nonlocal_bind = 1
net.ipv4.ip_forward = 1
vm.swappiness = 0
vm.overcommit_memory = 1
```

解决办法

```bash
# 检查模块是否已经加载（输出为空代表模块没有加载）
[root@node0 ~]# lsmod | grep br_netfilter
br_netfilter           22256  0 
bridge                151336  1 br_netfilter

# 临时加载模块(重启后还需要重新加载)
[root@localhost ~]# modprobe br_netfilter

# 设置开启自加载模块
[root@localhost ~]# echo br_netfilter > /etc/modules-load.d/br_netfilter.conf
```

:::

```bash
[root@localhost ~]# cat > /etc/sysctl.d/kubernetes.conf <<EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_nonlocal_bind = 1
net.ipv4.ip_forward = 1
vm.swappiness = 0
vm.overcommit_memory = 1
EOF

[root@localhost ~]# sysctl -p /etc/sysctl.d/kubernetes.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_nonlocal_bind = 1
net.ipv4.ip_forward = 1
vm.swappiness = 0
vm.overcommit_memory = 1
```

### 配置文件中转节点

为了方便文件的`copy`我们选择一个中转节点（随便一个节点，可以是集群中的也可以是非集群中的），配置好跟其他所有节点的免密登录

```bash
# 看看是否已经存在rsa公钥
[root@localhost ~]# cat ~/.ssh/id_rsa.pub

# 如果不存在就创建一个新的
[root@localhost ~]# ssh-keygen -t rsa

# 把id_rsa.pub文件内容copy到其他机器的授权文件中
[root@localhost ~]# cat ~/.ssh/id_rsa.pub

# 在其他节点执行下面命令（包括worker节点）
[root@localhost ~]# echo "<file_content>" >> ~/.ssh/authorized_keys

# 或执行如下命令
[root@node0 ~]# ssh-copy-id root@node0
[root@node0 ~]# ssh-copy-id root@node1
[root@node0 ~]# ssh-copy-id root@node2
```

### 下载软件包

::: tip 

1. 打开Github Kubernetes Releases页面：[https://github.com/kubernetes/kubernetes/releases/](https://github.com/kubernetes/kubernetes/releases/)
2. 选择合适的版本后，点击`See the CHANGELOG for more details`中的链接
3. 根据 `Client Binaries` 和 `Server Binaries`下载二进制包

:::

```bash
# 下载K8S二进制包
[root@node0 ~]# wget https://storage.googleapis.com/kubernetes-release/release/v1.24.3/kubernetes-server-linux-amd64.tar.gz
[root@node0 ~]# tar zxf kubernetes-server-linux-amd64.tar.gz

# 下载Etcd软件包
[root@node0 ~]# wget https://github.com/etcd-io/etcd/releases/download/v3.4.20/etcd-v3.4.20-linux-amd64.tar.gz
[root@node0 ~]# tar zxf etcd-v3.4.20-linux-amd64.tar.gz
```

也可以单独下载某个二进制包

```bash
wget https://storage.googleapis.com/kubernetes-release/release/v1.24.3/bin/linux/amd64/kubectl
```

### 分发软件包

```bash
# 进入kubernetes目录
[root@node0 ~]# cd kubernetes/server/bin/

# 把master相关组件分发到master节点
[root@node0 bin]# MASTERS=(node0 node1)
[root@node0 bin]# for instance in ${MASTERS[@]}; do
  scp kube-apiserver kube-controller-manager kube-scheduler kubectl root@${instance}:/usr/local/bin/
done

# 把worker先关组件分发到worker节点
[root@node0 bin]# WORKERS=(node1 node2)
[root@node0 bin]# for instance in ${WORKERS[@]}; do
  scp kubelet kube-proxy root@${instance}:/usr/local/bin/
done

# --------------------------------------------------------------------------------------------------------
# 进入etcd目录
[root@node0 ~]# cd ~/etcd-v3.4.20-linux-amd64/

# 把etcd组件分发到etcd节点
[root@node0 etcd-v3.4.20-linux-amd64]# ETCDS=(node0 node1 node2)
[root@node0 etcd-v3.4.20-linux-amd64]# for instance in ${ETCDS[@]}; do
  scp etcd etcdctl root@${instance}:/usr/local/bin/
done
```

### 生成证书

#### **下载cfssl工具**

```bash
[root@node0 ~]# wget https://github.com/cloudflare/cfssl/releases/download/v1.6.1/cfssl_1.6.1_linux_amd64 -O /usr/local/bin/cfssl
[root@node0 ~]# wget https://github.com/cloudflare/cfssl/releases/download/v1.6.1/cfssljson_1.6.1_linux_amd64 -O /usr/local/bin/cfssljson
[root@node0 ~]# chmod +x /usr/local/bin/cfssl /usr/local/bin/cfssljson

[root@node0 ~]# cfssl version
Version: 1.6.1
Runtime: go1.12.12

[root@node0 ~]# cfssljson --version
Version: 1.6.1
Runtime: go1.12.12
```

#### **（1）生成根证书**

根证书是集群所有节点共享的，只需要创建一个 CA 证书，后续创建的所有证书都由它签名。

```bash
# 在任意节点（可以免密登录到其他节点）创建一个单独的证书目录
[root@node0 ~]# mkdir pki && cd pki

# 创建证书配置文件
[root@node0 pki]# cat > ca-config.json <<EOF
{
  "signing": {
    "default": {
      "expiry": "876000h"
    },
    "profiles": {
      "kubernetes": {
        "usages": ["signing", "key encipherment", "server auth", "client auth"],
        "expiry": "876000h"
      }
    }
  }
}
EOF

[root@node0 pki]# cat > ca-csr.json <<EOF
{
  "CN": "Kubernetes",
  "key": {
    "algo": "rsa",
    "size": 2048
  },
  "names": [
    {
      "C": "US",
      "L": "Portland",
      "O": "Kubernetes",
      "OU": "CA",
      "ST": "Oregon"
    }
  ]
}
EOF

# 生成证书和私钥
[root@node0 pki]# cfssl gencert -initca ca-csr.json | cfssljson -bare ca

2022/08/16 03:00:35 [INFO] generating a new CA key and certificate from CSR
2022/08/16 03:00:35 [INFO] generate received request
2022/08/16 03:00:35 [INFO] received CSR
2022/08/16 03:00:35 [INFO] generating key: rsa-2048
2022/08/16 03:00:36 [INFO] encoded CSR
2022/08/16 03:00:36 [INFO] signed certificate with serial number 456928096144843875343000970888480361746591907304

# 我们最终想要的就是ca-key.pem和ca.pem，一个秘钥，一个证书
[root@node0 pki]# ls -l
total 20
-rw-r--r-- 1 root root  236 Aug 16 03:00 ca-config.json
-rw-r--r-- 1 root root 1005 Aug 16 03:00 ca.csr
-rw-r--r-- 1 root root  211 Aug 16 03:00 ca-csr.json
-rw------- 1 root root 1679 Aug 16 03:00 ca-key.pem
-rw-r--r-- 1 root root 1318 Aug 16 03:00 ca.pem
```

#### **（2）生成admin客户端证书**

```bash
[root@node0 pki]# cat > admin-csr.json <<EOF
{
  "CN": "admin",
  "key": {
    "algo": "rsa",
    "size": 2048
  },
  "names": [
    {
      "C": "CN",
      "ST": "BeiJing",
      "L": "BeiJing",
      "O": "system:masters",
      "OU": "seven"
    }
  ]
}
EOF

cfssl gencert \
  -ca=ca.pem \
  -ca-key=ca-key.pem \
  -config=ca-config.json \
  -profile=kubernetes \
  admin-csr.json | cfssljson -bare admin
  
2022/08/16 03:03:15 [INFO] generate received request
2022/08/16 03:03:15 [INFO] received CSR
2022/08/16 03:03:15 [INFO] generating key: rsa-2048
2022/08/16 03:03:16 [INFO] encoded CSR
2022/08/16 03:03:16 [INFO] signed certificate with serial number 56701544595050219920664756218068616182173410719
2022/08/16 03:03:16 [WARNING] This certificate lacks a "hosts" field. This makes it unsuitable for
websites. For more information see the Baseline Requirements for the Issuance and Management
of Publicly-Trusted Certificates, v.1.1.6, from the CA/Browser Forum (https://cabforum.org);
specifically, section 10.2.3 ("Information Requirements").

[root@node0 pki]# ls -l
total 36
-rw-r--r-- 1 root root 1009 Aug 16 03:03 admin.csr
-rw-r--r-- 1 root root  213 Aug 16 03:02 admin-csr.json
-rw------- 1 root root 1679 Aug 16 03:03 admin-key.pem
-rw-r--r-- 1 root root 1407 Aug 16 03:03 admin.pem
-rw-r--r-- 1 root root  236 Aug 16 03:00 ca-config.json
-rw-r--r-- 1 root root 1005 Aug 16 03:00 ca.csr
-rw-r--r-- 1 root root  211 Aug 16 03:00 ca-csr.json
-rw------- 1 root root 1679 Aug 16 03:00 ca-key.pem
-rw-r--r-- 1 root root 1318 Aug 16 03:00 ca.pem
```

#### （3）生成kubelet客户端证书

Kubernetes使用一种称为Node Authorizer的专用授权模式来授权Kubelets发出的API请求。 Kubelet使用将其标识为system:nodes组中的凭据，其用户名为system：node:nodeName，接下里就给每个工作节点生成证书。

```bash
# 设置worker节点列表
[root@node0 pki]# WORKERS=(node1 node2)
[root@node0 pki]# WORKER_IPS=(192.168.48.143 192.168.48.144)

# 生成所有worker节点的证书配置
[root@node0 pki]# for ((i=0;i<${#WORKERS[@]};i++)); do
cat > ${WORKERS[$i]}-csr.json <<EOF
{
  "CN": "system:node:${WORKERS[$i]}",
  "key": {
    "algo": "rsa",
    "size": 2048
  },
  "names": [
    {
      "C": "CN",
      "L": "Beijing",
      "O": "system:nodes",
      "OU": "seven",
      "ST": "Beijing"
    }
  ]
}
EOF
cfssl gencert \
  -ca=ca.pem \
  -ca-key=ca-key.pem \
  -config=ca-config.json \
  -hostname=${WORKERS[$i]},${WORKER_IPS[$i]} \
  -profile=kubernetes \
  ${WORKERS[$i]}-csr.json | cfssljson -bare ${WORKERS[$i]}
done

2022/08/16 03:07:19 [INFO] generate received request
2022/08/16 03:07:19 [INFO] received CSR
2022/08/16 03:07:19 [INFO] generating key: rsa-2048
2022/08/16 03:07:20 [INFO] encoded CSR
2022/08/16 03:07:20 [INFO] signed certificate with serial number 309586283877527497658046582685484544532407999911
2022/08/16 03:07:20 [INFO] generate received request
2022/08/16 03:07:20 [INFO] received CSR
2022/08/16 03:07:20 [INFO] generating key: rsa-2048
2022/08/16 03:07:20 [INFO] encoded CSR
2022/08/16 03:07:20 [INFO] signed certificate with serial number 337014331130523850623470554111727354761321069190

[root@node0 pki]# ls -l
total 68
-rw-r--r-- 1 root root 1009 Aug 16 03:03 admin.csr
-rw-r--r-- 1 root root  213 Aug 16 03:02 admin-csr.json
-rw------- 1 root root 1679 Aug 16 03:03 admin-key.pem
-rw-r--r-- 1 root root 1407 Aug 16 03:03 admin.pem
-rw-r--r-- 1 root root  236 Aug 16 03:00 ca-config.json
-rw-r--r-- 1 root root 1005 Aug 16 03:00 ca.csr
-rw-r--r-- 1 root root  211 Aug 16 03:00 ca-csr.json
-rw------- 1 root root 1679 Aug 16 03:00 ca-key.pem
-rw-r--r-- 1 root root 1318 Aug 16 03:00 ca.pem
-rw-r--r-- 1 root root 1078 Aug 16 03:07 node1.csr
-rw-r--r-- 1 root root  223 Aug 16 03:07 node1-csr.json
-rw------- 1 root root 1679 Aug 16 03:07 node1-key.pem
-rw-r--r-- 1 root root 1456 Aug 16 03:07 node1.pem
-rw-r--r-- 1 root root 1078 Aug 16 03:07 node2.csr
-rw-r--r-- 1 root root  223 Aug 16 03:07 node2-csr.json
-rw------- 1 root root 1675 Aug 16 03:07 node2-key.pem
-rw-r--r-- 1 root root 1456 Aug 16 03:07 node2.pem
```

#### （4）生成 kube-controller-manager客户端证书

```bash
[root@node0 pki]# cat > kube-controller-manager-csr.json <<EOF
{
    "CN": "system:kube-controller-manager",
    "key": {
        "algo": "rsa",
        "size": 2048
    },
    "names": [
      {
        "C": "CN",
        "ST": "BeiJing",
        "L": "BeiJing",
        "O": "system:kube-controller-manager",
        "OU": "seven"
      }
    ]
}
EOF

[root@node0 pki]# cfssl gencert \
  -ca=ca.pem \
  -ca-key=ca-key.pem \
  -config=ca-config.json \
  -profile=kubernetes \
  kube-controller-manager-csr.json | cfssljson -bare kube-controller-manager
  
2022/08/16 03:08:51 [INFO] generate received request
2022/08/16 03:08:51 [INFO] received CSR
2022/08/16 03:08:51 [INFO] generating key: rsa-2048
2022/08/16 03:08:52 [INFO] encoded CSR
2022/08/16 03:08:52 [INFO] signed certificate with serial number 221915438695063545294639641644945037613649072201
2022/08/16 03:08:52 [WARNING] This certificate lacks a "hosts" field. This makes it unsuitable for
websites. For more information see the Baseline Requirements for the Issuance and Management
of Publicly-Trusted Certificates, v.1.1.6, from the CA/Browser Forum (https://cabforum.org);
specifically, section 10.2.3 ("Information Requirements").  

[root@node0 pki]# ls -l
total 84
-rw-r--r-- 1 root root 1009 Aug 16 03:03 admin.csr
-rw-r--r-- 1 root root  213 Aug 16 03:02 admin-csr.json
-rw------- 1 root root 1679 Aug 16 03:03 admin-key.pem
-rw-r--r-- 1 root root 1407 Aug 16 03:03 admin.pem
-rw-r--r-- 1 root root  236 Aug 16 03:00 ca-config.json
-rw-r--r-- 1 root root 1005 Aug 16 03:00 ca.csr
-rw-r--r-- 1 root root  211 Aug 16 03:00 ca-csr.json
-rw------- 1 root root 1679 Aug 16 03:00 ca-key.pem
-rw-r--r-- 1 root root 1318 Aug 16 03:00 ca.pem
-rw-r--r-- 1 root root 1066 Aug 16 03:08 kube-controller-manager.csr
-rw-r--r-- 1 root root  286 Aug 16 03:08 kube-controller-manager-csr.json
-rw------- 1 root root 1675 Aug 16 03:08 kube-controller-manager-key.pem
-rw-r--r-- 1 root root 1464 Aug 16 03:08 kube-controller-manager.pem
-rw-r--r-- 1 root root 1078 Aug 16 03:07 node1.csr
-rw-r--r-- 1 root root  223 Aug 16 03:07 node1-csr.json
-rw------- 1 root root 1679 Aug 16 03:07 node1-key.pem
-rw-r--r-- 1 root root 1456 Aug 16 03:07 node1.pem
-rw-r--r-- 1 root root 1078 Aug 16 03:07 node2.csr
-rw-r--r-- 1 root root  223 Aug 16 03:07 node2-csr.json
-rw------- 1 root root 1675 Aug 16 03:07 node2-key.pem
-rw-r--r-- 1 root root 1456 Aug 16 03:07 node2.pem
```

#### （5）生成kube-proxy客户端证书

```bash
[root@node0 pki]# cat > kube-proxy-csr.json <<EOF
{
  "CN": "system:kube-proxy",
  "key": {
    "algo": "rsa",
    "size": 2048
  },
  "names": [
    {
      "C": "CN",
      "ST": "BeiJing",
      "L": "BeiJing",
      "O": "k8s",
      "OU": "seven"
    }
  ]
}
EOF

[root@node0 pki]# cfssl gencert \
  -ca=ca.pem \
  -ca-key=ca-key.pem \
  -config=ca-config.json \
  -profile=kubernetes \
  kube-proxy-csr.json | cfssljson -bare kube-proxy
  
2022/08/16 03:09:57 [INFO] generate received request
2022/08/16 03:09:57 [INFO] received CSR
2022/08/16 03:09:57 [INFO] generating key: rsa-2048
2022/08/16 03:09:57 [INFO] encoded CSR
2022/08/16 03:09:57 [INFO] signed certificate with serial number 86023864614881132646707942680916828167128767772
2022/08/16 03:09:57 [WARNING] This certificate lacks a "hosts" field. This makes it unsuitable for
websites. For more information see the Baseline Requirements for the Issuance and Management
of Publicly-Trusted Certificates, v.1.1.6, from the CA/Browser Forum (https://cabforum.org);
specifically, section 10.2.3 ("Information Requirements").  
```

#### （6）生成kube-scheduler客户端证书

```bash
[root@node0 pki]# cat > kube-scheduler-csr.json <<EOF
{
    "CN": "system:kube-scheduler",
    "key": {
        "algo": "rsa",
        "size": 2048
    },
    "names": [
      {
        "C": "CN",
        "ST": "BeiJing",
        "L": "BeiJing",
        "O": "system:kube-scheduler",
        "OU": "seven"
      }
    ]
}
EOF

[root@node0 pki]# cfssl gencert \
  -ca=ca.pem \
  -ca-key=ca-key.pem \
  -config=ca-config.json \
  -profile=kubernetes \
  kube-scheduler-csr.json | cfssljson -bare kube-scheduler
  
2022/08/16 03:10:55 [INFO] generate received request
2022/08/16 03:10:55 [INFO] received CSR
2022/08/16 03:10:55 [INFO] generating key: rsa-2048
2022/08/16 03:10:55 [INFO] encoded CSR
2022/08/16 03:10:55 [INFO] signed certificate with serial number 134008838321960678762782262862085624755917598665
2022/08/16 03:10:55 [WARNING] This certificate lacks a "hosts" field. This makes it unsuitable for
websites. For more information see the Baseline Requirements for the Issuance and Management
of Publicly-Trusted Certificates, v.1.1.6, from the CA/Browser Forum (https://cabforum.org);
specifically, section 10.2.3 ("Information Requirements").  
```

#### （7）生成kube-apiserver服务端证书

服务端证书与客户端略有不同，客户端需要通过一个名字或者一个ip去访问服务端，所以证书必须要包含客户端所访问的名字或ip，用以客户端验证。

```bash
[root@node0 pki]# cat > kubernetes-csr.json <<EOF
{
  "CN": "kubernetes",
  "key": {
    "algo": "rsa",
    "size": 2048
  },
  "names": [
    {
      "C": "CN",
      "ST": "BeiJing",
      "L": "BeiJing",
      "O": "k8s",
      "OU": "seven"
    }
  ]
}
EOF

# apiserver的service ip地址（一般是svc网段的第一个ip）
[root@node0 pki]# KUBERNETES_SVC_IP=10.233.0.1

# 所有的master内网ip，逗号分隔（云环境可以加上master公网ip以便支持公网ip访问）
[root@node0 pki]# MASTER_IPS=192.168.48.142,192.168.48.143
# 生成证书
[root@node0 pki]# cfssl gencert \
  -ca=ca.pem \
  -ca-key=ca-key.pem \
  -config=ca-config.json \
  -hostname=${KUBERNETES_SVC_IP},${MASTER_IPS},127.0.0.1,kubernetes,kubernetes.default,kubernetes.default.svc,kubernetes.default.svc.cluster,kubernetes.svc.cluster.local \
  -profile=kubernetes \
  kubernetes-csr.json | cfssljson -bare kubernetes
  
2022/08/16 03:14:36 [INFO] generate received request
2022/08/16 03:14:36 [INFO] received CSR
2022/08/16 03:14:36 [INFO] generating key: rsa-2048
2022/08/16 03:14:36 [INFO] encoded CSR
2022/08/16 03:14:36 [INFO] signed certificate with serial number 269673411800826022201577034662155588426444682801  
```

#### （8）生成Service Account证书

```bash
[root@node0 pki]# cat > service-account-csr.json <<EOF
{
  "CN": "service-accounts",
  "key": {
    "algo": "rsa",
    "size": 2048
  },
  "names": [
    {
      "C": "CN",
      "ST": "BeiJing",
      "L": "BeiJing",
      "O": "k8s",
      "OU": "seven"
    }
  ]
}
EOF

[root@node0 pki]# cfssl gencert \
  -ca=ca.pem \
  -ca-key=ca-key.pem \
  -config=ca-config.json \
  -profile=kubernetes \
  service-account-csr.json | cfssljson -bare service-account
  
2022/08/16 03:15:50 [INFO] generate received request
2022/08/16 03:15:50 [INFO] received CSR
2022/08/16 03:15:50 [INFO] generating key: rsa-2048
2022/08/16 03:15:50 [INFO] encoded CSR
2022/08/16 03:15:50 [INFO] signed certificate with serial number 619622287562670459586578539958465276344541634040
2022/08/16 03:15:50 [WARNING] This certificate lacks a "hosts" field. This makes it unsuitable for
websites. For more information see the Baseline Requirements for the Issuance and Management
of Publicly-Trusted Certificates, v.1.1.6, from the CA/Browser Forum (https://cabforum.org);
specifically, section 10.2.3 ("Information Requirements").  
```

#### （9）生成proxy-client 证书

```bash
[root@node0 pki]# cat > proxy-client-csr.json <<EOF
{
  "CN": "aggregator",
  "key": {
    "algo": "rsa",
    "size": 2048
  },
  "names": [
    {
      "C": "CN",
      "ST": "BeiJing",
      "L": "BeiJing",
      "O": "k8s",
      "OU": "seven"
    }
  ]
}
EOF

[root@node0 pki]# cfssl gencert \
  -ca=ca.pem \
  -ca-key=ca-key.pem \
  -config=ca-config.json \
  -profile=kubernetes \
  proxy-client-csr.json | cfssljson -bare proxy-client

2022/08/16 03:16:45 [INFO] generate received request
2022/08/16 03:16:45 [INFO] received CSR
2022/08/16 03:16:45 [INFO] generating key: rsa-2048
2022/08/16 03:16:45 [INFO] encoded CSR
2022/08/16 03:16:45 [INFO] signed certificate with serial number 180843303364370957992836109575724179780153250165
2022/08/16 03:16:45 [WARNING] This certificate lacks a "hosts" field. This makes it unsuitable for
websites. For more information see the Baseline Requirements for the Issuance and Management
of Publicly-Trusted Certificates, v.1.1.6, from the CA/Browser Forum (https://cabforum.org);
specifically, section 10.2.3 ("Information Requirements").
```

#### 分发客户端、服务端证书

分发worker节点需要的证书和私钥

```bash
for instance in ${WORKERS[@]}; do
  scp ca.pem ${instance}-key.pem ${instance}.pem root@${instance}:~/
done
```

分发master节点需要的证书和私钥

> 注意：
>
> 由于下面分发的证书既包含了etcd的证书也包含了k8s主节点的证书。 
>
> 所以 MASTER_IPS 中必须包含所有 `master` 节点以及 `etcd` 节点。
>
> 如果没有包含所有etcd节点的证书，需要重新定义，逗号分隔

```bash
OIFS=$IFS
IFS=','
for instance in ${MASTER_IPS}; do
  scp ca.pem ca-key.pem kubernetes-key.pem kubernetes.pem \
    service-account-key.pem service-account.pem proxy-client.pem proxy-client-key.pem root@${instance}:~/
done
IFS=$OIFS
```
