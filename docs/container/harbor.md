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





## 安装方式1：Docker Compose

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
[root@localhost ~]# tar zxf harbor-offline-installer-v2.5.1.tgz -C /usr/local/
[root@localhost ~]# cd /usr/local/harbor

# 查看文件
[root@localhost harbor]# ls -lh
total 634M
-rw-r--r-- 1 root root 3.3K May 26 23:59 common.sh
-rw-r--r-- 1 root root 634M May 27 00:00 harbor.v2.5.1.tar.gz		
-rw-r--r-- 1 root root 9.7K May 26 23:59 harbor.yml.tmpl			# harbor配置文件模板
-rwxr-xr-x 1 root root 2.5K May 26 23:59 install.sh					# 安装脚本
-rw-r--r-- 1 root root  12K May 26 23:59 LICENSE
-rwxr-xr-x 1 root root 1.9K May 26 23:59 prepare
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

# （5）容器持久化目录（根据实际情况修改，这里先不修改）
# The default data volume
data_volume: /data  
```

:::

### （3）执行prepare

prepare脚本会拉取镜像`goharbor/prepare:v2.5.1`，启动容器并生成了一堆配置文件和`docker-compose.yml`

这里有一个疑问，不是说离线安装吗，居然还回去联网拉镜像，暂时还不清楚这是为啥。

::: details 点击查看详情

```bash
[root@localhost harbor]# ./prepare 
prepare base dir is set to /root/harbor
Unable to find image 'goharbor/prepare:v2.5.1' locally
v2.5.1: Pulling from goharbor/prepare
952860b5285f: Pull complete 
4f55d5ae1041: Pull complete 
539e18e49354: Pull complete 
49a99f7544c6: Pull complete 
07ed56a93a62: Pull complete 
8ca02ad11394: Pull complete 
22a348d870a9: Pull complete 
6d401e61adb4: Pull complete 
Digest: sha256:f7f2f12ec694d17ab892dfd85869eaeb629ca660948dded6296af7621ffcbd42
Status: Downloaded newer image for goharbor/prepare:v2.5.1
WARNING:root:WARNING: HTTP protocol is insecure. Harbor will deprecate http protocol in the future. Please make sure to upgrade to https
Generated configuration file: /config/portal/nginx.conf
Generated configuration file: /config/log/logrotate.conf
Generated configuration file: /config/log/rsyslog_docker.conf
Generated configuration file: /config/nginx/nginx.conf
Generated configuration file: /config/core/env
Generated configuration file: /config/core/app.conf
Generated configuration file: /config/registry/config.yml
Generated configuration file: /config/registryctl/env
Generated configuration file: /config/registryctl/config.yml
Generated configuration file: /config/db/env
Generated configuration file: /config/jobservice/env
Generated configuration file: /config/jobservice/config.yml
loaded secret from file: /data/secret/keys/secretkey
Generated configuration file: /compose_location/docker-compose.yml
Clean up the input dir

[root@localhost harbor]# ls -l
total 648976
drwxr-xr-x 3 root root        20 Jun 10 14:26 common				# 新生成的，用于存放配置文件
-rw-r--r-- 1 root root      3361 May 26 23:59 common.sh
-rw-r--r-- 1 root root      5834 Jun 10 14:26 docker-compose.yml	# 新生成的
-rw-r--r-- 1 root root 664492716 May 27 00:00 harbor.v2.5.1.tar.gz
-rw-r--r-- 1 root root      9936 Jun 10 14:26 harbor.yml
-rw-r--r-- 1 root root      9917 May 26 23:59 harbor.yml.tmpl
-rwxr-xr-x 1 root root      2500 May 26 23:59 install.sh
-rw-r--r-- 1 root root     11347 May 26 23:59 LICENSE
-rwxr-xr-x 1 root root      1881 May 26 23:59 prepare
```

:::

### （4）执行install.sh

文档：[https://goharbor.io/docs/2.5.0/install-config/run-installer-script/](https://goharbor.io/docs/2.5.0/install-config/run-installer-script/)

> install.sh内部会调用`docker-compose`而不是`docker compose`，如果有报错请参考 [https://jinhui.dev/container/docker-compose.html#软链接到全局](https://jinhui.dev/container/docker-compose.html#软链接到全局)

::: details 点击查看详情

```bash
[root@localhost harbor]# ./install.sh 

[Step 0]: checking if docker is installed ...

Note: docker version: 20.10.15

[Step 1]: checking docker-compose is installed ...

Note: docker-compose version: 2.5.0

