# kubernetes部署

## 部署方式

文档：[https://kubernetes.io/docs/setup/production-environment/tools/](https://kubernetes.io/docs/setup/production-environment/tools/)

| 部署方式   | 复杂性 | 灵活性 | 描述                                           |
| ---------- | ------ | ------ | ---------------------------------------------- |
| Kubespray  | 简单   | 自定义 | 基于`kubeadm`和`Ansible`来部署                 |
| kubeadm    | 适中   | 自定义 | `Kubeadm `是一个快捷搭建`kubernetes`的安装工具 |
| 二进制部署 | 最复杂 | 最灵活 | 推荐生产环境使用                               |



## 系统初始化

### （1）更新系统

```bash
# 更新系统并重启
[root@localhost ~]# yum -y install epel-release
[root@localhost ~]# yum -y update && reboot

# 查看系统版本
[root@localhost ~]# cat /etc/redhat-release
CentOS Linux release 7.9.2009 (Core)
```

### （2）配置时区（可选）

```bash
# 先检查一下当前的时区是否正确
[root@localhost ~]# timedatectl
      Local time: Fri 2022-08-19 15:02:02 CST
  Universal time: Fri 2022-08-19 07:02:02 UTC
        RTC time: Fri 2022-08-19 07:02:00
       Time zone: Asia/Shanghai (CST, +0800)
     NTP enabled: n/a
NTP synchronized: no
 RTC in local TZ: no
      DST active: n/a

# 配置为东八区
[root@localhost ~]# timedatectl set-timezone "Asia/Shanghai"
```

### （3）配置24小时制（可选）

:::tip

CentOS默认情况就是24小时制，对于其他Linux发行版比如Ubuntu可能是12小时制，根据自己的喜好修改

:::

```bash
# 查看当前时间
root@ubuntu:~# date
Sun Aug 14 10:21:00 PM CST 2022  # PM代表下午, 即晚上的10点

# 修改为24小时制
root@ubuntu:~# vim /etc/default/locale
LANG=en_US.UTF-8
LC_TIME=en_DK.UTF-8		# 新增这一行

# 重启系统，然后再次查看时间
root@ubuntu:~# date
Sun Aug 14 22:23:33 CST 2022  # 已修改为22点
```

### （4）配置静态IP（可选）

:::tip

如果使用`VMware Workstation`等在本地部署，需要保证使用静态内网IP地址

:::

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
```

### （5）同步服务器时间（可选）

```bash
[root@localhost ~]# yum install ntpdate -y
[root@localhost ~]# ntpdate time.windows.com
[root@localhost ~]# crontab -e
* * * * * /usr/sbin/ntpdate time.windows.com
```

### （6）配置主机名

```bash
# 配置主机名
[root@localhost ~]# hostnamectl set-hostname node-1
[root@localhost ~]# hostnamectl set-hostname node-2
[root@localhost ~]# hostnamectl set-hostname node-3

# 添加主机名解析
[root@localhost ~]# cat >> /etc/hosts <<EOF

# kubernetes
192.168.48.142 node-1
192.168.48.143 node-2
192.168.48.144 node-3
EOF
```

### （7）关闭某些服务

```bash
# 关闭防火墙
[root@localhost ~]# systemctl stop firewalld && systemctl disable firewalld

# 关闭selinux
[root@localhost ~]# setenforce 0 && \
	getenforce && \
	sed -ri 's/(^SELINUX=)(.*)/\1disabled/' /etc/selinux/config && \
	grep -E '^SELINUX=' /etc/selinux/config

# 设置iptables规则
[root@localhost ~]# iptables -F && \
	iptables -X && \
	iptables -F -t nat && \
	iptables -X -t nat && \
	iptables -P FORWARD ACCEPT

# 关闭swap
[root@localhost ~]# swapoff -a && free
[root@localhost ~]# sed -ri '/(^[^#])(.*)[[:blank:]]swap[[:blank:]](.*)/s/^/#/' /etc/fstab && \
                    grep swap /etc/fstab

# 关闭dnsmasq(否则可能导致容器无法解析域名)
[root@localhost ~]# service dnsmasq stop && systemctl disable dnsmasq
```

### （8）调整内核参数

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

### （9）安装常用软件包

```bash
[root@localhost ~]# yum -y install yum-utils \
	vim curl wget rsync \
	socat conntrack ipvsadm ipset \
	sysstat iptables libseccomp
```

### （10）调整ulimit

```bash
# 检查当前配置
[root@node-1 ~]# ulimit -a | grep -E 'open files|max user processes'
open files                      (-n) 1024
max user processes              (-u) 7184

# 临时设置
[root@localhost ~]# ulimit -n 102400 && ulimit -u 102400

# 永久设置
[root@localhost ~]# cat >>/etc/security/limits.conf <<EOF
# max number of open file descriptors
* soft nofile 102400
* hard nofile 102400

# max number of processes
* soft nproc  102400
* hard nproc  102400
EOF
```

### （11）重启系统再次检查

## 

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
>

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

## 🍁 使用二进制部署（推荐）

### 必读说明

**（1）节点规划**

:::tip

**Node节点**：Master 或 Worker 或 Master+Worker 节点我们统称为Node节点

**Master节点**：仅部署apiserver、kube-controller-manager和kube-scheduler的节点

**Worker节点**：仅部署kubelet、kube-proxy的节点

:::

| 主机名 | Node节点 | Master节点 | Worker节点 | Etcd节点 | 内存 | CPU  | 静态IP         |
| ------ | -------- | ---------- | ---------- | -------- | ---- | ---- | -------------- |
| node-1 | ✔        | ✔          |            | ✔        | 2G   | 2核  | 192.168.48.142 |
| node-2 | ✔        | ✔          | ✔          | ✔        | 2G   | 2核  | 192.168.48.143 |
| node-3 | ✔        |            | ✔          | ✔        | 2G   | 2核  | 192.168.48.144 |

**（2）版本说明**

| 组件       | 版本         | 备注                 |
| ---------- | ------------ | -------------------- |
| OS         | `Centos 7.9` |                      |
| kubernetes | `v1.24.4`    | 同样支持部署其他版本 |

**（3）科学上网**

在部署过程中需要去海外下载部分镜像，需要主机能够科学上网，或者提前下载到本地再上传到服务器中

**（4）最低配置**

支持主流系统，内存最低2G，CPU最低2核，磁盘30G以上

### 中转节点

为了方便文件的分发，我们选择一个中转节点（随便一个节点，可以是集群中的也可以是非集群中的），配置好跟其他所有节点的免密登录

```bash
# 生成密钥对
[root@node-1 ~]# ssh-keygen -t rsa

# 配置免密登录
[root@node-1 ~]# ssh-copy-id root@node-1
[root@node-1 ~]# ssh-copy-id root@node-2
[root@node-1 ~]# ssh-copy-id root@node-3
```

### 下载软件包

::: tip kubernetes下载地址是如何来的?

1. 打开Github Kubernetes Releases页面：[https://github.com/kubernetes/kubernetes/releases/](https://github.com/kubernetes/kubernetes/releases/)

2. 选择合适的版本后，点击`See the CHANGELOG for more details`中的链接

3. 根据 `Client Binaries` 和 `Server Binaries`下载二进制包

   `Server Binaries`二进制包中包含了`Client Binaries`中的可执行命令，所以我们只需要下载`Server Binaries`包即可

:::

```bash
# 中转节点创建软件包目录pkg
[root@node-1 ~]# mkdir -p pkg && cd pkg

# 下载K8S二进制包
[root@node-1 pkg]# wget -c https://storage.googleapis.com/kubernetes-release/release/v1.24.4/kubernetes-server-linux-amd64.tar.gz
[root@node-1 pkg]# tar zxf kubernetes-server-linux-amd64.tar.gz
[root@node-1 pkg]# cd kubernetes && mkdir -p src && tar zxf  kubernetes-src.tar.gz -C ./src
[root@node-1 kubernetes]# cd ~/pkg/

# 下载Etcd软件包
[root@node-1 pkg]# wget -c https://github.com/etcd-io/etcd/releases/download/v3.4.20/etcd-v3.4.20-linux-amd64.tar.gz
[root@node-1 pkg]# tar zxf etcd-v3.4.20-linux-amd64.tar.gz

# 备注: 也可以单独下载某个二进制包
# wget https://storage.googleapis.com/kubernetes-release/release/v1.24.3/bin/linux/amd64/kubectl
```

### 分发软件包

```bash
# 进入kubernetes目录
[root@node-1 ~]# cd ~/pkg/kubernetes/server/bin/

# Master节点
[root@node-1 bin]# MASTERS=(node-1 node-2) ; for instance in ${MASTERS[@]}; do
  scp kube-apiserver \
      kube-controller-manager \
      kube-scheduler \
      kubectl \
  root@${instance}:/usr/local/bin/
done

# Node节点
[root@node-1 bin]# NODES=(node-1 node-2 node-3) ; for instance in ${NODES[@]}; do
  scp kubelet \
      kube-proxy \
  root@${instance}:/usr/local/bin/
done

# --------------------------------------------------------------------------------------------------------
# 进入etcd目录
[root@node-1 bin]# cd ~/pkg/etcd-v3.4.20-linux-amd64/

# Etcd节点
[root@node-1 etcd-v3.4.20-linux-amd64]# ETCDS=(node-1 node-2 node-3) ; for instance in ${ETCDS[@]}; do
  scp etcd \
      etcdctl \
  root@${instance}:/usr/local/bin/
done
```

### 生成SSL证书

#### **准备工作：下载cfssl工具**

```bash
# 下载二进制工具
[root@node-1 ~]# wget https://github.com/cloudflare/cfssl/releases/download/v1.6.1/cfssl_1.6.1_linux_amd64 -O /usr/local/bin/cfssl && \
                 wget https://github.com/cloudflare/cfssl/releases/download/v1.6.1/cfssljson_1.6.1_linux_amd64 -O /usr/local/bin/cfssljson && \
                 chmod +x /usr/local/bin/cfssl /usr/local/bin/cfssljson

# 查看版本
[root@node-1 ~]# cfssl version && echo && cfssljson --version
Version: 1.6.1
Runtime: go1.12.12

Version: 1.6.1
Runtime: go1.12.12
```

#### 中转节点证书目录pki

```bash
# 在中转节点创建一个单独的证书目录
[root@node-1 ~]# mkdir -p ~/pki && cd ~/pki
```

#### **（1）CA证书**

根证书（CA 证书）是集群所有节点共享的，只需要创建一个根证书（CA 证书），后续创建的所有证书都由它签名

::: details 点击查看完整命令

```bash
# 创建根证书配置文件（过期时间 876000h/24/365 = 100年）
[root@node-1 pki]# cat > ca-config.json <<EOF
{
  "signing": {
    "default": {
      "expiry": "876000h"
    },
    "profiles": {
      "kubernetes": {
        "expiry": "876000h",
        "usages": [
          "signing",
          "key encipherment",
          "server auth",
          "client auth"
        ]
      }
    }
  }
}
EOF

# 创建根证书签名请求文件
[root@node-1 pki]# cat > ca-csr.json <<EOF
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

# 生成根证书和私钥
[root@node-1 pki]# cfssl gencert -initca ca-csr.json | cfssljson -bare ca

2022/08/21 11:46:56 [INFO] generating a new CA key and certificate from CSR
2022/08/21 11:46:56 [INFO] generate received request
2022/08/21 11:46:56 [INFO] received CSR
2022/08/21 11:46:56 [INFO] generating key: rsa-2048
2022/08/21 11:46:56 [INFO] encoded CSR
2022/08/21 11:46:56 [INFO] signed certificate with serial number 253271716697038775687884636491121935350121536450

[root@node-1 pki]# ls -l
total 20
-rw-r--r-- 1 root root  236 Aug 16 03:00 ca-config.json
-rw-r--r-- 1 root root 1005 Aug 16 03:00 ca.csr
-rw-r--r-- 1 root root  211 Aug 16 03:00 ca-csr.json
-rw------- 1 root root 1679 Aug 16 03:00 ca-key.pem   # CA证书私钥
-rw-r--r-- 1 root root 1318 Aug 16 03:00 ca.pem       # CA证书
```

:::

#### （2）SA证书

* Service Account证书，集群共享一份证书

::: details 点击查看完整命令

```bash
[root@node-1 pki]# cat > service-account-csr.json <<EOF
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

[root@node-1 pki]# cfssl gencert \
  -ca=ca.pem \
  -ca-key=ca-key.pem \
  -config=ca-config.json \
  -profile=kubernetes \
  service-account-csr.json | cfssljson -bare service-account
  
2022/08/21 11:51:10 [INFO] generate received request
2022/08/21 11:51:10 [INFO] received CSR
2022/08/21 11:51:10 [INFO] generating key: rsa-2048
2022/08/21 11:51:11 [INFO] encoded CSR
2022/08/21 11:51:11 [INFO] signed certificate with serial number 175935166455417068459398438005389278116292115335
2022/08/21 11:51:11 [WARNING] This certificate lacks a "hosts" field. This makes it unsuitable for
websites. For more information see the Baseline Requirements for the Issuance and Management
of Publicly-Trusted Certificates, v.1.1.6, from the CA/Browser Forum (https://cabforum.org);
specifically, section 10.2.3 ("Information Requirements").

[root@node-1 pki]# ls -l | grep service-account
-rw-r--r-- 1 root root 1009 Aug 21 11:51 service-account.csr
-rw-r--r-- 1 root root  213 Aug 21 11:51 service-account-csr.json
-rw------- 1 root root 1679 Aug 21 11:51 service-account-key.pem
-rw-r--r-- 1 root root 1407 Aug 21 11:51 service-account.pem
```

:::

#### **（3）admin证书**

admin用户证书，集群内只需要创建一份即可

::: details 点击查看完整命令

```bash
# admin客户端证书配置文件
[root@node-1 pki]# cat > admin-csr.json <<EOF
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

# 生成证书
[root@node-1 pki]# cfssl gencert \
  -ca=ca.pem \
  -ca-key=ca-key.pem \
  -config=ca-config.json \
  -profile=kubernetes \
  admin-csr.json | cfssljson -bare admin

2022/08/21 11:47:28 [INFO] generate received request
2022/08/21 11:47:28 [INFO] received CSR
2022/08/21 11:47:28 [INFO] generating key: rsa-2048
2022/08/21 11:47:28 [INFO] encoded CSR
2022/08/21 11:47:28 [INFO] signed certificate with serial number 651243122780313242439194972461572344701530496872
2022/08/21 11:47:28 [WARNING] This certificate lacks a "hosts" field. This makes it unsuitable for
websites. For more information see the Baseline Requirements for the Issuance and Management
of Publicly-Trusted Certificates, v.1.1.6, from the CA/Browser Forum (https://cabforum.org);
specifically, section 10.2.3 ("Information Requirements").

[root@node-1 pki]# ls -l | grep admin
-rw-r--r-- 1 root root 1009 Aug 21 11:47 admin.csr
-rw-r--r-- 1 root root  213 Aug 21 11:47 admin-csr.json
-rw------- 1 root root 1675 Aug 21 11:47 admin-key.pem
-rw-r--r-- 1 root root 1407 Aug 21 11:47 admin.pem
```

:::

#### （4）kubelet证书

* Kubernetes使用一种称为Node Authorizer的专用授权模式来授权Kubelets发出的API请求。 

  Kubelet使用将其标识为`system:nodes`组中的凭据，其用户名为`system:node:<nodeName>`

* 每个Node使用自己的证书

::: details 点击查看完整命令

```bash
# 设置Node列表
[root@node-1 pki]# NODES=(node-1 node-2 node-3)
[root@node-1 pki]# NODE_IPS=(192.168.48.142 192.168.48.143 192.168.48.144)

# 生成所有Node节点的证书配置
[root@node-1 pki]# for ((i=0;i<${#NODES[@]};i++)); do
cat > ${NODES[$i]}-csr.json <<EOF
{
  "CN": "system:node:${NODES[$i]}",
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
  -hostname=${NODES[$i]},${NODE_IPS[$i]} \
  -profile=kubernetes \
  ${NODES[$i]}-csr.json | cfssljson -bare ${NODES[$i]}
done

2022/08/21 11:47:59 [INFO] generate received request
2022/08/21 11:47:59 [INFO] received CSR
2022/08/21 11:47:59 [INFO] generating key: rsa-2048
2022/08/21 11:47:59 [INFO] encoded CSR
2022/08/21 11:47:59 [INFO] signed certificate with serial number 99925140828288407693517684936448811202438995925
2022/08/21 11:47:59 [INFO] generate received request
2022/08/21 11:47:59 [INFO] received CSR
2022/08/21 11:47:59 [INFO] generating key: rsa-2048
2022/08/21 11:48:00 [INFO] encoded CSR
2022/08/21 11:48:00 [INFO] signed certificate with serial number 638244081209209689287400959807600586650469594148
2022/08/21 11:48:00 [INFO] generate received request
2022/08/21 11:48:00 [INFO] received CSR
2022/08/21 11:48:00 [INFO] generating key: rsa-2048
2022/08/21 11:48:00 [INFO] encoded CSR
2022/08/21 11:48:00 [INFO] signed certificate with serial number 382832994393608753859327324523279605896687730207

[root@node-1 pki]# ls -l | grep node
-rw-r--r-- 1 root root 1078 Aug 21 11:47 node-1.csr
-rw-r--r-- 1 root root  224 Aug 21 11:47 node-1-csr.json
-rw------- 1 root root 1679 Aug 21 11:47 node-1-key.pem
-rw-r--r-- 1 root root 1456 Aug 21 11:47 node-1.pem
-rw-r--r-- 1 root root 1078 Aug 21 11:48 node-2.csr
-rw-r--r-- 1 root root  224 Aug 21 11:47 node-2-csr.json
-rw------- 1 root root 1679 Aug 21 11:48 node-2-key.pem
-rw-r--r-- 1 root root 1456 Aug 21 11:48 node-2.pem
-rw-r--r-- 1 root root 1078 Aug 21 11:48 node-3.csr
-rw-r--r-- 1 root root  224 Aug 21 11:48 node-3-csr.json
-rw------- 1 root root 1675 Aug 21 11:48 node-3-key.pem
-rw-r--r-- 1 root root 1456 Aug 21 11:48 node-3.pem
```

:::

#### （5）kube-proxy证书

* 所有Node节点共享一份证书

::: details 点击查看完整命令

```bash
[root@node-1 pki]# cat > kube-proxy-csr.json <<EOF
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

[root@node-1 pki]# cfssl gencert \
  -ca=ca.pem \
  -ca-key=ca-key.pem \
  -config=ca-config.json \
  -profile=kubernetes \
  kube-proxy-csr.json | cfssljson -bare kube-proxy
  
2022/08/21 11:49:01 [INFO] generate received request
2022/08/21 11:49:01 [INFO] received CSR
2022/08/21 11:49:01 [INFO] generating key: rsa-2048
2022/08/21 11:49:01 [INFO] encoded CSR
2022/08/21 11:49:01 [INFO] signed certificate with serial number 109829974994790485239297069683729116680084539008
2022/08/21 11:49:01 [WARNING] This certificate lacks a "hosts" field. This makes it unsuitable for
websites. For more information see the Baseline Requirements for the Issuance and Management
of Publicly-Trusted Certificates, v.1.1.6, from the CA/Browser Forum (https://cabforum.org);
specifically, section 10.2.3 ("Information Requirements").

[root@node-1 pki]# ls -l | grep kube-proxy
-rw-r--r-- 1 root root 1009 Aug 21 11:49 kube-proxy.csr
-rw-r--r-- 1 root root  214 Aug 21 11:48 kube-proxy-csr.json
-rw------- 1 root root 1679 Aug 21 11:49 kube-proxy-key.pem
-rw-r--r-- 1 root root 1407 Aug 21 11:49 kube-proxy.pem
```

:::

#### （6）proxy-client 证书

* 所有Node节点共享一份证书

::: details 点击查看完整命令

```bash
[root@node-1 pki]# cat > proxy-client-csr.json <<EOF
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

[root@node-1 pki]# cfssl gencert \
  -ca=ca.pem \
  -ca-key=ca-key.pem \
  -config=ca-config.json \
  -profile=kubernetes \
  proxy-client-csr.json | cfssljson -bare proxy-client

2022/08/21 11:51:35 [INFO] generate received request
2022/08/21 11:51:35 [INFO] received CSR
2022/08/21 11:51:35 [INFO] generating key: rsa-2048
2022/08/21 11:51:36 [INFO] encoded CSR
2022/08/21 11:51:36 [INFO] signed certificate with serial number 624599378216669470989725514687740733197475898533
2022/08/21 11:51:36 [WARNING] This certificate lacks a "hosts" field. This makes it unsuitable for
websites. For more information see the Baseline Requirements for the Issuance and Management
of Publicly-Trusted Certificates, v.1.1.6, from the CA/Browser Forum (https://cabforum.org);
specifically, section 10.2.3 ("Information Requirements").

[root@node-1 pki]# ls -l | grep proxy-client
-rw-r--r-- 1 root root 1001 Aug 21 11:51 proxy-client.csr
-rw-r--r-- 1 root root  207 Aug 21 11:51 proxy-client-csr.json
-rw------- 1 root root 1675 Aug 21 11:51 proxy-client-key.pem
-rw-r--r-- 1 root root 1399 Aug 21 11:51 proxy-client.pem
```

:::

#### （7）kube-apiserver证书

* 服务端证书与客户端略有不同，客户端需要通过一个名字或者一个ip去访问服务端，

  所以证书必须要包含客户端所访问的名字或ip，用以客户端验证

* 所有Master节点共享一份证书

::: details 点击查看完整命令

```bash
[root@node-1 pki]# cat > kubernetes-csr.json <<EOF
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
[root@node-1 pki]# KUBERNETES_SVC_IP=10.233.0.1

# 所有的master内网ip，逗号分隔（云环境可以加上master公网ip以便支持公网ip访问）
[root@node-1 pki]# MASTER_IPS=192.168.48.142,192.168.48.143,192.168.48.144

# 生成证书
[root@node-1 pki]# cfssl gencert \
  -ca=ca.pem \
  -ca-key=ca-key.pem \
  -config=ca-config.json \
  -hostname=${KUBERNETES_SVC_IP},${MASTER_IPS},127.0.0.1,kubernetes,kubernetes.default,kubernetes.default.svc,kubernetes.default.svc.cluster,kubernetes.svc.cluster.local \
  -profile=kubernetes \
  kubernetes-csr.json | cfssljson -bare kubernetes
  
2022/08/21 11:50:44 [INFO] generate received request
2022/08/21 11:50:44 [INFO] received CSR
2022/08/21 11:50:44 [INFO] generating key: rsa-2048
2022/08/21 11:50:44 [INFO] encoded CSR
2022/08/21 11:50:44 [INFO] signed certificate with serial number 376785325346225517588814760780559674014863525105

[root@node-1 pki]# ls -l | grep kubernetes
-rw-r--r-- 1 root root 1249 Aug 21 11:50 kubernetes.csr
-rw-r--r-- 1 root root  207 Aug 21 11:49 kubernetes-csr.json
-rw------- 1 root root 1675 Aug 21 11:50 kubernetes-key.pem
-rw-r--r-- 1 root root 1623 Aug 21 11:50 kubernetes.pem
```

:::

#### （8）kube-scheduler证书

* 所有Master节点共享一份证书

::: details 点击查看完整命令

```bash
[root@node-1 pki]# cat > kube-scheduler-csr.json <<EOF
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

[root@node-1 pki]# cfssl gencert \
  -ca=ca.pem \
  -ca-key=ca-key.pem \
  -config=ca-config.json \
  -profile=kubernetes \
  kube-scheduler-csr.json | cfssljson -bare kube-scheduler
  
2022/08/21 11:49:26 [INFO] generate received request
2022/08/21 11:49:26 [INFO] received CSR
2022/08/21 11:49:26 [INFO] generating key: rsa-2048
2022/08/21 11:49:27 [INFO] encoded CSR
2022/08/21 11:49:27 [INFO] signed certificate with serial number 529607043360813455375991599802579655701759291101
2022/08/21 11:49:27 [WARNING] This certificate lacks a "hosts" field. This makes it unsuitable for
websites. For more information see the Baseline Requirements for the Issuance and Management
of Publicly-Trusted Certificates, v.1.1.6, from the CA/Browser Forum (https://cabforum.org);
specifically, section 10.2.3 ("Information Requirements").

[root@node-1 pki]# ls -l | grep kube-scheduler
-rw-r--r-- 1 root root 1041 Aug 21 11:49 kube-scheduler.csr
-rw-r--r-- 1 root root  268 Aug 21 11:49 kube-scheduler-csr.json
-rw------- 1 root root 1679 Aug 21 11:49 kube-scheduler-key.pem
-rw-r--r-- 1 root root 1440 Aug 21 11:49 kube-scheduler.pem
```

:::

#### （9）kube-controller-manager证书

* 所有Master节点共享一份证书

::: details 点击查看完整命令

```bash
[root@node-1 pki]# cat > kube-controller-manager-csr.json <<EOF
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

[root@node-1 pki]# cfssl gencert \
  -ca=ca.pem \
  -ca-key=ca-key.pem \
  -config=ca-config.json \
  -profile=kubernetes \
  kube-controller-manager-csr.json | cfssljson -bare kube-controller-manager
  
2022/08/21 11:48:32 [INFO] generate received request
2022/08/21 11:48:32 [INFO] received CSR
2022/08/21 11:48:32 [INFO] generating key: rsa-2048
2022/08/21 11:48:32 [INFO] encoded CSR
2022/08/21 11:48:32 [INFO] signed certificate with serial number 611097625429267385505563611927508226697109199115
2022/08/21 11:48:32 [WARNING] This certificate lacks a "hosts" field. This makes it unsuitable for
websites. For more information see the Baseline Requirements for the Issuance and Management
of Publicly-Trusted Certificates, v.1.1.6, from the CA/Browser Forum (https://cabforum.org);
specifically, section 10.2.3 ("Information Requirements").

[root@node-1 pki]# ls -l | grep kube-controller-manager
-rw-r--r-- 1 root root 1066 Aug 21 11:48 kube-controller-manager.csr
-rw-r--r-- 1 root root  286 Aug 21 11:48 kube-controller-manager-csr.json
-rw------- 1 root root 1679 Aug 21 11:48 kube-controller-manager-key.pem
-rw-r--r-- 1 root root 1464 Aug 21 11:48 kube-controller-manager.pem
```

:::

#### 分发证书：Node、Master、Etcd

（1）分发Node节点需要的证书和私钥

```bash
[root@node-1 pki]# NODES=(node-1 node-2 node-3) ; for instance in ${NODES[@]}; do
    rsync -avzp \
        ca.pem \
        ${instance}-key.pem \
        ${instance}.pem \
    root@${instance}:~/tmp.node.ssl/
done
```

（2）分发Master节点需要的证书和私钥

```bash
[root@node-1 pki]# MASTERS=(node-1 node-2) ; for instance in ${MASTERS[@]}; do
    rsync -avzp \
        ca.pem \
        ca-key.pem \
        kubernetes-key.pem \
        kubernetes.pem \
        service-account-key.pem \
        service-account.pem \
        proxy-client.pem \
        proxy-client-key.pem \
    root@${instance}:~/tmp.master.ssl/
done
```

（3）分发Etcd节点需要的证书和私钥

```bash
[root@node-1 pki]# ETCDS=(node-1 node-2 node-3) ; for instance in ${ETCDS[@]}; do	
	rsync -avzp \
        ca.pem \
        kubernetes-key.pem \
        kubernetes.pem \
    root@${instance}:~/tmp.etcd.ssl/
done
```

### 认证配置

::: tip

kubernetes的认证配置文件，也叫kubeconfigs，用于让kubernetes的客户端定位kube-apiserver并通过apiserver的安全认证。

接下来我们一起来生成各个组件的kubeconfigs，包括controller-manager，kubelet，kube-proxy，scheduler，以及admin用户

:::

#### 中转节点配置文件目录kubeconfig

```bash
# 在中转节点创建一个单独的配置文件目录
[root@node-1 ~]# mkdir ~/kubeconfig && cd ~/kubeconfig
```

#### （1）kubelet

::: details 点击查看完整命令

```bash
# 指定你的worker列表（hostname），空格分隔
[root@node-1 kubeconfig]# NODES="node-1 node-2 node-3" ; for instance in ${NODES}; do
  kubectl config set-cluster kubernetes \
    --certificate-authority=/root/pki/ca.pem \
    --embed-certs=true \
    --server=https://127.0.0.1:6443 \
    --kubeconfig=${instance}.kubeconfig

  kubectl config set-credentials system:node:${instance} \
    --client-certificate=/root/pki/${instance}.pem \
    --client-key=/root/pki/${instance}-key.pem \
    --embed-certs=true \
    --kubeconfig=${instance}.kubeconfig

  kubectl config set-context default \
    --cluster=kubernetes \
    --user=system:node:${instance} \
    --kubeconfig=${instance}.kubeconfig

  kubectl config use-context default --kubeconfig=${instance}.kubeconfig
done

Cluster "kubernetes" set.
User "system:node:node-1" set.
Context "default" created.
Switched to context "default".
Cluster "kubernetes" set.
User "system:node:node-2" set.
Context "default" created.
Switched to context "default".
Cluster "kubernetes" set.
User "system:node:node-3" set.
Context "default" created.
Switched to context "default".

[root@node-1 kubeconfig]# ls -l
total 24
-rw------- 1 root root 6305 Aug 22 19:37 node-1.kubeconfig
-rw------- 1 root root 6301 Aug 22 19:37 node-2.kubeconfig
-rw------- 1 root root 6301 Aug 22 19:37 node-3.kubeconfig
```

:::

#### （2）kube-proxy

::: details 点击查看完整命令

```bash
kubectl config set-cluster kubernetes \
    --certificate-authority=/root/pki/ca.pem \
    --embed-certs=true \
    --server=https://127.0.0.1:6443 \
    --kubeconfig=kube-proxy.kubeconfig

kubectl config set-credentials system:kube-proxy \
   --client-certificate=/root/pki/kube-proxy.pem \
   --client-key=/root/pki/kube-proxy-key.pem \
   --embed-certs=true \
   --kubeconfig=kube-proxy.kubeconfig

kubectl config set-context default \
   --cluster=kubernetes \
   --user=system:kube-proxy \
   --kubeconfig=kube-proxy.kubeconfig

kubectl config use-context default --kubeconfig=kube-proxy.kubeconfig

[root@node-1 kubeconfig]# ls -l | grep kube-proxy.kubeconfig
-rw------- 1 root root 6.1K Aug 22 20:22 kube-proxy.kubeconfig
```

:::

#### （3）kube-controller-manager

::: details 点击查看完整命令

```bash
kubectl config set-cluster kubernetes \
  --certificate-authority=/root/pki/ca.pem \
  --embed-certs=true \
  --server=https://127.0.0.1:6443 \
  --kubeconfig=kube-controller-manager.kubeconfig

kubectl config set-credentials system:kube-controller-manager \
  --client-certificate=/root/pki/kube-controller-manager.pem \
  --client-key=/root/pki/kube-controller-manager-key.pem \
  --embed-certs=true \
  --kubeconfig=kube-controller-manager.kubeconfig

kubectl config set-context default \
  --cluster=kubernetes \
  --user=system:kube-controller-manager \
  --kubeconfig=kube-controller-manager.kubeconfig

kubectl config use-context default --kubeconfig=kube-controller-manager.kubeconfig

[root@node-1 kubeconfig]# ls -l | grep kube-controller-manager.kubeconfig
-rw------- 1 root root 6333 Aug 22 20:23 kube-controller-manager.kubeconfig
```

:::

#### （4）kube-scheduler

::: details 点击查看完整命令

```bash
kubectl config set-cluster kubernetes \
  --certificate-authority=/root/pki/ca.pem \
  --embed-certs=true \
  --server=https://127.0.0.1:6443 \
  --kubeconfig=kube-scheduler.kubeconfig

kubectl config set-credentials system:kube-scheduler \
  --client-certificate=/root/pki/kube-scheduler.pem \
  --client-key=/root/pki/kube-scheduler-key.pem \
  --embed-certs=true \
  --kubeconfig=kube-scheduler.kubeconfig

kubectl config set-context default \
  --cluster=kubernetes \
  --user=system:kube-scheduler \
  --kubeconfig=kube-scheduler.kubeconfig

kubectl config use-context default --kubeconfig=kube-scheduler.kubeconfig

[root@node-1 kubeconfig]# ls -l | grep kube-scheduler.kubeconfig
-rw------- 1 root root 6283 Aug 22 20:24 kube-scheduler.kubeconfig
```

:::

#### （5）admin

::: details 点击查看完整命令

```bash
kubectl config set-cluster kubernetes \
  --certificate-authority=/root/pki/ca.pem \
  --embed-certs=true \
  --server=https://127.0.0.1:6443 \
  --kubeconfig=admin.kubeconfig

kubectl config set-credentials admin \
  --client-certificate=/root/pki/admin.pem \
  --client-key=/root/pki/admin-key.pem \
  --embed-certs=true \
  --kubeconfig=admin.kubeconfig

kubectl config set-context default \
  --cluster=kubernetes \
  --user=admin \
  --kubeconfig=admin.kubeconfig

kubectl config use-context default --kubeconfig=admin.kubeconfig

[root@node-1 kubeconfig]# ls -l | grep admin.kubeconfig
-rw------- 1 root root 6207 Aug 22 20:25 admin.kubeconfig
```

:::

#### 分发配置文件：Node、Master

把kubelet和kube-proxy需要的kubeconfig配置分发到每个Node节点

```bash
[root@node-1 kubeconfig]# NODES="node-1 node-2 node-3" ; for instance in ${NODES}; do
    rsync -avzp \
        ${instance}.kubeconfig \
    	kube-proxy.kubeconfig \
	${instance}:~/tmp.node.kubeconfig/
done
```

把kube-controller-manager和kube-scheduler需要的kubeconfig配置分发到Master节点

```bash
[root@node-1 kubeconfig]# MASTERS="node-1 node-2" ; for instance in ${MASTERS}; do
    rsync -avzp \
        admin.kubeconfig \
        kube-controller-manager.kubeconfig \
        kube-scheduler.kubeconfig \
    ${instance}:~/tmp.master.kubeconfig/
done
```

### 部署Etcd集群

:::tip

以下操作在所有Etcd节点执行

:::

（1）拷贝etcd证书

```bash
[root@node-1 ~]# mkdir -p /etc/etcd/ssl /var/lib/etcd && chmod 700 /var/lib/etcd
[root@node-1 ~]# mv ~/tmp.etcd.ssl/ca.pem \
                    ~/tmp.etcd.ssl/kubernetes.pem \
                    ~/tmp.etcd.ssl/kubernetes-key.pem \
                 /etc/etcd/ssl/
[root@node-1 ~]# rmdir ~/tmp.etcd.ssl
```

（2）配置etcd.service文件

::: details 点击查看完整命令

```bash
ETCD_NAME=$(hostname -s)
ETCD_IP=192.168.48.144

# etcd所有节点的ip地址
ETCD_NAMES=(node-1 node-2 node-3)
ETCD_IPS=(192.168.48.142 192.168.48.143 192.168.48.144)

cat >/etc/systemd/system/etcd.service <<EOF
[Unit]
Description=etcd
Documentation=https://github.com/coreos

[Service]
Type=notify
ExecStart=/usr/local/bin/etcd \\
  --name ${ETCD_NAME} \\
  --cert-file=/etc/etcd/ssl/kubernetes.pem \\
  --key-file=/etc/etcd/ssl/kubernetes-key.pem \\
  --peer-cert-file=/etc/etcd/ssl/kubernetes.pem \\
  --peer-key-file=/etc/etcd/ssl/kubernetes-key.pem \\
  --trusted-ca-file=/etc/etcd/ssl/ca.pem \\
  --peer-trusted-ca-file=/etc/etcd/ssl/ca.pem \\
  --peer-client-cert-auth \\
  --client-cert-auth \\
  --initial-advertise-peer-urls https://${ETCD_IP}:2380 \\
  --listen-peer-urls https://${ETCD_IP}:2380 \\
  --listen-client-urls https://${ETCD_IP}:2379,https://127.0.0.1:2379 \\
  --advertise-client-urls https://${ETCD_IP}:2379 \\
  --initial-cluster-token etcd-cluster-0 \\
  --initial-cluster ${ETCD_NAMES[0]}=https://${ETCD_IPS[0]}:2380,${ETCD_NAMES[1]}=https://${ETCD_IPS[1]}:2380,${ETCD_NAMES[2]}=https://${ETCD_IPS[2]}:2380 \\
  --initial-cluster-state new \\
  --data-dir=/var/lib/etcd
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF
```

:::

（3）启动etcd集群

```bash
systemctl daemon-reload && systemctl enable etcd && systemctl restart etcd
```

（4）验证etcd集群状态

```bash
ETCDCTL_API=3 etcdctl member list \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/etcd/ssl/ca.pem \
  --cert=/etc/etcd/ssl/kubernetes.pem \
  --key=/etc/etcd/ssl/kubernetes-key.pem
  
2c3beb1e7481123e, started, node-2, https://192.168.48.143:2380, https://192.168.48.143:2379, false
369510e61aee9b6f, started, node-3, https://192.168.48.144:2380, https://192.168.48.144:2379, false
e8775739ad328e98, started, node-1, https://192.168.48.142:2380, https://192.168.48.142:2379, false  
```

### 部署Kubernetes Master节点

:::tip

以下操作在所有Master节点执行

:::

#### 部署apiserver

```bash
# 准备证书文件
mkdir -p /etc/kubernetes/ssl

mv ~/tmp.master.ssl/ca.pem \
   ~/tmp.master.ssl/ca-key.pem \
   ~/tmp.master.ssl/kubernetes.pem \
   ~/tmp.master.ssl/kubernetes-key.pem \
   ~/tmp.master.ssl/service-account.pem \
   ~/tmp.master.ssl/service-account-key.pem \
   ~/tmp.master.ssl/proxy-client.pem \
   ~/tmp.master.ssl/proxy-client-key.pem \
/etc/kubernetes/ssl

rmdir ~/tmp.master.ssl

# 配置kube-apiserver.service
# 本机内网ip
IP=192.168.48.143
# apiserver实例数
APISERVER_COUNT=2
# etcd节点
ETCD_ENDPOINTS=(192.168.48.142 192.168.48.143 192.168.48.144)
# 创建 apiserver service
cat >/etc/systemd/system/kube-apiserver.service <<EOF
[Unit]
Description=Kubernetes API Server
Documentation=https://github.com/kubernetes/kubernetes

[Service]
ExecStart=/usr/local/bin/kube-apiserver \\
  --advertise-address=${IP} \\
  --allow-privileged=true \\
  --apiserver-count=${APISERVER_COUNT} \\
  --audit-log-maxage=30 \\
  --audit-log-maxbackup=3 \\
  --audit-log-maxsize=100 \\
  --audit-log-path=/var/log/audit.log \\
  --authorization-mode=Node,RBAC \\
  --bind-address=0.0.0.0 \\
  --client-ca-file=/etc/kubernetes/ssl/ca.pem \\
  --enable-admission-plugins=NamespaceLifecycle,NodeRestriction,LimitRanger,ServiceAccount,DefaultStorageClass,ResourceQuota \\
  --etcd-cafile=/etc/kubernetes/ssl/ca.pem \\
  --etcd-certfile=/etc/kubernetes/ssl/kubernetes.pem \\
  --etcd-keyfile=/etc/kubernetes/ssl/kubernetes-key.pem \\
  --etcd-servers=https://${ETCD_ENDPOINTS[0]}:2379,https://${ETCD_ENDPOINTS[1]}:2379,https://${ETCD_ENDPOINTS[2]}:2379 \\
  --event-ttl=1h \\
  --kubelet-certificate-authority=/etc/kubernetes/ssl/ca.pem \\
  --kubelet-client-certificate=/etc/kubernetes/ssl/kubernetes.pem \\
  --kubelet-client-key=/etc/kubernetes/ssl/kubernetes-key.pem \\
  --service-account-issuer=api \\
  --service-account-key-file=/etc/kubernetes/ssl/service-account.pem \\
  --service-account-signing-key-file=/etc/kubernetes/ssl/service-account-key.pem \\
  --api-audiences=api,vault,factors \\
  --service-cluster-ip-range=10.233.0.0/16 \\
  --service-node-port-range=30000-32767 \\
  --proxy-client-cert-file=/etc/kubernetes/ssl/proxy-client.pem \\
  --proxy-client-key-file=/etc/kubernetes/ssl/proxy-client-key.pem \\
  --runtime-config=api/all=true \\
  --requestheader-client-ca-file=/etc/kubernetes/ssl/ca.pem \\
  --requestheader-allowed-names=aggregator \\
  --requestheader-extra-headers-prefix=X-Remote-Extra- \\
  --requestheader-group-headers=X-Remote-Group \\
  --requestheader-username-headers=X-Remote-User \\
  --tls-cert-file=/etc/kubernetes/ssl/kubernetes.pem \\
  --tls-private-key-file=/etc/kubernetes/ssl/kubernetes-key.pem \\
  --v=1
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF
```

#### 部署kube-controller-manager

```bash
# 准备kubeconfig配置文件
mv ~/tmp.master.kubeconfig/kube-controller-manager.kubeconfig /etc/kubernetes/

# 创建 kube-controller-manager.service
cat >/etc/systemd/system/kube-controller-manager.service <<EOF
[Unit]
Description=Kubernetes Controller Manager
Documentation=https://github.com/kubernetes/kubernetes

[Service]
ExecStart=/usr/local/bin/kube-controller-manager \\
  --bind-address=0.0.0.0 \\
  --cluster-cidr=10.200.0.0/16 \\
  --cluster-name=kubernetes \\
  --cluster-signing-cert-file=/etc/kubernetes/ssl/ca.pem \\
  --cluster-signing-key-file=/etc/kubernetes/ssl/ca-key.pem \\
  --cluster-signing-duration=876000h0m0s \\
  --kubeconfig=/etc/kubernetes/kube-controller-manager.kubeconfig \\
  --leader-elect=true \\
  --root-ca-file=/etc/kubernetes/ssl/ca.pem \\
  --service-account-private-key-file=/etc/kubernetes/ssl/service-account-key.pem \\
  --service-cluster-ip-range=10.233.0.0/16 \\
  --use-service-account-credentials=true \\
  --v=1
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF
```

#### 部署kube-scheduler

```bash
# 准备kubeconfig配置文件
mv ~/tmp.master.kubeconfig/kube-scheduler.kubeconfig /etc/kubernetes

# 创建 scheduler service 文件
cat >/etc/systemd/system/kube-scheduler.service <<EOF
[Unit]
Description=Kubernetes Scheduler
Documentation=https://github.com/kubernetes/kubernetes

[Service]
ExecStart=/usr/local/bin/kube-scheduler \\
  --authentication-kubeconfig=/etc/kubernetes/kube-scheduler.kubeconfig \\
  --authorization-kubeconfig=/etc/kubernetes/kube-scheduler.kubeconfig \\
  --kubeconfig=/etc/kubernetes/kube-scheduler.kubeconfig \\
  --leader-elect=true \\
  --bind-address=0.0.0.0 \\
  --v=1
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF
```

#### 启动服务

```bash
systemctl daemon-reload

systemctl restart kube-apiserver
systemctl restart kube-controller-manager
systemctl restart kube-scheduler

systemctl enable kube-apiserver
systemctl enable kube-controller-manager
systemctl enable kube-scheduler

# 检查服务
[root@node-1 ~]# netstat -tlnpu | grep kube
tcp6       0      0 :::10259                :::*                    LISTEN      8851/kube-scheduler 
tcp6       0      0 :::6443                 :::*                    LISTEN      8653/kube-apiserver 
tcp6       0      0 :::10257                :::*                    LISTEN      8660/kube-controlle
```

#### 配置kubectl

kubectl是用来管理kubernetes集群的客户端工具，前面我们已经下载到了所有的master节点。下面我们来配置这个工具，让它可以使用。

```bash
# 创建kubectl的配置目录
mkdir ~/.kube/

# 把管理员的配置文件移动到kubectl的默认目录
mv ~/tmp.master.kubeconfig/admin.kubeconfig ~/.kube/config

# 测试
kubectl get nodes  # 输出结果 No resources found

# 在执行kubectl exec、run、logs等命令时，apiserver会转发到kubelet
# 这里定义RBAC规则允许apiserver调用kubelet API
# 只需要在任意一个Master节点执行一次
kubectl create clusterrolebinding kube-apiserver:kubelet-apis --clusterrole=system:kubelet-api-admin --user kubernetes
```

#### 清理临时目录

```bash
rmdir ~/tmp.master.kubeconfig
```

### 部署Kubernetes Node节点

#### 部署Containerd

```bash
# 设定containerd的版本号
VERSION=1.4.3

# 下载压缩包
wget -c https://github.com/containerd/containerd/releases/download/v${VERSION}/cri-containerd-cni-${VERSION}-linux-amd64.tar.gz

# 解压缩
mkdir -p containerd
tar zxf cri-containerd-cni-${VERSION}-linux-amd64.tar.gz -C ./containerd

# 复制需要的文件
cd ./containerd && \
cp etc/crictl.yaml /etc/ && \
cp etc/systemd/system/containerd.service /etc/systemd/system/ && \
cp -r usr /

# 配置文件
mkdir -p /etc/containerd # 创建配置文件目录
containerd config default > /etc/containerd/config.toml  # 默认配置生成配置文件
vi /etc/containerd/config.toml  # 定制化配置(可选，这里不做任何修改)

# 启动服务
systemctl restart containerd
systemctl enable containerd

# 检查状态
systemctl status containerd
```

#### 部署kubelet

文档：

* [https://kubernetes.io/zh-cn/docs/reference/command-line-tools-reference/kubelet/](https://kubernetes.io/zh-cn/docs/reference/command-line-tools-reference/kubelet/)
* [https://kubernetes.io/zh-cn/docs/reference/config-api/kubelet-config.v1beta1/](https://kubernetes.io/zh-cn/docs/reference/config-api/kubelet-config.v1beta1/)

```bash
# 准备证书文件
mkdir -p /etc/kubernetes/ssl/

mv ~/tmp.node.ssl/ca.pem \
   ~/tmp.node.ssl/ca-key.pem \
   ~/tmp.node.ssl/${HOSTNAME}-key.pem \
   ~/tmp.node.ssl/${HOSTNAME}.pem \
/etc/kubernetes/ssl/

rmdir ~/tmp.node.ssl

# 准备kubeconfig配置文件
mv ~/tmp.node.kubeconfig/${HOSTNAME}.kubeconfig /etc/kubernetes/kubeconfig

# 写入kubelet配置文件
IP=192.168.48.142
cat >/etc/kubernetes/kubelet-config.yaml <<EOF
kind: KubeletConfiguration
apiVersion: kubelet.config.k8s.io/v1beta1
authentication:
  anonymous:
    enabled: false
  webhook:
    enabled: true
  x509:
    clientCAFile: "/etc/kubernetes/ssl/ca.pem"
authorization:
  mode: Webhook
clusterDomain: "cluster.local"
clusterDNS:
  - "169.254.25.10"
podCIDR: "10.200.0.0/16"
address: ${IP}
readOnlyPort: 0
staticPodPath: /etc/kubernetes/manifests
healthzPort: 10248
healthzBindAddress: 127.0.0.1
kubeletCgroups: /systemd/system.slice
resolvConf: "/etc/resolv.conf"
runtimeRequestTimeout: "15m"
kubeReserved:
  cpu: 200m
  memory: 512M
tlsCertFile: "/etc/kubernetes/ssl/${HOSTNAME}.pem"
tlsPrivateKeyFile: "/etc/kubernetes/ssl/${HOSTNAME}-key.pem"
registerNode: true
EOF

# 写入Systemd Service文件
cat >/etc/systemd/system/kubelet.service <<EOF
[Unit]
Description=Kubernetes Kubelet
Documentation=https://github.com/kubernetes/kubernetes
After=containerd.service
Requires=containerd.service

[Service]
ExecStart=/usr/local/bin/kubelet \\
  --config=/etc/kubernetes/kubelet-config.yaml \\
  --kubeconfig=/etc/kubernetes/kubeconfig \\
  --container-runtime=remote \\
  --container-runtime-endpoint=unix:///var/run/containerd/containerd.sock \\
  --node-ip=${IP} \\
  --v=2
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF
```

#### 部署nginx-proxy

* `nginx-proxy`是一个用于worker节点访问apiserver的一个代理，是apiserver一个优雅的高可用方案

  它使用kubelet的staticpod方式启动，让每个节点都可以均衡的访问到每个apiserver服务

* `nginx-proxy`只需要在worker节点部署（即只需要在没有`apiserver `的节点部署）

```bash
# 定义Master IP列表
MASTERS=(192.168.48.142 192.168.48.143)

# 创建Nginx配置文件目录
mkdir -p /etc/nginx

# 创建Nginx配置文件(根据实际情况修改下方upstream部分)
cat >/etc/nginx/nginx.conf <<EOF
error_log stderr notice;

worker_processes 2;
worker_rlimit_nofile 130048;
worker_shutdown_timeout 10s;

events {
  multi_accept on;
  use epoll;
  worker_connections 16384;
}

stream {
  upstream kube_apiserver {
    least_conn;
    server ${MASTERS[0]}:6443;
    server ${MASTERS[1]}:6443;
  }

  server {
    listen        127.0.0.1:6443;
    proxy_pass    kube_apiserver;
    proxy_timeout 10m;
    proxy_connect_timeout 1s;
  }
}

http {
  aio threads;
  aio_write on;
  tcp_nopush on;
  tcp_nodelay on;

  keepalive_timeout 5m;
  keepalive_requests 100;
  reset_timedout_connection on;
  server_tokens off;
  autoindex off;

  server {
    listen 8081;
    location /healthz {
      access_log off;
      return 200;
    }
    location /stub_status {
      stub_status on;
      access_log off;
    }
  }
}
EOF

# 创建Proxy Pod
mkdir -p /etc/kubernetes/manifests/

cat >/etc/kubernetes/manifests/nginx-proxy.yaml <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: nginx-proxy
  namespace: kube-system
  labels:
    addonmanager.kubernetes.io/mode: Reconcile
    k8s-app: kube-nginx
spec:
  hostNetwork: true
  dnsPolicy: ClusterFirstWithHostNet
  nodeSelector:
    kubernetes.io/os: linux
  priorityClassName: system-node-critical
  containers:
  - name: nginx-proxy
    image: docker.io/library/nginx:1.19
    imagePullPolicy: IfNotPresent
    resources:
      requests:
        cpu: 25m
        memory: 32M
    securityContext:
      privileged: true
    livenessProbe:
      httpGet:
        path: /healthz
        port: 8081
    readinessProbe:
      httpGet:
        path: /healthz
        port: 8081
    volumeMounts:
    - mountPath: /etc/nginx
      name: etc-nginx
      readOnly: true
  volumes:
  - name: etc-nginx
    hostPath:
      path: /etc/nginx
EOF

# 在每个工作节点下载镜像
crictl pull registry.cn-hangzhou.aliyuncs.com/kubernetes-kubespray/pause:3.2
ctr -n k8s.io i tag  registry.cn-hangzhou.aliyuncs.com/kubernetes-kubespray/pause:3.2 k8s.gcr.io/pause:3.2
```

#### 配置kube-proxy

```bash
# 准备kubeconfig配置文件
mv ~/tmp.node.kubeconfig/kube-proxy.kubeconfig /etc/kubernetes/

# 创建YAML
cat >/etc/kubernetes/kube-proxy-config.yaml <<EOF
apiVersion: kubeproxy.config.k8s.io/v1alpha1
kind: KubeProxyConfiguration
bindAddress: 0.0.0.0
clientConnection:
  kubeconfig: "/etc/kubernetes/kube-proxy.kubeconfig"
clusterCIDR: "10.200.0.0/16"
mode: ipvs
EOF

# 创建System Service
cat >/etc/systemd/system/kube-proxy.service <<EOF
[Unit]
Description=Kubernetes Kube Proxy
Documentation=https://github.com/kubernetes/kubernetes

[Service]
ExecStart=/usr/local/bin/kube-proxy \\
  --config=/etc/kubernetes/kube-proxy-config.yaml
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF
```

#### 清理临时目录

```bash
rmdir ~/tmp.node.kubeconfig
```

#### 启动服务

```bash
systemctl daemon-reload

systemctl restart kubelet kube-proxy && systemctl enable kubelet kube-proxy

systemctl status kubelet && systemctl status kube-proxy

journalctl -f -u kubelet
journalctl -f -u kube-proxy
```

### 部署网络插件Calico

文档：[https://projectcalico.docs.tigera.io/getting-started/kubernetes/self-managed-onprem/onpremises](https://projectcalico.docs.tigera.io/getting-started/kubernetes/self-managed-onprem/onpremises)

（1）下载YAML文件

```bash
curl https://projectcalico.docs.tigera.io/manifests/calico.yaml -O
```

（2）修改IP自动发现

当kubelet的启动参数中存在`--node-ip`的时候，以host-network模式启动的pod的status.hostIP字段就会自动填入kubelet中指定的ip地址

```bash
# 修改前
- name: IP
  value: "autodetect"
  
# 修改后
- name: IP
  valueFrom:
    fieldRef:
      fieldPath: status.hostIP
```

（3）修改CIDR

```bash
# 修改前
# - name: CALICO_IPV4POOL_CIDR
#   value: "192.168.0.0/16"

# 修改后
- name: CALICO_IPV4POOL_CIDR
  value: "10.200.0.0/16"
```

（4）部署

```bash
[root@node-1 ~]# kubectl apply -f calico.yaml 
```

（5）检查状态

```bash
# 检查Pod状态
[root@node-1 ~]# kubectl get pods -A 
NAMESPACE     NAME                                       READY   STATUS    RESTARTS   AGE
kube-system   calico-kube-controllers-5b97f5d8cf-nmx9v   1/1     Running   0          11m
kube-system   calico-node-djmlg                          1/1     Running   0          11m
kube-system   calico-node-ph5lj                          1/1     Running   0          11m
kube-system   calico-node-wshgm                          1/1     Running   0          11m
kube-system   nginx-proxy-node-3                         1/1     Running   0          29m

# 查看Node状态，已经变成Ready了
[root@node-1 ~]# kubectl get node
NAME     STATUS   ROLES    AGE   VERSION
node-1   Ready    <none>   40m   v1.24.4
node-2   Ready    <none>   40m   v1.24.4
node-3   Ready    <none>   29m   v1.24.4
```

### 部署DNS插件CoreDNS

文档：

* coredns官方文档：[https://coredns.io/plugins/kubernetes/](https://coredns.io/plugins/kubernetes/)
* NodeLocal DNSCache：[https://kubernetes.io/docs/tasks/administer-cluster/nodelocaldns/](https://kubernetes.io/docs/tasks/administer-cluster/nodelocaldns/)

（1）部署coredns

```bash
# 下载coredns yaml
[root@node-1 ~]# wget https://raw.githubusercontent.com/coredns/deployment/master/kubernetes/coredns.yaml.sed
[root@node-1 ~]# wget https://raw.githubusercontent.com/coredns/deployment/master/kubernetes/deploy.sh
[root@node-1 ~]# chmod +x deploy.sh
[root@node-1 ~]# ./deploy.sh -i 10.233.0.10 > coredns.yaml

# 部署
[root@node-1 ~]# kubectl apply -f coredns.yaml
```

（2）部署NodeLocal DNSCache

文档：[https://github.com/kubernetes/kubernetes/tree/v1.24.3/cluster/addons/dns/nodelocaldns](https://github.com/kubernetes/kubernetes/tree/v1.24.3/cluster/addons/dns/nodelocaldns)

```bash
# 拷贝yaml文件
cp ~/kubernetes/src/cluster/addons/dns/nodelocaldns/nodelocaldns.yaml .

# 设置为 kube-dns service ip,这里并没有用到kube-dns，所以置为空
sed -ri 's/,__PILLAR__DNS__SERVER__//g' nodelocaldns.yaml
sed -ri 's/__PILLAR__DNS__SERVER__//g' nodelocaldns.yaml

# 设置为本地链接IP，这个值要和kubelet配置中的clusterDNS相同
sed -ri 's/__PILLAR__LOCAL__DNS__/169.254.25.10/g' nodelocaldns.yaml

# 设置DNS域名地址，默认为cluster.local
sed -ri 's/__PILLAR__DNS__DOMAIN__/cluster.local/g' nodelocaldns.yaml

# 设置集群内部查询的上游服务器，这个值和coredns值保持一致
sed -ri 's/__PILLAR__CLUSTER__DNS__/10.233.0.10/g' nodelocaldns.yaml

# 设置集群外部查询的上游服务器
sed -ri 's#__PILLAR__UPSTREAM__SERVERS__#/etc/resolv.conf#g' nodelocaldns.yaml

# 使用科学上网提前下载镜像
[root@node-1 ~]# grep image nodelocaldns.yaml 
        image: k8s.gcr.io/dns/k8s-dns-node-cache:1.21.1

# 部署
[root@node-1 ~]# kubectl apply -f nodelocaldns.yaml 

# 查看Pod
[root@node-1 ~]# kubectl get pods -A | grep node-local-dns
kube-system   node-local-dns-8wqmd                       1/1     Running   0          12s
kube-system   node-local-dns-wdgkw                       1/1     Running   0          12s
kube-system   node-local-dns-z76pz                       1/1     Running   0          12s
```
