# Harbor

## 简介

Harbor 是由 VMware 公司中国团队为企业用户设计的 Registry server 开源项目，包括了权限管理 (RBAC)、LDAP、审计、管理界面、自我注册、HA 等企业必需的功能，同时针对中国用户的特点，设计镜像复制和中文支持等功能。

官方网站：[https://goharbor.io/](https://goharbor.io/)

Github：[https://github.com/goharbor/harbor](https://github.com/goharbor/harbor)



## 安装说明

**安装要求**

Harbor安装对于硬件（内存/CPU大小等）、软件（依赖的软件最低版本等）、开放端口均有一定要求，详细信息参考文档：[https://goharbor.io/docs/2.5.0/install-config/installation-prereqs/](https://goharbor.io/docs/2.5.0/install-config/installation-prereqs/)



**离线/在线安装方式**

Harbor支持在线安装和离线安装（区别是镜像是如何下载的）





## Docker Compose方式安装

### 配置清单

| 资源             | 版本                                   |
| ---------------- | -------------------------------------- |
| 操作系统         | `CentOS Linux release 7.9.2009 (Core)` |
| 内存             | `8G`                                   |
| CPU              | `4 CPU`                                |
| DISK             | `50G`                                  |
| `Docker Engine`  | `20.10.15`                             |
| `Docker Compose` | `2.5.0`                                |
| `Harbor`         | `2.5.1`                                |

> 依据配置清单设置好对应的资源

### 安装Harbor

### （1）下载离线安装包并校验

文档：[https://goharbor.io/docs/2.5.0/install-config/download-installer/](https://goharbor.io/docs/2.5.0/install-config/download-installer/)

::: details 点击查看详情

```bash
# 下载Harbor v2.5.1 离线安装包
[root@localhost ~]# wget -c https://github.com/goharbor/harbor/releases/download/v2.5.1/harbor-offline-installer-v2.5.1.tgz

# 校验安装包（可选）
# (1) 下载签名文件(.asc文件)
[root@localhost ~]# wget -c https://github.com/goharbor/harbor/releases/download/v2.5.1/harbor-offline-installer-v2.5.1.tgz.asc
# (2) 从一个keyserver中导入key，若提示没有--receive-keys选项，则修改为--recv-keys
[root@localhost ~]# gpg --keyserver hkps://keyserver.ubuntu.com --receive-keys 644FF454C0B4115C
# (3) 根据签名文件校验安装包
# 出现"Harbor-sign (The key for signing Harbor build) <jiangd@vmware.com>"则代表校验成功
[root@localhost ~]# gpg -v --keyserver hkps://keyserver.ubuntu.com --verify harbor-offline-installer-v2.5.1.tgz.asc

# 解压包
[root@localhost ~]# tar zxf harbor-offline-installer-v2.5.1.tgz
[root@localhost ~]# cd harbor
```

:::

### （2）生成并修改配置文件

文档：[https://goharbor.io/docs/2.5.0/install-config/configure-yml-file/](https://goharbor.io/docs/2.5.0/install-config/configure-yml-file/)

::: details 点击查看详情

```bash
# 生成配置文件
[root@localhost harbor]# cp harbor.yml.tmpl harbor.yml
[root@localhost harbor]# grep -Ev '^$|^#|^[[:blank:]]+#' harbor.yml 
hostname: reg.mydomain.com
http:
  port: 80
https:
  port: 443
  certificate: /your/certificate/path
  private_key: /your/private/key/path
harbor_admin_password: Harbor12345
database:
  password: root123
  max_idle_conns: 100
  max_open_conns: 900
data_volume: /data
trivy:
  ignore_unfixed: false
  skip_update: false
  offline_scan: false
  insecure: false
jobservice:
  max_job_workers: 10
notification:
  webhook_job_max_retry: 10
chart:
  absolute_url: disabled
log:
  level: info
  local:
    rotate_count: 50
    rotate_size: 200M
    location: /var/log/harbor
_version: 2.5.0
proxy:
  http_proxy:
  https_proxy:
  no_proxy:
  components:
    - core
    - jobservice
    - trivy
upload_purging:
  enabled: true
  age: 168h
  interval: 24h
  dryrun: false
  
# 修改配置文件
[root@localhost harbor]# vim harbor.yml
# (1) 修改域名
# The IP address or hostname to access admin UI and registry service.
# DO NOT use localhost or 127.0.0.1, because Harbor needs to be accessed by external clients.
hostname: harbor.jinhui.dev

# (2) 关闭HTTPS(后面再单独开启)
#https:
  # https port for harbor, default is 443
#  port: 443
  # The path of cert and key files for nginx
#  certificate: /your/certificate/path
#  private_key: /your/private/key/path

# (3) 修改Harbor Web登录密码(默认为Harbor12345)
# The initial password of Harbor admin
# It only works in first time to install harbor
# Remember Change the admin password from UI after launching Harbor.
harbor_admin_password: y6yGXAX0Dq02VN6I

# (4) 修改数据库密码（默认为root123）
# Harbor DB configuration
database:
  # The password for the root user of Harbor DB. Change this before any production use.
  password: aVjB1MFKq3GpplUZ
```

:::

### （3）执行prepare

### （4）执行install.sh

install.sh内部会调用`docker-compose`而不是`docker compose`，解决办法参考

