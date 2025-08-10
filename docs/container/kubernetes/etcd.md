# Etcd

文档：[https://etcd.io/docs/v3.5/](https://etcd.io/docs/v3.5/)

Github：[https://github.com/etcd-io/etcd](https://github.com/etcd-io/etcd)

<br />

## 介绍

Etcd是CoreOS基于Raft协议开发的分布式key-value存储，可用于服务发现、共享配置以及一致性保障（比如数据库选主、分布式锁等）

主要的功能：

* key-value存储，支持动态存储（内存）和静态存储（磁盘）
* 监听机制
* key的过期和续约机制，用于监控和服务发现
* 原子操作（Compare And Swap和Compare And Delete），用于分布式锁和leader选举

<br />

## 部署

### 配置说明

文档：

* 配置参数：[https://etcd.io/docs/v3.5/op-guide/configuration/](https://etcd.io/docs/v3.5/op-guide/configuration/)

* 配置文件：[https://github.com/etcd-io/etcd/blob/main/etcd.conf.yml.sample](https://github.com/etcd-io/etcd/blob/main/etcd.conf.yml.sample)

启动参数说明

| 参数                            | 说明                                                         | 默认值                          |
| ------------------------------- | ------------------------------------------------------------ | ------------------------------- |
| `--name`                        | 节点名称                                                     | `default`                       |
| `--listen-client-urls`          | 用于【客户端与服务端通信】的监听地址，<br />若要监听所有端口可以设置为0.0.0.0 | `http://localhost:2379`         |
| `--listen-peer-urls`            | 用于【服务端与服务端通信】的监听地址，<br />若要监听所有端口可以监听0.0.0.0 | `http://localhost:2380`         |
| `--advertise-client-urls`       | 用于在集群中暴露【客户端与服务端通信】的监听地址，<br />不要设置localhost或0.0.0.0, 因为这些地址无法从远程计算机访问 | `http://localhost:2379`         |
| `--initial-advertise-peer-urls` | 用于在集群中暴露【服务端与服务端通信】的监听地址，<br />不要设置localhost或0.0.0.0, 因为这些地址无法从远程计算机访问 | `http://localhost:2380`         |
| `--initial-cluster`             | 集群初始化，填写集群所有节点的`advertise-peer-urls`地址，<br />注意这里的key必须要和etcd节点名称保持一致 | `default=http://localhost:2380` |
| `--initial-cluster-state`       | 初始化集群状态，`new`：新集群，`existing`：已存在的集群      | `new`                           |
| `--initial-cluster-token`       | 初始集群令牌，当所在网络配置了多个etcd集群，<br />为了避免意外发生，最好使用此参数为每一集群单独配置一个token认证 | `etcd-cluster`                  |
| `--data-dir`                    | 数据存储目录                                                 | `${name}.etcd`                  |

<br />

### 单节点 + HTTP

::: details （1）二进制部署

（1）下载和解压软件包

```bash
# 下载和解压软件包
[root@ap-hongkang ~]# ETCD_VER=v3.5.5
[root@ap-hongkang ~]# wget -c https://github.com/etcd-io/etcd/releases/download/${ETCD_VER}/etcd-${ETCD_VER}-linux-amd64.tar.gz
[root@ap-hongkang ~]# tar zxf etcd-${ETCD_VER}-linux-amd64.tar.gz -C /usr/local/
[root@ap-hongkang ~]# ls -ld /usr/local/etcd*
drwxr-xr-x 3 528287 89939 4096 Sep 15 20:03 /usr/local/etcd-v3.5.5-linux-amd64

# 软连接二进制文件
[root@ap-hongkang ~]# ln -s /usr/local/etcd-${ETCD_VER}-linux-amd64/etcd    /usr/local/bin/etcd    && \
                      ln -s /usr/local/etcd-${ETCD_VER}-linux-amd64/etcdctl /usr/local/bin/etcdctl && \
                      ln -s /usr/local/etcd-${ETCD_VER}-linux-amd64/etcdutl /usr/local/bin/etcdutl
```

（2）初始化配置文件和数据目录

```yaml
# 创建配置文件和数据目录
[root@ap-hongkang ~]# mkdir -p /var/lib/etcd /etc/etcd

# 编写配置文件
[root@ap-hongkang ~]# vim /etc/etcd/etcd.conf
# Member
name: etcd
data-dir: /var/lib/etcd
listen-client-urls: http://0.0.0.0:2379
listen-peer-urls: http://0.0.0.0:2380

# Clustering
advertise-client-urls: http://10.0.8.4:2379
initial-advertise-peer-urls: http://10.0.8.4:2380
initial-cluster: etcd=http://10.0.8.4:2380
initial-cluster-state: new
initial-cluster-token: etcd-cluster
```

（3）编写Systemd服务

```bash
[root@ap-hongkang ~]# vim /etc/systemd/system/etcd.service
[Unit]
Description=etcd
Documentation=https://etcd.io/docs/

[Service]
Type=notify
ExecStart=/usr/local/bin/etcd --config-file /etc/etcd/etcd.conf
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target

# 启动服务
[root@ap-hongkang ~]# systemctl daemon-reload && \
                      systemctl restart etcd.service && \
                      systemctl enable etcd.service && \
                      systemctl status etcd.service
```

（4）客户端测试

```bash
# (1)
[root@ap-hongkang ~]# etcdctl --endpoints=http://127.0.0.1:2379 -w=table member list
+------------------+---------+--------+----------------------+----------------------+------------+
|        ID        | STATUS  |  NAME  |      PEER ADDRS      |     CLIENT ADDRS     | IS LEARNER |
+------------------+---------+--------+----------------------+----------------------+------------+
| a7a710e533cab390 | started | etcd-1 | http://10.0.8.4:2380 | http://10.0.8.4:2379 |      false |
+------------------+---------+--------+----------------------+----------------------+------------+

# (2)
[root@ap-hongkang ~]# etcdctl --endpoints=http://10.0.8.4:2379 -w=table member list
+------------------+---------+--------+----------------------+----------------------+------------+
|        ID        | STATUS  |  NAME  |      PEER ADDRS      |     CLIENT ADDRS     | IS LEARNER |
+------------------+---------+--------+----------------------+----------------------+------------+
| a7a710e533cab390 | started | etcd-1 | http://10.0.8.4:2380 | http://10.0.8.4:2379 |      false |
+------------------+---------+--------+----------------------+----------------------+------------+

# (3)
[root@ap-hongkang ~]# etcdctl --endpoints=http://10.0.8.4:2380 -w=table member list
+------------------+---------+--------+----------------------+----------------------+------------+
|        ID        | STATUS  |  NAME  |      PEER ADDRS      |     CLIENT ADDRS     | IS LEARNER |
+------------------+---------+--------+----------------------+----------------------+------------+
| a7a710e533cab390 | started | etcd-1 | http://10.0.8.4:2380 | http://10.0.8.4:2379 |      false |
+------------------+---------+--------+----------------------+----------------------+------------+

# CLIENT ADDRS  对应--advertise-client-urls
# PEER ADDRS    对应--initial-advertise-peer-urls
```

:::

::: details （2）Docker部署

（1）编写配置文件

```yaml
# 创建配置文件和数据目录
[root@ap-hongkang ~]# mkdir -p /var/lib/etcd /etc/etcd

# 编写配置文件
[root@ap-hongkang ~]# vim /etc/etcd/etcd.conf
# Member
name: etcd
data-dir: /var/lib/etcd
listen-client-urls: http://0.0.0.0:2379
listen-peer-urls: http://0.0.0.0:2380

# Clustering
advertise-client-urls: http://10.0.8.4:2379
initial-advertise-peer-urls: http://10.0.8.4:2380
initial-cluster: etcd=http://10.0.8.4:2380
initial-cluster-state: new
initial-cluster-token: etcd-cluster
```

（2）启动容器

```bash
# 定义变量
[root@ap-hongkang ~]# ETCD_VER=v3.5.5

# 下载镜像(需科学上网)
[root@ap-hongkang ~]# docker pull quay.io/coreos/etcd:${ETCD_VER}

# 启动容器
[root@ap-hongkang ~]# docker container run --name etcd \
                                           -p 2379:2379 \
                                           -p 2380:2380 \
                                           -v /etc/etcd/:/etc/etcd/ \
                                           -v /var/lib/etcd:/var/lib/etcd \
                                           -d \
                                           --restart always \
                          quay.io/coreos/etcd:${ETCD_VER} /usr/local/bin/etcd --config-file /etc/etcd/etcd.conf

# 客户端连接测试 - 容器内
[root@ap-hongkang ~]# docker container exec -it etcd etcdctl --endpoints=http://127.0.0.1:2379 -w=table member list
+------------------+---------+--------+-----------------------+-----------------------+------------+
|        ID        | STATUS  |  NAME  |      PEER ADDRS       |     CLIENT ADDRS      | IS LEARNER |
+------------------+---------+--------+-----------------------+-----------------------+------------+
| c3f540d198990d14 | started | etcd   | http://10.0.8.4:12380 | http://10.0.8.4:12379 |      false |
+------------------+---------+--------+-----------------------+-----------------------+------------+

# 客户端连接测试 - 容器外
[root@ap-hongkang ~]# etcdctl --endpoints=http://10.0.8.4:2379 -w=table member list
+------------------+---------+--------+-----------------------+-----------------------+------------+
|        ID        | STATUS  |  NAME  |      PEER ADDRS       |     CLIENT ADDRS      | IS LEARNER |
+------------------+---------+--------+-----------------------+-----------------------+------------+
| c3f540d198990d14 | started | etcd   | http://10.0.8.4:12380 | http://10.0.8.4:12379 |      false |
+------------------+---------+--------+-----------------------+-----------------------+------------+
```

:::

<br />

### 多节点 + HTTP

::: details （1）Docker部署

（1）初始化配置文件和数据目录

```yaml
# 创建配置文件和数据目录
mkdir -p /var/lib/etcd-1 /etc/etcd-1
mkdir -p /var/lib/etcd-2 /etc/etcd-2
mkdir -p /var/lib/etcd-3 /etc/etcd-3

# -------------------------------------------------

# etcd-1配置文件
[root@ap-hongkang ~]# vim /etc/etcd-1/etcd.conf
# Member
name: etcd-1
data-dir: /var/lib/etcd
listen-client-urls: http://0.0.0.0:2379
listen-peer-urls: http://0.0.0.0:2380

# Clustering
advertise-client-urls: http://10.0.8.4:12379
initial-advertise-peer-urls: http://10.0.8.4:12380
initial-cluster: etcd-1=http://10.0.8.4:12380,etcd-2=http://10.0.8.4:22380,etcd-3=http://10.0.8.4:32380
initial-cluster-state: new
initial-cluster-token: etcd-cluster

# -------------------------------------------------

# etcd-2配置文件
[root@ap-hongkang ~]# vim /etc/etcd-2/etcd.conf
# Member
name: etcd-2
data-dir: /var/lib/etcd
listen-client-urls: http://0.0.0.0:2379
listen-peer-urls: http://0.0.0.0:2380

# Clustering
advertise-client-urls: http://10.0.8.4:22379
initial-advertise-peer-urls: http://10.0.8.4:22380
initial-cluster: etcd-1=http://10.0.8.4:12380,etcd-2=http://10.0.8.4:22380,etcd-3=http://10.0.8.4:32380
initial-cluster-state: new
initial-cluster-token: etcd-cluster

# -------------------------------------------------

# etcd-3配置文件
[root@ap-hongkang ~]# vim /etc/etcd-3/etcd.conf
# Member
name: etcd-3
data-dir: /var/lib/etcd
listen-client-urls: http://0.0.0.0:2379
listen-peer-urls: http://0.0.0.0:2380

# Clustering
advertise-client-urls: http://10.0.8.4:32379
initial-advertise-peer-urls: http://10.0.8.4:32380
initial-cluster: etcd-1=http://10.0.8.4:12380,etcd-2=http://10.0.8.4:22380,etcd-3=http://10.0.8.4:32380
initial-cluster-state: new
initial-cluster-token: etcd-cluster
```

（2）启动容器

```bash
# 定义变量
[root@ap-hongkang ~]# ETCD_VER=v3.5.5

# 下载镜像
[root@ap-hongkang ~]# docker pull quay.io/coreos/etcd:${ETCD_VER}

# 启动容器 - 节点1
[root@ap-hongkang ~]# docker container run --name etcd-1 \
                                           -p 12379:2379 \
                                           -p 12380:2380 \
                                           -v /etc/etcd-1/:/etc/etcd/ \
                                           -v /var/lib/etcd-1:/var/lib/etcd \
                                           -d \
                                           --restart always \
                          quay.io/coreos/etcd:${ETCD_VER} /usr/local/bin/etcd --config-file /etc/etcd/etcd.conf

# 启动容器 - 节点2
[root@ap-hongkang ~]# docker container run --name etcd-2 \
                                           -p 22379:2379 \
                                           -p 22380:2380 \
                                           -v /etc/etcd-2/:/etc/etcd/ \
                                           -v /var/lib/etcd-2:/var/lib/etcd \
                                           -d \
                                           --restart always \
                          quay.io/coreos/etcd:${ETCD_VER} /usr/local/bin/etcd --config-file /etc/etcd/etcd.conf

# 启动容器 - 节点3
[root@ap-hongkang ~]# docker container run --name etcd-3 \
                                           -p 32379:2379 \
                                           -p 32380:2380 \
                                           -v /etc/etcd-3/:/etc/etcd/ \
                                           -v /var/lib/etcd-3:/var/lib/etcd \
                                           -d \
                                           --restart always \
                          quay.io/coreos/etcd:${ETCD_VER} /usr/local/bin/etcd --config-file /etc/etcd/etcd.conf

# 客户端连接测试 - 容器内
[root@ap-hongkang ~]# docker container exec -it etcd-1 etcdctl --endpoints=http://127.0.0.1:2379 -w=table member list
+------------------+---------+--------+-----------------------+-----------------------+------------+
|        ID        | STATUS  |  NAME  |      PEER ADDRS       |     CLIENT ADDRS      | IS LEARNER |
+------------------+---------+--------+-----------------------+-----------------------+------------+
|  2b11f1a1a08ba12 | started | etcd-2 | http://10.0.8.4:22380 | http://10.0.8.4:22379 |      false |
| 97b00ad1eacc3783 | started | etcd-3 | http://10.0.8.4:32380 | http://10.0.8.4:32379 |      false |
| c3f540d198990d14 | started | etcd-1 | http://10.0.8.4:12380 | http://10.0.8.4:12379 |      false |
+------------------+---------+--------+-----------------------+-----------------------+------------+

# 客户端连接测试 - 容器外
[root@ap-hongkang ~]# etcdctl --endpoints=http://10.0.8.4:12379 -w=table member list
+------------------+---------+--------+-----------------------+-----------------------+------------+
|        ID        | STATUS  |  NAME  |      PEER ADDRS       |     CLIENT ADDRS      | IS LEARNER |
+------------------+---------+--------+-----------------------+-----------------------+------------+
|  2b11f1a1a08ba12 | started | etcd-2 | http://10.0.8.4:22380 | http://10.0.8.4:22379 |      false |
| 97b00ad1eacc3783 | started | etcd-3 | http://10.0.8.4:32380 | http://10.0.8.4:32379 |      false |
| c3f540d198990d14 | started | etcd-1 | http://10.0.8.4:12380 | http://10.0.8.4:12379 |      false |
+------------------+---------+--------+-----------------------+-----------------------+------------+

# 多节点的情况下，endpoints最好指定所有节点，有什么区别可以参考下面执行的命令

[root@ap-hongkang ~]# etcdctl --endpoints=http://10.0.8.4:12379 -w=table endpoint health
+-----------------------+--------+------------+-------+
|       ENDPOINT        | HEALTH |    TOOK    | ERROR |
+-----------------------+--------+------------+-------+
| http://10.0.8.4:12379 |   true | 1.807196ms |       |
+-----------------------+--------+------------+-------+

[root@ap-hongkang ~]# etcdctl --endpoints=http://10.0.8.4:12379,http://10.0.8.4:22379,http://10.0.8.4:32379 -w=table endpoint health
+-----------------------+--------+------------+-------+
|       ENDPOINT        | HEALTH |    TOOK    | ERROR |
+-----------------------+--------+------------+-------+
| http://10.0.8.4:12379 |   true | 3.648426ms |       |
| http://10.0.8.4:32379 |   true | 5.401349ms |       |
| http://10.0.8.4:22379 |   true | 5.330076ms |       |
+-----------------------+--------+------------+-------+

# 多节点和单节点部署的不同
# (1) 容器名称、节点名称、宿主机监听端口、宿主机存储目录等节点个性化的配置不同
# (2) --initial-cluster中填写所有节点列表
```

:::

<br />

### 多节点 + HTTPS（推荐）

参考

* [https://github.com/coreos/docs/blob/master/os/generate-self-signed-certificates.md](https://github.com/coreos/docs/blob/master/os/generate-self-signed-certificates.md)
* [https://etcd.io/docs/v3.5/op-guide/security/#basic-setup](https://etcd.io/docs/v3.5/op-guide/security/#basic-setup)

::: details （1）安装cfssl证书生成工具

```bash
# 下载二进制工具
[root@node-1 ~]# wget https://github.com/cloudflare/cfssl/releases/download/v1.6.1/cfssl_1.6.1_linux_amd64 -O /usr/local/bin/cfssl && \
                 wget https://github.com/cloudflare/cfssl/releases/download/v1.6.1/cfssljson_1.6.1_linux_amd64 -O /usr/local/bin/cfssljson && \
                 chmod +x /usr/local/bin/cfssl /usr/local/bin/cfssljson

# 查看版本
[root@node-1 ~]# cfssl version && echo && cfssljson --version
Version: 1.6.1
Runtime: go1.12.12

Version: 1.6.1
Runtime: go1.12.12
```

:::

::: details （2）生成CA证书

```bash
# 创建证书配置文件目录
[root@ap-hongkang ~]# mkdir -p /etc/etcd/pki && cd /etc/etcd/pki

# 创建根证书配置文件并修改
# 过期时间 876000h/24/365 = 100年
[root@ap-hongkang pki]# cat > ca-config.json <<EOF
{
  "signing": {
    "default": {
      "expiry": "876000h"
    },
    "profiles": {
      "etcd": {
        "expiry": "876000h",
        "usages": [
          "signing",
          "key encipherment",
          "server auth",
          "client auth"
        ]
      }
    }
  }
}
EOF

# 创建根证书签名请求文件并修改
[root@ap-hongkang pki]# cat > ca-csr.json <<EOF
{
  "CN": "etcd",
  "key": {
    "algo": "rsa",
    "size": 2048
  },
  "names": [
    {
      "C": "CN",
      "L": "BeiJing",
      "ST": "BeiJing",
      "O": "etcd",
      "OU": "CA"
    }
  ]
}
EOF


# 生成根证书和私钥
[root@ap-hongkang pki]# cfssl gencert -initca ca-csr.json | cfssljson -bare ca
2022/11/05 13:34:58 [INFO] generating a new CA key and certificate from CSR
2022/11/05 13:34:58 [INFO] generate received request
2022/11/05 13:34:58 [INFO] received CSR
2022/11/05 13:34:58 [INFO] generating key: rsa-2048
2022/11/05 13:34:58 [INFO] encoded CSR
2022/11/05 13:34:58 [INFO] signed certificate with serial number 360574348178025029527009896015499554984194220196

[root@ap-hongkang pki]# ll
total 20
-rw-r--r-- 1 root root  286 Nov  5 11:50 ca-config.json
-rw-r--r-- 1 root root  989 Nov  5 11:52 ca.csr
-rw-r--r-- 1 root root  199 Nov  5 11:51 ca-csr.json
-rw------- 1 root root 1675 Nov  5 11:52 ca-key.pem      # CA证书私钥
-rw-r--r-- 1 root root 1285 Nov  5 11:52 ca.pem          # CA证书
```

:::

::: details （3）生成etcd所有通信公共证书

```bash
[root@ap-hongkang pki]# cat > etcd-csr.json <<EOF
{
  "CN": "etcd",
  "hosts": [
    "127.0.0.1",
    "172.17.0.1",
    "10.0.8.4"
  ],
  "key": {
    "algo": "rsa",
    "size": 2048
  },
  "names": [
    {
      "C": "CN",
      "L": "BeiJing",
      "ST": "BeiJing",
      "O": "etcd",
      "OU": "CA"
    }
  ]
}
EOF

[root@ap-hongkang pki]# cfssl gencert \
      -ca=ca.pem \
      -ca-key=ca-key.pem \
      -config=ca-config.json \
      -profile=etcd \
  etcd-csr.json | cfssljson -bare etcd

2022/11/05 13:42:59 [INFO] generate received request
2022/11/05 13:42:59 [INFO] received CSR
2022/11/05 13:42:59 [INFO] generating key: rsa-2048
2022/11/05 13:43:00 [INFO] encoded CSR
2022/11/05 13:43:00 [INFO] signed certificate with serial number 79193579881579928774490617214954833293879197290

[root@ap-hongkang pki]# ll etcd*
-rw-r--r-- 1 root root 1041 Nov  5 13:43 etcd.csr
-rw-r--r-- 1 root root  249 Nov  5 13:42 etcd-csr.json
-rw------- 1 root root 1679 Nov  5 13:43 etcd-key.pem
-rw-r--r-- 1 root root 1359 Nov  5 13:43 etcd.pem
```

:::

::: details （4）初始化配置文件和数据目录

```bash
# 创建配置文件和数据目录
mkdir -p /var/lib/etcd-1 /etc/etcd-1
mkdir -p /var/lib/etcd-2 /etc/etcd-2
mkdir -p /var/lib/etcd-3 /etc/etcd-3

# -------------------------------------------------

# 将证书软连接到各个Member节点的配置目录中
cp -ra /etc/etcd/pki /etc/etcd-1/
cp -ra /etc/etcd/pki /etc/etcd-2/
cp -ra /etc/etcd/pki /etc/etcd-3/

# -------------------------------------------------

# etcd-1配置文件
[root@ap-hongkang ~]# vim /etc/etcd-1/etcd.conf
# Member
name: etcd-1
data-dir: /var/lib/etcd
listen-client-urls: https://0.0.0.0:2379
listen-peer-urls: https://0.0.0.0:2380

# Clustering
advertise-client-urls: https://10.0.8.4:12379
initial-advertise-peer-urls: https://10.0.8.4:12380
initial-cluster: etcd-1=https://10.0.8.4:12380,etcd-2=https://10.0.8.4:22380,etcd-3=https://10.0.8.4:32380
initial-cluster-state: new
initial-cluster-token: etcd-cluster

# Security
client-transport-security:
  client-cert-auth: true
  auto-tls: true
  cert-file: /etc/etcd/pki/etcd.pem
  key-file: /etc/etcd/pki/etcd-key.pem
  trusted-ca-file: /etc/etcd/pki/ca.pem
peer-transport-security:
  client-cert-auth: true
  auto-tls: true
  cert-file: /etc/etcd/pki/etcd.pem
  key-file: /etc/etcd/pki/etcd-key.pem
  trusted-ca-file: /etc/etcd/pki/ca.pem

# -------------------------------------------------

# etcd-2配置文件
[root@ap-hongkang ~]# vim /etc/etcd-2/etcd.conf
# Member
name: etcd-2
data-dir: /var/lib/etcd
listen-client-urls: https://0.0.0.0:2379
listen-peer-urls: https://0.0.0.0:2380

# Clustering
advertise-client-urls: https://10.0.8.4:22379
initial-advertise-peer-urls: https://10.0.8.4:22380
initial-cluster: etcd-1=https://10.0.8.4:12380,etcd-2=https://10.0.8.4:22380,etcd-3=https://10.0.8.4:32380
initial-cluster-state: new
initial-cluster-token: etcd-cluster

# Security
client-transport-security:
  client-cert-auth: true
  auto-tls: true
  cert-file: /etc/etcd/pki/etcd.pem
  key-file: /etc/etcd/pki/etcd-key.pem
  trusted-ca-file: /etc/etcd/pki/ca.pem
peer-transport-security:
  client-cert-auth: true
  auto-tls: true
  cert-file: /etc/etcd/pki/etcd.pem
  key-file: /etc/etcd/pki/etcd-key.pem
  trusted-ca-file: /etc/etcd/pki/ca.pem

# -------------------------------------------------

# etcd-3配置文件
[root@ap-hongkang ~]# vim /etc/etcd-3/etcd.conf
# Member
name: etcd-3
data-dir: /var/lib/etcd
listen-client-urls: https://0.0.0.0:2379
listen-peer-urls: https://0.0.0.0:2380

# Clustering
advertise-client-urls: https://10.0.8.4:32379
initial-advertise-peer-urls: https://10.0.8.4:32380
initial-cluster: etcd-1=https://10.0.8.4:12380,etcd-2=https://10.0.8.4:22380,etcd-3=https://10.0.8.4:32380
initial-cluster-state: new
initial-cluster-token: etcd-cluster

# Security
client-transport-security:
  client-cert-auth: true
  auto-tls: true
  cert-file: /etc/etcd/pki/etcd.pem
  key-file: /etc/etcd/pki/etcd-key.pem
  trusted-ca-file: /etc/etcd/pki/ca.pem
peer-transport-security:
  client-cert-auth: true
  auto-tls: true
  cert-file: /etc/etcd/pki/etcd.pem
  key-file: /etc/etcd/pki/etcd-key.pem
  trusted-ca-file: /etc/etcd/pki/ca.pem
```

:::

::: details （4）启动etcd节点

```bash
# 定义变量
[root@ap-hongkang ~]# ETCD_VER=v3.5.5

# 启动容器 - 节点1
[root@ap-hongkang ~]# docker container run --name etcd-1 \
                                           -p 12379:2379 \
                                           -p 12380:2380 \
                                           -v /etc/etcd-1:/etc/etcd \
                                           -v /var/lib/etcd-1:/var/lib/etcd \
                                           -d \
                                           --restart always \
                          quay.io/coreos/etcd:${ETCD_VER} /usr/local/bin/etcd --config-file /etc/etcd/etcd.conf

# 启动容器 - 节点2
[root@ap-hongkang ~]# docker container run --name etcd-2 \
                                           -p 22379:2379 \
                                           -p 22380:2380 \
                                           -v /etc/etcd-2:/etc/etcd \
                                           -v /var/lib/etcd-2:/var/lib/etcd \
                                           -d \
                                           --restart always \
                          quay.io/coreos/etcd:${ETCD_VER} /usr/local/bin/etcd --config-file /etc/etcd/etcd.conf

# 启动容器 - 节点3
[root@ap-hongkang ~]# docker container run --name etcd-3 \
                                           -p 32379:2379 \
                                           -p 32380:2380 \
                                           -v /etc/etcd-3:/etc/etcd \
                                           -v /var/lib/etcd-3:/var/lib/etcd \
                                           -d \
                                           --restart always \
                          quay.io/coreos/etcd:${ETCD_VER} /usr/local/bin/etcd --config-file /etc/etcd/etcd.conf
```

:::

::: details （5）客户端连接测试

```bash
[root@ap-hongkang ~]# etcdctl \
    --endpoints=https://10.0.8.4:12379,https://10.0.8.4:22379,https://10.0.8.4:32379 \
    --cacert=/etc/etcd/pki/ca.pem \
    --cert=/etc/etcd/pki/etcd.pem \
    --key=/etc/etcd/pki/etcd-key.pem \
    -w=table \
  member list

+------------------+---------+--------+------------------------+------------------------+------------+
|        ID        | STATUS  |  NAME  |       PEER ADDRS       |      CLIENT ADDRS      | IS LEARNER |
+------------------+---------+--------+------------------------+------------------------+------------+
| 9e284eda82a7e8e7 | started | etcd-2 | https://10.0.8.4:22380 | https://10.0.8.4:22379 |      false |
| d095f9673bd60ca8 | started | etcd-1 | https://10.0.8.4:12380 | https://10.0.8.4:12379 |      false |
| d5c1cf5d0aabe186 | started | etcd-3 | https://10.0.8.4:32380 | https://10.0.8.4:32379 |      false |
+------------------+---------+--------+------------------------+------------------------+------------+
```

:::

<br />

## 集群管理

### 命令封装: ectl

参考：[https://github.com/etcd-io/etcd/tree/main/etcdctl](https://github.com/etcd-io/etcd/tree/main/etcdctl)

::: details 点击查看详情

```bash
# 为了后续使用方便，不用每次都输入一长串的参数，我们可以对etcdctl做一次简单的封装

# --------------------------------------------------------------------------------------
# 方法1：使用别名(不推荐), 因为在某些情况下会有问题
#  (1)Shell脚本中无法直接调用别名,必须使用source xx.sh执行 
#  (2) 分布式锁章节无法使用别名

# --------------------------------------------------------------------------------------
# 方法2：创建一个脚本(推荐)
# ectl这个脚本不管具体的参数是什么,它应该只包含必须的连接信息，而不应该包含可选的信息，比如 -w=table
[root@ap-hongkang ~]# vim /usr/local/bin/ectl
#!/bin/bash
etcdctl \
    --endpoints=https://10.0.8.4:12379,https://10.0.8.4:22379,https://10.0.8.4:32379 \
    --cacert=/etc/etcd/pki/ca.pem \
    --cert=/etc/etcd/pki/etcd.pem \
    --key=/etc/etcd/pki/etcd-key.pem \
  $*
[root@ap-hongkang ~]# chmod 755 /usr/local/bin/ectl

# --------------------------------------------------------------------------------------
# 方法3：使用环境变量(推荐)
[root@ap-hongkang ~]# vim ~/.bashrc
export ETCDCTL_ENDPOINTS=https://10.0.8.4:12379,https://10.0.8.4:22379,https://10.0.8.4:32379
export ETCDCTL_CACERT=/etc/etcd/pki/ca.pem
export ETCDCTL_CERT=/etc/etcd/pki/etcd.pem
export ETCDCTL_KEY=/etc/etcd/pki/etcd-key.pem

# --------------------------------------------------------------------------------------

# 测试
[root@ap-hongkang ~]# ectl -w=table endpoint health
+------------------------+--------+-------------+-------+
|        ENDPOINT        | HEALTH |    TOOK     | ERROR |
+------------------------+--------+-------------+-------+
| https://10.0.8.4:12379 |   true | 16.105903ms |       |
| https://10.0.8.4:32379 |   true | 16.139586ms |       |
| https://10.0.8.4:22379 |   true | 19.738679ms |       |
+------------------------+--------+-------------+-------+

[root@ap-hongkang ~]# etcdctl -w=table endpoint health
+------------------------+--------+-------------+-------+
|        ENDPOINT        | HEALTH |    TOOK     | ERROR |
+------------------------+--------+-------------+-------+
| https://10.0.8.4:22379 |   true | 16.205112ms |       |
| https://10.0.8.4:32379 |   true | 16.426918ms |       |
| https://10.0.8.4:12379 |   true | 16.266127ms |       |
+------------------------+--------+-------------+-------+

# 注意：方法2和方法3不能同时使用
```

:::

<br />

### 查看集群信息

::: details （1）查看成员列表

```bash
# 对于一个正常的集群，我们只需要指定一个endpoint即可列出所有的成员，当然了指定全部endpoint也是可以的
etcdctl \
    --endpoints=https://10.0.8.4:12379 \
    --cacert=/etc/etcd/pki/ca.pem \
    --cert=/etc/etcd/pki/etcd.pem \
    --key=/etc/etcd/pki/etcd-key.pem \
    -w table \
  member list
```

![image-20221106153408152](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221106153408152.png)

:::

::: details （2）查看成员详情 - 简略信息

```bash
etcdctl \
    --endpoints=https://10.0.8.4:12379,https://10.0.8.4:22379,https://10.0.8.4:32379 \
    --cacert=/etc/etcd/pki/ca.pem \
    --cert=/etc/etcd/pki/etcd.pem \
    --key=/etc/etcd/pki/etcd-key.pem \
    -w table \
  endpoint status
```

![image-20221106151948039](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221106151948039.png)

:::

::: details （3）查看成员详情 - 详细信息

```bash
etcdctl \
    --endpoints=https://10.0.8.4:12379,https://10.0.8.4:22379,https://10.0.8.4:32379 \
    --cacert=/etc/etcd/pki/ca.pem \
    --cert=/etc/etcd/pki/etcd.pem \
    --key=/etc/etcd/pki/etcd-key.pem \
    -w json \
  endpoint status | jq
```

![image-20221106154156717](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221106154156717.png)

:::

::: details （4）查看成员健康状态

```bash
etcdctl \
    --endpoints=https://10.0.8.4:12379,https://10.0.8.4:22379,https://10.0.8.4:32379 \
    --cacert=/etc/etcd/pki/ca.pem \
    --cert=/etc/etcd/pki/etcd.pem \
    --key=/etc/etcd/pki/etcd-key.pem \
    -w table \
  endpoint health
```

![image-20221106152346384](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221106152346384.png)

:::

::: details （5）查看成员KV哈希

```bash
etcdctl \
    --endpoints=https://10.0.8.4:12379,https://10.0.8.4:22379,https://10.0.8.4:32379 \
    --cacert=/etc/etcd/pki/ca.pem \
    --cert=/etc/etcd/pki/etcd.pem \
    --key=/etc/etcd/pki/etcd-key.pem \
    -w table \
  endpoint hashkv
```

![image-20221106152756051](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221106152756051.png)

:::

::: details （6）查看成员全局修订编号（Revision）

* Revision是etcd全局修订编号，每次数据修改(put, del)都会导致Revision加1
* 对于刚创建的空集群，该值应该为1

```bash
etcdctl \
    --endpoints=https://10.0.8.4:12379,https://10.0.8.4:22379,https://10.0.8.4:32379 \
    --cacert=/etc/etcd/pki/ca.pem \
    --cert=/etc/etcd/pki/etcd.pem \
    --key=/etc/etcd/pki/etcd-key.pem \
    -w json \
  endpoint status | jq '[ .[] | { Endpoint: .Endpoint, revision: .Status.header.revision }]'
```

![image-20221106155851997](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221106155851997.png)

:::

<br />

### 备份和恢复

文档：

* 备份：[https://etcd.io/docs/v3.5/op-guide/recovery/#snapshotting-the-keyspace](https://etcd.io/docs/v3.5/op-guide/recovery/#snapshotting-the-keyspace)

* 恢复：[https://etcd.io/docs/v3.5/op-guide/recovery/#restoring-a-cluster](https://etcd.io/docs/v3.5/op-guide/recovery/#restoring-a-cluster)

说明：

* 备份时只需要对集群某一个节点备份即可
* 恢复时候要将备份恢复到集群的所有节点

::: details 备份前先写点数据

```bash
# 在备份前写一点数据
for i in `seq 100`
do
    etcdctl \
        --endpoints=https://10.0.8.4:12379,https://10.0.8.4:22379,https://10.0.8.4:32379 \
        --cacert=/etc/etcd/pki/ca.pem \
        --cert=/etc/etcd/pki/etcd.pem \
        --key=/etc/etcd/pki/etcd-key.pem \
      put /itops/test/write-before-backup/${i} ${i}
done
```

:::

::: details （1）备份key-value数据

```bash
# 定义变量
BACKUP_TIME=$(date +"%Y-%m-%d-%H%M%S")

# 备份方式1：通过endpoint来备份，注意endpoints只能指定一个节点地址，不能指定多个节点地址（推荐此种备份方式）
[root@ap-hongkang ~]# etcdctl \
                        --endpoints=https://10.0.8.4:12379 \
                        --cacert=/etc/etcd/pki/ca.pem \
                        --cert=/etc/etcd/pki/etcd.pem \
                        --key=/etc/etcd/pki/etcd-key.pem \
                      snapshot save snapshot_from_endpoint_${BACKUP_TIME}.db

# 备份方式2：直接复制某个节点的member/snap/db文件进行备份
[root@ap-hongkang ~]# cp -ra /var/lib/etcd-1/member/snap/db snapshot_from_copyfile_${BACKUP_TIME}.db

# 查看备份文件(根据实际情况选择其中一种方式即可)
[root@ap-hongkang ~]# ll
total 124
-rw------- 1 root root 61440 Nov  5 19:37 snapshot_from_copyfile_2022-11-05-193738.db
-rw------- 1 root root 61472 Nov  5 19:37 snapshot_from_endpoint_2022-11-05-193738.db

# --------------------------------------------------------------------------------------------------------

# 备份方式3：使用etcdutl进行备份
#  1) 需要先停止要备份的etcd节点，否则备份会报错: timed out waiting to acquire lock
#  2) 备份出来是一个目录，和etcd存储目录结构一样
#  3) 这个备份命令还没搞明白是怎么回事,不推荐使用
[root@ap-hongkang ~]# etcdutl backup --with-v3 --data-dir /var/lib/etcd-1 --backup-dir .
2022-11-06T11:10:13+08:00       info    etcdutl/backup_command.go:231   ignoring member attribute update on     {"entry": "Term:2 Index:5 Data:\"\\010\\201\\244\\227\\205\\256\\211\\241\\324\\014\\022\\003PUT\\032&/0/members/d095f9673bd60ca8/attributes\\\"9{\\\"name\\\":\\\"etcd-1\\\",\\\"clientURLs\\\":[\\\"https://10.0.8.4:12379\\\"]}(\\0002\\0008\\000H\\000P\\000X\\000`\\000h\\000p\\000x\\000\\200\\001\\000\" ", "v2Req.Path": "/0/members/d095f9673bd60ca8/attributes"}
2022-11-06T11:10:13+08:00       info    etcdutl/backup_command.go:231   ignoring member attribute update on     {"entry": "Term:2 Index:6 Data:\"\\010\\202\\372\\247\\205\\256\\211\\241\\303\\341\\001\\022\\003PUT\\032&/0/members/d5c1cf5d0aabe186/attributes\\\"9{\\\"name\\\":\\\"etcd-3\\\",\\\"clientURLs\\\":[\\\"https://10.0.8.4:32379\\\"]}(\\0002\\0008\\000H\\000P\\000X\\000`\\000h\\000p\\000x\\000\\200\\001\\000\" ", "v2Req.Path": "/0/members/d5c1cf5d0aabe186/attributes"}
2022-11-06T11:10:13+08:00       info    etcdutl/backup_command.go:231   ignoring member attribute update on     {"entry": "Term:2 Index:7 Data:\"\\010\\201\\304\\242\\205\\256\\211\\341\\363\\350\\001\\022\\003PUT\\032&/0/members/9e284eda82a7e8e7/attributes\\\"9{\\\"name\\\":\\\"etcd-2\\\",\\\"clientURLs\\\":[\\\"https://10.0.8.4:22379\\\"]}(\\0002\\0008\\000H\\000P\\000X\\000`\\000h\\000p\\000x\\000\\200\\001\\000\" ", "v2Req.Path": "/0/members/9e284eda82a7e8e7/attributes"}
2022-11-06T11:10:14+08:00       info    membership/store.go:141 Trimming membership information from the backend...

[root@ap-hongkang ~]# ll
total 4
drwx------ 4 root root 4096 Nov  6 11:10 member

[root@ap-hongkang ~]# du -sh member
206M    member

[root@ap-hongkang ~]# du -sh /var/lib/etcd-1
206M    /var/lib/etcd-1

# --------------------------------------------------------------------------------------------------------

# 查看快照元数据
[root@ap-hongkang ~]# etcdutl -w table snapshot status snapshot_from_endpoint_2022-11-07-101235.db
+----------+----------+------------+------------+
|   HASH   | REVISION | TOTAL KEYS | TOTAL SIZE |
+----------+----------+------------+------------+
| 5f52d1de |  1018634 |     130773 |      12 MB |
+----------+----------+------------+------------+
```

:::

::: details （2）删除key-value数据

```bash
# 删除备份前的数据
for i in `seq 100`
do
    etcdctl \
        --endpoints=https://10.0.8.4:12379,https://10.0.8.4:22379,https://10.0.8.4:32379 \
        --cacert=/etc/etcd/pki/ca.pem \
        --cert=/etc/etcd/pki/etcd.pem \
        --key=/etc/etcd/pki/etcd-key.pem \
      del /itops/test/write-before-backup/${i} ${i}
done
```

:::

::: details （3）恢复key-value数据

如果是直接`copy`文件做的备份，那么该备份并没有快照完整性哈希，所以在恢复时候需要添加`--skip-hash-check`参数，用于跳过快照完整性哈希验证。

```bash
# 1、将所有的etcd节点停掉
docker container stop etcd-1
docker container stop etcd-2
docker container stop etcd-3

# 2、下一步操作，实现了两个功能：
#    1) 将当前的数据目录备份一下
#    2) 恢复数据时要使用一个空目录，所以这里正好可以使用我们原来的数据目录
BACKUP_TIME=$(date +"%Y-%m-%d-%H%M%S")
mv /var/lib/etcd-1 /var/lib/etcd-1_${BACKUP_TIME}
mv /var/lib/etcd-2 /var/lib/etcd-2_${BACKUP_TIME}
mv /var/lib/etcd-3 /var/lib/etcd-3_${BACKUP_TIME}

# 3、定义备份文件名变量
BACKUP_FILE=snapshot_from_endpoint_2022-11-05-193738.db

# 4、恢复etcd-1节点数据
etcdutl snapshot restore ${BACKUP_FILE} \
  --data-dir /var/lib/etcd-1/ \
  --name etcd-1 \
  --initial-advertise-peer-urls https://10.0.8.4:12380 \
  --initial-cluster etcd-1=https://10.0.8.4:12380,etcd-2=https://10.0.8.4:22380,etcd-3=https://10.0.8.4:32380

# 5、恢复etcd-2节点数据
etcdutl snapshot restore ${BACKUP_FILE} \
  --data-dir /var/lib/etcd-2/ \
  --name etcd-2 \
  --initial-advertise-peer-urls https://10.0.8.4:22380 \
  --initial-cluster etcd-1=https://10.0.8.4:12380,etcd-2=https://10.0.8.4:22380,etcd-3=https://10.0.8.4:32380

# 6、恢复etcd-3节点数据
etcdutl snapshot restore ${BACKUP_FILE} \
  --data-dir /var/lib/etcd-3/ \
  --name etcd-3 \
  --initial-advertise-peer-urls https://10.0.8.4:32380 \
  --initial-cluster etcd-1=https://10.0.8.4:12380,etcd-2=https://10.0.8.4:22380,etcd-3=https://10.0.8.4:32380

# 7、启动服务
docker container start etcd-1
docker container start etcd-2
docker container start etcd-3

# 8、检查集群状态
etcdctl \
    --endpoints=https://10.0.8.4:12379,https://10.0.8.4:22379,https://10.0.8.4:32379 \
    --cacert=/etc/etcd/pki/ca.pem \
    --cert=/etc/etcd/pki/etcd.pem \
    --key=/etc/etcd/pki/etcd-key.pem \
    --write-out=table \
  member list

etcdctl \
    --endpoints=https://10.0.8.4:12379,https://10.0.8.4:22379,https://10.0.8.4:32379 \
    --cacert=/etc/etcd/pki/ca.pem \
    --cert=/etc/etcd/pki/etcd.pem \
    --key=/etc/etcd/pki/etcd-key.pem \
    --write-out=table \
  endpoint health

# 9、检查数据是否已恢复
for i in `seq 100`
do
    etcdctl \
        --endpoints=https://10.0.8.4:12379,https://10.0.8.4:22379,https://10.0.8.4:32379 \
        --cacert=/etc/etcd/pki/ca.pem \
        --cert=/etc/etcd/pki/etcd.pem \
        --key=/etc/etcd/pki/etcd-key.pem \
      get /itops/test/write-before-backup/${i}
done
```

:::

<br />

### 添加或移除成员

文档：[https://etcd.io/docs/v3.5/tutorials/how-to-deal-with-membership/](https://etcd.io/docs/v3.5/tutorials/how-to-deal-with-membership/)

::: details （1）移除成员

```bash
# 查看所有成员, 重点关注ID
etcdctl \
    --endpoints=https://10.0.8.4:12379,https://10.0.8.4:22379,https://10.0.8.4:32379 \
    --cacert=/etc/etcd/pki/ca.pem \
    --cert=/etc/etcd/pki/etcd.pem \
    --key=/etc/etcd/pki/etcd-key.pem \
    -w=table \
  member list

+------------------+---------+--------+------------------------+------------------------+------------+
|        ID        | STATUS  |  NAME  |       PEER ADDRS       |      CLIENT ADDRS      | IS LEARNER |
+------------------+---------+--------+------------------------+------------------------+------------+
| 9e284eda82a7e8e7 | started | etcd-2 | https://10.0.8.4:22380 | https://10.0.8.4:22379 |      false |
| d095f9673bd60ca8 | started | etcd-1 | https://10.0.8.4:12380 | https://10.0.8.4:12379 |      false |
| d5c1cf5d0aabe186 | started | etcd-3 | https://10.0.8.4:32380 | https://10.0.8.4:32379 |      false |
+------------------+---------+--------+------------------------+------------------------+------------+

# 通过ID移除成员，这里移除etcd-2
etcdctl \
    --endpoints=https://10.0.8.4:12379,https://10.0.8.4:22379,https://10.0.8.4:32379 \
    --cacert=/etc/etcd/pki/ca.pem \
    --cert=/etc/etcd/pki/etcd.pem \
    --key=/etc/etcd/pki/etcd-key.pem \
  member remove 9e284eda82a7e8e7

Member 9e284eda82a7e8e7 removed from cluster f135e15f0e441f3d

# 再次查看一下成员列表
etcdctl \
    --endpoints=https://10.0.8.4:12379,https://10.0.8.4:22379,https://10.0.8.4:32379 \
    --cacert=/etc/etcd/pki/ca.pem \
    --cert=/etc/etcd/pki/etcd.pem \
    --key=/etc/etcd/pki/etcd-key.pem \
    -w=table \
  member list

+------------------+---------+--------+------------------------+------------------------+------------+
|        ID        | STATUS  |  NAME  |       PEER ADDRS       |      CLIENT ADDRS      | IS LEARNER |
+------------------+---------+--------+------------------------+------------------------+------------+
| d095f9673bd60ca8 | started | etcd-1 | https://10.0.8.4:12380 | https://10.0.8.4:12379 |      false |
| d5c1cf5d0aabe186 | started | etcd-3 | https://10.0.8.4:32380 | https://10.0.8.4:32379 |      false |
+------------------+---------+--------+------------------------+------------------------+------------+
```

:::

::: details （2）添加新成员

参数修改：

* `--endpoints`：去掉移除的成员

```bash
etcdctl \
    --endpoints=https://10.0.8.4:12379,https://10.0.8.4:32379 \
    --cacert=/etc/etcd/pki/ca.pem \
    --cert=/etc/etcd/pki/etcd.pem \
    --key=/etc/etcd/pki/etcd-key.pem \
  member add etcd-4 \
    --peer-urls=https://10.0.8.4:42380

# 输出结果
ETCD_NAME="etcd-4"
ETCD_INITIAL_CLUSTER="etcd-1=https://10.0.8.4:12380,etcd-3=https://10.0.8.4:32380,etcd-4=https://10.0.8.4:42380"
ETCD_INITIAL_ADVERTISE_PEER_URLS="https://10.0.8.4:42380"
ETCD_INITIAL_CLUSTER_STATE="existing"
```

:::

::: details （3）新成员启动etcd服务

注意需要修改以下参数：

* `--initial-cluster-state existing`

```bash
# 创建配置文件和数据目录
mkdir -p /var/lib/etcd-4 /etc/etcd-4

# 将证书拷贝接到各个Member节点的配置目录中
cp -ra /etc/etcd/pki /etc/etcd-4/

# etcd-4配置文件
[root@ap-hongkang ~]# vim /etc/etcd-4/etcd.conf
# Member
name: etcd-4
data-dir: /var/lib/etcd
listen-client-urls: https://0.0.0.0:2379
listen-peer-urls: https://0.0.0.0:2380

# Clustering
advertise-client-urls: https://10.0.8.4:42379
initial-advertise-peer-urls: https://10.0.8.4:42380
initial-cluster: etcd-1=https://10.0.8.4:12380,etcd-3=https://10.0.8.4:32380,etcd-4=https://10.0.8.4:42380
initial-cluster-state: existing
initial-cluster-token: etcd-cluster

# Security
client-transport-security:
  client-cert-auth: true
  auto-tls: true
  cert-file: /etc/etcd/pki/etcd.pem
  key-file: /etc/etcd/pki/etcd-key.pem
  trusted-ca-file: /etc/etcd/pki/ca.pem
peer-transport-security:
  client-cert-auth: true
  auto-tls: true
  cert-file: /etc/etcd/pki/etcd.pem
  key-file: /etc/etcd/pki/etcd-key.pem
  trusted-ca-file: /etc/etcd/pki/ca.pem

# 启动容器 - 节点4
[root@ap-hongkang ~]# ETCD_VER=v3.5.5
[root@ap-hongkang ~]# docker container run --name etcd-4 \
                                           -p 42379:2379 \
                                           -p 42380:2380 \
                                           -v /etc/etcd-4:/etc/etcd \
                                           -v /var/lib/etcd-4:/var/lib/etcd \
                                           -d \
                                           --restart always \
                          quay.io/coreos/etcd:${ETCD_VER} /usr/local/bin/etcd --config-file /etc/etcd/etcd.conf
# 查看集群状态
etcdctl \
    --endpoints=https://10.0.8.4:12379,https://10.0.8.4:32379,https://10.0.8.4:42379 \
    --cacert=/etc/etcd/pki/ca.pem \
    --cert=/etc/etcd/pki/etcd.pem \
    --key=/etc/etcd/pki/etcd-key.pem \
    --write-out=table \
  member list

+------------------+---------+--------+------------------------+------------------------+------------+
|        ID        | STATUS  |  NAME  |       PEER ADDRS       |      CLIENT ADDRS      | IS LEARNER |
+------------------+---------+--------+------------------------+------------------------+------------+
| 98ebd0c2bdb8b97a | started | etcd-4 | https://10.0.8.4:42380 | https://10.0.8.4:42379 |      false |
| d095f9673bd60ca8 | started | etcd-1 | https://10.0.8.4:12380 | https://10.0.8.4:12379 |      false |
| d5c1cf5d0aabe186 | started | etcd-3 | https://10.0.8.4:32380 | https://10.0.8.4:32379 |      false |
+------------------+---------+--------+------------------------+------------------------+------------+

etcdctl \
    --endpoints=https://10.0.8.4:12379,https://10.0.8.4:32379,https://10.0.8.4:42379 \
    --cacert=/etc/etcd/pki/ca.pem \
    --cert=/etc/etcd/pki/etcd.pem \
    --key=/etc/etcd/pki/etcd-key.pem \
    --write-out=table \
  endpoint health

+------------------------+--------+-------------+-------+
|        ENDPOINT        | HEALTH |    TOOK     | ERROR |
+------------------------+--------+-------------+-------+
| https://10.0.8.4:12379 |   true | 14.153337ms |       |
| https://10.0.8.4:42379 |   true | 15.743446ms |       |
| https://10.0.8.4:32379 |   true | 22.582329ms |       |
+------------------------+--------+-------------+-------+
```

:::

::: details （4）更新所有成员的启动参数（非必须，只是为了启动参数与实际情况统一）

* 修改配置文件`initial-cluster`参数，并重启容器即可

:::

<br />

### 基准测试

文档：[https://etcd.io/docs/v3.5/faq/#performance](https://etcd.io/docs/v3.5/faq/#performance)

::: details （1）编译安装benchmark命令

```bash
# 克隆代码
[root@ap-hongkang ~]# git clone https://github.com/etcd-io/etcd.git
[root@ap-hongkang ~]# cd etcd

# 编译安装benchmark命令
# (1) 这会将二进制命令安装在$GOPATH/bin下,
# (2) 请确保该目录在PATH中，否则需要指定完整的路径才可以执行benchmark命令
# (3) 通过go env GOPATH可以查看GOPATH路径
[root@ap-hongkang etcd]# go install -v ./tools/benchmark

# 查看帮助
[root@ap-hongkang etcd]# benchmark -h
benchmark is a low-level benchmark tool for etcd3.
It uses gRPC client directly and does not depend on
etcd client library.

Usage:
  benchmark [command]

Available Commands:
  completion      Generate the autocompletion script for the specified shell
  help            Help about any command
  lease-keepalive Benchmark lease keepalive
  mvcc            Benchmark mvcc
  put             Benchmark put
  range           Benchmark range
  stm             Benchmark STM
  txn-mixed       Benchmark a mixed load of txn-put & txn-range.
  txn-put         Benchmark txn-put
  watch           Benchmark watch
  watch-get       Benchmark watch with get
  watch-latency   Benchmark watch latency

Flags:
      --auto-sync-interval duration   AutoSyncInterval is the interval to update endpoints with its latest members
      --cacert string                 verify certificates of HTTPS-enabled servers using this CA bundle
      --cert string                   identify HTTPS client using this SSL certificate file
      --clients uint                  Total number of gRPC clients (default 1)
      --conns uint                    Total number of gRPC connections (default 1)
      --dial-timeout duration         dial timeout for client connections
      --endpoints strings             gRPC endpoints (default [127.0.0.1:2379])
  -h, --help                          help for benchmark
      --key string                    identify HTTPS client using this SSL key file
      --precise                       use full floating point precision
      --sample                        'true' to sample requests for every second
      --target-leader                 connect only to the leader node
      --user string                   provide username[:password] and prompt if password is not supplied.

Use "benchmark [command] --help" for more information about a command.
```

:::

::: details （2）写入测试

```bash
# --conns               gRPC连接数
# --clients             gRPC客户端数
# --total               写入请求总次数，即key的总数
# --sequential-keys     使用顺序key
# --key-size            key大小,单位字节
# --val-size            value大小,单位字节

# write to all members
benchmark --endpoints=https://10.0.8.4:12379,https://10.0.8.4:22379,https://10.0.8.4:32379 \
          --cacert=/etc/etcd/pki/ca.pem \
          --cert=/etc/etcd/pki/etcd.pem \
          --key=/etc/etcd/pki/etcd-key.pem \
          --conns=100 \
          --clients=1000 \
    put \
          --total=100000 \
          --sequential-keys \
          --key-size=8 \
          --val-size=256
```

:::

::: details （3）读取测试

```bash
# --conns               gRPC连接数
# --clients             gRPC客户端数
# --consistency=l       线性化(Linearizable)读取请求要通过集群成员的法定人数来获取最新的数据
#                       串行化(Serializable)读取请求通过任意单台etcd服务器来提供服务,而不是成员的法定人数,读取效率更高,代价是可能提供过期数据
# --total=100000        读取请求总次数
        
# Many concurrent read requests
benchmark --endpoints=https://10.0.8.4:12379,https://10.0.8.4:22379,https://10.0.8.4:32379 \
          --cacert=/etc/etcd/pki/ca.pem \
          --cert=/etc/etcd/pki/etcd.pem \
          --key=/etc/etcd/pki/etcd-key.pem \
          --conns=100 \
          --clients=1000 \
    range / --consistency=l --total=100000

benchmark --endpoints=https://10.0.8.4:12379,https://10.0.8.4:22379,https://10.0.8.4:32379 \
          --cacert=/etc/etcd/pki/ca.pem \
          --cert=/etc/etcd/pki/etcd.pem \
          --key=/etc/etcd/pki/etcd-key.pem \
          --conns=100 \
          --clients=1000 \
    range / --consistency=s --total=100000
```

:::

<br />

### 数据清理和碎片整理

::: details （1）写入数据

```bash
# 对于同一个key,不断写入新数据覆盖老数据,使其产生旧版本
for i in `seq 100000`; do
  for j in `seq 10`
  do
    ectl put /itops/test/write-before-backup/${i} ${j}
  done
done

# 等待写入完成
```

:::

::: details （2）数据清理和碎片整理

```bash
# 检查磁盘大小
[root@ap-hongkang ~]# du -sh /var/lib/etcd-*
335M    /var/lib/etcd-1
336M    /var/lib/etcd-2
335M    /var/lib/etcd-3

# 检查数据大小,重点看DB SIZE，每个endpoint都是 95 MB
etcdctl \
    --endpoints=https://10.0.8.4:12379,https://10.0.8.4:22379,https://10.0.8.4:32379 \
    --cacert=/etc/etcd/pki/ca.pem \
    --cert=/etc/etcd/pki/etcd.pem \
    --key=/etc/etcd/pki/etcd-key.pem \
    -w table \
  endpoint status
  
# 获取最新的Revision
etcdctl \
    --endpoints=https://10.0.8.4:12379,https://10.0.8.4:22379,https://10.0.8.4:32379 \
    --cacert=/etc/etcd/pki/ca.pem \
    --cert=/etc/etcd/pki/etcd.pem \
    --key=/etc/etcd/pki/etcd-key.pem \
    -w=json \
  endpoint status | grep -Eo '"revision":[0-9]*' | grep -Eo '[0-9].*' | sort -u

# 清理所有旧版本数据
# 这一步操作并不会释放空间,但是在指定Revision之前的修订版本变得无法访问，这可能是一个危险的命令，请谨慎执行
# 1000000 是上条命令输出的结果
etcdctl \
    --endpoints=https://10.0.8.4:12379,https://10.0.8.4:22379,https://10.0.8.4:32379 \
    --cacert=/etc/etcd/pki/ca.pem \
    --cert=/etc/etcd/pki/etcd.pem \
    --key=/etc/etcd/pki/etcd-key.pem \
  compact 1000000

# 碎片整理(这一步操作会释放空间)
etcdctl \
    --endpoints=https://10.0.8.4:12379,https://10.0.8.4:22379,https://10.0.8.4:32379 \
    --cacert=/etc/etcd/pki/ca.pem \
    --cert=/etc/etcd/pki/etcd.pem \
    --key=/etc/etcd/pki/etcd-key.pem \
  defrag

Finished defragmenting etcd member[https://10.0.8.4:12379]
Finished defragmenting etcd member[https://10.0.8.4:22379]
Finished defragmenting etcd member[https://10.0.8.4:32379]

# 再次检查磁盘大小
[root@ap-hongkang ~]# du -sh /var/lib/etcd-*
254M    /var/lib/etcd-1
254M    /var/lib/etcd-2
254M    /var/lib/etcd-3

# 检查数据大小,重点看DB SIZE，每个endpoint都是 9.6 MB
etcdctl \
    --endpoints=https://10.0.8.4:12379,https://10.0.8.4:22379,https://10.0.8.4:32379 \
    --cacert=/etc/etcd/pki/ca.pem \
    --cert=/etc/etcd/pki/etcd.pem \
    --key=/etc/etcd/pki/etcd-key.pem \
    -w table \
  endpoint status
```

:::

总结：经过多次测试，当`key`的旧版本数量越多时，数据清理和碎片整理的效果越好

<br />

### 认证和授权

文档：[https://etcd.io/docs/v3.5/op-guide/authentication/](https://etcd.io/docs/v3.5/op-guide/authentication/)

::: details （1）默认的认证配置

```bash
# 默认情况下认证是关闭的
[root@ap-hongkang ~]# ectl auth status
Authentication Status: false
AuthRevision: 2

# 默认情况下不存在任何用户和角色,以下输出都为空
[root@ap-hongkang ~]# ectl user list
[root@ap-hongkang ~]# ectl role list
```

:::

::: details （2）用户、角色、授权操作

```bash
# 添加一个用户 admin
[root@ap-hongkang ~]# ectl user add admin
Password of admin: 
Type password of admin again for confirmation: 
User admin created

# 添加一个角色 admin
[root@ap-hongkang ~]# ectl role add admin
Role admin created

# 授权admin角色给admin用户
[root@ap-hongkang ~]# ectl user grant-role admin admin
Role admin is granted to user admin

# 对角色进行授权
#   只读权限 read
#   只写权限 write
#   读写权限 readwrite
# 下面的命令代表对admin角色授权以/admin开头的所有key读写权限
[root@ap-hongkang ~]# ectl role grant-permission admin readwrite /admin --prefix=true
Role admin updated

# ====================================================================================

# 查看用户拥有哪些角色
[root@ap-hongkang ~]# ectl user get admin
User: admin
Roles: admin

# 查看角色拥有哪些权限，需要注意一下这个：[/admin, /admio)
#   1) 这表示了一个范围，该范围包含/admin，但不包含/admio, 前包后不包，在编程语言中类似的写法很常见,比如Python
#   2) 为啥是/admio呢? 因为26个字母中n后面的就是o
[root@ap-hongkang ~]# ectl role get admin
Role admin
KV Read:
        [/admin, /admio) (prefix /admin)
KV Write:
        [/admin, /admio) (prefix /admin)
        
# ====================================================================================

# 撤销用户的某个角色
[root@ap-hongkang ~]# ectl user revoke-role admin admin
Role admin is revoked from user admin

# 撤销角色的某个权限
[root@ap-hongkang ~]# ectl role revoke-permission admin /admin --prefix=true
Permission of range [/admin, /admio) is revoked from role admin
```

:::

::: details （3）开启身份认证准备工作

```bash
# root用户是必须要创建的
# root角色可以不用提前创建，在开启认证时会自动创建，但是会打印warn级别日志，所以如果不想看到提醒日志就提前创建一下

# 创建root用户，并设置密码
[root@ap-hongkang ~]# ectl user add root
Password of root: 
Type password of root again for confirmation: 
User root created

# 创建root角色，不需要对该角色设置权限
[root@ap-hongkang ~]# ectl role add root
Role root created

# 授权root角色给用户root
[root@ap-hongkang ~]# ectl user grant-role root root
Role admin is granted to user admin
```

:::

::: details （4）开启身份认证和关闭认证

```bash
# 开启认证
[root@ap-hongkang ~]# ectl auth enable
Authentication Enabled

# 匿名用户测试: 写数据
[root@ap-hongkang ~]# ectl put a b
{"level":"warn","ts":"2022-11-06T19:24:51.006+0800","logger":"etcd-client","caller":"v3/retry_interceptor.go:62","msg":"retrying of unary invoker failed","target":"etcd-endpoints://0xc0000328c0/10.0.8.4:12379","attempt":0,"error":"rpc error: code = PermissionDenied desc = etcdserver: permission denied"}
Error: etcdserver: permission denied

# 匿名用户测试: 查看集群状态
[root@ap-hongkang ~]# ectl endpoint status
https://10.0.8.4:12379, d095f9673bd60ca8, 3.5.5, 59 MB, true, false, 2, 641204, 641204, 
https://10.0.8.4:22379, 9e284eda82a7e8e7, 3.5.5, 59 MB, false, false, 2, 641204, 641204, 
https://10.0.8.4:32379, d5c1cf5d0aabe186, 3.5.5, 59 MB, false, false, 2, 641207, 641207,

# 命名用户测试: 写数据
[root@ap-hongkang ~]# ectl --user root:123456 put /a b
OK
[root@ap-hongkang ~]# ectl --user root:123456 put /admin/c d
OK

# 命名用户测试: 权限测试
[root@ap-hongkang ~]# ectl --user admin:123456 get /a
{"level":"warn","ts":"2022-11-06T19:27:01.466+0800","logger":"etcd-client","caller":"v3/retry_interceptor.go:62","msg":"retrying of unary invoker failed","target":"etcd-endpoints://0xc000032540/10.0.8.4:12379","attempt":0,"error":"rpc error: code = PermissionDenied desc = etcdserver: permission denied"}
Error: etcdserver: permission denied
[root@ap-hongkang ~]# ectl --user admin:123456 get /admin/c
/admin/c
d

# 关闭认证
[root@ap-hongkang ~]# ectl --user root:123456 auth disable
```

:::

<br />

## 使用指南

文档：[https://github.com/etcd-io/etcd/blob/main/etcdctl/README.md](https://github.com/etcd-io/etcd/blob/main/etcdctl/README.md)

### 写入数据

::: details （1）写入数据：基础

```bash
# (1) 写入数据：若数据已存在则会覆盖
[root@ap-hongkang ~]# ectl put foo bar1
OK
[root@ap-hongkang ~]# ectl put foo bar2
OK

# 读取数据
[root@ap-hongkang ~]# ectl get foo 
foo
bar2

# (2) 写入数据：--prev-kv 用于返回被覆盖之前的key和value，若之前不存在则不返回
[root@ap-hongkang ~]# ectl put non-key non-value --prev-kv
OK
[root@ap-hongkang ~]# ectl put non-key non-value --prev-kv
OK
non-key
non-value
[root@ap-hongkang ~]# ectl put foo bar3 --prev-kv
OK
foo
bar2

# (3) 写入数据：通过管道写入数据
[root@ap-hongkang ~]# echo bar | ectl put foo
OK

# (4) 写入数据：当值以-开头时会被解释为选项，解决方法是在值前面插入 --
[root@ap-hongkang ~]# ectl put -- foo -bar  # 方法1
OK
[root@ap-hongkang ~]# ectl put foo -- -bar  # 方法2
OK
```

:::

<br />

### 读取数据

::: details （1）读取数据：返回单个kv和一组kv

```bash
# 返回单个kv
[root@ap-hongkang ~]# ectl get foo
foo
-bar

# -------------------------------------------------------------
# 返回一组kv
[root@ap-hongkang ~]# ectl put a1 1 && \
                      ectl put a2 2 && \
                      ectl put b2 2 && \
                      ectl put c3 3 && \
                      ectl put da 4

# (1) 方式一：指定范围
[root@ap-hongkang ~]# ectl get a            # key不存在,返回空
[root@ap-hongkang ~]# ectl get a1           # key存在,返回value
a1
1
[root@ap-hongkang ~]# ectl get a c          # 指定范围 [a,c]，包含a但不包含c
a1
1
a2
2
b2
2

# (2) 方式二：指定前缀
[root@ap-hongkang ~]# ectl get a --prefix   # 返回所有以a为前缀的kv
a1
1
a2
2
[root@ap-hongkang ~]# ectl get "" --prefix  # 获取所有kv

# (3) 方式三：返回等于或大于指定key的kv
[root@ap-hongkang ~]# ectl get b --from-key
b2
2
c3
3
da
4
[root@ap-hongkang ~]# ectl get "" --from-key  # 获取所有kv
```

:::

::: details （2）读取数据：返回值处理：limit、sort、order、count ...

```bash
# (1) limit: 限制返回数量
[root@ap-hongkang ~]# ectl get "" --prefix --limit 2
/a
b
/admin/c
d

# (2) 按照某个字段排序
[root@ap-hongkang ~]# ectl put foo3 foo3val && \
                      ectl put foo1 foo1val && \
                      ectl put foo2 foo2val
[root@ap-hongkang ~]# ectl get foo foo4                   # 默认按照升序排序
foo1
foo1val
foo2
foo2val
foo3
foo3val
[root@ap-hongkang ~]# ectl get foo foo4 --sort-by=CREATE  # 按照 创建时间+升序 排序
foo3
foo3val
foo1
foo1val
foo2
foo2val

# (3) order: 按照 升序(ASCEND,默认) 或 降序(DESCEND) 排序
# 下面的命令是先排序，然后再返回前2个
[root@ap-hongkang ~]# ectl get "" --prefix --limit 2
/a
b
/admin/c
d
[root@ap-hongkang ~]# ectl get "" --prefix --limit 2 --order DESCEND
z
26
y
25

# (4) 统计key数量
#  注意：不能单独使用 --count-only, 必须还要加上 -w=fields
[root@ap-hongkang ~]# ectl get a --prefix                          # 以a开头的有两个key
a1
1
a2
2
[root@ap-hongkang ~]# ectl get a --prefix --count-only -w=fields   # 统计一下数量
"ClusterID" : 17381046135283785533
"MemberID" : 15402820199101751686
"Revision" : 1126237
"RaftTerm" : 5
"More" : false
"Count" : 2
[root@ap-hongkang ~]# ectl get "" --prefix --count-only -w=fields   # 统计一下所有key的数量
"ClusterID" : 17381046135283785533
"MemberID" : 15030193553199729832
"Revision" : 1126237
"RaftTerm" : 5
"More" : false
"Count" : 100040

# (5) 仅返回key或value，若kv不存在则什么也不返回
[root@ap-hongkang ~]# ectl get foo --keys-only
foo

[root@ap-hongkang ~]# ectl get foo --print-value-only
-bar
```

:::

::: details （3）读取数据：全局修订编号 Revision

```bash
# 设置一些值
[root@ap-hongkang ~]# ectl del name     && \
                      ectl del age      && \
                      ectl put name bob && \
                      ectl put age 18   && \
                      ectl put name jack && \
                      ectl put age 20 && \
                      ectl put name alice && \
                      ectl put age 26

# 因为旧值被覆盖的原因，我们只能获取到最新值
[root@ap-hongkang ~]# ectl get name
name
alice
[root@ap-hongkang ~]# ectl get age
age
26

# 通过输出json格式的数据,可以看到一些详细信息
[root@ap-hongkang ~]# ectl get name -w json | jq
{
  "header": {
    "cluster_id": 17381046135283786000,
    "member_id": 15030193553199730000,
    "revision": 1126267,          # member_id代表的节点的全局修订编号
    "raft_term": 5
  },
  "kvs": [
    {
      "key": "bmFtZQ==",           # key, base64编码
      "create_revision": 1126262,  # 此key创建的全局修订编号
      "mod_revision": 1126266,     # 此key最后一次更新的全局修订编号
      "version": 3,                # 此key有3个版本,首次创建(1) + 修改(2)
      "value": "YWxpY2U="          # value, base64编码
    }
  ],
  "count": 1                       # 代表key的个数是1
}

# (1) 解码出上面的base64
[root@ap-hongkang ~]# echo bmFtZQ== | base64 -d ; echo
name
[root@ap-hongkang ~]# echo YWxpY2U= | base64 -d ; echo
alice

# (2) 通过首次修改的全局修订编号获取第一次设置的值
[root@ap-hongkang ~]# ectl get name --rev=1126262
name
bob

# (3) 通过最后一次修改的全局修订编号获取第一次设置的值
[root@ap-hongkang ~]# ectl get name --rev=1126266
name
alice

# (4) 通过首次修改的全局修订编号获取所有的值
[root@node-1 example]# ectl watch --rev=1126262 name
PUT
name
bob   # 值1
PUT
name
jack  # 值2
PUT
name
alice # 值3
```

:::

<br />

### 删除数据

::: details 点击查看详情

```bash
# 删除指定kv
[root@ap-hongkang ~]# ectl get a1
a1
1
[root@ap-hongkang ~]# ectl del a1
1
[root@ap-hongkang ~]# ectl get a1

# 删除所有kv
[root@ap-hongkang ~]# ectl del "" --prefix
6
[root@ap-hongkang ~]# ectl get "" --prefix
```

:::

<br />

### 使用租约

::: details （1）租约（Lease）基础使用

```bash
# 创建一个30秒的租约
[root@ap-hongkang ~]# ectl lease grant 30
lease 61868450102ec17f granted with TTL(30s)

# 查看租约剩余时间
[root@ap-hongkang ~]# ectl lease timetolive 61868450102ec17f
lease 61868450102ec17f granted with TTL(30s), remaining(22s)

# 写入数据并设置租约，当租约到期后(在这里是30秒),key和value会被删除
[root@ap-hongkang ~]# ectl put foo bar --lease 61868450102ec17f
```

:::

::: details （2）监控租约的 Shell 脚本

`lease.sh`

```bash
#!/bin/bash

# 当前时间
function Now(){
    echo -n $(date +"%Y-%m-%d %H:%M:%S")
}

# 创建租约
function CreateLease(){
    ttl=$1
    lease=$(ectl lease grant ${ttl} | sed -r "s/(lease )([a-zA-Z0-9]+)( granted.*)/\2/")
    if [[ -n ${lease} ]];then
        echo "$(Now) 创建租约成功: ${lease}"
    else
        echo "$(Now) 创建租约失败: ${lease}"
        exit 1
    fi
}

# 写入数据
function PutKeyValue(){
    key="$1"
    value="$2"
    status=$(ectl put ${key} ${value} --lease ${lease} | grep -E '^OK$')
    if [[ -n ${status} ]];then
        echo "$(Now) 写入数据成功: ${key} ${value}"
    else
        echo "$(Now) 写入数据失败: ${key} ${value}"
        exit 1
    fi
}

# 监控租约
function LoopUntilKeyNonExists(){
    key="$1"
    while [ true ]
    do
        # 获取key的lease ID
        lease_id=$(ectl get ${key} -w json | jq .kvs[0].lease)

        # 因为key的lease可能会变动，所以这里根据key的lease id动态找到当前所使用的lease
        for line in $(ectl lease list | grep -Ev 'found')
        do
            id=$(ectl lease timetolive $line -w json | jq .id)
            if [[ ${id} == ${lease_id} ]];then
                lease=${line}
                break
            fi
        done        
        # 获取lease详情
        lease_info=$(ectl lease timetolive ${lease} | sed -r 's/(.*)(remaining)(.*)/\3/' | tr -d '()')

        # ---------------------------------------------------------------------------------------

        # 如果value为空,那么检查key是否存在,若不存在则将key置为空
        value=$(ectl get ${key} --print-value-only)
        if [[ ${value} == "" ]];then
            count=$(ectl get ${key} -w fields | grep "Count" | awk '{print $3}')
            if [[ ${count} -eq 0 ]];then
                key=""
            fi
        fi

        # --------------------------------------------------------------------------------------

        # 输出信息
        echo "$(Now) 监控键值租约: ${key} ${value} ${lease} ${lease_id} ${lease_info}"

        # --------------------------------------------------------------------------------------

        # key不存在或lease过期时退出,否则休眠1秒钟
        if [[ ${key} == "" ]] || [[ ${lease_info} =~ "already expired" ]];then
          return 0
        fi
        sleep 1
    done
}

function main(){
    key="$1"
    value="$2"
    ttl="$3"
    CreateLease           "${ttl}"
    PutKeyValue           "${key}" "${value}"
    LoopUntilKeyNonExists "${key}"
}

main "$@"
```

输出结果

```bash
# 创建一个10秒的租约，并写入键值对 name: bob
[root@ap-hongkang ~]# bash lease.sh name bob 10
2022-11-08 14:31:32 创建租约成功: 0ca884501036f1b7
2022-11-08 14:31:32 写入数据成功: name bob
2022-11-08 14:31:33 监控键值租约: name bob 0ca884501036f1b7 912124403946811800 9s  # 912124403946811800是lease的ID
2022-11-08 14:31:34 监控键值租约: name bob 0ca884501036f1b7 912124403946811800 8s
2022-11-08 14:31:35 监控键值租约: name bob 0ca884501036f1b7 912124403946811800 7s
2022-11-08 14:31:36 监控键值租约: name bob 0ca884501036f1b7 912124403946811800 6s
2022-11-08 14:31:37 监控键值租约: name bob 0ca884501036f1b7 912124403946811800 5s
2022-11-08 14:31:38 监控键值租约: name bob 0ca884501036f1b7 912124403946811800 4s
2022-11-08 14:31:39 监控键值租约: name bob 0ca884501036f1b7 912124403946811800 2s
2022-11-08 14:31:41 监控键值租约: name bob 0ca884501036f1b7 912124403946811800 1s
2022-11-08 14:31:42 监控键值租约: name bob 0ca884501036f1b7 912124403946811800 0s
2022-11-08 14:31:43 监控键值租约:   0ca884501036f1b7 null lease 0ca884501036f1b7 already expired
```

:::

::: details （3）若key-value已经存在，再进行覆盖，会使用新租约

```bash
# 终端1
[root@ap-hongkang ~]# bash lease.sh name bob 100
2022-11-08 14:37:20 创建租约成功: 68e78450103011ab
2022-11-08 14:37:20 写入数据成功: name bob
2022-11-08 14:37:20 监控键值租约: name bob 68e78450103011ab 7559155978968502000 99s
2022-11-08 14:37:21 监控键值租约: name bob 68e78450103011ab 7559155978968502000 98s
2022-11-08 14:37:22 监控键值租约: name bob 68e78450103011ab 7559155978968502000 97s
2022-11-08 14:37:23 监控键值租约: name bob 68e78450103011ab 7559155978968502000 96s
2022-11-08 14:37:25 监控键值租约: name bob 68e78450103011ab 7559155978968502000 95s
2022-11-08 14:37:26 监控键值租约: name abc 0ca884501036f1d7 912124403946811900 8s      # 注意观察这里，value和租约已经改变了
2022-11-08 14:37:27 监控键值租约: name abc 0ca884501036f1d7 912124403946811900 7s
2022-11-08 14:37:28 监控键值租约: name abc 0ca884501036f1d7 912124403946811900 6s
2022-11-08 14:37:29 监控键值租约: name abc 0ca884501036f1d7 912124403946811900 5s
2022-11-08 14:37:30 监控键值租约: name abc 0ca884501036f1d7 912124403946811900 4s
2022-11-08 14:37:32 监控键值租约: name abc 0ca884501036f1d7 912124403946811900 3s
2022-11-08 14:37:33 监控键值租约: name abc 0ca884501036f1d7 912124403946811900 1s
2022-11-08 14:37:34 监控键值租约: name abc 0ca884501036f1d7 912124403946811900 0s
2022-11-08 14:37:35 监控键值租约:   0ca884501036f1d7 null lease 0ca884501036f1d7 already expired


# 终端2
[root@ap-hongkang ~]# ectl put name abc --lease `ectl lease grant 10 | awk '{print $2}'`
OK

# 同理，如果将lease设置为0,那么key将不会过期
```

:::

<br />

### 使用事务

文档：[https://etcd.io/docs/v3.5/tutorials/how-to-transactional-write/](https://etcd.io/docs/v3.5/tutorials/how-to-transactional-write/)

::: details 点击查看详情

```bash
# -i用于开启标准输入
# 假设Alice和Bob初始资金都为200，现在Alice要想Bob转账100,那么可以用如下的命令表示
[root@ap-hongkang ~]# ectl txn -i
compares:
value("Alice") = "200"            # 我们输入的
value("Bob") = "200"              # 我们输入的
                                  # 回车
success requests (get, put, del):
put Alice 100                     # 我们输入的
put Bob 300                       # 我们输入的
                                  # 回车
failure requests (get, put, del):
put Alice 200                     # 我们输入的
put Bob 200                       # 我们输入的
                                  # 回车

# 以下是输出结果
FAILURE

OK

OK

# 查看一下各自的金额
[root@ap-hongkang ~]# ectl get Alice
Alice
100
[root@ap-hongkang ~]# ectl get Bob
Bob
300
```

:::

<br />

### 监听机制

文档：[https://etcd.io/docs/v3.5/tutorials/how-to-watch-keys/](https://etcd.io/docs/v3.5/tutorials/how-to-watch-keys/)

::: details 点击查看详情

```bash
# 终端1：监听一个名叫name的key (key存在与否没关系)
[root@ap-hongkang ~]# ectl watch name
[root@ap-hongkang ~]# ectl watch name
PUT
name
bob
DELETE
name

PUT
name
jack
DELETE
name

# 终端2：对name进行操作
[root@ap-hongkang ~]# ectl put name bob
OK
[root@ap-hongkang ~]# ectl del name 
1
[root@ap-hongkang ~]# ectl lease grant 20
lease 68e7845010301542 granted with TTL(20s)
[root@ap-hongkang ~]# ectl put name jack --lease 68e7845010301542
OK
```

:::

<br />

### 使用分布式锁

文档：[https://etcd.io/docs/v3.5/tutorials/how-to-create-locks/](https://etcd.io/docs/v3.5/tutorials/how-to-create-locks/)

::: details 点击查看详情

```bash
# 语法格式：etcdctl lock <lockname> [exec-command arg1 arg2 ...] [flags]

# --------------------------------------------------------------------------
# 基础使用1
# 终端1：尝试获取一个叫做mutext1的分布式锁，因为该锁还没有任何人拿到，所以这里可以看到获取成功
[root@ap-hongkang ~]# ectl lock mutex1 
mutex1/68e78450103014b7

# 终端2：同样尝试获取一个叫做mutext1的分布式锁，它会一直卡在这里
# 当终端1释放锁后，终端2可立即获取到锁
[root@ap-hongkang ~]# ectl lock mutex1

# --------------------------------------------------------------------------
# 基础使用2
# mutex1后面的部分是我们要执行的命令，即 ectl put foo bar
[root@ap-hongkang ~]# ectl lock mutex1 ectl put foo bar
OK

# --------------------------------------------------------------------------
# 关于超时
# 有一个ttl参数，但是没搞明白如何用
```

:::

<br />

### 移动Leader

::: details 点击查看详情

```bash
# 我们先来看一下哪个节点是Leader
# 然后我们随便挑一个Follower节点(既不是LEADER也不是LEARNER的节点),记录下ID
[root@ap-hongkang ~]# ectl endpoint status -w table

# 让我们挑选的Follower节点变成Leader
[root@ap-hongkang ~]# ectl move-leader d5c1cf5d0aabe186
Leadership transferred from d095f9673bd60ca8 to d5c1cf5d0aabe186

# 再次查看Leader节点
[root@ap-hongkang ~]# ectl endpoint status -w table
```

![image-20221109101948352](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221109101948352.png)

:::

<br />

## Official SDK for Go

Github：[https://github.com/etcd-io/etcd/tree/main/client/v3](https://github.com/etcd-io/etcd/tree/main/client/v3)

### 安装

```bash
go get go.etcd.io/etcd/client/v3
```

<br />

### 连接

::: details 准备工作

etcd证书中需要增加外网IP或域名，意思是可以通过此地址连接到etcd

```bash
# 修改hosts
[root@ap-hongkang ~]# vim /etc/etcd/pki/etcd-csr.json
{
  "CN": "etcd",
  "hosts": [
    "127.0.0.1",
    "172.17.0.1",
    "10.0.8.4",
    "43.154.36.151",      
    "jinhui.dev"
  ],
  "key": {
    "algo": "rsa",
    "size": 2048
  },
  "names": [
    {
      "C": "CN",
      "L": "BeiJing",
      "ST": "BeiJing",
      "O": "etcd",
      "OU": "CA"
    }
  ]
}

# 重新签发证书并进行替换步骤省略
```

:::

::: details （1）基础示例

```go
package main

import (
	"context"
	"log"
	"time"

	etcdTransport "go.etcd.io/etcd/client/pkg/v3/transport"
	etcdClient "go.etcd.io/etcd/client/v3"
)

func NewEtcdClient() (*etcdClient.Client, error) {
	// 定义变量
	var (
		certFile      = "etcd.pem"
		keyFile       = "etcd-key.pem"
		trustedCAFile = "ca.pem"
		endpoints     = []string{"jinhui.dev:12379", "jinhui.dev:22379", "jinhui.dev:32379"}
		dialTimeout   = time.Second * 3
	)

	// 生成TLS配置
	tlsInfo := etcdTransport.TLSInfo{
		CertFile:      certFile,
		KeyFile:       keyFile,
		TrustedCAFile: trustedCAFile,
	}
	tlsConfig, err := tlsInfo.ClientConfig()
	if err != nil {
		return nil, err
	}

	// 初始化客户端配置
	config := etcdClient.Config{
		Endpoints:   endpoints,
		TLS:         tlsConfig,
		DialTimeout: dialTimeout, // 这个在哪里生效?
	}

	return etcdClient.New(config)
}

func main() {
	// 初始化Client,这一步并不会去连接etcd
	client, err := NewEtcdClient()
	if err != nil {
		panic(err)
	}
	defer client.Close()

	// 写入kv数据
	key, value := "a", "b"
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*1)
	defer cancel()
	_, err = client.Put(ctx, key, value)
	if err != nil {
		log.Fatalln(err)
	} else {
		log.Printf("Put {%s:%s} succeed\n", key, value)
	}
}
```

执行结果

```bash
# 成功结果
2022/11/09 20:27:39 Put {a:b} succeed

# 失败结果
{"level":"warn","ts":"2022-11-09T20:28:24.383+0800","logger":"etcd-client","caller":"v3@v3.5.5/retry_interceptor.go:62","msg":"retrying of unary invoker failed","target":"etcd-endpoints://0xc0001e5500/43.154.36.151:12379","attemp
t":0,"error":"rpc error: code = DeadlineExceeded desc = context deadline exceeded"}
2022/11/09 20:28:24 context deadline exceeded
```

:::

::: details （2）优化：使用自定义Logger

```go

```

:::