[Step 2]: loading Harbor images ...
ec4474eb929a: Loading layer [==================================================>]  126.3MB/126.3MB
76a16ac76196: Loading layer [==================================================>]  3.584kB/3.584kB
c9a227aab4d3: Loading layer [==================================================>]  3.072kB/3.072kB
fed2fe52a194: Loading layer [==================================================>]   2.56kB/2.56kB
f2e03a3cec12: Loading layer [==================================================>]  3.072kB/3.072kB
8dcae4944d97: Loading layer [==================================================>]  3.584kB/3.584kB
f65f790b33e6: Loading layer [==================================================>]  20.99kB/20.99kB
Loaded image: goharbor/harbor-log:v2.5.1
04a4fa4755bc: Loading layer [==================================================>]  8.682MB/8.682MB
93df81c08563: Loading layer [==================================================>]  3.584kB/3.584kB
6746249771e3: Loading layer [==================================================>]   2.56kB/2.56kB
39713d62ba42: Loading layer [==================================================>]  90.78MB/90.78MB
2c6097e3483e: Loading layer [==================================================>]  91.57MB/91.57MB
Loaded image: goharbor/harbor-jobservice:v2.5.1
28faf190784e: Loading layer [==================================================>]  119.1MB/119.1MB
4bf648d216c7: Loading layer [==================================================>]  3.072kB/3.072kB
8328b2227bc7: Loading layer [==================================================>]   59.9kB/59.9kB
b2c84581a687: Loading layer [==================================================>]  61.95kB/61.95kB
Loaded image: goharbor/redis-photon:v2.5.1
fcd508c17344: Loading layer [==================================================>]  5.535MB/5.535MB
071bc493297d: Loading layer [==================================================>]  90.86MB/90.86MB
7d6557033913: Loading layer [==================================================>]  3.072kB/3.072kB
363d9d8e3c89: Loading layer [==================================================>]  4.096kB/4.096kB
2491c9fa16fc: Loading layer [==================================================>]  91.65MB/91.65MB
Loaded image: goharbor/chartmuseum-photon:v2.5.1
Loaded image: goharbor/prepare:v2.5.1
92e9424f3797: Loading layer [==================================================>]  8.682MB/8.682MB
b1655572ade9: Loading layer [==================================================>]  3.584kB/3.584kB
de9547e737b9: Loading layer [==================================================>]   2.56kB/2.56kB
9a4ed152c42e: Loading layer [==================================================>]  78.72MB/78.72MB
0217eee5e2af: Loading layer [==================================================>]  5.632kB/5.632kB
4d557d233f65: Loading layer [==================================================>]  99.84kB/99.84kB
05bb453495b9: Loading layer [==================================================>]  15.87kB/15.87kB
3afd9c3c47dd: Loading layer [==================================================>]  79.63MB/79.63MB
1ec26a76ac56: Loading layer [==================================================>]   2.56kB/2.56kB
Loaded image: goharbor/harbor-core:v2.5.1
0e39ba51999a: Loading layer [==================================================>]  5.531MB/5.531MB
435625ca67ad: Loading layer [==================================================>]  8.543MB/8.543MB
a9c8eef7ea6e: Loading layer [==================================================>]  15.88MB/15.88MB
e38648deeb1c: Loading layer [==================================================>]  29.29MB/29.29MB
f3d1dca68eb7: Loading layer [==================================================>]  22.02kB/22.02kB
fe36d72e7580: Loading layer [==================================================>]  15.88MB/15.88MB
Loaded image: goharbor/notary-server-photon:v2.5.1
350aa4470b2f: Loading layer [==================================================>]  7.449MB/7.449MB
Loaded image: goharbor/nginx-photon:v2.5.1
e2371f04b17f: Loading layer [==================================================>]  5.536MB/5.536MB
83f525652b46: Loading layer [==================================================>]  4.096kB/4.096kB
442e7fdfcbd3: Loading layer [==================================================>]  3.072kB/3.072kB
4a3bede6780d: Loading layer [==================================================>]  17.34MB/17.34MB
77c5aed80a3c: Loading layer [==================================================>]  18.13MB/18.13MB
Loaded image: goharbor/registry-photon:v2.5.1
e0447020da6f: Loading layer [==================================================>]  1.097MB/1.097MB
ae9e1371d564: Loading layer [==================================================>]  5.889MB/5.889MB
efbccdfa4022: Loading layer [==================================================>]  168.2MB/168.2MB
fecd4ce6ff1f: Loading layer [==================================================>]  16.52MB/16.52MB
e37fd2d49a62: Loading layer [==================================================>]  4.096kB/4.096kB
45ad00c4b89f: Loading layer [==================================================>]  6.144kB/6.144kB
e11809276aac: Loading layer [==================================================>]  3.072kB/3.072kB
627dceaf1a71: Loading layer [==================================================>]  2.048kB/2.048kB
72eb4d7dc7c9: Loading layer [==================================================>]   2.56kB/2.56kB
9108824fb7d5: Loading layer [==================================================>]   2.56kB/2.56kB
8529abcd8574: Loading layer [==================================================>]   2.56kB/2.56kB
2ee460d3eeea: Loading layer [==================================================>]  8.704kB/8.704kB
Loaded image: goharbor/harbor-db:v2.5.1
abec2ee0ba30: Loading layer [==================================================>]  5.536MB/5.536MB
5d044d4aa39f: Loading layer [==================================================>]  4.096kB/4.096kB
fd7cb12cb81e: Loading layer [==================================================>]  17.34MB/17.34MB
481df09d669e: Loading layer [==================================================>]  3.072kB/3.072kB
95f5e25d73c1: Loading layer [==================================================>]  29.16MB/29.16MB
8e57207b1fb7: Loading layer [==================================================>]  47.29MB/47.29MB
Loaded image: goharbor/harbor-registryctl:v2.5.1
35d3f63a45bf: Loading layer [==================================================>]  5.531MB/5.531MB
7d948f67c6f4: Loading layer [==================================================>]  8.543MB/8.543MB
0a28b06c1cef: Loading layer [==================================================>]  14.47MB/14.47MB
6c78054008db: Loading layer [==================================================>]  29.29MB/29.29MB
8fb4eaef7a24: Loading layer [==================================================>]  22.02kB/22.02kB
e3f995aaa1a6: Loading layer [==================================================>]  14.47MB/14.47MB
Loaded image: goharbor/notary-signer-photon:v2.5.1
87089e743ac5: Loading layer [==================================================>]  6.063MB/6.063MB
36c316be5ec8: Loading layer [==================================================>]  4.096kB/4.096kB
ce490e4c64fc: Loading layer [==================================================>]  3.072kB/3.072kB
07cf9a97147f: Loading layer [==================================================>]  47.75MB/47.75MB
e64f08012108: Loading layer [==================================================>]  12.62MB/12.62MB
e0e70a0ecd53: Loading layer [==================================================>]  61.15MB/61.15MB
Loaded image: goharbor/trivy-adapter-photon:v2.5.1
adb7aaa5bd89: Loading layer [==================================================>]  7.449MB/7.449MB
8fcf272e40b2: Loading layer [==================================================>]  7.362MB/7.362MB
5264dfd1b912: Loading layer [==================================================>]      1MB/1MB
Loaded image: goharbor/harbor-portal:v2.5.1
80506c5946f1: Loading layer [==================================================>]  8.682MB/8.682MB
726e23d5e1c3: Loading layer [==================================================>]  21.03MB/21.03MB
0f1a09a26afb: Loading layer [==================================================>]  4.608kB/4.608kB
37e3398b412c: Loading layer [==================================================>]  21.83MB/21.83MB
Loaded image: goharbor/harbor-exporter:v2.5.1


