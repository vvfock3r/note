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

::: details （6）设置别名

```bash
# 为了后续使用方便，给他设置一个别名
[root@ap-hongkang ~]# vim ~/.bashrc
alias ectl='etcdctl --endpoints=https://10.0.8.4:12379,https://10.0.8.4:22379,https://10.0.8.4:32379 --cacert=/etc/etcd/pki/ca.pem --cert=/etc/etcd/pki/etcd.pem --key=/etc/etcd/pki/etcd-key.pem'

# 使当前终端生效
[root@ap-hongkang ~]# source ~/.bashrc

# 测试
[root@ap-hongkang ~]# ectl -w=table endpoint health
+------------------------+--------+-------------+-------+
|        ENDPOINT        | HEALTH |    TOOK     | ERROR |
+------------------------+--------+-------------+-------+
| https://10.0.8.4:12379 |   true | 16.105903ms |       |
| https://10.0.8.4:32379 |   true | 16.139586ms |       |
| https://10.0.8.4:22379 |   true | 19.738679ms |       |
+------------------------+--------+-------------+-------+

# 在整篇笔记中不会使用别名，目的是为了不让人在查看笔记时产生疑惑，让笔记更完整；
# 在实际使用时可以使用别名来代替一长串的命令
```

:::

<br />

## 集群管理

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
```

:::

::: details （2）删除key-value数据

```bash
# 在备份前写一点数据
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
    --write-out=table \
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
    --write-out=table \
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

### 数据压缩和碎片整理

::: details （1）写入数据

```bash
# 对于同一个key,不断写入新数据覆盖老数据,使其产生旧版本
for i in `seq 100000`
do
    etcdctl \
        --endpoints=https://10.0.8.4:12379,https://10.0.8.4:22379,https://10.0.8.4:32379 \
        --cacert=/etc/etcd/pki/ca.pem \
        --cert=/etc/etcd/pki/etcd.pem \
        --key=/etc/etcd/pki/etcd-key.pem \
      put /itops/test/write-before-backup/${i} ${i}
done

for i in `seq 100000`
do
    etcdctl \
        --endpoints=https://10.0.8.4:12379,https://10.0.8.4:22379,https://10.0.8.4:32379 \
        --cacert=/etc/etcd/pki/ca.pem \
        --cert=/etc/etcd/pki/etcd.pem \
        --key=/etc/etcd/pki/etcd-key.pem \
      put /itops/test/write-before-backup/${i} a
done

for i in `seq 100000`
do
    etcdctl \
        --endpoints=https://10.0.8.4:12379,https://10.0.8.4:22379,https://10.0.8.4:32379 \
        --cacert=/etc/etcd/pki/ca.pem \
        --cert=/etc/etcd/pki/etcd.pem \
        --key=/etc/etcd/pki/etcd-key.pem \
      put /itops/test/write-before-backup/${i} b
done

# 等待写入完成后

# 检查磁盘大小
[root@ap-hongkang ~]# du -sh /var/lib/etcd-*
162M    /var/lib/etcd-1
162M    /var/lib/etcd-2
162M    /var/lib/etcd-3

# 检查数据大小,重点看DB SIZE
etcdctl \
    --endpoints=https://10.0.8.4:12379,https://10.0.8.4:22379,https://10.0.8.4:32379 \
    --cacert=/etc/etcd/pki/ca.pem \
    --cert=/etc/etcd/pki/etcd.pem \
    --key=/etc/etcd/pki/etcd-key.pem \
    -w table \
  endpoint status
```

:::

::: details （2）压缩和数据整理

```bash
# 获取最新的Revision
etcdctl \
    --endpoints=https://10.0.8.4:12379,https://10.0.8.4:22379,https://10.0.8.4:32379 \
    --cacert=/etc/etcd/pki/ca.pem \
    --cert=/etc/etcd/pki/etcd.pem \
    --key=/etc/etcd/pki/etcd-key.pem \
    -w=json \
  endpoint status | grep -Eo '"revision":[0-9]*' | grep -Eo '[0-9].*' | sort -u

# 压缩所有旧版本(这一步操作并不会释放空间)
# 136747是上条命令输出的结果
etcdctl \
    --endpoints=https://10.0.8.4:12379,https://10.0.8.4:22379,https://10.0.8.4:32379 \
    --cacert=/etc/etcd/pki/ca.pem \
    --cert=/etc/etcd/pki/etcd.pem \
    --key=/etc/etcd/pki/etcd-key.pem \
  compact 136747

# 碎片整理(这一步操作才会释放空间)
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
125M    /var/lib/etcd-1
125M    /var/lib/etcd-2
125M    /var/lib/etcd-3

# 检查数据大小,重点看DB SIZE
etcdctl \
    --endpoints=https://10.0.8.4:12379,https://10.0.8.4:22379,https://10.0.8.4:32379 \
    --cacert=/etc/etcd/pki/ca.pem \
    --cert=/etc/etcd/pki/etcd.pem \
    --key=/etc/etcd/pki/etcd-key.pem \
    -w table \
  endpoint status
```

:::

总结：经过测试，当`key`的旧版本数量越多时，压缩和碎片整理的效果越好

<br />
