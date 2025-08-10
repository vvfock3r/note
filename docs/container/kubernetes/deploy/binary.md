# kubernetes部署

## 🍁部署方式对比

文档：[https://kubernetes.io/docs/setup/production-environment/tools/](https://kubernetes.io/docs/setup/production-environment/tools/)

| 部署方式   | 复杂性 | 灵活性 | 描述                                           |
| ---------- | ------ | ------ | ---------------------------------------------- |
| 二进制部署 | 最复杂 | 最灵活 | 推荐生产环境使用                               |
| kubeadm    | 适中   | 自定义 | `Kubeadm `是一个快捷搭建`kubernetes`的安装工具 |
| Kubespray  | 简单   | 自定义 | 基于`kubeadm`和`Ansible`来部署                 |

##  

## 🔥使用二进制部署（推荐）

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

### 系统初始化

#### （1）更新系统

```bash
# 更新系统并重启
[root@localhost ~]# yum -y install epel-release
[root@localhost ~]# yum -y update && reboot

# 查看系统版本
[root@localhost ~]# cat /etc/redhat-release
CentOS Linux release 7.9.2009 (Core)
```

#### （2）配置时区（可选）

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

#### （3）配置24小时制（可选）

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

#### （4）配置静态IP（可选）

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

#### （5）同步服务器时间（可选）

```bash
[root@localhost ~]# yum install ntpdate -y
[root@localhost ~]# ntpdate time.windows.com
[root@localhost ~]# crontab -e
* * * * * /usr/sbin/ntpdate time.windows.com
```

#### （6）配置主机名

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

#### （7）关闭某些服务

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

#### （8）调整内核参数

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

::: warning

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
[root@localhost ~]# lsmod | grep br_netfilter
br_netfilter           22256  0 
bridge                151336  1 br_netfilter

# 临时加载模块(重启后还需要重新加载)
[root@localhost ~]# modprobe br_netfilter

# 设置开启自加载模块
[root@localhost ~]# echo br_netfilter > /etc/modules-load.d/br_netfilter.conf
```

:::

#### （9）安装常用软件包

```bash
[root@localhost ~]# yum -y install yum-utils \
	vim curl wget rsync git \
	socat conntrack ipvsadm ipset \
	sysstat iptables libseccomp
```

#### （10）调整ulimit

```bash
# 检查当前配置
[root@localhost ~]# ulimit -a | grep -E 'open files|max user processes'
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

#### （11）重启系统再次检查

### 设置中转节点

为了方便文件的分发，我们选择一个中转节点（随便一个节点，可以是集群中的也可以是非集群中的），配置好跟其他所有节点的免密登录

```bash
# 生成密钥对
[root@localhost ~]# ssh-keygen -t rsa

# 配置免密登录
[root@localhost ~]# ssh-copy-id root@node-1
[root@localhost ~]# ssh-copy-id root@node-2
[root@localhost ~]# ssh-copy-id root@node-3
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
  --authorization-always-allow-paths=/healthz,/metrics \\
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

（1）配置kubectl

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

（2）启用Bash自动补全功能

文档：[https://kubernetes.io/zh-cn/docs/tasks/tools/install-kubectl-linux/#optional-kubectl-configurations](https://kubernetes.io/zh-cn/docs/tasks/tools/install-kubectl-linux/#optional-kubectl-configurations)

```bash
yum install -y bash-completion

echo 'source <(kubectl completion bash)' >>~/.bashrc
```

#### 清理临时目录

```bash
rmdir ~/tmp.master.kubeconfig
```

### 部署Kubernetes Node节点

:::tip

以下操作在所有Node节点执行

:::

#### 部署Containerd

（1）在中转节点下载软件包并分发相关文件

```bash
# 设定containerd的版本号
VERSION=1.4.3

# 下载压缩包
wget -c https://github.com/containerd/containerd/releases/download/v${VERSION}/cri-containerd-cni-${VERSION}-linux-amd64.tar.gz

# 解压缩
mkdir -p containerd && \
tar zxf cri-containerd-cni-${VERSION}-linux-amd64.tar.gz -C ./containerd && \
cd ./containerd

# 分发相关文件
[root@node-1 containerd]# Containerds=(node-1 node-2 node-3) ; for instance in ${Containerds[@]}; do
  scp etc/crictl.yaml ${instance}:/etc/ && \
  scp etc/systemd/system/containerd.service ${instance}:/etc/systemd/system/ && \
  scp -r usr ${instance}:/
done
```

（2）在所有Containerd节点执行

```bash
# 创建配置文件
mkdir -p /etc/containerd # 创建配置文件目录
containerd config default > /etc/containerd/config.toml  # 默认配置生成配置文件

# 定制化配置(可选，这里不做任何修改)
# vi /etc/containerd/config.toml

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

mv -f ~/tmp.node.ssl/ca.pem \
      ~/tmp.node.ssl/${HOSTNAME}-key.pem \
      ~/tmp.node.ssl/${HOSTNAME}.pem \
/etc/kubernetes/ssl/

rmdir ~/tmp.node.ssl

# 准备kubeconfig配置文件
mv ~/tmp.node.kubeconfig/${HOSTNAME}.kubeconfig /etc/kubernetes/kubeconfig

# 写入kubelet配置文件
IP=192.168.48.144
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

  它使用kubelet的**静态Pod（非APIServer创建的Pod）**方式启动，让每个节点都可以均衡的访问到每个apiserver服务

* `nginx-proxy`只需要在worker节点部署（即只需要在没有`apiserver `的节点部署）

**（1）创建nginx配置文件**

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
```

（2）创建Pod YAML

```bash
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
    image: docker.io/library/nginx:1.23
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
```

（3）下载pause镜像

:::tip

镜像下载参考：<a href="#pause" style="text-decoration:none;">pause</a>

:::

kubelet会下载pause镜像，从日志中可以看出来

```bash
[root@node-3 ~]# journalctl -f -u kubelet | grep pause
Aug 22 23:28:58 node-3 kubelet[1577]: E0822 23:28:58.721744    1577 remote_runtime.go:212] "RunPodSandbox from runtime service failed" err="rpc error: code = Unknown desc = failed to get sandbox image \"k8s.gcr.io/pause:3.2\": failed to pull image \"k8s.gcr.io/pause:3.2\": failed to pull and unpack image \"k8s.gcr.io/pause:3.2\": failed to resolve reference \"k8s.gcr.io/pause:3.2\": failed to do request: Head \"https://k8s.gcr.io/v2/pause/manifests/3.2\": dial tcp 108.177.125.82:443: connect: connection refused"
Aug 22 23:28:58 node-3 kubelet[1577]: E0822 23:28:58.721779    1577 kuberuntime_sandbox.go:70] "Failed to create sandbox for pod" err="rpc error: code = Unknown desc = failed to get sandbox image \"k8s.gcr.io/pause:3.2\": failed to pull image \"k8s.gcr.io/pause:3.2\": failed to pull and unpack image \"k8s.gcr.io/pause:3.2\": failed to resolve reference \"k8s.gcr.io/pause:3.2\": failed to do request: Head \"https://k8s.gcr.io/v2/pause/manifests/3.2\": dial tcp 108.177.125.82:443: connect: connection refused" pod="kube-system/nginx-proxy-node-3"
Aug 22 23:28:58 node-3 kubelet[1577]: E0822 23:28:58.721795    1577 kuberuntime_manager.go:815] "CreatePodSandbox for pod failed" err="rpc error: code = Unknown desc = failed to get sandbox image \"k8s.gcr.io/pause:3.2\": failed to pull image \"k8s.gcr.io/pause:3.2\": failed to pull and unpack image \"k8s.gcr.io/pause:3.2\": failed to resolve reference \"k8s.gcr.io/pause:3.2\": failed to do request: Head \"https://k8s.gcr.io/v2/pause/manifests/3.2\": dial tcp 108.177.125.82:443: connect: connection refused" pod="kube-system/nginx-proxy-node-3"
Aug 22 23:28:58 node-3 kubelet[1577]: E0822 23:28:58.721856    1577 pod_workers.go:951] "Error syncing pod, skipping" err="failed to \"CreatePodSandbox\" for \"nginx-proxy-node-3_kube-system(e3d470d334dd01ea91bcc4d1eb652387)\" with CreatePodSandboxError: \"Failed to create sandbox for pod \\\"nginx-proxy-node-3_kube-system(e3d470d334dd01ea91bcc4d1eb652387)\\\": rpc error: code = Unknown desc = failed to get sandbox image \\\"k8s.gcr.io/pause:3.2\\\": failed to pull image \\\"k8s.gcr.io/pause:3.2\\\": failed to pull and unpack image \\\"k8s.gcr.io/pause:3.2\\\": failed to resolve reference \\\"k8s.gcr.io/pause:3.2\\\": failed to do request: Head \\\"https://k8s.gcr.io/v2/pause/manifests/3.2\\\": dial tcp 108.177.125.82:443: connect: connection refused\"" pod="kube-system/nginx-proxy-node-3" podUID=e3d470d334dd01ea91bcc4d1eb652387
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
metricsBindAddress: 0.0.0.0:10249
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
# 启动服务
systemctl daemon-reload
systemctl restart kubelet kube-proxy && systemctl enable kubelet kube-proxy
systemctl status kubelet && systemctl status kube-proxy

