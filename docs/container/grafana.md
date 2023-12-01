# Grafana

Github：[https://github.com/grafana/grafana](https://github.com/grafana/grafana)

官网：[https://grafana.com/grafana](https://grafana.com/grafana/)

模版：[https://grafana.com/grafana/dashboards](https://grafana.com/grafana/dashboards)

<br />

## 部署服务

### 部署服务

文档：[https://grafana.com/docs/grafana/v10.2/setup-grafana/installation/](https://grafana.com/docs/grafana/v10.2/setup-grafana/installation/)

下载：[https://grafana.com/grafana/download](https://grafana.com/grafana/download)

Grafana有两个版本：Enterprise和OSS

Grafana Enterprise 是推荐的版本。它是免费的，且包含 OSS 版的所有功能

<br />

::: details （1）RPM包部署

文档：[https://grafana.com/docs/grafana/v9.0/setup-grafana/installation/rpm/](https://grafana.com/docs/grafana/v9.0/setup-grafana/installation/rpm/)

```bash
# 所以这里选择下载RPM包，使用本地安装的方式
[root@localhost ~]# wget -c https://dl.grafana.com/enterprise/release/grafana-enterprise-10.2.2-1.x86_64.rpm
[root@localhost ~]# yum -y install grafana-enterprise-10.2.2-1.x86_64.rpm

# 启动服务并设置为开机自启
[root@localhost ~]# systemctl start grafana-server.service && \
                    systemctl enable grafana-server.service && \
                    systemctl status grafana-server.service

# 浏览器访问：http://192.168.111.128:3000/
# 默认账户：admin / admin
```

:::

::: details （2）Dcoker部署

文档：[https://grafana.com/docs/grafana/v10.2/setup-grafana/installation/docker/](https://grafana.com/docs/grafana/v10.2/setup-grafana/installation/docker/)

Docker Hub：[https://hub.docker.com/r/grafana/grafana-enterprise](https://hub.docker.com/r/grafana/grafana-enterprise)

```bash
# 先拷贝一份配置文件到本地
[root@localhost ~]# mkdir /etc/grafana
[root@localhost ~]# docker container run --name=get-grafana-config -d grafana/grafana-enterprise:10.2.2
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
                                     grafana/grafana-enterprise:10.2.2

# 浏览器访问：http://192.168.111.128:3000/
# 默认账户：admin / admin
```

:::

<br />

### 配置示例

文档：[https://grafana.com/docs/grafana/v10.2/setup-grafana/configure-grafana/](https://grafana.com/docs/grafana/v10.2/setup-grafana/configure-grafana/)

::: details （1）添加Prometheus数据源

![image-20231130125331051](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20231130125331051.png)

![image-20231130130351689](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20231130130351689.png)

![image-20231130131156137](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20231130131156137.png)

![image-20231130131425557](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20231130131425557.png)

![image-20231130131532192](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20231130131532192.png)

:::

::: details （2）添加NodeExporter仪表盘

![image-20231130132715761](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20231130132715761.png)

![image-20231130133107806](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20231130133107806.png)

![image-20231130133358090](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20231130133358090.png)

:::

<br />

## 仪表盘设置(Dashboards)

### 设置按钮(settings)

![image-20231130134658648](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20231130134658648.png)

<br />

### 通用设置(General)

::: details （1）基本设置

![image-20231130134955230](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20231130134955230.png)

当设置成可编辑模式（`Editable`）：

![image-20231130135157220](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20231130135157220.png)

当设置成只读模式（`Read-only`）：

![image-20231130135353316](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20231130135353316.png)

![image-20231130135548762](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20231130135548762.png)

:::

::: details （2）时间设置

![image-20231130141251995](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20231130141251995.png)

```ini
# 说明1: 自动刷新时间(Auto refres) 
# 最小可选值为5s, 当想加一个1秒钟的选项时是加不上去的（即使加上去了，Web界面也不会显示）, 此时需要修改配置文件
# [root@localhost ~]# vim /etc/grafana/grafana.ini
;min_refresh_interval = 5s
min_refresh_interval = 1s

# 说明2: Hide time picker
# 用于将仪表盘中的时间线选择器隐藏， 即隐藏 Last 5 minutes那个框
```

:::

::: details （3）面板选项

![image-20231130141835068](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20231130141835068.png)

**Default：每个面板互不影响**

![grafana_panel_default](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//grafana_panel_default.gif)

**Shared crosshair：其他面板有对应时间线**

![grafana_panel_crosshair](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//grafana_panel_crosshair.gif)

**Shared Tooltip：其他面板也会显示对应的数值**

![grafana_panel_tooltip](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//grafana_panel_tooltip.gif)

:::

<br />

### 注释(Annotations)

有一些数据更受事件驱动，不太适合图表 - 例如流程重新启动、配置重新加载或新版本的部署。它们往往发生的频率较低，如果为它们专门绘制图表，则大多数情况下您会看到一条平坦的线。然而，这些事件仍然值得监控并与图表相关联。例如，故障配置的配置重新加载可以解释请求下降。在 Grafana 中实现这一点的一个好方法是使用注释。

参考：[https://www.inovex.de/de/blog/grafana-annotations-prometheus-deep-dive/](https://www.inovex.de/de/blog/grafana-annotations-prometheus-deep-dive/)



::: details （1）手动添加注释

按时间点添加注释：鼠标单击图表即可

按时间段添加注释：按住`Ctrl`选中一段时间即可

![image-20220926192417609](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220926192417609.png)

![image-20220926192550300](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220926192550300.png)

:::

::: details （2）通过API请求添加注释

（1）创建一个服务账户，并生成Token

![image-20231201102912108](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20231201102912108.png)

![image-20231201103215830](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20231201103215830.png)

（2）仪表盘中新建一个注释项目

![image-20231201105332712](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20231201105332712.png)

```bash
# 基础参数解释
# Name			任意字符串
# Data source	选Grafana
# Enabled		是否显示注释的开关, 也可以在仪表盘界面可手动打开或者关闭
# Hidden		是否隐藏仪表盘中【注释打开/关闭的选项】, 注意他和Enabled的区别
# Color			注释的颜色
# Show in		注释显示在哪些面板中

# Query参数(重要)
# Query type	默认就行
# Filter by		选择Tags
# Max limit		注释最大的个数
# Match any		应该是匹配到任意一个Tag就返回, 默认为False
# Tags			这里填写Tag, 可以写多个
```

（3）通过curl发送创建注释的请求

```bash
# 发送请求
curl -XPOST 127.0.0.1:3000/api/annotations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer glsa_dQRBYFDMxpFEKuEAX5EaifnEpkhbfF9s_b3a07689" \
  --data @- << EOF
  {
    "text": "发布新版本\n
      <a href=\"https://github.com/grafana/grafana\">Gitlab (8ba7fb80)</a>\n
      <a href=\"https://www.jenkins.io/\">Jenkins (#32)</a>",
    "tags": [
      "passport",
      "prod",
      "v1.0.5"
    ]
  }
EOF

# 正确返回结果如下所示
{"id":25,"message":"Annotation added"}

# 注意事项：
# (1) Grafana地址和Token替换为自己的
# (2) tags.passport是我们在仪表盘中添加注释时匹配的那个tag，一定要和仪表盘中的一致，不然匹配不到
```

查看效果

![image-20231201105947987](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20231201105947987.png)

:::

<br />

### 变量（Variables）

::: details （1）简介

![image-20231201135915242](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20231201135915242.png)

:::

::: details （2）变量类型：Data Source：数据源类型

当变量类型为 Data Source时，我们必须选择是哪一种的数据源，即数据源的类型，比如是Prometheus还是MySQL，不支持选择多种数据源类型

:::

::: details （3）变量类型：Query：变量值来自数据源查询

![image-20231201145008426](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20231201145008426.png)

![image-20231201145126410](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20231201145126410.png)

```bash
# 参数解释
# Data source			选择数据源是哪个，注意: 
#                       数据源可能是动态的, 所以这里使用 $(datasource) 代指 动态的Prometheus数据源
#                       不同的数据源后面的查询参数也不一样
#
# Query type			查询类型, Label values代表变量的值 等于 Label的值
# Label *				指定是Label名称

# Metric				可选项, 指定使用哪个Metric
# Label filters         可选项, 使用Label过滤出Metric
```

:::

<br />

## 面板设置

::: details 两种类型

![image-20231201162721592](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20231201162721592.png)

:::

::: details 面板类型之：执行查询语句

![image-20231201162532498](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20231201162532498.png)

![image-20231201164202406](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20231201164202406.png)

![image-20231201165515392](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20231201165515392.png)

:::

::: details 面板类型之：数据转换

![image-20231201172848287](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20231201172848287.png)

:::
