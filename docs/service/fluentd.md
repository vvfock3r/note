# Fluentd

官网：[https://www.fluentd.org](https://www.fluentd.org)

Github：[https://github.com/fluent/fluentd](https://github.com/fluent/fluentd)

<br />

## 部署

文档：

* [https://docs.fluentd.org/installation](https://docs.fluentd.org/installation)

* [https://docs.fluentd.org/container-deployment](https://docs.fluentd.org/container-deployment)
* [https://hub.docker.com/r/fluent/fluentd/](https://hub.docker.com/r/fluent/fluentd/)

::: details Docker部署

```bash
# 先启动一个临时容器用于获取配置文件
[root@node-1 ~]# mkdir -p /data/fluentd/{etc,log,plugins}
[root@node-1 ~]# docker container run --name get-fluentd-config -d fluent/fluentd:v1.16.1-1.0
[root@node-1 ~]# docker container cp get-fluentd-config:/fluentd/etc/fluent.conf /data/fluentd/etc
[root@node-1 ~]# docker container rm -f get-fluentd-config

# 启动Fluentd, 是否需要修改时区？
[root@node-1 ~]# chmod -R 777 /data/fluentd/log
[root@node-1 ~]# docker container run --name fluentd \
  -p 24224:24224 \
  -p 24224:24224/udp \
  -v /data/fluentd/etc:/fluentd/etc \
  -v /data/fluentd/log:/fluentd/log \
  -v /data/fluentd/plugins:/fluentd/plugins \
  -d \
  --cpus=1 \
  --memory=2g \
  --restart=always \
fluent/fluentd:v1.16.1-1.0
```

:::

<br />

## 配置

### 基础语法

::: details （1）Docker镜像默认带的配置文件说明

```bash
# <source>模块指定数据从哪里来
#
# @type  指定类型, forward 是一种输入插件（input plugin）类型, 用于接收通过 Forward 协议发送的日志事件
#        Forward 协议是 Fluentd 提供的一种简单、高效的网络通信协议，用于在 Fluentd 实例之间进行日志数据的转发和分发
#        Forward 协议基于 TCP/IP，使用二进制消息格式进行通信。它通过建立长连接，支持可靠的消息传递，并具有较低的网络传输开销
#        使用Forward协议的工具或服务: fluent-cat、fluent-bit、第三方开发的工具和库
#
# @id    指定一个唯一的标识符, 值可以为任意字符串
#        每个组件都可以使用 @id 来命名自己
#        同样可以使用 @id 来引用其他组件, 这样可以将不同组件连接在一起，建立组件之间的关联关系
#
# @label 创建一个标签, 值必须以@开头
#
# port   指定 Fluentd 输入源监听的端口号, TCP和UDP都会监听
#
# 总结   定义了一个使用 forward 协议的输入源，监听端口 24224，用于接收来自其他 Fluentd 实例或 Fluentd 客户端的日志事件
<source>
  @type  forward
  @id    input1
  @label @mainstream
  port  24224
</source>

# <filter>模块用于对日志事件进行过滤和处理操作, ** 是一个通配符，用于匹配所有的标签
# @type stdout 表示将日志事件打印到标准输出
<filter **>
  @type stdout
</filter>

# label 定义一个叫做mainstream的标签
<label @mainstream>
  <match docker.**>
    @type file
    @id output_docker1
    path /fluentd/log/docker.*.log
    symlink_path /fluentd/log/docker.log
    append true
    time_slice_format %Y%m%d
    time_slice_wait 1m
    time_format %Y%m%dT%H%M%S%z
  </match>
  <match myapp.logs>
    @type stdout
  </match>
  <match **>
    @type file
    @id output1
    path /fluentd/log/data.*.log
    symlink_path /fluentd/log/data.log
    append true
    time_slice_format %Y%m%d
    time_slice_wait 10m
    time_format %Y%m%dT%H%M%S%z
  </match>
</label>
```

:::

::: details （1）数据源

```bash
# 编辑配置文件
[root@node-1 ~]# vim /data/fluentd/etc/fluent.conf
<source>
  @type  forward
  @id    input1
  port  24224
</source>

<filter **>
  @type stdout
</filter>

# 重启服务
[root@node-1 ~]# docker container restart fluentd

# 发送测试数据, 默认要求为JSON格式
[root@node-1 ~]# docker exec -it fluentd sh
/ $ echo '{"message": "这是一条测试日志"}' | fluent-cat myapp.logs -p 24224 -h 127.0.0.1

# 查看日志, fluentd接收到了消息, 但是报了一条提醒
2023-06-27 23:48:19.289976446 +0000 myapp.logs: {"message":"这是一条测试日志"}
2023-06-27 23:48:19 +0000 [warn]: #0 no patterns matched tag="myapp.logs"
2023-06-27 23:48:19.290809925 +0000 fluent.warn: {"tag":"myapp.logs","message":"no patterns matched tag=\"myapp.logs\""}
```

:::
