# Elastic Stack

官网：[https://www.elastic.co](https://www.elastic.co)

<br />

## 部署

### 说明

::: details （1）用户说明

内置用户：[https://www.elastic.co/guide/en/elasticsearch/reference/8.8/built-in-users.html](https://www.elastic.co/guide/en/elasticsearch/reference/8.8/built-in-users.html)

```bash
# 内置用户有很多, 简单列举几个
elastic				超级管理员
kibana_system		Kibana用户
logstash_system		logstash用户
beats_system		Beats 用户

# 内置用户存储在 .security 索引中

# 重置用户密码, -u指定用户名
[root@node-1 ~]# /usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic
```

:::

::: details （2）Service Accounts Token说明

文档：[https://www.elastic.co/guide/en/elasticsearch/reference/current/service-accounts.html](https://www.elastic.co/guide/en/elasticsearch/reference/current/service-accounts.html)

```bash
# 内置服务账号
elastic/fleet-server				队列服务器用于与 Elasticsearch 通信的服务帐户
elastic/kibana						Kibana 用于与 Elasticsearch 通信的服务帐户
elastic/enterprise-search-server	Enterprise Search 用于与 Elasticsearch 通信的服务帐户

# 重置用户Token
[root@node-1 ~]# /usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana
```

:::

::: details （3）SSL说明

```bash
# Enable security features
# 是否启用安全功能, 包括身份验证、授权和传输层加密等
xpack.security.enabled: true

# 是否启用安全自动注册(enrollment)功能
# 安全自动注册是指允许节点自动加入到安全集群中的过程，以便它们能够受到安全功能的保护
# 当设置为false时，表示禁用安全自动注册功能, 意味着需要手动配置和注册节点，以确保它们具有正确的安全设置和凭据
xpack.security.enrollment.enabled: true

# Enable encryption for HTTP API client connections, such as Kibana, Logstash, and Agents
# 客户端与ES之间是否开启SSL, 默认为true
xpack.security.http.ssl:
  enabled: true
  keystore.path: certs/http.p12
  
# Enable encryption and mutual authentication between cluster nodes
# ES Node之间否开启SSL, 默认为true
xpack.security.transport.ssl:
  enabled: true
  verification_mode: certificate
  keystore.path: certs/transport.p12
  truststore.path: certs/transport.p12
```

:::

<br />

### RPM

::: details （1）部署 ElasticSearch

文档：[https://www.elastic.co/guide/en/elasticsearch/reference/8.8/rpm.html](https://www.elastic.co/guide/en/elasticsearch/reference/8.8/rpm.html)

```bash
# 1.设置yum源, 默认不开启
[root@node-1 ~]# rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch
[root@node-1 ~]# vim /etc/yum.repos.d/elastic.repo
[elasticsearch]
name=Elasticsearch repository for 8.x packages
baseurl=https://artifacts.elastic.co/packages/8.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=0
autorefresh=1
type=rpm-md

# 2.安装最新版ES
[root@node-1 ~]# sudo yum install --enablerepo=elasticsearch elasticsearch

# 3.启动ES
[root@node-1 ~]# systemctl start elasticsearch.service
[root@node-1 ~]# systemctl enable elasticsearch.service

# 4.使用elastic用户测试, 如果不知道密码可以重置
[root@node-1 ~]# /usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic
[root@node-1 ~]# curl --cacert /etc/elasticsearch/certs/http_ca.crt -u elastic https://localhost:9200
Enter host password for user 'elastic':
{
  "name" : "node-1",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "K5IYfLfvQ0mO41K_339UBw",
  "version" : {
    "number" : "8.8.2",
    "build_flavor" : "default",
    "build_type" : "rpm",
    "build_hash" : "98e1271edf932a480e4262a471281f1ee295ce6b",
    "build_date" : "2023-06-26T05:16:16.196344851Z",
    "build_snapshot" : false,
    "lucene_version" : "9.6.0",
    "minimum_wire_compatibility_version" : "7.17.0",
    "minimum_index_compatibility_version" : "7.0.0"
  },
  "tagline" : "You Know, for Search"
}

# 5.关闭【客户端连接ES】所使用的SSL
vim /usr/share/elasticsearch/config/elasticsearch.yml
xpack.security.http.ssl:
  enabled: false
  keystore.path: certs/http.p12
```

:::

::: details （2）部署 Kibana

文档：[https://www.elastic.co/guide/en/kibana/8.8/rpm.html](https://www.elastic.co/guide/en/kibana/8.8/rpm.html)

```bash
# 安装, 若未配置yum源请参考 ElasticSearch 部分
[root@node-1 ~]# yum install --enablerepo=elasticsearch kibana

# 配置
[root@node-1 ~]# vim /etc/kibana/kibana.yml
server.port: 5601
server.host: "0.0.0.0"

# 启动
[root@node-1 bin]# systemctl start kibana.service
[root@node-1 bin]# systemctl enable kibana.service

# 查看日志, 获取一个连接地址用于初始化操作
[root@node-1 ~]# systemctl status kibana
[root@node-1 ~]# journalctl --unit kibana

Jul 04 07:25:45 node-1 kibana[56557]: Go to http://0.0.0.0:5601/?code=295191 to get started.

# 根据URL初始化, 需要用到Service Account Token
```

:::

::: details （3）部署 FileBeat

文档：[https://www.elastic.co/guide/en/beats/filebeat/8.8/filebeat-installation-configuration.html](https://www.elastic.co/guide/en/beats/filebeat/8.8/filebeat-installation-configuration.html)

```bash
# 安装, 若未配置yum源请参考 ElasticSearch 部分
[root@node-1 ~]# yum install --enablerepo=elasticsearch filebeat

# 启动
[root@node-1 bin]# systemctl start filebeat.service
[root@node-1 bin]# systemctl enable filebeat.service

# 配置连接到ES, 这里为了方便设置ES关闭SSL连接
[root@node-1 ~]# vim /etc/filebeat/filebeat.yml
output.elasticsearch:
  hosts: ["localhost:9200"]
  username: "elastic"
  password: "f0PxVmx_YXj*GLK4i-FL"

# 初始化预置索引模板
[root@node-1 ~]# filebeat setup -e

# 收集Nginx日志
[root@node-1 ~]# vim /etc/filebeat/modules.d/nginx.yml
- module: nginx  
  access:
    enabled: true
    var.paths: ["/var/log/nginx/access.log*"]
```

:::

<br />

### Docker

下载地址：[https://www.docker.elastic.co](https://www.docker.elastic.co)

::: details （1）部署 ElasticSearch

文档：[https://www.elastic.co/guide/en/elasticsearch/reference/8.8/docker.html](https://www.elastic.co/guide/en/elasticsearch/reference/8.8/docker.html)

设置虚拟内存：[https://www.elastic.co/guide/en/elasticsearch/reference/current/vm-max-map-count.html](https://www.elastic.co/guide/en/elasticsearch/reference/current/vm-max-map-count.html)

```bash
# 拉取镜像
docker pull docker.elastic.co/elasticsearch/elasticsearch:8.8.2

# 设置虚拟内存
sysctl -w vm.max_map_count=262144  # 临时
vim /etc/sysctl.conf               # 永久
vm.max_map_count=262144

# 先启动服务用于获取配置文件
mkdir -p /usr/share/elasticsearch
docker container run --name get-es-config -d docker.elastic.co/elasticsearch/elasticsearch:8.8.2  # 等待启动成功
docker container cp get-es-config:/usr/share/elasticsearch/config /usr/share/elasticsearch/
docker container rm -f get-es-config

# 删除动态生成的配置
cd /usr/share/elasticsearch/config
rm -rf certs
rm -rf elasticsearch.keystore
sed -ri '/BEGIN SECURITY AUTO CONFIGURATION/, /END SECURITY AUTO CONFIGURATION/'d elasticsearch.yml

# 启动服务
docker network create elastic
chown -R 1000:root /usr/share/elasticsearch
docker container run --name es-01 \
    --net elastic \
    -p 9200:9200 \
    -p 9300:9300 \
    -v /usr/share/elasticsearch/config:/usr/share/elasticsearch/config \
    --restart=always \
    -d \
  docker.elastic.co/elasticsearch/elasticsearch:8.8.2

# 1.获取证书
docker container cp es-01:/usr/share/elasticsearch/config/certs/http_ca.crt .

# 2.重置密码
docker container exec -it es-01 /usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic

# 3.简单测试, 注意这里是HTTPS
curl --cacert http_ca.crt -u elastic https://localhost:9200
Enter host password for user 'elastic':
{
  "name" : "aa0f449b4e68",
  "cluster_name" : "docker-cluster",
  "cluster_uuid" : "v9PX9PDaQuyZusAtynJbBg",
  "version" : {
    "number" : "8.8.2",
    "build_flavor" : "default",
    "build_type" : "docker",
    "build_hash" : "98e1271edf932a480e4262a471281f1ee295ce6b",
    "build_date" : "2023-06-26T05:16:16.196344851Z",
    "build_snapshot" : false,
    "lucene_version" : "9.6.0",
    "minimum_wire_compatibility_version" : "7.17.0",
    "minimum_index_compatibility_version" : "7.0.0"
  },
  "tagline" : "You Know, for Search"
}

# 4.关闭【客户端连接ES】所使用的SSL
vim /usr/share/elasticsearch/config/elasticsearch.yml
xpack.security.http.ssl:
  enabled: false
  keystore.path: certs/http.p12

[root@node-1 ~]# curl  -u elastic http://localhost:9200
Enter host password for user 'elastic':
{
  "name" : "1ae82614e395",
  "cluster_name" : "docker-cluster",
  "cluster_uuid" : "hbR6yGYpR0-890xNRV_vmw",
  "version" : {
    "number" : "8.8.2",
    "build_flavor" : "default",
    "build_type" : "docker",
    "build_hash" : "98e1271edf932a480e4262a471281f1ee295ce6b",
    "build_date" : "2023-06-26T05:16:16.196344851Z",
    "build_snapshot" : false,
    "lucene_version" : "9.6.0",
    "minimum_wire_compatibility_version" : "7.17.0",
    "minimum_index_compatibility_version" : "7.0.0"
  },
  "tagline" : "You Know, for Search"
}
```

:::

::: details （2）部署 Kibana

文档：[https://www.elastic.co/guide/en/kibana/8.8/docker.html](https://www.elastic.co/guide/en/kibana/8.8/docker.html)

```bash
# 拉取镜像
docker pull docker.elastic.co/kibana/kibana:8.8.2

# 先启动服务用于获取配置文件
mkdir -p /usr/share/kibana
docker container run --name get-kibana-config -d docker.elastic.co/kibana/kibana:8.8.2 # 等待启动成功
docker container cp get-kibana-config:/usr/share/kibana/config /usr/share/kibana/
docker container rm -f get-kibana-config

# 修改配置
vim /usr/share/kibana/config/kibana.yml
server.host: "0.0.0.0"                        		#
server.port: 5601                             		# 添加此行
server.shutdownTimeout: "5s"                  		# 
elasticsearch.hosts: [ "http://es-01:9200" ]  		# 修改ES地址, 注意协议
elasticsearch.username: "kibana_system"             # 内置的kibana用户
elasticsearch.password: "rj*5bTeaUG4W6JoCFLPl"      # 密码如果不知道可以重置
monitoring.ui.container.elasticsearch.enabled: true # 

# 启动服务
chown -R 1000:root /usr/share/kibana
docker container run --name kibana \
    --net elastic \
    -p 5601:5601 \
    -v /usr/share/kibana/config:/usr/share/kibana/config \
    --restart=always \
    -d \
  docker.elastic.co/kibana/kibana:8.8.2

# 修改语言为中文(临时,未做持久化)
[root@localhost ~]# docker exec -it kibana sh
sh-4.2$ vi /usr/share/kibana/config/kibana.yml       # 修改配置
i18n.locale: "zh-CN"                                 # 添加这行
[root@localhost ~]# docker container restart kibana  # 重启容器
```

:::

::: details （3）部署 FileBeat

文档：[https://www.elastic.co/guide/en/beats/filebeat/current/running-on-docker.html](https://www.elastic.co/guide/en/beats/filebeat/current/running-on-docker.html)

**1、拉取镜像，并执行setup子命令进行初始化**

```bash
# 拉取镜像
docker pull docker.elastic.co/beats/filebeat:6.8.6

# 执行 setup 子命令
docker container run --rm docker.elastic.co/beats/filebeat:6.8.6 setup \
    -E setup.kibana.host=http://192.168.48.129:5601 \
    -E output.elasticsearch.hosts=["http://192.168.48.129:9200"]

Loaded index template
Loading dashboards (Kibana must be running and reachable)
Loaded dashboards
Loaded machine learning job configurations

# 解释:
# 1、加载索引模板: Filebeat 将加载与其版本相对应的索引模板, 索引模板定义了将日志数据索引到 Elasticsearch 时的字段映射和设置
# 2、加载仪表板:   Filebeat 将尝试加载与其版本相对应的 Kibana 仪表板, 仪表板提供了可视化和交互式的界面，用于显示和分析采集到的日志数据
# 3、加载机器学习作业配置: 如果启用了机器学习相关功能，Filebeat 还将加载与其版本相对应的机器学习作业配置
```

**2、下载配置文件并启动服务**

```bash
# 下载配置文件: 自动发现Docker容器并发送日志到ElasticSearch
[root@localhost ~]# wget -c https://raw.githubusercontent.com/elastic/beats/6.8/deploy/docker/filebeat.docker.yml -O /etc/filebeat.yaml
[root@localhost ~]# cat /etc/filebeat.yaml
filebeat.config:
  modules:
    path: ${path.config}/modules.d/*.yml
    reload.enabled: false

filebeat.autodiscover:
  providers:
    - type: docker
      hints.enabled: true

processors:
- add_cloud_metadata: ~

output.elasticsearch:
  hosts: '${ELASTICSEARCH_HOSTS:elasticsearch:9200}'
  username: '${ELASTICSEARCH_USERNAME:}'
  password: '${ELASTICSEARCH_PASSWORD:}'

# 启动 filebeat
docker container run --name=filebeat  \
    --user=root \
    --volume="/etc/filebeat.yaml:/usr/share/filebeat/filebeat.yml:ro" \
    --volume="/var/lib/docker/containers:/var/lib/docker/containers:ro" \
    --volume="/var/run/docker.sock:/var/run/docker.sock:ro" \
    --restart=always \
    -d \
  docker.elastic.co/beats/filebeat:6.8.6 filebeat \
     -e \
     -strict.perms=false \
     -E output.elasticsearch.hosts=["http://192.168.48.129:9200"]
```

**3、在kibana上查看filebeat容器的日志**

![image-20230514163848865](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230514163848865.png)

:::

<br />

## ElasticSearch

### 基础操作

::: details （1）文档的增删改查

```bash
# 这是系统自带的, 不用管
GET _search
{
  "query": {
    "match_all": {}
  }
}

# --------------------------------------------------

# 新增文档
POST /account/person/1
{
  "name": "bob",
  "age": "21"
}


# 查询文档
GET /account/person/1


# 修改文档
POST /account/person/1/_update
{
  "doc": {
      "name": "bob",
      "age": "22"
  }
}


# 删除文档
DELETE /account/person/1
```

输出结果

```json
// 新增文档
{
  "_index" : "account",
  "_type" : "person",
  "_id" : "1",
  "_version" : 1,
  "result" : "created",
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  },
  "_seq_no" : 0,
  "_primary_term" : 1
}

// 查询文档
{
  "_index" : "account",
  "_type" : "person",
  "_id" : "1",
  "_version" : 1,
  "_seq_no" : 0,
  "_primary_term" : 1,
  "found" : true,
  "_source" : {
    "name" : "bob",
    "age" : "21"
  }
}

// 修改文档
{
  "_index" : "account",
  "_type" : "person",
  "_id" : "1",
  "_version" : 2,
  "result" : "updated",
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  },
  "_seq_no" : 1,
  "_primary_term" : 1
}

// 删除文档
{
  "_index" : "account",
  "_type" : "person",
  "_id" : "1",
  "_version" : 3,
  "result" : "deleted",
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  },
  "_seq_no" : 2,
  "_primary_term" : 1
}

// 删除文档后再次查询
{
  "_index" : "account",
  "_type" : "person",
  "_id" : "1",
  "found" : false
}
```

:::

::: details （2）数据查询

```bash
# 使用查询字符串, 默认区分大小写
GET /account/person/_search?q=bob

# 使用DSL查询语法, 默认不区分大小写
GET /account/person/_search
{
  "query": {
    "match": {
      "name": "bob"
    }
  }
}
```

输出结果

```json
{
  "took" : 1,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : 1,
    "max_score" : 0.2876821,
    "hits" : [
      {
        "_index" : "account",
        "_type" : "person",
        "_id" : "1",
        "_score" : 0.2876821,
        "_source" : {
          "name" : "bob",
          "age" : "21"
        }
      }
    ]
  }
}
```

:::

<br />

### 运行状态

::: details 运行状态说明

**Green（绿色）**

表示集群非常健康，所有的分片都已经正确分配，数据可用性良好，并且集群能够正常处理读写请求。这是最理想的状态

**Yellow（黄色）**

表示集群基本上是健康的，所有的主分片都已经正确分配，但是一些副本分片尚未分配

**Red（红色）**

表示集群处于不可用状态，至少一个主分片未能分配

:::

::: details （1）Yellow原因之：副本分片无法分配

![image-20230514171335646](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230514171335646.png)

:::