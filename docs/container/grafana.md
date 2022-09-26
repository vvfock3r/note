# Grafana

Github：[https://github.com/grafana/grafana](https://github.com/grafana/grafana)

官网：[https://grafana.com/grafana/](https://grafana.com/grafana/)

<br />

## 安装

文档：[https://grafana.com/docs/grafana/v9.0/setup-grafana/installation/](https://grafana.com/docs/grafana/v9.0/setup-grafana/installation/)

下载：[https://grafana.com/grafana/download](https://grafana.com/grafana/download)

Grafana有两个版本：Enterprise和OSS

Grafana Enterprise 是推荐的默认版本。它是免费的，且包含 OSS 版的所有功能



**部署方式1：RPM包**

文档：[https://grafana.com/docs/grafana/v9.0/setup-grafana/installation/rpm/](https://grafana.com/docs/grafana/v9.0/setup-grafana/installation/rpm/)

::: details 点击查看详情

```bash
# 若使用Yun仓库方式只能安装最新版本
# 所以这里选择下载RPM包，使用本地安装的方式
[root@localhost ~]# wget -c https://dl.grafana.com/enterprise/release/grafana-enterprise-9.1.6-1.x86_64.rpm
[root@localhost ~]# yum install grafana-enterprise-9.1.6-1.x86_64.rpm

# 启动服务并设置为开机自启
[root@localhost ~]# systemctl start grafana-server.service && \
                    systemctl enable grafana-server.service && \
                    systemctl status grafana-server.service

# 浏览器访问：http://192.168.48.152:3000/
# 默认账户：admin / admin
```

:::

<br />

**部署方式2：Dcoker部署**

文档：[https://grafana.com/docs/grafana/v9.0/setup-grafana/installation/docker/](https://grafana.com/docs/grafana/v9.0/setup-grafana/installation/docker/)

Docker Hub：[https://hub.docker.com/r/grafana/grafana-enterprise](https://hub.docker.com/r/grafana/grafana-enterprise)

::: details 点击查看详情

```bash
# 先拷贝一份配置文件到本地
[root@localhost ~]# mkdir /etc/grafana
[root@localhost ~]# docker container run --name=get-grafana-config -d grafana/grafana-enterprise:9.1.6
[root@localhost ~]# docker container cp get-grafana-config:/etc/grafana/grafana.ini /etc/grafana
[root@localhost ~]# docker container rm -f get-grafana-config

# 启动容器
[root@localhost ~]# docker container run --name=grafana \
                                         -p 3000:3000 \
                                         -v /var/lib/grafana:/var/lib/grafana \
                                         -v /etc/grafana/:/etc/grafana/ \
                                         --user $(id -u) \
                                         --restart=always \
                                         -d \
                                     grafana/grafana-enterprise:9.1.6

# 浏览器访问：http://192.168.48.152:3000/
# 默认账户：admin / admin
```

:::

<br />

## 配置

文档：[https://grafana.com/docs/grafana/v9.0/setup-grafana/configure-grafana/](https://grafana.com/docs/grafana/v9.0/setup-grafana/configure-grafana/)

<br />

## 基础使用

