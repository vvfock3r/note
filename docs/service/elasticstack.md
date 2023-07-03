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

```

:::

::: details （2）Token说明

:::

::: details （3）SSL说明

```bash
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
# Create a new cluster with the current node only
# Additional nodes can still join the cluster later
```

:::

<br />

### RPM包

::: details （1）部署 ElasticSearch

文档：[https://www.elastic.co/guide/en/elasticsearch/reference/8.8/rpm.html](https://www.elastic.co/guide/en/elasticsearch/reference/8.8/rpm.html)

```bash
# 设置yum源, 默认不开启
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

# 安装ES
[root@node-1 ~]# sudo yum install -y --enablerepo=elasticsearch elasticsearch

# 启动ES
[root@node-1 ~]# systemctl start elasticsearch.service
[root@node-1 ~]# systemctl enable elasticsearch.service

# 重置elastic用户密码
[root@node-1 ~]# /usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic

# 使用elastic用户测试
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
```

:::

<br />

### Docker

下载地址：[https://www.docker.elastic.co](https://www.docker.elastic.co)

::: details （1）部署 ElasticSearch

指定版本文档：[https://www.elastic.co/guide/en/elasticsearch/reference/8.8/docker.html](https://www.elastic.co/guide/en/elasticsearch/reference/8.8/docker.html)

设置虚拟内存：[https://www.elastic.co/guide/en/elasticsearch/reference/current/vm-max-map-count.html](https://www.elastic.co/guide/en/elasticsearch/reference/current/vm-max-map-count.html)

```bash
# 拉取镜像
docker pull docker.elastic.co/elasticsearch/elasticsearch:8.8.2

# 设置虚拟内存
vim /etc/sysctl.conf
vm.max_map_count=262144

# 启动服务
docker network create elastic
docker container run --name es-01 \
    --net elastic \
    -p 9200:9200 \
    -p 9300:9300 \
    --restart=always \
    -d \
  docker.elastic.co/elasticsearch/elasticsearch:8.8.2

# 关闭SSL
xpack.security.http.ssl.enabled=true

# 1.重置密码, 已省略无关紧要的输出
[root@node-1 ~]# docker container exec -it es-01 /usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic
Password for the [elastic] user successfully reset.
New value: AvFAyEjJZ0m4zPY8B8so

# 2.重置Token
[root@node-1 ~]# docker container exec -it es-01 /usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana

# 3.获取证书
docker container cp es-01:/usr/share/elasticsearch/config/certs/http_ca.crt .

# 4.简单测试, 注意这里是HTTPS
[root@node-1 ~]# curl --cacert http_ca.crt -u elastic https://localhost:9200
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
```

:::

::: details （2）部署 Kibana

指定版本文档：[https://www.elastic.co/guide/en/kibana/8.8/docker.html](https://www.elastic.co/guide/en/kibana/8.8/docker.html)

```bash
# 拉取镜像
docker pull docker.elastic.co/kibana/kibana:8.8.2

# 配置文件


# 启动服务
docker container run --name kibana \
    --net elastic \
    -p 5601:5601 \
    -v /etc/kibana/config:/usr/share/kibana/config \
    --restart=always \
    -d \
  docker.elastic.co/kibana/kibana:8.8.2

# 配置文件目录
# /usr/share/kibana/config

# 修改语言为中文(临时,未做持久化)
[root@localhost ~]# docker exec -it kibana sh
sh-4.2$ vi /usr/share/kibana/config/kibana.yml       # 修改配置
i18n.locale: "zh-CN"                                 # 添加这行
[root@localhost ~]# docker container restart kibana  # 重启容器
```



:::

::: details （3）部署 FileBeat

指定版本文档：[https://www.elastic.co/guide/en/beats/filebeat/6.8/running-on-docker.html](https://www.elastic.co/guide/en/beats/filebeat/6.8/running-on-docker.html)

最新版本文档：[https://www.elastic.co/guide/en/beats/filebeat/current/running-on-docker.html](https://www.elastic.co/guide/en/beats/filebeat/current/running-on-docker.html)

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