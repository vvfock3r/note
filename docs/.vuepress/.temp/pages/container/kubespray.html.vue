<template><div><h2 id="kubernetes" tabindex="-1"><a class="header-anchor" href="#kubernetes" aria-hidden="true">#</a> Kubernetes</h2>
<p>官网：<a href="https://kubernetes.io/" target="_blank" rel="noopener noreferrer">https://kubernetes.io/<ExternalLinkIcon/></a></p>
<h3 id="生产环境部署方式" tabindex="-1"><a class="header-anchor" href="#生产环境部署方式" aria-hidden="true">#</a> 生产环境部署方式</h3>
<p>文档：<a href="https://kubernetes.io/docs/setup/production-environment/tools/" target="_blank" rel="noopener noreferrer">https://kubernetes.io/docs/setup/production-environment/tools/<ExternalLinkIcon/></a></p>
<table>
<thead>
<tr>
<th>部署方式</th>
<th>复杂性</th>
<th>灵活性</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>Kubespray</td>
<td>简单</td>
<td>自定义</td>
<td>基于<code v-pre>kubeadm</code>和<code v-pre>Ansible</code>来部署</td>
</tr>
<tr>
<td>kubeadm</td>
<td>适中</td>
<td>自定义</td>
<td>Kubeadm 是一个快捷搭建kubernetes(k8s)的安装工具</td>
</tr>
<tr>
<td>二进制部署</td>
<td>复杂</td>
<td>灵活</td>
<td>二进制部署</td>
</tr>
<tr>
<td>kops</td>
<td>未知</td>
<td>未知</td>
<td>在AWS上安装Kubernetes群集，本文档不考虑这种方式</td>
</tr>
</tbody>
</table>
<h3 id="使用kubespray部署生产集群" tabindex="-1"><a class="header-anchor" href="#使用kubespray部署生产集群" aria-hidden="true">#</a> 使用kubespray部署生产集群</h3>
<h4 id="前置要求" tabindex="-1"><a class="header-anchor" href="#前置要求" aria-hidden="true">#</a> 前置要求</h4>
<ul>
<li>在部署过程中需要去海外下载镜像，需要主机能够科学上网</li>
<li>支持主流系统，内存最低2G，CPU最低2核，磁盘30G以上</li>
</ul>
<h4 id="节点规划" tabindex="-1"><a class="header-anchor" href="#节点规划" aria-hidden="true">#</a> 节点规划</h4>
<p>本次安装节点规划，在安装前可以动态调整</p>
<table>
<thead>
<tr>
<th>主机名</th>
<th>功能</th>
<th>操作系统</th>
<th>内存</th>
<th>CPU</th>
<th>静态IP</th>
</tr>
</thead>
<tbody>
<tr>
<td>node0</td>
<td>Master节点， Etcd节点</td>
<td>Centos 7.9</td>
<td>4G</td>
<td>2核</td>
<td>192.168.48.140</td>
</tr>
<tr>
<td>node1</td>
<td>Master节点，Etcd节点，Node节点</td>
<td>Centos 7.9</td>
<td>4G</td>
<td>2核</td>
<td>192.168.48.141</td>
</tr>
<tr>
<td>node2</td>
<td>Node节点， Etcd节点</td>
<td>Centos 7.9</td>
<td>4G</td>
<td>2核</td>
<td>192.168.48.142</td>
</tr>
</tbody>
</table>
<blockquote>
<p>根据以上信息安装操作系统，安装完成后不需要做任何操作</p>
</blockquote>
<h4 id="更新系统" tabindex="-1"><a class="header-anchor" href="#更新系统" aria-hidden="true">#</a> 更新系统</h4>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code>yum update -y <span class="token operator">&amp;&amp;</span> <span class="token function">reboot</span>

<span class="token comment"># 更新前系统版本: cat /etc/redhat-release </span>
<span class="token comment"># CentOS Linux release 7.4.1708 (Core)</span>

