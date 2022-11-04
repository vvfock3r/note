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

### 单节点

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

（2）启动参数说明

| 参数                            | 说明                                                         | 默认值                          |
| ------------------------------- | ------------------------------------------------------------ | ------------------------------- |
| `--name`                        | 节点名称                                                     | `default`                       |
| `--listen-client-urls`          | 用于【客户端与服务端通信】的监听地址，<br />若要监听所有端口可以设置为0.0.0.0 | `http://localhost:2379`         |
| `--listen-peer-urls`            | 用于【服务端与服务端通信】的监听地址，<br />若要监听所有端口可以监听0.0.0.0 | `http://localhost:2380`         |
| `--advertise-client-urls`       | 用于在集群中暴露【客户端与服务端通信】的监听地址，<br />不要设置localhost或0.0.0.0, 因为这些地址无法从远程计算机访问 | `http://localhost:2379`         |
| `--initial-advertise-peer-urls` | 用于在集群中暴露【服务端与服务端通信】的监听地址，<br />不要设置localhost或0.0.0.0, 因为这些地址无法从远程计算机访问 | `http://localhost:2380`         |
| `--initial-cluster`             | 集群初始化，这里将列出所有的集群节点，<br />注意这里的key必须要和etcd节点名称保持一致 | `default=http://localhost:2380` |
| `--data-dir`                    | 数据存储目录                                                 | `${name}.etcd`                  |

（3）编写Systemd服务

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

（4）客户端测试

```bash
# (1)
[root@ap-hongkang ~]# etcdctl --endpoints=http://127.0.0.1:2379 member list --write-out=table
+------------------+---------+--------+----------------------+----------------------+------------+
|        ID        | STATUS  |  NAME  |      PEER ADDRS      |     CLIENT ADDRS     | IS LEARNER |
+------------------+---------+--------+----------------------+----------------------+------------+
| a7a710e533cab390 | started | etcd-1 | http://10.0.8.4:2380 | http://10.0.8.4:2379 |      false |
+------------------+---------+--------+----------------------+----------------------+------------+

# (2)
[root@ap-hongkang ~]# etcdctl --endpoints=http://10.0.8.4:2379 member list --write-out=table
+------------------+---------+--------+----------------------+----------------------+------------+
|        ID        | STATUS  |  NAME  |      PEER ADDRS      |     CLIENT ADDRS     | IS LEARNER |
+------------------+---------+--------+----------------------+----------------------+------------+
| a7a710e533cab390 | started | etcd-1 | http://10.0.8.4:2380 | http://10.0.8.4:2379 |      false |
+------------------+---------+--------+----------------------+----------------------+------------+

# (3)
[root@ap-hongkang ~]# etcdctl --endpoints=http://10.0.8.4:2380 member list --write-out=table
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

# 下载镜像
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
                                           --data-dir=/var/lib/etcd

# 客户端连接测试 - 容器内
[root@ap-hongkang ~]# docker container exec -it etcd etcdctl --endpoints=http://127.0.0.1:2379 member list --write-out=table
+------------------+---------+--------+-----------------------+-----------------------+------------+
|        ID        | STATUS  |  NAME  |      PEER ADDRS       |     CLIENT ADDRS      | IS LEARNER |
+------------------+---------+--------+-----------------------+-----------------------+------------+
| c3f540d198990d14 | started | etcd   | http://10.0.8.4:12380 | http://10.0.8.4:12379 |      false |
+------------------+---------+--------+-----------------------+-----------------------+------------+

# 客户端连接测试 - 容器外
[root@ap-hongkang ~]# etcdctl --endpoints=http://10.0.8.4:12379 member list --write-out=table
+------------------+---------+--------+-----------------------+-----------------------+------------+
|        ID        | STATUS  |  NAME  |      PEER ADDRS       |     CLIENT ADDRS      | IS LEARNER |
+------------------+---------+--------+-----------------------+-----------------------+------------+
| c3f540d198990d14 | started | etcd   | http://10.0.8.4:12380 | http://10.0.8.4:12379 |      false |
+------------------+---------+--------+-----------------------+-----------------------+------------+
```

:::

<br />

### 多节点

::: details （1）Docker部署

```bash
# 定义基础变量
[root@ap-hongkang ~]# ETCD_VER=v3.5.5

# 下载镜像
[root@ap-hongkang ~]# docker pull quay.io/coreos/etcd:${ETCD_VER}

# 定义启动参数
[root@ap-hongkang ~]# Node_IP=10.0.8.4
[root@ap-hongkang ~]# Cluster_List=etcd-1=http://${NODE_IP}:12380,etcd-2=http://${NODE_IP}:22380,etcd-3=http://${NODE_IP}:32380

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
                                           --initial-cluster ${Cluster_List} \
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
                                           --initial-cluster ${Cluster_List} \
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
                                           --initial-cluster ${Cluster_List} \
                                           --data-dir=/var/lib/etcd
# 客户端连接测试 - 容器内
[root@ap-hongkang ~]# docker container exec -it etcd-1 etcdctl --endpoints=http://127.0.0.1:2379 member list --write-out=table
+------------------+---------+--------+-----------------------+-----------------------+------------+
|        ID        | STATUS  |  NAME  |      PEER ADDRS       |     CLIENT ADDRS      | IS LEARNER |
+------------------+---------+--------+-----------------------+-----------------------+------------+
|  2b11f1a1a08ba12 | started | etcd-2 | http://10.0.8.4:22380 | http://10.0.8.4:22379 |      false |
| 97b00ad1eacc3783 | started | etcd-3 | http://10.0.8.4:32380 | http://10.0.8.4:32379 |      false |
| c3f540d198990d14 | started | etcd-1 | http://10.0.8.4:12380 | http://10.0.8.4:12379 |      false |
+------------------+---------+--------+-----------------------+-----------------------+------------+

# 客户端连接测试 - 容器外
[root@ap-hongkang ~]# etcdctl --endpoints=http://10.0.8.4:12379 member list --write-out=table
+------------------+---------+--------+-----------------------+-----------------------+------------+
|        ID        | STATUS  |  NAME  |      PEER ADDRS       |     CLIENT ADDRS      | IS LEARNER |
+------------------+---------+--------+-----------------------+-----------------------+------------+
|  2b11f1a1a08ba12 | started | etcd-2 | http://10.0.8.4:22380 | http://10.0.8.4:22379 |      false |
| 97b00ad1eacc3783 | started | etcd-3 | http://10.0.8.4:32380 | http://10.0.8.4:32379 |      false |
| c3f540d198990d14 | started | etcd-1 | http://10.0.8.4:12380 | http://10.0.8.4:12379 |      false |
+------------------+---------+--------+-----------------------+-----------------------+------------+

# 多节点部署和单节点部署的不同
# (1) 容器名称、节点名称、宿主机监听端口、宿主机存储目录等节点个性化的配置不同
# (2) --initial-cluster中填写所有节点列表
```

:::

<br />







