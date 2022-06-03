import{_ as t,r as o,o as p,c,d as n,a as e,e as s,b as l}from"./app.8347a01d.js";const r={},i=n("h2",{id:"kubernetes",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#kubernetes","aria-hidden":"true"},"#"),s(" Kubernetes")],-1),d=s("\u5B98\u7F51\uFF1A"),k={href:"https://kubernetes.io/",target:"_blank",rel:"noopener noreferrer"},u=s("https://kubernetes.io/"),m=n("h3",{id:"\u751F\u4EA7\u73AF\u5883\u90E8\u7F72\u65B9\u5F0F",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u751F\u4EA7\u73AF\u5883\u90E8\u7F72\u65B9\u5F0F","aria-hidden":"true"},"#"),s(" \u751F\u4EA7\u73AF\u5883\u90E8\u7F72\u65B9\u5F0F")],-1),h=s("\u6587\u6863\uFF1A"),b={href:"https://kubernetes.io/docs/setup/production-environment/tools/",target:"_blank",rel:"noopener noreferrer"},g=s("https://kubernetes.io/docs/setup/production-environment/tools/"),f=l(`<table><thead><tr><th>\u90E8\u7F72\u65B9\u5F0F</th><th>\u590D\u6742\u6027</th><th>\u7075\u6D3B\u6027</th><th>\u63CF\u8FF0</th></tr></thead><tbody><tr><td>Kubespray</td><td>\u7B80\u5355</td><td>\u81EA\u5B9A\u4E49</td><td>\u57FA\u4E8E<code>kubeadm</code>\u548C<code>Ansible</code>\u6765\u90E8\u7F72</td></tr><tr><td>kubeadm</td><td>\u9002\u4E2D</td><td>\u81EA\u5B9A\u4E49</td><td>Kubeadm \u662F\u4E00\u4E2A\u5FEB\u6377\u642D\u5EFAkubernetes(k8s)\u7684\u5B89\u88C5\u5DE5\u5177</td></tr><tr><td>\u4E8C\u8FDB\u5236\u90E8\u7F72</td><td>\u590D\u6742</td><td>\u7075\u6D3B</td><td>\u4E8C\u8FDB\u5236\u90E8\u7F72</td></tr><tr><td>kops</td><td>\u672A\u77E5</td><td>\u672A\u77E5</td><td>\u5728AWS\u4E0A\u5B89\u88C5Kubernetes\u7FA4\u96C6\uFF0C\u672C\u6587\u6863\u4E0D\u8003\u8651\u8FD9\u79CD\u65B9\u5F0F</td></tr></tbody></table><h3 id="\u4F7F\u7528kubespray\u90E8\u7F72\u751F\u4EA7\u96C6\u7FA4" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528kubespray\u90E8\u7F72\u751F\u4EA7\u96C6\u7FA4" aria-hidden="true">#</a> \u4F7F\u7528kubespray\u90E8\u7F72\u751F\u4EA7\u96C6\u7FA4</h3><h4 id="\u524D\u7F6E\u8981\u6C42" tabindex="-1"><a class="header-anchor" href="#\u524D\u7F6E\u8981\u6C42" aria-hidden="true">#</a> \u524D\u7F6E\u8981\u6C42</h4><ul><li>\u5728\u90E8\u7F72\u8FC7\u7A0B\u4E2D\u9700\u8981\u53BB\u6D77\u5916\u4E0B\u8F7D\u955C\u50CF\uFF0C\u9700\u8981\u4E3B\u673A\u80FD\u591F\u79D1\u5B66\u4E0A\u7F51</li><li>\u652F\u6301\u4E3B\u6D41\u7CFB\u7EDF\uFF0C\u5185\u5B58\u6700\u4F4E2G\uFF0CCPU\u6700\u4F4E2\u6838\uFF0C\u78C1\u76D830G\u4EE5\u4E0A</li></ul><h4 id="\u8282\u70B9\u89C4\u5212" tabindex="-1"><a class="header-anchor" href="#\u8282\u70B9\u89C4\u5212" aria-hidden="true">#</a> \u8282\u70B9\u89C4\u5212</h4><p>\u672C\u6B21\u5B89\u88C5\u8282\u70B9\u89C4\u5212\uFF0C\u5728\u5B89\u88C5\u524D\u53EF\u4EE5\u52A8\u6001\u8C03\u6574</p><table><thead><tr><th>\u4E3B\u673A\u540D</th><th>\u529F\u80FD</th><th>\u64CD\u4F5C\u7CFB\u7EDF</th><th>\u5185\u5B58</th><th>CPU</th><th>\u9759\u6001IP</th></tr></thead><tbody><tr><td>node0</td><td>Master\u8282\u70B9\uFF0C Etcd\u8282\u70B9</td><td>Centos 7.9</td><td>4G</td><td>2\u6838</td><td>192.168.48.140</td></tr><tr><td>node1</td><td>Master\u8282\u70B9\uFF0CEtcd\u8282\u70B9\uFF0CNode\u8282\u70B9</td><td>Centos 7.9</td><td>4G</td><td>2\u6838</td><td>192.168.48.141</td></tr><tr><td>node2</td><td>Node\u8282\u70B9\uFF0C Etcd\u8282\u70B9</td><td>Centos 7.9</td><td>4G</td><td>2\u6838</td><td>192.168.48.142</td></tr></tbody></table><blockquote><p>\u6839\u636E\u4EE5\u4E0A\u4FE1\u606F\u5B89\u88C5\u64CD\u4F5C\u7CFB\u7EDF\uFF0C\u5B89\u88C5\u5B8C\u6210\u540E\u4E0D\u9700\u8981\u505A\u4EFB\u4F55\u64CD\u4F5C</p></blockquote><h4 id="\u66F4\u65B0\u7CFB\u7EDF" tabindex="-1"><a class="header-anchor" href="#\u66F4\u65B0\u7CFB\u7EDF" aria-hidden="true">#</a> \u66F4\u65B0\u7CFB\u7EDF</h4><div class="language-bash ext-sh"><pre class="language-bash"><code>yum update -y <span class="token operator">&amp;&amp;</span> <span class="token function">reboot</span>

<span class="token comment"># \u66F4\u65B0\u524D\u7CFB\u7EDF\u7248\u672C: cat /etc/redhat-release </span>
<span class="token comment"># CentOS Linux release 7.4.1708 (Core)</span>

<span class="token comment"># \u66F4\u65B0\u540E\u7CFB\u7EDF\u7248\u672C: cat /etc/redhat-release </span>
<span class="token comment"># CentOS Linux release 7.9.2009 (Core)</span>
</code></pre></div><h4 id="\u8BBE\u7F6E\u9759\u6001\u5185\u7F51ip-\u53EF\u9009" tabindex="-1"><a class="header-anchor" href="#\u8BBE\u7F6E\u9759\u6001\u5185\u7F51ip-\u53EF\u9009" aria-hidden="true">#</a> \u8BBE\u7F6E\u9759\u6001\u5185\u7F51IP\uFF08\u53EF\u9009\uFF09</h4><p>\u5982\u679C\u4F7F\u7528<code>VMware Workstation</code>\u7B49\u5728\u672C\u5730\u90E8\u7F72\uFF0C\u9700\u8981\u4FDD\u8BC1\u4F7F\u7528\u9759\u6001\u5185\u7F51IP\u5730\u5740</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># vi /etc/sysconfig/network-scripts/ifcfg-ens33</span>
<span class="token assign-left variable">TYPE</span><span class="token operator">=</span><span class="token string">&quot;Ethernet&quot;</span>
<span class="token assign-left variable">PROXY_METHOD</span><span class="token operator">=</span><span class="token string">&quot;none&quot;</span>
<span class="token assign-left variable">BROWSER_ONLY</span><span class="token operator">=</span><span class="token string">&quot;no&quot;</span>
<span class="token assign-left variable">BOOTPROTO</span><span class="token operator">=</span><span class="token string">&quot;static&quot;</span>		<span class="token comment"># \u8BBE\u7F6E\u4E3A\u9759\u6001IP</span>
<span class="token assign-left variable">DEFROUTE</span><span class="token operator">=</span><span class="token string">&quot;yes&quot;</span>
<span class="token assign-left variable">IPV4_FAILURE_FATAL</span><span class="token operator">=</span><span class="token string">&quot;no&quot;</span>
<span class="token assign-left variable">IPV6INIT</span><span class="token operator">=</span><span class="token string">&quot;yes&quot;</span>
<span class="token assign-left variable">IPV6_AUTOCONF</span><span class="token operator">=</span><span class="token string">&quot;yes&quot;</span>
<span class="token assign-left variable">IPV6_DEFROUTE</span><span class="token operator">=</span><span class="token string">&quot;yes&quot;</span>
<span class="token assign-left variable">IPV6_FAILURE_FATAL</span><span class="token operator">=</span><span class="token string">&quot;no&quot;</span>
<span class="token assign-left variable">IPV6_ADDR_GEN_MODE</span><span class="token operator">=</span><span class="token string">&quot;stable-privacy&quot;</span>
<span class="token assign-left variable">NAME</span><span class="token operator">=</span><span class="token string">&quot;ens33&quot;</span>
<span class="token assign-left variable">UUID</span><span class="token operator">=</span><span class="token string">&quot;068dc849-6e8c-4bed-b2de-2fe66c424521&quot;</span>
<span class="token assign-left variable">DEVICE</span><span class="token operator">=</span><span class="token string">&quot;ens33&quot;</span>
<span class="token assign-left variable">ONBOOT</span><span class="token operator">=</span><span class="token string">&quot;yes&quot;</span>			<span class="token comment"># \u5F00\u542F\u81EA\u542F</span>
<span class="token assign-left variable">IPADDR</span><span class="token operator">=</span><span class="token number">192.168</span>.48.140	<span class="token comment"># IP\uFF0C\u6839\u636E\u5B9E\u9645\u60C5\u51B5\u4FEE\u6539</span>
<span class="token assign-left variable">NETMASK</span><span class="token operator">=</span><span class="token number">255.255</span>.255.0	<span class="token comment"># \u5B50\u7F51\u63A9\u7801</span>
<span class="token assign-left variable">GATEWAY</span><span class="token operator">=</span><span class="token number">192.168</span>.48.2	<span class="token comment"># \u9ED8\u8BA4\u7F51\u5173\uFF0C\u6839\u636E\u5B9E\u9645\u60C5\u51B5\u4FEE\u6539</span>
<span class="token assign-left variable">DNS1</span><span class="token operator">=</span><span class="token number">114.114</span>.114.114    <span class="token comment"># DNS1</span>
<span class="token assign-left variable">DNS2</span><span class="token operator">=</span><span class="token number">8.8</span>.8.8            <span class="token comment"># DNS2</span>

<span class="token comment"># \u91CD\u542F\u7F51\u7EDC</span>
systemctl restart network.service

<span class="token comment"># \u6D4B\u8BD5\u7F51\u7EDC</span>
<span class="token function">ping</span> -c <span class="token number">4</span> www.baidu.com
</code></pre></div><h4 id="\u7CFB\u7EDF\u521D\u59CB\u5316" tabindex="-1"><a class="header-anchor" href="#\u7CFB\u7EDF\u521D\u59CB\u5316" aria-hidden="true">#</a> \u7CFB\u7EDF\u521D\u59CB\u5316</h4><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u4FEE\u6539\u4E3B\u673A\u540D</span>
hostnamectl set-hostname node0
hostnamectl set-hostname node1
hostnamectl set-hostname node2

<span class="token comment"># \u5173\u95EDselinux</span>
setenforce <span class="token number">0</span>
<span class="token function">sed</span> -ri <span class="token string">&#39;s/(^SELINUX=)(.*)/\\1disabled/&#39;</span> /etc/selinux/config

<span class="token comment"># \u5173\u95ED\u9632\u706B\u5899</span>
systemctl stop firewalld <span class="token operator">&amp;&amp;</span> systemctl disable firewalld

<span class="token comment"># \u8BBE\u7F6Eiptables\u89C4\u5219</span>
iptables -F <span class="token operator">&amp;&amp;</span> iptables -X <span class="token operator">&amp;&amp;</span> iptables -F -t nat <span class="token operator">&amp;&amp;</span> iptables -X -t nat <span class="token operator">&amp;&amp;</span> iptables -P FORWARD ACCEPT

<span class="token comment"># \u5173\u95EDswap</span>
swapoff -a <span class="token operator">&amp;&amp;</span> <span class="token function">vi</span> /etc/fstab
<span class="token function">free</span> -m <span class="token operator">&amp;&amp;</span> <span class="token function">cat</span> /etc/fstab

<span class="token comment"># K8S\u53C2\u6570\u8BBE\u7F6E</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> /etc/sysctl.d/kubernetes.conf <span class="token operator">&lt;&lt;</span><span class="token string">EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_nonlocal_bind = 1
net.ipv4.ip_forward = 1
vm.swappiness = 0
vm.overcommit_memory = 1
EOF</span>
<span class="token comment"># \u4F7F\u914D\u7F6E\u751F\u6548</span>
sysctl -p /etc/sysctl.d/kubernetes.conf

<span class="token comment"># \u65F6\u95F4\u540C\u6B65</span>
yum <span class="token function">install</span> ntpdate -y
ntpdate time.windows.com

<span class="token comment"># \u79FB\u9664docker\u76F8\u5173\u8F6F\u4EF6\u5305\uFF08\u53EF\u9009\uFF09</span>
yum remove -y docker* <span class="token operator">&amp;&amp;</span> <span class="token function">rm</span> -vf /etc/docker/daemon.json
</code></pre></div><h4 id="\u914D\u7F6Eansible\u4E3B\u63A7\u8282\u70B9" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6Eansible\u4E3B\u63A7\u8282\u70B9" aria-hidden="true">#</a> \u914D\u7F6EAnsible\u4E3B\u63A7\u8282\u70B9</h4><p>Ansible\u4E3B\u63A7\u8282\u70B9\u90E8\u7F72\u5728\u54EA\u91CC\u90FD\u53EF\u4EE5\uFF0C\u53EA\u8981\u80FD\u63A7\u5236K8s Node\u8282\u70B9\u5373\u53EF</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u751F\u6210keygen\uFF08\u6267\u884Cssh-keygen\uFF0C\u4E00\u8DEF\u56DE\u8F66\u4E0B\u53BB\uFF09</span>
ssh-keygen

<span class="token comment"># \u914D\u7F6ESSH\u514D\u5BC6\u767B\u5F55</span>
ssh-copy-id root@192.168.48.140
ssh-copy-id root@192.168.48.141
ssh-copy-id root@192.168.48.142

<span class="token comment"># \u9A8C\u8BC1\u514D\u5BC6\u767B\u5F55</span>
<span class="token function">ssh</span> root@192.168.48.140  <span class="token string">&quot;hostname&quot;</span>
<span class="token function">ssh</span> root@192.168.48.141  <span class="token string">&quot;hostname&quot;</span>
<span class="token function">ssh</span> root@192.168.48.142  <span class="token string">&quot;hostname&quot;</span>

<span class="token comment"># \u5B89\u88C5\u57FA\u7840\u8F6F\u4EF6</span>
yum <span class="token function">install</span> epel-release python3 <span class="token function">git</span> <span class="token function">wget</span> -y

<span class="token comment"># \u5347\u7EA7pip\u5230\u6700\u65B0\u7248(\u53EF\u9009,\u63A8\u8350)</span>
pip3 <span class="token function">install</span> --upgrade pip -i https://mirrors.aliyun.com/pypi/simple

<span class="token comment"># \u4E0B\u8F7Dkubespray\u6E90\u7801</span>
<span class="token comment"># \u82E5\u56E0\u7F51\u7EDC\u4E0B\u8F7D\u5931\u8D25\uFF0C\u53EF\u4EE5\u4F7F\u7528\u6211\u4EEC\u51C6\u5907\u597D\u7684\u4EE3\u7406\uFF08\u79D1\u5B66\u4E0A\u7F51\uFF09\uFF0Cwget -c\u540E\u9762\u6DFB\u52A0 -e &quot;http_proxy=http://192.168.5.103:7890&quot;</span>
<span class="token function">wget</span> -c https://github.com/kubernetes-sigs/kubespray/archive/v2.15.0.tar.gz 
<span class="token function">tar</span> zxf v2.15.0.tar.gz <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> kubespray-2.15.0 <span class="token operator">&amp;&amp;</span> <span class="token function">cat</span> requirements.txt
pip3 <span class="token function">install</span> -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple

<span class="token comment"># \u751F\u6210\u9879\u76EE\u914D\u7F6E</span>
<span class="token function">cp</span> -rpf inventory/sample inventory/mycluster

<span class="token comment"># \u4F7F\u7528\u771F\u5B9E\u7684hostname\uFF08\u5426\u5219\u4F1A\u81EA\u52A8\u628A\u4F60\u7684hostname\u6539\u6210node1/node2...\u8FD9\u79CD\u54E6\uFF09</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">USE_REAL_HOSTNAME</span><span class="token operator">=</span>true

<span class="token comment"># \u6307\u5B9A\u914D\u7F6E\u6587\u4EF6\u4F4D\u7F6E</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">CONFIG_FILE</span><span class="token operator">=</span>inventory/mycluster/hosts.yaml

<span class="token comment"># \u5B9A\u4E49ip\u5217\u8868\uFF08\u4F60\u7684\u670D\u52A1\u5668\u5185\u7F51ip\u5730\u5740\u5217\u8868\uFF0C3\u53F0\u53CA\u4EE5\u4E0A\uFF0C\u524D\u4E24\u53F0\u9ED8\u8BA4\u4E3Amaster\u8282\u70B9\uFF09</span>
<span class="token builtin class-name">declare</span> -a <span class="token assign-left variable">IPS</span><span class="token operator">=</span><span class="token punctuation">(</span>
  <span class="token number">192.168</span>.48.140
  <span class="token number">192.168</span>.48.141
  <span class="token number">192.168</span>.48.142
<span class="token punctuation">)</span>

<span class="token comment"># \u751F\u6210\u914D\u7F6E\u6587\u4EF6</span>
python3 contrib/inventory_builder/inventory.py <span class="token variable">\${IPS<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span>
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
</code></pre></div><h4 id="\u8282\u70B9\u4E2A\u6027\u5316\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u8282\u70B9\u4E2A\u6027\u5316\u914D\u7F6E" aria-hidden="true">#</a> \u8282\u70B9\u4E2A\u6027\u5316\u914D\u7F6E</h4><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u5B9A\u5236\u5316\u914D\u7F6E\u6587\u4EF6</span>
<span class="token comment"># 1. \u8282\u70B9\u7EC4\u7EC7\u914D\u7F6E\uFF08\u8FD9\u91CC\u53EF\u4EE5\u8C03\u6574\u6BCF\u4E2A\u8282\u70B9\u7684\u89D2\u8272\uFF09</span>
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
      
<span class="token comment"># 2. containerd\u914D\u7F6E\uFF08\u6559\u7A0B\u4F7F\u7528containerd\u4F5C\u4E3A\u5BB9\u5668\u5F15\u64CE\uFF09</span>
<span class="token function">vi</span> inventory/mycluster/group_vars/all/containerd.yml

<span class="token comment"># 3. \u5168\u5C40\u914D\u7F6E\uFF08\u53EF\u4EE5\u5728\u8FD9\u914D\u7F6Ehttp(s)\u4EE3\u7406\u5B9E\u73B0\u5916\u7F51\u8BBF\u95EE\uFF09</span>
<span class="token function">vi</span> inventory/mycluster/group_vars/all/all.yml
http_proxy: <span class="token string">&quot;http://192.168.5.103:7890&quot;</span>     <span class="token comment"># \u914D\u7F6E\u4EE3\u7406</span>
https_proxy: <span class="token string">&quot;http://192.168.5.103:7890&quot;</span>    <span class="token comment"># \u914D\u7F6E\u4EE3\u7406</span>


<span class="token comment"># 4. k8s\u96C6\u7FA4\u914D\u7F6E\uFF08\u5305\u62EC\u8BBE\u7F6E\u5BB9\u5668\u8FD0\u884C\u65F6\u3001svc\u7F51\u6BB5\u3001pod\u7F51\u6BB5\u7B49\uFF09</span>
<span class="token function">vi</span> inventory/mycluster/group_vars/k8s-cluster/k8s-cluster.yml
kube_version: v1.19.7                  <span class="token comment"># K8S\u7248\u672C\u4FE1\u606F\uFF0C\u65E0\u9700\u4FEE\u6539\uFF08\u4E5F\u4E0D\u8981\u968F\u610F\u4FEE\u6539\uFF09</span>
kube_service_addresses: <span class="token number">10.200</span>.0.0/16  <span class="token comment"># \u9ED8\u8BA4\u4E3A10.233.0.0/18\uFF0C\u4FEE\u6539\u4E3A10.200.0.0/16</span>
kube_pods_subnet: <span class="token number">10.233</span>.0.0/16        <span class="token comment"># \u9ED8\u8BA410.233.64.0/18\uFF0C\u4FEE\u6539\u4E3A10.233.0.0/16</span>
container_manager: containerd	       <span class="token comment"># \u914D\u7F6E\u5BB9\u5668\u5F15\u64CE\uFF0C\u9ED8\u8BA4\u662Fdocker,\u4FEE\u6539\u4E3Acontainerd</span>

<span class="token comment"># 5. \u4FEE\u6539etcd\u90E8\u7F72\u7C7B\u578B\u4E3Ahost\uFF08\u9ED8\u8BA4\u662Fdocker\uFF09</span>
<span class="token function">vi</span> inventory/mycluster/group_vars/etcd.yml
etcd_deployment_type: <span class="token function">host</span>      <span class="token comment"># \u914D\u7F6Eetcd\u90E8\u7F72\u65B9\u5F0F\uFF0C\u9ED8\u8BA4\u662Fdocker\uFF0C\u5982\u679C\u4F7F\u7528containerd\u7684\u8BDD\uFF0C\u5FC5\u987B\u4F7F\u7528\u5BBF\u4E3B\u673A\u90E8\u7F72\uFF0C\u5373host</span>

<span class="token comment"># 6. \u9644\u52A0\u7EC4\u4EF6\uFF08ingress\u3001dashboard\u7B49\uFF09</span>
<span class="token function">vi</span> inventory/mycluster/group_vars/k8s-cluster/addons.yml
dashboard_enabled: <span class="token boolean">true</span>			<span class="token comment"># \u4FEE\u6539\u4E3Atrue</span>
ingress_nginx_enabled: <span class="token boolean">true</span>		<span class="token comment"># \u4FEE\u6539\u4E3Atrue</span>
metrics_server_enabled: <span class="token boolean">true</span>    <span class="token comment"># \u4FEE\u6539\u4E3Atrue</span>
</code></pre></div><h4 id="\u90E8\u7F72kubernetes\u96C6\u7FA4" tabindex="-1"><a class="header-anchor" href="#\u90E8\u7F72kubernetes\u96C6\u7FA4" aria-hidden="true">#</a> \u90E8\u7F72Kubernetes\u96C6\u7FA4</h4><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u4F7F\u7528tmux(\u53EF\u9009)</span>
yum <span class="token function">install</span> tmux -y
tmux new -s k8s_install

<span class="token comment"># \u90E8\u7F72Kubernetes\u96C6\u7FA4\uFF08\u8FD9\u4E00\u6B65\u6267\u884C\u7684\u65F6\u95F4\u53EF\u80FD\u4F1A\u5F88\u957F\uFF0C\u8FD9\u91CC\u6211\u4F7F\u7528time\u547D\u4EE4\u6765\u7EDF\u8BA1\u4E00\u4E0B\u65F6\u957F\uFF09</span>
<span class="token function">time</span> ansible-playbook -i inventory/mycluster/hosts.yaml  -b cluster.yml <span class="token comment"># \u5982\u679C\u60F3\u67E5\u770B\u8BE6\u7EC6\u4FE1\u606F\uFF0C\u6DFB\u52A0-vvvv</span>

real    25m49.126s
user    14m56.884s
sys     4m50.167s
</code></pre></div><blockquote><p>\u5B89\u88C5\u6B65\u9AA4\u6267\u884C\u65F6\u957F\u5E76\u4E0D\u7A33\u5B9A\uFF0C\u6839\u636E\u7CFB\u7EDF\u914D\u7F6E\u3001\u7F51\u7EDC\u8D28\u91CF\u800C\u4E0D\u540C\uFF0C\u5FEB\u5219\u534A\u5C0F\u65F6\uFF0C\u6162\u5219\u51E0\u4E2A\u5C0F\u65F6</p></blockquote><h4 id="\u68C0\u67E5\u96C6\u7FA4\u72B6\u6001" tabindex="-1"><a class="header-anchor" href="#\u68C0\u67E5\u96C6\u7FA4\u72B6\u6001" aria-hidden="true">#</a> \u68C0\u67E5\u96C6\u7FA4\u72B6\u6001</h4><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u67E5\u770B\u8282\u70B9\u72B6\u6001(Master\u8282\u70B9\u6267\u884C)</span>
kubectl get <span class="token function">node</span>
NAME    STATUS   ROLES    AGE   VERSION
node0   Ready    master   25h   v1.19.7
node1   Ready    master   25h   v1.19.7
node2   Ready    <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>   24h   v1.19.7

<span class="token comment"># \u67E5\u770BMaster\u8282\u70B9\u7EC4\u4EF6\u72B6\u6001(Master\u8282\u70B9\u6267\u884C)</span>
kubectl get cs
Warning: v1 ComponentStatus is deprecated <span class="token keyword">in</span> v1.19+
NAME                 STATUS    MESSAGE             ERROR
scheduler            Healthy   ok                  
controller-manager   Healthy   ok                  
etcd-2               Healthy   <span class="token punctuation">{</span><span class="token string">&quot;health&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span><span class="token punctuation">}</span>   
etcd-1               Healthy   <span class="token punctuation">{</span><span class="token string">&quot;health&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span><span class="token punctuation">}</span>   
etcd-0               Healthy   <span class="token punctuation">{</span><span class="token string">&quot;health&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;true&quot;</span><span class="token punctuation">}</span>

<span class="token comment"># \u67E5\u770BPod\u72B6\u6001</span>
kubectl get pods -A
</code></pre></div><h4 id="\u6E05\u7406\u4EE3\u7406\u8BBE\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u6E05\u7406\u4EE3\u7406\u8BBE\u7F6E" aria-hidden="true">#</a> \u6E05\u7406\u4EE3\u7406\u8BBE\u7F6E</h4><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u6E05\u7406Containerd HTTP\u4EE3\u7406</span>
<span class="token function">rm</span> -vf /etc/systemd/system/containerd.service.d/http-proxy.conf
systemctl daemon-reload
systemctl restart containerd

<span class="token comment"># \u6E05\u7406Yum HTTP\u4EE3\u7406(\u628Agrep\u51FA\u6765\u7684\u4EE3\u7406\u914D\u7F6E\u624B\u52A8\u5220\u9664\u5373\u53EF)</span>
<span class="token function">grep</span> <span class="token number">7890</span> -r /etc/yum*
</code></pre></div><h4 id="\u8BBF\u95EEdashboard" tabindex="-1"><a class="header-anchor" href="#\u8BBF\u95EEdashboard" aria-hidden="true">#</a> \u8BBF\u95EEdashboard</h4><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u521B\u5EFAservice</span>
<span class="token function">cat</span> <span class="token operator">&gt;</span> dashboard-svc.yaml <span class="token operator">&lt;&lt;</span><span class="token string">EOF
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

<span class="token comment"># \u8BBF\u95EEdashboard</span>
\u4E3A\u4E86\u96C6\u7FA4\u5B89\u5168\uFF0C\u4ECE <span class="token number">1.7</span> \u5F00\u59CB\uFF0Cdashboard \u53EA\u5141\u8BB8\u901A\u8FC7 https \u8BBF\u95EE\uFF0C\u6211\u4EEC\u4F7F\u7528nodeport\u7684\u65B9\u5F0F\u66B4\u9732\u670D\u52A1\uFF0C\u53EF\u4EE5\u4F7F\u7528 https://NodeIP:NodePort \u5730\u5740\u8BBF\u95EE 
\u5173\u4E8E\u81EA\u5B9A\u4E49\u8BC1\u4E66 \u9ED8\u8BA4dashboard\u7684\u8BC1\u4E66\u662F\u81EA\u52A8\u751F\u6210\u7684\uFF0C\u80AF\u5B9A\u662F\u975E\u5B89\u5168\u7684\u8BC1\u4E66\uFF0C\u5982\u679C\u5927\u5BB6\u6709\u57DF\u540D\u548C\u5BF9\u5E94\u7684\u5B89\u5168\u8BC1\u4E66\u53EF\u4EE5\u81EA\u5DF1\u66FF\u6362\u6389\u3002\u4F7F\u7528\u5B89\u5168\u7684\u57DF\u540D\u65B9\u5F0F\u8BBF\u95EEdashboard\u3002 
\u5728dashboard-all.yaml\u4E2D\u589E\u52A0dashboard\u542F\u52A8\u53C2\u6570\uFF0C\u53EF\u4EE5\u6307\u5B9A\u8BC1\u4E66\u6587\u4EF6\uFF0C\u5176\u4E2D\u8BC1\u4E66\u6587\u4EF6\u662F\u901A\u8FC7secret\u6CE8\u8FDB\u6765\u7684\u3002
- \u2013tls-cert-file
- dashboard.cer
- \u2013tls-key-file
- dashboard.key

<span class="token comment"># \u521B\u5EFAservice account</span>
kubectl create sa dashboard-admin -n kube-system

<span class="token comment"># \u521B\u5EFA\u89D2\u8272\u7ED1\u5B9A\u5173\u7CFB</span>
kubectl create clusterrolebinding dashboard-admin --clusterrole<span class="token operator">=</span>cluster-admin --serviceaccount<span class="token operator">=</span>kube-system:dashboard-admin

<span class="token comment"># \u67E5\u770Bdashboard-admin\u7684secret\u540D\u5B57</span>
<span class="token assign-left variable">ADMIN_SECRET</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>kubectl get secrets -n kube-system <span class="token operator">|</span> <span class="token function">grep</span> dashboard-admin <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print $1}&#39;</span><span class="token variable">)</span></span>

<span class="token comment"># \u6253\u5370secret\u7684token</span>
kubectl describe secret -n kube-system <span class="token variable">\${ADMIN_SECRET}</span> <span class="token operator">|</span> <span class="token function">grep</span> -E <span class="token string">&#39;^token&#39;</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print $2}&#39;</span>

<span class="token comment"># \u6D4F\u89C8\u5668\u8BBF\u95EE</span>
https://192.168.48.100:30000/
</code></pre></div><h4 id="faq" tabindex="-1"><a class="header-anchor" href="#faq" aria-hidden="true">#</a> FAQ</h4><p><strong>\u4E0B\u8F7D\u6587\u4EF6\u51FA\u9519</strong></p><p><img src="https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20211229101545405.png" alt="image-20211229101545405"></p><blockquote><p>\u4E0B\u8F7D\u6587\u4EF6\u51FA\u9519\uFF0C\u4ECE\u4EE5\u4E0B\u65B9\u9762\u6392\u67E5</p><ul><li>\u68C0\u67E5\u672C\u5730\u7F51\u7EDC\u3001\u4EE3\u7406\u670D\u52A1\u5668\u662F\u5426\u6B63\u5E38</li><li>\u68C0\u67E5\u914D\u7F6E\u662F\u5426\u5199\u9519 <ul><li>\u6BD4\u5982\u5C06\u4EE3\u7406\u670D\u52A1\u5668\u7684<code>http://</code>\u8BEF\u5199\u6210\u4E86<code>https://</code></li><li>\u6BD4\u5982\u5C06\u4EE3\u7406\u670D\u52A1\u5668\u7684<code>http://</code>\u8BEF\u5199\u6210<code>http:/</code></li></ul></li></ul></blockquote><p><strong>scheduler\u548Ccontroller-manager\u7EC4\u4EF6\u72B6\u6001\u4E3AUnhealthy</strong></p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># \u4FEE\u590DUnhealthy(\u5728\u6240\u6709Master\u4E0A\u64CD\u4F5C)</span>
<span class="token function">vi</span> /etc/kubernetes/manifests/kube-controller-manager.yaml
    <span class="token comment"># - --port=0    # \u5C06\u8FD9\u4E00\u884C\u6CE8\u91CA\u6389</span>
<span class="token function">vi</span> /etc/kubernetes/manifests/kube-scheduler.yaml
    <span class="token comment"># - --port=0    # \u5C06\u8FD9\u4E00\u884C\u6CE8\u91CA\u6389</span>

<span class="token comment"># \u91CD\u542Fkubelet</span>
systemctl restart kubelet
</code></pre></div>`,35);function y(v,_){const a=o("ExternalLinkIcon");return p(),c("div",null,[i,n("p",null,[d,n("a",k,[u,e(a)])]),m,n("p",null,[h,n("a",b,[g,e(a)])]),f])}var E=t(r,[["render",y],["__file","kubespray.html.vue"]]);export{E as default};
