# Prometheus

官网：[https://prometheus.io/](https://prometheus.io/)

Github：[https://github.com/prometheus/prometheus/](https://github.com/prometheus/prometheus/)

* AlertManager：[https://github.com/prometheus/alertmanager](https://github.com/prometheus/alertmanager)
* Awesome：[https://awesome-prometheus-alerts.grep.to/](https://awesome-prometheus-alerts.grep.to/)
* Exporters：[https://prometheus.io/docs/instrumenting/exporters/](https://prometheus.io/docs/instrumenting/exporters/)
* 多目标导出器模式：https://prometheus.io/docs/guides/multi-target-exporter

<br />

## 服务部署

<br />

### Prometheus

::: details 二进制部署

**1、下载二进制包**

下载地址：[https://prometheus.io/download/#prometheus](https://prometheus.io/download/#prometheus)

```bash
# 下载二进制包
[root@localhost ~]# wget -c https://github.com/prometheus/prometheus/releases/download/v2.38.0/prometheus-2.38.0.linux-amd64.tar.gz

# 解压二进制包
[root@localhost ~]# tar zxf prometheus-2.38.0.linux-amd64.tar.gz

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

**2、编写Systemd启动脚本**

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

**3、启动服务并验证**

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

# 浏览器访问：http://192.168.48.133:9090
```

:::

::: details Dcoker部署

文档：[https://prometheus.io/docs/prometheus/2.38/installation/](https://prometheus.io/docs/prometheus/2.38/installation/)

Docker Hub：[https://hub.docker.com/r/prom/prometheus](https://hub.docker.com/r/prom/prometheus)

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
                     -v /etc/prometheus:/etc/prometheus \
                     -v /var/lib/prometheus:/prometheus \
                     --restart=always \
                     -d \
                 prom/prometheus:v2.38.0

# (5) 浏览器访问：http://192.168.48.133:9090
```

:::

<br />

### AlertManager

::: details 二进制部署

下载地址：[https://prometheus.io/download/#alertmanager](https://prometheus.io/download/#alertmanager)

**1、下载二进制包**

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

**2、编写Systemd启动脚本**

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
    --web.external-url=http://192.168.48.133:9093 \\
 
[Install]
WantedBy=multi-user.target
EOF
```

说明：

* `--web.external-url`：在发送邮箱告警等里面可能会有`AlertManager`的地址，这里设置的就是AlertManager外部访问的地址

**3、启动服务并验证**

```bash
# 启动服务
[root@localhost ~]# systemctl daemon-reload && \
                    systemctl enable alertmanager && \
                    systemctl start  alertmanager && \
                    systemctl status alertmanager
# 检查端口
[root@localhost ~]# netstat -atlnpu | grep -i 9093
tcp6       0      0 :::9093                 :::*                    LISTEN      1071/alertmanager

# 浏览器访问：http://192.168.48.133:9093
```

:::

::: details Docker部署

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
# 浏览器访问：http://192.168.48.133:9093
```

:::

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

::: details 准备工作

**1、下载二进制包**

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

**2、修改Prometheus启动参数**

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

### Helper Script

::: details 点击查看详情

`watcher.sh`：在学习阶段会频繁修改配置文件，此脚本用于监听`Prometheus`配置文件，一旦发现被修改后就重启服务，避免重复操作

```bash
#!/bin/bash

while [ 1 ]
do
  firstMd5=$(md5sum /etc/prometheus/prometheus.yml | awk '{print $1}')
  sleep 1
  secondMd5=$(md5sum /etc/prometheus/prometheus.yml | awk '{print $1}')
  if [[ $firstMd5 != $secondMd5 ]];then
    promtool check config /etc/prometheus/prometheus.yml
    if [[ $? -eq 0 ]];then
      systemctl restart prometheus
    fi
  fi
done
```

效果图

![image-20220914184114103](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220914184114103.png)

:::

<br />

### node_exporter

::: details 二进制部署

**1、下载二进制包**

下载地址：[https://prometheus.io/download/#node_exporter](https://prometheus.io/download/#node_exporter)

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

**2、编写Systemd启动脚本**

```bash
# 编写启动脚本
[root@localhost ~]# cat >/usr/lib/systemd/system/node_exporter.service << EOF
[Unit]
Description=Node Exporter
Documentation=https://github.com/prometheus/node_exporter/
Wants=network-online.target
After=network-online.target

[Service]
ExecStart=/usr/local/bin/node_exporter

[Install]
WantedBy=multi-user.target
EOF
```

**3、启动服务并验证**

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
[root@localhost ~]# curl http://127.0.0.1:9100/metrics
[root@localhost ~]# curl http://192.168.48.133:9100/metrics
```

:::

::: details Docker部署

Github：[https://github.com/prometheus/node_exporter](https://github.com/prometheus/node_exporter)

Docker Hub：[https://hub.docker.com/r/prom/node-exporter](https://hub.docker.com/r/prom/node-exporter)

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

### blackbox_exporter

::: details Docker部署

Github：[https://github.com/prometheus/blackbox_exporter](https://github.com/prometheus/blackbox_exporter)

Docker Hub：[https://hub.docker.com/r/prom/blackbox-exporter](https://hub.docker.com/r/prom/blackbox-exporter)

```bash
# (1)创建配置文件目录
mkdir /etc/blackbox_exporter

# (2) 需要提前准备配置文件prometheus.yml
docker container run --name get-blackbox-exporter-config --rm -d prom/blackbox-exporter:v0.24.0
docker container cp get-blackbox-exporter-config:/etc/blackbox_exporter/config.yml /etc/blackbox_exporter/
docker container rm -f get-blackbox-exporter-config

# (3) 启动容器
[root@localhost ~]# docker container run --name "blackbox_exporter" \
                                         -p 9115:9115 \
                                         -v /etc/blackbox_exporter:/etc/blackbox_exporter \
                                         --restart=always \
                                         -d \
                                     prom/blackbox-exporter:v0.24.0 \
                                         --config.file=/etc/blackbox_exporter/config.yml
# (4) 测试metrics接口
[root@localhost ~]# curl http://192.168.48.133:9115/metrics

# (5) 测试模块接口
[root@node-1 ~]# curl -s http://192.168.48.133:9115/probe?module=http_2xx\&target=jinhui.dev | grep -Ev '^#'
probe_dns_lookup_time_seconds 0.005926243
probe_duration_seconds 0.452055808
probe_failed_due_to_regex 0
probe_http_content_length 23389
probe_http_duration_seconds{phase="connect"} 0.12256418899999999
probe_http_duration_seconds{phase="processing"} 0.12341058599999999
probe_http_duration_seconds{phase="resolve"} 0.012360312
probe_http_duration_seconds{phase="tls"} 0.130147485
probe_http_duration_seconds{phase="transfer"} 0.062120979
probe_http_last_modified_timestamp_seconds 1.684570015e+09
probe_http_redirects 1
probe_http_ssl 1
probe_http_status_code 200
probe_http_uncompressed_body_length 23389
probe_http_version 2
probe_ip_addr_hash 4.027875985e+09
probe_ip_protocol 4
probe_ssl_earliest_cert_expiry 1.717113599e+09
probe_ssl_last_chain_expiry_timestamp_seconds 1.717113599e+09
probe_ssl_last_chain_info{fingerprint_sha256="b70c28b0cd1e5a4ab911a529be943428aecd24c409d3fbecebfc200e5b14b395",issuer="CN=TrustAsia RSA DV TLS CA G2,O=TrustAsia Technologies\\, Inc.,C=CN",subject="CN=jinhui.dev",subjectalternative="jinhui.dev,www.jinhui.dev"} 1
probe_success 1
probe_tls_version_info{version="TLS 1.2"} 1
```

:::

::: details （1）配置Prometheus采集blackbox_exporter

```bash
# 下面是一个基础功能完备的最小化的写法
  - job_name: "blackbox"
    metrics_path: "/probe"                # 这里需要修改一下
    static_configs:                       #
      - targets:                          # 下面写需要监控的域名或地址
        - "prometheus.io"                 # 
        - "jinhui.dev"                    # 
        - "qq.com"                        # 
        - "ip.sb"                         # 
        - "baidu.com"                     # 

    relabel_configs:                      #
      - target_label: __param_target      # 添加一个标签 __param_target
        source_labels: [__address__]      # 说明: 这里是给Endpoint添加target标签,必须要有,显示在Endpoint表格内
      - target_label: instance            # 添加一个标签 instance
        source_labels: [__param_target]   # 说明: 这里是给Endpoint添加instance标签(实际是覆盖instance标签),显示在Labels表格内
      - target_label: __address__         # 添加一个标签 __address__
        replacement: 192.168.48.132:9115  # blackbox_exporter地址
      - target_label: module              # 添加一个标签 module
        replacement: http_2xx             # 使用 http_2xx 模块监控HTTP/HTTPS连接
```

![image-20230520185056318](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520185056318.png)

:::

::: details （2）关于被监控域名因为书写引发的问题

**先说现象**

别的指标都为1，就 `baidu.com` 为 0

![image-20230520190756076](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520190756076.png)

其他指标就单单没有 `baidu.com` 的信息

![image-20230520190903574](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520190903574.png)

**1、先来分析一下 probe_http_ssl**

```bash
# 意思说 最终重定向到的域名是否使用了SSL
[root@node-1 ~]# curl -s http://192.168.48.133:9115/probe?module=http_2xx\&target=jinhui.dev | grep --color=auto probe_http_ssl
# HELP probe_http_ssl Indicates if SSL was used for the final redirect
# TYPE probe_http_ssl gauge
probe_http_ssl 1

# 测试一下, 根本就没有使用HTTP状态码来做重定向
[root@node-1 ~]# curl baidu.com 
<html>
<meta http-equiv="refresh" content="0;url=http://www.baidu.com/">
</html>

# 看一下响应头,直接返回了
[root@node-1 ~]# curl baidu.com -I
HTTP/1.1 200 OK
Date: Sat, 20 May 2023 11:14:16 GMT
Server: Apache
Last-Modified: Tue, 12 Jan 2010 13:48:00 GMT
ETag: "51-47cf7e6ee8400"
Accept-Ranges: bytes
Content-Length: 81
Cache-Control: max-age=86400
Expires: Sun, 21 May 2023 11:14:16 GMT
Connection: Keep-Alive
Content-Type: text/html

# 解决思路
# 只需要让他最终可以跳转到HTTPS协议即可
```

**2、我直接修改为 https://baidu.com 可以吗？**

```bash
# 先测试一下, TMD, 它居然又跳到HTTP了?! 这是什么鬼操作?
# 所以推测的结论是不能直接修改为https://baidu.com
[root@node-1 ~]# curl https://baidu.com -I
HTTP/1.1 302 Moved Temporarily
Server: bfe/1.0.8.18
Date: Sat, 20 May 2023 11:27:34 GMT
Content-Type: text/html
Content-Length: 161
Connection: keep-alive
Location: http://www.baidu.com/
```

![image-20230520193034810](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520193034810.png)

**3、解决办法: 修改为 https://www.baidu.com **

```bash
# 先验证一下,最终会被解析到HTTPS协议上去
[root@node-1 ~]# curl https://www.baidu.com -I
HTTP/1.1 200 OK
Accept-Ranges: bytes
Cache-Control: private, no-cache, no-store, proxy-revalidate, no-transform
Connection: keep-alive
Content-Length: 277
Content-Type: text/html
Date: Sat, 20 May 2023 11:31:08 GMT
Etag: "575e1f59-115"
Last-Modified: Mon, 13 Jun 2016 02:50:01 GMT
Pragma: no-cache
Server: bfe/1.0.8.18
```

![image-20230520193408896](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520193408896.png)

![image-20230520193524607](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520193524607.png)

:::

<br />

## 采集配置

### 添加目标

文档：[https://prometheus.io/docs/prometheus/latest/configuration/configuration/#scrape_config](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#scrape_config)

::: details 点击查看详情

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

:::

<br />

### 添加标签

文档：[https://prometheus.io/docs/prometheus/latest/configuration/configuration/#static_config](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#static_config)

::: details 点击查看详情

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

:::

<br />

### 自动生成的时间序列

文档：[https://prometheus.io/docs/concepts/jobs_instances/#automatically-generated-labels-and-time-series](https://prometheus.io/docs/concepts/jobs_instances/#automatically-generated-labels-and-time-series)

::: details 点击查看详情

每个目标自动生成的标签：

- `job`：目标所属的已配置作业名称。
- `instance`:`<host>:<port>`被抓取的目标 URL 的一部分

每个目标自动生成的监控指标：

* `up{}`：目标抓取成功返回1，抓取失败返回0，通常应用于实例可用性监控
* `scrape_duration_seconds{}`：持续的抓取时间？
* `scrape_samples_scraped{}`：目标暴露的样本数，等同于`curl -s http://127.0.0.1:9090/metrics | grep -Ev '^#' | wc`
* `scrape_samples_post_metric_relabeling{}`：重新标记后剩余的样本数？
* `scrape_series_added{}`：本次抓取中新系列的大致数量？

:::

<br />

### 服务发现：基于文件

文档：[https://prometheus.io/docs/prometheus/2.38/configuration/configuration/#file_sd_config](https://prometheus.io/docs/prometheus/2.38/configuration/configuration/#file_sd_config)

::: details 点击查看详情

```bash
# 修改Prometheus配置
[root@localhost ~]# vim /etc/prometheus/prometheus.yml
scrape_configs:
  - job_name: "prometheus"
    static_configs:
      - targets: ["localhost:9090"]
  - job_name: "node"
    file_sd_configs:                                     # 基于文件的服务发现
      - files: ["/etc/prometheus/file_sd_config/*.yml"]  # 文件目录, 文件名支持通配符，文件格式支持JSON和YAML
        refresh_interval: "10s"                          # 服务发现间隔时间，默认为5分钟

# 创建文件发现目录
[root@localhost ~]# mkdir -p /etc/prometheus/file_sd_config/
[root@localhost ~]# touch /etc/prometheus/file_sd_config/node.yml

# 检查配置文件
[root@localhost ~]# promtool check config /etc/prometheus/prometheus.yml
Checking /etc/prometheus/prometheus.yml
 SUCCESS: /etc/prometheus/prometheus.yml is valid prometheus config file syntax
 
# 重启Prometheus
[root@localhost ~]# systemctl restart prometheus.service

# -------------------------------------------------------------------------------------------------------------
# 这里我们添加主机，并让Prometheus自动发现我们添加的主机（无需重启Prometheus）

[root@localhost ~]# vim /etc/prometheus/file_sd_config/node.yml
- targets:
    - "localhost:9100"
  labels:
    id: 1
- targets:
    - "127.0.0.1:9100"
  labels:
    id: 2

# 检查配置文件
[root@localhost ~]# promtool check config /etc/prometheus/prometheus.yml
Checking /etc/prometheus/prometheus.yml
 SUCCESS: /etc/prometheus/prometheus.yml is valid prometheus config file syntax
```

到Web界面进行验证

![image-20220923205543236](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220923205543236.png)

:::

<br />

### 服务发现：基于DNS

文档：[https://prometheus.io/docs/prometheus/2.38/configuration/configuration/#dns_sd_config](https://prometheus.io/docs/prometheus/2.38/configuration/configuration/#dns_sd_config)

::: details 点击查看详情

说明：

* 支持A、AAAA、MX 和 SRV记录查询
* 查询时会使用`/etc/resolv.conf`中的DNS服务器，不支持`/etc/hosts`解析域名

```bash
# 修改Prometheus配置（以下地址是不对外的，你需要配置成一个其他的域名）
[root@localhost ~]# vim /etc/prometheus/prometheus.yml
  ...
  - job_name: "node"
    dns_sd_configs:
      - type: "A"
        names: ["jinhui.dev"]
        port: 9100
        refresh_interval: "10s"

# 检查配置文件
[root@localhost ~]# promtool check config /etc/prometheus/prometheus.yml
Checking /etc/prometheus/prometheus.yml
 SUCCESS: /etc/prometheus/prometheus.yml is valid prometheus config file syntax
 
# 重启Prometheus
[root@localhost ~]# systemctl restart prometheus.service
```

![image-20220924121715522](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220924121715522.png)

:::

<br />

### 服务发现：基于Docker

文档：[https://prometheus.io/docs/prometheus/2.38/configuration/configuration/#docker_sd_config](https://prometheus.io/docs/prometheus/2.38/configuration/configuration/#docker_sd_config)

::: details 点击查看详情

```bash
# 修改Prometheus配置（以下地址是不对外的，你需要配置成一个其他的域名）
[root@localhost ~]# vim /etc/prometheus/prometheus.yml
  ...
  docker_sd_configs:
    - host: "unix:///var/run/docker.sock"
      refresh_interval: "10s"
  
# 检查配置文件
[root@localhost ~]# promtool check config /etc/prometheus/prometheus.yml
Checking /etc/prometheus/prometheus.yml
 SUCCESS: /etc/prometheus/prometheus.yml is valid prometheus config file syntax
 
# 重启Prometheus
[root@localhost ~]# systemctl restart prometheus.service
```

这里我们随便起了一个容器，并没有提供Metrics接口，所以State状态为DOWN

![image-20220925141134345](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220925141134345.png)

:::

<br />

### 服务发现：基于Kubernetes

文档：[https://prometheus.io/docs/prometheus/2.38/configuration/configuration/#kubernetes_sd_config](https://prometheus.io/docs/prometheus/2.38/configuration/configuration/#kubernetes_sd_config)

::: details 发现Pod

```bash
[root@localhost ~]# vim /etc/prometheus/prometheus.yml

  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
    - role: pod
      kubeconfig_file: /etc/.kube.config
    relabel_configs:
      - action: labelmap
        regex: __meta_kubernetes_pod_label_(.+)

      - action: replace
        target_label: namespace
        source_labels: [__meta_kubernetes_namespace]

      - action: replace
        target_label: pod
        source_labels: [__meta_kubernetes_pod_name]
```

:::

<br />

### 目标重新标记：relabel

文档：[https://prometheus.io/docs/prometheus/2.38/configuration/configuration/#relabel_config](https://prometheus.io/docs/prometheus/2.38/configuration/configuration/#relabel_config)

`relabel_config` 会 在目标被抓取之前动态重写目标的标签集

::: details （1）直接替换目标标签值：动态值

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
      - action: "replace"                # action为replace，这也是默认值
        target_label: "job"              # 指定目标标签
        source_labels: ["__address__"]   # 指定源标签

# 上面配置的意思是：用源标签的值替换目标标签的值, 或者说 target_label是标签名, source_labels是标签值
# 需要注意的点：
#  1、若源标签不存在或值匹配不上则本配置无效
#  2、 若目标标签不存在则会新增一个标签

# relabel_configs还有一些默认值，如果我们都写出来的话，将会是这样的
# 上下两段配置效果是一样的，我们在后面会有关于正则的一些例子
# 注意各个字段的执行顺序: 先执行 执行 separator拼接, 再执行 regex 匹配出合适的值, 最后执行 replacement 替换
  - job_name: "node"
    scheme: "http"
    metrics_path: "/metrics"
    static_configs:
      - targets:
        - "localhost:9100"
    relabel_configs:
      - action: "replace"
        target_label: "job"            # 标签名              
        source_labels: ["__address__"] # 标签值
        separator: ";"                 # 指定分隔符,会使用此分隔符连接source_labels的多个值,组成一个新值
        regex: "(.*)"                  # 匹配多个标签组成的新值        
		replacement: "$1"              # 新标签的值，这里是引用上面regex的值
```

![image-20220914123015546](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220914123015546.png)

:::

::: details （2）直接替换目标标签值：静态值

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
      - action: "replace"                # action为replace，这也是默认值
        target_label: "job"              # 指定目标标签
        replacement: "NewJob"            # 设置一个静态值
```

![image-20220914130109575](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220914130109575.png)

:::

::: details （3）使用正则替换目标标签值

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

      - action: "replace"
        target_label: "port"           # 新标签名
        source_labels: ["__address__"] #
        separator: ";"                 # 默认值，用于连接source_labels中的多个标签组成一个新值
        regex: "(.*)(:)(.*)"           # 使用正则匹配源标签的值，然后正则分组,默认为(.*)
        replacement: "$3"              # 新标签值

      - action: "replace"
        target_label: "endpoint"        
        source_labels: ["__scheme__", "__address__", "__metrics_path__"]
        separator: ";"
        regex: "(.*)(;)(.*)(;)(.*)"
        replacement: "$1://$3$5"
```

![image-20220914125740128](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220914125740128.png)

:::

::: details （3）删除目标指定的标签

```bash
[root@localhost ~]# vim /etc/prometheus/prometheus.yml
...
- job_name: "node"
    scheme: "http"
    metrics_path: "/metrics"
    static_configs:
      - targets:
        - "localhost:9100"
        labels:
          a: 1
          b: 2
    relabel_configs:
      - action: "labeldrop"
        regex: "(job)|(a)"

# 以上的意思是：将regex匹配到的标签全部删掉
# 需要注意
# 1、正则是完全锚定的，即 "(job)|(a)" == "(^job$)|(^a$)"
# 2、 如果删除掉__address__标签，那么Web界面上就不会显示抓取目标了，就相当于根本没写抓取目标一样

# ===================================================================================
# 还有一个类似的labelkeep，用于保留regex匹配到的标签，删除其他的标签，但是测试之后发现有问题
  - job_name: "node"
    scheme: "http"
    metrics_path: "/metrics"
    static_configs:
      - targets:
        - "localhost:9100"
    relabel_configs:
      - action: "labelkeep"
        regex: "(job)"

# 配置文件检查失败，还不知道是啥原因
[root@localhost ~]# promtool check config /etc/prometheus/prometheus.yml
Checking /etc/prometheus/prometheus.yml
  FAILED: instance 0 in group 0: no address
```

![image-20220914132137844](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220914132137844.png)

:::

::: details （4）删除目标的实例

```bash
[root@localhost ~]# vim /etc/prometheus/prometheus.yml
...
  - job_name: "node"
    scheme: "http"
    metrics_path: "/metrics"
    static_configs:
      - targets:
        - "localhost:9100"
        labels:
          a: 123456
      - targets:
        - "127.0.0.1:9100"
        labels:
          a: "abcdef"
    relabel_configs:
      - action: "drop"         # 删除匹配的目标
        source_labels: ["a"]   # 带有a标签的
        regex: "([0-9]+)"      # 且a标签值全部为数字

    # 以上配置也近似于
    relabel_configs:
      - action: "keep"       # 保留匹配的目标
        source_labels: ["a"] # 带有a标签的
        regex: "([a-zA-Z]+)" # 且a标签值全部为字母
```

![image-20220914134235025](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220914134235025.png)

:::

::: details （5）标签映射

比如最开始没有使用labelmap

![image-20230515234444568](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230515234444568.png)

然后添加 labelmap

```yaml
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
    - role: pod
    relabel_configs:
      - action: labelmap                         # 添加这行
        regex: __meta_kubernetes_pod_label_(.+)  # 添加这行
```

看一下效果

![image-20230515234746434](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230515234746434.png)

:::

<br />

### 指标重新标记：metric_relabel

文档：[https://prometheus.io/docs/prometheus/2.38/configuration/configuration/#metric_relabel_configs](https://prometheus.io/docs/prometheus/2.38/configuration/configuration/#metric_relabel_configs)

`metric_relabel_configs`是 Prometheus 在保存数据前的最后一步标签重新编辑

::: details 点击查看详情

特点：

* `metric_relabel_configs` 模块和 `relabel_config` 模块语法一致
* `metric_relabel_configs`一个很常用的用途是：将监控不需要的数据直接丢掉，不在Prometheus中保存
* `metric_relabel_configs`不适用于自动生成的时间序列，例如`up`

这里给出一个简单的示例

```bash
[root@localhost ~]# vim /etc/prometheus/prometheus.yml
...
- job_name: "node"
    scheme: "http"
    metrics_path: "/metrics"
    static_configs:
      - targets:
        - "localhost:9100"
    metric_relabel_configs:
      - action: "replace"
        source_labels: ["go_info"]
        target_label: "version"
        replacement: "go100.99"
```

![image-20220914185957941](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220914185957941.png)

:::

<br />

## PromSQL

### Metrics概念

文档：[https://prometheus.io/docs/practices/naming/#metric-and-label-naming](https://prometheus.io/docs/practices/naming/#metric-and-label-naming)

::: details 点击查看详情

**1、Metrics格式**

```bash
<metric name>{<label name>=<label value>, <label name>=<label value>, ...}
```

<br />

**2、Metric Name**

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

**3、Metrics Type**

文档：[https://prometheus.io/docs/tutorials/understanding_metric_types/](https://prometheus.io/docs/tutorials/understanding_metric_types/)

* Counter（计数器）：一个只能增加或重置的度量值

* Gauge（测量其）：一个可增可减的度量值

* Histogram（累计直方图类）：用于统计在某个区间内出现次数的度量值，示例：

  * `prometheus_http_request_duration_seconds_bucket`（*不同区间分类* 通常使用`bucket`作为后缀）

  * `prometheus_http_request_duration_seconds_count`（*所有区间采样次数总和* 通常使用`count`作为后缀）

  * `prometheus_http_request_duration_seconds_sum`（*所有区间采样值总和* 通常使用`sum`作为后缀）


* Summary（百分位统计）：用于统计分位数分布情况

:::

<br />

### 表达式数据类型

在 Prometheus 的表达式语言中，表达式或子表达式可以计算为以下四种类型之一：

- **即时向量（Instant vector）**：一组时间序列，每个时间序列包含一个样本，都共享相同的时间戳
- **范围向量（Range vector）**： 一组时间序列，其中包含每个时间序列随时间变化的数据点范围
- **标量（Scalar）**： 一个简单的数字浮点值
- **String** ： 一个简单的字符串值；目前未使用

<br />

### 选择器：即时向量

文档：[https://prometheus.io/docs/prometheus/2.38/querying/basics/](https://prometheus.io/docs/prometheus/2.38/querying/basics/)

**基本操作符**

- `=`：等于
- `!=`：不等于
- `=~`：正则匹配
- `!~`：正则不匹配

**注意事项**

* 正则表达式匹配完全锚定，即 `env=~"foo"`被视为`env=~"^foo$"`
* `prometheus_http_requests_total{code="200"}`也等同于 `{__name__="prometheus_http_requests_total", code="200"}`

<br />

### 选择器：范围向量

::: details 点击查看详情

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

:::

<br />

### 选择器：时间偏移

::: details 点击查看详情

```bash
# 查看1天前这个时间点的数据
prometheus_http_requests_total{handler="/metrics"} offset 1d

# 查看1天前这个时间点过去5分钟的数据
prometheus_http_requests_total{handler="/metrics"}[5m:1m] offset 1d
```

:::

<br />

### 选择器：@修饰符

::: details 点击查看详情

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

:::

<br />

### 运算符：二元运算符

文档：[https://prometheus.io/docs/prometheus/2.38/querying/operators/](https://prometheus.io/docs/prometheus/2.38/querying/operators/)

::: details 点击查看详情

按优先级由高到低排序：

1. `^`
2. `*`, `/`, `%`,`atan2`
3. `+`,`-`
4. `==`, `!=`, `<=`, `<`, `>=`,`>`
5. `and`（并且）,`unless`（排除）
6. `or`（或者）

相同优先级的运算符是左结合的。例如， `2 * 3 % 2`等价于`(2 * 3) % 2`。然而`^`是右结合的，所以`2 ^ 3 ^ 2`等价于`2 ^ (3 ^ 2)`

**（1）计算Node内存使用率**

```bash
# 方式1
( 1 - (node_memory_Buffers_bytes + node_memory_Cached_bytes + node_memory_MemFree_bytes) / node_memory_MemTotal_bytes ) * 100

# 方式2
100 - (node_memory_Buffers_bytes + node_memory_Cached_bytes + node_memory_MemFree_bytes) / node_memory_MemTotal_bytes * 100

# 方式3
(node_memory_MemTotal_bytes - node_memory_MemFree_bytes - node_memory_Buffers_bytes - node_memory_Cached_bytes) / node_memory_MemTotal_bytes * 100
```

:::

<br />

### 运算符：向量匹配`on`和`ignoring`

待补充

<br />

### 运算符：组修饰符group_xx

待补充

<br />

### 运算符：聚合运算

文档：[https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators](https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators)

::: details （1）sum、max、min、avg：特点：聚合多个指标

**不带任何聚合运算符的输出结果，为了在多个浏览器窗口中能获取到相同时间点的值这里使用了@指定时间戳**

![image-20230520095614852](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520095614852.png)

**sum 求和**

![image-20230520095721784](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520095721784.png)



**max 求最大值**

![image-20230520095858026](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520095858026.png)

**min  求最小值**

![image-20230520095950928](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520095950928.png)

**avg 求平均值值**

![image-20230520100036401](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520100036401.png)

:::

::: details （2）[ sum/max/min/avg]_over_time：特点：同一个指标不同时间下的多个数据聚合

注意：`xxx_over_time ` 这种聚合运算符后面要接 范维向量指标

**不带任何聚合运算符的输出结果**

![image-20230520104351732](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520104351732.png)

**sum_over_time 同一个指标不同时间下的值求和**

![image-20230520104426874](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520104426874.png)

**max_over_time 同一个指标不同时间下的值求最大值**

![image-20230520104449819](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520104449819.png)

**min_over_time 同一个指标不同时间下的值求最小值**

![image-20230520104519882](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520104519882.png)

**avg_over_time 同一个指标不同时间下的值求平均值**

![image-20230520104536771](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520104536771.png)

:::

::: details （3）count 、 count_over_time、count_values：特点：不同维度的个数统计

**1、count 用于统计指标个数**

![image-20230520105835508](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520105835508.png)

![image-20230520105859131](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520105859131.png)

**2、count_over_time 用于统计同一个指标下在某个时间段产生了多少条数据**

![image-20230520110018692](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520110018692.png)

![image-20230520110047427](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520110047427.png)

**3、count_values 对相同指标值的个数统计**

（1）一台主机的swap为1G，另一台主机的swap为0

![image-20230520111958285](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520111958285.png)

（2）根据指标值的个数进行统计

![image-20230520112023949](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520112023949.png)

（3）两台主机swap都设置为0

![image-20230520112054412](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520112054412.png)

（4）再次统计，swap为0的值为2

![image-20230520112121365](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520112121365.png)

:::

::: details （4）by：对查询结果按【指定的标签】分组

比如说我想统计一下每台主机的CPU逻辑核心数

**第一步：选择一个合适的指标**

![image-20230520134522990](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520134522990.png)

**第二步：统计数量使用count系列聚合，但明显不符合要求**

![image-20230520134624061](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520134624061.png)

**第三步：使用by分组**

![image-20230520134942225](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520134942225.png)

:::

::: details （5）without：对查询结果按【排除的标签】分组

比如说我想统计一下每台主机的CPU逻辑核心数

![image-20230520140722883](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520140722883.png)

如果是by来写则是

![](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520140722883.png)

:::

::: details （6）topk 和 bottomk：取指标值排序后的前N个或后N个

**Prometheus请求统计信息如下**

![image-20230520143059856](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520143059856.png)

**我要取访问次数最多的前5个接口**

![image-20230520143215016](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520143215016.png)

**我要取访问次数最少的前5个接口**

![image-20230520143348872](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520143348872.png)

:::

::: details （7）其他聚合

- `stddev`（计算维度上的总体标准偏差）
- `stdvar`（计算维度上的总体标准方差）
- `quantile`（在维度上计算 φ-quantile (0 ≤ φ ≤ 1)）

:::

<br />

### 运算符：内置函数

文档：[https://prometheus.io/docs/prometheus/latest/querying/functions/](https://prometheus.io/docs/prometheus/latest/querying/functions/)

须知：

* 使用函数要知道操作的是哪种向量，即时向量（`instant-vector`）还是范围向量（`range vector`）
* 有些函数是有默认参数的，比如`year(v=vector(time()) instant-vector)`

::: details （1）排序函数

**默认是非排序**

![image-20230520145026838](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520145026838.png)

**正序排序**

![image-20230520145059554](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520145059554.png)

**倒序排序**

![image-20230520145147482](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520145147482.png)

:::

::: details （2）时间戳函数

**1、time()**

![image-20230520214133708](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520214133708.png)

**2、timestamp(v instant-vector)**

![image-20230520221456139](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230520221456139.png)

:::

<br />

## 存储配置

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

## 安全配置

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

## 报警配置

### 规则目录

```bash
[root@localhost ~]# vim /etc/prometheus/prometheus.yml
...
# 指定规则文件
rule_files:
  - "rules/*.yml"
  
# 创建规则文件目录
[root@localhost ~]# mkdir /etc/prometheus/rules

# 检查配置文件
[root@localhost ~]# promtool check config /etc/prometheus/prometheus.yml
Checking /etc/prometheus/prometheus.yml
 SUCCESS: /etc/prometheus/prometheus.yml is valid prometheus config file syntax
 
# 重启Prometheus
[root@localhost ~]# systemctl restart prometheus
```

<br />

### 记录规则

文档：[https://prometheus.io/docs/prometheus/2.38/configuration/recording_rules/](https://prometheus.io/docs/prometheus/2.38/configuration/recording_rules/)

说明：记录规则可以允许我们使用当前采样指标生成新的采样指标

举例：node_exporter没有提供对CPU数量的指标，但是可以通过已经存在的CPU指标来间接获取到CPU数量

::: details （1）新增一条记录规则：node_cpu_total

```bash
# 新增一条规则
[root@localhost ~]# vim /etc/prometheus/rules/node.yml
groups:
  - name: cpu                                                         # 定义一个组,用于关联所有cpu相关指标
    rules:                                                            # 
    - record: node_cpu_total                                          # 定义指标名称
      expr: count by (instance) (node_cpu_seconds_total{mode="idle"}) # 定义指标的值,这里的意思是计算出每个目标的CPU数量
      
# 检查配置文件
[root@localhost ~]# promtool check rules /etc/prometheus/rules/*.yml
Checking /etc/prometheus/rules/node.yml
  SUCCESS: 1 rules found
```

![image-20220914191202162](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220914191202162.png)

:::

<br />

### 报警记录

文档：[https://prometheus.io/docs/prometheus/2.38/configuration/alerting_rules/](https://prometheus.io/docs/prometheus/2.38/configuration/alerting_rules/)

::: details （1）新增一条报警规则：InstanceDown

```bash
# 新增一条规则
[root@localhost ~]# vim /etc/prometheus/rules/node.yml
groups:
  - name: alert
    rules:
      - alert: InstanceDown
        expr: up == 0
        for: 1m
        labels:
          severity: page
        annotations:
          summary: "Instance {{ $labels.instance }} down"
          description: "{{ $labels.instance }} of job {{ $labels.job }} has been down for more than 1 minutes."

# 检查配置文件
[root@localhost rules]# promtool check rules /etc/prometheus/rules/*.yml
Checking /etc/prometheus/rules/node.yml
  SUCCESS: 1 rules found

# 现在把node_exporter进程关闭，过几分钟查看Prometheus的报警状态
[root@localhost rules]# systemctl stop node_exporter
```

![image-20220915092626439](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220915092626439.png)

:::

<br />

### 配置Prometheus发送告警

配置Prometheus发送告警到AlertManager中

```bash
[root@localhost ~]# vim /etc/prometheus/prometheus.yml
...
alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - "localhost:9093"     # 这里写alertmanager的地址

# 检查配置文件
[root@localhost ~]# promtool check config /etc/prometheus/prometheus.yml
Checking /etc/prometheus/prometheus.yml
  SUCCESS: 1 rule files found
 SUCCESS: /etc/prometheus/prometheus.yml is valid prometheus config file syntax

Checking /etc/prometheus/rules/node.yml
  SUCCESS: 2 rules found

# 重启Prometheus
[root@localhost ~]# systemctl restart prometheus.service
```

<br />

### 配置AlertManager发送告警

文档：[https://prometheus.io/docs/alerting/0.24/configuration/](https://prometheus.io/docs/alerting/0.24/configuration/)

::: details （1）发送告警到邮箱：基础示例

这里使用QQ邮箱作为发件人，邮箱地址配置参考：[https://service.mail.qq.com/cgi-bin/help?subtype=1&&id=20010&&no=1000557](https://service.mail.qq.com/cgi-bin/help?subtype=1&&id=20010&&no=1000557)

```bash
# 配置方式一：配置一个全局邮箱发件人，所有的邮件都由此邮箱发出
[root@localhost ~]# vim /etc/alertmanager/alertmanager.yml
global:
  # (3) 配置全局邮箱发件人
  smtp_smarthost: "smtp.qq.com:587"         # 587端口为TLS端口
  smtp_from: "1265921100@qq.com"            #
  smtp_auth_username: "1265921100@qq.com"   #
  smtp_auth_password: "afzzggfmyhhhihcf"    # 这里填16位授权码而不是密码，在QQ邮箱: 设置->账户->POP3/SMTP服务中可以获取
  smtp_require_tls: true                    # 默认为true
route:
  group_by: ['alertname']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 1h
  receiver: 'email'              # (1) 接收者名称，任意字符串
receivers:
  - name: 'email'                # (2) email具体配置
    email_configs:
    - to: "1265921100@qq.com"

# 配置方式二：根据收件人的不同，配置不同的发件邮箱
[root@localhost ~]# vim /etc/alertmanager/alertmanager.yml
route:
  group_by: ['alertname']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 1h
  receiver: 'email'              # (1) 接收者名称，任意字符串
receivers:
  - name: 'email'                # (2) email具体配置
    email_configs:
    - to: "1265921100@qq.com"
      smarthost: "smtp.qq.com:587"
      from: "1265921100@qq.com"
      auth_username: "1265921100@qq.com"
      auth_password: "afzzggfmyhhhihcf"
      require_tls: true

# 以上两种方式可以同时使用

# ---------------------------------------------------------------------------------

# 检查配置文件
[root@localhost ~]# amtool check-config /etc/alertmanager/alertmanager.yml 
Checking '/etc/alertmanager/alertmanager.yml'  SUCCESS
Found:
 - global config
 - route
 - 1 inhibit rules
 - 1 receivers
 - 0 templates
 
 # 重启AlertManager
 [root@localhost ~]# systemctl restart alertmanager
```

![image-20220915131908339](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220915131908339.png)

:::

::: details （2）发送告警到邮箱：自定义HTML模板（待补充）

原始模板：[https://github.com/prometheus/alertmanager/tree/main/template](https://github.com/prometheus/alertmanager/tree/main/template)

:::

<br />

### 告警时间

（1）告警发生以后持久多长时间才发送到AlertManager

在**报警规则**中`for`字段来配置

（2）发送重复告警时间间隔

```bash
[root@localhost ~]# vim /etc/alertmanager/alertmanager.yml
route:
  group_by: ['alertname']
  group_wait: 30s
  group_interval: 1h
  repeat_interval: 1h     # 发送重复告警时间间隔
  ...
```

### 告警分组

分组概念：分组可以将**类似性质的告警分类为单个通知**，在通知中我们可以看到有哪些服务实例受到了影响

分组类型：可以将`Alertmanager`配置为按其集群和警报名称对警报进行分组

<br />

## NodeExporter

Github：[https://github.com/prometheus/node_exporter](https://github.com/prometheus/node_exporter)

### 收集器(Collector)：textfile

参考脚本：[https://github.com/prometheus-community/node-exporter-textfile-collector-scripts](https://github.com/prometheus-community/node-exporter-textfile-collector-scripts)

```bash
# textfile收集器默认是开启的，但是若要正常使用需要指定收集*.prom文件数据的目录
[root@localhost ~]# vim /usr/lib/systemd/system/node_exporter.service
...
[Service]
ExecStart=/usr/local/bin/node_exporter \
    --collector.textfile.directory="/var/lib/node_exporter/collector/textfile"

# 创建目录
[root@localhost ~]# mkdir -p /var/lib/node_exporter/collector/textfile

# 重启node_exporter

# 写入测试数据，文件名要以.prom结尾
[root@localhost ~]# vim /var/lib/node_exporter/collector/textfile/role.prom
role{role="application_server"} 1

# 查看数据
[root@localhost ~]# curl http://127.0.0.1:9100/metrics
...
# HELP role Metric read from /var/lib/node_exporter/collector/textfile/role.prom
# TYPE role untyped
role{role="application_server"} 2
```

<br />

## Exporter开发（Go）

支持的语言：[https://prometheus.io/docs/instrumenting/clientlibs/](https://prometheus.io/docs/instrumenting/clientlibs/)

Go客户端库：[https://github.com/prometheus/client_golang](https://github.com/prometheus/client_golang)

### 安装

```bash
# 要求Go版本 >= 1.17
go get github.com/prometheus/client_golang/prometheus
go get github.com/prometheus/client_golang/prometheus/promauto
go get github.com/prometheus/client_golang/prometheus/promhttp
```

<br />

### 定义指标

> 请注意，在我们下面的描述中，标签值和指标值是两个完全不一样概念

::: details （1）先把Exporter跑起来

`main.go`

```go
package main

import (
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"log"
	"net/http"
)

func main() {
	http.Handle("/metrics", promhttp.Handler())
	log.Fatalln(http.ListenAndServe("0.0.0.0:8080", nil))
}
```

这是一个最简单的Exporter

* 我们并没有添加任何的指标，只是暴露了一个`/metrics`接口
* `Prometheus`客户端库会自动为我们生成了一些指标

```bash
# 启动Exporter
[root@localhost demo]# go run main.go

# 查看metrics
[root@localhost ~]# curl -s http://127.0.0.1:8080/metrics | grep -Ev '^#'
go_gc_duration_seconds{quantile="0"} 0
go_gc_duration_seconds{quantile="0.25"} 0
go_gc_duration_seconds{quantile="0.5"} 0
go_gc_duration_seconds{quantile="0.75"} 0
go_gc_duration_seconds{quantile="1"} 0
go_gc_duration_seconds_sum 0
go_gc_duration_seconds_count 0
go_goroutines 6
go_info{version="go1.17.12"} 1
go_memstats_alloc_bytes 2.0132e+06
go_memstats_alloc_bytes_total 2.0132e+06
go_memstats_buck_hash_sys_bytes 4257
go_memstats_frees_total 0
go_memstats_gc_sys_bytes 3.530384e+06
go_memstats_heap_alloc_bytes 2.0132e+06
go_memstats_heap_idle_bytes 1.80224e+06
go_memstats_heap_inuse_bytes 2.031616e+06
go_memstats_heap_objects 11335
go_memstats_heap_released_bytes 1.80224e+06
go_memstats_heap_sys_bytes 3.833856e+06
go_memstats_last_gc_time_seconds 0
go_memstats_lookups_total 0
go_memstats_mallocs_total 11335
go_memstats_mcache_inuse_bytes 2400
go_memstats_mcache_sys_bytes 16384
go_memstats_mspan_inuse_bytes 28560
go_memstats_mspan_sys_bytes 32768
go_memstats_next_gc_bytes 4.473924e+06
go_memstats_other_sys_bytes 433375
go_memstats_stack_inuse_bytes 360448
go_memstats_stack_sys_bytes 360448
go_memstats_sys_bytes 8.211472e+06
go_threads 7
process_cpu_seconds_total 0
process_max_fds 1024
process_open_fds 9
process_resident_memory_bytes 1.734656e+07
process_start_time_seconds 1.66382729189e+09
process_virtual_memory_bytes 1.111302144e+09
process_virtual_memory_max_bytes 1.8446744073709552e+19
promhttp_metric_handler_requests_in_flight 1
promhttp_metric_handler_requests_total{code="200"} 1
promhttp_metric_handler_requests_total{code="500"} 0
promhttp_metric_handler_requests_total{code="503"} 0
```

:::

::: details （2）自定义指标：标签值固定：使用类似 NewXx(opts XxOpts) 格式的函数

```go
package main

import (
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"log"
	"net/http"
	"runtime"
)

const version = "1.0.0"

func main() {
	// 定义一个 Gauge 类型的指标
	business_exporter_build_info := prometheus.NewGauge(prometheus.GaugeOpts{
		// 定义指标名称,有2种书写方式,下面这种方式是等价的

		// 方式一：Namespace_Subsystem_Name合起来组成一个指标名称
		//Namespace: "business_exporter",
		//Subsystem: "build",
		//Name:      "info",

		// 方式二: 直接写指标名
		Name: "business_exporter_build_info",

		// 定义帮助信息
		Help: "A metric with a constant '1' value",

		// 定义固定的标签，包含标签名和标签值
		ConstLabels: map[string]string{"version": version, "goversion": runtime.Version()},
	})

	// 注册指标
	prometheus.MustRegister(business_exporter_build_info)

	// 更新指标的值
	business_exporter_build_info.Add(1)

	// 注册Handler
	http.Handle("/metrics", promhttp.Handler())

	// 启动服务
	log.Fatalln(http.ListenAndServe("0.0.0.0:8080", nil))
}
```

输出结果

```bash
# 以上指标是模仿 node_exporter_build_info 写的一个简单示例
[root@localhost ~]# curl -s http://127.0.0.1:9100/metrics  | grep -i node_exporter_build_info
# HELP node_exporter_build_info A metric with a constant '1' value labeled by version ...
# TYPE node_exporter_build_info gauge
node_exporter_build_info{branch="HEAD",goversion="go1.17.3",revision="a2321e7b940ddcff26873612bccdf7cd4c42b6b6",version="1.3.1"} 1

# 测试我们自己定义的指标
[root@localhost ~]# curl http://127.0.0.1:8080/metrics | grep business_exporter_build_info
# HELP business_exporter_build_info A metric with a constant '1' value
# TYPE business_exporter_build_info gauge
business_exporter_build_info{goversion="go1.17.12",version="1.0.0"} 1
```

:::

::: details （3）自定义指标：标签值可变：使用类似 NewXxVec(opts XxOpts, labelNames []string) 格式的函数

```go
package main

import (
	"fmt"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"log"
	"net/http"
	"strconv"
	"time"
)

func main() {
	// 定义一个 Counter 类型的指标
	business_exporter_http_requests_total := prometheus.NewCounterVec(
		prometheus.CounterOpts{
			// 定义指标名称
			Name: "business_exporter_http_requests_total",

			// 定义帮助信息
			Help: "business_exporter_http_requests_total Counter of HTTP requests.",

			// 定义固定的标签
			ConstLabels: map[string]string{},
		},
		// 第二个参数定义标签名,标签值可变
		[]string{"code", "handler"},
	)

	// 注册指标
	prometheus.MustRegister(business_exporter_http_requests_total)

	// 初始化标签值, 这一步不是必须的
	// 假如不进行初始化，那么在没有访问路由的话，将不会生成metrics
	business_exporter_http_requests_total.WithLabelValues("200", "/login").Add(0)
	business_exporter_http_requests_total.WithLabelValues("500", "/login").Add(0)

	// 注册Handler
	http.Handle("/metrics", promhttp.Handler())
	http.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
		// 定义变量
		var statusCode int

		// 随机搞一个错误
		if time.Now().Unix()%3 == 0 {
			statusCode = http.StatusInternalServerError
		} else {
			statusCode = http.StatusOK
		}

		// 更新标签值和指标值
		business_exporter_http_requests_total.WithLabelValues(strconv.Itoa(statusCode), r.Method).Add(1)

		// 返回相应
		w.WriteHeader(statusCode)
		fmt.Fprint(w, "Code ", statusCode, "\n")
	})

	// 启动服务
	log.Fatalln(http.ListenAndServe("0.0.0.0:8080", nil))
}
```

输出结果

```bash
# 以上指标是模仿 Prometheus的 prometheus_http_requests_total 写的一个简单示例
[root@localhost ~]# curl -s http://127.0.0.1:9090/metrics | grep http_requests
# HELP prometheus_http_requests_total Counter of HTTP requests.
# TYPE prometheus_http_requests_total counter
prometheus_http_requests_total{code="200",handler="/metrics"} 20

# 发请求
[root@localhost ~]# for ((i=0;i<1000;i++)); do curl http://127.0.0.1:8080/login; done
Code 200
Code 500
Code 500
...

# 查看Metrics
[root@localhost ~]# curl -s http://127.0.0.1:8080/metrics | grep business_exporter_http_requests_total
# HELP business_exporter_http_requests_total business_exporter_http_requests_total Counter of HTTP requests.
# TYPE business_exporter_http_requests_total counter
business_exporter_http_requests_total{code="200",handler="GET"} 672
business_exporter_http_requests_total{code="500",handler="GET"} 328
```

:::

::: details （4）自定义指标：请求/metrics时执行回调函数更新指标值：使用类似 NewXxFunc(opts XxOpts,  function func() float64) 格式的函数

```go
package main

import (
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"log"
	"math/rand"
	"net/http"
)

func main() {
	// 定义一个 Counter 类型的指标
	business_exporter_random_number_float64 := prometheus.NewGaugeFunc(
		prometheus.GaugeOpts{
			// 定义指标名称
			Name: "business_exporter_random_number_float64",

			// 定义帮助信息
			Help: "business_exporter_random_number_float64 Randomly generate a floating point number from 0.0 to 1.0",

			// 定义固定的标签
			ConstLabels: map[string]string{},
		},
		// 第二个参数定义一个函数，请求/metrics时会调用此函数
		func() float64 {
			log.Println("Callback function is running")
			return rand.Float64()
		},
	)

	// 注册指标
	prometheus.MustRegister(business_exporter_random_number_float64)

	// 注册Handler
	http.Handle("/metrics", promhttp.Handler())

	// 启动服务
	log.Fatalln(http.ListenAndServe("0.0.0.0:8080", nil))
}
```

输出结果

```bash
# 启动Exporter
[root@localhost demo]# go run main.go

# 访问/metrics
[root@localhost ~]# curl http://127.0.0.1:8080/metrics | grep -Ev '^#' | grep business_exporter_random_number_float64
business_exporter_random_number_float64 0.4377141871869802

# 查看Exporter输出日志
[root@localhost demo]# go run main.go
2022/09/22 20:57:11 Callback function is running
```

:::

<br />

### 数据采样

**（1）采样数据更新方法**

::: details 点击查看完整代码

```go
type Gauge interface {
	Metric
	Collector

	// Set sets the Gauge to an arbitrary value.
	Set(float64)  // 设置任意浮点数
	// Inc increments the Gauge by 1. Use Add to increment it by arbitrary
	// values.
    Inc()         // +1,等同于Add(1)
	// Dec decrements the Gauge by 1. Use Sub to decrement it by arbitrary
	// values.
	Dec()         // -1,等同于Sub(1)
	// Add adds the given value to the Gauge. (The value can be negative,
	// resulting in a decrease of the Gauge.)
	Add(float64)  // +任意浮点数值
	// Sub subtracts the given value from the Gauge. (The value can be
	// negative, resulting in an increase of the Gauge.)
	Sub(float64)  // -任意浮点数值

	// SetToCurrentTime sets the Gauge to the current Unix time in seconds.
	SetToCurrentTime() // 设置值为当前秒级时间戳
}

type Counter interface {
	Metric
	Collector

	// Inc increments the counter by 1. Use Add to increment it by arbitrary
	// non-negative values.
	Inc()             // +1,等同于Add(1)
	// Add adds the given value to the counter. It panics if the value is <
	// 0.
	Add(float64)      // +任意浮点数值    
}

type Histogram interface {
	Metric
	Collector

	// Observe adds a single observation to the histogram. Observations are
	// usually positive or zero. Negative observations are accepted but
	// prevent current versions of Prometheus from properly detecting
	// counter resets in the sum of observations. See
	// https://prometheus.io/docs/practices/histograms/#count-and-sum-of-observations
	// for details.
	Observe(float64)
}

type Summary interface {
	Metric
	Collector

	// Observe adds a single observation to the summary. Observations are
	// usually positive or zero. Negative observations are accepted but
	// prevent current versions of Prometheus from properly detecting
	// counter resets in the sum of observations. See
	// https://prometheus.io/docs/practices/histograms/#count-and-sum-of-observations
	// for details.
	Observe(float64)
}
```

:::

**（2）采样数据更新方式**

* 启动一个`Goroutine`定期更新指标值
  * 劣势：当采样时间间隔比较长时会导致数据不准，比如每隔30秒更新一次指标值，第20秒去抓取`/metrics`时数据就会不准
* 请求`/metrics`时更新采样数据
  * 劣势：当采样时间耗时比较长时会影响`/metrics`响应时间

<br />

### 自定义注册指标

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"log"
	"net/http"
	"runtime"
)

const version = "1.0.0"

// 定义一个结构体，实现 Collector 接口
type BuildInfo struct {
	desc *prometheus.Desc
}

// Describe方法：指标元信息
func (c *BuildInfo) Describe(desc chan<- *prometheus.Desc) {
	fmt.Println("Description is running")
	desc <- c.desc
}

// Collect方法：收集标签值和指标值
func (c *BuildInfo) Collect(metrics chan<- prometheus.Metric) {
	fmt.Println("Collect is running")
	metrics <- prometheus.MustNewConstMetric(
		c.desc,
		prometheus.GaugeValue,
		1,
	)
}

// 构造函数
func NewBuildInfo() *BuildInfo {
	return &BuildInfo{
		prometheus.NewDesc(
			// 指标名称
			"business_exporter_build_info",
			// 帮助信息
			"A metric with a constant '1' value",
			// 标签名切片（标签值可变）
			nil,
			// 标签名字典（标签值固定）
			map[string]string{"version": version, "goversion": runtime.Version()},
		),
	}
}

func main() {
	// 注册指标
	prometheus.MustRegister(NewBuildInfo())

	// 暴露http api
	http.Handle("/metrics", promhttp.Handler())

	// 启动web服务
	log.Fatalln(http.ListenAndServe("0.0.0.0:8080", nil))
}
```

输出结果

```bash
# 启动服务
[root@localhost demo]# go run main.go
Description is running

# 访问/metrics
[root@localhost ~]# curl http://127.0.0.1:8080/metrics | grep business_exporter_build_info
# HELP business_exporter_build_info A metric with a constant '1' value
# TYPE business_exporter_build_info gauge
business_exporter_build_info{goversion="go1.17.12",version="1.0.0"} 1

[root@localhost ~]# curl http://127.0.0.1:8080/metrics | grep business_exporter_build_info
# HELP business_exporter_build_info A metric with a constant '1' value
# TYPE business_exporter_build_info gauge
business_exporter_build_info{goversion="go1.17.12",version="1.0.0"} 1

# 每次访问/metrics，Collect方法便会执行一次
[root@localhost demo]# go run main.go 
Description is running
Collect is running
Collect is running
```

:::

### 检查Metrics接口

```bash
# 前提：需要确保以下地址是可以访问的
[root@localhost ~]# curl -s http://localhost:8080/metrics | promtool check metrics
```

