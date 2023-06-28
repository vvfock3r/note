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

# 启动Fluentd, 注意时区的设置
# 最后两行是为了我们方便测试所添加的
[root@node-1 ~]# chmod -R 777 /data/fluentd/log
[root@node-1 ~]# docker container run --name fluentd \
  -p 24224:24224 \
  -p 24224:24224/udp \
  -v /data/fluentd/etc:/fluentd/etc \
  -v /data/fluentd/log:/fluentd/log \
  -v /data/fluentd/plugins:/fluentd/plugins \
  -v /etc/timezone:/etc/timezone:ro \
  -v /etc/localtime:/etc/localtime:ro \
  --cpus=1 \
  --memory=2g \
  --restart=always \
  -d \
  -v "/:/host" \
  --user 0 \
fluent/fluentd:v1.16.1-1.0
```

:::

<br />

## 配置

### 基础语法

::: details Docker镜像默认带的配置文件说明

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
# @label 指定一个标签, 值必须以@开头, 若指定则标签必须存在否则会报错
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

# <filter> 用于对日志进行处理, 包含过滤和转换等操作, ** 是一个通配符，用于匹配所有的标签
# @type stdout 表示将日志事件打印到标准输出
<filter **>
  @type stdout
</filter>

# <label>           定义一个叫做mainstream的标签
# <match>           用于路由处理, 也就是日志发送到哪个地方
#  @type file       将日志输出到文件中
#  @id              定义一个唯一标识符
#  path             指定了输出文件的路径
#  symlink_path     指定一个符号链接,指向最新生成的日志文件
# append true       以追加模式写入文件
# time_slice_format 定义时间片的命名格式
# time_slice_wait   定义时间片的滚动时间
# time_format       定义时间戳的格式
#
# 总结
# 1.将匹配的日志数据输出到指定的文件中
# 2.文件名根据时间和来源进行命名
# 3.它使用时间片滚动机制，即按照一定的时间间隔生成新的日志文件，以便管理和归档日志数据
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

::: details 一个最简单的示例

```bash
# 编辑配置文件
[root@node-1 ~]# vim /data/fluentd/etc/fluent.conf
<source>
  @type  forward
  port  24224
</source>

<match myapp.logs>
  @type stdout
</match>
  
# 重启服务
[root@node-1 ~]# docker container restart fluentd

# 发送测试数据
# 1、fluent-cat的第一个参数是tag, 其实就对应fluentd中的label
# 2、默认要求为JSON格式的日志, 如果是非JSON格式日志, 可以使用 -f none 或 --none 来指定格式
#   fluentd同样会收到一条JSON数据, 会自动追加key为message, 暂不清楚这是由fluent-cat还是fluentd来隐式操作的
# 3、-p 24224 -h 127.0.0.1 这是默认值, 也可以不写

[root@node-1 ~]# docker exec -it fluentd sh
/ $ echo '{"message": "这是一条测试日志"}' | fluent-cat myapp.logs -p 24224 -h 127.0.0.1

# 查看日志, fluentd接收到了消息
2023-06-28 14:22:25.745107356 +0000 myapp.logs: {"message":"这是一条测试日志"}
```

:::

<br />

### 输入插件

文档：[https://docs.fluentd.org/input](https://docs.fluentd.org/input)

::: details （1）forward：通过监听TCP和UDP端口来接收数据

示例以后再补充

:::

::: details （2）tail：从文本文件的尾部读取日志

```bash
# 以Nginx日志的默认格式举例
[root@node-1 ~]# nginx -v
nginx version: nginx/1.24.0

# 配置
# @type tail 从文本文件的尾部读取日志
# path       指定读取哪个文件
# pos_file   指定记录文件读取位置的文件
# tag        打个标签
# parse      解析器, 定义Nginx日志的格式
[root@node-1 ~]# vim /data/fluentd/etc/fluent.conf
<source>
  @type tail
  path /host/var/log/nginx/access.log
  pos_file /host/var/log/nginx-access.log.pos
  tag nginx.access
  <parse>
    @type nginx
  </parse>
</source>

<match **>
  @type stdout
</match>

# 当我们访问Nginx后, fluentd会抓取到Nginx日志
2023-06-28 23:32:18.000000000 +0800 nginx.access: {"remote":"127.0.0.1","host":"-","user":"-","method":"GET","path":"/","code":"200","size":"615","referer":"-","agent":"curl/7.29.0","http_x_forwarded_for":"-"}
```

:::

::: details （3）http：从HTTP请求中读取日志

```bash

```

:::
