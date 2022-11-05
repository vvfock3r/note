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

配置项：[https://etcd.io/docs/v3.5/op-guide/configuration/](https://etcd.io/docs/v3.5/op-guide/configuration/)

（2）启动参数说明

| 参数                            | 说明                                                         | 默认值                          |
| ------------------------------- | ------------------------------------------------------------ | ------------------------------- |
| `--name`                        | 节点名称                                                     | `default`                       |
| `--listen-client-urls`          | 用于【客户端与服务端通信】的监听地址，<br />若要监听所有端口可以设置为0.0.0.0 | `http://localhost:2379`         |
| `--listen-peer-urls`            | 用于【服务端与服务端通信】的监听地址，<br />若要监听所有端口可以监听0.0.0.0 | `http://localhost:2380`         |
| `--advertise-client-urls`       | 用于在集群中暴露【客户端与服务端通信】的监听地址，<br />不要设置localhost或0.0.0.0, 因为这些地址无法从远程计算机访问 | `http://localhost:2379`         |
| `--initial-advertise-peer-urls` | 用于在集群中暴露【服务端与服务端通信】的监听地址，<br />不要设置localhost或0.0.0.0, 因为这些地址无法从远程计算机访问 | `http://localhost:2380`         |
| `--initial-cluster`             | 集群初始化，这里将列出所有的集群节点，<br />注意这里的key必须要和etcd节点名称保持一致 | `default=http://localhost:2380` |
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

# 创建配置文件和数据目录
[root@ap-hongkang ~]# mkdir -p /var/lib/etcd && chmod 700 /var/lib/etcd
```

（2）编写Systemd服务

```bash
[root@ap-hongkang ~]# vim /etc/systemd/system/etcd.service
[Unit]
Description=etcd
Documentation=https://etcd.io/docs/

[Service]
Type=notify
ExecStart=/usr/local/bin/etcd \
  --name etcd-1 \
  --listen-client-urls http://0.0.0.0:2379 \
  --advertise-client-urls http://10.0.8.4:2379 \
  --listen-peer-urls http://0.0.0.0:2380 \
  --initial-advertise-peer-urls http://10.0.8.4:2380 \
  --initial-cluster etcd-1=http://10.0.8.4:2380 \
  --initial-cluster-state new \
  --initial-cluster-token etcd-cluster \
  --data-dir=/var/lib/etcd
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

（3）客户端测试

```bash
# (1)
[root@ap-hongkang ~]# etcdctl --endpoints=http://127.0.0.1:2379 --write-out=table member list
+------------------+---------+--------+----------------------+----------------------+------------+
|        ID        | STATUS  |  NAME  |      PEER ADDRS      |     CLIENT ADDRS     | IS LEARNER |
+------------------+---------+--------+----------------------+----------------------+------------+
| a7a710e533cab390 | started | etcd-1 | http://10.0.8.4:2380 | http://10.0.8.4:2379 |      false |
+------------------+---------+--------+----------------------+----------------------+------------+

# (2)
[root@ap-hongkang ~]# etcdctl --endpoints=http://10.0.8.4:2379 --write-out=table member list
+------------------+---------+--------+----------------------+----------------------+------------+
|        ID        | STATUS  |  NAME  |      PEER ADDRS      |     CLIENT ADDRS     | IS LEARNER |
+------------------+---------+--------+----------------------+----------------------+------------+
| a7a710e533cab390 | started | etcd-1 | http://10.0.8.4:2380 | http://10.0.8.4:2379 |      false |
+------------------+---------+--------+----------------------+----------------------+------------+

# (3)
[root@ap-hongkang ~]# etcdctl --endpoints=http://10.0.8.4:2380 --write-out=table member list
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

```bash
# 定义变量
[root@ap-hongkang ~]# ETCD_VER=v3.5.5 && NODE_IP=10.0.8.4

# 下载镜像(需科学上网)
[root@ap-hongkang ~]# docker pull quay.io/coreos/etcd:${ETCD_VER}

# 启动容器
[root@ap-hongkang ~]# docker container run --name etcd \
                                           -p 12379:2379 \
                                           -p 12380:2380 \
                                           -v /var/lib/etcd:/var/lib/etcd \
                                           -d \
                                           --restart always \
                          quay.io/coreos/etcd:${ETCD_VER} /usr/local/bin/etcd \
                                           --name etcd \
                                           --listen-client-urls http://0.0.0.0:2379 \
                                           --advertise-client-urls http://${NODE_IP}:12379 \
                                           --listen-peer-urls http://0.0.0.0:2380 \
                                           --initial-advertise-peer-urls http://${NODE_IP}:12380 \
                                           --initial-cluster etcd-1=http://${NODE_IP}:12380 \
                                           --initial-cluster-state new \
                                           --initial-cluster-token etcd-cluster \
                                           --data-dir=/var/lib/etcd

# 客户端连接测试 - 容器内
[root@ap-hongkang ~]# docker container exec -it etcd etcdctl --endpoints=http://127.0.0.1:2379 --write-out=table member list
+------------------+---------+--------+-----------------------+-----------------------+------------+
|        ID        | STATUS  |  NAME  |      PEER ADDRS       |     CLIENT ADDRS      | IS LEARNER |
+------------------+---------+--------+-----------------------+-----------------------+------------+
| c3f540d198990d14 | started | etcd   | http://10.0.8.4:12380 | http://10.0.8.4:12379 |      false |
+------------------+---------+--------+-----------------------+-----------------------+------------+

# 客户端连接测试 - 容器外
[root@ap-hongkang ~]# etcdctl --endpoints=http://10.0.8.4:12379 --write-out=table member list
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

```bash
# 定义变量
ETCD_VER=v3.5.5
NODE_IP=10.0.8.4
CLUSTER_LIST=etcd-1=http://${NODE_IP}:12380,etcd-2=http://${NODE_IP}:22380,etcd-3=http://${NODE_IP}:32380

# 下载镜像
[root@ap-hongkang ~]# docker pull quay.io/coreos/etcd:${ETCD_VER}

# 启动容器 - 节点1
[root@ap-hongkang ~]# docker container run --name etcd-1 \
                                           -p 12379:2379 \
                                           -p 12380:2380 \
                                           -v /var/lib/etcd-1:/var/lib/etcd \
                                           -d \
                                           --restart always \
                          quay.io/coreos/etcd:${ETCD_VER} /usr/local/bin/etcd \
                                           --name etcd-1 \
                                           --listen-client-urls http://0.0.0.0:2379 \
                                           --advertise-client-urls http://${NODE_IP}:12379 \
                                           --listen-peer-urls http://0.0.0.0:2380 \
                                           --initial-advertise-peer-urls http://${NODE_IP}:12380 \
                                           --initial-cluster ${CLUSTER_LIST} \
                                           --initial-cluster-state new \
                                           --initial-cluster-token etcd-cluster \
                                           --data-dir=/var/lib/etcd

# 启动容器 - 节点2
[root@ap-hongkang ~]# docker container run --name etcd-2 \
                                           -p 22379:2379 \
                                           -p 22380:2380 \
                                           -v /var/lib/etcd-2:/var/lib/etcd \
                                           -d \
                                           --restart always \
                          quay.io/coreos/etcd:${ETCD_VER} /usr/local/bin/etcd \
                                           --name etcd-2 \
                                           --listen-client-urls http://0.0.0.0:2379 \
                                           --advertise-client-urls http://${NODE_IP}:22379 \
                                           --listen-peer-urls http://0.0.0.0:2380 \
                                           --initial-advertise-peer-urls http://${NODE_IP}:22380 \
                                           --initial-cluster ${CLUSTER_LIST} \
                                           --initial-cluster-state new \
                                           --initial-cluster-token etcd-cluster \
                                           --data-dir=/var/lib/etcd

# 启动容器 - 节点3
[root@ap-hongkang ~]# docker container run --name etcd-3 \
                                           -p 32379:2379 \
                                           -p 32380:2380 \
                                           -v /var/lib/etcd-3:/var/lib/etcd \
                                           -d \
                                           --restart always \
                          quay.io/coreos/etcd:${ETCD_VER} /usr/local/bin/etcd \
                                           --name etcd-3 \
                                           --listen-client-urls http://0.0.0.0:2379 \
                                           --advertise-client-urls http://${NODE_IP}:32379 \
                                           --listen-peer-urls http://0.0.0.0:2380 \
                                           --initial-advertise-peer-urls http://${NODE_IP}:32380 \
                                           --initial-cluster ${CLUSTER_LIST} \
                                           --initial-cluster-state new \
                                           --initial-cluster-token etcd-cluster \
                                           --data-dir=/var/lib/etcd
# 客户端连接测试 - 容器内
[root@ap-hongkang ~]# docker container exec -it etcd-1 etcdctl --endpoints=http://127.0.0.1:2379 --write-out=table member list
+------------------+---------+--------+-----------------------+-----------------------+------------+
|        ID        | STATUS  |  NAME  |      PEER ADDRS       |     CLIENT ADDRS      | IS LEARNER |
+------------------+---------+--------+-----------------------+-----------------------+------------+
|  2b11f1a1a08ba12 | started | etcd-2 | http://10.0.8.4:22380 | http://10.0.8.4:22379 |      false |
| 97b00ad1eacc3783 | started | etcd-3 | http://10.0.8.4:32380 | http://10.0.8.4:32379 |      false |
| c3f540d198990d14 | started | etcd-1 | http://10.0.8.4:12380 | http://10.0.8.4:12379 |      false |
+------------------+---------+--------+-----------------------+-----------------------+------------+

# 客户端连接测试 - 容器外
[root@ap-hongkang ~]# etcdctl --endpoints=http://10.0.8.4:12379 --write-out=table member list
+------------------+---------+--------+-----------------------+-----------------------+------------+
|        ID        | STATUS  |  NAME  |      PEER ADDRS       |     CLIENT ADDRS      | IS LEARNER |
+------------------+---------+--------+-----------------------+-----------------------+------------+
|  2b11f1a1a08ba12 | started | etcd-2 | http://10.0.8.4:22380 | http://10.0.8.4:22379 |      false |
| 97b00ad1eacc3783 | started | etcd-3 | http://10.0.8.4:32380 | http://10.0.8.4:32379 |      false |
| c3f540d198990d14 | started | etcd-1 | http://10.0.8.4:12380 | http://10.0.8.4:12379 |      false |
+------------------+---------+--------+-----------------------+-----------------------+------------+

# 多节点的情况下，endpoints最好指定所有节点，有什么区别可以参考下面执行的命令

[root@ap-hongkang ~]# etcdctl --endpoints=http://10.0.8.4:12379 --write-out=table endpoint health
+-----------------------+--------+------------+-------+
|       ENDPOINT        | HEALTH |    TOOK    | ERROR |
+-----------------------+--------+------------+-------+
| http://10.0.8.4:12379 |   true | 1.807196ms |       |
+-----------------------+--------+------------+-------+

[root@ap-hongkang ~]# etcdctl --endpoints=http://10.0.8.4:12379,http://10.0.8.4:22379,http://10.0.8.4:32379 --write-out=table endpoint health
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
[root@ap-hongkang ~]# mkdir -p /etc/etcd/pki
[root@ap-hongkang ~]# cd /etc/etcd/pki

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

::: details （4）启动etcd节点

```bash
# 定义变量
# (1) 协议修改为HTTPS
ETCD_VER=v3.5.5
NODE_IP=10.0.8.4
CLUSTER_LIST=etcd-1=https://${NODE_IP}:12380,etcd-2=https://${NODE_IP}:22380,etcd-3=https://${NODE_IP}:32380

# 容器参数修改
# (1) 挂载证书目录到容器
# (2) 协议修改为HTTPS
# (3) 增加各种通信所用证书

# 启动容器 - 节点1
[root@ap-hongkang ~]# docker container run --name etcd-1 \
                                           -p 12379:2379 \
                                           -p 12380:2380 \
                                           -v /var/lib/etcd-1:/var/lib/etcd \
                                           -v /etc/etcd/pki:/etc/etcd/pki \
                                           -d \
                                           --restart always \
                          quay.io/coreos/etcd:${ETCD_VER} /usr/local/bin/etcd \
                                           --name etcd-1 \
                                           --listen-client-urls https://0.0.0.0:2379 \
                                           --advertise-client-urls https://${NODE_IP}:12379 \
                                           --listen-peer-urls https://0.0.0.0:2380 \
                                           --initial-advertise-peer-urls https://${NODE_IP}:12380 \
                                           --initial-cluster ${CLUSTER_LIST} \
                                           --initial-cluster-state new \
                                           --initial-cluster-token etcd-cluster \
                                           --data-dir=/var/lib/etcd \
                                           --cert-file=/etc/etcd/pki/etcd.pem \
                                           --key-file=/etc/etcd/pki/etcd-key.pem \
                                           --client-cert-auth \
                                           --trusted-ca-file=/etc/etcd/pki/ca.pem \
                                           --auto-tls \
                                           --peer-cert-file=/etc/etcd/pki/etcd.pem \
                                           --peer-key-file=/etc/etcd/pki/etcd-key.pem \
                                           --peer-client-cert-auth \
                                           --peer-trusted-ca-file=/etc/etcd/pki/ca.pem \
                                           --peer-auto-tls

# 启动容器 - 节点2
[root@ap-hongkang ~]# docker container run --name etcd-2 \
                                           -p 22379:2379 \
                                           -p 22380:2380 \
                                           -v /var/lib/etcd-2:/var/lib/etcd \
                                           -v /etc/etcd/pki:/etc/etcd/pki \
                                           -d \
                                           --restart always \
                          quay.io/coreos/etcd:${ETCD_VER} /usr/local/bin/etcd \
                                           --name etcd-2 \
                                           --listen-client-urls https://0.0.0.0:2379 \
                                           --advertise-client-urls https://${NODE_IP}:22379 \
                                           --listen-peer-urls https://0.0.0.0:2380 \
                                           --initial-advertise-peer-urls https://${NODE_IP}:22380 \
                                           --initial-cluster ${CLUSTER_LIST} \
                                           --initial-cluster-state new \
                                           --initial-cluster-token etcd-cluster \
                                           --data-dir=/var/lib/etcd \
                                           --cert-file=/etc/etcd/pki/etcd.pem \
                                           --key-file=/etc/etcd/pki/etcd-key.pem \
                                           --client-cert-auth \
                                           --trusted-ca-file=/etc/etcd/pki/ca.pem \
                                           --auto-tls \
                                           --peer-cert-file=/etc/etcd/pki/etcd.pem \
                                           --peer-key-file=/etc/etcd/pki/etcd-key.pem \
                                           --peer-client-cert-auth \
                                           --peer-trusted-ca-file=/etc/etcd/pki/ca.pem \
                                           --peer-auto-tls

# 启动容器 - 节点3
[root@ap-hongkang ~]# docker container run --name etcd-3 \
                                           -p 32379:2379 \
                                           -p 32380:2380 \
                                           -v /var/lib/etcd-3:/var/lib/etcd \
                                           -v /etc/etcd/pki:/etc/etcd/pki \
                                           -d \
                                           --restart always \
                          quay.io/coreos/etcd:${ETCD_VER} /usr/local/bin/etcd \
                                           --name etcd-3 \
                                           --listen-client-urls https://0.0.0.0:2379 \
                                           --advertise-client-urls https://${NODE_IP}:32379 \
                                           --listen-peer-urls https://0.0.0.0:2380 \
                                           --initial-advertise-peer-urls https://${NODE_IP}:32380 \
                                           --initial-cluster ${CLUSTER_LIST} \
                                           --initial-cluster-state new \
                                           --initial-cluster-token etcd-cluster \
                                           --data-dir=/var/lib/etcd \
                                           --cert-file=/etc/etcd/pki/etcd.pem \
                                           --key-file=/etc/etcd/pki/etcd-key.pem \
                                           --client-cert-auth \
                                           --trusted-ca-file=/etc/etcd/pki/ca.pem \
                                           --auto-tls \
                                           --peer-cert-file=/etc/etcd/pki/etcd.pem \
                                           --peer-key-file=/etc/etcd/pki/etcd-key.pem \
                                           --peer-client-cert-auth \
                                           --peer-trusted-ca-file=/etc/etcd/pki/ca.pem \
                                           --peer-auto-tls
```

:::

::: details （5）客户端连接测试

```bash
[root@ap-hongkang pki]# etcdctl \
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
[root@ap-hongkang ~]# ectl --write-out=table endpoint health
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
```

:::

::: details （2）恢复key-value数据

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

{"level":"warn","ts":"2022-11-05T22:41:49.970+0800","logger":"etcd-client","caller":"v3/retry_interceptor.go:62","msg":"retrying of unary invoker failed","target":"etcd-endpoints://0xc000032c40/10.0.8.4:12379","attempt":0,"error":"rpc error: code = Unknown desc = etcdserver: re-configuration failed due to not enough started members"}
Error: etcdserver: re-configuration failed due to not enough started members
```

:::

::: details （3）新成员启动etcd服务

注意需要修改以下参数：

* `--initial-cluster-state existing`

```bash
# (1) 协议修改为HTTPS
ETCD_VER=v3.5.5
NODE_IP=10.0.8.4
CLUSTER_LIST=etcd-1=https://${NODE_IP}:12380,etcd-3=https://${NODE_IP}:32380,etcd-4=https://${NODE_IP}:42380

# 启动容器 - 节点4
[root@ap-hongkang ~]# docker container run --name etcd-4 \
                                           -p 42379:2379 \
                                           -p 42380:2380 \
                                           -v /var/lib/etcd-4:/var/lib/etcd \
                                           -v /etc/etcd/pki:/etc/etcd/pki \
                                           -d \
                                           --restart always \
                          quay.io/coreos/etcd:${ETCD_VER} /usr/local/bin/etcd \
                                           --name etcd-4 \
                                           --listen-client-urls https://0.0.0.0:2379 \
                                           --advertise-client-urls https://${NODE_IP}:42379 \
                                           --listen-peer-urls https://0.0.0.0:2380 \
                                           --initial-advertise-peer-urls https://${NODE_IP}:42380 \
                                           --initial-cluster ${CLUSTER_LIST} \
                                           --initial-cluster-state existing \
                                           --initial-cluster-token etcd-cluster \
                                           --data-dir=/var/lib/etcd \
                                           --cert-file=/etc/etcd/pki/etcd.pem \
                                           --key-file=/etc/etcd/pki/etcd-key.pem \
                                           --client-cert-auth \
                                           --trusted-ca-file=/etc/etcd/pki/ca.pem \
                                           --auto-tls \
                                           --peer-cert-file=/etc/etcd/pki/etcd.pem \
                                           --peer-key-file=/etc/etcd/pki/etcd-key.pem \
                                           --peer-client-cert-auth \
                                           --peer-trusted-ca-file=/etc/etcd/pki/ca.pem \
                                           --peer-auto-tls

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

```bash
# 停止容器并删除，重新创建即可
```

:::
