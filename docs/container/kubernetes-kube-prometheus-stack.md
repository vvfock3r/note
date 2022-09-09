# kube-prometheus-stack

文档：[https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack)

## 部署

<br />

### （1）下载Chart

```bash
# 添加仓库
[root@node-1 ~]# helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
[root@node-1 ~]# helm repo update

# 搜索
[root@node-1 ~]# helm search repo kube-prometheus-stack
NAME                                            CHART VERSION   APP VERSION     DESCRIPTION
prometheus-community/kube-prometheus-stack      39.11.0         0.58.0          kube-prometheus-stack collects Kubernetes manif...

# 下载Chart，需要注意的是：
# (1) 若指定版本则是Chart的版本，而不是kube-prometheus-stack的版本，具体的对应关系可以在上方的Github中找到
# (2) helm search中只显示了一个版本，但是所有的版本都是可以安装的
[root@node-1 ~]# helm pull prometheus-community/kube-prometheus-stack --version 39.11.0 --untar
[root@node-1 ~]# cd kube-prometheus-stack
```

<br />

### （2）查看镜像

```bash
# 镜像下载需要科学上网
[root@node-1 kube-prometheus-stack]# cat values.yaml | grep -E 'repository:|tag:' 
      repository: quay.io/prometheus/alertmanager
      tag: v0.24.0
  #   repository: docker.io/grafana/grafana
  #   tag: 9.0.6
    #   repository: quay.io/kiwigrid/k8s-sidecar
    #   tag: 1.19.2
  #  repository: registry.k8s.io/kube-state-metrics/kube-state-metrics
  #  tag: v2.5.0
  #   repository: quay.io/prometheus/node-exporter
  #   tag: v1.3.1
        repository: k8s.gcr.io/ingress-nginx/kube-webhook-certgen
        tag: v1.2.0
    repository: quay.io/prometheus-operator/prometheus-operator
    tag: v0.58.0
      repository: quay.io/prometheus-operator/prometheus-config-reloader
      tag: v0.58.0
    repository: quay.io/thanos/thanos
    tag: v0.27.0
      repository: quay.io/prometheus/prometheus
      tag: v2.37.0
      repository: quay.io/thanos/thanos
      tag: v0.27.0
```

<br />

### （3）创建单独的命名空间

```bash
[root@node-1 kube-prometheus-stack]# kubectl create namespace monitoring
namespace/monitoring created
```

<br />

### （4）部署

```bash
[root@node-1 kube-prometheus-stack]# helm install kube-prometheus-stack . --namespace monitoring
NAME: kube-prometheus-stack
LAST DEPLOYED: Thu Sep  8 11:45:52 2022
NAMESPACE: monitoring
STATUS: deployed
REVISION: 1
NOTES:
kube-prometheus-stack has been installed. Check its status by running:
  kubectl --namespace monitoring get pods -l "release=kube-prometheus-stack"

Visit https://github.com/prometheus-operator/kube-prometheus for instructions on how to create & configure Alertmanager and Prometheus instances using the Operator.

# 查看Pod
[root@node-1 kube-prometheus-stack]# kubectl get pods -n monitoring
NAME                                                        READY   STATUS    RESTARTS   AGE
alertmanager-kube-prometheus-stack-alertmanager-0           2/2     Running   0          9m50s
kube-prometheus-stack-grafana-595f8cff67-h69np              3/3     Running   0          9m53s
kube-prometheus-stack-kube-state-metrics-66dd655687-p9sdz   1/1     Running   0          9m54s
kube-prometheus-stack-operator-7bc9959dd6-mxzgd             1/1     Running   0          9m54s
kube-prometheus-stack-prometheus-node-exporter-5zzqg        1/1     Running   0          9m53s
kube-prometheus-stack-prometheus-node-exporter-gwrb5        1/1     Running   0          9m54s
kube-prometheus-stack-prometheus-node-exporter-vgkqj        1/1     Running   0          9m53s
prometheus-kube-prometheus-stack-prometheus-0               2/2     Running   0          9m49s
```

<br />

### （5）卸载

