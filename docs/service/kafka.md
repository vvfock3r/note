# kafka

官网：[https://kafka.apache.org](https://kafka.apache.org)

<br />

## 基本说明

**1、版本说明**

kafka在2.8版本之前强依赖zookeeper，开始尝试从服务架构中去掉zookeeper，3.0版本不再需要zookeeper，通过KRaft自己管理



**2、术语说明**

| 概念/对象      | 简单说明                     |
| -------------- | ---------------------------- |
| Broker         | Kafka节点                    |
| Topic          | 主题，用来承载消息           |
| Partition      | 分区，用于主题分片存储       |
| Producer       | 生产者，向主题发布消息的应用 |
| Consumer       | 消费者，从主题订阅消息的应用 |
| Consumer Group | 消费者组，由多个消费者组成   |

<br />

## 查看版本

```bash
# 查看版本
# 没有提供能直接查看版本的命令(未来可能会有?), 所以我们查看的是Jar包的版本
# 其中2.12是Scala版本，1.1.1是Kafka版本, Scala是一门编程语言
find ./libs/ -name \*kafka_\* | head -1 | grep -o '\kafka[^\n]*'
kafka_2.12-1.1.1-test-sources.jar
```

<br />

## SCRAM认证

**1、设置环境变量**

```bash
# 这一步是为了方便后面复制粘贴命令, 而不用去修改里面的值

# 设置zookeeper地址
export zk_addr=zk-0.zk-svc:2181/kafka
```

**1、创建三个用户**

```bash
# 查看用户列表, 若要查看单个用户, 添加 --entity-name <username>
kafka-configs.sh \
  --zookeeper ${zk_addr} \
  --describe \
  --entity-type users

# 添加三个用户, --alter 代表执行修改操作, 后面都是修改的细分参数
kafka-configs.sh \
  --zookeeper ${zk_addr} \
  --alter \
  --add-config 'SCRAM-SHA-256=[password=OmSs8JbYJEzkXelk],SCRAM-SHA-512=[password=OmSs8JbYJEzkXelk]' \
  --entity-type users \
  --entity-name admin

kafka-configs.sh \
  --zookeeper ${zk_addr} \
  --alter \
  --add-config 'SCRAM-SHA-256=[password=BPqm09QbJw0J8bj0],SCRAM-SHA-512=[password=BPqm09QbJw0J8bj0]' \
  --entity-type users \
  --entity-name write

kafka-configs.sh \
  --zookeeper ${zk_addr} \
  --alter \
  --add-config 'SCRAM-SHA-256=[password=M7MwPtTeUMSLbA3A],SCRAM-SHA-512=[password=M7MwPtTeUMSLbA3A]' \
  --entity-type users \
  --entity-name read
  
# 删除用户命令
kafka-configs.sh \
  --zookeeper ${zk_addr} \
  --alter \
  --delete-config 'SCRAM-SHA-256,SCRAM-SHA-512' \
  --entity-type users \
  --entity-name admin
  
# 说明
# 1、用户信息存储在zookeeper中
# 2、可以看到 --describe 和 --alter 应该属于同级别的命令
```

**2、对用户授权**

```bash
# 说明
# 1.topic不存在也可以进行授权
# 2.ACLs(访问控制列表)说明
#   控制 不同主体(用户、消费者组、应用程序等) 
#   对于 特定资源(主题、分区等)的访问权限
# 3.消费的基本说明
#   消费者组是一组消费者的集合
#   同一条消息在一个分区内只被一个消费者消费，但在不同分区内可以被不同的消费者消费
#   所以, 当授权消费者时，通常情况下需要添加 --group 参数指定消费者组

# 查看授权
# 1.--authorizer 指定了使用内置 SimpleAclAuthorizer 类, 它是一个简单的 ACL（Access Control List） 授权器,
#                用于控制 Kafka 主题的访问权限, 这是默认值, 也可以不写
# 2.--authorizer-properties 用于传递授权器所需的属性，以配置授权器的行为， 这里指定了 ZooKeeper 的连接地址,
#                因为 Kafka 的 ACL 数据存储在 ZooKeeper 中
kafka-acls.sh \
  --authorizer kafka.security.auth.SimpleAclAuthorizer \
  --authorizer-properties zookeeper.connect=${zk_addr} \
  --list

# 添加授权: 为生产者授权下, 使 write 用户对主题 topic_ops_test 拥有写入权限
kafka-acls.sh \
  --authorizer kafka.security.auth.SimpleAclAuthorizer \
  --authorizer-properties zookeeper.connect=${zk_addr} \
  --add \
  --allow-principal User:write \
  --operation Write \
  --topic topic_ops_test

# 添加授权: 为消费者授权下, 使read用户对主题 topic_ops_test 拥有读取权限， 并且将这个权限与 group_itops_test 消费者组关联
# 特别说明: 如果将group值设置为 * , 则代表所有的消费者组
# 疑问思考: 意思是 用户和消费者组都有 topic_ops_test 的读取权限?
kafka-acls.sh \
  --authorizer kafka.security.auth.SimpleAclAuthorizer \
  --authorizer-properties zookeeper.connect=${zk_addr} \
  --add \
  --allow-principal User:read \
  --operation Read \
  --topic topic_ops_test \
  --group group_ops_test

# 删除授权: 生产者授权, 直接删除即可
kafka-acls.sh \
  --authorizer kafka.security.auth.SimpleAclAuthorizer \
  --authorizer-properties zookeeper.connect=${zk_addr} \
  --remove \
  --allow-principal User:write \
  --operation Write \
  --topic topic_ops_test

# 删除授权: 消费者授权, 需要指定 --group
kafka-acls.sh \
  --authorizer kafka.security.auth.SimpleAclAuthorizer \
  --authorizer-properties zookeeper.connect=${zk_addr} \
  --remove \
  --allow-principal User:read \
  --operation Read \
  --topic topic_ops_test \
  --group group_ops_test
```

**3、创建用户配置文件**

```bash
# admin.conf 
security.protocol=SASL_PLAINTEXT
sasl.mechanism=SCRAM-SHA-256
sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required username="admin" password="OmSs8JbYJEzkXelk";

# write.conf
security.protocol=SASL_PLAINTEXT
sasl.mechanism=SCRAM-SHA-256
sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required username="write" password="BPqm09QbJw0J8bj0";

# read
security.protocol=SASL_PLAINTEXT
sasl.mechanism=SCRAM-SHA-256
sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required username="read" password="M7MwPtTeUMSLbA3A";
```

**4、配置服务端**

```bash
# 1.创建配置文件 kafka_server_auth.conf
vim config/kafka_server_auth.conf

KafkaServer {
  org.apache.kafka.common.security.scram.ScramLoginModule required
  username="admin"
  password="OmSs8JbYJEzkXelk";
};

# 2.修改kafka启动脚本 kafka-server-start.sh, 根据实际情况设置 $kafka_home
# 或者也可以在kafka‐run‐class.sh中更改以下配置(未验证)
# $EXTRA_ARGS ‐Djava.security.auth.login.config=/data/zjk/t/kafka_2.12‐2.1.0/config/kafka_server_auth.conf
vim bin/kafka-server-start.sh
export KAFKA_OPTS="-Djava.security.auth.login.config=$kafka_home/config/kafka_server_auth.conf"

# 3.配置server.properties
vim config/server.properties

# 认证配置
listeners=SASL_PLAINTEXT://:9092
security.inter.broker.protocol=SASL_PLAINTEXT
sasl.mechanism.inter.broker.protocol=SCRAM-SHA-256
sasl.enabled.mechanisms=SCRAM-SHA-256

# ACL配置
allow.everyone.if.no.acl.found=false
super.users=User:admin
authorizer.class.name=kafka.security.auth.SimpleAclAuthorizer

# 4.重新启动kafka
```

**5、测试**

```bash
# 启动生产者, 若topic不存在则必须要创建, 否则会报错
kafka-console-producer.sh \
  --broker-list localhost:9092 \
  --topic topic_ops_test \
  --producer.config write.conf
  
>123 # 这里随便写点数据, 不报错代表成功

# 启动消费者
kafka-console-consumer.sh \
  --bootstrap-server localhost:9092 \
  --topic topic_ops_test \
  --group group_ops_test \
  --consumer.config read.conf
```

<br />

## Topic操作

```bash
# 查看topic
# /kafka是ZooKeeper的命名空间（namespace），用于指定Kafka在ZooKeeper中的路径
kafka-topics.sh \
  --zookeeper zk-0.zk-svc:2181/kafka \
  --list

# 创建topic
# topic分区数为3
# topic副本因子为2，意味着每个分区将会有2个副本
# 消息在被删除之前的最小保留时间为800毫秒
# topic名称为 topic_ops_test
kafka-topics.sh \
  --zookeeper zk-0.zk-svc:2181/kafka \
  --create \
  --partitions 3 \
  --replication-factor 2 \
  --config retention.ms=800 \
  --topic topic_ops_test
  
# 删除topic
kafka-topics.sh \
  --zookeeper zk-0.zk-svc:2181/kafka \
  --delete \
  --topic topic_ops_test
```

