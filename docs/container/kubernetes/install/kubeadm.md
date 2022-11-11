# kubeadm

文档：[https://kubernetes.io/zh-cn/docs/setup/production-environment/tools/kubeadm/](https://kubernetes.io/zh-cn/docs/setup/production-environment/tools/kubeadm/)

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
IPADDR=192.168.48.151	# IP，根据实际情况修改
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

### （5）同步服务器时间

```bash
# 安装chrony
[root@localhost ~]# yum -y install chrony

# 修改ntp服务器地址,这里使用默认的
[root@localhost ~]# vi /etc/chrony.conf

# 启动服务
[root@localhost ~]# systemctl start chronyd && systemctl enable chronyd

# 检查状态
[root@localhost ~]# chronyc tracking
Reference ID    : 8BC7D6CA (139.199.214.202)
Stratum         : 3
Ref time (UTC)  : Fri Nov 11 06:12:14 2022
System time     : 0.001227024 seconds fast of NTP time
Last offset     : +0.000921233 seconds
RMS offset      : 0.001613110 seconds
Frequency       : 3.871 ppm slow
Residual freq   : +0.266 ppm
Skew            : 19.533 ppm
Root delay      : 0.050717305 seconds
Root dispersion : 0.011452827 seconds
Update interval : 64.6 seconds
Leap status     : Normal         # 这里为Normal表示服务正常
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
192.168.48.151 node-1
192.168.48.152 node-2
192.168.48.153 node-3
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
```

### （8）调整内核参数

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

# 临时加载模块(重启后还需要重新加载)
[root@localhost ~]# modprobe br_netfilter

# 再次查看
[root@localhost ~]# lsmod | grep br_netfilter
br_netfilter           22256  0 
bridge                151336  1 br_netfilter

# 设置开启自加载模块
[root@localhost ~]# echo br_netfilter > /etc/modules-load.d/br_netfilter.conf
```

:::

### （9）安装常用软件包

```bash
[root@localhost ~]# yum -y install yum-utils \
	vim curl wget rsync git \
	socat conntrack ipvsadm ipset \
	sysstat iptables libseccomp \
	lrzsz
```

### （10）调整ulimit

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

### （11）重启系统再次检查

```bash
[root@localhost ~]# reboot
```

<br />

## 安装前的准备工作

### 设置中转节点

为了方便文件的分发，我们选择一个中转节点（随便一个节点，可以是集群中的也可以是非集群中的），配置好跟其他所有节点的免密登录

```bash
# 生成密钥对
[root@node-1 ~]# ssh-keygen -t rsa

# 配置免密登录
[root@node-1 ~]# ssh-copy-id root@node-1
[root@node-1 ~]# ssh-copy-id root@node-2
[root@node-1 ~]# ssh-copy-id root@node-3
```

### 安装 docker

文档：[https://kubernetes.io/zh-cn/docs/tasks/administer-cluster/migrating-from-dockershim/migrate-dockershim-dockerd/](https://kubernetes.io/zh-cn/docs/tasks/administer-cluster/migrating-from-dockershim/migrate-dockershim-dockerd/)

**所有节点执行**

```bash
# 卸载老版本(如果有)
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine

# 安装Docker仓库
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
    
# 查看docker-ce所有可安装版本（Docker CE是Docker免费版产品的新名称）
yum list docker-ce --showduplicates
 * updates: mirrors.tuna.tsinghua.edu.cn
Loading mirror speeds from cached hostfile
Loaded plugins: fastestmirror
 * extras: mirrors.tuna.tsinghua.edu.cn
...
docker-ce.x86_64          3:20.10.2-3.el7           docker-ce-stable
docker-ce.x86_64          3:20.10.3-3.el7           docker-ce-stable
docker-ce.x86_64          3:20.10.4-3.el7           docker-ce-stable
docker-ce.x86_64          3:20.10.5-3.el7           docker-ce-stable
docker-ce.x86_64          3:20.10.6-3.el7           docker-ce-stable
docker-ce.x86_64          3:20.10.7-3.el7           docker-ce-stable
docker-ce.x86_64          3:20.10.8-3.el7           docker-ce-stable
docker-ce.x86_64          3:20.10.9-3.el7           docker-ce-stable
docker-ce.x86_64          3:20.10.10-3.el7          docker-ce-stable
docker-ce.x86_64          3:20.10.11-3.el7          docker-ce-stable
docker-ce.x86_64          3:20.10.12-3.el7          docker-ce-stable
docker-ce.x86_64          3:20.10.13-3.el7          docker-ce-stable
docker-ce.x86_64          3:20.10.14-3.el7          docker-ce-stable
docker-ce.x86_64          3:20.10.15-3.el7          docker-ce-stable	# 这里是最新的

# 安装最新版
sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# 安装指定版本
# 语法：sudo yum install docker-ce-<VERSION_STRING> docker-ce-cli-<VERSION_STRING> containerd.io docker-compose-plugin
sudo yum install docker-ce-20.10.14 docker-ce-cli-20.10.14 containerd.io docker-compose-plugin

# 启动Docker Engine
sudo systemctl start docker.service
sudo systemctl enable docker.service

# 测试Docker Engine
sudo docker run hello-world
```

### 安装 cri-dockerd

Github：[https://github.com/Mirantis/cri-dockerd](https://github.com/Mirantis/cri-dockerd)

**所有节点执行**

```bash
[root@node-1 ~]# mkdir -p /opt/kubernetes/cri && cd /opt/kubernetes/cri
[root@node-1 cri]# wget -c https://github.com/Mirantis/cri-dockerd/releases/download/v0.2.6/cri-dockerd-0.2.6-3.el7.x86_64.rpm
[root@node-1 cri]# yum -y install cri-dockerd-0.2.6-3.el7.x86_64.rpm

# 启动服务
[root@node-1 cri]# systemctl start cri-docker.service && systemctl enable cri-docker.service
```

### 安装 kube*

文档：

* [https://kubernetes.io/zh-cn/docs/setup/production-environment/tools/kubeadm/install-kubeadm/](https://kubernetes.io/zh-cn/docs/setup/production-environment/tools/kubeadm/install-kubeadm/)
* [https://developer.aliyun.com/mirror/kubernetes](https://developer.aliyun.com/mirror/kubernetes)

**所有节点执行**

```bash
# (1) 设置yum源
# 默认的kubernetes源需要科学上网，所以这里使用阿里云的源来代替,并且将签名验证关闭，否则后面的命令执行时会报错
[root@node-1 ~]# cat > /etc/yum.repos.d/kubernetes.repo <<EOF
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF

# (2) 查看软件包版本
[root@node-1 ~]# yum list --showduplicates kubeadm kubelet kubectl | grep '1.25'
kubeadm.x86_64                       1.25.0-0                         kubernetes
kubeadm.x86_64                       1.25.1-0                         kubernetes
kubeadm.x86_64                       1.25.2-0                         kubernetes
kubeadm.x86_64                       1.25.3-0                         kubernetes
kubectl.x86_64                       1.25.0-0                         kubernetes
kubectl.x86_64                       1.25.1-0                         kubernetes
kubectl.x86_64                       1.25.2-0                         kubernetes
kubectl.x86_64                       1.25.3-0                         kubernetes
kubelet.x86_64                       1.25.0-0                         kubernetes
kubelet.x86_64                       1.25.1-0                         kubernetes
kubelet.x86_64                       1.25.2-0                         kubernetes
kubelet.x86_64                       1.25.3-0                         kubernetes

# (3) 安装软件包: kubeadm、kubelet、kubectl
#     注意这还会安装两个依赖包: cri-tools、kubernetes-cni
[root@node-1 ~]# Version=1.25.3-0
[root@node-1 ~]# yum install kubeadm-${Version} kubelet-${Version} kubectl-${Version}

# (4) 设置kubelet开机自启动

# (4) 测试一下crictl工具是否正常，发现抱错了
[root@node-1 ~]# crictl ps
WARN[0000] runtime connect using default endpoints: [unix:///var/run/dockershim.sock unix:///run/containerd/containerd.sock unix:///run/crio/crio.sock unix:///var/run/cri-dockerd.sock]. As the default settings are now deprecated, you should set the endpoint instead. 
ERRO[0000] unable to determine runtime API version: rpc error: code = Unavailable desc = connection error: desc = "transport: Error while dialing dial unix /var/run/dockershim.sock: connect: no such file or directory" 
WARN[0000] image connect using default endpoints: [unix:///var/run/dockershim.sock unix:///run/containerd/containerd.sock unix:///run/crio/crio.sock unix:///var/run/cri-dockerd.sock]. As the default settings are now deprecated, you should set the endpoint instead. 
ERRO[0000] unable to determine image API version: rpc error: code = Unavailable desc = connection error: desc = "transport: Error while dialing dial unix /var/run/dockershim.sock: connect: no such file or directory" 
E1111 14:58:05.277676    2329 remote_runtime.go:557] "ListContainers with filter from runtime service failed" err="rpc error: code = Unimplemented desc = unknown service runtime.v1alpha2.RuntimeService" filter="&ContainerFilter{Id:,State:&ContainerStateValue{State:CONTAINER_RUNNING,},PodSandboxId:,LabelSelector:map[string]string{},}"
FATA[0000] listing containers: rpc error: code = Unimplemented desc = unknown service runtime.v1alpha2.RuntimeService

# (5) 修复crictl错误
[root@node-1 ~]# vim /etc/crictl.yaml
runtime-endpoint: unix:///var/run/cri-dockerd.sock
timeout: 10
debug: false

[root@node-1 ~]# crictl ps
CONTAINER  IMAGE   CREATED  STATE  NAME  ATTEMPT  POD ID   POD
```

### 配置 cgroup驱动

文档：[https://kubernetes.io/zh-cn/docs/tasks/administer-cluster/kubeadm/configure-cgroup-driver/](https://kubernetes.io/zh-cn/docs/tasks/administer-cluster/kubeadm/configure-cgroup-driver/)

**所有节点执行**

```bash
# 修改Docker的cgroup驱动修改
[root@node-1 ~]# mkdir -p /etc/docker
[root@node-1 ~]# vim /etc/docker/daemon.json
{
    "exec-opts": ["native.cgroupdriver=systemd"]
}

# 重启服务
[root@node-1 ~]# systemctl restart docker.service
# 这个也必须重启一下，否则后面初始化Master的时候发现大量处于Created的pause容器
[root@node-1 ~]# systemctl restart cri-docker.service
[root@node-1 ~]# docker info | grep Cgroup
 Cgroup Driver: systemd
 Cgroup Version: 1

# kubelet默认使用systemd驱动,无需修改
```

### 准备必须的镜像

文档：[https://kubernetes.io/zh-cn/docs/reference/command-line-tools-reference/kubelet/](https://kubernetes.io/zh-cn/docs/reference/command-line-tools-reference/kubelet/)

**所有节点执行**

```bash
# 查看都需要哪些镜像
[root@node-1 ~]# kubeadm config images list
registry.k8s.io/kube-apiserver:v1.25.3
registry.k8s.io/kube-controller-manager:v1.25.3
registry.k8s.io/kube-scheduler:v1.25.3
registry.k8s.io/kube-proxy:v1.25.3
registry.k8s.io/pause:3.8
registry.k8s.io/etcd:3.5.4-0
registry.k8s.io/coredns/coredns:v1.9.3

# 请注意: kubelet实际使用的是pause:3.6的版本,可以通过上面的文档中来查询,所以上面的文件需要再添加一行
registry.k8s.io/pause:3.6

# 将以上镜像列表保存到images.txt文件，并在一台可以科学上网的机器上执行如下命令
[root@ap-hongkang ~]# cat images.txt | while read line
do
    name=$(echo $line | awk -F/ '{print $NF}' | tr ':' '-')
    docker image pull ${line}
    docker image save ${line} -o ${name}.tar
done
[root@ap-hongkang ~]# tar zcf kubernetes-images-v1.25.3-.tar.gz ./*.tar
[root@ap-hongkang ~]# ls -lh kubernetes-images-v1.25.3-.tar.gz
-rw-r--r-- 1 root root 206M Nov 11 14:01 kubernetes-images-v1.25.3-.tar.gz

# 将镜像上传到K8S所有节点中,并导入镜像
[root@node-1 ~]# mkdir -p /opt/kubernetes/kubeadm && cd /opt/kubernetes/kubeadm
[root@node-1 ~]# cat images.txt | while read line
do
    name=$(echo $line | awk -F/ '{print $NF}' | tr ':' '-')
    docker image load -i ${name}.tar
done
```

<br />

## 安装kubernetes

### 初始化第一个Master

```bash
# (1) 初始化第一个Master
[root@node-1 ~]# kubeadm init \
    --control-plane-endpoint=192.168.48.151:6443 \
    --kubernetes-version=v1.25.3 \
    --pod-network-cidr=10.233.0.0/16 \
    --service-cidr=10.200.0.0/16 \
    --token-ttl=0 \
    --cri-socket unix:///var/run/cri-dockerd.sock \
    --upload-certs

[init] Using Kubernetes version: v1.25.3
[preflight] Running pre-flight checks
[preflight] Pulling images required for setting up a Kubernetes cluster
[preflight] This might take a minute or two, depending on the speed of your internet connection
[preflight] You can also perform this action in beforehand using 'kubeadm config images pull'
[certs] Using certificateDir folder "/etc/kubernetes/pki"
[certs] Generating "ca" certificate and key
[certs] Generating "apiserver" certificate and key
[certs] apiserver serving cert is signed for DNS names [kubernetes kubernetes.default kubernetes.default.svc kubernetes.default.svc.cluster.local node-1] and IPs [10.200.0.1 192.168.48.151]
[certs] Generating "apiserver-kubelet-client" certificate and key
[certs] Generating "front-proxy-ca" certificate and key
[certs] Generating "front-proxy-client" certificate and key
[certs] Generating "etcd/ca" certificate and key
[certs] Generating "etcd/server" certificate and key
[certs] etcd/server serving cert is signed for DNS names [localhost node-1] and IPs [192.168.48.151 127.0.0.1 ::1]
[certs] Generating "etcd/peer" certificate and key
[certs] etcd/peer serving cert is signed for DNS names [localhost node-1] and IPs [192.168.48.151 127.0.0.1 ::1]
[certs] Generating "etcd/healthcheck-client" certificate and key
[certs] Generating "apiserver-etcd-client" certificate and key
[certs] Generating "sa" key and public key
[kubeconfig] Using kubeconfig folder "/etc/kubernetes"
[kubeconfig] Writing "admin.conf" kubeconfig file
[kubeconfig] Writing "kubelet.conf" kubeconfig file
[kubeconfig] Writing "controller-manager.conf" kubeconfig file
[kubeconfig] Writing "scheduler.conf" kubeconfig file
[kubelet-start] Writing kubelet environment file with flags to file "/var/lib/kubelet/kubeadm-flags.env"
[kubelet-start] Writing kubelet configuration to file "/var/lib/kubelet/config.yaml"
[kubelet-start] Starting the kubelet
[control-plane] Using manifest folder "/etc/kubernetes/manifests"
[control-plane] Creating static Pod manifest for "kube-apiserver"
[control-plane] Creating static Pod manifest for "kube-controller-manager"
[control-plane] Creating static Pod manifest for "kube-scheduler"
[etcd] Creating static Pod manifest for local etcd in "/etc/kubernetes/manifests"
[wait-control-plane] Waiting for the kubelet to boot up the control plane as static Pods from directory "/etc/kubernetes/manifests". This can take up to 4m0s
[apiclient] All control plane components are healthy after 9.003093 seconds
[upload-config] Storing the configuration used in ConfigMap "kubeadm-config" in the "kube-system" Namespace
[kubelet] Creating a ConfigMap "kubelet-config" in namespace kube-system with the configuration for the kubelets in the cluster
[upload-certs] Storing the certificates in Secret "kubeadm-certs" in the "kube-system" Namespace
[upload-certs] Using certificate key:
23db096089fbe3acbd48f58469216fbc5fc20080ae8386659c7f09318c7ba9f1
[mark-control-plane] Marking the node node-1 as control-plane by adding the labels: [node-role.kubernetes.io/control-plane node.kubernetes.io/exclude-from-external-load-balancers]
[mark-control-plane] Marking the node node-1 as control-plane by adding the taints [node-role.kubernetes.io/control-plane:NoSchedule]
[bootstrap-token] Using token: dxrde1.5bl5mhztkjbmxltj
[bootstrap-token] Configuring bootstrap tokens, cluster-info ConfigMap, RBAC Roles
[bootstrap-token] Configured RBAC rules to allow Node Bootstrap tokens to get nodes
[bootstrap-token] Configured RBAC rules to allow Node Bootstrap tokens to post CSRs in order for nodes to get long term certificate credentials
[bootstrap-token] Configured RBAC rules to allow the csrapprover controller automatically approve CSRs from a Node Bootstrap Token
[bootstrap-token] Configured RBAC rules to allow certificate rotation for all node client certificates in the cluster
[bootstrap-token] Creating the "cluster-info" ConfigMap in the "kube-public" namespace
[kubelet-finalize] Updating "/etc/kubernetes/kubelet.conf" to point to a rotatable kubelet client certificate and key
[addons] Applied essential addon: CoreDNS
[addons] Applied essential addon: kube-proxy

Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

Alternatively, if you are the root user, you can run:

  export KUBECONFIG=/etc/kubernetes/admin.conf

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

You can now join any number of the control-plane node running the following command on each as root:

  kubeadm join 192.168.48.151:6443 --token dxrde1.5bl5mhztkjbmxltj \
        --discovery-token-ca-cert-hash sha256:6d37c313cacb2916e655cd08cd37fe97691d562b950b07422a74b4fc2c9cd933 \
        --control-plane --certificate-key 23db096089fbe3acbd48f58469216fbc5fc20080ae8386659c7f09318c7ba9f1

Please note that the certificate-key gives access to cluster sensitive data, keep it secret!
As a safeguard, uploaded-certs will be deleted in two hours; If necessary, you can use
"kubeadm init phase upload-certs --upload-certs" to reload certs afterward.

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 192.168.48.151:6443 --token dxrde1.5bl5mhztkjbmxltj \
        --discovery-token-ca-cert-hash sha256:6d37c313cacb2916e655cd08cd37fe97691d562b950b07422a74b4fc2c9cd933

# (2) 若初始化失败,执行如下命令重置
[root@node-1 ~]# kubeadm reset -f --cri-socket unix:///var/run/cri-dockerd.sock
[root@node-1 ~]# rm -rf /etc/cni/net.d/  $HOME/.kube/config

# (3) 创建kubectl配置文件
[root@node-1 ~]# mkdir -p $HOME/.kube
[root@node-1 ~]# sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
[root@node-1 ~]# sudo chown $(id -u):$(id -g) $HOME/.kube/config

# (4) 测试kubectl
[root@node-1 ~]# kubectl get node
NAME     STATUS     ROLES           AGE    VERSION
node-1   NotReady   control-plane   20s    v1.25.3
```

### 部署网络插件Calico

**所有节点执行**

```bash
# (1) 下载YAML文件
[root@node-1 ~]# mkdir -p /opt/kubernetes/cni && cd /opt/kubernetes/cni
[root@node-1 cni]# curl https://projectcalico.docs.tigera.io/manifests/calico.yaml -O

# (2) 查看一下所需的镜像
[root@node-1 cni]# cat calico.yaml | grep -i 'image:' | sort -u
          image: docker.io/calico/cni:v3.24.5
          image: docker.io/calico/kube-controllers:v3.24.5
          image: docker.io/calico/node:v3.24.5

# (3) 这一部分镜像不需要科学上网，可以提前下载，也可以在部署过程中自动下载
# 本地下载太慢了，这里依旧使用科学上网方式下载，打包、下载、导入过程略
[root@node-1 cni]# cat calico.yaml | grep -i 'image:' | sort -u | awk '{print $2}' | while read line; do
  name=$(echo $line | awk -F/ '{print $NF}' | tr ':' '-')
  docker image pull ${line}
  docker image save ${line} -o ${name}.tar
done

# (4) 部署
[root@node-1 cni]# kubectl apply -f calico.yaml

# (5) 查看
[root@node-1 cni]# kubectl get pods -A | grep calico
kube-system   calico-kube-controllers-798cc86c47-25wlk   1/1     Running   0             22s
kube-system   calico-node-g29rv                          1/1     Running   0             22s
kube-system   calico-node-nr92j                          1/1     Running   0             22s
kube-system   calico-node-ppkkj                          1/1     Running   0             22s

# 查看Node状态
[root@node-1 cni]# kubectl get node
NAME     STATUS   ROLES           AGE   VERSION
node-1   Ready    control-plane   24m   v1.25.3
```

### 初始化第二个Master节点

```bash
# 需要添加--cri-socket参数
[root@node-2 ~]# kubeadm join 192.168.48.151:6443 --token dxrde1.5bl5mhztkjbmxltj \
        --discovery-token-ca-cert-hash sha256:6d37c313cacb2916e655cd08cd37fe97691d562b950b07422a74b4fc2c9cd933 \
        --control-plane --certificate-key 23db096089fbe3acbd48f58469216fbc5fc20080ae8386659c7f09318c7ba9f1 \
        --cri-socket unix:///run/cri-dockerd.sock

[preflight] Running pre-flight checks
[preflight] Reading configuration from the cluster...
[preflight] FYI: You can look at this config file with 'kubectl -n kube-system get cm kubeadm-config -o yaml'
[preflight] Running pre-flight checks before initializing the new control plane instance
[preflight] Pulling images required for setting up a Kubernetes cluster
[preflight] This might take a minute or two, depending on the speed of your internet connection
[preflight] You can also perform this action in beforehand using 'kubeadm config images pull'
[download-certs] Downloading the certificates in Secret "kubeadm-certs" in the "kube-system" Namespace
[certs] Using certificateDir folder "/etc/kubernetes/pki"
[certs] Generating "etcd/server" certificate and key
[certs] etcd/server serving cert is signed for DNS names [localhost node-2] and IPs [192.168.48.152 127.0.0.1 ::1]
[certs] Generating "etcd/peer" certificate and key
[certs] etcd/peer serving cert is signed for DNS names [localhost node-2] and IPs [192.168.48.152 127.0.0.1 ::1]
[certs] Generating "etcd/healthcheck-client" certificate and key
[certs] Generating "apiserver-etcd-client" certificate and key
[certs] Generating "front-proxy-client" certificate and key
[certs] Generating "apiserver" certificate and key
[certs] apiserver serving cert is signed for DNS names [kubernetes kubernetes.default kubernetes.default.svc kubernetes.default.svc.cluster.local node-2] and IPs [10.200.0.1 192.168.48.152 192.168.48.151]
[certs] Generating "apiserver-kubelet-client" certificate and key
[certs] Valid certificates and keys now exist in "/etc/kubernetes/pki"
[certs] Using the existing "sa" key
[kubeconfig] Generating kubeconfig files
[kubeconfig] Using kubeconfig folder "/etc/kubernetes"
[kubeconfig] Writing "admin.conf" kubeconfig file
[kubeconfig] Writing "controller-manager.conf" kubeconfig file
[kubeconfig] Writing "scheduler.conf" kubeconfig file
[control-plane] Using manifest folder "/etc/kubernetes/manifests"
[control-plane] Creating static Pod manifest for "kube-apiserver"
[control-plane] Creating static Pod manifest for "kube-controller-manager"
[control-plane] Creating static Pod manifest for "kube-scheduler"
[check-etcd] Checking that the etcd cluster is healthy
[kubelet-start] Writing kubelet configuration to file "/var/lib/kubelet/config.yaml"
[kubelet-start] Writing kubelet environment file with flags to file "/var/lib/kubelet/kubeadm-flags.env"
[kubelet-start] Starting the kubelet
[kubelet-start] Waiting for the kubelet to perform the TLS Bootstrap...
[etcd] Announced new etcd member joining to the existing etcd cluster
[etcd] Creating static Pod manifest for "etcd"
[etcd] Waiting for the new etcd member to join the cluster. This can take up to 40s
The 'update-status' phase is deprecated and will be removed in a future release. Currently it performs no operation
[mark-control-plane] Marking the node node-2 as control-plane by adding the labels: [node-role.kubernetes.io/control-plane node.kubernetes.io/exclude-from-external-load-balancers]
[mark-control-plane] Marking the node node-2 as control-plane by adding the taints [node-role.kubernetes.io/control-plane:NoSchedule]

This node has joined the cluster and a new control plane instance was created:

* Certificate signing request was sent to apiserver and approval was received.
* The Kubelet was informed of the new secure connection details.
* Control plane label and taint were applied to the new node.
* The Kubernetes control plane instances scaled up.
* A new etcd member was added to the local/stacked etcd cluster.

To start administering your cluster from this node, you need to run the following as a regular user:

        mkdir -p $HOME/.kube
        sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
        sudo chown $(id -u):$(id -g) $HOME/.kube/config

Run 'kubectl get nodes' to see this node join the cluster.

# (2) 若初始化失败,执行如下命令重置
[root@node-1 ~]# kubeadm reset -f --cri-socket unix:///var/run/cri-dockerd.sock
[root@node-1 ~]# rm -rf /etc/cni/net.d/  $HOME/.kube/config

# (3) 创建kubectl配置文件
[root@node-1 ~]# mkdir -p $HOME/.kube
[root@node-1 ~]# sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
[root@node-1 ~]# sudo chown $(id -u):$(id -g) $HOME/.kube/config

# (4) 测试kubectl
[root@node-2 ~]# kubectl get node
NAME     STATUS     ROLES           AGE     VERSION
node-1   Ready      control-plane   9m19s   v1.25.3
node-2   Ready      control-plane   105s    v1.25.3
```

### 初始化第一个Node节点

```bash
# 需要添加--cri-socket参数
[root@node-3 ~]# kubeadm join 192.168.48.151:6443 --token dxrde1.5bl5mhztkjbmxltj \
        --discovery-token-ca-cert-hash sha256:6d37c313cacb2916e655cd08cd37fe97691d562b950b07422a74b4fc2c9cd933 \
        --cri-socket unix:///run/cri-dockerd.sock

[preflight] Running pre-flight checks
[preflight] Reading configuration from the cluster...
[preflight] FYI: You can look at this config file with 'kubectl -n kube-system get cm kubeadm-config -o yaml'
[kubelet-start] Writing kubelet configuration to file "/var/lib/kubelet/config.yaml"
[kubelet-start] Writing kubelet environment file with flags to file "/var/lib/kubelet/kubeadm-flags.env"
[kubelet-start] Starting the kubelet
[kubelet-start] Waiting for the kubelet to perform the TLS Bootstrap...

This node has joined the cluster:
* Certificate signing request was sent to apiserver and a response was received.
* The Kubelet was informed of the new secure connection details.

Run 'kubectl get nodes' on the control-plane to see this node join the cluster.

# 在任意一个Master上执行
[root@node-2 ~]# kubectl get nodes
NAME     STATUS     ROLES           AGE     VERSION
node-1   Ready      control-plane   12m     v1.25.3
node-2   Ready      control-plane   4m54s   v1.25.3
node-3   Ready      <none>          36s     v1.25.3
```

### 安装Etcd客户端工具

```bash
# 下载和解压软件包
[root@node-1 ~]# ETCD_VER=v3.5.4
[root@node-1 ~]# wget -c https://github.com/etcd-io/etcd/releases/download/${ETCD_VER}/etcd-${ETCD_VER}-linux-amd64.tar.gz
[root@node-1 ~]# tar zxf etcd-${ETCD_VER}-linux-amd64.tar.gz -C /usr/local/
[root@node-1 ~]# ls -ld /usr/local/etcd*
drwxr-xr-x 3 528287 89939 163 Apr 24  2022 /usr/local/etcd-v3.5.4-linux-amd64

# 软连接二进制文件,这里我们只需要软连接客户端工具即可,服务端不需要软连接
[root@ap-hongkang ~]# ln -s /usr/local/etcd-${ETCD_VER}-linux-amd64/etcdctl /usr/local/bin/etcdctl && \
                      ln -s /usr/local/etcd-${ETCD_VER}-linux-amd64/etcdutl /usr/local/bin/etcdutl

# 查看etcd所有成员
[root@node-1 ~]# etcdctl \
    --endpoints=https://192.168.48.151:2379 \
    --cacert=/etc/kubernetes/pki/etcd/ca.crt \
    --cert=/etc/kubernetes/pki/apiserver-etcd-client.crt \
    --key=/etc/kubernetes/pki/apiserver-etcd-client.key \
    -w table \
  member list
+------------------+---------+--------+-----------------------------+-----------------------------+------------+
|        ID        | STATUS  |  NAME  |         PEER ADDRS          |        CLIENT ADDRS         | IS LEARNER |
+------------------+---------+--------+-----------------------------+-----------------------------+------------+
| 40687c68b8fd2df1 | started | node-2 | https://192.168.48.152:2380 | https://192.168.48.152:2379 |      false |
| 4d41869ad6a15c0e | started | node-1 | https://192.168.48.151:2380 | https://192.168.48.151:2379 |      false |
+------------------+---------+--------+-----------------------------+-----------------------------+------------+

# 查看所有成员状态, 结果见下图
# 我们的etcd并不能算是一个集群,因为它只有2个节点
[root@node-1 ~]# etcdctl \
    --endpoints=https://192.168.48.151:2379,https://192.168.48.152:2379 \
    --cacert=/etc/kubernetes/pki/etcd/ca.crt \
    --cert=/etc/kubernetes/pki/apiserver-etcd-client.crt \
    --key=/etc/kubernetes/pki/apiserver-etcd-client.key \
    -w table \
  endpoint status
  
# 设置环境变量
[root@node-1 ~]# vim ~/.bashrc
export ETCDCTL_ENDPOINTS=https://192.168.48.151:2379,https://192.168.48.152:2379
export ETCDCTL_CACERT=/etc/kubernetes/pki/etcd/ca.crt
export ETCDCTL_CERT=/etc/kubernetes/pki/apiserver-etcd-client.crt
export ETCDCTL_KEY=/etc/kubernetes/pki/apiserver-etcd-client.key

[root@node-1 ~]# source ~/.bashrc
[root@node-1 ~]# etcdctl member list -w table
+------------------+---------+--------+-----------------------------+-----------------------------+------------+
|        ID        | STATUS  |  NAME  |         PEER ADDRS          |        CLIENT ADDRS         | IS LEARNER |
+------------------+---------+--------+-----------------------------+-----------------------------+------------+
| 40687c68b8fd2df1 | started | node-2 | https://192.168.48.152:2380 | https://192.168.48.152:2379 |      false |
| 4d41869ad6a15c0e | started | node-1 | https://192.168.48.151:2380 | https://192.168.48.151:2379 |      false |
+------------------+---------+--------+-----------------------------+-----------------------------+------------+  
```

![image-20221111174304487](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221111174304487.png)

### 部署高可用Etcd集群

```bash

```

### 部署高可用ApiServer

```bash
```



