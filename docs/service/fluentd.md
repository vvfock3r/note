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

# 启动Fluentd,
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