[Step 3]: preparing environment ...

[Step 4]: preparing harbor configs ...
prepare base dir is set to /root/harbor
WARNING:root:WARNING: HTTP protocol is insecure. Harbor will deprecate http protocol in the future. Please make sure to upgrade to https
Clearing the configuration file: /config/portal/nginx.conf
Clearing the configuration file: /config/log/logrotate.conf
Clearing the configuration file: /config/log/rsyslog_docker.conf
Clearing the configuration file: /config/nginx/nginx.conf
Clearing the configuration file: /config/core/env
Clearing the configuration file: /config/core/app.conf
Clearing the configuration file: /config/registry/passwd
Clearing the configuration file: /config/registry/config.yml
Clearing the configuration file: /config/registryctl/env
Clearing the configuration file: /config/registryctl/config.yml
Clearing the configuration file: /config/db/env
Clearing the configuration file: /config/jobservice/env
Clearing the configuration file: /config/jobservice/config.yml
Generated configuration file: /config/portal/nginx.conf
Generated configuration file: /config/log/logrotate.conf
Generated configuration file: /config/log/rsyslog_docker.conf
Generated configuration file: /config/nginx/nginx.conf
Generated configuration file: /config/core/env
Generated configuration file: /config/core/app.conf
Generated configuration file: /config/registry/config.yml
Generated configuration file: /config/registryctl/env
Generated configuration file: /config/registryctl/config.yml
Generated configuration file: /config/db/env
Generated configuration file: /config/jobservice/env
Generated configuration file: /config/jobservice/config.yml
loaded secret from file: /data/secret/keys/secretkey
Generated configuration file: /compose_location/docker-compose.yml
Clean up the input dir

