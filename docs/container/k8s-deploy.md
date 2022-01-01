## Kubernetes

官网：[https://kubernetes.io/](https://kubernetes.io/)



### 生产环境部署方式

文档：[https://kubernetes.io/docs/setup/production-environment/tools/](https://kubernetes.io/docs/setup/production-environment/tools/)

| 部署方式   | 复杂性 | 灵活性 | 描述                                            |
| ---------- | ------ | ------ | ----------------------------------------------- |
| Kubespray  | 简单   | 自定义 | 基于`kubeadm`和`Ansible`来部署                  |
| kubeadm    | 适中   | 自定义 | Kubeadm 是一个快捷搭建kubernetes(k8s)的安装工具 |
| 二进制部署 | 复杂   | 灵活   | 二进制部署                                      |
| kops       | 未知   | 未知   | 在AWS上安装Kubernetes群集，本文档不考虑这种方式 |



### 使用kubespray部署生产集群

#### 前置要求

* 在部署过程中需要去海外下载镜像，所以需要主机能够科学上网，如果需要帮助，可以私信我

* 如果使用`VMware Workstation`等在本地部署，需要保证使用静态内网IP地址，`CentOS`系统可参考如下步骤：

  ```bash
  # vi /etc/sysconfig/network-scripts/ifcfg-ens33
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
  DNS1=114.114.114.114    # DNS1
  DNS2=8.8.8.8            # DNS2
  
  # 重启网络
  systemctl restart network.service
  
  # 测试网络
  ping -c 4 www.baidu.com
  ```

* 支持主流系统，内存最低2G，CPU最低2核，磁盘30G以上



#### 节点规划

本次安装节点规划，在安装前可以动态调整

| 主机名 | 功能                           | 操作系统   | 内存 | CPU  | 静态IP         |
| ------ | ------------------------------ | ---------- | ---- | ---- | -------------- |
| node0  | Master节点， Etcd节点          | Centos 7.9 | 4G   | 2核  | 192.168.48.140 |
| node1  | Master节点，Etcd节点，Node节点 | Centos 7.9 | 4G   | 2核  | 192.168.48.141 |
| node2  | Node节点， Etcd节点            | Centos 7.9 | 4G   | 2核  | 192.168.48.142 |

> 根据以上信息安装操作系统，安装完成后不需要做任何操作



#### 更新系统

```bash
yum update -y && reboot

# 更新前系统版本: cat /etc/redhat-release 
# CentOS Linux release 7.4.1708 (Core)

# 更新后系统版本: cat /etc/redhat-release 
# CentOS Linux release 7.9.2009 (Core)
```



#### 系统初始化

```bash
# 修改主机名
hostnamectl set-hostname node0
hostnamectl set-hostname node1
hostnamectl set-hostname node2

# 关闭selinux
setenforce 0
sed -ri 's/(^SELINUX=)(.*)/\1disabled/' /etc/selinux/config

# 关闭防火墙
systemctl stop firewalld && systemctl disable firewalld

# 设置iptables规则
iptables -F && iptables -X && iptables -F -t nat && iptables -X -t nat && iptables -P FORWARD ACCEPT

# 关闭swap
swapoff -a && vi /etc/fstab
free -m && cat /etc/fstab

# K8S参数设置
cat > /etc/sysctl.d/kubernetes.conf <<EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_nonlocal_bind = 1
net.ipv4.ip_forward = 1
vm.swappiness = 0
vm.overcommit_memory = 1
EOF
# 使配置生效
sysctl -p /etc/sysctl.d/kubernetes.conf

# 时间同步
yum install ntpdate -y
ntpdate time.windows.com

# 移除docker相关软件包（可选）
yum remove -y docker* && rm -vf /etc/docker/daemon.json
```

#### 配置Ansible主控节点

Ansible主控节点部署在哪里都可以，只要能控制K8s Node节点即可

```bash
# 生成keygen（执行ssh-keygen，一路回车下去）
ssh-keygen

# 配置SSH免密登录
ssh-copy-id root@192.168.48.140
ssh-copy-id root@192.168.48.141
ssh-copy-id root@192.168.48.142

# 验证免密登录
ssh root@192.168.48.140  "hostname"
ssh root@192.168.48.141  "hostname"
ssh root@192.168.48.142  "hostname"

# 安装基础软件
yum install epel-release python3 git wget -y

# 升级pip到最新版(可选,推荐)
pip3 install --upgrade pip -i https://mirrors.aliyun.com/pypi/simple

# 下载kubespray源码
# 若因网络下载失败，可以使用我们准备好的代理（科学上网），wget -c后面添加 -e "http_proxy=http://192.168.5.103:7890"
wget -c https://github.com/kubernetes-sigs/kubespray/archive/v2.15.0.tar.gz 
tar zxf v2.15.0.tar.gz && cd kubespray-2.15.0 && cat requirements.txt
pip3 install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple

# 生成项目配置
cp -rpf inventory/sample inventory/mycluster

# 使用真实的hostname（否则会自动把你的hostname改成node1/node2...这种哦）
export USE_REAL_HOSTNAME=true

# 指定配置文件位置
export CONFIG_FILE=inventory/mycluster/hosts.yaml

# 定义ip列表（你的服务器内网ip地址列表，3台及以上，前两台默认为master节点）
declare -a IPS=(
  192.168.48.140
  192.168.48.141
  192.168.48.142
)

# 生成配置文件
python3 contrib/inventory_builder/inventory.py ${IPS[@]}
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

#### 节点个性化配置

```bash
# 定制化配置文件
# 1. 节点组织配置（这里可以调整每个节点的角色）
vi inventory/mycluster/hosts.yaml
all:
  hosts:
    node0:
      ansible_host: 192.168.48.140
      ip: 192.168.48.140
      access_ip: 192.168.48.140
    node1:
      ansible_host: 192.168.48.141
      ip: 192.168.48.141
      access_ip: 192.168.48.141
    node2:
      ansible_host: 192.168.48.142
      ip: 192.168.48.142
      access_ip: 192.168.48.142
  children:
    kube-master:
      hosts:
        node0:
        node1:
    kube-node:
      hosts:
        node0:
        node1:
        node2:
    etcd:
      hosts:
        node0:
        node1:
        node2:
    k8s-cluster:
      children:
        kube-master:
        kube-node:
    calico-rr:
      hosts: {}
      
# 2. containerd配置（教程使用containerd作为容器引擎）
vi inventory/mycluster/group_vars/all/containerd.yml

# 3. 全局配置（可以在这配置http(s)代理实现外网访问）
vi inventory/mycluster/group_vars/all/all.yml
http_proxy: "http://192.168.5.103:7890"     # 配置代理
https_proxy: "http://192.168.5.103:7890"    # 配置代理


# 4. k8s集群配置（包括设置容器运行时、svc网段、pod网段等）
vi inventory/mycluster/group_vars/k8s-cluster/k8s-cluster.yml
kube_version: v1.19.7                  # K8S版本信息，无需修改（也不要随意修改）
kube_service_addresses: 10.200.0.0/16  # 默认为10.233.0.0/18，修改为10.200.0.0/16
kube_pods_subnet: 10.233.0.0/16        # 默认10.233.64.0/18，修改为10.233.0.0/16
container_manager: containerd	       # 配置容器引擎，默认是docker,修改为containerd

# 5. 修改etcd部署类型为host（默认是docker）
vi inventory/mycluster/group_vars/etcd.yml
etcd_deployment_type: host      # 配置etcd部署方式，默认是docker，如果使用containerd的话，必须使用宿主机部署，即host

# 6. 附加组件（ingress、dashboard等）
vi inventory/mycluster/group_vars/k8s-cluster/addons.yml
dashboard_enabled: true			# 修改为true
ingress_nginx_enabled: true		# 修改为true
```

#### 部署Kubernetes集群

```bash
# 使用tmux(可选)
yum install tmux -y
tmux new -s k8s_install

# 部署Kubernetes集群（这一步执行的时间可能会很长，这里我使用time命令来统计一下时长）
time ansible-playbook -i inventory/mycluster/hosts.yaml  -b cluster.yml # 如果想查看详细信息，添加-vvvv

real    25m49.126s
user    14m56.884s
sys     4m50.167s
```

> 安装步骤执行时长并不稳定，根据系统配置、网络质量而不同，快则半小时，慢则几个小时



#### 检查集群状态

```bash
# 查看节点状态(Master节点执行)
kubectl get node
NAME    STATUS   ROLES    AGE   VERSION
node0   Ready    master   25h   v1.19.7
node1   Ready    master   25h   v1.19.7
node2   Ready    <none>   24h   v1.19.7

# 查看Master节点组件状态(Master节点执行)
kubectl get cs
Warning: v1 ComponentStatus is deprecated in v1.19+
NAME                 STATUS    MESSAGE             ERROR
scheduler            Healthy   ok                  
controller-manager   Healthy   ok                  
etcd-2               Healthy   {"health":"true"}   
etcd-1               Healthy   {"health":"true"}   
etcd-0               Healthy   {"health":"true"}

# 查看Pod状态
kubectl get pods -A
```

#### 清理代理设置

```bash
# 清理Containerd HTTP代理
rm -vf /etc/systemd/system/containerd.service.d/http-proxy.conf
systemctl daemon-reload
systemctl restart containerd

# 清理Yum HTTP代理(把grep出来的代理配置手动删除即可)
grep 7890 -r /etc/yum*
```



#### 访问dashboard

```bash
# 创建service
cat > dashboard-svc.yaml <<EOF
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

kubectl apply -f dashboard-svc.yaml

# 访问dashboard
为了集群安全，从 1.7 开始，dashboard 只允许通过 https 访问，我们使用nodeport的方式暴露服务，可以使用 https://NodeIP:NodePort 地址访问 
关于自定义证书 默认dashboard的证书是自动生成的，肯定是非安全的证书，如果大家有域名和对应的安全证书可以自己替换掉。使用安全的域名方式访问dashboard。 
在dashboard-all.yaml中增加dashboard启动参数，可以指定证书文件，其中证书文件是通过secret注进来的。
- –tls-cert-file
- dashboard.cer
- –tls-key-file
- dashboard.key

# 创建service account
kubectl create sa dashboard-admin -n kube-system

# 创建角色绑定关系
kubectl create clusterrolebinding dashboard-admin --clusterrole=cluster-admin --serviceaccount=kube-system:dashboard-admin

# 查看dashboard-admin的secret名字
ADMIN_SECRET=$(kubectl get secrets -n kube-system | grep dashboard-admin | awk '{print $1}')

# 打印secret的token
kubectl describe secret -n kube-system ${ADMIN_SECRET} | grep -E '^token' | awk '{print $2}'

# 浏览器访问
https://192.168.48.100:30000/
```



#### FAQ

**下载文件出错**

![image-20211229101545405](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211229101545405.png)

> 下载文件出错，从以下方面排查
>
> * 检查本地网络、代理服务器是否正常
> * 检查配置是否写错
>   * 比如将代理服务器的`http://`误写成了`https://`
>   * 比如将代理服务器的`http://`误写成`http:/`
>



**scheduler和controller-manager组件状态为Unhealthy**

```bash
# 修复Unhealthy(在所有Master上操作)
vi /etc/kubernetes/manifests/kube-controller-manager.yaml
    # - --port=0    # 将这一行注释掉
vi /etc/kubernetes/manifests/kube-scheduler.yaml
    # - --port=0    # 将这一行注释掉

# 重启kubelet
systemctl restart kubelet
```


