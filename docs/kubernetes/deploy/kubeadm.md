# kubeadm

文档：[https://kubernetes.io/zh-cn/docs/setup/production-environment/tools/kubeadm/](https://kubernetes.io/zh-cn/docs/setup/production-environment/tools/kubeadm/)

<br />

## 设置主控端

使用Ansible进行批量管理主机

* 为了减少使用成本，这里并不会使用`Playbook`方式来执行命令；而是使用`Ad-Hoc`方式是把`Ansible`当作一个批量执行工具
* 但是默认的Ad-Hoc并不好用，所以这里依旧使用`Playbook`方式来实现`Ad-Hoc`
* 任意找一台主机即可，这里使用的用作k8s-master-1的主机

### 1）安装Ansible

```bash
# (1) 安装epel源和vim
[root@localhost ~]# yum install -y epel-release vim

# (2) 设置vim
[root@localhost ~]# vim ~/.vimrc
set paste

# (3) 安装Ansible,推荐安装较新的版本
[root@localhost ~]# yum install ansible -y          # 方式1
[root@localhost ~]# pip install ansible             # 方式2
[root@localhost ~]# ansible --version
ansible 2.9.27
  config file = /etc/ansible/ansible.cfg
  configured module search path = [u'/root/.ansible/plugins/modules', u'/usr/share/ansible/plugins/modules']
  ansible python module location = /usr/lib/python2.7/site-packages/ansible
  executable location = /usr/bin/ansible
  python version = 2.7.5 (default, Aug  4 2017, 00:39:18) [GCC 4.8.5 20150623 (Red Hat 4.8.5-16)]
```

### 2）配置Ansible

```bash
# (1) 创建kubernetes专门放Ansible所有的文件目录
[root@localhost ~]# mkdir -p /usr/local/kubernetes/ansible && cd /usr/local/kubernetes/ansible

# (2) 新建inventory文件
#     组名不建议使用-,会报提醒, 比如k8s-master建议写成k8s_master
[root@localhost ansible]# vim hosts.ini
[k8s_master]
node-1  ansible_ssh_host=192.168.48.151  ansible_ssh_pass=123456
node-2  ansible_ssh_host=192.168.48.152  ansible_ssh_pass=123456
node-3  ansible_ssh_host=192.168.48.153  ansible_ssh_pass=123456

[k8s_worker]
node-4  ansible_ssh_host=192.168.48.154  ansible_ssh_pass=123456

# (3) 拷贝默认的配置文件
# 若是使用yum安装的ansible:
#     默认配置文件是/etc/ansible/ansible.cfg

# 若是使用pip安装的ansible, 默认不带配置文件, 可以到指定版本的GitHub上去找配置文件,如下所示：
#     https://github.com/ansible/ansible/blob/v2.11.12/examples/ansible.cfg

# 当前目录下的配置文件优先级高于默认的配置文件(/etc目录下)

# (4) 修改配置文件,forks根据实际情况修改
[root@localhost ansible]# cp /etc/ansible/ansible.cfg .
[root@localhost ansible]# vim ansible.cfg
[defaults]
inventory             = ./hosts.ini
log_path              = ./ansible.log
forks                 = 5
host_key_checking     = False
display_skipped_hosts = False
deprecation_warnings  = False
command_warnings      = False

# (5) 测试
[root@localhost ansible]# ansible all -m ping
```

### 3）测试执行Shell命令

```bash
# (1) 编写playbook文件
[root@localhost ansible]# vim play_shell.yaml
---
- name: "Ad-Hoc Shortcuts"
  hosts: "{{ host }}"
  gather_facts: "no"

  tasks:
    - name: "Execute shell commands"
      shell: "{{ shell }}"
      register: output

    - name: "Display stdout"
      debug:
        #msg: "{{ output.stdout_lines }}"
        msg: "{{ output.stdout_lines | regex_replace('\"', '') }}"
      when: output.stdout != ""

    - name: "Display stderr"
      debug:
        #msg: "{{ output.stderr_lines }}"
        msg: "{{ output.stderr_lines | regex_replace('\"', '') }}"
      when: output.stderr != ""

# (2) 测试
[root@localhost-1 ansible]# ansible-playbook play_shell.yaml -e "host='all'" -e "shell='cat /etc/os-release'"

# 温馨提示：
# (1) Ansible会根据Shell命令退出码是否为0来判断执行是否成功
# (2) grep命令若未返回结果则退出码为非0, 如果想一直保持成功状态则 "xx | grep xx; echo" 即可
```

### 4）测试文件修改：/etc/hosts

```bash
# 新建playbook, 注意block内容根据实际情况修改
[root@localhost ansible]# vim play_hosts.yaml
---
- name: "Ad-Hoc Shortcuts"
  hosts: "{{ host }}"
  gather_facts: "no"
  vars:
    target: "/etc/hosts"
    
  tasks:
  - name: "Modify {{ target }}"
    blockinfile:
      path: "{{ target }}"
      backup: "no"
      marker: "# {mark} Ansible Managed Block"
      marker_begin: "Begin"
      marker_end: "End"
      block: |
        # kubernetes
        192.168.48.151 node-1
        192.168.48.152 node-2
        192.168.48.153 node-3
        192.168.48.154 node-4

  - name: "Insert blank lines before block"
    lineinfile:
      dest: "{{ target }}"
      insertbefore: "^# Begin Ansible Managed Block$"
      line: " "

# 执行playbook
[root@localhost ansible]# ansible-playbook play_hosts.yaml -e "host='all'"
```

### 5）测试文件修改：limits.conf

```bash
# 新建playbook
[root@localhost ansible]# vim play_limits.yaml
---
- name: "Ad-Hoc Shortcuts"
  hosts: "{{ host }}"
  gather_facts: "no"
  vars:
    target: "/etc/security/limits.conf"

  tasks:
  - name: "Modify {{ target }}"
    blockinfile:
      path: "{{ target }}"
      backup: "no"
      marker: "# {mark} Ansible Managed Block"
      marker_begin: "Begin"
      marker_end: "End"
      block: |
        # max number of open file descriptors
        * soft nofile 102400
        * hard nofile 102400

        # max number of processes
        * soft nproc  102400
        * hard nproc  102400

  - name: "Insert blank lines before block"
    lineinfile:
      dest: "{{ target }}"
      insertbefore: "^# Begin Ansible Managed Block$"
      line: " "

# 执行playbook
[root@ap-hongkang ansible]# ansible-playbook play_limits.yaml -e "host='all'"
```

### 6）测试文件推送和拉取

```bash
# 这里使用的是synchronize模块
# 前置条件:
# (1) 需要对端主机安装rsync
# (2) 需要本地可以解析inventory中的主机名
# 注意事项:
# (1) 在src或dest中写路径的时候需要注意是否带尾斜杠/, 否则结果可能与预期不一样
#     因为synchronize本质是调用rsync命令，所以这与rsync的路径使用方式保持一致

# (1) 新建playbook
[root@localhost ansible]# vim play_rsync.yaml
---
- name: "Ad-Hoc Shortcuts"
  hosts: "{{ host }}"
  gather_facts: "no"

  tasks:
    - name: "Transfer files using rsync"
      synchronize:
        mode: "{{ mode }}"
        src: "{{ src }}"
        dest: "{{ dest }}"

# --------------------------------------------------------------------------------------------------
# (2) 创建测试文件
[root@localhost ansible]# mkdir /tmp/abc
[root@localhost ansible]# seq 1000 > /tmp/abc/abc.txt

# (3) 被控制端安装rsync
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='yum -y install rsync'"

# --------------------------------------------------------------------------------------------------
# 测试文件或目录推送: src目录必须存在,dest目录不需要存在,会自动创建

# 方式1：将/tmp/abc推送至对端/tmp/目录下
[root@localhost ansible]# ansible-playbook play_rsync.yaml \
    -e "host='all'" \
    -e "mode=push" \
    -e "src=/tmp/abc" \
    -e "dest=/tmp/"

# 方式2：将/tmp/abc/下的所有文件推送至对端/tmp/def目录下
[root@localhost ansible]# ansible-playbook play_rsync.yaml \
    -e "host='all'" \
    -e "mode=push" \
    -e "src=/tmp/abc/" \
    -e "dest=/tmp/def"

# --------------------------------------------------------------------------------------------------
# 测试文件或目录拉取：src目录必须存在,dest目录不需要存在,会自动创建

# 方式1：将对端/tmp/abc目录拉取至本地/tmp/<对端主机名>/目录下
[root@localhost ansible]# ansible-playbook play_rsync.yaml \
    -e "host='all'" \
    -e "mode=pull" \
    -e "src=/tmp/abc" \
    -e "dest=/tmp/{{ inventory_hostname }}"

# 方式2：将对端/tmp/abc/下的所有文件拉取至本地/tmp/<对端主机名>/目录下
[root@localhost ansible]# ansible-playbook play_rsync.yaml \
    -e "host='all'" \
    -e "mode=pull" \
    -e "src=/tmp/abc/" \
    -e "dest=/tmp/{{ inventory_hostname }}"
```

<br />

## 系统初始化

### 1）更新系统

```bash
# 更新系统
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='yum -y install epel-release'"

[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='yum -y update'"

# 重启系统
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='reboot'"

# 查看版本
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='cat /etc/redhat-release'"
```

### 2）配置时区（可选）

```bash
# 测试一下命令
[root@localhost ansible]# timedatectl
      Local time: Fri 2022-08-19 15:02:02 CST
  Universal time: Fri 2022-08-19 07:02:02 UTC
        RTC time: Fri 2022-08-19 07:02:00
       Time zone: Asia/Shanghai (CST, +0800)
     NTP enabled: n/a
NTP synchronized: no
 RTC in local TZ: no
      DST active: n/a
      
# 查看当前的时区
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='timedatectl | grep \'Time zone\''"

# 配置时区为东八区
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='timedatectl set-timezone Asia/Shanghai'"

# 检查时区是否是东八区
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='timedatectl | grep \'Asia/Shanghai (CST, +0800)\''"
```

### 3）配置24小时制（可选）

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

### 4）配置静态IP（可选）

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

### 5）服务器时间同步

```bash
# (1) 安装chrony
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='yum -y install chrony'"

# (2) 修改ntp服务器地址,这里使用默认的
[root@localhost ansible]# vim /etc/chrony.conf

# (3) 启动服务
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='systemctl start chronyd && \
               systemctl enable chronyd'"

# (4) 检查状态
[root@localhost ansible]# chronyc tracking
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

[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='chronyc tracking | grep  \'Leap status     : Normal\''"
```

### 6）配置主机名

```bash
# (1) 配置主机名
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='hostnamectl set-hostname {{ inventory_hostname }}'"

# (2) 查看主机名
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='hostname'"

# (3) 添加主机名解析
[root@localhost ansible]# vim play_hosts.yaml
      block: |
        # kubernetes
        192.168.48.151 node-1
        192.168.48.152 node-2
        192.168.48.153 node-3
        192.168.48.154 node-4

[root@localhost ansible]# ansible-playbook play_hosts.yaml -e "host='all'"
```

### 7）关闭某些服务

```bash
# (1)关闭防火墙Firewalld
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='systemctl stop firewalld && \
               systemctl disable firewalld'"

# (2) 关闭SeLinux
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='setenforce 0 ; \
               getenforce   && \
               sed -ri 's/(^SELINUX=)(.*)/\1disabled/' /etc/selinux/config && \
               grep -E '^SELINUX=disabled' /etc/selinux/config'"

# (3) 设置iptables规则
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='iptables -F && \
               iptables -F -t nat && \
	           iptables -X -t nat && \
               iptables -P FORWARD ACCEPT && \
               iptables -nL'"       

# (4) 关闭Swap
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='swapoff -a && \
               sed -ri '/(^[^#])(.*)[[:blank:]]swap[[:blank:]](.*)/s/^/#/' /etc/fstab && \
               grep swap /etc/fstab || echo "" && \
               free'"
```

### 8）调整内核参数

```bash
# (1) 创建内核参数文件
[root@localhost ansible]# cat > /etc/sysctl.d/kubernetes.conf <<EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_nonlocal_bind = 1
net.ipv4.ip_forward = 1
vm.swappiness = 0
vm.overcommit_memory = 1
EOF

# (2) 将文件推送至所有主机
[root@localhost ansible]# ansible-playbook play_rsync.yaml \
    -e "host='all'" \
    -e "mode=push" \
    -e "src=/etc/sysctl.d/kubernetes.conf" \
    -e "dest=/etc/sysctl.d/"

# (3) 加载内核参数
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='sysctl -p /etc/sysctl.d/kubernetes.conf'"

# -------------------------------------------------------------------------------
# 若出现如下报错
[root@localhost ~]# sysctl -p /etc/sysctl.d/kubernetes.conf
sysctl: cannot stat /proc/sys/net/bridge/bridge-nf-call-ip6tables: No such file or directory
sysctl: cannot stat /proc/sys/net/bridge/bridge-nf-call-iptables: No such file or directory
net.ipv4.ip_nonlocal_bind = 1
net.ipv4.ip_forward = 1
vm.swappiness = 0
vm.overcommit_memory = 1

# -------------------------------------------------------------------------------
# 解决办法如下：

# 检查模块是否已经加载（输出为空代表模块没有加载）
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='lsmod | grep br_netfilter || echo""'"

# 临时加载模块(重启后还需要重新加载)
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='modprobe br_netfilter'"

# 再次查看
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='lsmod | grep br_netfilter'"

# 输出类似于如下所示
br_netfilter           22256  0 
bridge                151336  1 br_netfilter

# 设置开启自加载模块
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='echo br_netfilter > /etc/modules-load.d/br_netfilter.conf && \
               cat /etc/modules-load.d/br_netfilter.conf | grep br_netfilter'"    
```

### 9）调整ulimit

```bash
# --------------------------------------------------------------------------
# 手动检查

# 检查当前配置
[root@localhost ~]# ulimit -a | grep -E 'open files|max user processes'
open files                      (-n) 1024
max user processes              (-u) 7184

# 永久设置
[root@localhost ~]# cat >>/etc/security/limits.conf <<EOF
# max number of open file descriptors
* soft nofile 102400
* hard nofile 102400

# max number of processes
* soft nproc  102400
* hard nproc  102400
EOF

# --------------------------------------------------------------------------
# 批量执行命令

# 检查当前配置
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='ulimit -a | grep -E \'open files|max user processes\''"

# 临时设置
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='ulimit -n 102400 && ulimit -u 102400'"

# 永久设置
[root@ap-hongkang ansible]# ansible-playbook play_limits.yaml -e "host='all'"
```

### 10）安装常用软件包

```bash
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='yum -y install yum-utils \
               vim curl telnet wget rsync git rsync jq\
               socat conntrack \
               sysstat iptables libseccomp \
               lrzsz'"
```

### 11）重启系统再次检查

```bash
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='reboot'"
```

<br />

## 安装前的准备工作

### 安装 docker

文档：[https://kubernetes.io/zh-cn/docs/tasks/administer-cluster/migrating-from-dockershim/migrate-dockershim-dockerd/](https://kubernetes.io/zh-cn/docs/tasks/administer-cluster/migrating-from-dockershim/migrate-dockershim-dockerd/)

**所有节点执行**

```bash
# (1) 如果已经安装了老版本的Docker，那么卸载它
#     此命令执行是安全的，因为新版本的名称已经改变了
[root@node-1 ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='yum remove -y docker \
                             docker-client \
                             docker-client-latest \
                             docker-common \
                             docker-latest \
                             docker-latest-logrotate \
                             docker-logrotate \
                             docker-engine'"

# (2) 安装docker-ce仓库(Docker CE是Docker免费版产品的新名称)
[root@node-1 ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='yum install -y yum-utils && \
               yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo'"

# (3) 查看docker-ce所有可安装版本
yum list docker-ce --showduplicates
 * updates: mirrors.tuna.tsinghua.edu.cn
Loading mirror speeds from cached hostfile
Loaded plugins: fastestmirror
 * extras: mirrors.tuna.tsinghua.edu.cn
...
docker-ce.x86_64          3:20.10.20-3.el7          docker-ce-stable
docker-ce.x86_64          3:20.10.21-3.el7          docker-ce-stable	# 这里是最新的

# (4) 安装最新版
[root@node-1 ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='yum install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin'"

# (5) 安装指定版本, 推荐
# 语法：yum install docker-ce-<VERSION_STRING> docker-ce-cli-<VERSION_STRING> containerd.io docker-compose-plugin
# 示例: yum install docker-ce-20.10.14 docker-ce-cli-20.10.14 containerd.io docker-compose-plugin
[root@node-1 ansible]# Version=20.10.21
[root@node-1 ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='yum install -y docker-ce-${Version} \
                              docker-ce-cli-${Version} \
                              containerd.io \
                              docker-compose-plugin'"

# (6) 所有节点创建Docker配置文件
[root@node-1 ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='mkdir -p /etc/docker ; \
               echo {} > /etc/docker/daemon.json'"

# (7) 启动Docker Daemon
[root@node-1 ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='systemctl start docker.service && \
               systemctl enable docker.service'"
    
# (8) 测试Docker Daemon
[root@node-1 ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='docker container run --rm hello-world:latest'"

# (9) 删除hello-world镜像
[root@node-1 ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='docker image rm hello-world:latest'"
```

### 安装 cri-dockerd

Github：[https://github.com/Mirantis/cri-dockerd](https://github.com/Mirantis/cri-dockerd)

**所有节点执行**

```bash
# (1) Ansible主控节点执行：下载RPM包
[root@node-1 ansible]# wget -c https://github.com/Mirantis/cri-dockerd/releases/download/v0.3.1/cri-dockerd-0.3.1-3.el7.x86_64.rpm

# (2) 将RPM包分发到所有节点
[root@node-1 ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='mkdir -p /usr/local/kubernetes/cri'"

[root@localhost ansible]# ansible-playbook play_rsync.yaml \
    -e "host='all'" \
    -e "mode=push" \
    -e "src=./cri-dockerd-0.3.1-3.el7.x86_64.rpm" \
    -e "dest=/usr/local/kubernetes/cri/"

# (3) 所有节点安装RPM包
[root@node-1 ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='yum -y install /usr/local/kubernetes/cri/cri-dockerd-0.3.1-3.el7.x86_64.rpm'"

# (4) 启动服务
[root@node-1 ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='systemctl start cri-docker.service && \
               systemctl enable cri-docker.service && \
               systemctl status cri-docker.service'"
    
# (5) Ansible主控节点执行：删除RPM包
[root@node-1 ansible]# rm -vf cri-dockerd-0.3.1-3.el7.x86_64.rpm
```

### 安装 kube*

文档：

* [https://kubernetes.io/zh-cn/docs/setup/production-environment/tools/kubeadm/install-kubeadm/](https://kubernetes.io/zh-cn/docs/setup/production-environment/tools/kubeadm/install-kubeadm/)
* [https://developer.aliyun.com/mirror/kubernetes](https://developer.aliyun.com/mirror/kubernetes)

**所有节点执行**

```bash
# (1) Ansible主控节点执行：创建kubernetes.repo
# 默认的kubernetes源需要科学上网，所以这里使用阿里云的源来代替,并且将签名验证关闭，否则后面的命令执行时会报错
[root@localhost ansible]# cat > /etc/yum.repos.d/kubernetes.repo <<EOF
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF

# (2) Ansible主控节点执行：查看软件包版本
[root@localhost ansible]# yum list --showduplicates kubeadm kubelet kubectl | grep '1.27'
kubeadm.x86_64                       1.27.0-0                         kubernetes
kubeadm.x86_64                       1.27.1-0                         kubernetes
kubectl.x86_64                       1.27.0-0                         kubernetes
kubectl.x86_64                       1.27.1-0                         kubernetes
kubelet.x86_64                       1.27.0-0                         kubernetes
kubelet.x86_64                       1.27.1-0                         kubernetes

# (3) 确认没问题后，将源推送到所有节点
[root@localhost ansible]# ansible-playbook play_rsync.yaml \
    -e "host='all'" \
    -e "mode=push" \
    -e "src=/etc/yum.repos.d/kubernetes.repo" \
    -e "dest=/etc/yum.repos.d/"

# (4) 安装软件包: kubeadm、kubelet、kubectl
#     注意这还会安装两个依赖包: cri-tools、kubernetes-cni
[root@localhost ansible]# Version=1.27.1
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='yum install -y kubeadm-${Version} \
                              kubelet-${Version} \
                              kubectl-${Version}'"

# (5) 设置kubelet开机自启动
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='systemctl enable kubelet.service'"

# (6) 测试一下crictl工具是否正常，发现报错了
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='crictl ps'"

[root@localhost ansible]# crictl ps
WARN[0000] runtime connect using default endpoints: [unix:///var/run/dockershim.sock unix:///run/containerd/containerd.sock unix:///run/crio/crio.sock unix:///var/run/cri-dockerd.sock]. As the default settings are now deprecated, you should set the endpoint instead. 
ERRO[0000] unable to determine runtime API version: rpc error: code = Unavailable desc = connection error: desc = "transport: Error while dialing dial unix /var/run/dockershim.sock: connect: no such file or directory" 
WARN[0000] image connect using default endpoints: [unix:///var/run/dockershim.sock unix:///run/containerd/containerd.sock unix:///run/crio/crio.sock unix:///var/run/cri-dockerd.sock]. As the default settings are now deprecated, you should set the endpoint instead. 
ERRO[0000] unable to determine image API version: rpc error: code = Unavailable desc = connection error: desc = "transport: Error while dialing dial unix /var/run/dockershim.sock: connect: no such file or directory" 
E1111 14:58:05.277676    2329 remote_runtime.go:557] "ListContainers with filter from runtime service failed" err="rpc error: code = Unimplemented desc = unknown service runtime.v1alpha2.RuntimeService" filter="&ContainerFilter{Id:,State:&ContainerStateValue{State:CONTAINER_RUNNING,},PodSandboxId:,LabelSelector:map[string]string{},}"
FATA[0000] listing containers: rpc error: code = Unimplemented desc = unknown service runtime.v1alpha2.RuntimeService

# (7) 修复crictl错误
[root@node-1 ~]# vim /etc/crictl.yaml
runtime-endpoint: unix:///var/run/cri-dockerd.sock
timeout: 10
debug: false

[root@node-1 ~]# crictl ps
CONTAINER  IMAGE   CREATED  STATE  NAME  ATTEMPT  POD ID   POD

# (8) 推送文件到所有节点
[root@localhost ansible]# ansible-playbook play_rsync.yaml \
    -e "host='all'" \
    -e "mode=push" \
    -e "src=/etc/crictl.yaml" \
    -e "dest=/etc/"

# (9) 再次测试
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='crictl ps'"
```

### 配置 cgroup驱动

文档：[https://kubernetes.io/zh-cn/docs/tasks/administer-cluster/kubeadm/configure-cgroup-driver/](https://kubernetes.io/zh-cn/docs/tasks/administer-cluster/kubeadm/configure-cgroup-driver/)

**所有节点执行**

```bash
# (1) 查看Docker的cgroup驱动
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='docker info | grep Cgroup'"
    
# (2) Ansible主控节点执行：修改Docker的cgroup驱动修改
[root@localhost ansible]# vim /etc/docker/daemon.json
{
    "exec-opts": ["native.cgroupdriver=systemd"]
}

# (3) 推送文件到所有节点
[root@localhost ansible]# ansible-playbook play_rsync.yaml \
    -e "host='all'" \
    -e "mode=push" \
    -e "src=/etc/docker/daemon.json" \
    -e "dest=/etc/docker/"

# (4) 所有节点重启服务
#     cri-docker也必须重启一下，否则后面初始化Master的时候发现大量处于Created的pause容器
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='systemctl restart docker.service && \
               systemctl restart cri-docker.service'"

# (5) 再次查看
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='docker info | grep \'Cgroup Driver: systemd\''"

# kubelet默认使用systemd驱动,无需修改
```

### 准备必须的镜像

文档：[https://kubernetes.io/zh-cn/docs/reference/command-line-tools-reference/kubelet/](https://kubernetes.io/zh-cn/docs/reference/command-line-tools-reference/kubelet/)

**所有节点执行**

```bash
# 查看都需要哪些镜像
[root@localhost ansible]# kubeadm config images list --kubernetes-version=1.27.1
registry.k8s.io/kube-apiserver:v1.27.1
registry.k8s.io/kube-controller-manager:v1.27.1
registry.k8s.io/kube-scheduler:v1.27.1
registry.k8s.io/kube-proxy:v1.27.1
registry.k8s.io/pause:3.9
registry.k8s.io/etcd:3.5.7-0
registry.k8s.io/coredns/coredns:v1.10.1

# --------------------------------------------------------------------------------
# 下载和打包镜像
# 将以上镜像列表保存到images.txt文件，并在一台可以科学上网的机器上执行如下命令
[root@ap-hongkang ~]# cat images.txt | while read line
do
    name=$(echo $line | awk -F/ '{print $NF}' | tr ':' '-')
    docker image pull ${line}
    docker image save ${line} -o ${name}.tar
done
[root@ap-hongkang ~]# tar zcf kubernetes-images-v1.27.1.tar.gz ./*.tar
[root@ap-hongkang ~]# ls -lh kubernetes-images-v1.27.1.tar.gz
-rw-r--r-- 1 root root 206M Nov 14 09:08 kubernetes-images-v1.27.1.tar.gz

# Ansible主控节点拉取镜像，镜像放到下面这个目录中
[root@node-1 ~]# mkdir -p /usr/local/kubernetes/kubeadm

# --------------------------------------------------------------------------------
# 同步镜像到所有的节点
[root@localhost ansible]# ansible-playbook play_rsync.yaml \
    -e "host='all'" \
    -e "mode=push" \
    -e "src=/usr/local/kubernetes/kubeadm" \
    -e "dest=/usr/local/kubernetes/"

[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='cd /usr/local/kubernetes/kubeadm/ && \
               tar zxf *.tar.gz'"
    
# 所有节点导入镜像
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='docker image load -i /usr/local/kubernetes/kubeadm/kube-apiserver-v1.27.1.tar && \
               docker image load -i /usr/local/kubernetes/kubeadm/kube-controller-manager-v1.27.1.tar && \
               docker image load -i /usr/local/kubernetes/kubeadm/kube-scheduler-v1.27.1.tar && \
               docker image load -i /usr/local/kubernetes/kubeadm/kube-proxy-v1.27.1.tar && \
               docker image load -i /usr/local/kubernetes/kubeadm/etcd-3.5.7-0.tar && \
               docker image load -i /usr/local/kubernetes/kubeadm/coredns-v1.10.1.tar && \
               docker image load -i /usr/local/kubernetes/kubeadm/pause-3.9.tar'"
```

<br />

## 安装kubernetes

### 设置Master访问地址

```bash
# 设置Master地址
# (1) 为了以后做高可用，这里需要设置负载均衡的IP或域名，建议设置域名而不是IP
# (2) 我们现在还没有任何的负载均衡，所以可以先利用hosts文件劫持，先做非高可用的，后面再切换成高可用的
# (3) 非高可用模式下: api.k8s.local域名始终指向一个地址: 192.168.48.151

# 添加主机名解析
[root@localhost ansible]# vim play_hosts.yaml
      block: |
        # kubernetes
        192.168.48.151 api.k8s.local
        192.168.48.151 node-1
        192.168.48.152 node-2
        192.168.48.153 node-3
        192.168.48.154 node-4
        
[root@localhost ansible]# ansible-playbook play_hosts.yaml -e "host='all'"
```

### 初始化第一个Master

文档：

* 初始化工作流程：[https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-init/#init-workflow](https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-init/#init-workflow)

* 配置文件文档：[https://kubernetes.io/zh-cn/docs/reference/config-api/kubeadm-config.v1beta3/#resource-types](https://kubernetes.io/zh-cn/docs/reference/config-api/kubeadm-config.v1beta3/#resource-types)

初始化方式：

* 可以使用命令行方式配置参数，也可以输出默认配置文件并修改来配置参数
* 推荐使用配置文件方式，因为执行某些命令的时候命令行模式并不完全支持，比如重新创建`certificate-key`

**方式一：命令行模式**

```bash
# 初始化第一个Master,输出结果参考最下方
[root@node-1 ansible]# kubeadm init \
    --control-plane-endpoint=api.k8s.local:6443 \
    --kubernetes-version=v1.25.4 \
    --pod-network-cidr=10.100.0.0/16 \
    --service-cidr=10.200.0.0/16 \
    --cri-socket unix:///var/run/cri-dockerd.sock \
    --upload-certs \
    --token-ttl=24h
```

**方式二：配置文件模式**

```bash
# (1) 先创建一个目录
[root@node-1 ansible]# mkdir kubeadm_config

# (2) 输出默认的配置文件
[root@node-1 ansible]# kubeadm config print init-defaults > kubeadm_config/kubeadm_init.yaml

# (3) 修改配置
[root@node-1 ansible]# vim kubeadm_config/kubeadm_init.yaml
apiVersion: kubeadm.k8s.io/v1beta3
bootstrapTokens:
- groups:
  - system:bootstrappers:kubeadm:default-node-token
  #token: abcdef.0123456789abcdef                           # (1) 手动指定一个token,在这里我们把它注释掉,会自动生成
  ttl: 24h0m0s
  usages:
  - signing
  - authentication
kind: InitConfiguration
localAPIEndpoint:
  #advertiseAddress: 1.2.3.4                                # (2) 手动指定节点在集群中的暴露地址,在这里我们把它注释掉,会自动填充本节点IP
  bindPort: 6443
nodeRegistration:
  criSocket: unix:///var/run/cri-dockerd.sock               # (3) 修改为cri-docker的socket地址
  imagePullPolicy: IfNotPresent
  #name: node                                               # (4) 手动指定节点名称,在这里我们把它注释掉,会自动填充为节点主机名
  taints: null
certificateKey: null                                        # (5) 指定一个密钥,在这里设置为null,会自动填充
---
apiServer:
  timeoutForControlPlane: 4m0s
apiVersion: kubeadm.k8s.io/v1beta3
certificatesDir: /etc/kubernetes/pki
clusterName: kubernetes
controllerManager: {}
dns: {}
etcd:
  local:
    dataDir: /var/lib/etcd
imageRepository: registry.k8s.io
kind: ClusterConfiguration
kubernetesVersion: 1.25.4                                   # (5) 修改版本
controlPlaneEndpoint: api.k8s.local                         # (6) 新增一行,指定全局的endpoint
networking:
  dnsDomain: cluster.local
  serviceSubnet: 10.200.0.0/16                              # (7) 修改service网段
  podSubnet: 10.100.0.0/16                                  # (8) 新增一行,修改pod网段
scheduler: {}

# (4) 我们也可以做一个更精简的配置文件
[root@node-1 ansible]# cat kubeadm_config/kubeadm_init.yaml
apiVersion: kubeadm.k8s.io/v1beta3
kind: InitConfiguration
nodeRegistration:
  criSocket: unix:///var/run/cri-dockerd.sock
certificateKey: null
---
apiVersion: kubeadm.k8s.io/v1beta3
kind: ClusterConfiguration
kubernetesVersion: 1.25.4
controlPlaneEndpoint: api.k8s.local
networking:
  dnsDomain: cluster.local
  serviceSubnet: 10.200.0.0/16
  podSubnet: 10.100.0.0/16

# (5) 执行初始化
[root@node-1 ansible]# kubeadm init --config kubeadm_config/kubeadm_init.yaml --upload-certs
```

::: details 输出结果

```bash
[root@node-1 ansible]# kubeadm init --config kubeadm_config/kubeadm_init.yaml --upload-certs

[init] Using Kubernetes version: v1.25.4
[preflight] Running pre-flight checks
[preflight] Pulling images required for setting up a Kubernetes cluster
[preflight] This might take a minute or two, depending on the speed of your internet connection
[preflight] You can also perform this action in beforehand using 'kubeadm config images pull'
[certs] Using certificateDir folder "/etc/kubernetes/pki"
[certs] Generating "ca" certificate and key
[certs] Generating "apiserver" certificate and key
[certs] apiserver serving cert is signed for DNS names [api.k8s.local kubernetes kubernetes.default kubernetes.default.svc kubernetes.default.svc.cluster.local node-1] and IPs [10.200.0.1 192.168.48.151]
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
[apiclient] All control plane components are healthy after 9.006465 seconds
[upload-config] Storing the configuration used in ConfigMap "kubeadm-config" in the "kube-system" Namespace
[kubelet] Creating a ConfigMap "kubelet-config" in namespace kube-system with the configuration for the kubelets in the cluster
[upload-certs] Storing the certificates in Secret "kubeadm-certs" in the "kube-system" Namespace
[upload-certs] Using certificate key:
9b5125ce11141499ea536f236d90995e2cdf76eec5c2e1da559872a938192623
[mark-control-plane] Marking the node node-1 as control-plane by adding the labels: [node-role.kubernetes.io/control-plane node.kubernetes.io/exclude-from-external-load-balancers]
[mark-control-plane] Marking the node node-1 as control-plane by adding the taints [node-role.kubernetes.io/control-plane:NoSchedule]
[bootstrap-token] Using token: zg2cxd.ouzbd77knv3ukpcb
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

  kubeadm join api.k8s.local:6443 --token zg2cxd.ouzbd77knv3ukpcb \
        --discovery-token-ca-cert-hash sha256:2b0ad51333ecbff01e498adf634e8e0a9b602eedea879099c169a3aa41bde7d4 \
        --control-plane --certificate-key 9b5125ce11141499ea536f236d90995e2cdf76eec5c2e1da559872a938192623

Please note that the certificate-key gives access to cluster sensitive data, keep it secret!
As a safeguard, uploaded-certs will be deleted in two hours; If necessary, you can use
"kubeadm init phase upload-certs --upload-certs" to reload certs afterward.

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join api.k8s.local:6443 --token zg2cxd.ouzbd77knv3ukpcb \
        --discovery-token-ca-cert-hash sha256:2b0ad51333ecbff01e498adf634e8e0a9b602eedea879099c169a3aa41bde7d4
```

:::

**后续操作**

```bash
# (1) 若初始化失败,执行如下命令重置
[root@node-1 ansible]# kubeadm reset -f --cri-socket unix:///var/run/cri-dockerd.sock
[root@node-1 ansible]# rm -rf /etc/cni/net.d/  $HOME/.kube/config

# (2) 创建kubectl配置文件
mkdir -p $HOME/.kube
sudo cp -f /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# (3) 测试kubectl
[root@node-1 ansible]# kubectl get node
NAME     STATUS     ROLES           AGE   VERSION
node-1   NotReady   control-plane   37s   v1.25.4
```

<br />

### 初始化Master参数解析

**token**

```bash
# 查看当前的token
[root@node-1 ansible]# kubeadm token list

# 若token过期，也可以手动创建新的token,并输出node节点加入集群的命令
[root@node-1 ~]# kubeadm token create \
    --ttl 24h \
    --print-join-command \
    --description "The default bootstrap token generated by 'kubeadm init'."
```

![image-20221116141825458](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221116141825458.png)

**discovery-token-ca-cert-hash**

```bash
# discovery-token-ca-cert-hash如何获取?
[root@node-1 ~]# openssl x509 -pubkey -in /etc/kubernetes/pki/ca.crt | \
    openssl rsa -pubin -outform der 2>/dev/null | \
    openssl dgst -sha256 -hex | sed 's/^.* //'

# 输出结果
b59bf7397b0a8f7dee02601c09ab72ff5772ebd109fffcc8f59df35f9baa98d0
```

**certificate-key：私钥**

```bash
# 若以后要新加入Master节点:
# (1) --control-plane 需要添加该参数
# (2) --certificate-key xx 参数可能需要添加也可能不需要添加，如何判断？
#     默认命令行下初始化的Master的需要添加该参数，配置文件下若添加了 certificateKey，则也需要添加
#     这个值若丢失了，则比较棘手，需要创建配置文件，再重新上传证书得到certificateKey
#     但是这个配置文件怎么获取呢?

[root@node-1 ansible]# kubeadm init phase upload-certs --upload-certs --config kubeadm-init.yaml
[upload-certs] Storing the certificates in Secret "kubeadm-certs" in the "kube-system" Namespace
[upload-certs] Using certificate key:
348eee20b73183d2398843b0e63b8c1e37a2386478318615efc9be9f24298cf5
```

### 部署网络插件Calico

**镜像需要在所有节点安装，部署仅需要在任意节点即可**

```bash
# (1) 所有节点创建cni目录
[root@node-1 ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='mkdir -p /usr/local/kubernetes/cni'"

# (2) 下载YAML文件
[root@node-1 ansible]# wget -c https://raw.githubusercontent.com/projectcalico/calico/v3.25.0/manifests/calico.yaml

# (3) 查看一下所需的镜像
[root@node-1 ansible]# cat calico.yaml | grep -i 'image:' | sort -u
          image: docker.io/calico/cni:v3.24.5
          image: docker.io/calico/kube-controllers:v3.24.5
          image: docker.io/calico/node:v3.24.5

# ----------------------------------------------------------------------------------------

# (4) 这一部分镜像不需要科学上网，可以提前下载，也可以在部署过程中自动下载
# 本地下载太慢了，这里依旧使用科学上网方式进行处理
[root@ap-hongkang ~]# docker image pull calico/cni:v3.24.5
[root@ap-hongkang ~]# docker image pull calico/kube-controllers:v3.24.5
[root@ap-hongkang ~]# docker image pull calico/node:v3.24.5

[root@ap-hongkang ~]# docker image save calico/cni:v3.24.5 -o calico-cni-v3.24.5.tar
[root@ap-hongkang ~]# docker image save calico/kube-controllers:v3.24.5 -o calico-kube-controllers-v3.24.5.tar
[root@ap-hongkang ~]# docker image save calico/node:v3.24.5 -o calico-node-v3.24.5.tar

[root@ap-hongkang ~]# tar zcf calico.tar.gz ./calico-*.tar

# (6) 使用Ansible同步镜像到所有的节点并导入
[root@localhost ansible]# ansible-playbook play_rsync.yaml \
    -e "host='all'" \
    -e "mode=push" \
    -e "src=/usr/local/kubernetes/cni" \
    -e "dest=/usr/local/kubernetes/"

[root@node-1 ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='cd /usr/local/kubernetes/cni && tar zxf calico.tar.gz'"
    
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='docker image load -i /usr/local/kubernetes/cni/calico-cni-v3.24.5.tar && \
               docker image load -i /usr/local/kubernetes/cni/calico-kube-controllers-v3.24.5.tar && \
               docker image load -i /usr/local/kubernetes/cni/calico-node-v3.24.5.tar'"

# (7) 部署
[root@localhost ansible]# kubectl apply -f calico.yaml

# (8) 查看
[root@node-1 ansible]# kubectl get pods -A | grep -E 'NAME\b|calico'
NAMESPACE     NAME                                       READY   STATUS    RESTARTS        AGE
kube-system   calico-kube-controllers-798cc86c47-xtdx5   1/1     Running   0               58s
kube-system   calico-node-jsml2                          1/1     Running   0               58s

# (9) 查看Node状态
[root@node-1 ansible]# kubectl get node
NAME     STATUS   ROLES           AGE   VERSION
node-1   Ready    control-plane   28m   v1.25.4
```

### 初始化其他Master节点

```bash
# (1) 初始化第二个Master
# 需要添加--cri-socket参数
[root@node-2 ~]# kubeadm join api.k8s.local:6443 \
    --token zg2cxd.ouzbd77knv3ukpcb \
    --discovery-token-ca-cert-hash sha256:2b0ad51333ecbff01e498adf634e8e0a9b602eedea879099c169a3aa41bde7d4 \
    --control-plane \
    --certificate-key 9b5125ce11141499ea536f236d90995e2cdf76eec5c2e1da559872a938192623 \
    --cri-socket unix:///run/cri-dockerd.sock

# (2) 若初始化失败,执行如下命令重置
[root@node-2 ~]# kubeadm reset -f --cri-socket unix:///var/run/cri-dockerd.sock
[root@node-2 ~]# rm -rf /etc/cni/net.d/  $HOME/.kube/config

# (3) 创建kubectl配置文件
mkdir -p $HOME/.kube
sudo cp -f /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# (4) 测试kubectl
[root@node-2 ~]# kubectl get node
NAME     STATUS   ROLES           AGE    VERSION
node-1   Ready    control-plane   31m    v1.25.4
node-2   Ready    control-plane   105s   v1.25.4
node-3   Ready    control-plane   56s    v1.25.4
```

### 初始化所有Node节点

**初始化Node节点**

```bash
# (1) 初始化所有Node节点
# 需要添加--cri-socket参数
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='k8s_worker'" \
    -e "shell='kubeadm join api.k8s.local:6443 \
                  --token zg2cxd.ouzbd77knv3ukpcb \
                  --discovery-token-ca-cert-hash sha256:2b0ad51333ecbff01e498adf634e8e0a9b602eedea879099c169a3aa41bde7d4 \
                  --cri-socket unix:///run/cri-dockerd.sock'"

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

# (2) 若初始化失败,执行如下命令重置
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='k8s_worker'" \
    -e "shell='kubeadm reset -f --cri-socket unix:///var/run/cri-dockerd.sock && \
               rm -rf /etc/cni/net.d/  \$HOME/.kube/config'"

# (3) 在任意一个Master上执行
[root@node-1 ansible]# kubectl get nodes
NAME     STATUS   ROLES           AGE     VERSION
node-1   Ready    control-plane   7m23s   v1.25.4
node-2   Ready    control-plane   4m26s   v1.25.4
node-3   Ready    control-plane   3m58s   v1.25.4
node-4   Ready    <none>          97s     v1.25.4
```

### 优化Kube-Proxy为ipvs模式

```bash
# 查看当前是否加载了ipvs模块
[root@node-1 ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='lsmod | grep -E 'ip_vs|ip_vs_rr|ip_vs_wrr|ip_vs_sh|nf_conntrack_ipv4''"

# 统计加载的模块数量是否一致, grep后面的数字根据实际情况修改
[root@node-1 ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='lsmod | \
               awk \'{print \$1}\' | \
               grep -E 'ip_vs|ip_vs_rr|ip_vs_wrr|ip_vs_sh|nf_conntrack_ipv4' | \
               wc -l | \
               grep 5'"

# ----------------------------------------------------------------------------------------------------------------------
# 手动加载ipvs模块
# 对于Linux kernel 4.19或更高版本，使用 nf_conntrack 代替 nf_conntrack_ipv4
[root@node-1 ansible]# cat > /etc/sysconfig/modules/ipvs.modules <<EOF
#!/bin/bash
modprobe ip_vs
modprobe ip_vs_rr
modprobe ip_vs_wrr
modprobe ip_vs_sh
modprobe nf_conntrack_ipv4
EOF
[root@node-1 ansible]# chmod 755 /etc/sysconfig/modules/ipvs.modules
[root@node-1 ansible]# bash /etc/sysconfig/modules/ipvs.modules
[root@node-1 ansible]# lsmod | awk '{print $1}' | grep -E 'ip_vs|ip_vs_rr|ip_vs_wrr|ip_vs_sh|nf_conntrack_ipv4'

# 同步到所有节点
[root@node-1 ansible]# ansible-playbook play_rsync.yaml \
    -e "host='all'" \
    -e "mode=push" \
    -e "src=/etc/sysconfig/modules/ipvs.modules" \
    -e "dest=/etc/sysconfig/modules/ipvs.modules"

# 加载
[root@node-1 ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='chmod 755 /etc/sysconfig/modules/ipvs.modules && \
               bash /etc/sysconfig/modules/ipvs.modules'"

# ----------------------------------------------------------------------------------------------------------------------
# 修改Kube-Proxy ConfigMap配置
[root@node-1 ansible]# kubectl -n kube-system edit configmap kube-proxy
mode: "ipvs"

# 先看一下所有的kube-proxy服务
[root@node-1 ansible]# kubectl -n kube-system get pods | grep -E 'NAME|kube-proxy'
NAME                                       READY   STATUS    RESTARTS        AGE
kube-proxy-dpt2z                           1/1     Running   0               141m
kube-proxy-g2jv6                           1/1     Running   0               141m
kube-proxy-h9xcw                           1/1     Running   0               141m
kube-proxy-hjf8q                           1/1     Running   0               141m

# 重启
[root@node-1 ansible]# kubectl -n kube-system get pods | grep -E 'kube-proxy' | awk '{print $1}' | while read line
    do kubectl -n kube-system delete pod ${line}
done
pod "kube-proxy-dpt2z" deleted
pod "kube-proxy-g2jv6" deleted
pod "kube-proxy-h9xcw" deleted
pod "kube-proxy-hjf8q" deleted

# 查看日志
[root@node-1 ansible]# kubectl -n kube-system get pods | grep -E 'NAME|kube-proxy'
NAME                                       READY   STATUS    RESTARTS        AGE
kube-proxy-lm47p                           1/1     Running   0               12s
kube-proxy-mxhdb                           1/1     Running   0               11s
kube-proxy-vgvhk                           1/1     Running   0               9s
kube-proxy-x56mt                           1/1     Running   0               11s

[root@node-1 ansible]# kubectl -n kube-system logs kube-proxy-lm47p | grep ipvs
I1115 04:12:51.946768       1 server_others.go:269] "Using ipvs Proxier"
I1115 04:12:51.946815       1 server_others.go:271] "Creating dualStackProxier for ipvs"
```

<br />

## 安装客户端工具

### 安装Etcd客户端工具

```bash
# 查看版本
[root@node-1 ansible]# cat /etc/kubernetes/manifests/etcd.yaml  | grep 'image:'
    image: registry.k8s.io/etcd:3.5.5-0
    
# 下载和解压软件包
[root@localhost ansible]# Version=v3.5.5
[root@localhost ansible]# wget -c https://github.com/etcd-io/etcd/releases/download/${Version}/etcd-${Version}-linux-amd64.tar.gz
[root@node-1 ~]# tar zxf etcd-${Version}-linux-amd64.tar.gz -C /usr/local/
[root@node-1 ansible]# rm -vf etcd-${Version}-linux-amd64.tar.gz

# 分发到所有Master节点
[root@localhost ansible]# ansible-playbook play_rsync.yaml \
    -e "host='k8s_master'" \
    -e "mode=push" \
    -e "src=/usr/local/etcd-${Version}-linux-amd64" \
    -e "dest=/usr/local/"

# 制作软连接,这里我们只需要软连接客户端工具即可,服务端不需要软连接
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='k8s_master'" \
    -e "shell='ln -s /usr/local/etcd-${Version}-linux-amd64/etcdctl /usr/local/bin/etcdctl && \
               ln -s /usr/local/etcd-${Version}-linux-amd64/etcdutl /usr/local/bin/etcdutl'"

# 查看版本
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='k8s_master'" \
    -e "shell='etcdctl version && etcdutl version'"

# ------------------------------------------------------------------------------------------------

# 测试CLI工具
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
| 4d41869ad6a15c0e | started | node-1 | https://192.168.48.151:2380 | https://192.168.48.151:2379 |      false |
| 5282584c0a01e65c | started | node-3 | https://192.168.48.153:2380 | https://192.168.48.153:2379 |      false |
| b9512e7f3523e451 | started | node-2 | https://192.168.48.152:2380 | https://192.168.48.152:2379 |      false |
+------------------+---------+--------+-----------------------------+-----------------------------+------------+

# 批量测试CLI工具
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='k8s_master'" \
    -e "shell='etcdctl \
                   --endpoints=https://127.0.0.1:2379 \
                   --cacert=/etc/kubernetes/pki/etcd/ca.crt \
                   --cert=/etc/kubernetes/pki/apiserver-etcd-client.crt \
                   --key=/etc/kubernetes/pki/apiserver-etcd-client.key \
                   -w table \
               member list'"

# ------------------------------------------------------------------------------------------------

# 设置环境变量
[root@node-1 ~]# vim ~/.bashrc
export ETCDCTL_ENDPOINTS=https://192.168.48.151:2379,https://192.168.48.152:2379,https://192.168.48.153:2379
export ETCDCTL_CACERT=/etc/kubernetes/pki/etcd/ca.crt
export ETCDCTL_CERT=/etc/kubernetes/pki/apiserver-etcd-client.crt
export ETCDCTL_KEY=/etc/kubernetes/pki/apiserver-etcd-client.key

[root@node-1 ~]# source ~/.bashrc
[root@node-1 ~]# etcdctl member list -w table
+------------------+---------+--------+-----------------------------+-----------------------------+------------+
|        ID        | STATUS  |  NAME  |         PEER ADDRS          |        CLIENT ADDRS         | IS LEARNER |
+------------------+---------+--------+-----------------------------+-----------------------------+------------+
| 4d41869ad6a15c0e | started | node-1 | https://192.168.48.151:2380 | https://192.168.48.151:2379 |      false |
| 5282584c0a01e65c | started | node-3 | https://192.168.48.153:2380 | https://192.168.48.153:2379 |      false |
| b9512e7f3523e451 | started | node-2 | https://192.168.48.152:2380 | https://192.168.48.152:2379 |      false |
+------------------+---------+--------+-----------------------------+-----------------------------+------------+
```

<br />

### 安装ipvs客户端工具

```bash
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='yum -y install ipvsadm ipset'"
```

### 安装Calico客户端工具

```bash
# 查看一下版本
[root@node-1 ansible]# kubectl -n kube-system get deploy calico-kube-controllers -o yaml | grep image:
        image: docker.io/calico/kube-controllers:v3.24.5

# 下载客户端
[root@node-1 ansible]# wget -c https://github.com/projectcalico/calico/releases/download/v3.24.5/calicoctl-linux-amd64
[root@node-1 ansible]# mv calicoctl-linux-amd64 /usr/local/bin/calicoctl
[root@node-1 ansible]# chmod 755 /usr/local/bin/calicoctl

# 测试
[root@node-1 ~]# calicoctl get nodes
NAME     
node-1   
node-2   
node-3   
node-4 

# 分发到所有Master节点
[root@localhost ansible]# ansible-playbook play_rsync.yaml \
    -e "host='k8s_master'" \
    -e "mode=push" \
    -e "src=/usr/local/bin/calicoctl" \
    -e "dest=/usr/local/bin/calicoctl"
    
# 测试
[root@localhost ansible]# ansible-playbook play_shell.yaml \
    -e "host='k8s_master'" \
    -e "shell='calicoctl get nodes'"
```

<br />

## 组件高可用配置

### 部署高可用Etcd集群

需要保证至少3个Etcd节点即可

<br />

### 部署高可用APIServer

思路：

* 在每一个Master节点上：将APIServer地址解析为本地地址

* 在每一个Worker节点上：使用静态Pod的方式部署Ningx代理到APIServer，将APIServer地址解析为本地地址

**在Worker上部署静态Pod**

::: details (1) 创建静态Pod配置文件

```bash
# 创建一个专门的目录
[root@node-1 ansible]# mkdir kube-apiserver-front-proxy

# (1) 创建静态Pod配置文件
[root@node-1 ansible]# vim kube-apiserver-front-proxy/kube-apiserver-front-proxy.yaml
apiVersion: v1
kind: Pod
metadata:
  name: kube-apiserver-front-proxy
  namespace: kube-system
  labels:
    addonmanager.kubernetes.io/mode: Reconcile
spec:
  hostNetwork: true
  dnsPolicy: ClusterFirstWithHostNet
  nodeSelector:
    kubernetes.io/os: linux
  priorityClassName: system-node-critical
  containers:
  - name: kube-apiserver-front-proxy
    image: docker.io/library/nginx:1.23.2
    imagePullPolicy: IfNotPresent
    resources:
      requests:
        cpu: 25m
        memory: 50M
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
    - name: etc
      mountPath: /etc/nginx
      readOnly: true
  volumes:
  - name: etc
    hostPath:
      path: /etc/kubernetes/kube-apiserver-front-proxy
```

:::

::: details (2) 创建所需的Nginx配置文件

```bash
[root@node-1 ansible]# vim kube-apiserver-front-proxy/nginx.conf
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
    server 192.168.48.151:6443;
    server 192.168.48.152:6443;
    server 192.168.48.153:6443;
  }

  server {
    listen        6443;
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
```

:::

::: details (3) 部署APIServer代理

```bash
# (1) 同步配置
[root@node-1 ansible]# ansible-playbook play_rsync.yaml \
    -e "host='k8s_worker'" \
    -e "mode=push" \
    -e "src=./kube-apiserver-front-proxy" \
    -e "dest=/etc/kubernetes/"

[root@node-1 ansible]# ansible-playbook play_shell.yaml \
    -e "host='k8s_worker'" \
    -e "shell='ln -s /etc/kubernetes/kube-apiserver-front-proxy/kube-apiserver-front-proxy.yaml /etc/kubernetes/manifests/'"

# (2) 重启kubelet
[root@node-1 ansible]# ansible-playbook play_shell.yaml \
    -e "host='k8s_worker'" \
    -e "shell='systemctl restart kubelet.service'"

# (3) 检查端口
[root@node-1 ansible]# ansible-playbook play_shell.yaml \
    -e "host='k8s_worker'" \
    -e "shell='netstat -atlnpu | grep -i listen | grep :6443'"

# (4) 在Master上查看状态
[root@node-1 ansible]# kubectl get pods -A -o wide | grep -E 'NAME|kube-apiserver-front-proxy'
NAMESPACE     NAME                              READY   STATUS    RESTARTS      AGE   IP               NODE
kube-system   kube-apiserver-front-proxy-node-4 1/1     Running   1 (41s ago)   37s   192.168.48.154   node-4
```

:::

::: details (4) 修改所有主机的/etc/hosts

```bash
# (1) 增加一个主机变量
[root@node-1 ansible]# vim hosts.ini
[k8s_master]
node-1  ansible_ssh_host=192.168.48.151  ansible_ssh_pass=123456 apiserver_ip=192.168.48.151
node-2  ansible_ssh_host=192.168.48.152  ansible_ssh_pass=123456 apiserver_ip=192.168.48.152
node-3  ansible_ssh_host=192.168.48.153  ansible_ssh_pass=123456 apiserver_ip=192.168.48.153

[k8s_worker]
node-4  ansible_ssh_host=192.168.48.154  ansible_ssh_pass=123456 apiserver_ip=192.168.48.154

# (2) 修改一下playbook
[root@node-1 ansible]# vim play_hosts.yaml
      block: |
        # kubernetes
        {{ apiserver_ip}} api.k8s.local  ==> 修改这里
        192.168.48.151 node-1
        192.168.48.152 node-2
        192.168.48.153 node-3
        192.168.48.154 node-4

# (3) 在同步hosts文件前，再确认一遍所有主机本地是否监听6443端口
[root@node-1 ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='netstat -atlnpu | grep -i listen | grep :6443'"

# (4) 同步hosts文件
[root@node-1 ansible]# ansible-playbook play_hosts.yaml -e "host='all'"

# (5) 检查
[root@node-1 ansible]# ansible-playbook play_shell.yaml \
    -e "host='all'" \
    -e "shell='grep api.k8s.local /etc/hosts'"
```

:::

<br />

### 部署高可用Calico服务

```bash
# 看一下当前calico服务分布状态，calico-kube-controllers只有1个
[root@node-1 ~]# kubectl get pods -A -o wide | grep -E 'NAME|calico'
NAMESPACE     NAME                      READY STATUS  RESTARTS    AGE  IP             NODE   NOMINATED NODE READINESS GATES
kube-system   calico-kube-controllers-x 1/1   Running 2 (11m ago) 6h8m 10.233.84.136  node-1 <none>         <none>
kube-system   calico-node-6kfqh         1/1   Running 2 (11m ago) 6h8m 192.168.48.151 node-1 <none>         <none>
kube-system   calico-node-97h56         1/1   Running 1 (33m ago) 6h5m 192.168.48.154 node-4 <none>         <none>
kube-system   calico-node-rkdft         1/1   Running 1 (33m ago) 6h8m 192.168.48.152 node-2 <none>         <none>
kube-system   calico-node-s8wcb         1/1   Running 1 (33m ago) 6h7m 192.168.48.153 node-3 <none>         <none>

# 看一下deployment
[root@node-1 ~]# kubectl -n kube-system get deploy
NAME                      READY   UP-TO-DATE   AVAILABLE   AGE
calico-kube-controllers   1/1     1            1           6h12m
coredns                   3/3     3            3           6h14m

# 修改副本为3个或更多
[root@node-1 ~]# kubectl -n kube-system edit deploy calico-kube-controllers
spec:
  progressDeadlineSeconds: 600
  replicas: 3
```

<br />

### 部署高可用DNS服务

```bash
# 看一下当前dns服务分布状态，两个全部启动在node-1上了
[root@node-1 ~]# kubectl -n kube-system get pods -o wide | grep -E 'NAME\b|dns'
NAME                      READY   STATUS    RESTARTS      AGE     IP               NODE     NOMINATED NODE   READINESS GATES
coredns-565d847f94-4pxrr  1/1     Running   1 (20m ago)   5h58m   10.233.84.132    node-1   <none>           <none>
coredns-565d847f94-6jwjd  1/1     Running   1 (20m ago)   5h58m   10.233.84.134    node-1   <none>           <none>

# 看一下deployment
[root@node-1 ~]# kubectl -n kube-system get deploy
NAME                      READY   UP-TO-DATE   AVAILABLE   AGE
calico-kube-controllers   0/1     1            0           6h2m
coredns                   1/3     3            1           6h4m

# 修改副本为3个或更多
[root@node-1 ~]# kubectl -n kube-system edit deploy coredns
spec:
  progressDeadlineSeconds: 600
  replicas: 3
```

<br />

### 最终高可用状态检查

```bash
[root@node-1 ~]# kubectl get pods -A -o wide
NAMESPACE     NAME                           READY   STATUS    RESTARTS      AGE     IP               NODE  
kube-system   calico-kube-controllers-798cc8 1/1     Running   0             49s     10.233.139.65    node-3
kube-system   calico-kube-controllers-798cc8 1/1     Running   2 (16m ago)   6h14m   10.233.84.136    node-1
kube-system   calico-kube-controllers-798cc8 1/1     Running   0             7m47s   10.233.217.65    node-4
kube-system   calico-node-6kfqh              1/1     Running   2 (16m ago)   6h14m   192.168.48.151   node-1
kube-system   calico-node-97h56              1/1     Running   1 (38m ago)   6h10m   192.168.48.154   node-4
kube-system   calico-node-rkdft              1/1     Running   1 (38m ago)   6h13m   192.168.48.152   node-2
kube-system   calico-node-s8wcb              1/1     Running   1 (38m ago)   6h12m   192.168.48.153   node-3
kube-system   coredns-565d847f94-4pxrr       1/1     Running   2 (16m ago)   6h16m   10.233.84.137    node-1
kube-system   coredns-565d847f94-6jwjd       1/1     Running   2 (16m ago)   6h16m   10.233.84.135    node-1
kube-system   coredns-565d847f94-dfhmg       1/1     Running   0             12m     10.233.247.1     node-2
kube-system   etcd-node-1                    1/1     Running   2 (16m ago)   6h16m   192.168.48.151   node-1
kube-system   etcd-node-2                    1/1     Running   1 (38m ago)   6h13m   192.168.48.152   node-2
kube-system   etcd-node-3                    1/1     Running   1 (38m ago)   6h12m   192.168.48.153   node-3
kube-system   kube-apiserver-node-1          1/1     Running   2 (16m ago)   6h16m   192.168.48.151   node-1
kube-system   kube-apiserver-node-2          1/1     Running   1 (38m ago)   6h12m   192.168.48.152   node-2
kube-system   kube-apiserver-node-3          1/1     Running   1 (38m ago)   6h12m   192.168.48.153   node-3
kube-system   kube-controller-manager-node-1 1/1     Running   2 (16m ago)   6h16m   192.168.48.151   node-1
kube-system   kube-controller-manager-node-2 1/1     Running   1 (38m ago)   6h11m   192.168.48.152   node-2
kube-system   kube-controller-manager-node-3 1/1     Running   1 (38m ago)   6h11m   192.168.48.153   node-3
kube-system   kube-proxy-2b9cn               1/1     Running   1 (38m ago)   6h12m   192.168.48.153   node-3
kube-system   kube-proxy-dxrld               1/1     Running   2 (16m ago)   6h16m   192.168.48.151   node-1
kube-system   kube-proxy-rcjvq               1/1     Running   1 (38m ago)   6h13m   192.168.48.152   node-2
kube-system   kube-proxy-vldd5               1/1     Running   1 (38m ago)   6h10m   192.168.48.154   node-4
kube-system   kube-scheduler-node-1          1/1     Running   3 (16m ago)   6h16m   192.168.48.151   node-1
kube-system   kube-scheduler-node-2          1/1     Running   1 (38m ago)   6h13m   192.168.48.152   node-2
kube-system   kube-scheduler-node-3          1/1     Running   1 (38m ago)   6h12m   192.168.48.153   node-3
```
