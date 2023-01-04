# minikube

文档：[https://minikube.sigs.k8s.io/docs/](https://minikube.sigs.k8s.io/docs/)

Github：[https://github.com/kubernetes/minikube](https://github.com/kubernetes/minikube)

<br />

## 系统初始化

参考：[https://jinhui.dev/container/kubernetes/deploy/binary.html#%E7%B3%BB%E7%BB%9F%E5%88%9D%E5%A7%8B%E5%8C%96](https://jinhui.dev/container/kubernetes/deploy/binary.html#%E7%B3%BB%E7%BB%9F%E5%88%9D%E5%A7%8B%E5%8C%96)

<br />

## 安装Docker

参考：[https://jinhui.dev/container/docker.html#%E5%AE%89%E8%A3%85](https://jinhui.dev/container/docker.html#%E5%AE%89%E8%A3%85)

**注意：添加一个代理，用于下载被墙的镜像**

<br />

## 安装CRI-Dockerd

Github：[https://github.com/Mirantis/cri-dockerd](https://github.com/Mirantis/cri-dockerd)

```bash
[root@localhost ~]# wget -c https://github.com/Mirantis/cri-dockerd/releases/download/v0.3.0/cri-dockerd-0.3.0-3.el7.x86_64.rpm
[root@localhost ~]# yum -y install cri-dockerd-0.3.0-3.el7.x86_64.rpm
[root@localhost ~]# systemctl start cri-docker.service && systemctl enable cri-docker.service
```

<br />

## 安装minikube

文档：[https://minikube.sigs.k8s.io/docs/start/](https://minikube.sigs.k8s.io/docs/start/)

```bash
# 安装minikube
[root@localhost ~]# curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-latest.x86_64.rpm
[root@localhost ~]# sudo rpm -Uvh minikube-latest.x86_64.rpm

[root@localhost ~]# minikube version
minikube version: v1.28.0
commit: 986b1ebd987211ed16f8cc10aed7d2c42fc8392f

# 查看支持的最新的kubernetes版本，我们安装最新版 v1.25.3
[root@localhost ~]# minikube start -h | grep 'kubernetes-version' -A 2
    --kubernetes-version='':
        The Kubernetes version that the minikube VM will use (ex: v1.2.3, 'stable' for v1.25.3, 'latest' for v1.25.3). Defaults to 'stable'.
```

<br />

## 安装crictl

Github：[https://github.com/kubernetes-sigs/cri-tools](https://github.com/kubernetes-sigs/cri-tools)

**注意：crictl的版本尽量和kubernetes版本相同**

```bash
# 安装crictl
[root@localhost ~]# wget -c https://github.com/kubernetes-sigs/cri-tools/releases/download/v1.25.0/crictl-v1.25.0-linux-amd64.tar.gz
[root@localhost ~]# tar zxf crictl-v1.25.0-linux-amd64.tar.gz
[root@localhost ~]# mv crictl /bin/

# 测试crictl，报错了
[root@localhost ~]# crictl ps
WARN[0000] runtime connect using default endpoints: [unix:///var/run/dockershim.sock unix:///run/containerd/containerd.sock unix:///run/crio/crio.sock unix:///var/run/cri-dockerd.sock]. As the default settings are now deprecated, you should set the endpoint instead. 

# 修复错误
[root@localhost ~]# vim /etc/crictl.yaml
runtime-endpoint: unix:///var/run/cri-dockerd.sock
timeout: 10
debug: false

[root@localhost ~]# crictl ps
CONTAINER      IMAGE       CREATED        STATE         NAME         ATTEMPT      POD ID      POD
```

<br />

## 部署kubernetes

```bash
# (1) 安装kubernetes
# 选项
# --nodes=1                 默认参数
# --driver=none             不设置会报错
# --listen-address=0.0.0.0  支持远程连接集群
# --embed-certs=true        kubeconfig内置证书方式,否则kubeconfig文件内会指定证书路径
[root@localhost ~]# minikube start \
    --kubernetes-version=v1.25.3 \
    --nodes=1 \
    --driver=none \
    --listen-address=0.0.0.0 \
    --embed-certs=true
    
😄  minikube v1.28.0 on Centos 7.9.2009
✨  Using the none driver based on existing profile
👍  Starting control plane node minikube in cluster minikube
🔄  Restarting existing none bare metal machine for "minikube" ...
ℹ️  OS release is CentOS Linux 7 (Core)
    > kubectl.sha256:  64 B / 64 B [-------------------------] 100.00% ? p/s 0s
    > kubelet.sha256:  64 B / 64 B [-------------------------] 100.00% ? p/s 0s
    > kubeadm.sha256:  64 B / 64 B [-------------------------] 100.00% ? p/s 0s
    > kubeadm:  41.77 MiB / 41.77 MiB [--------------] 100.00% 2.20 MiB p/s 19s
    > kubectl:  42.93 MiB / 42.93 MiB [--------------] 100.00% 1.65 MiB p/s 26s
    > kubelet:  108.95 MiB / 108.95 MiB [------------] 100.00% 2.83 MiB p/s 39s

    ▪ Generating certificates and keys ...
    ▪ Booting up control plane ...
    ▪ Configuring RBAC rules ...
🤹  Configuring local host environment ...

❗  The 'none' driver is designed for experts who need to integrate with an existing VM
💡  Most users should use the newer 'docker' driver instead, which does not require root!
📘  For more information, see: https://minikube.sigs.k8s.io/docs/reference/drivers/none/

❗  kubectl and minikube configuration will be stored in /root
❗  To use kubectl or minikube commands as your own user, you may need to relocate them. For example, to overwrite your own settings, run:

    ▪ sudo mv /root/.kube /root/.minikube $HOME
    ▪ sudo chown -R $USER $HOME/.kube $HOME/.minikube

💡  This can also be done automatically by setting the env var CHANGE_MINIKUBE_NONE_USER=true
🔎  Verifying Kubernetes components...
    ▪ Using image gcr.io/k8s-minikube/storage-provisioner:v5
🌟  Enabled addons: default-storageclass, storage-provisioner
💡  kubectl not found. If you need it, try: 'minikube kubectl -- get pods -A'
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default

# (2) 安装kubectl: 可以下载二进制文件,也可以使用minikube自带的kubectl
vim ~/.bashrc
alias kubectl='minikube kubectl --'
source ~/.bashrc

# (3) 安装网络插件calico
# minikube start 可以指定以下选项安装calico，但是启动会报错，所以手动安装calico
# --network-plugin=cni --cni=calico
curl https://projectcalico.docs.tigera.io/manifests/calico.yaml -O
vim calico.yaml
# 修改前
            - name: IP
              value: "autodetect"
# 修改后,新加两行
            - name: IP
              value: "autodetect"
            - name: IP_AUTODETECTION_METHOD
              value: "interface=ens33"
kubectl apply -f calico.yaml

# (4) 检查
[root@kubernetes ~]# kubectl get node
NAME         STATUS   ROLES           AGE     VERSION
kubernetes   Ready    control-plane   2m30s   v1.25.3

[root@kubernetes ~]# kubectl get pods -A
NAMESPACE     NAME                                       READY   STATUS    RESTARTS   AGE
kube-system   calico-kube-controllers-798cc86c47-2254j   1/1     Running   0          62s
kube-system   calico-node-w4b89                          1/1     Running   0          62s
kube-system   coredns-565d847f94-2w2wn                   1/1     Running   0          2m56s
kube-system   etcd-kubernetes                            1/1     Running   0          3m9s
kube-system   kube-apiserver-kubernetes                  1/1     Running   0          3m9s
kube-system   kube-controller-manager-kubernetes         1/1     Running   0          3m11s
kube-system   kube-proxy-9nv9q                           1/1     Running   0          2m57s
kube-system   kube-scheduler-kubernetes                  1/1     Running   0          3m9s
kube-system   storage-provisioner                        1/1     Running   0          3m8s
```

<br />

## 删除kubernetes

```bash
#删除所有本地集群和配置文件
minikube delete --all
```