<span class="token comment"># 更新后系统版本: cat /etc/redhat-release </span>
<span class="token comment"># CentOS Linux release 7.9.2009 (Core)</span>
</code></pre></div><h4 id="设置静态内网ip-可选" tabindex="-1"><a class="header-anchor" href="#设置静态内网ip-可选" aria-hidden="true">#</a> 设置静态内网IP（可选）</h4>
<p>如果使用<code v-pre>VMware Workstation</code>等在本地部署，需要保证使用静态内网IP地址</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># vi /etc/sysconfig/network-scripts/ifcfg-ens33</span>
<span class="token assign-left variable">TYPE</span><span class="token operator">=</span><span class="token string">"Ethernet"</span>
<span class="token assign-left variable">PROXY_METHOD</span><span class="token operator">=</span><span class="token string">"none"</span>
<span class="token assign-left variable">BROWSER_ONLY</span><span class="token operator">=</span><span class="token string">"no"</span>
<span class="token assign-left variable">BOOTPROTO</span><span class="token operator">=</span><span class="token string">"static"</span>		<span class="token comment"># 设置为静态IP</span>
<span class="token assign-left variable">DEFROUTE</span><span class="token operator">=</span><span class="token string">"yes"</span>
<span class="token assign-left variable">IPV4_FAILURE_FATAL</span><span class="token operator">=</span><span class="token string">"no"</span>
<span class="token assign-left variable">IPV6INIT</span><span class="token operator">=</span><span class="token string">"yes"</span>
<span class="token assign-left variable">IPV6_AUTOCONF</span><span class="token operator">=</span><span class="token string">"yes"</span>
<span class="token assign-left variable">IPV6_DEFROUTE</span><span class="token operator">=</span><span class="token string">"yes"</span>
<span class="token assign-left variable">IPV6_FAILURE_FATAL</span><span class="token operator">=</span><span class="token string">"no"</span>
<span class="token assign-left variable">IPV6_ADDR_GEN_MODE</span><span class="token operator">=</span><span class="token string">"stable-privacy"</span>
<span class="token assign-left variable">NAME</span><span class="token operator">=</span><span class="token string">"ens33"</span>
<span class="token assign-left variable">UUID</span><span class="token operator">=</span><span class="token string">"068dc849-6e8c-4bed-b2de-2fe66c424521"</span>
<span class="token assign-left variable">DEVICE</span><span class="token operator">=</span><span class="token string">"ens33"</span>
<span class="token assign-left variable">ONBOOT</span><span class="token operator">=</span><span class="token string">"yes"</span>			<span class="token comment"># 开启自启</span>
<span class="token assign-left variable">IPADDR</span><span class="token operator">=</span><span class="token number">192.168</span>.48.140	<span class="token comment"># IP，根据实际情况修改</span>
<span class="token assign-left variable">NETMASK</span><span class="token operator">=</span><span class="token number">255.255</span>.255.0	<span class="token comment"># 子网掩码</span>
<span class="token assign-left variable">GATEWAY</span><span class="token operator">=</span><span class="token number">192.168</span>.48.2	<span class="token comment"># 默认网关，根据实际情况修改</span>
<span class="token assign-left variable">DNS1</span><span class="token operator">=</span><span class="token number">114.114</span>.114.114    <span class="token comment"># DNS1</span>
<span class="token assign-left variable">DNS2</span><span class="token operator">=</span><span class="token number">8.8</span>.8.8            <span class="token comment"># DNS2</span>

<span class="token comment"># 重启网络</span>
systemctl restart network.service

<span class="token comment"># 测试网络</span>
<span class="token function">ping</span> -c <span class="token number">4</span> www.baidu.com
</code></pre></div><h4 id="系统初始化" tabindex="-1"><a class="header-anchor" href="#系统初始化" aria-hidden="true">#</a> 系统初始化</h4>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 修改主机名</span>
hostnamectl set-hostname node0
hostnamectl set-hostname node1
hostnamectl set-hostname node2