[Step 5]: starting Harbor ...
[+] Running 10/10
 ⠿ Network harbor_harbor        Created					0.1s                                                                     
 ⠿ Container harbor-log         Started					0.5s                                                                     
 ⠿ Container registryctl        Started					1.2s                                                                     
 ⠿ Container registry           Started					1.2s                                                                     
 ⠿ Container redis              Started					1.3s                                                                     
 ⠿ Container harbor-db          Started					1.3s                                                                     
 ⠿ Container harbor-portal      Started					1.2s                                                                     
 ⠿ Container harbor-core        Started					1.6s                                                                     
 ⠿ Container nginx              Started					2.0s                                                                     
 ⠿ Container harbor-jobservice  Started					2.0s                                                                     
✔ ----Harbor has been installed and started successfully.----
```

:::

::: details 看一下容器、网桥、存储等情况

```bash
# 查看容器列表
[root@localhost harbor]# docker compose ps
NAME                COMMAND                  SERVICE             STATUS              PORTS
harbor-core         "/harbor/entrypoint.…"   core                running (healthy)   
harbor-db           "/docker-entrypoint.…"   postgresql          running (healthy)   
harbor-jobservice   "/harbor/entrypoint.…"   jobservice          running (healthy)   
harbor-log          "/bin/sh -c /usr/loc…"   log                 running (healthy)   127.0.0.1:1514->10514/tcp
harbor-portal       "nginx -g 'daemon of…"   portal              running (healthy)   
nginx               "nginx -g 'daemon of…"   proxy               running (healthy)   0.0.0.0:80->8080/tcp, :::80->8080/tcp
redis               "redis-server /etc/r…"   redis               running (healthy)   
registry            "/home/harbor/entryp…"   registry            running (healthy)   
registryctl         "/home/harbor/start.…"   registryctl         running (healthy) 

# 查看网桥
[root@localhost harbor]# docker network ls
NETWORK ID     NAME            DRIVER    SCOPE
b486a9e924e9   bridge          bridge    local
86f6dad2fe58   harbor_harbor   bridge    local		# 新创建的
db9a2c63802b   host            host      local
e05e046464f3   none            null      local

# 存储（以下都是新创建的）
[root@localhost harbor]# docker volume ls
DRIVER    VOLUME NAME
local     9b5d0d6156d54223783e4ed6cc241055f9d47eb1e40f9a642378b63e75f04c39
local     9f01f8d3ff2aab211ae90eec220d4b43d56039c8291f708ad98b1ba044f0f252
local     2302bd2e87258a03ada0762d54649a5cc03920c7f2227122b229c2d47986929e
local     a487d4826f4f00893f6c9d20fa6ff8d9f378b8326005da64fed8456481a1b392
local     c1217fd93a6ce3e5752d08b2901aba205fc16cdf7a657fe09fd45c83ea3619a5
local     e22aeb02fe60986654f2836855feb15237a143191f01aff1b8eb997aeb3c116d
local     e795c6551deeb6129e2490f1300fa660a6555c569a32e84417aa6b984bfa50f4
local     e882e16b108fff7f771e8d7907d61929ef585ae1a4685871345f53f5cdd8be0d
local     fda97d2b286e0275765de33a43f9f0bd63528ccd54bb896c98d94746558001f2

# 查看主机名（已经被修改）
[root@localhost harbor]# hostname
harbor.jinhui.dev
```

:::



### （5）访问Web页面

① 先进行域名解析，修改本地`hosts`文件或去域名厂商那里解析

② 由于我这里使用的是`.dev`域名，查阅资料得知主流的浏览器都会强制将`HTTP`跳转为`HTTPS`且没有办法阻止，所以无法直接在浏览器访问

​      解决办法也很简单，先使用`IP`访问，等后面配置好`HTTPS`以后再使用域名访问

③ 用户名固定为`admin`，使用自定义密码`y6yGXAX0Dq02VN6I`进行登录，登录成功以后点击左下角切换为浅色主题，截图如下

![image-20220610133746505](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220610133746505.png)

### （6）配置Docker信任HTTP协议仓库并登录

文档：[https://goharbor.io/docs/2.5.0/install-config/run-installer-script/#connect-http](https://goharbor.io/docs/2.5.0/install-config/run-installer-script/#connect-http)

::: details 点击查看详情

```bash
# 登录Harbor仓库，由于Docker默认会使用HTTPS协议登录仓库，所以下面的命令会报错
[root@localhost ~]# docker login harbor.jinhui.dev
Username: admin
Password: 
Error response from daemon: Get "https://harbor.jinhui.dev/v2/": dial tcp 192.168.48.133:443: connect: connection refused

