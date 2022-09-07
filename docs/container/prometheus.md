# Prometheus

官网：[https://prometheus.io/](https://prometheus.io/)

Github：[https://github.com/prometheus/prometheus/](https://github.com/prometheus/prometheus/)

<br />

## 部署Prometheus Server

文档：[https://prometheus.io/download/](https://prometheus.io/download/)

<br />

### 手动部署

文档：[https://prometheus.io/docs/prometheus/2.38/getting_started/](https://prometheus.io/docs/prometheus/2.38/getting_started/)

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
    --config.file=/etc/prometheus/prometheus.yml \\
    --storage.tsdb.path=/var/lib/prometheus \\
    --web.listen-address=0.0.0.0:9090 \\
    --web.console.templates=/etc/prometheus/consoles \\
    --web.console.libraries=/etc/prometheus/console_libraries
 
[Install]
WantedBy=multi-user.target
EOF

# 启动服务
[root@localhost ~]# systemctl daemon-reload && \
                    systemctl enable prometheus && \
                    systemctl start prometheus && \
                    systemctl status prometheus
# 检查端口
[root@localhost ~]# netstat -atlnpu | grep 9090
tcp6       0      0 :::9090                 :::*                    LISTEN      1827/prometheus     
tcp6       0      0 ::1:35726               ::1:9090                ESTABLISHED 1827/prometheus     
tcp6       0      0 ::1:9090                ::1:35726               ESTABLISHED 1827/prometheus     

# 浏览器访问：http://<ip>:9090
```

<br />

### 容器部署

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
                     -v /etc/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml \
                     -v /prometheus:/prometheus \
                     --restart=always \
                     -d \
                 prom/prometheus:v2.38.0

docker ps | grep prometheus
fe38d59cfea7   prom/prometheus:v2.38.0   "/bin/prometheus --c…"   24 seconds ago   Up 24 seconds   0.0.0.0:9090->9090/tcp, :::9090->9090/tcp              prometheu
```



## 部署Prometheus Exporter

