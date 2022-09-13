# Prometheus

官网：[https://prometheus.io/](https://prometheus.io/)

Github：[https://github.com/prometheus/prometheus/](https://github.com/prometheus/prometheus/)

Exporters：[https://prometheus.io/docs/instrumenting/exporters/](https://prometheus.io/docs/instrumenting/exporters/)

* Node Exporter：[https://github.com/prometheus/node_exporter](https://github.com/prometheus/node_exporter)

AlertManager：[https://github.com/prometheus/alertmanager](https://github.com/prometheus/alertmanager)

<br />

## 服务部署

<br />

### Prometheus Server

<br />

**部署方式1：二进制部署**

下载地址：[https://prometheus.io/download/#prometheus](https://prometheus.io/download/#prometheus)

::: details （1）下载二进制包

```bash
# 下载二进制包
[root@localhost ~]# wget -c https://github.com/prometheus/prometheus/releases/download/v2.38.0/prometheus-2.38.0.linux-amd64.tar.gz

# 解压二进制包
[root@localhost ~]# tar zxf prometheus-2.38.0.linux-amd64.tar.gz && cd prometheus-2.38.0.linux-amd64

# 创建配置文件目录和数据目录
[root@localhost ~]# mkdir /etc/prometheus
[root@localhost ~]# mkdir /var/lib/prometheus

# 移动文件
[root@localhost ~]# mv prometheus-2.38.0.linux-amd64/prometheus /usr/local/bin/  # 服务端
[root@localhost ~]# mv prometheus-2.38.0.linux-amd64/promtool   /usr/local/bin/  # 实用工具
[root@localhost ~]# mv prometheus-2.38.0.linux-amd64/*          /etc/prometheus/ # 移动所有的配置

# 查看版本
[root@localhost ~]# prometheus --version
prometheus, version 2.38.0 (branch: HEAD, revision: 818d6e60888b2a3ea363aee8a9828c7bafd73699)
  build user:       root@e6b781f65453
  build date:       20220816-13:23:14
  go version:       go1.18.5
  platform:         linux/amd64

[root@localhost ~]# promtool --version
promtool, version 2.38.0 (branch: HEAD, revision: 818d6e60888b2a3ea363aee8a9828c7bafd73699)
  build user:       root@e6b781f65453
  build date:       20220816-13:23:14
  go version:       go1.18.5
  platform:         linux/amd64

# promtool的作用之一：可以检查配置文件是否配置正确
[root@localhost ~]# promtool check config /etc/prometheus/prometheus.yml
Checking /etc/prometheus/prometheus.yml
 SUCCESS: /etc/prometheus/prometheus.yml is valid prometheus config file syntax
```

:::

::: details （2）编写Systemd启动脚本

```bash
# 编写启动脚本
[root@localhost ~]# cat >/usr/lib/systemd/system/prometheus.service <<EOF
[Unit]
Description=Prometheus
Documentation=https://prometheus.io/docs/introduction/overview/
Wants=network-online.target
After=network-online.target
 
[Service]
Type=simple
ExecStart=/usr/local/bin/prometheus \\
    --log.level=info \\
    --config.file=/etc/prometheus/prometheus.yml \\
    --storage.tsdb.path=/var/lib/prometheus \\
    --storage.tsdb.retention.time=15d \\
    --web.listen-address=0.0.0.0:9090 \\
    --web.console.templates=/etc/prometheus/consoles \\
    --web.console.libraries=/etc/prometheus/console_libraries
 
[Install]
WantedBy=multi-user.target
EOF
```

:::

::: details （3）启动服务并验证

```bash
# 启动服务
[root@localhost ~]# systemctl daemon-reload && \
                    systemctl enable prometheus && \
                    systemctl start  prometheus && \
                    systemctl status prometheus
# 检查端口
[root@localhost ~]# netstat -atlnpu | grep 9090
tcp6       0      0 :::9090                 :::*                    LISTEN      1827/prometheus     
tcp6       0      0 ::1:35726               ::1:9090                ESTABLISHED 1827/prometheus     
tcp6       0      0 ::1:9090                ::1:35726               ESTABLISHED 1827/prometheus     

# 浏览器访问：http://<ip>:9090
```

:::

<br />

**部署方式2：Dcoker部署**

文档：[https://prometheus.io/docs/prometheus/2.38/installation/](https://prometheus.io/docs/prometheus/2.38/installation/)

Docker Hub：[https://hub.docker.com/r/prom/prometheus](https://hub.docker.com/r/prom/prometheus)

::: details 点击查看详情

```bash
# (1)创建配置文件目录和数据目录
mkdir /etc/prometheus
mkdir /var/lib/prometheus

# (2) 需要提前准备配置文件prometheus.yml
docker container run --name get-prometheus-config --rm -d prom/prometheus:v2.38.0
docker container cp get-prometheus-config:/etc/prometheus/prometheus.yml /etc/prometheus
docker container rm -f get-prometheus-config

# (3) 数据存储目录需要提前创建并授权
chmod -R 777 /var/lib/prometheus

# (4) 启动容器
docker container run --name "prometheus" \
                     -p 9090:9090 \
                     -v /etc/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml \
                     -v /var/lib/prometheus:/prometheus \
                     --restart=always \
                     -d \
                 prom/prometheus:v2.38.0
```

:::

<br />

### Node Exporter

<br />

**部署方式1：二进制部署**

下载地址：[https://prometheus.io/download/#node_exporter](https://prometheus.io/download/#node_exporter)

::: details （1）下载二进制包

```bash
# 下载二进制包
[root@localhost ~]# wget -c https://github.com/prometheus/node_exporter/releases/download/v1.3.1/node_exporter-1.3.1.linux-amd64.tar.gz
[root@localhost ~]# tar zxf node_exporter-1.3.1.linux-amd64.tar.gz
[root@localhost ~]# mv node_exporter-1.3.1.linux-amd64/node_exporter /usr/local/bin/

# 查看版本
[root@localhost ~]# node_exporter --version
node_exporter, version 1.3.1 (branch: HEAD, revision: a2321e7b940ddcff26873612bccdf7cd4c42b6b6)
  build user:       root@243aafa5525c
  build date:       20211205-11:09:49
  go version:       go1.17.3
  platform:         linux/amd64
```

:::

::: details （2）编写Systemd启动脚本

```bash
# 编写启动脚本
[root@localhost ~]# cat >/usr/lib/systemd/system/node_exporter.service <<EOF
[Unit]
Description=Node Exporter
Documentation=https://github.com/prometheus/node_exporter/
Wants=network-online.target
After=network-online.target

[Service]
ExecStart=/usr/local/bin/node_exporter $OPTIONS

[Install]
WantedBy=multi-user.target
EOF
```

:::

::: details （3）启动服务并验证

```bash
# 启动服务
[root@localhost ~]# systemctl daemon-reload && \
                    systemctl start node_exporter && \
                    systemctl enable node_exporter && \
                    systemctl status node_exporter

# 检查端口
[root@localhost ~]# netstat -atlnpu | grep 9100
tcp6       0      0 :::9100                 :::*                    LISTEN      1987/node_exporter

# 测试metrics接口
[root@localhost ~]# curl http://192.168.48.133:9100/metrics
```

:::

<br />

**部署方式2：Docker部署**

文档：[https://github.com/prometheus/node_exporter#docker](https://github.com/prometheus/node_exporter#docker)

Docker Hub：[https://hub.docker.com/r/prom/node-exporter](https://hub.docker.com/r/prom/node-exporter)

::: details 点击查看详情

```bash
# 启动容器
[root@localhost ~]# docker container run --name "node_exporter" \
                                         --net="host" \
                                         --pid="host" \
                                         -v "/:/host:ro,rslave" \
                                         --restart=always \
                                         -d \
                                     prom/node-exporter:v1.3.1
        
# 测试metrics接口
[root@localhost ~]# curl http://192.168.48.133:9100/metrics
```

:::

<br />

### AlertManager

<br />

**部署方式1：二进制部署**

下载地址：[https://prometheus.io/download/#alertmanager](https://prometheus.io/download/#alertmanager)

::: details （1）下载二进制包

```bash
# 下载二进制包
[root@localhost ~]# wget -c https://github.com/prometheus/alertmanager/releases/download/v0.24.0/alertmanager-0.24.0.linux-amd64.tar.gz
[root@localhost ~]# tar zxf alertmanager-0.24.0.linux-amd64.tar.gz

# 创建配置文件目录
[root@localhost ~]# mkdir /etc/alertmanager
[root@localhost ~]# mkdir /var/lib/alertmanager

# 移动二进制文件和配置文件
[root@localhost ~]# mv alertmanager-0.24.0.linux-amd64/alertmanager      /usr/local/bin/
[root@localhost ~]# mv alertmanager-0.24.0.linux-amd64/amtool            /usr/local/bin/
[root@localhost ~]# mv alertmanager-0.24.0.linux-amd64/alertmanager.yml  /etc/alertmanager/

# 查看版本
[root@localhost ~]# alertmanager --version
alertmanager, version 0.24.0 (branch: HEAD, revision: f484b17fa3c583ed1b2c8bbcec20ba1db2aa5f11)
  build user:       root@265f14f5c6fc
  build date:       20220325-09:31:33
  go version:       go1.17.8
  platform:         linux/amd64
[root@localhost ~]# amtool --version
amtool, version 0.24.0 (branch: HEAD, revision: f484b17fa3c583ed1b2c8bbcec20ba1db2aa5f11)
  build user:       root@265f14f5c6fc
  build date:       20220325-09:31:33
  go version:       go1.17.8
  platform:         linux/amd64
```

:::

::: details （2）编写Systemd启动脚本

```bash
# 编写启动脚本
[root@localhost ~]# cat >/usr/lib/systemd/system/alertmanager.service <<EOF
[Unit]
Description=AlertManager
Documentation=https://github.com/prometheus/alertmanager
Wants=network-online.target
After=network-online.target
 
[Service]
Type=simple
ExecStart=/usr/local/bin/alertmanager \\
    --log.level=info \\
    --config.file=/etc/alertmanager/alertmanager.yml \\
    --storage.path=/var/lib/alertmanager \\
 
[Install]
WantedBy=multi-user.target
EOF
```

:::

::: details （3）启动服务并验证

```bash
# 启动服务
[root@localhost ~]# systemctl daemon-reload && \
                    systemctl enable alertmanager && \
                    systemctl start  alertmanager && \
                    systemctl status alertmanager
# 检查端口
[root@localhost ~]# netstat -atlnpu | grep -i alertmanager
tcp6       0      0 :::9093                 :::*                    LISTEN      1864/alertmanager   
tcp6       0      0 :::9094                 :::*                    LISTEN      1864/alertmanager   
udp6       0      0 :::9094                 :::*                                1864/alertmanager

# 浏览器访问：http://<ip>:9093
```

:::

<br />

**部署方式2：Docker部署**

Docker Hub：[https://hub.docker.com/r/prom/alertmanager](https://hub.docker.com/r/prom/alertmanager)

```bash
# (1)创建配置文件目录和数据目录
mkdir /etc/alertmanager
mkdir /var/lib/alertmanager

# (2) 需要提前准备配置文件alertmanager.yml
docker container run --name get-alertmanager-config --rm -d prom/alertmanager:v0.24.0
docker container cp get-alertmanager-config:/etc/alertmanager/alertmanager.yml /etc/alertmanager
docker container rm -f get-alertmanager-config

# (3) 启动容器
[root@localhost ~]# docker run --name alertmanager \
                               -p 9093:9093 \
                               -v /etc/alertmanager/alertmanager.yml:/etc/alertmanager/alertmanager.yml \
                               -v /var/lib/alertmanager:/alertmanager \
                               --restart=always \
                               -d \
                           prom/alertmanager:v0.24.0

[root@localhost ~]# docker ps | grep alertmanager
129e52ab3c42   prom/alertmanager:v0.24.0   "/bin/alertmanager -…"   About a minute ago   Up About a minute   127.0.0.1:9093->9093/tcp                              alertmanager

# 测试
# 浏览器访问：http://<ip>:9093
```

<br />

### Thanos

文档：[https://thanos.io/](https://thanos.io/)

Github：[https://github.com/prometheus/prometheus](https://github.com/prometheus/prometheus)

<br />

各组件简介：

* Sidecar：监听Prometheus本地存储目录，每隔2小时将数据上传到对象存储中
* Store：读取对象存储，提供给其他组件查询历史数据
* Query：全局查询层，它提供了一个类似Prometheus的UI界面，汇总/去重来自Sidecar、Store等的数据

<br />

**部署方式1：二进制部署**

::: details 准备工作1：下载二进制包

```bash
# 下载二进制包
[root@localhost ~]# wget -c https://github.com/thanos-io/thanos/releases/download/v0.28.0/thanos-0.28.0.linux-amd64.tar.gz

# 解压二进制包
[root@localhost ~]# tar zxf thanos-0.28.0.linux-amd64.tar.gz

# 移动文件
[root@localhost ~]# mv thanos-0.28.0.linux-amd64/thanos /usr/local/bin/

# 查看版本
[root@localhost ~]# thanos --version
thanos, version 0.28.0 (branch: HEAD, revision: 7f58065e691ab68c15ed01c4a27c236add810137)
  build user:       root@38565b300166
  build date:       20220826-17:54:10
  go version:       go1.18.5
  platform:         linux/amd64
```

:::

::: details 准备工作2：修改Prometheus启动参数

```bash
# Prometheus启动命令添加如下参数
/usr/local/bin/prometheus \
  --storage.tsdb.max-block-duration=2h \
  --storage.tsdb.min-block-duration=2h \
  --web.enable-lifecycle

# Prometheus配置文件添加全局唯一的标签
[root@localhost ~]# vim /etc/prometheus/prometheus.yml
global:
  ...
  # 新增标签，只要是kv对，写啥都行
  external_labels:
    cluster: eu1
    replica: 0
```

:::

::: details （1）部署Thanos Sidecar服务

文档：

* [https://thanos.io/v0.28/thanos/quick-tutorial.md/#sidecar](https://thanos.io/v0.28/thanos/quick-tutorial.md/#sidecar)

* [https://thanos.io/v0.28/thanos/storage.md/#tencent-cos](https://thanos.io/v0.28/thanos/storage.md/#tencent-cos)

```bash
# 创建配置文件目录
[root@localhost ~]# mkdir /etc/thanos/

# 创建存储桶配置文件（使用腾讯云COS存储）
[root@localhost ~]# vim /etc/thanos/cos_bucket_config.yaml
type: COS
config:
  # 存储桶名称
  bucket: "prometheus-1257805459"
  # 所在地域
  region: "ap-beijing"
  # 存储桶地址
  endpoint: "https://prometheus-1257805459.cos.ap-beijing.myqcloud.com"
  # 密钥
  app_id: "xxx"
  secret_key: "xxx"
  secret_id: "xxx"
  # HTTP配置
  http_config:
    idle_conn_timeout: 1m30s
    response_header_timeout: 2m
    insecure_skip_verify: false
    tls_handshake_timeout: 10s
    expect_continue_timeout: 1s
    max_idle_conns: 100
    max_idle_conns_per_host: 100
    max_conns_per_host: 0
    tls_config:
      ca_file: ""
      cert_file: ""
      key_file: ""
      server_name: ""
      insecure_skip_verify: false
    disable_compression: false
prefix: ""

# 创建启动脚本
[root@localhost ~]# cat >/usr/lib/systemd/system/thanos_sidecar.service <<EOF
[Unit]
Description=Thanos
Documentation=https://thanos.io/
Wants=network-online.target
After=network-online.target
 
[Service]
Type=simple
ExecStart=/usr/local/bin/thanos sidecar \\
    --grpc-address         0.0.0.0:10901 \\
    --http-address         0.0.0.0:10902 \\
    --tsdb.path            /var/lib/prometheus \\
    --prometheus.url       http://localhost:9090 \\
    --objstore.config-file /etc/thanos/cos_bucket_config.yaml

[Install]
WantedBy=multi-user.target
EOF

# (3) 启动服务并验证
[root@localhost ~]# systemctl daemon-reload && \
                    systemctl enable thanos_sidecar  && \
                    systemctl start thanos_sidecar  && \
                    systemctl status thanos_sidecar
```

:::

::: details （2）部署Thanos Store服务

```bash
# 创建启动脚本
[root@localhost ~]# cat >/usr/lib/systemd/system/thanos_store.service <<EOF
[Unit]
Description=Thanos
Documentation=https://thanos.io/
Wants=network-online.target
After=network-online.target
 
[Service]
Type=simple
ExecStart=/usr/local/bin/thanos store \\
    --grpc-address         0.0.0.0:10911 \\
    --http-address         0.0.0.0:10912 \\
    --data-dir             /var/lib/thanos/store \\
    --objstore.config-file /etc/thanos/cos_bucket_config.yaml

[Install]
WantedBy=multi-user.target
EOF

# 启动服务并验证
[root@localhost ~]# systemctl daemon-reload && \
                    systemctl enable thanos_store  && \
                    systemctl start thanos_store  && \
                    systemctl status thanos_store
```

:::

::: details （3）部署Thanos Query服务

```bash
# 创建启动脚本
[root@localhost ~]# cat >/usr/lib/systemd/system/thanos_query.service <<EOF
[Unit]
Description=Thanos
Documentation=https://thanos.io/
Wants=network-online.target
After=network-online.target
 
[Service]
Type=simple
ExecStart=/usr/local/bin/thanos query \\
    --grpc-address=0.0.0.0:10991 \\
    --http-address 0.0.0.0:10992 \\
    --store        localhost:10901 \\
    --store        localhost:10911 \\
    --store        dnssrv+_grpc._tcp.thanos-store.monitoring.svc

[Install]
WantedBy=multi-user.target
EOF

# 启动服务并验证
[root@localhost ~]# systemctl daemon-reload && \
                    systemctl enable thanos_query  && \
                    systemctl start thanos_query  && \
                    systemctl status thanos_query
```

:::

<br />

## 1）采集配置

### 添加目标

文档：[https://prometheus.io/docs/prometheus/latest/configuration/configuration/#scrape_config](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#scrape_config)

Prometheus默认会抓取自身暴露出来的指标，默认的配置如下

```bash
[root@localhost ~]# vim /etc/prometheus/prometheus.yml
...
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: "prometheus"

    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.

    static_configs:
      - targets: ["localhost:9090"]
```

以上配置看起来比较乱，将注释删掉，将上面提到的默认值显式写出来，如下所示：

```bash
scrape_configs:
  - job_name: "prometheus"
    scheme: "http"
    metrics_path: "/metrics"
    static_configs:
      - targets: ["localhost:9090"]
```

然后配置抓取`node_export`指标（需要提前在Prometheus所在主机部署`node_exporter`）：

```bash
scrape_configs:
  - job_name: "prometheus"
    scheme: "http"
    metrics_path: "/metrics"
    static_configs:
      - targets:
        - "localhost:9090"
  # 因为Prometheus和node_exporter在同一个机器上，所以可以直接在上面添加ip，但是强烈不建议这么做，因为语义就乱了
  # 这里新建一个job，代表所有的node_exporter服务
  - job_name: "node"
    scheme: "http"
    metrics_path: "/metrics"
    static_configs:
      - targets:
        - "localhost:9100"
```

<br />

### 添加标签

文档：[https://prometheus.io/docs/prometheus/latest/configuration/configuration/#static_config](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#static_config)

```bash
# 比如node下有两台主机，分别拥有不同的标签
[root@localhost ~]# vim /etc/prometheus/prometheus.yml
  - job_name: "node"
    scheme: "http"
    metrics_path: "/metrics"
    static_configs:
      - targets:
        - "localhost:9100"
        labels:
          a: 1
      - targets:
        - "127.0.0.1:9100"
        labels:
          b: 2
```

![image-20220913164703075](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220913164703075.png)

### 重新标记

文档：[https://prometheus.io/docs/prometheus/latest/configuration/configuration/#relabel_config](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#relabel_config)

`relabel_config`会**在目标被抓取之前**动态重写目标的标签集



::: details （1）替换标签值 或 新增标签

```bash
[root@localhost ~]# vim /etc/prometheus/prometheus.yml
...
- job_name: "node"
    scheme: "http"
    metrics_path: "/metrics"
    static_configs:
      - targets:
        - "localhost:9100"
    relabel_configs:
      - action: replace                  # action为replace，这也是默认值
        source_labels: ['__address__']   # 指定源标签
        target_label: 'job'              # 指定目标标签

# 上面配置的意思是：用源标签的值替换目标标签的值
# 需要注意的点：
#  (1) 若源标签不存在则本配置无效
#  (2) 若目标标签不存在则会新增一个标签
```

查看效果

![image-20220913221443064](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220913221443064.png)

![image-20220913220900439](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220913220900439.png)

![image-20220913221008777](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220913221008777.png)

:::





## 2）PromSQL

### Metrics

文档：[https://prometheus.io/docs/practices/naming/#metric-and-label-naming](https://prometheus.io/docs/practices/naming/#metric-and-label-naming)

<br />

**Metrics格式**

```bash
<metric name>{<label name>=<label value>, <label name>=<label value>, ...}
```

<br />

**Metric Name**

* 对于特定的应用程序的指标，前缀通常是应用程序本身，比如`node_xxx`、`prometheus_xxx`，

  还可以有其他的前缀：`go_`、`process_`、`promhttp_`、`net_conntrack_`，可以通过如下语句查询得知

  ```bash
  curl -s http://localhost:9090/metrics | grep -Ev '^#|^prometheus'
  curl -s http://localhost:9100/metrics | grep -Ev '^#|^node'
  ```

* 若要使用单位则应该使用基本单位（参考[官方文档](https://prometheus.io/docs/practices/naming/#base-units)），比如使用 `seconds`而不是使用 `milliseconds`

  每个基本单位都应该用复数，比如 `seconds`而不是 `second`

  单位后面可以加描述性的后缀，比如 `prometheus_http_requests_total`（`Counter`通常使用`total`作为后缀）

<br />

**Metrics Type**

文档：[https://prometheus.io/docs/tutorials/understanding_metric_types/](https://prometheus.io/docs/tutorials/understanding_metric_types/)

Counter：一个只能增加或重置的度量值

Gauge：一个可增可减的度量值

Histogram：累计直方图类，用于统计在某个区间内出现次数的度量值，示例：

* `prometheus_http_request_duration_seconds_bucket`（*不同区间分类* 通常使用`bucket`作为后缀）
* `prometheus_http_request_duration_seconds_count`（*所有区间采样次数总和* 通常使用`count`作为后缀）
* `prometheus_http_request_duration_seconds_sum`（*所有区间采样值总和* 通常使用`sum`作为后缀）

Summary：百分位统计

<br />

### 表达式数据类型

在 Prometheus 的表达式语言中，表达式或子表达式可以计算为以下四种类型之一：

- **即时向量（Instant vector）**：一组时间序列，每个时间序列包含一个样本，都共享相同的时间戳
- **范围向量（Range vector）**： 一组时间序列，其中包含每个时间序列随时间变化的数据点范围
- **标量（Scalar）**： 一个简单的数字浮点值
- **String** ： 一个简单的字符串值；目前未使用

<br />

### 时间序列选择器

文档：[https://prometheus.io/docs/prometheus/2.38/querying/basics/](https://prometheus.io/docs/prometheus/2.38/querying/basics/)

#### 即时向量

**基本操作符**

- `=`：等于
- `!=`：不等于
- `=~`：正则匹配
- `!~`：正则不匹配

**注意事项**

* 正则表达式匹配完全锚定，即 `env=~"foo"`被视为`env=~"^foo$"`
* `prometheus_http_requests_total{code="200"}`也等同于 `{__name__="prometheus_http_requests_total", code="200"}`

<br />

#### 范围向量

```bash
# 这样查是查询当前的值
prometheus_http_requests_total{handler="/metrics"}

# [5m] 添加一个范围，5分钟内的值都会查出来，根据采集时间间隔会输出很多个结果
prometheus_http_requests_total{handler="/metrics"}[5m]

# [5m:1m]这样会以每一分钟一个结果输出，总共输出5个结果
prometheus_http_requests_total{handler="/metrics"}[5m:1m]
```

范围向量不支持以图表显示，所以这里使用表格显示

![image-20220912112033373](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220912112033373.png)

#### 时间偏移

```bash
# 查看1天前这个时间点的数据
prometheus_http_requests_total{handler="/metrics"} offset 1d

# 查看1天前这个时间点过去5分钟的数据
prometheus_http_requests_total{handler="/metrics"}[5m:1m] offset 1d
```



#### @修饰符

```bash
# @修饰符允许我们查看某一个具体时间点的数据

# (1) 先使用范围向量查询一次，以表格显示，可以得到值和时间戳
prometheus_http_requests_total{handler="/metrics"}[120m:12m]

1562 @1662948000
2282 @1662948720
3002 @1662949440
3722 @1662950160
4442 @1662950880
5162 @1662951600
5882 @1662952320
6602 @1662953040
7322 @1662953760
27485 @1662954480

# (2) 使用@修饰符查询具体时间点的数据
prometheus_http_requests_total{handler="/metrics"} @1662948720
prometheus_http_requests_total{handler="/metrics"} @1662953760
```

<br />

### 运算

文档：[https://prometheus.io/docs/prometheus/2.38/querying/operators/](https://prometheus.io/docs/prometheus/2.38/querying/operators/)

#### 二元运算符

按优先级由高到低排序：

1. `^`
2. `*`, `/`, `%`,`atan2`
3. `+`,`-`
4. `==`, `!=`, `<=`, `<`, `>=`,`>`
5. `and`（并且）,`unless`（排除）
6. `or`（或者）

相同优先级的运算符是左结合的。例如， `2 * 3 % 2`等价于`(2 * 3) % 2`。然而`^`是右结合的，所以`2 ^ 3 ^ 2`等价于`2 ^ (3 ^ 2)`



（1）计算Node内存使用率

```bash
# 方式1
( 1 - (node_memory_Buffers_bytes + node_memory_Cached_bytes + node_memory_MemFree_bytes) / node_memory_MemTotal_bytes ) * 100

# 方式2
100 - (node_memory_Buffers_bytes + node_memory_Cached_bytes + node_memory_MemFree_bytes) / node_memory_MemTotal_bytes * 100

# 方式3
(node_memory_MemTotal_bytes - node_memory_MemFree_bytes - node_memory_Buffers_bytes - node_memory_Cached_bytes) / node_memory_MemTotal_bytes * 100
```

#### 向量匹配`on`和`ignoring`

待补充

#### 组修饰符`group_left`和`group_right`

待补充

#### 聚合运算符

- `sum`（计算维度总和）
- `min`（选择最小尺寸）
- `max`（选择最大尺寸）
- `avg`（计算尺寸的平均值）
- `group`（结果向量中的所有值都是 1）
- `stddev`（计算维度上的总体标准偏差）
- `stdvar`（计算维度上的总体标准方差）
- `count`（计算向量中的元素个数）
- `count_values`（计算具有相同值的元素个数）
- `bottomk`（样本值的最小 k 个元素）
- `topk`（按样本值计算的最大 k 个元素）
- `quantile`（在维度上计算 φ-quantile (0 ≤ φ ≤ 1)）

`without（label，...）`用于从计算结果中移除列举的标签，而保留其它标签

`by（label, ...）`则正好相反，结果向量中只保留列出的标签，其余标签则移除



#### 函数

文档：[https://prometheus.io/docs/prometheus/latest/querying/functions/](https://prometheus.io/docs/prometheus/latest/querying/functions/)

须知：

* 使用函数要知道操作的是哪种向量，即时向量（instant-vector）还是范围向量（）
* 有些函数是有默认参数的，比如`year(v=vector(time()) instant-vector)`

<br />

## 3）存储配置

文档：[https://prometheus.io/docs/prometheus/2.38/storage/](https://prometheus.io/docs/prometheus/2.38/storage/)

### 本地存储

Prometheus内部实现了一个磁盘的时间序列数据库，常用参数有：

* `--storage.tsdb.path`指定数据保存在本地磁盘的路径，不支持不符合`POSIX`标准的文件系统，所以不要将数据保存在`NFS`文件系统中
* `--storage.tsdb.retention.time`设置保留时间，默认数据保留时间为15天（`15d`），支持的最低保留时间为2小时（`2h`）
* `--storage.tsdb.retention.size`设置磁盘最大使用量

Prometheus本地存储并不适合长期存储数据，建议通过**远程读写**方式使用外部存储

<br />

### 外部存储

支持的远程存储列表：[https://prometheus.io/docs/operating/integrations/#remote-endpoints-and-storage](https://prometheus.io/docs/operating/integrations/#remote-endpoints-and-storage)

推荐使用[Thanos](https://github.com/thanos-io/thanos)

<br />

## 4）安全配置

### 配置Basic Auth

文档：

* [https://prometheus.io/docs/prometheus/latest/configuration/configuration/#scrape_config](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#scrape_config)
* [https://prometheus.io/docs/guides/basic-auth/](https://prometheus.io/docs/guides/basic-auth/)

::: details （1）Prometheus Web添加Basic Auth认证

```bash
# 使用bcrypt算法对密码加密
[root@localhost ~]# yum -y install httpd-tools
[root@localhost ~]# htpasswd -nBC 10 "" | tr -d ":"
New password:           # 密码是123456
Re-type new password: 
$2y$10$b1tsEV5yD3xYCxH3rMMSAuc.HsTNW8xEWCDl0prxPpqL.DhT27pBG

# 修改或创建Web配置文件
[root@localhost ~]# vim /etc/prometheus/prometheus-web.yml
basic_auth_users:
  admin: $2y$10$b1tsEV5yD3xYCxH3rMMSAuc.HsTNW8xEWCDl0prxPpqL.DhT27pBG

# 检查配置文件是否正确
[root@localhost ~]# promtool check web-config /etc/prometheus/prometheus-web.yml
/etc/prometheus/prometheus-web.yml SUCCESS

# 修改Prometheus启动参数，添加如下选项
/usr/local/bin/prometheus \
  --web.config.file=/etc/prometheus/prometheus-web.yml

# 重启服务

# 测试（以下是curl的两种使用姿势，YWRtaW46MTIzNDU2是通过echo -n "admin:123456" | base64 而来）
[root@localhost ~]# curl http://admin:123456@127.0.0.1:9090/metrics
[root@localhost ~]# curl -H "Authorization: Basic YWRtaW46MTIzNDU2" http://127.0.0.1:9090/metrics
```

:::

::: details （2）Prometheus抓取自身时添加认证信息

```bash
[root@localhost ~]# vim /etc/prometheus/prometheus.yml
...
scrape_configs:
  - job_name: "prometheus"
    scheme: "http"
    metrics_path: "/metrics"
    static_configs:
      - targets:
        - "localhost:9090"       
    # 添加如下信息
    basic_auth:
      username: "admin"
      password: "123456"
  - job_name: "node"
    scheme: "http"
    metrics_path: "/metrics"
    static_configs:
      - targets:
        - "localhost:9100"

# 检查配置文件
[root@localhost ~]# promtool check config /etc/prometheus/prometheus.yml
Checking /etc/prometheus/prometheus.yml
 SUCCESS: /etc/prometheus/prometheus.yml is valid prometheus config file syntax

# 重启Prometheus，然后去Web界面检查
```

:::

<br />

### 配置HTTPS协议

文档：

* [https://prometheus.io/docs/prometheus/latest/configuration/https/](https://prometheus.io/docs/prometheus/latest/configuration/https/)
* [https://prometheus.io/docs/prometheus/latest/configuration/configuration/#tls_config](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#tls_config)

::: details （1）Prometheus Web添加 自签HTTPS证书支持

```bash
# 生成自签证书
C:\Users\Administrator\Desktop>mkcert prometheus.jinhui.dev

Created a new certificate valid for the following names 📜
 - "prometheus.jinhui.dev"

The certificate is at "./prometheus.jinhui.dev.pem" and the key at "./prometheus.jinhui.dev-key.pem" ✅

It will expire on 9 December 2024 🗓

# 将证书上传到/etc/prometheus/pki/
# 修改/etc/hosts解析域名

# 修改Web配置文件，添加如下配置
[root@localhost ~]# vim /etc/prometheus/prometheus-web.yml
tls_server_config:
  cert_file: /etc/prometheus/pki/prometheus.jinhui.dev.pem
  key_file: /etc/prometheus/pki/prometheus.jinhui.dev-key.pem

# 检查配置文件
[root@localhost ~]# promtool check web-config /etc/prometheus/prometheus-web.yml
/etc/prometheus/prometheus-web.yml SUCCESS

# 重启Prometheus，使用HTTPS协议登录Web界面验证
```

:::

::: details （2）Prometheus抓取目标修改

* 需要将协议改为`HTTPS`
* 需要匹配证书中的域名：
  * 方式一：添加`tls_config.server_name`用于验证证书中的域名
  * 方式二：修改 `static_configs.targets`处改成域名的形式
* 自签证书需要验证CA：
  * 方式一：由于Prometheus不认识自签证书的CA，还需要指定一下CA文件
  * 方式二：关闭服务端证书验证

```bash
# 先上传CA文件到系统中/etc/prometheus/pki/

# 修改配置
[root@localhost ~]# vim /etc/prometheus/prometheus.yml
scrape_configs:
  - job_name: "prometheus"
    scheme: "https"
    metrics_path: "/metrics"
    static_configs:
      - targets:
        - "localhost:9090"
    basic_auth:
      username: "admin"
      password: "123456"
    tls_config:
      server_name: "prometheus.jinhui.dev"
      ca_file: "/etc/prometheus/pki/rootCA.pem"
      #insecure_skip_verify: true
  - job_name: "node"
    scheme: "http"
    metrics_path: "/metrics"
    static_configs:
      - targets:
        - "localhost:9100"

# 检查配置文件
[root@localhost ~]# promtool check config /etc/prometheus/prometheus.yml
Checking /etc/prometheus/prometheus.yml
 SUCCESS: /etc/prometheus/prometheus.yml is valid prometheus config file syntax
 
# 重启Prometheus，登录Web界面验证
```

![image-20220910085501979](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220910085501979.png)

:::

<br />

## 5）报警配置