<span class="token comment"># 关闭selinux</span>
setenforce <span class="token number">0</span>
<span class="token function">sed</span> -ri <span class="token string">'s/(^SELINUX=)(.*)/\1disabled/'</span> /etc/selinux/config

<span class="token comment"># 关闭防火墙</span>
systemctl stop firewalld <span class="token operator">&amp;&amp;</span> systemctl disable firewalld

<span class="token comment"># 设置iptables规则</span>
iptables -F <span class="token operator">&amp;&amp;</span> iptables -X <span class="token operator">&amp;&amp;</span> iptables -F -t nat <span class="token operator">&amp;&amp;</span> iptables -X -t nat <span class="token operator">&amp;&amp;</span> iptables -P FORWARD ACCEPT

<span class="token comment"># 关闭swap</span>
swapoff -a <span class="token operator">&amp;&amp;</span> <span class="token function">vi</span> /etc/fstab
<span class="token function">free</span> -m <span class="token operator">&amp;&amp;</span> <span class="token function">cat</span> /etc/fstab

<span class="token comment"># K8S参数设置</span>
<span class="token function">cat</span> <span class="token operator">></span> /etc/sysctl.d/kubernetes.conf <span class="token operator">&lt;&lt;</span><span class="token string">EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_nonlocal_bind = 1
net.ipv4.ip_forward = 1
vm.swappiness = 0
vm.overcommit_memory = 1
EOF</span>
<span class="token comment"># 使配置生效</span>
sysctl -p /etc/sysctl.d/kubernetes.conf

<span class="token comment"># 时间同步</span>
yum <span class="token function">install</span> ntpdate -y
ntpdate time.windows.com

<span class="token comment"># 移除docker相关软件包（可选）</span>
yum remove -y docker* <span class="token operator">&amp;&amp;</span> <span class="token function">rm</span> -vf /etc/docker/daemon.json
</code></pre></div><h4 id="配置ansible主控节点" tabindex="-1"><a class="header-anchor" href="#配置ansible主控节点" aria-hidden="true">#</a> 配置Ansible主控节点</h4>
<p>Ansible主控节点部署在哪里都可以，只要能控制K8s Node节点即可</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 生成keygen（执行ssh-keygen，一路回车下去）</span>
ssh-keygen

<span class="token comment"># 配置SSH免密登录</span>
ssh-copy-id root@192.168.48.140
ssh-copy-id root@192.168.48.141
ssh-copy-id root@192.168.48.142

<span class="token comment"># 验证免密登录</span>
<span class="token function">ssh</span> root@192.168.48.140  <span class="token string">"hostname"</span>
<span class="token function">ssh</span> root@192.168.48.141  <span class="token string">"hostname"</span>
<span class="token function">ssh</span> root@192.168.48.142  <span class="token string">"hostname"</span>

<span class="token comment"># 安装基础软件</span>
yum <span class="token function">install</span> epel-release python3 <span class="token function">git</span> <span class="token function">wget</span> -y

<span class="token comment"># 升级pip到最新版(可选,推荐)</span>
pip3 <span class="token function">install</span> --upgrade pip -i https://mirrors.aliyun.com/pypi/simple

<span class="token comment"># 下载kubespray源码</span>
<span class="token comment"># 若因网络下载失败，可以使用我们准备好的代理（科学上网），wget -c后面添加 -e "http_proxy=http://192.168.5.103:7890"</span>
<span class="token function">wget</span> -c https://github.com/kubernetes-sigs/kubespray/archive/v2.15.0.tar.gz 
<span class="token function">tar</span> zxf v2.15.0.tar.gz <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> kubespray-2.15.0 <span class="token operator">&amp;&amp;</span> <span class="token function">cat</span> requirements.txt
pip3 <span class="token function">install</span> -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple

<span class="token comment"># 生成项目配置</span>
<span class="token function">cp</span> -rpf inventory/sample inventory/mycluster