# 添加信任
[root@localhost harbor]# cat /etc/docker/daemon.json
{ 
 "insecure-registries" : [
        "harbor.jinhui.dev"
  ]
}

# 重启Docker
[root@localhost harbor]# systemctl restart docker

# 重启Harbor
[root@localhost harbor]# docker-compose down -v
[root@localhost harbor]# docker-compose up -d

# 再次登录Harbor仓库
[root@localhost harbor]# docker login harbor.jinhui.dev
Username: admin
Password: 
WARNING! Your password will be stored unencrypted in /root/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credentials-store

Login Succeeded

# 登录凭证会保存在 ~/.docker/config.json文件中
[root@localhost harbor]# cat ~/.docker/config.json 
{
        "auths": {
                "harbor.jinhui.dev": {
                        "auth": "YWRtaW46eTZ5R1hBWDBEcTAyVk42SQ=="
                }
        }
}
```

:::

### （7）Harbor镜像仓库推送和拉取测试

Harbor镜像仓库已经很贴心的为我们提供了推送命令，如下图所示

![image-20220610140642671](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220610140642671.png)

::: details 点击查看详情

```bash
# 随便找一个镜像，给他打一个tag
[root@localhost harbor]# docker tag busybox:1.34 harbor.jinhui.dev/library/busybox:1.34

# 推送
[root@localhost harbor]# docker push harbor.jinhui.dev/library/busybox:1.34
The push refers to repository [harbor.jinhui.dev/library/busybox]
01fd6df81c8e: Pushed 
1.34: digest: sha256:62ffc2ed7554e4c6d360bce40bbcf196573dd27c4ce080641a2c59867e732dee size: 527

# 推送完成后去Web页面查看效果

# -----------------------------------------------------------------------------------------------------
# 拉取测试：（1）先将本地的镜像删掉
[root@localhost harbor]# docker image rm harbor.jinhui.dev/library/busybox:1.34
Untagged: harbor.jinhui.dev/library/busybox:1.34
Untagged: harbor.jinhui.dev/library/busybox@sha256:62ffc2ed7554e4c6d360bce40bbcf196573dd27c4ce080641a2c59867e732dee

# 从Harbor拉取镜像
[root@localhost harbor]# docker pull harbor.jinhui.dev/library/busybox:1.34
1.34: Pulling from library/busybox
Digest: sha256:62ffc2ed7554e4c6d360bce40bbcf196573dd27c4ce080641a2c59867e732dee
Status: Downloaded newer image for harbor.jinhui.dev/library/busybox:1.34
harbor.jinhui.dev/library/busybox:1.34
```

:::



## 配置

### 开启HTTPS

文档：[https://goharbor.io/docs/2.5.0/install-config/configure-https/](https://goharbor.io/docs/2.5.0/install-config/configure-https/)



**前言：生成自签证书的多种方式**

| 生成自签证书方式 | 说明                                                         |
| ---------------- | ------------------------------------------------------------ |
| `openssl`        | 配置起来比较复杂，官方文档采用这种方式                       |
| `cfssl`          | 由`cloudflare`使用Go语言开发的自签证书工具，使用简单，功能强大，应用广泛<br />Github：[https://github.com/cloudflare/cfssl](https://github.com/cloudflare/cfssl) |
| `mkcert`         | 使用最简单，只需要提供域名即可生成证书，并且提供**安装本地CA到系统中**功能，相当贴心<br />Github：[https://github.com/FiloSottile/mkcert](https://github.com/FiloSottile/mkcert) |

> 本文档在`Windows`平台上使用`mkcert`来自签证书，安装过程略



**（1）在本地生成自签证书**

```bash
# 安装本地CA到系统中
# 如果这一步不执行，那么在Web访问时不会显示小绿锁，而是会提示证书无效
C:\Users\Administrator\Desktop>mkcert -install
The local CA is now installed in the system trust store! ⚡️
Note: Firefox support is not available on your platform. ℹ️