# 查看日志
journalctl -f -u kubelet
journalctl -f -u kube-proxy

# Node节点status为NotReady
[root@node-1 ~]# kubectl get node
NAME     STATUS     ROLES    AGE     VERSION
node-1   NotReady   <none>   15m     v1.24.4
node-2   NotReady   <none>   15m     v1.24.4
node-3   NotReady   <none>   4m24s   v1.24.4
```

### 部署网络插件Calico

文档：

* Github：[https://github.com/projectcalico/calico/](https://github.com/projectcalico/calico/)

* 文档：[https://projectcalico.docs.tigera.io/getting-started/kubernetes/self-managed-onprem/onpremises](https://projectcalico.docs.tigera.io/getting-started/kubernetes/self-managed-onprem/onpremises)

:::tip

以下操作在任意一个Master节点（可以执行`kubectl`的节点）执行

:::

（1）下载YAML文件

```bash
curl https://raw.githubusercontent.com/projectcalico/calico/v3.25.0/manifests/calico.yaml -O
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

（4）部署前下载镜像

:::tip

镜像下载参考：<a href="#pause" style="text-decoration:none;">pause</a>

:::

```bash
# 部署过程中会下载很多的镜像
[root@node-1 ~]# cat calico.yaml | grep -i 'image:'
          image: docker.io/calico/cni:v3.24.0
          image: docker.io/calico/cni:v3.24.0
          image: docker.io/calico/node:v3.24.0
          image: docker.io/calico/node:v3.24.0
          image: docker.io/calico/kube-controllers:v3.24.0

# 这一部分镜像不需要科学上网，可以提前下载，也可以在部署过程中自动下载
[root@node-1 ~]# cat calico.yaml | grep -i 'image:' | awk '{print $2}' | while read line; do
  crictl pull ${line}
done

# 同时还会下载pause镜像,需要科学上网，参考上面的下载地址

# 部署
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

:::tip

以下操作在任意一个Master节点（可以执行`kubectl`的节点）执行

:::

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

:::tip

镜像下载参考：<a href="#dns-node-cache" style="text-decoration:none;">dns-node-cache</a>

:::

```bash
# 拷贝yaml文件
cp ~/pkg/kubernetes/src/cluster/addons/dns/nodelocaldns/nodelocaldns.yaml .

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

# 使用科学上网提前下载镜像,参考上面地址
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

### 检查集群状态

```bash
[root@node-1 ~]# kubectl get node
NAME     STATUS   ROLES    AGE   VERSION
node-1   Ready    <none>   12h   v1.24.4
node-2   Ready    <none>   12h   v1.24.4
node-3   Ready    <none>   12h   v1.24.4

[root@node-1 ~]# kubectl get cs
Warning: v1 ComponentStatus is deprecated in v1.19+
NAME                 STATUS    MESSAGE             ERROR
controller-manager   Healthy   ok                  
scheduler            Healthy   ok                  
etcd-0               Healthy   {"health":"true"}   
etcd-2               Healthy   {"health":"true"}   
etcd-1               Healthy   {"health":"true"}

[root@node-1 ~]# kubectl get pods -A
NAMESPACE     NAME                                       READY   STATUS    RESTARTS            AGE
kube-system   calico-kube-controllers-5b97f5d8cf-45926   1/1     Running   1 (<invalid> ago)   12h
kube-system   calico-node-mb9xx                          1/1     Running   1 (111m ago)        12h
kube-system   calico-node-txfwh                          1/1     Running   1 (111m ago)        12h
kube-system   calico-node-wxd9j                          1/1     Running   1 (<invalid> ago)   12h
kube-system   coredns-754f9b4f7c-m88g9                   1/1     Running   0                   86m
kube-system   nginx-proxy-node-3                         1/1     Running   1 (<invalid> ago)   12h
kube-system   node-local-dns-9nw9v                       1/1     Running   0                   59m
kube-system   node-local-dns-gdbp6                       1/1     Running   0                   59m
kube-system   node-local-dns-pt79q                       1/1     Running   0                   59m
```