```bash
[root@node-1 ~]# helm uninstall kube-prometheus-stack --namespace monitoring
```

<br />

### （6）修改配置

<br />

#### 1）配置Grafana

* 配置Web端`admin`用户密码
* 服务暴露方式为`Ingress`
* 配置`HTTPS`

::: details 点击查看详情

```yaml
[root@node-1 kube-prometheus-stack]# vim values.yaml
...
grafana:
  ...
  adminPassword: ZsVo6PZ5C@lK       # => (1) 修改这里
  ...
  ingress:
    ## If true, Grafana Ingress will be created
    ##
    enabled: true                    # => (2) 修改这里

    ## IngressClassName for Grafana Ingress.
    ## Should be provided if Ingress is enable.
    ##
    ingressClassName: nginx          # => (3) 修改这里

    ## Annotations for Grafana Ingress
    ##
    annotations: { }
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"

    ## Labels to be added to the Ingress
    ##
    labels: { }

    ## Hostnames.
    ## Must be provided if Ingress is enable.
    ##
    # hosts:
    #   - grafana.domain.com
    hosts:                            # => (4) 修改这里
      - grafana.jinhui.dev

    ## Path for grafana ingress
    path: /

    ## TLS configuration for grafana Ingress
    ## Secret must be manually created in the namespace
    ##
    tls:                               # => (5) 修改这里
      - secretName: grafana.jinhui.dev
        hosts:
          - grafana.jinhui.dev

# 生成自签证书
C:\Users\Administrator\Desktop>mkcert grafana.jinhui.dev

Created a new certificate valid for the following names 📜
 - "grafana.jinhui.dev"

The certificate is at "./grafana.jinhui.dev.pem" and the key at "./grafana.jinhui.dev-key.pem" ✅

It will expire on 8 December 2024 🗓

# 创建secret
[root@node-1 ~]# kubectl create secret tls grafana.jinhui.dev -n monitoring --cert=grafana.jinhui.dev.pem --key=grafana.jinhui.dev-key.pem
secret/grafana.jinhui.dev created
```

:::