# 生成证书
C:\Users\Administrator\Desktop>mkcert harbor.jinhui.dev
Note: the local CA is not installed in the system trust store.
Run "mkcert -install" for certificates to be trusted automatically ⚠️

Created a new certificate valid for the following names 📜
 - "harbor.jinhui.dev"

The certificate is at "./harbor.jinhui.dev.pem" and the key at "./harbor.jinhui.dev-key.pem" ✅

It will expire on 10 September 2024 🗓
```



**（2）Harbor启用HTTPS**

```bash
# 上传证书到这里
[root@localhost harbor]# mkdir ssl
[root@localhost harbor]# cd ssl/
[root@localhost ssl]# rz -bey
rz waiting to receive.
Starting zmodem transfer.  Press Ctrl+C to cancel.
Transferring harbor.jinhui.dev.pem...
  100%       1 KB       1 KB/sec    00:00:01       0 Errors  
Transferring harbor.jinhui.dev-key.pem...
  100%       1 KB       1 KB/sec    00:00:01       0 Errors
[root@localhost ssl]# ls -lh
total 8.0K
-rw-r--r-- 1 root root 1.7K Jun 10 16:05 harbor.jinhui.dev-key.pem
-rw-r--r-- 1 root root 1.6K Jun 10 16:05 harbor.jinhui.dev.pem
root@localhost ssl]# cd ..

# 修改Harbor配置文件
[root@localhost harbor]# vim harbor.yml
# https related config
https:
  # https port for harbor, default is 443
  port: 443
  # The path of cert and key files for nginx
  certificate: /usr/local/harbor/ssl/harbor.jinhui.dev.pem
  private_key: /usr/local/harbor/ssl/harbor.jinhui.dev-key.pem

# 关闭Harbor
[root@localhost harbor]# docker compose down

# 重新生成配置文件
[root@harbor harbor]# ./prepare

# 启动Harbor
[root@localhost harbor]# docker compose up -d
[root@localhost harbor]# docker compose ps
NAME                COMMAND                  SERVICE             STATUS               PORTS
harbor-core         "/harbor/entrypoint.…"   core                running (starting)   
harbor-db           "/docker-entrypoint.…"   postgresql          running (starting)   
harbor-jobservice   "/harbor/entrypoint.…"   jobservice          running (starting)   
harbor-log          "/bin/sh -c /usr/loc…"   log                 running (starting)   127.0.0.1:1514->10514/tcp
harbor-portal       "nginx -g 'daemon of…"   portal              running (starting)   
nginx               "nginx -g 'daemon of…"   proxy               running (starting)   0.0.0.0:80->8080/tcp, :::80->8080/tcp
redis               "redis-server /etc/r…"   redis               running (starting)   
registry            "/home/harbor/entryp…"   registry            running (starting)   
registryctl         "/home/harbor/start.…"   registryctl         running (starting)
```



**（3）Web端访问测试**

![image-20220610163645315](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220610163645315.png)

**（4）Docker访问Harbor修改为HTTPS**

```bash
# 删除Docker信任HTTP协议仓库配置
[root@localhost harbor]# vim /etc/docker/daemon.json
{
 "insecure-registries" : [
        "harbor.jinhui.dev"       # 将这个删除
  ]
}
[root@localhost harbor]# systemctl restart docker.service

# 重新登录Harbor仓库，报错了，原因是Docker无法确认我们自签的证书是否有效
[root@localhost harbor]# docker login harbor.jinhui.dev
Authenticating with existing credentials...
Login did not succeed, error: Error response from daemon: Get "https://harbor.jinhui.dev/v2/": x509: certificate signed by unknown authority
Username (admin): admin
Password: 
Error response from daemon: Get "https://harbor.jinhui.dev/v2/": x509: certificate signed by unknown authority

# 让Docker信任自签证书
[root@localhost harbor]# mkdir -p /etc/docker/certs.d/harbor.jinhui.dev
[root@localhost harbor]# cp ssl/harbor.jinhui.dev.pem /etc/docker/certs.d/harbor.jinhui.dev/harbor.jinhui.dev.crt # 需要改下后缀名
[root@localhost harbor]# systemctl restart docker.service

# 再次登录到Harbor仓库
[root@localhost harbor.jinhui.dev]# docker login harbor.jinhui.dev
Authenticating with existing credentials...
WARNING! Your password will be stored unencrypted in /root/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credentials-store

Login Succeeded
```