<span class="token comment"># 使用真实的hostname（否则会自动把你的hostname改成node1/node2...这种哦）</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">USE_REAL_HOSTNAME</span><span class="token operator">=</span>true

<span class="token comment"># 指定配置文件位置</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">CONFIG_FILE</span><span class="token operator">=</span>inventory/mycluster/hosts.yaml

<span class="token comment"># 定义ip列表（你的服务器内网ip地址列表，3台及以上，前两台默认为master节点）</span>
<span class="token builtin class-name">declare</span> -a <span class="token assign-left variable">IPS</span><span class="token operator">=</span><span class="token punctuation">(</span>
  <span class="token number">192.168</span>.48.140
  <span class="token number">192.168</span>.48.141
  <span class="token number">192.168</span>.48.142
<span class="token punctuation">)</span>

<span class="token comment"># 生成配置文件</span>
python3 contrib/inventory_builder/inventory.py <span class="token variable">${IPS<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span>
DEBUG: Adding group all
DEBUG: Adding group kube-master
DEBUG: Adding group kube-node
DEBUG: Adding group etcd
DEBUG: Adding group k8s-cluster
DEBUG: Adding group calico-rr
DEBUG: adding <span class="token function">host</span> node0 to group all
DEBUG: adding <span class="token function">host</span> node1 to group all
DEBUG: adding <span class="token function">host</span> node2 to group all
DEBUG: adding <span class="token function">host</span> node0 to group etcd
DEBUG: adding <span class="token function">host</span> node1 to group etcd
DEBUG: adding <span class="token function">host</span> node2 to group etcd
DEBUG: adding <span class="token function">host</span> node0 to group kube-master
DEBUG: adding <span class="token function">host</span> node1 to group kube-master
DEBUG: adding <span class="token function">host</span> node0 to group kube-node
DEBUG: adding <span class="token function">host</span> node1 to group kube-node
DEBUG: adding <span class="token function">host</span> node2 to group kube-node
</code></pre></div><h4 id="节点个性化配置" tabindex="-1"><a class="header-anchor" href="#节点个性化配置" aria-hidden="true">#</a> 节点个性化配置</h4>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 定制化配置文件</span>
<span class="token comment"># 1. 节点组织配置（这里可以调整每个节点的角色）</span>
<span class="token function">vi</span> inventory/mycluster/hosts.yaml
all:
  hosts:
    node0:
      ansible_host: <span class="token number">192.168</span>.48.140
      ip: <span class="token number">192.168</span>.48.140
      access_ip: <span class="token number">192.168</span>.48.140
    node1:
      ansible_host: <span class="token number">192.168</span>.48.141
      ip: <span class="token number">192.168</span>.48.141
      access_ip: <span class="token number">192.168</span>.48.141
    node2:
      ansible_host: <span class="token number">192.168</span>.48.142
      ip: <span class="token number">192.168</span>.48.142
      access_ip: <span class="token number">192.168</span>.48.142
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
      hosts: <span class="token punctuation">{</span><span class="token punctuation">}</span>
      
<span class="token comment"># 2. containerd配置（教程使用containerd作为容器引擎）</span>
<span class="token function">vi</span> inventory/mycluster/group_vars/all/containerd.yml

<span class="token comment"># 3. 全局配置（可以在这配置http(s)代理实现外网访问）</span>
<span class="token function">vi</span> inventory/mycluster/group_vars/all/all.yml
http_proxy: <span class="token string">"http://192.168.5.103:7890"</span>     <span class="token comment"># 配置代理</span>
https_proxy: <span class="token string">"http://192.168.5.103:7890"</span>    <span class="token comment"># 配置代理</span>


<span class="token comment"># 4. k8s集群配置（包括设置容器运行时、svc网段、pod网段等）</span>
<span class="token function">vi</span> inventory/mycluster/group_vars/k8s-cluster/k8s-cluster.yml
kube_version: v1.19.7                  <span class="token comment"># K8S版本信息，无需修改（也不要随意修改）</span>
kube_service_addresses: <span class="token number">10.200</span>.0.0/16  <span class="token comment"># 默认为10.233.0.0/18，修改为10.200.0.0/16</span>
kube_pods_subnet: <span class="token number">10.233</span>.0.0/16        <span class="token comment"># 默认10.233.64.0/18，修改为10.233.0.0/16</span>
container_manager: containerd	       <span class="token comment"># 配置容器引擎，默认是docker,修改为containerd</span>

<span class="token comment"># 5. 修改etcd部署类型为host（默认是docker）</span>
<span class="token function">vi</span> inventory/mycluster/group_vars/etcd.yml
etcd_deployment_type: <span class="token function">host</span>      <span class="token comment"># 配置etcd部署方式，默认是docker，如果使用containerd的话，必须使用宿主机部署，即host</span>

<span class="token comment"># 6. 附加组件（ingress、dashboard等）</span>
<span class="token function">vi</span> inventory/mycluster/group_vars/k8s-cluster/addons.yml
dashboard_enabled: <span class="token boolean">true</span>			<span class="token comment"># 修改为true</span>
ingress_nginx_enabled: <span class="token boolean">true</span>		<span class="token comment"># 修改为true</span>
metrics_server_enabled: <span class="token boolean">true</span>    <span class="token comment"># 修改为true</span>
</code></pre></div><h4 id="部署kubernetes集群" tabindex="-1"><a class="header-anchor" href="#部署kubernetes集群" aria-hidden="true">#</a> 部署Kubernetes集群</h4>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 使用tmux(可选)</span>
yum <span class="token function">install</span> tmux -y
tmux new -s k8s_install

<span class="token comment"># 部署Kubernetes集群（这一步执行的时间可能会很长，这里我使用time命令来统计一下时长）</span>
<span class="token function">time</span> ansible-playbook -i inventory/mycluster/hosts.yaml  -b cluster.yml <span class="token comment"># 如果想查看详细信息，添加-vvvv</span>

real    25m49.126s
user    14m56.884s
sys     4m50.167s
</code></pre></div><blockquote>
<p>安装步骤执行时长并不稳定，根据系统配置、网络质量而不同，快则半小时，慢则几个小时</p>
</blockquote>
<h4 id="检查集群状态" tabindex="-1"><a class="header-anchor" href="#检查集群状态" aria-hidden="true">#</a> 检查集群状态</h4>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 查看节点状态(Master节点执行)</span>
kubectl get <span class="token function">node</span>
NAME    STATUS   ROLES    AGE   VERSION
node0   Ready    master   25h   v1.19.7
node1   Ready    master   25h   v1.19.7
node2   Ready    <span class="token operator">&lt;</span>none<span class="token operator">></span>   24h   v1.19.7

<span class="token comment"># 查看Master节点组件状态(Master节点执行)</span>
kubectl get cs
Warning: v1 ComponentStatus is deprecated <span class="token keyword">in</span> v1.19+
NAME                 STATUS    MESSAGE             ERROR
scheduler            Healthy   ok                  
controller-manager   Healthy   ok                  
etcd-2               Healthy   <span class="token punctuation">{</span><span class="token string">"health"</span><span class="token builtin class-name">:</span><span class="token string">"true"</span><span class="token punctuation">}</span>   
etcd-1               Healthy   <span class="token punctuation">{</span><span class="token string">"health"</span><span class="token builtin class-name">:</span><span class="token string">"true"</span><span class="token punctuation">}</span>   
etcd-0               Healthy   <span class="token punctuation">{</span><span class="token string">"health"</span><span class="token builtin class-name">:</span><span class="token string">"true"</span><span class="token punctuation">}</span>

<span class="token comment"># 查看Pod状态</span>
kubectl get pods -A
</code></pre></div><h4 id="清理代理设置" tabindex="-1"><a class="header-anchor" href="#清理代理设置" aria-hidden="true">#</a> 清理代理设置</h4>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 清理Containerd HTTP代理</span>
<span class="token function">rm</span> -vf /etc/systemd/system/containerd.service.d/http-proxy.conf
systemctl daemon-reload
systemctl restart containerd

<span class="token comment"># 清理Yum HTTP代理(把grep出来的代理配置手动删除即可)</span>
<span class="token function">grep</span> <span class="token number">7890</span> -r /etc/yum*
</code></pre></div><h4 id="访问dashboard" tabindex="-1"><a class="header-anchor" href="#访问dashboard" aria-hidden="true">#</a> 访问dashboard</h4>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 创建service</span>
<span class="token function">cat</span> <span class="token operator">></span> dashboard-svc.yaml <span class="token operator">&lt;&lt;</span><span class="token string">EOF
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
EOF</span>

kubectl apply -f dashboard-svc.yaml

<span class="token comment"># 访问dashboard</span>
为了集群安全，从 <span class="token number">1.7</span> 开始，dashboard 只允许通过 https 访问，我们使用nodeport的方式暴露服务，可以使用 https://NodeIP:NodePort 地址访问 
关于自定义证书 默认dashboard的证书是自动生成的，肯定是非安全的证书，如果大家有域名和对应的安全证书可以自己替换掉。使用安全的域名方式访问dashboard。 
在dashboard-all.yaml中增加dashboard启动参数，可以指定证书文件，其中证书文件是通过secret注进来的。
- –tls-cert-file
- dashboard.cer
- –tls-key-file
- dashboard.key

<span class="token comment"># 创建service account</span>
kubectl create sa dashboard-admin -n kube-system

<span class="token comment"># 创建角色绑定关系</span>
kubectl create clusterrolebinding dashboard-admin --clusterrole<span class="token operator">=</span>cluster-admin --serviceaccount<span class="token operator">=</span>kube-system:dashboard-admin

<span class="token comment"># 查看dashboard-admin的secret名字</span>
<span class="token assign-left variable">ADMIN_SECRET</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>kubectl get secrets -n kube-system <span class="token operator">|</span> <span class="token function">grep</span> dashboard-admin <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">'{print $1}'</span><span class="token variable">)</span></span>

<span class="token comment"># 打印secret的token</span>
kubectl describe secret -n kube-system <span class="token variable">${ADMIN_SECRET}</span> <span class="token operator">|</span> <span class="token function">grep</span> -E <span class="token string">'^token'</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">'{print $2}'</span>

<span class="token comment"># 浏览器访问</span>
https://192.168.48.100:30000/
</code></pre></div><h4 id="faq" tabindex="-1"><a class="header-anchor" href="#faq" aria-hidden="true">#</a> FAQ</h4>
<p><strong>下载文件出错</strong></p>
<p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211229101545405.png" alt="image-20211229101545405"></p>
<blockquote>
<p>下载文件出错，从以下方面排查</p>
<ul>
<li>检查本地网络、代理服务器是否正常</li>
<li>检查配置是否写错
<ul>
<li>比如将代理服务器的<code v-pre>http://</code>误写成了<code v-pre>https://</code></li>
<li>比如将代理服务器的<code v-pre>http://</code>误写成<code v-pre>http:/</code></li>
</ul>
</li>
</ul>
</blockquote>
<p><strong>scheduler和controller-manager组件状态为Unhealthy</strong></p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># 修复Unhealthy(在所有Master上操作)</span>
<span class="token function">vi</span> /etc/kubernetes/manifests/kube-controller-manager.yaml
    <span class="token comment"># - --port=0    # 将这一行注释掉</span>
<span class="token function">vi</span> /etc/kubernetes/manifests/kube-scheduler.yaml
    <span class="token comment"># - --port=0    # 将这一行注释掉</span>

<span class="token comment"># 重启kubelet</span>
systemctl restart kubelet
</code></pre></div></div></template>