访问验证：[https://grafana.jinhui.dev](https://grafana.jinhui.dev)

<br />

#### 2）配置Prometheus

* 服务暴露方式为`Ingress`
* 配置`HTTPS`

::: details 点击查看详情

```bash
[root@node-1 kube-prometheus-stack]# vim values.yaml
...
prometheus:
  ...
  ingress:
    enabled: true                          # => (1) 修改这里
    ingressClassName: nginx                # => (2) 修改这里

    annotations: { }
    labels: { }

    ## Redirect ingress to an additional defined port on the service
    # servicePort: 8081

    ## Hostnames.
    ## Must be provided if Ingress is enabled.
    ##
    # hosts:
    #   - prometheus.domain.com
    hosts:                                   # => (3) 修改这里
      - prometheus.jinhui.dev

    ## Paths to use for ingress rules - one path should match the prometheusSpec.routePrefix
    ##
    paths: [ ]
    # - /

    tls: [ ]                                 # => (4) 修改这里
      - secretName: prometheus.jinhui.dev
        hosts:
          - prometheus.jinhui.dev

# 生成自签证书
C:\Users\Administrator\Desktop>mkcert prometheus.jinhui.dev

Created a new certificate valid for the following names 📜
 - "prometheus.jinhui.dev"

The certificate is at "./prometheus.jinhui.dev.pem" and the key at "./prometheus.jinhui.dev-key.pem" ✅

It will expire on 8 December 2024 🗓

# 创建secret
[root@node-1 ~]# kubectl create secret tls prometheus.jinhui.dev -n monitoring --cert=prometheus.jinhui.dev.pem --key=prometheus.jinhui.dev-key.pem
secret/prometheus.jinhui.dev created
```

:::

访问验证：[https://prometheus.jinhui.dev](https://prometheus.jinhui.dev)

<br />

#### 3）配置部分服务手动发现

在**Status => Service Discovery**中查看未能正确获取配置的服务：

![image-20220908151058058](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220908151058058.png)

解决完以后查看列表：

![image-20220908182624194](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220908182624194.png)

::: details 配置kube-controller-manager

```yaml
[root@node-1 kube-prometheus-stack]# vim values.yaml
...
kubeControllerManager:
  enabled: true
  
  endpoints:          # => (1) 修改这里
    - 192.168.48.142
    - 192.168.48.143
  
  ## If using kubeControllerManager.endpoints only the port and targetPort are used  
  service:
    enabled: true
    ## If null or unset, the value is determined dynamically based on target Kubernetes version due to change
    ## of default port in Kubernetes 1.22.
    port: null
    targetPort: null
    # selector:
    #   component: kube-controller-manager
  serviceMonitor:
    enabled: true
    ## Scrape interval. If not set, the Prometheus default scrape interval is used.
    interval: ""

    ## proxyUrl: URL of a proxy that should be used for scraping.
    proxyUrl: ""

    ## Enable scraping kube-controller-manager over https.
    ## Requires proper certs (not self-signed) and delegated authentication/authorization checks.
    ## If null or unset, the value is determined dynamically based on target Kubernetes version.
    https: null
```

:::

::: details 配置etcd

```bash
[root@node-1 kube-prometheus-stack]# vim values.yaml
...
kubeEtcd:
  enabled: true 
  endpoints:          # => (1) 修改这里
  - 192.168.48.142
  - 192.168.48.143
  - 192.168.48.144
  service:
    enabled: true
    port: 2379
    targetPort: 2379
    # selector:
    #   component: etcd

  ## Configure secure access to the etcd cluster by loading a secret into prometheus and
  ## specifying security configuration below. For example, with a secret named etcd-client-cert
  ##
  ## serviceMonitor:
  ##   scheme: https
  ##   insecureSkipVerify: false
  ##   serverName: localhost
  ##   caFile: /etc/prometheus/secrets/etcd-client-cert/etcd-ca
  ##   certFile: /etc/prometheus/secrets/etcd-client-cert/etcd-client
  ##   keyFile: /etc/prometheus/secrets/etcd-client-cert/etcd-client-key
  ##
  serviceMonitor:
    enabled: true
    ## Scrape interval. If not set, the Prometheus default scrape interval is used.    
    interval: ""
    ## proxyUrl: URL of a proxy that should be used for scraping.
    proxyUrl: ""
    scheme: https              # => (2) 修改这里
    insecureSkipVerify: false
    serverName: ""
    caFile: /etc/prometheus/secrets/etcd-client-cert/ca.pem               # => (3) 修改这里
    certFile: /etc/prometheus/secrets/etcd-client-cert/kubernetes.pem     # => (4) 修改这里
    keyFile: /etc/prometheus/secrets/etcd-client-cert/kubernetes-key.pem  # => (5) 修改这里

# 创建secret
# 1) secret名称要和上面路径中secrets/<secret名称>/ 保持一致
# 1) 证书文件名称要和上面路径中secrets/<secret名称>/<证书名称>/ 保持一致
[root@node-1 kube-prometheus-stack]# kubectl create secret generic etcd-client-cert \
                                          -n monitoring \
                                          --from-file=/etc/kubernetes/ssl/ca.pem \
                                          --from-file=/etc/kubernetes/ssl/kubernetes.pem \
                                          --from-file=/etc/kubernetes/ssl/kubernetes-key.pem

# 将secrets挂载到prometheus pod中
prometheus:
  ...
  prometheusSpec:
    ...
    secrets:                 # => (6) 修改这里，使用我们刚创建的secret
    - etcd-client-cert
```

:::

::: details 配置kube-proxy

```bash
[root@node-1 kube-prometheus-stack]# vim values.yaml
...
kubeProxy:
  enabled: true
  endpoints:         # => (1) 修改这里
  - 192.168.48.142
  - 192.168.48.143
  - 192.168.48.144
```

:::

::: details 配置kube-scheduler

```bash
[root@node-1 kube-prometheus-stack]# vim values.yaml
...
kubeScheduler:
  enabled: true
  endpoints:         # => (1) 修改这里
  - 192.168.48.142
  - 192.168.48.143
```

:::