### 部署其他插件（可选）

#### （1）Dashboard

Github：[https://github.com/kubernetes/dashboard](https://github.com/kubernetes/dashboard)

文档

* [https://kubernetes.io/zh-cn/docs/tasks/access-application-cluster/web-ui-dashboard/](https://kubernetes.io/zh-cn/docs/tasks/access-application-cluster/web-ui-dashboard/)
* [https://github.com/kubernetes/dashboard/tree/master/docs](https://github.com/kubernetes/dashboard/tree/master/docs)（重点）

（1）部署Dashboard

```bash
# 下载Yaml文件
[root@node-1 ~]# wget https://raw.githubusercontent.com/kubernetes/dashboard/v2.6.1/aio/deploy/recommended.yaml

# 修改Yaml文件
[root@node-1 ~]# vim recommended.yaml
kind: Service
apiVersion: v1
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard
  namespace: kubernetes-dashboard
spec:
  type: NodePort                    # 新增这一行
  ports:
    - port: 443
      targetPort: 8443
      nodePort: 30000               # 新增这一行
  selector:
    k8s-app: kubernetes-dashboard
    
# 部署
[root@node-1 ~]# kubectl apply -f recommended.yaml
```

（2）创建管理员用户

```bash
# 生成YAML文件
[root@node-1 ~]# cat > kubernetes-dashboard-admin-user.yaml <<EOF
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kubernetes-dashboard
EOF

# 创建用户
[root@node-1 ~]# kubectl apply -f kubernetes-dashboard-admin-user.yaml 
serviceaccount/admin-user created
clusterrolebinding.rbac.authorization.k8s.io/admin-user created

# 创建token
[root@node-1 ~]# kubectl -n kubernetes-dashboard create token admin-user
eyJhbGciOiJSUzI1NiIsImtpZCI6IjQtcDlTOHZOSU1BLTlkcjFfX2tlZV9xOWF2R3E1aTVtbE0tWjdkbTY2aHMifQ.eyJhdWQiOlsiYXBpIiwidmF1bHQiLCJmYWN0b3JzIl0sImV4cCI6MTY2MTI1OTg2OSwiaWF0IjoxNjYxMjU2MjY5LCJpc3MiOiJhcGkiLCJrdWJlcm5ldGVzLmlvIjp7Im5hbWVzcGFjZSI6Imt1YmVybmV0ZXMtZGFzaGJvYXJkIiwic2VydmljZWFjY291bnQiOnsibmFtZSI6ImFkbWluLXVzZXIiLCJ1aWQiOiJhYjVkZjA4Ni00MzM0LTRiNWItYTgxNC03NDQ1ZDNhYTI0NzcifX0sIm5iZiI6MTY2MTI1NjI2OSwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmVybmV0ZXMtZGFzaGJvYXJkOmFkbWluLXVzZXIifQ.Ls55F4zda0IGsKuqQAb8J_FOsdRieLE57DLH_p1OTlwPxM4z3rrHRi6CbzByWGo05qYw2xWptSpLL2plwP-s2gxM8Z4Gmw3Mk4tWoVW5_OmZ48kDSCMirSZkrCYRImMxlOjZl3_tl06igIFNeCfkJVJr1aWFktV59cF-qD42pw_H5917xcP_KbgKnTNMasnsd65mYbfqsEJO2_mQSo36nO3KRF3vakaqi7kSJ2zDORek4Qv4C5HWzr-h6HhuN5FlShQdPwQqQvDcX4wsixWyDp4LF6xIDO-54N9eFGinlCmc4v1rnRuCLQlo3tlNIqgJ_ZB1ZMywvhlN7sktnLRuDA

# 如何查看token?
```

（3）访问 https://192.168.48.142:30000/

![image-20220823201131176](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220823201131176.png)

#### （2）Ingress Nginx Controller

文档：[https://kubernetes.io/zh-cn/docs/concepts/services-networking/ingress/](https://kubernetes.io/zh-cn/docs/concepts/services-networking/ingress/)

**说明**

`Ingress`公开从集群外部到集群内服务的 HTTP 和 HTTPS 路由，而具体实现流量路由则是由`Ingress Controller`负责

Ingress Nginx 主要有2个开源实现

| 实现                                                     | 文档                                                         | Github                                                       |
| -------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `Kubernetes`官方维护的`Ingress NGINX Controller`（推荐） | [https://kubernetes.github.io/ingress-nginx/deploy/](https://kubernetes.github.io/ingress-nginx/deploy/) | [https://github.com/kubernetes/ingress-nginx](https://github.com/kubernetes/ingress-nginx) |
| Nginx官方维护的`NGINX Ingress Controller`                | [https://docs.nginx.com/nginx-ingress-controller/](https://docs.nginx.com/nginx-ingress-controller/) | [https://github.com/nginxinc/kubernetes-ingress](            |

**安装Ingress Nginx（Kubernetes官方维护版本）**

版本支持：[https://github.com/kubernetes/ingress-nginx#support-versions-table](https://github.com/kubernetes/ingress-nginx#support-versions-table)

部署文档：[https://kubernetes.github.io/ingress-nginx/deploy/](https://kubernetes.github.io/ingress-nginx/deploy/)

（1）下载YAML文件

```bash
[root@localhost k8s]# wget https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.3.0/deploy/static/provider/cloud/deploy.yaml \
                     -O ingress-nginx.yml
```

（2）修改YAML文件

::: details 点击查看详情

```bash
# 1、修改为DaemonSet部署，这样访问任意一个Node都可以访问到Ingress NGINX
[root@localhost k8s]# grep -Ei "Deployment|DaemonSet" ingress-nginx.yml  # 搜索出来只有一个
kind: Deployment
[root@localhost k8s]# sed -ri 's/Deployment/DaemonSet/g' ingress-nginx.yml
[root@localhost k8s]# grep -Ei "Deployment|DaemonSet" ingress-nginx.yml
kind: DaemonSet

# 2、指定nodePort端口，否则若重新创建ingress-nginx会随机分配一个端口
[root@node0 k8s]# vim ingress-nginx.yml
apiVersion: v1
kind: Service
metadata:
  labels:
    app.kubernetes.io/component: controller
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
    app.kubernetes.io/version: 1.2.0
  name: ingress-nginx-controller
  namespace: ingress-nginx
spec:
  externalTrafficPolicy: Local
  ports:
  - appProtocol: http
    name: http
    port: 80
    protocol: TCP
    targetPort: http
    nodePort: 32261         # 添加这行
  - appProtocol: https
    name: https
    port: 443
    protocol: TCP
    targetPort: https
    nodePort: 32262         # 添加这行
  selector:
    app.kubernetes.io/component: controller
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/name: ingress-nginx
  type: LoadBalancer
  
# 3、使用宿主机网络（可选）
#    若配置了这一项则可以在宿主机可以看到监听了80和443端口，否则将看不到监听
#    若配置了这一项则可以直接使用域名访问，而不必加上nodePort端口（在本文档是32261或32262），当然加上nodePort端口也是可以的
---
apiVersion: apps/v1
kind: DaemonSet
metadata:
  labels:
    app.kubernetes.io/component: controller
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
    app.kubernetes.io/version: 1.2.0
  name: ingress-nginx-controller
  namespace: ingress-nginx
spec:
  minReadySeconds: 0
  revisionHistoryLimit: 10
  selector:
    matchLabels:
      app.kubernetes.io/component: controller
      app.kubernetes.io/instance: ingress-nginx
      app.kubernetes.io/name: ingress-nginx
  template:
    metadata:
      labels:
        app.kubernetes.io/component: controller
        app.kubernetes.io/instance: ingress-nginx
        app.kubernetes.io/name: ingress-nginx
    spec:
      hostNetwork: true          # 添加这一行
```

:::

（3）部署Ingress Nginx

:::tip

镜像下载参考：<a href="#ingress-nginx" style="text-decoration:none;">Ingress Nginx</a>

:::

```bash
# 查看一下需要使用的镜像(需要科学上网)
[root@node-1 yamlconfig]# cat ingress-nginx.yml | grep image | sort -u
        imagePullPolicy: IfNotPresent
        image: registry.k8s.io/ingress-nginx/controller:v1.3.0@sha256:d1707ca76d3b044ab8a28277a2466a02100ee9f58a86af1535a3edf9323ea1b5
        image: registry.k8s.io/ingress-nginx/kube-webhook-certgen:v1.1.1@sha256:64d8c73dca984af206adf9d6d7e46aa550362b1d7a01f3a0a91b20cc67868660

# 修改镜像地址，删掉摘要信息
[root@node-1 yamlconfig]# sed -ri 's/(.*)(image:)(.*)(@sha256.*)/\1\2\3/' ingress-nginx.yml

# 再次查看镜像地址
[root@node-1 yamlconfig]# cat ingress-nginx.yml | grep image | sort -u
        imagePullPolicy: IfNotPresent
        image: registry.k8s.io/ingress-nginx/controller:v1.3.0
        image: registry.k8s.io/ingress-nginx/kube-webhook-certgen:v1.1.1

# 部署
[root@localhost k8s]# kubectl apply -f ingress-nginx.yml
```

（4）检查部署情况

```bash
# 查看Pod状态
[root@node-1 ~]# kubectl get pods -n ingress-nginx
NAME                                   READY   STATUS      RESTARTS   AGE
ingress-nginx-admission-create-bcrhr   0/1     Completed   0          51m
ingress-nginx-admission-patch-b97n8    0/1     Completed   0          51m
ingress-nginx-controller-5tgv8         1/1     Running     0          51m
ingress-nginx-controller-65tvk         1/1     Running     0          51m
ingress-nginx-controller-dvd94         1/1     Running     0          51m

# 查看Ingress NGINX service（如果要访问Ingress的80端口，那么就需要访问任意宿主机的32261端口）
[root@node-1 ~]# kubectl get svc -n ingress-nginx
NAME                                 TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)                      AGE
ingress-nginx-controller             LoadBalancer   10.233.167.128   <pending>     80:32261/TCP,443:32262/TCP   51m
ingress-nginx-controller-admission   ClusterIP      10.233.203.28    <none>        443/TCP                      51m

# 查看Ingress NGINX Class Name（不区分命名空间）
[root@node-1 ~]# kubectl get ingressclass
NAME    CONTROLLER             PARAMETERS   AGE
nginx   k8s.io/ingress-nginx   <none>       51m
```

#### （3）Metrics Server

Github：[https://github.com/kubernetes-sigs/metrics-server](https://github.com/kubernetes-sigs/metrics-server)

:::tip

镜像下载参考：<a href="#metrics-server" style="text-decoration:none;">metrics-server</a>

:::

::: details （1）安装高可用版本

```bash
# 在安装前，我们可以执行一下top子命令，输出如下
[root@node-1 ~]# kubectl top node
error: Metrics API not available # 要执行top子命令需要先安装Metrics Server

# 安装高可用版本，此配置要求集群至少有2个可以调度Metrics Server的节点

# 下载YAML
wget https://github.com/kubernetes-sigs/metrics-server/releases/download/v0.6.1/high-availability.yaml \
     -O metrics-server-v0.6.1-high-availability.yaml

# 查看镜像（需要科学上网）
[root@node-1 ~]# cat metrics-server-v0.6.1-high-availability.yaml | grep 'image:'
        image: k8s.gcr.io/metrics-server/metrics-server:v0.6.1
        
# 部署
[root@node-1 ~]# kubectl apply -f metrics-server-v0.6.1-high-availability.yaml

# 查看
[root@node-1 ~]# kubectl get pods -A | grep metrics-server
kube-system            metrics-server-845994f88c-btd55             1/1     Running   0                   56s
kube-system            metrics-server-845994f88c-d4r9l             1/1     Running   0                   56s

# 查看node资源使用率
[root@node-1 ~]# kubectl top node --show-capacity=true
NAME     CPU(cores)   CPU%   MEMORY(bytes)   MEMORY%   
node-1   274m         6%     1233Mi          67%       
node-2   304m         7%     1257Mi          69%       
node-3   183m         4%     1130Mi          62%
```

:::

::: details （2）安装单节点版本

```bash
# 安装单节点版本
[root@node-1 ~]# kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/download/v0.6.1/components.yaml

# 若启动报证书错误的话, 下载components.yaml文件并修改Deployment部分
      - args:
        - --cert-dir=/tmp
        - --secure-port=4443
        - --kubelet-preferred-address-types=InternalIP,ExternalIP,Hostname
        - --kubelet-use-node-status-port
        - --metric-resolution=15s
        - --kubelet-insecure-tls   # 添加这行
```

:::

#### （4）Vertical Pod Autoscaler

Github：[https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler)

OpenSSL下载地址：[https://www.openssl.org/source/](https://www.openssl.org/source/)

（1）升级OpenSSL到1.1.1或者更高版本，这里升级到`3.0.5`版本

::: details 点击查看完整命令

```bash
# ---------------------------备份旧的OpenSSL---------------------------

# 检查OpenSSL版本
[root@node-1 ~]# openssl version
OpenSSL 1.0.2k-fips  26 Jan 2017

# 先对旧的openssl做一个备份(二进制命令和库文件)
[root@node-1 ~]# cp /usr/bin/openssl /usr/bin/openssl_`date +%F`
[root@node-1 ~]# cp -ra /usr/include/openssl /usr/include/openssl_`date +%F`

[root@node-1 ~]# ls -ld /usr/bin/openssl_`date +%F`  /usr/include/openssl_`date +%F`
-rwxr-xr-x 1 root root 555280 Aug 25 10:54 /usr/bin/openssl_2022-08-25
drwxr-xr-x 2 root root   4096 Aug 25 11:13 /usr/include/openssl_2022-08-25

# ---------------------------下载OpenSSL源码包---------------------------

# 下载OpenSSL 1.1.1或者更高版本，这里下载3.0.5版本
[root@node-1 ~]# wget -c https://www.openssl.org/source/openssl-3.0.5.tar.gz
[root@node-1 ~]# tar zxf openssl-3.0.5.tar.gz && cd openssl-3.0.5

# ---------------------------编译前的准备工作---------------------------

# 先看一下程序安装目录是否已经存在，若存在需要指定为其他目录
[root@node-1 ~]# ls /usr/local/openssl-3.0.5
ls: cannot access /usr/local/openssl-3.0.5: No such file or directory

# 查看动态链接库信息，这里主要是看一下下面的报错信息，报错本来就有，不是由我们后面的操作引起的
[root@node-1 ~]# ldconfig -v 1>/dev/null
ldconfig: Can't stat /libx32: No such file or directory
ldconfig: Path `/usr/lib' given more than once
ldconfig: Path `/usr/lib64' given more than once
ldconfig: Can't stat /usr/libx32: No such file or directory

# 查看一下perl版本，仅作记录使用
[root@node-1 ~]# perl --version
This is perl 5, version 16, subversion 3 (v5.16.3) built for x86_64-linux-thread-multi
(with 44 registered patches, see perl -V for more detail)
... 省略无关内容

# 安装依赖包
[root@node-1 ~]# yum install -y gcc gcc-c++ glibc make autoconf \
                                openssl openssl-devel pcre-devel pam-devel zlib \
                                perl-IPC-Cmd perl-Digest-SHA 'perl(Data::Dumper)'

# ---------------------------编译和替换旧版本---------------------------

# 正式编译
[root@node-1 openssl-3.0.5]# ./config --prefix=/usr/local/openssl-3.0.5
[root@node-1 openssl-3.0.5]# make && make install

# 替换旧版本
[root@node-1 openssl-3.0.5]# ln -s --force /usr/local/openssl-3.0.5/bin/openssl       /usr/bin/openssl
[root@node-1 openssl-3.0.5]# ln -s --force /usr/local/openssl-3.0.5/include/openssl   /usr/include/openssl
[root@node-1 openssl-3.0.5]# echo "/usr/local/openssl-3.0.5/lib64" > /etc/ld.so.conf.d/openssl-3.0.5.conf
[root@node-1 openssl-3.0.5]# ldconfig -v | grep openssl
ldconfig: Can't stat /libx32: No such file or directory
ldconfig: Path `/usr/lib' given more than once
ldconfig: Path `/usr/lib64' given more than once
ldconfig: Can't stat /usr/libx32: No such file or directory
/usr/local/openssl-3.0.5/lib64:
        libxmlsec1-openssl.so.1 -> libxmlsec1-openssl.so.1.2.20 # 已正确加载

# 查看版本
[root@node-1 openssl-3.0.5]# openssl version
OpenSSL 3.0.5 5 Jul 2022 (Library: OpenSSL 3.0.5 5 Jul 2022)
```

:::

（2）安装VPA

:::tip

镜像下载参考：<a href="#vertical-pod-autoscaler" style="text-decoration:none;">Vertical Pod Autoscaler</a>

:::

```bash
# ---------------------------部署前的准备工作---------------------------

# 下载源码
[root@node-1 pkg]# wget -c https://github.com/kubernetes/autoscaler/archive/refs/tags/vertical-pod-autoscaler-0.11.0.tar.gz
[root@node-1 pkg]# tar zxf autoscaler-vertical-pod-autoscaler-0.11.0.tar.gz
[root@node-1 pkg]# cd autoscaler-vertical-pod-autoscaler-0.11.0/vertical-pod-autoscaler/

# 查看kubectl真正执行的yaml文件
[root@node-1 vertical-pod-autoscaler]# ./hack/vpa-process-yamls.sh print

# 查看需要使用的镜像，这里有两个问题：
# (1) 镜像下载需要科学上网，建议提前下载好并导入到节点中
# (2) 镜像下载策略为Always，即不会使用本地的镜像，若要使用本地镜像需要修改为ifNotPresent
[root@node-1 vertical-pod-autoscaler]# ./hack/vpa-process-yamls.sh print | grep 'image'
          image: k8s.gcr.io/autoscaling/vpa-updater:0.11.0
          imagePullPolicy: Always
        image: k8s.gcr.io/autoscaling/vpa-recommender:0.11.0
        imagePullPolicy: Always
          image: k8s.gcr.io/autoscaling/vpa-admission-controller:0.11.0
          imagePullPolicy: Always

# 修改镜像下载策略
[root@node-1 vertical-pod-autoscaler]# find deploy -type f | xargs grep 'image' --color=auto
deploy/admission-controller-deployment.yaml:          image: k8s.gcr.io/autoscaling/vpa-admission-controller:0.11.0
deploy/admission-controller-deployment.yaml:          imagePullPolicy: Always
deploy/recommender-deployment.yaml:        image: k8s.gcr.io/autoscaling/vpa-recommender:0.11.0
deploy/recommender-deployment.yaml:        imagePullPolicy: Always
deploy/updater-deployment.yaml:          image: k8s.gcr.io/autoscaling/vpa-updater:0.11.0
deploy/updater-deployment.yaml:          imagePullPolicy: Always

sed -ri 's/(imagePullPolicy:)(.*)/\1 IfNotPresent/' ./deploy/admission-controller-deployment.yaml
sed -ri 's/(imagePullPolicy:)(.*)/\1 IfNotPresent/' ./deploy/recommender-deployment.yaml
sed -ri 's/(imagePullPolicy:)(.*)/\1 IfNotPresent/' ./deploy/updater-deployment.yaml

# 检查镜像下载策略
[root@node-1 vertical-pod-autoscaler]# ./hack/vpa-process-yamls.sh print | grep 'image'
          image: k8s.gcr.io/autoscaling/vpa-updater:0.11.0
          imagePullPolicy: IfNotPresent
        image: k8s.gcr.io/autoscaling/vpa-recommender:0.11.0
        imagePullPolicy: IfNotPresent
          image: k8s.gcr.io/autoscaling/vpa-admission-controller:0.11.0
          imagePullPolicy: IfNotPresent

# ---------------------------正式部署---------------------------

# 执行脚本
# 注意：脚本当前读取环境变量：$REGISTRY和$TAG. 除非您想使用非默认版本的 VPA，否则请确保不设置它们
[root@node-1 vertical-pod-autoscaler]# ./hack/vpa-up.sh
customresourcedefinition.apiextensions.k8s.io/verticalpodautoscalercheckpoints.autoscaling.k8s.io created
customresourcedefinition.apiextensions.k8s.io/verticalpodautoscalers.autoscaling.k8s.io created
clusterrole.rbac.authorization.k8s.io/system:metrics-reader created
clusterrole.rbac.authorization.k8s.io/system:vpa-actor created
clusterrole.rbac.authorization.k8s.io/system:vpa-checkpoint-actor created
clusterrole.rbac.authorization.k8s.io/system:evictioner created
clusterrolebinding.rbac.authorization.k8s.io/system:metrics-reader created
clusterrolebinding.rbac.authorization.k8s.io/system:vpa-actor created
clusterrolebinding.rbac.authorization.k8s.io/system:vpa-checkpoint-actor created
clusterrole.rbac.authorization.k8s.io/system:vpa-target-reader created
clusterrolebinding.rbac.authorization.k8s.io/system:vpa-target-reader-binding created
clusterrolebinding.rbac.authorization.k8s.io/system:vpa-evictionter-binding created
serviceaccount/vpa-admission-controller created
clusterrole.rbac.authorization.k8s.io/system:vpa-admission-controller created
clusterrolebinding.rbac.authorization.k8s.io/system:vpa-admission-controller created
clusterrole.rbac.authorization.k8s.io/system:vpa-status-reader created
clusterrolebinding.rbac.authorization.k8s.io/system:vpa-status-reader-binding created
serviceaccount/vpa-updater created
deployment.apps/vpa-updater created
serviceaccount/vpa-recommender created
deployment.apps/vpa-recommender created
Generating certs for the VPA Admission Controller in /tmp/vpa-certs.
Certificate request self-signature ok
subject=CN = vpa-webhook.kube-system.svc
Uploading certs to the cluster.
secret/vpa-tls-certs created
Deleting /tmp/vpa-certs.
deployment.apps/vpa-admission-controller created
service/vpa-webhook created

# 看一下Pod状态
[root@node-1 vertical-pod-autoscaler]# kubectl get pods -A -o wide | grep vpa
kube-system   vpa-admission-controller-865c6fc6d4-qttsq   1/1  Running 0 47s  10.200.139.99    node-3   <none>    <none>
kube-system   vpa-recommender-5bff7c5fc-dvfrd             1/1  Running 0 48s  10.200.84.160    node-1   <none>    <none>
kube-system   vpa-updater-859786f5d-4vk2q                 1/1  Running 0 49s  10.200.139.98    node-3   <none>    <none>

# ---------------------------卸载---------------------------

[root@node-1 vertical-pod-autoscaler]# ./hack/vpa-down.sh
```

#### （5）NFS存储

**1）安装NFS Server及依赖**

```bash
# 安装NFS Server, 任意一台服务器即可，可以是集群外的也可以是集群内的
[root@node-1 ~]# yum -y install nfs-utils

[root@node-1 ~]# vim /etc/exports
/data/k8s *(rw,no_root_squash)

[root@node-1 ~]# mkdir -p /data/k8s

# 启动服务 & 开机自启
[root@node-1 ~]# systemctl enable nfs && systemctl start nfs

# 所有Node都需要安装nfs-utils包，但不需要作为NFS Server启动服务
[root@node-1 ~]# yum -y install nfs-utils
[root@node-2 ~]# yum -y install nfs-utils
[root@node-3 ~]# yum -y install nfs-utils
```

**2）部署NFS外部驱动（存储类），用于实现PV动态供给**

文档：

* [https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/#dynamic](https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/#dynamic)
* [https://kubernetes.io/zh-cn/docs/concepts/storage/storage-classes/#nfs](https://kubernetes.io/zh-cn/docs/concepts/storage/storage-classes/#nfs)

NFS外部驱动：

* [https://github.com/kubernetes-sigs/nfs-subdir-external-provisioner](https://github.com/kubernetes-sigs/nfs-subdir-external-provisioner)

:::tip

镜像下载参考：<a href="#nfs-subdir-external-provisioner" style="text-decoration:none;">nfs-subdir-external-provisioner</a>

:::

::: details  使用kubectl安装nfs subdir外部驱动

```bash
# 克隆代码
[root@node-1 ~]# git clone https://github.com/kubernetes-sigs/nfs-subdir-external-provisioner.git
[root@node-1 ~]# cd nfs-subdir-external-provisioner/deploy/

# 拷贝所需要的配置文件
[root@node-1 deploy]# mkdir deploy
[root@node-1 deploy]# cp class.yaml \
						 rbac.yaml \
						 deployment.yaml						 
						 objects/serviceaccount.yaml
					  ./deploy
[root@node-1 deploy]# cd deploy

# 修改命名空间
[root@node-1 deploy]# sed -ri 's/([[:blank:]]+)(namespace:)(.*)/\1\2 kube-system/' *.yaml

# 指定NFS Server的地址和路径
[root@node-1 deploy]# vim deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nfs-client-provisioner
  labels:
    app: nfs-client-provisioner
  # replace with namespace where provisioner is deployed
  namespace: kube-system
spec:
  replicas: 1
  strategy:
    type: Recreate
  selector:
    matchLabels:
      app: nfs-client-provisioner
  template:
    metadata:
      labels:
        app: nfs-client-provisioner
    spec:
      serviceAccountName: nfs-client-provisioner
      containers:
        - name: nfs-client-provisioner
          image: k8s.gcr.io/sig-storage/nfs-subdir-external-provisioner:v4.0.2
          volumeMounts:
            - name: nfs-client-root
              mountPath: /persistentvolumes
          env:
            - name: PROVISIONER_NAME
              value: k8s-sigs.io/nfs-subdir-external-provisioner
            - name: NFS_SERVER
              value: 192.168.48.128      # NFS Server地址
            - name: NFS_PATH 
              value: /data/k8s           # NFS 路径
      volumes:
        - name: nfs-client-root
          nfs:
            server: 192.168.48.128       # NFS Server地址
            path: /data/k8s              # NFS 路径

# 修改回收策略
[root@node-1 deploy]# vim class.yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: nfs-client
provisioner: k8s-sigs.io/nfs-subdir-external-provisioner # or choose another name, must match deployment's env PROVISIONER_NAME'
parameters:
  # 回收策略为Delete时，是否将NFS中的文件进行归档
  # 归档的意思是：在NFS目录中，会将我们的数据目录进行改名，以archived-开头，变相达到删除的目录
  archiveOnDelete: "false"

# 查看所使用的镜像(需要科学上网)
[root@node-1 deploy]# grep image: *
deployment.yaml:          image: k8s.gcr.io/sig-storage/nfs-subdir-external-provisioner:v4.0.2

# 创建
[root@node-1 deploy]# kubectl apply -f .
storageclass.storage.k8s.io/nfs-client created
deployment.apps/nfs-client-provisioner created
serviceaccount/nfs-client-provisioner created
clusterrole.rbac.authorization.k8s.io/nfs-client-provisioner-runner created
clusterrolebinding.rbac.authorization.k8s.io/run-nfs-client-provisioner created
role.rbac.authorization.k8s.io/leader-locking-nfs-client-provisioner created
rolebinding.rbac.authorization.k8s.io/leader-locking-nfs-client-provisioner created
serviceaccount/nfs-client-provisioner unchanged

# 查看storageClass（不区分命名空间）
[root@node-1 deploy]# kubectl get sc
NAME          PROVISIONER                                   RECLAIMPOLICY   VOLUMEBINDINGMODE   ALLOWVOLUMEEXPANSION   AGE
nfs-client    k8s-sigs.io/nfs-subdir-external-provisioner   Delete          Immediate           false                  86s

# 查看Deployment
[root@node-1 deploy]# kubectl get deploy -n kube-system | grep -E 'NAME|nfs'
NAME                       READY   UP-TO-DATE   AVAILABLE   AGE
nfs-client-provisioner     1/1     1            1           6m39s

# 查看Pod
[root@node-1 deploy]# kubectl get pods -n kube-system | grep -E 'NAME|nfs'
NAME                                        READY   STATUS    RESTARTS            AGE
nfs-client-provisioner-d846f54bd-r6f77      1/1     Running   0                   7m9s
```

:::

#### （6）Istio

文档：

* 英文：[https://istio.io/](https://istio.io/)
* 中文：[https://istio.io/zh/](https://istio.io/zh/)

Github：[https://github.com/istio/istio](https://github.com/istio/istio)

版本支持说明：[https://istio.io/latest/docs/releases/supported-releases/](https://istio.io/latest/docs/releases/supported-releases/)

安装方式说明：[https://istio.io/latest/docs/setup/install/](https://istio.io/latest/docs/setup/install/)

（1）安装 istioctl

文档：[https://istio.io/latest/docs/setup/getting-started/#download](https://istio.io/latest/docs/setup/getting-started/#download)

```bash
# 下载1.16.2版本Istio软件包
[root@node-1 ~]# ISTIO_VERSION=1.16.2
[root@node-1 ~]# wget -c https://github.com/istio/istio/releases/download/${ISTIO_VERSION}/istio-${ISTIO_VERSION}-linux-amd64.tar.gz

# 解压
[root@node-1 ~]# tar zxf istio-${ISTIO_VERSION}-linux-amd64.tar.gz

# 拷贝二进制文件到PATH目录下
[root@node-1 ~]# cp istio-${ISTIO_VERSION}/bin/istioctl /usr/local/bin/

# 查看版本
[root@node-1 ~]# istioctl version
no running Istio pods in "istio-system"
1.16.2
```

（2）使用 Istioctl 安装（推荐此种安装方式）

文档：[https://istio.io/latest/docs/setup/install/istioctl/](https://istio.io/latest/docs/setup/install/istioctl/)

```bash
# 查看default配置文件对应的YAML
[root@node-1 ~]# istioctl profile dump default

# 使用default配置文件进行Istio安装，可用于生产环境
[root@node-1 ~]# istioctl install --set profile=default
This will install the Istio 1.14.3 default profile with ["Istio core" "Istiod" "Ingress gateways"] components into the cluster. Proceed? (y/N) y
✔ Istio core installed                                                                                                           
✔ Istiod installed                                                                                                               
✔ Ingress gateways installed                                                                                                     
✔ Installation complete                                                                                                         Making this installation the default for injection and validation.

Thank you for installing Istio 1.14.  Please take a few minutes to tell us about your install/upgrade experience!  https://forms.gle/yEtCbt45FZ3VoDT5A

# 看看都安装了什么
[root@node-1 ~]# kubectl get deploy -n istio-system
NAME                   READY   UP-TO-DATE   AVAILABLE   AGE
istio-ingressgateway   1/1     1            1           59m
istiod                 1/1     1            1           64m

[root@node-1 ~]# kubectl get pods -n istio-system  -o wide
NAME                                    READY   STATUS    RESTARTS   AGE   IP              NODE     NOMINATED NODE   READINESS GATES
istio-ingressgateway-6dbb44ff8d-lbtsr   1/1     Running   0          54m   10.200.139.74   node-3   <none>           <none>
istiod-6b5bb85ffb-jxsb2                 1/1     Running   0          67m   10.200.247.12   node-2   <none>           <none>

# 再次查看版本
[root@node-1 ~]# istioctl version
client version: 1.16.2
control plane version: 1.16.2            # 控制平面
data plane version: 1.16.2 (1 proxies)   # 数据平面
```

### 部署包管理器Helm（可选）

文档：[https://helm.sh/](https://helm.sh/)

Github：[https://github.com/helm/helm](https://github.com/helm/helm)

版本支持：https://helm.sh/docs/topics/version_skew/

（1）部署

```bash
[root@node-1 pkg]# wget -c https://get.helm.sh/helm-v3.9.4-linux-amd64.tar.gz
[root@node-1 pkg]# mkdir helm-v3.9.4-linux-amd64 && tar zxf helm-v3.9.4-linux-amd64.tar.gz -C ./helm-v3.9.4-linux-amd64
[root@node-1 pkg]# cp helm-v3.9.4-linux-amd64/linux-amd64/helm /usr/local/bin/

[root@node-1 pkg]# helm version --short
v3.9.4+gdbc6d8e
```

（2）添加或移除chart仓库

```bash
# 添加chart仓库
[root@node-1 ~]# helm repo add azure  https://mirror.azure.cn/kubernetes/charts              # Microsoft Azure(由世纪互联运营)
[root@node-1 ~]# helm repo add aliyun https://kubernetes.oss-cn-hangzhou.aliyuncs.com/charts # 阿里云
[root@node-1 ~]# helm repo add tkemarket https://market-tke.tencentcloudcr.com/chartrepo/opensource-stable # 腾讯云应用市场

# 更新本地chart列表
[root@node-1 ~]# helm repo update

# 查看chart仓库
[root@node-1 ~]# helm repo list
NAME            URL                                                              
azure           https://mirror.azure.cn/kubernetes/charts                        
aliyun          https://kubernetes.oss-cn-hangzhou.aliyuncs.com/charts           
tkemarket       https://market-tke.tencentcloudcr.com/chartrepo/opensource-stable

# 移除chart仓库
[root@node-1 ~]# helm repo remove azure
```

### 清理中转节点痕迹

* 清理免密登录node节点
* 软件包、配置、证书等备份并删除

## 

## 镜像导出和导入（需科学上网）

### 提醒

:::tip

![image-20220826184803991](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220826184803991.png)

当我们要操作这种**显式带摘要信息**的这种镜像的时候（如上图所示），需要注意几个问题：

* 1）在我们操作镜像过程中（下载、导出、导入镜像）可能会**丢失**或**修改**摘要，

  所以我们的YAML文件也必须随之修改，否则就会因为摘要信息不匹配而导致部署时Pod重新下载镜像

* 2）解决办法是：我们就当摘要信息不存在，将所有用到摘要信息的地方都给他去掉，包括**下载、导出、导入镜像**和**YAML文件中的镜像地**址

参考示例：<a href="#ingress-nginx" style="text-decoration:none;">Ingress Nginx</a>

:::

### pause

```bash
# 下载镜像（需科学上网）
docker image pull k8s.gcr.io/pause:3.2

# 导出镜像
docker image save k8s.gcr.io/pause:3.2 -o pause.tar

# 导入镜像
ctr -n k8s.io image import pause.tar

# 查看当前镜像列表
[root@node-3 ~]# ctr -n k8s.io image ls -q
docker.io/library/nginx:1.23
k8s.gcr.io/pause:3.2
```

### dns-node-cache

```bash
# 下载镜像（需科学上网）
docker image pull k8s.gcr.io/dns/k8s-dns-node-cache:1.21.1

# 导出镜像
docker image save k8s.gcr.io/dns/k8s-dns-node-cache:1.21.1 -o node.tar 

# 导入镜像
ctr -n k8s.io image import node.tar
```

### Ingress Nginx

```bash
# 下载镜像（需科学上网）
docker image pull registry.k8s.io/ingress-nginx/controller:v1.3.0
docker image pull registry.k8s.io/ingress-nginx/kube-webhook-certgen:v1.1.1

# 查看镜像的摘要(输出信息太多这里将摘要中间部分使用...代替了)
docker image ls --digests 
REPOSITORY                                         TAG    DIGEST                     IMAGE ID     CREATED       SIZE
registry.k8s.io/ingress-nginx/controller           v1.3.0 sha256:d1707...df9323ea1b5 4d43c7489bf2 6 weeks ago   263MB
registry.k8s.io/ingress-nginx/kube-webhook-certgen v1.1.1 sha256:64d8c...0cc67868660 c41e9fcadf5a 10 months ago 47.7MB

# 导出镜像
docker image save registry.k8s.io/ingress-nginx/controller:v1.3.0 -o ingress-nginx-controller.tar
docker image save registry.k8s.io/ingress-nginx/kube-webhook-certgen:v1.1.1 -o ingress-nginx-kube-webhook-certgen.tar

# 导入镜像
ctr -n k8s.io image import ingress-nginx-controller.tar
ctr -n k8s.io image import ingress-nginx-kube-webhook-certgen.tar

# 查看镜像，其中一个镜像的摘要信息丢失了，不过只要我们修改好YAML，不影响我们使用
[root@node-1 ~]# crictl image --digests | grep ingress
registry.k8s.io/ingress-nginx/controller             v1.3.0              <none>              4d43c7489bf23       266MB
registry.k8s.io/ingress-nginx/kube-webhook-certgen   v1.1.1              64d8c73dca984       c41e9fcadf5a2       18.9MB

# 当我去另一个节点上看时，摘要信息又变了，和原始的不一样了，所以这就是为什么推荐：就当摘要信息不存在就好了
[root@node-2 ~]# crictl image --digests | grep ingress
registry.k8s.io/ingress-nginx/controller             v1.3.0              72acf46c79c8e       4d43c7489bf23       266MB
registry.k8s.io/ingress-nginx/kube-webhook-certgen   v1.1.1              64d8c73dca984       c41e9fcadf5a2       49.1MB
```

### metrics-server

```bash
# 下载镜像（需科学上网）
docker image pull k8s.gcr.io/metrics-server/metrics-server:v0.6.1

# 导出镜像
docker image save k8s.gcr.io/metrics-server/metrics-server:v0.6.1 -o metrics-server.tar

# 导入镜像
ctr -n k8s.io image import metrics-server.tar
```

### Vertical Pod Autoscaler

```bash
# 下载镜像（需科学上网）
docker image pull k8s.gcr.io/autoscaling/vpa-updater:0.11.0
docker image pull k8s.gcr.io/autoscaling/vpa-recommender:0.11.0
docker image pull k8s.gcr.io/autoscaling/vpa-admission-controller:0.11.0

# 导出镜像
docker image save k8s.gcr.io/autoscaling/vpa-updater:0.11.0 -o vpa-updater.tar
docker image save k8s.gcr.io/autoscaling/vpa-recommender:0.11.0 -o vpa-recommender.tar
docker image save k8s.gcr.io/autoscaling/vpa-admission-controller:0.11.0 -o vpa-admission-controller.tar

# 导入镜像
ctr -n k8s.io image import vpa-updater.tar
ctr -n k8s.io image import vpa-recommender.tar
ctr -n k8s.io image import vpa-admission-controller.tar
```

### nfs-subdir-external-provisioner

```bash
# 下载镜像（需科学上网）
docker image pull k8s.gcr.io/sig-storage/nfs-subdir-external-provisioner:v4.0.2

# 导出镜像
docker image save k8s.gcr.io/sig-storage/nfs-subdir-external-provisioner:v4.0.2 -o nfs-subdir-external-provisioner.tar

# 导入镜像
ctr -n k8s.io image import nfs-subdir-external-provisioner.tar
```
