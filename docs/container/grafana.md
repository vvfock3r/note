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

## 示例

::: details （1）添加Prometheus数据源

![image-20220926152706930](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220926152706930.png)

![image-20220926152808857](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220926152808857.png)

![image-20220926152933015](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220926152933015.png)

![image-20220926153314413](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220926153314413.png)

:::

::: details （2）添加NodeExporter仪表盘

![image-20220926153529584](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220926153529584.png)

![image-20220926153855241](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220926153855241.png)

这里我们输入`https://grafana.com/grafana/dashboards/13978` 或 `13978`

成功导入后我们就可以看到数据了

![image-20220926154051454](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220926154051454.png)

:::

<br />

## 仪表盘(Dashboards)

### 设置(Settings)

#### 通用设置(General)

::: details （1）Editable：是否可编辑

默认情况下是可编辑（`Editable`），如下图所示

![image-20220926172925207](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220926172925207.png)

当设置成`Read-only`后：

![image-20220926173228391](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220926173228391.png)

同时点击设置按钮后，会提示仪表盘不可编辑（还可以改回可编辑模式）

![image-20220926173326423](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220926173326423.png)

:::

::: details （2）修改自动刷新间隔时间

`Auto refresh`默认为`5s,10s,30s,1m,5m,15m,30m,1h,2h,1d`，自动刷新时间最小的为5秒钟，

当想加一个1秒钟的选项时是加不上去的（即使加上去了，Web界面也不会显示）

这时候需要修改Grafana的配置文件

```ini
;min_refresh_interval = 5s
min_refresh_interval = 1s
```

然后就可以选择1秒选项了

![image-20220926174546300](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220926174546300.png)

:::

::: details （3）隐藏时间选择器

将`Hide time picker`打开即可，对比下图即可发现区别

![image-20220926174718775](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220926174718775.png)

![image-20220926174752712](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220926174752712.png)

:::

::: details （4）Refresh live dashboards：这个不知道有啥用，略过

:::

::: details （5）面板选项

**Default**

![grafana_panel_default](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//grafana_panel_default.gif)

**Shared crosshair**

![grafana_panel_crosshair](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//grafana_panel_crosshair.gif)

**Shared Tooltip**

![grafana_panel_tooltip](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//grafana_panel_tooltip.gif)

:::

